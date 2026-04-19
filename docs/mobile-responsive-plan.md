# Mobile Responsive Plan — JermayaOS

## 1. Mobile strategy — D. Hybrid (XP chrome stays, windows become full-screen "apps")

On <=768px, the XP wallpaper, taskbar, and Start menu persist — that is the brand. But the draggable, resize-handled, absolute-positioned window layer becomes a full-screen single-window "app stack." Tapping a desktop icon or a taskbar tab opens that window full-bleed (minus the taskbar); swipe/back-tap returns to the desktop. We keep dragging, resizing, z-stacking disabled on mobile, but the title bar, buttons, menubar, and body all stay — so the visitor still feels the XP metaphor while the primary tasks (read "who am I", scan work, book a call) become first-class, thumb-friendly flows. Strategy A loses to fat fingers on 22px chrome buttons; C throws away the entire gimmick that makes this portfolio memorable; D keeps the charm and gets out of the visitor's way.

## 2. Breakpoint map

| Name       | Range            | Big changes                                                                          |
| ---------- | ---------------- | ------------------------------------------------------------------------------------ |
| Mobile S   | 320 – 479 px     | Full-screen windows, 48px taskbar, icons become 2-col grid, hide Quick Launch, hide clock |
| Mobile L   | 480 – 767 px     | Same as Mobile S; icons become 3-col grid; larger title text                         |
| Tablet     | 768 – 1023 px    | Draggable windows return but constrained; taskbar 40px; desktop icons single column  |
| Desktop    | >=1024 px        | Current behaviour unchanged                                                          |

## 3. Per-component mobile behaviour

- **Video wallpaper (`VideoBackground`)** — stays full-viewport with `object-fit: cover`; `preload="metadata"` on <=768px to save ~5–15MB on cellular; offer `prefers-reduced-motion` still-image fallback.
- **Desktop icon columns (left + right)** — drop `position: absolute` at <=768px; render both columns as a single flex-wrapped 3-column grid centred above the taskbar. Icon glyph shrinks 64→56; label stays at 12px.
- **Window chrome (title bar + buttons)** — buttons grow to 36×36 (from 22×22); title text truncates with ellipsis; double-tap to maximize is removed (windows are always maximized on mobile).
- **Window body** — padding drops from 18/22 to 12/14; `overflow-y: auto` with `-webkit-overflow-scrolling: touch`; safe-area inset respected.
- **Taskbar** — height 36→48, Start button keeps its green shape but icon-only (text "start" hidden <480px); tabs become a horizontally scrollable strip with icon + 1-word title.
- **Start menu** — fullscreen bottom sheet (`width: 100vw; max-height: 80vh`) instead of 300px floater; slide-up animation; backdrop scrim.
- **Quick Launch** — hidden on <=768px (redundant with the full taskbar tab strip and Start menu).
- **Tip bubble** — repositions to above taskbar centre, max-width `calc(100vw - 32px)`; auto-dismiss after 8s on mobile to avoid blocking content.
- **Calendly iframe** — full body width/height minus a 44px sticky "Open in new tab" strip; iframe `min-height: 620px` so the Calendly widget doesn't internally squash.

## 4. Specific CSS changes

- `@media (max-width: 1023px)` — `.xp-window { position: fixed; inset: 0 0 48px 0; width: 100% !important; height: auto !important; border-radius: 0; box-shadow: none; animation: xp-window-slide 200ms ease-out; }`
- `@media (max-width: 1023px)` — `.xp-resize-handle { display: none; }` (no resize on touch)
- `@media (max-width: 1023px)` — `.xp-titlebar { min-height: 44px; font-size: 14px; padding: 6px 8px; }` (iOS HIG 44×44)
- `@media (max-width: 1023px)` — `.xp-btn { width: 36px; height: 36px; font-size: 14px; }` (was 22×22 — unreachable by thumb)
- `@media (max-width: 1023px)` — `.xp-taskbar { height: 48px; }` (Material 48×48)
- `@media (max-width: 479px)` — `.xp-start-button { padding: 0 12px; font-size: 0; gap: 0; }` `.xp-start-button svg { width: 24px; height: 24px; }` (hide the text "start", keep flag)
- `@media (max-width: 767px)` — `.xp-quick-launch { display: none; }`
- `@media (max-width: 479px)` — `.xp-clock { display: none; }`
- `@media (max-width: 767px)` — `.xp-taskbar-tabs { overflow-x: auto; scrollbar-width: none; } .xp-taskbar-tab { min-width: 44px; height: 44px; flex: 0 0 auto; }`
- `@media (max-width: 767px)` — `.xp-startmenu { position: fixed; left: 0; right: 0; bottom: 48px; width: 100vw; max-height: 80vh; border-radius: 10px 10px 0 0; }`
- `@media (max-width: 767px)` — `.xp-startmenu-list button { min-height: 48px; font-size: 14px; padding: 12px 14px; }`
- `@media (max-width: 767px)` — kill absolute positioning on desktop-icon columns; wrap them in a container with `display: grid; grid-template-columns: repeat(3, 1fr); padding: 12px; row-gap: 8px; position: absolute; inset: 12px 12px auto 12px;`
- `@media (max-width: 479px)` — `.xp-desktop-icon { width: auto; font-size: 11px; }` `.xp-icon-pixel { width: 48px; height: 48px; }`
- `@media (max-width: 767px)` — `.xp-window-body { padding: 12px 14px; font-size: 15px; line-height: 1.5; }` (do NOT shrink font — 15px is already the floor for body)
- `@media (max-width: 767px)` — `.xp-h1 { font-size: 26px; margin-bottom: 10px; }` `.xp-h2 { font-size: 18px; }` `.xp-p { font-size: 17px; }`
- `@media (max-width: 767px)` — `.xp-tip { left: 12px; right: 12px; bottom: 60px; width: auto; max-width: none; }`
- `@media (max-width: 767px)` — `.xp-logo-grid { grid-template-columns: repeat(auto-fill, minmax(72px, 1fr)); gap: 6px; }`
- `@media (max-width: 767px)` — `.xp-filelist { grid-template-columns: repeat(auto-fill, minmax(80px, 1fr)); }`

## 5. Per-content-window mobile adjustments

- **WelcomeContent** — no layout change; just inherits smaller padding. Fine as-is.
- **AboutContent** — portrait (`140px` pixel) centres above the text; the implicit single-column grid already works. Centre the `xp-bevel-sunken` portrait container; cap image at `min(140px, 42vw)`.
- **ComputerContent** — the 5-tile service grid already uses `repeat(auto-fill, minmax(96px, 1fr))`; tighten to `minmax(80px, 1fr)` so 3 fit at 360px. The 23-item service-logo grid moves to `minmax(72px, 1fr)` (3 cols @ 375px) with gap 6. Address bar wraps.
- **WorkContent** — this is the biggest change. The `grid-template-columns: minmax(240px, 28%) 1fr` **collapses** to a single column. Project list becomes a horizontal **segmented chip scroller** above the detail pane (or a full-width `<details>` dropdown labelled "Projects (12)"). I recommend: on mobile, show only the detail pane by default; a sticky "< Back to projects" pill reveals the list as a full-screen overlay. This keeps reading focus on one project at a time.
- **ContactContent** — already a vertical flex; only change is increasing touch targets on the "Book / LinkedIn / WhatsApp / Email" links to `min-height: 44px; padding: 12px 0`.
- **CalendlyContent** — header strip reflows: the "Open in new tab" link moves below the title block. Iframe gets `min-height: 620px` on mobile (Calendly's own breakpoint) and `height: calc(100dvh - 48px - 44px - env(safe-area-inset-bottom))` when viewed full-screen.

## 6. Gotchas & don'ts

- **Absolute-positioned icon columns die silently at 375px.** `left: 18` and `right: 18` with `width: 92px` icons leaves ~183px of gap on a 375px phone and the two columns visually merge or overlap the welcome window. Must wrap in a mobile grid container.
- **`Window.onTitleMove` uses `window.innerWidth - 120` as max-X** — on a 375px phone that clamps drag to a 255px rectangle and the window rubber-bands. Solution: short-circuit the drag handler when `matchMedia('(max-width: 1023px)').matches`.
- **`.xp-window-body` is 15px** — do not "scale down further" on mobile. 15–17px is the readable floor; the `.xp-p` monospace (`VT323`) is already visually thin, so keep font-size >=16px to avoid iOS Safari auto-zooming on focus of any input.
- **`100vh` lies on iOS Safari.** The taskbar sits `bottom: 0` over the URL bar when it collapses. Use `100dvh` (dynamic) and `env(safe-area-inset-bottom)` padding on the taskbar, and test in Safari — not just Chrome DevTools.
- **Calendly iframe `allow="camera; microphone"`** triggers an iOS permission prompt on first paint on some iPhones. Strip `camera; microphone` from the allow list on mobile; they're not used by Calendly's booking flow.
- **The video background will cost cellular users 10MB+.** Add `<source media="(min-width: 768px)" ...>` for mp4; on <=767px fall back to a static poster image + CSS gradient. Respect `prefers-reduced-data`.

## 7. Implementation priority (top 5)

1. **Make windows full-screen on <=1023px** (`.xp-window { position: fixed; inset: 0 0 48px 0; width/height 100%; }` + disable resize handle + short-circuit drag). Single biggest visual fix; instantly rescues every window.
2. **Grow all chrome hit areas to 44–48px** (title bar buttons, taskbar height, Start menu rows, desktop icons). Anything smaller is hostile on a phone.
3. **Reflow the desktop icon columns into a single grid container** and kill the `position: absolute; left: 18; right: 18` layout below 1024px.
4. **Collapse WorkContent's 240px sidebar into a full-width project list + detail view toggle** — this is the highest-value content window and currently unusable on a phone.
5. **Convert Start menu to a bottom sheet and hide Quick Launch + "start" text below 480px** — cleans up the 36px taskbar so window tabs have room to breathe.
