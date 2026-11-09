// Official Italian ministerial question bank (MIT listing "Patente AB"), loaded on demand from
// public/ministeriale/listato.json (built by scripts/build-ministeriale.mjs).
// Statements become regular true/false questions with ids "min-<id>" so progress, errors review,
// smart review and history work the same as for the app's own questions.

let state = null; // { meta, topics, questions, byId }
let loading = null;

export const MIN_PREFIX = 'min-';
export const isMinId = id => typeof id === 'string' && id.startsWith(MIN_PREFIX);
export const minLoaded = () => !!state;

export function loadMinisteriale() {
  if (state) return Promise.resolve(state);
  if (!loading) {
    loading = fetch('/ministeriale/listato.json')
      .then(r => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.json(); })
      .then(raw => {
        const topics = raw.topics;
        const questions = raw.q.map(([id, group, topic, text, ans, fig]) => ({
          id: MIN_PREFIX + id, group, topic, chapterId: `mint-${topic}`, format: 'tf', official: true,
          q: { it: text }, answer: !!ans, correct: [ans ? 0 : 1], e: null,
          fig: fig >= 0 ? `/ministeriale/fig/${raw.figs[fig]}` : null
        }));
        state = { meta: raw.meta, topics, questions, byId: new Map(questions.map(q => [q.id, q])) };
        return state;
      })
      .catch(err => { loading = null; throw err; });
  }
  return loading;
}

export const minState = () => state;
export const minById = id => state?.byId.get(id) || null;
export const minTopic = id => state?.topics.find(t => t.id === +id) || null;

const shuffle = arr => { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

// Exam sheet: 30 statements following the per-topic quota, one statement per question group at most,
// preferring statements never answered (or answered wrong) by the user.
export function minExamSheet(answers = {}) {
  const sheet = [];
  const usedGroups = new Set();
  for (const t of state.topics) {
    const pool = shuffle(state.questions.filter(q => q.topic === t.id));
    const rank = q => { const a = answers[q.id]; return !a ? 0 : a.last === false ? 1 : 2; };
    pool.sort((a, b) => rank(a) - rank(b));
    for (const q of pool) {
      if (sheet.filter(x => x.topic === t.id).length >= t.quota) break;
      if (usedGroups.has(q.group)) continue;
      usedGroups.add(q.group);
      sheet.push(q);
    }
  }
  return sheet;
}

export function minTopicSet(topicId, answers = {}, n = 30) {
  const pool = shuffle(state.questions.filter(q => q.topic === +topicId));
  const rank = q => { const a = answers[q.id]; return !a ? 0 : a.last === false ? 1 : 2; };
  return pool.sort((a, b) => rank(a) - rank(b)).slice(0, n);
}

// Other official statements about the same question (same figure or same group), used as an explanation:
// the listing has no explanations, so the app shows what the ministry itself says is true.
export function minRelated(q, max = 4) {
  if (!state) return [];
  const same = state.questions.filter(x => x.id !== q.id && x.answer && (q.fig ? x.fig === q.fig : x.group === q.group));
  return same.slice(0, max);
}
