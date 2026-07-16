# Kindred prototype — build conventions

Interactive prototype of the "Informed Patient" Figma file (fileKey `EPuCY2IkPSDtgpYEdark5n`).
Stack: Vite + React 19 + TypeScript + Tailwind CSS v4 + react-router-dom v7.

## Layout model

- The app is a 390px-wide mobile app. `src/components/PhoneFrame.tsx` handles the
  device frame (full-bleed on phones, centered 390x844 frame on desktop). Screens
  NEVER worry about that — they just render full-size.
- Every screen component fills its container: root element `className="relative flex h-full w-full flex-col …"`.
- Scrollable content goes in a `<div className="app-scroll flex-1 overflow-y-auto">`.
- Do NOT use absolute pixel positioning from the Figma reference code for page layout.
  Convert to flex/stack flow so screens work at any height. Small decorative
  absolute positioning inside cards is fine.

## Design tokens (defined in src/index.css @theme — USE THESE, not raw hex)

- `bg-canvas` #f9f2e4 cream app background · `text-canvas-700` #a9a59b muted-on-dark
- `bg-accent / text-accent` #002b8f deep blue · `accent-50` #eef1fb · `accent-100` #dfe4f6 · `accent-200` #c3cdec · `accent-300` #7a91c5 · `accent-subtle` #22468d (chips on blue)
- `text-ink` #141419 · `ink-700` #404040 · `ink-600` #525252 · `ink-500` #737373 · `ink-400` #a3a3a3 · `ink-300` #d4d4d4 · `ink-200` #e5e5e5 · `ink-100` #f5f5f5
- `bg-card` #ffffff
- `font-sans` (SF Pro on Apple, Inter elsewhere) — body text. `font-serif` (Lora) — large display headings ("Shania", "Good afternoon", H1s).
- Radii: `rounded-card` 18px, `rounded-card-lg` 20px, `rounded-header` 36px, `rounded-nav` 32px.
- Shadows: `shadow-card`, `shadow-nav` (defined in @theme).

## Typography scale (from Figma text styles)

- Overline: 11px semibold tracking-[0.66px] uppercase
- Hero: font-serif 38px medium leading-[1.1]
- H1: font-serif 26px medium leading-[1.18]
- Body: 15px regular leading-[1.42] · Body Strong: 15px font-medium
- Label: 12px leading-[1.3] · Caption: 13px leading-[1.36] · Button: 15px semibold

## Shared components (src/components/) — reuse, never re-implement

- `PhoneFrame.tsx` — app shell (already wired in App.tsx; don't touch)
- `SystemBar.tsx` — iOS status bar (time 9:41 + signal/wifi/battery). Prop `variant: 'light' | 'dark'` (light = cream text for blue/dark headers, dark = ink text).
- `HomeIndicator.tsx` — the bottom home-indicator pill.
- `NavBar.tsx` — bottom tab bar (dark pill, tabs Home/Community/Timeline/Learn + center blue "+" button). Props: `tab` (active tab), `onAdd` optional. Tabs navigate via router. The "+" opens the Add menu overlay.
- `Icon.tsx` — renders downloaded Figma icon assets from `src/assets/figma/` by name.
- `Sheet.tsx` — bottom sheet overlay with scrim, used by "share sheet", "filter & sort", "sources", "add menu" etc.

## Icons & images

- Downloaded Figma assets live in `src/assets/figma/` (svg/png). Import them
  (`import mic from '../../assets/figma/mic.svg'`) or use `<Icon name="mic" />`.
- NEVER hand-draw SVG paths. If an icon asset is missing, fetch it from the Figma
  MCP (get_design_context on that node) and download the asset URL into
  `src/assets/figma/` with a descriptive kebab-case name.
- Check `src/assets/figma/` before downloading — many Material icons (arrow_back,
  chevron_right, check, mic, add, …) are shared across screens.

## Screens & routing

- Screens live in `src/screens/<flow>/<ScreenName>.tsx`, default export.
- Each flow has `src/screens/<flow>/routes.tsx` exporting
  `export const <flow>Routes: RouteObject[]` (react-router `RouteObject`, element JSX).
- `src/App.tsx` composes all flow route arrays. Routes are FLAT paths, e.g.
  `/onboarding/landing`, `/home`, `/timeline`, `/timeline/moment/labs`,
  `/community/post/:id`. Use the paths listed in SCREENS.md — other flows link to
  them by those exact paths.
- Navigation: `useNavigate()` / `<Link>`. Back arrows call `navigate(-1)`.
- Overlays (sheets, modals, tour coach marks) are component state inside the screen,
  not separate routes, unless SCREENS.md says otherwise.

## Interactivity expectations

This is a showcase prototype: every visible button/card/tab should do something
plausible — navigate, toggle local state, open a sheet, or animate. Text inputs
should accept typing. Prefer small `useState` interactions (checkboxes toggle,
segmented controls switch, carousels swipe/scroll) over dead pixels. No backend;
hardcode the Figma content verbatim (names, numbers, dates — e.g. "Shania",
"CKD · Stage 3a · eGFR 48").

## Fidelity

- Follow the Figma design context (get_design_context) for each screen — spacing,
  colors, type sizes, radii. Use the returned screenshot to sanity-check.
- The reference code names fonts "SF Pro" and "Lora": map SF Pro → `font-sans`,
  Lora → `font-serif`.
- Strip all `data-node-id` attributes and Figma CSS-var fallbacks; use tokens.
