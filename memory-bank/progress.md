# Progress

## Status

**Phase:** 5 code complete. Awaiting manual two-browser sync check + deploy.

## What works

- Phases 0–4 live on Pages
- Multiplex resolve + RevealDeck script loading (client default; local master)
- Master blocked on GitHub Pages host

## What's left

- [x] Phase 0–4
- [x] Phase 5 — Multiplex (implementation)
- [ ] Phase 5 — Manual sync verification
- [ ] Phase 6 — Polish (optional)

## Known issues / risks

- Public multiplex relay has no SLA
- reveal-multiplex scripts expect global `Reveal` (we assign the deck instance)
- Token JSON uses `socketId`; we map that to config `id`

## Decision log

| Date | Decision |
| --- | --- |
| 2026-08-25 | Stack / Pages / Railway multiplex / Memory Bank |
| 2026-08-25 | Phases 0–4 live |
| 2026-08-25 | Phase 5: query/env multiplex; master never on github.io |
