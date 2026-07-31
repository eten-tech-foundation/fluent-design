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

## Available UI Components

accordion, badge, button, card, checkbox, dialog, dropdown-menu, input, label, popover, select, separator, table, tooltip

## Typography

- Font family: **Inter** (all weights, used for sans/serif/mono)
- Base letter spacing: 0em (normal)
