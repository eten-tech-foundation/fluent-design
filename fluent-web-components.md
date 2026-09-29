---
width: 85
date: 2026-05-28
tags: design, reference, web
---

This note was last modified at `= this.file.mtime` (`=round((date(now) - this.file.mtime).days, 2)` days ago).

# Fluent Web — Component Reference

Sourced from `eten-tech-foundation/fluent-web`. Component library: **shadcn/ui** with Tailwind v4.

## Button Variants

All buttons: `rounded-md text-sm font-medium h-10 px-4 py-2` (default size)

| Variant | Background | Text | Notes |
|---|---|---|---|
| default | `#0b50d0` | white | Primary action |
| destructive | `#df0c07` | white | Destructive action |
| outline | white + border | foreground | Secondary action |
| secondary | muted | foreground | Tertiary |
| ghost | transparent | foreground | Icon-adjacent |
| link | transparent | `#0b50d0` | Underline on hover |

Sizes: `sm` (h-9), `default` (h-10), `lg` (h-11), `icon` (h-10 w-10)

## Badge Variants

All badges: `rounded-full px-2.5 py-0.5 text-xs font-semibold`

| Variant | Background | Text |
|---|---|---|
| primary | `#0b50d0` | white |
| secondary | muted | foreground |
| destructive | `#df0c07` | white |
| outline | transparent | foreground |
| accent | `#e0e6f5` | foreground |

## Warning Banner Text

- Body-text warning banners (remove/role-change confirmations, conflict banners, duplicate-project warnings) use a dedicated dark text color, not the shared `--warning-foreground` token.
- Light mode: `#7C2D12` on `#FFF6D6` background (~8.66:1 contrast). Dark mode: `amber-300` on `amber-950/40` (~5.2:1 contrast).
- The shared `--warning`/`--warning-foreground` tokens stay `#e48f06` on `#fff6d6` (light) for small elements like the "Potentially Stalled" badge, where white/orange combinations still pass contrast. Do not reuse `--warning-foreground` for banner body text; it fails WCAG AA (~2.36:1) at 14px against the light warning background.
- In the mockups (`/Fluent/Design/Web/main.css`), this is `--warning-banner-foreground`.

## Available UI Components

accordion, badge, button, card, checkbox, dialog, dropdown-menu, input, label, popover, select, separator, table, tooltip

## Typography

- Font family: **Inter** (all weights, used for sans/serif/mono)
- Base letter spacing: 0em (normal)
