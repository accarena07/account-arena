-- Account Arena - RLS Starter Policies (Supabase/PostgreSQL)
-- Run this AFTER schema_v1.sql
--
-- Notes:
-- 1) Service Role key bypasses RLS by design (for trusted backend-only operations).
-- 2) These policies are a secure starter and may be tightened per endpoint behavior.

-- =========================================================
-- Helper functions
-- =========================================================

create or replace function public.has_role(target_role app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.user_roles ur
    where ur.user_id = auth.uid()
      and ur.role = target_role
      and ur.is_active = true
  );
$$;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select public.has_role('admin'::app_role);
$$;

-- =========================================================
-- Enable RLS
-- =========================================================

alter table public.profiles enable row level security;
alter table public.user_roles enable row level security;
alter table public.register_otp_sessions enable row level security;
alter table public.password_reset_otp_sessions enable row level security;
alter table public.auth_ip_rate_limits enable row level security;
alter table public.register_otp_ip_rate_limits enable row level security;
alter table public.game_categories enable row level security;
alter table public.games enable row level security;
alter table public.listings enable row level security;
alter table public.listing_assets enable row level security;
alter table public.orders enable row level security;
alter table public.order_events enable row level security;
alter table public.payments enable row level security;
alter table public.escrows enable row level security;
alter table public.kyc_submissions enable row level security;
alter table public.kyc_documents enable row level security;
alter table public.disputes enable row level security;
alter table public.dispute_messages enable row level security;
alter table public.payout_accounts enable row level security;
alter table public.payout_requests enable row level security;
alter table public.platform_settings enable row level security;
alter table public.admin_audit_logs enable row level security;

-- =========================================================
-- Drop existing policies (idempotent re-run)
-- =========================================================

drop policy if exists profiles_select on public.profiles;
drop policy if exists profiles_insert on public.profiles;
drop policy if exists profiles_update on public.profiles;

drop policy if exists user_roles_select on public.user_roles;

drop policy if exists game_categories_select_public on public.game_categories;
drop policy if exists game_categories_admin_all on public.game_categories;

drop policy if exists games_select_public on public.games;
drop policy if exists games_admin_all on public.games;

drop policy if exists listings_select_public on public.listings;
drop policy if exists listings_select_owner_admin on public.listings;
drop policy if exists listings_insert_seller on public.listings;
drop policy if exists listings_update_owner_admin on public.listings;
drop policy if exists listings_delete_owner_admin on public.listings;

drop policy if exists listing_assets_select_by_visibility on public.listing_assets;
drop policy if exists listing_assets_manage_owner_admin on public.listing_assets;

drop policy if exists orders_select_participant_admin on public.orders;
drop policy if exists orders_insert_buyer on public.orders;
drop policy if exists orders_update_participant_admin on public.orders;

drop policy if exists order_events_select_participant_admin on public.order_events;
drop policy if exists order_events_insert_participant_admin on public.order_events;

drop policy if exists payments_select_participant_admin on public.payments;
drop policy if exists payments_insert_participant_admin on public.payments;
drop policy if exists payments_update_participant_admin on public.payments;

drop policy if exists escrows_select_participant_admin on public.escrows;
drop policy if exists escrows_insert_admin on public.escrows;
drop policy if exists escrows_update_admin on public.escrows;

drop policy if exists kyc_submissions_select_owner_admin on public.kyc_submissions;
drop policy if exists kyc_submissions_insert_owner on public.kyc_submissions;
drop policy if exists kyc_submissions_update_owner_admin on public.kyc_submissions;

drop policy if exists kyc_documents_select_owner_admin on public.kyc_documents;
drop policy if exists kyc_documents_insert_owner on public.kyc_documents;
drop policy if exists kyc_documents_update_owner_admin on public.kyc_documents;
drop policy if exists kyc_documents_delete_owner_admin on public.kyc_documents;

drop policy if exists disputes_select_participant_admin on public.disputes;
drop policy if exists disputes_insert_participant on public.disputes;
drop policy if exists disputes_update_admin on public.disputes;

drop policy if exists dispute_messages_select_participant_admin on public.dispute_messages;
drop policy if exists dispute_messages_insert_participant_admin on public.dispute_messages;

drop policy if exists payout_accounts_select_owner_admin on public.payout_accounts;
drop policy if exists payout_accounts_insert_owner on public.payout_accounts;
drop policy if exists payout_accounts_update_owner_admin on public.payout_accounts;
drop policy if exists payout_accounts_delete_owner_admin on public.payout_accounts;

drop policy if exists payout_requests_select_owner_admin on public.payout_requests;
drop policy if exists payout_requests_insert_owner on public.payout_requests;
drop policy if exists payout_requests_update_admin on public.payout_requests;

drop policy if exists platform_settings_admin_all on public.platform_settings;
drop policy if exists admin_audit_logs_admin_select on public.admin_audit_logs;
drop policy if exists admin_audit_logs_admin_insert on public.admin_audit_logs;

-- =========================================================
-- Profiles / Roles
-- =========================================================

create policy profiles_select on public.profiles
for select
to authenticated
using (id = auth.uid() or public.is_admin());

create policy profiles_insert on public.profiles
for insert
to authenticated
with check (id = auth.uid() or public.is_admin());

create policy profiles_update on public.profiles
for update
to authenticated
using (id = auth.uid() or public.is_admin())
with check (id = auth.uid() or public.is_admin());

create policy user_roles_select on public.user_roles
for select
to authenticated
using (user_id = auth.uid() or public.is_admin());

-- =========================================================
-- Catalog
-- =========================================================

create policy game_categories_select_public on public.game_categories
for select
to anon, authenticated
using (is_active = true or public.is_admin());

create policy game_categories_admin_all on public.game_categories
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy games_select_public on public.games
for select
to anon, authenticated
using (is_active = true or public.is_admin());

create policy games_admin_all on public.games
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

-- =========================================================
-- Listings
-- =========================================================

create policy listings_select_public on public.listings
for select
to anon, authenticated
using (status = 'active');

create policy listings_select_owner_admin on public.listings
for select
to authenticated
using (seller_id = auth.uid() or public.is_admin());

create policy listings_insert_seller on public.listings
for insert
to authenticated
with check (
  (seller_id = auth.uid() and public.has_role('seller'::app_role))
  or public.is_admin()
);

create policy listings_update_owner_admin on public.listings
for update
to authenticated
using (seller_id = auth.uid() or public.is_admin())
with check (seller_id = auth.uid() or public.is_admin());

create policy listings_delete_owner_admin on public.listings
for delete
to authenticated
using (seller_id = auth.uid() or public.is_admin());

create policy listing_assets_select_by_visibility on public.listing_assets
for select
to anon, authenticated
using (
  exists (
    select 1
    from public.listings l
    where l.id = listing_assets.listing_id
      and (
        l.status = 'active'
        or l.seller_id = auth.uid()
        or public.is_admin()
      )
  )
);

create policy listing_assets_manage_owner_admin on public.listing_assets
for all
to authenticated
using (
  exists (
    select 1
    from public.listings l
    where l.id = listing_assets.listing_id
      and (l.seller_id = auth.uid() or public.is_admin())
  )
)
with check (
  exists (
    select 1
    from public.listings l
    where l.id = listing_assets.listing_id
      and (l.seller_id = auth.uid() or public.is_admin())
  )
);

-- =========================================================
-- Orders / Payments / Escrow
-- =========================================================

create policy orders_select_participant_admin on public.orders
for select
to authenticated
using (buyer_id = auth.uid() or seller_id = auth.uid() or public.is_admin());

create policy orders_insert_buyer on public.orders
for insert
to authenticated
with check (buyer_id = auth.uid() or public.is_admin());

create policy orders_update_participant_admin on public.orders
for update
to authenticated
using (buyer_id = auth.uid() or seller_id = auth.uid() or public.is_admin())
with check (buyer_id = auth.uid() or seller_id = auth.uid() or public.is_admin());

create policy order_events_select_participant_admin on public.order_events
for select
to authenticated
using (
  exists (
    select 1
    from public.orders o
    where o.id = order_events.order_id
      and (o.buyer_id = auth.uid() or o.seller_id = auth.uid() or public.is_admin())
  )
);

create policy order_events_insert_participant_admin on public.order_events
for insert
to authenticated
with check (
  exists (
    select 1
    from public.orders o
    where o.id = order_events.order_id
      and (o.buyer_id = auth.uid() or o.seller_id = auth.uid() or public.is_admin())
  )
);

create policy payments_select_participant_admin on public.payments
for select
to authenticated
using (
  exists (
    select 1
    from public.orders o
    where o.id = payments.order_id
      and (o.buyer_id = auth.uid() or o.seller_id = auth.uid() or public.is_admin())
  )
);

create policy payments_insert_participant_admin on public.payments
for insert
to authenticated
with check (
  exists (
    select 1
    from public.orders o
    where o.id = payments.order_id
      and (o.buyer_id = auth.uid() or o.seller_id = auth.uid() or public.is_admin())
  )
);

create policy payments_update_participant_admin on public.payments
for update
to authenticated
using (
  exists (
    select 1
    from public.orders o
    where o.id = payments.order_id
      and (o.buyer_id = auth.uid() or o.seller_id = auth.uid() or public.is_admin())
  )
)
with check (
  exists (
    select 1
    from public.orders o
    where o.id = payments.order_id
      and (o.buyer_id = auth.uid() or o.seller_id = auth.uid() or public.is_admin())
  )
);

create policy escrows_select_participant_admin on public.escrows
for select
to authenticated
using (
  exists (
    select 1
    from public.orders o
    where o.id = escrows.order_id
      and (o.buyer_id = auth.uid() or o.seller_id = auth.uid() or public.is_admin())
  )
);

create policy escrows_insert_admin on public.escrows
for insert
to authenticated
with check (public.is_admin());

create policy escrows_update_admin on public.escrows
for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

-- =========================================================
-- KYC
-- =========================================================

create policy kyc_submissions_select_owner_admin on public.kyc_submissions
for select
to authenticated
using (user_id = auth.uid() or public.is_admin());

create policy kyc_submissions_insert_owner on public.kyc_submissions
for insert
to authenticated
with check (user_id = auth.uid() or public.is_admin());

create policy kyc_submissions_update_owner_admin on public.kyc_submissions
for update
to authenticated
using (user_id = auth.uid() or public.is_admin())
with check (user_id = auth.uid() or public.is_admin());

create policy kyc_documents_select_owner_admin on public.kyc_documents
for select
to authenticated
using (
  exists (
    select 1
    from public.kyc_submissions ks
    where ks.id = kyc_documents.submission_id
      and (ks.user_id = auth.uid() or public.is_admin())
  )
);

create policy kyc_documents_insert_owner on public.kyc_documents
for insert
to authenticated
with check (
  exists (
    select 1
    from public.kyc_submissions ks
    where ks.id = kyc_documents.submission_id
      and (ks.user_id = auth.uid() or public.is_admin())
  )
);

create policy kyc_documents_update_owner_admin on public.kyc_documents
for update
to authenticated
using (
  exists (
    select 1
    from public.kyc_submissions ks
    where ks.id = kyc_documents.submission_id
      and (ks.user_id = auth.uid() or public.is_admin())
  )
)
with check (
  exists (
    select 1
    from public.kyc_submissions ks
    where ks.id = kyc_documents.submission_id
      and (ks.user_id = auth.uid() or public.is_admin())
  )
);

create policy kyc_documents_delete_owner_admin on public.kyc_documents
for delete
to authenticated
using (
  exists (
    select 1
    from public.kyc_submissions ks
    where ks.id = kyc_documents.submission_id
      and (ks.user_id = auth.uid() or public.is_admin())
  )
);

-- =========================================================
-- Disputes
-- =========================================================

create policy disputes_select_participant_admin on public.disputes
for select
to authenticated
using (
  buyer_id = auth.uid()
  or seller_id = auth.uid()
  or opened_by = auth.uid()
  or assigned_admin_id = auth.uid()
  or public.is_admin()
);

create policy disputes_insert_participant on public.disputes
for insert
to authenticated
with check (opened_by = auth.uid() or public.is_admin());

create policy disputes_update_admin on public.disputes
for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy dispute_messages_select_participant_admin on public.dispute_messages
for select
to authenticated
using (
  exists (
    select 1
    from public.disputes d
    where d.id = dispute_messages.dispute_id
      and (
        d.buyer_id = auth.uid()
        or d.seller_id = auth.uid()
        or d.opened_by = auth.uid()
        or d.assigned_admin_id = auth.uid()
        or public.is_admin()
      )
  )
);

create policy dispute_messages_insert_participant_admin on public.dispute_messages
for insert
to authenticated
with check (
  exists (
    select 1
    from public.disputes d
    where d.id = dispute_messages.dispute_id
      and (
        d.buyer_id = auth.uid()
        or d.seller_id = auth.uid()
        or d.opened_by = auth.uid()
        or d.assigned_admin_id = auth.uid()
        or public.is_admin()
      )
  )
);

-- =========================================================
-- Payouts
-- =========================================================

create policy payout_accounts_select_owner_admin on public.payout_accounts
for select
to authenticated
using (seller_id = auth.uid() or public.is_admin());

create policy payout_accounts_insert_owner on public.payout_accounts
for insert
to authenticated
with check (seller_id = auth.uid() or public.is_admin());

create policy payout_accounts_update_owner_admin on public.payout_accounts
for update
to authenticated
using (seller_id = auth.uid() or public.is_admin())
with check (seller_id = auth.uid() or public.is_admin());

create policy payout_accounts_delete_owner_admin on public.payout_accounts
for delete
to authenticated
using (seller_id = auth.uid() or public.is_admin());

create policy payout_requests_select_owner_admin on public.payout_requests
for select
to authenticated
using (seller_id = auth.uid() or public.is_admin());

create policy payout_requests_insert_owner on public.payout_requests
for insert
to authenticated
with check (seller_id = auth.uid() or public.is_admin());

create policy payout_requests_update_admin on public.payout_requests
for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

-- =========================================================
-- Admin-only
-- =========================================================

create policy platform_settings_admin_all on public.platform_settings
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy admin_audit_logs_admin_select on public.admin_audit_logs
for select
to authenticated
using (public.is_admin());

create policy admin_audit_logs_admin_insert on public.admin_audit_logs
for insert
to authenticated
with check (public.is_admin());
