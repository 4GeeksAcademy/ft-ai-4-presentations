# Active Context

## Current focus

**Presenter console shipping** — local-only student-link helper after this push.

## Recent changes

- `PresenterConsole` — localhost-only; blocked on github.io
- Vite proxy `/__multiplex/token` for token fetch
- `buildStudentLink` / `buildMasterLink` helpers
- `VITE_PUBLIC_SITE_URL` in `.env.example`

## Next steps

- Try `npm run dev` → Presenter session → copy link → open master
- Commit/push when ready

## Active decisions

- Student links always point at Pages public URL
- Presenter tools never useful on github.io

## Preferences

- Never set `VITE_MULTIPLEX_SECRET` in CI or committed env files.
