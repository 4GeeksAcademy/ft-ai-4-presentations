# System Patterns

## Architecture

```text
Vite (static SPA)
  └── React root
        └── RevealDeck (init reveal.js once)
              └── Lecture modules
                    └── Slide components (horizontal / vertical sections)
```

- **Build:** Vite produces a static `dist/` (HTML + hashed JS/CSS + assets).
- **Runtime:** One page. reveal.js owns slide state (URL hash). React owns slide *content*.
- **Host:** GitHub Pages serves `dist/` at a **project site** base path: `/ft-ai-4-presentations/` (assumed until a custom domain or user-site repo is chosen).

## Key technical decisions

| Decision | Choice | Why |
| --- | --- | --- |
| Bundler | Vite | Standard React+TS SPA, first-class `base` for GitHub Pages |
| Routing | reveal.js hashes, not React Router | Pages cannot rewrite `/lecture/2` without hacks; reveal already deep-links |
| Slide authoring | React sections, not markdown-only | Typed components, interactive widgets, consistent layout |
| reveal.js init | Single `useEffect` after mount | Re-init on every render breaks keyboard state and fragments |
| Deploy | GitHub Actions → GitHub Pages | Reproducible `npm ci && npm run build`; no manual `gh-pages` push required |
| Hosting alternative | Stay on Pages (not Vercel) | Static course site is enough; Vercel does not replace the multiplex relay |
| Live sync | reveal-multiplex + `https://multiplex.up.railway.app/` | Pages serves decks; external Socket.IO broadcasts master → clients |

## Multiplex pattern (target)

```text
Presenter (local master + secret)
        │  slideChanged
        ▼
https://multiplex.up.railway.app/   (Socket.IO)
        │  broadcast
        ▼
Audience (GitHub Pages client, secret: null)
```

- Default production role: **client**.
- Master secret never ships in the Pages bundle. See [multiplex.md](multiplex.md).

## Component relationships

- `main.tsx` — React mount only.
- `App.tsx` — loads `defaultLectureId` from the registry into `RevealDeck`.
- `components/RevealDeck.tsx` — `new Reveal(el)` → `initialize()`; `destroy()` on cleanup; depends on `lectureId`.
- `lectures/index.tsx` — registry (`id` → `{ title, render }`).
- `lectures/welcome.tsx` — sample deck sections.
- `theme/deck.css` — course look on top of reveal black theme.

## Critical implementation paths

### Reveal + React lifecycle

1. Render the full slide DOM **before** `Reveal.initialize()`.
2. Initialize once; depend on a stable deck identity (e.g. current lecture id), not on parent re-renders.
3. On lecture change or unmount, `destroy()` then re-init, or rebuild the deck in a way reveal.js supports. Do not leave two Reveal instances.

### GitHub Pages asset paths

- Set Vite `base` to the repo path in production (`/ft-ai-4-presentations/`).
- Use `import.meta.env.BASE_URL` (or bundled imports) for public assets. Never hardcode `/images/...` as site-root paths.
- Prefer `import slideImg from './photo.png'` so the bundler hashes and prefixes correctly.

### Slide structure

Horizontal `<section>` = main narrative. Nested `<section>` = vertical stack (detail, example, aside). Fragments use reveal’s `fragment` class, not ad-hoc React animation, unless a slide is an interactive widget.

## Patterns to avoid

- React Router `BrowserRouter` without a Pages 404 fallback (will 404 on refresh).
- Fetching course content from a private API (Pages is static).
- Putting secrets in client code (includes multiplex master `secret` on Pages).
- Initializing Reveal in the module scope (SSR/HMR and Strict Mode issues).
- Assuming Vercel (or any serverless host) can replace the multiplex Socket.IO server.
