# Patente Facile — stato della pubblicazione

Aggiornato al 26/10/2026.

## App Store (iOS) — inviata in revisione

| Cosa | Valore |
|---|---|
| App | Patente Facile: Quiz e Guida — Apple ID **6827001306**, bundle `com.ikonet.patente`, SKU `patente` |
| Versione | 1.0.0, build 2 (Codemagic `ios-app-store`), **WAITING_FOR_REVIEW**, rilascio **manuale** |
| Lingue | it (principale), en-US, fr-FR, es-ES, de-DE: nome, sottotitolo, keyword, testo promozionale, descrizione |
| Screenshot | iPhone 6,9" e iPad 13", 7 per lingua (`store-assets/screenshots/<lingua>`) |
| Pro | `patente_pro`, non consumabile, **2,99 €**, nello stesso invio |
| App Privacy | pubblicata (profilo AdMob, nessuna posizione precisa) |
| Categorie | Education, Reference |
| Siti | marketing `https://konechoco.github.io/` (app-ads.txt), privacy `https://konechoco.github.io/patente/privacy.html` |

Dopo l'approvazione: rilasciare a mano su App Store Connect, poi su AdMob **"Aggiungi store"** per l'app iOS.

## AdMob

- App iOS `ca-app-pub-1151868778464777~4470524129`, Android `~7970785438`, 4 unità ciascuna (in `.env.production`).
- Messaggio GDPR (it, en, fr, es, de, "Nega il consenso" attivo) e messaggio esplicativo IDFA pubblicati.

## Google Play — app creata, mancano i passi seguenti

App "Patente Facile: Quiz e Guida", pacchetto `com.ikonet.patente`, id Console 4973164405457198048, gratuita, italiano.

1. **Chiave di firma (la crei tu)**:
   ```
   "C:\Program Files\Android\Android Studio\jbr\bin\keytool.exe" -genkeypair -v -keystore C:\Users\rebic\Desktop\master\PATENTE_ANDROID_SIGNING\patente-upload.jks -alias patente -keyalg RSA -keysize 2048 -validity 10000
   ```
   Poi Codemagic → Team settings → Code signing identities → Android keystores → carica il file con nome di riferimento **patente_android** (stessa alias e password).
2. Build `android-release` su Codemagic → AAB → primo caricamento manuale in **Test interno**.
3. Prodotto in-app `patente_pro` a 2,99 € (Play lo permette solo dopo il primo AAB).
4. Scheda dello store in 5 lingue (testi in `store-assets/listing.json`, campi `name`, `playShort`, `description`), icona e feature graphic in `store-assets/play/`, screenshot `*-android-1080x1920.png`.
5. Questionari: classificazione dei contenuti, Data Safety (stesse categorie di App Privacy), pubblico di destinazione (13+), annunci: sì, accesso all'app: nessun login.
6. Dopo l'approvazione: "Aggiungi store" su AdMob per l'app Android.

## Rigenerare gli asset

- Screenshot: `npm run dev`, poi `node scripts/capture-store-screenshots.mjs all all`.
- Limiti dei testi: `node scripts/check-listing.mjs`.
- Icone: `node scripts/render-icon.mjs` e `@capacitor/assets` (vedi skill pubblica-app).
