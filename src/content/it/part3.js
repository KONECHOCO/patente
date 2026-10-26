// Italia – capitoli 18-25

export default [
  {
    id: 'it-18', n: 18, icon: '💡',
    t: ['Uso delle luci e dei dispositivi acustici, spie e simboli', 'Lights, horn, warning lamps and symbols'],
    lessons: [
      { h: ['Le luci del veicolo', 'Vehicle lights'], b: [
`- **Luci di posizione**: rendono visibile il veicolo fermo o in sosta; da sole non bastano per circolare di notte.
- **Anabbaglianti** (luci di incrocio): illuminano circa **40 m** senza abbagliare. Obbligatori di notte, in galleria, con scarsa visibilità e, **fuori dai centri abitati**, anche di giorno (o luci diurne DRL). Moto e ciclomotori: sempre accesi.
- **Abbaglianti** (luci di profondità): illuminano circa **100 m**; si usano fuori dai centri abitati quando non c'è pericolo di abbagliare. Vanno spenti quando si incrocia o si segue un veicolo e in presenza di pedoni.
- **Fendinebbia anteriori**: con nebbia, neve, pioggia intensa (possono sostituire gli anabbaglianti con nebbia).
- **Retronebbia**: solo con visibilità inferiore a **50 m**; abbagliano chi segue.
- **Luci di emergenza** (quattro frecce): veicolo fermo che costituisce pericolo, durante il traino in avaria, per segnalare una **coda improvvisa** o rallentamento brusco.
- **Lampeggio** con gli abbaglianti: si può usare fuori dai centri abitati per segnalare l'intenzione di sorpassare.`,
`- **Side/position lights**: make a parked vehicle visible; alone they are not enough to drive at night.
- **Dipped beams**: about **40 m**, no dazzle. Compulsory at night, in tunnels, in poor visibility and **outside built-up areas** even by day (or DRL). Motorcycles and mopeds: always on.
- **Main beams**: about **100 m**; outside towns when there is no risk of dazzling; switch off when meeting or following vehicles or near pedestrians.
- **Front fog lights**: in fog, snow, heavy rain.
- **Rear fog light**: only with visibility under **50 m**; it dazzles followers.
- **Hazard lights**: vehicle stopped as a hazard, while towing a broken-down vehicle, to warn of a **sudden queue**.
- **Headlight flash**: outside towns, to signal you are about to overtake.`] },
      { h: ['Clacson e spie del cruscotto', 'Horn and dashboard lamps'], b: [
`**Clacson:** nei **centri abitati** è vietato salvo pericolo immediato; fuori dai centri abitati si usa con brevi segnali per avvertire, ad esempio prima di sorpassare o in curva senza visibilità.

**Spie del cruscotto (colori):**
- **Rosso** = pericolo o guasto grave: fermarsi appena possibile (pressione olio, temperatura motore, freni/liquido freni, batteria/alternatore, airbag).
- **Giallo/arancio** = avviso o malfunzionamento: far controllare (avaria motore, ABS, ESP, pressione pneumatici, riserva carburante, candelette).
- **Verde** = dispositivo acceso (anabbaglianti, frecce, luci di posizione, fendinebbia anteriori).
- **Blu** = **abbaglianti** accesi.`,
`**Horn:** in **built-up areas** forbidden except for immediate danger; outside, use short blasts to warn, e.g. before overtaking or on blind bends.

**Dashboard lamps (colours):**
- **Red** = danger or serious fault: stop as soon as possible (oil pressure, engine temperature, brakes, battery/alternator, airbag).
- **Yellow/amber** = warning: have it checked (engine fault, ABS, ESP, tyre pressure, low fuel, glow plugs).
- **Green** = device on (dipped beams, indicators, side lights, front fogs).
- **Blue** = **main beams** on.`] }
    ],
    q: [
      ['Gli anabbaglianti illuminano la strada per circa 40 metri.', 'Dipped beams light the road for about 40 m.', true, 'Gli abbaglianti circa 100 m.', 'Main beams about 100 m.'],
      ['Fuori dai centri abitati gli anabbaglianti (o le luci diurne) vanno accesi anche di giorno.', 'Outside towns dipped beams (or DRL) must be on also by day.', true, 'Obbligo per tutti i veicoli a motore.', 'Required for all motor vehicles.'],
      ['Gli abbaglianti si possono usare in centro abitato se la strada è poco illuminata e c\'è traffico.', 'Main beams may be used in town on dark busy roads.', false, 'Si usano fuori dai centri abitati e senza abbagliare.', 'Outside towns and without dazzling.'],
      ['Gli abbaglianti vanno spenti quando si incrocia un altro veicolo.', 'Main beams must be switched off when meeting another vehicle.', true, 'Per non abbagliare.', 'To avoid dazzling.'],
      ['Il retronebbia si accende solo con visibilità inferiore a 50 metri.', 'The rear fog light is used only below 50 m visibility.', true, 'Altrimenti abbaglia chi segue.', 'Otherwise it dazzles followers.'],
      ['Le luci di emergenza si usano per segnalare una coda improvvisa in autostrada.', 'Hazard lights warn of a sudden queue on the motorway.', true, 'Avvisano chi segue.', 'They warn drivers behind.', 'coda'],
      ['Le luci di posizione sono sufficienti per circolare di notte fuori dai centri abitati.', 'Side lights are enough to drive at night outside towns.', false, 'Servono anabbaglianti o abbaglianti.', 'Dipped or main beams are needed.'],
      ['In galleria è obbligatorio accendere gli anabbaglianti.', 'Dipped beams are compulsory in tunnels.', true, 'Anche se illuminata.', 'Even if lit.', 'galleria-ind'],
      ['Nei centri abitati l\'uso del clacson è vietato salvo pericolo immediato.', 'In towns the horn is banned except for immediate danger.', true, 'Art. 156 CdS.', 'Art. 156.'],
      ['La spia rossa della pressione dell\'olio accesa durante la marcia impone di fermarsi al più presto.', 'A red oil-pressure lamp while driving means stop as soon as possible.', true, 'Rischio di grave danno al motore.', 'Risk of serious engine damage.'],
      ['La spia blu indica che sono accesi gli abbaglianti.', 'The blue lamp means main beams are on.', true, 'È l\'unica spia blu comune.', 'The common blue lamp.'],
      ['Una spia gialla indica sempre un pericolo immediato e obbliga a fermarsi subito.', 'A yellow lamp always means immediate danger and requires an instant stop.', false, 'Il giallo è un avviso; il rosso indica pericolo.', 'Yellow is a warning; red means danger.'],
      ['I ciclomotori e i motocicli devono avere le luci accese anche di giorno.', 'Mopeds and motorcycles must have lights on by day.', true, 'Su tutte le strade.', 'On all roads.'],
      ['Fuori dai centri abitati si può usare il lampeggio con gli abbaglianti per segnalare l\'intenzione di sorpassare.', 'Outside towns you may flash main beams to signal overtaking.', true, 'In alternativa al clacson.', 'Instead of the horn.'],
      ['I fendinebbia anteriori possono essere usati con pioggia intensa.', 'Front fog lights may be used in heavy rain.', true, 'Oltre che con nebbia e neve.', 'As well as fog and snow.']
    ]
  },

  {
    id: 'it-19', n: 19, icon: '🦺',
    t: ['Cinture di sicurezza, sistemi di ritenuta per bambini, casco ed equipaggiamenti', 'Seat belts, child restraints, helmet and equipment'],
    lessons: [
      { h: ['Cinture e bambini', 'Seat belts and children'], b: [
`- Le **cinture di sicurezza** sono obbligatorie per conducente e passeggeri, **anteriori e posteriori**. In un urto a 50 km/h una persona senza cintura viene proiettata con una forza pari a molte volte il proprio peso.
- Esenzioni: forze di polizia in servizio, donne in gravidanza con certificato medico, persone con patologie certificate, istruttori di guida.
- **Bambini di statura inferiore a 1,50 m** devono viaggiare su un **sistema di ritenuta omologato** adatto a peso e statura (seggiolino, rialzo).
- Un seggiolino **rivolto all'indietro** non può essere montato sul sedile anteriore se l'**airbag frontale è attivo**.
- Per i bambini sotto i **4 anni** è obbligatorio il **dispositivo antiabbandono**.
- La responsabilità per i minori senza cintura o seggiolino è del **conducente** (o di chi è tenuto alla sorveglianza).`,
`- **Seat belts** are compulsory for driver and passengers, **front and rear**. In a 50 km/h crash an unbelted person is thrown with a force many times their own weight.
- Exemptions: police on duty, pregnant women with a medical certificate, certified medical conditions, driving instructors.
- **Children shorter than 1.50 m** must use an **approved child restraint** suited to weight and height.
- A **rear-facing** child seat must not be fitted in the front if the **front airbag is active**.
- For children under **4** an **anti-abandonment device** is compulsory.
- The **driver** is responsible for unbelted minors.`] },
      { h: ['Casco, pneumatici e dotazioni', 'Helmet, tyres and equipment'], b: [
`- Il **casco omologato e allacciato** è obbligatorio per conducente e passeggero di ciclomotori e motocicli, a qualsiasi età.
- **Pneumatici:** spessore minimo del battistrada **1,6 mm** per autovetture; pressione controllata a freddo; con neve servono pneumatici invernali (M+S) o catene a bordo dove prescritto.
- **Dotazioni:** triangolo, giubbotto retroriflettente (fuori dai centri abitati, di notte o con scarsa visibilità, quando si scende dal veicolo fermo sulla carreggiata).
- **Poggiatesta**: va regolato all'altezza della testa per prevenire il colpo di frusta.
- **Airbag**: integra la cintura, non la sostituisce.`,
`- An **approved, fastened helmet** is compulsory for rider and passenger of mopeds and motorcycles, at any age.
- **Tyres:** minimum tread **1.6 mm** for cars; check pressure cold; in snow winter tyres (M+S) or chains on board where required.
- **Equipment:** warning triangle, reflective vest.
- **Head restraint**: adjust to head height to prevent whiplash.
- **Airbag**: complements the belt, does not replace it.`] }
    ],
    q: [
      ['Le cinture di sicurezza sono obbligatorie anche per i passeggeri dei sedili posteriori.', 'Seat belts are compulsory for rear passengers too.', true, 'Per tutti gli occupanti.', 'For all occupants.'],
      ['In città, a bassa velocità, non è obbligatorio allacciare le cinture.', 'In town at low speed belts are not compulsory.', false, 'L\'obbligo vale su tutte le strade.', 'The obligation applies everywhere.'],
      ['I bambini di statura inferiore a 1,50 m devono usare un sistema di ritenuta omologato.', 'Children under 1.50 m must use an approved child restraint.', true, 'Adatto a peso e statura.', 'Suited to weight and height.'],
      ['Un seggiolino rivolto all\'indietro può stare sul sedile anteriore anche con airbag attivo.', 'A rear-facing seat may go in front with the airbag active.', false, 'L\'airbag deve essere disattivato.', 'The airbag must be deactivated.'],
      ['Per i bambini sotto i 4 anni è obbligatorio il dispositivo antiabbandono.', 'An anti-abandonment device is compulsory for children under 4.', true, 'Evita di dimenticarli in auto.', 'It prevents leaving them in the car.'],
      ['L\'airbag sostituisce la cintura di sicurezza.', 'The airbag replaces the seat belt.', false, 'La integra.', 'It complements it.'],
      ['Il casco è obbligatorio per i conducenti di ciclomotori di qualsiasi età.', 'Helmets are compulsory for moped riders of any age.', true, 'E per i passeggeri.', 'And passengers.'],
      ['Il casco deve essere omologato e allacciato.', 'The helmet must be approved and fastened.', true, 'Un casco slacciato non protegge.', 'An unfastened helmet does not protect.'],
      ['Lo spessore minimo del battistrada per le autovetture è di 1,6 mm.', 'Minimum car tread depth is 1.6 mm.', true, 'Sotto quel valore il pneumatico va sostituito.', 'Below that the tyre must be replaced.'],
      ['La pressione dei pneumatici si controlla a pneumatico freddo.', 'Tyre pressure is checked with cold tyres.', true, 'A caldo risulta più alta.', 'When hot it reads higher.'],
      ['Il poggiatesta va regolato all\'altezza della testa per ridurre il colpo di frusta.', 'The head restraint is adjusted to head height to reduce whiplash.', true, 'Non all\'altezza del collo.', 'Not at neck height.'],
      ['Le donne in gravidanza possono essere esentate dall\'uso delle cinture con certificazione medica.', 'Pregnant women may be exempted with a medical certificate.', true, 'Esenzione prevista dal Codice.', 'Exemption in the Code.'],
      ['Il conducente risponde dell\'uso del seggiolino da parte dei bambini trasportati.', 'The driver is responsible for children using child seats.', true, 'Salvo presenza di chi ne ha la sorveglianza.', 'Unless a guardian is present.'],
      ['Il giubbotto retroriflettente va indossato quando si scende dal veicolo fermo sulla carreggiata fuori dai centri abitati, di notte.', 'The vest must be worn when leaving a vehicle stopped on the road outside towns at night.', true, 'Anche con scarsa visibilità.', 'Also with poor visibility.']
    ]
  },

  {
    id: 'it-20', n: 20, icon: '🪪',
    t: ['Patenti, sanzioni, documenti di circolazione, obblighi verso gli agenti, uso di lenti', 'Licences, penalties, documents, duties to police, glasses'],
    lessons: [
      { h: ['Patente e documenti', 'Licence and documents'], b: [
`- **Patente B**: dai 18 anni; guida autoveicoli fino a 3.500 kg con massimo 8 passeggeri oltre al conducente, anche con rimorchio leggero (fino a 750 kg) o complesso fino a 3.500 kg.
- **Validità** della patente A e B: **10 anni** fino a 50 anni di età, **5 anni** tra 50 e 70, **3 anni** tra 70 e 80, **2 anni** oltre gli 80. Si rinnova con visita medica.
- **Foglio rosa**: autorizzazione a esercitarsi alla guida con istruttore; vale **12 mesi**.
- Documenti da avere a bordo: **patente** e **carta di circolazione / documento unico**. Il veicolo deve essere **assicurato** (RCA) e in regola con la **revisione**.
- **Lenti**: se la patente riporta l'obbligo (codice 01), vanno indossate alla guida.
- **Telefono**: vietato usarlo tenendolo in mano; consentiti vivavoce o auricolare che non richieda l'uso delle mani.`,
`- **Licence B**: from 18; vehicles up to 3,500 kg with max 8 passengers plus driver, also with a light trailer (up to 750 kg) or combinations up to 3,500 kg.
- **Validity** of A and B: **10 years** up to age 50, **5 years** 50–70, **3 years** 70–80, **2 years** over 80. Renewed after a medical.
- **Foglio rosa** (learner permit): practice with an instructor; valid **12 months**.
- On board: **licence** and **registration document**. The vehicle must be **insured** (RCA) and have passed its **roadworthiness test**.
- **Glasses**: if the licence requires them (code 01), they must be worn.
- **Phone**: no hand-held use; hands-free or earpiece allowed.`] },
      { h: ['Sanzioni e patente a punti', 'Penalties and points'], b: [
`- **Sanzioni pecuniarie**: se si paga entro **5 giorni** dalla contestazione o notifica si ha lo **sconto del 30%** (per molte violazioni).
- **Sanzioni accessorie**: sospensione o revoca della patente, fermo o confisca del veicolo.
- **Patente a punti**: si parte da **20 punti**. Le violazioni comportano decurtazioni; per i **neopatentati** (primi 3 anni) i punti tolti sono **raddoppiati**. Due anni senza violazioni danno un bonus fino a 30 punti. A **zero punti** si deve rifare l'esame (revisione).
- **Obblighi verso gli agenti**: fermarsi all'invito, esibire i documenti, sottoporsi ai controlli (alcol, droghe).`,
`- **Fines**: paying within **5 days** of notification gives a **30% discount** (for many offences).
- **Additional penalties**: licence suspension or withdrawal, vehicle seizure or confiscation.
- **Points**: you start with **20**. Offences deduct points; **new drivers** (first 3 years) lose **double**. Two years without offences give a bonus up to 30. At **zero** you must retake the exam.
- **Duties to police**: stop when asked, show documents, undergo checks (alcohol, drugs).`] }
    ],
    q: [
      ['La patente B si può conseguire a 18 anni.', 'Licence B can be obtained at 18.', true, 'Età minima.', 'Minimum age.'],
      ['Con la patente B si possono guidare autoveicoli fino a 3.500 kg di massa complessiva.', 'Licence B covers vehicles up to 3,500 kg.', true, 'Con al massimo 8 passeggeri oltre al conducente.', 'Max 8 passengers plus driver.'],
      ['La patente B di chi ha meno di 50 anni vale 10 anni.', 'A licence B for under-50s is valid 10 years.', true, 'Poi 5, 3 e 2 anni con l\'età.', 'Then 5, 3 and 2 years with age.'],
      ['La patente B di un conducente di 75 anni ha validità 5 anni.', 'A licence B for a 75-year-old is valid 5 years.', false, 'Tra 70 e 80 anni vale 3 anni.', 'Between 70 and 80 it is 3 years.'],
      ['Il foglio rosa ha validità di 12 mesi.', 'The learner permit is valid 12 months.', true, 'Entro questo periodo si sostiene l\'esame pratico.', 'The practical test must be taken within it.'],
      ['La patente a punti assegna inizialmente 20 punti.', 'The points licence starts with 20 points.', true, 'Fino a un massimo di 30 con i bonus.', 'Up to 30 with bonuses.'],
      ['Per i neopatentati, nei primi tre anni, la decurtazione dei punti è raddoppiata.', 'For new drivers in the first three years point deductions are doubled.', true, 'Per incentivare la prudenza.', 'To encourage caution.'],
      ['Esaurendo tutti i punti si deve sostenere di nuovo l\'esame di idoneità.', 'Losing all points requires retaking the exam.', true, 'Revisione della patente.', 'Licence review.'],
      ['Pagando la multa entro 5 giorni si ha diritto, per molte violazioni, allo sconto del 30%.', 'Paying within 5 days gives a 30% discount for many offences.', true, 'Dalla contestazione o notifica.', 'From notification.'],
      ['Durante la guida è consentito usare il telefono tenendolo in mano se si procede lentamente.', 'You may hold a phone while driving slowly.', false, 'È sempre vietato; consentiti vivavoce o auricolare.', 'Always forbidden; hands-free allowed.'],
      ['Se la patente prescrive l\'uso delle lenti, il conducente deve indossarle alla guida.', 'If the licence requires glasses they must be worn while driving.', true, 'Codice 01 sulla patente.', 'Code 01.'],
      ['Durante la guida bisogna avere con sé la patente e la carta di circolazione.', 'You must carry the licence and registration document.', true, 'Documenti obbligatori.', 'Compulsory documents.'],
      ['All\'invito di un agente il conducente deve fermarsi ed esibire i documenti.', 'When asked by police the driver must stop and show documents.', true, 'Obbligo verso gli agenti.', 'Duty to police.'],
      ['La sospensione della patente è una sanzione accessoria.', 'Licence suspension is an additional penalty.', true, 'Si aggiunge a quella pecuniaria.', 'Added to the fine.'],
      ['Con la patente B si può trainare un rimorchio leggero fino a 750 kg.', 'With licence B you may tow a light trailer up to 750 kg.', true, 'Oltre servono condizioni specifiche o la BE.', 'Beyond that, specific conditions or BE.']
    ]
  },

  {
    id: 'it-21', n: 21, icon: '🚑',
    t: ['Incidenti stradali e comportamenti in caso di incidente', 'Road accidents and what to do'],
    lessons: [
      { h: ['Cosa fare subito', 'What to do immediately'], b: [
`In caso di incidente, anche se non si è responsabili, c'è l'obbligo di:
1. **Fermarsi** e non intralciare più del necessario; accendere le **luci di emergenza**.
2. **Proteggere la scena**: indossare il **giubbotto retroriflettente**, posizionare il **triangolo**.
3. **Prestare assistenza** ai feriti e chiamare il **112** (Numero Unico di Emergenza), indicando luogo, numero di feriti e condizioni.
4. Non spostare i veicoli se ci sono feriti, salvo pericolo per la circolazione (in tal caso segnare la posizione).
5. Fornire le proprie generalità e i dati dell'assicurazione alle altre parti.

**Omissione di soccorso** e **fuga** dopo un incidente con feriti sono **reati** puniti con il carcere e la sospensione o revoca della patente.

**Constatazione amichevole (modulo CAI)**: se non ci sono feriti e le parti sono d'accordo, si compila e firma insieme e si invia all'assicurazione; consente un risarcimento più rapido.`,
`After an accident, even if not at fault, you must:
1. **Stop** without obstructing more than necessary; switch on **hazard lights**.
2. **Protect the scene**: put on the **reflective vest**, place the **triangle**.
3. **Help the injured** and call **112** (single emergency number), giving location, number and state of injured.
4. Do not move vehicles if there are injured people, unless they endanger traffic (then mark their position).
5. Give your details and insurance data to the other parties.

**Failing to assist** and **leaving the scene** after an accident with injuries are **crimes**, punished with prison and licence suspension or withdrawal.

**Joint accident report (CAI form)**: if there are no injuries and parties agree, fill it in together and send it to the insurer for faster compensation.`] }
    ],
    q: [
      ['In caso di incidente con feriti il conducente coinvolto deve fermarsi e prestare assistenza.', 'After an accident with injuries the driver must stop and help.', true, 'Obbligo di soccorso.', 'Duty to assist.'],
      ['Chi non è responsabile dell\'incidente può proseguire senza fermarsi.', 'A driver not at fault may continue without stopping.', false, 'L\'obbligo di fermarsi vale per tutti i coinvolti.', 'All involved must stop.'],
      ['Il numero unico di emergenza in Italia è il 112.', 'The single emergency number in Italy is 112.', true, 'NUE 112.', 'NUE 112.'],
      ['Dopo un incidente bisogna segnalare il pericolo con il triangolo.', 'After an accident warn others with the triangle.', true, 'E le luci di emergenza.', 'And hazard lights.'],
      ['La fuga dopo un incidente con feriti è un reato.', 'Leaving the scene after an injury accident is a crime.', true, 'Con gravi sanzioni penali.', 'With serious penalties.'],
      ['Il modulo di constatazione amichevole va compilato solo in presenza della polizia.', 'The joint report form may only be filled in with police present.', false, 'Lo compilano le parti d\'accordo.', 'The parties fill it in by agreement.'],
      ['Il modulo CAI firmato da entrambi i conducenti accelera il risarcimento.', 'A CAI form signed by both drivers speeds up compensation.', true, 'Va inviato all\'assicurazione.', 'Send it to the insurer.'],
      ['Se i veicoli incidentati intralciano gravemente il traffico e non ci sono feriti, si possono spostare.', 'If damaged vehicles block traffic and nobody is hurt, they may be moved.', true, 'Dopo averne segnato la posizione.', 'After marking their position.'],
      ['Dopo l\'incidente bisogna fornire le proprie generalità alle altre persone coinvolte.', 'You must give your details to the others involved.', true, 'Anche i dati assicurativi.', 'And insurance details.'],
      ['Prima di avvicinarsi ai feriti sulla carreggiata è opportuno indossare il giubbotto retroriflettente.', 'Before approaching the injured on the road wear the reflective vest.', true, 'Per essere visibili.', 'To be visible.'],
      ['Nella chiamata al 112 bisogna indicare il luogo e il numero dei feriti.', 'When calling 112 give the location and number of injured.', true, 'Informazioni essenziali.', 'Essential information.'],
      ['L\'omissione di soccorso può comportare la revoca della patente.', 'Failure to assist can lead to licence withdrawal.', true, 'Oltre alla pena.', 'Besides criminal penalty.']
    ]
  },

  {
    id: 'it-22', n: 22, icon: '🍷',
    t: ['Guida e condizioni fisiche e psichiche: alcol, droghe, farmaci, primo soccorso', 'Fitness to drive: alcohol, drugs, medicines, first aid'],
    lessons: [
      { h: ['Alcol e sostanze', 'Alcohol and drugs'], b: [
`- **Limite generale**: tasso alcolemico **0,5 g/l**.
- **Tasso zero** per: **neopatentati** (primi 3 anni), conducenti **sotto i 21 anni**, **conducenti professionali** e di veicoli pesanti.
- Sanzioni crescenti: 0,5–0,8 g/l sanzione amministrativa; oltre **0,8** e oltre **1,5 g/l** è **reato** con sospensione lunga o revoca della patente e, oltre 1,5, confisca del veicolo se di proprietà. La riforma 2024 prevede l'**alcolock** per chi è condannato.
- **Effetti dell'alcol**: aumenta il **tempo di reazione**, riduce il **campo visivo** e la valutazione delle distanze, dà **euforia** e falsa sicurezza, sonnolenza.
- L'alcol si smaltisce lentamente (circa 0,1–0,15 g/l all'ora): **caffè, acqua o doccia fredda non lo eliminano**.
- **Droghe**: guida vietata dopo l'assunzione; sanzioni penali e revoca.
- **Farmaci**: leggere il foglietto; alcuni (ansiolitici, antistaminici, sonniferi) riducono la vigilanza. Il pittogramma con triangolo indica effetti sulla guida.
- **Stanchezza**: pausa ogni 2 ore; il colpo di sonno è una delle prime cause di incidente in autostrada.`,
`- **General limit**: **0.5 g/l** blood alcohol.
- **Zero limit** for **new drivers** (3 years), **under-21s**, **professional** and heavy-vehicle drivers.
- Penalties grow: 0.5–0.8 g/l administrative; over **0.8** and over **1.5 g/l** it is a **crime** with long suspension or withdrawal and, over 1.5, vehicle confiscation. The 2024 reform introduced the **alcolock** for offenders.
- **Effects**: longer **reaction time**, narrower **field of vision**, poor distance judgement, **euphoria**, drowsiness.
- Alcohol is eliminated slowly (about 0.1–0.15 g/l per hour): **coffee, water or a cold shower do not remove it**.
- **Drugs**: driving after use is forbidden; criminal penalties and withdrawal.
- **Medicines**: read the leaflet; some reduce alertness.
- **Fatigue**: take a break every 2 hours.`] },
      { h: ['Primo soccorso', 'First aid'], b: [
`**Regola P.A.S.: Proteggere – Avvertire – Soccorrere.**
- **Proteggere** la scena e se stessi.
- **Avvertire** il 112.
- **Soccorrere** i feriti con i gesti semplici:
  - Ferito **cosciente**: tranquillizzarlo, non dargli da bere, coprirlo.
  - Ferito **incosciente che respira**: **posizione laterale di sicurezza** (salvo sospetto trauma alla colonna).
  - Ferito che **non respira**: chiamare il 112 e iniziare il massaggio cardiaco se si è capaci.
  - **Emorragia**: comprimere la ferita con un panno pulito.
  - **Motociclista**: **non togliere il casco** salvo che non respiri.
  - Non spostare il ferito salvo pericolo immediato (incendio, traffico).`,
`**P.A.S. rule: Protect – Alert – Help.**
- **Protect** the scene and yourself.
- **Alert** 112.
- **Help** with simple actions:
  - **Conscious** casualty: reassure, nothing to drink, keep warm.
  - **Unconscious but breathing**: **recovery position** (unless spinal injury suspected).
  - **Not breathing**: call 112 and start CPR if trained.
  - **Bleeding**: press on the wound with a clean cloth.
  - **Motorcyclist**: **do not remove the helmet** unless they are not breathing.
  - Do not move the casualty unless in immediate danger.`] }
    ],
    q: [
      ['Il limite generale del tasso alcolemico per guidare è 0,5 g/l.', 'The general blood alcohol limit is 0.5 g/l.', true, 'Zero per neopatentati e under 21.', 'Zero for new drivers and under-21s.'],
      ['I neopatentati possono guidare con tasso alcolemico fino a 0,5 g/l.', 'New drivers may drive with up to 0.5 g/l.', false, 'Per loro il limite è zero.', 'Their limit is zero.'],
      ['Per i conducenti con meno di 21 anni il tasso alcolemico deve essere zero.', 'Drivers under 21 must have zero alcohol.', true, 'Come i neopatentati e i professionali.', 'Like new and professional drivers.'],
      ['L\'alcol aumenta il tempo di reazione.', 'Alcohol increases reaction time.', true, 'E riduce il campo visivo.', 'And narrows vision.'],
      ['Un caffè forte elimina rapidamente l\'alcol dal sangue.', 'A strong coffee quickly removes alcohol from the blood.', false, 'Solo il tempo lo smaltisce.', 'Only time does.'],
      ['Guidare con tasso alcolemico superiore a 1,5 g/l è reato.', 'Driving over 1.5 g/l is a crime.', true, 'Anche oltre 0,8 g/l.', 'Also over 0.8 g/l.'],
      ['Alcuni farmaci possono ridurre la capacità di guida.', 'Some medicines impair driving.', true, 'Leggere il foglietto illustrativo.', 'Read the leaflet.'],
      ['La stanchezza riduce l\'attenzione e allunga i tempi di reazione.', 'Fatigue reduces attention and slows reactions.', true, 'Fare pause regolari.', 'Take regular breaks.'],
      ['Nei viaggi lunghi è consigliabile una pausa ogni 2 ore circa.', 'On long trips a break every 2 hours is advised.', true, 'Previene il colpo di sonno.', 'Prevents microsleep.'],
      ['A un ferito cosciente bisogna dare da bere alcolici per rianimarlo.', 'Give a conscious casualty alcohol to revive them.', false, 'Non si deve dare da bere nulla, tanto meno alcolici.', 'Give nothing to drink, least of all alcohol.'],
      ['Un ferito incosciente che respira va messo in posizione laterale di sicurezza, se non c\'è sospetto di trauma alla colonna.', 'An unconscious breathing casualty goes in the recovery position unless spinal injury is suspected.', true, 'Evita il soffocamento.', 'Prevents choking.'],
      ['Al motociclista ferito bisogna togliere subito il casco.', 'You should immediately remove an injured rider\'s helmet.', false, 'Non si toglie, salvo che non respiri.', 'Do not, unless they are not breathing.'],
      ['In caso di emorragia bisogna comprimere la ferita con un panno pulito.', 'For bleeding press on the wound with a clean cloth.', true, 'Per fermare il sangue.', 'To stop the bleeding.'],
      ['I feriti vanno spostati solo in caso di pericolo immediato, come un incendio.', 'Casualties should be moved only in immediate danger, like fire.', true, 'Altrimenti si rischia di aggravare le lesioni.', 'Otherwise injuries may worsen.'],
      ['Dopo aver assunto sostanze stupefacenti è vietato guidare.', 'Driving after taking drugs is forbidden.', true, 'Reato con revoca della patente.', 'Crime with withdrawal.']
    ]
  },

  {
    id: 'it-23', n: 23, icon: '📄',
    t: ['Responsabilità civile, penale, amministrativa e assicurazione R.C.A.', 'Civil, criminal and administrative liability; motor insurance'],
    lessons: [
      { h: ['Le tre responsabilità', 'The three liabilities'], b: [
`- **Responsabilità civile**: obbligo di **risarcire i danni** causati ad altri (persone e cose).
- **Responsabilità penale**: per i **reati** (es. omicidio stradale, lesioni stradali gravi, guida in stato di ebbrezza grave, fuga): è **personale**.
- **Responsabilità amministrativa**: per le **violazioni** del Codice della Strada punite con sanzioni pecuniarie e accessorie.
- Il **proprietario** del veicolo risponde **in solido** con il conducente dei danni civili (salvo uso contro la sua volontà) e delle sanzioni pecuniarie.`,
`- **Civil liability**: obligation to **compensate damage** caused to others.
- **Criminal liability**: for **crimes** (e.g. road homicide, serious injury, drink-driving, hit and run): it is **personal**.
- **Administrative liability**: for **Highway Code offences** punished with fines and additional penalties.
- The vehicle **owner** is **jointly liable** with the driver for civil damages (unless used against their will) and fines.`] },
      { h: ['L\'assicurazione R.C.A.', 'Compulsory motor insurance (RCA)'], b: [
`- L'**R.C.A.** (Responsabilità Civile Auto) è **obbligatoria** per circolare e anche per tenere il veicolo **parcheggiato su strada pubblica**.
- Copre i **danni causati a terzi** (persone, veicoli, cose) e ai **trasportati**, **non** i danni al proprio veicolo né al **conducente responsabile**.
- **Massimale**: somma massima che l'assicurazione paga per sinistro.
- **Franchigia**: parte del danno a carico dell'assicurato.
- **Bonus-malus**: la **classe di merito** migliora senza incidenti con colpa e peggiora dopo un sinistro con responsabilità.
- **Rivalsa**: l'assicurazione paga il terzo ma può chiedere il rimborso all'assicurato in casi previsti (es. guida in stato di ebbrezza).
- **Fondo di garanzia per le vittime della strada**: risarcisce i danni causati da veicoli **non assicurati** o **non identificati**.
- Garanzie facoltative: **furto e incendio**, **kasko** (danni al proprio veicolo), **infortuni del conducente**, assistenza stradale, cristalli.
- Circolare senza assicurazione comporta multa e **sequestro** del veicolo.`,
`- **RCA** (motor third-party liability) is **compulsory** to drive and even to keep the vehicle **parked on a public road**.
- It covers **damage to third parties** and **passengers**, **not** damage to your own vehicle nor to the **at-fault driver**.
- **Cover limit**: maximum paid per claim.
- **Excess**: part of the damage paid by the insured.
- **Bonus-malus**: the **merit class** improves without at-fault claims and worsens after one.
- **Recourse**: the insurer pays the third party but may claim back from the insured (e.g. drink-driving).
- **Victims' guarantee fund**: pays for damage by **uninsured** or **unidentified** vehicles.
- Optional cover: **theft and fire**, **comprehensive (kasko)**, **driver injury**, breakdown assistance, glass.
- Driving uninsured means a fine and **seizure** of the vehicle.`] }
    ],
    q: [
      ['L\'assicurazione R.C.A. è obbligatoria per i veicoli a motore che circolano su strada.', 'RCA insurance is compulsory for motor vehicles on the road.', true, 'Anche se parcheggiati su strada pubblica.', 'Even when parked on a public road.'],
      ['L\'R.C.A. copre i danni subiti dal proprio veicolo in un incidente con colpa.', 'RCA covers damage to your own vehicle in an at-fault accident.', false, 'Copre i danni ai terzi; per il proprio veicolo serve la kasko.', 'It covers third parties; your own car needs comprehensive cover.'],
      ['L\'R.C.A. copre i danni ai passeggeri trasportati.', 'RCA covers injuries to passengers.', true, 'I trasportati sono terzi.', 'Passengers are third parties.'],
      ['Il massimale è la somma massima che l\'assicurazione paga per un sinistro.', 'The cover limit is the maximum paid per claim.', true, 'Oltre paga l\'assicurato.', 'Beyond it the insured pays.'],
      ['Con il sistema bonus-malus la classe di merito peggiora dopo un incidente con responsabilità.', 'Under bonus-malus the merit class worsens after an at-fault accident.', true, 'Il premio aumenta.', 'The premium rises.'],
      ['Il Fondo di garanzia per le vittime della strada risarcisce i danni causati da veicoli non assicurati.', 'The victims\' guarantee fund pays for damage by uninsured vehicles.', true, 'Anche non identificati.', 'Also unidentified ones.'],
      ['La responsabilità penale può essere trasferita al proprietario del veicolo.', 'Criminal liability can be transferred to the vehicle owner.', false, 'È personale.', 'It is personal.'],
      ['Il proprietario del veicolo risponde in solido con il conducente dei danni causati.', 'The owner is jointly liable with the driver for damage.', true, 'Salvo uso contro la sua volontà.', 'Unless used against their will.'],
      ['La garanzia furto e incendio è obbligatoria.', 'Theft and fire cover is compulsory.', false, 'È facoltativa.', 'It is optional.'],
      ['La franchigia è la parte del danno che resta a carico dell\'assicurato.', 'The excess is the part of the damage paid by the insured.', true, 'Definizione.', 'Definition.'],
      ['Circolare senza assicurazione comporta il sequestro del veicolo.', 'Driving uninsured leads to seizure of the vehicle.', true, 'Oltre alla sanzione.', 'Plus a fine.'],
      ['Con la rivalsa l\'assicurazione può chiedere all\'assicurato il rimborso di quanto pagato in caso di guida in stato di ebbrezza.', 'Through recourse the insurer may claim back what it paid in drink-driving cases.', true, 'È un caso tipico di rivalsa.', 'A typical recourse case.']
    ]
  },

  {
    id: 'it-24', n: 24, icon: '🌱',
    t: ['Limitazione dei consumi, rispetto dell\'ambiente e inquinamento', 'Fuel saving, environment and pollution'],
    lessons: [
      { h: ['Guida ecologica', 'Eco-driving'], b: [
`- **Evitare accelerazioni e frenate brusche**: guida fluida, anticipare il traffico.
- **Marce alte** il prima possibile, a regimi bassi; non tenere il motore su di giri.
- **Spegnere il motore** nelle soste prolungate (passaggi a livello, code lunghe); non scaldare il motore da fermo.
- **Pressione dei pneumatici** corretta: pneumatici sgonfi aumentano consumi e usura.
- **Portapacchi e carichi inutili** aumentano consumi e resistenza aerodinamica: toglierli quando non servono.
- **Climatizzatore** e finestrini aperti ad alta velocità aumentano i consumi.
- **Manutenzione regolare**: filtri, olio, candele, revisione.

**Inquinanti principali:** monossido di carbonio (CO, tossico), ossidi di azoto (NOx), idrocarburi incombusti, **particolato** (PM, soprattutto diesel), **CO₂** (gas serra). La **marmitta catalitica** riduce CO, HC e NOx; il **filtro antiparticolato** trattiene il PM. Le classi **Euro** indicano il livello di emissioni.
**Inquinamento acustico:** evitare clacson inutile, accelerazioni a vuoto e marmitte modificate.`,
`- **Avoid harsh acceleration and braking**: drive smoothly, anticipate traffic.
- Shift to **high gears** early, at low revs.
- **Switch off the engine** during long stops; do not warm up the engine while stationary.
- Correct **tyre pressure**: under-inflation raises consumption and wear.
- **Roof racks and unnecessary loads** increase consumption: remove them.
- **Air conditioning** and open windows at speed increase consumption.
- **Regular maintenance**: filters, oil, plugs, inspection.

**Main pollutants:** carbon monoxide (CO, toxic), nitrogen oxides (NOx), unburnt hydrocarbons, **particulates** (PM, mainly diesel), **CO₂** (greenhouse gas). The **catalytic converter** reduces CO, HC and NOx; the **particulate filter** traps PM. **Euro** classes indicate emission levels.
**Noise pollution:** avoid needless horn use, revving and modified exhausts.`] }
    ],
    q: [
      ['Una guida fluida, senza accelerazioni brusche, riduce i consumi.', 'Smooth driving without harsh acceleration reduces consumption.', true, 'E l\'inquinamento.', 'And pollution.'],
      ['Usare marce basse ad alto regime riduce i consumi.', 'Using low gears at high revs reduces consumption.', false, 'Conviene usare marce alte a regimi bassi.', 'High gears at low revs are better.'],
      ['Pneumatici sgonfi aumentano i consumi di carburante.', 'Under-inflated tyres increase fuel consumption.', true, 'Aumenta la resistenza al rotolamento.', 'Rolling resistance rises.'],
      ['Il portapacchi vuoto montato sul tetto non influisce sui consumi.', 'An empty roof rack does not affect consumption.', false, 'Aumenta la resistenza aerodinamica.', 'It increases drag.'],
      ['È consigliabile spegnere il motore nelle soste prolungate, ad esempio a un passaggio a livello chiuso.', 'Switch off the engine during long stops, e.g. at a closed level crossing.', true, 'Si risparmia carburante.', 'Saves fuel.'],
      ['La marmitta catalitica riduce le emissioni di sostanze nocive.', 'The catalytic converter reduces harmful emissions.', true, 'CO, HC e NOx.', 'CO, HC and NOx.'],
      ['Il monossido di carbonio è un gas tossico.', 'Carbon monoxide is toxic.', true, 'Inodore e incolore.', 'Odourless and colourless.'],
      ['Il filtro antiparticolato serve a ridurre il rumore del motore.', 'The particulate filter reduces engine noise.', false, 'Trattiene il particolato (PM).', 'It traps particulates.'],
      ['Riscaldare il motore da fermo, prima di partire, riduce l\'inquinamento.', 'Warming up the engine while stationary reduces pollution.', false, 'Conviene partire subito con guida moderata.', 'Better to set off gently right away.'],
      ['Il climatizzatore acceso aumenta il consumo di carburante.', 'Air conditioning increases fuel consumption.', true, 'Assorbe potenza dal motore.', 'It draws power from the engine.'],
      ['Le classi Euro indicano il livello di emissioni inquinanti del veicolo.', 'Euro classes indicate a vehicle\'s emission level.', true, 'Più è alta, meno inquina.', 'Higher means cleaner.'],
      ['Una manutenzione regolare del veicolo contribuisce a ridurre l\'inquinamento.', 'Regular maintenance helps reduce pollution.', true, 'Motore efficiente.', 'Efficient engine.']
    ]
  },

  {
    id: 'it-25', n: 25, icon: '🔧',
    t: ['Elementi del veicolo, manutenzione, stabilità e tenuta di strada', 'Vehicle components, maintenance, stability and road holding'],
    lessons: [
      { h: ['Pneumatici, freni e sospensioni', 'Tyres, brakes and suspension'], b: [
`- **Pneumatici**: assicurano l'**aderenza**. Controllare pressione (a freddo, anche della ruota di scorta) e battistrada (minimo 1,6 mm). Pneumatici usurati o sgonfi aumentano lo spazio di frenatura e il rischio di **aquaplaning**.
- **Aquaplaning**: con molta acqua il pneumatico "galleggia" e si perde il controllo dello sterzo e dei freni. Se succede: **non frenare** di colpo, togliere gradualmente il piede dall'acceleratore e tenere lo sterzo dritto.
- **Freni**: freno di servizio (pedale) e freno di stazionamento (a mano o elettrico). Il **liquido dei freni** va controllato e sostituito periodicamente. L'**ABS** evita il bloccaggio delle ruote e permette di **sterzare durante la frenata**.
- **Ammortizzatori** usurati: il veicolo ondeggia, la frenata si allunga e la tenuta in curva peggiora.
- **ESP**: controllo elettronico della stabilità, aiuta a evitare sbandamenti.`,
`- **Tyres** provide **grip**. Check pressure (cold, spare included) and tread (min 1.6 mm). Worn or soft tyres lengthen braking and increase **aquaplaning** risk.
- **Aquaplaning**: in deep water the tyre "floats" and you lose steering and braking. If it happens: **do not brake** sharply, ease off the accelerator, keep the wheel straight.
- **Brakes**: service brake (pedal) and parking brake. Check and periodically replace **brake fluid**. **ABS** prevents wheel lock and lets you **steer while braking**.
- **Worn shock absorbers**: the car sways, braking lengthens, cornering worsens.
- **ESP**: electronic stability control helps prevent skids.`] },
      { h: ['Stabilità, curve e revisione', 'Stability, bends and inspection'], b: [
`- In curva agisce la **forza centrifuga**, che spinge il veicolo verso l'esterno; cresce con il **quadrato della velocità** e diminuisce all'aumentare del raggio della curva. Per questo si rallenta **prima** della curva.
- Il **baricentro alto** (carico sul tetto) peggiora la stabilità; il carico va distribuito in basso e al centro.
- **Sottosterzo**: l'auto tende ad allargare la traiettoria (tipico della trazione anteriore); **sovrasterzo**: il posteriore tende a scivolare verso l'esterno.
- **Motore**: controllare livello dell'**olio** (a motore freddo, su terreno piano) e del **liquido di raffreddamento**.
- **Revisione** delle autovetture: prima dopo **4 anni** dall'immatricolazione, poi **ogni 2 anni**.
- **Sterzo**: un gioco eccessivo o vibrazioni richiedono un controllo immediato.`,
`- In a bend **centrifugal force** pushes the vehicle outwards; it grows with the **square of speed** and decreases as the bend radius increases. That is why you slow down **before** the bend.
- A **high centre of gravity** (roof load) worsens stability; load low and central.
- **Understeer**: the car runs wide (typical of front-wheel drive); **oversteer**: the rear slides outwards.
- **Engine**: check **oil** (engine cold, level ground) and **coolant**.
- **Inspection** for cars: first after **4 years**, then **every 2 years**.
- **Steering**: excessive play or vibration need an immediate check.`] }
    ],
    q: [
      ['L\'ABS impedisce il bloccaggio delle ruote in frenata.', 'ABS prevents wheels locking under braking.', true, 'E consente di sterzare.', 'And allows steering.'],
      ['Con l\'ABS è possibile sterzare mentre si frena a fondo.', 'With ABS you can steer while braking hard.', true, 'Le ruote non si bloccano.', 'The wheels do not lock.'],
      ['In caso di aquaplaning bisogna frenare a fondo.', 'During aquaplaning brake hard.', false, 'Si toglie gradualmente il piede dall\'acceleratore e si tiene lo sterzo dritto.', 'Ease off the throttle and keep the wheel straight.'],
      ['Il rischio di aquaplaning aumenta con pneumatici usurati.', 'Aquaplaning risk increases with worn tyres.', true, 'Il battistrada non drena l\'acqua.', 'The tread cannot clear the water.'],
      ['La forza centrifuga in curva aumenta con il quadrato della velocità.', 'Centrifugal force in a bend grows with the square of speed.', true, 'A velocità doppia, forza quadrupla.', 'Double speed, four times the force.'],
      ['La forza centrifuga aumenta se il raggio della curva aumenta.', 'Centrifugal force increases as the bend radius increases.', false, 'Diminuisce: le curve strette sono più pericolose.', 'It decreases: tight bends are more dangerous.'],
      ['Gli ammortizzatori usurati allungano lo spazio di frenatura.', 'Worn shock absorbers lengthen braking distance.', true, 'Peggiorano l\'aderenza.', 'They reduce grip.'],
      ['Un carico pesante sul tetto migliora la stabilità del veicolo.', 'A heavy roof load improves stability.', false, 'Alza il baricentro e peggiora la stabilità.', 'It raises the centre of gravity.'],
      ['Il livello dell\'olio motore si controlla a motore freddo e con veicolo in piano.', 'Oil level is checked with a cold engine on level ground.', true, 'Per una lettura corretta.', 'For an accurate reading.'],
      ['La prima revisione di un\'autovettura nuova si fa dopo 4 anni dall\'immatricolazione.', 'A new car\'s first inspection is after 4 years.', true, 'Poi ogni 2 anni.', 'Then every 2 years.'],
      ['Dopo la prima revisione le autovetture vanno revisionate ogni 5 anni.', 'After the first inspection cars are inspected every 5 years.', false, 'Ogni 2 anni.', 'Every 2 years.'],
      ['Il sottosterzo è la tendenza del veicolo ad allargare la traiettoria in curva.', 'Understeer is the tendency to run wide in a bend.', true, 'Tipico della trazione anteriore.', 'Typical of front-wheel drive.'],
      ['L\'ESP aiuta a mantenere la stabilità del veicolo ed evitare sbandamenti.', 'ESP helps keep the vehicle stable and avoid skids.', true, 'Interviene sui freni delle singole ruote.', 'It brakes individual wheels.'],
      ['Il liquido dei freni non richiede mai sostituzione.', 'Brake fluid never needs replacing.', false, 'Va sostituito periodicamente perché assorbe umidità.', 'It must be replaced periodically.'],
      ['La pressione dei pneumatici va controllata anche sulla ruota di scorta.', 'Tyre pressure should also be checked on the spare.', true, 'Deve essere pronta all\'uso.', 'It must be ready for use.']
    ]
  }
];
