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
- [ ] Smoke: assets 200, CSS loads, hash refresh keeps slide (after first successful deploy)
- [x] README: clone, dev, build, Pages URL

**Exit:** Public URL serves the sample deck. (Pending commit/push + green workflow.)

---

## Phase 5 — Multiplex

- [ ] Client mode default on Pages: `secret: null`, relay URL, session `id`
- [ ] Master mode local only: secret via gitignored `.env.local` or non-shared query
- [ ] Load Socket.IO + master/client scripts from Railway host
- [ ] Operator steps: hit `/token`, set id (and secret for master), open Pages client + local master
- [ ] Spec note: public relay has no SLA

**Exit:** Two browsers stay in sync when master advances slides.

---

## Phase 6 — Polish (only if needed)

- [ ] Course home / lecture picker (if more than one deck ships)
- [ ] In-deck speaker notes (not notes-server)
- [ ] Print / PDF stylesheet (optional)

**Exit:** Usable for a real lecture without framework churn.

---

## Out of scope (this plan)

- Vercel host · self-hosted multiplex · auth · quiz backend · WYSIWYG editor · notes-server

## Order rule

Do not start Phase *N+1* until Phase *N* exit criteria pass. Multiplex (5) can slip after first live teaching date if Phase 4 is enough for v1.
