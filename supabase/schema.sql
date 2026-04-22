-- ============================================================
-- Blog admin schema for JermayaOS XP clone
-- Run once in Supabase dashboard: SQL Editor → New query → paste → Run
-- ============================================================

create extension if not exists "pgcrypto";

-- ---------- posts table ----------
create table if not exists public.blog_posts (
  id            uuid primary key default gen_random_uuid(),
  slug          text not null unique,
  title         text not null,
  excerpt       text not null default '',
  content_html  text not null default '',
  cover_image_url text,
  status        text not null default 'draft' check (status in ('draft','published')),
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  published_at  timestamptz,
  deleted_at    timestamptz
);

create index if not exists blog_posts_deleted_at_idx on public.blog_posts (deleted_at);
create index if not exists blog_posts_status_idx     on public.blog_posts (status);
create index if not exists blog_posts_published_at_idx on public.blog_posts (published_at desc);

-- updated_at trigger
create or replace function public.tg_blog_posts_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

drop trigger if exists blog_posts_updated_at on public.blog_posts;
create trigger blog_posts_updated_at
before update on public.blog_posts
for each row execute function public.tg_blog_posts_updated_at();

-- ---------- RLS ----------
-- Row-Level Security is ON. The browser uses the publishable (anon) key and
-- only reads published + not-deleted posts. The secret (service role) key is
-- used server-side from Next.js API routes and bypasses RLS for admin writes.
alter table public.blog_posts enable row level security;

drop policy if exists blog_posts_public_read on public.blog_posts;
create policy blog_posts_public_read on public.blog_posts
  for select
  to anon, authenticated
  using (status = 'published' and deleted_at is null);

-- ---------- 30-day recycle-bin purge ----------
create or replace function public.purge_old_trashed_posts()
returns integer language plpgsql security definer as $$
declare deleted_count integer;
begin
  with del as (
    delete from public.blog_posts
    where deleted_at is not null
      and deleted_at < now() - interval '30 days'
    returning 1
  )
  select count(*) into deleted_count from del;
  return deleted_count;
end $$;

-- Optional: schedule nightly auto-purge with pg_cron (uncomment if enabled).
-- select cron.schedule('purge-trashed-blog-posts', '0 3 * * *',
--                      'select public.purge_old_trashed_posts();');

-- ============================================================
-- Work projects (My Work tree) — admin-managed
-- ============================================================
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

-- ============================================================
-- Site content (key/value) — for About window + Welcome.txt (readme)
-- ============================================================
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
