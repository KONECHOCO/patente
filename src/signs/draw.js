// Road sign SVG renderer: shapes (Vienna Convention family) + pictogram library.
// Every pictogram is drawn in a local 100x100 box and placed inside the sign shape.

const RED = '#d0021b';
const BLUE = '#0055a4';
const GREEN = '#00843d';
const YELLOW = '#ffcc00';
const K = '#111111';
const W = '#ffffff';

// ---------- Pictograms (local 0..100 box, `c` = ink colour) ----------

const P = {
  arrowUp: c => `<path d="M50,8 L74,38 L58,38 L58,92 L42,92 L42,38 L26,38 Z" fill="${c}"/>`,
  arrowRight: c => `<path d="M92,50 L62,26 L62,42 L8,42 L8,58 L62,58 L62,74 Z" fill="${c}"/>`,
  arrowLeft: c => `<path d="M8,50 L38,26 L38,42 L92,42 L92,58 L38,58 L38,74 Z" fill="${c}"/>`,
  turnRight: c => `<path d="M30,94 L30,52 Q30,38 44,38 L66,38 L66,24 L92,46 L66,68 L66,54 L46,54 L46,94 Z" fill="${c}"/>`,
  turnLeft: c => `<path d="M70,94 L70,52 Q70,38 56,38 L34,38 L34,24 L8,46 L34,68 L34,54 L54,54 L54,94 Z" fill="${c}"/>`,
  keepRight: c => `<path d="M84,84 L84,46 L72,58 L26,12 L14,24 L60,70 L48,82 Z" fill="${c}"/>`,
  keepLeft: c => `<path d="M16,84 L16,46 L28,58 L74,12 L86,24 L40,70 L52,82 Z" fill="${c}"/>`,
  straightOrRight: c => `<path d="M40,94 L40,30 L26,30 L46,6 L66,30 L56,30 L56,52 Q56,46 62,46 L72,46 L72,34 L94,54 L72,74 L72,62 L60,62 Q56,62 56,66 L56,94 Z" fill="${c}"/>`,
  straightOrLeft: c => `<path d="M60,94 L60,30 L74,30 L54,6 L34,30 L44,30 L44,52 Q44,46 38,46 L28,46 L28,34 L6,54 L28,74 L28,62 L40,62 Q44,62 44,66 L44,94 Z" fill="${c}"/>`,
  passEitherSide: c => `<path d="M18,80 L18,52 L8,62 L8,40 L30,40 L20,50 L46,76 L46,92 L34,92 L34,80 Z M82,80 L82,52 L92,62 L92,40 L70,40 L80,50 L54,76 L54,92 L66,92 L66,80 Z" fill="${c}"/>`,
  roundabout: c => `<g fill="${c}"><path d="M50,14 A36,36 0 0 1 82,34 L92,28 L90,54 L66,44 L76,40 A26,26 0 0 0 50,24 Z"/><path d="M50,14 A36,36 0 0 1 82,34 L92,28 L90,54 L66,44 L76,40 A26,26 0 0 0 50,24 Z" transform="rotate(120 50 50)"/><path d="M50,14 A36,36 0 0 1 82,34 L92,28 L90,54 L66,44 L76,40 A26,26 0 0 0 50,24 Z" transform="rotate(240 50 50)"/></g>`,
  curveRight: c => `<path d="M38,94 L38,58 Q38,36 58,30 L58,18 L82,36 L58,54 L58,44 Q52,46 52,58 L52,94 Z" fill="${c}"/>`,
  curveLeft: c => `<path d="M62,94 L62,58 Q62,36 42,30 L42,18 L18,36 L42,54 L42,44 Q48,46 48,58 L48,94 Z" fill="${c}"/>`,
  doubleCurveRight: c => `<path d="M34,94 L34,74 Q34,62 46,56 Q60,50 60,40 L60,30 L50,30 L66,8 L82,30 L72,30 L72,42 Q72,58 56,66 Q46,70 46,78 L46,94 Z" fill="${c}"/>`,
  doubleCurveLeft: c => `<path d="M66,94 L66,74 Q66,62 54,56 Q40,50 40,40 L40,30 L50,30 L34,8 L18,30 L28,30 L28,42 Q28,58 44,66 Q54,70 54,78 L54,94 Z" fill="${c}"/>`,
  crossroads: c => `<path d="M18,8 L50,40 L82,8 L92,18 L60,50 L92,82 L82,92 L50,60 L18,92 L8,82 L40,50 L8,18 Z" fill="${c}"/>`,
  plusCross: c => `<path d="M43,6 L57,6 L57,43 L94,43 L94,57 L57,57 L57,94 L43,94 L43,57 L6,57 L6,43 L43,43 Z" fill="${c}"/>`,
  priorityCross: c => `<path d="M41,4 L59,4 L59,96 L41,96 Z M8,46 L92,46 L92,54 L8,54 Z" fill="${c}"/>`,
  sideRoadRight: c => `<path d="M40,6 L54,6 L54,42 L90,42 L90,56 L54,56 L54,94 L40,94 Z" fill="${c}"/>`,
  sideRoadLeft: c => `<path d="M60,6 L46,6 L46,42 L10,42 L10,56 L46,56 L46,94 L60,94 Z" fill="${c}"/>`,
  tJunction: c => `<path d="M6,26 L94,26 L94,42 L58,42 L58,94 L42,94 L42,42 L6,42 Z" fill="${c}"/>`,
  hump: c => `<path d="M6,78 L18,78 Q34,78 42,52 Q50,32 58,52 Q66,78 82,78 L94,78 L94,88 L6,88 Z" fill="${c}"/>`,
  dip: c => `<path d="M6,40 L18,40 Q34,40 42,66 Q50,84 58,66 Q66,40 82,40 L94,40 L94,88 L6,88 Z" fill="${c}"/>`,
  bumpy: c => `<path d="M6,70 Q18,52 30,70 Q42,52 54,70 Q66,52 78,70 Q86,58 94,70 L94,86 L6,86 Z" fill="${c}"/>`,
  slippery: c => `<g fill="${c}"><path d="M28,40 L36,24 L62,24 L70,40 L74,40 L74,54 L24,54 L24,40 Z"/><rect x="26" y="54" width="10" height="8"/><rect x="62" y="54" width="10" height="8"/><path d="M30,94 Q20,82 34,74 Q46,68 38,62 L42,60 Q54,68 40,78 Q30,84 36,94 Z"/><path d="M60,94 Q50,82 64,74 Q76,68 68,62 L72,60 Q84,68 70,78 Q60,84 66,94 Z"/></g><path d="M38,28 L60,28 L65,39 L33,39 Z" fill="${W}"/>`,
  narrowBoth: c => `<path d="M24,94 L36,94 L36,64 Q36,52 42,44 L42,6 L32,6 L32,40 Q24,50 24,64 Z M76,94 L64,94 L64,64 Q64,52 58,44 L58,6 L68,6 L68,40 Q76,50 76,64 Z" fill="${c}"/>`,
  narrowRight: c => `<path d="M24,94 L36,94 L36,6 L24,6 Z M76,94 L64,94 L64,64 Q64,52 58,44 L58,6 L68,6 L68,40 Q76,50 76,64 Z" fill="${c}"/>`,
  narrowLeft: c => `<path d="M76,94 L64,94 L64,6 L76,6 Z M24,94 L36,94 L36,64 Q36,52 42,44 L42,6 L32,6 L32,40 Q24,50 24,64 Z" fill="${c}"/>`,
  twoWay: c => `<path d="M34,6 L52,32 L40,32 L40,94 L28,94 L28,32 L16,32 Z M66,94 L84,68 L72,68 L72,6 L60,6 L60,68 L48,68 Z" fill="${c}"/>`,
  twoWayRed: c => `<path d="M34,6 L52,32 L40,32 L40,94 L28,94 L28,32 L16,32 Z" fill="${RED}"/><path d="M66,94 L84,68 L72,68 L72,6 L60,6 L60,68 L48,68 Z" fill="${c}"/>`,
  roadworks: c => `<g fill="${c}"><circle cx="40" cy="20" r="8"/><path d="M34,30 L46,30 L56,54 L66,62 L62,68 L50,60 L48,70 L56,92 L46,94 L38,74 L32,94 L22,92 L30,64 L28,44 L16,56 L12,50 Z"/><path d="M58,26 L62,24 L80,72 L76,74 Z"/><path d="M66,78 Q80,62 94,78 L94,94 L66,94 Z"/></g>`,
  trafficLights: () => `<rect x="34" y="6" width="32" height="88" rx="8" fill="${K}"/><circle cx="50" cy="22" r="10" fill="${RED}"/><circle cx="50" cy="50" r="10" fill="${YELLOW}"/><circle cx="50" cy="78" r="10" fill="#16a34a"/>`,
  pedestrian: c => `<g fill="${c}"><circle cx="52" cy="14" r="9"/><path d="M46,26 L60,26 L66,48 L78,58 L74,64 L60,54 L58,64 L70,90 L60,94 L48,70 L38,94 L28,90 L40,62 L42,44 L32,56 L26,52 L40,30 Z"/></g>`,
  pedestrianCrossing: c => `<g fill="${c}"><path d="M10,86 L90,86 L94,94 L6,94 Z"/><circle cx="54" cy="12" r="8"/><path d="M48,22 L62,22 L66,42 L78,52 L74,58 L60,48 L58,58 L68,80 L58,84 L48,64 L40,84 L30,80 L40,56 L42,40 L34,50 L28,46 L42,26 Z"/></g>`,
  children: c => `<g fill="${c}"><circle cx="36" cy="16" r="8"/><path d="M30,26 L42,26 L48,46 L56,54 L52,58 L44,52 L44,62 L52,86 L44,88 L36,68 L28,88 L20,86 L28,60 L28,44 L20,52 L16,48 Z"/><circle cx="68" cy="34" r="7"/><path d="M63,43 L73,43 L78,58 L84,64 L80,68 L74,62 L74,70 L80,90 L73,92 L67,76 L61,92 L54,90 L60,70 L60,58 L54,64 L50,60 L58,50 Z"/></g>`,
  bicycle: c => `<g fill="none" stroke="${c}" stroke-width="6"><circle cx="24" cy="66" r="16"/><circle cx="76" cy="66" r="16"/><path d="M24,66 L40,40 L66,40 L76,66 M40,40 L52,66 L66,40 M52,66 L24,66 M36,32 L46,32 M64,28 L66,40 M60,28 L72,28" stroke-linecap="round" stroke-linejoin="round"/></g>`,
  cyclist: c => `<g fill="none" stroke="${c}" stroke-width="5"><circle cx="24" cy="72" r="14"/><circle cx="76" cy="72" r="14"/><path d="M24,72 L40,50 L64,50 L76,72 M40,50 L52,72 L64,50" stroke-linecap="round"/></g><g fill="${c}"><circle cx="56" cy="16" r="8"/><path d="M50,26 L60,26 L62,42 L70,48 L66,52 L52,46 L48,58 L40,52 L46,32 Z"/></g>`,
  deer: c => `<path d="M70,10 L74,20 L82,14 L78,24 L86,26 L76,30 L72,40 L64,44 L56,58 L40,60 L22,72 L12,88 L6,84 L14,70 L10,64 L22,56 L30,46 L46,42 L58,32 L64,22 L62,12 L66,18 Z" fill="${c}"/>`,
  cow: c => `<path d="M10,40 L22,34 L26,40 L70,38 Q84,38 86,50 L90,62 L84,62 L82,56 L80,90 L72,90 L70,68 L36,68 L34,90 L26,90 L24,62 Q14,60 14,50 Z M18,34 L14,26 L22,32 Z" fill="${c}"/>`,
  fallingRocks: c => `<g fill="${c}"><path d="M6,6 L30,6 L30,94 L6,94 Z"/><path d="M30,10 L44,22 L30,30 Z"/><circle cx="48" cy="40" r="7"/><circle cx="58" cy="58" r="9"/><circle cx="74" cy="80" r="11"/><circle cx="46" cy="76" r="6"/></g>`,
  steepDown: c => `<path d="M8,30 L92,86 L8,86 Z" fill="${c}"/><text x="56" y="44" font-family="Arial,Helvetica,sans-serif" font-weight="700" font-size="22" fill="${c}">10%</text>`,
  steepUp: c => `<path d="M92,30 L8,86 L92,86 Z" fill="${c}"/><text x="6" y="44" font-family="Arial,Helvetica,sans-serif" font-weight="700" font-size="22" fill="${c}">10%</text>`,
  barrier: c => `<g fill="${c}"><rect x="8" y="22" width="84" height="12"/><rect x="8" y="46" width="84" height="12"/><rect x="14" y="16" width="10" height="72"/><rect x="45" y="16" width="10" height="72"/><rect x="76" y="16" width="10" height="72"/></g>`,
  train: c => `<g fill="${c}"><path d="M10,34 L38,34 L38,22 L62,22 L62,28 L70,28 L70,16 L82,16 L82,28 L92,28 L92,72 L10,72 Z"/><circle cx="24" cy="80" r="9"/><circle cx="50" cy="80" r="9"/><circle cx="78" cy="80" r="9"/><rect x="6" y="88" width="88" height="5"/></g>`,
  tram: c => `<g fill="${c}"><path d="M50,4 L56,14 L44,14 Z M44,14 L56,14 L60,22 L40,22 Z"/><rect x="22" y="22" width="56" height="60" rx="10"/><rect x="28" y="84" width="10" height="8"/><rect x="62" y="84" width="10" height="8"/></g><rect x="30" y="30" width="40" height="22" rx="3" fill="${W}"/><circle cx="34" cy="70" r="4" fill="${W}"/><circle cx="66" cy="70" r="4" fill="${W}"/>`,
  airplane: c => `<path d="M50,6 Q56,6 56,18 L56,38 L92,58 L92,66 L56,56 L56,78 L66,86 L66,92 L50,88 L34,92 L34,86 L44,78 L44,56 L8,66 L8,58 L44,38 L44,18 Q44,6 50,6 Z" fill="${c}"/>`,
  wind: c => `<g fill="${c}"><rect x="14" y="10" width="6" height="84"/><path d="M20,14 L88,26 L88,48 L20,56 Z"/></g><path d="M40,18 L40,52 M60,22 L60,50" stroke="${W}" stroke-width="7"/>`,
  queue: c => `<g fill="${c}">${carRear(28, 12)}${carRear(28, 52)}</g>`,
  exclamation: c => `<path d="M42,8 L58,8 L55,66 L45,66 Z" fill="${c}"/><circle cx="50" cy="84" r="9" fill="${c}"/>`,
  quay: c => `<g fill="${c}"><path d="M6,30 L50,30 L50,90 L6,90 Z"/><path d="M36,10 L58,10 L64,20 L70,20 L70,30 L30,30 L30,20 Z" transform="rotate(30 50 20)"/><path d="M54,70 Q64,62 74,70 Q84,78 94,70 L94,80 Q84,88 74,80 Q64,72 54,80 Z"/></g>`,
  gravel: c => `<g fill="${c}"><path d="M30,48 L36,32 L62,32 L68,48 L72,48 L72,62 L26,62 L26,48 Z"/><rect x="28" y="62" width="10" height="8"/><rect x="60" y="62" width="10" height="8"/><circle cx="20" cy="22" r="5"/><circle cx="80" cy="26" r="6"/><circle cx="14" cy="38" r="4"/><circle cx="86" cy="42" r="4"/><circle cx="12" cy="82" r="5"/><circle cx="88" cy="84" r="5"/><circle cx="50" cy="86" r="6"/><circle cx="30" cy="86" r="4"/><circle cx="70" cy="88" r="4"/></g><path d="M38,36 L60,36 L64,46 L34,46 Z" fill="${W}"/>`,
  ice: c => `<g stroke="${c}" stroke-width="6" stroke-linecap="round"><path d="M50,8 L50,92 M14,29 L86,71 M14,71 L86,29"/><path d="M40,14 L50,24 L60,14 M40,86 L50,76 L60,86 M16,40 L28,36 L24,24 M84,60 L72,64 L76,76 M16,60 L28,64 L24,76 M84,40 L72,36 L76,24" fill="none"/></g>`,
  car: c => `<g fill="${c}"><path d="M8,64 L8,52 Q8,46 16,45 L26,44 L36,30 Q38,28 42,28 L64,28 Q68,28 70,30 L80,44 L88,46 Q94,48 94,54 L94,64 Z"/><circle cx="28" cy="66" r="10"/><circle cx="74" cy="66" r="10"/></g><path d="M40,32 L52,32 L52,44 L32,44 Z M56,32 L66,32 L74,44 L56,44 Z" fill="${W}"/>`,
  carFrontPair: () => `${carFront(4, RED)}${carFront(52, K)}`,
  truckOvertake: () => `${truckFront(2, RED)}${carFront(52, K)}`,
  truck: c => `<g fill="${c}"><rect x="6" y="22" width="58" height="44"/><path d="M66,34 L82,34 L94,48 L94,66 L66,66 Z"/><circle cx="22" cy="72" r="9"/><circle cx="46" cy="72" r="9"/><circle cx="82" cy="72" r="9"/></g><path d="M72,38 L80,38 L88,48 L72,48 Z" fill="${W}"/>`,
  bus: c => `<g fill="${c}"><rect x="6" y="20" width="88" height="48" rx="6"/><circle cx="24" cy="72" r="9"/><circle cx="76" cy="72" r="9"/></g><g fill="${W}"><rect x="12" y="28" width="14" height="16"/><rect x="30" y="28" width="14" height="16"/><rect x="48" y="28" width="14" height="16"/><rect x="66" y="28" width="20" height="16"/></g>`,
  motorcycle: c => `<g fill="none" stroke="${c}" stroke-width="7"><circle cx="20" cy="66" r="14"/><circle cx="80" cy="66" r="14"/></g><path d="M20,66 L38,46 L66,46 L80,66 M60,34 L70,34 L74,46 M30,42 L50,40 L58,52 L40,56 Z" fill="${c}" stroke="${c}" stroke-width="6" stroke-linejoin="round"/>`,
  moped: c => `<g fill="none" stroke="${c}" stroke-width="6"><circle cx="22" cy="68" r="12"/><circle cx="78" cy="68" r="12"/></g><path d="M22,68 L40,52 L64,52 L78,68 M64,52 L70,30 L80,30 M36,46 L54,46 L54,54 L36,54 Z" fill="${c}" stroke="${c}" stroke-width="6" stroke-linejoin="round"/>`,
  tractor: c => `<g fill="${c}"><path d="M30,22 L58,22 L58,46 L84,46 L84,66 L30,66 Z"/><circle cx="36" cy="70" r="18"/><circle cx="80" cy="74" r="10"/></g><rect x="36" y="28" width="16" height="16" fill="${W}"/><circle cx="36" cy="70" r="7" fill="${W}"/>`,
  horseCart: c => `<g fill="${c}"><path d="M8,40 L18,30 L24,36 L40,36 Q50,36 52,44 L52,62 L46,62 L46,52 L28,52 L26,62 L20,62 L20,50 Q12,48 10,44 Z"/><rect x="56" y="40" width="36" height="18"/><circle cx="74" cy="66" r="12"/><rect x="50" y="46" width="8" height="4"/></g>`,
  handcart: c => `<g fill="${c}"><circle cx="30" cy="18" r="8"/><path d="M24,28 L36,28 L44,50 L56,52 L56,58 L40,58 L36,66 L44,92 L34,94 L28,74 L22,94 L12,92 L22,62 L22,40 Z"/><rect x="56" y="44" width="34" height="24"/><circle cx="64" cy="78" r="9"/><circle cx="84" cy="78" r="9"/></g>`,
  uturn: c => `<path d="M30,94 L30,40 Q30,14 52,14 Q74,14 74,40 L74,58 L86,58 L68,84 L50,58 L62,58 L62,40 Q62,26 52,26 Q42,26 42,40 L42,94 Z" fill="${c}"/>`,
  horn: c => `<path d="M14,40 L30,40 L66,16 L66,84 L30,60 L14,60 Z" fill="${c}"/><path d="M76,32 Q86,50 76,68 M84,24 Q98,50 84,76" fill="none" stroke="${c}" stroke-width="5"/>`,
  dangerousGoods: c => `<g fill="${c}"><rect x="6" y="28" width="58" height="34"/><path d="M66,36 L82,36 L94,48 L94,62 L66,62 Z"/><circle cx="22" cy="68" r="8"/><circle cx="48" cy="68" r="8"/><circle cx="82" cy="68" r="8"/></g><rect x="22" y="34" width="26" height="20" fill="#f97316" stroke="${W}" stroke-width="2"/>`,
  waterPollutant: c => `<g fill="${c}"><rect x="6" y="18" width="58" height="34"/><path d="M66,26 L82,26 L94,38 L94,52 L66,52 Z"/><circle cx="22" cy="58" r="8"/><circle cx="48" cy="58" r="8"/><circle cx="82" cy="58" r="8"/><path d="M10,80 Q20,72 30,80 Q40,88 50,80 Q60,72 70,80 Q80,88 90,80 L90,88 Q80,96 70,88 Q60,80 50,88 Q40,96 30,88 Q20,80 10,88 Z"/></g>`,
  snowChains: c => `<g fill="none" stroke="${c}" stroke-width="5"><circle cx="50" cy="50" r="36"/><circle cx="50" cy="50" r="18"/></g><g fill="${c}">${[0, 45, 90, 135, 180, 225, 270, 315].map(a => `<rect x="44" y="6" width="12" height="16" rx="3" transform="rotate(${a} 50 50)"/>`).join('')}</g>`,
  horse: c => `<path d="M24,22 L32,12 L36,20 L58,26 Q74,30 80,46 L86,62 L80,64 L76,54 L74,90 L66,90 L64,62 L40,62 L34,90 L26,90 L28,58 Q18,52 20,40 L12,46 L8,40 Z" fill="${c}"/>`,
  tunnel: c => `<path d="M8,92 L8,50 Q8,12 50,12 Q92,12 92,50 L92,92 L72,92 L72,52 Q72,32 50,32 Q28,32 28,52 L28,92 Z" fill="${c}"/>`,
  parking: c => `<path d="M30,14 L58,14 Q82,14 82,38 Q82,62 58,62 L46,62 L46,88 L30,88 Z M46,28 L46,48 L56,48 Q66,48 66,38 Q66,28 56,28 Z" fill="${c}" fill-rule="evenodd"/>`,
  hospital: c => `<path d="M22,12 L38,12 L38,42 L62,42 L62,12 L78,12 L78,88 L62,88 L62,58 L38,58 L38,88 L22,88 Z" fill="${c}"/>`,
  fuel: c => `<g fill="${c}"><rect x="20" y="14" width="40" height="74" rx="4"/><path d="M60,34 L72,34 Q80,34 80,42 L80,72 Q80,78 74,78 Q68,78 68,72 L68,48 L60,48 Z"/></g><rect x="27" y="22" width="26" height="20" fill="${W}"/>`,
  sos: c => `<g fill="${c}"><path d="M30,10 L70,10 L74,22 L74,90 L26,90 L26,22 Z"/></g><rect x="36" y="22" width="28" height="18" fill="${W}"/><text x="50" y="72" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-weight="700" font-size="20" fill="${W}">SOS</text>`,
  phone: c => `<path d="M24,14 L40,14 L46,34 L36,42 Q44,60 58,66 L66,56 L86,62 L86,78 Q86,88 74,88 Q20,82 14,26 Q14,14 24,14 Z" fill="${c}"/>`,
  oneWay: c => `<path d="M50,8 L80,44 L60,44 L60,92 L40,92 L40,44 L20,44 Z" fill="${c}"/>`,
  deadEnd: c => `<rect x="40" y="28" width="20" height="66" fill="${c}"/><rect x="14" y="8" width="72" height="22" fill="${RED}"/>`,
  pedestrianZone: c => `<g fill="${c}"><circle cx="38" cy="16" r="8"/><path d="M32,26 L44,26 L48,46 L48,90 L40,90 L38,62 L34,90 L26,90 L28,46 L24,58 L18,56 Z"/><circle cx="66" cy="34" r="7"/><path d="M60,44 L72,44 L76,62 L72,62 L72,92 L66,92 L66,74 L62,92 L56,92 L58,62 L54,62 Z"/></g>`,
  motorwayPicto: c => `<path d="M10,94 L36,8 L44,8 L28,94 Z M90,94 L64,8 L56,8 L72,94 Z M46,94 L48,70 L52,70 L54,94 Z M47,58 L48,40 L52,40 L53,58 Z M48,28 L49,14 L51,14 L52,28 Z" fill="${c}"/><path d="M18,52 Q50,40 82,52 L82,62 L18,62 Z" fill="${c}"/>`,
  expresswayPicto: c => `${carFrontInk(26, c, 1.0)}`,
  bicyclePath: c => P.bicycle(c),
  snowflake: c => P.ice(c),
  speedCamera: c => `<g fill="${c}"><rect x="14" y="34" width="56" height="34" rx="4"/><path d="M70,40 L88,30 L88,72 L70,62 Z"/><rect x="36" y="68" width="10" height="24"/></g><circle cx="42" cy="51" r="11" fill="${W}"/><circle cx="42" cy="51" r="6" fill="${c}"/>`,
  restArea: c => `<g fill="${c}"><path d="M10,46 L90,46 L90,54 L10,54 Z"/><path d="M20,54 L28,54 L22,84 L14,84 Z M80,54 L72,54 L78,84 L86,84 Z"/><path d="M50,8 L30,40 L70,40 Z"/><rect x="46" y="40" width="8" height="8"/></g>`,
  lanesMerge: c => `<path d="M24,94 L24,60 Q24,44 40,30 L40,6 L54,6 L54,34 Q38,48 38,62 L38,94 Z M62,94 L76,94 L76,6 L62,6 Z" fill="${c}"/>`,
  laneEnds: c => `<path d="M20,94 L32,94 L32,60 L44,40 L44,6 L32,6 L32,34 L20,54 Z M56,94 L68,94 L68,6 L56,6 Z M78,94 L90,94 L90,6 L78,6 Z" fill="${c}"/>`
};

function carFront(x, color) {
  return `<g fill="${color}"><path d="M${x + 12},26 L${x + 36},26 L${x + 42},44 L${x + 6},44 Z"/><rect x="${x + 2}" y="42" width="44" height="22" rx="6"/><rect x="${x + 5}" y="62" width="10" height="12" rx="2"/><rect x="${x + 33}" y="62" width="10" height="12" rx="2"/></g><path d="M${x + 15},30 L${x + 33},30 L${x + 37},42 L${x + 11},42 Z" fill="${W}"/><circle cx="${x + 10}" cy="52" r="4" fill="${W}"/><circle cx="${x + 38}" cy="52" r="4" fill="${W}"/>`;
}
function carFrontInk(x, color) { return carFront(x, color).replace(/fill="#ffffff"/g, 'fill="' + BLUE + '"'); }
function truckFront(x, color) {
  return `<g fill="${color}"><rect x="${x + 2}" y="14" width="46" height="52" rx="4"/><rect x="${x + 5}" y="64" width="11" height="12" rx="2"/><rect x="${x + 34}" y="64" width="11" height="12" rx="2"/></g><rect x="${x + 8}" y="20" width="34" height="18" fill="${W}"/><circle cx="${x + 12}" cy="54" r="4" fill="${W}"/><circle cx="${x + 38}" cy="54" r="4" fill="${W}"/>`;
}
function carRear(x, y) {
  return `<path d="M${x + 8},${y} L${x + 36},${y} L${x + 42},${y + 14} L${x + 2},${y + 14} Z"/><rect x="${x}" y="${y + 12}" width="44" height="18" rx="5"/><rect x="${x + 3}" y="${y + 28}" width="9" height="8"/><rect x="${x + 32}" y="${y + 28}" width="9" height="8"/>`;
}

// ---------- Helpers ----------

function place(picto, ink, cx, cy, size) {
  const fn = P[picto];
  if (!fn) return '';
  const s = size / 100;
  return `<g transform="translate(${cx - size / 2} ${cy - size / 2}) scale(${s})">${fn(ink)}</g>`;
}

function txt(str, x, y, size, color, weight = 700) {
  return `<text x="${x}" y="${y}" text-anchor="middle" dominant-baseline="central" font-family="Arial Narrow,Arial,Helvetica,sans-serif" font-weight="${weight}" font-size="${size}" fill="${color}">${str}</text>`;
}

function slash(color = RED, w = 9) {
  return `<line x1="20" y1="20" x2="80" y2="80" stroke="${color}" stroke-width="${w}"/>`;
}

// ---------- Shapes ----------

function triangle(inner, { fill = W } = {}) {
  return `<polygon points="50,5 96,87 4,87" fill="${RED}" stroke="${RED}" stroke-width="4" stroke-linejoin="round"/><polygon points="50,20 83,79 17,79" fill="${fill}"/>${inner}`;
}
function triangleInv(inner = '') {
  return `<polygon points="4,10 96,10 50,92" fill="${RED}" stroke="${RED}" stroke-width="4" stroke-linejoin="round"/><polygon points="18,18 82,18 50,75" fill="${W}"/>${inner}`;
}
function octagon(label = 'STOP') {
  return `<polygon points="30,3 70,3 97,30 97,70 70,97 30,97 3,70 3,30" fill="${W}"/><polygon points="31,6 69,6 94,31 94,69 69,94 31,94 6,69 6,31" fill="${RED}"/>${txt(label, 50, 51, label.length > 4 ? 19 : 28, W)}`;
}
function ringRed(inner, { fill = W } = {}) {
  return `<circle cx="50" cy="50" r="47" fill="${RED}"/><circle cx="50" cy="50" r="37" fill="${fill}"/>${inner}`;
}
function discBlue(inner) {
  return `<circle cx="50" cy="50" r="47" fill="${W}"/><circle cx="50" cy="50" r="45" fill="${BLUE}"/>${inner}`;
}
function endSign(inner = '') {
  return `<circle cx="50" cy="50" r="47" fill="${W}" stroke="#555" stroke-width="2"/>${inner}<g stroke="#333" stroke-width="3"><line x1="22" y1="70" x2="70" y2="22"/><line x1="26" y1="74" x2="74" y2="26"/><line x1="30" y1="78" x2="78" y2="30"/><line x1="34" y1="82" x2="82" y2="34"/></g>`;
}
function square(inner, { bg = BLUE, border = W } = {}) {
  return `<rect x="3" y="3" width="94" height="94" rx="8" fill="${border}"/><rect x="7" y="7" width="86" height="86" rx="6" fill="${bg}"/>${inner}`;
}
function rectPanel(inner, { bg = W, border = K, h = 50 } = {}) {
  const y = 50 - h / 2;
  return `<rect x="3" y="${y}" width="94" height="${h}" rx="4" fill="${border}"/><rect x="6" y="${y + 3}" width="88" height="${h - 6}" rx="3" fill="${bg}"/>${inner}`;
}
function diamond(end = false) {
  const base = `<polygon points="50,2 98,50 50,98 2,50" fill="${W}" stroke="#555" stroke-width="2"/><polygon points="50,18 82,50 50,82 18,50" fill="${YELLOW}"/>`;
  return end ? base + `<g stroke="#222" stroke-width="3"><line x1="30" y1="70" x2="70" y2="30"/><line x1="34" y1="74" x2="74" y2="34"/><line x1="26" y1="66" x2="66" y2="26"/></g>` : base;
}

// ---------- Public: build a sign from a declarative spec ----------
// spec examples:
//   { s:'tri', p:'curveRight' }  { s:'ring', t:'50' }  { s:'blue', p:'arrowUp' }
export function renderSign(spec, { country = 'IT', size } = {}) {
  let body = '';
  const ink = K;
  switch (spec.s) {
    case 'tri':
      body = triangle(spec.t ? txt(spec.t, 50, 60, spec.ts || 24, K) : place(spec.p, ink, 50, 57, spec.ps || 44));
      break;
    case 'yield':
      body = triangleInv(spec.t ? txt(spec.t, 50, 38, 13, K) : '');
      break;
    case 'yieldAhead':
      body = triangle(`<polygon points="34,50 66,50 50,74" fill="${W}" stroke="${RED}" stroke-width="5"/>`) + (spec.t ? txt(spec.t, 50, 96, 0, K) : '');
      break;
    case 'stop':
      body = octagon(spec.t || 'STOP');
      break;
    case 'stopAhead':
      body = triangle(`<polygon points="44,44 56,44 64,52 64,64 56,72 44,72 36,64 36,52" fill="${RED}"/>`);
      break;
    case 'ring': {
      let inner = '';
      if (spec.t) inner = txt(spec.t, 50, 51, spec.ts || (spec.t.length > 2 ? 30 : 40), K);
      else if (spec.p) inner = place(spec.p, ink, 50, 50, spec.ps || 54);
      if (spec.slash) inner += slash();
      body = ringRed(inner);
      break;
    }
    case 'noEntry':
      body = `<circle cx="50" cy="50" r="47" fill="${W}"/><circle cx="50" cy="50" r="45" fill="${RED}"/><rect x="18" y="41" width="64" height="18" fill="${W}"/>`;
      break;
    case 'noVehicles':
      body = ringRed('');
      break;
    case 'noParking':
      body = `<circle cx="50" cy="50" r="47" fill="${RED}"/><circle cx="50" cy="50" r="37" fill="${BLUE}"/><line x1="24" y1="24" x2="76" y2="76" stroke="${RED}" stroke-width="10"/>`;
      break;
    case 'noStopping':
      body = `<circle cx="50" cy="50" r="47" fill="${RED}"/><circle cx="50" cy="50" r="37" fill="${BLUE}"/><line x1="24" y1="24" x2="76" y2="76" stroke="${RED}" stroke-width="10"/><line x1="76" y1="24" x2="24" y2="76" stroke="${RED}" stroke-width="10"/>`;
      break;
    case 'end':
      body = endSign(spec.t ? txt(spec.t, 50, 51, 36, '#666') : spec.p ? `<g opacity="0.55">${place(spec.p, '#444', 50, 50, 52)}</g>` : '');
      break;
    case 'blue': {
      let inner = spec.t ? txt(spec.t, 50, 51, spec.ts || 38, W) : place(spec.p, W, 50, 50, spec.ps || 60);
      if (spec.slash) inner += `<line x1="18" y1="82" x2="82" y2="18" stroke="${RED}" stroke-width="8"/>`;
      body = discBlue(inner);
      break;
    }
    case 'priorityRoad':
      body = diamond(false);
      break;
    case 'endPriorityRoad':
      body = diamond(true);
      break;
    case 'priorityOver':
      body = square(`<path d="M28,86 L28,40 L18,40 L34,18 L50,40 L40,40 L40,86 Z" fill="${W}"/><path d="M60,14 L72,14 L72,50 L82,50 L66,76 L50,50 L60,50 Z" fill="${RED}"/>`);
      break;
    case 'giveWayOncoming':
      body = ringRed(`<path d="M30,14 L46,38 L36,38 L36,86 L24,86 L24,38 L14,38 Z" fill="${RED}" transform="translate(6 0)"/><path d="M64,86 L80,62 L70,62 L70,14 L58,14 L58,62 L48,62 Z" fill="${K}" transform="translate(-2 0)"/>`);
      break;
    case 'sq': {
      const bg = spec.bg === 'green' ? GREEN : spec.bg === 'white' ? W : spec.bg === 'yellow' ? YELLOW : spec.bg === 'brown' ? '#7a4a1e' : BLUE;
      const fg = spec.bg === 'white' || spec.bg === 'yellow' ? K : W;
      let inner = '';
      if (spec.inner === 'white') {
        inner = `<rect x="20" y="16" width="60" height="62" rx="4" fill="${W}"/>` + (spec.p ? place(spec.p, spec.pc === 'red' ? RED : K, 50, 47, spec.ps || 50) : '') + (spec.t ? txt(spec.t, 50, 87, 11, W) : '');
      } else {
        inner = (spec.p ? place(spec.p, fg, 50, spec.t ? 42 : 50, spec.ps || 62) : '') + (spec.t ? txt(spec.t, 50, spec.p ? 82 : 51, spec.ts || (spec.p ? 14 : 30), fg) : '');
      }
      if (spec.slash) inner += `<line x1="14" y1="86" x2="86" y2="14" stroke="${RED}" stroke-width="7"/>`;
      body = square(inner, { bg, border: spec.bg === 'white' ? K : W });
      break;
    }
    case 'panel': {
      const bg = spec.bg === 'yellow' ? YELLOW : spec.bg === 'blue' ? BLUE : spec.bg === 'green' ? GREEN : W;
      const fg = spec.bg === 'blue' || spec.bg === 'green' ? W : K;
      let inner = '';
      if (spec.p) inner += place(spec.p, fg, spec.t ? 26 : 50, 50, 34);
      if (spec.t) inner += txt(spec.t, spec.p ? 64 : 50, 51, spec.ts || 20, fg);
      body = rectPanel(inner, { bg, border: fg === W ? W : K, h: spec.h || 44 });
      break;
    }
    case 'chevron': {
      const fg = spec.fg === 'red' ? RED : K;
      body = `<rect x="3" y="18" width="94" height="64" rx="4" fill="${W}" stroke="${fg}" stroke-width="3"/>` + (spec.dir === 'left'
        ? `<path d="M40,26 L18,50 L40,74 L54,74 L32,50 L54,26 Z M72,26 L50,50 L72,74 L86,74 L64,50 L86,26 Z" fill="${fg}"/>`
        : `<path d="M60,26 L82,50 L60,74 L46,74 L68,50 L46,26 Z M28,26 L50,50 L28,74 L14,74 L36,50 L14,26 Z" fill="${fg}"/>`);
      break;
    }
    case 'lights':
      body = trafficLightBody(spec.state || 'red');
      break;
    case 'markings':
      body = roadMarking(spec.m);
      break;
    case 'agent':
      body = agentPose(spec.pose);
      break;
    case 'roadworksTri':
      body = triangle(place('roadworks', K, 50, 57, 44), { fill: YELLOW });
      break;
    case 'motorway':
      body = square(place('motorwayPicto', W, 50, 50, 70), { bg: country === 'IT' || country === 'CH' ? GREEN : BLUE });
      break;
    case 'endMotorway':
      body = square(place('motorwayPicto', W, 50, 50, 70) + `<line x1="12" y1="88" x2="88" y2="12" stroke="${RED}" stroke-width="8"/>`, { bg: country === 'IT' || country === 'CH' ? GREEN : BLUE });
      break;
    case 'expressway':
      body = square(`<g transform="translate(26 24)"><g fill="${W}"><path d="M12,26 L36,26 L42,44 L6,44 Z"/><rect x="2" y="42" width="44" height="22" rx="6"/><rect x="5" y="62" width="10" height="12" rx="2"/><rect x="33" y="62" width="10" height="12" rx="2"/></g><path d="M15,30 L33,30 L37,42 L11,42 Z" fill="${BLUE}"/><circle cx="10" cy="52" r="4" fill="${BLUE}"/><circle cx="38" cy="52" r="4" fill="${BLUE}"/></g>`, { bg: BLUE });
      break;
    case 'plBars':
      body = `<rect x="30" y="2" width="40" height="96" rx="3" fill="${W}" stroke="#999" stroke-width="2"/>` + [0, 1, 2].slice(0, spec.n || 3).map(i => `<polygon points="30,${18 + i * 26} 70,${4 + i * 26} 70,${16 + i * 26} 30,${30 + i * 26}" fill="${RED}"/>`).join('');
      break;
    case 'town': {
      const bg = country === 'FR' || country === 'CI' || country === 'DE' ? W : W;
      body = `<rect x="2" y="24" width="96" height="52" rx="3" fill="${country === 'DE' ? YELLOW : W}" stroke="${country === 'FR' || country === 'CI' ? RED : K}" stroke-width="4"/>${txt(spec.t || 'ROMA', 50, 50, 20, K)}` + (spec.slash ? `<line x1="8" y1="70" x2="92" y2="30" stroke="${RED}" stroke-width="6"/>` : '');
      void bg;
      break;
    }
    case 'mph':
      body = ringRed(txt(spec.t, 50, 51, 38, K));
      break;
    default:
      body = '';
  }
  const dim = size ? ` width="${size}" height="${size}"` : '';
  return `<svg viewBox="0 0 100 100"${dim} xmlns="http://www.w3.org/2000/svg" class="sign-svg" role="img">${body}</svg>`;
}

function trafficLightBody(state) {
  const on = { red: [1, 0, 0], yellow: [0, 1, 0], green: [0, 0, 1], redyellow: [1, 1, 0], flash: [0, 1, 0], off: [0, 0, 0] }[state] || [0, 0, 0];
  const col = (i, c) => (on[i] ? c : '#2b2b2b');
  const glow = (i, c) => (on[i] ? `<circle cx="50" cy="${20 + i * 30}" r="15" fill="${c}" opacity="0.25"/>` : '');
  return `<rect x="28" y="2" width="44" height="96" rx="10" fill="#1a1a1a" stroke="#444" stroke-width="2"/>${glow(0, '#ff3b30')}${glow(1, '#ffcc00')}${glow(2, '#34c759')}<circle cx="50" cy="20" r="11" fill="${col(0, '#ff3b30')}"/><circle cx="50" cy="50" r="11" fill="${col(1, '#ffcc00')}"/><circle cx="50" cy="80" r="11" fill="${col(2, '#34c759')}"/>` + (state === 'flash' ? txt('~', 50, 50, 14, K) : '');
}

function agentPose(pose) {
  const body = `<circle cx="50" cy="16" r="8" fill="${K}"/><rect x="42" y="26" width="16" height="36" rx="3" fill="${BLUE}"/><rect x="43" y="62" width="6" height="30" fill="${K}"/><rect x="51" y="62" width="6" height="30" fill="${K}"/><rect x="42" y="6" width="16" height="5" fill="${W}" stroke="${K}"/>`;
  const arms = {
    raised: `<rect x="56" y="0" width="6" height="30" fill="${BLUE}"/><rect x="38" y="28" width="6" height="28" fill="${BLUE}"/>`,
    sideways: `<rect x="10" y="28" width="34" height="6" fill="${BLUE}"/><rect x="56" y="28" width="34" height="6" fill="${BLUE}"/>`,
    front: `<rect x="38" y="28" width="6" height="28" fill="${BLUE}"/><rect x="56" y="28" width="6" height="28" fill="${BLUE}"/>`
  }[pose] || '';
  return `<rect x="0" y="0" width="100" height="100" rx="10" fill="#e8eef6"/>${arms}${body}`;
}

function roadMarking(m) {
  const road = `<rect x="0" y="0" width="100" height="100" rx="10" fill="#3a3d42"/>`;
  const Y = YELLOW;
  const parts = {
    continuous: `<rect x="47" y="0" width="6" height="100" fill="${W}"/>`,
    broken: [0, 30, 60, 90].map(y => `<rect x="47" y="${y}" width="6" height="18" fill="${W}"/>`).join(''),
    double: `<rect x="42" y="0" width="5" height="100" fill="${W}"/><rect x="53" y="0" width="5" height="100" fill="${W}"/>`,
    mixed: `<rect x="42" y="0" width="5" height="100" fill="${W}"/>` + [0, 30, 60, 90].map(y => `<rect x="53" y="${y}" width="5" height="18" fill="${W}"/>`).join(''),
    stopLine: `<rect x="8" y="60" width="84" height="10" fill="${W}"/>${txt('STOP', 50, 38, 22, W)}`,
    giveWayLine: [8, 26, 44, 62, 80].map(x => `<polygon points="${x},62 ${x + 12},62 ${x + 6},74" fill="${W}"/>`).join('') + `<polygon points="30,14 70,14 50,46" fill="none" stroke="${W}" stroke-width="5"/>`,
    zebra: [10, 24, 38, 52, 66, 80].map(x => `<rect x="${x}" y="20" width="9" height="60" fill="${W}"/>`).join(''),
    cycleCrossing: [10, 26, 42, 58, 74].map(x => `<rect x="${x}" y="36" width="10" height="10" fill="${W}"/><rect x="${x}" y="58" width="10" height="10" fill="${W}"/>`).join(''),
    hatched: `<polygon points="30,0 70,0 56,100 44,100" fill="none" stroke="${W}" stroke-width="3"/>` + [10, 26, 42, 58, 74].map(y => `<line x1="34" y1="${y}" x2="66" y2="${y + 14}" stroke="${W}" stroke-width="4"/>`).join(''),
    arrows: `<path d="M24,88 L24,40 L16,40 L28,18 L40,40 L32,40 L32,88 Z" fill="${W}"/><path d="M62,88 L62,46 Q62,38 70,38 L78,38 L78,30 L90,44 L78,58 L78,50 L72,50 Q70,50 70,54 L70,88 Z" fill="${W}"/><rect x="47" y="0" width="4" height="100" fill="${W}"/>`,
    yellowParking: `<rect x="12" y="14" width="76" height="72" fill="none" stroke="${Y}" stroke-width="5"/>${txt('♿', 50, 52, 32, Y)}`,
    blueParking: `<rect x="6" y="20" width="40" height="60" fill="none" stroke="#3b82f6" stroke-width="5"/><rect x="54" y="20" width="40" height="60" fill="none" stroke="#3b82f6" stroke-width="5"/>`,
    whiteParking: `<rect x="6" y="20" width="40" height="60" fill="none" stroke="${W}" stroke-width="5"/><rect x="54" y="20" width="40" height="60" fill="none" stroke="${W}" stroke-width="5"/>`,
    yellowZigzag: `<polyline points="6,70 18,54 30,70 42,54 54,70 66,54 78,70 90,54" fill="none" stroke="${Y}" stroke-width="5"/>${txt('BUS', 50, 30, 22, Y)}`,
    temporaryYellow: `<rect x="47" y="0" width="6" height="100" fill="${Y}"/>` + [0, 30, 60, 90].map(y => `<rect x="20" y="${y}" width="5" height="18" fill="${W}" opacity="0.35"/>`).join(''),
    edgeLine: `<rect x="10" y="0" width="5" height="100" fill="${W}"/><rect x="85" y="0" width="5" height="100" fill="${W}"/>` + [0, 30, 60, 90].map(y => `<rect x="48" y="${y}" width="4" height="18" fill="${W}"/>`).join('')
  };
  return road + (parts[m] || '');
}

export const SIGN_COLORS = { RED, BLUE, GREEN, YELLOW };
