# Project Brief

**Project:** FT-AI-4 Presentations  
**Type:** Single-page application (SPA)  
**Purpose:** A reusable presentation framework for an online course

## What this is

A web-native slide deck system. Course lectures are authored as a React + TypeScript SPA, rendered by [reveal.js](https://revealjs.com/), and published as a static site on GitHub Pages.

This is the framework *and* the course decks that run on it — not a generic slide editor. Content lives in the repo, is versioned with git, and is delivered as a URL.

## Core requirements

1. **SPA presentation runtime** using reveal.js for slide navigation, fragments, vertical stacks, and presenter-friendly keyboard/touch controls.
2. **React + TypeScript** as the authoring layer: each lecture (and each slide where it helps) is a component, not a pile of HTML files.
3. **Static deploy to GitHub Pages** — no server, no runtime backend, no private API keys in the client. The built `dist/` is the whole product.
4. **Course-ready UX:** clear typography, consistent layout, deep-linkable slides, and a structure that scales across multiple lectures/modules.
5. **Git-friendly content:** slides and assets must be reviewable, branchable, and easy for an AI agent to extend without rewriting the deck engine.
6. **Optional live follow-along** via reveal-multiplex: audience on Pages follows a presenter master. Socket.IO relay is external (not hosted on Pages).

## Goals

- Instructors can add a lecture by adding a typed slide module, not by fighting reveal.js config.
- Students open one URL, navigate with keyboard/swipe, and can share a link to a specific slide.
- The same app works locally (`npm run dev`) and on GitHub Pages (project-site base path).
- During live sessions, students can open the client deck and track the instructor's slide position.
- The Memory Bank in this repo is the durable context for future agent sessions.

## Non-goals (unless later promoted)

- A visual WYSIWYG slide editor
- User accounts, comments, or quiz backends
- Server-side rendering or a Node host **of our own** (multiplex uses a third-party Socket.IO server)
- Hosting the slide SPA on Vercel (evaluated; rejected in favor of GitHub Pages)
- Native apps or PDF-first authoring (PDF export may come later as an optional reveal.js feature)

## Source of truth

This file is the scope source of truth. If a request conflicts with it, update this brief first (with the user) and then the rest of the Memory Bank.
