-- ============================================================
-- Migration 002 — admin-managed content (work projects + site content)
-- Paste this whole file into Supabase → SQL Editor → New query → Run.
-- Idempotent: every statement is safe to re-run.
-- ============================================================

create extension if not exists "pgcrypto";

-- ---------- work_projects ----------
create table if not exists public.work_projects (
  id             uuid primary key default gen_random_uuid(),
  slug           text not null unique,
  number         text not null default '',
  title          text not null,
  category       text not null default 'dev' check (category in ('sea','ai','dev','consultancy','product')),
  category_label text not null default '',
  role           text not null default '',
  outcome_metric text not null default '',
  outcome_label  text not null default '',
  summary        text not null default '',
  thumbnail_url  text,
  icon_key       text not null default 'DocumentIcon',
  href           text,
  featured       boolean not null default false,
  sort_order     integer not null default 0,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now(),
  deleted_at     timestamptz
);

create index if not exists work_projects_deleted_at_idx on public.work_projects (deleted_at);
create index if not exists work_projects_sort_order_idx on public.work_projects (sort_order);

create or replace function public.tg_work_projects_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

drop trigger if exists work_projects_updated_at on public.work_projects;
create trigger work_projects_updated_at
before update on public.work_projects
for each row execute function public.tg_work_projects_updated_at();

alter table public.work_projects enable row level security;

drop policy if exists work_projects_public_read on public.work_projects;
create policy work_projects_public_read on public.work_projects
  for select
  to anon, authenticated
  using (deleted_at is null);

-- ---------- site_content (key/value store for About + Readme) ----------
create table if not exists public.site_content (
  key        text primary key,
  value      jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create or replace function public.tg_site_content_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

drop trigger if exists site_content_updated_at on public.site_content;
create trigger site_content_updated_at
before update on public.site_content
for each row execute function public.tg_site_content_updated_at();

alter table public.site_content enable row level security;

drop policy if exists site_content_public_read on public.site_content;
create policy site_content_public_read on public.site_content
  for select
  to anon, authenticated
  using (true);
