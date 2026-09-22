// Fluent Mockup — Custom Select
// Native <select> popups render with the OS/browser's own dark-mode
// preference regardless of the page's light/dark theme, and the real app
// never uses a native <select> at all (see fluent-web-repo's ui/select.tsx,
// a Radix trigger+popover). This file progressively enhances every <select>
// on the page into that same trigger+dropdown look — matching the pattern
// create-project.js already established for its Pericope Set/Books fields —
// without requiring any changes to the <option> markup or the `.value` /
// `.selectedIndex` / `.disabled` / `change`-event code every page already
// has wired to its selects.

const CUSTOM_SELECT_CSS = `
  select.cs-native-hidden { position: absolute; opacity: 0; pointer-events: none; height: 1px; width: 1px; }

  .cs-wrap { position: relative; display: inline-block; }
  .cs-wrap.cs-block { display: block; width: 100%; }

  .cs-trigger {
    height: 36px;
    padding: 0 12px;
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
    gap: 8px;
    transition: border-color 0.15s;
    white-space: nowrap;
    min-width: 160px;
  }
  .cs-wrap.cs-block .cs-trigger { width: 100%; min-width: 0; }
  .cs-trigger-label { overflow: hidden; text-overflow: ellipsis; }
  .cs-trigger svg { flex-shrink: 0; opacity: 0.6; transition: transform 0.15s; }
  .cs-trigger.open svg { transform: rotate(180deg); }
  .cs-trigger:disabled { background: var(--muted); color: var(--muted-foreground); cursor: not-allowed; }
  .cs-trigger:not(:disabled):hover { border-color: var(--primary); }
  .dark .cs-trigger { background: #2a3240; border-color: var(--border); color: var(--foreground); }
  .dark .cs-trigger:disabled { background: #1c222d; }

  .cs-dropdown {
    display: none;
    position: fixed;
    background: #fff;
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    box-shadow: 0 4px 16px rgba(0,0,0,0.12);
    max-height: 240px;
    overflow-y: auto;
    z-index: 300;
    padding: 4px 0;
  }
  .cs-dropdown.open { display: block; }
  .dark .cs-dropdown { background: #2a3240; border-color: var(--border); }

  .cs-item {
    padding: 8px 14px;
    font-size: 14px;
    color: var(--foreground);
    cursor: pointer;
    white-space: nowrap;
  }
  .cs-item:hover { background: var(--list-hover); }
  .cs-item.selected { font-weight: 600; color: var(--primary); }
  .cs-item.cs-item-disabled { color: var(--muted-foreground); cursor: not-allowed; }
`;

const CHEVRON_SVG = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="6 9 12 15 18 9"/></svg>`;

// Finds the nearest prototype in the chain that defines a real setter for
// `prop`, so external code's `select.value = x` / `.selectedIndex = x` /
// `.disabled = x` keeps working exactly as before, while also updating our
// custom trigger — no changes needed anywhere else in the codebase.
function csDefinePropertyProxy(el, prop, onSet) {
  let proto = Object.getPrototypeOf(el);
  let desc;
  while (proto && !desc) {
    desc = Object.getOwnPropertyDescriptor(proto, prop);
    proto = Object.getPrototypeOf(proto);
  }
  if (!desc || !desc.set) return;
  Object.defineProperty(el, prop, {
    configurable: true,
    enumerable: desc.enumerable,
    get() { return desc.get.call(el); },
    set(v) {
      desc.set.call(el, v);
      onSet();
    },
  });
}

function csEnhanceSelect(select) {
  if (select.dataset.csEnhanced) return;
  select.dataset.csEnhanced = 'true';
  select.classList.add('cs-native-hidden');
  select.tabIndex = -1;

  const isBlock = select.classList.contains('form-select') || select.classList.contains('ep-input');

  const wrap = document.createElement('span');
  wrap.className = 'cs-wrap' + (isBlock ? ' cs-block' : '');
  select.insertAdjacentElement('afterend', wrap);

  const trigger = document.createElement('button');
  trigger.type = 'button';
  trigger.className = 'cs-trigger';
  trigger.innerHTML = `<span class="cs-trigger-label"></span>${CHEVRON_SVG}`;
  wrap.appendChild(trigger);

  const dropdown = document.createElement('div');
  dropdown.className = 'cs-dropdown';
  wrap.appendChild(dropdown);

  const labelEl = trigger.querySelector('.cs-trigger-label');

  function renderOptions() {
    dropdown.innerHTML = Array.from(select.options).map((opt, i) => `
      <div class="cs-item ${i === select.selectedIndex ? 'selected' : ''} ${opt.disabled ? 'cs-item-disabled' : ''}" data-index="${i}">${opt.textContent}</div>
    `).join('');
  }

  function refreshLabel() {
    const opt = select.options[select.selectedIndex];
    labelEl.textContent = opt ? opt.textContent : '';
    trigger.disabled = select.disabled;
  }

  function closeDropdown() {
    dropdown.classList.remove('open');
    trigger.classList.remove('open');
  }

  function openDropdown() {
    document.querySelectorAll('.cs-dropdown.open').forEach(d => { d.classList.remove('open'); d.previousElementSibling?.classList.remove('open'); });
    renderOptions();
    const rect = trigger.getBoundingClientRect();
    dropdown.style.top = (rect.bottom + 4) + 'px';
    dropdown.style.left = rect.left + 'px';
    dropdown.style.width = rect.width + 'px';
    dropdown.classList.add('open');
    trigger.classList.add('open');
  }

  trigger.addEventListener('click', (e) => {
    e.stopPropagation();
    if (trigger.disabled) return;
    dropdown.classList.contains('open') ? closeDropdown() : openDropdown();
  });

  dropdown.addEventListener('click', (e) => {
    const item = e.target.closest('.cs-item');
    if (!item || item.classList.contains('cs-item-disabled')) return;
    select.selectedIndex = Number(item.dataset.index);
    select.dispatchEvent(new Event('input', { bubbles: true }));
    select.dispatchEvent(new Event('change', { bubbles: true }));
    closeDropdown();
  });

  // Options can change after enhancement (e.g. a book-filter list populated
  // from data); re-render is cheap so just do it lazily on every open above,
  // but selectedIndex/value/disabled still need proxies since those can be
  // set at any time, not just right before an open.
  csDefinePropertyProxy(select, 'value', refreshLabel);
  csDefinePropertyProxy(select, 'selectedIndex', refreshLabel);
  csDefinePropertyProxy(select, 'disabled', refreshLabel);

  refreshLabel();
}

function enhanceAllSelects(root) {
  (root || document).querySelectorAll('select').forEach(csEnhanceSelect);
}

document.addEventListener('click', () => {
  document.querySelectorAll('.cs-dropdown.open').forEach(d => { d.classList.remove('open'); d.previousElementSibling?.classList.remove('open'); });
});

function initCustomSelects() {
  const style = document.createElement('style');
  style.id = 'fluent-custom-select-styles';
  style.textContent = CUSTOM_SELECT_CSS;
  document.head.appendChild(style);
  enhanceAllSelects();
}

document.addEventListener('DOMContentLoaded', initCustomSelects);
