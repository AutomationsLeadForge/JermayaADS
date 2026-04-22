# Supabase migration — temporary checklist

**Purpose.** Jermaya is moving this project from the original Supabase project
(created under `automations@jermayads.nl`) to a new Supabase project. This file
is a step-by-step checklist for whoever picks it up — Claude Code or human —
so the new project ends up functionally identical. Delete this file once the
migration is verified.

**What carries over?** Schema + the two Storage buckets + the seed data
(`work_projects` and `site_content`). Blog posts do **not** carry over — the
old blogs were intentionally removed and new ones will be written fresh.

---

## 0 · Before you start

- [ ] Confirm which Supabase project is the *new* target (project ref + URL).
- [ ] Confirm the old project is still accessible in case of rollback.
- [ ] Install Node 20+ and run `npm install` in the repo root if you haven't.

Source of truth in the repo:
- Schema: `supabase/schema.sql` (+ `supabase/migrations/002_admin_content.sql`)
- Bucket setup: `supabase/SETUP.md` step 2
- Seed script: `scripts/seed-admin-content.mjs`
- Client init: `src/lib/supabase.ts`
- Admin auth (not Supabase Auth — custom JWT): `src/lib/auth.ts`

---

## 1 · Update environment variables

Edit `.env.local` at the repo root. Replace the Supabase values with the new
project's credentials. The existing `ADMIN_*` secrets can stay — they are
independent of Supabase.

```env
# --- new Supabase project ---
NEXT_PUBLIC_SUPABASE_URL=https://<new-project-ref>.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=<new anon / publishable key>
SUPABASE_SECRET_KEY=<new service_role key>

# --- admin auth (unchanged) ---
ADMIN_PASSWORD=<pick one>
ADMIN_SESSION_SECRET=<64+ char hex, unchanged>
```

Where to find them in the Supabase dashboard → **Project Settings → API**:
- `URL` → `NEXT_PUBLIC_SUPABASE_URL`
- `Project API keys → anon (public)` → `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- `Project API keys → service_role (secret)` → `SUPABASE_SECRET_KEY`

> ⚠️ `SUPABASE_SECRET_KEY` bypasses Row Level Security. Never commit it and
> never expose it to the browser.

If the app is deployed (Vercel, Fly, etc.) the same three values need to be
updated in the hosting provider's env settings too.

---

## 2 · Create the schema

In the new project → **SQL Editor → New query**, run these files in order:

1. `supabase/schema.sql` — creates `blog_posts`, `work_projects`,
   `site_content`, triggers, indexes, RLS policies, and the
   `purge_old_trashed_posts()` helper.
2. `supabase/migrations/002_admin_content.sql` — idempotent; brings any
   missing column/policy/trigger up to date.

After running, check **Table Editor** — all three tables should exist:

- [ ] `blog_posts`
- [ ] `work_projects`
- [ ] `site_content`

Verify RLS is **enabled** on each table and each has its public-read policy.

---

## 3 · Create the Storage bucket

Dashboard → **Storage → New bucket**.

- Name: **`blog-images`** (exact — the code hardcodes this name)
- Public bucket: **ON** (images are served via the CDN URL directly)
- File size limit: **5 MB**
- Allowed MIME types: `image/png, image/jpeg, image/webp, image/gif`

The app uses the service-role key for uploads, so no extra storage policies
are required beyond enabling the bucket. If you want RLS-style uploads from
the browser later, add policies via **Storage → Policies**.

---

## 4 · Seed content tables

The `work_projects` table and the `site_content` key/value rows are seeded
from a script. Blog posts are **not** seeded — leave `blog_posts` empty.

From the repo root with `.env.local` pointing at the new project:

```bash
node scripts/seed-admin-content.mjs
```

This upserts:
- 11 rows in `work_projects` (portfolio entries — idempotent on `slug`)
- 2 rows in `site_content` (keys: `about`, `readme`)

Re-running the script is safe — it upserts, never duplicates.

---

## 5 · (Optional) Enable nightly trash purge

Only if you want the recycle bin to self-clean. Dashboard → **Database →
Extensions** → enable `pg_cron`, then uncomment and run the
`cron.schedule(...)` block at the bottom of `schema.sql`. Not required for
the app to work.

---

## 6 · Verify

Smoke-test each surface end-to-end:

- [ ] `npm run dev` — dev server boots without Supabase env warnings.
- [ ] Visit `/` — homepage renders; no console errors about Supabase.
- [ ] Visit `/my-work` — the 11 projects render (they're read from the
      `work_projects` table via `GET /api/work-projects`).
- [ ] Open the About window in the XP desktop — shows the seeded About
      content (from `site_content` key=`about`).
- [ ] Visit `/blog` — empty or near-empty, as expected (no posts yet).
- [ ] Admin login: go through `/admin` flow, enter `ADMIN_PASSWORD`, confirm
      the `jos_admin` cookie is set, and the admin panel loads.
- [ ] In Admin → Posts, create a new post with a cover image — the upload
      should hit the new `blog-images` bucket. Confirm the image URL opens.
- [ ] Hard-delete a test post and a test project — both should remove their
      Storage folders (check Storage UI).

If any check fails, see "Common failure modes" below.

---

## 7 · Cleanup once verified

- [ ] In the old Supabase project: rotate (or revoke) the service-role key so
      a leaked `.env.local` can't hit it anymore.
- [ ] Either keep the old project paused as a backup, or delete it from the
      dashboard once you're confident. Deletion is permanent.
- [ ] Delete this file (`supabase.md`) — it was meant to be temporary.
- [ ] Commit the `.env.local` change *only if `.env.local` is gitignored*
      (it should be — double-check `.gitignore`).

---

## Common failure modes

**"Missing env var NEXT_PUBLIC_SUPABASE_URL" on boot**
`.env.local` isn't loaded. Restart the dev server — Next.js only reads
`.env.local` at startup.

**Public pages render but admin APIs return 401 / 403**
`SUPABASE_SECRET_KEY` is either missing or still pointing at the old
project. Update `.env.local` and restart.

**Images upload but don't render**
Bucket name mismatch, or bucket isn't public. It must be named exactly
`blog-images` with the public-bucket toggle on.

**`relation "blog_posts" does not exist`**
`schema.sql` didn't run fully. Open the SQL Editor, paste the file again,
and watch for any red error rows.

**Seed script throws "fetch failed" or auth error**
The script reads `.env.local` from the repo root. Run it from the repo
root, not from a subdirectory. Confirm the URL has `https://` and no
trailing slash.

---

## What is *not* being migrated

- **Blog posts.** Deliberately dropped — Jermaya is writing new ones.
- **Blog images in the old bucket.** Since the posts are gone, the images
  go with them. No S3-style copy is necessary.
- **Admin JWT sessions.** Users will be signed out on switchover. They can
  log back in with `ADMIN_PASSWORD`.
- **Supabase Auth users.** The project doesn't use Supabase Auth — admin
  login is a password check against `ADMIN_PASSWORD` with a signed JWT
  cookie. Nothing to port.

---

*Last updated: 2026-04-22.* Delete once migration is verified.
