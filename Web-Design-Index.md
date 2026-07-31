---
width: 85
date: 2026-05-28
tags: design, reference, web
---

This note was last modified at `= this.file.mtime` (`=round((date(now) - this.file.mtime).days, 2)` days ago).

# Fluent Web — Design Reference

Design reference files for the Fluent web application. Source: `eten-tech-foundation/fluent-web`.

## Files

- [[fluent-web-tokens.css]] — full CSS custom property color system, light + dark mode, radius/spacing tokens
- [[fluent-web-components]] — button and badge variants, typography, component list

## Mockup Files

- `mockup-manager-dashboard.html` — Projects listing page; all rows link to the view project page
- `mockup-view-project.html` — Project detail page with left panel (metadata, progress bar, Project Users) and right panel (chapter table)
- `mockup-org-switcher.html` — Org switcher spec page; toggle between single-org (label only) and multi-org (dropdown) states; logs `orgchange` events
- `components.js` — single source of truth for shared header, user menu, org switcher, and design tokens; all pages load this via `<script src="components.js" defer>`
- `Fluent-White Logo Only.svg` — white wordmark asset used in the header

## Mockup Conventions

- **New pages:** include `<div id="fluent-header"></div>` as the header placeholder and `<script src="components.js" defer>` in `<head>`
- **Header / user menu changes:** edit `components.js` only — all pages pick up changes automatically
- **Reference mockups:** always read files in `ReferenceMockups/` before building a new screen
- **Table rows:** clickable with `cursor: pointer` and hover background; text is black — no blue link color inside table cells
- **Dropdown menus:** background `#dde3ed` (the `--popover` token), matching the real app
- **Font:** Inter variable font (`wght@100..900`), base weight 450 set in `components.js`
- **Design tokens:** primary `#0b50d0`, background `#ffffff`, card `#eaeef5`, border `#c4cad6`, popover `#dde3ed`, radius `0.75rem`

## Screenshots to Add

- Home / dashboard
- Lesson / drafting view
- Navigation / sidebar
- Modals and overlays
