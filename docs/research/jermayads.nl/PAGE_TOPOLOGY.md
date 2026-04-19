# jermayads.nl — Page Topology

## Target
https://jermayads.nl/ — single-page personal portfolio for Jermaya Leijen, a Dutch freelance SEA (Search Engine Advertising / Google Ads) specialist. Content is 100% Dutch.

## Tech stack (original)
- Framework: Vue 2/3 (SFC `data-v-*` scoped CSS attributes)
- CSS: Bootstrap 5 + hand-written CSS
- Carousels: Swiper.js
- Forms & modals: Bootstrap Modal
- Fonts: Inter Tight (UI), Kanit (display), STRTSHT, Noto Color Emoji
- Booking: Calendly popup widget

## Visual hierarchy (top → bottom)

### Body background
- Dark with a repeating SVG texture (`bg-pattern.svg`): tiny pink/white dots + small grid crosses on `#28242c`-ish base.

### 1. Hero grid (3 cards, desktop 1440px)
`.jml-container` (`max-width: 1280px`, padding `60px 40px`)
→ `.layout-grid` (`grid-template-columns: 1.222fr 1.46fr 1fr`, gap `20px`)

**Column 1 — Profile card (`p-card`)**
- Pink background `#c073a2`, radius 10, shadow
- Card head: target icon + "JERMAYA LEIJEN" (uppercase, 18px) + dots icon (mobile menu symbol)
- Card body:
  - Profile block (dark rounded): profile photo with 4s zoom animation + cycling role title under (Kanit 18/700 uppercase) — cycles through: SR. SEA SPECIALIST, Programmatic SEO, E-commerce, Performance marketing
  - Contact slider block: draggable yellow "CONTACT" button over translucent rail
  - Area block: label "Embrace Automation and Data-Driven Decisions" + 3 tappable switches (SR. SEA SPECIALIST, (PROGRAMMATIC) SEO, DIGITAL MARKETING CONSULTANT) that open a modal/popup with detail text
- Card bottom: 3 yellow buttons (ERVARING, ROADMAP, WAAROM VOOR MIJ) → toggle accordion panels below on desktop, inline accordions on mobile

**Column 2 — Action card (`a-card`) — stack of 3 sub-cards, gap 20**
- **contact-block**: 3 square tiles, each `#34373c` bg with double star icons top+bottom via background-image, a round dark button with image inside; buttons open Calendly / LinkedIn / WhatsApp
- **portfolio-block**: `#34373c` card. Header row: title "PORTFOLIO" + folder icon + prev/next swiper arrows. Below: Swiper carousel of 14 portfolio images (rounded 10)
- **services-block**: `#34373c` card with rhombus decoration bottom-right. Title "DIENSTEN" (services) + icon. Image-container cycles through 23 tool logos in a 30×30 square (one at a time, fading). Body: paragraph + (optional button)

**Column 3 — Info block (`i-block`) — stack of 2 cards, gap 28**
- **sh-card** (`SIDE HUSTLES`):
  - Card-head row: star icon + "SIDE HUSTLES" + dots icon
  - Project block: dark `#1f1b1ea6` with 5 background rhombus decorations. 3 round dark buttons: top = bird (OrangePY), bottom-left = planet (ApplePY), bottom-right = tool (Tooling)
  - list-block: 4 list rows (3 scripts + "Bekijk hier al mijn scripts" with GitHub icon) — each with title + right arrow chevron
- **list-card** (blog teasers): 3 list rows for blog posts

### 2. Desktop accordion (`#accordionDesktop` — hidden until hero button clicked)
Collapses controlled by the 3 buttons (ERVARING, ROADMAP, WAAROM VOOR MIJ) in card 1. Only visible on desktop (`d-lg-block d-none`); mobile has `#accordionMbl` which is interleaved inside card 1 body.

- **ERVARING (experience)**: 2-column grid — left "about" column (label+title+2 paragraphs), right "experience-list" of 6 companies with small logo + role + dates.
- **ROADMAP**: 2-column grid — left roadmap-path-block (SVG path drawing animation, 5 steps), right details-block (text for current step).
- **WAAROM VOOR MIJ**: 2-column grid — left: content-title + big title + 6-bullet check list + "special-note" panel; right: PDF slider (4 PDFs).

### 3. Footer
`.footer` — "JERMAYA LEIJEN © 2026 - All rights reserved". Flex row with horizontal lines on either side.

### 4. Floating nav (`.floating-nav`)
Fixed, `bottom: 60px`, centered. A Bootstrap `.btn-group` with 5 buttons: Home (current page, icon), Cases, Blogs, Audit, Tooling. Background `#252a2e`, hover `#282d31`.

### 5. Calendly floating badge (external)
Loaded from assets.calendly.com — out of scope for the clone beyond a static placeholder.

## Interaction model summary

| Section | Model | Implementation |
|---|---|---|
| Profile role titles | Time-driven cycle (~3s) | JS interval toggling `.hide` class; CSS transition 0.3s scale |
| Profile photo | Infinite CSS animation | `@keyframes zoom-in-zoom-out` 4s ease-out |
| Contact slider | Drag-to-unlock | Custom drag with `top: -5px → 0` press effect |
| Area switches (3 switches) | Click → popup | Bootstrap Modal pattern (custom `.popUpModal`) |
| Hero buttons (Ervaring/Roadmap/Waarom) | Click → collapse accordion | Bootstrap `.collapse` with `data-bs-target` |
| Services tool logos | Time-driven cycle | Same pattern as role titles (absolute stacked imgs with `.hide`) |
| Portfolio carousel | Swiper with prev/next btns | Swiper.js |
| PDF slider | Swiper with prev/next btns | Swiper.js |
| Sh-card link buttons | Hover: rotate(360deg) on img, transformY(2px) on parent | CSS transitions |
| Floating nav | Static fixed (no scroll trigger) | `position: fixed; bottom: 60px` |

## Responsive behavior
- 1199px: minor font-size reductions in p-card header, contact-btn text, area-block labels.
- 991px: grid collapses to single column (`.layout-grid{grid-template-columns:1fr;gap:22px}`), p-card height becomes auto, button container centers.
- 767px: contact/portfolio/services padding reduces, experience card stacks to 1 col.
- 575px: `.jml-container{padding:40px 15px}`, services-img width shrinks.

## Clone scope (this implementation)
- Static clone of the hero grid (3 cards) + footer + floating nav. Desktop-first, responsive to mobile.
- Role-title cycle + services-logo cycle + portfolio swiper: yes (essential to the feel).
- Area-switch popups + hero-button accordions: yes (behavior required).
- Calendly widget: inert image placeholder (button opens external URL in new tab).
- Drag-to-unlock contact slider: visual only; clicking the yellow CONTACT button triggers the contact modal (simplification — matches UX intent).
- ROADMAP SVG path animation: static layout with numbered steps (complex animation simplified).
