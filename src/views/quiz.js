import { esc, shuffle, bindSpeak, speakerIcon, md, fmtDate, proLock } from './util.js';
import { allQuestions, questionById } from '../content/index.js';
import { renderSign } from '../signs/draw.js';
import { ROAD_SIGNS, signName, signDesc } from '../signs/catalog.js';
import { scenarioList, renderJunction, explain } from '../incroci/engine.js';
import { store } from '../core/store.js';
import { sound } from '../simulator/audio.js';
import { ads, trackAdAction, watchRewardedVideo } from '../core/monetization.js';

export const FREE_EXAMS_PER_DAY = 3;

let scenarios = null;
const scenarioByIndex = i => { scenarios = scenarios || scenarioList(); return scenarios[i - 1]; };

// ---------- menu ----------

export function quizMenuView(c) {
  const t = c.t;
  const exam = c.cfg.exam[c.s.licence] || c.cfg.exam.B;
  const card = (href, icon, title, sub, extra = '') => `<a class="mode" href="#${href}"><span class="mode-ico">${icon}</span><span><b>${esc(title)}</b><small>${esc(sub)}</small></span>${extra}</a>`;
  const html = `
  <h1 class="page-title">📝 ${esc(t('quiz'))}</h1>
  <a class="exam-cta" href="#/quiz/run/exam">
    <span class="exam-cta-ico">🏁</span>
    <span><b>${esc(t('examSim'))}</b><small>${exam.questions} ${esc(t('questionsN'))} · ${exam.minutes} ${esc(t('min'))} · ${exam.maxPoints ? `≤ ${exam.maxPoints} ${esc(t('errorPoints'))}` : `≤ ${exam.maxErrors} ${esc(t('errors'))}`}</small>
    <small>${store.pro ? '♾️ ' + esc(t('unlimitedExams')) : `${Math.max(0, FREE_EXAMS_PER_DAY - store.examsToday())} ${esc(t('freeExamsLeft'))}`}</small></span>
  </a>
  <div class="modes">
    ${card('/quiz/run/smart', '🧠', t('smartReview'), store.pro ? `${store.dueForReview(c.country).length} ${t('dueToday')}` : t('proOnly'), store.pro ? '' : '<span class="badge pro">PRO</span>')}
    ${card('/quiz/run/quick', '⚡', t('quickQuiz'), t('quickQuizSub'))}
    ${card('/quiz/run/errors', '🔁', t('reviewErrors'), t('reviewErrorsSub'), `<span class="badge">${c.p.errors.length}</span>`)}
    ${card('/quiz/run/tricky', '🎯', t('tricky'), t('trickySub'))}
    ${card('/quiz/run/signs', '🪧', t('signsQuiz'), t('signsQuizSub'))}
    ${c.cfg.drive === 'right' ? card('/junctions', '✖️', t('junctions'), t('junctionsSub')) : ''}
    ${card('/history', '🗂️', t('history'), t('historySub'), `<span class="badge">${c.p.history.length}</span>`)}
  </div>
  <h2 class="section-title">${esc(t('byChapter'))}</h2>
  <div class="chapter-list compact">
    ${c.course.chapters.map(ch => {
      const qs = allQuestions(c.country).filter(q => q.chapterId === ch.id);
      const ok = qs.filter(q => c.p.answers[q.id]?.last === true).length;
      return `<a class="chapter" href="#/quiz/run/chapter/${ch.id}"><span class="ch-num">${esc(ch.n)}</span><span class="ch-body"><b>${ch.icon} ${esc(c.pick(ch.title))}</b><small>${ok}/${qs.length}</small></span></a>`;
    }).join('')}
  </div>`;
  return { html };
}

// ---------- building question sets ----------

function examConfig(c) { return c.cfg.exam[c.s.licence] || c.cfg.exam.B; }

function buildSet(c, mode, arg) {
  const pool = allQuestions(c.country);
  if (mode === 'exam') {
    const ex = examConfig(c);
    const n = Math.min(ex.questions, pool.length);
    if (c.country === 'IT') {
      // one statement per ministerial chapter, alternating true/false, then balance the rest
      const picked = [];
      c.course.chapters.forEach((ch, i) => {
        const qs = shuffle(pool.filter(q => q.chapterId === ch.id));
        const want = i % 2 === 0;
        const q = qs.find(x => x.answer === want) || qs[0];
        if (q) picked.push(q);
      });
      const rest = shuffle(pool.filter(q => !picked.includes(q)));
      while (picked.length < n && rest.length) {
        const trues = picked.filter(q => q.answer).length;
        const want = trues <= picked.length / 2 ? true : false;
        const idx = rest.findIndex(q => q.answer === want);
        picked.push(rest.splice(idx >= 0 ? idx : 0, 1)[0]);
      }
      return shuffle(picked.slice(0, n));
    }
    // keep the official-style written questions in the majority, then fill with signs and junctions
    const authored = shuffle(pool.filter(q => !q.generated));
    const generated = shuffle(pool.filter(q => q.generated));
    const main = authored.slice(0, Math.ceil(n * 0.65));
    return shuffle([...main, ...generated, ...authored.slice(main.length)].slice(0, n));
  }
  if (mode === 'quick') return shuffle(pool).slice(0, 10);
  if (mode === 'chapter') return shuffle(pool.filter(q => q.chapterId === arg)).slice(0, 40);
  if (mode === 'smart') return shuffle(store.dueForReview(c.country).map(id => questionById(c.country, id)).filter(Boolean)).slice(0, 30);
  if (mode === 'errors') return shuffle(c.p.errors.map(id => questionById(c.country, id)).filter(Boolean)).slice(0, 40);
  if (mode === 'signs') return shuffle(pool.filter(q => q.generated === 'sign')).slice(0, 20);
  if (mode === 'tricky') {
    const missed = pool.filter(q => c.p.answers[q.id]?.ko).sort((a, b) => c.p.answers[b.id].ko - c.p.answers[a.id].ko);
    const traps = shuffle(pool.filter(q => !q.generated && (q.format === 'tf' ? q.answer === false : q.multi && q.correct.length > 1)));
    return [...missed, ...traps.filter(q => !missed.includes(q))].slice(0, 20);
  }
  return shuffle(pool).slice(0, 10);
}

// ---------- evaluation ----------

function isCorrect(q, sel) {
  if (!sel || !sel.length) return false;
  const a = [...sel].sort().join(','), b = [...q.correct].sort().join(',');
  return a === b;
}

function evaluate(c, run) {
  const ex = examConfig(c);
  const res = run.items.map((q, i) => ({ q, sel: run.answers[i] || [], ok: isCorrect(q, run.answers[i]) }));
  const errors = res.filter(r => !r.ok).length;
  const reduced = run.items.length < ex.questions;
  if (ex.maxPoints) {
    const pts = res.filter(r => !r.ok).reduce((s, r) => s + (r.q.points || 3), 0);
    const fives = res.filter(r => !r.ok && (r.q.points || 3) === 5).length;
    const maxP = reduced ? Math.round(ex.maxPoints * run.items.length / ex.questions) : ex.maxPoints;
    return { res, errors, errorPoints: pts, maxPoints: maxP, passed: pts <= maxP && fives < 2, reduced };
  }
  const maxE = reduced ? Math.floor(ex.maxErrors * run.items.length / ex.questions) : ex.maxErrors;
  return { res, errors, maxErrors: maxE, passed: errors <= maxE, reduced };
}

// ---------- shared question rendering ----------

function media(c, q) {
  if (q.sign) {
    const s = ROAD_SIGNS.find(x => x.id === q.sign);
    if (s) return `<div class="q-media">${renderSign(s.spec, { country: c.country })}</div>`;
  }
  if (q.scenario) {
    const scn = scenarioByIndex(q.scenario);
    if (scn) return `<div class="q-media junction">${renderJunction(scn, { showPaths: true })}</div>`;
  }
  return '';
}

function explanationHtml(c, q) {
  const parts = [];
  if (q.e) parts.push(`<p>${esc(c.pick(q.e))}</p>`);
  if (q.scenario) {
    const scn = scenarioByIndex(q.scenario);
    if (scn) parts.push(`<ul>${explain(scn, c.lang).map(l => `<li>${esc(l)}</li>`).join('')}</ul>`);
  }
  return parts.join('');
}

function optionsHtml(c, q, sel, { reveal = false, locked = false } = {}) {
  const t = c.t;
  if (q.format === 'tf') {
    return `<div class="tf big">${[0, 1].map(v => {
      const cls = ['btn', 'tf-btn', v === 0 ? 'tf-true' : 'tf-false'];
      if (sel?.includes(v)) cls.push('selected');
      if (reveal && q.correct.includes(v)) cls.push('is-correct');
      if (reveal && sel?.includes(v) && !q.correct.includes(v)) cls.push('is-wrong');
      return `<button class="${cls.join(' ')}" data-opt="${v}" ${locked ? 'disabled' : ''}>${v === 0 ? 'V' : 'F'}<span>${esc(v === 0 ? t('true') : t('false'))}</span></button>`;
    }).join('')}</div>`;
  }
  const opts = c.pick(q.options) || [];
  return `<p class="muted small">${esc(q.multi ? t('multiHint') : t('singleHint'))}${q.points && c.cfg.exam.B.weighted ? ` · ${q.points} ${esc(t('pointsQ'))}` : ''}</p>
  <div class="opts">${opts.map((o, i) => {
    const cls = ['opt'];
    if (sel?.includes(i)) cls.push('selected');
    if (reveal && q.correct.includes(i)) cls.push('is-correct');
    if (reveal && sel?.includes(i) && !q.correct.includes(i)) cls.push('is-wrong');
    return `<button class="${cls.join(' ')}" data-opt="${i}" ${locked ? 'disabled' : ''}><span class="opt-letter">${String.fromCharCode(65 + i)}</span><span>${esc(o)}</span></button>`;
  }).join('')}</div>`;
}

// ---------- runner ----------

let run = null;

export function quizRunView(c, mode, arg) {
  const t = c.t;
  if (mode === 'smart' && !store.pro) return { html: `<a class="back" href="#/quiz">← ${esc(t('quiz'))}</a>${proLock(c, '🧠', t('smartReview'), t('smartReviewSub'))}` };
  if (mode === 'exam' && !store.pro && store.examsToday() >= FREE_EXAMS_PER_DAY) return examLimitView(c);
  const items = buildSet(c, mode, arg);
  if (!items.length) {
    return { html: `<a class="back" href="#/quiz">← ${esc(t('quiz'))}</a><div class="empty card"><p>${esc(mode === 'errors' ? t('noErrors') : mode === 'smart' ? t('nothingDue') : '—')}</p><a class="btn btn-primary" href="#/quiz/run/quick">${esc(t('quickQuiz'))}</a></div>` };
  }
  const ex = examConfig(c);
  const isExam = mode === 'exam';
  const chapter = mode === 'chapter' ? c.course.chapters.find(ch => ch.id === arg) : null;
  const title = isExam ? t('examSim') : chapter ? `${t('chapter')} ${chapter.n}` : { quick: t('quickQuiz'), errors: t('reviewErrors'), tricky: t('tricky'), signs: t('signsQuiz'), smart: t('smartReview') }[mode];
  if (isExam && !store.pro) store.countExam();
  run = { mode, arg, title, items, answers: {}, revealed: {}, flags: new Set(), index: 0, started: Date.now(), limit: isExam ? Math.round(ex.minutes * 60 * Math.min(1, items.length / ex.questions)) : null, finished: false };

  const html = `<div id="runner" class="runner ${isExam ? 'exam' : 'train'}"></div>`;
  const mount = root => {
    const el = root.querySelector('#runner');
    let timer = null;
    const draw = () => drawRunner(c, el);
    if (isExam) {
      timer = setInterval(() => {
        const left = run.limit - Math.floor((Date.now() - run.started) / 1000);
        const tEl = el.querySelector('#timer');
        if (tEl) { tEl.textContent = fmtTime(Math.max(0, left)); tEl.classList.toggle('low', left < 60); }
        if (left <= 0 && !run.finished) { clearInterval(timer); alert(t('timeUp')); finish(c, el); }
      }, 500);
    }
    el.addEventListener('click', e => handleClick(c, el, e, draw));
    draw();
    const onKey = e => {
      if (run.finished || e.target.tagName === 'INPUT') return;
      const q = run.items[run.index];
      if (e.key === 'ArrowRight') { move(1); draw(); }
      else if (e.key === 'ArrowLeft') { move(-1); draw(); }
      else if (q.format === 'tf' && (e.key === 'v' || e.key === 'V' || e.key === '1')) select(c, el, 0, draw);
      else if (q.format === 'tf' && (e.key === 'f' || e.key === 'F' || e.key === '2')) select(c, el, 1, draw);
    };
    window.addEventListener('keydown', onKey);
    return () => { clearInterval(timer); window.removeEventListener('keydown', onKey); };
  };
  return { html, mount, wide: true };
}

const fmtTime = s => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

function move(d) { run.index = Math.max(0, Math.min(run.items.length - 1, run.index + d)); }

function drawRunner(c, el) {
  if (run.finished) return;
  const t = c.t;
  const q = run.items[run.index];
  const isExam = run.mode === 'exam';
  const sel = run.answers[run.index];
  const revealed = !isExam && run.revealed[run.index];
  const answeredCount = Object.keys(run.answers).length;
  const left = run.limit ? run.limit - Math.floor((Date.now() - run.started) / 1000) : null;
  const ch = c.course.chapters.find(x => x.id === q.chapterId);

  el.innerHTML = `
  <div class="run-head">
    <button class="btn btn-ghost small" data-act="quit">✕ ${esc(t('quit'))}</button>
    <div class="run-title"><b>${esc(run.title)}</b><small>${run.index + 1} / ${run.items.length} · ${answeredCount} ${esc(t('answered'))}</small></div>
    ${isExam ? `<div class="timer" id="timer">${fmtTime(Math.max(0, left))}</div>` : '<span></span>'}
  </div>
  ${isExam ? `<div class="grid-nav">${run.items.map((_, i) => `<button data-goto="${i}" class="${i === run.index ? 'cur' : ''} ${run.answers[i] ? 'done' : ''} ${run.flags.has(i) ? 'flag' : ''}">${i + 1}</button>`).join('')}</div>`
    : `<div class="progress-line"><i style="width:${((run.index + 1) / run.items.length) * 100}%"></i></div>`}
  <div class="q-card">
    ${ch ? `<div class="q-chapter">${ch.icon} ${esc(c.pick(ch.title))}</div>` : ''}
    ${media(c, q)}
    <div class="q-text-row"><p class="q-text">${esc(c.pick(q.q))}</p><button class="icon-btn speak" data-speak="q" aria-label="${esc(t('listen'))}">${speakerIcon}</button></div>
    ${optionsHtml(c, q, sel, { reveal: revealed, locked: revealed })}
    ${!isExam && q.format === 'mcq' && q.multi && !revealed ? `<button class="btn btn-primary" data-act="confirm" ${sel?.length ? '' : 'disabled'}>${esc(t('confirm'))}</button>` : ''}
    ${revealed ? `<div class="feedback ${isCorrect(q, sel) ? 'ok' : 'ko'}"><b>${isCorrect(q, sel) ? '✅ ' + esc(t('correctAns')) : '❌ ' + esc(t('wrongAns'))}</b>${explanationHtml(c, q)}</div>` : ''}
    ${!isExam ? `<button class="btn btn-ghost small hint-btn" data-act="hint">💡 ${esc(t('hint'))}</button>` : ''}
  </div>
  <div class="run-foot">
    <button class="btn btn-ghost" data-act="prev" ${run.index === 0 ? 'disabled' : ''}>← ${esc(t('prev'))}</button>
    ${isExam ? `<button class="btn btn-ghost ${run.flags.has(run.index) ? 'on' : ''}" data-act="flag">🚩 ${esc(t('flag'))}</button>` : ''}
    ${run.index < run.items.length - 1
      ? `<button class="btn btn-secondary" data-act="next">${esc(t('next'))} →</button>`
      : `<button class="btn btn-primary" data-act="finish">${esc(isExam ? t('submitExam') : t('confirm'))}</button>`}
  </div>
  ${isExam ? `<div class="exam-submit"><button class="btn btn-primary" data-act="finish">${esc(t('submitExam'))}</button></div>` : ''}
  <dialog id="hint-dlg" class="dlg"></dialog>`;

  bindSpeak(el, () => {
    const opts = q.format === 'mcq' ? (c.pick(q.options) || []).map((o, i) => `${String.fromCharCode(65 + i)}. ${o}`).join('. ') : '';
    return `${c.pick(q.q)} ${opts}`;
  }, contentLang(c, q));
}

function contentLang(c, q) {
  return q.q?.[c.lang] ? c.lang : (q.q?.en ? 'en' : c.cfg.defaultLang);
}

function select(c, el, v, draw) {
  const q = run.items[run.index];
  const isExam = run.mode === 'exam';
  if (!isExam && run.revealed[run.index]) return;
  if (q.format === 'mcq' && q.multi) {
    const cur = new Set(run.answers[run.index] || []);
    cur.has(v) ? cur.delete(v) : cur.add(v);
    run.answers[run.index] = [...cur].sort();
    if (!run.answers[run.index].length) delete run.answers[run.index];
    draw();
    return;
  }
  run.answers[run.index] = [v];
  if (!isExam) reveal(c);
  draw();
  if (isExam && q.format === 'tf' && run.index < run.items.length - 1) setTimeout(() => { move(1); draw(); }, 220);
}

function reveal(c) {
  const q = run.items[run.index];
  run.revealed[run.index] = true;
  const ok = isCorrect(q, run.answers[run.index]);
  store.recordAnswer(q.id, ok);
  try { ok ? sound.playSuccess() : sound.playHorn(0.12); } catch { /* audio unavailable */ }
  void c;
}

function handleClick(c, el, e, draw) {
  const t = c.t;
  const opt = e.target.closest('[data-opt]');
  if (opt && !opt.disabled) { select(c, el, +opt.dataset.opt, draw); return; }
  const go = e.target.closest('[data-goto]');
  if (go) { run.index = +go.dataset.goto; draw(); return; }
  const act = e.target.closest('[data-act]')?.dataset.act;
  if (!act) return;
  if (act === 'next') { move(1); draw(); }
  if (act === 'prev') { move(-1); draw(); }
  if (act === 'flag') { run.flags.has(run.index) ? run.flags.delete(run.index) : run.flags.add(run.index); draw(); }
  if (act === 'confirm') { reveal(c); draw(); }
  if (act === 'quit') { if (Object.keys(run.answers).length === 0 || confirm(t('quitConfirm'))) c.go('/quiz'); }
  if (act === 'finish') {
    if (run.mode === 'exam') {
      if (Object.keys(run.answers).length < run.items.length && !confirm(t('submitConfirm'))) return;
      finish(c, el);
    } else finish(c, el);
  }
  if (act === 'hint') {
    const q = run.items[run.index];
    const dlg = el.querySelector('#hint-dlg');
    const ch = c.course.chapters.find(x => x.id === q.chapterId);
    const s = q.sign && ROAD_SIGNS.find(x => x.id === q.sign);
    dlg.innerHTML = `<div class="dlg-body">
      ${s ? `<div class="hint-sign">${renderSign(s.spec, { country: c.country })}<div><b>${esc(signName(s, c.lang))}</b><p>${esc(signDesc(s, c.lang))}</p></div></div>` : ''}
      ${ch ? `<h3>${ch.icon} ${esc(c.pick(ch.title))}</h3><div class="prose">${md(c.pick(ch.lessons[0].b)).slice(0, 2400)}</div><a class="btn btn-secondary" href="#/course/${ch.id}">📖 ${esc(t('course'))}</a>` : ''}
      <button class="btn btn-ghost" data-close>✕</button></div>`;
    dlg.querySelector('[data-close]').onclick = () => dlg.close();
    dlg.showModal();
  }
}

function finish(c, el) {
  const t = c.t;
  run.finished = true;
  const isExam = run.mode === 'exam';
  const ev = evaluate(c, run);
  if (isExam) ev.res.forEach(r => store.recordAnswer(r.q.id, r.ok));
  else run.items.forEach((q, i) => { if (run.answers[i] && !run.revealed[i]) store.recordAnswer(q.id, isCorrect(q, run.answers[i])); });
  const entry = {
    date: new Date().toISOString(), mode: run.mode, title: run.title, total: run.items.length, errors: ev.errors,
    errorPoints: ev.errorPoints, passed: isExam ? ev.passed : null, duration: Math.round((Date.now() - run.started) / 1000),
    items: ev.res.map(r => ({ id: r.q.id, sel: r.sel, ok: r.ok }))
  };
  store.addHistory(entry);
  trackAdAction();
  if (isExam && ev.passed) { try { sound.playSuccess(); } catch { /* no audio */ } import('canvas-confetti').then(m => m.default({ particleCount: 140, spread: 75, origin: { y: 0.7 } })).catch(() => {}); }
  const correct = run.items.length - ev.errors;
  el.innerHTML = `
  <div class="result card ${isExam ? (ev.passed ? 'pass' : 'fail') : ''}">
    ${isExam ? `<div class="verdict">${ev.passed ? '🎉 ' + esc(t('passed')) : '😕 ' + esc(t('failed'))}</div>` : ''}
    <div class="result-num"><b>${correct}</b>/${run.items.length} <small>${esc(t('correctCount'))}</small></div>
    ${isExam ? (ev.maxPoints != null
      ? `<p>${ev.errorPoints} ${esc(t('errorPoints'))} · ${esc(t('maxAllowed'))} ${ev.maxPoints}</p>`
      : `<p>${ev.errors} ${esc(t('errors'))} · ${esc(t('maxAllowed'))} ${ev.maxErrors}</p>`) : ''}
    ${ev.reduced && isExam ? `<p class="warn small">${esc(t('reducedExam'))}</p>` : ''}
    <p class="muted">${esc(t('time'))}: ${fmtTime(entry.duration)}</p>
    <div class="result-actions">
      <a class="btn btn-primary" href="#/history/0">🗂️ ${esc(t('reviewSheet'))}</a>
      <a class="btn btn-secondary" href="#/quiz/run/${run.mode}${run.arg ? '/' + run.arg : ''}" data-reload>🔄 ${esc(isExam ? t('newExam') : t('retry'))}</a>
      ${ev.errors ? `<a class="btn btn-ghost" href="#/quiz/run/errors">🔁 ${esc(t('reviewErrors'))}</a>` : ''}
    </div>
  </div>
  ${ev.res.filter(r => !r.ok).map(r => reviewItem(c, r.q, r.sel, false)).join('')}`;
  el.querySelectorAll('[data-reload]').forEach(a => a.addEventListener('click', ev2 => { ev2.preventDefault(); c.go(a.getAttribute('href').slice(1)); }));
}

function reviewItem(c, q, sel, ok) {
  const t = c.t;
  return `<div class="review ${ok ? 'ok' : 'ko'}">
    ${media(c, q)}
    <p class="q-text">${ok ? '✅' : '❌'} ${esc(c.pick(q.q))}</p>
    ${optionsHtml(c, q, sel, { reveal: true, locked: true })}
    ${!sel?.length ? `<p class="muted small">${esc(t('noAnswer'))}</p>` : ''}
    <div class="feedback">${explanationHtml(c, q)}</div>
  </div>`;
}

// ---------- history ----------

export function historyView(c) {
  const t = c.t;
  const h = c.p.history;
  const html = `
  <a class="back" href="#/quiz">← ${esc(t('quiz'))}</a>
  <h1 class="page-title">🗂️ ${esc(t('history'))}</h1>
  ${h.length ? `<div class="history">${h.map((e, i) => `<a class="hist ${e.passed === true ? 'pass' : e.passed === false ? 'fail' : ''}" href="#/history/${i}">
    <span><b>${esc(e.title)}</b><small>${fmtDate(e.date, c.lang)} · ${fmtTime(e.duration || 0)}</small></span>
    <span class="hist-score">${e.total - e.errors}/${e.total}${e.passed != null ? `<small>${esc(e.passed ? t('passed') : t('failed'))}</small>` : ''}</span></a>`).join('')}</div>`
    : `<div class="empty card"><p>${esc(t('noHistory'))}</p><a class="btn btn-primary" href="#/quiz/run/exam">${esc(t('examSim'))}</a></div>`}`;
  return { html };
}

export function historyDetailView(c, idx) {
  const t = c.t;
  const e = c.p.history[+idx];
  if (!e) return historyView(c);
  const html = `
  <a class="back" href="#/history">← ${esc(t('history'))}</a>
  <h1 class="page-title">${esc(e.title)}</h1>
  <p class="muted">${fmtDate(e.date, c.lang)} · ${e.total - e.errors}/${e.total} ${esc(t('correctCount'))}${e.passed != null ? ' · ' + esc(e.passed ? t('passed') : t('failed')) : ''}</p>
  ${e.items.map(it => { const q = questionById(c.country, it.id); return q ? reviewItem(c, q, it.sel, it.ok) : ''; }).join('')}`;
  return { html, wide: true };
}

function examLimitView(c) {
  const t = c.t;
  const html = `<a class="back" href="#/quiz">← ${esc(t('quiz'))}</a>
  <div class="card empty">
    <p>🏁 <b>${esc(t('examLimitReached'))}</b></p>
    ${ads.adsReady ? `<button class="btn btn-secondary" id="reward">🎬 ${esc(t('watchVideo'))}</button>` : ''}
    <a class="btn btn-primary" href="#/pro">⭐ ${esc(t('unlimitedExams'))} — ${esc(t('buyPro'))}</a>
    <p class="muted small" id="rw-msg"></p>
  </div>`;
  const mount = root => {
    root.querySelector('#reward')?.addEventListener('click', async () => {
      if (await watchRewardedVideo()) { store.grantExtraExam(); c.go('/quiz/run/exam'); }
      else root.querySelector('#rw-msg').textContent = '—';
    });
  };
  return { html, mount };
}
