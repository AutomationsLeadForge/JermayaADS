# 03 — Content Outline (First-Draft Copy)

First-draft English copy in Jermaya's voice: direct, Dutch-bluntness translated to English, no fluff. All project entries use real tool names already in `src/lib/content.ts` or generic role/outcome shapes for client work.

---

## Homepage hero

- **Eyebrow:** `01 — HELLO`
- **Headline (3 lines, Fraunces display-xl):**
  > Honest Google Ads.<br />
  > Actually-useful AI.<br />
  > Code that ships.
- **Sub (body-lg, max 60ch):**
  > I'm Jermaya Leijen. Ten years running SEA and automation for agencies and e-commerce. I also build the tools I wish existed.
- **Primary CTA:** `Book a 20-min call →` (links to Calendly)
- **Secondary link:** `Or see what I've built` (anchor to §04 Selected Work)

---

## Homepage "about me" paragraph

Under `02 — WHO`, in `body-lg`, max 60ch per line, left column of a two-column block.

> Based in Tilburg. Ten-plus years in search marketing — started at Overstappen.nl, grew through Searchresult, Max ICT, and Partout, and went freelance full-time as JermayADS. Most of my day is split between Google Ads accounts, Python scripts, and a growing pile of AI tooling. I built ApplePY and OrangePY because the SEO and SEA tools I wanted didn't exist yet. If you need a specialist who'll also tell you when your CPA target is nonsense, that's the job.

**Right column — three `MetricChip`s:**

- `10+` — years in SEA
- `350K` — monthly organic visits across my own portfolio
- `2` — products I built and still ship (ApplePY, OrangePY)

---

## Services tiles (5, numbered, one line each)

Section eyebrow: `03 — WHAT I DO`

| # | Label | One-liner |
|---|-------|-----------|
| 01 | Google Ads | SEA accounts, Performance Max, feed work, and tracking that actually tells you the truth. |
| 02 | AI Engineering | RAG pipelines, LLM content ops, and Python automation that survives contact with production. |
| 03 | Development | Scripts, internal tools, API plumbing, and dashboards — built to last, not to demo. |
| 04 | Consultancy | Channel-wide audits and strategic sparring. I'll push back when your plan is wishful thinking. |
| 05 | Products | My own stack: ApplePY, OrangePY, and the affiliate portfolio — real tools from real problems. |

Each tile ends with a `See [label] →` ember link into the relevant service page (stub routes in this slice).

---

## Homepage Selected Work (3 featured pulls from My Work)

Section eyebrow: `04 — SELECTED WORK`. The three entries flagged `featured: true` below:

1. ApplePY (product)
2. Multi-affiliate portfolio (product)
3. Performance Max Script (dev)

Full cards live on `/my-work`.

---

## My Work — 6 project entries

Each entry maps directly to `WorkProject` in `02-starting-slice.md`. Where the project is a real public tool, it links out. Where the work is under NDA, I label the client as "Confidential e-commerce client" and keep the outcome shape honest.

### 1. ApplePY
- **Category:** Product
- **Role:** Founder, solo engineer
- **Outcome:** `Built` — Python-based SEO automation tool; live at applepy.online
- **Thumbnail:** `/images/hustles/planet.svg`
- **Href:** `https://applepy.online`
- **Featured:** yes

### 2. OrangePY
- **Category:** Product
- **Role:** Founder, solo engineer
- **Outcome:** `Built` — Search Console data tool; live at orangepy.online
- **Thumbnail:** `/images/hustles/bird.svg`
- **Href:** `https://orangepy.online/search-console`
- **Featured:** no

### 3. Affiliate portfolio (3 sites)
- **Category:** Product
- **Role:** Operator, SEO lead
- **Outcome:** `350K/mo` — organic visits across three affiliate sites, built on custom Laravel + programmatic SEO pipeline
- **Thumbnail:** none (no public assets yet)
- **Featured:** yes

### 4. Performance Max Script
- **Category:** Development
- **Role:** Author, maintainer
- **Outcome:** `Open source` — Google Ads Performance Max automation script, public on GitHub
- **Href:** `https://github.com/JermayaL/Performance-Max-Script`
- **Featured:** yes

### 5. Meta Marketing API toolkit
- **Category:** Development
- **Role:** Author
- **Outcome:** `Open source` — Python toolkit for Meta Marketing API pulls, public on GitHub
- **Href:** `https://github.com/JermayaL/Meta-Marketing-API`
- **Featured:** no

### 6. SEA scale-up — confidential e-commerce client
- **Category:** Google Ads
- **Role:** Lead SEA strategist (freelance via JermayADS)
- **Outcome:** `Scaled` — took a mid-market e-commerce account from in-house-run to a performance-first structure over a 12-month engagement. Scope: Performance Max rebuild, feed split, offline conversion tracking, Northbeam attribution.
- **Featured:** no

_(Slots for 6–8 more entries — Programmatic SEO content engine at Max ICT, RAG LLM content pipeline from the blog, a Consultancy sparring engagement, Google Shopping Item ID script (github.com/JermayaL/Google-Shopping-Item-ID), a Searchresult CRO engagement, a Partout digital-strategy retainer — to be drafted in round two.)_

---

## Footer content

### Left column — wordmark + line
- `J—` mark in Fraunces display-md
- Tagline under it (Inter `body-sm`, `--ink-muted`):
  > Freelance. Based in Tilburg. Booking work for Q3 2026.

### Middle column — nav (3 links)
- Work → `/my-work`
- Services → anchor to services grid
- Contact → Calendly

### Right column — contact tiles (reuse `CONTACT_TILES`)
- Calendly
- LinkedIn
- WhatsApp

### Full-width ticker above columns
`Still shipping — ApplePY · OrangePY · JermayADS · Performance Max Script · Meta Marketing API · Affiliate portfolio · ` (looping)

### Legal bar (bottom, Inter `meta` 13px, `--ink-muted`)
- Left: `Jermaya Leijen © 2026`
- Right: `Built in Tilburg. No templates.`

---

## Voice guide (one-pager, applies to all future copy)

- Short sentences. Dutch-direct, not cold.
- Name the tools. `Performance Max`, `Northbeam`, `Semrush API` — not "leading platforms".
- Own the freelance-ness. "I" not "we". No fake team.
- Numbers over adjectives. `350K/mo` beats "a lot of".
- Push back in copy. If a service section can say "I'll tell you when your goal is unrealistic" — it should.
- No em-dashes where a period will do. No trailing ellipses. No exclamation marks except in the ticker.
- British-leaning English (optimise → optimize stays US for web consistency; but no US idioms like "crushing it").
