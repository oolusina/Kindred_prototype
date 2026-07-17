# Kindred prototype

Interactive mobile prototype of the **Informed Patient** Figma file — Kindred app flows for laptop and phone.

## Launch

```bash
cd ~/Projects/Kindred-prototype
npm install
npm run dev -- --host 0.0.0.0 --port 5173
```

- Laptop: http://localhost:5173/
- Phone (same Wi‑Fi): http://\<your-mac-ip\>:5173/

The app opens at onboarding. After “You’re all set”, you land on Home. Bottom tabs: Home · Community · Timeline · Learn. The center **+** opens Add.

## Stack

Vite + React 19 + TypeScript + Tailwind CSS v4 + react-router-dom.

## What’s included

Onboarding, Home (side menu, customize), Health Vault & Settings, Timeline (lenses, moments, Ask, tours), Learn (modules, video, tours), Community, Ask AI, Appointment Prep, and Add (upload / daily log / connect).

Design tokens and Figma icons live under `src/index.css` and `src/assets/figma/`. Screen map: `SCREENS.md`. Build rules: `CONVENTIONS.md`.
