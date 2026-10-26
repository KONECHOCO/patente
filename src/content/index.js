// Loads each country's course and normalises it into one shape:
// chapter = { id, n, icon, title{lang}, lessons[{h{lang}, b{lang}}], questions[], signCat?, incroci? }
// question = { id, chapterId, format: 'tf' | 'mcq', q{lang}, options{lang:[]}, correct[], answer?, e{lang}, sign?, points? }

import it1 from './it/part1.js';
import it2 from './it/part2.js';
import it3 from './it/part3.js';
import itExtra from './it/extra.js';
import fr from './fr.js';
import es from './es.js';
import de from './de.js';
import uk from './uk.js';
import ci from './ci.js';
import { COUNTRIES } from '../data/countries.js';
import { ROAD_SIGNS, LANG_INDEX } from '../signs/catalog.js';
import { scenarioList, statements, orderText } from '../incroci/engine.js';

const RAW = { IT: [...it1, ...it2, ...it3].map(ch => ({ ...ch, q: [...ch.q, ...(itExtra[ch.id] || [])] })), FR: fr, ES: es, DE: de, UK: uk, CI: ci };

const zip = (langs, arr) => Object.fromEntries(langs.map((l, i) => [l, arr[i]]).filter(([, v]) => v != null));

function normaliseChapter(raw, country) {
  const langs = COUNTRIES[country].contentLangs;
  const L = langs.length;
  const isTF = COUNTRIES[country].exam.B.format === 'tf';
  const chapter = {
    id: raw.id, n: raw.n, icon: raw.icon, signCat: raw.signCat, incroci: !!raw.incroci,
    title: zip(langs, raw.t),
    lessons: raw.lessons.map(l => ({ h: zip(langs, l.h), b: zip(langs, l.b) })),
    questions: []
  };
  chapter.questions = raw.q.map((row, i) => {
    const id = `${raw.id}-${i + 1}`;
    if (isTF) {
      const q = zip(langs, row.slice(0, L));
      const answer = row[L];
      const e = zip(langs, row.slice(L + 1, 2 * L + 1));
      const sign = row[2 * L + 1] || null;
      return { id, chapterId: raw.id, format: 'tf', q, answer, correct: [answer ? 0 : 1], e, sign };
    }
    const q = zip(langs, row.slice(0, L));
    const options = zip(langs, row.slice(L, 2 * L));
    const correct = row[2 * L];
    const e = zip(langs, row.slice(2 * L + 1, 3 * L + 1));
    const sign = row[3 * L + 1] || null;
    const points = row[3 * L + 2] || null;
    return { id, chapterId: raw.id, format: 'mcq', multi: COUNTRIES[country].exam.B.format === 'mcq-multi' || correct.length > 1, q, options, correct, e, sign, points };
  });
  return chapter;
}

const cache = {};
export function getCourse(country) {
  if (!cache[country]) {
    const chapters = RAW[country].map(c => normaliseChapter(c, country));
    cache[country] = { chapters, generated: buildGenerated(country, chapters) };
  }
  return cache[country];
}

// ---------- Generated questions: road signs and junctions ----------

function seeded(seed) {
  let s = seed;
  return () => { s = (s * 1664525 + 1013904223) % 4294967296; return s / 4294967296; };
}
const ALL_LANGS = ['it', 'fr', 'en', 'es', 'de'];

const SIGN_Q = {
  it: { tf: n => `Il segnale raffigurato indica: ${n.toLowerCase()}.`, mcq: 'Che cosa indica questo segnale?' },
  fr: { tf: n => `Ce panneau signifie : ${n.toLowerCase()}.`, mcq: 'Que signifie ce panneau ?' },
  en: { tf: n => `The sign shown means: ${n.toLowerCase()}.`, mcq: 'What does this sign mean?' },
  es: { tf: n => `La señal representada indica: ${n.toLowerCase()}.`, mcq: '¿Qué indica esta señal?' },
  de: { tf: n => `Das abgebildete Zeichen bedeutet: ${n}.`, mcq: 'Was bedeutet dieses Zeichen?' }
};
const JUNC_Q = {
  it: 'In quale ordine passano i veicoli?', fr: 'Dans quel ordre passent les véhicules ?', en: 'In which order do the vehicles go?', es: '¿En qué orden pasan los vehículos?', de: 'In welcher Reihenfolge fahren die Fahrzeuge?'
};

function signsFor(country) {
  return ROAD_SIGNS.filter(s => (!s.only || s.only.includes(country)) && !(s.not || []).includes(country));
}

function buildGenerated(country, chapters) {
  const cfg = COUNTRIES[country];
  const isTF = cfg.exam.B.format === 'tf';
  const rnd = seeded(country.charCodeAt(0) * 31 + country.charCodeAt(1));
  const signs = signsFor(country);
  const out = [];
  const chapterForCat = cat => (chapters.find(c => c.signCat === cat) || chapters.find(c => c.signCat) || chapters[0]).id;
  const nameIn = (s, lang) => s.n[LANG_INDEX[lang]];
  const descIn = s => Object.fromEntries(ALL_LANGS.map(l => [l, s.d[LANG_INDEX[l]]]));

  signs.forEach(s => {
    const sameCat = signs.filter(o => o.cat === s.cat && o.id !== s.id);
    const others = (sameCat.length >= 3 ? sameCat : signs.filter(o => o.id !== s.id)).slice().sort(() => rnd() - 0.5);
    if (isTF) {
      const wrong = others[0];
      out.push({ id: `sg-${s.id}-t`, chapterId: chapterForCat(s.cat), format: 'tf', generated: 'sign', sign: s.id, answer: true, correct: [0],
        q: Object.fromEntries(ALL_LANGS.map(l => [l, SIGN_Q[l].tf(nameIn(s, l))])), e: descIn(s) });
      out.push({ id: `sg-${s.id}-f`, chapterId: chapterForCat(s.cat), format: 'tf', generated: 'sign', sign: s.id, answer: false, correct: [1],
        q: Object.fromEntries(ALL_LANGS.map(l => [l, SIGN_Q[l].tf(nameIn(wrong, l))])), e: descIn(s) });
    } else {
      const opts = [s, ...others.slice(0, 2)].sort(() => rnd() - 0.5);
      out.push({ id: `sg-${s.id}`, chapterId: chapterForCat(s.cat), format: 'mcq', multi: false, generated: 'sign', sign: s.id,
        q: Object.fromEntries(ALL_LANGS.map(l => [l, SIGN_Q[l].mcq])),
        options: Object.fromEntries(ALL_LANGS.map(l => [l, opts.map(o => nameIn(o, l))])),
        correct: [opts.indexOf(s)], e: descIn(s), points: 3 });
    }
  });

  if (cfg.drive === 'right') {
    const incChapter = (chapters.find(c => c.incroci) || chapters[0]).id;
    scenarioList().slice(0, 40).forEach(scn => {
      if (isTF) {
        statements(scn, 'it', seeded(scn.seed)).slice(0, 2).forEach((st, k) => {
          const texts = Object.fromEntries(ALL_LANGS.map(l => [l, statements(scn, l, seeded(scn.seed))[k].text]));
          out.push({ id: `inc-${scn.index}-${k}`, chapterId: incChapter, format: 'tf', generated: 'junction', scenario: scn.index, answer: st.answer, correct: [st.answer ? 0 : 1], q: texts, e: null });
        });
      } else {
        const right = scn.solution.steps;
        const ids = scn.vehicles.map(v => v.id);
        if (ids.length < 2) return;
        const perms = [];
        const flat = right.flat();
        perms.push(right);
        const rev = [...flat].reverse().map(x => [x]);
        perms.push(rev);
        const rot = [...flat.slice(1), flat[0]].map(x => [x]);
        perms.push(rot);
        const uniq = [];
        perms.forEach(p => { const k = JSON.stringify(p); if (!uniq.some(u => JSON.stringify(u) === k)) uniq.push(p); });
        if (uniq.length < 2) return;
        const opts = uniq.slice(0, 3).sort(() => rnd() - 0.5);
        out.push({ id: `inc-${scn.index}`, chapterId: incChapter, format: 'mcq', multi: false, generated: 'junction', scenario: scn.index,
          q: { ...JUNC_Q },
          options: Object.fromEntries(ALL_LANGS.map(l => [l, opts.map(o => orderText({ steps: o }, l))])),
          correct: [opts.findIndex(o => JSON.stringify(o) === JSON.stringify(right))], e: null, points: 4 });
      }
    });
  }
  return out;
}

export function allQuestions(country) {
  const c = getCourse(country);
  return [...c.chapters.flatMap(ch => ch.questions), ...c.generated];
}

export function questionById(country, id) {
  return allQuestions(country).find(q => q.id === id);
}

// Picks text in the requested language, falling back to English, then the country language.
export function pick(obj, lang, country) {
  if (!obj) return '';
  if (typeof obj === 'string') return obj;
  return obj[lang] ?? obj.en ?? obj[COUNTRIES[country]?.defaultLang] ?? Object.values(obj)[0] ?? '';
}
export function hasLang(obj, lang) { return !!obj && typeof obj === 'object' && obj[lang] != null; }
