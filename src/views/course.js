import { esc, md, bar, chapterStats, bindSpeak, speakerIcon } from './util.js';
import { ROAD_SIGNS, signName } from '../signs/catalog.js';
import { renderSign } from '../signs/draw.js';
import { hasLang } from '../content/index.js';
import { store } from '../core/store.js';
import { speakText, stopSpeaking } from '../simulator/audio.js';
import { plain } from './util.js';

const HERO = {
  'it-14': '/images/intersection_priority.jpg', 'it-15': '/images/highway_overtaking.jpg', 'it-16': '/images/parking_maneuver.jpg', 'it-17': '/images/highway_overtaking.jpg', 'it-18': '/images/cockpit_view.jpg', 'it-25': '/images/cockpit_view.jpg',
  'fr-L': '/images/intersection_priority.jpg', 'fr-R': '/images/highway_overtaking.jpg', 'fr-P': '/images/parking_maneuver.jpg', 'fr-M': '/images/cockpit_view.jpg',
  'es-1': '/images/intersection_priority.jpg', 'es-3': '/images/highway_overtaking.jpg', 'es-4': '/images/parking_maneuver.jpg',
  'de-2': '/images/intersection_priority.jpg', 'de-3': '/images/highway_overtaking.jpg',
  'uk-4': '/images/highway_overtaking.jpg', 'uk-5': '/images/intersection_priority.jpg',
  'ci-2': '/images/intersection_priority.jpg', 'ci-3': '/images/highway_overtaking.jpg'
};

export function courseView(c) {
  const t = c.t;
  const translated = c.cfg.contentLangs.includes(c.lang);
  const html = `
  <h1 class="page-title">📖 ${esc(t('course'))}</h1>
  <p class="muted">${esc(t('contentLangNote'))}${c.cfg.contentLangs.map(l => l.toUpperCase()).join(', ')}</p>
  ${translated ? '' : `<p class="warn">🌐 ${esc(t('fallbackNote'))}</p>`}
  <div class="chapter-list">
    ${c.course.chapters.map(ch => {
      const st = chapterStats(c, ch);
      return `<a class="chapter ${c.p.read[ch.id] ? 'read' : ''}" href="#/course/${ch.id}">
        <span class="ch-num">${esc(ch.n)}</span>
        <span class="ch-body"><b>${ch.icon} ${esc(c.pick(ch.title))}</b><small>${ch.lessons.length} ${esc(t('lessons'))} · ${st.total} ${esc(t('questionsN'))} · ${st.pct}%</small>${bar(st.pct)}</span>
        ${c.p.read[ch.id] ? '<span class="ch-check">✓</span>' : ''}
      </a>`;
    }).join('')}
  </div>`;
  return { html };
}

export function chapterView(c, id) {
  const t = c.t;
  const chs = c.course.chapters;
  const idx = chs.findIndex(ch => ch.id === id);
  const ch = chs[idx];
  if (!ch) return courseView(c);
  const prev = chs[idx - 1], next = chs[idx + 1];
  const signs = ch.signCat ? ROAD_SIGNS.filter(s => s.cat === ch.signCat && (!s.only || s.only.includes(c.country))) : [];
  const qSigns = [...new Set(ch.questions.map(q => q.sign).filter(Boolean))].map(sid => ROAD_SIGNS.find(s => s.id === sid)).filter(Boolean);
  const shown = signs.length ? signs : qSigns;
  const st = chapterStats(c, ch);
  const hero = HERO[ch.id];
  const missingLang = !hasLang(ch.lessons[0]?.b, c.lang);

  const html = `
  <a class="back" href="#/course">← ${esc(t('course'))}</a>
  <article class="lesson">
    ${hero ? `<div class="lesson-hero" style="background-image:url('${hero}')"><span>${esc(t('chapter'))} ${esc(ch.n)}</span></div>` : `<div class="lesson-badge">${ch.icon} ${esc(t('chapter'))} ${esc(ch.n)}</div>`}
    <h1>${esc(c.pick(ch.title))}</h1>
    ${missingLang ? `<p class="warn">🌐 ${esc(t('fallbackNote'))}</p>` : ''}
    <div class="lesson-meta">${bar(st.pct)}<small>${st.done}/${st.total} ${esc(t('correctCount'))}</small></div>
    <button class="btn btn-secondary audio-all" id="audio-all">🎧 ${esc(t('audioChapter'))}${store.pro ? '' : ' · 🔒 Pro'}</button>
    ${ch.lessons.map((l, i) => `
      <section class="lesson-sec">
        <div class="sec-head"><h2>${esc(c.pick(l.h))}</h2><button class="icon-btn speak" data-speak="${i}" aria-label="${esc(t('listen'))}">${speakerIcon}</button></div>
        <div class="prose">${md(c.pick(l.b))}</div>
      </section>`).join('')}
    ${ch.incroci && c.cfg.drive === 'right' ? `<a class="btn btn-secondary" href="#/junctions">✖️ ${esc(t('junctions'))} — ${esc(t('junctionsSub'))}</a>` : ''}
    ${shown.length ? `<section class="lesson-sec"><h2>${esc(t('relatedSigns'))}</h2><div class="sign-strip">${shown.map(s => `<a class="sign-chip" href="#/sign/${s.id}">${renderSign(s.spec, { country: c.country })}<span>${esc(signName(s, c.lang))}</span></a>`).join('')}</div></section>` : ''}
    <div class="lesson-actions">
      <a class="btn btn-primary" href="#/quiz/run/chapter/${ch.id}">📝 ${esc(t('startQuiz'))} (${st.total})</a>
      <button class="btn btn-ghost" id="mark-read">${c.p.read[ch.id] ? '✓ ' + esc(t('studied')) : esc(t('markRead'))}</button>
    </div>
    <div class="pager">
      ${prev ? `<a href="#/course/${prev.id}">← ${esc(prev.n)}. ${esc(c.pick(prev.title))}</a>` : '<span></span>'}
      ${next ? `<a href="#/course/${next.id}">${esc(next.n)}. ${esc(c.pick(next.title))} →</a>` : '<span></span>'}
    </div>
  </article>`;

  const mount = root => {
    bindSpeak(root, i => `${c.pick(ch.lessons[i].h)}. ${c.pick(ch.lessons[i].b)}`, missingLang ? 'en' : c.lang);
    let playing = false;
    const audioBtn = root.querySelector('#audio-all');
    audioBtn.addEventListener('click', () => {
      if (!store.pro) { c.go('/pro'); return; }
      if (playing) { playing = false; stopSpeaking(); audioBtn.classList.remove('on'); return; }
      playing = true; audioBtn.classList.add('on');
      const lang = missingLang ? 'en' : c.lang;
      const parts = [c.pick(ch.title), ...ch.lessons.map(l => `${c.pick(l.h)}. ${c.pick(l.b)}`)];
      const next = i => {
        if (!playing || i >= parts.length) { playing = false; audioBtn.classList.remove('on'); return; }
        const sec = root.querySelectorAll('.lesson-sec')[i - 1];
        if (sec) sec.scrollIntoView({ behavior: 'smooth', block: 'start' });
        speakText(plain(parts[i]), lang, store.settings.ttsRate, () => next(i + 1));
      };
      next(0);
    });
    root.querySelector('#mark-read').addEventListener('click', e => {
      const now = !c.p.read[ch.id];
      store.markRead(ch.id, now);
      e.currentTarget.textContent = now ? '✓ ' + t('studied') : t('markRead');
    });
  };
  return { html, mount };
}
