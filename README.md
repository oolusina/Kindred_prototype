# Kindred prototype

Interactive mobile prototype of the **Informed Patient** Figma file — Kindred app flows for laptop and phone.

**Live site:** https://oolusina.github.io/Kindred_prototype/

## Launch (local)

```bash
cd ~/Projects/Kindred-prototype
npm install
npm run dev -- --host 0.0.0.0 --port 5173
```

**Two demo links** (same build, different shell):

| Audience | Local | GitHub Pages |
|----------|--------|----------------|
| **Web / laptop** (framed iPhone) | http://localhost:5173/#/onboarding/landing | https://oolusina.github.io/Kindred_prototype/#/onboarding/landing |
| **Mobile** (full screen, no fake chrome) | http://localhost:5173/#/mobile/onboarding/landing | https://oolusina.github.io/Kindred_prototype/#/mobile/onboarding/landing |

Short mobile entry: `#/mobile` → landing. Once you’re in `/mobile/...`, in-app navigation stays under that prefix.

Phone (same Wi‑Fi): http://\<your-mac-ip\>:5173/

The app opens at onboarding. After “You’re all set”, you land on Home. Bottom tabs: Home · Community · Timeline · Learn. The center **+** opens Add.

## Update the deployed GitHub Pages link

Pushing code to `main` saves your source. It does **not** update the public link by itself.

To refresh https://oolusina.github.io/Kindred_prototype/ after you change the app:

```bash
cd ~/Projects/Kindred-prototype
git push                    # if you have commits to share on main
npm run deploy              # build + publish to the gh-pages branch
```

What `npm run deploy` does:

1. Runs `npm run build` → writes a production site into `dist/`
2. Publishes `dist/` to the **`gh-pages`** branch (what GitHub Pages serves)

Then wait 1–2 minutes and hard-refresh the link. Deep links use the hash router, e.g. `#/home` or `#/onboarding/landing`.

### One-time Pages setting (if the link is blank)

In the GitHub repo: **Settings → Pages → Build and deployment**

- Source: **Deploy from a branch**
- Branch: **`gh-pages`** / folder: **`/` (root)**

Do **not** point Pages at `main` — that serves Vite source HTML and the app will not load.

## What’s `.vite`?

The `.vite/` folder is Vite’s local **dev cache** (pre-bundled dependencies from `npm run dev`). It is not part of the app, not needed for GitHub Pages, and should not be committed. Safe to delete anytime; Vite recreates it on the next `npm run dev`.

Same for `Kindred-prototype.zip` if you see it — a local zip of the project, not used for deploy.

## Stack

Vite + React 19 + TypeScript + Tailwind CSS v4 + react-router-dom.

## What’s included

Onboarding, Home (side menu, customize), Health Vault & Settings, Timeline (lenses, moments, Ask, tours), Learn (modules, video, tours), Community, Ask AI, Appointment Prep, and Add (upload / daily log / connect).

Design tokens and Figma icons live under `src/index.css` and `src/assets/figma/`. Screen map: `SCREENS.md`. Build rules: `CONVENTIONS.md`.
