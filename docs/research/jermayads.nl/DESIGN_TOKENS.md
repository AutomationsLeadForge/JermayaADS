# jermayads.nl — Design Tokens

## Colors
| Token | Hex | Usage |
|---|---|---|
| primary-pink | `#c073a2` | p-card bg, accent headings, hover links, drop caps |
| primary-pink-hover | `#875172` | switch-block hover |
| yellow | `#ffc72e` | CTA buttons (CONTACT, Ervaring/Roadmap/WaaromVoorMij), icons (target, star) |
| yellow-hover | `#ffc424`, `#ffc21a` | button hover variants |
| yellow-shadow | `#dfb23778` | box-shadow under yellow CTAs (5px offset) |
| gold | `#dfb237` | bootstrap --bs-yellow, check-circle icon fill |
| bg-dark | `#1d1d1d` | inner dark blocks (profile block, form-control, popups) |
| bg-card | `#34373c` | side cards (contact-block, portfolio-block, services-block, sh-card, list-card, experience card) |
| bg-project | `#1f1b1ea6` | project-block (rgba semi-transparent) |
| bg-nav-btn | `#252a2e` | floating-nav button bg |
| bg-nav-btn-hover | `#282d31` | floating-nav button hover |
| red | `#c62727` | close buttons |
| green | `#4cc589`, `#5bad88` | success icons |
| special-note-bg | `#2b2d31` | "Met een stevige portie enthousiasme" block |
| text-white | `#ffffff` | default text |
| text-muted | `#ffffffbf` | nav text (0.75 alpha) |
| text-subtle | `#ffffffb3` | area-block labels (0.7) |
| text-fade | `#ffffffa8` | experience duration (0.66) |
| text-warm-brown | `#392b0499` | contact-btn text (brown on yellow, 0.6) |
| text-warm-brown-deep | `#614a0ccc` | PDF slider btn text |
| text-grey | `#c2c3c5` | special-note paragraph |
| border-on-dark | `#272c30`/`rgba(39,44,48,.39)` | card-head divider in p-card |
| icon-dots | `#34373c` | decorative dots grid in arrow-icon |

## Typography
| Element | Family | Size | Weight | Line-height | Notes |
|---|---|---|---|---|---|
| body | Inter Tight | 14-16px | 400 | ~1.5 | Bootstrap vars |
| p-card head text | Inter Tight | 18px | 500 | — | uppercase |
| profile role text | Kanit | 18px | 700 | — | uppercase, white, text-align:center |
| contact btn | Inter Tight | 18px | 600 | — | `#392b0499`, text-align:center |
| area-block lbl | Inter Tight | 15px | 500 | — | `#ffffffb3` |
| card-bottom btn (Ervaring etc.) | Inter Tight | 14px | 600 | — | `#392b0499` |
| i-block card head text | Inter Tight | 18px | 500 | — | — |
| list .text | Inter Tight | 14px | 400 | 1.35 | 1-line clamp |
| services text | Inter Tight | 14px | 400 | 1.786 | — |
| services lbl | Inter Tight | 18px | 500 | — | — |
| footer copy | Inter Tight | 14px | 400 | — | centered |
| floating-nav btn | Inter Tight | 14px | 400 | — | `#ffffffbf` |
| experience about lbl | Inter Tight | 14px | 500 | — | `#c073a2` |
| experience about title | Inter Tight | 20px | 500 | — | — |
| experience about text | Inter Tight | 14px | 400 | 1.7 | — |
| experience list info text | Inter Tight | 16px | 500 | — | — |
| experience list duration | Inter Tight | 12px | 400 | — | `#ffffffa8` |
| bottom-content title | Inter Tight | 20px | 500 | — | — |
| bottom-content content-title | Inter Tight | 14px | 500 | — | uppercase `#c073a2` |
| list-item text-lbl | Inter Tight | 14px | 400 | — | — |
| special-note title | Inter Tight | 20px | 500 | — | — |
| special-note block | Inter Tight | 14px | 400 | — | `#c2c3c5` |

## Spacing
- Page padding: `60px 40px` desktop, `40px 15px` @ ≤575px
- Grid gap: `20px` desktop, `15px` @ ≤1199px, `22px` @ ≤991px
- Card inner padding patterns:
  - p-card head: `14px`
  - p-card body: `11px 14px`
  - a-card contact-block: `20px 18px`
  - a-card portfolio-block: `18px 20px 14px`
  - a-card services-block: `20px 19px 30px`
  - i-block sh-card: `15px 12px`
  - i-block card-head: `18px 16px`
  - i-block project-block: `27px 14px 35px`
  - i-block list-card: `22px 12px`
  - experience-block card: `24px 18px 40px`
  - roadmap-block card: `50px 40px 80px 45px`
  - bottom-content: `23px 18px`
  - special-note: `13px 20px`

## Radius
- `10px` — main cards (p-card, a-card sub-cards, sh-card, list-card, images in swiper)
- `9px` — area-block, switch-block, btn-slider
- `6px` — CTA btn, form-control, c-card (small contact tiles), list items, card-head inner, popUpModal buttons
- `4px` — drag-block base rail
- `50%` — round buttons (c-card btn, slider arrows, project-block link)

## Shadows
- Card ambient: `0 0 21px #0003` (all main cards)
- Yellow CTA: `0 5px #dfb23778` (5px drop, gold 47% alpha)
- Small yellow CTA: `2px 3px 7px #dfb23778` (Ervaring/Roadmap/Waarom)
- Dark pressable: `0 5px #0000007d` / `0 6px #0000007d` (round dark buttons)
- Pressed state: `0 -3px #0000007d` / `0 -4px #0000007d` (on `:active`)

## Breakpoints (Bootstrap-aligned)
- xs: 0
- sm: 576px
- md: 768px
- lg: 992px
- xl: 1200px
- xxl: 1400px

## Icons (extracted from HTML as inline SVG)
- `TargetIcon` (concentric circles + arrow, `#ffc72e`)
- `DotsGridIcon` (pattern of circles forming a directional icon, `#34373c`, 72% opacity)
- `FolderIcon` (PORTFOLIO header, `#ffc72e`)
- `ToolsIcon` (DIENSTEN header — 2 figures with tools, `#ffc72e`)
- `StarIcon` (SIDE HUSTLES header, `#ffc72e`)
- `RightArrowIcon` (pink chevron, `#c073a2`)
- `GithubIcon` (list item)
- `SliderPrevIcon`, `SliderNextIcon` (white arrow in round button)
- `CheckCircleIcon` (gold, used in WAAROM VOOR MIJ list)
- `HomeIcon` (floating-nav home)

## Animations
- `@keyframes zoom-in-zoom-out` 4s ease-out infinite (profile photo; scale 1 → .85 → 1)
- Role-title cycle: transition `all .3s ease-in-out`, transform + opacity for `.hide` class
- Button press: transition `all .08s ease-in-out`, `transform: translateY(0 → 2 → 4)`
- Swiper default transitions
