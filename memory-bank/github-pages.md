# GitHub Pages Deployment

Additional Memory Bank file. Hosting is a product constraint, not an afterthought.

## Target URL

Project site (org: **4GeeksAcademy**):

`https://4geeksacademy.github.io/ft-ai-4-presentations/`

Vite `base` must stay `/ft-ai-4-presentations/` unless the repo is renamed or a custom domain is added (`base: '/'`).

## Pipeline

Workflow: `.github/workflows/deploy-pages.yml`

1. Push to `main` (or `workflow_dispatch`).
2. Job `build`: checkout → Node 22 → `npm ci` → `npm run build`.
3. Upload `dist/` via `actions/upload-pages-artifact`.
4. Job `deploy`: `actions/deploy-pages`.

Do **not** commit `dist/`.

## One-time repo setup

Settings → Pages → **Source: GitHub Actions** (required before the first deploy succeeds).

## Vite settings that must stay aligned

```ts
// vite.config.ts
base: '/ft-ai-4-presentations/'
```

Local: `npm run preview` serves under the same base (`http://127.0.0.1:4173/ft-ai-4-presentations/`).

## Checklist before calling deploy “done”

- [ ] First Actions run is green
- [ ] `index.html` and hashed assets load (no 404 on `/ft-ai-4-presentations/assets/...`)
- [ ] Slide hash deep links work after refresh
- [ ] reveal.js CSS/fonts load
- [ ] Pages source is GitHub Actions (not branch/`docs`)

## Hosting decision

**Stay on GitHub Pages.** Vercel was considered and rejected. Multiplex: [multiplex.md](multiplex.md).

## What GitHub Pages cannot do

- Host a reveal.js speaker-notes **server**
- Host the multiplex **Socket.IO** process (`https://multiplex.up.railway.app/` instead)
- Protect slides with real auth — never put the multiplex master `secret` in the Pages build
