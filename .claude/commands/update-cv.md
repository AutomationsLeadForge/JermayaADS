---
description: Add or update an entry in Jermaya's live CV (src/lib/cv.ts). Handles logo resolution, URL verification, and chronological insertion.
argument-hint: "[free-text description of the update, e.g. 'New gig: Acme Corp — SEA specialist — Jan 2026 to Present — Remote']"
---

# /update-cv — keep the live CV current

You are updating the file `src/lib/cv.ts`, which powers the CV window on the desktop (opened from `CVContent.tsx`). The file exports two arrays: `CV_JOBS` (ordered newest → oldest) and `CV_EDUCATION`.

## Input

The user's context appears after the command:

```
$ARGUMENTS
```

It may include any of:
- A new job/role (title, company, period, location, kind, description, skills)
- An update to an existing entry (e.g. changed end date, new description)
- Removal of an entry
- A new education entry
- One or more logo sources: an **attached image**, a **local file path**, or a **URL**

If anything important is missing (title, company, period), ask once — don't guess.

## Step 1 — Resolve the company website

For any NEW company, you MUST verify its canonical website before writing the URL. Try in this order:

1. If the user gave you a URL, use it (but still sanity-check it loads).
2. Otherwise, run **WebSearch** for `"<Company>" <industry hint> official website <country>`.
3. Prefer the top result that is the company's own domain (not LinkedIn, Facebook, review sites).
4. If no confident match, leave `companyUrl` undefined — do not invent a URL.

Strip trailing slashes. Prefer `https://www.<host>` when it resolves, otherwise bare apex.

## Step 2 — Resolve the logo (image)

Logos live in `public/images/cv/` and are referenced by `CVJob.logo` as `"/images/cv/<name>_logo.jpeg"`. Naming convention: lowercase, underscores, English-ish slug, `_logo.<ext>`.

Resolution chain (stop at the first that works):

1. **Attached image in this conversation** — the user dropped a file. Its temp path is available; copy it to `public/images/cv/<slug>_logo.<ext>` using `Bash(cp …)`.
2. **Explicit local path** in the user's text (e.g. `D:/Downloads/acme.png`, `../Assests/acme.jpeg`) — copy with `Bash(cp …)`.
3. **Explicit URL** in the user's text — download with `curl -sL -o public/images/cv/<slug>_logo.<ext> "<url>"`.
4. **Auto-fetch from company site** — try `https://<host>/favicon.ico`, then LinkedIn's og:image if you can scrape it, then the site's og:image via `WebFetch`. Save to `public/images/cv/<slug>_logo.<ext>`.
5. **Fallback** — no logo. Leave `logo` undefined. The CV already renders a colored letter tile automatically.

Normalise to one of `.jpeg`, `.png`, `.svg`, `.webp`. If the downloaded file is tiny (<1 KB) or HTML (captive page), treat it as failed and move to the next step.

## Step 3 — Insert/update `src/lib/cv.ts`

- Entries in `CV_JOBS` are newest-first by start date. Put the new entry in the correct slot.
- Fields (see `CVJob` interface):
  - `title` — the role (use the original language the user gave, usually Dutch or English)
  - `company` — display name (e.g. "Fingerspitz", "Partout digital native agency")
  - `companyUrl` — verified in Step 1
  - `period` — e.g. `"Jan 2026 — Present"` (use em-dash `—`, not hyphen)
  - `duration` — e.g. `"3 mos"`, `"2 yrs 1 mo"`. Compute from today = `2026-04-21`.
  - `kind` — `"Freelance" | "Full-time" | "Self-employed"` (omit if not applicable)
  - `location` — free text (omit if the user didn't give one)
  - `logo` — from Step 2 (omit if none)
  - `description` — only if the user gave one
  - `skills` — comma-separated, only if the user gave skills
- Match the formatting of existing entries exactly. Use em-dashes consistently. Preserve TypeScript quoting style (double quotes per project convention).

For education updates, follow the same pattern in `CV_EDUCATION`.

## Step 4 — Verify

Run these and fix any issues before handing off:

- `npm run typecheck`
- `npm run build`

If a lint warning appears, check if it's from your change or pre-existing (pre-existing warnings in `BlogContent.tsx`, `ResizableImage.tsx`, etc. are fine to ignore).

## Step 5 — Summarise back to the user

One short block, no headers:
- What you added/changed
- Company URL used (with source: "given" / "WebSearch" / "none")
- Logo source (attachment / URL / path / favicon / fallback)
- Any decisions you made (e.g. guessed duration, left a field blank)

## Hard rules

- Never invent a company URL or logo — prefer a blank field over a guess.
- Never delete an existing entry unless the user explicitly asked to.
- Never reformat unrelated entries in `cv.ts`.
- Always preserve chronological order in `CV_JOBS`.
- Never commit or push — the user commits manually.
- Keep the description in the original language the user used. Don't translate.

## Examples

**Example 1 — new gig with attachment**

User runs: `/update-cv New gig: Neverleafs — Sr. SEA Specialist — Jan 2026 to Present — Freelance — Remote` and drags `neverleafs_logo.png` into the chat.

You: WebSearch `Neverleafs official website` → `https://neverleafs.com` confirmed. Copy attached PNG to `public/images/cv/neverleafs_logo.png`. Insert at the top of `CV_JOBS`. Run checks. Report back.

**Example 2 — URL-only update**

User runs: `/update-cv Fingerspitz role ended Nov 2024 — already in CV, just update period`.

You: Find the existing Fingerspitz entry. Update `period` if needed. Recompute `duration`. Save. Report.

**Example 3 — no logo available**

User runs: `/update-cv New gig: Acme BV — SEA — 2025-Present`.

You: WebSearch for Acme BV. No confident match → leave `companyUrl` blank. Try `https://acme.com/favicon.ico` → tiny file → fail. Leave `logo` blank. Insert entry. Report: "No URL/logo found — letter tile will render."
