# Multiplex (live follow-along)

Optional Memory Bank file. Audience devices follow the presenter's slide changes in real time via [reveal-multiplex](https://github.com/reveal/multiplex).

## Decision (2026-08-25)

| Piece | Choice |
| --- | --- |
| Slide SPA host | **GitHub Pages** (not Vercel) |
| Socket.IO relay | **https://multiplex.up.railway.app/** (public hosted server) |
| Self-hosted multiplex | Out of scope unless the public server proves unreliable |

Availability of the Railway demo host is **not guaranteed**. Acceptable for course experiments; revisit if live sessions become mission-critical.

## Roles

1. **Client (audience)** — public Pages URL. `multiplex.secret` is `null`. Same `id` as the master. Loads `client.js` + Socket.IO from the relay.
2. **Master (presenter)** — preferably **local** (`npm run dev` / `preview`) so the show still works if Pages is slow. Holds the `secret`. Loads `master.js` + Socket.IO from the relay.
3. **Relay** — `https://multiplex.up.railway.app/` broadcasts master events to clients.

Token pair: open `https://multiplex.up.railway.app/token` before a session; use the returned `secret` + `id`.

## Security / Pages rules

- **Never** bake the master `secret` into the GitHub Pages production bundle. Anything on Pages is public.
- Public build defaults to **client** mode (`secret: null`, shared `id` + `url`).
- Master secret: local-only config, env not committed, or a presenter-only URL query the instructor does not share with students.
- Multiplex `url` may be a public `VITE_` constant pointing at the Railway host.

## SPA wiring (when implemented)

- Install / use `reveal-multiplex` patterns: scripts from the relay (`socket.io.js`, `master.js` / `client.js`) plus Reveal `multiplex: { secret, id, url }`.
- Choose role via query (`?role=master`) or a dedicated local entry — default role on Pages is client.
- Init still happens once inside the React Reveal wrapper; multiplex is extra Reveal config + script deps.

## Explicitly not on Pages

- Running our own Socket.IO process
- Speaker-notes **server** (separate concern; in-deck notes only on static host)
