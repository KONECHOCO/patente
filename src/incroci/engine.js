// Junction (incroci) engine for right-hand traffic: scenario generator, priority solver,
// SVG renderer and ministerial-style statement generator.
// Arms are indexed counter-clockwise seen from above: 0 = South, 1 = East, 2 = North, 3 = West,
// so the arm on a driver's right is (arm + 1) % 4.

const MOVES = ['R', 'S', 'L']; // right, straight, left
const EXIT_OFFSET = { R: 1, S: 2, L: 3 };

// Conflict tables. ON_RIGHT[a][b]: a's move vs move of the vehicle on a's right.
const ON_RIGHT = { S: { S: 1, R: 1, L: 1 }, R: { S: 0, R: 0, L: 0 }, L: { S: 1, R: 0, L: 1 } };
const OPPOSITE = { S: { S: 0, R: 0, L: 1 }, R: { S: 0, R: 0, L: 1 }, L: { S: 1, R: 1, L: 0 } };

const rel = (a, b) => (b.arm - a.arm + 4) % 4; // 1 = b on a's right, 2 = opposite, 3 = on a's left

export function conflicts(a, b) {
  const r = rel(a, b);
  if (r === 1) return !!ON_RIGHT[a.move][b.move];
  if (r === 3) return !!ON_RIGHT[b.move][a.move];
  return !!OPPOSITE[a.move][b.move];
}

function level(v, signs) {
  if (v.kind === 'emergency') return 100;
  const s = signs[v.arm];
  const base = s === 'stop' || s === 'yield' ? 0 : 10;
  return base + (v.kind === 'tram' ? 5 : 0);
}

// Returns a reason code when `a` must give way to `b`, otherwise null.
export function mustYield(a, b, signs) {
  if (!conflicts(a, b)) return null;
  const la = level(a, signs), lb = level(b, signs);
  if (la !== lb) {
    if (la > lb) return null;
    if (b.kind === 'emergency') return 'emergency';
    if (signs[a.arm] === 'stop' || signs[a.arm] === 'yield') return signs[a.arm];
    return 'tram';
  }
  const r = rel(a, b);
  if (r === 1) return 'right';
  if (r === 2) {
    if (a.move === 'L' && b.move !== 'L') return 'oncoming';
    return null;
  }
  return null; // b is on a's left: a has priority
}

export function solve(scn) {
  const remaining = new Set(scn.vehicles.map(v => v.id));
  const byId = Object.fromEntries(scn.vehicles.map(v => [v.id, v]));
  const yields = []; // { from, to, reason }
  for (const a of scn.vehicles) for (const b of scn.vehicles) {
    if (a === b) continue;
    const reason = mustYield(a, b, scn.signs);
    if (reason) yields.push({ from: a.id, to: b.id, reason });
  }
  const steps = [];
  while (remaining.size) {
    const ready = [...remaining].filter(id => !yields.some(y => y.from === id && remaining.has(y.to)));
    if (!ready.length) return { ok: false, steps, yields };
    steps.push(ready.sort());
    ready.forEach(id => remaining.delete(id));
  }
  void byId;
  return { ok: true, steps, yields };
}

// ---------- Seeded generator ----------

function rng(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const pick = (r, arr) => arr[Math.floor(r() * arr.length)];

const LETTERS = ['A', 'B', 'C', 'D'];
const COLORS = ['#e11d48', '#2563eb', '#16a34a', '#f59e0b'];

export function generateScenario(seed) {
  for (let attempt = 0; attempt < 60; attempt++) {
    const r = rng(seed * 97 + attempt);
    const count = r() < 0.2 ? 4 : r() < 0.55 ? 3 : 2;
    const arms = [0, 1, 2, 3].sort(() => r() - 0.5).slice(0, count);
    const signs = [null, null, null, null];
    const layout = r();
    if (layout < 0.35) {
      // no signs: priority to the right
    } else if (layout < 0.75) {
      // main road on one axis, side roads with give way / stop
      const axis = r() < 0.5 ? 0 : 1;
      const side = pick(r, ['yield', 'stop']);
      signs[axis] = signs[axis + 2] = 'priority';
      signs[(axis + 1) % 4] = signs[(axis + 3) % 4] = side;
    } else {
      // a single arm with STOP/give way
      signs[pick(r, [0, 1, 2, 3])] = pick(r, ['yield', 'stop']);
    }
    const vehicles = arms.map((arm, i) => ({
      id: LETTERS[i], arm, move: pick(r, MOVES), kind: 'car', color: COLORS[i]
    }));
    const special = r();
    if (special < 0.12) {
      const v = pick(r, vehicles);
      v.kind = 'tram'; v.move = 'S'; v.color = '#f97316';
    } else if (special < 0.2) {
      const v = pick(r, vehicles);
      v.kind = 'emergency'; v.color = '#ffffff';
    }
    const scn = { seed, signs, vehicles };
    const res = solve(scn);
    if (res.ok && (count === 2 || res.steps.length > 1)) return { ...scn, solution: res };
  }
  return null;
}

// ---------- Text ----------

const TXT = {
  it: { first: v => `Il veicolo ${v} passa per primo.`, yields: (a, b) => `Il veicolo ${a} deve dare la precedenza al veicolo ${b}.`, together: (a, b) => `I veicoli ${a} e ${b} passano contemporaneamente.`, order: o => `L'ordine di passaggio è: ${o}.`, last: v => `Il veicolo ${v} passa per ultimo.`,
    reason: { right: (a, b) => `${a} dà precedenza a ${b} perché ${b} proviene dalla sua destra.`, oncoming: (a, b) => `${a} svolta a sinistra e dà precedenza a ${b} che proviene di fronte.`, stop: (a, b) => `${a} ha lo STOP: si ferma e dà precedenza a ${b}.`, yield: (a, b) => `${a} ha il segnale di dare precedenza nei confronti di ${b}.`, tram: (a, b) => `${a} dà precedenza al tram ${b}.`, emergency: (a, b) => `${b} è un veicolo di soccorso in emergenza: tutti gli danno precedenza.` }, simult: 'insieme', free: v => `${v} non deve dare precedenza a nessuno.` },
  en: { first: v => `Vehicle ${v} goes first.`, yields: (a, b) => `Vehicle ${a} must give way to vehicle ${b}.`, together: (a, b) => `Vehicles ${a} and ${b} go at the same time.`, order: o => `The order is: ${o}.`, last: v => `Vehicle ${v} goes last.`,
    reason: { right: (a, b) => `${a} gives way to ${b} because ${b} comes from its right.`, oncoming: (a, b) => `${a} is turning left and gives way to oncoming ${b}.`, stop: (a, b) => `${a} has a STOP sign: it stops and gives way to ${b}.`, yield: (a, b) => `${a} has a give-way sign towards ${b}.`, tram: (a, b) => `${a} gives way to tram ${b}.`, emergency: (a, b) => `${b} is an emergency vehicle: everyone gives way.` }, simult: 'together', free: v => `${v} does not have to give way to anyone.` },
  fr: { first: v => `Le véhicule ${v} passe en premier.`, yields: (a, b) => `Le véhicule ${a} doit céder le passage au véhicule ${b}.`, together: (a, b) => `Les véhicules ${a} et ${b} passent en même temps.`, order: o => `L'ordre de passage est : ${o}.`, last: v => `Le véhicule ${v} passe en dernier.`,
    reason: { right: (a, b) => `${a} cède le passage à ${b} qui vient de sa droite.`, oncoming: (a, b) => `${a} tourne à gauche et cède le passage à ${b} qui arrive en face.`, stop: (a, b) => `${a} a un STOP : il s'arrête et cède le passage à ${b}.`, yield: (a, b) => `${a} a un cédez-le-passage envers ${b}.`, tram: (a, b) => `${a} cède le passage au tramway ${b}.`, emergency: (a, b) => `${b} est un véhicule prioritaire en intervention.` }, simult: 'ensemble', free: v => `${v} n'a personne à qui céder le passage.` },
  es: { first: v => `El vehículo ${v} pasa primero.`, yields: (a, b) => `El vehículo ${a} debe ceder el paso al vehículo ${b}.`, together: (a, b) => `Los vehículos ${a} y ${b} pasan a la vez.`, order: o => `El orden de paso es: ${o}.`, last: v => `El vehículo ${v} pasa el último.`,
    reason: { right: (a, b) => `${a} cede el paso a ${b} porque viene por su derecha.`, oncoming: (a, b) => `${a} gira a la izquierda y cede el paso a ${b}, que viene de frente.`, stop: (a, b) => `${a} tiene STOP: se detiene y cede el paso a ${b}.`, yield: (a, b) => `${a} tiene ceda el paso respecto a ${b}.`, tram: (a, b) => `${a} cede el paso al tranvía ${b}.`, emergency: (a, b) => `${b} es un vehículo prioritario en servicio de urgencia.` }, simult: 'a la vez', free: v => `${v} no tiene que ceder el paso a nadie.` },
  de: { first: v => `Fahrzeug ${v} fährt zuerst.`, yields: (a, b) => `Fahrzeug ${a} muss Fahrzeug ${b} Vorfahrt gewähren.`, together: (a, b) => `Die Fahrzeuge ${a} und ${b} fahren gleichzeitig.`, order: o => `Die Reihenfolge ist: ${o}.`, last: v => `Fahrzeug ${v} fährt zuletzt.`,
    reason: { right: (a, b) => `${a} lässt ${b} fahren, weil ${b} von rechts kommt.`, oncoming: (a, b) => `${a} biegt links ab und lässt den Gegenverkehr ${b} durch.`, stop: (a, b) => `${a} hat ein Stoppschild und lässt ${b} fahren.`, yield: (a, b) => `${a} muss ${b} Vorfahrt gewähren (Zeichen 205).`, tram: (a, b) => `${a} lässt die Straßenbahn ${b} fahren.`, emergency: (a, b) => `${b} ist ein Einsatzfahrzeug mit Sonderrechten.` }, simult: 'gleichzeitig', free: v => `${v} muss niemandem Vorfahrt gewähren.` }
};

export function orderText(solution, lang) {
  const T = TXT[lang] || TXT.en;
  return solution.steps.map(s => s.length > 1 ? `${s.join(' + ')} (${T.simult})` : s[0]).join(' → ');
}

export function explain(scn, lang) {
  const T = TXT[lang] || TXT.en;
  const lines = [];
  for (const v of scn.vehicles) {
    const ys = scn.solution.yields.filter(y => y.from === v.id);
    if (!ys.length) lines.push(T.free(v.id));
    ys.forEach(y => lines.push(T.reason[y.reason](y.from, y.to)));
  }
  lines.push(T.order(orderText(scn.solution, lang)));
  return lines;
}

// Ministerial-style true/false statements built from the solution.
export function statements(scn, lang, r = Math.random) {
  const T = TXT[lang] || TXT.en;
  const sol = scn.solution;
  const ids = scn.vehicles.map(v => v.id);
  const out = [];
  const first = sol.steps[0];
  ids.forEach(id => out.push({ text: T.first(id), answer: first.includes(id) && first.length === 1 }));
  for (const a of ids) for (const b of ids) {
    if (a === b) continue;
    const y = sol.yields.some(x => x.from === a && x.to === b);
    if (y || r() < 0.4) out.push({ text: T.yields(a, b), answer: y });
  }
  for (let i = 0; i < ids.length; i++) for (let j = i + 1; j < ids.length; j++) {
    const same = sol.steps.some(s => s.includes(ids[i]) && s.includes(ids[j]));
    if (same || r() < 0.3) out.push({ text: T.together(ids[i], ids[j]), answer: same });
  }
  if (ids.length > 2) {
    const lastStep = sol.steps[sol.steps.length - 1];
    if (lastStep.length === 1) out.push({ text: T.last(lastStep[0]), answer: true });
  }
  return out.sort(() => r() - 0.5).slice(0, 4);
}

// ---------- SVG renderer ----------

const ENTRY = [[175, 200], [200, 125], [125, 100], [100, 175]];
const EXIT = [[125, 200], [200, 175], [175, 100], [100, 125]];
const CAR_POS = [[175, 238], [238, 125], [125, 62], [62, 175]];
const HEADING = [0, -90, 180, 90]; // rotation of a car drawn facing up

function pathD(v) {
  const e = ENTRY[v.arm];
  const exitArm = (v.arm + EXIT_OFFSET[v.move]) % 4;
  const x = EXIT[exitArm];
  const start = CAR_POS[v.arm];
  let ctrl;
  if (v.move === 'S') ctrl = [(e[0] + x[0]) / 2, (e[1] + x[1]) / 2];
  else if (v.move === 'R') ctrl = v.arm % 2 === 0 ? [e[0], x[1]] : [x[0], e[1]];
  else ctrl = v.arm % 2 === 0 ? [e[0], x[1]] : [x[0], e[1]];
  const far = [x[0] + (x[0] - 150) * 0.55, x[1] + (x[1] - 150) * 0.55];
  return `M${start[0]},${start[1]} L${e[0]},${e[1]} Q${ctrl[0]},${ctrl[1]} ${x[0]},${x[1]} L${far[0]},${far[1]}`;
}

function vehicleSvg(v, highlight) {
  const [x, y] = CAR_POS[v.arm];
  const rot = HEADING[v.arm];
  let body;
  if (v.kind === 'tram') {
    body = `<rect x="-13" y="-34" width="26" height="62" rx="6" fill="#f97316" stroke="#7c2d12" stroke-width="2"/><rect x="-9" y="-30" width="18" height="12" rx="2" fill="#bae6fd"/><line x1="0" y1="-34" x2="0" y2="-44" stroke="#333" stroke-width="2"/>`;
  } else if (v.kind === 'emergency') {
    body = `<rect x="-12" y="-22" width="24" height="44" rx="5" fill="#fff" stroke="#b91c1c" stroke-width="2"/><rect x="-9" y="-14" width="18" height="9" rx="2" fill="#93c5fd"/><rect x="-8" y="-24" width="7" height="4" fill="#2563eb"/><rect x="1" y="-24" width="7" height="4" fill="#ef4444"/><path d="M-2,4 h4 v4 h4 v4 h-4 v4 h-4 v-4 h-4 v-4 h4 z" fill="#dc2626"/>`;
  } else {
    body = `<rect x="-11" y="-20" width="22" height="40" rx="6" fill="${v.color}" stroke="rgba(0,0,0,.45)" stroke-width="1.5"/><rect x="-8" y="-12" width="16" height="8" rx="2" fill="rgba(200,230,255,.9)"/><rect x="-8" y="8" width="16" height="6" rx="2" fill="rgba(200,230,255,.7)"/>`;
  }
  const blink = v.move === 'R' ? `<circle cx="10" cy="-19" r="3" fill="#fbbf24" class="blinker"/>` : v.move === 'L' ? `<circle cx="-10" cy="-19" r="3" fill="#fbbf24" class="blinker"/>` : '';
  const ring = highlight ? `<circle r="30" fill="none" stroke="#facc15" stroke-width="3" stroke-dasharray="4 3"/>` : '';
  const label = `<g transform="rotate(${-rot})"><circle r="10" cx="0" cy="0" fill="rgba(15,23,42,.85)"/><text x="0" y="1" text-anchor="middle" dominant-baseline="central" font-size="12" font-weight="800" fill="#fff" font-family="system-ui">${v.id}</text></g>`;
  return `<g class="veh" data-id="${v.id}" transform="translate(${x} ${y}) rotate(${rot})" style="cursor:pointer">${ring}${body}${blink}${label}</g>`;
}

function signSvg(arm, sign) {
  if (!sign) return '';
  const pos = [[212, 212], [212, 88], [88, 88], [88, 212]][arm];
  const [x, y] = pos;
  let g;
  if (sign === 'stop') g = `<polygon points="-6,-14 6,-14 14,-6 14,6 6,14 -6,14 -14,6 -14,-6" fill="#d0021b" stroke="#fff" stroke-width="1.5"/><text y="1" text-anchor="middle" dominant-baseline="central" font-size="7" font-weight="800" fill="#fff" font-family="Arial">STOP</text>`;
  else if (sign === 'yield') g = `<polygon points="-14,-11 14,-11 0,13" fill="#fff" stroke="#d0021b" stroke-width="4" stroke-linejoin="round"/>`;
  else g = `<polygon points="0,-14 14,0 0,14 -14,0" fill="#fff" stroke="#666" stroke-width="1"/><polygon points="0,-9 9,0 0,9 -9,0" fill="#ffcc00"/>`;
  const line = sign === 'stop'
    ? [`<rect x="150" y="200" width="50" height="4" fill="#fff"/>`, `<rect x="200" y="100" width="4" height="50" fill="#fff"/>`, `<rect x="100" y="96" width="50" height="4" fill="#fff"/>`, `<rect x="96" y="150" width="4" height="50" fill="#fff"/>`][arm]
    : sign === 'yield'
      ? [`<path d="M152,201 l5,7 l5,-7 M164,201 l5,7 l5,-7 M176,201 l5,7 l5,-7 M188,201 l5,7 l5,-7" stroke="#fff" stroke-width="2" fill="none"/>`, `<path d="M201,102 l7,5 l-7,5 M201,114 l7,5 l-7,5 M201,126 l7,5 l-7,5 M201,138 l7,5 l-7,5" stroke="#fff" stroke-width="2" fill="none"/>`, `<path d="M102,99 l5,-7 l5,7 M114,99 l5,-7 l5,7 M126,99 l5,-7 l5,7 M138,99 l5,-7 l5,7" stroke="#fff" stroke-width="2" fill="none"/>`, `<path d="M99,152 l-7,5 l7,5 M99,164 l-7,5 l7,5 M99,176 l-7,5 l7,5 M99,188 l-7,5 l7,5" stroke="#fff" stroke-width="2" fill="none"/>`][arm]
      : '';
  return `${line}<g transform="translate(${x} ${y})"><rect x="-1.5" y="10" width="3" height="16" fill="#555"/>${g}</g>`;
}

export function renderJunction(scn, { showPaths = true, highlight = [], done = [], hideVehicles = false } = {}) {
  const tramRails = scn.vehicles.some(v => v.kind === 'tram')
    ? (() => { const t = scn.vehicles.find(v => v.kind === 'tram'); const vert = t.arm % 2 === 0; const c = t.arm === 0 ? 175 : t.arm === 2 ? 125 : t.arm === 1 ? 125 : 175; return vert ? `<g stroke="#7c7c7c" stroke-width="2"><line x1="${c - 6}" y1="0" x2="${c - 6}" y2="300"/><line x1="${c + 6}" y1="0" x2="${c + 6}" y2="300"/></g>` : `<g stroke="#7c7c7c" stroke-width="2"><line y1="${c - 6}" x1="0" y2="${c - 6}" x2="300"/><line y1="${c + 6}" x1="0" y2="${c + 6}" x2="300"/></g>`; })()
    : '';
  const dash = `stroke="#fff" stroke-width="2" stroke-dasharray="10 8"`;
  const paths = showPaths ? scn.vehicles.filter(v => !done.includes(v.id)).map(v => `<path d="${pathD(v)}" fill="none" stroke="${v.kind === 'emergency' ? '#ef4444' : v.color}" stroke-width="4" stroke-linecap="round" stroke-dasharray="2 7" opacity=".9" marker-end="url(#arrow-${v.id})"/>`).join('') : '';
  const markers = scn.vehicles.map(v => `<marker id="arrow-${v.id}" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="${v.kind === 'emergency' ? '#ef4444' : v.color}"/></marker>`).join('');
  return `<svg viewBox="0 0 300 300" class="junction-svg" xmlns="http://www.w3.org/2000/svg">
    <defs>${markers}<pattern id="grass" width="8" height="8" patternUnits="userSpaceOnUse"><rect width="8" height="8" fill="#5f8f4e"/><circle cx="2" cy="3" r="1" fill="#6fa35b"/><circle cx="6" cy="6" r="1" fill="#557f45"/></pattern></defs>
    <rect width="300" height="300" fill="url(#grass)"/>
    <rect x="0" y="100" width="300" height="100" fill="#4b5058"/><rect x="100" y="0" width="100" height="300" fill="#4b5058"/>
    <rect x="96" y="0" width="4" height="96" fill="#cbd5e1"/><rect x="200" y="0" width="4" height="96" fill="#cbd5e1"/><rect x="96" y="204" width="4" height="96" fill="#cbd5e1"/><rect x="200" y="204" width="4" height="96" fill="#cbd5e1"/>
    <rect x="0" y="96" width="96" height="4" fill="#cbd5e1"/><rect x="0" y="200" width="96" height="4" fill="#cbd5e1"/><rect x="204" y="96" width="96" height="4" fill="#cbd5e1"/><rect x="204" y="200" width="96" height="4" fill="#cbd5e1"/>
    <line x1="150" y1="0" x2="150" y2="96" ${dash}/><line x1="150" y1="204" x2="150" y2="300" ${dash}/><line x1="0" y1="150" x2="96" y2="150" ${dash}/><line x1="204" y1="150" x2="300" y2="150" ${dash}/>
    ${tramRails}
    ${scn.signs.map((s, i) => signSvg(i, s)).join('')}
    ${paths}
    ${hideVehicles ? '' : scn.vehicles.filter(v => !done.includes(v.id)).map(v => vehicleSvg(v, highlight.includes(v.id))).join('')}
  </svg>`;
}

// Same junction, with every vehicle driving along its path in the solved order.
export function renderJunctionAnimated(scn, stepDur = 1.6) {
  const steps = scn.solution.steps;
  const total = steps.length * stepDur + 0.8;
  const base = renderJunction(scn, { showPaths: true, hideVehicles: true });
  const cars = scn.vehicles.map(v => {
    const k = steps.findIndex(s => s.includes(v.id));
    const a = (k * stepDur) / total, b = Math.min(1, (k * stepDur + stepDur * 0.95) / total);
    const inner = vehicleSvg({ ...v, arm: 0 }, false)
      .replace(/transform="translate\([^)]*\) rotate\([^)]*\)"/, 'transform="rotate(90)"');
    return `<g>${inner}<animateMotion dur="${total}s" repeatCount="indefinite" rotate="auto" keyPoints="0;0;1;1" keyTimes="0;${a.toFixed(3)};${b.toFixed(3)};1" calcMode="linear" path="${pathD(v)}"/></g>`;
  }).join('');
  return base.replace('</svg>', `${cars}</svg>`);
}

export const SCENARIO_COUNT = 60;
export function scenarioList() {
  const out = [];
  for (let i = 1; out.length < SCENARIO_COUNT && i < 400; i++) {
    const s = generateScenario(i);
    if (s) out.push({ ...s, index: out.length + 1 });
  }
  return out;
}
