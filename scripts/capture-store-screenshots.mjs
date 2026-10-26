// Store screenshots from the real web app, one set per store language.
// Prerequisite: dev server running (`npm run dev`), URL in BASE (default http://localhost:5175).
// Usage: node scripts/capture-store-screenshots.mjs [iphone|ipad|android|all] [it|en|fr|es|de|all]
import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';

const BASE = process.env.BASE || 'http://localhost:5175';
const SIZES = {
  iphone: { viewport: { width: 440, height: 956 }, deviceScaleFactor: 3, suffix: '1320x2868', mobile: true },
  ipad: { viewport: { width: 1032, height: 1376 }, deviceScaleFactor: 2, suffix: 'ipad-2064x2752', mobile: false },
  android: { viewport: { width: 360, height: 640 }, deviceScaleFactor: 3, suffix: 'android-1080x1920', mobile: true }
};
// store language -> country studied in that market
const SCENES = {
  it: { country: 'IT', lang: 'it', chapter: 'it-02', sign: 'stop', junction: 7 },
  en: { country: 'UK', lang: 'en', chapter: 'uk-4', sign: 'divieto-sorpasso', junction: null },
  fr: { country: 'FR', lang: 'fr', chapter: 'fr-L', sign: 'dare-precedenza', junction: 7 },
  es: { country: 'ES', lang: 'es', chapter: 'es-1', sign: 'rotatoria', junction: 7 },
  de: { country: 'DE', lang: 'de', chapter: 'de-2', sign: 'diritto-precedenza', junction: 7 }
};

const devices = process.argv[2] && process.argv[2] !== 'all' ? [process.argv[2]] : Object.keys(SIZES);
const langs = process.argv[3] && process.argv[3] !== 'all' ? [process.argv[3]] : Object.keys(SCENES);
const browser = await chromium.launch();

for (const device of devices) for (const lang of langs) {
  const size = SIZES[device], scene = SCENES[lang];
  const OUT = `store-assets/screenshots/${lang}`;
  await mkdir(OUT, { recursive: true });
  const context = await browser.newContext({ viewport: size.viewport, deviceScaleFactor: size.deviceScaleFactor, isMobile: size.mobile, hasTouch: true, locale: scene.lang });
  await context.addInitScript(([country, l]) => {
    if (!localStorage.getItem('patente.v2')) localStorage.setItem('patente.v2', JSON.stringify({ settings: { country, lang: l, licence: 'B', theme: 'light', easyRead: false, ttsRate: 1 }, progress: {}, pro: false }));
  }, [scene.country, scene.lang]);
  const page = await context.newPage();
  await page.goto(`${BASE}/?storeshot#/home`);
  await page.waitForTimeout(800);
  // Realistic study progress: ~45% of questions answered (mostly right), a few mock exams, daily activity.
  await page.evaluate(async () => {
    const { store } = await import('/src/core/store.js');
    const { allQuestions } = await import('/src/content/index.js');
    const qs = allQuestions(store.settings.country);
    qs.forEach((q, i) => { if (i % 9 < 4) store.recordAnswer(q.id, i % 13 !== 0); });
    const p = store.progress();
    for (let d = 0; d < 14; d++) { const k = new Date(Date.now() - d * 864e5).toISOString().slice(0, 10); p.daily[k] = [22, 30, 18, 35, 26, 12, 30, 28, 40, 16, 24, 31, 20, 27][d]; }
    const now = Date.now();
    [[2, true], [1, true], [3, true], [5, false], [2, true]].forEach(([err, passed], i) => store.addHistory({ date: new Date(now - i * 864e5).toISOString(), mode: 'exam', title: 'Exam', total: 30, errors: err, passed, duration: 840 + i * 40, items: [] }));
  });
  const shot = async (name, wait = 900) => { await page.waitForTimeout(wait); await page.screenshot({ path: `${OUT}/${name}-${size.suffix}.png` }); console.log('saved', device, lang, name); };
  const go = async hash => { await page.evaluate(h => { if (location.hash === '#' + h) location.hash = '/stats'; }, hash); await page.waitForTimeout(150); await page.evaluate(h => { location.hash = h; }, hash); await page.waitForTimeout(500); };

  await go('/home'); await page.evaluate(() => window.scrollTo(0, 0)); await shot('01-home');
  await go(`/course/${scene.chapter}`); await page.evaluate(() => window.scrollTo(0, 0)); await shot('02-teoria');
  await go('/quiz/run/signs'); await shot('03-quiz');
  await go(`/sign/${scene.sign}`); await shot('04-segnali');
  if (scene.junction) { await go(`/junctions/${scene.junction}`); await page.evaluate(() => window.scrollTo(0, 0)); await shot('05-incroci'); }
  else { await go('/quiz/run/exam'); await shot('05-esame'); }
  // Pro: driving simulator from the driver's seat, after driving a few metres
  await page.evaluate(async () => { const { store } = await import('/src/core/store.js'); store.setPro(true); });
  await go('/pro/sim');
  await page.waitForTimeout(1500);
  await page.evaluate(async () => {
    const s = window.__sim; if (!s) return;
    s.car.belt = true; s.checkMirrors(); s.toggleBlinker('left'); s.setGear('D'); s.car.handbrake = false; s.flashT = 0;
    s.keys = { ArrowUp: true }; for (let i = 0; i < 110; i++) s.update(1 / 60); s.keys = {};
    for (let i = 0; i < 40; i++) s.update(1 / 60);
    s.toggleBlinker('left'); s.flashT = 0;
    document.querySelector('#simfaults').innerHTML = '';
    const st = document.createElement('style');
    st.textContent = '.topbar,.scen-list,.page-title,.back{display:none!important} .page{padding-top:0} .sim-wrap{border-radius:0;margin:0 -16px} .sim-canvas{aspect-ratio:auto!important;height:calc(100vh - 190px);max-height:none}';
    document.head.appendChild(st);
    window.scrollTo(0, 0);
    setTimeout(() => s.resize(), 50);
  });
  await shot('06-simulatore', 1200);
  await page.evaluate(async () => { const { store } = await import('/src/core/store.js'); store.setPro(false); });
  await go('/pro'); await page.evaluate(() => window.scrollTo(0, 0)); await shot('07-pro');
  await context.close();
}
await browser.close();
