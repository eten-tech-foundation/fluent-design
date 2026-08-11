// Fluent Mockup — Shared Components
// Edit header, nav, user menu, and design tokens here; all pages pick up changes automatically.

// ── Design tokens + base reset + header CSS ──────────────────────────────────
const SHARED_CSS = `
  :root {
    --background: #ffffff;
    --foreground: #1a1a1a;
    --card: #eaeef5;
    --primary: #0b50d0;
    --primary-hover: #0940a8;
    --muted: #f2f4f8;
    --muted-foreground: #555555;
    --text-disabled: #a0a0a0;
    --popover: #dde3ed;
    --border: #c4cad6;
    --radius: 0.75rem;
    --radius-sm: calc(var(--radius) - 4px);
    --radius-md: calc(var(--radius) - 2px);
    --radius-lg: var(--radius);
    --radius-xl: calc(var(--radius) + 4px);
    --font: 'Inter', ui-sans-serif, system-ui, sans-serif;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: var(--font);
    background: var(--background);
    color: var(--foreground);
    font-size: 16px;
    line-height: 1.5;
    font-weight: 450;
  }

  /* ── Header ── */
  .header {
    background: var(--primary);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 18px;
    height: 56px;
    position: sticky;
    top: 0;
    z-index: 100;
  }

  .header-left  { display: flex; align-items: center; gap: 32px; }
  .header-right { display: flex; align-items: center; gap: 10px; }

  /* ── Org switcher ── */
  .org-switcher { position: relative; }

  .org-label {
    font-size: 14px;
    font-weight: 600;
    color: rgba(255,255,255,0.92);
    letter-spacing: 0.01em;
    user-select: none;
    padding: 0 4px;
  }

  .org-btn {
    display: flex;
    align-items: center;
    gap: 5px;
    background: rgba(255,255,255,0.14);
    border: 1px solid rgba(255,255,255,0.28);
    border-radius: var(--radius-sm);
    padding: 5px 10px 5px 12px;
    font-size: 14px;
    font-weight: 600;
    color: #ffffff;
    cursor: pointer;
    font-family: var(--font);
    transition: background 0.15s;
    white-space: nowrap;
  }
  .org-btn:hover { background: rgba(255,255,255,0.24); }
  .org-btn svg   { flex-shrink: 0; transition: transform 0.15s; }
  .org-btn.open svg { transform: rotate(180deg); }

  .org-dropdown {
    display: none;
    position: absolute;
    top: calc(100% + 8px);
    right: 0;
    background: var(--popover);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    box-shadow: 0 4px 20px rgba(0,0,0,0.15);
    min-width: 240px;
    z-index: 200;
    overflow: hidden;
    padding: 6px 0;
  }
  .org-dropdown.open { display: block; }

  .org-dropdown-header {
    padding: 6px 14px 8px;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--muted-foreground);
  }

  /* Org group — org name with role chips underneath, for orgs with multiple roles */
  .org-dropdown-group { padding: 8px 14px; }
  .org-dropdown-group.active .org-dropdown-org-name { font-weight: 700; }

  .org-dropdown-org-name {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    font-weight: 500;
    color: var(--foreground);
    margin-bottom: 8px;
  }
  .org-role-chips { display: flex; flex-wrap: nowrap; gap: 5px; }

  .org-role-chip {
    padding: 3px 9px;
    border: 1px solid var(--border);
    border-radius: 999px;
    background: var(--background);
    font-size: 11px;
    font-weight: 500;
    color: var(--foreground);
    cursor: pointer;
    font-family: var(--font);
    white-space: nowrap;
  }
  .org-role-chip:hover { background: var(--muted); }
  .org-role-chip.active {
    background: var(--primary);
    border-color: var(--primary);
    color: #fff;
    font-weight: 600;
  }

  .dark .org-btn { background: rgba(255,255,255,0.1); border-color: rgba(255,255,255,0.2); }
  .dark .org-btn:hover { background: rgba(255,255,255,0.18); }
  .dark .org-dropdown { background: var(--popover); border-color: var(--border); }
  .dark .org-role-chip { background: #2a3240; }

  .logo { display: flex; align-items: center; }
  .logo img { height: 52px; width: auto; }

  .hamburger-wrap { position: relative; }

  .hamburger {
    width: 40px; height: 40px;
    background: white;
    border: none;
    border-radius: 10px;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    gap: 4px; cursor: pointer; padding: 0;
  }
  .hamburger span { display: block; width: 20px; height: 3px; background: var(--foreground); border-radius: 3px; }

  /* ── Main menu dropdown ── */
  .main-menu {
    display: none;
    position: absolute;
    top: calc(100% + 8px);
    left: 0;
    background: var(--popover);
    border-radius: var(--radius);
    box-shadow: 0 4px 20px rgba(0,0,0,0.15);
    min-width: 180px;
    z-index: 200;
    overflow: hidden;
    padding: 6px 0;
  }
  .main-menu.open { display: block; }

  .main-menu-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 11px 18px;
    font-size: 14px;
    font-weight: 500;
    color: var(--foreground);
    cursor: pointer;
    border: none;
    background: none;
    width: 100%;
    text-align: left;
    font-family: var(--font);
    text-decoration: none;
  }
  .main-menu-item:hover { background: var(--muted); }

  .user-btn {
    width: 40px; height: 40px;
    background: white;
    border: none;
    border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer;
    position: relative;
  }

  /* ── User menu dropdown ── */
  .user-menu {
    display: none;
    position: absolute;
    top: calc(100% + 8px);
    right: 0;
    background: #dde3ed;
    border: 1px solid var(--border);
    border-radius: var(--radius);
    box-shadow: 0 4px 16px rgba(0,0,0,0.12);
    width: 230px;
    z-index: 200;
    overflow: hidden;
    padding: 4px 0;
  }
  .user-menu.open { display: block; }

  .user-menu-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px 16px;
    font-size: 14px;
    color: var(--foreground);
    cursor: pointer;
    border: none;
    background: none;
    width: 100%;
    text-align: left;
    font-family: var(--font);
    line-height: 1.4;
    font-weight: 500;
  }
  .user-menu-item:hover { background: var(--muted); }

  .user-menu-label {
    padding: 8px 16px;
    font-size: 13px;
    color: var(--muted-foreground);
    font-family: var(--font);
  }

  .user-menu-divider { border: none; border-top: 1px solid var(--border); margin: 4px 0; }

  /* ── Dark mode tokens ── */
  .dark {
    --background: #0d1117;
    --foreground: #e6e6e6;
    --card: #1c222d;
    --primary: #3d7cf2;
    --primary-hover: #336ad6;
    --muted: #202630;
    --muted-foreground: #9da6b5;
    --popover: #2a3240;
    --border: #3d4552;
  }
  .dark body { background: var(--background); color: var(--foreground); }
  .dark .hamburger { background: #2a3240; }
  .dark .hamburger span { background: var(--foreground); }
  .dark .user-btn { background: #2a3240; }
  .dark .user-btn svg { stroke: var(--foreground); }
  .dark .user-menu { background: var(--popover); border-color: var(--border); }
  .dark .settings-dialog { background: #1e2533; }

  /* ── Settings dialog ── */
  .settings-overlay {
    display: none;
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.35);
    z-index: 500;
    align-items: center;
    justify-content: center;
  }
  .settings-overlay.open {
    display: flex;
  }

  .settings-dialog {
    background: #e8ecf3;
    border-radius: 14px;
    width: 480px;
    max-width: calc(100vw - 32px);
    padding: 28px 32px 24px;
    position: relative;
    box-shadow: 0 8px 40px rgba(0,0,0,0.18);
    font-family: var(--font);
  }

  .settings-dialog h2 {
    font-size: 22px;
    font-weight: 700;
    color: var(--foreground);
    margin-bottom: 24px;
  }

  .settings-close {
    position: absolute;
    top: 20px;
    right: 20px;
    background: none;
    border: none;
    cursor: pointer;
    color: var(--foreground);
    padding: 4px;
    line-height: 1;
    font-size: 20px;
    font-family: var(--font);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .settings-close:hover { opacity: 0.6; }

  .settings-row {
    display: flex;
    align-items: center;
    gap: 14px;
    margin-bottom: 14px;
    border: 1.5px solid var(--primary);
    border-radius: var(--radius);
    padding: 12px 16px;
  }
  .settings-row svg { flex-shrink: 0; color: var(--foreground); }

  .settings-row-label {
    font-size: 15px;
    font-weight: 500;
    color: var(--foreground);
    flex: 1;
  }

  /* Segmented control */
  .seg-control {
    display: flex;
    border: 2px solid var(--primary);
    border-radius: 999px;
    overflow: hidden;
    background: transparent;
  }
  .seg-control button {
    padding: 4px 18px;
    font-size: 14px;
    font-weight: 600;
    border: none;
    cursor: pointer;
    background: transparent;
    color: var(--primary);
    font-family: var(--font);
    transition: background 0.15s, color 0.15s;
  }
  .seg-control button.active {
    background: var(--primary);
    color: #fff;
  }

  /* Toggle switch */
  .toggle-wrap {
    display: flex;
    align-items: center;
    gap: 14px;
  }
  .toggle {
    position: relative;
    width: 48px;
    height: 28px;
    flex-shrink: 0;
  }
  .toggle input { opacity: 0; width: 0; height: 0; position: absolute; }
  .toggle-track {
    position: absolute;
    inset: 0;
    background: var(--border);
    border-radius: 999px;
    cursor: pointer;
    transition: background 0.2s;
  }
  .toggle input:checked + .toggle-track { background: var(--primary); }
  .toggle-track::after {
    content: '';
    position: absolute;
    top: 3px;
    left: 3px;
    width: 22px;
    height: 22px;
    background: #fff;
    border-radius: 50%;
    transition: transform 0.2s;
    box-shadow: 0 1px 4px rgba(0,0,0,0.2);
  }
  .toggle input:checked + .toggle-track::after { transform: translateX(20px); }

  .toggle-label {
    font-size: 15px;
    font-weight: 700;
    color: var(--foreground);
  }

  /* Expandable section */
  .settings-expand {
    border-top: 1px solid var(--border);
    margin-bottom: 20px;
  }
  .settings-expand-btn {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: none;
    border: none;
    cursor: pointer;
    padding: 16px 0;
    font-size: 15px;
    font-weight: 700;
    color: var(--foreground);
    font-family: var(--font);
    text-align: left;
  }
  .settings-expand-btn:hover { opacity: 0.75; }
  .settings-expand-chevron {
    transition: transform 0.2s;
    flex-shrink: 0;
  }
  .settings-expand-btn.open .settings-expand-chevron { transform: rotate(180deg); }
  .settings-expand-body {
    display: none;
    padding-bottom: 16px;
    font-size: 14px;
    color: var(--muted-foreground);
    line-height: 1.6;
  }
  .settings-expand-body.open { display: block; }

  /* Footer */
  .settings-footer {
    font-size: 13px;
    color: var(--foreground);
    border-top: 1px solid var(--border);
    padding-top: 16px;
  }
  .settings-footer a {
    color: var(--primary);
    text-decoration: none;
  }
  .settings-footer a:hover { text-decoration: underline; }

  /* Divider between settings sections */
  .settings-divider {
    border: none;
    border-top: 1px solid var(--border);
    margin: 6px 0 14px;
  }

  /* Org switcher in user menu */
  .um-org-trigger {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 10px 16px;
    font-size: 14px;
    font-weight: 500;
    color: var(--foreground);
    cursor: pointer;
    background: none;
    border: none;
    width: 100%;
    text-align: left;
    font-family: var(--font);
  }
  .um-org-trigger:hover { background: var(--muted); }
  .um-org-trigger-left { display: flex; align-items: center; gap: 12px; min-width: 0; overflow: hidden; }
  .um-org-name { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .um-org-chevron { flex-shrink: 0; transition: transform 0.2s; }
  .um-org-chevron.open { transform: rotate(180deg); }
  .um-org-dropdown-body {
    display: none;
    background: var(--background);
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
    padding: 4px 0;
  }
  .um-org-dropdown-body.open { display: block; }

  /* ── Edit Profile dialog ── */
  .ep-dialog {
    background: #e8ecf3;
    border-radius: 14px;
    width: 500px;
    max-width: calc(100vw - 32px);
    padding: 28px 32px 28px;
    position: relative;
    box-shadow: 0 8px 40px rgba(0,0,0,0.18);
    font-family: var(--font);
  }
  .dark .ep-dialog { background: #1e2533; }

  .ep-dialog h2 {
    font-size: 20px;
    font-weight: 700;
    color: var(--foreground);
    margin-bottom: 24px;
  }

  .ep-close {
    position: absolute;
    top: 20px;
    right: 20px;
    background: none;
    border: none;
    cursor: pointer;
    color: var(--foreground);
    padding: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .ep-close:hover { opacity: 0.6; }

  .ep-fields { display: grid; gap: 18px; margin-bottom: 24px; }

  .ep-field { display: grid; gap: 6px; }

  .ep-label {
    font-size: 13px;
    font-weight: 600;
    color: var(--foreground);
  }
  .ep-label .ep-required { color: #e53e3e; margin-right: 2px; }

  .ep-input {
    width: 100%;
    padding: 8px 12px;
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    font-size: 14px;
    font-family: var(--font);
    background: #fff;
    color: var(--foreground);
    outline: none;
    transition: border-color 0.15s;
  }
  .ep-input:focus { border-color: var(--primary); box-shadow: 0 0 0 2px rgba(11,80,208,0.15); }
  .ep-input:disabled { background: var(--muted); color: var(--muted-foreground); cursor: not-allowed; }
  .dark .ep-input { background: #2a3240; border-color: var(--border); color: var(--foreground); }
  .dark .ep-input:disabled { background: #1c222d; }

  .ep-helper { font-size: 12px; color: var(--muted-foreground); }

  .ep-footer {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    padding-top: 4px;
  }

  .ep-btn {
    padding: 8px 20px;
    border-radius: var(--radius-sm);
    font-size: 14px;
    font-weight: 600;
    font-family: var(--font);
    cursor: pointer;
    border: none;
    transition: background 0.15s, opacity 0.15s;
  }
  .ep-btn-save {
    background: var(--primary);
    color: #fff;
  }
  .ep-btn-save:hover { background: var(--primary-hover); }
  .ep-btn-save:disabled { opacity: 0.45; cursor: not-allowed; }

  /* ── Info tooltip ── */
  .cp-label-row { display: flex; align-items: center; gap: 6px; }
  .cp-tooltip-wrap { position: relative; display: inline-flex; align-items: center; }
  .cp-tooltip-icon { color: var(--muted-foreground); cursor: default; display: flex; line-height: 1; }
  .cp-tooltip-icon:hover { color: var(--foreground); }
  .cp-tooltip-box {
    display: none;
    position: absolute;
    bottom: calc(100% + 8px);
    left: 50%;
    transform: translateX(-50%);
    background: var(--popover);
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    padding: 11px 13px;
    font-size: 13px;
    font-weight: 450;
    line-height: 1.55;
    color: var(--foreground);
    width: 280px;
    box-shadow: 0 4px 18px rgba(0,0,0,0.14);
    z-index: 30;
    white-space: normal;
    pointer-events: none;
  }
  .cp-tooltip-wrap:hover .cp-tooltip-box { display: block; }

  /* ── Create Project dialog ── */
  .cp-dialog {
    background: #e8ecf3;
    border-radius: 14px;
    width: 520px;
    max-width: calc(100vw - 32px);
    max-height: calc(100vh - 48px);
    overflow-y: auto;
    padding: 28px 32px 28px;
    position: relative;
    box-shadow: 0 8px 40px rgba(0,0,0,0.18);
    font-family: var(--font);
  }
  .dark .cp-dialog { background: #1e2533; }

  .cp-dialog h2 {
    font-size: 20px;
    font-weight: 700;
    color: var(--foreground);
    margin-bottom: 24px;
  }

  .cp-close {
    position: absolute;
    top: 20px;
    right: 20px;
    background: none;
    border: none;
    cursor: pointer;
    color: var(--foreground);
    padding: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .cp-close:hover { opacity: 0.6; }

  .cp-fields { display: grid; gap: 18px; margin-bottom: 24px; }
  .cp-field { display: grid; gap: 6px; }

  .cp-books-wrap { position: relative; }

  .cp-books-trigger {
    width: 100%;
    padding: 8px 12px;
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    font-size: 14px;
    font-family: var(--font);
    background: #fff;
    color: var(--foreground);
    text-align: left;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    transition: border-color 0.15s;
  }
  .cp-books-trigger:disabled { background: var(--muted); color: var(--muted-foreground); cursor: not-allowed; }
  .cp-books-trigger:not(:disabled):hover { border-color: var(--primary); }
  .dark .cp-books-trigger { background: #2a3240; border-color: var(--border); color: var(--foreground); }
  .dark .cp-books-trigger:disabled { background: #1c222d; }

  .cp-books-dropdown {
    display: none;
    position: absolute;
    top: calc(100% + 4px);
    left: 0; right: 0;
    background: #fff;
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    box-shadow: 0 4px 16px rgba(0,0,0,0.12);
    max-height: 200px;
    overflow-y: auto;
    z-index: 20;
  }
  .cp-books-dropdown.open { display: block; }
  .dark .cp-books-dropdown { background: #2a3240; border-color: var(--border); }

  .cp-book-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px 14px;
    font-size: 14px;
    cursor: pointer;
    color: var(--foreground);
  }
  .cp-book-item:hover { background: var(--muted); }
  .dark .cp-book-item:hover { background: #333c4c; }
  .cp-book-item input[type=checkbox] { accent-color: var(--primary); width: 15px; height: 15px; cursor: pointer; flex-shrink: 0; }

  /* ── Combined language/Bible search ── */
  .cp-search-wrap { position: relative; }

  .cp-search-results {
    display: none;
    position: absolute;
    top: calc(100% + 4px);
    left: 0; right: 0;
    background: #fff;
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    box-shadow: 0 4px 16px rgba(0,0,0,0.12);
    max-height: 280px;
    overflow-y: auto;
    z-index: 25;
  }
  .cp-search-results.open { display: block; }
  .dark .cp-search-results { background: #2a3240; border-color: var(--border); }

  .cp-search-group-label {
    padding: 7px 14px 5px;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--muted-foreground);
    background: var(--muted);
    position: sticky;
    top: 0;
  }
  .dark .cp-search-group-label { background: #232b39; }

  .cp-search-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    padding: 9px 14px;
    cursor: pointer;
  }
  .cp-search-item:hover { background: var(--muted); }
  .dark .cp-search-item:hover { background: #333c4c; }

  .cp-search-item-text { display: flex; flex-direction: column; gap: 1px; min-width: 0; }
  .cp-search-item-main { font-size: 14px; color: var(--foreground); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .cp-search-item-sub { font-size: 12px; color: var(--muted-foreground); }

  .cp-search-back {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 9px 14px;
    font-size: 13px;
    font-weight: 600;
    color: var(--primary);
    cursor: pointer;
    border-bottom: 1px solid var(--border);
  }
  .cp-search-back:hover { background: var(--muted); }

  .cp-search-empty {
    padding: 16px 14px;
    font-size: 13px;
    color: var(--muted-foreground);
    line-height: 1.5;
  }

  .cp-search-provider {
    flex-shrink: 0;
    display: inline-flex;
    align-items: center;
    padding: 2px 8px;
    border-radius: 9999px;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.03em;
  }
  .cp-search-provider.dbl        { background: #dbe8ff; color: #0b50d0; }
  .cp-search-provider.aquifer    { background: #f3e2ff; color: #7c1fd6; }
  .cp-search-provider.youversion { background: #dff5e3; color: #0f7a35; }

  .cp-selected-chip {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    padding: 9px 12px;
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    background: #fff;
    font-size: 14px;
  }
  .dark .cp-selected-chip { background: #2a3240; border-color: var(--border); }
  .cp-selected-chip-text strong { font-weight: 600; }
  .cp-selected-chip-sub { font-size: 12px; color: var(--muted-foreground); margin-top: 1px; }
  .cp-selected-chip-clear {
    background: none;
    border: none;
    cursor: pointer;
    color: var(--muted-foreground);
    padding: 3px;
    display: flex;
    flex-shrink: 0;
  }
  .cp-selected-chip-clear:hover { color: var(--foreground); }

  .cp-footer { display: flex; justify-content: flex-end; }
  .cp-footer-split { justify-content: space-between; align-items: center; gap: 12px; }
  .cp-footer-status { font-size: 13px; color: #0f7a35; line-height: 1.4; }
  .dark .cp-footer-status { color: #7fd39d; }

  .cp-readonly-field {
    padding: 8px 12px;
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    font-size: 14px;
    background: var(--muted);
    color: var(--foreground);
  }

  .cp-imp-file-row {
    font-size: 13px;
    color: var(--muted-foreground);
    margin-bottom: -4px;
  }
  .cp-btn-create {
    padding: 8px 20px;
    border-radius: var(--radius-sm);
    font-size: 14px;
    font-weight: 600;
    font-family: var(--font);
    cursor: pointer;
    border: none;
    background: var(--primary);
    color: #fff;
    transition: background 0.15s, opacity 0.15s;
  }
  .cp-btn-create:hover { background: var(--primary-hover); }
  .cp-btn-create:disabled { opacity: 0.45; cursor: not-allowed; }

  /* ── Create Project tabs ── */
  .cp-tabs {
    display: flex;
    gap: 4px;
    border-bottom: 1px solid var(--border);
    margin-bottom: 22px;
  }
  .cp-tab {
    background: none;
    border: none;
    padding: 8px 4px 10px;
    margin-right: 20px;
    font-size: 14px;
    font-weight: 600;
    font-family: var(--font);
    color: var(--muted-foreground);
    cursor: pointer;
    border-bottom: 2px solid transparent;
    transition: color 0.15s, border-color 0.15s;
  }
  .cp-tab:hover { color: var(--foreground); }
  .cp-tab.active { color: var(--primary); border-bottom-color: var(--primary); }

  /* ── Existing data tab: Scripture Burrito upload ── */
  .cp-sb-dropzone {
    border: 2px dashed var(--border);
    border-radius: var(--radius-sm);
    padding: 32px 20px;
    text-align: center;
    cursor: pointer;
    background: #fff;
    transition: border-color 0.15s, background 0.15s;
  }
  .cp-sb-dropzone:hover, .cp-sb-dropzone.drag { border-color: var(--primary); background: var(--muted); }
  .dark .cp-sb-dropzone { background: #2a3240; }
  .cp-sb-dropzone svg { color: var(--muted-foreground); margin-bottom: 8px; }
  .cp-sb-upload-text { font-size: 14px; color: var(--foreground); line-height: 1.5; }
  .cp-sb-upload-text strong { font-weight: 600; }
  .cp-sb-upload-sub { font-size: 12px; color: var(--muted-foreground); margin-top: 10px; }

  .cp-sb-select-btn {
    margin-top: 14px;
    padding: 7px 16px;
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    font-size: 13px;
    font-weight: 600;
    font-family: var(--font);
    background: #fff;
    color: var(--foreground);
    cursor: pointer;
    transition: border-color 0.15s, background 0.15s;
  }
  .cp-sb-select-btn:hover { border-color: var(--primary); color: var(--primary); }
  .dark .cp-sb-select-btn { background: #2a3240; }

  .cp-sb-filename {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 14px;
    padding: 9px 12px;
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    background: #fff;
    font-size: 13px;
    color: var(--foreground);
  }
  .dark .cp-sb-filename { background: #2a3240; }

  .cp-sb-error {
    margin-top: 14px;
    padding: 10px 14px;
    border-radius: var(--radius-sm);
    font-size: 13px;
    line-height: 1.5;
    background: #fde8e8; color: #b91c1c; border: 1px solid #f5b5b5;
  }
  .dark .cp-sb-error { background: #3a1f1f; border-color: #6b2b2b; color: #f5a3a3; }

  /* ── Existing data tab: duplicate project warning (WNPD-03) ── */
  .cp-imp-duplicate-banner {
    margin-bottom: 14px;
    padding: 10px 14px;
    border-radius: var(--radius-sm);
    font-size: 13px;
    line-height: 1.5;
    background: #fef3c7; color: #92400e; border: 1px solid #fcd34d;
  }
  .dark .cp-imp-duplicate-banner { background: #3a2f10; border-color: #6b5522; color: #fbd97a; }

  /* ── Audio availability (source Bible search + chip) ── */
  .cp-search-badges { display: flex; gap: 4px; flex-shrink: 0; align-items: center; }

  .cp-search-audio {
    display: inline-flex;
    align-items: center;
    gap: 3px;
    padding: 2px 7px;
    border-radius: 9999px;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.03em;
    background: #dff5e3;
    color: #0f7a35;
  }
  .dark .cp-search-audio { background: #1a3325; color: #7fd39d; }

  .cp-chip-audio {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 12px;
    margin-top: 3px;
  }
  .cp-chip-audio.available { color: #0f7a35; }
  .dark .cp-chip-audio.available { color: #7fd39d; }
  .cp-chip-audio.unavailable { color: var(--muted-foreground); }
`;

// ── Create Project dialog HTML ────────────────────────────────────────────────
const CREATE_PROJECT_HTML = `
<div class="settings-overlay" id="cp-overlay">
  <div class="cp-dialog" id="cp-dialog">
    <h2>Create Project</h2>
    <button class="cp-close" id="cp-close" aria-label="Close">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
    </button>

    <div class="cp-tabs">
      <button type="button" class="cp-tab active" id="cp-tab-new" onclick="cpSwitchTab('new')">New</button>
      <button type="button" class="cp-tab" id="cp-tab-existing" onclick="cpSwitchTab('existing')">Import</button>
    </div>

    <div class="cp-tab-panel" id="cp-panel-new">
      <div class="cp-fields">
        <div class="cp-field">
          <label class="ep-label" for="cp-title"><span class="ep-required">*</span> Project Title</label>
          <input class="ep-input" id="cp-title" type="text" maxlength="100" placeholder="" oninput="cpValidate()">
        </div>
        <div class="cp-field">
          <label class="ep-label"><span class="ep-required">*</span> Source Language / Bible</label>
          <div class="cp-search-wrap" id="cp-source-wrap">
            <input class="ep-input" id="cp-source-search" type="text" autocomplete="off"
              placeholder="Search by language or Bible (e.g. French, LSG, Reina Valera)"
              oninput="cpSourceSearch()" onfocus="cpSourceSearch()"
              onblur="setTimeout(()=>document.getElementById('cp-source-results').classList.remove('open'), 150)">
            <div class="cp-search-results" id="cp-source-results"></div>
            <div class="cp-selected-chip" id="cp-source-chip" style="display:none;"></div>
          </div>
        </div>
        <div class="cp-field">
          <label class="ep-label"><span class="ep-required">*</span> Target Language</label>
          <div class="cp-search-wrap" id="cp-target-wrap">
            <input class="ep-input" id="cp-target-search" type="text" autocomplete="off"
              placeholder="Search by language name or code"
              oninput="cpTargetSearch()" onfocus="cpTargetSearch()"
              onblur="setTimeout(()=>document.getElementById('cp-target-results').classList.remove('open'), 150)">
            <div class="cp-search-results" id="cp-target-results"></div>
            <div class="cp-selected-chip" id="cp-target-chip" style="display:none;"></div>
          </div>
        </div>
        <div class="cp-field">
          <label class="ep-label"><span class="ep-required">*</span> Books</label>
          <div class="cp-books-wrap">
            <button class="cp-books-trigger" id="cp-books-trigger" type="button" disabled onclick="cpToggleBooks(event)">
              <span id="cp-books-label">Select Source Bible First</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="6 9 12 15 18 9"/></svg>
            </button>
            <div class="cp-books-dropdown" id="cp-books-dropdown"></div>
          </div>
        </div>
        <div class="cp-field">
          <label class="ep-label cp-label-row">
            Connectivity Profile
            <span class="cp-tooltip-wrap">
              <span class="cp-tooltip-icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              </span>
              <div class="cp-tooltip-box">
                <strong>Usually Connected</strong> — Resources load on demand when chapters open; no download preparation is required.<br><br>
                <strong>Sometimes Connected</strong> — The app silently caches assigned chapters in the background when WiFi is detected; assigned translators take no action.<br><br>
                <strong>Rarely Connected</strong> — The app prompts translators to prepare their device each time WiFi is detected before going offline.
              </div>
            </span>
          </label>
          <select class="ep-input" id="cp-connectivity-profile">
            <option value="">Select profile</option>
            <option value="usually-connected">Usually Connected</option>
            <option value="sometimes-connected">Sometimes Connected</option>
            <option value="rarely-connected">Rarely Connected</option>
          </select>
        </div>
      </div>

      <div class="cp-footer">
        <button class="cp-btn-create" id="cp-submit" disabled onclick="closeCreateProject()">Create Project</button>
      </div>
    </div>

    <div class="cp-tab-panel" id="cp-panel-existing" style="display:none;">
      <div id="cp-imp-upload-section">
        <div class="cp-sb-dropzone" id="cp-sb-dropzone"
          onclick="document.getElementById('cp-sb-file').click()"
          ondragover="event.preventDefault(); this.classList.add('drag')"
          ondragleave="this.classList.remove('drag')"
          ondrop="cpSbDrop(event)">
          <input type="file" id="cp-sb-file" accept=".zip" style="display:none" onchange="cpSbFileSelected(this.files[0])">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
          <div class="cp-sb-upload-text">
            <strong>Upload Scripture Burrito package</strong><br>
            Drag and drop a .zip file here
          </div>
          <button type="button" class="cp-sb-select-btn" onclick="event.stopPropagation(); document.getElementById('cp-sb-file').click()">Select File</button>
          <div class="cp-sb-upload-sub">Scripture Burrito is the only supported format.</div>
        </div>
        <div class="cp-sb-filename" id="cp-sb-filename" style="display:none;"></div>
        <div class="cp-sb-error" id="cp-sb-error" style="display:none;"></div>
      </div>

      <div class="cp-imp-duplicate-banner" id="cp-imp-duplicate-banner" style="display:none;"></div>

      <div class="cp-fields" id="cp-imp-fields" style="display:none;">
        <div class="cp-imp-file-row" id="cp-imp-file-row">
          <span id="cp-imp-filename"></span>
        </div>
        <div class="cp-field">
          <label class="ep-label" for="cp-imp-title"><span class="ep-required">*</span> Project Title</label>
          <input class="ep-input" id="cp-imp-title" type="text" maxlength="100" oninput="cpImpValidate()">
        </div>
        <div class="cp-field">
          <label class="ep-label"><span class="ep-required">*</span> Source Language / Bible</label>
          <div class="cp-search-wrap" id="cp-imp-source-wrap">
            <input class="ep-input" id="cp-imp-source-search" type="text" autocomplete="off"
              placeholder="Search by language or Bible (e.g. French, LSG, Reina Valera)"
              oninput="cpImpSourceSearch()" onfocus="cpImpSourceSearch()"
              onblur="setTimeout(()=>document.getElementById('cp-imp-source-results').classList.remove('open'), 150)">
            <div class="cp-search-results" id="cp-imp-source-results"></div>
            <div class="cp-selected-chip" id="cp-imp-source-chip" style="display:none;"></div>
          </div>
        </div>
        <div class="cp-field">
          <label class="ep-label">Target Language</label>
          <div class="cp-readonly-field" id="cp-imp-target-display"></div>
        </div>
        <div class="cp-field">
          <label class="ep-label">Books</label>
          <div class="cp-readonly-field" id="cp-imp-books-display"></div>
        </div>
        <div class="cp-field">
          <label class="ep-label cp-label-row">
            Connectivity Profile
            <span class="cp-tooltip-wrap">
              <span class="cp-tooltip-icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              </span>
              <div class="cp-tooltip-box">
                <strong>Usually Connected</strong> — Resources load on demand when chapters open; no download preparation is required.<br><br>
                <strong>Sometimes Connected</strong> — The app silently caches assigned chapters in the background when WiFi is detected; assigned translators take no action.<br><br>
                <strong>Rarely Connected</strong> — The app prompts translators to prepare their device each time WiFi is detected before going offline.
              </div>
            </span>
          </label>
          <select class="ep-input" id="cp-imp-connectivity-profile">
            <option value="">Select profile</option>
            <option value="usually-connected">Usually Connected</option>
            <option value="sometimes-connected">Sometimes Connected</option>
            <option value="rarely-connected">Rarely Connected</option>
          </select>
        </div>
      </div>

      <div class="cp-footer cp-footer-split" id="cp-imp-footer" style="display:none;">
        <div class="cp-footer-status" id="cp-imp-status"></div>
        <button class="cp-btn-create" id="cp-imp-submit" disabled onclick="closeCreateProject()">Create Project</button>
      </div>
    </div>
  </div>
</div>
`;

// ── Settings dialog HTML ──────────────────────────────────────────────────────
const SETTINGS_HTML = `
<div class="settings-overlay" id="settings-overlay">
  <div class="settings-dialog" id="settings-dialog">
    <h2>Settings</h2>
    <button class="settings-close" id="settings-close" aria-label="Close settings">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
    </button>

    <!-- Display -->
    <div class="settings-row">
      <span class="settings-row-label">Display</span>
      <div class="seg-control" id="scripture-seg">
        <button class="active" onclick="setScripture('verse', this)">Verse</button>
        <button onclick="setScripture('pericope', this)">Pericope</button>
        <button onclick="setScripture('chapter', this)">Chapter</button>
      </div>
    </div>

    <!-- Light / Dark Mode toggle -->
    <div class="settings-row" id="theme-toggle-row" onclick="toggleTheme()" style="cursor:pointer;user-select:none;">
      <svg id="theme-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
      <span class="settings-row-label" id="theme-label">Dark Mode</span>
    </div>

    <!-- Divider before AI section -->
    <hr class="settings-divider">

    <!-- AI Translation Suggestions -->
    <div class="settings-row">
      <label class="toggle">
        <input type="checkbox" id="ai-toggle" checked>
        <span class="toggle-track"></span>
      </label>
      <span class="toggle-label">AI Translation Suggestions</span>
    </div>

    <!-- Expandable: What are AI translation suggestions? -->
    <div class="settings-expand">
      <button class="settings-expand-btn" id="ai-expand-btn" onclick="toggleAiExpand()">
        What are AI translation suggestions?
        <svg class="settings-expand-chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="6 9 12 15 18 9"/></svg>
      </button>
      <div class="settings-expand-body" id="ai-expand-body">
        A minimum of 500 verses is needed to show translation suggestions. Once that threshold is met, AI translation suggestions will automatically appear for each new verse.
        <br><br>
        Keep in mind that this feature is still in development. It is advised to double check the suggestions and make adjustments as needed. Since data is sent to an external AI model, be sure to read the privacy policy before using this feature.
      </div>
    </div>

    <!-- Footer -->
    <p class="settings-footer">
      See the <a href="#">Privacy Policy</a> and <a href="#">Terms of Use</a> for more information.
    </p>
  </div>
</div>
`;

// ── Edit Profile dialog HTML ──────────────────────────────────────────────────
const EDIT_PROFILE_HTML = `
<div class="settings-overlay" id="ep-overlay">
  <div class="ep-dialog" id="ep-dialog">
    <h2>Edit Profile</h2>
    <button class="ep-close" id="ep-close" aria-label="Close">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
    </button>

    <div class="ep-fields">
      <div class="ep-field">
        <label class="ep-label" for="ep-email"><span class="ep-required">*</span> Email</label>
        <input class="ep-input" id="ep-email" type="email" value="cwhite@gloo.us" disabled>
      </div>
      <div class="ep-field">
        <label class="ep-label" for="ep-display-name"><span class="ep-required">*</span> Display Name</label>
        <input class="ep-input" id="ep-display-name" type="text" value="Chad M" oninput="epValidate()">
        <p class="ep-helper">Visible to all Scribe users</p>
      </div>
      <div class="ep-field">
        <label class="ep-label" for="ep-firstname">First Name</label>
        <input class="ep-input" id="ep-firstname" type="text" value="Chad">
      </div>
      <div class="ep-field">
        <label class="ep-label" for="ep-lastname">Last Name</label>
        <input class="ep-input" id="ep-lastname" type="text" value="M">
      </div>
      <div class="ep-field">
        <label class="ep-label" for="ep-role"><span class="ep-required">*</span> Role</label>
        <select class="ep-input" id="ep-role" onchange="epValidate()">
          <option value="Translator" selected>Translator</option>
        </select>
      </div>
    </div>

    <div class="ep-footer">
      <button class="ep-btn ep-btn-save" id="ep-save" onclick="closeEditProfile()">Save User</button>
    </div>
  </div>
</div>
`;

// ── Header HTML ───────────────────────────────────────────────────────────────
const HEADER_HTML = `
<header class="header">
  <div class="header-left">
    <div class="hamburger-wrap">
      <button class="hamburger" onclick="toggleMainMenu(event)">
        <span></span><span></span><span></span>
      </button>
      <div class="main-menu" id="main-menu">
        <div id="menu-manager">
          <a class="main-menu-item" href="manager-dashboard.html">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            Dashboard
          </a>
          <a class="main-menu-item" href="manager-dashboard.html">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
            Projects
          </a>
          <a class="main-menu-item" href="users.html">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            Users
          </a>
        </div>
        <div id="menu-translator" style="display:none">
          <a class="main-menu-item" href="translator-dashboard.html">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            Dashboard
          </a>
          <!--a class="main-menu-item" href="project-list-translator.html">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
            Projects
          </a-->
          <!--a class="main-menu-item" href="translator-dashboard.html#work">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
            My Work
          </a>
          <a class="main-menu-item" href="translator-dashboard.html#history">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            My History
          </a-->
        </div>
        <div id="menu-observer" style="display:none">
          <a class="main-menu-item" href="observer-dashboard.html">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
            Projects
          </a>
        </div>
      </div>
    </div>
    <a class="logo" id="logo-link" href="manager-dashboard.html"><img src="Fluent-White Logo Only.svg" alt="fluent"></a>
  </div>
  <div class="header-right">
    <div class="user-btn" id="user-menu-btn" onclick="toggleUserMenu(event)">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="3"/>
        <circle cx="12" cy="10" r="3"/>
        <path d="M6 21c0-3.3 2.7-6 6-6s6 2.7 6 6"/>
      </svg>
      <div class="user-menu" id="user-menu">
        <button class="user-menu-item" onclick="openSettings()">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></svg>
          Settings
        </button>
        <button class="user-menu-item" onclick="openEditProfile()">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11.5 15H7a4 4 0 0 0-4 4v2"/><path d="M21.378 16.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z"/><circle cx="10" cy="7" r="4"/></svg>
          Edit Profile
        </button>
        <hr class="user-menu-divider">
        <div class="user-menu-label" id="user-menu-label">Chad M</div>
        <div id="um-org-section"></div>
        <hr class="user-menu-divider">
        <button class="user-menu-item">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
          Logout
        </button>
      </div>
    </div>
  </div>
</header>
`;

// ── Role state ───────────────────────────────────────────────────────────────
let currentRole = 'manager';

function applyRoleUI() {
  const isManager    = currentRole === 'manager';
  const isTranslator = currentRole === 'translator';
  const isObserver   = currentRole === 'observer';
  document.getElementById('user-menu-label').textContent  = isManager ? 'Chad M' : 'Chad T';
  document.getElementById('logo-link').href                = ORG_ROLE_DASHBOARDS[currentRole] || ORG_ROLE_DASHBOARDS.manager;
  document.getElementById('menu-manager').style.display   = isManager    ? '' : 'none';
  document.getElementById('menu-translator').style.display = isTranslator ? '' : 'none';
  document.getElementById('menu-observer').style.display   = isObserver   ? '' : 'none';
}

// ── Toggle menus ─────────────────────────────────────────────────────────────
function toggleMainMenu(event) {
  event.stopPropagation();
  document.getElementById('main-menu').classList.toggle('open');
  document.getElementById('user-menu').classList.remove('open');
}

function toggleUserMenu(event) {
  event.stopPropagation();
  const isOpen = document.getElementById('user-menu').classList.toggle('open');
  document.getElementById('main-menu').classList.remove('open');
  if (isOpen) renderUserMenuOrgSwitcher();
}

document.addEventListener('click', () => {
  const mainMenu   = document.getElementById('main-menu');
  const userMenu   = document.getElementById('user-menu');
  if (mainMenu) mainMenu.classList.remove('open');
  if (userMenu) userMenu.classList.remove('open');
});

// ── Theme (dark mode) ─────────────────────────────────────────────────────────
const SUN_SVG = `<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>`;
const MOON_SVG = `<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>`;

function applyTheme(isDark) {
  document.documentElement.classList.toggle('dark', isDark);
  const icon  = document.getElementById('theme-icon');
  const label = document.getElementById('theme-label');
  if (icon)  icon.innerHTML  = isDark ? SUN_SVG : MOON_SVG;
  if (label) label.textContent = isDark ? 'Light Mode' : 'Dark Mode';
}

function initTheme() {
  const saved = localStorage.getItem('theme');
  let isDark;
  if (saved === 'dark' || saved === 'light') {
    isDark = saved === 'dark';
  } else {
    isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  applyTheme(isDark);
}

function toggleTheme() {
  const isDark = !document.documentElement.classList.contains('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  applyTheme(isDark);
}

// ── Create Project dialog logic ───────────────────────────────────────────────
// Source Bible lookup table (mocks the DBL/Aquifer/YouVersion index from
// [[Build-Combined-Language-Bible-Search-and-Ingestion]]). A language is only
// selectable as a source if it has at least one entry here — this is what
// replaces separate "is this language a valid source" gating logic.
const CP_BIBLE_DATA = [
  { langCode: 'eng', bibleId: 'kjv',     abbr: 'KJV',     name: 'King James Version',              provider: 'dbl',        books: 'full' },
  { langCode: 'eng', bibleId: 'esv',     abbr: 'ESV',     name: 'English Standard Version',        provider: 'dbl',        books: 'full' },
  { langCode: 'fra', bibleId: 'lsg',     abbr: 'LSG',     name: 'Louis Segond 1910',                provider: 'dbl',        books: 'full' },
  { langCode: 'fra', bibleId: 'bds',     abbr: 'BDS',     name: 'Bible du Semeur',                  provider: 'aquifer',    books: 'full' },
  { langCode: 'spa', bibleId: 'rvr60',   abbr: 'RVR60',   name: 'Reina Valera 1960',                provider: 'dbl',        books: 'full', hasAudio: true },
  { langCode: 'guj', bibleId: 'irv-guj', abbr: 'IRV-GUJ', name: 'Indian Revised Version Gujarati',  provider: 'dbl',        books: 'full', hasAudio: true },
  { langCode: 'guj', bibleId: 'guj-irv', abbr: 'GUJ-IRV', name: 'Gujarati Indian Revised Version',  provider: 'dbl',        books: 'full' },
  { langCode: 'hin', bibleId: 'glt-hin', abbr: 'glt-hin', name: 'Gateway Literal Text Hindi',       provider: 'aquifer',    books: 'nt' },
  { langCode: 'hin', bibleId: 'irv-hin', abbr: 'IRV-HIN', name: 'Indian Revised Version Hindi',     provider: 'dbl',        books: 'full' },
  { langCode: 'ind', bibleId: 'glt-ind', abbr: 'GLT-IND', name: 'Gateway Literal Text (Indonesian)', provider: 'aquifer',   books: 'full' },
  { langCode: 'ind', bibleId: 'gst-id',  abbr: 'GST-ID',  name: 'Gateway Simplified Text (Indonesian)', provider: 'aquifer',    books: 'nt' },
  { langCode: 'ind', bibleId: 'tbi',     abbr: 'TBI',     name: 'Terjemahan Baru Indonesia',        provider: 'dbl',        books: 'full' },
  { langCode: 'nep', bibleId: 'npiulb',  abbr: 'NPIULB',  name: 'Nepali Unlocked Literal Bible',    provider: 'aquifer',    books: 'full' },
  { langCode: 'por', bibleId: 'arc',     abbr: 'ARC',     name: 'Almeida Revista e Corrigida',      provider: 'youversion', books: 'full' },
  { langCode: 'swh', bibleId: 'okcv',    abbr: 'OKCV',    name: 'Open Kiswahili Contemporary Version', provider: 'aquifer', books: 'full' },
  { langCode: 'swh', bibleId: 'snt',     abbr: 'SNT',     name: 'Swahili New Testament',            provider: 'aquifer',    books: 'nt' },
  { langCode: 'rus', bibleId: 'rsb',     abbr: 'RSB',     name: 'Russian Synodal Bible',            provider: 'aquifer',    books: 'full' },
  // Kachi Koli (gjk), Kukna (kex), Varli (vav), and Ewe (ewe) intentionally
  // have no Bible indexed — demonstrates OBS-A/OBS-B: they exist as
  // languages but must not appear as source options until a real Bible is indexed.
];

// A few languages get a searchable ISO 639-1 alias so queries like "es"
// surface both the Spanish language and the ESV Bible abbreviation —
// the ambiguous-bucketing case Kasey raised in the 2026-07-16 meeting.
const CP_LANG_ALIASES = { spa: 'es', fra: 'fr', eng: 'en', hin: 'hi', guj: 'gu', por: 'pt', swh: 'sw' };

const CP_PROVIDER_LABEL = { dbl: 'DBL', aquifer: 'Aquifer', youversion: 'YouVersion' };

let cpSelectedSource = null; // { langCode, langName, bibleId, bibleAbbr, bibleName, provider, books }
let cpSelectedTarget = null; // { code, name }
let cpSourceDrillLang = null; // langCode, when drilled into a single language's Bible list

function cpLangByCode(code) {
  return (typeof LANGUAGE_DATA !== 'undefined' ? LANGUAGE_DATA : []).find(l => l.code === code);
}

function cpIndexedLanguages() {
  const codes = [...new Set(CP_BIBLE_DATA.map(b => b.langCode))];
  return codes.map(code => {
    const lang = cpLangByCode(code);
    return {
      code,
      name: lang ? lang.name : code,
      alias: CP_LANG_ALIASES[code] || '',
      bibles: CP_BIBLE_DATA.filter(b => b.langCode === code),
    };
  });
}

function cpBooksForBible(bible) {
  return bible.books === 'nt' ? CP_BOOKS.slice(CP_BOOKS.indexOf('Matthew')) : CP_BOOKS;
}

// ── Source search (combined language + Bible) ─────────────────────────────────
function cpSourceSearch() {
  const query = document.getElementById('cp-source-search').value.trim().toLowerCase();
  const resultsEl = document.getElementById('cp-source-results');

  if (cpSourceDrillLang) {
    cpRenderSourceDrill(resultsEl, query);
    resultsEl.classList.add('open');
    return;
  }

  if (!query) {
    resultsEl.innerHTML = '<div class="cp-search-empty">Start typing to search languages with an available source Bible, or search a Bible/translation name directly.</div>';
    resultsEl.classList.add('open');
    return;
  }

  const langMatches = cpIndexedLanguages()
    .filter(l => l.name.toLowerCase().includes(query) || l.code.includes(query) || l.alias.includes(query))
    .slice(0, 6);

  const bibleMatches = CP_BIBLE_DATA
    .filter(b => b.abbr.toLowerCase().includes(query) || b.name.toLowerCase().includes(query))
    .slice(0, 6);

  if (!langMatches.length && !bibleMatches.length) {
    resultsEl.innerHTML = '<div class="cp-search-empty">No matching languages or Bibles. A language must have an indexed source Bible before it can be selected here.</div>';
    resultsEl.classList.add('open');
    return;
  }

  let html = '';
  if (langMatches.length) {
    html += '<div class="cp-search-group-label">Languages</div>';
    html += langMatches.map(l => `
      <div class="cp-search-item" onmousedown="event.preventDefault(); cpDrillSourceLang('${l.code}')">
        <div class="cp-search-item-text">
          <span class="cp-search-item-main">${l.name} (${l.code})</span>
          <span class="cp-search-item-sub">${l.bibles.length} Bible${l.bibles.length === 1 ? '' : 's'} available</span>
        </div>
      </div>`).join('');
  }
  if (bibleMatches.length) {
    html += '<div class="cp-search-group-label">Bibles</div>';
    html += bibleMatches.map(b => {
      const lang = cpLangByCode(b.langCode);
      return `
      <div class="cp-search-item" onmousedown="event.preventDefault(); cpSelectSource('${b.langCode}','${b.bibleId}')">
        <div class="cp-search-item-text">
          <span class="cp-search-item-main">${b.name} (${b.abbr})</span>
          <span class="cp-search-item-sub">${lang ? lang.name : b.langCode}</span>
        </div>
        <div class="cp-search-badges">
          ${b.hasAudio ? `<span class="cp-search-audio"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></svg>Audio</span>` : ''}
          <span class="cp-search-provider ${b.provider}">${CP_PROVIDER_LABEL[b.provider]}</span>
        </div>
      </div>`;
    }).join('');
  }
  resultsEl.innerHTML = html;
  resultsEl.classList.add('open');
}

function cpDrillSourceLang(code) {
  cpSourceDrillLang = code;
  const resultsEl = document.getElementById('cp-source-results');
  cpRenderSourceDrill(resultsEl, '');
  resultsEl.classList.add('open');
  document.getElementById('cp-source-search').focus();
}

function cpRenderSourceDrill(resultsEl, query) {
  const lang = cpIndexedLanguages().find(l => l.code === cpSourceDrillLang);
  if (!lang) { cpSourceDrillLang = null; return cpSourceSearch(); }
  const bibles = lang.bibles.filter(b => !query || b.abbr.toLowerCase().includes(query) || b.name.toLowerCase().includes(query));
  let html = `<div class="cp-search-back" onmousedown="event.preventDefault(); cpSourceDrillLang=null; cpSourceSearch();">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="15 18 9 12 15 6"/></svg>
    All results
  </div>`;
  html += `<div class="cp-search-group-label">${lang.name} (${lang.code}) — Bibles</div>`;
  html += bibles.map(b => `
    <div class="cp-search-item" onmousedown="event.preventDefault(); cpSelectSource('${b.langCode}','${b.bibleId}')">
      <div class="cp-search-item-text">
        <span class="cp-search-item-main">${b.name} (${b.abbr})</span>
      </div>
      <div class="cp-search-badges">
        ${b.hasAudio ? `<span class="cp-search-audio"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></svg>Audio</span>` : ''}
        <span class="cp-search-provider ${b.provider}">${CP_PROVIDER_LABEL[b.provider]}</span>
      </div>
    </div>`).join('');
  resultsEl.innerHTML = html;
}

function cpSelectSource(langCode, bibleId) {
  const bible = CP_BIBLE_DATA.find(b => b.langCode === langCode && b.bibleId === bibleId);
  const lang = cpLangByCode(langCode);
  cpSelectedSource = {
    langCode, langName: lang ? lang.name : langCode,
    bibleId, bibleAbbr: bible.abbr, bibleName: bible.name, provider: bible.provider, books: bible.books,
    hasAudio: bible.hasAudio || false,
  };
  cpSourceDrillLang = null;
  document.getElementById('cp-source-search').value = '';
  document.getElementById('cp-source-search').blur();
  document.getElementById('cp-source-results').classList.remove('open');
  cpRenderSourceChip();
  cpBuildBooksDropdown(bible);
  cpValidate();
}

function cpClearSource() {
  cpSelectedSource = null;
  document.getElementById('cp-source-chip').style.display = 'none';
  document.getElementById('cp-source-search').style.display = '';
  document.getElementById('cp-source-search').value = '';
  document.getElementById('cp-source-search').focus();

  cpSelectedBooks = new Set();
  const trigger = document.getElementById('cp-books-trigger');
  trigger.disabled = true;
  document.getElementById('cp-books-label').textContent = 'Select Source Bible First';
  document.getElementById('cp-books-dropdown').innerHTML = '';
  document.getElementById('cp-books-dropdown').classList.remove('open');
  cpValidate();
}

function cpRenderSourceChip() {
  const chip = document.getElementById('cp-source-chip');
  const s = cpSelectedSource;
  const audioLine = s.hasAudio
    ? `<div class="cp-chip-audio available"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></svg>Audio available — included as offline source</div>`
    : `<div class="cp-chip-audio unavailable"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>No audio version available for this Bible</div>`;
  chip.innerHTML = `
    <div class="cp-selected-chip-text">
      <div><strong>${s.langName}</strong> (${s.langCode})</div>
      <div class="cp-selected-chip-sub">${s.bibleName} (${s.bibleAbbr}) · ${CP_PROVIDER_LABEL[s.provider]}${s.books === 'nt' ? ' · New Testament only' : ''}</div>
      ${audioLine}
    </div>
    <button type="button" class="cp-selected-chip-clear" onclick="cpClearSource()" aria-label="Clear source Bible">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
    </button>`;
  chip.style.display = 'flex';
  document.getElementById('cp-source-search').style.display = 'none';
}

// ── Target search (language only, no Bible required) ──────────────────────────
function cpTargetSearch() {
  const query = document.getElementById('cp-target-search').value.trim().toLowerCase();
  const resultsEl = document.getElementById('cp-target-results');
  const data = typeof LANGUAGE_DATA !== 'undefined' ? LANGUAGE_DATA : [];

  if (!query) {
    resultsEl.innerHTML = `<div class="cp-search-empty">Start typing to search ${data.length.toLocaleString()} languages by name or code.</div>`;
    resultsEl.classList.add('open');
    return;
  }

  const matches = data.filter(l => l.name.toLowerCase().includes(query) || l.code.includes(query)).slice(0, 8);
  if (!matches.length) {
    resultsEl.innerHTML = '<div class="cp-search-empty">No matching languages.</div>';
    resultsEl.classList.add('open');
    return;
  }

  resultsEl.innerHTML = matches.map(l => `
    <div class="cp-search-item" onmousedown="event.preventDefault(); cpSelectTarget('${l.code}')">
      <div class="cp-search-item-text">
        <span class="cp-search-item-main">${l.name} (${l.code})</span>
        <span class="cp-search-item-sub">${l.country}</span>
      </div>
    </div>`).join('');
  resultsEl.classList.add('open');
}

function cpSelectTarget(code) {
  const lang = cpLangByCode(code);
  cpSelectedTarget = { code, name: lang ? lang.name : code };
  document.getElementById('cp-target-search').value = '';
  document.getElementById('cp-target-search').blur();
  document.getElementById('cp-target-results').classList.remove('open');

  const chip = document.getElementById('cp-target-chip');
  chip.innerHTML = `
    <div class="cp-selected-chip-text"><strong>${cpSelectedTarget.name}</strong> (${cpSelectedTarget.code})</div>
    <button type="button" class="cp-selected-chip-clear" onclick="cpClearTarget()" aria-label="Clear target language">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
    </button>`;
  chip.style.display = 'flex';
  document.getElementById('cp-target-search').style.display = 'none';
  cpValidate();
}

function cpClearTarget() {
  cpSelectedTarget = null;
  document.getElementById('cp-target-chip').style.display = 'none';
  document.getElementById('cp-target-search').style.display = '';
  document.getElementById('cp-target-search').value = '';
  document.getElementById('cp-target-search').focus();
  cpValidate();
}

const CP_BOOKS = [
  'Genesis','Exodus','Leviticus','Numbers','Deuteronomy','Joshua','Judges','Ruth',
  '1 Samuel','2 Samuel','1 Kings','2 Kings','1 Chronicles','2 Chronicles','Ezra',
  'Nehemiah','Esther','Job','Psalms','Proverbs','Ecclesiastes','Song of Solomon',
  'Isaiah','Jeremiah','Lamentations','Ezekiel','Daniel','Hosea','Joel','Amos',
  'Obadiah','Jonah','Micah','Nahum','Habakkuk','Zephaniah','Haggai','Zechariah',
  'Malachi','Matthew','Mark','Luke','John','Acts','Romans','1 Corinthians',
  '2 Corinthians','Galatians','Ephesians','Philippians','Colossians',
  '1 Thessalonians','2 Thessalonians','1 Timothy','2 Timothy','Titus','Philemon',
  'Hebrews','James','1 Peter','2 Peter','1 John','2 John','3 John','Jude','Revelation'
];

let cpSelectedBooks = new Set();

// ── Tabs ────────────────────────────────────────────────────────────────────
function cpSwitchTab(tab) {
  const isNew = tab === 'new';
  document.getElementById('cp-tab-new').classList.toggle('active', isNew);
  document.getElementById('cp-tab-existing').classList.toggle('active', !isNew);
  document.getElementById('cp-panel-new').style.display = isNew ? '' : 'none';
  document.getElementById('cp-panel-existing').style.display = isNew ? 'none' : '';
}

// ── Existing data tab: Scripture Burrito upload (mock validation) ───────────
// No zip-parsing library is loaded in this prototype, so validation is
// simulated from the filename: "nolang"/"nobooks" preview those specific
// rejections, "invalid" previews the generic invalid-package rejection,
// and any other name (e.g. Kachi-Koli-gjk-gospels.zip) previews the pass state.
function cpSbDrop(e) {
  e.preventDefault();
  document.getElementById('cp-sb-dropzone').classList.remove('drag');
  const file = e.dataTransfer.files[0];
  if (file) cpSbFileSelected(file);
}

function cpSbFileSelected(file) {
  if (!file) return;
  const name = file.name.toLowerCase();

  const filenameEl = document.getElementById('cp-sb-filename');
  const errorEl = document.getElementById('cp-sb-error');
  filenameEl.textContent = file.name;
  filenameEl.style.display = 'flex';
  errorEl.style.display = 'none';

  if (name.includes('nolang')) {
    errorEl.textContent = 'Missing target language.';
    errorEl.style.display = 'block';
    return;
  }
  if (name.includes('nobooks')) {
    errorEl.textContent = 'Missing book data.';
    errorEl.style.display = 'block';
    return;
  }
  if (name.includes('invalid')) {
    errorEl.textContent = 'File is not a valid Scripture Burrito package.';
    errorEl.style.display = 'block';
    return;
  }
  cpImpShowFields(file.name);
}

function cpResetExistingDataTab() {
  document.getElementById('cp-sb-file').value = '';
  document.getElementById('cp-sb-filename').style.display = 'none';
  document.getElementById('cp-sb-error').style.display = 'none';
  document.getElementById('cp-sb-dropzone').classList.remove('drag');
  document.getElementById('cp-imp-upload-section').style.display = '';
  document.getElementById('cp-imp-fields').style.display = 'none';
  document.getElementById('cp-imp-footer').style.display = 'none';
  document.getElementById('cp-imp-duplicate-banner').style.display = 'none';

  document.getElementById('cp-imp-title').value = '';
  cpImpSelectedSource = null;
  cpImpSourceDrillLang = null;
  document.getElementById('cp-imp-source-search').value = '';
  document.getElementById('cp-imp-source-search').style.display = '';
  document.getElementById('cp-imp-source-results').classList.remove('open');
  document.getElementById('cp-imp-source-chip').style.display = 'none';
  document.getElementById('cp-imp-connectivity-profile').value = '';
}

// ── Existing data tab: post-validation fields (mocks WNPD-02) ──────────────
// The package's own data (Target Language, Books) is parsed and shown
// read-only; Source Language/Bible is still picked manually since source
// text is out of scope for import. No real package parser is wired up in
// this prototype, so the parsed values below are a fixed mock package.
const MOCK_PARSED_PACKAGE = {
  title: 'Kachi Koli NT Draft',
  targetCode: 'gjk',
  targetName: 'Kachi Koli',
  books: ['Matthew', 'Mark', 'Luke', 'John'],
};

// ── Duplicate project detection (WNPD-03) ──────────────────────────────────
// Mirrors the projects already listed on the Manager Dashboard mockup so the
// duplicate-check demo has a real match to find: source Gujarati / target
// Kachi Koli is used by three existing rows there.
const MOCK_EXISTING_PROJECTS = [
  { title: 'ISV_Koli Kachhi', sourceLangCode: 'guj', targetCode: 'gjk', books: ['Matthew', 'Mark', 'Luke', 'John'] },
  { title: 'ISV_Koli Kachhi', sourceLangCode: 'guj', targetCode: 'gjk', books: ['Matthew', 'Mark', 'Luke', 'John'] },
  { title: 'ISV_Koli Kachhi', sourceLangCode: 'guj', targetCode: 'gjk', books: ['Matthew', 'Mark', 'Luke', 'John'] },
];

let cpImpSelectedSource = null;
let cpImpSourceDrillLang = null;

function cpImpShowFields(filename) {
  document.getElementById('cp-imp-upload-section').style.display = 'none';
  document.getElementById('cp-imp-fields').style.display = 'grid';
  document.getElementById('cp-imp-footer').style.display = 'flex';
  document.getElementById('cp-imp-filename').textContent = filename;

  document.getElementById('cp-imp-title').value = MOCK_PARSED_PACKAGE.title;
  document.getElementById('cp-imp-target-display').textContent =
    `${MOCK_PARSED_PACKAGE.targetName} (${MOCK_PARSED_PACKAGE.targetCode})`;
  document.getElementById('cp-imp-books-display').textContent = MOCK_PARSED_PACKAGE.books.join(', ');

  document.getElementById('cp-imp-status').textContent = 'Package validated. Target language and book data detected.';
  cpImpValidate();
}

function cpImpSourceSearch() {
  const query = document.getElementById('cp-imp-source-search').value.trim().toLowerCase();
  const resultsEl = document.getElementById('cp-imp-source-results');

  if (cpImpSourceDrillLang) {
    cpImpRenderSourceDrill(resultsEl, query);
    resultsEl.classList.add('open');
    return;
  }

  if (!query) {
    resultsEl.innerHTML = '<div class="cp-search-empty">Start typing to search languages with an available source Bible, or search a Bible/translation name directly.</div>';
    resultsEl.classList.add('open');
    return;
  }

  const langMatches = cpIndexedLanguages()
    .filter(l => l.name.toLowerCase().includes(query) || l.code.includes(query) || l.alias.includes(query))
    .slice(0, 6);

  const bibleMatches = CP_BIBLE_DATA
    .filter(b => b.abbr.toLowerCase().includes(query) || b.name.toLowerCase().includes(query))
    .slice(0, 6);

  if (!langMatches.length && !bibleMatches.length) {
    resultsEl.innerHTML = '<div class="cp-search-empty">No matching languages or Bibles. A language must have an indexed source Bible before it can be selected here.</div>';
    resultsEl.classList.add('open');
    return;
  }

  let html = '';
  if (langMatches.length) {
    html += '<div class="cp-search-group-label">Languages</div>';
    html += langMatches.map(l => `
      <div class="cp-search-item" onmousedown="event.preventDefault(); cpImpDrillSourceLang('${l.code}')">
        <div class="cp-search-item-text">
          <span class="cp-search-item-main">${l.name} (${l.code})</span>
          <span class="cp-search-item-sub">${l.bibles.length} Bible${l.bibles.length === 1 ? '' : 's'} available</span>
        </div>
      </div>`).join('');
  }
  if (bibleMatches.length) {
    html += '<div class="cp-search-group-label">Bibles</div>';
    html += bibleMatches.map(b => {
      const lang = cpLangByCode(b.langCode);
      return `
      <div class="cp-search-item" onmousedown="event.preventDefault(); cpImpSelectSource('${b.langCode}','${b.bibleId}')">
        <div class="cp-search-item-text">
          <span class="cp-search-item-main">${b.name} (${b.abbr})</span>
          <span class="cp-search-item-sub">${lang ? lang.name : b.langCode}</span>
        </div>
        <div class="cp-search-badges">
          ${b.hasAudio ? `<span class="cp-search-audio"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></svg>Audio</span>` : ''}
          <span class="cp-search-provider ${b.provider}">${CP_PROVIDER_LABEL[b.provider]}</span>
        </div>
      </div>`;
    }).join('');
  }
  resultsEl.innerHTML = html;
  resultsEl.classList.add('open');
}

function cpImpDrillSourceLang(code) {
  cpImpSourceDrillLang = code;
  const resultsEl = document.getElementById('cp-imp-source-results');
  cpImpRenderSourceDrill(resultsEl, '');
  resultsEl.classList.add('open');
  document.getElementById('cp-imp-source-search').focus();
}

function cpImpRenderSourceDrill(resultsEl, query) {
  const lang = cpIndexedLanguages().find(l => l.code === cpImpSourceDrillLang);
  if (!lang) { cpImpSourceDrillLang = null; return cpImpSourceSearch(); }
  const bibles = lang.bibles.filter(b => !query || b.abbr.toLowerCase().includes(query) || b.name.toLowerCase().includes(query));
  let html = `<div class="cp-search-back" onmousedown="event.preventDefault(); cpImpSourceDrillLang=null; cpImpSourceSearch();">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="15 18 9 12 15 6"/></svg>
    All results
  </div>`;
  html += `<div class="cp-search-group-label">${lang.name} (${lang.code}) — Bibles</div>`;
  html += bibles.map(b => `
    <div class="cp-search-item" onmousedown="event.preventDefault(); cpImpSelectSource('${b.langCode}','${b.bibleId}')">
      <div class="cp-search-item-text">
        <span class="cp-search-item-main">${b.name} (${b.abbr})</span>
      </div>
      <div class="cp-search-badges">
        ${b.hasAudio ? `<span class="cp-search-audio"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></svg>Audio</span>` : ''}
        <span class="cp-search-provider ${b.provider}">${CP_PROVIDER_LABEL[b.provider]}</span>
      </div>
    </div>`).join('');
  resultsEl.innerHTML = html;
}

function cpImpSelectSource(langCode, bibleId) {
  const bible = CP_BIBLE_DATA.find(b => b.langCode === langCode && b.bibleId === bibleId);
  const lang = cpLangByCode(langCode);
  cpImpSelectedSource = {
    langCode, langName: lang ? lang.name : langCode,
    bibleId, bibleAbbr: bible.abbr, bibleName: bible.name, provider: bible.provider, books: bible.books,
    hasAudio: bible.hasAudio || false,
  };
  cpImpSourceDrillLang = null;
  document.getElementById('cp-imp-source-search').value = '';
  document.getElementById('cp-imp-source-search').blur();
  document.getElementById('cp-imp-source-results').classList.remove('open');

  const chip = document.getElementById('cp-imp-source-chip');
  const s = cpImpSelectedSource;
  const audioLine = s.hasAudio
    ? `<div class="cp-chip-audio available"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></svg>Audio available — included as offline source</div>`
    : `<div class="cp-chip-audio unavailable"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>No audio version available for this Bible</div>`;
  chip.innerHTML = `
    <div class="cp-selected-chip-text">
      <div><strong>${s.langName}</strong> (${s.langCode})</div>
      <div class="cp-selected-chip-sub">${s.bibleName} (${s.bibleAbbr}) · ${CP_PROVIDER_LABEL[s.provider]}${s.books === 'nt' ? ' · New Testament only' : ''}</div>
      ${audioLine}
    </div>
    <button type="button" class="cp-selected-chip-clear" onclick="cpImpClearSource()" aria-label="Clear source Bible">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
    </button>`;
  chip.style.display = 'flex';
  document.getElementById('cp-imp-source-search').style.display = 'none';
  cpImpCheckDuplicate();
  cpImpValidate();
}

function cpImpClearSource() {
  cpImpSelectedSource = null;
  document.getElementById('cp-imp-source-chip').style.display = 'none';
  document.getElementById('cp-imp-source-search').style.display = '';
  document.getElementById('cp-imp-source-search').value = '';
  document.getElementById('cp-imp-source-search').focus();
  document.getElementById('cp-imp-duplicate-banner').style.display = 'none';
  cpImpValidate();
}

// Checks the parsed package's target language/books plus the user-selected
// source language against existing dashboard projects. Warn-only: does not
// block or alter the submit action either way (per WNPD-03).
function cpImpCheckDuplicate() {
  const banner = document.getElementById('cp-imp-duplicate-banner');
  if (!cpImpSelectedSource) {
    banner.style.display = 'none';
    return;
  }

  const match = MOCK_EXISTING_PROJECTS.find(p =>
    p.sourceLangCode === cpImpSelectedSource.langCode &&
    p.targetCode === MOCK_PARSED_PACKAGE.targetCode &&
    p.books.length === MOCK_PARSED_PACKAGE.books.length &&
    p.books.every(b => MOCK_PARSED_PACKAGE.books.includes(b))
  );

  if (match) {
    banner.textContent = `A project already exists covering ${cpImpSelectedSource.langName} to ${MOCK_PARSED_PACKAGE.targetName} for ${MOCK_PARSED_PACKAGE.books.join(', ')} ("${match.title}"). Duplicate projects are allowed.`;
    banner.style.display = 'block';
  } else {
    banner.style.display = 'none';
  }
}

function cpImpValidate() {
  const ok =
    document.getElementById('cp-imp-title').value.trim() &&
    cpImpSelectedSource;
  document.getElementById('cp-imp-submit').disabled = !ok;
}

function openCreateProject() {
  // Reset form
  cpSwitchTab('new');
  cpResetExistingDataTab();
  document.getElementById('cp-title').value = '';

  cpSelectedSource = null;
  cpSourceDrillLang = null;
  document.getElementById('cp-source-search').value = '';
  document.getElementById('cp-source-search').style.display = '';
  document.getElementById('cp-source-results').classList.remove('open');
  document.getElementById('cp-source-chip').style.display = 'none';

  cpSelectedTarget = null;
  document.getElementById('cp-target-search').value = '';
  document.getElementById('cp-target-search').style.display = '';
  document.getElementById('cp-target-results').classList.remove('open');
  document.getElementById('cp-target-chip').style.display = 'none';

  const trigger = document.getElementById('cp-books-trigger');
  trigger.disabled = true;
  document.getElementById('cp-books-label').textContent = 'Select Source Bible First';
  document.getElementById('cp-books-dropdown').innerHTML = '';
  document.getElementById('cp-books-dropdown').classList.remove('open');
  cpSelectedBooks = new Set();
  document.getElementById('cp-connectivity-profile').value = '';
  cpValidate();
  document.getElementById('cp-overlay').classList.add('open');
}

function closeCreateProject() {
  document.getElementById('cp-overlay').classList.remove('open');
  document.getElementById('cp-books-dropdown').classList.remove('open');
}

function cpBuildBooksDropdown(bible) {
  cpSelectedBooks = new Set();
  const trigger = document.getElementById('cp-books-trigger');
  const dropdown = document.getElementById('cp-books-dropdown');
  trigger.disabled = false;
  document.getElementById('cp-books-label').textContent = 'Select Books';
  dropdown.innerHTML = cpBooksForBible(bible).map(book => `
    <label class="cp-book-item">
      <input type="checkbox" value="${book}" onchange="cpBookToggle('${book}')">
      ${book}
    </label>`).join('');
  dropdown.classList.remove('open');
}

function cpBookToggle(book) {
  if (cpSelectedBooks.has(book)) {
    cpSelectedBooks.delete(book);
  } else {
    cpSelectedBooks.add(book);
  }
  const count = cpSelectedBooks.size;
  document.getElementById('cp-books-label').textContent =
    count === 0 ? 'Select Books' : `${count} book${count === 1 ? '' : 's'} selected`;
  cpValidate();
}

function cpToggleBooks(e) {
  e.stopPropagation();
  document.getElementById('cp-books-dropdown').classList.toggle('open');
}

function cpValidate() {
  const ok =
    document.getElementById('cp-title').value.trim() &&
    cpSelectedSource &&
    cpSelectedTarget &&
    cpSelectedBooks.size > 0;
  document.getElementById('cp-submit').disabled = !ok;
}

// ── Edit Profile dialog logic ─────────────────────────────────────────────────
function openEditProfile(data) {
  document.getElementById('user-menu').classList.remove('open');
  if (data) {
    document.getElementById('ep-email').value        = data.email        || '';
    document.getElementById('ep-display-name').value = data.displayName  || '';
    document.getElementById('ep-firstname').value    = data.firstName    || '';
    document.getElementById('ep-lastname').value     = data.lastName     || '';
    const roleEl = document.getElementById('ep-role');
    if (data.role) roleEl.value = data.role;
  }
  document.getElementById('ep-overlay').classList.add('open');
  epValidate();
}

function closeEditProfile() {
  document.getElementById('ep-overlay').classList.remove('open');
}

function epValidate() {
  const displayName = document.getElementById('ep-display-name').value.trim();
  const role        = document.getElementById('ep-role').value;
  document.getElementById('ep-save').disabled = !displayName || !role;
}

// ── Settings dialog logic ─────────────────────────────────────────────────────
function openSettings() {
  document.getElementById('user-menu').classList.remove('open');
  document.getElementById('settings-overlay').classList.add('open');
}

function closeSettings() {
  document.getElementById('settings-overlay').classList.remove('open');
}

function setScripture(mode, btn) {
  document.querySelectorAll('#scripture-seg button').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  localStorage.setItem('fluent-display-mode', mode);
  if (typeof setViewMode === 'function') setViewMode(mode);
}

function toggleAiExpand() {
  const btn  = document.getElementById('ai-expand-btn');
  const body = document.getElementById('ai-expand-body');
  btn.classList.toggle('open');
  body.classList.toggle('open');
}

// ── Org switcher ─────────────────────────────────────────────────────────────

// Default org state — pages can override window.ORG_CONFIG before components.js init
// `roles` lists the roles the current user holds within that org.
const DEFAULT_ORG_CONFIG = {
  orgs: [
    { id: 'bcs-india', name: 'BCS', roles: ['manager', 'translator'] },
    { id: 'wycliffe', name: 'Wycliffe Global Partners', roles: ['translator', 'observer'] },
  ],
  activeOrgId: 'bcs-india',
};

const ORG_ROLE_LABELS = { manager: 'Project Manager', translator: 'Translator', observer: 'Observer' };
const ORG_ROLE_DASHBOARDS = { manager: 'manager-dashboard.html', translator: 'translator-dashboard.html', observer: 'observer-dashboard.html' };

function getOrgState() {
  const config = window.ORG_CONFIG || DEFAULT_ORG_CONFIG;
  const savedId = localStorage.getItem('fluent_active_org');
  const validIds = config.orgs.map(o => o.id);
  return {
    orgs: config.orgs,
    activeOrgId: (savedId && validIds.includes(savedId)) ? savedId : config.activeOrgId,
  };
}

function renderOrgSwitcher() {
  const slot = document.getElementById('org-switcher');
  if (!slot) return;

  const state   = getOrgState();
  const activeOrg = state.orgs.find(o => o.id === state.activeOrgId) || state.orgs[0];
  const isMulti = state.orgs.length > 1;

  if (!isMulti) {
    slot.innerHTML = `<span class="org-label">${activeOrg.name}</span>`;
    return;
  }

  const chevronSvg = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="6 9 12 15 18 9"/></svg>`;

  const items = state.orgs.map(org => {
    const isActiveOrg = org.id === activeOrg.id;
    const roles = org.roles || ['manager'];

    // Single-role orgs still show their one role as a chip (not a plain
    // clickable row) — the chip's active/blue state is what shows selection.
    const chips = roles.map(role => `
      <button class="org-role-chip ${isActiveOrg && role === currentRole ? 'active' : ''}"
              onclick="selectOrgRole('${org.id}', '${role}')">${ORG_ROLE_LABELS[role] || role}</button>
    `).join('');

    return `
      <div class="org-dropdown-group ${isActiveOrg ? 'active' : ''}">
        <div class="org-dropdown-org-name">
          <span>${org.name}</span>
        </div>
        <div class="org-role-chips">${chips}</div>
      </div>
    `;
  }).join('');

  slot.innerHTML = `
    <button class="org-btn" id="org-btn" onclick="toggleOrgDropdown(event)">
      ${activeOrg.name}
      ${chevronSvg}
    </button>
    <div class="org-dropdown" id="org-dropdown">
      <div class="org-dropdown-header">Switch Organization</div>
      ${items}
    </div>
  `;
}

function toggleOrgDropdown(event) {
  event.stopPropagation();
  const btn      = document.getElementById('org-btn');
  const dropdown = document.getElementById('org-dropdown');
  if (!btn || !dropdown) return;
  const isOpen = dropdown.classList.contains('open');
  // Close other menus
  document.getElementById('main-menu')?.classList.remove('open');
  document.getElementById('user-menu')?.classList.remove('open');
  btn.classList.toggle('open', !isOpen);
  dropdown.classList.toggle('open', !isOpen);
}

function renderUserMenuOrgSwitcher() {
  const section = document.getElementById('um-org-section');
  if (!section) return;

  const state     = getOrgState();
  const activeOrg = state.orgs.find(o => o.id === state.activeOrgId) || state.orgs[0];
  const orgIcon   = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`;
  const chevronSvg = `<svg class="um-org-chevron" id="um-org-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="6 9 12 15 18 9"/></svg>`;

  if (state.orgs.length <= 1) {
    section.innerHTML = `
      <div class="um-org-trigger" style="cursor:default;" title="${activeOrg.name}">
        <div class="um-org-trigger-left">${orgIcon} <span class="um-org-name">${activeOrg.name}</span></div>
      </div>`;
    return;
  }

  const items = state.orgs.map(org => {
    const isActiveOrg = org.id === activeOrg.id;
    const roles = org.roles || ['manager'];
    const chips = roles.map(role => `
      <button class="org-role-chip ${isActiveOrg && role === currentRole ? 'active' : ''}"
              onclick="selectOrgRole('${org.id}', '${role}')">${ORG_ROLE_LABELS[role] || role}</button>
    `).join('');
    return `
      <div class="org-dropdown-group ${isActiveOrg ? 'active' : ''}">
        <div class="org-dropdown-org-name"><span>${org.name}</span></div>
        <div class="org-role-chips">${chips}</div>
      </div>
    `;
  }).join('');

  section.innerHTML = `
    <button class="um-org-trigger" onclick="toggleUserMenuOrgDropdown(event)" title="${activeOrg.name}">
      <div class="um-org-trigger-left">${orgIcon} <span class="um-org-name">${activeOrg.name}</span></div>
      ${chevronSvg}
    </button>
    <div class="um-org-dropdown-body" id="um-org-dropdown-body">
      <div class="org-dropdown-header" style="padding:6px 16px 4px;">Switch Organization</div>
      ${items}
    </div>
  `;
}

function toggleUserMenuOrgDropdown(event) {
  event.stopPropagation();
  const body    = document.getElementById('um-org-dropdown-body');
  const chevron = document.getElementById('um-org-chevron');
  if (!body) return;
  const isOpen = body.classList.contains('open');
  body.classList.toggle('open', !isOpen);
  chevron?.classList.toggle('open', !isOpen);
}

// After discussion: org and role are chosen together in one click from the
// dropdown (org name + role chips), so switching straight to the
// role-appropriate dashboard for the selected org happens in a single step.
function selectOrgRole(orgId, role) {
  localStorage.setItem('fluent_active_org', orgId);
  document.getElementById('org-dropdown')?.classList.remove('open');
  document.getElementById('org-btn')?.classList.remove('open');
  document.getElementById('user-menu')?.classList.remove('open');
  document.dispatchEvent(new CustomEvent('orgchange', { detail: { orgId, role } }));
  navigateToRoleDashboard(role);
}

function navigateToRoleDashboard(role) {
  window.location.href = ORG_ROLE_DASHBOARDS[role] || ORG_ROLE_DASHBOARDS.manager;
}

// ── Init ──────────────────────────────────────────────────────────────────────
function renderHeader() {
  const style = document.createElement('style');
  style.id = 'fluent-shared-styles';
  style.textContent = SHARED_CSS;
  document.head.insertBefore(style, document.head.firstChild);

  const placeholder = document.getElementById('fluent-header');
  if (placeholder) placeholder.outerHTML = HEADER_HTML;

  // Read the page's role before rendering the settings org switcher, so the
  // active role chip reflects the dashboard actually being viewed.
  const pageRole = document.body.dataset.role;
  if (pageRole) currentRole = pageRole;

  // Apply saved/preferred theme before painting
  initTheme();

  // Inject Settings dialog into body
  document.body.insertAdjacentHTML('beforeend', SETTINGS_HTML);
  document.getElementById('settings-close').addEventListener('click', closeSettings);
  document.getElementById('settings-overlay').addEventListener('click', function(e) {
    if (e.target === this) closeSettings();
  });

  // Inject Create Project dialog (no close-on-outside per real app)
  document.body.insertAdjacentHTML('beforeend', CREATE_PROJECT_HTML);
  document.getElementById('cp-close').addEventListener('click', closeCreateProject);
  document.addEventListener('click', function(e) {
    const dropdown = document.getElementById('cp-books-dropdown');
    if (dropdown && !dropdown.closest('.cp-books-wrap').contains(e.target)) {
      dropdown.classList.remove('open');
    }
  });

  // Inject Edit Profile dialog
  document.body.insertAdjacentHTML('beforeend', EDIT_PROFILE_HTML);
  document.getElementById('ep-close').addEventListener('click', closeEditProfile);

  if (currentRole !== 'manager') applyRoleUI();
}

document.addEventListener('DOMContentLoaded', renderHeader);
