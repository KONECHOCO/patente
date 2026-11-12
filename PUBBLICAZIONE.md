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

1. **Chiave di firma**: creata il 06/11/2026 in `C:\Users\rebic\Desktop\master\PATENTE_ANDROID_SIGNING` (`patente-upload.jks`, alias `patente`, password in `keystore-info.txt`). Su Codemagic è salvata come variabili protette del gruppo **patente_signing** (`CM_KEYSTORE`, `CM_KEYSTORE_PASSWORD`, `CM_KEY_ALIAS`, `CM_KEY_PASSWORD`). Non perderla: Google Play accetta aggiornamenti solo firmati con questa chiave di caricamento.
2. AAB 1.0.0 (versionCode 2, 8,5 MB) caricato il 07/11/2026 nella release **bozza** del canale *Test chiusi - Alpha*. Tester come CineGuide: Alpha → gruppo Google `testers-community@googlegroups.com`; canale *tester4* → elenco email `tester4` (23 utenti, release ancora da creare con "Aggiungi dalla raccolta"). Account personale: per la produzione servono 12 tester per 14 giorni.
   Fatti anche: norme sulla privacy, dettagli di accesso (nessuna restrizione), annunci (sì), schede in it/en-US/fr-FR/es-ES/de-DE (testi e 7 screenshot per lingua; icona e feature graphic comuni), classificazione contenuti (IARC: educativa, acquisti digitali), pubblico 16-17 e 18+, Data Safety (posizione approssimativa, interazioni, crash, diagnostica, ID dispositivo: raccolti e condivisi per analisi/pubblicità, facoltativi via consenso, cifrati in transito), app governative/finanziarie/salute: no, categoria Istruzione, contatti, ID pubblicità: sì.
   Prodotto `patente_pro` attivo (opzione `patente-pro`, retrocompatibile, 2,99 € convertito in 174 paesi). Release 1.0.0 confermata in Alpha e tester4 (178 paesi ciascuno).
   **Inviate in revisione** il 07/11/2026 (24 modifiche, test chiuso). Dopo l'approvazione: 14 giorni con ≥12 tester, poi richiesta di accesso alla produzione.
   Risposta ad Apple per 4.3 inviata il 07/11/2026.
   **Respinta da Google il 09/11/2026** per *Misleading Claims — Missing Source Link for Government Information*. Correzione nella 1.0.1: scheda "Fonti ufficiali" con link governativi (Home, Impostazioni, ogni capitolo, quiz ufficiali), dichiarazione di indipendenza, link nelle descrizioni dello store in 5 lingue (salvate in Console il 09/11).
   La 1.0.1 aggiunge anche i quiz ministeriali ufficiali (listato MIT «Patente AB», 7.020 affermazioni, `scripts/build-ministeriale.mjs`), correzioni a incroci e simulatore.
   AAB 1.0.1 (versionCode 3, 9,7 MB grazie alle figure in WebP) caricato il 09/11/2026 in Alpha e tester4; 25 modifiche pronte in Panoramica della pubblicazione, da inviare in revisione.
   Aggiornato il 09/11: bozze sostituite con il bundle 4 (1.0.1, nuovi comandi del simulatore) in Alpha e tester4; 25 modifiche **inviate in revisione** il 09/11/2026.
   **Respinta di nuovo il 12/11/2026** per lo stesso motivo: Google aveva esaminato la descrizione vecchia, perché le modifiche alla scheda erano rimaste "Modifiche alla bozza" (solo "Salva come bozza"). Correzione: avviso "non rappresenta un ente governativo" + FONTI UFFICIALI con link **in cima** alle 5 descrizioni, scheda confermata con Avanti → Salva (ora compare tra le modifiche da inviare). Regola: dopo ogni modifica alla scheda fare sempre Avanti → Salva, non solo bozza.
   iOS: build 3 (1.0.0) caricata il 09/11/2026, in TestFlight per il gruppo interno "Developer". Collegata alla versione 1.0.0 (respinta per 4.3), descrizioni con fonti ufficiali, **reinviata in revisione** il 09/11/2026 insieme al Pro (stato Waiting for Review). Per reinviare: aprire la versione, "Update Review", poi "Resubmit to App Review".
   Versione web di prova (Pro sbloccabile gratis, `noindex`): https://konechoco.github.io/patente/app/ — build con `VITE_DEMO=1 npx vite build --base /patente/app/` (da PowerShell: Git Bash riscrive il percorso di `--base`), copiata nel repo KONECHOCO.github.io.
   Caricamento AAB: dal browser di Claude il limite è 10 MB. Il service account `cercalibri-google-play` non ha accesso a questa app (403): per caricare via API va aggiunto in Play Console → Utenti e autorizzazioni.
3. Prodotto in-app `patente_pro` a 2,99 € (Play lo permette solo dopo il primo AAB).
4. Scheda dello store in 5 lingue (testi in `store-assets/listing.json`, campi `name`, `playShort`, `description`), icona e feature graphic in `store-assets/play/`, screenshot `*-android-1080x1920.png`.
5. Questionari: classificazione dei contenuti, Data Safety (stesse categorie di App Privacy), pubblico di destinazione (13+), annunci: sì, accesso all'app: nessun login.
6. Dopo l'approvazione: "Aggiungi store" su AdMob per l'app Android.

## Rigenerare gli asset

- Screenshot: `npm run dev`, poi `node scripts/capture-store-screenshots.mjs all all`.
- Limiti dei testi: `node scripts/check-listing.mjs`.
- Icone: `node scripts/render-icon.mjs` e `@capacitor/assets` (vedi skill pubblica-app).
