# Dev Plan

Fast path from empty repo → course deck on GitHub Pages with optional live multiplex.

**Constraints (locked):** Vite + React + TypeScript + reveal.js · Pages `base` `/ft-ai-4-presentations/` · multiplex relay `https://multiplex.up.railway.app/` · master secret never in Pages build.

---

## Phase 0 — Repo hygiene

- [x] `.gitignore` (node_modules, dist, .env*, local master secrets)
- [x] Keep Memory Bank as agent source of truth; human README stays thin until Phase 4

**Exit:** Safe to scaffold without committing junk. ✅

---

## Phase 1 — Scaffold

- [x] Vite React + TS in repo root
- [x] Oxlint + TypeScript strict
- [x] `vite.config.ts`: `base: '/ft-ai-4-presentations/'`
- [x] Confirm `npm run build` / `npm run preview` (assets under base path return 200)

**Exit:** Blank React app builds; preview loads under the project base path. ✅

---

## Phase 2 — Reveal deck core

- [x] Add `reveal.js` (+ CSS theme import via package exports)
- [x] `RevealDeck` wrapper: mount slides DOM → init once → destroy on unmount
- [x] Handle React Strict Mode double-mount cleanly (`cancelled` flag)
- [x] Sample lecture: title, horizontal slides, vertical stack, fragments
- [x] Basic theme tokens in `src/theme/deck.css`

**Exit:** Local keyboard/swipe nav, hash deep links (`#/2`), fragments work. ✅ (verify in browser)

---

## Phase 3 — Lecture pattern

- [x] `src/lectures/` registry (id → module)
- [x] App loads one lecture (`welcome`)
- [x] Document “add a lecture” in README + registry comment

**Exit:** Second lecture can be added by copying one module + registry entry. ✅

---

## Phase 4 — GitHub Pages deploy

- [x] GitHub Actions: `npm ci` → `build` → upload `dist/` → deploy-pages (`.github/workflows/deploy-pages.yml`)
- [x] Enable Pages (Actions source) on the repo — done via API (`build_type: workflow`)
- [x] Smoke: assets 200 after first successful deploy
- [x] README: clone, dev, build, Pages URL

**Exit:** Public URL serves the sample deck. ✅ https://4geeksacademy.github.io/ft-ai-4-presentations/

---

## Phase 5 — Multiplex

- [x] Client mode default on Pages: `secret: null`, relay URL, session `id`
- [x] Master mode local only: secret via gitignored `.env.local` or non-shared query; blocked on github.io
- [x] Load Socket.IO + master/client scripts from Railway host
- [x] Operator steps documented in README + `multiplex.md`
- [x] Spec note: public relay has no SLA

**Exit:** Two browsers stay in sync when master advances slides. (Manual check: local master + Pages/`preview` client with same `id`.)

---

## Phase 6 — Polish

- [x] Course home / lecture picker (`CourseHome` + `?lecture=`)
- [x] Second sample lecture (`how-to`)
- [x] In-deck speaker notes (`reveal.js/plugin/notes` + `<aside class="notes">`; press S)
- [x] Print / PDF via reveal `?print-pdf` (documented)

**Exit:** Usable for a real lecture without framework churn. ✅

---

## Out of scope (this plan)

- Vercel host · self-hosted multiplex · auth · quiz backend · WYSIWYG editor · notes-server

## Order rule

Do not start Phase *N+1* until Phase *N* exit criteria pass. Multiplex (5) can slip after first live teaching date if Phase 4 is enough for v1.
