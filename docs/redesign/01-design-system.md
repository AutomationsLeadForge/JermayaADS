# 01 — Design System (Starting Slice)

Editorial, warm, tactile. Zero neon, zero gradients, zero "AI-look" glow. The feel we're chasing is a single-author magazine column, not a SaaS marketing page. Inspiration: **finder.com** (editorial hierarchy), **wikarta95.com** (personal voice, restrained palette), **titansofindustry.be** (numbered builder energy, brutalist confidence), **dogfluence.com** (scroll-driven warmth, strong social proof strips).

---

## 1. Typography

**Two fonts, both on Google Fonts.**

- **Display / editorial:** `Fraunces` (weights 400, 500, 700 — SOFT axis default, OPSZ variable). Warm, slightly bookish, character without being twee. Chosen over Playfair because Fraunces has an opsz axis that keeps large headlines confident and small captions readable. Fits the `finder.com` editorial feel.
- **UI / body / meta:** `Inter` (weights 400, 500, 600). Neutral workhorse. Reliable at 13–15px for UI chrome, legible at 17–18px for long body. Sans-serif grounding keeps Fraunces from tipping the site into "wedding invite" territory.

Load via `next/font/google` in `src/app/layout.tsx`, subset `latin`, `display: "swap"`, CSS variables `--font-display` (Fraunces) and `--font-sans` (Inter).

### Type scale

| Token | Font | Size (px / rem) | Line-height | Weight | Tracking | Use |
|-------|------|------------------|-------------|--------|----------|-----|
| `display-xl` | Fraunces | 80 / 5rem (clamp 48–80) | 0.95 | 500 | -0.02em | Homepage hero, section openers |
| `display-lg` | Fraunces | 56 / 3.5rem | 1.0 | 500 | -0.015em | Page headers (inner pages) |
| `display-md` | Fraunces | 40 / 2.5rem | 1.1 | 500 | -0.01em | Section titles |
| `display-sm` | Fraunces | 28 / 1.75rem | 1.2 | 500 | 0 | Card titles, callouts |
| `body-lg` | Inter | 19 / 1.1875rem | 1.6 | 400 | 0 | Hero sub, long-form lead |
| `body` | Inter | 17 / 1.0625rem | 1.6 | 400 | 0 | Default paragraphs |
| `body-sm` | Inter | 15 / 0.9375rem | 1.55 | 400 | 0 | Secondary copy |
| `meta` | Inter | 13 / 0.8125rem | 1.4 | 500 | 0.08em, UPPERCASE | Labels, eyebrow, numbered section markers |
| `mono-meta` | Inter (tabular-nums) | 13 / 0.8125rem | 1.4 | 500 | 0.04em | Year labels, metrics (`350K`, `10+`) |

Mobile: clamp display-xl to 48px floor, display-lg to 36px, display-md to 28px. Body sizes stay constant.

---

## 2. Color palette

Warm-neutral paper-and-ink base with one earthy accent and one signal green. No cool gradients, no gray-blue SaaS sludge.

| Token | Hex | Role |
|-------|-----|------|
| `--paper` | `#F5F1EA` | Page background (warm off-white, not true white) |
| `--ink` | `#1A1613` | Primary text, borders, rules (warm near-black) |
| `--ink-muted` | `#6B6156` | Secondary text, captions, meta |
| `--ember` | `#C2410C` | Single accent — CTAs, links, underline pen-stroke. Burnt orange, not neon. |
| `--moss` | `#3F5F3A` | Success / outcome metrics (`+47%`, `350K/mo`). Calm forest green. |
| `--rule` | `#1A1613` at 12% alpha | Hairline rules, card borders |
| `--surface` | `#EBE4D8` | Inset cards, quote blocks, "aside" panels |

Dark mode: defer to post-slice. The editorial treatment is stronger on light for MVP.

### Rules

- Background is **always** `--paper`. Never pure white, never gray.
- Links underline in `--ember` by default (not on hover — always visible). See Motifs §5.
- No shadow-based elevation. Use `--rule` hairlines to separate surfaces, borrowed from `titansofindustry.be`.

---

## 3. Spacing & radius

**Base unit:** 4px. Scale: `0, 4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 192` (Tailwind `0, 1, 2, 3, 4, 6, 8, 12, 16, 24, 32, 48`).

**Section rhythm:**
- Section vertical padding: `96px` desktop, `64px` mobile
- Between sibling blocks within a section: `48px` desktop, `32px` mobile
- Within a card: `24px` (mobile) or `32px` (desktop)

**Container:** max-width `1200px`, side padding `24px` mobile / `48px` desktop. Editorial text columns clamp to `680px` for readability (finder.com pattern).

**Radius scale:**
- `--radius-none`: 0 (the default; sharp corners are on-brand)
- `--radius-sm`: 4px (inputs, inline tags)
- `--radius-md`: 8px (cards, images — used sparingly)
- No pill radii. No `rounded-full` except avatars.

**Borders:** 1px `--rule` on cards and hairlines. 2px `--ink` for emphasized containers (e.g., the hero card, featured work tile).

---

## 4. Motion language

GSAP + ScrollTrigger. Lenis optional for smooth scroll (only enable if it doesn't fight native scroll on trackpads — QA before shipping). All patterns respect `prefers-reduced-motion` and fall back to instant reveal.

Every motion stays under 700ms. Nothing bounces. Nothing parallaxes the hero. Nothing floats.

### Five reusable patterns

1. **`section-enter`** — fade + 16px rise.
   - Duration 0.6s, ease `cubic-bezier(0.22, 0.61, 0.36, 1)` (out-cubic-ish).
   - Stagger child elements 0.08s.
   - Trigger at `top 85%` of viewport, play once.

2. **`headline-reveal`** — per-line clip mask on display headlines.
   - Split by line (not word), each line rises 110% → 0 with `overflow: hidden` parent.
   - Duration 0.7s, ease `cubic-bezier(0.16, 1, 0.3, 1)` (out-expo).
   - Stagger 0.09s between lines. Used once per page on the primary H1.

3. **`marker-draw`** — the ember underline under links and eyebrow labels.
   - CSS `background-size: 0% 2px` → `100% 2px` on mount via GSAP.
   - Duration 0.5s, ease `cubic-bezier(0.65, 0, 0.35, 1)` (in-out-cubic). On hover: replay in reverse then forward.

4. **`ticker-scroll`** — the horizontal strip of tool logos / service words.
   - Infinite linear x-translate, `duration = total_width / 40px_per_second`, ease `none`.
   - Pauses on hover. Borrowed from `dogfluence.com` social-proof strip.

5. **`count-up`** — metric numbers on scroll-in (e.g., `350K`, `10+`, `6 years`).
   - GSAP tween on a proxy object, 1.2s, ease `cubic-bezier(0.25, 0.46, 0.45, 0.94)` (out-quad).
   - Trigger once, `top 80%`. Tabular-nums so width doesn't jitter.

### What we explicitly DO NOT ship

- No parallax backgrounds.
- No mouse-follow cursor blobs.
- No scroll-jacked full-page pinning (one exception: the homepage "services" horizontal scroll, and only if Lenis behaves).
- No section-to-section fade crossfades.

---

## 5. Signature motifs (anti-AI-slop differentiators)

Three concrete visual tics that make this site feel hand-built and single-authored.

1. **Numbered sections with ember rule.** Every major section on every page opens with a left-aligned label: `01 — WORK`, `02 — APPROACH`, rendered in `meta` type, followed by a 48px-wide solid `--ember` horizontal rule directly underneath. Borrowed from **titansofindustry.be**, adapted to our palette. This runs the length of the site and becomes the visual spine.

2. **Ember pen-stroke underlines on links.** All inline links, the active nav item, and emphasized words in body copy carry a 2px `--ember` underline with a 2px offset (`text-underline-offset: 2px`). No hover-reveal trickery — the mark is always there, like a real pen. On hover, `marker-draw` replays. This is the site's handwriting. Inspired by **wikarta95.com**'s confident personal-voice typography.

3. **Tabular-nums metric chips.** Outcome numbers (e.g. `350K monthly visits`, `10+ years`, `+47% ROAS`) render in a boxed chip: 1px `--ink` border, `--surface` fill, 4px radius, `mono-meta` type, `--moss` for the number and `--ink-muted` for the unit label. Clustered in rows on the homepage and on every project card. Borrowed from **finder.com**'s comparison-table aesthetic. These chips are the only place green appears on the site, which keeps them loud.

### Secondary motifs (use sparingly)

- **Hand-drawn arrow SVGs** between CTA and supporting text (one per page max). Inspired by **wikarta95.com**.
- **"Still shipping" ticker** at the top of the footer: horizontal scroll of current projects. Inspired by **dogfluence.com**.

---

## 6. Iconography

- Lucide React stays as the utility icon set (already installed).
- Brand logos (Google Ads, Python, etc.) remain as SVGs in `public/images/services/` — already extracted.
- No emoji in UI. Numbers, labels, and the ember underline do the expressive work.

---

## 7. Accessibility baseline

- All body text hits WCAG AA on `--paper` (`--ink` contrast ratio 15.8:1; `--ink-muted` 5.2:1).
- `--ember` on `--paper` clears AA for large text and UI. For body-size link text, underline carries the affordance; contrast of ember-on-paper is 4.7:1 (AA passes at 4.5:1).
- Focus state: 2px `--ember` outline, 2px offset. Never remove outlines.
- All GSAP reveals wrapped in `gsap.matchMedia` with `(prefers-reduced-motion: reduce)` variant that sets `duration: 0, y: 0, opacity: 1`.
