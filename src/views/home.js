import { esc, ring, readiness, chapterStats } from './util.js';
import { LICENCE_INFO } from '../data/countries.js';
import { allQuestions } from '../content/index.js';
import { agendaStore } from '../pro/agenda.js';
import { store } from '../core/store.js';
import { flag } from '../data/flags.js';

export function homeView(c) {
  const t = c.t;
  const pct = readiness(c);
  const today = new Date().toISOString().slice(0, 10);
  const daily = Math.min(30, c.p.daily[today] || 0);
  const exam = c.cfg.exam[c.s.licence] || c.cfg.exam.B;
  const nextChapter = c.course.chapters.find(ch => !c.p.read[ch.id]) || c.course.chapters[0];
  const notes = c.pick(c.cfg.examNotes) || [];
  const sp = c.cfg.speed;
  const examDate = store.pro ? agendaStore.nextExam() : null;
  const daysLeft = examDate ? Math.ceil((new Date(examDate.date) - new Date(today)) / 86400000) : null;
  const weak = c.course.chapters.map(ch => ({ ch, st: chapterStats(c, ch) })).filter(x => x.st.tried > 0).sort((a, b) => (a.st.done / a.st.tried) - (b.st.done / b.st.tried)).slice(0, 3);

  const tile = (href, icon, title, sub, cls = '') => `<a class="tile ${cls}" href="#${href}"><span class="tile-ico">${icon}</span><span class="tile-txt"><b>${esc(title)}</b><small>${esc(sub)}</small></span></a>`;

  const fmtExam = exam.maxPoints
    ? `${exam.questions} · ${exam.maxPoints} ${t('errorPoints')}`
    : `${exam.questions} ${t('questionsN')} · ${exam.minutes} ${t('min')} · ≤ ${exam.maxErrors} ${t('errors')}`;

  const html = `
  <section class="hero card">
    <div class="hero-ring">${ring(pct, 128, t('readiness'))}</div>
    <div class="hero-body">
      <h1>${flag(c.country, 18)} ${esc(c.cfg.name)} · ${esc(t('licence'))} ${esc(c.s.licence)}</h1>
      <p class="muted">${esc(c.cfg.lawName)}</p>
      <div class="daily"><span>${esc(t('daily'))}: <b>${daily}</b> ${esc(t('dailyGoal'))}</span><div class="bar"><i style="width:${(daily / 30) * 100}%"></i></div></div>
      ${daysLeft != null && daysLeft >= 0 ? `<div class="countdown">⏳ <b>${daysLeft}</b> ${esc(t('days'))} ${esc(t('examCountdown'))}</div>` : ''}
      <a class="btn btn-primary btn-lg" href="#/quiz/run/exam">📝 ${esc(t('examSim'))}<small>${esc(fmtExam)}</small></a>
    </div>
  </section>

  <section class="tiles">
    ${tile(`/course/${nextChapter.id}`, '📖', t('continueStudy'), `${t('chapter')} ${nextChapter.n} · ${c.pick(nextChapter.title)}`)}
    ${tile('/quiz/run/quick', '⚡', t('quickQuiz'), t('quickQuizSub'))}
    ${tile('/quiz/run/errors', '🔁', t('reviewErrors'), `${c.p.errors.length} · ${t('reviewErrorsSub')}`)}
    ${tile('/signs', '🪧', t('signs'), t('signsQuizSub'))}
    ${c.cfg.drive === 'right' ? tile('/junctions', '✖️', t('junctions'), t('junctionsSub')) : tile('/quiz/run/tricky', '🎯', t('tricky'), t('trickySub'))}
    ${tile('/pro/sim', '🚗', t('simulator'), store.pro ? t('simulatorSub') : t('locked'), store.pro ? '' : 'tile-locked')}
  </section>

  ${weak.length ? `<section class="card"><h2>${esc(t('weakTopics'))}</h2>${weak.map(w => `<a class="row-link" href="#/course/${w.ch.id}"><span>${w.ch.icon} ${esc(c.pick(w.ch.title))}</span><b>${Math.round((w.st.done / w.st.tried) * 100)}%</b></a>`).join('')}</section>` : ''}

  <section class="card">
    <h2>📋 ${esc(t('examRules'))} — ${esc(c.cfg.name)}</h2>
    ${exam.verify ? `<p class="warn">⚠️ ${esc(t('indicative'))} · ${esc(t('toVerify'))}</p>` : ''}
    <ul class="rules">${notes.map(n => `<li>${esc(n)}</li>`).join('')}</ul>
    <p class="muted small">${esc(c.cfg.authority)}</p>
  </section>

  <section class="card">
    <h2>🔢 ${esc(t('keyNumbers'))}</h2>
    <div class="speed-grid">
      ${[['speedUrban', sp.urban], ['speedRural', sp.rural], ['speedExpress', sp.expressway], ['speedMotorway', sp.motorway]].map(([k, v]) => `<div class="speed"><div class="speed-sign"><span>${v}</span></div><small>${esc(t(k))}${k === 'speedMotorway' && sp.motorwayAdvisory ? ` (${esc(t('advisory'))})` : ''}</small></div>`).join('')}
    </div>
    <p class="muted small">${esc(sp.unit)}${sp.verify ? ' · ⚠️ ' + esc(t('toVerify')) : ''}</p>
    <dl class="facts">
      ${c.cfg.alcohol ? `<dt>🍷 ${esc(t('alcohol'))}</dt><dd>${esc(c.cfg.alcohol.general)}<br><small>${esc(c.cfg.alcohol.novice)}</small></dd>` : ''}
      ${c.cfg.points?.total ? `<dt>⭐ ${esc(t('points'))}</dt><dd>${esc(c.pick(c.cfg.points.note))}</dd>` : ''}
      ${c.cfg.novice ? `<dt>🔰 ${esc(t('novice'))}</dt><dd>${esc(c.pick(c.cfg.novice))}</dd>` : ''}
      <dt>🚗 ${esc(t('practicalTest'))}</dt><dd>${esc(c.pick(c.cfg.practical))}</dd>
    </dl>
  </section>

  <section class="card">
    <h2>🪪 ${esc(t('licences'))}</h2>
    <div class="licences">${c.cfg.licences.map(l => `<div class="lic ${l.id === c.s.licence ? 'active' : ''}"><b>${LICENCE_INFO[l.id]?.icon || '🚗'} ${l.id}</b><span>${esc(c.pick(LICENCE_INFO[l.id] || {}))}</span><small>${esc(t('minAge'))}: ${l.age} ${esc(t('years'))}${l.note ? ' · ' + esc(l.note) : ''}</small></div>`).join('')}</div>
  </section>

  <p class="disclaimer">${esc(t('totalQuestions'))}: <b>${allQuestions(c.country).length}</b> · ${esc(t('disclaimer'))}<br>${esc(t('sources'))}: ${c.cfg.sources.map(s => `<a href="${esc(s)}" target="_blank" rel="noopener">${esc(s.replace(/^https?:\/\//, ''))}</a>`).join(' · ')}</p>`;
  return { html };
}
