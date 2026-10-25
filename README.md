# 🚗 DriveMaster World • Piattaforma Ufficiale per la Patente 2026

![DriveMaster World Banner](public/images/cockpit_view.jpg)

**DriveMaster World** è una piattaforma digitale all-in-one per la preparazione all'esame teorico e pratico di guida per **tutte le categorie di patente (AM, A1, A2, A, B1, B, BE, C1, C, CE, D1, D, DE, CQC/CAP)**.
Sviluppata per supportare standard multi-paese e multi-lingua, integra tutte le funzionalità di riferimento di **Quiz Patente Ufficiale 2026**, un **Simulatore di Guida 3D interattivo** e un modulo **PRO** completo di agenda guide e gestione esame.

---

## 🌟 Caratteristiche Principali

### 🛑 1. Lezioni di Segnaletica Stradale Ufficiale
- Suddivisione rigorosa nelle 7 categorie ministeriali:
  - ⚠️ **Segnali di Pericolo** (posti a 150m dal pericolo)
  - 🛑 **Segnali di Precedenza** (STOP, Dare Precedenza, Diritto di Precedenza, Rotatoria)
  - 🚫 **Segnali di Divieto** (Divieti di transito, senso vietato, divieto di sorpasso per mezzi pesanti)
  - 🔵 **Segnali di Obbligo** (Direzioni obbligatorie, catene da neve / pneumatici invernali)
  - ℹ️ **Segnali di Indicazione** (Autostrada, sensi unici, corsie e servizi)
  - ➖ **Segnaletica Orizzontale** (Strisce continue, tratteggiate, linee di arresto)
  - 🚥 **Segnali Luminosi & Pannelli Integrativi** (Corsie reversibili, pannelli di estesa e distanza)
- **Scheda Didattica Interattiva per Segnale**:
  - Immagini vettoriali SVG ad alta definizione
  - Articolo del Codice della Strada e figura ministeriale
  - Schede dedicate: *Norma Ufficiale*, *Cosa è consentito / vietato*, *Trabocchetti d'Esame*
  - **Mini-Quiz Rapido sul Segnale**: test immediato di verifica con punteggio memorizzato
  - **Sintesi Vocale Audio (TTS)**: ascolto della spiegazione a voce in qualsiasi lingua.

### 📝 2. Quiz Ministeriali Ufficiali 2026
- **Simulazione Esame Ufficiale**: 30 quiz in 20 minuti con massimo 3 errori (Italia) o 40 quiz con max 5 errori (Francia / Code de la route).
- **Matrice Numerata 1-30**: griglia di navigazione rapida con stato risposta e bandierina di revisione 🚩.
- **Tasto "💡 Suggerimento & Teoria Segnale"**: consulta la teoria del cartello durante l'allenamento.
- **Domande Trabocchetto**: sezione per allenarsi sulle formulazioni più insidiose.
- **Ripasso Errori (Boîte à erreurs)**: archivio dinamico delle domande errate.

### 📑 3. Revisione Schede Svolte (Storico Esami)
- Archivio completo di tutte le sessioni di quiz ed esami effettuati.
- Riapertura della scheda d'esame con indicazione visiva della risposta fornita, della risposta corretta ministeriale e della spiegazione dettagliata.

### 👓 4. Accessibilità DSA (Font EasyReading)
- Toggle rapido per attivare il font ad alta leggibilità `Lexend` con spaziatura e interlinea ottimizzati per utenti con dislessia o affaticamento visivo.

### 🏫 5. Portale Mia Autoscuola
- Tesserino allievo con **Codice Candidato Univoco** (`DM-2026-IT-9812`) e QR Code.
- Collegamento con l'autoscuola partner e bacheca con note didattiche del docente di teoria.

### 🎮 6. Simulatore di Guida Pratica 3D [Esclusiva PRO]
- Simulatore interattivo in Canvas 2D/3D con fisica del veicolo, cruscotto digitale, tachimetro, contagiri, volante rotante, frecce di direzione cliccabili, cambio D/R e pedali virtuali.
- **Sintetizzatore Audio Web Audio API**: rombo motore proporzionale ai giri (RPM), sensori di parcheggio a ultrasuoni con frequenza di bip scalata alla distanza, fischio di frenata e clacson bitonale.
- **4 Scenari d'Esame**:
  1. *Parcheggio a S con radar*: telemetria dei centimetri dal marciapiede.
  2. *Incrocio & Precedenze*: verifica della precedenza a destra con veicoli in transito.
  3. *Frenata di Emergenza a 50 km/h*: misura del tempo di reazione in millisecondi.
  4. *Autostrada & Sorpasso*: controllo corsie e angolo cieco.

### 📅 7. Agenda & Pianificazione Esame [PRO]
- Prenotazione delle guide pratiche con istruttori (*Marco Rossi*, *Sarah Dupont*, *Carlos Vega*).
- **Registro Ore Obbligatorie Certificate**: monitoraggio delle 6 ore obbligatorie (Notturna, Autostrada, Extraurbana).
- Conto alla rovescia per la data ufficiale dell'esame e checklist documenti obbligatori.
- Registro presenze alle lezioni teoriche in autoscuola.

---

## 🌍 Paesi e Lingue Supportate

- 🇫🇷 **Francia** (*Code de la Route*) - Lingua predefinita: Francese
- 🇮🇹 **Italia** (*Codice della Strada*) - Lingua predefinita: Italiano
- 🇪🇸 **Spagna** (*Código de Tráfico DGT*) - Lingua predefinita: Spagnolo
- 🇩🇪 **Germania** (*StVO Führerschein*) - Lingua predefinita: Tedesco
- 🇬🇧 **Regno Unito** (*DVSA Highway Code*) - Lingua predefinita: Inglese
- 🇨🇮 **Costa d'Avorio / UEMOA** (*Code de la route OSER*)

---

## 🛠️ Tecnologie Utilizzate

- **Core**: HTML5, CSS3 Vanilla (Design system luxury automotive), Modern JavaScript (ES Modules).
- **Build Tool**: Vite 5.
- **Audio & Sintesi**: Web Audio API per effetti veicolari realistici + Web Speech API (SpeechSynthesis) per lettura vocale multilingua.
- **Grafica & Animazioni**: Canvas 2D/3D ad alte prestazioni (60 FPS) + canvas-confetti.

---

## 🚀 Avvio Locale

```bash
# Installa le dipendenze
npm install

# Avvia il server di sviluppo
npm run dev

# Compila per la produzione
npm run build
```

---

Sviluppato con passione per l'eccellenza nella formazione e sicurezza stradale.
