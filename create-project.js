// Fluent Mockup — Create Project Dialog (new + import-existing flows)
// Only loaded on pages with a "Create Project" entry point (manager-dashboard,
// project-list-translator, observer-dashboard). Self-registers with
// renderHeader() via initCreateProjectDialog().

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

const CREATE_PROJECT_CSS = `
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
  .cp-imp-file-list {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  .cp-imp-file-item {
    display: flex;
    align-items: center;
    gap: 6px;
    color: #0f7a35;
    font-weight: 600;
  }
  .dark .cp-imp-file-item { color: #7fd39d; }
  .cp-imp-file-item svg { flex-shrink: 0; }
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

  /* ── Existing data tab: USFM upload ── */
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
          <label class="ep-label"><span class="ep-required">*</span> Pericope Set</label>
          <div class="cp-books-wrap">
            <button class="cp-books-trigger" id="cp-pericope-set-trigger" type="button" onclick="cpToggleDropdown(event, 'cp-pericope-set-dropdown')">
              <span id="cp-pericope-set-label">Select pericope set for the project</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="6 9 12 15 18 9"/></svg>
            </button>
            <div class="cp-books-dropdown" id="cp-pericope-set-dropdown">
              <div class="cp-book-item" onclick="cpChoosePericope('fia', 'FIA')">Familiarization, Internalization, Articulation (FIA)</div>
              <div class="cp-book-item" onclick="cpChoosePericope('fcbh', 'FCBH')">Faith Comes by Hearing (FCBH)</div>
            </div>
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
          <div class="cp-books-wrap">
            <button class="cp-books-trigger" id="cp-connectivity-profile-trigger" type="button" onclick="cpToggleDropdown(event, 'cp-connectivity-profile-dropdown')">
              <span id="cp-connectivity-profile-label">Select profile</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="6 9 12 15 18 9"/></svg>
            </button>
            <div class="cp-books-dropdown" id="cp-connectivity-profile-dropdown">
              <div class="cp-book-item" onclick="cpChooseConnectivity('usually-connected', 'Usually Connected')">Usually Connected</div>
              <div class="cp-book-item" onclick="cpChooseConnectivity('sometimes-connected', 'Sometimes Connected')">Sometimes Connected</div>
              <div class="cp-book-item" onclick="cpChooseConnectivity('rarely-connected', 'Rarely Connected')">Rarely Connected</div>
            </div>
          </div>
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
          <input type="file" id="cp-sb-file" accept=".zip" multiple style="display:none" onchange="cpSbFileSelected(this.files)">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
          <div class="cp-sb-upload-text">
            <strong>Upload USFM files</strong><br>
            Drag and drop one or more USFM files here
          </div>
          <button type="button" class="cp-sb-select-btn" onclick="event.stopPropagation(); document.getElementById('cp-sb-file').click()">Select Files</button>
          <div class="cp-sb-upload-sub">USFM is the only supported format.</div>
        </div>
        <div class="cp-sb-filename" id="cp-sb-filename" style="display:none;"></div>
        <div class="cp-sb-error" id="cp-sb-error" style="display:none;"></div>
      </div>

      <div class="cp-imp-duplicate-banner" id="cp-imp-duplicate-banner" style="display:none;"></div>

      <div class="cp-fields" id="cp-imp-fields" style="display:none;">
        <div class="cp-imp-file-row" id="cp-imp-file-row">
          <div class="cp-imp-file-list" id="cp-imp-file-list"></div>
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
          <label class="ep-label"><span class="ep-required">*</span> Target Language</label>
          <div class="cp-search-wrap" id="cp-imp-target-wrap">
            <input class="ep-input" id="cp-imp-target-search" type="text" autocomplete="off"
              placeholder="Search by language name or code"
              oninput="cpImpTargetSearch()" onfocus="cpImpTargetSearch()"
              onblur="setTimeout(()=>document.getElementById('cp-imp-target-results').classList.remove('open'), 150)">
            <div class="cp-search-results" id="cp-imp-target-results"></div>
            <div class="cp-selected-chip" id="cp-imp-target-chip" style="display:none;"></div>
          </div>
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

// ── Import tab target search (WNPD-10: plain USFM carries no target
// language metadata, so it is never pre-filled; the user always selects it) ──
let cpImpSelectedTarget = null;

function cpImpTargetSearch() {
  const query = document.getElementById('cp-imp-target-search').value.trim().toLowerCase();
  const resultsEl = document.getElementById('cp-imp-target-results');
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
    <div class="cp-search-item" onmousedown="event.preventDefault(); cpImpSelectTarget('${l.code}')">
      <div class="cp-search-item-text">
        <span class="cp-search-item-main">${l.name} (${l.code})</span>
        <span class="cp-search-item-sub">${l.country}</span>
      </div>
    </div>`).join('');
  resultsEl.classList.add('open');
}

function cpImpSelectTarget(code) {
  const lang = cpLangByCode(code);
  cpImpSelectedTarget = { code, name: lang ? lang.name : code };
  document.getElementById('cp-imp-target-search').value = '';
  document.getElementById('cp-imp-target-search').blur();
  document.getElementById('cp-imp-target-results').classList.remove('open');

  const chip = document.getElementById('cp-imp-target-chip');
  chip.innerHTML = `
    <div class="cp-selected-chip-text"><strong>${cpImpSelectedTarget.name}</strong> (${cpImpSelectedTarget.code})</div>
    <button type="button" class="cp-selected-chip-clear" onclick="cpImpClearTarget()" aria-label="Clear target language">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
    </button>`;
  chip.style.display = 'flex';
  document.getElementById('cp-imp-target-search').style.display = 'none';
  cpImpValidate();
}

function cpImpClearTarget() {
  cpImpSelectedTarget = null;
  document.getElementById('cp-imp-target-chip').style.display = 'none';
  document.getElementById('cp-imp-target-search').style.display = '';
  document.getElementById('cp-imp-target-search').value = '';
  document.getElementById('cp-imp-target-search').focus();
  cpImpValidate();
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
let cpSelectedPericope = null; // { value, label }
let cpSelectedConnectivity = null; // { value, label }

function cpToggleDropdown(e, id) {
  e.stopPropagation();
  document.getElementById(id).classList.toggle('open');
}

function cpChoosePericope(value, label) {
  cpSelectedPericope = { value, label };
  document.getElementById('cp-pericope-set-label').textContent = label;
  document.getElementById('cp-pericope-set-dropdown').classList.remove('open');
  cpValidate();
}

function cpChooseConnectivity(value, label) {
  cpSelectedConnectivity = { value, label };
  document.getElementById('cp-connectivity-profile-label').textContent = label;
  document.getElementById('cp-connectivity-profile-dropdown').classList.remove('open');
}

// ── Tabs ────────────────────────────────────────────────────────────────────
function cpSwitchTab(tab) {
  const isNew = tab === 'new';
  document.getElementById('cp-tab-new').classList.toggle('active', isNew);
  document.getElementById('cp-tab-existing').classList.toggle('active', !isNew);
  document.getElementById('cp-panel-new').style.display = isNew ? '' : 'none';
  document.getElementById('cp-panel-existing').style.display = isNew ? 'none' : '';
}

// ── Existing data tab: USFM upload (mock validation) ───────────
// No zip-parsing library is loaded in this prototype, so validation is
// simulated from the filename: "nolang"/"nobooks" preview those specific
// rejections, "invalid" previews the generic invalid-package rejection,
// and any other name (e.g. Kachi-Koli-gjk-gospels.zip) previews the pass state.
function cpSbDrop(e) {
  e.preventDefault();
  document.getElementById('cp-sb-dropzone').classList.remove('drag');
  cpSbFileSelected(e.dataTransfer.files);
}

function cpSbFileSelected(files) {
  if (!files || !files.length) return;
  const fileNames = Array.from(files).map(f => f.name);

  const filenameEl = document.getElementById('cp-sb-filename');
  const errorEl = document.getElementById('cp-sb-error');
  filenameEl.textContent = fileNames.length === 1 ? fileNames[0] : `${fileNames.length} files selected`;
  filenameEl.style.display = 'flex';
  errorEl.style.display = 'none';

  const errors = [];
  fileNames.forEach(fileName => {
    const name = fileName.toLowerCase();
    if (name.includes('nolang')) errors.push(`${fileName}: Missing target language.`);
    else if (name.includes('nobooks')) errors.push(`${fileName}: Missing book data.`);
    else if (name.includes('invalid')) errors.push(`${fileName}: File is not a valid USFM file.`);
  });

  if (errors.length) {
    errorEl.innerHTML = errors.join('<br>');
    errorEl.style.display = 'block';
    return;
  }
  cpImpShowFields(fileNames);
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
  document.getElementById('cp-imp-file-list').innerHTML = '';

  document.getElementById('cp-imp-title').value = '';
  cpImpSelectedSource = null;
  cpImpSourceDrillLang = null;
  document.getElementById('cp-imp-source-search').value = '';
  document.getElementById('cp-imp-source-search').style.display = '';
  document.getElementById('cp-imp-source-results').classList.remove('open');
  document.getElementById('cp-imp-source-chip').style.display = 'none';
  cpImpSelectedTarget = null;
  document.getElementById('cp-imp-target-search').value = '';
  document.getElementById('cp-imp-target-search').style.display = '';
  document.getElementById('cp-imp-target-results').classList.remove('open');
  document.getElementById('cp-imp-target-chip').style.display = 'none';
  document.getElementById('cp-imp-connectivity-profile').value = '';
}

// ── Existing data tab: post-validation fields (mocks WNPD-02) ──────────────
// The package's own data (Target Language, Books) is parsed and shown
// read-only; Source Language/Bible is still picked manually since source
// text is out of scope for import. No real package parser is wired up in
// this prototype, so the parsed values below are a fixed mock package.
const MOCK_PARSED_PACKAGE = {
  title: 'Kachi Koli Gospels',
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

function cpImpShowFields(filenames) {
  const fileNames = Array.isArray(filenames) ? filenames : [filenames];
  document.getElementById('cp-imp-upload-section').style.display = 'none';
  document.getElementById('cp-imp-fields').style.display = 'grid';
  document.getElementById('cp-imp-footer').style.display = 'flex';
  document.getElementById('cp-imp-file-list').innerHTML = fileNames.map(name => `
    <div class="cp-imp-file-item">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
      <span>${escapeHtml(name)}</span>
    </div>
  `).join('');

  document.getElementById('cp-imp-books-display').textContent = MOCK_PARSED_PACKAGE.books.join(', ');

  // document.getElementById('cp-imp-status').textContent = 'Package validated. Target language and book data detected.';
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
    cpImpSelectedSource &&
    cpImpSelectedTarget;
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

  cpSelectedPericope = null;
  document.getElementById('cp-pericope-set-label').textContent = 'Select pericope set for the project';
  document.getElementById('cp-pericope-set-dropdown').classList.remove('open');

  cpSelectedConnectivity = null;
  document.getElementById('cp-connectivity-profile-label').textContent = 'Select profile';
  document.getElementById('cp-connectivity-profile-dropdown').classList.remove('open');

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
    cpSelectedBooks.size > 0 &&
    cpSelectedPericope;
  document.getElementById('cp-submit').disabled = !ok;
}


function initCreateProjectDialog() {
  const style = document.createElement('style');
  style.id = 'fluent-create-project-styles';
  style.textContent = CREATE_PROJECT_CSS;
  document.head.appendChild(style);

  document.body.insertAdjacentHTML('beforeend', CREATE_PROJECT_HTML);
  document.getElementById('cp-close').addEventListener('click', closeCreateProject);
  document.addEventListener('click', function(e) {
    ['cp-books-dropdown', 'cp-pericope-set-dropdown', 'cp-connectivity-profile-dropdown'].forEach(id => {
      const dropdown = document.getElementById(id);
      if (dropdown && !dropdown.closest('.cp-books-wrap').contains(e.target)) {
        dropdown.classList.remove('open');
      }
    });
  });
}
