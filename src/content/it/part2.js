// Italia – capitoli 10-17

export default [
  {
    id: 'it-10', n: 10, icon: '🔲', signCat: 'pannelli',
    t: ['Pannelli integrativi dei segnali', 'Additional panels'],
    lessons: [
      { h: ['A cosa servono', 'What they are for'], b: [
`I **pannelli integrativi** sono rettangolari, bianchi con simboli neri, e si pongono **sotto** un segnale per precisarne il significato.
- **Distanza** (es. "150 m"): distanza tra segnale e inizio del pericolo o della prescrizione.
- **Estesa** (freccia verticale con lunghezza, es. "2 km"): lunghezza del tratto interessato.
- **Periodo / orario** (es. "8-20"): il segnale vale solo in quelle ore.
- **Inizio, continuazione, fine** (frecce): dove comincia, prosegue o finisce la prescrizione (tipico dei divieti di sosta).
- **Categorie di veicoli** (es. sagoma di autocarro): il segnale vale solo per quei veicoli.
- **Eccetto** (es. "eccetto autorizzati"): esclude alcuni veicoli.
- **Zona rimozione**: il veicolo in sosta vietata viene rimosso.
- **Strada sdrucciolevole per pioggia / ghiaccio**, **incidente**, **coda**, **uscita autocarri**.
- **Limitazioni per tipo di strada**: es. il limite vale solo con pioggia.

**Regola d'oro:** senza pannello, un segnale vale sempre e per tutti i veicoli.`,
`**Additional plates** are rectangular, white with black symbols, placed **under** a sign to clarify it.
- **Distance** (e.g. "150 m"): distance from the sign to the hazard or rule.
- **Length** (vertical arrow with length, e.g. "2 km"): length of the stretch.
- **Time** (e.g. "8-20"): the sign applies only at those hours.
- **Start, continuation, end** (arrows): where the rule starts, continues or ends (typical of no-parking).
- **Vehicle categories** (e.g. lorry silhouette): only those vehicles.
- **Except** (e.g. "except authorised"): excludes some vehicles.
- **Tow-away zone**: illegally parked vehicles are removed.
- **Slippery when wet / icy**, **accident**, **queue**, **lorries exiting**.

**Golden rule:** without a plate, a sign always applies to all vehicles.`] }
    ],
    q: [
      ['Il pannello integrativo raffigurato indica la distanza dall\'inizio del pericolo o della prescrizione.', 'The plate shown gives the distance to the hazard or rule.', true, 'Si trova sotto il segnale.', 'It is placed under the sign.', 'pannello-distanza'],
      ['Il pannello di estesa indica la lunghezza del tratto di strada in cui vale il segnale.', 'The length plate shows how long the sign applies for.', true, 'Freccia verticale con misura.', 'Vertical arrow with a measure.', 'pannello-estesa'],
      ['Il pannello "8-20" sotto un divieto di sosta indica che il divieto vale dalle 8 alle 20.', 'An "8-20" plate under no-parking means the ban applies 8:00–20:00.', true, 'Fuori da quell\'orario si può sostare.', 'Outside those hours parking is allowed.', 'pannello-orario'],
      ['Un segnale di divieto senza pannelli integrativi vale per tutti i veicoli e in ogni ora.', 'A prohibitory sign without plates applies to all vehicles at all times.', true, 'I pannelli servono a restringerlo.', 'Plates restrict it.'],
      ['Il pannello "zona rimozione" indica che il veicolo in sosta vietata può essere rimosso.', '"Tow-away zone" means illegally parked vehicles may be removed.', true, 'Con carro attrezzi.', 'By tow truck.', 'pannello-rimozione'],
      ['Il pannello che raffigura un autocarro sotto un divieto limita il divieto agli autocarri.', 'A lorry-symbol plate under a ban limits it to lorries.', true, 'Il segnale vale solo per i veicoli raffigurati.', 'It applies only to the vehicles shown.'],
      ['Il pannello "eccetto bus" sotto un divieto di transito consente il transito agli autobus.', 'An "except buses" plate under a no-vehicles sign lets buses pass.', true, 'Esclude gli autobus dal divieto.', 'Buses are excluded from the ban.', 'pannello-eccetto'],
      ['Il pannello integrativo può essere posto sopra il segnale principale per renderlo più visibile.', 'An additional plate may be placed above the main sign for visibility.', false, 'Si pone sotto il segnale.', 'It goes under the sign.'],
      ['Il pannello "con pioggia" sotto un limite di velocità fa valere il limite solo in caso di pioggia.', 'A "when wet" plate under a speed limit makes it apply only in rain.', true, 'Limitazione per condizioni.', 'Condition plate.', 'pannello-strada-sdrucciolevole'],
      ['I pannelli distanziometrici con barre rosse oblique preannunciano un passaggio a livello.', 'Countdown markers with red diagonal bars announce a level crossing.', true, 'Tre, due e una barra.', 'Three, two and one bar.', 'delineatore-pl']
    ]
  },

  {
    id: 'it-11', n: 11, icon: '⏱️',
    t: ['Limiti di velocità, pericolo e intralcio alla circolazione', 'Speed limits, danger and obstruction'],
    lessons: [
      { h: ['I limiti generali (art. 142)', 'General limits (art. 142)'], b: [
`Per **autovetture e motocicli**:
- **50 km/h** nei centri abitati (elevabile fino a 70 km/h su strade urbane con caratteristiche adeguate).
- **90 km/h** sulle strade extraurbane secondarie e locali.
- **110 km/h** sulle strade extraurbane principali.
- **130 km/h** in autostrada (elevabile a 150 km/h dove consentito dall'ente gestore).

**Con pioggia o precipitazioni:** 110 km/h in autostrada e 90 km/h sulle extraurbane principali.
**Neopatentati (primi 3 anni):** 100 km/h in autostrada e 90 km/h sulle extraurbane principali.
**Nebbia con visibilità inferiore a 100 m:** massimo 50 km/h su autostrade ed extraurbane principali.

Altri veicoli: ciclomotori 45 km/h; autocarri oltre 3,5 t e autovetture con rimorchio 70 km/h fuori dai centri abitati e 80 km/h in autostrada.`,
`For **cars and motorcycles**:
- **50 km/h** in built-up areas (up to 70 km/h on suitable urban roads).
- **90 km/h** on secondary rural and local roads.
- **110 km/h** on main rural roads.
- **130 km/h** on motorways (up to 150 where allowed).

**In rain:** 110 km/h on motorways and 90 km/h on main rural roads.
**New drivers (first 3 years):** 100 km/h motorways, 90 km/h main rural roads.
**Fog with visibility under 100 m:** max 50 km/h on motorways and main rural roads.

Other vehicles: mopeds 45 km/h; lorries over 3.5 t and cars with trailers 70 km/h on rural roads, 80 km/h on motorways.`] },
      { h: ['Adeguare la velocità (art. 141)', 'Adapting speed (art. 141)'], b: [
`Il conducente deve **regolare la velocità** in modo da poter compiere tutte le manovre in sicurezza, in particolare l'**arresto tempestivo** entro il campo di visibilità.
La velocità va **ridotta** in particolare:
- nei tratti con **visibilità limitata**, nelle **curve**, in prossimità delle **intersezioni** e delle **scuole**;
- nelle **forti discese**, nelle strettoie, sui **dossi**;
- in caso di **nebbia, pioggia, neve**, o di notte;
- in prossimità di **pedoni**, animali, veicoli fermi, bambini.

**Intralcio:** non si deve circolare a velocità così bassa da costituire intralcio, salvo necessità.
**Superamento dei limiti:** sanzioni crescenti con il superamento; oltre 40 km/h sospensione della patente.`,
`The driver must **adjust speed** to carry out every manoeuvre safely, especially **stopping in time** within the visible distance.
Reduce speed especially:
- with **limited visibility**, on **bends**, near **junctions** and **schools**;
- on **steep descents**, narrow sections, **crests**;
- in **fog, rain, snow**, at night;
- near **pedestrians**, animals, stationary vehicles, children.

**Obstruction:** do not drive so slowly that you obstruct traffic unless necessary.
**Speeding:** fines grow with the excess; over 40 km/h above the limit means licence suspension.`] }
    ],
    q: [
      ['Nei centri abitati il limite generale di velocità per le autovetture è di 50 km/h.', 'In built-up areas the general limit for cars is 50 km/h.', true, 'Può essere elevato fino a 70 km/h su strade adeguate.', 'It may be raised to 70 km/h on suitable roads.'],
      ['Sulle strade extraurbane secondarie il limite per le autovetture è 110 km/h.', 'On secondary rural roads the car limit is 110 km/h.', false, 'È 90 km/h; 110 vale sulle extraurbane principali.', 'It is 90 km/h; 110 is for main rural roads.'],
      ['In autostrada il limite generale per le autovetture è 130 km/h.', 'On motorways the general car limit is 130 km/h.', true, 'Con pioggia scende a 110 km/h.', 'In rain it drops to 110 km/h.', 'autostrada'],
      ['Con la pioggia in autostrada il limite è 110 km/h.', 'In rain the motorway limit is 110 km/h.', true, 'E 90 km/h sulle extraurbane principali.', 'And 90 km/h on main rural roads.'],
      ['Il neopatentato nei primi tre anni non può superare i 100 km/h in autostrada.', 'New drivers in their first three years may not exceed 100 km/h on motorways.', true, 'E 90 km/h sulle extraurbane principali.', 'And 90 km/h on main rural roads.'],
      ['Con nebbia e visibilità inferiore a 100 m il limite in autostrada è 50 km/h.', 'In fog with visibility under 100 m the motorway limit is 50 km/h.', true, 'Anche sulle extraurbane principali.', 'Also on main rural roads.'],
      ['Il limite massimo di velocità indica sempre la velocità da tenere.', 'The speed limit always indicates the speed to drive at.', false, 'È un massimo: va adeguata alle condizioni.', 'It is a maximum: adapt to conditions.', 'limite-velocita'],
      ['La velocità deve essere ridotta in prossimità delle scuole.', 'Speed must be reduced near schools.', true, 'Art. 141 CdS.', 'Art. 141.'],
      ['Il conducente deve poter arrestare il veicolo entro il campo di visibilità.', 'The driver must be able to stop within the visible distance.', true, 'È il principio dell\'art. 141.', 'Principle of art. 141.'],
      ['È consentito circolare a velocità molto ridotta senza motivo anche se si intralcia il traffico.', 'Driving very slowly for no reason is allowed even if it obstructs traffic.', false, 'È vietato costituire intralcio.', 'Obstructing traffic is forbidden.'],
      ['I ciclomotori non possono superare i 45 km/h.', 'Mopeds may not exceed 45 km/h.', true, 'È la loro velocità massima.', 'It is their maximum speed.'],
      ['Gli autocarri con massa superiore a 3,5 t in autostrada non possono superare gli 80 km/h.', 'Lorries over 3.5 t may not exceed 80 km/h on motorways.', true, 'E 70 km/h fuori dai centri abitati.', 'And 70 km/h on rural roads.'],
      ['Di notte, a parità di condizioni, è prudente ridurre la velocità.', 'At night it is wise to reduce speed.', true, 'La visibilità è minore.', 'Visibility is lower.'],
      ['Superare il limite di velocità di oltre 40 km/h comporta la sospensione della patente.', 'Exceeding the limit by over 40 km/h leads to licence suspension.', true, 'Oltre alla sanzione pecuniaria e ai punti.', 'Plus a fine and penalty points.'],
      ['In curva la velocità va adeguata prima di entrarvi.', 'Speed should be adapted before entering a bend.', true, 'Frenare in curva è pericoloso.', 'Braking in a bend is dangerous.', 'curva-dx']
    ]
  },

  {
    id: 'it-12', n: 12, icon: '↔️',
    t: ['Distanza di sicurezza', 'Safe following distance'],
    lessons: [
      { h: ['Reazione, frenatura e arresto', 'Reaction, braking and stopping'], b: [
`La **distanza di sicurezza** è lo spazio da tenere dal veicolo che precede per potersi fermare senza tamponarlo in caso di frenata improvvisa.

- **Spazio di reazione**: percorso dal momento in cui si vede il pericolo a quando si inizia a frenare. Con un tempo di reazione di circa **1 secondo**, a 90 km/h si percorrono **25 m**.
- **Spazio di frenatura**: percorso durante la frenata. Cresce con il **quadrato della velocità**: se la velocità **raddoppia**, lo spazio di frenatura **quadruplica**.
- **Spazio di arresto** = spazio di reazione + spazio di frenatura.

**Calcolo veloce dello spazio di reazione:** (velocità in km/h ÷ 10) × 3 ≈ metri in un secondo. A 50 km/h ≈ 15 m, a 130 km/h ≈ 36 m.

La distanza va **aumentata** con: fondo bagnato, ghiaccio o neve, pneumatici o freni usurati, stanchezza, alcol o farmaci, scarsa visibilità, veicolo carico, moto davanti.
**Regola pratica dei 2 secondi:** scegli un riferimento fisso: tra il passaggio del veicolo davanti e il tuo devono passare almeno 2 secondi (4 con pioggia).`,
`The **safe distance** is the gap you must keep from the vehicle in front so you can stop without hitting it.

- **Reaction distance**: from seeing the hazard to starting to brake. With about **1 second** reaction time, at 90 km/h you travel **25 m**.
- **Braking distance**: travelled while braking. It grows with the **square of speed**: if speed **doubles**, braking distance **quadruples**.
- **Stopping distance** = reaction + braking distance.

**Quick estimate:** (speed in km/h ÷ 10) × 3 ≈ metres per second. 50 km/h ≈ 15 m, 130 km/h ≈ 36 m.

**Increase** the gap with: wet road, ice or snow, worn tyres or brakes, tiredness, alcohol or medicines, poor visibility, heavy load, a motorcycle ahead.
**Two-second rule:** pick a fixed point: at least 2 seconds should pass between the vehicle ahead and you (4 in rain).`] }
    ],
    q: [
      ['La distanza di sicurezza deve consentire di arrestarsi senza tamponare il veicolo che precede.', 'The safe distance must let you stop without hitting the vehicle ahead.', true, 'Anche in caso di frenata improvvisa.', 'Even if it brakes suddenly.'],
      ['Lo spazio di arresto è la somma dello spazio di reazione e dello spazio di frenatura.', 'Stopping distance is reaction distance plus braking distance.', true, 'Definizione.', 'Definition.'],
      ['Se la velocità raddoppia, lo spazio di frenatura raddoppia.', 'If speed doubles, braking distance doubles.', false, 'Quadruplica: cresce con il quadrato della velocità.', 'It quadruples: it grows with the square of speed.'],
      ['Lo spazio di reazione aumenta se il conducente è stanco.', 'Reaction distance increases when the driver is tired.', true, 'I riflessi rallentano.', 'Reflexes slow down.'],
      ['A 90 km/h in un secondo si percorrono circa 25 metri.', 'At 90 km/h you travel about 25 m per second.', true, '90 ÷ 3,6 = 25 m/s.', '90 ÷ 3.6 = 25 m/s.'],
      ['Con fondo bagnato la distanza di sicurezza può essere ridotta perché si va più piano.', 'On a wet road the safe distance may be reduced because you drive slower.', false, 'Va aumentata: l\'aderenza diminuisce.', 'It must be increased: grip is lower.'],
      ['L\'assunzione di alcol aumenta il tempo di reazione.', 'Alcohol increases reaction time.', true, 'Quindi anche lo spazio di reazione.', 'So reaction distance too.'],
      ['Lo spazio di frenatura dipende dallo stato dei pneumatici.', 'Braking distance depends on tyre condition.', true, 'Pneumatici usurati allungano la frenata.', 'Worn tyres lengthen braking.'],
      ['La distanza di sicurezza va aumentata quando si segue un motociclo.', 'The distance should be increased when following a motorcycle.', true, 'Può frenare molto bruscamente o cadere.', 'It can brake sharply or fall.'],
      ['Il sistema ABS riduce sempre lo spazio di frenatura su qualsiasi fondo.', 'ABS always reduces braking distance on any surface.', false, 'L\'ABS impedisce il bloccaggio delle ruote e mantiene la sterzata; su neve fresca o ghiaia può allungare la frenata.', 'ABS prevents wheel lock and keeps steering; on fresh snow or gravel it may lengthen braking.'],
      ['Il segnale raffigurato obbliga a mantenere almeno 70 metri dal veicolo che precede.', 'The sign shown requires at least 70 m from the vehicle ahead.', true, 'Distanziamento minimo obbligatorio.', 'Minimum distance sign.', 'distanza-minima'],
      ['In galleria è consigliabile ridurre la distanza di sicurezza per non creare code.', 'In tunnels you should reduce the distance to avoid queues.', false, 'Va mantenuta o aumentata.', 'Keep or increase it.'],
      ['Con veicolo a pieno carico lo spazio di frenatura aumenta.', 'With a full load braking distance increases.', true, 'Maggiore massa da fermare.', 'More mass to stop.'],
      ['La regola dei due secondi aiuta a stimare la distanza di sicurezza.', 'The two-second rule helps estimate a safe gap.', true, 'Quattro secondi con pioggia.', 'Four seconds in rain.']
    ]
  },

  {
    id: 'it-13', n: 13, icon: '🛣️',
    t: ['Norme sulla circolazione dei veicoli', 'Rules for vehicle traffic'],
    lessons: [
      { h: ['Posizione sulla carreggiata', 'Position on the road'], b: [
`- In Italia si circola sulla **parte destra** della carreggiata, il più vicino possibile al margine destro, anche quando la strada è libera.
- Sulle strade a **più corsie** per senso fuori dai centri abitati si percorre la **corsia libera più a destra**; le altre servono al sorpasso.
- Nei **centri abitati** con più corsie per senso si può circolare su qualsiasi corsia (marcia per file parallele) se il traffico è intenso.
- Vietato circolare sulle **corsie riservate** (bus, taxi) e sulla corsia di emergenza.
- Il **cambio di corsia** va segnalato con l'indicatore di direzione, dopo aver guardato negli **specchietti** e nell'angolo cieco.`,
`- In Italy you drive on the **right-hand side**, as close as possible to the right edge, even when the road is clear.
- On rural roads with **several lanes** each way use the **rightmost free lane**; the others are for overtaking.
- In **built-up areas** with several lanes you may use any lane (parallel rows) when traffic is heavy.
- Do not use **reserved lanes** (bus, taxi) or the emergency lane.
- **Lane changes** must be signalled after checking **mirrors** and the blind spot.`] },
      { h: ['Svolte, inversione e utenti deboli', 'Turns, U-turns and vulnerable users'], b: [
`- **Svolta a destra**: tenersi vicino al margine destro.
- **Svolta a sinistra**: avvicinarsi all'asse della carreggiata (su strada a senso unico, al margine sinistro) e svoltare in prossimità del centro dell'incrocio, dando precedenza ai veicoli che vengono di fronte.
- **Inversione di marcia** vietata in prossimità o in corrispondenza di intersezioni, curve, dossi, e comunque con scarsa visibilità; sempre vietata in autostrada.
- **Ciclisti:** fuori dai centri abitati procedono in fila singola. Nel sorpasso di una bicicletta va mantenuta, ove possibile, una **distanza laterale di almeno 1,5 m** (riforma 2024).
- **Pedoni:** circolano sul marciapiede o, se manca, sul margine della carreggiata in senso **opposto** a quello di marcia dei veicoli (fuori dai centri abitati).
- Sulle **strade di montagna** strette, chi scende dà precedenza a chi sale.`,
`- **Right turn**: keep close to the right edge.
- **Left turn**: move towards the centre line (left edge on a one-way street) and turn near the junction centre, giving way to oncoming traffic.
- **U-turns** forbidden at or near junctions, bends, crests and wherever visibility is poor; always forbidden on motorways.
- **Cyclists:** ride in single file outside built-up areas. When overtaking a bicycle keep, where possible, **at least 1.5 m lateral distance** (2024 reform).
- **Pedestrians:** use the pavement or, if none, the edge of the road **facing** oncoming traffic (outside towns).
- On narrow **mountain roads** the downhill driver gives way.`] }
    ],
    q: [
      ['I veicoli devono circolare sulla parte destra della carreggiata, in prossimità del margine destro.', 'Vehicles must drive on the right-hand side, near the right edge.', true, 'Anche se la strada è libera.', 'Even when the road is clear.'],
      ['Fuori dai centri abitati, su strade a più corsie per senso, si deve percorrere la corsia libera più a destra.', 'On rural multi-lane roads use the rightmost free lane.', true, 'Le altre corsie servono al sorpasso.', 'Others are for overtaking.'],
      ['Nei centri abitati con più corsie per senso è consentita la marcia per file parallele.', 'In towns with several lanes per direction parallel queues are allowed.', true, 'Con traffico intenso.', 'With heavy traffic.'],
      ['Il cambio di corsia va segnalato con l\'indicatore di direzione.', 'Lane changes must be signalled with the indicator.', true, 'Dopo aver controllato gli specchietti.', 'After checking mirrors.'],
      ['Per svoltare a sinistra su una strada a doppio senso ci si avvicina all\'asse della carreggiata.', 'To turn left on a two-way road move towards the centre line.', true, 'Su senso unico ci si avvicina al margine sinistro.', 'On a one-way street, to the left edge.'],
      ['Per svoltare a destra conviene allargarsi verso il centro della carreggiata.', 'To turn right you should swing out towards the centre.', false, 'Bisogna tenersi vicino al margine destro.', 'Keep close to the right edge.'],
      ['L\'inversione di marcia è vietata in prossimità delle curve.', 'U-turns are forbidden near bends.', true, 'Anche presso incroci e dossi.', 'Also near junctions and crests.'],
      ['In autostrada l\'inversione di marcia è consentita nelle aree di servizio.', 'On motorways U-turns are allowed in service areas.', false, 'È sempre vietata in autostrada.', 'Always forbidden on motorways.'],
      ['Fuori dai centri abitati i ciclisti devono procedere in fila singola.', 'Outside towns cyclists must ride in single file.', true, 'Salvo un minore di 10 anni accompagnato.', 'Except a child under 10 riding on the right of an adult.'],
      ['Nel sorpasso di una bicicletta bisogna mantenere, ove possibile, una distanza laterale di almeno 1,5 m.', 'When overtaking a bicycle keep at least 1.5 m where possible.', true, 'Introdotto dalla riforma del 2024.', 'Introduced by the 2024 reform.'],
      ['Fuori dai centri abitati, in mancanza di marciapiede, i pedoni camminano nel senso di marcia dei veicoli.', 'Outside towns without a pavement pedestrians walk with the traffic.', false, 'Camminano in senso opposto, per vedere i veicoli che arrivano.', 'They walk facing oncoming traffic.'],
      ['Sulle strade di montagna strette chi scende deve dare precedenza a chi sale.', 'On narrow mountain roads the downhill driver gives way.', true, 'Chi sale ha più difficoltà a ripartire.', 'Uphill vehicles find it harder to restart.', 'salita-ripida'],
      ['È vietato circolare sulle corsie riservate agli autobus.', 'Driving in bus lanes is forbidden.', true, 'Salvo veicoli autorizzati.', 'Unless authorised.'],
      ['Prima di cambiare corsia bisogna controllare anche l\'angolo cieco.', 'Before changing lane you must also check the blind spot.', true, 'Gli specchietti non mostrano tutto.', 'Mirrors do not show everything.']
    ]
  },

  {
    id: 'it-14', n: 14, icon: '✖️', incroci: true,
    t: ['Esempi di precedenza (ordine di precedenza agli incroci)', 'Right of way examples (junction order)'],
    lessons: [
      { h: ['Il metodo per risolvere ogni incrocio', 'How to solve any junction'], b: [
`**Art. 145 CdS:** in assenza di segnali, si dà la precedenza a **chi proviene da destra**.

**Passo 1 – Guarda i segnali.** Chi ha **STOP** o **dare precedenza** passa dopo chi è sulla strada principale. Un **semaforo** o un **agente** prevalgono sui segnali.
**Passo 2 – Tra veicoli con la stessa condizione**, ciascuno deve dare precedenza a chi viene dalla **propria destra**, se le traiettorie si intersecano.
**Passo 3 – Chi svolta a sinistra** dà precedenza a chi proviene **di fronte** e va diritto o a destra.
**Passo 4 – Veicoli speciali:** i **tram** (veicoli su rotaia) hanno la precedenza salvo diversa segnalazione; i **veicoli di soccorso** con sirena e lampeggiante blu hanno sempre la precedenza.
**Passo 5 – Ripeti** togliendo i veicoli che sono passati. Se due veicoli non hanno traiettorie che si intersecano passano **contemporaneamente**.

**Casi particolari:**
- Due veicoli di fronte che svoltano entrambi a sinistra passano contemporaneamente, **passandosi davanti**.
- Chi esce da un passo carrabile, da un'area privata o da una zona di sosta dà precedenza a tutti.
- Nelle rotatorie con "dare precedenza" all'ingresso, ha la precedenza chi è già nell'anello.

Apri la sezione **Incroci** per allenarti con scenari interattivi.`,
`**Art. 145:** without signs, give way to **vehicles from the right**.

**Step 1 – Look at the signs.** Vehicles with **STOP** or **give way** go after those on the main road. **Traffic lights** or **police** override signs.
**Step 2 – Among vehicles in the same situation**, each gives way to the one on its **right**, if their paths cross.
**Step 3 – Left-turning vehicles** give way to **oncoming** vehicles going straight or right.
**Step 4 – Special vehicles:** **trams** have priority unless signs say otherwise; **emergency vehicles** with siren and blue lights always have priority.
**Step 5 – Repeat** removing those who have gone. Vehicles whose paths do not cross go **at the same time**.

**Special cases:**
- Two opposite vehicles both turning left go together, **passing in front of each other**.
- Vehicles leaving a driveway, private area or parking give way to everyone.
- On roundabouts with give way at entry, vehicles already on it have priority.

Open the **Junctions** section to practise with interactive scenarios.`] }
    ],
    q: [
      ['In assenza di segnali si deve dare precedenza ai veicoli provenienti da destra.', 'Without signs give way to vehicles from the right.', true, 'Art. 145 CdS.', 'Art. 145.'],
      ['Chi ha il segnale di STOP passa dopo i veicoli della strada principale.', 'A driver at STOP goes after vehicles on the main road.', true, 'Deve fermarsi e dare precedenza.', 'He must stop and give way.', 'stop'],
      ['Il veicolo che svolta a sinistra deve dare precedenza ai veicoli che provengono di fronte e vanno diritto.', 'A left-turning vehicle gives way to oncoming traffic going straight.', true, 'Le traiettorie si intersecano.', 'Their paths cross.'],
      ['Due veicoli di fronte che svoltano entrambi a sinistra passano contemporaneamente.', 'Two opposite vehicles both turning left go at the same time.', true, 'Passandosi davanti.', 'Passing in front of each other.'],
      ['I veicoli di soccorso con sirena e lampeggiante blu hanno sempre la precedenza.', 'Emergency vehicles with siren and blue lights always have priority.', true, 'Bisogna agevolarne il passaggio.', 'Help them through.'],
      ['Il tram ha la precedenza solo se proviene da destra.', 'A tram has priority only if coming from the right.', false, 'Ha la precedenza salvo diversa segnalazione.', 'It has priority unless signs say otherwise.', 'tram'],
      ['Chi esce da un passo carrabile deve dare precedenza a tutti i veicoli.', 'A vehicle leaving a driveway gives way to all vehicles.', true, 'E anche ai pedoni.', 'And pedestrians.'],
      ['Le indicazioni di un agente prevalgono sui segnali di precedenza.', 'A police officer\'s signals override priority signs.', true, 'Agenti > semafori > segnali.', 'Officers > lights > signs.'],
      ['Avere la precedenza consente di non moderare la velocità all\'incrocio.', 'Having priority means you need not slow down at junctions.', false, 'La prudenza è sempre dovuta.', 'Care is always required.'],
      ['Nella rotatoria con dare precedenza all\'ingresso ha la precedenza chi circola nell\'anello.', 'On a roundabout with give way at entry, circulating traffic has priority.', true, 'Chi entra dà precedenza.', 'Entering traffic gives way.', 'rotatoria'],
      ['Se due veicoli hanno traiettorie che non si intersecano, possono passare contemporaneamente.', 'Vehicles whose paths do not cross may go simultaneously.', true, 'Non si ostacolano.', 'They do not interfere.'],
      ['Chi proviene da sinistra ha la precedenza su chi proviene da destra, se va diritto.', 'Traffic from the left has priority over traffic from the right if going straight.', false, 'Vale la precedenza a destra.', 'Priority to the right applies.']
    ]
  },

  {
    id: 'it-15', n: 15, icon: '⏩',
    t: ['Norme sul sorpasso', 'Overtaking rules'],
    lessons: [
      { h: ['Come si sorpassa', 'How to overtake'], b: [
`Il sorpasso si effettua **a sinistra**. Prima di iniziare bisogna accertarsi che:
- la **visibilità** sia sufficiente e la corsia sia libera per uno spazio adeguato;
- nessun veicolo che segue abbia **già iniziato** un sorpasso;
- il veicolo davanti **non abbia segnalato** di voler sorpassare o svoltare a sinistra;
- la velocità consentita permetta di completare la manovra in poco tempo.

**Fasi:** specchietti e angolo cieco → indicatore sinistro → spostamento con adeguata **distanza laterale** → superamento → indicatore destro → rientro senza tagliare la strada al veicolo sorpassato.
**Chi viene sorpassato** deve tenersi a destra e **non accelerare**.

**Sorpasso a destra:** consentito quando il veicolo davanti ha segnalato di svoltare a sinistra e si è spostato al centro, e per sorpassare un **tram** che viaggia al centro della carreggiata (se c'è spazio sufficiente).`,
`Overtake **on the left**. Before starting make sure:
- **visibility** is sufficient and the lane is clear for long enough;
- no vehicle behind has **already started** overtaking;
- the vehicle ahead has **not signalled** to overtake or turn left;
- the speed limit allows you to complete the manoeuvre quickly.

**Steps:** mirrors and blind spot → left indicator → move out with enough **lateral clearance** → pass → right indicator → move back without cutting in.
**The vehicle being overtaken** keeps right and **must not speed up**.

**Overtaking on the right:** allowed when the vehicle ahead has signalled left and moved to the centre, and to pass a **tram** running in the middle of the road (if there is room).`] },
      { h: ['Quando è vietato', 'When it is forbidden'], b: [
`Il sorpasso è vietato:
- in prossimità o in corrispondenza di **curve e dossi** con scarsa visibilità;
- in prossimità o in corrispondenza delle **intersezioni** (salvo che si percorra una strada con diritto di precedenza, o in caso di semaforo o agente, o se il veicolo sorpassato svolta a sinistra);
- in prossimità dei **passaggi a livello senza barriere**;
- quando un veicolo si è fermato per far attraversare un **pedone** sulle strisce;
- con la **striscia continua** o con il segnale di **divieto di sorpasso**;
- in caso di **nebbia** o scarsa visibilità;
- quando il veicolo davanti sta sorpassando un altro veicolo, se la strada non consente un ulteriore sorpasso in sicurezza.`,
`Overtaking is forbidden:
- at or near **bends and crests** with poor visibility;
- at or near **junctions** (unless on a priority road, with lights or police, or the vehicle ahead turns left);
- near **level crossings without barriers**;
- when a vehicle has stopped for a **pedestrian** at a crossing;
- with a **continuous line** or a **no-overtaking** sign;
- in **fog** or poor visibility;
- when the vehicle ahead is overtaking, unless the road allows a further safe overtake.`] }
    ],
    q: [
      ['Il sorpasso si effettua di norma a sinistra.', 'Overtaking is normally done on the left.', true, 'In Italia si circola a destra.', 'Italy drives on the right.'],
      ['Prima di sorpassare bisogna verificare che nessun veicolo che segue abbia già iniziato il sorpasso.', 'Before overtaking check no vehicle behind has already started to overtake.', true, 'Guardando negli specchietti.', 'Using mirrors.'],
      ['Il conducente che viene sorpassato deve accelerare per accorciare la manovra.', 'A driver being overtaken should speed up to shorten the manoeuvre.', false, 'Non deve accelerare e deve tenersi a destra.', 'He must not speed up and must keep right.'],
      ['È consentito sorpassare a destra un veicolo che ha segnalato di svoltare a sinistra e si è spostato al centro.', 'You may overtake on the right a vehicle that signalled left and moved to the centre.', true, 'È uno dei casi ammessi.', 'One of the allowed cases.'],
      ['È vietato sorpassare in prossimità di un dosso con scarsa visibilità.', 'Overtaking is forbidden near a blind crest.', true, 'Non si vede chi arriva.', 'You cannot see oncoming traffic.', 'dosso'],
      ['È consentito sorpassare un veicolo fermo davanti alle strisce pedonali per far attraversare un pedone.', 'You may overtake a vehicle stopped at a crossing for a pedestrian.', false, 'È vietato: il pedone potrebbe essere nascosto.', 'Forbidden: the pedestrian may be hidden.', 'strisce-pedonali'],
      ['In prossimità di un passaggio a livello senza barriere è vietato sorpassare.', 'Overtaking is forbidden near a level crossing without barriers.', true, 'Divieto specifico.', 'Specific ban.', 'pl-senza-barriere'],
      ['Si può sorpassare oltrepassando la striscia continua se la strada è libera.', 'You may cross a continuous line to overtake if the road is clear.', false, 'La striscia continua non si oltrepassa mai.', 'Never cross a continuous line.', 'striscia-continua'],
      ['Con la nebbia il sorpasso è vietato.', 'Overtaking is forbidden in fog.', true, 'Manca la visibilità.', 'Visibility is lacking.'],
      ['Durante il sorpasso bisogna mantenere un\'adeguata distanza laterale dal veicolo sorpassato.', 'Keep adequate lateral clearance while overtaking.', true, 'Almeno 1,5 m per le biciclette, ove possibile.', 'At least 1.5 m for bicycles where possible.'],
      ['Terminato il sorpasso si rientra a destra segnalandolo con l\'indicatore.', 'After overtaking return to the right signalling with the indicator.', true, 'Senza tagliare la strada.', 'Without cutting in.'],
      ['È consentito sorpassare a destra un tram che marcia al centro della carreggiata.', 'You may overtake on the right a tram running in the middle of the road.', true, 'Se c\'è spazio sufficiente.', 'If there is room.', 'tram'],
      ['In un incrocio regolato da semaforo il sorpasso è sempre vietato.', 'Overtaking at a junction controlled by lights is always forbidden.', false, 'Con semaforo o agente è consentito.', 'With lights or police it is allowed.'],
      ['Il sorpasso è vietato in prossimità delle curve con visibilità insufficiente.', 'Overtaking is forbidden near bends with insufficient visibility.', true, 'Divieto generale.', 'General ban.', 'curva-sx']
    ]
  },

  {
    id: 'it-16', n: 16, icon: '🅿️',
    t: ['Fermata, sosta, arresto e partenza', 'Stopping, parking, halting and moving off'],
    lessons: [
      { h: ['Le definizioni da sapere', 'Definitions'], b: [
`- **Arresto**: interruzione della marcia dovuta alle **esigenze della circolazione** (semaforo, coda, precedenza).
- **Fermata**: sospensione **temporanea** della marcia, anche in zona di divieto di sosta, per far salire o scendere persone o per brevi operazioni; il conducente resta **presente e pronto a ripartire**.
- **Sosta**: sospensione **prolungata** della marcia, con possibilità che il conducente si allontani.

**Come sostare:** sul margine destro, parallelamente alla carreggiata (nei sensi unici urbani anche a sinistra), senza intralcio; fuori dai centri abitati **fuori dalla carreggiata**. Spegnere il motore, inserire il freno di stazionamento e la marcia (in salita la prima, in discesa la retromarcia), sterzare le ruote verso il marciapiede in pendenza.
**Disco orario:** nelle zone a sosta limitata indica l'ora di arrivo.`,
`- **Halting**: interruption due to **traffic** (lights, queue, right of way).
- **Stopping**: **temporary** suspension, even where parking is banned, to let people on/off or for short operations; the driver stays **present and ready to move**.
- **Parking**: **prolonged** suspension, the driver may leave.

**How to park:** on the right edge, parallel to the road (also on the left in urban one-way streets), without obstructing; outside towns **off the carriageway**. Switch off the engine, apply the handbrake and a gear (first uphill, reverse downhill), turn wheels toward the kerb on slopes.
**Parking disc:** in time-limited areas it shows your arrival time.`] },
      { h: ['Divieti e veicolo in avaria', 'Bans and breakdowns'], b: [
`**Fermata e sosta vietate** (tra l'altro): sui passaggi e attraversamenti pedonali, sui marciapiedi, in corrispondenza o in prossimità delle **intersezioni**, delle **curve** e dei **dossi**, sui **passaggi a livello**, in **galleria**, sulle corsie riservate, nelle aree di fermata dei mezzi pubblici.
**Sosta vietata** (tra l'altro): allo sbocco dei **passi carrabili**, in **seconda fila**, davanti ai cassonetti, negli spazi riservati ai disabili senza contrassegno.

**Veicolo fermo sulla carreggiata fuori dai centri abitati** (avaria, incidente) di notte o con scarsa visibilità:
- accendere le **luci di emergenza**;
- indossare il **giubbotto retroriflettente** prima di scendere;
- posizionare il **triangolo** ad almeno **50 m** dal veicolo, visibile da almeno **100 m**.

**Partenza:** segnalare con l'indicatore e dare precedenza ai veicoli in transito.`,
`**Stopping and parking forbidden** (among others): on pedestrian crossings, pavements, at or near **junctions**, **bends** and **crests**, on **level crossings**, in **tunnels**, in reserved lanes, at public transport stops.
**Parking forbidden** (among others): in front of **driveways**, **double parking**, in front of bins, in disabled bays without a permit.

**Vehicle stopped on the road outside towns** (breakdown, accident) at night or poor visibility:
- switch on **hazard lights**;
- put on the **reflective vest** before getting out;
- place the **warning triangle** at least **50 m** behind, visible from **100 m**.

**Moving off:** signal and give way to passing traffic.`] }
    ],
    q: [
      ['La fermata è una sospensione temporanea della marcia per far salire o scendere persone.', 'Stopping is a temporary suspension to let people on or off.', true, 'Il conducente resta presente.', 'The driver remains present.'],
      ['L\'arresto è l\'interruzione della marcia dovuta alle esigenze della circolazione.', 'Halting is an interruption due to traffic needs.', true, 'Ad esempio al semaforo.', 'E.g. at a traffic light.'],
      ['Durante la sosta il conducente può allontanarsi dal veicolo.', 'When parked the driver may leave the vehicle.', true, 'È la differenza con la fermata.', 'That is the difference from stopping.'],
      ['Dove c\'è il divieto di sosta è consentita la fermata.', 'Stopping is allowed where parking is banned.', true, 'Salvo divieto di fermata.', 'Unless stopping is banned too.', 'divieto-sosta'],
      ['È consentito sostare in seconda fila per pochi minuti.', 'Double parking is allowed for a few minutes.', false, 'La sosta in seconda fila è vietata.', 'Double parking is forbidden.'],
      ['Fermata e sosta sono vietate in corrispondenza delle intersezioni.', 'Stopping and parking are forbidden at junctions.', true, 'Si riduce la visibilità.', 'Visibility would be reduced.'],
      ['La sosta è vietata allo sbocco dei passi carrabili.', 'Parking is forbidden in front of driveways.', true, 'Si impedirebbe l\'uscita.', 'It would block the exit.'],
      ['In galleria è consentita la sosta se si accendono le luci di emergenza.', 'Parking in a tunnel is allowed with hazard lights on.', false, 'Fermata e sosta sono vietate in galleria.', 'Stopping and parking are forbidden in tunnels.'],
      ['Il triangolo va posto ad almeno 50 metri dal veicolo fermo fuori dai centri abitati.', 'The triangle goes at least 50 m behind the vehicle outside towns.', true, 'Visibile da almeno 100 m.', 'Visible from at least 100 m.'],
      ['Fuori dai centri abitati, di notte, chi scende dal veicolo fermo sulla carreggiata deve indossare il giubbotto retroriflettente.', 'Outside towns at night anyone leaving a vehicle stopped on the road must wear the reflective vest.', true, 'Anche sulla banchina.', 'Also on the verge.'],
      ['Nella sosta in discesa conviene inserire la retromarcia.', 'When parking downhill it is wise to engage reverse.', true, 'In salita la prima.', 'First gear uphill.'],
      ['Il disco orario indica l\'ora di partenza prevista.', 'The parking disc shows the planned departure time.', false, 'Indica l\'ora di arrivo.', 'It shows the arrival time.'],
      ['Nelle strade urbane a senso unico è consentita la sosta anche sul lato sinistro.', 'In urban one-way streets parking on the left is allowed.', true, 'Se non vietato.', 'Unless banned.', 'senso-unico'],
      ['Prima di ripartire dal margine della strada bisogna segnalare con l\'indicatore di direzione.', 'Before moving off from the kerb you must signal.', true, 'E dare precedenza.', 'And give way.'],
      ['Fuori dai centri abitati si deve sostare fuori dalla carreggiata.', 'Outside towns you must park off the carriageway.', true, 'Su piazzole o banchine idonee.', 'In lay-bys or suitable verges.']
    ]
  },

  {
    id: 'it-17', n: 17, icon: '🛤️',
    t: ['Norme varie: autostrade, carico, traino e trasporto persone', 'Other rules: motorways, loads, towing, passengers'],
    lessons: [
      { h: ['Autostrade ed extraurbane principali', 'Motorways and main rural roads'], b: [
`**Vietati in autostrada:** pedoni, animali, velocipedi, ciclomotori, motocicli di cilindrata inferiore a 150 cc (e motocarrozzette sotto 250 cc), veicoli non in grado di superare i 40 km/h, veicoli con carichi irregolari.

- **Ingresso:** si usa la **corsia di accelerazione** per raggiungere una velocità adeguata, dando precedenza a chi è in carreggiata.
- **Uscita:** ci si porta per tempo a destra e si usa la **corsia di decelerazione**.
- **Vietati:** retromarcia, inversione di marcia, attraversamento dello spartitraffico, sosta fuori dalle aree apposite, traino di veicoli in avaria da parte di veicoli non autorizzati.
- **Corsia di emergenza:** solo per soste di emergenza; in caso di avaria fermarsi lì, uscire dal lato destro con il giubbotto e mettersi dietro il guard-rail.
- Se si **sbaglia uscita** si prosegue fino a quella successiva.
- **Pause** di riposo ogni 2 ore circa nelle aree di servizio.`,
`**Banned on motorways:** pedestrians, animals, bicycles, mopeds, motorcycles under 150 cc, vehicles unable to exceed 40 km/h, irregular loads.

- **Joining:** use the **acceleration lane** to reach a suitable speed and give way to traffic on the carriageway.
- **Leaving:** move right in good time and use the **deceleration lane**.
- **Forbidden:** reversing, U-turns, crossing the central reservation, stopping outside designated areas, towing broken-down vehicles by unauthorised vehicles.
- **Emergency lane:** only for emergencies; on breakdown stop there, get out on the right wearing the vest and stand behind the barrier.
- If you **miss your exit**, continue to the next one.
- Take **breaks** about every 2 hours.`] },
      { h: ['Carico, traino e trasporto di persone e animali', 'Loads, towing, passengers and animals'], b: [
`- Il **carico** deve essere sistemato in modo da non disperdersi, non ridurre la visibilità e non compromettere la stabilità. Può sporgere posteriormente fino a **3/10** della lunghezza del veicolo; la sporgenza va segnalata con il **pannello quadrato a strisce bianche e rosse** retroriflettenti.
- **Traino di veicolo in avaria:** con fune, catena o barra rigida, segnalato; distanza tra i veicoli non superiore a 5 m; il veicolo trainato deve essere guidato da un conducente con patente.
- **Persone:** non si possono trasportare più persone di quelle indicate sulla carta di circolazione.
- **Animali:** un animale domestico si può trasportare purché non sia di impedimento alla guida; più animali in gabbie o nel vano posteriore separato da rete.`,
`- **Loads** must be secured so they do not fall, block visibility or affect stability. They may overhang at the rear up to **3/10** of the vehicle length, marked with the reflective **red-and-white striped square panel**.
- **Towing a broken-down vehicle:** with rope, chain or rigid bar, signalled; max 5 m between vehicles; the towed vehicle must be steered by a licensed driver.
- **Passengers:** never more than shown on the registration document.
- **Animals:** one pet may travel if it does not hinder driving; several in cages or behind a dog guard.`] }
    ],
    q: [
      ['In autostrada è vietata la circolazione dei ciclomotori.', 'Mopeds are banned on motorways.', true, 'Anche dei motocicli sotto 150 cc.', 'Also motorcycles under 150 cc.', 'autostrada'],
      ['In autostrada si può fare retromarcia sulla corsia di emergenza se si è sbagliata l\'uscita.', 'On a motorway you may reverse on the hard shoulder if you missed your exit.', false, 'La retromarcia è vietata: si prosegue fino all\'uscita successiva.', 'Reversing is forbidden: go on to the next exit.'],
      ['Per immettersi in autostrada si usa la corsia di accelerazione.', 'You join a motorway using the acceleration lane.', true, 'Dando precedenza a chi è in carreggiata.', 'Giving way to traffic on the carriageway.'],
      ['La corsia di emergenza può essere usata per superare una coda.', 'The emergency lane may be used to pass a queue.', false, 'Solo per emergenze e soccorsi.', 'Emergencies and rescue only.'],
      ['In caso di avaria in autostrada bisogna scendere dal lato destro indossando il giubbotto retroriflettente.', 'On a motorway breakdown get out on the right wearing the reflective vest.', true, 'E mettersi al riparo oltre il guard-rail.', 'And stand behind the barrier.'],
      ['Il carico può sporgere posteriormente fino a 3/10 della lunghezza del veicolo.', 'Loads may overhang at the rear up to 3/10 of vehicle length.', true, 'Va segnalato con il pannello a strisce bianche e rosse.', 'Marked with the red-and-white panel.'],
      ['La sporgenza del carico si segnala con un pannello a strisce bianche e rosse.', 'Overhanging loads are marked with a red-and-white striped panel.', true, 'Pannello quadrato retroriflettente.', 'Square reflective panel.'],
      ['Il veicolo in avaria trainato con fune deve essere guidato da un conducente con patente.', 'A vehicle towed by rope must be steered by a licensed driver.', true, 'Per poterlo frenare e sterzare.', 'To brake and steer it.'],
      ['Si possono trasportare più persone di quelle indicate sulla carta di circolazione se sono bambini.', 'You may carry more people than allowed if they are children.', false, 'Il numero dei posti non può essere superato.', 'The number of seats may not be exceeded.'],
      ['In autostrada è vietata l\'inversione di marcia.', 'U-turns are forbidden on motorways.', true, 'Sempre.', 'Always.'],
      ['Sulle strade extraurbane principali è vietata la circolazione dei pedoni.', 'Pedestrians are banned on main rural roads.', true, 'Sono riservate ai veicoli a motore.', 'Reserved for motor vehicles.', 'strada-extraurbana-principale'],
      ['Nei lunghi viaggi in autostrada è consigliabile fare una pausa ogni due ore circa.', 'On long motorway trips take a break about every two hours.', true, 'Per prevenire la stanchezza.', 'To prevent fatigue.', 'area-servizio'],
      ['Un animale domestico può essere trasportato purché non costituisca impedimento alla guida.', 'A pet may travel if it does not hinder driving.', true, 'Più animali in gabbia o vano separato.', 'Several in cages or a separate area.'],
      ['Per uscire dall\'autostrada si usa la corsia di decelerazione.', 'You leave the motorway via the deceleration lane.', true, 'Rallentando in essa, non in carreggiata.', 'Slow down in it, not on the carriageway.']
    ]
  }
];
