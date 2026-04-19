# 00 — Sitemap

Eight pages. All routes live under the App Router at `src/app/`. English-first (Dutch localization is post-MVP). Each page has exactly one primary CTA so the visitor always knows what to click if the copy lands.

| # | Page | URL | Purpose (one line) | Primary CTA |
|---|------|-----|---------------------|-------------|
| 1 | Homepage | `/` | Who Jermaya is, what he does, why you'd hire him. | **Book a 20-min call** (Calendly) |
| 2 | Google Ads | `/google-ads` | SEA practice: account audits, Performance Max, feed work, tracking. | **Get a free account audit** (form + Calendly) |
| 3 | AI Engineering | `/ai-engineering` | RAG pipelines, LLM content ops, marketing automation with Python. | **Scope an AI project** (Calendly) |
| 4 | Development | `/development` | Dev work — scripts, internal tools, custom dashboards, API plumbing. | **Talk about a build** (Calendly) |
| 5 | Consultancy | `/consultancy` | Strategic sparring, channel-wide audits, growth roadmaps. | **Book a 60-min strategy call** (Calendly) |
| 6 | My Work | `/my-work` | Filterable grid of projects, tools, scripts and outcomes. | **See a specific case** (anchor to detail / LinkedIn DM) |
| 7 | Work History | `/work-history` | Timeline of roles from 2013 to now — agencies, e-commerce, freelance. | **Download CV (PDF)** |
| 8 | Companies | `/companies` | The commercial side: JermayADS, ApplePY, OrangePY, affiliate portfolio. | **Explore a product** (outbound to each brand) |

## Global navigation

- **Primary nav (desktop):** Work, Services (dropdown → Google Ads · AI · Dev · Consultancy), About (dropdown → Work History · Companies), Contact
- **Primary nav (mobile):** full-screen overlay, same hierarchy
- **Persistent footer CTA:** "Not sure where to start? Book 20 min." → Calendly

## Redirects from current Dutch site (handled in `next.config.ts`)

- `/cases` → `/my-work`
- `/tooling` → `/companies#tools`
- `/audit` → `/google-ads#audit`
- `/blog/*` → stays on `jermayads.nl/blog/*` (out of scope for this redesign slice)

## Notes

- Services pages (2–5) share one template with a slot for hero, problem framing, approach, proof, FAQ, CTA. Built once, reused four times.
- `My Work` doubles as the proof library for all service pages — each project is tagged so a service page can pull a filtered subset.
- `Companies` treats ApplePY, OrangePY and the affiliate portfolio as a product showcase, not a humble-brag list.
