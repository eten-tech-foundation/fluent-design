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
- `header.js` — shared header, nav, org switcher, dark mode, and design tokens; loaded on every page via `<script src="header.js" defer>`
- `settings-dialog.js` — Settings dialog (opened from the header user menu); loaded on every page
- `edit-profile.js` — Edit Profile dialog (opened from the header user menu); loaded on every page
- `create-project.js` — Create Project dialog (new + import flows); only loaded on pages with a "Create Project" entry point (`manager-dashboard.html`, `project-list-translator.html`, `observer-dashboard.html`)
- `Fluent-White Logo Only.svg` — white wordmark asset used in the header

## Mockup Conventions

- **New pages:** include `<div id="fluent-header"></div>` as the header placeholder, then in `<head>`: `<script src="header.js" defer>`, `<script src="settings-dialog.js" defer>`, `<script src="edit-profile.js" defer>`, and (only if the page needs a "Create Project" entry point) `<script src="create-project.js" defer>`
- **Header / nav / org switcher changes:** edit `header.js` only — all pages pick up changes automatically
- **Settings / Edit Profile dialog changes:** edit `settings-dialog.js` / `edit-profile.js` respectively
- **Create Project dialog changes:** edit `create-project.js` — only touches the 3 pages that load it
- **Reference mockups:** always read files in `ReferenceMockups/` before building a new screen
- **Table rows:** clickable with `cursor: pointer` and hover background; text is black — no blue link color inside table cells
- **Dropdown menus:** background `#dde3ed` (the `--popover` token), matching the real app
- **Font:** Inter variable font (`wght@100..900`), base weight 450 set in `header.js`
- **Design tokens:** primary `#0b50d0`, background `#ffffff`, card `#eaeef5`, border `#c4cad6`, popover `#dde3ed`, radius `0.75rem`

## Screenshots to Add

- Home / dashboard
- Lesson / drafting view
- Navigation / sidebar
- Modals and overlays
