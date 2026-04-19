# UX Audit — JermayaOS Desktop

## Context
JermayaOS is a single-page personal portfolio for Jermaya Leijen (freelance SEA + AI engineer, Tilburg) rendered as a playable Windows XP recreation: wallpaper, desktop icons, Start menu, taskbar, draggable windows, a "Tip" bubble, and an embedded Calendly iframe. Primary audience is prospective clients/recruiters landing from LinkedIn or referrals; primary tasks are (a) understand what Jermaya does, (b) see his work, (c) book a call or send a message. It is **desktop-first by explicit design** — there are no mobile breakpoints in `globals.css` for `.xp-*` chrome, so viewports under ~900px are out of scope for this audit. Everything here assumes a visitor on >=1280px wide.

## Severity scale
- **P0** — Blocks primary task (can the visitor hire Jermaya? find his work?)
- **P1** — Friction or confusion on common paths
- **P2** — Polish / inconsistency / minor
- **P3** — Nice-to-have / opinionated

## Findings

### P0 — Blockers

- [Heuristic: Recognition / Minimal Cognitive Load] On first paint, 5 windows open simultaneously, overlapping across the screen; visitors can't locate the hiring CTA in the noise and most bodies start scrolled to their tops with no visual hierarchy across windows. **Fix:** open only `welcome` + `contact` by default; make the others cold icons that explicitly fly open when double-clicked. **File:** `src/components/xp/Desktop.tsx:55-62`.
- [Heuristic: Match Between System and Real World] The initial `y=600` and `y=730` coordinates for `work` and `computer` push those windows below a typical 900–1080px viewport, so on a 1440x900 laptop the hiring-critical Services and Selected Work windows are invisible unless the user knows to drag them up from the taskbar. **Fix:** re-tile initial positions to fit within a 1280x800 safe area (e.g. cascade at 40/80/120 offsets) or open them minimized. **File:** `src/components/xp/Desktop.tsx:59-60`.
- [Heuristic: Affordance] Desktop icons require **double-click** to open (`onDoubleClick` on `DesktopIcon`), faithful to XP but a learned pattern most modern web users no longer expect — a single click does nothing, silently. **Fix:** open on single click (or single-tap on trackpad); keep double-click as a bonus. **File:** `src/components/xp/DesktopIcon.tsx:22-25`.

### P1 — Friction

- [Heuristic: Visibility of System Status] `.xp-window-body` forces `font-size: 22px` with `font-family: var(--font-bitmap), "VT323", monospace` — long body copy like `WelcomeContent` and `AboutContent` reads as oversized monospace blocks, not as document text, and wastes vertical space. **Fix:** drop body font to 14–16px Tahoma for prose; keep 22px only for headings and `xp-p` inside Paint/Notepad where the retro effect pays off. **File:** `src/app/globals.css:582-593, 822-828`.
- [Heuristic: Error Prevention] The Maximize button is rendered but disabled with `cursor: not-allowed` — users who genuinely need more room (long work list, Calendly iframe) hit a dead affordance. **Fix:** implement maximize (toggle `w/h` to viewport minus taskbar) or remove the button entirely. **File:** `src/components/xp/Window.tsx:89-98`.
- [Heuristic: Visibility of System Status] Closing the last window leaves the user on a blank desktop with no call to action; `focusedId` becomes null and no hint surfaces. **Fix:** when all windows are closed, auto-restore `welcome` or show a "Double-click an icon to get started" overlay. **File:** `src/components/xp/WindowManager.tsx:79-85`.
- [Heuristic: Consistency] Right-column "shortcuts" (GitHub, LinkedIn, ApplePY, Google Ads) are `<a>` tags that open on **single click**; left-column icons are buttons that open on **double click**. Identical visual pattern, contradictory behavior. **Fix:** unify to single-click everywhere. **File:** `src/components/xp/Desktop.tsx:224-267` vs `src/components/xp/DesktopIcon.tsx:22-25`.
- [Heuristic: Feedback] The NeonArrow pointing at "Connect" uses `pointerEvents: none` and `zIndex: 50`, but the window `z-index` starts at 10+ and increments on every focus, so after a few clicks windows stack above the arrow. The arrow is also the only signposting toward the primary CTA. **Fix:** cap the arrow at `z-index: 9997` (below the taskbar/tip at 9998–9999, above any window). **File:** `src/components/xp/Desktop.tsx:281-289`, `globals.css:607-626`.
- [Heuristic: Help & Documentation] `TipBubble` appears 2.4 s after load in the bottom-right — exactly where the NeonArrow is pointing and where the Calendly icon lives. It overlaps the primary hiring CTA. **Fix:** anchor the tip to bottom-left or delay until scroll/interaction idle >8 s. **File:** `src/components/xp/TipBubble.tsx:17-19`, `globals.css:949-964`.
- [Heuristic: Error Prevention] Dragging: `onPointerMove` clamps `ny >= 0`, which is fine, but allows `ny` up to `window.innerHeight - 80`, meaning a window's title bar can be dragged under the 36 px taskbar and the body then becomes undraggable. **Fix:** clamp `ny` to `window.innerHeight - 36 - titlebarHeight`. **File:** `src/components/xp/Window.tsx:36-40`.
- [Heuristic: Recognition] The Help → "Keyboard shortcuts" action uses a native `alert()`, which breaks the XP illusion and is dismissed with the browser chrome dialog. **Fix:** render as an in-world `AboutDialog`-style window. **File:** `src/components/xp/WindowMenuBar.tsx:176-191`.

### P2 — Polish

- [Heuristic: Consistency] Six menus are rendered on every window but most items are the same (File/Edit/View/Favorites/Tools/Help) regardless of which app is open. Edit menu is entirely disabled on every window. **Fix:** strip Edit for read-only windows; hide File items that don't apply. **File:** `src/components/xp/WindowMenuBar.tsx:110-122`.
- [Heuristic: Aesthetic] The global scanline overlay (`.xp-root::before`) runs at `mix-blend-mode: multiply` with `z-index: 9998`, placing it above windows and reducing body-copy contrast (#000 on #fff loses ~12% luminance uniformly). **Fix:** move the overlay below window `z-index` or opt-in via View → Scanlines default Off. **File:** `src/app/globals.css:1267-1281`.
- [Heuristic: Consistency] Window title bars use a hand-authored `linear-gradient(#0058e6, #3a6ea5, #0058e6)` rather than the `--xp-titlebar-active-*` tokens defined in `.xp-root`. **Fix:** use the vars for single-source styling. **File:** `src/app/globals.css:478-484`.
- [Heuristic: Feedback] `Window` component has `useEffect` that writes `.style.left/.top` after render in addition to React's inline style prop — redundant and can cause a one-frame jitter. **Fix:** drop the `useEffect`; style from props is already applied. **File:** `src/components/xp/Window.tsx:50-54`.
- [Heuristic: A11y / Focus] Start menu, TipBubble, AboutDialog all trap focus loosely (listen for outside click) but none receive an explicit focus on open — screen-reader + keyboard users can't land in them naturally. **Fix:** `ref.current?.querySelector('button')?.focus()` after mount. **File:** `src/components/xp/StartMenu.tsx:44-62`, `WindowMenuBar.tsx:260-264`.
- [Heuristic: A11y] `.xp-desktop-icon` label is white text with a 1 px text-shadow on a dynamic wallpaper — contrast is uneven depending on where a star animation lands. **Fix:** add a subtle `text-shadow: 0 0 4px rgba(0,0,0,0.9)` and/or a semi-transparent black pill behind the label. **File:** `src/app/globals.css:750-768`.
- [Heuristic: A11y] Focused taskbar tab only changes via gradient flip — no visible focus ring for keyboard users. **Fix:** add `:focus-visible { outline: 2px dotted #fff; outline-offset: -3px; }`. **File:** `src/app/globals.css:713-737`.
- [Heuristic: Match] `WorkContent` uses emoji `📁 Projects` inside a pixel-aesthetic tree — breaks the retro illusion. **Fix:** swap for `FolderIcon`. **File:** `src/components/xp/content/WorkContent.tsx:62`.
- [Heuristic: Consistency] `toggleFromTaskbar` re-references stale `windows` via closure in the `setFocusedId` branch, which can race with the `setWindows` update. **Fix:** use a functional setter or compute from the `ws` inside the same update. **File:** `src/components/xp/WindowManager.tsx:106-124`.

### P3 — Nice-to-have

- [Heuristic: Delight] Restore a minimized window from taskbar plays no animation — a 120 ms scale-up from the taskbar tab toward the window origin would sell the illusion.
- [Heuristic: Delight] Add a real "Shut Down" item in the Start menu that fades the screen to a BSOD or "It is now safe to turn off your computer" easter egg.
- [Heuristic: Recognition] Add a persistent small "Hire me" pill in the top-right of the desktop (outside the XP metaphor) for visitors who bounce before grokking the game — classic escape hatch for retro/novelty portfolios.
- [Heuristic: Polish] `WORK_PROJECTS` uses `📁 Projects` emoji; consider a small XP folder-tree chevron instead.
- [Heuristic: Perf] Calendly iframe is pre-opened (`open: true` in INITIAL) just minimized — the iframe still mounts. Set `open: false` and mount on first taskbar/desktop click.

## Top 5 next actions (priority-ordered)

1. Reduce initial open windows to `welcome` + `contact` and re-tile them within a 1280x800 safe area so hiring-critical content is visible without dragging (`Desktop.tsx:55-62`).
2. Make desktop icons open on single click and unify left/right column behavior (`DesktopIcon.tsx:22-25`, `Desktop.tsx:224-276`).
3. Drop `xp-window-body` body font to 14–16 px Tahoma so long copy in Welcome/About/Contact is readable at a glance (`globals.css:582-593, 822-828`).
4. Fix z-index layering so the NeonArrow and TipBubble never collide with the Calendly target icon (`Desktop.tsx:281-289`, `TipBubble.tsx`).
5. Either implement Maximize or remove the button, and wire Help → Keyboard shortcuts into an in-world dialog instead of a native `alert()` (`Window.tsx:89-98`, `WindowMenuBar.tsx:176-191`).
