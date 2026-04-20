# Supabase setup (one-time)

Do these three things in the Supabase dashboard before running the app.

## 1. Run the schema
- Dashboard → **SQL Editor** → **New query**
- Paste the entire contents of `schema.sql` and press **Run**.
- Verify: left sidebar → **Table Editor** → `blog_posts` should exist.

## 2. Create the image storage bucket
- Dashboard → **Storage** → **New bucket**
- Name: `blog-images`
- **Public bucket**: ✅ ON (images are served directly from the CDN URL)
- File size limit: `5 MB`
- Allowed MIME types: `image/png, image/jpeg, image/webp, image/gif`
- Click **Create bucket**.

## 3. (Optional) Nightly auto-purge of recycle bin
- Dashboard → **Database** → **Extensions** → enable `pg_cron`.
- Then edit `schema.sql`, uncomment the last `cron.schedule(...)` block, and re-run it.

That's it. The admin API uses the secret key which bypasses RLS.
