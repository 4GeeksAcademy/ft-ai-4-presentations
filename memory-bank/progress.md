# Progress

## Status

**Phase:** 4 partially done — workflow exists; live deploy waiting on push + Pages Settings.

## What works

- Phases 0–3 locally (scaffold, RevealDeck, welcome lecture, registry)
- `.github/workflows/deploy-pages.yml`
- README documents Live URL and deploy steps
- Memory Bank + kebab-case naming + specs/dev-plan

## What's left

- [x] Phase 0 — Repo hygiene
- [x] Phase 1 — Scaffold
- [x] Phase 2 — Reveal deck core
- [x] Phase 3 — Lecture pattern
- [ ] Phase 4 — GitHub Pages deploy (workflow ✅; Pages Actions source ✅; push + smoke ❌)
- [ ] Phase 5 — Multiplex
- [ ] Phase 6 — Polish (optional)

## Known issues / risks

- Pages Actions source enabled; live site still empty until first green deploy from `main`

## Decision log

| Date | Decision |
| --- | --- |
| 2026-08-25 | Stack / Pages / Railway multiplex / Memory Bank / specs |
| 2026-08-25 | Phases 0–3 implemented; kebab-case bank names |
| 2026-08-25 | Phase 4 workflow: Actions → deploy-pages; URL under 4geeksacademy.github.io |
