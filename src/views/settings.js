import { esc, ring, readiness, chapterStats, bar, fmtDate, passPrediction, proLock } from './util.js';
import { COUNTRIES, LANGS, LICENCE_INFO } from '../data/countries.js';
import { allQuestions } from '../content/index.js';
import { store } from '../core/store.js';
import { flag } from '../data/flags.js';
import { ads, restorePro, showPrivacyOptions } from '../core/monetization.js';

export function settingsView(c) {
  const t = c.t;
  const s = c.s;
  const html = `
  <h1 class="page-title">⚙️ ${esc(t('settings'))}</h1>
  <section class="card">
    <h2>${esc(t('country'))}</h2>
    <div class="country-grid">${Object.values(COUNTRIES).map(k => `<button class="country ${k.code === s.country ? 'on' : ''}" data-country="${k.code}"><span>${flag(k.code, 26)}</span><b>${esc(k.name)}</b><small>${k.contentLangs.map(l => l.toUpperCase()).join(' · ')}</small></button>`).join('')}</div>
  </section>
  <section class="card">
    <h2>${esc(t('language'))}</h2>
    <div class="seg wrap">${Object.entries(LANGS).map(([code, l]) => `<button class="${code === s.lang ? 'on' : ''}" data-lang="${code}">${flag(code, 13)} ${l.name}</button>`).join('')}</div>
    <p class="muted small">${esc(t('contentLangNote'))}${c.cfg.contentLangs.map(l => LANGS[l].name).join(', ')}</p>
  </section>
  <section class="card">
    <h2>${esc(t('licence'))}</h2>
    <div class="seg wrap">${c.cfg.licences.map(l => `<button class="${l.id === s.licence ? 'on' : ''}" data-licence="${l.id}">${LICENCE_INFO[l.id]?.icon || ''} ${l.id}</button>`).join('')}</div>
    <p class="muted small">${esc(c.pick(LICENCE_INFO[s.licence] || {}))}</p>
  </section>
  <section class="card">
    <label class="switch"><span>${esc(t('darkMode'))}</span>
      <select id="theme"><option value="auto" ${s.theme === 'auto' ? 'selected' : ''}>Auto</option><option value="light" ${s.theme === 'light' ? 'selected' : ''}>☀️</option><option value="dark" ${s.theme === 'dark' ? 'selected' : ''}>🌙</option></select></label>
    <label class="switch"><span>${esc(t('easyRead'))}</span><input type="checkbox" id="easy" ${s.easyRead ? 'checked' : ''}></label>
    <label class="switch"><span>${esc(t('ttsRate'))} <b id="rate-v">${s.ttsRate}×</b></span><input type="range" id="rate" min="0.6" max="2" step="0.1" value="${s.ttsRate}"></label>
  </section>
  <section class="card">
    <button class="btn btn-ghost" id="restore-p" style="width:100%">⭐ ${esc(t('restore'))}</button>
    ${ads.native && !store.pro ? `<button class="btn btn-ghost" id="ad-privacy" style="width:100%;margin-top:8px">🛡️ ${esc(t('adPrivacy'))}</button>` : ''}
  </section>
  ${ads.testAds && ads.native ? `<section class="card"><h2>ADS DEBUG</h2><pre class="diag">${ads.diag.map(esc).join('<br>') || '—'}</pre></section>` : ''}
  <section class="card">
    <button class="btn btn-danger" id="reset">🗑️ ${esc(t('resetProgress'))}</button>
  </section>`;
  const mount = root => {
    root.addEventListener('click', e => {
      const b = e.target.closest('button');
      if (!b) return;
      if (b.dataset.country) { store.setCountry(b.dataset.country); c.go('/settings'); }
      if (b.dataset.lang) { store.set({ lang: b.dataset.lang }); c.go('/settings'); }
      if (b.dataset.licence) { store.set({ licence: b.dataset.licence }); c.go('/settings'); }
      if (b.id === 'reset' && confirm(t('resetConfirm'))) { store.resetCountry(); c.go('/home'); }
      if (b.id === 'ad-privacy') showPrivacyOptions();
      if (b.id === 'restore-p') restorePro().then(ok => { if (!ok) alert(t('restoreNone')); else c.go('/pro'); });
    });
    root.querySelector('#theme').addEventListener('change', e => store.set({ theme: e.target.value }));
    root.querySelector('#easy').addEventListener('change', e => store.set({ easyRead: e.target.checked }));
    root.querySelector('#rate').addEventListener('input', e => { store.set({ ttsRate: +e.target.value }); root.querySelector('#rate-v').textContent = e.target.value + '×'; });
  };
  return { html, mount };
}

export function statsView(c) {
  const t = c.t;
  const qs = allQuestions(c.country);
  const answers = Object.values(c.p.answers);
  const ok = answers.reduce((s, a) => s + a.ok, 0), ko = answers.reduce((s, a) => s + a.ko, 0);
  const acc = ok + ko ? Math.round((ok / (ok + ko)) * 100) : 0;
  const exams = c.p.history.filter(h => h.mode === 'exam');
  const passed = exams.filter(h => h.passed).length;
  const days = [...Array(14)].map((_, i) => { const d = new Date(Date.now() - (13 - i) * 86400000).toISOString().slice(0, 10); return { d, n: c.p.daily[d] || 0 }; });
  const maxN = Math.max(10, ...days.map(d => d.n));
  const html = `
  <h1 class="page-title">📊 ${esc(t('stats'))}</h1>
  <section class="card stats-top">
    ${ring(readiness(c), 120, t('readiness'))}
    <div class="kpis">
      <div><b>${acc}%</b><small>${esc(t('accuracy'))}</small></div>
      <div><b>${passed}/${exams.length}</b><small>${esc(t('examsPassed'))}</small></div>
      <div><b>${Object.keys(c.p.answers).length}/${qs.length}</b><small>${esc(t('answered'))}</small></div>
      <div><b>${c.p.errors.length}</b><small>${esc(t('reviewErrors'))}</small></div>
    </div>
  </section>
  ${store.pro ? predictionCard(c) : proLock(c, '🎯', t('passPrediction'), t('passPredictionSub'))}
  <section class="card"><h2>${esc(t('daily'))}</h2>
    <div class="spark">${days.map(d => `<div title="${d.d}: ${d.n}"><i style="height:${(d.n / maxN) * 100}%"></i><small>${d.d.slice(8)}</small></div>`).join('')}</div>
  </section>
  <section class="card"><h2>${esc(t('lastExams'))}</h2>
    ${exams.length ? exams.slice(0, 8).map(e => `<div class="row-link"><span>${fmtDate(e.date, c.lang)}</span><b class="${e.passed ? 'txt-ok' : 'txt-ko'}">${e.total - e.errors}/${e.total} · ${esc(e.passed ? t('passed') : t('failed'))}</b></div>`).join('') : `<p class="muted">${esc(t('noHistory'))}</p>`}
  </section>
  <section class="card"><h2>${esc(t('chapterProgress'))}</h2>
    ${c.course.chapters.map(ch => { const st = chapterStats(c, ch); return `<a class="prog-row" href="#/course/${ch.id}"><span>${esc(ch.n)}. ${esc(c.pick(ch.title))}</span>${bar(st.pct)}<small>${st.pct}%</small></a>`; }).join('')}
  </section>`;
  return { html };
}

function predictionCard(c) {
  const t = c.t;
  const pr = passPrediction(c);
  if (!pr) return `<section class="card"><h2>🎯 ${esc(t('passPrediction'))}</h2><p class="muted">${esc(t('predictionNeedData'))}</p></section>`;
  const col = pr.pct >= 80 ? 'txt-ok' : pr.pct >= 50 ? '' : 'txt-ko';
  return `<section class="card"><h2>🎯 ${esc(t('passPrediction'))}</h2>
    <div class="predict"><b class="${col}">${pr.pct}%</b><span>${esc(t('passChance'))}<small>${esc(t('accuracy'))}: ${pr.acc}%</small></span></div>
    ${pr.byChapter.length ? `<h3 class="small">${esc(t('criticalTopics'))}</h3>${pr.byChapter.map(x => `<a class="row-link" href="#/quiz/run/chapter/${x.ch.id}"><span>${x.ch.icon} ${esc(c.pick(x.ch.title))}</span><b>${x.wrong}</b></a>`).join('')}` : ''}
  </section>`;
}
