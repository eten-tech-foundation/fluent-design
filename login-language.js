/* Pre-login language dropdown + string table for login.html (mockup only). */

// ── Languages ────────────────────────────────────────────────────────────────
const LOGIN_LANGUAGES = {
  ar: { name: 'العربية', english: 'Arabic', dir: 'rtl' },
  en: { name: 'English', english: 'English', dir: 'ltr' },
  hi: { name: 'हिन्दी', english: 'Hindi', dir: 'ltr' },
  ru: { name: 'Русский', english: 'Russian', dir: 'ltr' },
  es: { name: 'Español', english: 'Spanish', dir: 'ltr' },
};

// ── Strings ──────────────────────────────────────────────────────────────────
const LOGIN_STRINGS = {
  en: {
    help: 'Click Continue to sign in. No email or password is needed.',
    welcome: 'Welcome',
    subtitle: 'Log in to continue to Fluent.',
    email: 'Email address',
    password: 'Password',
    forgot: 'Forgot password?',
    continue: 'Continue',
    legalPrefix: 'By continuing, you agree to the',
    privacy: 'Privacy Policy',
    legalAnd: 'and',
    terms: 'Terms',
  },
  hi: {
    help: 'साइन इन करने के लिए जारी रखें पर क्लिक करें। ईमेल या पासवर्ड की आवश्यकता नहीं है।',
    welcome: 'स्वागत है',
    subtitle: 'Fluent जारी रखने के लिए लॉग इन करें।',
    email: 'ईमेल पता',
    password: 'पासवर्ड',
    forgot: 'पासवर्ड भूल गए?',
    continue: 'जारी रखें',
    legalPrefix: 'जारी रखकर, आप',
    privacy: 'गोपनीयता नीति',
    legalAnd: 'और',
    terms: 'नियमों',
  },
  ar: {
    help: 'انقر على متابعة لتسجيل الدخول. لا حاجة إلى البريد الإلكتروني أو كلمة المرور.',
    welcome: 'مرحبًا',
    subtitle: 'سجّل الدخول للمتابعة إلى Fluent.',
    email: 'البريد الإلكتروني',
    password: 'كلمة المرور',
    forgot: 'نسيت كلمة المرور؟',
    continue: 'متابعة',
    legalPrefix: 'بالمتابعة، فإنك توافق على',
    privacy: 'سياسة الخصوصية',
    legalAnd: 'و',
    terms: 'الشروط',
  },
  es: {
    help: 'Haz clic en Continuar para iniciar sesión. No se necesita correo ni contraseña.',
    welcome: 'Bienvenido',
    subtitle: 'Inicia sesión para continuar en Fluent.',
    email: 'Correo electrónico',
    password: 'Contraseña',
    forgot: '¿Olvidaste tu contraseña?',
    continue: 'Continuar',
    legalPrefix: 'Al continuar, aceptas la',
    privacy: 'Política de privacidad',
    legalAnd: 'y los',
    terms: 'Términos',
  },
  ru: {
    help: 'Нажмите «Продолжить», чтобы войти. Электронная почта и пароль не нужны.',
    welcome: 'Добро пожаловать',
    subtitle: 'Войдите, чтобы продолжить работу в Fluent.',
    email: 'Адрес эл. почты',
    password: 'Пароль',
    forgot: 'Забыли пароль?',
    continue: 'Продолжить',
    legalPrefix: 'Продолжая, вы принимаете',
    privacy: 'Политику конфиденциальности',
    legalAnd: 'и',
    terms: 'Условия',
  },
};

// ── Apply language ───────────────────────────────────────────────────────────
function applyLoginLanguage(code) {
  const lang = LOGIN_LANGUAGES[code] ? code : 'en';
  const strings = LOGIN_STRINGS[lang];
  const fallback = LOGIN_STRINGS.en;

  document.documentElement.lang = lang;
  document.documentElement.dir = LOGIN_LANGUAGES[lang].dir;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    el.textContent = strings[el.dataset.i18n] || fallback[el.dataset.i18n];
  });
  document.querySelectorAll('[data-i18n-aria]').forEach(el => {
    el.setAttribute('aria-label', strings[el.dataset.i18nAria] || fallback[el.dataset.i18nAria]);
  });

  document.getElementById('lang-current').textContent = LOGIN_LANGUAGES[lang].name;
  document.querySelectorAll('.lang-option').forEach(opt => {
    opt.setAttribute('aria-selected', opt.dataset.code === lang ? 'true' : 'false');
  });

  localStorage.setItem('fluent-language', lang);
}

function detectLoginLanguage() {
  const saved = localStorage.getItem('fluent-language');
  if (saved && LOGIN_LANGUAGES[saved]) return saved;
  const browser = (navigator.language || 'en').slice(0, 2).toLowerCase();
  return LOGIN_LANGUAGES[browser] ? browser : 'en';
}

// ── Dropdown ─────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const trigger = document.getElementById('lang-trigger');
  const menu = document.getElementById('lang-menu');

  const check = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';
  Object.entries(LOGIN_LANGUAGES).forEach(([code, lang]) => {
    const opt = document.createElement('button');
    opt.type = 'button';
    opt.className = 'lang-option';
    opt.dataset.code = code;
    opt.setAttribute('role', 'option');
    opt.lang = code;
    opt.innerHTML = `<span>${lang.name}</span>${check}`;
    opt.addEventListener('click', () => {
      applyLoginLanguage(code);
      closeMenu();
    });
    menu.appendChild(opt);
  });

  function closeMenu() {
    menu.classList.remove('open');
    trigger.setAttribute('aria-expanded', 'false');
  }

  trigger.addEventListener('click', e => {
    e.stopPropagation();
    const open = menu.classList.toggle('open');
    trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  document.addEventListener('click', closeMenu);

  applyLoginLanguage(detectLoginLanguage());
});
