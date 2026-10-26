// Italia – affermazioni aggiuntive (soprattutto FALSE, sul modello dei tranelli ministeriali),
// accodate ai capitoli per bilanciare vero/falso come nelle schede d'esame.
// [it, en, vero?, spiegazione_it, spiegazione_en, segnale?]

export default {
  'it-01': [
    ['La banchina è destinata alla circolazione dei veicoli quando c\'è traffico intenso.', 'The verge may be used by vehicles when traffic is heavy.', false, 'La banchina non è destinata alla circolazione dei veicoli.', 'The verge is never for driving.'],
    ['Il marciapiede può essere usato per la sosta delle autovetture se non intralcia i pedoni.', 'Cars may park on the pavement if they do not obstruct pedestrians.', false, 'Il marciapiede è riservato ai pedoni; la sosta vi è vietata.', 'The pavement is for pedestrians; parking there is forbidden.'],
    ['Una corsia può consentire il transito di due file di autovetture affiancate.', 'A lane can hold two rows of cars side by side.', false, 'La corsia è larga per una sola fila.', 'A lane holds a single row.'],
    ['Il motociclo è un veicolo a due ruote con velocità massima non superiore a 45 km/h.', 'A motorcycle is a two-wheeler limited to 45 km/h.', false, 'Quello è il ciclomotore; il motociclo supera i 45 km/h.', 'That is a moped; motorcycles exceed 45 km/h.'],
    ['La carreggiata comprende anche i marciapiedi.', 'The carriageway includes the pavements.', false, 'I marciapiedi sono esterni alla carreggiata.', 'Pavements are outside the carriageway.']
  ],
  'it-02': [
    ['I segnali di pericolo hanno sempre il fondo giallo.', 'Warning signs always have a yellow background.', false, 'Fondo bianco; giallo solo se temporanei.', 'White; yellow only when temporary.', 'curva-dx'],
    ['Il segnale raffigurato preannuncia una curva pericolosa a sinistra.', 'The sign shown warns of a dangerous bend to the left.', false, 'La curva è a destra.', 'The bend is to the right.', 'curva-dx'],
    ['Il segnale raffigurato indica un passaggio a livello con barriere.', 'The sign shown indicates a level crossing with barriers.', false, 'La locomotiva indica un passaggio a livello senza barriere.', 'The locomotive means without barriers.', 'pl-senza-barriere'],
    ['Il segnale raffigurato obbliga a fermarsi sempre.', 'The sign shown always requires stopping.', false, 'Preannuncia un attraversamento: si rallenta e ci si ferma solo se un pedone attraversa.', 'It warns of a crossing: stop only for pedestrians.', 'attraversamento-pedonale'],
    ['Il segnale raffigurato indica una strada che si restringe solo sul lato sinistro.', 'The sign shown indicates the road narrows only on the left.', false, 'È una strettoia simmetrica, su entrambi i lati.', 'It narrows on both sides.', 'strettoia-simm'],
    ['In presenza del segnale raffigurato si può sostare sulla carreggiata.', 'With this sign you may park on the carriageway.', false, 'Sul dosso sosta e fermata sono vietate.', 'Parking on a crest is forbidden.', 'dosso'],
    ['Il segnale raffigurato vieta il transito agli animali.', 'The sign shown bans animals.', false, 'Avverte della possibile presenza di animali selvatici.', 'It warns that wild animals may cross.', 'animali-selvatici'],
    ['Il segnale raffigurato indica una salita ripida.', 'The sign shown indicates a steep climb.', false, 'Indica una discesa pericolosa.', 'It indicates a steep descent.', 'discesa-pericolosa']
  ],
  'it-03': [
    ['Il segnale raffigurato vieta il transito solo agli autocarri.', 'The sign shown bans only lorries.', false, 'Vieta il transito a tutti i veicoli in entrambi i sensi.', 'It bans all vehicles both ways.', 'divieto-transito'],
    ['Il segnale raffigurato consente di sorpassare un\'autovettura se la strada è libera.', 'With this sign you may overtake a car if the road is clear.', false, 'Il divieto di sorpasso vale anche con strada libera.', 'The ban applies even on an empty road.', 'divieto-sorpasso'],
    ['Il segnale raffigurato vieta la fermata.', 'The sign shown bans stopping.', false, 'Vieta la sosta; la fermata è consentita.', 'It bans parking; stopping is allowed.', 'divieto-sosta'],
    ['Il segnale raffigurato indica la velocità minima da mantenere.', 'The sign shown indicates a minimum speed.', false, 'Bordo rosso: è un limite massimo.', 'Red ring: it is a maximum.', 'limite-velocita'],
    ['Il segnale raffigurato consente il transito ai veicoli alti 4 metri.', 'The sign shown allows 4 m tall vehicles.', false, 'Vieta i veicoli più alti di 3,5 m.', 'It bans vehicles over 3.5 m.', 'altezza-limitata'],
    ['Il segnale raffigurato vieta l\'inversione di marcia ma consente la svolta a sinistra.', 'The sign shown bans U-turns but allows left turns.', false, 'Vieta la svolta a sinistra.', 'It bans left turns.', 'divieto-svolta-sx'],
    ['Il segnale raffigurato vieta la sosta solo nei giorni festivi.', 'The sign shown bans stopping only on holidays.', false, 'Senza pannelli vale sempre.', 'Without plates it always applies.', 'divieto-fermata']
  ],
  'it-04': [
    ['Il segnale raffigurato consente di svoltare a destra.', 'The sign shown allows turning right.', false, 'Obbliga a proseguire diritto.', 'It requires going straight.', 'direzione-diritto'],
    ['Il segnale raffigurato indica una zona dove si possono parcheggiare biciclette.', 'The sign shown indicates bicycle parking.', false, 'È una pista ciclabile.', 'It is a cycle path.', 'pista-ciclabile'],
    ['Il segnale raffigurato obbliga a girare intorno all\'isola in senso orario.', 'The sign shown requires driving clockwise around the island.', false, 'In Italia si gira in senso antiorario.', 'In Italy it is anticlockwise.', 'rotatoria'],
    ['Il segnale raffigurato obbliga a passare a sinistra dell\'ostacolo.', 'The sign shown requires passing left of the obstacle.', false, 'Obbliga a passare a destra.', 'It requires passing right.', 'passaggio-dx'],
    ['I segnali di obbligo hanno il bordo rosso.', 'Mandatory signs have a red border.', false, 'Sono a fondo blu; il bordo rosso è dei divieti.', 'They are blue; red rings are prohibitions.']
  ],
  'it-05': [
    ['Il segnale raffigurato dà la precedenza a chi lo incontra.', 'The sign shown gives priority to whoever faces it.', false, 'Obbliga a dare precedenza.', 'It requires you to give way.', 'dare-precedenza'],
    ['In presenza dello STOP ci si può limitare a rallentare se non arriva nessuno.', 'At STOP you may just slow down if nobody is coming.', false, 'Bisogna fermarsi sempre.', 'You must always stop.', 'stop'],
    ['Il segnale raffigurato indica l\'inizio di una strada con diritto di precedenza.', 'The sign shown marks the start of a priority road.', false, 'Indica la fine del diritto di precedenza.', 'It marks the end of priority.', 'fine-diritto-precedenza'],
    ['In presenza del segnale raffigurato si ha la precedenza nella strettoia.', 'With the sign shown you have priority in the narrow section.', false, 'Si deve dare precedenza a chi viene di fronte.', 'You must give way to oncoming traffic.', 'dare-precedenza-senso-opposto'],
    ['Il segnale raffigurato obbliga a fermarsi e dare precedenza.', 'The sign shown requires stopping and giving way.', false, 'Indica che si percorre una strada con diritto di precedenza.', 'It shows you are on a priority road.', 'diritto-precedenza']
  ],
  'it-06': [
    ['La striscia discontinua non può mai essere oltrepassata.', 'A broken line may never be crossed.', false, 'Può essere oltrepassata se la manovra è sicura.', 'It may be crossed if safe.', 'striscia-discontinua'],
    ['Le strisce bianche prevalgono su quelle gialle nei cantieri.', 'White lines override yellow ones at roadworks.', false, 'Prevalgono le gialle.', 'Yellow ones prevail.', 'striscia-gialla'],
    ['Le zebrature possono essere usate per la sosta di breve durata.', 'Hatched areas may be used for short stops.', false, 'Non si possono percorrere né usare per la sosta.', 'They may not be driven or parked on.', 'zebratura'],
    ['Con la striscia mista può oltrepassarla chi ha la parte continua dal proprio lato.', 'With a mixed line drivers with the continuous part on their side may cross.', false, 'Solo chi ha la discontinua dal proprio lato.', 'Only those with the broken part on their side.', 'striscia-mista'],
    ['Le strisce blu indicano posti di sosta riservati ai residenti disabili.', 'Blue lines mark bays reserved for disabled residents.', false, 'Indicano sosta a pagamento; i posti per disabili sono gialli.', 'They mark paid parking; disabled bays are yellow.', 'sosta-pagamento']
  ],
  'it-07': [
    ['Con la luce gialla lampeggiante bisogna fermarsi sempre.', 'Flashing amber always requires stopping.', false, 'Si procede con prudenza rispettando le precedenze.', 'Proceed carefully following priority rules.', 'semaforo-lampeggiante'],
    ['Le indicazioni del semaforo prevalgono su quelle dell\'agente del traffico.', 'Traffic lights override a police officer.', false, 'Prevalgono quelle dell\'agente.', 'The officer prevails.'],
    ['Con la luce rossa si può proseguire se si svolta a destra e la strada è libera.', 'At red you may turn right if the road is clear.', false, 'In Italia con il rosso ci si ferma sempre (salvo frecce verdi specifiche).', 'In Italy you always stop at red (unless a specific green arrow).', 'semaforo-rosso'],
    ['L\'agente con le braccia tese orizzontalmente dà via libera a chi lo vede di fronte.', 'An officer with arms outstretched lets through those facing him.', false, 'Chi lo vede di fronte o di spalle deve fermarsi.', 'Those facing his chest or back must stop.', 'agente-braccia-tese'],
    ['Con la luce verde si ha sempre la precedenza anche sui pedoni che stanno attraversando.', 'At green you always have priority even over pedestrians still crossing.', false, 'I pedoni che terminano l\'attraversamento vanno lasciati passare.', 'Pedestrians finishing their crossing must be let through.', 'semaforo-verde']
  ],
  'it-08': [
    ['In Italia le indicazioni autostradali hanno il fondo blu.', 'In Italy motorway signs are blue.', false, 'Sono verdi; blu per le extraurbane.', 'They are green; blue for rural roads.', 'autostrada'],
    ['Il segnale di velocità consigliata ha il bordo rosso.', 'The advisory speed sign has a red border.', false, 'È quadrato a fondo blu.', 'It is a blue square.', 'velocita-consigliata'],
    ['Il segnale raffigurato indica un ospedale dove è consentito l\'uso del clacson.', 'The sign shown indicates a hospital where the horn is allowed.', false, 'Vicino agli ospedali vanno evitati i rumori.', 'Avoid noise near hospitals.', 'ospedale'],
    ['Il segnale raffigurato indica una strada a doppio senso di circolazione.', 'The sign shown indicates a two-way street.', false, 'Indica un senso unico.', 'It indicates one-way traffic.', 'senso-unico']
  ],
  'it-09': [
    ['I segnali di cantiere a fondo giallo sono validi anche dopo la fine dei lavori.', 'Yellow roadworks signs stay valid after the works end.', false, 'Valgono solo per la durata dei lavori.', 'They apply only during the works.', 'lavori-giallo'],
    ['Il moviere può essere ignorato se il semaforo di cantiere è verde.', 'The flagman may be ignored if the works light is green.', false, 'Le indicazioni del moviere vanno rispettate.', 'The flagman must be obeyed.'],
    ['I delineatori di curva indicano la fine della curva.', 'Chevron signs mark the end of the bend.', false, 'Indicano direzione e pericolosità della curva.', 'They show direction and sharpness.', 'delineatore-curva']
  ],
  'it-10': [
    ['Il pannello di distanza indica la lunghezza del tratto pericoloso.', 'The distance plate shows the length of the dangerous stretch.', false, 'Quello è il pannello di estesa.', 'That is the length plate.', 'pannello-distanza'],
    ['Il pannello "8-20" sotto un divieto di sosta indica che il divieto vale dalle 20 alle 8.', 'An "8-20" plate means the ban applies 20:00–08:00.', false, 'Vale dalle 8 alle 20.', 'It applies 08:00–20:00.', 'pannello-orario'],
    ['Il pannello "zona rimozione" consente la sosta a pagamento.', 'The "tow-away" plate allows paid parking.', false, 'Indica che i veicoli in sosta vietata vengono rimossi.', 'It means illegally parked cars are removed.', 'pannello-rimozione']
  ],
  'it-11': [
    ['Sulle strade extraurbane principali il limite per le autovetture è 130 km/h.', 'On main rural roads the car limit is 130 km/h.', false, 'È 110 km/h; 130 vale in autostrada.', 'It is 110 km/h; 130 is for motorways.'],
    ['Il neopatentato può viaggiare a 130 km/h in autostrada dopo il primo anno.', 'A new driver may do 130 km/h on motorways after the first year.', false, 'Il limite di 100 km/h vale per i primi 3 anni.', 'The 100 km/h limit lasts 3 years.'],
    ['Con la pioggia il limite in autostrada scende a 90 km/h.', 'In rain the motorway limit drops to 90 km/h.', false, 'Scende a 110 km/h.', 'It drops to 110 km/h.'],
    ['Nei centri abitati il limite generale è di 70 km/h.', 'In built-up areas the general limit is 70 km/h.', false, 'È 50 km/h (70 solo dove indicato).', 'It is 50 km/h (70 only where signed).'],
    ['In curva conviene frenare con forza per stabilizzare il veicolo.', 'In a bend you should brake hard to stabilise the car.', false, 'Si rallenta prima della curva.', 'Slow down before the bend.']
  ],
  'it-12': [
    ['Lo spazio di reazione dipende soltanto dallo stato dei freni.', 'Reaction distance depends only on the brakes.', false, 'Dipende da velocità e prontezza del conducente.', 'It depends on speed and driver alertness.'],
    ['La distanza di sicurezza può essere ridotta di notte perché c\'è meno traffico.', 'The safe gap can be reduced at night as there is less traffic.', false, 'Di notte la visibilità è minore: va mantenuta o aumentata.', 'Visibility is lower at night: keep or increase it.'],
    ['Con l\'ABS non serve mantenere la distanza di sicurezza.', 'With ABS you need not keep a safe distance.', false, 'L\'ABS non annulla lo spazio di frenatura.', 'ABS does not remove braking distance.'],
    ['A 50 km/h in un secondo si percorrono circa 50 metri.', 'At 50 km/h you travel about 50 m per second.', false, 'Circa 14 metri.', 'About 14 m.']
  ],
  'it-13': [
    ['Fuori dai centri abitati si può circolare sempre sulla corsia di sinistra.', 'Outside towns you may always drive in the left lane.', false, 'Si percorre la corsia libera più a destra.', 'Use the rightmost free lane.'],
    ['Per svoltare a sinistra su strada a senso unico ci si sposta al margine destro.', 'To turn left on a one-way street move to the right edge.', false, 'Ci si porta al margine sinistro.', 'Move to the left edge.'],
    ['I ciclisti possono procedere affiancati in tre fuori dai centri abitati.', 'Cyclists may ride three abreast outside towns.', false, 'Fuori dai centri abitati vanno in fila singola.', 'Outside towns they ride single file.'],
    ['Si può fare inversione di marcia su un dosso se la strada è libera.', 'You may U-turn on a crest if the road is clear.', false, 'È vietato per la scarsa visibilità.', 'Forbidden due to poor visibility.']
  ],
  'it-14': [
    ['Chi proviene da destra ha sempre la precedenza, anche se ha il segnale di STOP.', 'Traffic from the right always has priority, even with a STOP sign.', false, 'Lo STOP prevale sulla regola della destra.', 'STOP overrides the right rule.', 'stop'],
    ['Il veicolo che svolta a sinistra ha la precedenza su quello che arriva di fronte e va diritto.', 'A left turner has priority over oncoming traffic going straight.', false, 'Deve dargli la precedenza.', 'It must give way.'],
    ['Chi esce da un\'area privata ha la precedenza su chi circola sulla strada.', 'A vehicle leaving private ground has priority over road traffic.', false, 'Deve dare precedenza a tutti.', 'It must give way to all.'],
    ['In una rotatoria con dare precedenza all\'ingresso, ha la precedenza chi sta entrando.', 'On a roundabout with give way at entry, entering traffic has priority.', false, 'Ha precedenza chi è già nell\'anello.', 'Traffic already on it has priority.', 'rotatoria']
  ],
  'it-15': [
    ['Si può sorpassare a destra un veicolo che procede lentamente sulla corsia di sinistra in autostrada.', 'You may overtake on the right a slow vehicle in the left lane of a motorway.', false, 'Il sorpasso a destra è consentito solo nei casi previsti.', 'Overtaking on the right is allowed only in specific cases.'],
    ['Durante il sorpasso si può superare il limite di velocità per concludere prima la manovra.', 'While overtaking you may exceed the speed limit to finish sooner.', false, 'I limiti valgono anche durante il sorpasso.', 'Limits apply during overtaking too.'],
    ['Si può iniziare un sorpasso anche se il veicolo che segue ha già iniziato a sorpassarci.', 'You may start overtaking even if the vehicle behind is already overtaking you.', false, 'È vietato.', 'It is forbidden.'],
    ['In curva il sorpasso è sempre consentito se la strada è a doppio senso.', 'Overtaking on a bend is always allowed on a two-way road.', false, 'È vietato in caso di scarsa visibilità.', 'Forbidden with poor visibility.', 'curva-sx']
  ],
  'it-16': [
    ['La fermata consente al conducente di allontanarsi dal veicolo.', 'When stopping, the driver may leave the vehicle.', false, 'Il conducente deve restare presente: è la sosta che consente di allontanarsi.', 'The driver must stay; leaving is parking.'],
    ['Il triangolo fuori dai centri abitati va posto a 10 metri dal veicolo.', 'Outside towns the triangle goes 10 m behind the vehicle.', false, 'Ad almeno 50 metri.', 'At least 50 m.'],
    ['Nella sosta in salita conviene inserire la retromarcia.', 'Parking uphill you should engage reverse.', false, 'In salita la prima, in discesa la retromarcia.', 'First uphill, reverse downhill.'],
    ['È consentito sostare sui passaggi pedonali di notte.', 'Parking on pedestrian crossings is allowed at night.', false, 'È sempre vietato.', 'Always forbidden.', 'strisce-pedonali']
  ],
  'it-17': [
    ['In autostrada possono circolare i motocicli di 125 cc.', 'Motorcycles of 125 cc may use motorways.', false, 'Servono almeno 150 cc.', 'At least 150 cc is required.', 'autostrada'],
    ['Nella corsia di accelerazione si ha la precedenza su chi circola in autostrada.', 'In the acceleration lane you have priority over motorway traffic.', false, 'Bisogna dare precedenza a chi è in carreggiata.', 'You must give way to traffic on the carriageway.'],
    ['Il carico può sporgere anteriormente oltre il veicolo senza limiti.', 'A load may overhang at the front without limits.', false, 'La sporgenza è limitata e va segnalata.', 'Overhang is limited and must be marked.'],
    ['In autostrada è consentito fare un breve tratto in retromarcia sulla corsia di emergenza.', 'A short reverse on the hard shoulder is allowed.', false, 'La retromarcia è vietata.', 'Reversing is forbidden.']
  ],
  'it-18': [
    ['Il retronebbia può essere acceso con pioggia leggera.', 'The rear fog light may be used in light rain.', false, 'Solo con visibilità sotto i 50 m.', 'Only below 50 m visibility.'],
    ['Gli abbaglianti illuminano la strada per circa 40 metri.', 'Main beams light about 40 m of road.', false, 'Circa 100 m; 40 m sono gli anabbaglianti.', 'About 100 m; 40 m is dipped beams.'],
    ['Nei centri abitati il clacson si usa per salutare.', 'In towns the horn is used to greet people.', false, 'È vietato salvo pericolo immediato.', 'Forbidden except immediate danger.'],
    ['La spia rossa della temperatura del motore si può ignorare se il veicolo va bene.', 'The red engine temperature lamp can be ignored if the car runs fine.', false, 'Bisogna fermarsi al più presto.', 'Stop as soon as possible.'],
    ['Le luci di emergenza si usano per parcheggiare in doppia fila.', 'Hazard lights allow double parking.', false, 'La sosta in doppia fila resta vietata.', 'Double parking remains forbidden.']
  ],
  'it-19': [
    ['I passeggeri posteriori adulti non sono obbligati a usare le cinture.', 'Adult rear passengers need not wear belts.', false, 'L\'obbligo vale anche dietro.', 'Rear belts are compulsory.'],
    ['I bambini alti meno di 1,50 m possono usare le sole cinture per adulti.', 'Children under 1.50 m may use adult belts only.', false, 'Serve un sistema di ritenuta omologato.', 'An approved restraint is required.'],
    ['Il casco sul ciclomotore è obbligatorio solo per i minorenni.', 'Moped helmets are compulsory only for minors.', false, 'È obbligatorio per tutti.', 'Compulsory for all.'],
    ['Lo spessore minimo del battistrada per le autovetture è di 3 mm.', 'Minimum car tread depth is 3 mm.', false, 'È 1,6 mm.', 'It is 1.6 mm.']
  ],
  'it-20': [
    ['La patente B consente di guidare autobus con 12 posti.', 'Licence B allows driving 12-seat buses.', false, 'Massimo 8 passeggeri oltre al conducente.', 'Max 8 passengers plus driver.'],
    ['Il foglio rosa ha validità di 3 anni.', 'The learner permit is valid 3 years.', false, 'Vale 12 mesi.', 'It is valid 12 months.'],
    ['Con la patente a punti si parte da 30 punti.', 'The points licence starts at 30 points.', false, 'Si parte da 20 (30 è il massimo con i bonus).', 'It starts at 20 (30 is the bonus maximum).'],
    ['Il telefono si può usare tenendolo in mano durante la sosta al semaforo rosso.', 'You may hold the phone while waiting at a red light.', false, 'Il veicolo è in marcia (arresto per traffico): l\'uso in mano è vietato.', 'The car is still in traffic: hand-held use is forbidden.']
  ],
  'it-21': [
    ['In caso di incidente senza feriti si può ripartire senza scambiare i dati.', 'After an accident without injuries you may leave without exchanging details.', false, 'Bisogna fermarsi e fornire le proprie generalità.', 'You must stop and give your details.'],
    ['Il numero da chiamare in caso di emergenza in Italia è il 911.', 'The Italian emergency number is 911.', false, 'È il 112.', 'It is 112.'],
    ['Dopo un incidente è meglio non accendere le luci di emergenza per non spaventare gli altri.', 'After an accident avoid hazard lights so as not to scare others.', false, 'Vanno accese per segnalare il pericolo.', 'They must be switched on.']
  ],
  'it-22': [
    ['Chi ha la patente da più di 3 anni può guidare con un tasso alcolemico di 0,8 g/l.', 'Drivers with over 3 years\' experience may drive at 0.8 g/l.', false, 'Il limite è 0,5 g/l.', 'The limit is 0.5 g/l.'],
    ['L\'alcol migliora i riflessi se assunto in piccole quantità.', 'A little alcohol improves reflexes.', false, 'Li peggiora sempre.', 'It always worsens them.'],
    ['Un ferito incosciente va fatto sedere e bere acqua.', 'An unconscious casualty should be sat up and given water.', false, 'Non si dà da bere; se respira va in posizione laterale di sicurezza.', 'Nothing to drink; if breathing, recovery position.'],
    ['I farmaci non influiscono mai sulla guida.', 'Medicines never affect driving.', false, 'Alcuni riducono attenzione e riflessi.', 'Some reduce alertness and reflexes.']
  ],
  'it-23': [
    ['L\'assicurazione R.C.A. è facoltativa per i veicoli fermi su strada pubblica.', 'RCA is optional for vehicles parked on public roads.', false, 'È obbligatoria anche per il veicolo in sosta su strada pubblica.', 'It is required even when parked on a public road.'],
    ['Il Fondo di garanzia risarcisce i danni subiti dal proprio veicolo per colpa propria.', 'The guarantee fund pays for damage to your own car caused by you.', false, 'Interviene per danni da veicoli non assicurati o non identificati.', 'It covers uninsured or unidentified vehicles.'],
    ['Con il bonus-malus la classe di merito migliora dopo un incidente con colpa.', 'Under bonus-malus the class improves after an at-fault accident.', false, 'Peggiora.', 'It worsens.']
  ],
  'it-24': [
    ['Tenere il motore acceso durante le soste lunghe riduce i consumi.', 'Idling during long stops reduces consumption.', false, 'Conviene spegnerlo.', 'Better to switch it off.'],
    ['La marmitta catalitica riduce le emissioni di CO₂.', 'The catalytic converter reduces CO₂ emissions.', false, 'Riduce CO, HC e NOx, non la CO₂.', 'It reduces CO, HC and NOx, not CO₂.'],
    ['Viaggiare con i pneumatici sgonfi fa risparmiare carburante.', 'Under-inflated tyres save fuel.', false, 'Aumentano i consumi.', 'They raise consumption.']
  ],
  'it-25': [
    ['L\'ABS impedisce lo slittamento delle ruote in accelerazione.', 'ABS prevents wheelspin when accelerating.', false, 'Agisce in frenata; in accelerazione interviene il controllo di trazione.', 'It works when braking; traction control handles acceleration.'],
    ['Il sovrasterzo è la tendenza del veicolo ad allargare la traiettoria.', 'Oversteer is the tendency to run wide.', false, 'Quello è il sottosterzo; nel sovrasterzo scivola il posteriore.', 'That is understeer; in oversteer the rear slides.'],
    ['La pressione dei pneumatici si controlla dopo un lungo viaggio, a gomme calde.', 'Tyre pressure is checked after a long trip with hot tyres.', false, 'Va controllata a freddo.', 'Check it cold.'],
    ['Il liquido di raffreddamento si controlla a motore caldo aprendo subito il tappo.', 'Coolant is checked by opening the cap with a hot engine.', false, 'Va controllato a motore freddo: aprire il tappo a caldo è pericoloso.', 'Check it cold: opening when hot is dangerous.']
  ]
};
