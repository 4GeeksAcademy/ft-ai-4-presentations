# Product Context

## Why this exists

Online courses still ship slides as PowerPoint, Google Slides, or PDFs. Those tools fight version control, cannot embed real interactive React, and do not live at a stable course URL. FT-AI-4 Presentations exists so course material is a **web app**: typed, composable, and published like any other static frontend.

## Problems it solves

- **Authoring in git:** slides are code. Diffs, PRs, and branches work.
- **Interactive teaching:** React components can sit on a slide (diagrams, live examples, widgets) instead of screenshots.
- **One shareable URL:** GitHub Pages hosts the course; reveal.js hashes deep-link a slide (`#/2/1`).
- **Consistent pedagogy:** a shared theme, layout, and navigation so lectures feel like one product, not a folder of mismatched decks.

## Who it is for

| Audience | Need |
| --- | --- |
| Students | Fast load, readable slides, keyboard/touch nav, phone-usable, link to “this slide”; optionally follow the live lecture via multiplex client |
| Instructors / authors | Add lectures as modules, preview locally, deploy by pushing to the default branch; present as multiplex master (local) when teaching live |
| Future AI agents | Predictable file layout and Memory Bank so new lectures match existing patterns |

## How it should work

1. Open the GitHub Pages URL (or local dev server).
2. See a course/lecture entry point (title / agenda / lecture picker as the product grows).
3. Move through slides with arrows, space, swipe; vertical stacks for “deeper” material on one topic.
4. Fragments reveal bullets/steps; speaker notes remain an optional instructor aid.
5. Refresh or share the current hash and land on the same slide.
6. **Live session (optional):** instructor runs master locally with a session token; students use the Pages client (`secret: null`) and stay in sync via the shared multiplex relay.

## UX goals

- **Readable first:** high contrast, large type, limited text per slide. This is a lecture, not a document.
- **Reveal.js conventions:** do not invent a custom nav model; students already know deck shortcuts.
- **No broken assets on Pages:** every image, font, and worker must resolve under the repo base path.
- **Offline-unfriendly is OK:** this is a hosted course site, not a PWA (unless later required).
- **Accessible enough:** heading structure, keyboard access (reveal.js), and alt text on teaching images.

## Product principles

- Static and boring infrastructure; expressive slide content.
- Prefer hash-based slide state (native to reveal.js) over `history.pushState` routes — GitHub Pages has no server to rewrite paths.
- Prefer many small lecture modules over one giant slide tree.
