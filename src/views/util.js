// Shared helpers for views: escaping, lesson markdown, progress maths, speech.
import { allQuestions } from '../content/index.js';
import { speakText, stopSpeaking } from '../simulator/audio.js';
import { store } from '../core/store.js';

export const esc = s => String(s ?? '').replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));

// Minimal markdown: paragraphs, **bold**, "- " lists, "1. " lists.
export function md(text) {
  const lines = esc(text).split('\n').map(l => l.trim());
  let html = '', list = null;
  const close = () => { if (list) { html += `</${list}>`; list = null; } };
  for (const line of lines) {
    const inline = s => s.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    if (/^- /.test(line)) {
      if (list !== 'ul') { close(); html += '<ul>'; list = 'ul'; }
      html += `<li>${inline(line.slice(2))}</li>`;
    } else if (/^\d+\. /.test(line)) {
      if (list !== 'ol') { close(); html += '<ol>'; list = 'ol'; }
      html += `<li>${inline(line.replace(/^\d+\. /, ''))}</li>`;
    } else if (!line) {
      close();
    } else {
      close();
      html += `<p>${inline(line)}</p>`;
    }
  }
  close();
  return html;
}

export const plain = text => String(text).replace(/\*\*/g, '').replace(/^- /gm, '');

export function chapterStats(c, chapter) {
  const qs = allQuestions(c.country).filter(q => q.chapterId === chapter.id);
  const done = qs.filter(q => c.p.answers[q.id]?.last === true).length;
  const tried = qs.filter(q => c.p.answers[q.id]).length;
  return { total: qs.length, done, tried, pct: qs.length ? Math.round((done / qs.length) * 100) : 0 };
}

export function readiness(c) {
  const qs = allQuestions(c.country);
  const known = qs.filter(q => c.p.answers[q.id]?.last === true).length;
  const exams = c.p.history.filter(h => h.mode === 'exam').slice(0, 5);
  const passed = exams.filter(h => h.passed).length;
  return Math.round((known / qs.length) * 70 + (passed / 5) * 30);
}

// Probability of passing the real test: per-question accuracy estimated from answers (with a prior),
// blended with the error rate of the last mock exams, then binomial P(errors <= allowed).
export function passPrediction(c) {
  const ex = c.cfg.exam[c.s.licence] || c.cfg.exam.B;
  const qs = allQuestions(c.country);
  const answered = qs.filter(q => c.p.answers[q.id]);
  if (answered.length < 60) return null;
  const guess = ex.format === 'tf' ? 0.5 : 0.35;
  const known = answered.filter(q => c.p.answers[q.id].last === true).length;
  const accAnswered = (known + 1) / (answered.length + 2);
  const coverage = answered.length / qs.length;
  let p = coverage * accAnswered + (1 - coverage) * (accAnswered * 0.6 + guess * 0.4);
  const exams = c.p.history.filter(h => h.mode === 'exam').slice(0, 5);
  if (exams.length) {
    const examAcc = exams.reduce((s, h) => s + (h.total - h.errors) / h.total, 0) / exams.length;
    p = p * (1 - Math.min(0.6, exams.length * 0.12)) + examAcc * Math.min(0.6, exams.length * 0.12);
  }
  const n = ex.questions;
  const maxErr = ex.maxPoints ? Math.floor(ex.maxPoints / 3.5) : ex.maxErrors;
  const q = 1 - p;
  let prob = 0, comb = 1;
  for (let k = 0; k <= maxErr; k++) {
    if (k > 0) comb = comb * (n - k + 1) / k;
    prob += comb * q ** k * p ** (n - k);
  }
  const byChapter = c.course.chapters.map(ch => {
    const ans = answered.filter(x => x.chapterId === ch.id);
    const wrong = ans.filter(x => c.p.answers[x.id].last === false).length;
    return { ch, wrong, rate: ans.length ? wrong / ans.length : 0 };
  }).filter(x => x.wrong).sort((a, b) => b.wrong - a.wrong).slice(0, 4);
  return { pct: Math.round(prob * 100), acc: Math.round(p * 100), byChapter };
}

export function proLock(c, icon, title, sub) {
  return `<a class="card pro-lock" href="#/pro"><span class="pl-ico">${icon}</span><span><b>${esc(title)}</b><small>${esc(sub)}</small></span><span class="pl-badge">🔒 ${esc(c.t('proOnly'))}</span></a>`;
}

export function ring(pct, size = 120, label = '') {
  const r = size / 2 - 9, C = 2 * Math.PI * r;
  return `<svg class="ring" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}"><circle cx="${size / 2}" cy="${size / 2}" r="${r}" class="ring-bg"/><circle cx="${size / 2}" cy="${size / 2}" r="${r}" class="ring-fg" stroke-dasharray="${C}" stroke-dashoffset="${C * (1 - pct / 100)}" transform="rotate(-90 ${size / 2} ${size / 2})"/><text x="50%" y="48%" text-anchor="middle" dominant-baseline="central" class="ring-num">${pct}%</text>${label ? `<text x="50%" y="66%" text-anchor="middle" class="ring-lbl">${esc(label)}</text>` : ''}</svg>`;
}

export function bar(pct) {
  return `<div class="bar"><i style="width:${Math.max(0, Math.min(100, pct))}%"></i></div>`;
}

let speakingBtn = null;
export function bindSpeak(root, getText, lang) {
  root.querySelectorAll('[data-speak]').forEach(btn => {
    btn.addEventListener('click', () => {
      if (speakingBtn === btn) { stopSpeaking(); btn.classList.remove('on'); speakingBtn = null; return; }
      if (speakingBtn) speakingBtn.classList.remove('on');
      speakingBtn = btn;
      btn.classList.add('on');
      speakText(plain(getText(btn.dataset.speak)), lang, store.settings.ttsRate, () => { btn.classList.remove('on'); if (speakingBtn === btn) speakingBtn = null; });
    });
  });
}

export const speakerIcon = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5 6 9H2v6h4l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M19 5a10 10 0 0 1 0 14"/></svg>';

export function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}

export function fmtDate(iso, lang) {
  try { return new Date(iso).toLocaleDateString(lang, { day: '2-digit', month: 'short', year: 'numeric' }); } catch { return iso; }
}
