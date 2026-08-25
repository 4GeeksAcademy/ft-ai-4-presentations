# FT-AI-4 Presentations

reveal.js + React + TypeScript SPA for online-course lectures, published on GitHub Pages.

**Live:** https://4geeksacademy.github.io/ft-ai-4-presentations/

Agent context: `memory-bank/` · build order: `memory-bank/specs/dev-plan.md`

## Scripts

```bash
npm ci
npm run dev       # http://localhost:5173/ft-ai-4-presentations/
npm run build
npm run preview   # production build with the same base path
```

## Deploy

Pushes to `main` run [.github/workflows/deploy-pages.yml](.github/workflows/deploy-pages.yml): `npm ci` → `npm run build` → deploy `dist/` to GitHub Pages.

Vite `base` is `/ft-ai-4-presentations/` (project site).

## Using the site

- **Course home:** `/ft-ai-4-presentations/` — pick a lecture
- **Lecture:** `?lecture=welcome` or `?lecture=how-to`
- **Speaker notes:** press **S** in a deck (client-side notes plugin; no notes server)
- **PDF:** add `?print-pdf` (reveal.js print view), then browser Print → Save as PDF  
  Example: `?lecture=welcome&print-pdf`
- **Presenter tools (localhost only):** `npm run dev` → **Presenter session (local)** or `?presenter=1`  
  Mint a token, **Copy student link**, then **Open master deck**

## Live follow-along (multiplex)

Relay: [https://multiplex.up.railway.app/](https://multiplex.up.railway.app/) (public; no SLA).

Easiest path: use the local presenter console above. Manual:

1. Open [https://multiplex.up.railway.app/token](https://multiplex.up.railway.app/token) — note `secret` and `socketId` (use `socketId` as `id`).
2. **Audience (Pages client):**  
   `https://4geeksacademy.github.io/ft-ai-4-presentations/?lecture=welcome&id=<socketId>`
3. **Presenter (local master):**  
   `http://localhost:5173/ft-ai-4-presentations/?lecture=welcome&role=master&id=<socketId>&secret=<secret>`

Master mode and the presenter console are **blocked on github.io**.

## Add a lecture

1. Create `src/lectures/<id>.tsx` exporting a component of reveal `<section>` trees (optional `<aside class="notes">`).
2. Register it in `src/lectures/index.tsx` with `title` and `summary`.
