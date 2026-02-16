-- Account Arena - Initial Database Schema (Supabase/PostgreSQL)
-- Effective date: 2026-02-11
-- Notes:
-- 1) Run this in Supabase SQL Editor.
-- 2) This schema assumes Supabase auth is enabled (auth.users exists).
-- 3) RLS policies are intentionally not included yet (can be added after API contract stabilizes).

create extension if not exists pgcrypto;

-- =========================================================
-- Enums
-- =========================================================

do $$
begin
  if not exists (select 1 from pg_type where typname = 'app_role') then
    create type app_role as enum ('buyer', 'seller', 'admin');
  end if;

  if not exists (select 1 from pg_type where typname = 'account_status') then
    create type account_status as enum ('active', 'blocked', 'suspended');
  end if;

  if not exists (select 1 from pg_type where typname = 'kyc_status') then
    create type kyc_status as enum ('pending', 'approved', 'rejected', 'needs_revision');
  end if;

  if not exists (select 1 from pg_type where typname = 'listing_status') then
    create type listing_status as enum ('draft', 'active', 'sold', 'archived', 'blocked');
  end if;

  if not exists (select 1 from pg_type where typname = 'order_status') then
    create type order_status as enum (
      'pending_payment',
      'paid',
      'processing',
      'completed',
      'cancelled',
      'refunded',
      'expired'
    );
  end if;

  if not exists (select 1 from pg_type where typname = 'payment_status') then
    create type payment_status as enum ('pending', 'paid', 'failed', 'expired', 'refunded');
  end if;

  if not exists (select 1 from pg_type where typname = 'dispute_status') then
    create type dispute_status as enum ('open', 'under_review', 'resolved_buyer', 'resolved_seller', 'closed');
  end if;

  if not exists (select 1 from pg_type where typname = 'payout_status') then
    create type payout_status as enum ('requested', 'processing', 'paid', 'failed', 'cancelled');
  end if;
end $$;

-- =========================================================
-- Utility function for updated_at
-- =========================================================

create or replace function public.set_updated_at()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- Auto-create profile row when a new auth user is created.
create or replace function public.handle_new_auth_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url, status)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(coalesce(new.email, ''), '@', 1)),
    new.raw_user_meta_data->>'avatar_url',
    'active'::account_status
  )
  on conflict (id) do nothing;

  -- Every user starts as buyer by default.
  insert into public.user_roles (user_id, role, is_active)
  values (new.id, 'buyer'::app_role, true)
  on conflict (user_id, role) do nothing;

  return new;
end;
$$;

-- =========================================================
-- Core user/account tables
-- =========================================================

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique,
  full_name text,
  phone text,
  avatar_url text,
  terms_accepted_at timestamptz,
  terms_version text,
  status account_status not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles
  add column if not exists terms_accepted_at timestamptz;

alter table public.profiles
  add column if not exists terms_version text;

create table if not exists public.user_roles (
  id bigserial primary key,
  user_id uuid not null references public.profiles(id) on delete cascade,
  role app_role not null,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);

-- OTP sessions (persisted to DB to survive server restart/redeploy)
create table if not exists public.register_otp_sessions (
  email text primary key,
  password text not null,
  full_name text not null,
  phone text not null,
  otp_code text not null,
  otp_expires_at timestamptz not null,
  last_sent_at timestamptz not null default now(),
  attempts int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.password_reset_otp_sessions (
  identifier text primary key,
  method text not null check (method in ('email', 'whatsapp')),
  user_id uuid references public.profiles(id) on delete set null,
  otp_code text not null,
  otp_expires_at timestamptz not null,
  last_sent_at timestamptz not null default now(),
  attempts int not null default 0,
  verified boolean not null default false,
  reset_token text,
  reset_token_expires_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.auth_ip_rate_limits (
  scope text not null,
  ip_address text not null,
  request_count int not null default 0,
  window_started_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (scope, ip_address)
);

create table if not exists public.register_otp_ip_rate_limits (
  scope text not null,
  ip_address text not null,
  request_count int not null default 0,
  window_started_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (scope, ip_address)
);

alter table public.register_otp_sessions
  add column if not exists last_sent_at timestamptz not null default now();

alter table public.password_reset_otp_sessions
  add column if not exists last_sent_at timestamptz not null default now();

-- =========================================================
-- Catalog / listing domain
-- =========================================================

create table if not exists public.game_categories (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  is_active boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.games (
  id uuid primary key default gen_random_uuid(),
  category_id uuid references public.game_categories(id) on delete set null,
  slug text not null unique,
  name text not null,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.listings (
  id uuid primary key default gen_random_uuid(),
  seller_id uuid not null references public.profiles(id) on delete restrict,
  game_id uuid not null references public.games(id) on delete restrict,
  title text not null,
  description text,
  region text,
  rank_tier text,
  level_text text,
  price_amount numeric(14,2) not null check (price_amount >= 0),
  currency_code char(3) not null default 'IDR',
  status listing_status not null default 'draft',
  is_featured boolean not null default false,
  published_at timestamptz,
  sold_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.listing_assets (
  id uuid primary key default gen_random_uuid(),
  listing_id uuid not null references public.listings(id) on delete cascade,
  asset_type text not null check (asset_type in ('image', 'video')),
  asset_url text not null,
  sort_order int not null default 0,
  is_cover boolean not null default false,
  created_at timestamptz not null default now()
);

-- =========================================================
-- Order / payment / escrow domain
-- =========================================================

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  order_code text not null unique default ('TRX-' || upper(substr(replace(gen_random_uuid()::text, '-', ''), 1, 12))),
  buyer_id uuid not null references public.profiles(id) on delete restrict,
  seller_id uuid not null references public.profiles(id) on delete restrict,
  listing_id uuid references public.listings(id) on delete set null,
  status order_status not null default 'pending_payment',
  price_amount numeric(14,2) not null check (price_amount >= 0),
  buyer_fee_amount numeric(14,2) not null default 0 check (buyer_fee_amount >= 0),
  seller_fee_amount numeric(14,2) not null default 0 check (seller_fee_amount >= 0),
  unique_code_amount numeric(14,2) not null default 0 check (unique_code_amount >= 0),
  total_amount numeric(14,2) not null check (total_amount >= 0),
  payment_due_at timestamptz,
  delivered_at timestamptz,
  inspection_deadline_at timestamptz,
  released_at timestamptz,
  auto_released_at timestamptz,
  cancelled_at timestamptz,
  refunded_at timestamptz,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.order_events (
  id bigserial primary key,
  order_id uuid not null references public.orders(id) on delete cascade,
  actor_user_id uuid references public.profiles(id) on delete set null,
  event_type text not null,
  event_data jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  provider text not null default 'midtrans',
  payment_method text,
  payment_channel text,
  external_reference text unique,
  status payment_status not null default 'pending',
  amount numeric(14,2) not null check (amount >= 0),
  processing_fee_amount numeric(14,2) not null default 0 check (processing_fee_amount >= 0),
  paid_at timestamptz,
  expired_at timestamptz,
  raw_payload jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.escrows (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null unique references public.orders(id) on delete cascade,
  held_amount numeric(14,2) not null check (held_amount >= 0),
  status text not null check (status in ('holding', 'released', 'refunded')) default 'holding',
  held_at timestamptz not null default now(),
  released_at timestamptz,
  refunded_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- =========================================================
-- KYC domain
-- =========================================================

create table if not exists public.kyc_submissions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  kyc_level text not null default 'basic',
  status kyc_status not null default 'pending',
  full_name text,
  nik text,
  birth_place text,
  birth_date date,
  address text,
  submitted_at timestamptz not null default now(),
  reviewed_by uuid references public.profiles(id) on delete set null,
  reviewed_at timestamptz,
  review_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.kyc_documents (
  id uuid primary key default gen_random_uuid(),
  submission_id uuid not null references public.kyc_submissions(id) on delete cascade,
  doc_type text not null check (doc_type in ('ktp', 'selfie', 'passport', 'npwp', 'other')),
  file_url text not null,
  metadata jsonb,
  created_at timestamptz not null default now()
);

-- =========================================================
-- Dispute domain
-- =========================================================

create table if not exists public.disputes (
  id uuid primary key default gen_random_uuid(),
  dispute_code text not null unique default ('DSP-' || upper(substr(replace(gen_random_uuid()::text, '-', ''), 1, 12))),
  order_id uuid not null references public.orders(id) on delete cascade,
  buyer_id uuid not null references public.profiles(id) on delete restrict,
  seller_id uuid not null references public.profiles(id) on delete restrict,
  opened_by uuid not null references public.profiles(id) on delete restrict,
  assigned_admin_id uuid references public.profiles(id) on delete set null,
  status dispute_status not null default 'open',
  priority text not null default 'medium' check (priority in ('low', 'medium', 'high')),
  reason text,
  description text,
  resolution text,
  resolved_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.dispute_messages (
  id uuid primary key default gen_random_uuid(),
  dispute_id uuid not null references public.disputes(id) on delete cascade,
  sender_id uuid not null references public.profiles(id) on delete restrict,
  sender_role app_role not null,
  message text not null,
  attachment_url text,
  is_internal boolean not null default false,
  created_at timestamptz not null default now()
);

-- =========================================================
-- Seller payout domain
-- =========================================================

create table if not exists public.payout_accounts (
  id uuid primary key default gen_random_uuid(),
  seller_id uuid not null references public.profiles(id) on delete cascade,
  bank_name text not null,
  account_name text not null,
  account_number text not null,
  is_default boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (seller_id, account_number)
);

create table if not exists public.payout_requests (
  id uuid primary key default gen_random_uuid(),
  seller_id uuid not null references public.profiles(id) on delete cascade,
  payout_account_id uuid not null references public.payout_accounts(id) on delete restrict,
  amount numeric(14,2) not null check (amount > 0),
  status payout_status not null default 'requested',
  requested_at timestamptz not null default now(),
  processed_at timestamptz,
  failure_reason text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- =========================================================
-- Admin / system tables
-- =========================================================

create table if not exists public.platform_settings (
  key text primary key,
  value jsonb not null,
  description text,
  updated_by uuid references public.profiles(id) on delete set null,
  updated_at timestamptz not null default now()
);

create table if not exists public.admin_audit_logs (
  id bigserial primary key,
  actor_user_id uuid references public.profiles(id) on delete set null,
  module text not null,
  action text not null,
  entity_type text,
  entity_id text,
  before_data jsonb,
  after_data jsonb,
  ip_address inet,
  user_agent text,
  created_at timestamptz not null default now()
);

-- =========================================================
-- Indexes
-- =========================================================

create index if not exists idx_profiles_status on public.profiles(status);
create unique index if not exists uq_profiles_phone on public.profiles(phone) where phone is not null;
create index if not exists idx_user_roles_user_id on public.user_roles(user_id);
create index if not exists idx_register_otp_sessions_expires_at on public.register_otp_sessions(otp_expires_at);
create index if not exists idx_password_reset_otp_sessions_expires_at on public.password_reset_otp_sessions(otp_expires_at);
create index if not exists idx_password_reset_otp_sessions_user_id on public.password_reset_otp_sessions(user_id);
create index if not exists idx_auth_ip_rate_limits_updated_at on public.auth_ip_rate_limits(updated_at);
create index if not exists idx_register_otp_ip_rate_limits_updated_at on public.register_otp_ip_rate_limits(updated_at);

create index if not exists idx_games_category_id on public.games(category_id);
create index if not exists idx_listings_seller_id on public.listings(seller_id);
create index if not exists idx_listings_game_id on public.listings(game_id);
create index if not exists idx_listings_status on public.listings(status);
create index if not exists idx_listings_created_at on public.listings(created_at desc);
create index if not exists idx_listing_assets_listing_id on public.listing_assets(listing_id);

create index if not exists idx_orders_buyer_id on public.orders(buyer_id);
create index if not exists idx_orders_seller_id on public.orders(seller_id);
create index if not exists idx_orders_listing_id on public.orders(listing_id);
create index if not exists idx_orders_status on public.orders(status);
create index if not exists idx_orders_created_at on public.orders(created_at desc);

create index if not exists idx_order_events_order_id_created_at on public.order_events(order_id, created_at desc);
create index if not exists idx_payments_order_id on public.payments(order_id);
create index if not exists idx_payments_status on public.payments(status);
create index if not exists idx_escrows_order_id on public.escrows(order_id);

create index if not exists idx_kyc_submissions_user_id on public.kyc_submissions(user_id);
create index if not exists idx_kyc_submissions_status on public.kyc_submissions(status);
create index if not exists idx_kyc_submissions_submitted_at on public.kyc_submissions(submitted_at desc);
create index if not exists idx_kyc_documents_submission_id on public.kyc_documents(submission_id);

create index if not exists idx_disputes_order_id on public.disputes(order_id);
create index if not exists idx_disputes_status on public.disputes(status);
create index if not exists idx_disputes_priority on public.disputes(priority);
create index if not exists idx_disputes_created_at on public.disputes(created_at desc);
create index if not exists idx_dispute_messages_dispute_id_created_at on public.dispute_messages(dispute_id, created_at asc);

create index if not exists idx_payout_accounts_seller_id on public.payout_accounts(seller_id);
create index if not exists idx_payout_requests_seller_id on public.payout_requests(seller_id);
create index if not exists idx_payout_requests_status on public.payout_requests(status);
create index if not exists idx_payout_requests_created_at on public.payout_requests(created_at desc);

create index if not exists idx_admin_audit_logs_actor on public.admin_audit_logs(actor_user_id);
create index if not exists idx_admin_audit_logs_module on public.admin_audit_logs(module);
create index if not exists idx_admin_audit_logs_created_at on public.admin_audit_logs(created_at desc);

-- =========================================================
-- updated_at triggers
-- =========================================================

drop trigger if exists trg_profiles_updated_at on public.profiles;
create trigger trg_profiles_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

drop trigger if exists trg_game_categories_updated_at on public.game_categories;
create trigger trg_game_categories_updated_at
before update on public.game_categories
for each row execute function public.set_updated_at();

drop trigger if exists trg_register_otp_sessions_updated_at on public.register_otp_sessions;
create trigger trg_register_otp_sessions_updated_at
before update on public.register_otp_sessions
for each row execute function public.set_updated_at();

drop trigger if exists trg_password_reset_otp_sessions_updated_at on public.password_reset_otp_sessions;
create trigger trg_password_reset_otp_sessions_updated_at
before update on public.password_reset_otp_sessions
for each row execute function public.set_updated_at();

drop trigger if exists trg_auth_ip_rate_limits_updated_at on public.auth_ip_rate_limits;
create trigger trg_auth_ip_rate_limits_updated_at
before update on public.auth_ip_rate_limits
for each row execute function public.set_updated_at();

drop trigger if exists trg_register_otp_ip_rate_limits_updated_at on public.register_otp_ip_rate_limits;
create trigger trg_register_otp_ip_rate_limits_updated_at
before update on public.register_otp_ip_rate_limits
for each row execute function public.set_updated_at();

drop trigger if exists trg_games_updated_at on public.games;
create trigger trg_games_updated_at
before update on public.games
for each row execute function public.set_updated_at();

drop trigger if exists trg_listings_updated_at on public.listings;
create trigger trg_listings_updated_at
before update on public.listings
for each row execute function public.set_updated_at();

drop trigger if exists trg_orders_updated_at on public.orders;
create trigger trg_orders_updated_at
before update on public.orders
for each row execute function public.set_updated_at();

drop trigger if exists trg_payments_updated_at on public.payments;
create trigger trg_payments_updated_at
before update on public.payments
for each row execute function public.set_updated_at();

drop trigger if exists trg_escrows_updated_at on public.escrows;
create trigger trg_escrows_updated_at
before update on public.escrows
for each row execute function public.set_updated_at();

drop trigger if exists trg_kyc_submissions_updated_at on public.kyc_submissions;
create trigger trg_kyc_submissions_updated_at
before update on public.kyc_submissions
for each row execute function public.set_updated_at();

drop trigger if exists trg_disputes_updated_at on public.disputes;
create trigger trg_disputes_updated_at
before update on public.disputes
for each row execute function public.set_updated_at();

drop trigger if exists trg_payout_accounts_updated_at on public.payout_accounts;
create trigger trg_payout_accounts_updated_at
before update on public.payout_accounts
for each row execute function public.set_updated_at();

drop trigger if exists trg_payout_requests_updated_at on public.payout_requests;
create trigger trg_payout_requests_updated_at
before update on public.payout_requests
for each row execute function public.set_updated_at();

-- Auto profile bootstrap from Supabase Auth users.
drop trigger if exists trg_on_auth_user_created on auth.users;
create trigger trg_on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_auth_user();
