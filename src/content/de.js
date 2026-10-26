// Deutschland – Theorieprüfung Klasse B (Grundstoff + Zusatzstoff), Fehlerpunkte 2–5.
// [frage_de, frage_en, antworten_de[], antworten_en[], richtige[], erkl_de, erkl_en, zeichen?, punkte]

export default [
  {
    id: 'de-1', n: 1, icon: '⚠️',
    t: ['Gefahrenlehre', 'Hazard awareness'],
    lessons: [
      { h: ['Gefahren erkennen und vermeiden', 'Recognising hazards'], b: [
`- **Grundregel (§ 1 StVO):** ständige Vorsicht und gegenseitige Rücksicht; niemand darf geschädigt, gefährdet oder mehr als unvermeidbar behindert werden.
- **Kinder, ältere Menschen, Radfahrer**: unberechenbar – Geschwindigkeit verringern, bremsbereit sein. An Schulbussen mit eingeschaltetem Warnblinklicht nur mit **Schrittgeschwindigkeit** vorbeifahren.
- **Abstand**: außerorts mindestens **„halber Tacho“** in Metern (bei 100 km/h = 50 m); bei Nässe mehr.
- **Sicht unter 50 m** (Nebel, Schnee, Regen): höchstens **50 km/h**; Nebelschlussleuchte nur dann.
- **Glätte**: Winterreifen (Alpine-Symbol) bei Glatteis, Schneeglätte, Schneematsch, Eis- oder Reifglätte Pflicht („situative Winterreifenpflicht“).`,
`- **Basic rule (§ 1 StVO):** constant care and mutual consideration.
- **Children, elderly, cyclists**: unpredictable – slow down, be ready to brake. Pass school buses with hazard lights on only at **walking pace**.
- **Distance**: outside towns at least **"half the speedometer"** in metres (100 km/h = 50 m); more when wet.
- **Visibility under 50 m**: max **50 km/h**; rear fog light only then.
- **Winter**: winter tyres (Alpine symbol) are required in icy or snowy conditions ("situational" rule).`] }
    ],
    q: [
      ['Wie groß sollte der Abstand bei 100 km/h außerorts mindestens sein?', 'Minimum gap at 100 km/h outside towns?', ['25 m', '50 m', '100 m'], ['25 m', '50 m', '100 m'], [1], 'Faustregel „halber Tacho“.', '"Half the speedometer".', null, 4],
      ['Wie schnell dürfen Sie bei einer Sichtweite unter 50 m höchstens fahren?', 'Max speed with visibility under 50 m?', ['50 km/h', '70 km/h', '80 km/h'], ['50 km/h', '70 km/h', '80 km/h'], [0], 'Auch auf der Autobahn.', 'Also on motorways.', null, 4],
      ['Ein Schulbus hält mit eingeschaltetem Warnblinklicht. Wie verhalten Sie sich?', 'A school bus stops with hazard lights. What do you do?', ['Nur mit Schrittgeschwindigkeit vorbeifahren', 'Mit 30 km/h vorbeifahren', 'Hupen und zügig vorbeifahren'], ['Pass only at walking pace', 'Pass at 30 km/h', 'Hoot and pass quickly'], [0], 'Kinder könnten über die Straße laufen.', 'Children may run out.', null, 5],
      ['Wann müssen Winterreifen aufgezogen sein?', 'When are winter tyres required?', ['Bei Glatteis oder Schneeglätte', 'Vom 1. Oktober bis 31. März immer', 'Bei Schneematsch'], ['On ice or snow', 'Always 1 Oct–31 Mar', 'In slush'], [0, 2], 'Situative Winterreifenpflicht.', 'Situational rule.', null, 3],
      ['Kinder spielen am Fahrbahnrand. Womit müssen Sie rechnen?', 'Children play by the road. What should you expect?', ['Sie laufen plötzlich auf die Fahrbahn', 'Sie bleiben stehen', 'Sie achten auf den Verkehr'], ['They suddenly run into the road', 'They stand still', 'They watch traffic'], [0], 'Kinder sind unberechenbar.', 'Children are unpredictable.', 'bambini', 5],
      ['Wann darf die Nebelschlussleuchte eingeschaltet werden?', 'When may the rear fog light be used?', ['Bei Sichtweite unter 50 m durch Nebel', 'Bei Regen allgemein', 'Nachts auf Landstraßen'], ['Visibility under 50 m due to fog', 'In any rain', 'At night on rural roads'], [0], 'Sonst blendet sie.', 'Otherwise it dazzles.', null, 3]
    ]
  },
  {
    id: 'de-2', n: 2, icon: '✖️', signCat: 'precedenza', incroci: true,
    t: ['Vorfahrt und Vorrang', 'Right of way'],
    lessons: [
      { h: ['Rechts vor links und Verkehrszeichen', 'Right before left and signs'], b: [
`- **Rechts vor links** an Kreuzungen ohne Regelung.
- **Vorfahrtstraße** (gelbe Raute, VZ 306) bis **Ende der Vorfahrtstraße** (VZ 307).
- **Vorfahrt gewähren** (VZ 205) und **Halt. Vorfahrt gewähren** (Stoppschild, VZ 206: immer an der Haltlinie anhalten).
- **Linksabbieger** müssen den Gegenverkehr durchlassen.
- **Kreisverkehr** (VZ 215 mit VZ 205): Wer im Kreis fährt, hat Vorfahrt; Blinken nur beim Ausfahren.
- **Grüner Pfeil**: Rechtsabbiegen bei Rot erlaubt – erst **anhalten**, dann Fußgänger und Radfahrer durchlassen.
- **Polizeibeamte** vor Ampeln vor Verkehrszeichen.`,
`- **Right before left** at unregulated junctions.
- **Priority road** (yellow diamond) until **end of priority road**.
- **Give way** and **STOP** (always stop at the line).
- **Left turners** let oncoming traffic go.
- **Roundabout** with give way: circulating traffic has priority; indicate only when exiting.
- **Green arrow**: right turn on red allowed – **stop first**, then let pedestrians and cyclists pass.
- **Police** over lights over signs.`] }
    ],
    q: [
      ['Was gilt an einer Kreuzung ohne Verkehrszeichen?', 'What applies at a junction without signs?', ['Rechts vor links', 'Links vor rechts', 'Wer zuerst kommt'], ['Right before left', 'Left before right', 'First come'], [0], 'Grundregel § 8 StVO.', 'Basic rule.', 'incrocio-destra', 5],
      ['Was bedeutet dieses Zeichen?', 'What does this sign mean?', ['Vorfahrtstraße', 'Vorfahrt gewähren', 'Ende der Vorfahrtstraße'], ['Priority road', 'Give way', 'End of priority road'], [0], 'VZ 306.', 'VZ 306.', 'diritto-precedenza', 3],
      ['Was müssen Sie an diesem Zeichen tun?', 'What must you do at this sign?', ['An der Haltlinie anhalten', 'Nur bei Querverkehr anhalten', 'Vorfahrt gewähren'], ['Stop at the line', 'Stop only if traffic comes', 'Give way'], [0, 2], 'Stoppschild: immer anhalten.', 'STOP: always stop.', 'stop', 5],
      ['Sie wollen links abbiegen. Gegenverkehr fährt geradeaus. Wer darf zuerst fahren?', 'You want to turn left; oncoming traffic goes straight. Who goes first?', ['Der Gegenverkehr', 'Ich', 'Wer zuerst da war'], ['Oncoming traffic', 'Me', 'Whoever arrived first'], [0], 'Linksabbieger warten.', 'Left turners wait.', null, 5],
      ['Wie verhalten Sie sich an einer Ampel mit grünem Pfeil bei Rot?', 'At red with a green arrow sign:', ['Anhalten, dann vorsichtig rechts abbiegen', 'Ohne Anhalten rechts abbiegen', 'Fußgänger und Radfahrer durchlassen'], ['Stop, then turn right carefully', 'Turn right without stopping', 'Let pedestrians and cyclists through'], [0, 2], 'Erst anhalten ist Pflicht.', 'Stopping first is required.', null, 4],
      ['Im Kreisverkehr mit „Vorfahrt gewähren“ an der Einfahrt hat Vorfahrt:', 'On a roundabout with give way at entry, priority goes to:', ['Wer im Kreis fährt', 'Wer einfährt', 'Wer von rechts kommt'], ['Those circulating', 'Those entering', 'Those from the right'], [0], 'Beim Einfahren nicht blinken.', 'No indicating on entry.', 'rotatoria', 4]
    ]
  },
  {
    id: 'de-3', n: 3, icon: '🛣️', signCat: 'divieto',
    t: ['Verhalten im Verkehr: Geschwindigkeit, Überholen, Autobahn', 'Speed, overtaking, motorway'],
    lessons: [
      { h: ['Höchstgeschwindigkeiten und Autobahn', 'Limits and motorways'], b: [
`- **Innerorts 50 km/h**, **außerorts 100 km/h** (Pkw), **Autobahn**: kein generelles Limit, **Richtgeschwindigkeit 130 km/h**. Pkw mit Anhänger: 80 km/h.
- **Rechtsfahrgebot**; **rechts überholen** außerorts verboten (Ausnahme: Stau, wenn links langsamer gefahren wird).
- Beim Überholen von Radfahrern: **innerorts 1,5 m**, **außerorts 2 m** Seitenabstand.
- **Rettungsgasse**: bei Stau auf Straßen mit mehreren Fahrstreifen zwischen dem **ganz linken** und dem rechts daneben liegenden Fahrstreifen bilden.
- **Reißverschlussverfahren**: am Ende eines wegfallenden Fahrstreifens abwechselnd einfädeln, und zwar **unmittelbar vor** der Verengung.`,
`- **50 km/h in towns**, **100 km/h outside** (cars), **Autobahn**: no general limit, **advisory 130 km/h**. Cars with trailer: 80.
- **Keep right**; **overtaking on the right** outside towns forbidden (except slow queues).
- Passing cyclists: **1.5 m in towns**, **2 m outside**.
- **Emergency corridor**: in jams form it between the **far-left lane** and the one to its right.
- **Zip merge**: merge alternately **right at** the lane end.`] }
    ],
    q: [
      ['Wie schnell darf ein Pkw außerorts höchstens fahren?', 'Max car speed outside towns?', ['80 km/h', '100 km/h', '120 km/h'], ['80 km/h', '100 km/h', '120 km/h'], [1], 'Auf Autobahnen gilt die Richtgeschwindigkeit.', 'Motorways: advisory speed.', null, 3],
      ['Welche Richtgeschwindigkeit gilt auf Autobahnen?', 'Advisory speed on the Autobahn?', ['120 km/h', '130 km/h', '150 km/h'], ['120 km/h', '130 km/h', '150 km/h'], [1], 'Kein generelles Tempolimit.', 'No general limit.', 'autostrada', 3],
      ['Wo bilden Sie bei Stau auf einer dreistreifigen Autobahn die Rettungsgasse?', 'Where do you form the emergency corridor on a 3-lane Autobahn?', ['Zwischen dem linken und dem mittleren Fahrstreifen', 'Zwischen dem mittleren und rechten Fahrstreifen', 'Auf dem Standstreifen'], ['Between left and middle lanes', 'Between middle and right lanes', 'On the hard shoulder'], [0], 'Immer rechts neben dem ganz linken Fahrstreifen.', 'Always right of the far-left lane.', null, 4],
      ['Welcher Seitenabstand gilt außerorts beim Überholen eines Radfahrers?', 'Lateral gap when passing a cyclist outside towns?', ['1 m', '1,5 m', '2 m'], ['1 m', '1.5 m', '2 m'], [2], 'Innerorts 1,5 m.', '1.5 m in towns.', 'ciclisti', 4],
      ['Wann wird beim Reißverschlussverfahren eingefädelt?', 'When do you merge in a zip merge?', ['Unmittelbar vor der Verengung', 'So früh wie möglich', '200 m vorher'], ['Right before the narrowing', 'As early as possible', '200 m before'], [0], 'Abwechselnd.', 'Alternately.', 'corsie-confluenza', 3],
      ['Was bedeutet dieses Zeichen?', 'What does this sign mean?', ['Überholverbot für Kraftfahrzeuge', 'Ende des Überholverbots', 'Gegenverkehr'], ['No overtaking for motor vehicles', 'End of no overtaking', 'Oncoming traffic'], [0], 'Mehrspurige Kfz dürfen nicht überholt werden.', 'Multi-track vehicles may not be passed.', 'divieto-sorpasso', 3]
    ]
  },
  {
    id: 'de-4', n: 4, icon: '🍺',
    t: ['Eignung und Befähigung: Alkohol, Drogen, Probezeit', 'Fitness: alcohol, drugs, probation'],
    lessons: [
      { h: ['Grenzwerte und Punkte', 'Limits and points'], b: [
`- **0,5 Promille**: Ordnungswidrigkeit (Bußgeld, Fahrverbot, 2 Punkte).
- Ab **0,3 Promille** mit Ausfallerscheinungen und ab **1,1 Promille** immer: **Straftat**.
- **Fahranfänger in der Probezeit** und **unter 21 Jahren**: **0,0 Promille**.
- **Probezeit**: 2 Jahre; bei schweren Verstößen Aufbauseminar und Verlängerung auf 4 Jahre.
- **Fahreignungsregister**: 1 bis 3 Punkte je Verstoß; bei **8 Punkten** wird die Fahrerlaubnis entzogen.
- **Handy**: in der Hand verboten (100 €, 1 Punkt).`,
`- **0.5‰**: administrative offence (fine, ban, 2 points).
- From **0.3‰** with impairment and from **1.1‰** always: **criminal offence**.
- **Probationary** and **under-21** drivers: **0.0‰**.
- **Probation**: 2 years; serious offences mean a course and extension to 4 years.
- **Register**: 1–3 points per offence; at **8 points** the licence is withdrawn.
- **Phone**: hand-held forbidden (€100, 1 point).`] }
    ],
    q: [
      ['Welche Promillegrenze gilt für Fahranfänger in der Probezeit?', 'Alcohol limit for probationary drivers?', ['0,0 Promille', '0,3 Promille', '0,5 Promille'], ['0.0‰', '0.3‰', '0.5‰'], [0], 'Absolutes Alkoholverbot.', 'Absolute ban.', null, 5],
      ['Ab wie viel Promille liegt immer eine Straftat vor?', 'From what level is it always a crime?', ['0,5', '0,8', '1,1'], ['0.5', '0.8', '1.1'], [2], 'Absolute Fahruntüchtigkeit.', 'Absolute unfitness.', null, 5],
      ['Bei wie vielen Punkten wird die Fahrerlaubnis entzogen?', 'At how many points is the licence withdrawn?', ['6', '8', '12'], ['6', '8', '12'], [1], 'Fahreignungsregister Flensburg.', 'Flensburg register.', null, 3],
      ['Wie lange dauert die Probezeit regulär?', 'How long is normal probation?', ['1 Jahr', '2 Jahre', '3 Jahre'], ['1 year', '2 years', '3 years'], [1], 'Verlängerung auf 4 Jahre möglich.', 'Can be extended to 4.', null, 3],
      ['Dürfen Sie während der Fahrt das Handy in der Hand halten?', 'May you hold your phone while driving?', ['Nein', 'Ja, beim Stillstand an der Ampel mit laufendem Motor', 'Ja, zum Navigieren'], ['No', 'Yes, at lights with engine running', 'Yes, for navigation'], [0], 'Nur bei ausgeschaltetem Motor erlaubt.', 'Only with the engine off.', null, 4],
      ['Ein Fahrer mit 0,4 Promille fährt Schlangenlinien. Was liegt vor?', 'A driver at 0.4‰ weaves. What is it?', ['Eine Straftat', 'Nichts, unter 0,5', 'Nur eine Verwarnung'], ['A criminal offence', 'Nothing, under 0.5', 'Only a warning'], [0], 'Ab 0,3 ‰ mit Ausfallerscheinungen.', 'From 0.3‰ with impairment.', null, 5]
    ]
  },
  {
    id: 'de-5', n: 5, icon: '🦺',
    t: ['Technik, Ausrüstung und Umwelt', 'Vehicle, equipment and environment'],
    lessons: [
      { h: ['Pflichtausrüstung und HU', 'Compulsory kit and inspection'], b: [
`- **Pflicht im Pkw**: **Warndreieck**, **Verbandkasten**, **Warnweste**.
- **Warndreieck**: innerorts etwa **50 m**, außerorts etwa **100 m**, auf Autobahnen mindestens **150 m** (besser 200–400 m) hinter dem Fahrzeug.
- **Kinder** unter 12 Jahren und kleiner als **150 cm**: geeignetes Rückhaltesystem.
- **Profiltiefe**: mindestens **1,6 mm**.
- **Hauptuntersuchung (HU)**: Neuwagen nach **3 Jahren**, danach alle **2 Jahre**.
- **Umwelt**: niedertourig fahren, Motor bei längerem Halt abstellen, unnötigen Ballast und Dachträger entfernen.`,
`- **Compulsory in cars**: **warning triangle**, **first-aid kit**, **high-visibility vest**.
- **Triangle**: about **50 m** in towns, **100 m** outside, at least **150 m** on motorways.
- **Children** under 12 and shorter than **150 cm**: suitable restraint.
- **Tread**: at least **1.6 mm**.
- **Inspection (HU)**: new cars after **3 years**, then every **2 years**.
- **Environment**: low revs, switch off at long stops, remove ballast and roof racks.`] }
    ],
    q: [
      ['Was muss in einem Pkw mitgeführt werden?', 'What must be carried in a car?', ['Warndreieck', 'Verbandkasten', 'Warnweste'], ['Warning triangle', 'First-aid kit', 'High-visibility vest'], [0, 1, 2], 'Alle drei sind Pflicht.', 'All three are compulsory.', null, 2],
      ['Wie weit stellen Sie das Warndreieck auf der Autobahn auf?', 'How far back on the Autobahn do you place the triangle?', ['Mindestens 150 m', '50 m', '20 m'], ['At least 150 m', '50 m', '20 m'], [0], 'Besser 200–400 m.', 'Better 200–400 m.', null, 3],
      ['Welche Kinder brauchen einen Kindersitz?', 'Which children need a child seat?', ['Unter 12 Jahren und kleiner als 150 cm', 'Nur unter 3 Jahren', 'Alle unter 18 Jahren'], ['Under 12 and shorter than 150 cm', 'Only under 3', 'All under 18'], [0], 'Geeignetes Rückhaltesystem.', 'Suitable restraint.', null, 4],
      ['Wann ist die erste Hauptuntersuchung bei einem neuen Pkw fällig?', 'When is a new car\'s first HU due?', ['Nach 2 Jahren', 'Nach 3 Jahren', 'Nach 4 Jahren'], ['After 2 years', 'After 3 years', 'After 4 years'], [1], 'Danach alle 2 Jahre.', 'Then every 2 years.', null, 3],
      ['Wie können Sie Kraftstoff sparen?', 'How can you save fuel?', ['Frühzeitig hochschalten', 'Dachträger abbauen', 'Im Stand warmlaufen lassen'], ['Change up early', 'Remove roof racks', 'Warm up while stationary'], [0, 1], 'Warmlaufen im Stand ist verboten und verschwenderisch.', 'Idling to warm up is banned and wasteful.', null, 3],
      ['Wie groß muss die Profiltiefe der Reifen mindestens sein?', 'Minimum tyre tread depth?', ['1 mm', '1,6 mm', '3 mm'], ['1 mm', '1.6 mm', '3 mm'], [1], 'Gesetzliches Minimum.', 'Legal minimum.', null, 3]
    ]
  },
  {
    id: 'de-6', n: 6, icon: '🪧',
    t: ['Verkehrszeichen', 'Traffic signs'],
    lessons: [
      { h: ['Zeichenarten', 'Types of signs'], b: [
`- **Gefahrzeichen** (Dreiecke, VZ 101–156): außerorts **150–250 m** vor der Gefahrstelle.
- **Vorschriftzeichen**: Vorfahrt, Gebote (blau), Verbote (rot umrandet), Halt- und Parkverbote.
- **Richtzeichen**: Hinweise, z. B. Autobahn (blau), Ortstafel (gelb).
- **Zusatzzeichen**: unter dem Hauptzeichen, schränken es ein oder ergänzen es.
- **Ortstafel (gelb)**: ab hier **50 km/h** innerorts.`,
`- **Danger signs** (triangles): outside towns **150–250 m** before the hazard.
- **Regulatory signs**: priority, mandatory (blue), prohibitory (red ring), no stopping/parking.
- **Direction signs**: e.g. Autobahn (blue), town sign (yellow).
- **Additional plates** under the main sign.
- **Yellow town sign**: from here **50 km/h**.`] }
    ],
    q: [
      ['Wie weit vor einer Gefahrstelle stehen Gefahrzeichen außerorts in der Regel?', 'How far before a hazard are warning signs outside towns?', ['50–100 m', '150–250 m', '500 m'], ['50–100 m', '150–250 m', '500 m'], [1], 'Sonst Zusatzzeichen mit Entfernung.', 'Otherwise a distance plate.', 'curva-dx', 3],
      ['Was bedeutet dieses Zeichen?', 'What does this sign mean?', ['Eingeschränktes Haltverbot', 'Absolutes Haltverbot', 'Parken erlaubt'], ['Limited no stopping (no parking)', 'Absolute no stopping', 'Parking allowed'], [0], 'Kurzes Halten bis 3 Minuten erlaubt.', 'Brief stops up to 3 minutes allowed.', 'divieto-sosta', 3],
      ['Was bedeutet dieses Zeichen?', 'What does this sign mean?', ['Verbot der Einfahrt', 'Verbot für Fahrzeuge aller Art', 'Einbahnstraße'], ['No entry', 'No vehicles', 'One-way'], [0], 'VZ 267.', 'VZ 267.', 'senso-vietato', 3],
      ['Welche Höchstgeschwindigkeit gilt ab diesem Zeichen?', 'What limit applies from this sign?', ['50 km/h', '30 km/h', '70 km/h'], ['50 km/h', '30 km/h', '70 km/h'], [0], 'Innerorts 50 km/h.', '50 km/h in towns.', 'centro-abitato', 3],
      ['Was bedeutet dieses Zeichen?', 'What does this sign mean?', ['Vorgeschriebene Fahrtrichtung geradeaus', 'Einbahnstraße', 'Vorfahrt'], ['Ahead only', 'One-way street', 'Priority'], [0], 'Blaues Gebotszeichen.', 'Blue mandatory sign.', 'direzione-diritto', 3]
    ]
  }
];
