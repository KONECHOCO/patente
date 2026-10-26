/**
 * Monetizzazione (modello OmniTransit): AdMob (app open, banner, interstitial, video premio) + Patente Pro.
 *
 * - Pro = acquisto una tantum NON consumabile (PRO_PRODUCT_ID) su App Store e Google Play: toglie tutta la
 *   pubblicità e sblocca simulatore, agenda con promemoria, ripasso intelligente, previsione esito,
 *   simulazioni illimitate e audio-lezioni continue.
 * - ID AdMob reali da VITE_ADMOB_* (.env.production). Senza, o in sviluppo, si usano gli ID di test Google.
 * - Nel browser non ci sono annunci né acquisti (tranne la modalità demo in sviluppo).
 */
import { Capacitor } from '@capacitor/core';
import { App as CapApp } from '@capacitor/app';
import { AdMob, AdmobConsentStatus, AppOpenAdPluginEvents, BannerAdPluginEvents, BannerAdPosition, BannerAdSize, RewardAdPluginEvents } from '@capacitor-community/admob';
import { NativePurchases, PURCHASE_TYPE } from '@capgo/native-purchases';
import { store } from './store.js';

export const PRO_PRODUCT_ID = 'patente_pro';

const native = Capacitor.isNativePlatform();
const platform = Capacitor.getPlatform();
const env = import.meta.env;

const TEST_IDS = {
  android: { banner: 'ca-app-pub-3940256099942544/9214589741', appOpen: 'ca-app-pub-3940256099942544/9257395921', interstitial: 'ca-app-pub-3940256099942544/1033173712', rewarded: 'ca-app-pub-3940256099942544/5224354917' },
  ios: { banner: 'ca-app-pub-3940256099942544/2435281174', appOpen: 'ca-app-pub-3940256099942544/5575463023', interstitial: 'ca-app-pub-3940256099942544/4411468910', rewarded: 'ca-app-pub-3940256099942544/1712485313' }
};
const P = platform === 'ios' ? 'IOS' : 'ANDROID';
const REAL_IDS = {
  banner: env[`VITE_ADMOB_${P}_BANNER`],
  appOpen: env[`VITE_ADMOB_${P}_APP_OPEN`],
  interstitial: env[`VITE_ADMOB_${P}_INTERSTITIAL`],
  rewarded: env[`VITE_ADMOB_${P}_REWARDED`]
};

// Frequenze standard Ikonet: mai sotto questi valori (norme AdMob / Apple)
const INTERSTITIAL_EVERY_N_ACTIONS = 2;
const MIN_GAP_BETWEEN_FULLSCREEN_MS = 45 * 1000;
const APP_OPEN_MIN_BACKGROUND_MS = 20 * 1000;
const APP_OPEN_LOAD_TIMEOUT_MS = 8000;

const read = (k, f) => { try { return JSON.parse(localStorage.getItem(k)) ?? f; } catch { return f; } };
const write = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* storage non disponibile */ } };

const TEST_ADS_KEY = 'patente.testAds';
const USE_TEST_ADS = env.DEV || !REAL_IDS.banner || read(TEST_ADS_KEY, false);
const AD_IDS = USE_TEST_ADS ? TEST_IDS[platform] || TEST_IDS.android : REAL_IDS;
// Solo in sviluppo: ?storeshot mostra l'interfaccia d'acquisto nativa per gli screenshot degli store
const previewNative = env.DEV && typeof location !== 'undefined' && location.search.includes('storeshot');

export const ads = {
  native: native || previewNative,
  canDemo: env.DEV && !native,
  proPrice: previewNative ? '2,99 €' : null,
  adsReady: false,
  rewardedReady: false,
  bannerHeight: 0,
  testAds: USE_TEST_ADS,
  diag: []
};
const listeners = new Set();
function changed() { listeners.forEach(l => l(ads)); }
export function onMonetization(fn) { listeners.add(fn); return () => listeners.delete(fn); }

export function diag(msg) {
  ads.diag = [...ads.diag.slice(-30), `${new Date().toLocaleTimeString()} ${msg}`];
  console.info('[ads]', msg);
  changed();
}

let lastFullscreenAt = 0, actionCount = 0, backgroundedAt = 0;
let interstitialLoaded = false, appOpenLoaded = false, fullscreenShowing = false, rewardEarned = false;
const sleep = ms => new Promise(r => setTimeout(r, ms));
const adsAllowed = () => native && ads.adsReady && !store.pro;

function setBannerHeight(h) {
  ads.bannerHeight = h;
  document.documentElement.style.setProperty('--banner-h', `${h}px`);
  changed();
}

async function prepareInterstitial() {
  try { await AdMob.prepareInterstitial({ adId: AD_IDS.interstitial, isTesting: USE_TEST_ADS }); interstitialLoaded = true; diag('interstitial caricato'); }
  catch (err) { interstitialLoaded = false; diag(`interstitial non disponibile: ${err?.message || err}`); }
}
async function prepareRewarded() {
  try { await AdMob.prepareRewardVideoAd({ adId: AD_IDS.rewarded, isTesting: USE_TEST_ADS }); ads.rewardedReady = true; }
  catch { ads.rewardedReady = false; }
  changed();
}
async function loadAppOpen() {
  try { await AdMob.loadAppOpen({ adId: AD_IDS.appOpen }); appOpenLoaded = true; diag('app open caricato'); }
  catch (err) { appOpenLoaded = false; diag(`app open non disponibile: ${err?.message || err}`); }
}
async function showAppOpen() {
  if (!adsAllowed() || fullscreenShowing) return;
  if (!appOpenLoaded) await Promise.race([loadAppOpen(), sleep(APP_OPEN_LOAD_TIMEOUT_MS)]);
  if (!appOpenLoaded) return;
  try { fullscreenShowing = true; appOpenLoaded = false; await AdMob.showAppOpen(); lastFullscreenAt = Date.now(); }
  catch { fullscreenShowing = false; }
}
async function showInterstitialNow() {
  try { fullscreenShowing = true; interstitialLoaded = false; await AdMob.showInterstitial(); lastFullscreenAt = Date.now(); }
  catch { /* nessun annuncio disponibile */ }
  finally { fullscreenShowing = false; prepareInterstitial(); }
}
async function showBanner() {
  if (!adsAllowed()) return;
  try { await AdMob.showBanner({ adId: AD_IDS.banner, adSize: BannerAdSize.ADAPTIVE_BANNER, position: BannerAdPosition.BOTTOM_CENTER, margin: 0, isTesting: USE_TEST_ADS }); diag('banner richiesto'); }
  catch (err) { diag(`banner errore: ${err?.message || err}`); }
}
async function removeAllAds() {
  if (!native) return;
  try { await AdMob.removeBanner(); } catch { /* nessun banner */ }
  setBannerHeight(0);
}

async function waitUntilActive() {
  const { isActive } = await CapApp.getState();
  if (isActive) return;
  await new Promise(resolve => {
    const handle = CapApp.addListener('appStateChange', ({ isActive: a }) => { if (a) { handle.then(h => h.remove()); resolve(); } });
  });
}

// ATT: chiesto dal codice nativo (SceneDelegate.swift); qui si aspetta al massimo 10 s.
async function requestTrackingPermission() {
  if (platform !== 'ios') return;
  try {
    await waitUntilActive();
    for (let waited = 0; waited <= 10000; waited += 1000) {
      const { status } = await AdMob.trackingAuthorizationStatus();
      if (status !== 'notDetermined') { diag(`ATT: ${status}`); return; }
      if (waited === 3000) AdMob.requestTrackingAuthorization().catch(() => {});
      await sleep(1000);
    }
    diag('ATT: nessuna risposta in 10 s, si prosegue');
  } catch (err) { diag(`ATT errore: ${err?.message || err}`); }
}

// Consenso GDPR (UMP) PRIMA dell'ATT, come indica Google.
async function gatherConsent() {
  let canRequestAds = true;
  try {
    let info = await Promise.race([AdMob.requestConsentInfo(), sleep(10000).then(() => { throw new Error('UMP timeout'); })]);
    diag(`UMP: stato=${info.status} modulo=${info.isConsentFormAvailable} canRequestAds=${info.canRequestAds}`);
    if (info.isConsentFormAvailable && info.status === AdmobConsentStatus.REQUIRED) {
      info = await AdMob.showConsentForm();
      diag(`UMP dopo il modulo: stato=${info.status} canRequestAds=${info.canRequestAds}`);
    }
    canRequestAds = info.canRequestAds !== false;
    ads.privacyOptions = info.privacyOptionsRequirementStatus === 'REQUIRED';
  } catch (err) { diag(`UMP errore: ${err?.message || err}`); }
  await requestTrackingPermission();
  return canRequestAds;
}

/** Da chiamare una volta all'avvio. */
export async function initMonetization() {
  if (!native) return;
  await Promise.race([refreshProStatus(), sleep(4000)]);
  if (store.pro) return;
  diag(`avvio: test=${USE_TEST_ADS} piattaforma=${platform}`);
  const canRequestAds = await gatherConsent();
  if (!canRequestAds && !USE_TEST_ADS) { diag('annunci non consentiti (consenso GDPR mancante)'); return; }
  try { await AdMob.initialize({ initializeForTesting: USE_TEST_ADS }); }
  catch (err) { diag(`AdMob initialize errore: ${err?.message || err}`); return; }
  ads.adsReady = true; changed();
  diag('AdMob pronto');
  AdMob.addListener(BannerAdPluginEvents.SizeChanged, size => setBannerHeight(size.height || 0));
  AdMob.addListener(BannerAdPluginEvents.Loaded, () => diag('banner caricato'));
  AdMob.addListener(BannerAdPluginEvents.FailedToLoad, err => diag(`banner fallito: ${err?.message || err?.code || JSON.stringify(err)}`));
  AdMob.addListener(AppOpenAdPluginEvents.Closed, () => { fullscreenShowing = false; lastFullscreenAt = Date.now(); loadAppOpen(); });
  AdMob.addListener(AppOpenAdPluginEvents.FailedToShow, () => { fullscreenShowing = false; loadAppOpen(); });
  AdMob.addListener(RewardAdPluginEvents.Rewarded, () => { rewardEarned = true; });

  showBanner();
  await prepareInterstitial();
  prepareRewarded();
  await showAppOpen();
  if (!fullscreenShowing && Date.now() - lastFullscreenAt > MIN_GAP_BETWEEN_FULLSCREEN_MS && interstitialLoaded) await showInterstitialNow();

  CapApp.addListener('appStateChange', ({ isActive }) => {
    if (!isActive) { backgroundedAt = Date.now(); return; }
    const away = backgroundedAt ? Date.now() - backgroundedAt : 0;
    if (away >= APP_OPEN_MIN_BACKGROUND_MS && Date.now() - lastFullscreenAt >= MIN_GAP_BETWEEN_FULLSCREEN_MS) showAppOpen();
  });
}

/** Nei punti di passaggio (cambio schermata, fine quiz): interstitial ogni N azioni, con distanza minima. */
export async function trackAdAction() {
  if (!adsAllowed() || fullscreenShowing) return;
  actionCount += 1;
  if (actionCount % INTERSTITIAL_EVERY_N_ACTIONS !== 0) return;
  if (Date.now() - lastFullscreenAt < MIN_GAP_BETWEEN_FULLSCREEN_MS) return;
  if (!interstitialLoaded) { prepareInterstitial(); return; }
  await showInterstitialNow();
}

/** Video premio: true solo se AdMob conferma che è stato guardato fino alla fine. */
export async function watchRewardedVideo() {
  if (!adsAllowed()) return false;
  try {
    fullscreenShowing = true; rewardEarned = false;
    await AdMob.showRewardVideoAd();
    lastFullscreenAt = Date.now();
    return rewardEarned;
  } catch { return false; }
  finally { fullscreenShowing = false; ads.rewardedReady = false; changed(); prepareRewarded(); }
}

// ---------- Pro ----------
function setPro(v) { store.setPro(v); if (v) removeAllAds(); changed(); }

function ownsPro(purchases) {
  return (purchases || []).some(p => p.productIdentifier === PRO_PRODUCT_ID && (platform !== 'android' || p.purchaseState === '1' || p.purchaseState == null));
}

export async function refreshProStatus() {
  if (!native) return;
  try {
    const { purchases } = await NativePurchases.getPurchases({ productType: PURCHASE_TYPE.INAPP });
    setPro(ownsPro(purchases));
  } catch (err) { console.info('Verifica Pro non riuscita', err); }
  NativePurchases.getProduct({ productIdentifier: PRO_PRODUCT_ID, productType: PURCHASE_TYPE.INAPP })
    .then(({ product }) => { ads.proPrice = product?.priceString || null; changed(); })
    .catch(() => { /* prodotto non ancora configurato */ });
}

export async function buyPro() {
  if (!native) { if (ads.canDemo) { setPro(true); return true; } throw new Error('only-in-app'); }
  const tx = await NativePurchases.purchaseProduct({ productIdentifier: PRO_PRODUCT_ID, productType: PURCHASE_TYPE.INAPP, quantity: 1 });
  if (tx?.productIdentifier === PRO_PRODUCT_ID) setPro(true);
  return store.pro;
}

export async function restorePro() {
  if (!native) return store.pro;
  try { await NativePurchases.restorePurchases(); } catch { /* si prosegue con la lettura */ }
  await refreshProStatus();
  return store.pro;
}

/** Interruttore nascosto (7 tocchi sul logo): annunci di test on/off, serve riavviare l'app. */
export function toggleTestAds() {
  const next = !read(TEST_ADS_KEY, false);
  write(TEST_ADS_KEY, next);
  return next;
}

/** "Revocation link" required by Google: lets the user change ad consent at any time. */
export async function showPrivacyOptions() {
  if (!native) return;
  try { await AdMob.showPrivacyOptionsForm(); } catch (err) { diag(`privacy options: ${err?.message || err}`); }
}
