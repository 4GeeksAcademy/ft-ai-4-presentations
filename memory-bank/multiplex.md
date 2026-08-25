# Multiplex (live follow-along)

Audience devices follow the presenter's slide changes via [reveal-multiplex](https://github.com/reveal/multiplex).

## Decision (2026-08-25)

| Piece | Choice |
| --- | --- |
| Slide SPA host | **GitHub Pages** (not Vercel) |
| Socket.IO relay | **https://multiplex.up.railway.app/** (public hosted server) |
| Self-hosted multiplex | Out of scope unless the public server proves unreliable |

Availability of the Railway demo host is **not guaranteed**.

## Implementation

| Module | Role |
| --- | --- |
| `src/multiplex/resolve.ts` | Role + config; token fetch; student/master link builders |
| `src/components/RevealDeck.tsx` | Sets `window.Reveal`, inits deck, loads socket.io + master/client |
| `src/components/PresenterConsole.tsx` | **Local-only** UI: mint token, copy Pages student link, open master |

Token endpoint returns `{ secret, socketId }`. Pass `socketId` as multiplex **`id`**.

### Presenter console

- URL: local `?presenter=1` (linked from course home on localhost only)
- Hidden / blocked on `*.github.io` and non-local hosts
- Dev/preview proxy: `/__multiplex/token` → Railway `/token` (avoids CORS)
- Student link targets `VITE_PUBLIC_SITE_URL` (default Pages URL), never includes `secret`

### Roles

| Role | When | Secret |
| --- | --- | --- |
| off | No `id` (query or `VITE_MULTIPLEX_ID`) | — |
| client | Has `id`; default on Pages | always `null` |
| master | `role=master` + secret, and **not** on `*.github.io` | query `secret` or `VITE_MULTIPLEX_SECRET` |

Master is forced to client on GitHub Pages even if `role=master` is in the URL.

### Operator steps

1. Visit `https://multiplex.up.railway.app/token`
2. Audience: `https://4geeksacademy.github.io/ft-ai-4-presentations/?id=<socketId>`
3. Presenter: local `?role=master&id=<socketId>&secret=<secret>` or `.env.local` (see `.env.example`)

## Security

- Never bake master `secret` into the Pages build or CI env.
- `VITE_*` values are public if present at build time — keep secrets in `.env.local` only for local master.
- Public relay has no SLA.

## Explicitly not on Pages

- Running our own Socket.IO process
- Speaker-notes **server**
