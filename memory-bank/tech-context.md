# Tech Context

The app is **scaffolded** (Vite + React + TS + reveal.js). See `src/` and `memory-bank/specs/dev-plan.md`.

## Stack

| Layer | Choice |
| --- | --- |
| Language | TypeScript (strict) |
| UI | React 19 (functional components, hooks) |
| Slides | reveal.js 6 (npm; CSS via `reveal.js/reveal.css`, `reveal.js/theme/*`) |
| Build | Vite 8 |
| Lint | Oxlint |
| Package manager | npm (lockfile committed) |
| Hosting | GitHub Pages (static) — not Vercel |
| CI | GitHub Actions (`.github/workflows/deploy-pages.yml`) |
| Live URL | `https://4geeksacademy.github.io/ft-ai-4-presentations/` |
| Live follow-along | reveal-multiplex via `https://multiplex.up.railway.app/` (`src/multiplex/resolve.ts`) |

## GitHub Pages constraints (hard)

- **Static only.** No Express, no serverless functions, no runtime env vars on the server.
- **Project site URL:** `https://<owner>.github.io/ft-ai-4-presentations/` — Vite `base` must match. A user/org site (`<owner>.github.io`) would use `base: '/'` instead.
- **Client-side paths.** Use relative URLs or `import.meta.env.BASE_URL`.
- **No SPA path rewrites** unless we add the `404.html` copy-of-`index.html` trick. Prefer staying on `index.html` + reveal hashes.
- **HTTPS only** on `*.github.io`. Mixed-content (http assets) will fail.
- **Jekyll:** Pages may run Jekyll on the `docs/` or branch deploy. Prefer **GitHub Actions artifact deploy** of `dist/` so Jekyll never processes the build. If using `docs/`, add `.nojekyll`.
- **Private repos:** GitHub Pages for private repos depends on the org/plan. Assume public course site unless told otherwise.

## Development setup (once scaffolded)

```bash
npm ci
npm run dev      # local Vite
npm run build    # output dist/
npm run preview  # verify production build, including base path
```

Preview must be checked with the same `base` as Pages, or asset 404s will only show in production.

## Tooling expectations

- ESLint + TypeScript; no `any` without a comment.
- Path aliases only if Vite and `tsconfig` stay in sync (`@/` → `src/`).
- Node LTS for Actions (`node-version: 22` or whatever `package.json` engines say — set this at scaffold time).

## Dependencies

- `react`, `react-dom`, `reveal.js`
- `vite`, `@vitejs/plugin-react`, `typescript`, `oxlint`

Planned for live sessions: multiplex client scripts from the Railway host. Optional later: notes, highlight, math, PDF print styles.

## Multiplex

- Relay URL: `https://multiplex.up.railway.app/`
- Token endpoint: `https://multiplex.up.railway.app/token`
- Details and secret hygiene: [multiplex.md](multiplex.md)

## Environment

- **No master secrets in the repo or Pages build.** Public `VITE_` vars are inlined into the client — safe for multiplex `url` / client `id`, not for master `secret`.
- Course content and images live in the repo (or public URLs).

See also: [github-pages.md](github-pages.md) for deploy workflow detail.
