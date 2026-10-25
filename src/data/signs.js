// Comprehensive Road Signs Academy Database: Categorized Lessons, SVG Graphics, Norms & Targeted Quizzes

export const SIGN_CATEGORIES = [
  { id: 'pericolo', icon: '⚠️', name: { it: 'Segnali di Pericolo', fr: 'Signaux de Danger', en: 'Danger Warning Signs', es: 'Señales de Peligro', de: 'Gefahrzeichen' }, desc: { it: 'Posti a 150m dal pericolo, forma triangolare con vertice in alto', fr: 'Placés à 150m hors agglo, forme triangulaire', en: 'Triangular warning signs placed 150m before hazard', es: 'Triangulares con vértice hacia arriba, a 150m', de: 'Dreiecke mit Spitze nach oben, 150m vor Gefahr' } },
  { id: 'precedenza', icon: '🛑', name: { it: 'Segnali di Precedenza', fr: 'Signaux de Priorité', en: 'Priority Signs', es: 'Señales de Prioridad', de: 'Vorfahrtzeichen' }, desc: { it: 'Regolano il diritto di transito agli incroci e confluenze', fr: 'Règlent le droit de passage aux intersections', en: 'Regulate right of way at intersections', es: 'Regulan el orden de paso en cruces', de: 'Regeln die Vorfahrt an Kreuzungen' } },
  { id: 'divieto', icon: '🚫', name: { it: 'Segnali di Divieto', fr: 'Signaux d\'Interdiction', en: 'Prohibitory Signs', es: 'Señales de Prohibición', de: 'Verbotszeichen' }, desc: { it: 'Forma circolare a bordo rosso, vietano manovre o accessi', fr: 'Forme circulaire à bord rouge, interdictions strictes', en: 'Circular with red border, strict prohibitions', es: 'Circulares con borde rojo, prohíben maniobras', de: 'Runde Schilder mit rotem Rand, Verbote' } },
  { id: 'obbligo', icon: '🔵', name: { it: 'Segnali di Obbligo', fr: 'Signaux d\'Obligation', en: 'Mandatory Signs', es: 'Señales de Obligación', de: 'Gebotszeichen' }, desc: { it: 'Forma circolare a fondo blu, impongono comportamenti', fr: 'Forme circulaire à fond bleu, actions obligatoires', en: 'Circular blue signs prescribing mandatory actions', es: 'Circulares fondo azul, prescriben una acción', de: 'Runde blaue Schilder, Pflichten' } },
  { id: 'indicazione', icon: 'ℹ️', name: { it: 'Segnali di Indicazione', fr: 'Signaux d\'Indication', en: 'Information Signs', es: 'Señales de Información', de: 'Richtzeichen' }, desc: { it: 'Forniscono informazioni su strade, autostrade e servizi', fr: 'Informations utiles, autoroutes et services', en: 'Provide navigation and motorway info', es: 'Información sobre vías, autopistas y servicios', de: 'Hinweise auf Autobahnen und Einrichtungen' } },
  { id: 'orizzontale', icon: '➖', name: { it: 'Segnaletica Orizzontale', fr: 'Marquage au Sol', en: 'Road Markings', es: 'Marcas Viales', de: 'Fahrbahnmarkierungen' }, desc: { it: 'Strisce continue, tratteggiate, zebrature e stop', fr: 'Lignes continues, discontinues et passages piétons', en: 'Continuous/broken lines, stop bars, crosswalks', es: 'Líneas continuas, discontinuas y pasos de peatones', de: 'Durchgehende und unterbrochene Linien' } },
  { id: 'luminosa-pannelli', icon: '🚥', name: { it: 'Semafori & Pannelli Integrativi', fr: 'Feux & Panneaux Additionnels', en: 'Traffic Lights & Panels', es: 'Semáforos y Paneles', de: 'Ampeln & Zusatzzeichen' }, desc: { it: 'Lanterne semaforiche, corsie reversibili e pannelli', fr: 'Feux tricolores, voies réversibles et panonceaux', en: 'Traffic lights, reversible lanes and distance panels', es: 'Semáforos, carriles reversibles y paneles', de: 'Lichtzeichen und Zusatztafeln' } }
];

export const ROAD_SIGNS = [
  // --- 1. SEGNALI DI PERICOLO ---
  {
    id: 'pericolo-curva-dx',
    category: 'pericolo',
    officialCode: 'Art. 85 / Fig. II 4',
    name: {
      it: 'Curva pericolosa a destra',
      fr: 'Virage dangereux à droite',
      en: 'Dangerous bend to the right',
      es: 'Curva peligrosa hacia la derecha',
      de: 'Gefährliche Kurve nach rechts'
    },
    svg: `<svg viewBox="0 0 100 100" class="sign-svg"><polygon points="50,8 92,85 8,85" fill="#ffffff" stroke="#dc2626" stroke-width="12" stroke-linejoin="round"/><path d="M42,75 L42,50 C42,42 48,36 56,36 L64,36" fill="none" stroke="#111827" stroke-width="8" stroke-linecap="round"/><polygon points="62,28 74,36 62,44" fill="#111827"/></svg>`,
    meaning: {
      it: 'Presegnala, di norma a 150 metri, un tratto di strada non rettilineo pericoloso per ridotta visibilità e per forza centrifuga.',
      fr: 'Signale à 150 mètres un virage serré sur la droite réducendo la visibilité.',
      en: 'Warns 150 meters in advance of a sharp right-hand bend with restricted visibility.',
      es: 'Advierte a 150 metros de una curva peligrosa hacia la derecha con visibilidad reducida.',
      de: 'Kündigt 150 Meter vorher eine gefährliche Rechtskurve an.'
    },
    allowed: {
      it: 'È consentito il sorpasso solo se la strada è a carreggiata a senso unico oppure con almeno due corsie per senso di marcia.',
      fr: 'Dépassement autorisé uniquement sur chaussée à sens unique ou à plusieurs voies dans le même sens.',
      en: 'Overtaking allowed only on one-way roads or roads with at least two lanes in your direction.',
      es: 'Permitido adelantar solo en vías de sentido único o con dos o más carriles por sentido.',
      de: 'Überholen nur auf Richtungsfahrbahnen mit mehreren Fahrstreifen zulässig.'
    },
    forbidden: {
      it: 'Vietato il sorpasso su strade a doppio senso con una sola corsia per senso di marcia; vietata la fermata, la sosta e l\'inversione.',
      fr: 'Interdit de dépasser sur route à double sens à voie unique, demi-tour et stationnement strictement interdits.',
      en: 'Overtaking prohibited on two-way single-lane roads; no stopping, parking or U-turns.',
      es: 'Prohibido adelantar con un carril por sentido, parar, estacionar o dar media vuelta.',
      de: 'Überholverbot bei Gegenverkehr und nur einem Fahrstreifen je Richtung; Halten/Parken verboten.'
    },
    traps: {
      it: 'Quiz trabocchetto: "In presenza del segnale è consentito sorpassare se la strada è a due corsie e a doppio senso" -> FALSO! Se è a doppio senso servono almeno due corsie PER IL PROPRIO SENSO DI MARCIA!',
      fr: 'Piège d\'examen : "Le dépassement est toujours interdit en virage" -> FAUX, autorisé sur voie à sens unique.',
      en: 'Exam trap: "Overtaking is forbidden in all bends without exception" -> FALSE, permitted on one-way multi-lane carriageways.',
      es: 'Pregunta trampa: "Se prohíbe adelantar en cualquier curva" -> FALSO, en curvas de varios carriles por sentido está permitido.',
      de: 'Fangfrage: "In Kurven ist Überholen ausnahmslos verboten" -> FALSCH, auf Einbahnstraßen mit mehreren Spuren erlaubt.'
    },
    miniQuiz: [
      { q: { it: 'Il segnale preannuncia una curva pericolosa a destra.', fr: 'Le panneau annonce un virage dangereux à droite.', en: 'The sign announces a dangerous curve to the right.' }, ans: true },
      { q: { it: 'In presenza del segnale è sempre consentito fare inversione di marcia.', fr: 'Il est toujours autorisé de faire demi-tour.', en: 'U-turns are always permitted here.' }, ans: false }
    ]
  },

  {
    id: 'pericolo-dosso',
    category: 'pericolo',
    officialCode: 'Art. 85 / Fig. II 1',
    name: {
      it: 'Dosso artificiale o naturale (limitata visibilità)',
      fr: 'Cassis ou dos-d\'âne',
      en: 'Hump / Crest with reduced visibility',
      es: 'Resalto o cambio de rasante',
      de: 'Kuppe / Fahrbahnunebenheit'
    },
    svg: `<svg viewBox="0 0 100 100" class="sign-svg"><polygon points="50,8 92,85 8,85" fill="#ffffff" stroke="#dc2626" stroke-width="12" stroke-linejoin="round"/><path d="M22,66 C32,66 38,44 50,44 C62,44 68,66 78,66" fill="none" stroke="#111827" stroke-width="8" stroke-linecap="round"/></svg>`,
    meaning: {
      it: 'Segnala un\'anomalia altimetrica della strada convessa: una salita seguita da una discesa con tratto a visibilità ridotta.',
      fr: 'Signale une élévation de la chaussée (montée puis descente) masquant la visibilité.',
      en: 'Warns of a crest or road hump with restricted visibility ahead.',
      es: 'Advierte de una pendiente ascendente seguida de descenso con pérdida de visibilidad.',
      de: 'Warnt vor einer Kuppe mit sichtbehinderndem Fahrbahnverlauf.'
    },
    allowed: {
      it: 'È consentito il sorpasso solo sul tratto discendente o su strade a carreggiate separate.',
      fr: 'Dépassement autorisé uniquement sur la pente descendante ou route à sens unique.',
      en: 'Overtaking allowed on the descending slope or dual carriageway.',
      es: 'Adelantamiento permitido únicamente en el tramo de bajada o con dos calzadas.',
      de: 'Überholen nur im Gefälle oder auf Richtungsfahrbahnen zulässig.'
    },
    forbidden: {
      it: 'Vietato sorpassare sul tratto in salita (in salita non si vede chi viene di fronte!); vietata sosta, fermata e inversione.',
      fr: 'Dépassement strictement interdit dans la phase de montée en double sens.',
      en: 'Strictly no overtaking on the ascending slope in two-way roads; no U-turns.',
      es: 'Prohibido adelantar en la subida, parar o estacionar.',
      de: 'Überholen im Anstieg bei Gegenverkehr streng verboten.'
    },
    traps: {
      it: 'Attenzione: NON confondere il DOSSO (salita + discesa) con la CUNETTA (discesa + salita allagabile)!',
      fr: 'Ne confondez pas le dos-d\'âne (bosse) avec le cassis (creux où l\'eau peut s\'accumuler).',
      en: 'Do not confuse a crest/hump with a dip (which can collect water).',
      es: 'No confundir el resalto (subida y bajada) con el badén (bajada inundable).',
      de: 'Nicht verwechseln mit der Senke (Gefahr von Wasseransammlung).'
    },
    miniQuiz: [
      { q: { it: 'Sul tratto in salita del dosso è vietato il sorpasso su strade a doppio senso a due corsie.', fr: 'Sur la montée, le dépassement est interdit à double sens.', en: 'Overtaking is forbidden on the uphill slope on two-way roads.' }, ans: true },
      { q: { it: 'Il dosso è una deformazione della strada concava che può allagarsi in caso di pioggia.', fr: 'Le dos-d\'âne est une dépression concave pouvant être inondée.', en: 'A crest is a concave dip that floods during rain.' }, ans: false }
    ]
  },

  {
    id: 'pericolo-passaggio-livello-barriere',
    category: 'pericolo',
    officialCode: 'Art. 85 / Fig. II 8',
    name: {
      it: 'Passaggio a livello con barriere o semibarriere',
      fr: 'Passage à niveau avec barrières',
      en: 'Level crossing with gates / barriers',
      es: 'Paso a nivel con barreras',
      de: 'Bahnübergang mit Schranken'
    },
    svg: `<svg viewBox="0 0 100 100" class="sign-svg"><polygon points="50,8 92,85 8,85" fill="#ffffff" stroke="#dc2626" stroke-width="12" stroke-linejoin="round"/><path d="M28,42 L72,42 M28,52 L72,52 M28,62 L72,62 M28,72 L72,72" stroke="#111827" stroke-width="4"/><path d="M34,36 L34,76 M45,36 L45,76 M56,36 L56,76 M67,36 L67,76" stroke="#111827" stroke-width="4"/></svg>`,
    meaning: {
      it: 'Presegnala a 150 metri un passaggio a livello ferroviario custodito con barriere complete o semibarriere e luce rossa lampeggiante.',
      fr: 'Préannonce à 150m une voie ferrée gardée par barrières ou demi-barrières avec feu rouge clignotant.',
      en: 'Warns 150m ahead of a railway level crossing protected by barriers and flashing red lights.',
      es: 'Advierte a 150m de un cruce con vías de tren protegido por barreras automáticas.',
      de: 'Kündigt einen durch Schranken gesicherten Bahnübergang mit rotem Blinklicht an.'
    },
    allowed: {
      it: 'È consentito transitare solo a barriere completamente alzate e luce rossa spenta.',
      fr: 'Traversée autorisée uniquement lorsque les barrières sont levées et le feu éteint.',
      en: 'Cross only when gates are fully raised and red lights are completely off.',
      es: 'Cruzar solo cuando las barreras estén totalmente levantadas y el semáforo apagado.',
      de: 'Überquerung nur bei vollständig geöffneten Schranken und erloschenem Blinklicht.'
    },
    forbidden: {
      it: 'Severamente vietato impegnare i binari se le barriere stanno scendendo; vietata la sosta, fermata e inversione di marcia.',
      fr: 'Interdiction absolue de s\'engager dès que les barrières s\'abaissent ou que la sonnerie retentit.',
      en: 'Never cross while barriers are closing or alarms sounding; no stopping or parking.',
      es: 'Prohibido pasar cuando las barreras descienden o suena la alarma acústica.',
      de: 'Keinesfalls bei schließenden Schranken oder akustischem Warnsignal einfahren.'
    },
    traps: {
      it: 'Il segnale è SEMPRE seguito dopo 50m dal pannello distanziometrico a tre barre rosse, poi a due barre a 100m, e una barra a 50m dai binari.',
      fr: 'Ce panneau est toujours complété par les 3 balises blanches à bandes rouges obliques (150m, 100m, 50m).',
      en: 'Always accompanied by three distance countdown markers (3 bars = 150m, 2 bars = 100m, 1 bar = 50m).',
      es: 'Va acompañado de las tres balizas de aproximación a 150m, 100m y 50m con franjas rojas.',
      de: 'Wird durch die dreistreifige, zweistreifige und einstreifige Bake (150m, 100m, 50m) ergänzt.'
    },
    miniQuiz: [
      { q: { it: 'Il segnale raffigura un passaggio a livello con barriere o semibarriere.', fr: 'Le panneau représente un passage à niveau avec barrières.', en: 'The sign shows a level crossing with barriers.' }, ans: true },
      { q: { it: 'Se le barriere iniziano a scendere è consentito accelerare per passare prima.', fr: 'On peut accélérer si les barrières commencent à descendre.', en: 'You can accelerate to beat closing gates.' }, ans: false }
    ]
  },

  // --- 2. SEGNALI DI PRECEDENZA ---
  {
    id: 'precedenza-stop',
    category: 'precedenza',
    officialCode: 'Art. 107 / Fig. II 37',
    name: {
      it: 'Fermarsi e dare precedenza (STOP)',
      fr: 'Arrêt obligatoire à l\'intersection (STOP)',
      en: 'Stop and Give Way (STOP)',
      es: 'Detención obligatoria (STOP)',
      de: 'Halt! Vorfahrt gewähren! (STOP)'
    },
    svg: `<svg viewBox="0 0 100 100" class="sign-svg"><polygon points="30,5 70,5 95,30 95,70 70,95 30,95 5,70 5,30" fill="#dc2626" stroke="#ffffff" stroke-width="4"/><polygon points="32,8 68,8 92,32 92,68 68,92 32,92 8,68 8,32" fill="none" stroke="#ffffff" stroke-width="2"/><text x="50" y="58" font-family="Arial, sans-serif" font-weight="900" font-size="24" fill="#ffffff" text-anchor="middle" letter-spacing="1">STOP</text></svg>`,
    meaning: {
      it: 'Prescrive di fermarsi SEMPRE in corrispondenza della striscia trasversale di arresto e dare la precedenza a destra e a sinistra.',
      fr: 'Oblige à marquer un temps d\'arrêt complet à la ligne et céder le passage à gauche et à droite.',
      en: 'Requires a complete standstill at the solid white line and yielding to traffic in all directions.',
      es: 'Obliga a detener el coche por completo en la línea y ceder el paso a izquierda y derecha.',
      de: 'Schreibt vollständigen Stillstand an der Haltlinie und Vorfahrtgewährung nach beiden Seiten vor.'
    },
    allowed: {
      it: 'Ripartire solo dopo essersi arrestati completamente ed essersi accertati che nessuno sopraggiunga da destra o sinistra.',
      fr: 'Redémarrer uniquement après immobilisation totale des roues et contrôle visuel des deux côtés.',
      en: 'Proceed only after vehicle wheels come to a dead stop and both sides are verified clear.',
      es: 'Reanudar la marcha tras detener las ruedas por completo y comprobar que la vía esté libre.',
      de: 'Erst nach vollem Stillstand und freier Querstraße anfahren.'
    },
    forbidden: {
      it: 'È vietato il cosiddetto "stop all\'americana" o rallentare senza fermare completamente le ruote!',
      fr: 'Interdiction de glisser le stop sans immobilisation absolue du véhicule.',
      en: 'Rolling stops are strictly illegal and incur penalty points.',
      es: 'Prohibido reducir la marcha sin llegar a parar totalmente el vehículo.',
      de: 'Ein rollender Stopp ist streng verboten und führt zum Führerscheinentzug.'
    },
    traps: {
      it: 'Domanda trabocchetto: "Lo STOP obbliga a fermarsi solo se ci sono veicoli" -> FALSO! L\'arresto è categorico anche a mezzanotte con strada deserta!',
      fr: 'Piège classique : "Le STOP permet de passer au pas sans s\'arrêter si la voie est vide" -> FAUX, arrêt obligatoire en toute circonstance.',
      en: 'Classic trap: "You only need to stop if another car is approaching" -> FALSE, mandatory under any traffic condition.',
      es: 'Trampa: "Si no viene nadie se puede pasar sin parar" -> FALSO, la detención es incondicional.',
      de: 'Fangfrage: "Am Stoppschild muss man nur bei Querverkehr anhalten" -> FALSCH, der Halt ist ausnahmslos zwingend.'
    },
    miniQuiz: [
      { q: { it: 'Il segnale impone di arrestarsi in ogni caso, anche se la strada incrociata è libera.', fr: 'Le panneau impose de s\'arrêter dans tous les cas, même sans circulation.', en: 'You must stop even if the crossroad is empty.' }, ans: true },
      { q: { it: 'Al segnale di STOP è sufficiente rallentare fino a 5 km/h senza fermare le ruote.', fr: 'Ralentir à 5 km/h suffit sans immobiliser les roues.', en: 'Slowing down to 5 km/h without stopping is enough.' }, ans: false }
    ]
  },

  {
    id: 'precedenza-dare',
    category: 'precedenza',
    officialCode: 'Art. 106 / Fig. II 36',
    name: {
      it: 'Dare precedenza',
      fr: 'Cédez le passage',
      en: 'Give Way / Yield',
      es: 'Ceda el paso',
      de: 'Vorfahrt gewähren'
    },
    svg: `<svg viewBox="0 0 100 100" class="sign-svg"><polygon points="10,15 90,15 50,85" fill="#ffffff" stroke="#dc2626" stroke-width="12" stroke-linejoin="round"/></svg>`,
    meaning: {
      it: 'Obbliga a dare la precedenza ai veicoli che circolano sulla strada incrociata (sia da destra che da sinistra).',
      fr: 'Impose de céder le passage aux usagers circulant sur la voie transversale.',
      en: 'Requires drivers to yield priority to vehicles on the crossing road from both directions.',
      es: 'Obliga a ceder el paso a los vehículos que circulan por la vía que se va a cruzar.',
      de: 'Verpflichtet zur Vorfahrtgewährung für den Verkehr auf der querenden Straße.'
    },
    allowed: {
      it: 'Se la strada è completamente sgombra, è consentito impegnare l\'incrocio senza fermarsi del tutto.',
      fr: 'Possibilité de s\'engager sans marquer l\'arrêt complet si aucun véhicule n\'approche.',
      en: 'You may proceed smoothly without stopping if no traffic is approaching.',
      es: 'Permite pasar sin detenerse si la vía está despejada y es seguro.',
      de: 'Darf bei freier Querstraße ohne vollständigen Halt durchfahren werden.'
    },
    forbidden: {
      it: 'Vietato tagliare la strada o costringere chi ha la precedenza a frenare o deviare bruscamente.',
      fr: 'Interdit de forcer le passage ou de gêner les véhicules prioritaires.',
      en: 'Forbidden to force your way or cause priority vehicles to brake or swerve.',
      es: 'Prohibido entorpecer la marcha o cortar el paso a los vehículos prioritarios.',
      de: 'Vorfahrtsberechtigte dürfen weder behindert noch gefährdet werden.'
    },
    traps: {
      it: 'Differenza chiave con lo STOP: il segnale "Dare precedenza" NON obbliga ad arrestarsi se la strada è libera!',
      fr: 'Différence cruciale avec le STOP : ne vous oblige pas à vous arrêter si personne n\'arrive.',
      en: 'Crucial distinction from STOP: full halt is not required if crossroad is totally clear.',
      es: 'Diferencia con el STOP: el Ceda el Paso no te obliga a parar si no viene nadie.',
      de: 'Unterschied zum Stoppschild: Kein Zwangshalt bei freier Fahrbahn.'
    },
    miniQuiz: [
      { q: { it: 'Il segnale obbliga a dare la precedenza sia ai veicoli da destra che da sinistra.', fr: 'Oblige à céder le passage à gauche et à droite.', en: 'Requires yielding to both left and right traffic.' }, ans: true },
      { q: { it: 'Il segnale di Dare Precedenza obbliga SEMPRE ad arrestare completamente il veicolo.', fr: 'Oblige TOUJOURS à marquer un arrêt complet.', en: 'ALWAYS requires a complete vehicle stop.' }, ans: false }
    ]
  },

  {
    id: 'precedenza-diritto',
    category: 'precedenza',
    officialCode: 'Art. 110 / Fig. II 43',
    name: {
      it: 'Diritto di precedenza (Strada con precedenza)',
      fr: 'Caractère prioritaire de la route',
      en: 'Priority Road (Right-of-way road)',
      es: 'Calzada con prioridad',
      de: 'Vorfahrtstraße'
    },
    svg: `<svg viewBox="0 0 100 100" class="sign-svg"><polygon points="50,6 94,50 50,94 6,50" fill="#fbbf24" stroke="#ffffff" stroke-width="8" stroke-linejoin="round"/><polygon points="50,14 86,50 50,86 14,50" fill="#fbbf24" stroke="#111827" stroke-width="2"/></svg>`,
    meaning: {
      it: 'Indica che la strada su cui si viaggia gode del diritto di precedenza su tutte le strade incrociate fino al segnale di fine diritto.',
      fr: 'Confère la priorité aux intersections à venir jusqu\'au panneau de fin de route prioritaire.',
      en: 'Indicates you are travelling on a priority road with right of way over intersecting roads.',
      es: 'Indica que los vehículos que circulan por esta calzada tienen preferencia en los cruces.',
      de: 'Zeigt an, dass auf dieser Straße Vorfahrt an allen folgenden Kreuzungen besteht.'
    },
    allowed: {
      it: 'Transitare con precedenza rispetto a chi proviene dalle strade laterali.',
      fr: 'Franchir les intersections avec priorité sur les voies secondaires.',
      en: 'Pass through junctions with priority over side road traffic.',
      es: 'Cruzar con preferencia sobre los coches que acceden desde los laterales.',
      de: 'Kreuzungen vorfahrtsberechtigt gegenüber einmündenden Straßen befahren.'
    },
    forbidden: {
      it: 'Non autorizza a procedere a velocità smodata senza controllare gli incroci; la prudenza è sempre d\'obbligo.',
      fr: 'N\'autorise pas à foncer sans ralentir ni vérifier l\'engagement des usagers.',
      en: 'Does not excuse reckless speeding; caution at junctions remains mandatory.',
      es: 'No exime de moderar la velocidad y vigilar la aproximación de otros conductores.',
      de: 'Entbindet nicht von der Pflicht, bremsbereit an Einmündungen heranzufahren.'
    },
    traps: {
      it: 'Se barrato da una banda nera diagonale, indica la "FINE DEL DIRITTO DI PRECEDENZA" (si torna alla regola della precedenza a destra!).',
      fr: 'Barré d\'une diagonale noire, il indique la FIN de priorité (retour à la priorité à droite par défaut !).',
      en: 'With a black diagonal slash, it marks the END of priority road (reverting to normal right-hand yield rule!).',
      es: 'Tachado con una franja negra señala el FIN de la prioridad (vuelve la preferencia general a la derecha).',
      de: 'Mit schwarzem Diagonalbalken zeigt es das ENDE der Vorfahrtstraße an.'
    },
    miniQuiz: [
      { q: { it: 'Il segnale indica l\'inizio di una strada i cui conducenti hanno diritto di precedenza.', fr: 'Indique une route prioritaire aux intersections.', en: 'Indicates the start of a priority road.' }, ans: true },
      { q: { it: 'In presenza del segnale bisogna dare la precedenza a tutti i veicoli provenienti da destra.', fr: 'Il faut céder le passage à droite.', en: 'You must yield to cars from the right.' }, ans: false }
    ]
  },

  // --- 3. SEGNALI DI DIVIETO ---
  {
    id: 'divieto-transito',
    category: 'divieto',
    officialCode: 'Art. 116 / Fig. II 46',
    name: {
      it: 'Divieto di transito a tutti i veicoli',
      fr: 'Circulation interdite à tout véhicule dans les deux sens',
      en: 'No Vehicles / Closed in both directions',
      es: 'Circulación prohibida en ambos sentidos',
      de: 'Verbot für Fahrzeuge aller Art'
    },
    svg: `<svg viewBox="0 0 100 100" class="sign-svg"><circle cx="50" cy="50" r="45" fill="#ffffff" stroke="#dc2626" stroke-width="12"/></svg>`,
    meaning: {
      it: 'Vieta la circolazione nei due sensi a tutti i veicoli (a motore, biciclette, monopattini, ciclomotori e veicoli a braccia).',
      fr: 'Interdit l\'accès et la circulation dans les deux sens à tout véhicule.',
      en: 'Prohibits vehicle access in both directions to all types of motorized and non-motorized vehicles.',
      es: 'Prohíbe la circulación de toda clase de vehículos en ambos sentidos.',
      de: 'Verbietet die Durchfahrt für Fahrzeuge aller Art in beiden Richtungen.'
    },
    allowed: {
      it: 'Il transito è consentito esclusivamente ai pedoni (salvo diversa indicazione con pannello integrativo).',
      fr: 'Accès autorisé uniquement aux piétons.',
      en: 'Accessible only to pedestrians on foot.',
      es: 'Permitido el paso únicamente a peatones a pie.',
      de: 'Nur für Fußgänger frei.'
    },
    forbidden: {
      it: 'Vietato il transito a qualsiasi mezzo a due o quattro ruote 24 ore su 24.',
      fr: 'Interdit à tous véhicules 24h/24 sauf panonceau d\'exception.',
      en: 'Strictly closed to all vehicles 24/7 unless supplementary panel says otherwise.',
      es: 'Prohibida la entrada a coches, motos, bicis y patinetes.',
      de: 'Ausnahmslos für alle Fahrzeuge gesperrt.'
    },
    traps: {
      it: 'NON confonderlo con il "Senso Vietato" (cerchio rosso con barra orizzontale bianca): questo vale in ENTRAMBI i sensi, mentre il senso vietato vale solo da quel lato!',
      fr: 'Ne pas confondre avec le SENS INTERDIT (fond rouge barre blanche) : ici, personne ne roule dans aucun sens !',
      en: 'Do not confuse with "No Entry" (white bar on red): this sign closes the street in BOTH directions.',
      es: 'No confundir con dirección prohibida: esta señal prohíbe el tráfico en ambos sentidos.',
      de: 'Nicht verwechseln mit "Einfahrt verboten": Dieses Zeichen sperrt die Straße in BEIDEN Fahrtrichtungen.'
    },
    miniQuiz: [
      { q: { it: 'Il segnale vieta il transito in entrambi i sensi a tutti i veicoli.', fr: 'Interdit la circulation dans les deux sens.', en: 'Forbids transit in both directions for all vehicles.' }, ans: true },
      { q: { it: 'Il segnale consente la circolazione ai ciclomotori e alle biciclette.', fr: 'Autorise les vélos et cyclomoteurs.', en: 'Allows bicycles and mopeds.' }, ans: false }
    ]
  },

  {
    id: 'divieto-sorpasso-merci',
    category: 'divieto',
    officialCode: 'Art. 116 / Fig. II 49',
    name: {
      it: 'Divieto di sorpasso per veicoli merci di massa a pieno carico > 3.5 t',
      fr: 'Interdiction de dépasser pour poids lourds de plus de 3,5t',
      en: 'No overtaking for heavy goods vehicles exceeding 3.5 tonnes',
      es: 'Adelantamiento prohibido para camiones de más de 3,5t',
      de: 'Überholverbot für Kraftfahrzeuge mit einer zGM über 3,5 t'
    },
    svg: `<svg viewBox="0 0 100 100" class="sign-svg"><circle cx="50" cy="50" r="45" fill="#ffffff" stroke="#dc2626" stroke-width="12"/><path d="M30,42 L50,42 L50,65 L30,65 Z M42,42 L42,35 L38,35 L38,42" fill="#dc2626"/><rect x="25" y="44" width="10" height="18" fill="#dc2626"/><rect x="58" y="44" width="16" height="20" rx="3" fill="#111827"/><circle cx="34" cy="65" r="4" fill="#111827"/><circle cx="46" cy="65" r="4" fill="#111827"/><circle cx="66" cy="65" r="4" fill="#111827"/></svg>`,
    meaning: {
      it: 'Vieta ai veicoli destinati al trasporto di merci di massa complessiva a pieno carico superiore a 3,5 tonnellate di sorpassare veicoli a motore.',
      fr: 'Interdit aux camions et véhicules de transport de marchandises de plus de 3,5 tonnes de dépasser les véhicules à moteur.',
      en: 'Prohibits goods vehicles over 3.5 tonnes from overtaking other motor vehicles.',
      es: 'Prohíbe a los camiones de más de 3.500 kg adelantar a vehículos a motor.',
      de: 'Verbietet Lkw mit über 3,5t zulässiger Gesamtmasse das Überholen von mehrspurigen Fahrzeugen.'
    },
    allowed: {
      it: 'Consente il sorpasso alle autovetture, ai motocicli, agli autobus e ai camper (anche se pesano più di 3.5 t perché trasportano persone, non merci!).',
      fr: 'Autorise le dépassement aux voitures particulières, autocars et camping-cars (qui transportent des passagers et non des marchandises).',
      en: 'Passenger cars, motorbikes, buses and motorhomes ARE allowed to overtake because they carry people, not freight.',
      es: 'Los turismos, autobuses y autocaravanas SÍ pueden adelantar porque no transportan mercancías.',
      de: 'Pkw, Busse und Wohnmobile DÜRFEN überholen, da sie der Personenbeförderung dienen.'
    },
    forbidden: {
      it: 'Vietato il sorpasso ai camion, autocarri e articolati di massa superiore a 3,5 tonnellate.',
      fr: 'Dépassement interdit aux camions de transport de marchandises de plus de 3,5t.',
      en: 'Commercial freight trucks over 3.5t cannot overtake.',
      es: 'Prohibido adelantar a camiones pesados.',
      de: 'Schwere Lastkraftwagen dürfen nicht überholen.'
    },
    traps: {
      it: 'Quiz ingannevole classico: "Il segnale vieta il sorpasso a un autobus di 12 tonnellate" -> FALSO! L\'autobus trasporta persone, il segnale vale solo per il trasporto di MERCI!',
      fr: 'Piège typique : "Interdit à un autocar de 15 tonnes de dépasser" -> FAUX, les autocars transportent des voyageurs.',
      en: 'Classic trick question: "A 12-tonne coach is forbidden from overtaking by this sign" -> FALSE! Coaches carry passengers, not goods!',
      es: 'Pregunta trampa: "Prohíbe adelantar a un autobús de 10 toneladas" -> ¡FALSO! Solo afecta al transporte de mercancías.',
      de: 'Klassische Fangfrage: "Gilt das Verbot für einen Reisebus mit 15 Tonnen?" -> NEIN, Busse befördern Personen, keine Güter!'
    },
    miniQuiz: [
      { q: { it: 'Il segnale vieta il sorpasso solo agli autocarri destinati al trasporto merci con massa oltre 3,5 t.', fr: 'Concerne uniquement les véhicules de transport de marchandises de plus de 3,5t.', en: 'Applies exclusively to freight vehicles over 3.5 tonnes.' }, ans: true },
      { q: { it: 'Il segnale vieta il sorpasso a tutti gli autobus di linea e gran turismo.', fr: 'Interdit le dépassement à tous les autobus.', en: 'Forbids all passenger buses from overtaking.' }, ans: false }
    ]
  },

  // --- 4. SEGNALI DI OBBLIGO ---
  {
    id: 'obbligo-svolta-dx',
    category: 'obbligo',
    officialCode: 'Art. 122 / Fig. II 80',
    name: {
      it: 'Direzione obbligatoria a destra',
      fr: 'Direction obligatoire à droite à la prochaine intersection',
      en: 'Mandatory turn right at junction',
      es: 'Giro obligatorio a la derecha',
      de: 'Vorgeschriebene Fahrtrichtung: Rechts'
    },
    svg: `<svg viewBox="0 0 100 100" class="sign-svg"><circle cx="50" cy="50" r="45" fill="#1d4ed8" stroke="#ffffff" stroke-width="3"/><path d="M35,65 L50,65 C60,65 65,60 65,50 L65,38" fill="none" stroke="#ffffff" stroke-width="9" stroke-linecap="round"/><polygon points="56,40 65,24 74,40" fill="#ffffff"/></svg>`,
    meaning: {
      it: 'Obbliga tutti i conducenti a svoltare a destra all\'incrocio prima del quale è collocato.',
      fr: 'Impose de tourner à droite au carrefour immédiatement après le panneau.',
      en: 'Mandates an immediate right turn at the upcoming intersection.',
      es: 'Obliga a girar a la derecha en la próxima intersección.',
      de: 'Schreibt das Rechtsabbiegen an der nächsten Kreuzung zwingend vor.'
    },
    allowed: {
      it: 'Svoltare esclusivamente a destra immettendosi nella carreggiata indicata dalla freccia.',
      fr: 'Tourner uniquement à droite dans la direction prescrite.',
      en: 'Turn right only.',
      es: 'Efectuar únicamente el giro a la derecha.',
      de: 'Ausschließlich nach rechts abbiegen.'
    },
    forbidden: {
      it: 'Vietato proseguire diritto e vietato svoltare a sinistra o fare inversione di marcia.',
      fr: 'Interdiction absolue d\'aller tout droit ou de tourner à gauche.',
      en: 'Forbidden to go straight or turn left.',
      es: 'Prohibido seguir de frente o girar a la izquierda.',
      de: 'Geradeausfahren und Linksabbiegen sind verboten.'
    },
    traps: {
      it: 'Attenzione: NON confondere la "Direzione obbligatoria" (freccia orizzontale a 90°) con il "Passaggio obbligatorio" (freccia inclinata a 45° verso il basso che indica di aggirare un ostacolo)!',
      fr: 'Ne confondez pas la direction obligatoire (flèche à 90°) et le contournement obligatoire d\'un obstacle (flèche oblique à 45°).',
      en: 'Do not confuse mandatory turn (90° arrow at junction) with keep right obstacle bypass (45° arrow).',
      es: 'No confundir giro obligatorio con paso obligatorio (flecha inclinada hacia el suelo).',
      de: 'Nicht verwechseln mit "Rechts vorbeifahren" (schräg nach unten geneigter Pfeil an Hindernissen).'
    },
    miniQuiz: [
      { q: { it: 'Il segnale obbliga a svoltare a destra al prossimo incrocio.', fr: 'Oblige à tourner à droite au prochain carrefour.', en: 'Requires a right turn at the next junction.' }, ans: true },
      { q: { it: 'In presenza del segnale è consentito proseguire diritto se non sopraggiungono altri veicoli.', fr: 'On peut continuer tout droit si personne n\'arrive.', en: 'You can go straight if the road is clear.' }, ans: false }
    ]
  },

  {
    id: 'obbligo-catene-neve',
    category: 'obbligo',
    officialCode: 'Art. 122 / Fig. II 95',
    name: {
      it: 'Catene per la neve obbligatorie o pneumatici invernali',
      fr: 'Chaînes à neige obligatoires sur au moins deux roues motrices',
      en: 'Snow chains or winter tyres mandatory',
      es: 'Cadenas para nieve obligatorias',
      de: 'Schneeketten vorgeschrieben'
    },
    svg: `<svg viewBox="0 0 100 100" class="sign-svg"><circle cx="50" cy="50" r="45" fill="#1d4ed8" stroke="#ffffff" stroke-width="3"/><circle cx="50" cy="50" r="28" fill="none" stroke="#ffffff" stroke-width="8"/><circle cx="50" cy="50" r="14" fill="#ffffff"/><path d="M50,22 L50,78 M22,50 L78,50 M30,30 L70,70 M30,70 L70,30" stroke="#1d4ed8" stroke-width="3"/></svg>`,
    meaning: {
      it: 'Obbliga a circolare con catene da neve montate sulle ruote motrici o con pneumatici invernali omologati (M+S) da quel punto in poi.',
      fr: 'Oblige à équiper le véhicule de chaînes à neige sur au moins deux roues motrices ou de pneus hiver homologués.',
      en: 'Mandates driving with snow chains mounted on drive wheels or certified winter tyres.',
      es: 'Obliga a circular con cadenas de nieve en las ruedas motrices o neumáticos de invierno.',
      de: 'Schreibt Schneeketten auf den Antriebsrädern oder Winterreifen vor.'
    },
    allowed: {
      it: 'Proseguire se si hanno le catene montate sulle ruote motrici o gomme invernali idonee (marcatura M+S / fiocco di neve).',
      fr: 'Poursuivre avec chaînes installées ou 4 pneus hiver certifiés 3PMSF.',
      en: 'Proceed with fitted chains or certified winter tyres.',
      es: 'Continuar con cadenas colocadas o neumáticos de invierno adecuados.',
      de: 'Weiterfahrt nur mit montierten Schneeketten oder M+S-Reifen.'
    },
    forbidden: {
      it: 'Vietato proseguire con pneumatici estivi sprovvisti di catene montate o a bordo.',
      fr: 'Interdit de s\'engager avec des pneus été ordinaires sans équipement.',
      en: 'Prohibited to enter with regular summer tyres without chains.',
      es: 'Prohibido circular con neumáticos normales de verano.',
      de: 'Verboten für Fahrzeuge mit reiner Sommerbereifung ohne Ketten.'
    },
    traps: {
      it: 'Le catene vanno montate sulle RUOTE MOTRICI (non sulle ruote sterzanti, a meno che l\'auto non sia a trazione anteriore!).',
      fr: 'Les chaînes doivent être montées sur les roues MOTRICES du véhicule.',
      en: 'Chains must be fitted to the DRIVE wheels (not just steering wheels).',
      es: 'Las cadenas deben instalarse en las ruedas MOTRICES del vehículo.',
      de: 'Schneeketten müssen auf den ANTRIEBSRÄDERN montiert werden.'
    },
    miniQuiz: [
      { q: { it: 'Il segnale obbliga a montare catene da neve o avere pneumatici invernali.', fr: 'Oblige à monter des chaînes ou des pneus hiver.', en: 'Requires snow chains or winter tyres.' }, ans: true },
      { q: { it: 'Le catene da neve vanno montate esclusivamente sulle ruote posteriori di qualsiasi vettura.', fr: 'Doivent être montées uniquement à l\'arrière de tout véhicule.', en: 'Must be mounted on the rear wheels of any car.' }, ans: false }
    ]
  },

  // --- 5. SEGNALETICA ORIZZONTALE ---
  {
    id: 'orizzontale-linea-continua',
    category: 'orizzontale',
    officialCode: 'Art. 138 / Segnaletica Orizzontale',
    name: {
      it: 'Striscia longitudinale continua centrale',
      fr: 'Ligne axiale continue',
      en: 'Continuous central solid line',
      es: 'Línea longitudinal continua',
      de: 'Durchgehende Fahrbahnstreifen-Linie'
    },
    svg: `<svg viewBox="0 0 100 100" class="sign-svg"><rect x="10" y="10" width="80" height="80" rx="8" fill="#334155" stroke="#ffffff" stroke-width="2"/><line x1="50" y1="10" x2="50" y2="90" stroke="#ffffff" stroke-width="8"/><line x1="25" y1="10" x2="25" y2="90" stroke="#64748b" stroke-width="2" stroke-dasharray="8,8"/><line x1="75" y1="10" x2="75" y2="90" stroke="#64748b" stroke-width="2" stroke-dasharray="8,8"/></svg>`,
    meaning: {
      it: 'Separa i sensi di marcia o le corsie. È insormontabile ed equivale a un muro divisorio.',
      fr: 'Sépare les deux sens de circulation. Franchise infranchissable assimilée à un mur.',
      en: 'Separates opposing traffic lanes. Strictly prohibited to cross or straddle.',
      es: 'Separa los sentidos de circulación. Es una línea infranqueable que no se puede pisar.',
      de: 'Trennt die Fahrstreifen oder Fahrtrichtungen und darf nicht überfahren werden.'
    },
    allowed: {
      it: 'È consentito sorpassare un veicolo lentissimo o un ciclista SOLO SE NON SI OLTREPASSA minimamente la striscia con nessuna ruota!',
      fr: 'Le dépassement d\'un cycliste est toléré sous réserve de ne pas franchir la ligne.',
      en: 'You may pass a slow cyclist only if no wheel touches or crosses the solid line.',
      es: 'Permite adelantar a ciclistas sin peligro dejando la distancia obligatoria.',
      de: 'Vorbeifahren nur zulässig, wenn die Linie zu keinem Zeitpunkt berührt wird.'
    },
    forbidden: {
      it: 'Severamente vietato oltrepassarla, svoltare a sinistra tagliando la striscia o fare inversione di marcia.',
      fr: 'Interdiction absolue de chevaucher, franchir, tourner à gauche ou faire demi-tour.',
      en: 'Strictly prohibited to cross, make U-turns, or turn left across the solid line.',
      es: 'Prohibido pisar, rebasar, girar a la izquierda o cambiar de sentido.',
      de: 'Wenden, Linksabbiegen und Überfahren sind strikt untersagt.'
    },
    traps: {
      it: 'Quiz trabocchetto ministeriale: "In presenza di striscia continua il sorpasso è sempre vietato" -> FALSO! È consentito sorpassare se non si supera la striscia continua (es. sorpasso di una moto entro la propria corsia)!',
      fr: 'Piège d\'examen : "Le dépassement est TOUJOURS interdit sur ligne continue" -> FAUX si on ne mord pas sur la ligne.',
      en: 'Exam trap: "Overtaking is ALWAYS prohibited along a solid line" -> FALSE! Allowed if done fully within your own lane.',
      es: 'Pregunta trampa: "El adelantamiento está siempre prohibido con línea continua" -> FALSO si se realiza sin invadirla.',
      de: 'Fangfrage: "Überholen ist bei durchgehender Linie immer verboten" -> FALSCH, wenn die Linie nicht überfahren wird.'
    },
    miniQuiz: [
      { q: { it: 'La striscia continua non può essere mai oltrepassata per svoltare a sinistra o invertire il senso.', fr: 'Ne peut jamais être franchie pour faire demi-tour.', en: 'Can never be crossed to turn left or make U-turn.' }, ans: true },
      { q: { it: 'È consentito oltrepassare la striscia continua per sorpassare se la strada è sgombra.', fr: 'On peut la franchir pour dépasser si la voie est libre.', en: 'You can cross it to pass if the road is clear.' }, ans: false }
    ]
  },

  // --- 6. SEGNALI LUMINOSI & PANNELLI INTEGRATIVI ---
  {
    id: 'luminosa-semaforo-corsie-reversibili',
    category: 'luminosa-pannelli',
    officialCode: 'Art. 162 / Lanterne Semaforiche',
    name: {
      it: 'Semaforo per corsie reversibili (Freccia verde e Croce rossa)',
      fr: 'Feux de voies réversibles (Flèche verte et Croix rouge)',
      en: 'Lane control signals (Green arrow and Red cross)',
      es: 'Semáforos de carril (Flecha verde y Aspa roja)',
      de: 'Dauerlichtzeichen über dem Fahrstreifen'
    },
    svg: `<svg viewBox="0 0 100 100" class="sign-svg"><rect x="15" y="15" width="70" height="70" rx="10" fill="#0f172a" stroke="#ffffff" stroke-width="3"/><circle cx="50" cy="50" r="28" fill="#111827"/><line x1="36" y1="36" x2="64" y2="64" stroke="#ef4444" stroke-width="8" stroke-linecap="round"/><line x1="64" y1="36" x2="36" y2="64" stroke="#ef4444" stroke-width="8" stroke-linecap="round"/></svg>`,
    meaning: {
      it: 'Regola l\'uso delle singole corsie di marcia su ponti, gallerie o tangenziali: Croce Rossa = corsia chiusa; Freccia Verde = corsia aperta.',
      fr: 'Règle la circulation par voie : Croix rouge = voie interdite ; Flèche verte = voie ouverte.',
      en: 'Controls individual lanes on bridges or tunnels: Red X = lane closed; Green arrow = lane open.',
      es: 'Regula el uso de carriles reversibles: Aspa roja = carril cerrado; Flecha verde = abierto.',
      de: 'Regelt die Fahrstreifennutzung: Rotes X = Fahrstreifen gesperrt; Grüner Pfeil = freigegeben.'
    },
    allowed: {
      it: 'Percorrere la corsia unicamente quando sopra di essa è accesa la freccia verde rivolta in basso.',
      fr: 'Circuler sur la voie uniquement lorsque la flèche verte est allumée.',
      en: 'Drive on the lane only when the green downward arrow is illuminated.',
      es: 'Circular por el carril solo cuando esté iluminada la flecha verde hacia abajo.',
      de: 'Fahrstreifen nur bei grünem nach unten gerichtetem Pfeil befahren.'
    },
    forbidden: {
      it: 'Severamente vietato impegnare la corsia con la croce rossa accesa (è riservata al senso opposto o bloccata per emergenza!).',
      fr: 'Interdiction absolue d\'emprunter une voie surmontée d\'une croix rouge.',
      en: 'Never enter a lane displaying a red X (facing oncoming traffic or roadworks!).',
      es: 'Prohibición absoluta de ocupar un carril con aspa roja encendida.',
      de: 'Befahren eines Fahrstreifens mit rotem X ist unter schwerer Strafe verboten.'
    },
    traps: {
      it: 'Se lampeggia una FRECCIA GIALLA obliqua, indica l\'obbligo immediato di abbandonare quella corsia spostandosi nel senso indicato!',
      fr: 'Une flèche jaune oblique clignotante impose de se rabattre sans délai dans la voie indiquée.',
      en: 'A flashing yellow diagonal arrow mandates immediate lane exit in that direction.',
      es: 'Una flecha amarilla oblicua indica la obligación de cambiar de carril de inmediato.',
      de: 'Ein gelb blinkender schräger Pfeil gebietet unverzüglichen Fahrstreifenwechsel.'
    },
    miniQuiz: [
      { q: { it: 'La croce rossa accesa vieta di percorrere la corsia sottostante.', fr: 'La croix rouge interdit d\'emprunter la voie.', en: 'The red X forbids driving in that lane.' }, ans: true },
      { q: { it: 'Con la croce rossa è consentito percorrere la corsia solo se non ci sono veicoli in senso opposto.', fr: 'On peut rouler sous la croix rouge si personne n\'arrive.', en: 'You can drive under the red X if traffic is light.' }, ans: false }
    ]
  }
];
