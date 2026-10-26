# Patente Facile · Permis Facile · Easy Licence

App web (Vite + JavaScript, nessun framework) per preparare la patente in **6 paesi**, con il paese e la lingua rilevati automaticamente dal dispositivo e modificabili in qualsiasi momento.

| Paese | Lingue contenuti | Esame teorico simulato |
|---|---|---|
| 🇮🇹 Italia | IT · EN | 30 affermazioni Vero/Falso, 20 min, max 3 errori (AM: 30 min) |
| 🇫🇷 France | FR · EN | 40 QCM (anche più risposte esatte), 30 min, min 35/40 |
| 🇪🇸 España | ES · EN | 30 preguntas a 3 opciones, 30 min, max 3 fallos |
| 🇩🇪 Deutschland | DE · EN | 30 Fragen, Fehlerpunkte 2–5, max 10, mai due da 5 |
| 🇬🇧 United Kingdom | EN | 50 domande, 43 per passare (guida a sinistra, mph) |
| 🇨🇮 Côte d'Ivoire | FR · EN | formato indicativo 40 QCM (dato ufficiale non pubblicato) |

L'interfaccia è disponibile in italiano, francese, inglese, spagnolo e tedesco. Se un contenuto non esiste nella lingua scelta viene mostrato in inglese (o nella lingua del paese), con un avviso.

## Funzioni (modello: Quiz Patente Ufficiale 2026)

- **Teoria per capitoli ufficiali**: i 25 argomenti del programma ministeriale italiano, i 10 temi ETG francesi, i temi DGT, Grundstoff/Zusatzstoff tedeschi, i topic DVSA. Lezioni con esempi, foto, segnali collegati e lettura vocale (velocità regolabile).
- **Segnali stradali**: 130+ cartelli disegnati in SVG con codice ufficiale per paese (FR A1a…, ES P-13a…, DE VZ 103…), significato in 5 lingue, consigli d'esame e mini-quiz.
- **Quiz**: per capitolo, rapido, ripasso errori, domande trabocchetto, quiz segnali, con correzione immediata, spiegazione e suggerimento di teoria.
- **Simulazione d'esame** con timer, griglia delle domande, bandierine e le regole di promozione di ogni paese; **schede svolte** riapribili.
- **Incroci**: 60 scenari generati e risolti dal motore delle precedenze (destra, STOP, dare precedenza, svolta a sinistra, tram, mezzi di soccorso), con modalità "ordine di passaggio" e "vero/falso" e animazione della soluzione.
- **Statistiche**: preparazione, precisione, attività giornaliera, avanzamento per capitolo, argomenti deboli.
- **Accessibilità**: font EasyReading (Lexend) per DSA, tema scuro, lettura vocale.

## Versione Pro

- **Simulatore di guida**: vista 3D dal posto di guida (con specchietto retrovisore e cruscotto), vista esterna e dall'alto; città con semafori, STOP, rotatoria, strisce pedonali con pedoni, traffico, parcheggi. 7 prove (percorso d'esame, STOP, rotatoria, parcheggio in linea, a pettine, notturna, libera). L'esaminatore registra errori lievi, gravi ed eliminatori (cintura, frecce, specchietti, velocità, contromano, striscia continua, semaforo rosso, STOP, precedenze, pedoni, marciapiede, urti). Comandi da tastiera e touch.
- **Agenda**: guide con ore svolte per tipo di percorso (con le ore obbligatorie del paese), lezioni di teoria frequentate, appuntamenti d'esame con conto alla rovescia in Home, esportazione `.ics` nel calendario.

L'attivazione Pro è al momento una modalità demo: l'acquisto in-app va collegato alla pubblicazione sugli store.

## Struttura

```
src/
  main.js              router e shell
  core/                stato persistente (localStorage) e testi dell'interfaccia
  data/countries.js    regole d'esame, limiti, alcol, punti, categorie per paese
  content/             corsi per paese (it/part1-3 + extra, fr, es, de, uk, ci) e normalizzazione
  signs/               disegno SVG dei segnali e catalogo
  incroci/engine.js    generatore, risolutore e disegno degli incroci
  simulator/           mondo, motore di guida, audio
  pro/agenda.js        dati dell'agenda
  views/               schermate
```

## Avvio

```bash
npm install
npm run dev
```

## Nota sui contenuti

Le domande sono scritte sul modello dei listati ufficiali e verificate su fonti pubbliche (ottobre 2026), ma **non sono la copia della banca dati ministeriale**. Dove le fonti ufficiali non sono chiare (es. formato d'esame ivoriano) l'app lo segnala. Consultare sempre l'autoscuola e i siti istituzionali.
