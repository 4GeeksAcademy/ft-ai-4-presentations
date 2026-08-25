---
name: memory-bank
description: Maintains this repo's Memory Bank (markdown context in memory-bank/). Reads all bank files at task start, initializes missing files, and updates docs after significant work. Use when the user says initialize memory bank, update memory bank, follow your custom instructions, or when starting work in ft-ai-4-presentations.
---

# Memory Bank

## Naming

All files under `memory-bank/` use **kebab-case** (e.g. `project-brief.md`, `active-context.md`). Do not create camelCase or undelimited names.

## Read first

At the start of a task, read every file in `memory-bank/`:

- `project-brief.md` — scope
- `product-context.md` — why / UX
- `system-patterns.md` — architecture
- `tech-context.md` — stack
- `github-pages.md` — GitHub Pages
- `multiplex.md` — live follow-along / Socket.IO relay
- `active-context.md` — current focus
- `progress.md` — status
- `specs/dev-plan.md` — phased build order (when implementing)

Then continue from `active-context.md`, `progress.md`, and the current phase in `specs/dev-plan.md`.

## Initialize

When the user says **initialize memory bank**:

1. Inventory the repo (README, package.json, source, CI).
2. Create any missing core files listed above (kebab-case names only).
3. Fill them from real code and stated intent. Mark unknowns explicitly.
4. Do not contradict `project-brief.md`. If scope changed, update the brief with the user first.

## Update

When the user says **update memory bank**, or after a milestone:

1. Re-read **all** bank files (not only the ones you expect to edit).
2. Sync architecture and stack files with the code.
3. Always refresh `active-context.md` (focus, recent changes, next steps, open questions).
4. Always refresh `progress.md` (what works, what is left, risks, decision log).
5. Add optional files under `memory-bank/` only when a feature needs a durable home (kebab-case).
6. When completing a `specs/dev-plan.md` phase, check off that phase and refresh `active-context.md` / `progress.md`.

## Specs

- `memory-bank/specs/README.md` — index
- `memory-bank/specs/dev-plan.md` — delivery plan; do not skip phase exit criteria

## This product (do not drop)

- SPA: reveal.js + React + TypeScript
- Online course presentation framework
- Static deploy to GitHub Pages (`base` `/ft-ai-4-presentations/` unless hosting model changes) — not Vercel
- Multiplex relay: `https://multiplex.up.railway.app/` (master secret never on Pages)
