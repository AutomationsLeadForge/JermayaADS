# Sitemap gap analysis — jermayads.nl vs our clone

Comparison baseline: live crawl of jermayads.nl on 2026-04-19 against
our repo as of current HEAD. Our planned sitemap lives in
`docs/redesign/00-sitemap.md`. Redirects live in `next.config.ts`.

## Already covered in our site
- `/` → Homepage. We render the XP desktop (`src/app/page.tsx` → Desktop).
  The redesign content for homepage lives in `src/lib/redesign-content.ts`
  (HERO, ABOUT, SERVICES_SECTION, SELECTED_WORK, TOOLS_TICKER, CLOSING_CTA).
- `/my-work` → Work page. Grid of 12 projects from `WORK_PROJECTS` in
  `src/lib/redesign-content.ts`. Covers our /cases equivalent.
- `/cases` → 301 to `/my-work` via `next.config.ts`.
- `/tooling` → 301 to `/companies#tools` via `next.config.ts`.
- `/audit` → 301 to `/google-ads#audit` via `next.config.ts`.
- Planned service pages in `00-sitemap.md`: /google-ads, /ai-engineering,
  /development, /consultancy, /work-history, /companies.
- Outbound links in `src/lib/content.ts`: SCRIPT_LINKS (GitHub scripts),
  BLOG_LINKS (3 external jermayads.nl blog deeplinks), HUSTLE_LINKS
  (ApplePY, OrangePY, jermayads.nl/tooling).

## Missing entirely — P0 (content visitor expects)
- **`/blog`** — no route, no data, no redirect. jermayads.nl has 22
  posts that rank; our site only exposes 3 via BLOG_LINKS in the XP
  desktop UI. Cutting the blog entirely is an SEO regression.
- **`/blog/<slug>`** — individual posts. Either stub routes that
  301 back to jermayads.nl until migration, or full-fat MDX pages.
- **Testimonials** — 7 named client testimonials live on
  /freelance-sea-specialist. We have zero testimonials rendered on
  our clone (CONTACT_TILES and WAAROM_BULLETS exist, but no quotes).
- **SEA audit landing** — `/audit` redirects into an anchor on
  `/google-ads`, but the actual audit offer (€350, 2-week process,
  4 FAQ blocks, credited on sign-on) has no copy in our repo.
- **Tooling partner copy** — `/tooling` redirects to `/companies#tools`
  but the 13 tool write-ups (Channable, ProfitMetrics, Northbeam,
  Hunch, Leadinfo, ShoppingScraper, etc.) are not in our content
  catalog. SERVICE_LOGOS only lists icon SVGs, no copy.

## Missing entirely — P1 (nice-to-have)
- **`/cv`** — referenced in robots.txt on the live site. Our
  `00-sitemap.md` calls out "Download CV (PDF)" as the primary CTA
  for `/work-history`, but the PDF itself isn't in `public/` and no
  `/cv` route exists.
- **PDF slide decks** — PDF_SLIDES in `content.ts` points at
  jermayads.nl/pdf/... URLs. These aren't mirrored in our `public/`.
- **Detailed case write-ups** — jermayads.nl has 11 long case narratives
  (bucket structure, dynamic pricing, RAG, etc.). We only have
  one-line summaries per project in WORK_PROJECTS.
- **`/freelance-sea-specialist`** — Dutch SEO landing page. Worth a
  thin Dutch/English wrapper or a 301 to `/google-ads`.

## Info present on jermayads.nl but NOT in our content catalog
- **Client testimonials (7)** → add `TESTIMONIALS` export in
  `src/lib/redesign-content.ts`. One-off tile component to render.
- **SEA Audit offer (€350, 4 FAQ tabs, process steps)** → add
  `AUDIT_OFFER` export in `redesign-content.ts`; surface on
  `/google-ads#audit` destination.
- **Authority stats ("100+ e-commerce brands, €50M+ Google Ads spend")**
  → extend `ABOUT.chips` in `redesign-content.ts` with a "€50M" chip
  and adjust copy on the /google-ads hero.
- **11 detailed case write-ups** → either split into a new
  `CASE_STUDIES` export (separate from WORK_PROJECTS) or enrich
  WorkProject with an optional `longForm` field.
- **13 tooling partner descriptions** → add `TOOLING_PARTNERS` export;
  render on `/companies#tools` destination so the redirect has
  somewhere real to land.
- **22 blog posts (titles, dates, tags, slugs)** → add `BLOG_POSTS`
  export with `{title, date, tag, slug, externalUrl}` per post.
- **Co-author credit at Adsscripts.com** → add to ABOUT.body or a
  `PRESS` / `CREDITS` export.
- **"Award winning" claim from WAAROM_BULLETS** → needs a supporting
  list of which awards, if any. Currently unsubstantiated on both
  sites.

## Redirect review
`next.config.ts` currently defines three 301s. Each is evaluated below.

- `/cases → /my-work` — **KEEP**. `/my-work` is our case grid.
  The live jermayads.nl /cases has 11 detailed case narratives that
  our /my-work only summarises; follow-up: enrich WORK_PROJECTS or
  add a `/my-work/<slug>` detail route before we lose the SEO equity.
- `/tooling → /companies#tools` — **KEEP but make the anchor real**.
  There is no #tools section on /companies today because /companies
  itself is not built yet. Either build the section first, or
  temporarily change the target to `/` or `/#services` so the
  redirect doesn't land on an empty anchor.
- `/audit → /google-ads#audit` — **KEEP but make the anchor real**.
  /google-ads isn't in `src/app/` yet either. Same issue as above —
  the redirect currently 301s into a 404.

## Recommended next slices
1. **P0 — Add `/blog` route.** Stub list page rendering a `BLOG_POSTS`
   export from `src/lib/redesign-content.ts`; each item links out to
   the live jermayads.nl/blog/<slug> until we migrate content. Keeps
   SEO referral traffic and demonstrates content breadth. Ship with
   22 post stubs and matching Dutch dates.
2. **P0 — Build the redirect targets.** `/google-ads`, `/companies`
   and their `#audit` / `#tools` anchors need to exist before the
   redirects in `next.config.ts` stop landing on soft-404s.
3. **P0 — Testimonials section.** Port the 7 client quotes into a
   `TESTIMONIALS` export and render on the homepage between
   SELECTED_WORK and CLOSING_CTA.
4. **P1 — SEA Audit offer block.** Port the €350 audit copy + 4-step
   process onto `/google-ads#audit`. Keep the "credited on sign-on"
   line — it's a conversion lever.
5. **P1 — Tooling partner grid.** Port 13 tool descriptions into a
   `TOOLING_PARTNERS` export with partner badges; render on
   `/companies#tools`.
6. **P1 — Case detail pages.** Add `/my-work/<slug>` with long-form
   for the top 4–5 cases (bucket structure, programmatic SEO, dynamic
   pricing, RAG). Big value-signal for prospects.
7. **P2 — Dutch-language wrapper** or explicit 301 for
   `/freelance-sea-specialist` → `/google-ads`. Low effort, protects
   organic traffic on the Dutch SEO term.
8. **P2 — `/cv` route** serving a PDF or an HTML resume. Covers the
   `00-sitemap.md` primary CTA for `/work-history`.
