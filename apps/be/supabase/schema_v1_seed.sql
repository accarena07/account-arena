-- Account Arena - Seed Data v1
-- Run this AFTER:
-- 1) schema_v1.sql
-- 2) schema_v1_rls.sql
--
-- This file is idempotent (safe to re-run).

-- =========================================================
-- Bootstrap one admin user role (change email if needed)
-- =========================================================

-- IMPORTANT:
-- Ensure this email already exists in Supabase Auth users.
-- You can change it to your real admin login email.
do $$
declare
  v_admin_email text := 'admin@accountarena.com';
begin
  insert into public.profiles (id, email, full_name, status)
  select
    u.id,
    u.email,
    coalesce(u.raw_user_meta_data->>'full_name', 'Super Admin'),
    'active'::account_status
  from auth.users u
  where lower(u.email) = lower(v_admin_email)
  on conflict (id) do update
    set email = excluded.email,
        full_name = coalesce(public.profiles.full_name, excluded.full_name),
        status = 'active'::account_status,
        updated_at = now();

  insert into public.user_roles (user_id, role, is_active)
  select p.id, 'admin'::app_role, true
  from public.profiles p
  where lower(p.email) = lower(v_admin_email)
  on conflict (user_id, role) do update
    set is_active = true;
end $$;

-- Backfill profiles for all existing auth users (if any)
insert into public.profiles (id, email, full_name, avatar_url, status)
select
  u.id,
  u.email,
  coalesce(u.raw_user_meta_data->>'full_name', split_part(coalesce(u.email, ''), '@', 1)),
  u.raw_user_meta_data->>'avatar_url',
  'active'::account_status
from auth.users u
left join public.profiles p on p.id = u.id
where p.id is null
on conflict (id) do nothing;

-- Ensure every profile has at least buyer role
insert into public.user_roles (user_id, role, is_active)
select p.id, 'buyer'::app_role, true
from public.profiles p
left join public.user_roles ur
  on ur.user_id = p.id
 and ur.role = 'buyer'::app_role
where ur.id is null
on conflict (user_id, role) do nothing;

-- =========================================================
-- Seed game categories
-- =========================================================

insert into public.game_categories (slug, name, is_active, sort_order)
values
  ('moba', 'MOBA', true, 10),
  ('fps', 'FPS', true, 20),
  ('battle-royale', 'Battle Royale', true, 30),
  ('rpg', 'RPG', true, 40),
  ('strategy', 'Strategy', true, 50)
on conflict (slug) do update
set
  name = excluded.name,
  is_active = excluded.is_active,
  sort_order = excluded.sort_order,
  updated_at = now();

-- =========================================================
-- Seed games
-- =========================================================

with cat as (
  select id, slug from public.game_categories
)
insert into public.games (category_id, slug, name, is_active)
select c.id, g.slug, g.name, true
from (
  values
    ('moba', 'mobile-legends', 'Mobile Legends'),
    ('moba', 'dota-2', 'Dota 2'),
    ('fps', 'valorant', 'Valorant'),
    ('battle-royale', 'pubg-mobile', 'PUBG Mobile'),
    ('battle-royale', 'free-fire', 'Free Fire'),
    ('rpg', 'genshin-impact', 'Genshin Impact')
) as g(category_slug, slug, name)
join cat c on c.slug = g.category_slug
on conflict (slug) do update
set
  category_id = excluded.category_id,
  name = excluded.name,
  is_active = excluded.is_active,
  updated_at = now();

-- =========================================================
-- Seed baseline platform settings
-- =========================================================

insert into public.platform_settings (key, value, description, updated_at)
values
  (
    'fees.buyer',
    '{"type":"percentage","value":1.0,"min":0}'::jsonb,
    'Buyer fee configuration',
    now()
  ),
  (
    'fees.seller',
    '{"type":"percentage","value":2.0,"min":0}'::jsonb,
    'Seller fee configuration',
    now()
  ),
  (
    'inspection.window_hours',
    '{"value":24}'::jsonb,
    'Buyer inspection/dispute window after delivered',
    now()
  ),
  (
    'payout.processing_hours',
    '{"value":24}'::jsonb,
    'Estimated payout processing SLA',
    now()
  ),
  (
    'dispute.max_open_days',
    '{"value":7}'::jsonb,
    'Maximum open dispute duration before escalation',
    now()
  )
on conflict (key) do update
set
  value = excluded.value,
  description = excluded.description,
  updated_at = now();
