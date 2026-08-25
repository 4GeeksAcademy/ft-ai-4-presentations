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

One-time repo setup (Settings → Pages):

1. **Source:** GitHub Actions
2. After the first successful workflow, the site is at the Live URL above

Vite `base` is `/ft-ai-4-presentations/` (project site). Change it only if the repo name or custom domain changes.

## Add a lecture

1. Create `src/lectures/<id>.tsx` exporting a component of reveal `<section>` trees.
2. Register it in `src/lectures/index.tsx`.
