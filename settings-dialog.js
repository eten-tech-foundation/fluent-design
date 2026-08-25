// Fluent Mockup — Settings Dialog
// Opened from the header user menu (see header.js). Self-registers with
// renderHeader() via initSettingsDialog().

const SETTINGS_CSS = `
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

`;

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

    <!-- TTS toggle -->
    <div class="settings-row" id="tts-toggle-row" onclick="toggleTTS()" style="cursor:pointer;user-select:none;">
      <svg id="tts-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;"><polygon points="11 5 6 9 3 9 3 15 6 15 11 19 11 5"/><line x1="17" y1="9" x2="23" y2="15"/><line x1="23" y1="9" x2="17" y2="15"/></svg>
      <span class="settings-row-label" id="tts-label">Show Audio</span>
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
        <br><br>
        Turning off AI Suggestions does not affect the AI Assistant, which uses only passage references and never reads your draft text.
      </div>
    </div>

    <!-- Footer -->
    <p class="settings-footer">
      See the <a href="#">Privacy Policy</a> and <a href="#">Terms of Use</a> for more information.
    </p>
  </div>
</div>
`;


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


function initSettingsDialog() {
  const style = document.createElement('style');
  style.id = 'fluent-settings-styles';
  style.textContent = SETTINGS_CSS;
  document.head.appendChild(style);

  document.body.insertAdjacentHTML('beforeend', SETTINGS_HTML);
  document.getElementById('settings-close').addEventListener('click', closeSettings);
  document.getElementById('settings-overlay').addEventListener('click', function(e) {
    if (e.target === this) closeSettings();
  });
}
