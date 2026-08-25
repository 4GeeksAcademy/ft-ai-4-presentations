# Active Context

## Current focus

**Phase 6 shipping** — course home, notes, print-pdf on `main` after this push.

## Recent changes

- `CourseHome` + `?lecture=` picker (Pages-safe)
- Lectures: `welcome`, `how-to`
- Reveal Notes plugin (S key); sample `<aside class="notes">`
- README: home, notes, PDF, multiplex URLs include `lecture`

## Next steps

1. Commit/push Phase 6
2. Spot-check live home + `?lecture=welcome` + S notes + `?print-pdf`

## Active decisions

- Lecture routing via query param only (no React Router)
- Notes = client plugin, not notes-server
- PDF = reveal built-in `?print-pdf` print view

## Preferences

- Never set `VITE_MULTIPLEX_SECRET` in CI or committed env files.
