import { esc, shuffle } from './util.js';
import { scenarioList, renderJunction, renderJunctionAnimated, explain, statements, orderText } from '../incroci/engine.js';
import { store } from '../core/store.js';
import { sound } from '../simulator/audio.js';

let list = null;
const scenarios = () => (list = list || scenarioList());

export function junctionsView(c) {
  const t = c.t;
  if (c.cfg.drive !== 'right') {
    return { html: `<a class="back" href="#/quiz">← ${esc(t('quiz'))}</a><div class="card"><p>${esc(t('junctionsNA'))}</p><a class="btn btn-primary" href="#/quiz/run/chapter/uk-5">${esc(t('startQuiz'))}</a></div>` };
  }
  const done = c.p.junc || {};
  const solved = Object.values(done).filter(Boolean).length;
  const html = `
  <a class="back" href="#/quiz">← ${esc(t('quiz'))}</a>
  <h1 class="page-title">✖️ ${esc(t('junctions'))}</h1>
  <p class="muted">${esc(t('junctionsSub'))} · <b>${solved}/${scenarios().length}</b></p>
  <div class="junc-grid">${scenarios().map(s => `<a class="junc-thumb ${done[s.index] ? 'ok' : done[s.index] === false ? 'ko' : ''}" href="#/junctions/${s.index}">${renderJunction(s, { showPaths: false })}<span>${s.index}</span></a>`).join('')}</div>`;
  return { html };
}

export function junctionView(c, idx) {
  const t = c.t;
  const all = scenarios();
  const scn = all[+idx - 1];
  if (!scn) return junctionsView(c);
  const html = `
  <a class="back" href="#/junctions">← ${esc(t('junctions'))}</a>
  <h1 class="page-title">${esc(t('scenario'))} ${scn.index}</h1>
  <div class="seg" id="seg"><button class="on" data-mode="order">${esc(t('orderMode'))}</button><button data-mode="tf">${esc(t('statementsMode'))}</button></div>
  <div class="junc-stage" id="stage">${renderJunction(scn)}</div>
  <div id="panel"></div>
  <div class="pager">
    ${+idx > 1 ? `<a href="#/junctions/${+idx - 1}">← ${+idx - 1}</a>` : '<span></span>'}
    ${+idx < all.length ? `<a href="#/junctions/${+idx + 1}">${+idx + 1} →</a>` : '<span></span>'}
  </div>`;

  const mount = root => {
    const stage = root.querySelector('#stage');
    const panel = root.querySelector('#panel');
    let mode = 'order';
    let picked = []; // array of groups
    let group = [];
    let joinNext = false;

    const solutionHtml = ok => `
      <div class="feedback ${ok === true ? 'ok' : ok === false ? 'ko' : ''}">
        ${ok === true ? `<b>✅ ${esc(t('correctAns'))}</b>` : ok === false ? `<b>❌ ${esc(t('wrongAns'))}</b>` : ''}
        <p><b>${esc(t('solution'))}:</b> ${esc(orderText(scn.solution, c.lang))}</p>
        <ul>${explain(scn, c.lang).slice(0, -1).map(l => `<li>${esc(l)}</li>`).join('')}</ul>
      </div>`;

    const showAnimation = () => { stage.innerHTML = renderJunctionAnimated(scn); };

    const drawOrder = () => {
      stage.innerHTML = renderJunction(scn, { highlight: group });
      const chosen = picked.map(g => g.join('+')).join(' → ');
      panel.innerHTML = `
        <p class="muted small">${esc(t('junctionTap'))}</p>
        <div class="order-line">${chosen || '…'}${group.length ? ` → <b>${group.join('+')}</b>` : ''}</div>
        <div class="row-btns">
          <button class="btn btn-ghost ${joinNext ? 'on' : ''}" data-a="together" ${group.length < 1 ? 'disabled' : ''}>+ ${esc(t('together'))}</button>
          <button class="btn btn-ghost" data-a="reset">${esc(t('reset'))}</button>
          <button class="btn btn-primary" data-a="check">${esc(t('check'))}</button>
          <button class="btn btn-secondary" data-a="solution">${esc(t('solution'))}</button>
        </div>`;
      stage.querySelectorAll('.veh').forEach(g => g.addEventListener('click', () => {
        const id = g.dataset.id;
        if (picked.flat().includes(id) || group.includes(id)) return;
        if (joinNext && group.length) { group.push(id); joinNext = false; drawOrder(); return; }
        if (group.length) picked.push(group);
        group = [id];
        drawOrder();
      }));
    };

    const drawTF = () => {
      stage.innerHTML = renderJunction(scn);
      const sts = statements(scn, c.lang, Math.random);
      panel.innerHTML = `<div class="tf-list">${sts.map((s, i) => `<div class="mq" data-i="${i}"><p>${esc(s.text)}</p><div class="tf"><button class="btn tf-btn" data-v="1">${esc(t('true'))}</button><button class="btn tf-btn" data-v="0">${esc(t('false'))}</button></div></div>`).join('')}</div>
        <button class="btn btn-secondary" data-a="solution">${esc(t('solution'))}</button>`;
      let right = 0, answered = 0;
      panel.querySelectorAll('.mq').forEach(el => {
        const st = sts[+el.dataset.i];
        el.querySelectorAll('.tf-btn').forEach(b => b.addEventListener('click', () => {
          const ok = (b.dataset.v === '1') === st.answer;
          answered++; if (ok) right++;
          el.querySelectorAll('.tf-btn').forEach(x => { x.disabled = true; if ((x.dataset.v === '1') === st.answer) x.classList.add('is-correct'); });
          if (!ok) b.classList.add('is-wrong');
          if (answered === sts.length) store.markJunction(scn.index, right === sts.length);
        }));
      });
    };

    panel.addEventListener('click', e => {
      const a = e.target.closest('[data-a]')?.dataset.a;
      if (!a) return;
      if (a === 'together') { joinNext = !joinNext; drawOrder(); }
      if (a === 'reset') { picked = []; group = []; joinNext = false; drawOrder(); }
      if (a === 'check') {
        const answer = [...picked, ...(group.length ? [group] : [])].map(g => [...g].sort());
        const ok = JSON.stringify(answer) === JSON.stringify(scn.solution.steps.map(s => [...s].sort()));
        store.markJunction(scn.index, ok);
        try { ok ? sound.playSuccess() : sound.playHorn(0.15); } catch { /* audio unavailable */ }
        panel.insertAdjacentHTML('beforeend', solutionHtml(ok));
        showAnimation();
      }
      if (a === 'solution') { panel.insertAdjacentHTML('beforeend', solutionHtml(null)); showAnimation(); }
    });

    root.querySelector('#seg').addEventListener('click', e => {
      const b = e.target.closest('button');
      if (!b) return;
      root.querySelectorAll('#seg button').forEach(x => x.classList.toggle('on', x === b));
      mode = b.dataset.mode;
      picked = []; group = [];
      mode === 'order' ? drawOrder() : drawTF();
    });
    drawOrder();
    void shuffle;
  };
  return { html, mount };
}
