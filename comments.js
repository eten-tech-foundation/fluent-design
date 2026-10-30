// ── Draft Comments (web #610 to #613) ───────────────────────────────────────
// Comment indicators, Add comment control, comment side panel, composer and
// replies, resolve / reopen / delete, stage scoping, whole-chapter list and
// the stage-advance warning. Loaded by drafting.html only.
//
// The panel is the Comments tab of #resources-panel (next to AI Assistant and
// Resources; same width, same resize handle).
// Page hooks (see drafting.html): cmtControlsHTML, cmtWrapClass,
// cmtOnVersesRendered, cmtSetActive, cmtGuardAdvance, cmtOpenChapter,
// and the cmtDev* buttons next to the other dev triggers.
(function () {
  'use strict';

  // ── Icons (Lucide paths) ───────────────────────────────────────────────────
  var ICON_PATHS = {
    'message-square':      '<path d="M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z"/>',
    'message-square-plus': '<path d="M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z"/><path d="M12 8v6"/><path d="M9 11h6"/>',
    'x':                   '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
    'unlink':              '<path d="m18.84 12.25 1.72-1.71h-.02a5.004 5.004 0 0 0-.12-7.07 5.006 5.006 0 0 0-6.95 0l-1.72 1.71"/><path d="m5.17 11.75-1.71 1.71a5.004 5.004 0 0 0 .12 7.07 5.006 5.006 0 0 0 6.95 0l1.71-1.71"/><line x1="8" x2="8" y1="2" y2="5"/><line x1="2" x2="5" y1="8" y2="8"/><line x1="16" x2="16" y1="19" y2="22"/><line x1="19" x2="22" y1="16" y2="16"/>',
    'lock':                '<rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
    'check':               '<path d="M20 6 9 17l-5-5"/>',
    'check-check':         '<path d="M18 6 7 17l-5-5"/><path d="m22 10-7.5 7.5L13 16"/>',
    'ellipsis-vertical':   '<circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/>',
    'trash':               '<path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>',
    'chevron-down':        '<path d="m6 9 6 6 6-6"/>',
    'chevron-up':          '<path d="m18 15-6-6-6 6"/>',
    'rotate-ccw':          '<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>',
    'reply':               '<path d="M9 17 4 12l5-5"/><path d="M20 18v-2a4 4 0 0 0-4-4H4"/>',
    'audio-lines':         '<path d="M2 10v3"/><path d="M6 6v11"/><path d="M10 3v18"/><path d="M14 8v7"/><path d="M18 5v13"/><path d="M22 10v3"/>',
    'triangle-alert':      '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/>'
  };
  function icon(name, size) {
    size = size || 16;
    return '<svg width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + ICON_PATHS[name] + '</svg>';
  }
  var PLAY_SVG  = '<svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>';
  var PAUSE_SVG = '<svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2"/></svg>';

  // ── Styles ─────────────────────────────────────────────────────────────────
  var CSS = `
    /* ── Comment indicator + Add comment control (verse draft cell) ── */
    /* Fixed slots, right to left: comment indicator (when open threads exist), Add comment, recorded-take pill */
    .translation-wrap { --cmt-shift: 0px; --add-shift: 36px; }
    .translation-wrap.has-cmt  { --cmt-shift: 62px; }
    .translation-wrap.has-cmt .translation-input { padding-right: 72px; }
    .translation-wrap .take-audio-group { right: calc(12px + var(--cmt-shift) + var(--add-shift)); }

    .cmt-ind {
      position: absolute; top: 8px; right: 12px; z-index: 2;
      display: inline-flex; align-items: center; gap: 4px;
      height: 28px; padding: 0 8px;
      border: none; border-radius: 999px;
      background: var(--accent); color: var(--primary);
      font-family: var(--font); font-size: 13px; font-weight: 700;
      cursor: pointer;
      transition: background 0.15s;
    }
    .cmt-ind:hover { background: var(--popover); }

    .cmt-add-group {
      position: absolute; top: 8px; z-index: 2;
      right: calc(12px + var(--cmt-shift));
      display: flex; align-items: center;
      opacity: 0; pointer-events: none;
      transition: opacity 0.15s;
      background: var(--background);
      border-radius: 999px;
      padding: 3px;
      box-shadow: 0 1px 4px rgba(0,0,0,0.12);
    }
    .translation-wrap:hover .cmt-add-group,
    .cmt-add-group:focus-within { opacity: 1; pointer-events: auto; }
    .cmt-add-btn {
      display: inline-flex; align-items: center; justify-content: center;
      width: 24px; height: 24px; padding: 0;
      border: 1.5px solid var(--primary); border-radius: 50%;
      background: var(--background); color: var(--primary);
      cursor: pointer; transition: background 0.15s;
    }
    .cmt-add-btn:hover { background: var(--muted); }

    /* ── Panel shell (swaps in for the resources content) ── */
    #comment-pane { display: none; flex: 1; min-height: 0; flex-direction: column; }
    .resources-panel.comments-mode > :not(#comment-pane):not(.resources-tab-row) { display: none !important; }
    .resources-panel.comments-mode > #comment-pane { display: flex; }

    /* ── Tab count: small primary circle after the label, a pill for two digits or more ── */
    .resources-tab-count {
      display: inline-flex; align-items: center; justify-content: center;
      min-width: 20px; height: 20px; margin-left: 6px; padding: 0;
      border-radius: 999px; background: var(--primary); color: var(--primary-foreground);
      font-size: 12px; font-weight: 700; line-height: 1;
    }
    .resources-tab-count.pill { padding: 0 6px; }
    .resources-tab-count:empty { display: none; }

    .cmt-head { padding: 6px 16px 10px; flex-shrink: 0; }
    .cmt-ref  { font-size: 1.125rem; font-weight: 700; color: var(--foreground); }
    .cmt-icon-btn {
      display: inline-flex; align-items: center; justify-content: center;
      width: 28px; height: 28px; padding: 0; flex-shrink: 0;
      border: none; border-radius: var(--radius-sm);
      background: transparent; color: var(--muted-foreground);
      cursor: pointer; transition: background 0.15s, color 0.15s;
    }
    .cmt-icon-btn:hover { background: var(--muted); color: var(--foreground); }

    .cmt-controls { padding: 0 16px 10px; display: flex; flex-direction: column; gap: 10px; flex-shrink: 0; }
    .cmt-seg {
      display: grid; grid-template-columns: 1fr 1fr;
      padding: 3px; gap: 3px;
      background: var(--muted); border-radius: var(--radius-sm);
    }
    .cmt-seg button {
      height: 30px; border: none; border-radius: calc(var(--radius-sm) - 2px);
      background: transparent; color: var(--muted-foreground);
      font-family: var(--font); font-size: 13px; font-weight: 600; cursor: pointer;
    }
    .cmt-seg button.active { background: var(--background); color: var(--foreground); box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
    .cmt-chips { display: flex; gap: 8px; flex-wrap: wrap; }
    .cmt-chips .chip { height: 30px; padding: 0 14px; font-size: 13px; }

    .cmt-list { flex: 1; min-height: 0; overflow-y: auto; padding: 4px 16px 12px; display: flex; flex-direction: column; gap: 12px; }
    .cmt-empty { padding: 28px 8px; text-align: center; font-size: 14px; color: var(--muted-foreground); }
    .cmt-readonly {
      display: flex; align-items: center; gap: 8px;
      padding: 8px 12px; border-radius: var(--radius-sm);
      background: var(--muted); color: var(--muted-foreground);
      font-size: 13px; font-weight: 500;
    }

    /* ── Threads and comments ── */
    .cmt-thread {
      border: 1px solid var(--border); border-radius: var(--radius-lg);
      background: var(--background); padding: 10px 12px;
      display: flex; flex-direction: column; gap: 8px;
    }
    .cmt-thread.resolved { background: var(--muted); }
    .cmt-thread.flash { animation: cmt-flash 1.6s ease-out 1; }
    @keyframes cmt-flash { 0%, 40% { box-shadow: 0 0 0 3px var(--primary); } 100% { box-shadow: 0 0 0 0 transparent; } }
    .cmt-item { display: flex; flex-direction: column; gap: 4px; min-width: 0; }
    .cmt-item-head { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; min-height: 28px; }
    .cmt-author { font-size: 14px; font-weight: 700; color: var(--foreground); }
    .cmt-role, .cmt-time { font-size: 12px; color: var(--muted-foreground); }
    .cmt-time { cursor: default; }
    .cmt-spacer { flex: 1; }
    .cmt-text { font-size: 14px; line-height: 1.5; color: var(--foreground); white-space: pre-wrap; overflow-wrap: anywhere; }
    .cmt-unlinked {
      display: inline-flex; align-items: center; gap: 4px;
      padding: 1px 8px; border: 1px solid var(--border); border-radius: 999px;
      font-size: 12px; font-weight: 600; color: var(--muted-foreground);
    }
    .cmt-replies { display: flex; flex-direction: column; gap: 8px; margin-left: 12px; padding-left: 12px; border-left: 2px solid var(--border); }
    .cmt-resolved-note { display: flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 600; color: var(--success-foreground); }

    .cmt-link-btn, .cmt-resolve-btn {
      display: inline-flex; align-items: center; gap: 4px;
      height: 28px; padding: 0 8px; border: none; border-radius: var(--radius-sm);
      background: transparent; color: var(--primary);
      font-family: var(--font); font-size: 13px; font-weight: 600; cursor: pointer;
    }
    .cmt-link-btn:hover, .cmt-resolve-btn:hover { background: var(--accent); }
    .cmt-link-btn { align-self: flex-start; margin-left: -8px; }
    .cmt-resolve-btn { width: 28px; padding: 0; justify-content: center; color: var(--success-foreground); }

    /* ── Overflow menu (hover-revealed) ── */
    .cmt-menu-wrap { position: relative; }
    .cmt-menu-btn { opacity: 0; transition: opacity 0.15s, background 0.15s; }
    .cmt-item:hover > .cmt-item-head .cmt-menu-btn,
    .cmt-item:focus-within > .cmt-item-head .cmt-menu-btn,
    .cmt-menu-wrap.open .cmt-menu-btn { opacity: 1; }
    @media (hover: none) { .cmt-menu-btn { opacity: 1; } }
    .cmt-menu {
      display: none; position: absolute; right: 0; top: 30px; z-index: 20;
      min-width: 168px; padding: 4px;
      background: var(--popover); color: var(--popover-foreground);
      border: 1px solid var(--border); border-radius: var(--radius-sm);
      box-shadow: 0 4px 16px rgba(0,0,0,0.14);
    }
    .cmt-menu-wrap.open .cmt-menu { display: block; }
    .cmt-menu button {
      display: flex; align-items: center; gap: 8px; width: 100%;
      padding: 7px 8px; border: none; border-radius: calc(var(--radius-sm) - 2px);
      background: transparent; color: var(--destructive);
      font-family: var(--font); font-size: 13px; font-weight: 500; text-align: left; cursor: pointer;
    }
    .cmt-menu button:hover:not(:disabled) { background: var(--popover-hover); }
    .cmt-menu button:disabled { color: var(--text-disabled); cursor: not-allowed; }

    /* ── Show resolved toggle ── */
    .cmt-toggle-resolved {
      display: inline-flex; align-items: center; gap: 6px; align-self: flex-start;
      height: 30px; padding: 0 4px; border: none; background: transparent;
      color: var(--muted-foreground); font-family: var(--font); font-size: 13px; font-weight: 600; cursor: pointer;
    }
    .cmt-toggle-resolved:hover { color: var(--foreground); }

    /* ── Composers ── */
    .cmt-composer {
      display: flex; flex-direction: column; gap: 8px; flex-shrink: 0;
      padding: 12px 16px 16px; border-top: 1px solid var(--border); background: var(--background);
    }
    .cmt-composer .btn-primary { align-self: flex-end; }
    .cmt-textarea {
      width: 100%; box-sizing: border-box; resize: none; outline: none;
      min-height: 40px; max-height: 142px; overflow-y: auto;
      padding: 9px 12px; line-height: 20px;
      border: 2px solid var(--border); border-radius: var(--radius-lg);
      background: var(--background); color: var(--foreground);
      font-family: var(--font); font-size: 14px;
      transition: border-color 0.15s;
    }
    .cmt-textarea:focus { border-color: var(--primary); }
    .cmt-reply-box { display: flex; flex-direction: column; gap: 8px; }
    .cmt-actions { display: flex; gap: 8px; }
    .cmt-actions .btn-primary, .cmt-actions .btn-outline { height: 32px; font-size: 13px; }

    /* ── Audio comment (same circular play button as verse audio) ── */
    .cmt-audio { display: flex; align-items: center; gap: 10px; }
    .cmt-audio-track { flex: 1; height: 6px; background: var(--border); border-radius: 999px; overflow: hidden; }
    .cmt-audio-fill { height: 100%; width: 0%; background: var(--primary); border-radius: 999px; }
    .cmt-audio-time { font-size: 12px; color: var(--muted-foreground); font-variant-numeric: tabular-nums; min-width: 32px; text-align: right; }

    /* ── Whole chapter list ── */
    .cmt-group { display: flex; flex-direction: column; gap: 8px; }
    .cmt-group-h { font-size: 13px; font-weight: 700; color: var(--muted-foreground); }
    .cmt-row {
      display: flex; flex-direction: column; gap: 4px; width: 100%;
      padding: 10px 12px; text-align: left; cursor: pointer;
      border: 1px solid var(--border); border-radius: var(--radius-lg);
      background: var(--background); color: var(--foreground); font-family: var(--font);
      transition: background 0.15s;
    }
    .cmt-row:hover { background: var(--muted); }
    .cmt-row-text {
      font-size: 14px; line-height: 1.5; overflow: hidden;
      display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;
    }
    .cmt-row-audio { display: flex; align-items: center; gap: 6px; font-size: 14px; color: var(--muted-foreground); }
    .cmt-row-meta { display: flex; align-items: center; gap: 10px; font-size: 12px; font-weight: 600; color: var(--muted-foreground); }
    .cmt-row-meta .ok { display: inline-flex; align-items: center; gap: 4px; color: var(--success-foreground); }

    /* ── Dialogs (delete confirmation, stage-advance warning) ── */
    .cmt-modal-ov {
      position: fixed; inset: 0; z-index: 2000; display: none;
      align-items: center; justify-content: center; padding: 16px;
      background: rgba(0,0,0,0.45);
    }
    .cmt-modal-ov.open { display: flex; }
    .cmt-modal {
      width: 100%; max-width: 420px; padding: 24px;
      background: var(--background); color: var(--foreground);
      border-radius: var(--radius-xl); box-shadow: 0 12px 40px rgba(0,0,0,0.25);
      display: flex; flex-direction: column; gap: 12px;
    }
    .cmt-modal-title { display: flex; align-items: center; gap: 8px; font-size: 1.125rem; font-weight: 700; }
    .cmt-modal-title svg { color: var(--warning-foreground); }
    .cmt-modal-body { font-size: 14px; line-height: 1.5; color: var(--muted-foreground); }
    .cmt-modal-actions { display: flex; justify-content: flex-end; gap: 8px; margin-top: 8px; }
    .cmt-btn-destructive {
      background: var(--destructive); color: var(--destructive-foreground); border: none;
      border-radius: var(--radius); padding: 0 16px; height: 36px;
      font-family: var(--font); font-size: 14px; font-weight: 600; cursor: pointer;
    }
    .cmt-btn-destructive:hover { filter: brightness(0.92); }
  `;

  // ── People, stages, seed data ──────────────────────────────────────────────
  var CHAPTER_REF = 'Genesis 3';
  var CHAPTER_NUM = 3;
  var STAGES = [
    { id: 'drafting',  name: 'Drafting' },
    { id: 'peer',      name: 'Peer Check' },
    { id: 'community', name: 'Community Check' }
  ];
  var USERS = {
    anita: { id: 'anita', name: 'Anita', role: 'Translator' },
    rohan: { id: 'rohan', name: 'Rohan', role: 'Project Manager' },
    meera: { id: 'meera', name: 'Meera', role: 'Peer Checker' },
    dev:   { id: 'dev',   name: 'Dev',   role: 'Observer' }
  };
  var ROLE_USER = { translator: 'anita', manager: 'rohan', peer: 'meera', observer: 'dev' };
  var ROLE_NAMES = { translator: 'Translator', manager: 'Project Manager', peer: 'Peer Checker', observer: 'Observer' };
  var ROLE_CYCLE = ['translator', 'manager', 'peer', 'observer'];

  var MIN = 60000;
  function ago(minutes) { return Date.now() - minutes * MIN; }
  var uid = 100;
  function nextId(p) { uid += 1; return p + uid; }

  var threads = [
    // Drafting (current stage by default)
    { id: 't1', stage: 'drafting', verse: 2, resolved: false, comments: [
      { id: 'c1', user: 'rohan', ts: ago(120), text: 'Check this against the Gujarati source. The word for "fruit" may read better as "produce" for our community.' },
      { id: 'c2', user: 'anita', ts: ago(60),  text: 'Good catch. I will try "produce" and check it with the community.' } ] },
    { id: 't2', stage: 'drafting', verse: 3, resolved: false, comments: [
      { id: 'c3', user: 'dev', ts: ago(5), audio: { dur: 14 } } ] },
    { id: 't3', stage: 'drafting', verse: 3, resolved: false, unconnected: true, comments: [
      { id: 'c4', user: 'rohan', ts: ago(1500), text: 'The closing quote does not match the opening quote in verse 2.' } ] },
    { id: 't4', stage: 'drafting', verse: 6, resolved: true, resolvedBy: 'anita', resolvedAt: ago(2880), comments: [
      { id: 'c5', user: 'anita', ts: ago(4320), text: 'Not sure "pleasant to look at" is the right sense here.' },
      { id: 'c6', user: 'rohan', ts: ago(4000), text: 'It reads fine to me.' } ] },
    { id: 't5', stage: 'drafting', verse: 8, resolved: false, comments: [
      { id: 'c7', user: 'rohan', ts: ago(14400), text: 'Please confirm the name used for God matches the earlier chapters.' } ] },
    { id: 't6', stage: 'drafting', verse: 7, resolved: false, comments: [
      { id: 'c8',  user: 'dev',   ts: ago(30), text: 'This verse seems to be missing the part about covering themselves.' },
      { id: 'c9',  user: 'anita', ts: ago(20), text: 'That is in the second half of the verse.' },
      { id: 'c10', user: 'dev',   ts: ago(10), text: 'Thanks, I see it now.' } ] },
    // Peer Check (earlier stage when simulating Community Check)
    { id: 'p1', stage: 'peer', verse: 2, resolved: true, resolvedBy: 'anita', resolvedAt: ago(30000), comments: [
      { id: 'pc1', user: 'meera', ts: ago(32000), text: 'Verse 2 ends without a closing quotation mark.' },
      { id: 'pc2', user: 'anita', ts: ago(31000), text: 'Fixed.' } ] },
    { id: 'p2', stage: 'peer', verse: 6, resolved: false, comments: [
      { id: 'pc3', user: 'meera', ts: ago(31500), text: 'Consider a simpler word for "desirable" so the verse reads naturally aloud.' } ] },
    { id: 'p3', stage: 'peer', verse: 7, resolved: false, comments: [
      { id: 'pc4', user: 'meera', ts: ago(31200), audio: { dur: 9 } } ] }
  ];

  // ── State ──────────────────────────────────────────────────────────────────
  var roleOverride = null;
  var currentStage = 'drafting';
  var viewStage = 'drafting';
  var open = false;              // true while the Comments tab is selected
  var mode = 'verse';            // 'verse' | 'chapter'
  var commentVerse = 8;
  var statusFilter = 'open';     // 'open' | 'resolved'
  var mineFilter = false;
  var showResolved = false;
  var replyingTo = null;
  var replyDraft = '';
  var flashThread = null;
  var audioTimer = null;
  var audioPlaying = null;

  function $(id) { return document.getElementById(id); }
  function escHtml(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }

  function roleKey() {
    if (roleOverride) return roleOverride;
    var r = (typeof currentRole !== 'undefined') ? currentRole : 'translator';
    if (r === 'org-manager' || r === 'super-user') r = 'manager';
    return ROLE_USER[r] ? r : 'translator';
  }
  function me() { return USERS[ROLE_USER[roleKey()]]; }
  function canModerate() { var r = roleKey(); return r === 'translator' || r === 'manager'; }
  function isReadOnly() { return viewStage !== currentStage; }
  function stageIndex(id) { for (var i = 0; i < STAGES.length; i++) if (STAGES[i].id === id) return i; return 0; }
  function stageName(id) { return STAGES[stageIndex(id)].name; }

  // ── Time ───────────────────────────────────────────────────────────────────
  var MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  function shortDate(ts) { var d = new Date(ts); return MONTHS[d.getMonth()] + ' ' + d.getDate(); }
  function fullDate(ts) {
    return new Date(ts).toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' });
  }
  function relTime(ts) {
    var m = Math.floor((Date.now() - ts) / MIN);
    if (m < 1) return 'Just now';
    if (m < 60) return m + 'm ago';
    var h = Math.floor(m / 60);
    if (h < 24) return h + 'h ago';
    var d = Math.floor(h / 24);
    if (d < 2) return 'Yesterday';
    if (d <= 7) return d + 'd ago';
    return shortDate(ts);
  }
  function fmtDur(s) { return Math.floor(s / 60) + ':' + ('0' + (s % 60)).slice(-2); }

  // ── Queries ────────────────────────────────────────────────────────────────
  function firstTs(t) { return t.comments[0].ts; }
  function stageThreads(stage) {
    return threads.filter(function (t) { return t.stage === stage; })
      .sort(function (a, b) { return firstTs(a) - firstTs(b); });
  }
  function openThreadsFor(stage, verse) {
    return stageThreads(stage).filter(function (t) { return !t.resolved && (verse == null || t.verse === verse); });
  }
  function commentCount(stage) {
    return stageThreads(stage).reduce(function (n, t) { return n + t.comments.length; }, 0);
  }
  function findThread(id) { for (var i = 0; i < threads.length; i++) if (threads[i].id === id) return threads[i]; return null; }
  function participated(t) { var id = me().id; return t.comments.some(function (c) { return c.user === id; }); }

  // ── Verse draft cell hooks (called from drafting.html renderVerses) ────────
  window.cmtWrapClass = function (n, isPending) {
    if (isPending) return '';
    var cls = '';
    if (typeof hasVerseTake === 'function' && hasVerseTake(n)) cls += ' has-take';
    if (openThreadsFor(currentStage, n).length) cls += ' has-cmt';
    return cls;
  };
  function indicatorHTML(n) {
    var count = openThreadsFor(currentStage, n).length;
    if (!count) return '';
    return '<button class="cmt-ind" type="button" onclick="cmtOpenVerse(' + n + ', false, event)" aria-label="' + count + ' open comment thread' + (count > 1 ? 's' : '') + '">'
      + icon('message-square', 15) + '<span>' + count + '</span></button>';
  }
  function addControlHTML(n) {
    return '<div class="cmt-add-group" onclick="event.stopPropagation()">'
      + '<button class="cmt-add-btn" type="button" title="Add comment" aria-label="Add comment" onclick="cmtOpenVerse(' + n + ', true, event)">'
      + icon('message-square-plus', 13) + '</button></div>';
  }
  window.cmtControlsHTML = function (n, isPending) {
    if (isPending) return '';
    return addControlHTML(n) + indicatorHTML(n);
  };

  function refreshIndicators() {
    updateTabCount();
    var total = (typeof TOTAL_VERSES !== 'undefined') ? TOTAL_VERSES : 24;
    for (var n = 1; n <= total; n++) {
      var wrap = $('wrap-' + n);
      if (!wrap || wrap.querySelector('.translation-input.pending')) continue;
      var old = wrap.querySelector('.cmt-ind');
      if (old) old.remove();
      var html = indicatorHTML(n);
      wrap.classList.toggle('has-cmt', !!html);
      if (html) wrap.insertAdjacentHTML('afterbegin', html);
      var input = $('input-' + n);
      if (input && typeof autoResize === 'function') autoResize(input);
    }
  }

  window.cmtOnVersesRendered = function () {
    commentVerse = (typeof activeVerse !== 'undefined') ? activeVerse : commentVerse;
    if (open && mode === 'verse') { showResolved = false; replyingTo = null; renderPane(); }
  };

  // ── Panel shell ────────────────────────────────────────────────────────────
  function buildPane() {
    var panel = $('resources-panel');
    var pane = document.createElement('div');
    pane.id = 'comment-pane';
    pane.innerHTML =
      '<div class="cmt-head"><div class="cmt-ref" id="cmt-ref"></div></div>'
      + '<div class="cmt-controls">'
      + '<div class="res-select-wrap" id="cmt-stage-select"></div>'
      + '<div class="cmt-seg" role="group" aria-label="Comment view">'
      + '<button type="button" data-mode="verse">This verse</button>'
      + '<button type="button" data-mode="chapter">Whole chapter</button></div>'
      + '<div class="cmt-chips" id="cmt-chips">'
      + '<button class="chip" type="button" data-filter="open">Open</button>'
      + '<button class="chip" type="button" data-filter="resolved">Resolved</button>'
      + '<button class="chip" type="button" data-filter="mine">Mine</button></div>'
      + '</div>'
      + '<div class="cmt-list" id="cmt-list"></div>'
      + '<div class="cmt-composer" id="cmt-composer">'
      + '<textarea class="cmt-textarea" id="cmt-input" rows="1" placeholder="Add a comment…" aria-label="Add a comment"></textarea>'
      + '<button class="btn-primary" type="button" id="cmt-post" data-act="post" disabled>Comment</button>'
      + '</div>';
    panel.appendChild(pane);

    var input = $('cmt-input');
    input.addEventListener('input', function () {
      autoGrow(input);
      $('cmt-post').disabled = !input.value.trim();
    });
    pane.addEventListener('click', onPaneClick);
    pane.addEventListener('input', function (e) {
      if (e.target.id === 'cmt-reply-input') {
        replyDraft = e.target.value;
        autoGrow(e.target);
        var btn = pane.querySelector('[data-act="reply-post"]');
        if (btn) btn.disabled = !replyDraft.trim();
      }
    });
  }

  function autoGrow(el) {
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 142) + 'px';
  }

  // ── Tab selection ──────────────────────────────────────────────────────────
  // Comments is a peer of the AI Assistant / Resources tabs; selectResourceTab
  // (drafting.html) calls cmtSetActive. Leaving the tab just hides the pane,
  // so the other tabs keep their state.
  // Clicking the tab directly keeps the last-used view (This verse / Whole chapter and its filters).
  function resetView() {
    viewStage = currentStage;
    showResolved = false;
    replyingTo = null;
    refreshIndicators();   // pick up comments added by other users since last open
  }
  window.cmtSetActive = function (on) {
    var panel = $('resources-panel');
    if (on && !open) {
      open = true;
      panel.classList.add('comments-mode');
      resetView();
      renderPane();
    } else if (!on && open) {
      open = false;
      stopAudio();
      panel.classList.remove('comments-mode');
    }
  };
  function updateTabCount() {
    var el = $('cmt-tab-count');
    if (!el) return;
    var n = openThreadsFor(currentStage).length;
    var label = n > 99 ? '99+' : (n ? String(n) : '');
    el.textContent = label;
    el.classList.toggle('pill', label.length > 1);
    el.setAttribute('aria-label', n + ' open comment thread' + (n === 1 ? '' : 's'));
  }
  // Select the Comments tab (opening the pane if it is collapsed), then apply a view.
  function openPanel(newMode) {
    var panel = $('resources-panel');
    if (panel.classList.contains('closed')) {
      panel.classList.remove('closed');
      var handle = $('resize-handle'); if (handle) handle.style.display = '';
      var btn = $('resources-toggle-btn'); if (btn) btn.classList.remove('closed');
    }
    selectResourceTab(document.querySelector('.resources-tab[data-tab="comments"]'));
    resetView();
    mode = newMode;          // opened from an indicator, Add comment or the stage warning: always a fresh view
    statusFilter = 'open';
    mineFilter = false;
    renderPane();
  }
  window.cmtOpenChapter = function () { openPanel('chapter'); };
  window.cmtOpenVerse = function (n, focusComposer, ev) {
    if (ev) ev.stopPropagation();
    commentVerse = n;
    openPanel('verse');
    if (focusComposer) setTimeout(function () { var i = $('cmt-input'); if (i) i.focus(); }, 0);
  };

  // ── Render ─────────────────────────────────────────────────────────────────
  function renderPane() {
    if (!open) return;
    var chapterMode = mode === 'chapter';
    $('cmt-ref').textContent = chapterMode ? CHAPTER_REF : CHAPTER_REF + ':' + commentVerse;

    renderStageSelect();
    document.querySelectorAll('#comment-pane .cmt-seg button').forEach(function (b) {
      b.classList.toggle('active', b.dataset.mode === mode);
    });
    $('cmt-chips').style.display = chapterMode ? 'flex' : 'none';
    document.querySelectorAll('#cmt-chips .chip').forEach(function (c) {
      var f = c.dataset.filter;
      c.classList.toggle('selected', f === 'mine' ? mineFilter : statusFilter === f);
    });

    var list = $('cmt-list');
    list.innerHTML = (isReadOnly()
      ? '<div class="cmt-readonly">' + icon('lock', 14) + '<span>Comments from ' + escHtml(stageName(viewStage)) + ' are read-only.</span></div>'
      : '') + (chapterMode ? chapterListHTML() : verseListHTML());

    $('cmt-composer').style.display = (!chapterMode && !isReadOnly()) ? 'flex' : 'none';

    if (replyingTo) {
      var ri = $('cmt-reply-input');
      if (ri) { ri.value = replyDraft; autoGrow(ri); }
    }
    if (flashThread) {
      var el = list.querySelector('[data-tid="' + flashThread + '"]');
      if (el) { el.classList.add('flash'); el.scrollIntoView({ block: 'nearest' }); }
      flashThread = null;
    }
  }

  function renderStageSelect() {
    var wrap = $('cmt-stage-select');
    var upTo = stageIndex(currentStage);
    var opts = '';
    for (var i = 0; i <= upTo; i++) {
      var s = STAGES[i];
      var label = s.id === currentStage ? s.name + ' (current)' : s.name + ' (' + commentCount(s.id) + ')';
      opts += '<div class="res-select-opt' + (s.id === viewStage ? ' selected' : '') + '" data-stage="' + s.id + '">' + escHtml(label) + '</div>';
    }
    var cur = viewStage === currentStage ? stageName(viewStage) + ' (current)' : stageName(viewStage) + ' (' + commentCount(viewStage) + ')';
    wrap.innerHTML =
      '<button class="res-select-btn" type="button" data-act="stage-toggle" aria-label="Workflow stage">'
      + '<span class="res-select-label">' + escHtml(cur) + '</span>'
      + '<svg class="res-select-caret" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>'
      + '</button><div class="res-select-dropdown">' + opts + '</div>';
  }

  function verseListHTML() {
    var all = stageThreads(viewStage).filter(function (t) { return t.verse === commentVerse; });
    var openT = all.filter(function (t) { return !t.resolved; });
    var resolvedT = all.filter(function (t) { return t.resolved; });
    var html = '';
    if (!openT.length) html += '<div class="cmt-empty">No comments on this verse yet.</div>';
    html += openT.map(threadHTML).join('');
    if (resolvedT.length) {
      html += '<button class="cmt-toggle-resolved" type="button" data-act="toggle-resolved" aria-expanded="' + showResolved + '">'
        + icon(showResolved ? 'chevron-up' : 'chevron-down', 14)
        + (showResolved ? 'Hide resolved' : 'Show resolved (' + resolvedT.length + ')') + '</button>';
      if (showResolved) html += resolvedT.map(threadHTML).join('');
    }
    return html;
  }

  function audioHTML(c) {
    return '<div class="cmt-audio" data-cid="' + c.id + '">'
      + '<button class="play-btn" type="button" data-act="audio" title="Play" aria-label="Play audio comment">' + PLAY_SVG + '</button>'
      + '<div class="cmt-audio-track"><div class="cmt-audio-fill"></div></div>'
      + '<span class="cmt-audio-time">' + fmtDur(c.audio.dur) + '</span></div>';
  }

  function menuItems(t, c, isTop) {
    var items = [];
    if (isReadOnly()) return items;
    if (isTop && canModerate()) items.push({ act: 'del-thread', label: 'Delete thread' });
    if (c.user === me().id) {
      if (isTop && t.comments.length > 1) items.push({ act: 'del-comment', label: 'Delete comment', disabled: true, tip: "Comments with replies can't be deleted." });
      else items.push({ act: 'del-comment', label: 'Delete comment' });
    }
    return items;
  }

  function commentHTML(t, c, isTop) {
    var u = USERS[c.user];
    var items = menuItems(t, c, isTop);
    var menu = items.length
      ? '<div class="cmt-menu-wrap"><button class="cmt-icon-btn cmt-menu-btn" type="button" data-act="menu" title="More actions" aria-label="More actions" aria-haspopup="menu">' + icon('ellipsis-vertical', 16) + '</button>'
        + '<div class="cmt-menu" role="menu">' + items.map(function (it) {
          return '<button type="button" role="menuitem" data-act="' + it.act + '" data-tid="' + t.id + '" data-cid="' + c.id + '"'
            + (it.disabled ? ' disabled title="' + escHtml(it.tip) + '"' : '') + '>' + icon('trash', 14) + escHtml(it.label) + '</button>';
        }).join('') + '</div></div>'
      : '';
    var resolveBtn = (isTop && !t.resolved && !isReadOnly() && canModerate())
      ? '<button class="cmt-resolve-btn" type="button" data-act="resolve" data-tid="' + t.id + '" title="Resolve" aria-label="Resolve">' + icon('check', 16) + '</button>'
      : '';
    return '<div class="cmt-item" data-cid="' + c.id + '">'
      + '<div class="cmt-item-head">'
      + '<span class="cmt-author">' + escHtml(u.name) + '</span>'
      + '<span class="cmt-role">' + escHtml(u.role) + '</span>'
      + '<span class="cmt-time" title="' + escHtml(fullDate(c.ts)) + '">' + relTime(c.ts) + '</span>'
      + (isTop && t.unconnected ? '<span class="cmt-unlinked">' + icon('unlink', 12) + 'Unconnected</span>' : '')
      + '<span class="cmt-spacer"></span>' + resolveBtn + menu
      + '</div>'
      + (c.audio ? audioHTML(c) : '<div class="cmt-text">' + escHtml(c.text) + '</div>')
      + '</div>';
  }

  function threadHTML(t) {
    var top = t.comments[0];
    var replies = t.comments.slice(1);
    var ro = isReadOnly();
    var html = '<div class="cmt-thread' + (t.resolved ? ' resolved' : '') + '" data-tid="' + t.id + '">';
    if (t.resolved) {
      html += '<div class="cmt-resolved-note">' + icon('check-check', 14) + 'Resolved by ' + escHtml(USERS[t.resolvedBy].name) + ', ' + shortDate(t.resolvedAt) + '</div>';
    }
    html += commentHTML(t, top, true);
    if (!ro && !t.resolved) {
      html += '<button class="cmt-link-btn" type="button" data-act="reply" data-tid="' + t.id + '">' + icon('reply', 14) + 'Reply</button>';
    }
    if (replies.length || replyingTo === t.id) {
      html += '<div class="cmt-replies">' + replies.map(function (r) { return commentHTML(t, r, false); }).join('');
      if (replyingTo === t.id) {
        html += '<div class="cmt-reply-box"><textarea class="cmt-textarea" id="cmt-reply-input" rows="1" placeholder="Reply…" aria-label="Reply"></textarea>'
          + '<div class="cmt-actions"><button class="btn-primary" type="button" data-act="reply-post" data-tid="' + t.id + '"' + (replyDraft.trim() ? '' : ' disabled') + '>Reply</button>'
          + '<button class="btn-outline" type="button" data-act="reply-cancel">Cancel</button></div></div>';
      }
      html += '</div>';
    }
    if (t.resolved && !ro && participated(t)) {
      html += '<button class="cmt-link-btn" type="button" data-act="reopen" data-tid="' + t.id + '">' + icon('rotate-ccw', 14) + 'Reopen</button>';
    }
    return html + '</div>';
  }

  function chapterListHTML() {
    var meId = me().id;
    var rows = stageThreads(viewStage).filter(function (t) {
      if (statusFilter === 'open' && t.resolved) return false;
      if (statusFilter === 'resolved' && !t.resolved) return false;
      if (mineFilter && !t.comments.some(function (c) { return c.user === meId; })) return false;
      return true;
    }).sort(function (a, b) { return a.verse - b.verse || firstTs(a) - firstTs(b); });

    if (!rows.length) {
      var msg = (statusFilter === 'open' && !mineFilter) ? 'No open comments in this chapter.' : 'No comments match these filters.';
      return '<div class="cmt-empty">' + msg + '</div>';
    }
    var html = '', lastVerse = null;
    rows.forEach(function (t) {
      if (t.verse !== lastVerse) {
        if (lastVerse !== null) html += '</div>';
        html += '<div class="cmt-group"><div class="cmt-group-h">' + CHAPTER_NUM + ':' + t.verse + '</div>';
        lastVerse = t.verse;
      }
      var c = t.comments[0], u = USERS[c.user], n = t.comments.length - 1;
      html += '<button class="cmt-row" type="button" data-act="goto" data-tid="' + t.id + '">'
        + '<div class="cmt-item-head"><span class="cmt-author">' + escHtml(u.name) + '</span><span class="cmt-role">' + escHtml(u.role) + '</span>'
        + '<span class="cmt-time" title="' + escHtml(fullDate(c.ts)) + '">' + relTime(c.ts) + '</span></div>'
        + (c.audio ? '<div class="cmt-row-audio">' + icon('audio-lines', 16) + 'Audio comment</div>' : '<div class="cmt-row-text">' + escHtml(c.text) + '</div>')
        + ((n || t.resolved) ? '<div class="cmt-row-meta">' + (n ? '<span>' + n + (n === 1 ? ' reply' : ' replies') + '</span>' : '')
          + (t.resolved ? '<span class="ok">' + icon('check-check', 13) + 'Resolved</span>' : '') + '</div>' : '')
        + '</button>';
    });
    return html + '</div>';
  }

  // ── Events ─────────────────────────────────────────────────────────────────
  function closeMenus() { document.querySelectorAll('.cmt-menu-wrap.open').forEach(function (w) { w.classList.remove('open'); }); }
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.cmt-menu-wrap')) closeMenus();
    if (!e.target.closest('#cmt-stage-select')) {
      var w = $('cmt-stage-select'); if (w) w.classList.remove('open');
    }
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { closeMenus(); hideModal(); }
  });

  function onPaneClick(e) {
    var stageOpt = e.target.closest('[data-stage]');
    if (stageOpt) { viewStage = stageOpt.dataset.stage; showResolved = false; replyingTo = null; renderPane(); return; }
    var modeBtn = e.target.closest('[data-mode]');
    if (modeBtn) { mode = modeBtn.dataset.mode; showResolved = false; replyingTo = null; renderPane(); return; }
    var chip = e.target.closest('[data-filter]');
    if (chip) {
      var f = chip.dataset.filter;
      if (f === 'mine') mineFilter = !mineFilter; else statusFilter = f;
      renderPane(); return;
    }
    var btn = e.target.closest('[data-act]');
    if (!btn || btn.disabled) return;
    var act = btn.dataset.act, t = btn.dataset.tid ? findThread(btn.dataset.tid) : null;

    if (act === 'stage-toggle') {
      var wrap = $('cmt-stage-select'), wasOpen = wrap.classList.contains('open');
      wrap.classList.toggle('open', !wasOpen);
      if (!wasOpen) {
        var rect = wrap.getBoundingClientRect(), dd = wrap.querySelector('.res-select-dropdown');
        dd.style.top = (rect.bottom + 2) + 'px'; dd.style.left = rect.left + 'px'; dd.style.width = rect.width + 'px';
      }
    }
    else if (act === 'post') postComment();
    else if (act === 'reply') { replyingTo = t.id; replyDraft = ''; renderPane(); var ri = $('cmt-reply-input'); if (ri) ri.focus(); }
    else if (act === 'reply-cancel') { replyingTo = null; replyDraft = ''; renderPane(); }
    else if (act === 'reply-post') postReply(t);
    else if (act === 'resolve') { t.resolved = true; t.resolvedBy = me().id; t.resolvedAt = Date.now(); renderPane(); refreshIndicators(); }
    else if (act === 'reopen') { t.resolved = false; delete t.resolvedBy; delete t.resolvedAt; renderPane(); refreshIndicators(); }
    else if (act === 'toggle-resolved') { showResolved = !showResolved; renderPane(); }
    else if (act === 'menu') { var mw = btn.closest('.cmt-menu-wrap'), was = mw.classList.contains('open'); closeMenus(); mw.classList.toggle('open', !was); }
    else if (act === 'del-comment') { closeMenus(); confirmDeleteComment(t, btn.dataset.cid); }
    else if (act === 'del-thread') { closeMenus(); confirmDeleteThread(t); }
    else if (act === 'audio') toggleAudio(btn);
    else if (act === 'goto') gotoThread(t);
  }

  // ── Actions ────────────────────────────────────────────────────────────────
  function postComment() {
    var input = $('cmt-input'), text = input.value.trim();
    if (!text || isReadOnly()) return;
    threads.push({ id: nextId('t'), stage: currentStage, verse: commentVerse, resolved: false,
      comments: [{ id: nextId('c'), user: me().id, ts: Date.now(), text: text }] });
    input.value = ''; autoGrow(input); $('cmt-post').disabled = true;
    renderPane(); refreshIndicators();
    var list = $('cmt-list'); list.scrollTop = list.scrollHeight;
  }
  function postReply(t) {
    var text = replyDraft.trim();
    if (!text || !t) return;
    t.comments.push({ id: nextId('c'), user: me().id, ts: Date.now(), text: text });
    replyingTo = null; replyDraft = '';
    renderPane();
  }
  function deleteThread(t) {
    threads.splice(threads.indexOf(t), 1);
    renderPane(); refreshIndicators();
  }
  function deleteComment(t, cid) {
    var idx = t.comments.map(function (c) { return c.id; }).indexOf(cid);
    if (idx === 0) { deleteThread(t); return; }   // only reachable with no replies
    t.comments.splice(idx, 1);
    renderPane();
  }
  function confirmDeleteComment(t, cid) {
    showModal({ title: 'Delete comment', body: "Delete this comment? This can't be undone.",
      confirm: 'Delete', cancel: 'Cancel', destructive: true, onConfirm: function () { deleteComment(t, cid); } });
  }
  function confirmDeleteThread(t) {
    showModal({ title: 'Delete thread', body: "Delete this thread and all its replies? This can't be undone.",
      confirm: 'Delete thread', cancel: 'Cancel', destructive: true, onConfirm: function () { deleteThread(t); } });
  }

  function gotoThread(t) {
    commentVerse = t.verse;
    mode = 'verse';
    showResolved = t.resolved;
    replyingTo = null;
    flashThread = t.id;
    if (typeof activeVerse !== 'undefined' && activeVerse !== t.verse && typeof activateVerse === 'function') {
      activateVerse(t.verse);        // re-renders verses; cmtOnVersesRendered refreshes the panel
    } else if (typeof scrollToActive === 'function') {
      scrollToActive();
    }
    commentVerse = t.verse;
    showResolved = t.resolved;
    flashThread = t.id;
    renderPane();
  }

  // ── Audio comment playback (demo timer) ────────────────────────────────────
  function stopAudio() {
    clearInterval(audioTimer); audioTimer = null;
    if (audioPlaying) {
      var b = audioPlaying.btn; if (b && b.isConnected) { b.innerHTML = PLAY_SVG; b.title = 'Play'; }
      audioPlaying = null;
    }
  }
  function toggleAudio(btn) {
    var wrap = btn.closest('.cmt-audio');
    var same = audioPlaying && audioPlaying.btn === btn;
    stopAudio();
    if (same) return;
    var cid = wrap.dataset.cid, dur = 0, c;
    threads.some(function (t) { return t.comments.some(function (x) { if (x.id === cid) { c = x; return true; } }); });
    dur = c.audio.dur;
    var elapsed = 0, fill = wrap.querySelector('.cmt-audio-fill'), time = wrap.querySelector('.cmt-audio-time');
    btn.innerHTML = PAUSE_SVG; btn.title = 'Stop';
    audioPlaying = { btn: btn };
    audioTimer = setInterval(function () {
      elapsed += 0.25;
      fill.style.width = Math.min(100, (elapsed / dur) * 100) + '%';
      time.textContent = fmtDur(Math.max(0, Math.ceil(dur - elapsed)));
      if (elapsed >= dur) { stopAudio(); fill.style.width = '0%'; time.textContent = fmtDur(dur); }
    }, 250);
  }

  // ── Dialogs ────────────────────────────────────────────────────────────────
  var modalEl = null, modalAction = null;
  function ensureModal() {
    if (modalEl) return;
    modalEl = document.createElement('div');
    modalEl.className = 'cmt-modal-ov';
    modalEl.innerHTML = '<div class="cmt-modal" role="dialog" aria-modal="true" aria-labelledby="cmt-modal-title">'
      + '<div class="cmt-modal-title" id="cmt-modal-title"></div><div class="cmt-modal-body" id="cmt-modal-body"></div>'
      + '<div class="cmt-modal-actions" id="cmt-modal-actions"></div></div>';
    document.body.appendChild(modalEl);
    modalEl.addEventListener('click', function (e) { if (e.target === modalEl) hideModal(); });
  }
  function hideModal() { if (modalEl) modalEl.classList.remove('open'); modalAction = null; }
  // opts: title, body, titleIcon, confirm, cancel, destructive, onConfirm, onCancel
  function showModal(o) {
    ensureModal();
    $('cmt-modal-title').innerHTML = (o.titleIcon ? icon(o.titleIcon, 20) : '') + '<span>' + escHtml(o.title) + '</span>';
    $('cmt-modal-body').textContent = o.body;
    var acts = $('cmt-modal-actions');
    acts.innerHTML = '';
    var cancel = document.createElement('button');
    cancel.type = 'button'; cancel.className = 'btn-outline'; cancel.textContent = o.cancel;
    cancel.onclick = function () { hideModal(); if (o.onCancel) o.onCancel(); };
    var ok = document.createElement('button');
    ok.type = 'button'; ok.className = o.destructive ? 'cmt-btn-destructive' : 'btn-primary'; ok.textContent = o.confirm;
    ok.onclick = function () { hideModal(); if (o.onConfirm) o.onConfirm(); };
    acts.appendChild(cancel); acts.appendChild(ok);
    modalEl.classList.add('open');
    cancel.focus();
  }

  window.cmtShowModal = showModal;   // also used by the Checks tab (Ignore Everywhere confirm)

  // Stage-advance warning. Returns true when the dialog was shown (caller must not advance).
  window.cmtGuardAdvance = function (advance) {
    var n = openThreadsFor(currentStage).length;
    if (!n) return false;
    showModal({
      titleIcon: 'triangle-alert', title: 'Open comments',
      body: 'This chapter has ' + n + ' open comment' + (n === 1 ? '' : 's') + '. They will stay with ' + stageName(currentStage) + " and won't carry into the next stage.",
      cancel: 'Review comments', confirm: 'Advance anyway',
      onCancel: function () { openPanel('chapter'); },
      onConfirm: advance
    });
    return true;
  };

  // ── Dev triggers (mockup only, next to the other dev buttons) ──────────────
  window.cmtDevRoleLabel = function () { return 'Comments: viewing as ' + ROLE_NAMES[roleKey()] + ' (switch)'; };
  window.cmtDevCycleRole = function (btn) {
    roleOverride = ROLE_CYCLE[(ROLE_CYCLE.indexOf(roleKey()) + 1) % ROLE_CYCLE.length];
    btn.textContent = cmtDevRoleLabel();
    replyingTo = null; renderPane();
  };
  window.cmtDevToggleStage = function (btn) {
    currentStage = currentStage === 'drafting' ? 'community' : 'drafting';
    viewStage = currentStage;
    var badge = document.querySelector('.draft-badge');
    if (badge) badge.textContent = currentStage === 'drafting' ? 'Draft' : stageName(currentStage);
    btn.textContent = currentStage === 'drafting' ? 'Comments: simulate Community Check stage' : 'Comments: back to Drafting stage';
    refreshIndicators(); renderPane();
  };
  window.cmtDevIncoming = function () {
    // Another user comments; the open panel does not live-update (see openPanel).
    threads.push({ id: nextId('t'), stage: currentStage, verse: commentVerse, resolved: false,
      comments: [{ id: nextId('c'), user: 'meera', ts: Date.now(), text: 'New comment from another user.' }] });
  };
  window.cmtDevAdvanceWarning = function () {
    if (!window.cmtGuardAdvance(function () { alert('Chapter submitted for Peer Checking.'); })) {
      alert('No open comments in the current stage, so the warning would not show.');
    }
  };

  // ── Init ───────────────────────────────────────────────────────────────────
  function init() {
    var style = document.createElement('style');
    style.id = 'comments-styles';
    style.textContent = CSS;
    document.head.appendChild(style);
    buildPane();
    updateTabCount();
    document.querySelectorAll('[data-cmt-dev-role]').forEach(function (b) { b.textContent = cmtDevRoleLabel(); });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
