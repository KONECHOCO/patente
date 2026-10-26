// City map for the driving simulator (metres, x → east, y → south).
// `side` = +1 for right-hand traffic, -1 for left-hand traffic (UK).

export const GRID = [60, 180, 300];
export const HALF = 3.5;        // half carriageway (one lane)
export const WALK = 2.5;        // pavement width
export const SIZE = 360;
export const RB = { x: 300, y: 300, island: 8.5, outer: 15.5 };

export const INTERSECTIONS = [
  { id: 'a', x: 60, y: 60, type: 'right' },
  { id: 'b', x: 180, y: 60, type: 'major-h', minor: 'yield' },
  { id: 'c', x: 300, y: 60, type: 'right' },
  { id: 'd', x: 60, y: 180, type: 'major-h', minor: 'stop' },
  { id: 'e', x: 180, y: 180, type: 'lights' },
  { id: 'f', x: 300, y: 180, type: 'major-v', minor: 'yield' },
  { id: 'g', x: 60, y: 300, type: 'right' },
  { id: 'h', x: 180, y: 300, type: 'right' },
  { id: 'rb', x: 300, y: 300, type: 'roundabout' }
];

export function buildWorld(side = 1) {
  const asphalt = [];
  const walks = [];
  // Roads (cut around the roundabout).
  GRID.forEach(Y => {
    const spans = Y === RB.y ? [[0, RB.x - RB.outer + 1], [RB.x + RB.outer - 1, SIZE]] : [[0, SIZE]];
    spans.forEach(([a, b]) => { asphalt.push([a, Y - HALF, b, Y + HALF]); walks.push([a, Y - HALF - WALK, b, Y + HALF + WALK]); });
  });
  GRID.forEach(X => {
    const spans = X === RB.x ? [[0, RB.y - RB.outer + 1], [RB.y + RB.outer - 1, SIZE]] : [[0, SIZE]];
    spans.forEach(([a, b]) => { asphalt.push([X - HALF, a, X + HALF, b]); walks.push([X - HALF - WALK, a, X + HALF + WALK, b]); });
  });

  // Parallel parking lane on the y=60 road, on the kerb side of eastbound traffic.
  const py0 = 60 + side * HALF, py1 = 60 + side * (HALF + 2.3);
  const parkLane = [200, Math.min(py0, py1), 284, Math.max(py0, py1)];
  asphalt.push(parkLane);
  const bays = [];
  for (let i = 0; i < 14; i++) bays.push({ x0: 200 + i * 6, x1: 206 + i * 6, y0: parkLane[1], y1: parkLane[3] });
  const freeBay = 6;

  // Car park with perpendicular bays, entered from the y=180 road.
  const lot = [200, 186, 282, 222];
  asphalt.push(lot);
  asphalt.push([238, 180 + HALF - 0.5, 248, 186.5]);
  const lotBays = [];
  for (let i = 0; i < 30; i++) lotBays.push({ x0: 205 + i * 2.5, x1: 207.5 + i * 2.5, y0: 209, y1: 214.5 });
  const freeLotBay = 14;

  // Buildings fill block interiors, leaving the park and the car park free.
  const buildings = [];
  const bands = [[0, 60], [60, 180], [180, 300], [300, SIZE]];
  const palette = ['#d6c3a5', '#c9a98a', '#e2d6c2', '#b7a08a', '#cfc8bd', '#a9b4c2', '#d9b9a0', '#bfae95'];
  let seed = 7;
  const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  bands.forEach(([bx0, bx1], i) => bands.forEach(([by0, by1], j) => {
    const x0 = bx0 + (i === 0 ? 0 : HALF + WALK + 1.5), x1 = bx1 - (i === 3 ? 0 : HALF + WALK + 1.5);
    const y0 = by0 + (j === 0 ? 0 : HALF + WALK + 1.5), y1 = by1 - (j === 3 ? 0 : HALF + WALK + 1.5);
    const isPark = i === 1 && j === 2;
    if (isPark) return;
    const isLot = i === 2 && j === 2;
    const isRb = i === 2 && j === 2 || (i === 3 && j === 3) || (i === 2 && j === 3) || (i === 3 && j === 2);
    const depth = 13;
    const rows = [[y0, Math.min(y0 + depth, y1)], [Math.max(y1 - depth, y0), y1]];
    rows.forEach(([ry0, ry1], k) => {
      if (isLot && k === 0) return;
      let x = x0;
      while (x < x1 - 6) {
        const w = Math.min(x1 - x, 14 + rnd() * 14);
        const clear = isRb && Math.hypot(x + w / 2 - RB.x, (ry0 + ry1) / 2 - RB.y) < RB.outer + 14;
        if (!clear && w > 6) buildings.push({ x0: x, y0: ry0, x1: x + w, y1: ry1, h: 8 + Math.round(rnd() * 5) * 3, color: palette[Math.floor(rnd() * palette.length)] });
        x += w + 3 + rnd() * 3;
      }
    });
    // side buildings to close the block
    if (y1 - y0 > 2 * depth + 10) {
      [[x0, Math.min(x0 + depth, x1)], [Math.max(x1 - depth, x0), x1]].forEach(([cx0, cx1]) => {
        if (isLot) return;
        buildings.push({ x0: cx0, y0: y0 + depth + 4, x1: cx1, y1: y1 - depth - 4, h: 9 + Math.round(rnd() * 3) * 3, color: palette[Math.floor(rnd() * palette.length)] });
      });
    }
  }));

  // Static sprites: trees, lamps, signs, traffic lights.
  const sprites = [];
  for (let i = 0; i < 26; i++) sprites.push({ kind: 'tree', x: 72 + rnd() * 96, y: 192 + rnd() * 96, h: 6 + rnd() * 4 });
  for (let a = 0; a < 7; a++) sprites.push({ kind: 'tree', x: RB.x + Math.cos(a) * 4, y: RB.y + Math.sin(a) * 4, h: 4 + rnd() * 2 });
  GRID.forEach(Y => { for (let x = 15; x < SIZE; x += 32) { if (GRID.some(X => Math.abs(X - x) < 10)) continue; sprites.push({ kind: 'lamp', x, y: Y - side * (HALF + 1.2) }); } });

  const signAt = (inter, dir, type) => {
    // dir: travel direction into the junction (unit vector); sign stands on the kerb side, before the stop line.
    const rx = -dir[1] * side, ry = dir[0] * side;
    const back = inter.type === 'roundabout' ? RB.outer + 5 : HALF + 6;
    const cx = inter.x - dir[0] * back, cy = inter.y - dir[1] * back;
    sprites.push({ kind: 'sign', sign: type, x: cx + rx * (HALF + 1.1), y: cy + ry * (HALF + 1.1), facing: dir });
  };
  const DIRS = { fromN: [0, 1], fromS: [0, -1], fromW: [1, 0], fromE: [-1, 0] };
  INTERSECTIONS.forEach(it => {
    if (it.type === 'major-h') {
      signAt(it, DIRS.fromN, it.minor); signAt(it, DIRS.fromS, it.minor);
      signAt(it, DIRS.fromW, 'priority'); signAt(it, DIRS.fromE, 'priority');
    } else if (it.type === 'major-v') {
      signAt(it, DIRS.fromW, it.minor); signAt(it, DIRS.fromE, it.minor);
      signAt(it, DIRS.fromN, 'priority'); signAt(it, DIRS.fromS, 'priority');
    } else if (it.type === 'right') {
      Object.values(DIRS).forEach(d => signAt(it, d, 'crossroads'));
    } else if (it.type === 'roundabout') {
      Object.values(DIRS).forEach(d => { signAt(it, d, 'yield'); });
    } else if (it.type === 'lights') {
      Object.entries(DIRS).forEach(([k, d]) => {
        const rx = -d[1] * side, ry = d[0] * side;
        sprites.push({ kind: 'light', axis: k === 'fromN' || k === 'fromS' ? 'NS' : 'EW', x: it.x - d[0] * (HALF + 1.2) + rx * (HALF + 0.9), y: it.y - d[1] * (HALF + 1.2) + ry * (HALF + 0.9), facing: d });
      });
    }
  });
  // Speed limits, zebra warnings, 30 zone near the park (school), parking signs.
  sprites.push({ kind: 'sign', sign: 'speed50', x: 20, y: 60 + side * (HALF + 1.1), facing: [1, 0] });
  sprites.push({ kind: 'sign', sign: 'speed30', x: 70, y: 300 + side * (HALF + 1.1), facing: [1, 0] });
  sprites.push({ kind: 'sign', sign: 'children', x: 66, y: 300 + side * (HALF + 1.1), facing: [1, 0] });
  sprites.push({ kind: 'sign', sign: 'end30', x: 168, y: 300 + side * (HALF + 1.1), facing: [1, 0] });
  sprites.push({ kind: 'sign', sign: 'pedestrianAhead', x: 95, y: 60 + side * (HALF + 1.1), facing: [1, 0] });
  sprites.push({ kind: 'sign', sign: 'crossing', x: 117, y: 60 + side * (HALF + 1.1), facing: [1, 0] });
  sprites.push({ kind: 'sign', sign: 'parking', x: 197, y: 60 + side * (HALF + 3.4), facing: [1, 0] });
  sprites.push({ kind: 'sign', sign: 'parking', x: 236, y: 186.5, facing: [0, 1] });

  const zone30 = [60, 300 - HALF, 180, 300 + HALF];
  const crossings = [
    { x: 120, y: 60, axis: 'H' },  // across the y=60 road
    { x: 180, y: 240, axis: 'V' }  // across the x=180 road
  ];

  // Parked cars in bays except the free ones.
  const parked = [];
  const colors = ['#ef4444', '#3b82f6', '#e5e7eb', '#111827', '#f59e0b', '#10b981', '#6b7280', '#8b5cf6'];
  bays.forEach((b, i) => { if (![freeBay, freeBay + 1, 1, 12].includes(i)) parked.push({ x: (b.x0 + b.x1) / 2, y: (b.y0 + b.y1) / 2 - side * 0.0, th: 0, color: colors[i % colors.length], len: 4.2, wid: 1.8 }); });
  lotBays.forEach((b, i) => { if (i !== freeLotBay && i % 7 !== 2) parked.push({ x: (b.x0 + b.x1) / 2, y: (b.y0 + b.y1) / 2, th: -Math.PI / 2, color: colors[(i * 3) % colors.length], len: 4.2, wid: 1.8 }); });

  return { side, asphalt, walks, buildings, sprites, bays, freeBay, lot, lotBays, freeLotBay, parkLane, zone30, crossings, parked };
}

// Surface lookup used by collision and rule checks.
export function surfaceAt(world, x, y) {
  if (x < 0 || y < 0 || x > SIZE || y > SIZE) return 'out';
  const dr = Math.hypot(x - RB.x, y - RB.y);
  if (dr < RB.island) return 'island';
  if (dr < RB.outer) return 'road';
  for (const r of world.asphalt) if (x >= r[0] && x <= r[2] && y >= r[1] && y <= r[3]) return 'road';
  for (const b of world.buildings) if (x >= b.x0 && x <= b.x1 && y >= b.y0 && y <= b.y1) return 'building';
  for (const r of world.walks) if (x >= r[0] && x <= r[2] && y >= r[1] && y <= r[3]) return 'walk';
  if (dr < RB.outer + WALK) return 'walk';
  return 'grass';
}

// Ground texture painted once per world (pixels per metre = ppm).
export function paintGround(world, ppm = 4) {
  const cv = document.createElement('canvas');
  cv.width = cv.height = SIZE * ppm;
  const g = cv.getContext('2d');
  g.scale(ppm, ppm);
  // grass
  g.fillStyle = '#6d8f4f'; g.fillRect(0, 0, SIZE, SIZE);
  let seed = 3;
  const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  for (let i = 0; i < 9000; i++) { g.fillStyle = rnd() < 0.5 ? 'rgba(90,125,60,.5)' : 'rgba(130,160,90,.35)'; g.fillRect(rnd() * SIZE, rnd() * SIZE, 0.6, 0.6); }
  // pavements
  g.fillStyle = '#b9b6ae';
  world.walks.forEach(r => g.fillRect(r[0], r[1], r[2] - r[0], r[3] - r[1]));
  g.beginPath(); g.arc(RB.x, RB.y, RB.outer + WALK, 0, Math.PI * 2); g.fill();
  // paving joints
  g.strokeStyle = 'rgba(0,0,0,.06)'; g.lineWidth = 0.05;
  world.walks.forEach(r => { for (let x = r[0]; x < r[2]; x += 1) { g.beginPath(); g.moveTo(x, r[1]); g.lineTo(x, r[3]); g.stroke(); } });
  // asphalt
  g.fillStyle = '#3e4147';
  world.asphalt.forEach(r => g.fillRect(r[0], r[1], r[2] - r[0], r[3] - r[1]));
  g.beginPath(); g.arc(RB.x, RB.y, RB.outer, 0, Math.PI * 2); g.fill();
  for (let i = 0; i < 26000; i++) { g.fillStyle = rnd() < 0.5 ? 'rgba(255,255,255,.035)' : 'rgba(0,0,0,.07)'; g.fillRect(rnd() * SIZE, rnd() * SIZE, 0.35, 0.35); }
  // kerbs
  g.strokeStyle = '#d9d6cf'; g.lineWidth = 0.25;
  world.asphalt.forEach(r => g.strokeRect(r[0], r[1], r[2] - r[0], r[3] - r[1]));
  // re-fill junction boxes so kerb lines do not cross them
  g.fillStyle = '#3e4147';
  GRID.forEach(X => GRID.forEach(Y => { if (!(X === RB.x && Y === RB.y)) g.fillRect(X - HALF, Y - HALF, HALF * 2, HALF * 2); }));
  GRID.forEach(Y => g.fillRect(0, Y - HALF + 0.13, SIZE, HALF * 2 - 0.26));
  GRID.forEach(X => g.fillRect(X - HALF + 0.13, 0, HALF * 2 - 0.26, SIZE));
  g.fillRect(world.parkLane[0], world.parkLane[1] - 0.2, world.parkLane[2] - world.parkLane[0], world.parkLane[3] - world.parkLane[1] + 0.4);
  g.fillRect(world.lot[0], world.lot[1], world.lot[2] - world.lot[0], world.lot[3] - world.lot[1]);
  g.fillRect(238, 180 + HALF - 0.5, 10, 7);
  g.beginPath(); g.arc(RB.x, RB.y, RB.outer - 0.1, 0, Math.PI * 2); g.fill();
  // roundabout island
  g.fillStyle = '#d9d6cf'; g.beginPath(); g.arc(RB.x, RB.y, RB.island + 0.4, 0, Math.PI * 2); g.fill();
  g.fillStyle = '#5f8a46'; g.beginPath(); g.arc(RB.x, RB.y, RB.island, 0, Math.PI * 2); g.fill();
  g.strokeStyle = 'rgba(255,255,255,.9)'; g.lineWidth = 0.15; g.setLineDash([2, 2]);
  g.beginPath(); g.arc(RB.x, RB.y, (RB.island + RB.outer) / 2, 0, Math.PI * 2); g.stroke(); g.setLineDash([]);

  // centre lines: broken, continuous for 20 m before junctions
  g.fillStyle = '#f4f4f2';
  const near = v => GRID.some(G => Math.abs(G - v) < 22);
  GRID.forEach(Y => {
    for (let x = 0; x < SIZE; x += 1) {
      if (GRID.some(X => Math.abs(X - x) < HALF + 0.2)) continue;
      if (Y === RB.y && Math.abs(x - RB.x) < RB.outer + 0.5) continue;
      if (near(x) || x % 7.5 < 4.5) g.fillRect(x, Y - 0.08, 1.01, 0.16);
    }
  });
  GRID.forEach(X => {
    for (let y = 0; y < SIZE; y += 1) {
      if (GRID.some(Y => Math.abs(Y - y) < HALF + 0.2)) continue;
      if (X === RB.x && Math.abs(y - RB.y) < RB.outer + 0.5) continue;
      if (near(y) || y % 7.5 < 4.5) g.fillRect(X - 0.08, y, 0.16, 1.01);
    }
  });
  // edge lines
  g.fillStyle = 'rgba(244,244,242,.85)';
  GRID.forEach(Y => { g.fillRect(0, Y - HALF + 0.25, SIZE, 0.12); g.fillRect(0, Y + HALF - 0.37, SIZE, 0.12); });
  GRID.forEach(X => { g.fillRect(X - HALF + 0.25, 0, 0.12, SIZE); g.fillRect(X + HALF - 0.37, 0, 0.12, SIZE); });
  g.fillStyle = '#3e4147';
  GRID.forEach(X => GRID.forEach(Y => { if (!(X === RB.x && Y === RB.y)) g.fillRect(X - HALF, Y - HALF, HALF * 2, HALF * 2); }));

  // stop / give-way lines
  const side = world.side;
  const lineFor = (it, d, kind) => {
    const back = HALF + 0.4;
    const cx = it.x - d[0] * back, cy = it.y - d[1] * back;
    const rx = -d[1] * side, ry = d[0] * side;
    g.fillStyle = '#f4f4f2';
    const n = 6;
    for (let k = 0; k < n; k++) {
      const t0 = k / n * HALF, t1 = (k + 0.5) / n * HALF;
      if (kind === 'stop') {
        if (k === 0) {
          g.beginPath();
          g.moveTo(cx, cy); g.lineTo(cx + rx * HALF, cy + ry * HALF);
          g.lineTo(cx + rx * HALF - d[0] * 0.5, cy + ry * HALF - d[1] * 0.5); g.lineTo(cx - d[0] * 0.5, cy - d[1] * 0.5);
          g.fill();
        }
      } else {
        g.beginPath();
        const p0 = [cx + rx * t0, cy + ry * t0], p1 = [cx + rx * t1, cy + ry * t1];
        const tip = [(p0[0] + p1[0]) / 2 - d[0] * 0.6, (p0[1] + p1[1]) / 2 - d[1] * 0.6];
        g.moveTo(p0[0], p0[1]); g.lineTo(p1[0], p1[1]); g.lineTo(tip[0], tip[1]); g.fill();
      }
    }
    if (kind === 'stop') {
      g.save(); g.translate(cx - d[0] * 2.4 + rx * HALF / 2, cy - d[1] * 2.4 + ry * HALF / 2);
      g.rotate(Math.atan2(d[1], d[0]) + Math.PI / 2);
      g.font = 'bold 1.3px Arial'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillStyle = '#f4f4f2'; g.fillText('STOP', 0, 0); g.restore();
    }
  };
  const DIRS = { fromN: [0, 1], fromS: [0, -1], fromW: [1, 0], fromE: [-1, 0] };
  INTERSECTIONS.forEach(it => {
    if (it.type === 'major-h') { lineFor(it, DIRS.fromN, it.minor); lineFor(it, DIRS.fromS, it.minor); }
    if (it.type === 'major-v') { lineFor(it, DIRS.fromW, it.minor); lineFor(it, DIRS.fromE, it.minor); }
    if (it.type === 'lights') Object.values(DIRS).forEach(d => lineFor(it, d, 'stop'));
  });
  // roundabout give-way lines
  g.fillStyle = '#f4f4f2';
  [[0, 1], [0, -1], [1, 0], [-1, 0]].forEach(d => {
    const cx = RB.x - d[0] * RB.outer, cy = RB.y - d[1] * RB.outer;
    const rx = -d[1] * side, ry = d[0] * side;
    for (let k = 0; k < 5; k++) { const t = 0.3 + k * 0.65; g.beginPath(); g.moveTo(cx + rx * t, cy + ry * t); g.lineTo(cx + rx * (t + 0.35), cy + ry * (t + 0.35)); g.lineTo(cx + rx * (t + 0.17) - d[0] * 0.55, cy + ry * (t + 0.17) - d[1] * 0.55); g.fill(); }
  });

  // zebra crossings
  world.crossings.forEach(cr => {
    g.fillStyle = '#f4f4f2';
    for (let k = -3; k < 3.5; k += 1) {
      if (cr.axis === 'H') g.fillRect(cr.x - 2, cr.y + k - 0.25, 4, 0.5);
      else g.fillRect(cr.x + k - 0.25, cr.y - 2, 0.5, 4);
    }
  });
  // 30 zone marking
  g.save(); g.translate(75, 300 + side * 1.75); g.rotate(Math.PI / 2); g.font = 'bold 2.4px Arial'; g.textAlign = 'center'; g.fillStyle = '#f4f4f2'; g.fillText('30', 0, 0.8); g.restore();
  // parking bays
  g.strokeStyle = '#f4f4f2'; g.lineWidth = 0.12;
  world.bays.forEach(b => g.strokeRect(b.x0, b.y0, b.x1 - b.x0, b.y1 - b.y0));
  world.lotBays.forEach(b => { g.beginPath(); g.moveTo(b.x0, b.y0); g.lineTo(b.x0, b.y1); g.lineTo(b.x1, b.y1); g.lineTo(b.x1, b.y0); g.stroke(); });
  const fb = world.lotBays[world.freeLotBay];
  g.fillStyle = 'rgba(250,204,21,.25)'; g.fillRect(fb.x0, fb.y0, fb.x1 - fb.x0, fb.y1 - fb.y0);
  const pb = world.bays[world.freeBay];
  g.fillRect(pb.x0, pb.y0, (pb.x1 - pb.x0) * 2, pb.y1 - pb.y0);
  // roofs (seen from above)
  world.buildings.forEach(b => {
    g.fillStyle = 'rgba(0,0,0,.25)'; g.fillRect(b.x0 + 1, b.y0 + 1, b.x1 - b.x0, b.y1 - b.y0);
    g.fillStyle = shade(b.color, -0.25); g.fillRect(b.x0, b.y0, b.x1 - b.x0, b.y1 - b.y0);
    g.strokeStyle = 'rgba(0,0,0,.25)'; g.lineWidth = 0.2; g.strokeRect(b.x0 + 0.6, b.y0 + 0.6, b.x1 - b.x0 - 1.2, b.y1 - b.y0 - 1.2);
  });
  return cv;
}

export function shade(hex, k) {
  const n = parseInt(hex.slice(1), 16);
  let r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
  const f = v => Math.max(0, Math.min(255, Math.round(k >= 0 ? v + (255 - v) * k : v * (1 + k))));
  r = f(r); g = f(g); b = f(b);
  return `rgb(${r},${g},${b})`;
}
