// Persistent app state (settings + per-country progress) in localStorage.

import { COUNTRIES, detectCountry } from '../data/countries.js';

const KEY = 'patente.v2';
const SRS_DAYS = [0, 1, 2, 4, 7, 15];
export const today = () => new Date().toISOString().slice(0, 10);
const addDays = (iso, n) => { const d = new Date(iso + 'T12:00:00'); d.setDate(d.getDate() + n); return d.toISOString().slice(0, 10); };

function load() {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) || 'null');
    if (raw && raw.settings) return raw;
  } catch { /* ignore broken storage */ }
  const country = detectCountry();
  return {
    settings: { country, lang: COUNTRIES[country].defaultLang, licence: 'B', theme: 'auto', easyRead: false, ttsRate: 1 },
    progress: {},
    pro: false
  };
}

const state = load();
const listeners = new Set();

function save() {
  try { localStorage.setItem(KEY, JSON.stringify(state)); } catch { /* quota or private mode */ }
  listeners.forEach(fn => fn(state));
}

export const store = {
  get settings() { return state.settings; },
  get pro() { return state.pro; },
  setPro(v) { state.pro = !!v; save(); },
  set(patch) { Object.assign(state.settings, patch); save(); },
  setCountry(code) {
    state.settings.country = code;
    state.settings.lang = COUNTRIES[code].defaultLang;
    if (!COUNTRIES[code].exam[state.settings.licence]) state.settings.licence = 'B';
    save();
  },
  progress(country = state.settings.country) {
    if (!state.progress[country]) state.progress[country] = { answers: {}, errors: [], history: [], read: {}, signs: {}, daily: {} };
    return state.progress[country];
  },
  recordAnswer(qid, ok) {
    const p = this.progress();
    const a = p.answers[qid] || { ok: 0, ko: 0, last: null };
    if (ok) a.ok++; else a.ko++;
    a.last = ok;
    p.answers[qid] = a;
    if (!ok && !p.errors.includes(qid)) p.errors.push(qid);
    if (ok && p.errors.includes(qid) && a.ok >= 1 && a.last) p.errors = p.errors.filter(x => x !== qid);
    const day = today();
    p.daily[day] = (p.daily[day] || 0) + 1;
    // Leitner boxes for smart review: wrong -> box 1 (due now), right -> next box, later due date
    p.srs = p.srs || {};
    const box = ok ? Math.min(5, (p.srs[qid]?.box || 0) + 1) : 1;
    if (ok && !p.srs[qid]) { save(); return; }
    p.srs[qid] = { box, due: addDays(day, ok ? SRS_DAYS[box] : 0) };
    save();
  },
  dueForReview(country) {
    const p = this.progress(country);
    const day = today();
    return Object.entries(p.srs || {}).filter(([, v]) => v.due <= day && v.box < 5).map(([id]) => id);
  },
  examsToday() { return this.progress().examsDay?.[today()] || 0; },
  countExam() {
    const p = this.progress();
    p.examsDay = { [today()]: (p.examsDay?.[today()] || 0) + 1 };
    save();
  },
  grantExtraExam() {
    const p = this.progress();
    p.examsDay = { [today()]: Math.max(0, (p.examsDay?.[today()] || 0) - 1) };
    save();
  },
  addHistory(entry) {
    const p = this.progress();
    p.history.unshift(entry);
    p.history = p.history.slice(0, 60);
    save();
  },
  markRead(chapterId, v = true) { this.progress().read[chapterId] = v; save(); },
  markSign(signId) { this.progress().signs[signId] = true; save(); },
  markJunction(index, ok) {
    const p = this.progress();
    p.junc = p.junc || {};
    p.junc[index] = ok || p.junc[index] === true;
    save();
  },
  resetCountry() { delete state.progress[state.settings.country]; save(); },
  subscribe(fn) { listeners.add(fn); return () => listeners.delete(fn); }
};
