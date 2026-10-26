// Driving simulator: kinematic car model, pseudo-3D renderer (ground plane + projected boxes +
// billboards), AI traffic, pedestrians, traffic lights and an examiner that records faults.
import { buildWorld, paintGround, surfaceAt, shade, GRID, HALF, RB, INTERSECTIONS, SIZE } from './world.js';
import { renderSign } from '../signs/draw.js';
import { sound } from './audio.js';

const L = { it: 0, fr: 1, en: 2, es: 3, de: 4 };
const tx = (row, lang) => row[L[lang] ?? 2] || row[2];

// ---------- texts ----------
export const SIM_TXT = {
  faults: {
    belt: [['Cintura non allacciata', 'Ceinture non bouclée', 'Seat belt not fastened', 'Cinturón sin abrochar', 'Nicht angeschnallt'], 'serious'],
    moveOffSignal: [['Partenza senza indicatore di direzione', 'Démarrage sans clignotant', 'Moving off without signalling', 'Arranque sin intermitente', 'Anfahren ohne Blinker'], 'minor'],
    mirrors: [['Specchietti non controllati prima della manovra', 'Rétroviseurs non contrôlés', 'Mirrors not checked before manoeuvre', 'Sin mirar los espejos', 'Spiegel nicht beachtet'], 'minor'],
    indicator: [['Svolta senza indicatore di direzione', 'Changement de direction sans clignotant', 'Turn without signalling', 'Giro sin intermitente', 'Abbiegen ohne Blinker'], 'minor'],
    speeding: [['Eccesso di velocità', 'Excès de vitesse', 'Speeding', 'Exceso de velocidad', 'Geschwindigkeitsüberschreitung'], 'minor'],
    speedingBad: [['Grave eccesso di velocità', 'Grand excès de vitesse', 'Serious speeding', 'Exceso grave de velocidad', 'Erhebliche Überschreitung'], 'serious'],
    redLight: [['Passaggio con il semaforo rosso', 'Feu rouge grillé', 'Ran a red light', 'Semáforo en rojo', 'Rotlichtverstoß'], 'eliminatory'],
    stopSign: [['Mancato arresto allo STOP', 'Stop non marqué', 'Did not stop at STOP', 'No se detuvo en el STOP', 'Nicht am Stoppschild gehalten'], 'eliminatory'],
    priority: [['Mancata precedenza a un veicolo', 'Refus de priorité', 'Failed to give way', 'No cedió el paso', 'Vorfahrt missachtet'], 'eliminatory'],
    pedestrian: [['Mancata precedenza al pedone', 'Refus de priorité au piéton', 'Failed to give way to a pedestrian', 'No cedió el paso al peatón', 'Fußgänger nicht durchgelassen'], 'eliminatory'],
    wrongSide: [['Marcia contromano', 'Circulation à contresens', 'Driving on the wrong side', 'Circulación en sentido contrario', 'Falsche Fahrbahnseite'], 'serious'],
    continuous: [['Striscia continua oltrepassata', 'Ligne continue franchie', 'Crossed a continuous line', 'Pisó la línea continua', 'Durchgezogene Linie überfahren'], 'serious'],
    kerb: [['Ruota sul marciapiede', 'Roue sur le trottoir', 'Mounted the kerb', 'Subió a la acera', 'Bordstein überfahren'], 'serious'],
    kerbParking: [['Contatto con il marciapiede', 'Contact avec le trottoir', 'Touched the kerb', 'Tocó el bordillo', 'Bordstein berührt'], 'minor'],
    collision: [['Urto con un ostacolo o un veicolo', 'Collision', 'Collision', 'Colisión', 'Zusammenstoß'], 'eliminatory'],
    roundaboutDir: [['Rotatoria percorsa nel senso sbagliato', 'Giratoire pris à contresens', 'Wrong way round the roundabout', 'Glorieta en sentido contrario', 'Kreisverkehr falsch befahren'], 'eliminatory'],
    roundaboutExit: [['Uscita dalla rotatoria senza indicatore', 'Sortie du giratoire sans clignotant', 'Left roundabout without signalling', 'Salida de glorieta sin intermitente', 'Ausfahrt ohne Blinker'], 'minor'],
    roundaboutYield: [['Ingresso in rotatoria senza dare precedenza', 'Entrée dans le giratoire sans céder le passage', 'Entered roundabout without giving way', 'Entró en la glorieta sin ceder el paso', 'Einfahrt ohne Vorfahrt zu gewähren'], 'eliminatory'],
    headlights: [['Fari spenti di notte', 'Feux éteints la nuit', 'No headlights at night', 'Luces apagadas de noche', 'Kein Licht bei Nacht'], 'serious'],
    harshBrake: [['Frenata brusca non necessaria', 'Freinage brusque', 'Harsh braking', 'Frenazo innecesario', 'Unnötige Vollbremsung'], 'minor'],
    horn: [['Uso improprio del clacson', 'Klaxon inutile', 'Unnecessary horn', 'Claxon innecesario', 'Unnötiges Hupen'], 'minor']
  },
  levels: { minor: ['Lieve', 'Légère', 'Minor', 'Leve', 'Leicht'], serious: ['Grave', 'Grave', 'Serious', 'Grave', 'Schwer'], eliminatory: ['Eliminatoria', 'Éliminatoire', 'Dangerous', 'Eliminatoria', 'Durchfallend'] },
  ui: {
    speed: ['Velocità', 'Vitesse', 'Speed', 'Velocidad', 'Tempo'],
    belt: ['Allaccia la cintura (B)', 'Boucle ta ceinture (B)', 'Fasten belt (B)', 'Abróchate (B)', 'Anschnallen (B)'],
    gearHint: ['Inserisci D per partire', 'Passe en D pour partir', 'Select D to drive', 'Pon la D', 'D einlegen'],
    done: ['Missione completata', 'Mission terminée', 'Mission complete', 'Misión completada', 'Aufgabe erledigt'],
    passed: ['Prova superata', 'Épreuve réussie', 'Test passed', 'Prueba superada', 'Bestanden'],
    failed: ['Prova non superata', 'Épreuve échouée', 'Test failed', 'Prueba no superada', 'Nicht bestanden'],
    parkOk: ['Parcheggio corretto!', 'Stationnement réussi !', 'Parked correctly!', '¡Aparcado correctamente!', 'Richtig eingeparkt!'],
    stopToFinish: ['Fermati e tira il freno a mano (Spazio) per terminare', 'Arrête-toi et serre le frein à main (Espace)', 'Stop and apply the handbrake (Space) to finish', 'Para y echa el freno de mano (Espacio)', 'Anhalten und Handbremse ziehen (Leertaste)'],
    distance: ['m', 'm', 'm', 'm', 'm']
  },
  nav: {
    right: ['Al prossimo incrocio svolta a destra', 'À la prochaine intersection, tourne à droite', 'At the next junction turn right', 'En el próximo cruce gira a la derecha', 'An der nächsten Kreuzung rechts abbiegen'],
    left: ['Al prossimo incrocio svolta a sinistra', 'À la prochaine intersection, tourne à gauche', 'At the next junction turn left', 'En el próximo cruce gira a la izquierda', 'An der nächsten Kreuzung links abbiegen'],
    straight: ['Prosegui diritto', 'Continue tout droit', 'Go straight on', 'Sigue recto', 'Geradeaus weiterfahren'],
    roundabout: n => [`Alla rotatoria prendi la ${n}ª uscita`, `Au rond-point, prends la ${n}e sortie`, `At the roundabout take exit ${n}`, `En la glorieta toma la ${n}ª salida`, `Im Kreisverkehr die ${n}. Ausfahrt`],
    stopKerb: ['Accosta a destra e fermati', 'Gare-toi sur le côté', 'Pull over and stop', 'Arrima y detente', 'Rechts ranfahren und anhalten'],
    park: ['Parcheggia nel posto evidenziato in giallo', 'Gare-toi dans la place jaune', 'Park in the yellow bay', 'Aparca en la plaza amarilla', 'Im gelben Feld parken'],
    wait: ['Attendi…', 'Patiente…', 'Wait…', 'Espera…', 'Warten…']
  }
};

export const SCENARIOS = [
  { id: 'city', icon: '🏙️', n: ['Guida in città (percorso d\'esame)', 'Conduite en ville (parcours d\'examen)', 'Town drive (test route)', 'Conducción urbana (recorrido de examen)', 'Stadtfahrt (Prüfungsstrecke)'], d: ['Partenza dal margine, strisce pedonali, semaforo, STOP, rotatoria e accostamento finale.', 'Démarrage, passage piéton, feux, stop, giratoire et arrêt final.', 'Move off, zebra crossing, lights, STOP, roundabout and pull over.', 'Arranque, paso de peatones, semáforo, STOP, glorieta y parada.', 'Anfahren, Zebrastreifen, Ampel, Stopp, Kreisverkehr und Anhalten.'] },
  { id: 'stop', icon: '🛑', n: ['Incrocio con STOP e precedenza', 'Intersection avec STOP', 'STOP junction and right of way', 'Cruce con STOP', 'Stoppschild und Vorfahrt'], d: ['Fermati alla striscia e lascia passare il veicolo sulla strada principale.', 'Marque l\'arrêt et laisse passer le véhicule prioritaire.', 'Stop at the line and let the vehicle on the main road go.', 'Detente en la línea y deja pasar al vehículo.', 'An der Haltlinie halten und den Vorfahrtberechtigten fahren lassen.'] },
  { id: 'roundabout', icon: '🔄', n: ['Rotatoria', 'Giratoire', 'Roundabout', 'Glorieta', 'Kreisverkehr'], d: ['Dai precedenza a chi è nell\'anello, percorri la rotatoria nel senso giusto ed esci con la freccia.', 'Cède le passage, tourne dans le bon sens, sors avec le clignotant.', 'Give way, go the right way round, signal when leaving.', 'Cede el paso, circula en sentido correcto y señaliza la salida.', 'Vorfahrt gewähren, richtig herum fahren, beim Ausfahren blinken.'] },
  { id: 'parallel', icon: '🅿️', n: ['Parcheggio in linea (a S)', 'Créneau', 'Parallel parking', 'Aparcamiento en línea', 'Längs einparken'], d: ['Entra in retromarcia nel posto libero tra le auto, senza toccare marciapiede e veicoli.', 'Gare-toi en marche arrière entre les voitures sans toucher.', 'Reverse into the gap between cars without touching.', 'Aparca marcha atrás entre los coches sin tocar.', 'Rückwärts in die Lücke einparken, ohne zu berühren.'] },
  { id: 'perpendicular', icon: '🚙', n: ['Parcheggio a pettine in retromarcia', 'Rangement en bataille', 'Bay parking (reverse)', 'Aparcamiento en batería', 'Quer einparken (rückwärts)'], d: ['Nel parcheggio, entra in retromarcia nello stallo evidenziato.', 'Entre en marche arrière dans la place indiquée.', 'Reverse into the highlighted bay.', 'Entra marcha atrás en la plaza indicada.', 'Rückwärts in die markierte Lücke.'] },
  { id: 'night', icon: '🌙', n: ['Guida notturna', 'Conduite de nuit', 'Night drive', 'Conducción nocturna', 'Nachtfahrt'], d: ['Lo stesso percorso di notte: accendi i fari (L) e adegua la velocità.', 'Même parcours de nuit : allume les feux (L).', 'Same route at night: switch on headlights (L).', 'Mismo recorrido de noche: enciende las luces (L).', 'Gleiche Strecke bei Nacht: Licht einschalten (L).'] },
  { id: 'free', icon: '🗺️', n: ['Guida libera', 'Conduite libre', 'Free drive', 'Conducción libre', 'Freie Fahrt'], d: ['Esplora la città rispettando segnali e precedenze: l\'esaminatore registra gli errori.', 'Explore la ville : l\'examinateur note les fautes.', 'Explore the town: the examiner records faults.', 'Explora la ciudad: el examinador anota los fallos.', 'Erkunde die Stadt: Fehler werden notiert.'] }
];

// ---------- geometry helpers ----------
const wrap = a => { while (a > Math.PI) a -= 2 * Math.PI; while (a < -Math.PI) a += 2 * Math.PI; return a; };
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

function corners(x, y, th, len, wid) {
  const c = Math.cos(th), s = Math.sin(th), hl = len / 2, hw = wid / 2;
  return [[hl, hw], [hl, -hw], [-hl, -hw], [-hl, hw]].map(([a, b]) => [x + a * c - b * s, y + a * s + b * c]);
}
function obbOverlap(A, B) {
  const axes = [];
  [A, B].forEach(P => { for (let i = 0; i < 2; i++) { const p = P[i], q = P[i + 1]; axes.push([q[1] - p[1], p[0] - q[0]]); } });
  return axes.every(([ax, ay]) => {
    const pa = A.map(p => p[0] * ax + p[1] * ay), pb = B.map(p => p[0] * ax + p[1] * ay);
    return Math.max(...pa) >= Math.min(...pb) && Math.max(...pb) >= Math.min(...pa);
  });
}

// AI path through lane centres (rectangle loop of right turns, or a straight line).
function loopPath(x0, y0, x1, y1, side) {
  const o = 1.75 * side;
  const pts = [];
  const legs = [
    { from: [x0 + 0, y0 + o], to: [x1 - o, y0 + o] },
    { from: [x1 - o, y0], to: [x1 - o, y1 - o] },
    { from: [x1, y1 - o], to: [x0 + o, y1 - o] },
    { from: [x0 + o, y1], to: [x0 + o, y0 + o] }
  ];
  const corner = [[x1 - o, y0 + o], [x1 - o, y1 - o], [x0 + o, y1 - o], [x0 + o, y0 + o]];
  const dirs = [[1, 0], [0, 1], [-1, 0], [0, -1]];
  for (let i = 0; i < 4; i++) {
    const P = corner[i], d1 = dirs[i], d2 = dirs[(i + 1) % 4];
    const a = [P[0] - d1[0] * 6, P[1] - d1[1] * 6], b = [P[0] + d2[0] * 6, P[1] + d2[1] * 6];
    pts.push(a);
    for (let k = 1; k < 6; k++) { const t = k / 6; pts.push([(1 - t) * (1 - t) * a[0] + 2 * t * (1 - t) * P[0] + t * t * b[0], (1 - t) * (1 - t) * a[1] + 2 * t * (1 - t) * P[1] + t * t * b[1]]); }
    pts.push(b);
  }
  pts.push(pts[0]);
  void legs;
  return withLengths(pts, true);
}
function withLengths(pts, loop) {
  const s = [0];
  for (let i = 1; i < pts.length; i++) s.push(s[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
  return { pts, s, total: s[s.length - 1], loop };
}
function pointAt(path, d) {
  if (path.loop) d = ((d % path.total) + path.total) % path.total;
  d = clamp(d, 0, path.total);
  let i = 1;
  while (i < path.s.length - 1 && path.s[i] < d) i++;
  const a = path.pts[i - 1], b = path.pts[i];
  const seg = path.s[i] - path.s[i - 1] || 1;
  const t = (d - path.s[i - 1]) / seg;
  return { x: a[0] + (b[0] - a[0]) * t, y: a[1] + (b[1] - a[1]) * t, th: Math.atan2(b[1] - a[1], b[0] - a[0]) };
}

// ---------- the simulator ----------
export class DrivingSimulator {
  constructor(canvas, { lang = 'it', country = 'IT', onFault, onState, onEnd } = {}) {
    this.cv = canvas;
    this.ctx = canvas.getContext('2d');
    this.lang = lang;
    this.country = country;
    this.side = country === 'UK' ? -1 : 1;
    this.mph = country === 'UK';
    this.onFault = onFault || (() => {});
    this.onState = onState || (() => {});
    this.onEnd = onEnd || (() => {});
    this.world = buildWorld(this.side);
    this.ppm = 4;
    this.ground = paintGround(this.world, this.ppm);
    this.tmp = document.createElement('canvas');
    this.tmp.width = 900; this.tmp.height = 640;
    this.view = 'cockpit';
    this.keys = {};
    this.input = { throttle: 0, brake: 0, steer: 0 };
    this.images = {};
    this.loadSignImages();
    this.bind();
    this.raf = null;
    this.running = false;
  }

  loadSignImages() {
    const specs = {
      stop: { s: 'stop' }, yield: { s: 'yield' }, priority: { s: 'priorityRoad' }, crossroads: { s: 'tri', p: 'crossroads' },
      speed50: this.mph ? { s: 'ring', t: '30' } : { s: 'ring', t: '50' }, speed30: this.mph ? { s: 'ring', t: '20' } : { s: 'ring', t: '30' }, end30: { s: 'end', t: this.mph ? '20' : '30' },
      children: { s: 'tri', p: 'children' }, pedestrianAhead: { s: 'tri', p: 'pedestrianCrossing' }, crossing: { s: 'sq', inner: 'white', p: 'pedestrianCrossing', pc: 'black', ps: 50 },
      parking: { s: 'sq', p: 'parking', ps: 66 }, roundabout: { s: 'blue', p: 'roundabout' }
    };
    Object.entries(specs).forEach(([k, spec]) => {
      const img = new Image();
      img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(renderSign(spec, { country: this.country, size: 128 }));
      this.images[k] = img;
    });
  }

  bind() {
    this.onKeyDown = e => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) e.preventDefault();
      if (this.keys[e.key]) return;
      this.keys[e.key] = true;
      const k = e.key.toLowerCase();
      if (k === 'q') this.toggleBlinker('left');
      if (k === 'e') this.toggleBlinker('right');
      if (k === 'r') this.setGear(this.car.gear === 'R' ? 'D' : 'R');
      if (k === 'p') this.setGear('P');
      if (k === 'g' || k === '1') this.setGear('D');
      if (k === 'b') this.toggleBelt();
      if (k === 'l') this.toggleLights();
      if (k === 'm') this.checkMirrors();
      if (k === 'h') this.horn();
      if (k === 'v') this.cycleView();
      if (k === 'z') this.toggleBlinker('hazard');
      if (e.key === ' ') this.car.handbrake = !this.car.handbrake;
    };
    this.onKeyUp = e => { this.keys[e.key] = false; };
    window.addEventListener('keydown', this.onKeyDown);
    window.addEventListener('keyup', this.onKeyUp);
    this.onResize = () => this.resize();
    window.addEventListener('resize', this.onResize);
    this.resize();
  }

  resize() {
    const r = this.cv.getBoundingClientRect();
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    this.W = Math.max(320, Math.round(r.width * dpr));
    this.H = Math.max(200, Math.round(r.height * dpr));
    this.cv.width = this.W; this.cv.height = this.H;
    this.dpr = dpr;
  }

  destroy() {
    this.running = false;
    cancelAnimationFrame(this.raf);
    window.removeEventListener('keydown', this.onKeyDown);
    window.removeEventListener('keyup', this.onKeyUp);
    window.removeEventListener('resize', this.onResize);
    try { sound.stopEngine(); } catch { /* audio not started */ }
  }

  // ---------- scenario setup ----------
  start(id) {
    const s = this.side;
    this.scenario = id;
    this.night = id === 'night';
    this.faults = [];
    this.faultCooldown = {};
    this.time = 0;
    this.finished = false;
    this.maxSpeed = 0;
    this.lastMirror = -99;
    this.lastBlink = { left: -99, right: -99 };
    this.inBox = null;
    this.stopZoneMin = {};
    this.pedestrians = [];
    this.ai = [];
    this.scripted = [];
    this.msg = '';
    const car = { x: 80, y: 60 + s * 1.9, th: 0, v: 0, delta: 0, gear: 'P', belt: false, lights: this.night ? false : true, blinker: null, handbrake: true, len: 4.3, wid: 1.8, rpm: 800, braking: false, color: '#e11d48' };
    this.car = car;
    this.route = [];
    this.routeIdx = 0;
    this.startedMoving = false;
    this.lightsTimer = 0;
    this.lastRbAngle = null;

    // ambient AI traffic on two loops
    this.ai.push(this.makeAI(loopPath(60, 60, 180, 180, s), 30, '#3b82f6'));
    this.ai.push(this.makeAI(loopPath(180, 60, 300, 180, s), 120, '#f59e0b'));
    this.ai.push(this.makeAI(loopPath(60, 60, 180, 300, s), 260, '#10b981'));

    if (id === 'city' || id === 'night') {
      // East on y=60 → right at (180,60) → straight at lights (180,180) → left at (180,300) → roundabout exit north → left at (300,180) → pull over on y=180.
      this.route = [
        { x: 120, y: 60, r: 14, nav: 'straight' },
        { x: 180, y: 60, r: 9, nav: 'right' },
        { x: 180, y: 180, r: 9, nav: 'straight' },
        { x: 180, y: 300, r: 9, nav: s > 0 ? 'left' : 'left' },
        { x: RB.x, y: RB.y, r: RB.outer + 4, nav: 'roundabout', exit: 3 },
        { x: 300, y: 180, r: 9, nav: 'left' },
        { x: 212, y: 180, r: 12, nav: 'stopKerb', final: true }
      ];
      this.pedestrians.push(this.makePedestrian(120, 60, 'H', 34));
      this.pedestrians.push(this.makePedestrian(180, 240, 'V', 30));
    }
    if (id === 'stop') {
      car.x = 60 - s * 1.9; car.y = 120; car.th = Math.PI / 2;
      this.route = [{ x: 60, y: 180, r: 9, nav: 'straight' }, { x: 60, y: 240, r: 12, nav: 'stopKerb', final: true }];
      this.scripted.push({ trigger: () => this.car.y > 140, spawn: () => this.ai.push(this.makeAI(withLengths([[130, 180 - s * 1.75], [-20, 180 - s * 1.75]], false), 0, '#111827', { speed: 11, ignorePlayer: false, despawn: true })) });
    }
    if (id === 'roundabout') {
      car.x = 300 - s * 1.9; car.y = 240; car.th = Math.PI / 2;
      this.route = [{ x: RB.x, y: RB.y, r: RB.outer + 4, nav: 'roundabout', exit: 2 }, { x: 300, y: 350, r: 10, nav: 'stopKerb', final: true }];
      const ring = [];
      const rr = (RB.island + RB.outer) / 2 + (s > 0 ? 0.8 : -0.8);
      for (let a = 0; a <= 48; a++) { const ang = -s * a / 48 * Math.PI * 2; ring.push([RB.x + Math.cos(ang) * rr, RB.y + Math.sin(ang) * rr]); }
      this.ai.push(this.makeAI(withLengths(ring, true), 10, '#8b5cf6', { speed: 6.5 }));
    }
    if (id === 'parallel') {
      const b = this.world.bays[this.world.freeBay];
      car.x = this.world.bays[this.world.freeBay + 2].x1 - 1.2; car.y = 60 + s * 1.6; car.th = 0;
      this.parkTarget = { x0: b.x0, x1: b.x1 + 6, y0: b.y0, y1: b.y1, th: 0, cx: b.x1, cy: (b.y0 + b.y1) / 2 };
      this.ai = this.ai.filter((_, i) => i !== 1);
    }
    if (id === 'perpendicular') {
      const b = this.world.lotBays[this.world.freeLotBay];
      car.x = b.x1 + 9; car.y = 199; car.th = Math.PI;
      this.parkTarget = { x0: b.x0, x1: b.x1, y0: b.y0, y1: b.y1, th: Math.PI / 2, cx: (b.x0 + b.x1) / 2, cy: (b.y0 + b.y1) / 2, vertical: true };
      this.view = 'top';
    }
    if (id === 'parallel') this.view = 'top';
    if (id === 'free') this.route = [];
    this.updateNav();

    if (!this.running) {
      this.running = true;
      this.last = performance.now();
      try { sound.init(); sound.startEngine(800); } catch { /* audio blocked until user gesture */ }
      const loop = now => {
        if (!this.running) return;
        const dt = Math.min(0.05, (now - this.last) / 1000);
        this.last = now;
        this.update(dt);
        this.render();
        this.raf = requestAnimationFrame(loop);
      };
      this.raf = requestAnimationFrame(loop);
    }
  }

  makeAI(path, d0, color, opts = {}) {
    const p = pointAt(path, d0);
    return { path, d: d0, v: opts.speed || 8, vmax: opts.speed || 8.3, x: p.x, y: p.y, th: p.th, color, len: 4.3, wid: 1.8, wait: 0, despawn: !!opts.despawn, braking: false };
  }
  makePedestrian(x, y, axis, trigger) {
    const s = this.side;
    // starts on the pavement on the far kerb relative to approaching traffic
    const off = HALF + 1.6;
    return axis === 'H'
      ? { x, y: y - s * off, axis, from: y - s * off, to: y + s * off, trig: { x, y, r: trigger }, state: 'idle', speed: 1.3, color: '#f97316' }
      : { x: x + s * off, y, axis, from: x + s * off, to: x - s * off, trig: { x, y, r: trigger }, state: 'idle', speed: 1.3, color: '#06b6d4' };
  }

  // ---------- controls ----------
  setGear(g) {
    if (Math.abs(this.car.v) > 0.6 && g !== this.car.gear) return;
    this.car.gear = g;
    this.emit();
  }
  toggleBlinker(side) { this.car.blinker = this.car.blinker === side ? null : side; this.emit(); }
  toggleBelt() { this.car.belt = !this.car.belt; this.emit(); }
  toggleLights() { this.car.lights = !this.car.lights; this.emit(); }
  checkMirrors() { this.lastMirror = this.time; this.flash('🪞'); }
  horn() { try { sound.playHorn(0.35); } catch { /* audio blocked */ } if (this.scenario !== 'free') this.fault('horn'); }
  cycleView() { this.view = this.view === 'cockpit' ? 'chase' : this.view === 'chase' ? 'top' : 'cockpit'; this.emit(); }
  setTouch(name, v) { this.touch = this.touch || {}; this.touch[name] = v; }
  flash(txt) { this.flashTxt = txt; this.flashT = 0.8; }
  emit() { this.onState(this.publicState()); }
  publicState() {
    const c = this.car;
    return { speed: Math.abs(c.v) * (this.mph ? 2.237 : 3.6), unit: this.mph ? 'mph' : 'km/h', gear: c.gear, belt: c.belt, lights: c.lights, blinker: c.blinker, handbrake: c.handbrake, view: this.view, msg: this.msg, faults: this.faults };
  }

  fault(code) {
    if (this.finished) return;
    if (this.faultCooldown[code] && this.time - this.faultCooldown[code] < 6) return;
    this.faultCooldown[code] = this.time;
    const [txt, level] = SIM_TXT.faults[code];
    const f = { code, level, text: tx(txt, this.lang), t: this.time };
    this.faults.push(f);
    this.onFault(f);
    if (level === 'eliminatory') { try { sound.playBrakeScreech(); } catch { /* audio blocked */ } }
  }

  // ---------- update ----------
  update(dt) {
    this.time += dt;
    if (this.flashT > 0) this.flashT -= dt;
    const c = this.car;
    const k = this.keys, t = this.touch || {};
    const up = k.ArrowUp || k.w || k.W || t.gas;
    const down = k.ArrowDown || k.s || k.S || t.brake;
    const left = k.ArrowLeft || k.a || k.A, right = k.ArrowRight || k.d || k.D;
    let steerIn = (left ? -1 : 0) + (right ? 1 : 0);
    if (t.steer != null && t.steer !== 0) steerIn = t.steer;
    this.input.steer += (steerIn - this.input.steer) * Math.min(1, dt * 6);
    const maxD = 0.62 / (1 + Math.abs(c.v) / 11);
    const target = this.input.steer * maxD;
    c.delta += clamp(target - c.delta, -2.4 * dt, 2.4 * dt);

    // longitudinal dynamics
    const dir = c.gear === 'R' ? -1 : 1;
    let acc = 0;
    c.braking = false;
    if (c.gear === 'P' || c.handbrake) {
      acc = -Math.sign(c.v) * Math.min(Math.abs(c.v) / dt, c.handbrake ? 7 : 12);
    } else {
      if (up) acc += dir * (c.gear === 'R' ? 1.6 : 3.2) * (1 - Math.abs(c.v) / (c.gear === 'R' ? 3.5 : 38));
      this.brakeHold = down ? (this.brakeHold || 0) + dt : 0;
      this.brakeForce = 2.5 + Math.min(1, this.brakeHold / 0.9) * 6;
      if (down) { acc -= Math.sign(c.v || dir) * this.brakeForce; c.braking = true; }
      acc -= Math.sign(c.v) * (0.25 + 0.0022 * c.v * c.v);
      if (!up && !down && Math.abs(c.v) < 1.2) acc += dir * 0.7 * (1 - Math.abs(c.v) / 1.4); // automatic creep
    }
    const prevV = c.v;
    c.v += acc * dt;
    if (Math.sign(prevV) !== Math.sign(c.v) && prevV !== 0 && (down || c.handbrake || c.gear === 'P')) c.v = 0;
    if (c.gear === 'D' && c.v < 0) c.v = 0;
    if (c.gear === 'R' && c.v > 0) c.v = 0;
    if (down && this.brakeForce > 8 && Math.abs(prevV) > 9 && !this.emergencyAhead) this.fault('harshBrake');

    // kinematic bicycle model
    const prev = { x: c.x, y: c.y, th: c.th };
    c.th = wrap(c.th + (c.v / 2.6) * Math.tan(c.delta) * dt);
    c.x += Math.cos(c.th) * c.v * dt;
    c.y += Math.sin(c.th) * c.v * dt;

    // engine sound
    const kmh = Math.abs(c.v) * 3.6;
    const gears = [0, 18, 34, 52, 72, 95, 999];
    const gi = gears.findIndex((g, i) => kmh >= g && kmh < gears[i + 1]);
    c.rpm = 850 + ((kmh - gears[gi]) / (gears[gi + 1] - gears[gi] || 30)) * 3200 * (gi < 5 ? 1 : 0.6) + (up ? 500 : 0);
    try { sound.setEngineRPM(c.rpm); } catch { /* no audio */ }

    // blinker sound/state
    if (c.blinker) { this.lastBlink[c.blinker === 'hazard' ? 'hazard' : c.blinker] = this.time; const ph = Math.floor(this.time * 2.6) % 2; if (ph !== this.blinkPh) { this.blinkPh = ph; try { sound.playBlinker(ph === 0); } catch { /* no audio */ } } }

    this.updateLights(dt);
    this.updateAI(dt);
    this.updatePedestrians(dt);
    this.scripted = this.scripted.filter(s => { if (s.trigger()) { s.spawn(); return false; } return true; });

    // collisions
    const box = corners(c.x, c.y, c.th, c.len, c.wid);
    const hitCar = [...this.world.parked, ...this.ai].some(o => obbOverlap(box, corners(o.x, o.y, o.th, o.len, o.wid)));
    const hitPed = this.pedestrians.some(p => Math.hypot(p.x - c.x, p.y - c.y) < 1.4);
    const surf = box.map(([x, y]) => surfaceAt(this.world, x, y));
    const hitWall = surf.some(s => s === 'building' || s === 'out' || s === 'island');
    if (hitCar || hitPed || hitWall) {
      c.x = prev.x; c.y = prev.y; c.th = prev.th; c.v = 0;
      this.fault('collision');
      try { sound.playBrakeScreech(); } catch { /* no audio */ }
    } else if (surf.some(s => s === 'walk' || s === 'grass')) {
      this.fault(this.scenario === 'parallel' || this.scenario === 'perpendicular' ? 'kerbParking' : 'kerb');
    }

    this.maxSpeed = Math.max(this.maxSpeed, kmh);
    this.checkRules(dt, prev);
    this.updateNav();
    this.checkParking();
    if (this.parkTarget && Math.abs(c.v) > 0.05 && c.gear === 'R') {
      const dist = this.nearestObstacle();
      if (dist < 1.6) { this.beepT = (this.beepT || 0) - dt; if (this.beepT <= 0) { try { sound.playRadarBeep(dist * 100); } catch { /* no audio */ } this.beepT = Math.max(0.08, dist / 4); } }
    }
    if (Math.floor(this.time * 4) !== this.lastEmit) { this.lastEmit = Math.floor(this.time * 4); this.emit(); }
  }

  nearestObstacle() {
    const c = this.car;
    let best = 9;
    const back = [c.x - Math.cos(c.th) * c.len / 2, c.y - Math.sin(c.th) * c.len / 2];
    const pts = [back, ...corners(c.x, c.y, c.th, c.len, c.wid)];
    this.world.parked.forEach(o => {
      corners(o.x, o.y, o.th, o.len, o.wid).forEach(q => pts.forEach(p => { best = Math.min(best, Math.hypot(q[0] - p[0], q[1] - p[1])); }));
    });
    return best;
  }

  updateLights(dt) {
    this.lightsTimer += dt;
    const cyc = 30, tt = this.lightsTimer % cyc;
    // NS: green 0-12, yellow 12-15, red 15-30 ; EW: red 0-15, green 15-27, yellow 27-30
    this.lightState = {
      NS: tt < 12 ? 'green' : tt < 15 ? 'yellow' : 'red',
      EW: tt < 15 ? 'red' : tt < 27 ? 'green' : 'yellow'
    };
  }

  updateAI(dt) {
    const c = this.car;
    this.ai = this.ai.filter(a => {
      let target = a.vmax;
      const ahead = pointAt(a.path, a.d + 6);
      const turnSharp = Math.abs(wrap(ahead.th - a.th)) > 0.25;
      if (turnSharp) target = Math.min(target, 4.2);
      // keep distance from player and other AI
      const fx = Math.cos(a.th), fy = Math.sin(a.th);
      const blockers = [c, ...this.ai.filter(o => o !== a), ...this.pedestrians.filter(p => p.state === 'crossing')];
      blockers.forEach(o => {
        const dx = o.x - a.x, dy = o.y - a.y;
        const f = dx * fx + dy * fy, l = -dx * fy + dy * fx;
        if (f > 0 && f < 12 && Math.abs(l) < 2.2) target = Math.min(target, Math.max(0, (f - 5) * 0.9));
      });
      // traffic lights at junction e and STOP at junction d
      const e = INTERSECTIONS.find(i => i.type === 'lights');
      const de = Math.hypot(e.x - a.x, e.y - a.y);
      const towards = ((e.x - a.x) * fx + (e.y - a.y) * fy) > 0;
      if (towards && de < 26 && de > HALF + 1.5) {
        const axis = Math.abs(fx) > Math.abs(fy) ? 'EW' : 'NS';
        if (this.lightState[axis] !== 'green') target = Math.min(target, Math.max(0, (de - HALF - 2.5) * 0.7));
      }
      const dI = INTERSECTIONS.find(i => i.id === 'd');
      const dd = Math.hypot(dI.x - a.x, dI.y - a.y);
      const towardsD = ((dI.x - a.x) * fx + (dI.y - a.y) * fy) > 0;
      if (towardsD && Math.abs(fy) > 0.7 && dd < 16 && dd > HALF + 1) {
        if (!a.stoppedAt || a.stoppedAt !== 'd') {
          target = Math.min(target, Math.max(0, (dd - HALF - 2.2) * 0.8));
          if (a.v < 0.2 && dd < HALF + 4) { a.wait += dt; if (a.wait > 1.5) { a.stoppedAt = 'd'; a.wait = 0; } }
        }
      }
      if (dd > 20) a.stoppedAt = null;
      a.v += clamp(target - a.v, -6 * dt, 2.2 * dt);
      a.braking = target < a.v - 0.3;
      a.d += a.v * dt;
      const p = pointAt(a.path, a.d);
      a.x = p.x; a.y = p.y; a.th = p.th;
      return !(a.despawn && a.d >= a.path.total - 0.5);
    });
  }

  updatePedestrians(dt) {
    const c = this.car;
    this.pedestrians.forEach(p => {
      if (p.state === 'idle' && Math.hypot(c.x - p.trig.x, c.y - p.trig.y) < p.trig.r) { p.state = 'waiting'; p.wait = 1.2; }
      if (p.state === 'waiting') { p.wait -= dt; if (p.wait <= 0) p.state = 'crossing'; }
      if (p.state === 'crossing') {
        const key = p.axis === 'H' ? 'y' : 'x';
        const dir = Math.sign(p.to - p.from);
        p[key] += dir * p.speed * dt;
        p.phase = (p.phase || 0) + dt * 6;
        if ((p[key] - p.to) * dir >= 0) { p[key] = p.to; p.state = 'done'; }
      }
    });
  }

  // ---------- examiner ----------
  checkRules(dt, prev) {
    const c = this.car;
    const s = this.side;
    const moving = Math.abs(c.v) > 1;
    if (moving && !c.belt) this.fault('belt');
    if (this.night && moving && !c.lights) this.fault('headlights');

    // moving off from the kerb
    if (!this.startedMoving && Math.abs(c.v) > 0.8) {
      this.startedMoving = true;
      if (['city', 'night', 'stop', 'roundabout'].includes(this.scenario)) {
        const want = s > 0 ? 'left' : 'right';
        if (this.time - this.lastBlink[want] > 6) this.fault('moveOffSignal');
        if (this.time - this.lastMirror > 8) this.fault('mirrors');
      }
    }

    // speed limit
    const kmh = Math.abs(c.v) * 3.6;
    const z = this.world.zone30;
    const limit = (c.x > z[0] && c.x < z[2] && Math.abs(c.y - 300) < HALF + 1) ? (this.mph ? 32 : 30) : (this.mph ? 48 : 50);
    if (kmh > limit + 20) { this.overT = (this.overT || 0) + dt; if (this.overT > 1) this.fault('speedingBad'); }
    else if (kmh > limit * 1.1 + 2) { this.overT = (this.overT || 0) + dt; if (this.overT > 2) this.fault('speeding'); }
    else this.overT = 0;
    this.limit = limit;

    // lane discipline on straight roads
    if (moving && c.v > 0) {
      const fx = Math.cos(c.th), fy = Math.sin(c.th);
      const nearJ = GRID.some(X => GRID.some(Y => Math.abs(c.x - X) < HALF + 1 && Math.abs(c.y - Y) < HALF + 1));
      const rbD = Math.hypot(c.x - RB.x, c.y - RB.y);
      if (!nearJ && rbD > RB.outer + 2) {
        let off = null, cont = false;
        const Y = GRID.find(G => Math.abs(c.y - G) < HALF + 0.3);
        const X = GRID.find(G => Math.abs(c.x - G) < HALF + 0.3);
        if (Y != null && Math.abs(fx) > 0.75) { off = (c.y - Y) * Math.sign(fx) * s; cont = GRID.some(G => Math.abs(G - c.x) < 22); }
        else if (X != null && Math.abs(fy) > 0.75) { off = -(c.x - X) * Math.sign(fy) * s; cont = GRID.some(G => Math.abs(G - c.y) < 22); }
        if (off != null) {
          if (off < -0.4) { this.wrongT = (this.wrongT || 0) + dt; if (cont && this.wrongT > 0.2) this.fault('continuous'); if (this.wrongT > 1.5) this.fault('wrongSide'); }
          else this.wrongT = 0;
        }
      }
    }

    // junctions: entering / leaving the box
    const J = INTERSECTIONS.find(i => i.type !== 'roundabout' && Math.abs(c.x - i.x) < HALF && Math.abs(c.y - i.y) < HALF);
    // STOP zones (junction d, north/south approaches)
    const d = INTERSECTIONS.find(i => i.id === 'd');
    if (Math.abs(c.x - d.x) < HALF && Math.abs(c.y - d.y) < HALF + 7 && Math.abs(c.y - d.y) > HALF - 0.2) {
      const key = c.y < d.y ? 'N' : 'S';
      this.stopZoneMin[key] = Math.min(this.stopZoneMin[key] ?? 99, Math.abs(c.v));
    } else if (!J) this.stopZoneMin = {};

    if (J && !this.inBox) {
      const fx = Math.cos(c.th), fy = Math.sin(c.th);
      const fromAxis = Math.abs(fx) > Math.abs(fy) ? 'EW' : 'NS';
      this.inBox = { id: J.id, th: c.th, t: this.time, axis: fromAxis, blinkL: this.lastBlink.left, blinkR: this.lastBlink.right, mirror: this.lastMirror };
      if (c.v > 0.5) {
        if (J.type === 'lights' && this.lightState[fromAxis] === 'red') this.fault('redLight');
        if (J.type === 'major-h' && fromAxis === 'NS' && J.minor === 'stop') {
          const key = prev.y < J.y ? 'N' : 'S';
          if ((this.stopZoneMin[key] ?? 99) > 0.4) this.fault('stopSign');
        }
        this.checkPriorityAtEntry(J, fromAxis);
      }
    }
    if (!J && this.inBox) {
      const turn = wrap(c.th - this.inBox.th);
      const dirTurn = Math.abs(turn) < 0.6 ? 'S' : turn > 0 ? 'R' : 'L';
      if (dirTurn !== 'S' && c.v > 0) {
        const want = dirTurn === 'R' ? 'right' : 'left';
        const last = want === 'right' ? this.inBox.blinkR : this.inBox.blinkL;
        if (this.inBox.t - last > 5) this.fault('indicator');
        if (this.inBox.t - this.inBox.mirror > 10) this.fault('mirrors');
      }
      this.inBox = null;
      if (c.blinker === 'left' || c.blinker === 'right') { if (dirTurn !== 'S') c.blinker = null; }
    }

    // pedestrians on zebra crossings
    this.pedestrians.forEach(p => {
      if (p.state !== 'crossing' && p.state !== 'waiting') return;
      const onCross = this.world.crossings.find(cr => Math.hypot(cr.x - p.trig.x, cr.y - p.trig.y) < 1);
      if (!onCross) return;
      const inZone = onCross.axis === 'H' ? Math.abs(c.x - onCross.x) < 2.6 && Math.abs(c.y - onCross.y) < HALF : Math.abs(c.y - onCross.y) < 2.6 && Math.abs(c.x - onCross.x) < HALF;
      if (inZone && Math.abs(c.v) > 0.5) this.fault('pedestrian');
    });

    // roundabout: direction, give way on entry, signal on exit
    const rd = Math.hypot(c.x - RB.x, c.y - RB.y);
    const ang = Math.atan2(c.y - RB.y, c.x - RB.x);
    if (rd < RB.outer) {
      if (!this.inRb) {
        this.inRb = { t: this.time };
        if (c.v > 0.5) this.ai.forEach(a => {
          const ar = Math.hypot(a.x - RB.x, a.y - RB.y);
          if (ar > RB.outer) return;
          const aa = Math.atan2(a.y - RB.y, a.x - RB.x);
          const upstream = wrap((aa - ang) * s);
          if (upstream > 0 && upstream < 1.6 && a.v > 1) this.fault('roundaboutYield');
        });
      }
      if (this.lastRbAngle != null && Math.abs(c.v) > 1) {
        const dA = wrap(ang - this.lastRbAngle);
        if (dA * s > 0.004) { this.rbWrong = (this.rbWrong || 0) + dt; if (this.rbWrong > 0.6) this.fault('roundaboutDir'); } else this.rbWrong = 0;
      }
      this.lastRbAngle = ang;
    } else if (this.inRb) {
      const want = s > 0 ? 'right' : 'left';
      if (this.time - this.lastBlink[want] > 4) this.fault('roundaboutExit');
      this.inRb = null; this.lastRbAngle = null;
      if (c.blinker === want) c.blinker = null;
    }
  }

  checkPriorityAtEntry(J, fromAxis) {
    if (J.type === 'lights') return;
    const c = this.car;
    const s = this.side;
    const level = axis => {
      if (J.type === 'major-h') return axis === 'EW' ? 1 : 0;
      if (J.type === 'major-v') return axis === 'NS' ? 1 : 0;
      return 0;
    };
    const myLevel = level(fromAxis);
    this.ai.forEach(a => {
      const dx = J.x - a.x, dy = J.y - a.y;
      const dist = Math.hypot(dx, dy);
      const towards = (dx * Math.cos(a.th) + dy * Math.sin(a.th)) > 0;
      if (!towards || dist > 22 || dist < HALF || a.v < 1.5) return;
      const aAxis = Math.abs(Math.cos(a.th)) > Math.abs(Math.sin(a.th)) ? 'EW' : 'NS';
      const aLevel = level(aAxis);
      if (aLevel > myLevel) { this.fault('priority'); return; }
      if (aLevel < myLevel) return;
      // turning across oncoming traffic (left in RHT, right in the UK)
      const across = s > 0 ? 'left' : 'right';
      if (c.blinker === across && Math.cos(a.th - c.th) < -0.7 && dist < 18) { this.fault('priority'); return; }
      if (this.country === 'UK') return;
      // same level: vehicle coming from my right has priority (right-hand traffic)
      const rx = -Math.sin(c.th), ry = Math.cos(c.th);
      const rel = (a.x - c.x) * rx + (a.y - c.y) * ry;
      if (rel * s > 2) this.fault('priority');
    });
  }

  updateNav() {
    if (!this.route.length) { this.msg = ''; return; }
    const c = this.car;
    const wp = this.route[this.routeIdx];
    if (!wp) return;
    const d = Math.hypot(c.x - wp.x, c.y - wp.y);
    if (wp.final) {
      if (d < wp.r && Math.abs(c.v) < 0.2 && (c.handbrake || c.gear === 'P')) this.finish(true);
      this.msg = `${tx(SIM_TXT.nav.stopKerb, this.lang)} · ${Math.round(d)} m`;
      return;
    }
    if (d < wp.r) { wp.reached = true; }
    if (wp.reached && d > wp.r + 2) this.routeIdx++;
    const cur = this.route[this.routeIdx];
    if (!cur) return;
    const txt = cur.nav === 'roundabout' ? tx(SIM_TXT.nav.roundabout(cur.exit), this.lang) : tx(SIM_TXT.nav[cur.nav], this.lang);
    this.msg = `${txt} · ${Math.round(Math.hypot(c.x - cur.x, c.y - cur.y))} m`;
  }

  checkParking() {
    const P = this.parkTarget;
    if (!P || this.finished) { if (P) return; return; }
    const c = this.car;
    const inBox = corners(c.x, c.y, c.th, c.len - 0.2, c.wid - 0.1).every(([x, y]) => x >= P.x0 - 0.25 && x <= P.x1 + 0.25 && y >= P.y0 - 0.35 && y <= P.y1 + 0.35);
    const angOk = P.vertical ? Math.abs(Math.abs(wrap(c.th)) - Math.PI / 2) < 0.16 : Math.min(Math.abs(wrap(c.th)), Math.abs(wrap(c.th - Math.PI))) < 0.12;
    this.msg = tx(SIM_TXT.nav.park, this.lang) + (inBox && angOk ? ' ✓ — ' + tx(SIM_TXT.ui.stopToFinish, this.lang) : '');
    if (inBox && angOk && Math.abs(c.v) < 0.1 && (c.handbrake || c.gear === 'P')) this.finish(true);
  }

  finish(ok) {
    if (this.finished) return;
    this.finished = true;
    const elim = this.faults.filter(f => f.level === 'eliminatory').length;
    const serious = this.faults.filter(f => f.level === 'serious').length;
    const minor = this.faults.filter(f => f.level === 'minor').length;
    const passed = ok && elim === 0 && serious <= 1 && minor <= 8;
    try { passed ? sound.playSuccess() : sound.playHorn(0.2); } catch { /* no audio */ }
    this.onEnd({ passed, elim, serious, minor, faults: this.faults, time: this.time, maxSpeed: this.maxSpeed, scenario: this.scenario });
  }

  // ---------- rendering ----------
  render() {
    const g = this.ctx, W = this.W, H = this.H;
    g.setTransform(1, 0, 0, 1, 0, 0);
    if (this.view === 'top') this.renderTop(g, W, H);
    else this.render3D(g, W, H);
    this.renderHUD(g, W, H);
  }

  camera() {
    const c = this.car;
    if (this.view === 'chase') return { x: c.x - Math.cos(c.th) * 7.5, y: c.y - Math.sin(c.th) * 7.5, h: 3.1, th: c.th, horizon: 0.36 };
    const sideOff = this.side > 0 ? -0.38 : 0.38; // driver seat: left in RHT, right in UK
    return { x: c.x + Math.cos(c.th) * 0.1 - Math.sin(c.th) * sideOff, y: c.y + Math.sin(c.th) * 0.1 + Math.cos(c.th) * sideOff, h: 1.22, th: c.th, horizon: 0.44 };
  }

  render3D(g, W, H, cam = this.camera(), vp = { x: 0, y: 0, w: W, h: H }, mirror = false) {
    const horizon = vp.y + vp.h * cam.horizon;
    const focal = (vp.w / 2) / Math.tan((mirror ? 40 : 36) * Math.PI / 180);
    const night = this.night;
    g.save();
    g.beginPath(); g.rect(vp.x, vp.y, vp.w, vp.h); g.clip();
    // sky
    const sky = g.createLinearGradient(0, vp.y, 0, horizon);
    if (night) { sky.addColorStop(0, '#020617'); sky.addColorStop(1, '#1e293b'); }
    else { sky.addColorStop(0, '#5ea8e6'); sky.addColorStop(1, '#cfe6f7'); }
    g.fillStyle = sky; g.fillRect(vp.x, vp.y, vp.w, horizon - vp.y + 1);
    // distant hills
    g.fillStyle = night ? '#0f172a' : '#9db7a0';
    g.beginPath(); g.moveTo(vp.x, horizon);
    for (let i = 0; i <= 24; i++) { const a = cam.th * 2 + i * 0.5; g.lineTo(vp.x + (i / 24) * vp.w, horizon - (12 + Math.sin(a) * 8 + Math.sin(a * 2.3) * 5) * (vp.h / 500)); }
    g.lineTo(vp.x + vp.w, horizon); g.fill();

    // ground: rotate the texture into camera space, then sample one row per scanline
    const T = this.tmp, tg = T.getContext('2d');
    const ppm = this.ppm, viewDist = 150;
    const tScale = Math.min(T.height / viewDist, ppm); // texels per metre in tmp
    const sinT = Math.sin(cam.th), cosT = Math.cos(cam.th);
    const k = tScale / ppm;
    tg.setTransform(1, 0, 0, 1, 0, 0);
    tg.fillStyle = night ? '#0b1220' : '#6d8f4f'; tg.fillRect(0, 0, T.width, T.height);
    const cu = cam.x * ppm, cvv = cam.y * ppm;
    tg.setTransform(-sinT * k, -cosT * k, cosT * k, -sinT * k, T.width / 2 + (sinT * cu - cosT * cvv) * k, T.height + (cosT * cu + sinT * cvv) * k);
    tg.drawImage(this.ground, 0, 0);
    tg.setTransform(1, 0, 0, 1, 0, 0);
    const bottom = vp.y + vp.h;
    for (let y = Math.ceil(horizon) + 1; y < bottom; y++) {
      const f = cam.h * focal / (y - horizon);
      if (f > viewDist) continue;
      const half = f * (vp.w / 2) / focal;
      const sw = half * 2 * tScale;
      const sx = T.width / 2 - half * tScale;
      const sy = T.height - f * tScale;
      if (mirror) { g.save(); g.translate(vp.x * 2 + vp.w, 0); g.scale(-1, 1); g.drawImage(T, sx, sy, sw, 1, vp.x, y, vp.w, 1.4); g.restore(); }
      else g.drawImage(T, sx, sy, sw, 1, vp.x, y, vp.w, 1.4);
    }
    // haze near the horizon
    const haze = g.createLinearGradient(0, horizon - 2, 0, horizon + vp.h * 0.08);
    haze.addColorStop(0, night ? 'rgba(15,23,42,1)' : 'rgba(207,230,247,1)'); haze.addColorStop(1, 'rgba(207,230,247,0)');
    g.fillStyle = haze; g.fillRect(vp.x, horizon - 2, vp.w, vp.h * 0.08 + 2);

    // 3D objects
    const proj = (x, y, z) => {
      const dx = x - cam.x, dy = y - cam.y;
      const f = dx * cosT + dy * sinT, r = -dx * sinT + dy * cosT;
      return { f, r, z };
    };
    const toScreen = p => {
      const sx = vp.x + vp.w / 2 + (mirror ? -1 : 1) * p.r * focal / p.f;
      return [sx, horizon + (cam.h - p.z) * focal / p.f];
    };
    const near = 0.25;
    const polys = [];
    const addPoly = (pts3, fill, extra) => {
      const cp = pts3.map(([x, y, z]) => proj(x, y, z));
      if (cp.every(p => p.f < near)) return;
      // clip against the near plane
      const out = [];
      for (let i = 0; i < cp.length; i++) {
        const a = cp[i], b = cp[(i + 1) % cp.length];
        if (a.f >= near) out.push(a);
        if ((a.f >= near) !== (b.f >= near)) { const t = (near - a.f) / (b.f - a.f); out.push({ f: near, r: a.r + (b.r - a.r) * t, z: a.z + (b.z - a.z) * t }); }
      }
      if (out.length < 3) return;
      const depth = cp.reduce((s, p) => s + Math.max(p.f, near), 0) / cp.length;
      if (depth > viewDist) return;
      polys.push({ depth, pts: out.map(toScreen), fill, extra });
    };
    const camPos = [cam.x, cam.y];
    const inView = (x, y, rad) => { const p = proj(x, y, 0); return p.f > -rad && p.f < viewDist + rad && Math.abs(p.r) < p.f * 1.1 + rad + 4; };
    const box = (cx, cy, th, len, wid, z0, z1, color, opts = {}) => {
      const pts = corners(cx, cy, th, len, wid);
      for (let i = 0; i < 4; i++) {
        const a = pts[i], b = pts[(i + 1) % 4];
        const nx = a[1] - b[1], ny = b[0] - a[0];
        const vis = (camPos[0] - a[0]) * nx + (camPos[1] - a[1]) * ny;
        if (vis <= 0) continue;
        const light = 0.55 + 0.45 * Math.max(0, (nx * 0.6 - ny * 0.8) / Math.hypot(nx, ny));
        addPoly([[a[0], a[1], z0], [b[0], b[1], z0], [b[0], b[1], z1], [a[0], a[1], z1]], shade(color, (light - 1) * (night ? 1.4 : 0.9)), opts.face?.(i, a, b));
      }
      if (cam.h > z1 || opts.top) addPoly(pts.map(([x, y]) => [x, y, z1]), shade(color, night ? -0.6 : 0.05));
    };
    const carBox = (o, isPlayer) => {
      if (!inView(o.x, o.y, 4)) return;
      box(o.x, o.y, o.th, o.len, o.wid * 0.94, 0, 0.32, '#111111');
      box(o.x, o.y, o.th, o.len, o.wid, 0.3, 0.95, o.color, {
        face: (i, a, b) => (i === 2 ? { tail: [a, b], braking: o.braking } : i === 0 ? { head: [a, b] } : null)
      });
      const cx = o.x - Math.cos(o.th) * 0.25, cy = o.y - Math.sin(o.th) * 0.25;
      box(cx, cy, o.th, o.len * 0.52, o.wid * 0.86, 0.95, 1.45, '#1e293b', { top: true });
      void isPlayer;
    };
    this.world.buildings.forEach(b => {
      const cx = (b.x0 + b.x1) / 2, cy = (b.y0 + b.y1) / 2;
      if (!inView(cx, cy, Math.max(b.x1 - b.x0, b.y1 - b.y0))) return;
      box(cx, cy, 0, b.x1 - b.x0, b.y1 - b.y0, 0, b.h, b.color, { face: (i, a, bb) => ({ windows: [a, bb], h: b.h }) });
    });
    this.world.parked.forEach(o => carBox(o));
    this.ai.forEach(o => carBox(o));
    if (this.view === 'chase') carBox(this.car, true);

    // billboards
    const bills = [];
    const addBill = (x, y, draw) => { const p = proj(x, y, 0); if (p.f < 0.8 || p.f > viewDist) return; if (Math.abs(p.r) > p.f * 1.2 + 3) return; bills.push({ depth: p.f, p, draw }); };
    this.world.sprites.forEach(sp => {
      if (sp.kind === 'sign' || sp.kind === 'light') {
        // only signs facing the camera are drawn with their face
        const facing = sp.facing ? (sp.facing[0] * cosT + sp.facing[1] * sinT) : 1;
        addBill(sp.x, sp.y, (p, sc) => this.drawPost(g, sp, p, sc, facing, toScreen));
      } else addBill(sp.x, sp.y, (p, sc) => this.drawTreeLamp(g, sp, p, sc, toScreen));
    });
    this.pedestrians.forEach(pd => addBill(pd.x, pd.y, (p, sc) => this.drawPed(g, pd, p, sc, toScreen)));

    const all = [...polys.map(p => ({ depth: p.depth, poly: p })), ...bills.map(b => ({ depth: b.depth, bill: b }))].sort((a, b) => b.depth - a.depth);
    all.forEach(item => {
      if (item.poly) {
        const P = item.poly;
        g.fillStyle = P.fill;
        g.beginPath(); P.pts.forEach(([x, y], i) => (i ? g.lineTo(x, y) : g.moveTo(x, y))); g.closePath(); g.fill();
        if (P.depth < 120) { g.strokeStyle = 'rgba(0,0,0,.18)'; g.lineWidth = 1; g.stroke(); }
        if (P.extra?.windows && P.depth < 80) this.drawWindows(g, P.extra, proj, toScreen, near);
        if (P.extra?.tail) this.drawCarLights(g, P.extra.tail, P.extra.braking, '#ef4444', proj, toScreen, near);
        if (P.extra?.head && night) this.drawCarLights(g, P.extra.head, false, '#fef9c3', proj, toScreen, near);
      } else {
        const b = item.bill;
        b.draw(b.p, focal / b.p.f);
      }
    });

    if (night && !mirror) {
      g.fillStyle = 'rgba(2,6,23,.35)'; g.fillRect(vp.x, vp.y, vp.w, vp.h);
      if (this.car.lights) {
        const grd = g.createRadialGradient(vp.x + vp.w / 2, bottom, 10, vp.x + vp.w / 2, horizon + vp.h * 0.1, vp.h * 0.7);
        grd.addColorStop(0, 'rgba(255,248,200,.35)'); grd.addColorStop(1, 'rgba(255,248,200,0)');
        g.fillStyle = grd; g.fillRect(vp.x, horizon, vp.w, bottom - horizon);
      } else { g.fillStyle = 'rgba(0,0,0,.45)'; g.fillRect(vp.x, horizon, vp.w, bottom - horizon); }
    }
    g.restore();
    if (!mirror && this.view === 'cockpit') this.drawCockpit(g, W, H);
  }

  drawWindows(g, ex, proj, toScreen, near) {
    const [a, b] = ex.windows;
    const len = Math.hypot(b[0] - a[0], b[1] - a[1]);
    const floors = Math.floor(ex.h / 3);
    const cols = Math.max(1, Math.floor(len / 3.4));
    const lit = this.night;
    for (let fl = 0; fl < floors; fl++) {
      const z0 = fl * 3 + (fl === 0 ? 0.9 : 1), z1 = z0 + 1.4;
      for (let cI = 0; cI < cols; cI++) {
        const t0 = (cI + 0.25) / cols, t1 = (cI + 0.75) / cols;
        const p = [[t0, z0], [t1, z0], [t1, z1], [t0, z1]].map(([t, z]) => proj(a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, z));
        if (p.some(q => q.f < near)) continue;
        const sp = p.map(toScreen);
        const on = lit && ((fl * 7 + cI * 13) % 5 < 2);
        g.fillStyle = on ? 'rgba(253,224,71,.85)' : fl === 0 && cI % 3 === 1 ? 'rgba(60,40,30,.75)' : 'rgba(40,70,100,.55)';
        g.beginPath(); sp.forEach(([x, y], i) => (i ? g.lineTo(x, y) : g.moveTo(x, y))); g.closePath(); g.fill();
      }
    }
  }

  drawCarLights(g, [a, b], braking, col, proj, toScreen, near) {
    [[0.08, 0.26], [0.74, 0.92]].forEach(([t0, t1]) => {
      const p = [[t0, 0.62], [t1, 0.62], [t1, 0.82], [t0, 0.82]].map(([t, z]) => proj(a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, z));
      if (p.some(q => q.f < near)) return;
      const sp = p.map(toScreen);
      g.fillStyle = braking ? '#ff1f1f' : col === '#ef4444' ? '#991b1b' : col;
      g.beginPath(); sp.forEach(([x, y], i) => (i ? g.lineTo(x, y) : g.moveTo(x, y))); g.closePath(); g.fill();
      if (braking || this.night) { g.shadowColor = col; g.shadowBlur = 12; g.fill(); g.shadowBlur = 0; }
    });
  }

  drawPost(g, sp, p, sc, facing, toScreen) {
    const [bx, by] = toScreen({ f: p.f, r: p.r, z: 0 });
    const [, ty] = toScreen({ f: p.f, r: p.r, z: sp.kind === 'light' ? 3.1 : 2.3 });
    g.strokeStyle = '#6b7280'; g.lineWidth = Math.max(1, 0.08 * sc);
    g.beginPath(); g.moveTo(bx, by); g.lineTo(bx, ty); g.stroke();
    if (sp.kind === 'light') {
      const w = 0.32 * sc, h = 0.95 * sc;
      g.fillStyle = '#111827'; g.fillRect(bx - w / 2, ty - h, w, h);
      if (facing > 0.3) {
        const st = this.lightState?.[sp.axis] || 'red';
        ['red', 'yellow', 'green'].forEach((col, i) => {
          const on = st === col;
          g.fillStyle = on ? { red: '#ff3b30', yellow: '#ffcc00', green: '#34c759' }[col] : '#2b2b2b';
          g.beginPath(); g.arc(bx, ty - h + h * (0.18 + i * 0.32), w * 0.32, 0, Math.PI * 2); g.fill();
          if (on) { g.shadowColor = g.fillStyle; g.shadowBlur = 14; g.fill(); g.shadowBlur = 0; }
        });
      }
      return;
    }
    const img = this.images[sp.sign];
    const s = 0.72 * sc;
    if (facing > 0.2 && img && img.complete) g.drawImage(img, bx - s / 2, ty - s, s, s);
    else { g.fillStyle = '#9ca3af'; g.fillRect(bx - s * 0.05, ty - s, s * 0.1, s); }
  }

  drawTreeLamp(g, sp, p, sc, toScreen) {
    const [bx, by] = toScreen({ f: p.f, r: p.r, z: 0 });
    if (sp.kind === 'tree') {
      const [, ty] = toScreen({ f: p.f, r: p.r, z: sp.h });
      g.fillStyle = '#5b3a1e'; g.fillRect(bx - 0.15 * sc, by - (by - ty) * 0.45, 0.3 * sc, (by - ty) * 0.45);
      const rad = sp.h * 0.33 * sc;
      const gr = g.createRadialGradient(bx - rad * 0.3, ty + rad * 0.8, rad * 0.2, bx, ty + rad, rad);
      gr.addColorStop(0, this.night ? '#1e3a2a' : '#6fae4f'); gr.addColorStop(1, this.night ? '#0b1f14' : '#2f6b2a');
      g.fillStyle = gr; g.beginPath(); g.arc(bx, ty + rad, rad, 0, Math.PI * 2); g.fill();
    } else {
      const [, ty] = toScreen({ f: p.f, r: p.r, z: 6 });
      g.strokeStyle = '#4b5563'; g.lineWidth = Math.max(1, 0.1 * sc);
      g.beginPath(); g.moveTo(bx, by); g.lineTo(bx, ty); g.lineTo(bx + 0.6 * sc * (this.side), ty); g.stroke();
      g.fillStyle = this.night ? '#fde68a' : '#9ca3af';
      g.fillRect(bx + 0.4 * sc * this.side - 0.2 * sc, ty, 0.4 * sc, 0.15 * sc);
      if (this.night) { g.fillStyle = 'rgba(253,230,138,.12)'; g.beginPath(); g.arc(bx, by, 3 * sc, 0, Math.PI * 2); g.fill(); }
    }
  }

  drawPed(g, pd, p, sc, toScreen) {
    const [bx, by] = toScreen({ f: p.f, r: p.r, z: 0 });
    const h = 1.72 * sc;
    const sw = Math.sin(pd.phase || 0) * 0.18 * sc;
    g.strokeStyle = '#1f2937'; g.lineWidth = Math.max(1.5, 0.12 * sc); g.lineCap = 'round';
    g.beginPath(); g.moveTo(bx, by - h * 0.48); g.lineTo(bx - sw, by); g.moveTo(bx, by - h * 0.48); g.lineTo(bx + sw, by); g.stroke();
    g.fillStyle = pd.color; g.fillRect(bx - 0.22 * sc, by - h * 0.84, 0.44 * sc, h * 0.38);
    g.fillStyle = '#f2c9a0'; g.beginPath(); g.arc(bx, by - h * 0.92, 0.12 * sc, 0, Math.PI * 2); g.fill();
  }

  drawCockpit(g, W, H) {
    const c = this.car;
    const s = this.side;
    // dashboard
    const dh = H * 0.27;
    g.fillStyle = '#111318';
    g.beginPath(); g.moveTo(0, H - dh); g.quadraticCurveTo(W / 2, H - dh - H * 0.05, W, H - dh); g.lineTo(W, H); g.lineTo(0, H); g.fill();
    g.fillStyle = 'rgba(255,255,255,.04)'; g.fillRect(0, H - dh, W, 3);
    // A-pillars
    g.fillStyle = '#0b0d12';
    g.beginPath(); g.moveTo(0, 0); g.lineTo(W * 0.06, 0); g.lineTo(W * 0.02, H - dh); g.lineTo(0, H - dh); g.fill();
    g.beginPath(); g.moveTo(W, 0); g.lineTo(W * 0.94, 0); g.lineTo(W * 0.98, H - dh); g.lineTo(W, H - dh); g.fill();
    // rear-view mirror with live view behind the car
    const mw = W * 0.26, mh = H * 0.11, mx = W / 2 - mw / 2, my = H * 0.025;
    g.fillStyle = '#111'; g.beginPath(); g.roundRect(mx - 6, my - 6, mw + 12, mh + 12, 12); g.fill();
    const back = { x: c.x - Math.cos(c.th) * 1.6, y: c.y - Math.sin(c.th) * 1.6, h: 1.3, th: wrap(c.th + Math.PI), horizon: 0.45 };
    this.render3D(g, W, H, back, { x: mx, y: my, w: mw, h: mh }, true);
    // steering wheel (driver side)
    const wx = W / 2 + s * -W * 0.2, wy = H - dh * 0.15, wr = Math.min(W * 0.17, H * 0.3);
    g.save(); g.translate(wx, wy); g.rotate(c.delta * 7);
    g.strokeStyle = '#1f2229'; g.lineWidth = wr * 0.16; g.beginPath(); g.arc(0, 0, wr, Math.PI * 1.02, Math.PI * 1.98); g.stroke();
    g.strokeStyle = '#2b2f38'; g.lineWidth = wr * 0.1; g.beginPath(); g.moveTo(-wr * 0.95, -wr * 0.15); g.lineTo(0, 0); g.lineTo(wr * 0.95, -wr * 0.15); g.stroke();
    g.fillStyle = '#2b2f38'; g.beginPath(); g.arc(0, 0, wr * 0.24, 0, Math.PI * 2); g.fill();
    g.fillStyle = '#94a3b8'; g.font = `${Math.round(wr * 0.12)}px system-ui`; g.textAlign = 'center'; g.fillText('◆', 0, wr * 0.05);
    g.restore();
    // speedometer
    const cx = W / 2 + s * W * 0.06, cy = H - dh * 0.45, r = Math.min(W * 0.075, dh * 0.42);
    const unitMax = this.mph ? 120 : 200;
    const val = Math.abs(c.v) * (this.mph ? 2.237 : 3.6);
    g.fillStyle = '#05070a'; g.beginPath(); g.arc(cx, cy, r * 1.08, 0, Math.PI * 2); g.fill();
    g.strokeStyle = '#334155'; g.lineWidth = 2; g.beginPath(); g.arc(cx, cy, r, Math.PI * 0.75, Math.PI * 2.25); g.stroke();
    for (let v = 0; v <= unitMax; v += this.mph ? 10 : 20) {
      const a = Math.PI * 0.75 + (v / unitMax) * Math.PI * 1.5;
      g.strokeStyle = '#94a3b8'; g.beginPath(); g.moveTo(cx + Math.cos(a) * r * 0.82, cy + Math.sin(a) * r * 0.82); g.lineTo(cx + Math.cos(a) * r * 0.96, cy + Math.sin(a) * r * 0.96); g.stroke();
      g.fillStyle = '#cbd5e1'; g.font = `${Math.round(r * 0.14)}px system-ui`; g.textAlign = 'center'; g.textBaseline = 'middle';
      g.fillText(v, cx + Math.cos(a) * r * 0.66, cy + Math.sin(a) * r * 0.66);
    }
    const a = Math.PI * 0.75 + Math.min(1, val / unitMax) * Math.PI * 1.5;
    g.strokeStyle = '#ef4444'; g.lineWidth = 3; g.beginPath(); g.moveTo(cx, cy); g.lineTo(cx + Math.cos(a) * r * 0.9, cy + Math.sin(a) * r * 0.9); g.stroke();
    g.fillStyle = '#fff'; g.font = `bold ${Math.round(r * 0.3)}px system-ui`; g.fillText(Math.round(val), cx, cy + r * 0.45);
    g.font = `${Math.round(r * 0.13)}px system-ui`; g.fillStyle = '#94a3b8'; g.fillText(this.mph ? 'mph' : 'km/h', cx, cy + r * 0.68);
    // gear + telltales
    const ix = cx + s * r * 2.1;
    g.fillStyle = '#0b1220'; g.beginPath(); g.roundRect(ix - r * 0.8, cy - r * 0.7, r * 1.6, r * 1.4, 10); g.fill();
    g.fillStyle = '#e2e8f0'; g.font = `bold ${Math.round(r * 0.5)}px system-ui`; g.fillText(c.gear, ix, cy - r * 0.15);
    const tt = [[!c.belt, '#ef4444', '🔔'], [c.handbrake, '#ef4444', '(P)'], [c.lights, '#22c55e', '◐'], [c.blinker === 'left' || c.blinker === 'hazard', '#22c55e', '◀'], [c.blinker === 'right' || c.blinker === 'hazard', '#22c55e', '▶']];
    const on = Math.floor(this.time * 2.6) % 2 === 0;
    g.font = `${Math.round(r * 0.2)}px system-ui`;
    tt.forEach(([active, col, sym], i) => {
      const blink = sym === '◀' || sym === '▶';
      g.fillStyle = active && (!blink || on) ? col : '#334155';
      g.fillText(sym, ix - r * 0.6 + i * r * 0.3, cy + r * 0.42);
    });
  }

  renderTop(g, W, H) {
    const c = this.car;
    const zoom = Math.min(W, H) / 46; // pixels per metre
    g.fillStyle = '#1f2937'; g.fillRect(0, 0, W, H);
    g.save();
    g.translate(W / 2, H / 2);
    g.scale(zoom / this.ppm, zoom / this.ppm);
    g.translate(-c.x * this.ppm, -c.y * this.ppm);
    g.imageSmoothingEnabled = true;
    g.drawImage(this.ground, 0, 0);
    g.restore();
    const toS = (x, y) => [W / 2 + (x - c.x) * zoom, H / 2 + (y - c.y) * zoom];
    const drawCar = (o, highlight) => {
      const [x, y] = toS(o.x, o.y);
      g.save(); g.translate(x, y); g.rotate(o.th);
      g.fillStyle = 'rgba(0,0,0,.35)'; g.fillRect(-o.len / 2 * zoom + 2, -o.wid / 2 * zoom + 2, o.len * zoom, o.wid * zoom);
      g.fillStyle = o.color; g.beginPath(); g.roundRect(-o.len / 2 * zoom, -o.wid / 2 * zoom, o.len * zoom, o.wid * zoom, 0.4 * zoom); g.fill();
      g.fillStyle = 'rgba(30,41,59,.85)'; g.fillRect(-0.2 * zoom, -o.wid * 0.4 * zoom, 1.5 * zoom, o.wid * 0.8 * zoom);
      g.fillStyle = 'rgba(30,41,59,.6)'; g.fillRect(-1.6 * zoom, -o.wid * 0.38 * zoom, 0.8 * zoom, o.wid * 0.76 * zoom);
      if (o.braking) { g.fillStyle = '#ff2d2d'; g.fillRect(-o.len / 2 * zoom, -o.wid / 2 * zoom, 0.15 * zoom, 0.4 * zoom); g.fillRect(-o.len / 2 * zoom, o.wid / 2 * zoom - 0.4 * zoom, 0.15 * zoom, 0.4 * zoom); }
      if (highlight) {
        const blinkOn = Math.floor(this.time * 2.6) % 2 === 0;
        g.fillStyle = '#fbbf24';
        if (blinkOn && (c.blinker === 'left' || c.blinker === 'hazard')) { g.fillRect(o.len / 2 * zoom - 0.3 * zoom, -o.wid / 2 * zoom, 0.3 * zoom, 0.3 * zoom); g.fillRect(-o.len / 2 * zoom, -o.wid / 2 * zoom, 0.3 * zoom, 0.3 * zoom); }
        if (blinkOn && (c.blinker === 'right' || c.blinker === 'hazard')) { g.fillRect(o.len / 2 * zoom - 0.3 * zoom, o.wid / 2 * zoom - 0.3 * zoom, 0.3 * zoom, 0.3 * zoom); g.fillRect(-o.len / 2 * zoom, o.wid / 2 * zoom - 0.3 * zoom, 0.3 * zoom, 0.3 * zoom); }
        g.strokeStyle = '#fff'; g.lineWidth = 2; g.strokeRect(-o.len / 2 * zoom, -o.wid / 2 * zoom, o.len * zoom, o.wid * zoom);
        g.fillStyle = '#fff'; g.beginPath(); g.moveTo(o.len / 2 * zoom + 6, 0); g.lineTo(o.len / 2 * zoom - 2, -5); g.lineTo(o.len / 2 * zoom - 2, 5); g.fill();
      }
      g.restore();
    };
    this.world.parked.forEach(o => drawCar(o));
    this.ai.forEach(o => drawCar(o));
    drawCar(c, true);
    this.pedestrians.forEach(p => { const [x, y] = toS(p.x, p.y); g.fillStyle = p.color; g.beginPath(); g.arc(x, y, 0.35 * zoom, 0, Math.PI * 2); g.fill(); g.fillStyle = '#f2c9a0'; g.beginPath(); g.arc(x, y, 0.18 * zoom, 0, Math.PI * 2); g.fill(); });
    this.world.sprites.filter(s => s.kind === 'light').forEach(sp => {
      const [x, y] = toS(sp.x, sp.y);
      const st = this.lightState?.[sp.axis] || 'red';
      g.fillStyle = '#111'; g.fillRect(x - 5, y - 5, 10, 10);
      g.fillStyle = { red: '#ff3b30', yellow: '#ffcc00', green: '#34c759' }[st]; g.beginPath(); g.arc(x, y, 4, 0, Math.PI * 2); g.fill();
    });
    this.world.sprites.filter(s => s.kind === 'sign').forEach(sp => {
      const [x, y] = toS(sp.x, sp.y);
      if (x < -20 || y < -20 || x > W + 20 || y > H + 20) return;
      const img = this.images[sp.sign]; const sz = 1.1 * zoom;
      if (img?.complete) g.drawImage(img, x - sz / 2, y - sz / 2, sz, sz);
    });
    // parking sensor arcs
    if (this.parkTarget && c.gear === 'R') {
      const dist = this.nearestObstacle();
      const col = dist < 0.5 ? '#ef4444' : dist < 1 ? '#f59e0b' : '#22c55e';
      const [x, y] = toS(c.x - Math.cos(c.th) * c.len / 2, c.y - Math.sin(c.th) * c.len / 2);
      g.strokeStyle = col; g.lineWidth = 3;
      for (let i = 1; i <= 3; i++) { if (dist < i * 0.6) { g.beginPath(); g.arc(x, y, i * 10, c.th + Math.PI - 0.6, c.th + Math.PI + 0.6); g.stroke(); } }
      g.fillStyle = col; g.font = 'bold 14px system-ui'; g.fillText(`${Math.round(Math.min(dist, 2) * 100)} cm`, x - 20, y + 30);
    }
  }

  renderHUD(g, W, H) {
    const c = this.car;
    const d = this.dpr || 1;
    // minimap
    if (this.view !== 'top') {
      const ms = Math.min(150 * d, W * 0.22), mx = W - ms - 12 * d, my = (this.view === 'cockpit' ? H * 0.17 : 12 * d);
      g.save(); g.globalAlpha = 0.92;
      g.fillStyle = '#0f172a'; g.fillRect(mx - 3, my - 3, ms + 6, ms + 6);
      g.drawImage(this.ground, mx, my, ms, ms);
      const k = ms / SIZE;
      if (this.route[this.routeIdx]) { const wp = this.route[this.routeIdx]; g.strokeStyle = '#facc15'; g.lineWidth = 2; g.beginPath(); g.arc(mx + wp.x * k, my + wp.y * k, 5 * d, 0, Math.PI * 2); g.stroke(); }
      this.ai.forEach(a => { g.fillStyle = a.color; g.fillRect(mx + a.x * k - 2, my + a.y * k - 2, 4, 4); });
      g.translate(mx + c.x * k, my + c.y * k); g.rotate(c.th);
      g.fillStyle = '#ef4444'; g.beginPath(); g.moveTo(7 * d, 0); g.lineTo(-5 * d, -4 * d); g.lineTo(-5 * d, 4 * d); g.fill();
      g.restore();
    }
    // speed limit reminder
    if (this.limit && this.view !== 'cockpit') {
      const r = 22 * d, x = 12 * d + r, y = 12 * d + r;
      g.fillStyle = '#fff'; g.beginPath(); g.arc(x, y, r, 0, Math.PI * 2); g.fill();
      g.strokeStyle = '#d0021b'; g.lineWidth = r * 0.22; g.beginPath(); g.arc(x, y, r * 0.86, 0, Math.PI * 2); g.stroke();
      g.fillStyle = '#111'; g.font = `bold ${Math.round(r * 0.8)}px Arial`; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(this.limit, x, y + 1);
      g.fillStyle = 'rgba(15,23,42,.75)'; g.beginPath(); g.roundRect(x - r, y + r + 6 * d, r * 2, 22 * d, 6); g.fill();
      g.fillStyle = '#fff'; g.font = `bold ${Math.round(13 * d)}px system-ui`; g.fillText(`${Math.round(Math.abs(c.v) * (this.mph ? 2.237 : 3.6))}`, x, y + r + 17 * d);
    }
    if (this.flashT > 0) { g.fillStyle = `rgba(255,255,255,${this.flashT})`; g.font = `${Math.round(42 * d)}px system-ui`; g.textAlign = 'center'; g.fillText(this.flashTxt, W / 2, H * 0.3); }
  }
}
