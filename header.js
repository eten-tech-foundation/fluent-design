// Fluent Mockup — Header, Nav, Org Switcher, Theme & TTS
// Loaded on every page. Edit header/nav/org-switcher/theme/dark-mode here.
// Settings, Edit Profile, and Create Project dialogs live in their own files
// (settings-dialog.js, edit-profile.js, create-project.js) and self-register
// with renderHeader() below via optional init hooks.

const HEADER_CSS = `
  /* Tokens, base reset, and body defaults now live in main.css (loaded as a
     <link> on every page before this script runs) so there's one source of
     truth instead of this JS-injected copy. */

  /* ── Header ── */
  .header {
    background: var(--primary);
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    align-items: center;
    padding: 0 18px;
    height: 56px;
    position: sticky;
    top: 0;
    z-index: 100;
  }

  .header-left   { justify-self: start; display: flex; align-items: center; gap: 32px; }
  .header-banner-slot { justify-self: center; min-width: 0; }
  .header-right  { justify-self: end; display: flex; align-items: center; gap: 10px; }

  /* ── Role-change banner (shown centered in the header; see drafting.html) ── */
  .role-change-banner {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    border-radius: var(--radius);
    background: var(--destructive);
    color: var(--error-foreground);
    font-size: 13px;
    font-weight: 600;
    white-space: nowrap;
  }

  .in-editing-banner {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    border-radius: var(--radius);
    background: #ffff00;
    color: #000000;
    font-size: 13px;
    font-weight: 600;
    white-space: nowrap;
  }

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
  .org-role-chips { display: flex; flex-wrap: wrap; gap: 5px; }

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

  /* Dark mode tokens now live in main.css */
  .dark .hamburger { background: #2a3240; }
  .dark .hamburger span { background: var(--foreground); }
  .dark .user-btn { background: #2a3240; }
  .dark .user-btn svg { stroke: var(--foreground); }
  .dark .user-menu { background: var(--popover); border-color: var(--border); }
  .dark .settings-dialog { background: #1e2533; }
`;

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
        </div>
        <div id="menu-org-manager" style="display:none">
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
        <div id="menu-super-user" style="display:none">
          <a class="main-menu-item" href="organizations.html">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18"/><path d="M5 21V7l7-4 7 4v14"/><path d="M9 9h1"/><path d="M9 13h1"/><path d="M14 9h1"/><path d="M14 13h1"/><path d="M9 21v-4h6v4"/></svg>
            Organizations
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
  <div class="header-banner-slot">
    <div id="role-change-banner" class="role-change-banner" style="display:none" aria-live="assertive">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
      <span>Your role has changed. You no longer have permission to edit this chapter.</span>
    </div>
    <div id="in-editing-banner" class="in-editing-banner" style="display:none" aria-live="assertive">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
      <span>[Name] is editing this chapter.</span>
    </div>
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

const ROLE_USER_LABELS = {
  manager:      'Chad M',
  translator:   'Chad T',
  observer:     'Chad T',
  'org-manager': 'Chad O',
  'super-user': 'Chad S',
};

function applyRoleUI() {
  const isManager     = currentRole === 'manager';
  const isTranslator  = currentRole === 'translator';
  const isObserver    = currentRole === 'observer';
  const isOrgManager  = currentRole === 'org-manager';
  const isSuperUser  = currentRole === 'super-user';
  document.getElementById('user-menu-label').textContent  = ROLE_USER_LABELS[currentRole] || 'Chad M';
  document.getElementById('logo-link').href                = ORG_ROLE_DASHBOARDS[currentRole] || ORG_ROLE_DASHBOARDS.manager;
  document.getElementById('menu-manager').style.display     = isManager     ? '' : 'none';
  document.getElementById('menu-translator').style.display  = isTranslator  ? '' : 'none';
  document.getElementById('menu-observer').style.display    = isObserver    ? '' : 'none';
  document.getElementById('menu-org-manager').style.display = isOrgManager  ? '' : 'none';
  document.getElementById('menu-super-user').style.display = isSuperUser  ? '' : 'none';
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

// ── TTS (verse audio playback) ────────────────────────────────────────────────
const SPEAKER_ON_SVG  = `<polygon points="11 5 6 9 3 9 3 15 6 15 11 19 11 5"/><line x1="17" y1="9" x2="23" y2="15"/><line x1="23" y1="9" x2="17" y2="15"/>`;
const SPEAKER_OFF_SVG = `<polygon points="11 5 6 9 3 9 3 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M18.36 5.64a9 9 0 0 1 0 12.73"/>`;

function applyTTS(isOn) {
  document.documentElement.classList.toggle('audio-off', !isOn);
  const icon  = document.getElementById('tts-icon');
  const label = document.getElementById('tts-label');
  if (icon)  icon.innerHTML     = isOn ? SPEAKER_ON_SVG : SPEAKER_OFF_SVG;
  if (label) label.textContent  = isOn ? 'Hide Audio' : 'Show Audio';
}

function initTTS() {
  const saved = localStorage.getItem('tts-v2');
  const isOn = saved === null ? false : saved === 'on';
  applyTTS(isOn);
}

function toggleTTS() {
  const isOn = document.documentElement.classList.contains('audio-off');
  localStorage.setItem('tts-v2', isOn ? 'on' : 'off');
  applyTTS(isOn);
}

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


// ── Org switcher ─────────────────────────────────────────────────────────────

// Default org state — pages can override window.ORG_CONFIG before components.js init
// `roles` lists the roles the current user holds within that org.
const DEFAULT_ORG_CONFIG = {
  orgs: [
    { id: 'bcs-india', name: 'BCS', roles: ['manager', 'translator', 'org-manager'] },
    { id: 'wycliffe', name: 'Wycliffe Global Partners', roles: ['translator', 'observer'] },
  ],
  activeOrgId: 'bcs-india',
};

const ORG_ROLE_LABELS = { manager: 'Project Manager', translator: 'Translator', observer: 'Observer', 'org-manager': 'Org Manager' };
const ORG_ROLE_DASHBOARDS = {
  manager: 'manager-dashboard.html',
  translator: 'translator-dashboard.html',
  observer: 'observer-dashboard.html',
  'org-manager': 'manager-dashboard.html',
  'super-user': 'organizations.html',
};

// Super User is a platform-level role with no org — it doesn't appear in any
// org's `roles` list, and is rendered as its own section in the switcher.
const SUPER_USER_LABEL = 'Super User';

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
  const isSuperUser = currentRole === 'super-user';
  const triggerName = isSuperUser ? 'Platform' : activeOrg.name;
  const orgIcon   = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`;
  const chevronSvg = `<svg class="um-org-chevron" id="um-org-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="6 9 12 15 18 9"/></svg>`;

  // Super User has no org, so it renders as its own unaffiliated row below
  // the org groups rather than as a chip nested under one.
  const SuperUserSection = `
    <div class="org-dropdown-group ${isSuperUser ? 'active' : ''}">
      <div class="org-dropdown-org-name"><span>Platform</span></div>
      <div class="org-role-chips">
        <button class="org-role-chip ${isSuperUser ? 'active' : ''}"
                onclick="selectSuperUser()">${SUPER_USER_LABEL}</button>
      </div>
    </div>
  `;

  if (state.orgs.length <= 1) {
    section.innerHTML = `
      <div class="um-org-trigger" style="cursor:default;" title="${triggerName}">
        <div class="um-org-trigger-left">${orgIcon} <span class="um-org-name">${triggerName}</span></div>
      </div>
      <div class="um-org-dropdown-body open" id="um-org-dropdown-body">
        ${SuperUserSection}
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
    <button class="um-org-trigger" onclick="toggleUserMenuOrgDropdown(event)" title="${triggerName}">
      <div class="um-org-trigger-left">${orgIcon} <span class="um-org-name">${triggerName}</span></div>
      ${chevronSvg}
    </button>
    <div class="um-org-dropdown-body" id="um-org-dropdown-body">
      <div class="org-dropdown-header" style="padding:6px 16px 4px;">Switch Organization</div>
      ${items}
      ${SuperUserSection}
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
  localStorage.setItem('fluent_current_role', role);
  document.getElementById('org-dropdown')?.classList.remove('open');
  document.getElementById('org-btn')?.classList.remove('open');
  document.getElementById('user-menu')?.classList.remove('open');
  document.dispatchEvent(new CustomEvent('orgchange', { detail: { orgId, role } }));
  navigateToRoleDashboard(role);
}

// Super User has no org, so it only ever sets the role — the previously
// active org is left in localStorage untouched for whenever the user
// switches back into an org-scoped role.
function selectSuperUser() {
  localStorage.setItem('fluent_current_role', 'super-user');
  document.getElementById('user-menu')?.classList.remove('open');
  document.dispatchEvent(new CustomEvent('orgchange', { detail: { orgId: null, role: 'super-user' } }));
  navigateToRoleDashboard('super-user');
}

function navigateToRoleDashboard(role) {
  window.location.href = ORG_ROLE_DASHBOARDS[role] || ORG_ROLE_DASHBOARDS.manager;
}

// ── Role-change banner (dev trigger only, no real permission check) ─────────
function toggleEditingWarning() {
  const banner = document.getElementById('in-editing-banner');
  banner.style.display = banner.style.display === 'none' ? 'flex' : 'none';
}

// ── Role-change banner (dev trigger only, no real permission check) ─────────
function toggleRoleChangeWarning() {
  const banner = document.getElementById('role-change-banner');
  banner.style.display = banner.style.display === 'none' ? 'flex' : 'none';
}

// ── Init ──────────────────────────────────────────────────────────────────────
function renderHeader() {
  const style = document.createElement('style');
  style.id = 'fluent-shared-styles';
  style.textContent = HEADER_CSS;
  document.head.insertBefore(style, document.head.firstChild);

  const placeholder = document.getElementById('fluent-header');
  if (placeholder) placeholder.outerHTML = HEADER_HTML;

  // Pages tied to one role (translator-dashboard.html, observer-dashboard.html,
  // etc.) declare data-role and always win. Pages shared across roles
  // (manager-dashboard.html, view-project.html, users.html, organizations.html)
  // have no data-role, so fall back to the last role picked from the switcher.
  const pageRole = document.body.dataset.role;
  currentRole = pageRole || localStorage.getItem('fluent_current_role') || 'manager';
  localStorage.setItem('fluent_current_role', currentRole);

  initTheme();
  initTTS();

  if (typeof initSettingsDialog === 'function') initSettingsDialog();
  if (typeof initCreateProjectDialog === 'function') initCreateProjectDialog();
  if (typeof initEditProfileDialog === 'function') initEditProfileDialog();

  applyRoleUI();
}

document.addEventListener('DOMContentLoaded', renderHeader);
