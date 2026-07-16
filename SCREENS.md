# Screen inventory & route map

Figma fileKey `EPuCY2IkPSDtgpYEdark5n`. Each line: route → Figma nodeId → frame name.
"overlay" = rendered as in-screen overlay/sheet state, not its own route.

## Flow: onboarding (src/screens/onboarding/)

- `/` and `/onboarding/landing` → 2882:6752 · Landing Page
- `/onboarding/intro` → 2503:6451 · Onboarding · 01 Intro
- `/onboarding/video` → 2506:4853 · 02 Video walkthrough
- `/onboarding/conditions` → 2506:5782 · 03 Your conditions
- `/onboarding/intro-community` → 2759:6491 · Intro 1 — Community
- `/onboarding/intro-vault` → 2759:6546 · Intro 2 — Health Vault
- `/onboarding/intro-ai` → 2759:6601 · Intro 3 — Medically Trained AI
- `/onboarding/tour-welcome` → 2502:4285 · 04 Home — Tour welcome
- `/onboarding/tour-verify` → 2649:6211 · 05 Tour 1/5 — Verify diagnosis
- `/onboarding/tour-add` → 2655:5908 · 06 Tour 2/5 — Tap + to add proof
- `/onboarding/verify-later` → 2657:5530 · 06B If skipped — Verify later
- `/onboarding/verify-add-menu` → 2655:6043 · 07 Verify — Add menu (modal)
- `/onboarding/find-portal` → 2502:4384 · 08 Verify — Find your portal
- `/onboarding/authorize` → 2753:6323 · Connect · Authorize (browser)
- `/onboarding/upload-document` → 2514:4931 · 10 Verify — Upload a document
- `/onboarding/review-confirm` → 2514:5878 · 11 Verify — Review & confirm
- `/onboarding/verified` → 2503:4528 · 12 Diagnosis verified
- `/onboarding/all-set` → 2940:8301 · 16 You're all set (latest version)
- `/onboarding/choose-syncs` → 2693:5667 · 16B Choose what syncs
- `/onboarding/ask-locked` → 2503:4951 · 18 Ask AI — Locked

Flow order: landing → intro → video → conditions → intro-community → intro-vault →
intro-ai → tour-welcome → tour-verify → tour-add (skip ⇒ verify-later) →
verify-add-menu → find-portal → authorize → upload-document → review-confirm →
verified → choose-syncs → all-set → `/home`.

## Flow: home (src/screens/home/)

- `/home` → 2019:2750 · Home (side menu overlay from 2214:4059 / menu frame 2214:4259; opens via avatar "S")
- `/home/customize` → 2453:3936 · Home · Customize

## Flow: vault (src/screens/vault/)

- `/vault` → 2814:6186 · Health Vault · Hub
- `/vault/today` → 2810:6112 · Health Vault · Today
- `/vault/jul-13` → 2810:6293 · Health Vault · Jul 13
- `/vault/labs` → 2814:6334 · Vault · Lab results
- `/vault/medications` → 2815:6264 · Vault · Medications
- `/vault/vitals` → 2815:6329 · Vault · Vitals
- `/settings` → 2830:6312 · Settings

## Flow: timeline (src/screens/timeline/)

- `/timeline` → 2164:68 · Timeline · You (lens switcher: You / Kidney disease / Metformin)
- `/timeline/kidney` → 2193:11 · Timeline · Kidney disease
- `/timeline/metformin` → 2193:299 · Timeline · Metformin
- overlay on timeline → 2197:440 · Timeline · Share sheet
- overlay on timeline → 2486:4245 · Timeline · Filter & sort sheet
- `/timeline/ahead` → 2154:140 · Timeline · Looking ahead
- `/timeline/ask-entry` → 2697:6249 · Ask · Entry ("Ask your timeline")
- `/timeline/ask` → 2196:223 · Timeline · Ask answer
- `/timeline/ask/chat` → 2196:309 · Timeline · Refine in chat
- `/timeline/moment/medication` → 2208:2358 · Moment · Medication
- `/timeline/moment/diagnosis` → 2208:2433 · Moment · Diagnosis
- `/timeline/moment/appointment` → 2208:2496 · Moment · Appointment
- `/timeline/moment/labs` → 2208:2566 · Moment · Labs
- Tour overlays on `/timeline` (auto-shows first visit, dismissable; steps): 2880:6337 (Welcome), 2880:6614 (Lenses), 2880:6891 (Open a moment), 2880:7168 (Ask AI)

## Flow: learn (src/screens/learn/)

- `/learn` → 2225:2659 · Learning · Hub (Modules tab) + 2226:2668 · Hub (Saved tab — same route, tab state)
- `/learn/module` → 2227:2875 · Learning · Module (Simple)
- `/learn/module/step-1` → 2279:3024 · Step 1 (What Stage 3 means)
- `/learn/module/step-2` → 2279:3131 · Step 2 (Your numbers)
- `/learn/module/step-3` → 2279:3257 · Step 3 (Day to day)
- `/learn/module/complete` → 2219:2655 · Module complete
- `/learn/video` → 2299:3132 · Explainer video
- overlay on module screens → 2567:2 · Module · Sources (sheet)
- Tour overlays on `/learn`: 2896:7057 (Welcome), 2896:7267 (Tabs), 2896:7477 (Simple vs Detailed), 2896:7535 (Explainer videos)

## Flow: community (src/screens/community/)

- `/community` → 2873:6445 · Community · Feed (latest version)
- `/community/browse` → 2361:3508 · Browse communities
- `/community/t2d` → 2861:6226 · Community · Type 2 Diabetes
- `/community/answers` → 2870:6584 · Community · Answers (latest version)
- `/community/new` → 2573:5367 · New post (Share)
- `/community/posted` → 2357:3464 · Question posted
- `/community/response` → 2767:7072 · Response detail (latest version)
- `/community/tip` → 2877:6308 · Tip detail
- `/community/evidence` → 2347:3390 · Evidence
- `/community/explore` → 2356:3491 · Explore (read-only)
- overlay → 2766:7427 · Sheet (bottom sheet)

## Flow: add (src/screens/add/) — Upload / Log / Connect (from the navbar "+" button)

- global overlay (all tab screens, via NavBar onAdd) → 2441:3890 · Upload · Add menu
- `/upload` → 2470:4136 · Upload
- `/upload/method` → 2405:3707 · Upload · Choose method
- `/upload/manual` → 2405:3791 · Upload · Manual entry
- `/upload/share` → 2940:8140 · Upload · Share for insights (latest version)
- `/log` → 2398:3786 · Upload · Daily log
- `/log/water` → 2703:5785 · Log · Water (entry)
- `/log/success` → 2703:5840 · Log · Success
- `/log/today` → 2703:5880 · Log · Today
- `/connect` → 2753:6387 · Connect · Hub (latest version)
- `/connect/find` → 2472:5307 · Connect · Find provider
- `/connect/authorize` → 2715:5856 · Connect · Authorize (browser)
- `/connect/connected` → 2713:5896 · Connect · Connected (latest version)

## Flow: ask (src/screens/ask/) — AI Search

- `/ask` → 2165:1472 · Ask · Entry (inside Frame 158 / 2681:5622)
- `/ask/voice` → 2472:4134 · AI · Voice search
- `/ask/thinking` → 2165:1474 · Ask · Thinking (auto-advances to results after ~2s)
- `/ask/results` → 2165:1476 · Results (All) — lens tabs All/Medical/Community/My Data as state: 2165:1478 (Medical), 2165:1480 (Community), 2165:1482 (My Data)
- `/ask/chat` → 2165:1484 · Follow-up chat
- overlay on results/chat → 2165:1486 · Sources sheet
- `/ask/guide` → 2165:1490 · Visual guide
- `/ask/post-question` → 2165:1488 · Post to community (Question)
- `/ask/post-tip` → 2923:7314 · Post to community (Tip)
- Tour overlays on `/ask`: 2932:8822 (Welcome), 2932:8949 (Step 1), 2933:2 (Step 2), 2934:2 (Step 3), 2934:8830 (Step 4), 2934:8962 (Step 5)

## Flow: prep (src/screens/prep/) — Appointment prep

- `/prep` → 2233:3690 · Prep · Before visit
- `/prep/questions` → 2233:3692 · Prep · Edit questions
- `/prep/sent` → 2233:3694 · Prep · Sent to portal
- `/prep/during` → 2233:3696 · Prep · During visit
- `/prep/transcribe` → 2233:3698 · Prep · Transcription on
- `/prep/saved` → 2233:3700 · Prep · Saved to timeline
- `/prep/empty` → 2233:3702 · Prep · Empty state
- `/prep/brief` → 2506:5857 · Prep · In-app view (doctor)
- First-time intro overlay on `/prep`: frames inside section 2929:7333

## Cross-flow links

- NavBar tabs: Home `/home` · Community `/community` · Timeline `/timeline` · Learn `/learn`; "+" opens Add menu overlay (add flow).
- Home appointment card → `/prep`. Home "Ask about your health" pill → `/ask` (mic icon → `/ask/voice`). Learning-module card → `/learn/module`. "Currently Sharing" edit → `/upload/share`. Avatar "S" → side-menu overlay; side menu links to `/vault`, `/settings`, `/connect`, `/home/customize`.
- Moments are linked from timeline entries; Prep "saved" links to `/timeline`.
