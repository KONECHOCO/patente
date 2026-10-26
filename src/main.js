// App shell: hash router, bottom navigation, shared context for views.
import './style.css';
import { store } from './core/store.js';
import { makeT } from './core/i18n.js';
import { COUNTRIES } from './data/countries.js';
import { flag } from './data/flags.js';
import { getCourse, pick } from './content/index.js';
import { stopSpeaking } from './simulator/audio.js';
import { homeView } from './views/home.js';
import { courseView, chapterView } from './views/course.js';
import { signsView, signCategoryView, signDetailView } from './views/signs.js';
import { quizMenuView, quizRunView, historyView, historyDetailView } from './views/quiz.js';
import { junctionsView, junctionView } from './views/junctions.js';
import { proView, simulatorView, agendaView } from './views/pro.js';
import { settingsView, statsView } from './views/settings.js';
import { initMonetization, trackAdAction, toggleTestAds } from './core/monetization.js';
import { syncReminders } from './pro/reminders.js';

// ---------- tiny icon set ----------
const svgI = d => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
const homeIcon = svgI('<path d="M3 11 12 4l9 7"/><path d="M5 10v10h14V10"/>');
const bookIcon = svgI('<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z"/><path d="M4 19V5"/>');
const signIcon = svgI('<path d="M12 3 2 20h20z"/><path d="M12 10v4"/><path d="M12 17h.01"/>');
const quizIcon = svgI('<rect x="4" y="3" width="16" height="18" rx="2"/><path d="m8 9 2 2 4-4"/><path d="M8 15h8"/>');
const starIcon = svgI('<path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1 6.2L12 17.3 6.5 20.2l1-6.2L3 9.6l6.2-.9z"/>');
const gearIcon = svgI('<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>');
const chartIcon = svgI('<path d="M4 20V10"/><path d="M10 20V4"/><path d="M16 20v-7"/><path d="M22 20H2"/>');

const app = document.getElementById('app');
let cleanup = null;

export function ctx() {
  const s = store.settings;
  const cfg = COUNTRIES[s.country];
  const lang = s.lang;
  return {
    s, cfg, lang, country: s.country,
    t: makeT(lang),
    course: getCourse(s.country),
    p: store.progress(),
    pick: obj => pick(obj, lang, s.country),
    go: navigate
  };
}

export function navigate(path) {
  if (location.hash === '#' + path) render();
  else location.hash = path;
}

const ROUTES = [
  [/^\/home$/, homeView, 'home'],
  [/^\/course$/, courseView, 'course'],
  [/^\/course\/([\w-]+)$/, chapterView, 'course'],
  [/^\/signs$/, signsView, 'signs'],
  [/^\/signs\/([\w-]+)$/, signCategoryView, 'signs'],
  [/^\/sign\/([\w-]+)$/, signDetailView, 'signs'],
  [/^\/quiz$/, quizMenuView, 'quiz'],
  [/^\/quiz\/run\/([\w-]+)(?:\/([\w-]+))?$/, quizRunView, 'quiz'],
  [/^\/history$/, historyView, 'quiz'],
  [/^\/history\/(\d+)$/, historyDetailView, 'quiz'],
  [/^\/junctions$/, junctionsView, 'quiz'],
  [/^\/junctions\/(\d+)$/, junctionView, 'quiz'],
  [/^\/pro$/, proView, 'pro'],
  [/^\/pro\/sim$/, simulatorView, 'pro'],
  [/^\/pro\/agenda$/, agendaView, 'pro'],
  [/^\/settings$/, settingsView, 'more'],
  [/^\/stats$/, statsView, 'more']
];

function applyTheme() {
  const s = store.settings;
  const root = document.documentElement;
  if (s.theme === 'auto') root.removeAttribute('data-theme');
  else root.setAttribute('data-theme', s.theme);
  root.classList.toggle('easy-read', !!s.easyRead);
  root.lang = s.lang;
}

function shell(c, tab, inner, opts = {}) {
  const nav = [
    ['home', '/home', homeIcon, c.t('home')],
    ['course', '/course', bookIcon, c.t('course')],
    ['signs', '/signs', signIcon, c.t('signs')],
    ['quiz', '/quiz', quizIcon, c.t('quiz')],
    ['pro', '/pro', starIcon, c.t('pro')]
  ];
  return `
  <header class="topbar">
    <a class="brand" href="#/home"><span class="brand-mark">${flag(c.country, 22)}</span><span class="brand-txt"><b>${c.t('appName')}</b><small>${c.cfg.name} · ${c.t('licence')} ${c.s.licence}</small></span></a>
    <div class="top-actions">
      <a class="icon-btn" href="#/stats" aria-label="${c.t('stats')}">${chartIcon}</a>
      <a class="icon-btn" href="#/settings" aria-label="${c.t('settings')}">${gearIcon}</a>
    </div>
  </header>
  <main class="page ${opts.wide ? 'page-wide' : ''}">${inner}</main>
  <nav class="tabbar">${nav.map(([id, href, icon, label]) => `<a href="#${href}" class="tab ${tab === id ? 'active' : ''}">${icon}<span>${label}</span>${id === 'pro' && !store.pro ? '<i class="lock-dot"></i>' : ''}</a>`).join('')}</nav>`;
}

let lastPath = null;
function render() {
  stopSpeaking();
  if (cleanup) { try { cleanup(); } catch { /* view already gone */ } cleanup = null; }
  applyTheme();
  const path = (location.hash || '#/home').slice(1);
  // interstitial only at natural transitions, never inside a running quiz or the simulator
  if (lastPath && lastPath !== path && !/^\/(quiz\/run|pro\/sim)/.test(path) && !/^\/(quiz\/run|pro\/sim)/.test(lastPath)) trackAdAction();
  lastPath = path;
  const c = ctx();
  for (const [re, view, tab] of ROUTES) {
    const m = path.match(re);
    if (!m) continue;
    const out = view(c, ...m.slice(1));
    app.innerHTML = out.bare ? out.html : shell(c, tab, out.html, out);
    window.scrollTo(0, 0);
    if (out.mount) cleanup = out.mount(app.querySelector('main') || app, c) || null;
    return;
  }
  navigate('/home');
}

window.addEventListener('hashchange', render);
store.subscribe(() => applyTheme());
if (!location.hash) location.hash = '/home';
render();
initMonetization().then(() => syncReminders()).catch(() => {});

// 7 taps on the logo: test ads on/off for test builds (restart the app afterwards)
let taps = 0, tapTimer = null;
app.addEventListener('click', e => {
  if (!e.target.closest('.brand-mark')) return;
  e.preventDefault();
  taps++;
  clearTimeout(tapTimer);
  tapTimer = setTimeout(() => { taps = 0; }, 2500);
  if (taps >= 7) { taps = 0; alert(`Test ads: ${toggleTestAds() ? 'ON' : 'OFF'} — restart the app`); }
});
