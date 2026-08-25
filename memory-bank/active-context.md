# Active Context

## Current focus

**Phase 4 in progress:** workflow ready; Pages source set to GitHub Actions. Need **commit/push** then smoke the live URL.

## Recent changes

- Added `.github/workflows/deploy-pages.yml` (Node 22, `npm ci`, build, deploy-pages).
- README: live URL `https://4geeksacademy.github.io/ft-ai-4-presentations/`, deploy section.
- Memory Bank filenames kebab-case; Phases 0–3 complete locally.

## Next steps

1. Commit and push to `main` (includes workflow + app).
2. Confirm workflow green; smoke live site (assets + hash).
3. Phase 5: multiplex.

## Active decisions

- Org remote: `4GeeksAcademy/ft-ai-4-presentations`
- Pages via Actions artifact (not `docs/` / branch deploy)
- Vite `base: '/ft-ai-4-presentations/'`

## Open questions

- Custom domain (none yet)
- Course branding beyond welcome deck
- Multiplex master secret UX (Phase 5)

## Preferences

- Do not mark Phase 4 exit until the public URL works.
- Keep slide components small and lecture-scoped.
