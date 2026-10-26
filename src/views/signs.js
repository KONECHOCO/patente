import { esc, bindSpeak, speakerIcon, bar, shuffle } from './util.js';
import { SIGN_CATEGORIES, ROAD_SIGNS, signName, signDesc, catName, catDesc } from '../signs/catalog.js';
import { renderSign } from '../signs/draw.js';
import { store } from '../core/store.js';

const visible = c => ROAD_SIGNS.filter(s => (!s.only || s.only.includes(c.country)) && !(s.not || []).includes(c.country));

export function signsView(c) {
  const t = c.t;
  const all = visible(c);
  const seen = Object.keys(c.p.signs).length;
  const html = `
  <h1 class="page-title">🪧 ${esc(t('signs'))}</h1>
  <div class="card signs-summary"><div><b>${seen}/${all.length}</b> <small>${esc(t('studied'))}</small>${bar((seen / all.length) * 100)}</div>
    <a class="btn btn-primary" href="#/quiz/run/signs">🎯 ${esc(t('signsQuiz'))}</a></div>
  <input class="search" id="sign-search" type="search" placeholder="${esc(t('searchSigns'))}">
  <div id="search-results" class="sign-grid" hidden></div>
  <div class="cat-grid" id="cat-grid">
    ${SIGN_CATEGORIES.map(cat => {
      const list = all.filter(s => s.cat === cat.id);
      if (!list.length) return '';
      const sample = list[0];
      const done = list.filter(s => c.p.signs[s.id]).length;
      return `<a class="cat-card" href="#/signs/${cat.id}">
        <span class="cat-sign">${renderSign(sample.spec, { country: c.country })}</span>
        <span class="cat-body"><b>${esc(catName(cat, c.lang))}</b><small>${esc(catDesc(cat, c.lang))}</small><small class="muted">${done}/${list.length}</small></span></a>`;
    }).join('')}
  </div>`;
  const mount = root => {
    const input = root.querySelector('#sign-search');
    const res = root.querySelector('#search-results');
    const grid = root.querySelector('#cat-grid');
    input.addEventListener('input', () => {
      const q = input.value.trim().toLowerCase();
      if (!q) { res.hidden = true; grid.hidden = false; return; }
      const hits = all.filter(s => s.n.some(n => n.toLowerCase().includes(q)) || Object.values(s.codes || {}).some(code => String(code).toLowerCase().includes(q)));
      res.innerHTML = hits.map(s => signCard(c, s)).join('') || `<p class="muted">—</p>`;
      res.hidden = false; grid.hidden = true;
    });
  };
  return { html, mount };
}

function signCard(c, s) {
  const code = s.codes?.[c.country];
  return `<a class="sign-card ${c.p.signs[s.id] ? 'seen' : ''}" href="#/sign/${s.id}">${renderSign(s.spec, { country: c.country })}<b>${esc(signName(s, c.lang))}</b>${code && code !== '—' ? `<small>${esc(code)}</small>` : ''}</a>`;
}

export function signCategoryView(c, catId) {
  const t = c.t;
  const cat = SIGN_CATEGORIES.find(x => x.id === catId);
  if (!cat) return signsView(c);
  const list = visible(c).filter(s => s.cat === catId);
  const html = `
  <a class="back" href="#/signs">← ${esc(t('signs'))}</a>
  <h1 class="page-title">${cat.icon} ${esc(catName(cat, c.lang))}</h1>
  <p class="muted">${esc(catDesc(cat, c.lang))}</p>
  <div class="sign-grid">${list.map(s => signCard(c, s)).join('')}</div>`;
  return { html };
}

const LAW = { IT: 'CdS art. 39–43', FR: 'Code de la route', ES: 'RGC', DE: 'StVO', UK: 'TSRGD', CI: 'Code de la route' };

export function signDetailView(c, id) {
  const t = c.t;
  const list = visible(c);
  const i = list.findIndex(s => s.id === id);
  const s = list[i];
  if (!s) return signsView(c);
  store.markSign(s.id);
  const cat = SIGN_CATEGORIES.find(x => x.id === s.cat);
  const prev = list[i - 1], next = list[i + 1];
  const tip = s.tip ? (s.tip[c.lang] || s.tip.en) : '';
  const code = s.codes?.[c.country];
  const others = shuffle(list.filter(o => o.id !== s.id && o.cat === s.cat)).slice(0, 1)[0] || shuffle(list.filter(o => o.id !== s.id))[0];
  const statements = shuffle([
    { text: signName(s, c.lang), ok: true },
    { text: signName(others, c.lang), ok: false }
  ]);
  const html = `
  <a class="back" href="#/signs/${s.cat}">← ${esc(catName(cat, c.lang))}</a>
  <article class="sign-detail">
    <div class="sign-big">${renderSign(s.spec, { country: c.country })}</div>
    <h1>${esc(signName(s, c.lang))}</h1>
    <div class="chips">
      <span class="chip">${cat.icon} ${esc(catName(cat, c.lang))}</span>
      ${code && code !== '—' ? `<span class="chip">${esc(t('officialCode'))}: ${esc(code)}</span>` : `<span class="chip">${esc(LAW[c.country])}</span>`}
    </div>
    <section class="card">
      <div class="sec-head"><h2>${esc(t('meaning'))}</h2><button class="icon-btn speak" data-speak="d">${speakerIcon}</button></div>
      <p>${esc(signDesc(s, c.lang))}</p>
    </section>
    ${tip ? `<section class="card tip"><h2>⚠️ ${esc(t('examTip'))}</h2><p>${esc(tip)}</p></section>` : ''}
    <section class="card">
      <h2>🎯 ${esc(t('testSign'))}</h2>
      <div class="mini-quiz">${statements.map((st, k) => `
        <div class="mq" data-k="${k}"><p>${esc(t('meaning'))}: <b>${esc(st.text)}</b></p>
          <div class="tf"><button class="btn tf-btn" data-v="1">${esc(t('true'))}</button><button class="btn tf-btn" data-v="0">${esc(t('false'))}</button></div></div>`).join('')}</div>
    </section>
    <div class="pager">
      ${prev ? `<a href="#/sign/${prev.id}">← ${esc(signName(prev, c.lang))}</a>` : '<span></span>'}
      ${next ? `<a href="#/sign/${next.id}">${esc(signName(next, c.lang))} →</a>` : '<span></span>'}
    </div>
  </article>`;
  const mount = root => {
    bindSpeak(root, () => `${signName(s, c.lang)}. ${signDesc(s, c.lang)}. ${tip}`, c.lang);
    root.querySelectorAll('.mq').forEach(el => {
      const st = statements[+el.dataset.k];
      el.querySelectorAll('.tf-btn').forEach(b => b.addEventListener('click', () => {
        const ok = (b.dataset.v === '1') === st.ok;
        el.querySelectorAll('.tf-btn').forEach(x => { x.disabled = true; if ((x.dataset.v === '1') === st.ok) x.classList.add('is-correct'); });
        if (!ok) b.classList.add('is-wrong');
      }));
    });
  };
  return { html, mount };
}
