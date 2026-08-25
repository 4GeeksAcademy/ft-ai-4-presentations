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

Pages source is **GitHub Actions** (`build_type: workflow`). Already enabled for this repo.

## Checklist before calling deploy “done”

- [x] First Actions run is green (`d76d817` / run 32873172669)
- [x] `index.html` and hashed assets load under `/ft-ai-4-presentations/`
- [ ] Slide hash deep links work after refresh (spot-check in browser)
- [x] reveal.js CSS bundled in production build
- [x] Pages source is GitHub Actions (not branch/`docs`)

## Hosting decision

**Stay on GitHub Pages.** Vercel was considered and rejected. Multiplex: [multiplex.md](multiplex.md).

## What GitHub Pages cannot do

- Host a reveal.js speaker-notes **server**
- Host the multiplex **Socket.IO** process (`https://multiplex.up.railway.app/` instead)
- Protect slides with real auth — never put the multiplex master `secret` in the Pages build
