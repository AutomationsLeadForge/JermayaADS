# 02 — Starting Slice

One sprint. Ship the design system, the homepage end-to-end, and **one** inner page: `My Work`. My Work is picked deliberately — it's the hardest layout (filter + grid + varied card sizes + project data model) and it establishes the pattern every service page will reuse.

---

## In scope

1. Design-system primitives (tokens, typography setup, shared UI components listed below)
2. Homepage (`/`) — full build
3. My Work page (`/my-work`) — full build
4. Shared chrome: header, mobile nav overlay, footer, redirects from the 4 legacy Dutch URLs

## Out of scope (deferred to next sprints — do not build)

- `/google-ads`
- `/ai-engineering`
- `/development`
- `/consultancy`
- `/work-history`
- `/companies`
- Dutch localization
- Blog migration
- CMS integration (content stays in `src/lib/content.ts` / a new `src/lib/redesign-content.ts`)
- Dark mode

---

## Install commands

```bash
npm install gsap @studio-freight/lenis
npm install -D @types/gsap  # if types not bundled (GSAP 3.12+ ships types, check before installing)
```

Fonts are loaded via `next/font/google` — no install needed.

---

## Component inventory (starting slice)

All new work lives under `src/components/redesign/` to keep the existing clone untouched until cutover. File names are PascalCase, single named export.

| Component | Path | Purpose |
|-----------|------|---------|
| `Header` | `src/components/redesign/Header.tsx` | Top nav, logo mark, CTA button, mobile trigger |
| `MobileNavOverlay` | `src/components/redesign/MobileNavOverlay.tsx` | Full-screen nav on mobile, slides in |
| `Footer` | `src/components/redesign/Footer.tsx` | Footer with ticker, contact, legal |
| `SectionLabel` | `src/components/redesign/SectionLabel.tsx` | `01 — LABEL` + ember rule motif |
| `MetricChip` | `src/components/redesign/MetricChip.tsx` | Boxed tabular-nums outcome chip |
| `EmberLink` | `src/components/redesign/EmberLink.tsx` | Inline link with pen-stroke underline |
| `Container` | `src/components/redesign/Container.tsx` | Max-width wrapper with responsive side padding |
| `Hero` | `src/components/redesign/Hero.tsx` | Homepage hero — headline-reveal + CTA + portrait slot |
| `AboutStrip` | `src/components/redesign/AboutStrip.tsx` | Homepage "about me" + portrait + metric chips |
| `ServicesGrid` | `src/components/redesign/ServicesGrid.tsx` | Homepage 5-tile service grid (numbered, no icons) |
| `SelectedWork` | `src/components/redesign/SelectedWork.tsx` | Homepage 3-project teaser row, links to `/my-work` |
| `ToolsTicker` | `src/components/redesign/ToolsTicker.tsx` | Infinite horizontal logo strip (uses `SERVICE_LOGOS`) |
| `ClosingCta` | `src/components/redesign/ClosingCta.tsx` | Homepage + My Work bottom CTA block |
| `WorkHeader` | `src/components/redesign/WorkHeader.tsx` | My Work page header + filter bar |
| `WorkFilterBar` | `src/components/redesign/WorkFilterBar.tsx` | Category chips (All / SEA / AI / Dev / Consultancy / Products) |
| `WorkCard` | `src/components/redesign/WorkCard.tsx` | Single project card — title, category, role, outcome chip |
| `WorkGrid` | `src/components/redesign/WorkGrid.tsx` | Masonry/editorial grid of `WorkCard`s |
| `lib/motion.ts` | `src/lib/motion.ts` | GSAP patterns from design-system §4, exported as hooks |
| `lib/redesign-content.ts` | `src/lib/redesign-content.ts` | English copy for hero, services, projects, footer |

Note: existing `src/components/ui/button.tsx` (shadcn) is reused. `Container` wraps around shadcn's conventions rather than replacing them.

---

## Homepage section breakdown (top to bottom)

1. **Header** — logo mark (`J—` wordmark), nav, "Book a call" CTA.
2. **Hero** — `01 — HELLO`. Three-line display headline ("Honest Google Ads. Actually-useful AI. Code that ships."). Sub-line. Primary CTA + secondary text link. Portrait image right-aligned on desktop, stacked on mobile. `headline-reveal` animation on load.
3. **About strip** — `02 — WHO` eyebrow. Two-column: left is 2–3 sentence bio in `body-lg`, right is a cluster of three `MetricChip`s (`10+ years`, `350K/mo organic visits`, `6 companies scaled`). `section-enter` on scroll.
4. **Services grid** — `03 — WHAT I DO`. 5 numbered tiles (Google Ads, AI Engineering, Development, Consultancy, Products). Each tile: number, label, one-line, `EmberLink` to the relevant page. Hover: tile border tightens to 2px, no motion theatrics.
5. **Selected work** — `04 — SELECTED WORK`. 3 featured project cards pulled from the My Work dataset (flag `featured: true`). Link to `/my-work` via `EmberLink` reading "See all 14 projects →".
6. **Tools ticker** — `05 — TOOLS`. Infinite horizontal strip of logos from `SERVICE_LOGOS` (Google Ads, Python, Semrush, Looker, etc.). `ticker-scroll` animation. Pauses on hover.
7. **Closing CTA** — `06 — LET'S TALK`. Large Fraunces headline, Calendly CTA, three contact tiles (Calendly, LinkedIn, WhatsApp) reusing `CONTACT_TILES` from `content.ts`.
8. **Footer** — "Still shipping" ticker (ApplePY, OrangePY, affiliate sites), three-column link grid, copyright.

---

## My Work page section breakdown

1. **Header** (shared).
2. **Work header** — `01 — WORK`. Page title ("Work I've actually done."), 2-sentence intro, `WorkFilterBar` below (All · SEA · AI · Dev · Consultancy · Products).
3. **Work grid** — editorial masonry. Feature card spans 2 cols, regular cards 1 col on desktop; single column on mobile. Each card: number in corner, category meta, title (Fraunces display-sm), role + outcome `MetricChip`, optional thumbnail. 12–14 entries total.
4. **Closing CTA** (shared component, different copy).
5. **Footer** (shared).

---

## Data model (for My Work)

```ts
// src/lib/redesign-content.ts — types sketch only, no implementation here
type WorkProject = {
  id: string;
  title: string;
  category: "sea" | "ai" | "dev" | "consultancy" | "product";
  role: string;
  outcome: { metric: string; label: string };
  thumbnail?: string;
  href?: string;        // external link if applicable
  featured?: boolean;   // surfaces on homepage
};
```

Seed data comes from `03-content-outline.md` §My Work.

---

## Acceptance criteria

- [ ] Homepage and `/my-work` render on desktop (1440), tablet (768), mobile (375) with no layout breakage.
- [ ] All copy is English and pulled from `src/lib/redesign-content.ts` (no hardcoded strings in components).
- [ ] Fraunces and Inter load via `next/font/google`; no FOUT on refresh.
- [ ] Lighthouse mobile ≥ 90 Performance, ≥ 95 Accessibility, ≥ 100 Best Practices on `/` and `/my-work`.
- [ ] `prefers-reduced-motion: reduce` disables all GSAP reveals; content remains visible.
- [ ] Keyboard nav reaches every interactive element; focus ring is 2px `--ember`.
- [ ] `npm run check` (lint + typecheck + build) passes clean.
