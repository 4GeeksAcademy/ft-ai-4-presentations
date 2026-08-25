# Progress

## Status

**Phase:** 6 implemented locally. Deploy pending commit/push.

## What works

- Phases 0–5 on Pages (pre–Phase 6 deploy)
- Course home + `welcome` / `how-to` lectures
- Speaker notes (S) + `?print-pdf`
- Multiplex still query-driven; preserve `id` when picking lectures

## What's left

- [x] Phase 0–6 (code)
- [ ] Phase 6 — push + live smoke

## Known issues / risks

- Public multiplex relay has no SLA
- Notes window is separate browser popup (reveal default)

## Decision log

| Date | Decision |
| --- | --- |
| 2026-08-25 | Stack / Pages / Railway multiplex / Memory Bank |
| 2026-08-25 | Phases 0–5 live |
| 2026-08-25 | Phase 6: `?lecture=` home, notes plugin, print-pdf |
