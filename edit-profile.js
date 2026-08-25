// Fluent Mockup — Edit Profile Dialog
// Opened from the header user menu (see header.js). Self-registers with
// renderHeader() via initEditProfileDialog().

const EDIT_PROFILE_CSS = `
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

`;

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


function initEditProfileDialog() {
  const style = document.createElement('style');
  style.id = 'fluent-edit-profile-styles';
  style.textContent = EDIT_PROFILE_CSS;
  document.head.appendChild(style);

  document.body.insertAdjacentHTML('beforeend', EDIT_PROFILE_HTML);
  document.getElementById('ep-close').addEventListener('click', closeEditProfile);
}
