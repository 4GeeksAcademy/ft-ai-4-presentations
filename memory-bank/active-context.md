# Active Context

## Current focus

**Phase 5 shipping** — multiplex on `main` / Pages after this push.

## Recent changes

- Multiplex client/master wiring + README / `.env.example`
- Master blocked on `*.github.io`

## Next steps

1. Manual test: token → Pages `?id=` client + local `?role=master&id=&secret=`
2. Commit/push Phase 5 when satisfied
3. Phase 6 polish only if needed

## Active decisions

- Relay: `https://multiplex.up.railway.app/`
- No multiplex when `id` omitted (solo deck)

## Open questions

- Course branding beyond welcome deck

## Preferences

- Never set `VITE_MULTIPLEX_SECRET` in CI or committed env files.
