// Italia – Programma ministeriale patente AM/A/B, capitoli 1-9.
// Lezioni: { h: [it, en], b: [it, en] }  · Quiz V/F: [it, en, vero?, spiegazione_it, spiegazione_en, segnale?]

export default [
  {
    id: 'it-01', n: 1, icon: '📘',
    t: ['Definizioni generali e doveri nell\'uso della strada', 'General definitions and duties on the road'],
    lessons: [
      { h: ['La strada e le sue parti', 'The road and its parts'], b: [
`La **strada** è l'area a uso pubblico destinata alla circolazione di pedoni, veicoli e animali. Le sue parti principali sono:
- **Carreggiata**: la parte destinata allo scorrimento dei veicoli; è composta da una o più **corsie**, è pavimentata e delimitata da strisce di margine.
- **Corsia**: parte longitudinale della carreggiata larga abbastanza da permettere il transito di **una sola fila** di veicoli.
- **Banchina**: parte della strada compresa tra il margine della carreggiata e il marciapiede o il fosso; serve ai pedoni o alla sosta di emergenza, **non alla circolazione** dei veicoli.
- **Marciapiede**: parte della strada esterna alla carreggiata, rialzata o protetta, riservata ai pedoni.
- **Corsia di emergenza**: corsia adiacente alla carreggiata destinata alle soste di emergenza e al transito dei mezzi di soccorso.
- **Piazzola di sosta**: allargamento della carreggiata per la sosta dei veicoli.

**Esempio:** una strada con due corsie per senso di marcia ha una carreggiata se non c'è spartitraffico, due carreggiate se c'è uno spartitraffico che separa i sensi.`,
`A **road** is a public area used by pedestrians, vehicles and animals. Its main parts are:
- **Carriageway**: the part used by vehicles, made of one or more **lanes**, paved and bounded by edge lines.
- **Lane**: a longitudinal strip wide enough for **one single row** of vehicles.
- **Verge / shoulder (banchina)**: between the carriageway edge and the pavement or ditch; for pedestrians or emergency stops, **not for driving**.
- **Pavement**: raised or protected area outside the carriageway reserved for pedestrians.
- **Emergency lane**: lane beside the carriageway for breakdowns and emergency vehicles.
- **Lay-by**: widening of the carriageway for stopping.

**Example:** a road with two lanes in each direction has one carriageway if there is no central reservation, two carriageways if a central reservation separates the directions.`] },
      { h: ['Classificazione delle strade (art. 2 CdS)', 'Road classification (art. 2 Highway Code)'], b: [
`Il Codice della Strada classifica le strade in:
- **A – Autostrade**: carreggiate indipendenti separate da spartitraffico invalicabile, almeno due corsie per senso, corsia di emergenza, nessuna intersezione a raso; segnale a **fondo verde**.
- **B – Extraurbane principali**: carreggiate separate, almeno due corsie per senso, accessi controllati; riservate ai veicoli a motore.
- **C – Extraurbane secondarie**: una carreggiata con almeno una corsia per senso e banchine.
- **D – Urbane di scorrimento**, **E – Urbane di quartiere**, **E-bis – Strade urbane ciclabili**, **F – Locali**, **F-bis – Itinerari ciclopedonali**.

Il **centro abitato** inizia al segnale con il nome della località e finisce al segnale con il nome barrato.`,
`The Italian Highway Code classifies roads as:
- **A – Motorways**: separate carriageways divided by an impassable barrier, at least two lanes each way, emergency lane, no level junctions; **green** signs.
- **B – Main rural roads**: separate carriageways, at least two lanes each way, controlled access, motor vehicles only.
- **C – Secondary rural roads**: one carriageway with at least one lane each way and verges.
- **D – Urban arterial roads**, **E – Urban district roads**, **E-bis – Urban cycle streets**, **F – Local roads**, **F-bis – Cycle/pedestrian routes**.

A **built-up area** starts at the sign with the town name and ends at the sign with the name crossed out.`] },
      { h: ['I veicoli e i doveri del conducente', 'Vehicles and driver duties'], b: [
`- **Ciclomotore**: veicolo a due o tre ruote con velocità massima di costruzione non superiore a **45 km/h** (motore termico fino a 50 cc).
- **Motociclo**: veicolo a due ruote che supera i 45 km/h.
- **Autovettura**: veicolo destinato al trasporto di persone, con al massimo **9 posti** compreso il conducente.
- **Autobus**: trasporto di persone con **più di 9 posti** compreso il conducente.
- **Autocarro**: trasporto di cose. **Autotreno** = autocarro + rimorchio; **autoarticolato** = trattore + semirimorchio; **autosnodato** = autobus composto da due tronconi.
- **Massa complessiva**: massa del veicolo con il carico massimo ammesso. **Tara**: massa a vuoto.

**Principio informatore (art. 140):** gli utenti della strada devono comportarsi in modo da **non costituire pericolo o intralcio** per la circolazione e da salvaguardare la sicurezza stradale.`,
`- **Moped**: two/three wheels, top design speed not over **45 km/h** (combustion engine up to 50 cc).
- **Motorcycle**: two-wheeler faster than 45 km/h.
- **Car**: passenger vehicle with at most **9 seats** including the driver.
- **Bus**: passenger vehicle with **more than 9 seats**.
- **Lorry**: goods vehicle. **Road train** = lorry + trailer; **articulated vehicle** = tractor + semi-trailer; **articulated bus** = two rigid sections.
- **Maximum mass**: vehicle plus maximum permitted load. **Unladen mass**: empty.

**Guiding principle (art. 140):** road users must behave so as **not to cause danger or obstruction** and must safeguard road safety.`] }
    ],
    q: [
      ['La carreggiata è la parte della strada destinata allo scorrimento dei veicoli.', 'The carriageway is the part of the road used by moving vehicles.', true, 'Definizione dell\'art. 3 CdS: la carreggiata è composta da una o più corsie.', 'Definition from art. 3: it consists of one or more lanes.'],
      ['La corsia è una parte della carreggiata che consente il transito di una sola fila di veicoli.', 'A lane allows a single row of vehicles.', true, 'La corsia è larga quanto basta per una fila.', 'A lane is wide enough for one row.'],
      ['La banchina fa parte della carreggiata ed è destinata al sorpasso.', 'The verge is part of the carriageway and is used for overtaking.', false, 'La banchina è esterna alla carreggiata: serve ai pedoni e alle soste di emergenza.', 'The verge is outside the carriageway: for pedestrians and emergency stops.'],
      ['Il marciapiede è riservato ai pedoni.', 'The pavement is reserved for pedestrians.', true, 'È la parte rialzata o protetta riservata ai pedoni.', 'It is the raised or protected area for pedestrians.'],
      ['La corsia di emergenza può essere usata per sorpassare in caso di coda.', 'The emergency lane may be used to overtake in a queue.', false, 'È vietato: serve solo per soste di emergenza e mezzi di soccorso.', 'Forbidden: only for emergencies and rescue vehicles.'],
      ['L\'autostrada non ha intersezioni a raso.', 'A motorway has no level (at-grade) junctions.', true, 'Gli incroci in autostrada sono sempre a livelli sfalsati (svincoli).', 'Motorway junctions are always grade-separated.'],
      ['Una strada extraurbana secondaria ha almeno due corsie per senso di marcia.', 'A secondary rural road has at least two lanes in each direction.', false, 'Ha una carreggiata con almeno una corsia per senso.', 'It has one carriageway with at least one lane per direction.'],
      ['Il ciclomotore ha una velocità massima di costruzione non superiore a 45 km/h.', 'A moped has a maximum design speed not exceeding 45 km/h.', true, 'È il limite che distingue il ciclomotore dal motociclo.', 'That is what distinguishes a moped from a motorcycle.'],
      ['L\'autovettura può avere fino a 12 posti compreso il conducente.', 'A car may have up to 12 seats including the driver.', false, 'Al massimo 9 posti compreso il conducente; oltre è un autobus.', 'At most 9 seats; more makes it a bus.'],
      ['L\'autoarticolato è formato da un trattore stradale e da un semirimorchio.', 'An articulated vehicle is a tractor unit plus a semi-trailer.', true, 'Autotreno = autocarro + rimorchio; autoarticolato = trattore + semirimorchio.', 'Road train = lorry + trailer; articulated = tractor + semi-trailer.'],
      ['La tara è la massa del veicolo a pieno carico.', 'Unladen mass is the mass of the fully loaded vehicle.', false, 'La tara è la massa a vuoto; a pieno carico si parla di massa complessiva.', 'Unladen is empty; fully loaded is the maximum mass.'],
      ['Gli utenti della strada devono comportarsi in modo da non costituire pericolo o intralcio per la circolazione.', 'Road users must not cause danger or obstruction.', true, 'È il principio informatore dell\'art. 140 CdS.', 'It is the guiding principle of art. 140.'],
      ['Il centro abitato inizia con il segnale che riporta il nome della località.', 'A built-up area starts at the sign with the town name.', true, 'E termina con il segnale con il nome barrato.', 'It ends at the sign with the name crossed out.', 'centro-abitato'],
      ['Su una strada con spartitraffico centrale ci sono due carreggiate.', 'A road with a central reservation has two carriageways.', true, 'Lo spartitraffico separa due carreggiate distinte.', 'The reservation separates two carriageways.'],
      ['L\'autobus è un veicolo destinato al trasporto di persone con più di 9 posti compreso il conducente.', 'A bus carries people and has more than 9 seats including the driver.', true, 'Oltre 9 posti il veicolo è un autobus.', 'Over 9 seats it is a bus.']
    ]
  },

  {
    id: 'it-02', n: 2, icon: '⚠️', signCat: 'pericolo',
    t: ['Segnali di pericolo', 'Danger warning signs'],
    lessons: [
      { h: ['Come sono fatti e dove si trovano', 'Shape and placement'], b: [
`I segnali di pericolo hanno forma di **triangolo equilatero con il vertice in alto**, fondo bianco e bordo rosso (fondo **giallo** se temporanei, nei cantieri).
- Fuori dai centri abitati sono posti di norma a **150 metri** dal pericolo.
- Nei centri abitati la distanza può essere minore, purché adeguata.
- Se la distanza è diversa da 150 m, è indicata da un **pannello integrativo di distanza**; se il pericolo continua per un tratto, da un **pannello di estesa**.

**Cosa fare sempre:** moderare la velocità, aumentare l'attenzione e prepararsi a fermarsi. Il segnale indica un pericolo, non un divieto: ma in presenza di scarsa visibilità valgono comunque i divieti generali (sorpasso in curva o su dosso, sosta, inversione).`,
`Danger signs are **equilateral triangles pointing up**, white with a red border (**yellow** when temporary at roadworks).
- Outside built-up areas they are normally **150 metres** before the hazard.
- In built-up areas the distance may be shorter but adequate.
- A different distance is shown by a **distance plate**; a hazard over a stretch by a **length plate**.

**Always:** slow down, pay more attention, be ready to stop. The sign warns, it does not prohibit—but general bans still apply with poor visibility (overtaking on bends or crests, parking, U-turns).`] },
      { h: ['Curve, dossi e fondo stradale', 'Bends, crests and road surface'], b: [
`- **Curva pericolosa** (destra/sinistra) e **doppia curva**: rallentare *prima* della curva; in curva non frenare bruscamente. Vietato sorpassare se manca visibilità e vietata la sosta e l'inversione.
- **Dosso**: la strada sale e poi scende: dietro può esserci un veicolo che non si vede. Vietato il sorpasso in assenza di visibilità.
- **Cunetta**: discesa e poi salita: il veicolo può sobbalzare; possibile ristagno d'acqua.
- **Strada deformata**: buche e avvallamenti, rischio di perdita di controllo.
- **Strada sdrucciolevole**: soprattutto con pioggia: aumentare la distanza di sicurezza, evitare manovre brusche.
- **Discesa pericolosa / salita ripida** (percentuale = metri di dislivello ogni 100 m): in discesa usare il freno motore con marcia bassa, mai in folle.`,
`- **Dangerous bend** and **double bend**: slow down *before* the bend; no harsh braking in it. No overtaking without visibility, no parking or U-turns.
- **Crest/hump**: the road rises then falls: a hidden vehicle may be behind. No overtaking without visibility.
- **Dip**: falls then rises: the car may bounce; water may collect.
- **Uneven road**: potholes, risk of losing control.
- **Slippery road**: especially when wet: increase distance, avoid sudden moves.
- **Steep descent/ascent** (percentage = metres of height per 100 m): downhill use a low gear for engine braking, never neutral.`] },
      { h: ['Passaggi a livello, persone e animali', 'Level crossings, people and animals'], b: [
`- **Passaggio a livello con barriere**: preceduto dai **pannelli distanziometrici** (3, 2, 1 barre rosse oblique). Non attraversare con barriere in movimento o luce rossa lampeggiante.
- **Passaggio a livello senza barriere**: sul posto c'è la **croce di S. Andrea** (doppia se i binari sono più di uno). Fermarsi, guardare e attraversare solo se non arriva il treno.
- **Attraversamento pedonale / ciclabile**, **bambini**: rallentare; i pedoni sulle strisce hanno precedenza.
- **Animali domestici / selvatici**, **caduta massi**, **forte vento laterale**, **aeromobili a bassa quota**, **pericolo di incolonnamento**, **altri pericoli** (con pannello che li descrive).`,
`- **Level crossing with barriers**: preceded by **countdown markers** (3, 2, 1 red bars). Never cross while barriers move or red lights flash.
- **Level crossing without barriers**: a **St Andrew's cross** is at the crossing (double for more tracks). Stop, look, cross only if no train.
- **Pedestrian / cycle crossing**, **children**: slow down; pedestrians on the crossing have priority.
- **Farm / wild animals**, **falling rocks**, **side wind**, **low-flying aircraft**, **queues**, **other danger** (with explanatory plate).`] }
    ],
    q: [
      ['I segnali di pericolo hanno forma triangolare con il vertice in alto.', 'Warning signs are triangles pointing upward.', true, 'Il triangolo con vertice in basso è il dare precedenza.', 'The downward triangle is Give Way.'],
      ['Fuori dai centri abitati i segnali di pericolo sono posti di norma 150 m prima del pericolo.', 'Outside built-up areas warning signs are normally 150 m before the hazard.', true, 'Una distanza diversa è indicata con un pannello integrativo.', 'A different distance is shown on a plate.'],
      ['Il segnale raffigurato preannuncia una curva pericolosa a destra.', 'The sign shown warns of a dangerous bend to the right.', true, 'La freccia curva verso destra.', 'The arrow bends right.', 'curva-dx'],
      ['In presenza del segnale raffigurato è sempre consentito fare inversione di marcia.', 'With this sign, U-turns are always allowed.', false, 'In curva l\'inversione è vietata.', 'U-turns on bends are forbidden.', 'curva-dx'],
      ['Il segnale raffigurato preannuncia una successione di curve, la prima a sinistra.', 'The sign shown warns of a series of bends, the first to the left.', true, 'La prima curva disegnata va a sinistra.', 'The first drawn bend goes left.', 'doppia-curva-sx'],
      ['Il segnale raffigurato preannuncia un dosso, che limita la visibilità.', 'The sign shown warns of a crest that limits visibility.', true, 'Salita seguita da discesa: non si vede chi arriva.', 'Rise then fall: you cannot see oncoming traffic.', 'dosso'],
      ['Il segnale raffigurato indica una cunetta, cioè un tratto di strada convesso.', 'The sign shown indicates a dip, i.e. a convex stretch.', false, 'La cunetta è concava (discesa e salita); il dosso è convesso.', 'A dip is concave; a crest is convex.', 'cunetta'],
      ['Il segnale raffigurato preannuncia un tratto di strada che può diventare sdrucciolevole.', 'The sign shown warns that the road may become slippery.', true, 'Soprattutto con pioggia, fango o foglie.', 'Especially with rain, mud or leaves.', 'strada-sdrucciolevole'],
      ['In presenza del segnale raffigurato è opportuno aumentare la distanza di sicurezza.', 'With this sign it is wise to increase the following distance.', true, 'Su fondo scivoloso lo spazio di frenatura aumenta.', 'On slippery surfaces braking distance increases.', 'strada-sdrucciolevole'],
      ['Il segnale raffigurato indica una strettoia simmetrica.', 'The sign shown indicates the road narrows on both sides.', true, 'Restringimento su entrambi i lati.', 'Narrowing on both sides.', 'strettoia-simm'],
      ['Il segnale raffigurato preannuncia un passaggio a livello con barriere.', 'The sign shown warns of a level crossing with barriers.', true, 'La staccionata rappresenta le barriere.', 'The fence represents the barriers.', 'pl-barriere'],
      ['In presenza di passaggio a livello con barriere si può attraversare mentre le barriere si stanno abbassando, se il treno non è visibile.', 'At a level crossing you may cross while barriers are lowering if no train is visible.', false, 'Con barriere in movimento è vietato impegnare il passaggio.', 'Never cross while barriers are moving.', 'pl-barriere'],
      ['Il segnale raffigurato preannuncia un passaggio a livello senza barriere.', 'The sign shown warns of a level crossing without barriers.', true, 'La locomotiva indica l\'assenza di barriere.', 'The locomotive means no barriers.', 'pl-senza-barriere'],
      ['La croce di S. Andrea è posta in corrispondenza dei passaggi a livello senza barriere.', 'The St Andrew\'s cross is placed at level crossings without barriers.', true, 'È doppia se i binari sono più di uno.', 'It is doubled for more than one track.'],
      ['Il segnale raffigurato indica un attraversamento pedonale.', 'The sign shown warns of a pedestrian crossing.', true, 'Bisogna rallentare e dare precedenza ai pedoni.', 'Slow down and give way to pedestrians.', 'attraversamento-pedonale'],
      ['Il segnale raffigurato indica un passaggio riservato ai bambini.', 'The sign shown indicates a crossing reserved for children.', false, 'Indica la presenza frequente di bambini (scuole, giardini), non un attraversamento.', 'It indicates frequent presence of children, not a crossing.', 'bambini'],
      ['Il segnale raffigurato preannuncia lavori in corso.', 'The sign shown warns of roadworks.', true, 'Possibili operai e mezzi sulla carreggiata.', 'Workers and machinery may be on the road.', 'lavori'],
      ['Il segnale raffigurato indica una discesa pericolosa con pendenza del 10%.', 'The sign shown indicates a dangerous 10% descent.', true, 'Si scendono 10 m ogni 100 m: usare il freno motore.', '10 m drop per 100 m: use engine braking.', 'discesa-pericolosa'],
      ['In discesa conviene procedere in folle per risparmiare carburante.', 'Downhill it is best to coast in neutral to save fuel.', false, 'In folle si perde il freno motore e si surriscaldano i freni.', 'In neutral you lose engine braking and overheat the brakes.', 'discesa-pericolosa'],
      ['Il segnale raffigurato indica pericolo di caduta massi anche già presenti sulla carreggiata.', 'The sign shown warns of falling rocks, including rocks already on the road.', true, 'Attenzione anche ai sassi già caduti.', 'Watch for rocks already fallen.', 'caduta-massi'],
      ['Il segnale raffigurato preannuncia un tratto di strada con forte vento laterale.', 'The sign shown warns of strong side winds.', true, 'Tipico di viadotti e uscite da gallerie.', 'Typical of viaducts and tunnel exits.', 'vento-laterale'],
      ['Il segnale raffigurato preannuncia un tratto di strada a doppio senso di circolazione.', 'The sign shown warns of two-way traffic ahead.', true, 'Dopo un tratto a senso unico.', 'After a one-way stretch.', 'doppio-senso'],
      ['Il segnale "altri pericoli" è spesso accompagnato da un pannello che descrive il pericolo.', 'The "other danger" sign is often accompanied by a plate describing the hazard.', true, 'Es. "incidente", "uscita veicoli".', 'E.g. "accident", "vehicle exit".', 'altri-pericoli'],
      ['I segnali di pericolo temporanei hanno il fondo giallo.', 'Temporary warning signs have a yellow background.', true, 'E prevalgono su quelli permanenti.', 'And they override permanent ones.', 'lavori-giallo']
    ]
  },

  {
    id: 'it-03', n: 3, icon: '⛔', signCat: 'divieto',
    t: ['Segnali di divieto', 'Prohibitory signs'],
    lessons: [
      { h: ['Forma, colori e validità', 'Shape, colours and validity'], b: [
`I segnali di divieto sono **circolari**, con **bordo rosso** e fondo bianco (eccetto il **senso vietato**, rosso con barra bianca, e i divieti di **sosta/fermata**, a fondo blu).
- Valgono **dal punto in cui sono collocati**.
- Se il divieto vale solo per alcune ore, veicoli o condizioni, lo precisa un **pannello integrativo**.
- I segnali di **fine divieto** sono bianchi con barre diagonali nere/grigie.

**Trucco per ricordare:** bordo rosso = *non puoi*; fondo blu = *devi*.`,
`Prohibitory signs are **circular**, with a **red border** on white (except **No Entry**, red with a white bar, and **no parking/stopping**, on blue).
- They apply **from where they stand**.
- If the ban only applies at certain times, to certain vehicles or conditions, an **additional plate** says so.
- **End of restriction** signs are white with black/grey diagonal bars.

**Memory trick:** red border = *you must not*; blue background = *you must*.`] },
      { h: ['Transito, senso vietato, sorpasso, velocità', 'Access, no entry, overtaking, speed'], b: [
`- **Divieto di transito**: vietato a tutti i veicoli **in entrambi i sensi**. I pedoni passano.
- **Senso vietato**: vietato entrare da quella parte; si trova all'uscita dei sensi unici.
- **Divieto di sorpasso**: vietato sorpassare veicoli a motore; si possono sorpassare **ciclomotori, motocicli senza sidecar e biciclette**.
- **Divieto di sorpasso per autocarri oltre 3,5 t**: le autovetture possono sorpassare.
- **Limite massimo di velocità**: non superare il valore indicato; non è un obbligo di andare a quella velocità.
- **Fine limite / fine divieto di sorpasso / via libera**: cessano i divieti; torna il limite generale della strada.
- Divieti per categoria: autoveicoli, autocarri, motocicli, biciclette, pedoni, veicoli con merci pericolose, veicoli più alti/larghi/lunghi/pesanti del valore indicato.`,
`- **No vehicles**: forbidden to all vehicles **in both directions**. Pedestrians may pass.
- **No entry**: you may not enter from that side; found at the exit of one-way streets.
- **No overtaking**: no overtaking of motor vehicles; you may overtake **mopeds, motorcycles without sidecar and bicycles**.
- **No overtaking for lorries over 3.5 t**: cars may overtake.
- **Maximum speed**: do not exceed the value; it is not a target speed.
- **End of limit / end of no overtaking / end of all restrictions**: restrictions end; the general limit returns.
- Category bans: motor vehicles, lorries, motorcycles, bicycles, pedestrians, dangerous goods, vehicles taller/wider/longer/heavier than shown.`] },
      { h: ['Sosta e fermata', 'Parking and stopping'], b: [
`- **Divieto di sosta** (una barra rossa su fondo blu): vietata la sosta, **consentita la fermata**. Senza pannello vale dalle 0 alle 24.
- **Divieto di fermata** (croce rossa su fondo blu): vietate sia fermata sia sosta.
- Il pannello **"zona rimozione"** indica che il veicolo può essere rimosso.
- Il divieto **non riguarda l'arresto** dovuto al traffico (coda, semaforo, precedenza).`,
`- **No parking** (one red bar on blue): parking forbidden, **stopping allowed**. Without a plate it applies 0–24.
- **No stopping** (red cross on blue): both stopping and parking forbidden.
- **"Tow-away zone"** plate: the vehicle may be removed.
- Bans **do not cover halting** due to traffic (queue, lights, right of way).`] }
    ],
    q: [
      ['I segnali di divieto sono di forma circolare.', 'Prohibitory signs are circular.', true, 'Bordo rosso e fondo bianco nella maggior parte dei casi.', 'Usually a red border on white.'],
      ['Il segnale raffigurato vieta il transito a tutti i veicoli in entrambi i sensi di marcia.', 'The sign shown bans all vehicles in both directions.', true, 'È il divieto di transito.', 'It is the "no vehicles" sign.', 'divieto-transito'],
      ['Il segnale raffigurato consente il transito ai pedoni.', 'The sign shown allows pedestrians.', true, 'Vieta i veicoli, non i pedoni.', 'It bans vehicles, not pedestrians.', 'divieto-transito'],
      ['Il segnale raffigurato è posto all\'uscita di una strada a senso unico.', 'The sign shown is placed at the exit of a one-way street.', true, 'Impedisce di imboccare il senso unico contromano.', 'It prevents entering the wrong way.', 'senso-vietato'],
      ['Il segnale raffigurato vieta il transito in entrambi i sensi.', 'The sign shown bans traffic in both directions.', false, 'Il senso vietato vieta solo l\'ingresso da quel lato.', 'No Entry only bans entering from that side.', 'senso-vietato'],
      ['In presenza del segnale raffigurato è consentito sorpassare un motociclo senza sidecar.', 'With this sign you may overtake a motorcycle without sidecar.', true, 'Il divieto riguarda i veicoli a motore diversi da motocicli e ciclomotori a due ruote.', 'The ban concerns motor vehicles other than two-wheelers.', 'divieto-sorpasso'],
      ['In presenza del segnale raffigurato è vietato sorpassare un\'autovettura.', 'With this sign overtaking a car is forbidden.', true, 'Le auto non si possono sorpassare.', 'Cars may not be overtaken.', 'divieto-sorpasso'],
      ['Il segnale raffigurato vieta il sorpasso anche alle autovetture.', 'The sign shown also forbids cars from overtaking.', false, 'Vale per i veicoli merci oltre 3,5 t.', 'It applies to goods vehicles over 3.5 t.', 'divieto-sorpasso-camion'],
      ['Il segnale raffigurato obbliga a procedere a 50 km/h.', 'The sign shown requires driving at 50 km/h.', false, 'Vieta di superare 50 km/h; si può andare più piano.', 'It forbids exceeding 50 km/h; slower is allowed.', 'limite-velocita'],
      ['Il segnale raffigurato indica la fine del limite di 50 km/h.', 'The sign shown indicates the end of the 50 km/h limit.', true, 'Torna il limite generale della strada.', 'The general limit applies again.', 'fine-limite'],
      ['Dopo il segnale raffigurato si può procedere a qualsiasi velocità.', 'After the sign shown you may drive at any speed.', false, 'Valgono i limiti generali (es. 90 km/h su extraurbana secondaria).', 'General limits apply (e.g. 90 km/h on secondary rural roads).', 'fine-limite'],
      ['Il segnale raffigurato vieta la sosta ma consente la fermata.', 'The sign shown forbids parking but allows stopping.', true, 'Una barra = divieto di sosta.', 'One bar = no parking.', 'divieto-sosta'],
      ['Il segnale raffigurato vieta sia la fermata sia la sosta.', 'The sign shown forbids both stopping and parking.', true, 'La croce indica il divieto di fermata.', 'The cross means no stopping.', 'divieto-fermata'],
      ['Il segnale raffigurato vieta anche l\'arresto per una coda di veicoli.', 'The sign shown also forbids halting in a queue.', false, 'L\'arresto per esigenze di traffico non è una fermata.', 'Halting due to traffic is not stopping.', 'divieto-fermata'],
      ['Il segnale raffigurato vieta il transito ai veicoli con altezza superiore a 3,5 metri, carico compreso.', 'The sign shown bans vehicles over 3.5 m high, load included.', true, 'Conta l\'altezza complessiva.', 'Overall height counts.', 'altezza-limitata'],
      ['Il segnale raffigurato vieta il transito alle biciclette.', 'The sign shown bans bicycles.', true, 'Le biciclette si possono condurre a mano.', 'Bicycles may be pushed.', 'divieto-biciclette'],
      ['Il segnale raffigurato vieta l\'uso del clacson anche in caso di pericolo immediato.', 'The sign shown bans the horn even in immediate danger.', false, 'In caso di pericolo immediato il clacson si può usare.', 'In immediate danger the horn may be used.', 'divieto-segnali-acustici'],
      ['Il segnale raffigurato vieta il transito ai veicoli che trasportano merci pericolose.', 'The sign shown bans vehicles carrying dangerous goods.', true, 'Riconoscibili dai pannelli arancioni.', 'Recognisable by orange plates.', 'divieto-merci-pericolose'],
      ['Il segnale raffigurato vieta la svolta a sinistra.', 'The sign shown bans left turns.', true, 'Vale per la prossima intersezione.', 'For the next junction.', 'divieto-svolta-sx'],
      ['Il segnale raffigurato indica la fine di tutti i divieti imposti ai veicoli in movimento.', 'The sign shown marks the end of all restrictions for moving vehicles.', true, 'È il segnale di "via libera".', 'It is the "end of all restrictions".', 'via-libera'],
      ['I segnali di divieto valgono dal punto in cui sono collocati.', 'Prohibitory signs apply from the point where they stand.', true, 'A differenza dei segnali di pericolo, che preannunciano.', 'Unlike warning signs, which give advance notice.'],
      ['Il segnale raffigurato obbliga a mantenere una distanza minima di 70 m dal veicolo che precede.', 'The sign shown requires at least 70 m from the vehicle ahead.', true, 'È il distanziamento minimo obbligatorio.', 'It is the minimum distance sign.', 'distanza-minima']
    ]
  },

  {
    id: 'it-04', n: 4, icon: '🔵', signCat: 'obbligo',
    t: ['Segnali di obbligo', 'Mandatory signs'],
    lessons: [
      { h: ['Riconoscerli e rispettarli', 'Recognising and obeying them'], b: [
`I segnali di obbligo sono **circolari a fondo blu** con simboli bianchi. Impongono una direzione, una corsia o un comportamento.
- **Direzione obbligatoria** (diritto, a destra, a sinistra): all'incrocio si può andare solo dove indica la freccia.
- **Preavviso di direzione obbligatoria**: la svolta va fatta **al prossimo incrocio**.
- **Direzioni consentite** (es. diritto e destra): vietata la direzione non indicata.
- **Passaggio obbligatorio** a destra/sinistra di un ostacolo; **passaggi consentiti** su entrambi i lati.
- **Rotatoria**: circolare in senso antiorario intorno all'isola centrale.
- **Percorso pedonale**, **pista ciclabile**, **percorso pedonale e ciclabile**: riservati.
- **Limite minimo di velocità**: non scendere sotto il valore indicato, salvo traffico o meteo avversi.
- **Catene da neve obbligatorie**: montare le catene o avere pneumatici invernali.
- I segnali di **fine obbligo** hanno una barra rossa obliqua.`,
`Mandatory signs are **blue circles** with white symbols. They impose a direction, a lane or a behaviour.
- **Compulsory direction** (ahead, right, left): at the junction go only where the arrow points.
- **Compulsory direction ahead**: turn **at the next junction**.
- **Permitted directions** (e.g. ahead and right): the other direction is forbidden.
- **Keep right/left** of an obstacle; **pass either side**.
- **Roundabout**: drive anticlockwise around the island.
- **Pedestrian path**, **cycle path**, **shared path**: reserved.
- **Minimum speed**: do not go slower unless traffic or weather prevent it.
- **Snow chains compulsory**: fit chains or have winter tyres.
- **End of obligation** signs have a red diagonal bar.`] }
    ],
    q: [
      ['I segnali di obbligo sono circolari a fondo blu.', 'Mandatory signs are blue circles.', true, 'Simboli bianchi su fondo blu.', 'White symbols on blue.'],
      ['Il segnale raffigurato obbliga a proseguire diritto.', 'The sign shown requires going straight ahead.', true, 'Sono vietate le svolte.', 'Turns are forbidden.', 'direzione-diritto'],
      ['Il segnale raffigurato consente di svoltare a sinistra.', 'The sign shown allows turning left.', false, 'Consente solo diritto o destra.', 'Only ahead or right.', 'diritto-dx'],
      ['Il segnale raffigurato obbliga a svoltare a destra al prossimo incrocio.', 'The sign shown requires turning right at the next junction.', true, 'È il preavviso di direzione obbligatoria.', 'It is the advance compulsory direction sign.', 'preavviso-dx'],
      ['Il segnale raffigurato obbliga a passare a destra dell\'ostacolo.', 'The sign shown requires passing to the right of the obstacle.', true, 'Si trova su isole spartitraffico.', 'Found on traffic islands.', 'passaggio-dx'],
      ['Il segnale raffigurato consente di passare sia a destra sia a sinistra dell\'ostacolo.', 'The sign shown allows passing on either side.', true, 'Passaggi consentiti.', 'Pass either side.', 'passaggi-consentiti'],
      ['Il segnale raffigurato obbliga a circolare in senso antiorario intorno all\'isola centrale.', 'The sign shown requires driving anticlockwise around the island.', true, 'È il segnale di rotatoria.', 'It is the roundabout sign.', 'rotatoria'],
      ['Il segnale raffigurato indica un percorso riservato ai pedoni.', 'The sign shown indicates a path reserved for pedestrians.', true, 'Vietato ai veicoli.', 'Forbidden to vehicles.', 'percorso-pedonale'],
      ['Il segnale raffigurato indica una pista ciclabile, vietata ai ciclomotori.', 'The sign shown indicates a cycle path, forbidden to mopeds.', true, 'Riservata ai velocipedi.', 'Reserved for bicycles.', 'pista-ciclabile'],
      ['Il segnale raffigurato obbliga a non scendere sotto i 30 km/h, se le condizioni lo consentono.', 'The sign shown requires not going below 30 km/h when conditions allow.', true, 'È il limite minimo di velocità.', 'It is the minimum speed sign.', 'velocita-minima'],
      ['Il segnale raffigurato vieta di superare i 30 km/h.', 'The sign shown forbids exceeding 30 km/h.', false, 'È un limite minimo (fondo blu), non massimo.', 'It is a minimum (blue), not a maximum.', 'velocita-minima'],
      ['Il segnale raffigurato obbliga a usare le catene da neve o pneumatici invernali.', 'The sign shown requires snow chains or winter tyres.', true, 'Dal punto in cui è collocato.', 'From where it stands.', 'catene-neve'],
      ['Il segnale raffigurato indica la fine della pista ciclabile.', 'The sign shown marks the end of the cycle path.', true, 'La barra rossa indica la fine dell\'obbligo.', 'The red bar marks the end.', 'fine-pista-ciclabile'],
      ['Un segnale circolare blu con freccia a destra vieta di proseguire diritto.', 'A blue circle with a right arrow forbids going straight.', true, 'Obbliga a svoltare a destra.', 'It requires turning right.', 'direzione-dx']
    ]
  },

  {
    id: 'it-05', n: 5, icon: '🔻', signCat: 'precedenza',
    t: ['Segnali di precedenza', 'Priority signs'],
    lessons: [
      { h: ['Dare precedenza e STOP', 'Give way and STOP'], b: [
`- **Dare precedenza** (triangolo con vertice in basso): obbliga a dare precedenza ai veicoli che circolano sulla strada in cui ci si immette, **sia da destra sia da sinistra**. Non obbliga a fermarsi se la strada è libera. È preceduto dal **preavviso** (di norma a 150 m) con pannello di distanza; sulla strada c'è la **linea di dare precedenza** (triangoli bianchi).
- **Fermarsi e dare precedenza (STOP)**: ottagono rosso. Obbliga **sempre** a fermarsi alla **striscia di arresto** e poi a dare precedenza. Si usa dove la visibilità è scarsa.

**Esempio:** arrivi a un incrocio con STOP e la strada è libera: devi comunque fermarti completamente prima della striscia.`,
`- **Give way** (downward triangle): give way to traffic on the road you join, **from both right and left**. You only stop if needed. It is preceded by an **advance sign** (normally 150 m) with a distance plate; on the road there is a **give-way line** (white triangles).
- **STOP** (red octagon): you must **always** stop at the **stop line**, then give way. Used where visibility is poor.

**Example:** you reach a STOP and the road is empty: you must still come to a complete stop before the line.`] },
      { h: ['Diritto di precedenza e strettoie', 'Priority road and narrow sections'], b: [
`- **Diritto di precedenza** (quadrato giallo con bordo bianco ruotato a 45°): si ha la precedenza agli incroci successivi fino al **fine del diritto di precedenza**.
- **Intersezione con diritto di precedenza** e **confluenza**: al prossimo incrocio si ha la precedenza sui veicoli delle strade laterali.
- **Intersezione con precedenza a destra** (triangolo con croce nera): incrocio senza segnali di precedenza, si dà la precedenza a chi viene da destra.
- **Dare precedenza nei sensi unici alternati** (cerchio con freccia rossa e nera): nella strettoia bisogna lasciar passare chi viene di fronte; la **freccia rossa** è il proprio senso.
- **Diritto di precedenza nei sensi unici alternati** (quadrato blu): si ha la precedenza nella strettoia; la **freccia bianca** è il proprio senso.`,
`- **Priority road** (yellow diamond with white border): you have priority at the following junctions until the **end of priority road**.
- **Junction with priority** and **side road**: at the next junction you have priority over side roads.
- **Crossroads with priority to the right** (triangle with black cross): no priority signs, give way to the right.
- **Give way to oncoming traffic** (circle with red and black arrows): let oncoming traffic through the narrow section; the **red arrow** is your direction.
- **Priority over oncoming traffic** (blue square): you have priority; the **white arrow** is your direction.`] }
    ],
    q: [
      ['Il segnale raffigurato obbliga a dare precedenza ai veicoli provenienti sia da destra sia da sinistra.', 'The sign shown requires giving way to vehicles from both right and left.', true, 'Dare precedenza a chi circola sulla strada principale.', 'Give way to traffic on the main road.', 'dare-precedenza'],
      ['Il segnale raffigurato obbliga sempre a fermarsi.', 'The sign shown always requires stopping.', false, 'Ci si ferma solo se necessario; l\'obbligo di fermarsi sempre è dello STOP.', 'Only if needed; always stopping is required by STOP.', 'dare-precedenza'],
      ['Il segnale raffigurato obbliga a fermarsi anche se la strada è libera.', 'The sign shown requires stopping even if the road is clear.', true, 'Lo STOP impone l\'arresto alla striscia.', 'STOP requires halting at the line.', 'stop'],
      ['Il segnale STOP ha forma ottagonale per essere riconosciuto anche da dietro.', 'The STOP sign is octagonal so it is recognisable from behind.', true, 'È l\'unico segnale ottagonale.', 'It is the only octagonal sign.', 'stop'],
      ['Il segnale raffigurato preannuncia un segnale di STOP.', 'The sign shown announces a STOP sign ahead.', true, 'È il preavviso di fermarsi e dare precedenza.', 'It is the advance STOP warning.', 'preavviso-stop'],
      ['Il segnale raffigurato indica che si percorre una strada con diritto di precedenza.', 'The sign shown indicates you are on a priority road.', true, 'Vale fino al segnale di fine.', 'Until the end sign.', 'diritto-precedenza'],
      ['In presenza del segnale raffigurato si può procedere senza moderare la velocità agli incroci.', 'With this sign you may cross junctions without slowing down.', false, 'Avere la precedenza non esonera dalla prudenza.', 'Priority does not remove the duty of care.', 'diritto-precedenza'],
      ['Il segnale raffigurato indica la fine del diritto di precedenza.', 'The sign shown marks the end of the priority road.', true, 'Agli incroci successivi valgono le regole generali.', 'General rules apply at the next junctions.', 'fine-diritto-precedenza'],
      ['Il segnale raffigurato preannuncia un incrocio in cui si deve dare precedenza a chi proviene da destra.', 'The sign shown warns of a junction where you give way to the right.', true, 'È l\'intersezione con precedenza a destra.', 'It is the priority-to-the-right junction.', 'incrocio-destra'],
      ['Il segnale raffigurato indica che al prossimo incrocio si ha la precedenza.', 'The sign shown indicates you have priority at the next junction.', true, 'Intersezione con diritto di precedenza.', 'Junction where you have priority.', 'intersezione-precedenza'],
      ['In presenza del segnale raffigurato si deve dare precedenza ai veicoli provenienti dal senso opposto.', 'With the sign shown you must give way to oncoming vehicles.', true, 'La freccia rossa è il proprio senso di marcia.', 'The red arrow is your direction.', 'dare-precedenza-senso-opposto'],
      ['Il segnale raffigurato dà la precedenza nella strettoia rispetto ai veicoli provenienti di fronte.', 'The sign shown gives you priority over oncoming traffic in the narrow section.', true, 'La freccia bianca indica il proprio senso.', 'The white arrow is your direction.', 'diritto-precedenza-senso-opposto'],
      ['Il preavviso di dare precedenza è posto di norma a 150 metri dall\'incrocio.', 'The advance give-way sign is normally 150 m before the junction.', true, 'Con pannello di distanza.', 'With a distance plate.', 'preavviso-dare-precedenza'],
      ['La linea di arresto continua accompagna il segnale di STOP.', 'The continuous stop line accompanies the STOP sign.', true, 'Ci si ferma prima della striscia.', 'You stop before the line.', 'linea-arresto-stop'],
      ['La linea formata da triangoli bianchi accompagna il segnale di dare precedenza.', 'The line of white triangles accompanies the Give Way sign.', true, 'Indica dove fermarsi se serve.', 'Shows where to wait if needed.', 'linea-dare-precedenza']
    ]
  },

  {
    id: 'it-06', n: 6, icon: '〰️', signCat: 'orizzontale',
    t: ['Segnaletica orizzontale e segni sugli ostacoli', 'Road markings and obstacle markings'],
    lessons: [
      { h: ['Colori e strisce longitudinali', 'Colours and longitudinal lines'], b: [
`La segnaletica orizzontale è tracciata sulla carreggiata. Colori:
- **Bianco**: segnaletica permanente.
- **Giallo**: segnaletica **temporanea** (cantieri; prevale sulla bianca), corsie e sosta riservate (bus, taxi, disabili), fermate dei mezzi pubblici.
- **Azzurro/blu**: sosta a pagamento.

**Strisce longitudinali:**
- **Continua**: non si può oltrepassare né calpestare.
- **Discontinua**: si può oltrepassare per sorpassare o svoltare in sicurezza.
- **Doppia continua**: separa i sensi di marcia, mai oltrepassabile.
- **Mista** (continua affiancata a discontinua): la può oltrepassare solo chi ha la discontinua dal proprio lato.
- **Strisce di margine**: delimitano la carreggiata.
- **Striscia di preavviso** (discontinua con tratti più lunghi): annuncia una striscia continua.`,
`Road markings are painted on the carriageway. Colours:
- **White**: permanent markings.
- **Yellow**: **temporary** markings (roadworks, they override white), reserved lanes/bays (bus, taxi, disabled), public transport stops.
- **Blue**: paid parking.

**Longitudinal lines:**
- **Continuous**: must not be crossed or straddled.
- **Broken**: may be crossed to overtake or turn safely.
- **Double continuous**: separates directions, never cross.
- **Mixed** (continuous beside broken): only those with the broken line on their side may cross.
- **Edge lines**: bound the carriageway.
- **Warning line** (broken with longer dashes): announces a continuous line.`] },
      { h: ['Strisce trasversali, frecce e iscrizioni', 'Transverse lines, arrows and words'], b: [
`- **Striscia di arresto** continua con scritta STOP: ci si ferma prima della striscia.
- **Linea di dare precedenza** (triangoli): fermarsi lì se occorre dare precedenza.
- **Attraversamento pedonale** (zebre): precedenza ai pedoni; vietate fermata e sosta.
- **Attraversamento ciclabile**: due file di quadrati bianchi.
- **Frecce direzionali**: chi si incanala deve seguire la direzione indicata; vietato cambiare corsia una volta iniziata la striscia continua.
- **Zebrature**: isole di traffico, non si possono percorrere né usare per la sosta.
- **Segni sugli ostacoli**: strisce alternate **bianche e nere** (o gialle e nere) sugli ostacoli vicini alla carreggiata (pilastri, spartitraffico).`,
`- **Stop line** with STOP: stop before the line.
- **Give-way line** (triangles): wait there if you must give way.
- **Zebra crossing**: pedestrians have priority; no stopping or parking.
- **Cycle crossing**: two rows of white squares.
- **Lane arrows**: follow the direction of your lane; once the continuous line starts you may not change lane.
- **Hatched areas**: traffic islands, do not drive or park on them.
- **Obstacle markings**: alternating **black and white** (or yellow and black) stripes on obstacles near the road.`] }
    ],
    q: [
      ['La striscia longitudinale continua non può essere oltrepassata.', 'A continuous longitudinal line must not be crossed.', true, 'Non si può neppure calpestare.', 'It may not even be straddled.', 'striscia-continua'],
      ['La striscia continua può essere oltrepassata per sorpassare un ciclista.', 'A continuous line may be crossed to overtake a cyclist.', false, 'Non si può mai oltrepassare.', 'It may never be crossed.', 'striscia-continua'],
      ['La striscia discontinua può essere oltrepassata per effettuare un sorpasso in sicurezza.', 'A broken line may be crossed to overtake safely.', true, 'Se la manovra è sicura.', 'If the manoeuvre is safe.', 'striscia-discontinua'],
      ['Con la striscia mista può sorpassare solo chi ha la parte discontinua dal proprio lato.', 'With a mixed line only drivers with the broken part on their side may cross.', true, 'Chi ha la continua dal proprio lato non può oltrepassarla.', 'Those with the continuous side may not cross.', 'striscia-mista'],
      ['La doppia striscia continua separa i sensi di marcia e non può essere oltrepassata.', 'The double continuous line separates directions and must not be crossed.', true, 'Mai oltrepassabile.', 'Never cross it.', 'striscia-doppia'],
      ['Le strisce gialle temporanee prevalgono su quelle bianche.', 'Yellow temporary lines override white ones.', true, 'Nei cantieri si seguono le gialle.', 'At roadworks follow the yellow ones.', 'striscia-gialla'],
      ['Le strisce blu delimitano gli stalli di sosta a pagamento.', 'Blue lines mark paid parking bays.', true, 'Le bianche indicano sosta libera, le gialle riservata.', 'White = free, yellow = reserved.', 'sosta-pagamento'],
      ['Le strisce gialle delimitano posti riservati, ad esempio ai veicoli per disabili.', 'Yellow lines mark reserved bays, e.g. for disabled people.', true, 'Sosta riservata.', 'Reserved parking.', 'sosta-disabili'],
      ['La striscia di arresto indica il punto in cui fermarsi in presenza del segnale di STOP.', 'The stop line shows where to stop at a STOP sign.', true, 'Ci si ferma prima della striscia.', 'Stop before the line.', 'linea-arresto-stop'],
      ['Sulle strisce pedonali è consentita la fermata per far scendere un passeggero.', 'Stopping on a zebra crossing to drop off a passenger is allowed.', false, 'Fermata e sosta sono vietate sugli attraversamenti pedonali.', 'Stopping and parking are forbidden on crossings.', 'strisce-pedonali'],
      ['Le zebrature delimitano zone che non possono essere percorse dai veicoli.', 'Hatched areas mark zones vehicles must not drive on.', true, 'Sono isole di traffico.', 'They are traffic islands.', 'zebratura'],
      ['Le frecce direzionali sulla corsia indicano la direzione obbligatoria per chi si incanala.', 'Lane arrows show the compulsory direction for those in that lane.', true, 'Bisogna seguirle.', 'They must be followed.', 'frecce-direzionali'],
      ['La linea gialla a zig-zag indica una fermata di autobus dove gli altri veicoli non possono fermarsi.', 'A yellow zig-zag line marks a bus stop where other vehicles may not stop.', true, 'Fermata e sosta vietate.', 'No stopping or parking.', 'fermata-bus'],
      ['I segni sugli ostacoli sono strisce alternate bianche e nere.', 'Obstacle markings are alternating black and white stripes.', true, 'Rendono visibili pilastri e spartitraffico.', 'They make pillars and islands visible.'],
      ['L\'attraversamento ciclabile è indicato da due file di quadrati bianchi.', 'A cycle crossing is marked by two rows of white squares.', true, 'Si distingue dalle zebre pedonali.', 'Different from zebra stripes.', 'attraversamento-ciclabile']
    ]
  },

  {
    id: 'it-07', n: 7, icon: '🚦', signCat: 'semafori',
    t: ['Segnalazioni semaforiche e degli agenti del traffico', 'Traffic lights and police signals'],
    lessons: [
      { h: ['Il semaforo veicolare', 'Vehicle traffic lights'], b: [
`- **Rosso**: vietato superare la striscia di arresto (o il semaforo).
- **Giallo fisso**: vietato oltrepassare la striscia, **a meno che** il veicolo vi si trovi così vicino da non potersi fermare in sicurezza. Non è un invito ad accelerare.
- **Verde**: si può procedere, ma bisogna dare precedenza ai pedoni che terminano l'attraversamento e **non impegnare l'incrocio** se non si è sicuri di liberarlo.
- **Giallo lampeggiante**: semaforo non in funzione: procedere con prudenza rispettando segnaletica e precedenze.
- **Lanterne a frecce**: regolano ciascuna direzione separatamente.
- **Semafori di corsia** (corsie reversibili): freccia verde = corsia utilizzabile, X rossa = corsia vietata.
- **Semafori per tram e bus** (barre bianche): non riguardano gli altri veicoli.`,
`- **Red**: do not pass the stop line (or the light).
- **Steady amber**: do not pass the line **unless** you are so close you cannot stop safely. It is not a cue to speed up.
- **Green**: you may go, but give way to pedestrians finishing crossing and **do not enter the junction** unless you can clear it.
- **Flashing amber**: lights out of service: proceed carefully following signs and priority rules.
- **Arrow lights**: control each direction separately.
- **Lane control signals** (reversible lanes): green arrow = lane open, red X = lane closed.
- **Tram/bus signals** (white bars): not for other vehicles.`] },
      { h: ['Gli agenti del traffico', 'Traffic police'], b: [
`Gerarchia: **agenti > semafori > segnaletica**. Le segnalazioni degli agenti prevalgono su tutto.
- **Braccio alzato verticalmente**: equivale al **giallo**; chi è già nell'incrocio lo libera.
- **Braccia tese orizzontalmente**: equivale al **rosso** per chi arriva di fronte o da dietro l'agente (vede il petto o la schiena) e al **verde** per chi arriva dai lati (vede il fianco).
- L'agente può fermare i veicoli con **paletta o fischietto**; un fischio lungo ordina l'arresto.`,
`Hierarchy: **officers > traffic lights > signs**. Officers' signals override everything.
- **Arm raised vertically**: equivalent to **amber**; those already in the junction clear it.
- **Arms outstretched horizontally**: **red** for those facing the officer's chest or back, **green** for those at the sides.
- Officers can stop vehicles with a **signal disc or whistle**.`] }
    ],
    q: [
      ['Con la luce rossa è vietato superare la striscia di arresto.', 'At red you must not pass the stop line.', true, 'Bisogna fermarsi prima.', 'Stop before it.', 'semaforo-rosso'],
      ['Con la luce gialla fissa bisogna accelerare per superare l\'incrocio prima del rosso.', 'At steady amber you should speed up to clear the junction before red.', false, 'Il giallo impone di fermarsi, se possibile in sicurezza.', 'Amber means stop if you can do so safely.', 'semaforo-giallo'],
      ['Con la luce gialla si può proseguire se si è troppo vicini alla striscia per fermarsi in sicurezza.', 'At amber you may proceed if too close to stop safely.', true, 'È l\'unica eccezione.', 'That is the only exception.', 'semaforo-giallo'],
      ['Con la luce verde si deve comunque dare precedenza ai pedoni che stanno terminando l\'attraversamento.', 'At green you must still give way to pedestrians finishing their crossing.', true, 'Anche col verde.', 'Even at green.', 'semaforo-verde'],
      ['Con il verde si può impegnare l\'incrocio anche se il traffico impedisce di liberarlo.', 'At green you may enter the junction even if traffic prevents you clearing it.', false, 'Non si deve bloccare l\'incrocio.', 'You must not block the junction.', 'semaforo-verde'],
      ['Il giallo lampeggiante indica che bisogna procedere con prudenza rispettando le precedenze.', 'Flashing amber means proceed carefully following priority rules.', true, 'Il semaforo non regola il traffico.', 'The lights are not controlling traffic.', 'semaforo-lampeggiante'],
      ['Le segnalazioni degli agenti prevalgono su quelle dei semafori.', 'Police signals override traffic lights.', true, 'Agenti > semafori > segnali.', 'Officers > lights > signs.'],
      ['L\'agente con il braccio alzato equivale alla luce gialla.', 'An officer with arm raised equals amber.', true, 'Chi è nell\'incrocio lo deve liberare.', 'Those in the junction must clear it.', 'agente-braccio-alzato'],
      ['L\'agente con le braccia tese orizzontalmente equivale al rosso per chi lo vede di fronte.', 'An officer with arms outstretched equals red for those facing him.', true, 'Chi vede petto o schiena si ferma.', 'Those seeing chest or back stop.', 'agente-braccia-tese'],
      ['L\'agente con le braccia tese orizzontalmente equivale al verde per chi arriva dai lati.', 'Arms outstretched equal green for traffic from the sides.', true, 'Chi vede il fianco passa.', 'Those seeing the side may go.', 'agente-braccia-tese'],
      ['La X rossa su un semaforo di corsia indica che la corsia non può essere percorsa.', 'A red X on a lane signal means the lane is closed.', true, 'La freccia verde indica corsia aperta.', 'A green arrow means open.'],
      ['I semafori a barre bianche per tram valgono anche per le autovetture.', 'White-bar tram signals also apply to cars.', false, 'Valgono solo per tram e bus.', 'Only for trams and buses.'],
      ['Il segnale di pericolo "semaforo" è posto perché l\'impianto potrebbe non essere visibile in tempo.', 'The "traffic lights ahead" warning exists because the lights may not be seen in time.', true, 'Prepararsi a fermarsi.', 'Be ready to stop.', 'semaforo-pericolo']
    ]
  },

  {
    id: 'it-08', n: 8, icon: '🟦', signCat: 'indicazione',
    t: ['Segnali di indicazione', 'Information signs'],
    lessons: [
      { h: ['Colori e funzioni', 'Colours and functions'], b: [
`I segnali di indicazione forniscono informazioni per orientarsi. In Italia il **colore del fondo** dipende dalla strada:
- **Verde**: autostrade.
- **Blu**: strade extraurbane.
- **Bianco**: strade urbane.
- **Marrone**: località di interesse turistico o culturale.
- **Giallo**: indicazioni temporanee (deviazioni, cantieri).

Tipi principali: **preavviso di intersezione**, **preselezione** (corsie e direzioni prima dell'incrocio), **direzione** (all'incrocio), **conferma** (dopo l'incrocio, con distanze), **inizio/fine centro abitato**, **identificazione strada** (A1, E45, SS 1), **progressiva chilometrica**.`,
`Information signs help you navigate. In Italy the **background colour** depends on the road:
- **Green**: motorways.
- **Blue**: rural roads.
- **White**: urban roads.
- **Brown**: tourist or cultural places.
- **Yellow**: temporary directions (diversions, works).

Main types: **advance junction sign**, **lane selection**, **direction** (at the junction), **confirmation** (after the junction, with distances), **start/end of built-up area**, **road number** (A1, E45, SS 1), **kilometre markers**.`] },
      { h: ['Segnali utili per la guida', 'Useful signs for driving'], b: [
`- **Senso unico**: la strada è percorribile solo nella direzione della freccia; nei centri abitati si può sostare anche a sinistra.
- **Strada senza uscita**.
- **Autostrada / fine autostrada**, **strada extraurbana principale**.
- **Attraversamento pedonale** (quadrato blu, posto sul punto di attraversamento).
- **Parcheggio**, **area pedonale**, **zona a traffico limitato**, **zona residenziale**.
- **Velocità consigliata**: non obbligatoria.
- **Ospedale**, **colonnina SOS**, **area di servizio**, **rifornimento carburante**.
- **Controllo elettronico della velocità**.`,
`- **One-way street**: traffic only in the arrow direction; in towns you may also park on the left.
- **No through road**.
- **Motorway / end of motorway**, **main rural road**.
- **Pedestrian crossing** (blue square, placed at the crossing).
- **Parking**, **pedestrian zone**, **limited traffic zone**, **residential zone**.
- **Advisory speed**: not compulsory.
- **Hospital**, **SOS phone**, **service area**, **fuel**.
- **Speed enforcement**.`] }
    ],
    q: [
      ['In Italia i segnali di indicazione delle autostrade hanno il fondo verde.', 'In Italy motorway direction signs are green.', true, 'Blu per le extraurbane, bianco per le urbane.', 'Blue for rural, white for urban.', 'autostrada'],
      ['I segnali di indicazione con fondo marrone indicano località di interesse turistico.', 'Brown direction signs show tourist destinations.', true, 'Anche culturale.', 'Also cultural sites.'],
      ['Il segnale raffigurato indica l\'inizio di un\'autostrada.', 'The sign shown marks the start of a motorway.', true, 'Valgono le regole dell\'autostrada.', 'Motorway rules apply.', 'autostrada'],
      ['Il segnale raffigurato indica una strada a senso unico.', 'The sign shown indicates a one-way street.', true, 'Si circola solo nella direzione della freccia.', 'Only in the arrow direction.', 'senso-unico'],
      ['Il segnale raffigurato obbliga a proseguire diritto all\'incrocio.', 'The sign shown requires going straight on at the junction.', false, 'È un segnale di indicazione (senso unico), non di obbligo.', 'It is information (one-way), not mandatory.', 'senso-unico'],
      ['Il segnale raffigurato indica una strada senza uscita.', 'The sign shown indicates a dead end.', true, 'Bisognerà invertire la marcia.', 'You will have to turn around.', 'strada-senza-uscita'],
      ['Il segnale raffigurato indica un\'area di parcheggio.', 'The sign shown indicates a parking area.', true, 'Pannelli possono indicare orari e veicoli.', 'Plates may give times and vehicles.', 'parcheggio'],
      ['Il segnale raffigurato è posto in corrispondenza di un attraversamento pedonale.', 'The sign shown is placed at a pedestrian crossing.', true, 'Il triangolo di pericolo invece lo preannuncia.', 'The warning triangle announces it in advance.', 'attraversamento-pedonale-ind'],
      ['Il segnale di velocità consigliata obbliga a non superare la velocità indicata.', 'The advisory speed sign forbids exceeding the speed shown.', false, 'È solo un consiglio.', 'It is only advice.', 'velocita-consigliata'],
      ['Il segnale raffigurato indica l\'inizio di un centro abitato, dove vale il limite di 50 km/h.', 'The sign shown marks the start of a built-up area with a 50 km/h limit.', true, 'Anche senza cartello di velocità.', 'Even without a speed sign.', 'centro-abitato'],
      ['Il segnale raffigurato indica un\'area pedonale.', 'The sign shown indicates a pedestrian zone.', true, 'Possono entrare solo veicoli autorizzati.', 'Only authorised vehicles may enter.', 'area-pedonale'],
      ['Il segnale raffigurato indica la presenza di una colonnina per chiamate di soccorso.', 'The sign shown indicates an emergency call point.', true, 'Frequente in autostrada e galleria.', 'Common on motorways and in tunnels.', 'sos'],
      ['Il segnale di conferma è posto dopo l\'incrocio e indica le distanze delle località.', 'Confirmation signs are after the junction and show distances.', true, 'Conferma la direzione presa.', 'They confirm the route taken.'],
      ['Il segnale raffigurato indica un controllo elettronico della velocità.', 'The sign shown indicates speed enforcement.', true, 'Autovelox o tutor.', 'Speed camera or average-speed check.', 'controllo-velocita']
    ]
  },

  {
    id: 'it-09', n: 9, icon: '🚧', signCat: 'cantiere',
    t: ['Segnali complementari, segnali temporanei e di cantiere', 'Complementary, temporary and roadworks signs'],
    lessons: [
      { h: ['Cantieri e segnaletica temporanea', 'Roadworks and temporary signs'], b: [
`Nei cantieri la segnaletica ha **fondo giallo** e **prevale** su quella permanente.
- **Lavori**, **strettoia**, **mezzi di lavoro in azione**, **strada deformata**, **materiale instabile**.
- **Barriere** a strisce bianche e rosse, **coni** e **delineatori flessibili** delimitano il cantiere.
- **Moviere** con bandiera o paletta: regola il senso unico alternato; rispettare le sue indicazioni.
- **Semafori di cantiere**: regolano il senso unico alternato.
- **Veicolo operativo** con pannello a freccia luminosa: indica da che lato passare.

**Comportamento:** ridurre la velocità, non sorpassare, mantenere distanza dagli operai, seguire le strisce **gialle** ignorando le bianche.`,
`At roadworks signs have a **yellow background** and **override** permanent ones.
- **Roadworks**, **narrowing**, **machinery at work**, **uneven road**, **loose material**.
- Red-and-white **barriers**, **cones** and **flexible delineators** mark the site.
- **Flagman** with a flag or disc controls alternating one-way traffic; follow his signals.
- **Temporary traffic lights** control alternating flow.
- **Works vehicle** with a lit arrow panel shows which side to pass.

**Behaviour:** slow down, do not overtake, keep away from workers, follow **yellow** lines and ignore white ones.`] },
      { h: ['Segnali complementari', 'Complementary devices'], b: [
`- **Delineatori di curva** (frecce bianche su fondo rosso, o nere su bianco): indicano la direzione e la pericolosità della curva.
- **Delineatori normali di margine**: paletti con catarifrangenti ai lati della strada, utili di notte e con nebbia.
- **Delineatori di galleria**, **di intersezione**, **di ostacolo**.
- **Dossi artificiali** (rallentatori) nei centri abitati, segnalati in anticipo.
- **Inserti catarifrangenti** (occhi di gatto) sulla carreggiata.`,
`- **Chevron signs** (white arrows on red, or black on white): show the direction and sharpness of a bend.
- **Edge posts** with reflectors along the road, useful at night and in fog.
- **Tunnel, junction and obstacle delineators**.
- **Speed humps** in built-up areas, signed in advance.
- **Road studs** (cat's eyes) on the carriageway.`] }
    ],
    q: [
      ['I segnali temporanei di cantiere hanno il fondo giallo.', 'Temporary roadworks signs have a yellow background.', true, 'Prevalgono su quelli permanenti.', 'They override permanent signs.', 'lavori-giallo'],
      ['Nei cantieri si devono seguire le strisce bianche anche se ci sono strisce gialle.', 'At roadworks you must follow white lines even if yellow lines exist.', false, 'Prevalgono le gialle.', 'Yellow lines prevail.', 'striscia-gialla'],
      ['Il moviere con la bandiera regola il traffico nei sensi unici alternati dei cantieri.', 'A flagman controls alternating one-way traffic at roadworks.', true, 'Bisogna rispettare le sue indicazioni.', 'His signals must be obeyed.'],
      ['Il delineatore di curva indica la direzione della curva.', 'A chevron sign shows the direction of the bend.', true, 'E ne segnala la pericolosità.', 'And how sharp it is.', 'delineatore-curva'],
      ['In un cantiere stradale conviene sorpassare i veicoli lenti per uscire prima dalla zona dei lavori.', 'At roadworks it is wise to overtake slow vehicles to get out sooner.', false, 'Serve prudenza: ridurre la velocità e non sorpassare.', 'Slow down and do not overtake.'],
      ['Le barriere a strisce bianche e rosse delimitano le zone di lavoro.', 'Red and white barriers mark work zones.', true, 'Non vanno superate.', 'Do not pass them.'],
      ['I coni e i delineatori flessibili servono a delimitare il cantiere e guidare la circolazione.', 'Cones and flexible delineators mark the works and guide traffic.', true, 'Indicano il percorso.', 'They show the path.'],
      ['Il pannello luminoso a freccia su un veicolo operativo indica da quale lato passare.', 'The arrow panel on a works vehicle shows which side to pass.', true, 'Seguire la freccia.', 'Follow the arrow.'],
      ['I delineatori normali di margine sono particolarmente utili di notte e con nebbia.', 'Edge posts are particularly useful at night and in fog.', true, 'Grazie ai catarifrangenti.', 'Thanks to their reflectors.'],
      ['Il semaforo di cantiere può essere ignorato se la strada sembra libera.', 'Roadworks traffic lights may be ignored if the road looks clear.', false, 'Va sempre rispettato.', 'It must always be obeyed.']
    ]
  }
];
