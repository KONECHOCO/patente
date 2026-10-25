// Comprehensive Driving Quiz & Exam Database with True/False, Multiple-Choice & Tricky Questions

export const QUIZ_DATABASE = [
  {
    id: 'q1',
    topicId: 'precedenze-incroci',
    category: 'all',
    countries: ['IT', 'FR', 'ES', 'DE', 'UK', 'CI'],
    type: 'true-false',
    question: {
      it: 'Negli incroci regolati con circolazione rotatoria (rotatoria europea), i veicoli già immessi nell\'anello hanno generalmente la precedenza su quelli che intendono immettersi.',
      fr: 'Sur un carrefour à sens giratoire, les usagers circulant sur l\'anneau ont la priorité sur les véhicules qui s\'engagent.',
      en: 'In modern roundabouts, vehicles already inside the circulatory roadway have priority over entering vehicles.',
      es: 'En las glorietas, los vehículos que ya circulan por el anillo tienen preferencia sobre los que van a acceder.',
      de: 'Im Kreisverkehr haben die Fahrzeuge auf der Kreisfahrbahn Vorrang vor einfahrenden Fahrzeugen.'
    },
    options: {
      it: [{ id: 'true', text: 'VERO' }, { id: 'false', text: 'FALSO' }],
      fr: [{ id: 'true', text: 'VRAI' }, { id: 'false', text: 'FAUX' }],
      en: [{ id: 'true', text: 'TRUE' }, { id: 'false', text: 'FALSE' }],
      es: [{ id: 'true', text: 'VERDADERO' }, { id: 'false', text: 'FALSO' }],
      de: [{ id: 'true', text: 'RICHTIG' }, { id: 'false', text: 'FALSCH' }]
    },
    correctAnswer: 'true',
    points: 3,
    isTricky: false,
    explanation: {
      it: 'VERO. Nelle rotatorie con segnale "Dare Precedenza" posto all\'ingresso, chi si trova all\'interno dell\'anello ha la precedenza assoluta.',
      fr: 'VRAI. Le panneau Cédez-le-passage à l\'entrée impose la priorité aux véhicules déjà engagés sur le giratoire.',
      en: 'TRUE. Modern roundabouts operate under priority-to-circulating rules enforced by yield/give-way signs.',
      es: 'VERDADERO. Salvo que una señal indique lo contrario, la prioridad en la glorieta pertenece al vehículo que ya circula en ella.',
      de: 'RICHTIG. Die Vorfahrt gehört dem fließenden Verkehr im Kreisverkehr.'
    }
  },

  {
    id: 'q2',
    topicId: 'precedenze-incroci',
    category: 'all',
    countries: ['IT', 'FR', 'ES', 'DE', 'UK', 'CI'],
    type: 'true-false',
    question: {
      it: 'Il conducente che impegna un incrocio ha SEMPRE la precedenza assoluta su tutti i veicoli se proviene dalla loro destra.',
      fr: 'Un conducteur a TOUJOURS la priorité absolue à une intersection dès lors qu\'il arrive par la droite.',
      en: 'A driver entering an intersection ALWAYS has absolute priority over all other vehicles as long as they arrive from the right.',
      es: 'Un conductor tiene SIEMPRE prioridad absoluta de paso si se aproxima por la derecha en un cruce.',
      de: 'Ein von rechts kommendes Fahrzeug hat an einer Kreuzung IMMER uneingeschränkte Vorfahrt.'
    },
    options: {
      it: [{ id: 'true', text: 'VERO' }, { id: 'false', text: 'FALSO' }],
      fr: [{ id: 'true', text: 'VRAI' }, { id: 'false', text: 'FAUX' }],
      en: [{ id: 'true', text: 'TRUE' }, { id: 'false', text: 'FALSE' }],
      es: [{ id: 'true', text: 'VERDADERO' }, { id: 'false', text: 'FALSO' }],
      de: [{ id: 'true', text: 'RICHTIG' }, { id: 'false', text: 'FALSCH' }]
    },
    correctAnswer: 'false',
    points: 4,
    isTricky: true,
    explanation: {
      it: 'FALSO. La parola "SEMPRE" è un tranello! Chi proviene da destra non ha la precedenza se incontra un segnale di STOP, Dare Precedenza, o se incrocia tram o veicoli di soccorso con sirena e lampeggiante accesi.',
      fr: 'FAUX. Piège de formulation ! La priorité à droite ne s\'applique pas en présence d\'un STOP, d\'un Cédez-le-passage ou face à un véhicule de secours d\'urgence.',
      en: 'FALSE. "ALWAYS" is a classic exam trap! You must still yield if facing a STOP sign, give way marking, or emergency vehicle with siren.',
      es: 'FALSO. La palabra "SIEMPRE" invalida la afirmación. No tiene preferencia si tiene señal de STOP, ceda el paso o ante vehículos prioritarios.',
      de: 'FALSCH. Fangfrage durch "IMMER"! Ausnahmen bestehen bei Stoppschildern, Vorfahrtstraßen oder Einsatzfahrzeugen mit Martinshorn.'
    }
  },

  {
    id: 'q3',
    topicId: 'distanza-velocita',
    category: 'all',
    countries: ['IT', 'FR', 'ES', 'DE', 'UK', 'CI'],
    type: 'true-false',
    question: {
      it: 'Se la velocità raddoppia (ad esempio passando da 50 km/h a 100 km/h), lo spazio di frenatura raddoppia anch\'esso.',
      fr: 'Si la vitesse d\'un véhicule double (en passant de 50 km/h à 100 km/h), la distance de freinage est également doublée.',
      en: 'If vehicle speed doubles (for example from 50 km/h to 100 km/h), the physical braking distance also doubles.',
      es: 'Si se duplica la velocidad (por ejemplo de 50 a 100 km/h), la distancia de frenado también se duplica.',
      de: 'Wenn sich die Geschwindigkeit verdoppelt (z.B. von 50 km/h auf 100 km/h), verdoppelt sich auch der reine Bremsweg.'
    },
    options: {
      it: [{ id: 'true', text: 'VERO' }, { id: 'false', text: 'FALSO' }],
      fr: [{ id: 'true', text: 'VRAI' }, { id: 'false', text: 'FAUX' }],
      en: [{ id: 'true', text: 'TRUE' }, { id: 'false', text: 'FALSE' }],
      es: [{ id: 'true', text: 'VERDADERO' }, { id: 'false', text: 'FALSO' }],
      de: [{ id: 'true', text: 'RICHTIG' }, { id: 'false', text: 'FALSCH' }]
    },
    correctAnswer: 'false',
    points: 4,
    isTricky: true,
    explanation: {
      it: 'FALSO. Legge fisica fondamentale: lo spazio di frenatura aumenta con il QUADRATO della velocità! Se la velocità raddoppia, lo spazio di frenata diventa quattro volte maggiore (x4)!',
      fr: 'FAUX. Règle physique essentielle : la distance de freinage augmente avec le CARRÉ de la vitesse ! Si vous doublez votre allure, elle quadruple (x4).',
      en: 'FALSE. Crucial physics rule: kinetic energy and braking distance scale with the SQUARE of speed! Doubling speed quadruples the stopping distance.',
      es: 'FALSO. La distancia de frenado aumenta proporcionalmente al CUADRADO de la velocidad. Si duplicas la velocidad, la distancia se multiplica por 4.',
      de: 'FALSCH. Der Bremsweg wächst mit dem QUADRAT der Geschwindigkeit! Doppelte Geschwindigkeit bedeutet vierfacher Bremsweg!'
    }
  },

  {
    id: 'q4',
    topicId: 'distanza-velocita',
    category: 'all',
    countries: ['IT', 'FR', 'ES', 'DE', 'UK', 'CI'],
    type: 'true-false',
    question: {
      it: 'La distanza di sicurezza deve essere mantenuta anche nei confronti dei ciclisti e dei veicoli a due ruote.',
      fr: 'La distance de sécurité doit impérativement être respectée à l\'égard des cyclistes et des deux-roues.',
      en: 'A safe following distance must also be maintained with respect to cyclists and two-wheeled vehicles.',
      es: 'Debe mantenerse la distancia de seguridad obligatoria también respecto a ciclistas y vehículos de dos ruedas.',
      de: 'Der gesetzliche Sicherheitsabstand muss auch gegenüber Radfahrern und Zweiradfahrern eingehalten werden.'
    },
    options: {
      it: [{ id: 'true', text: 'VERO' }, { id: 'false', text: 'FALSO' }],
      fr: [{ id: 'true', text: 'VRAI' }, { id: 'false', text: 'FAUX' }],
      en: [{ id: 'true', text: 'TRUE' }, { id: 'false', text: 'FALSE' }],
      es: [{ id: 'true', text: 'VERDADERO' }, { id: 'false', text: 'FALSO' }],
      de: [{ id: 'true', text: 'RICHTIG' }, { id: 'false', text: 'FALSCH' }]
    },
    correctAnswer: 'true',
    points: 3,
    isTricky: false,
    explanation: {
      it: 'VERO. I ciclisti e i veicoli a due ruote sono utenti vulnerabili della strada; mantenere una distanza adeguata previene incidenti gravi in caso di improvvisa sbandata o caduta.',
      fr: 'VRAI. Les usagers vulnérables nécessitent une vigilance accrue et des distances de sécurité rigoureuses.',
      en: 'TRUE. Vulnerable road users require ample space to account for sudden maneuvers or wind gusts.',
      es: 'VERDADERO. Los ciclistas son usuarios vulnerables y requieren márgenes de seguridad amplios.',
      de: 'RICHTIG. Zweiradfahrer sind besonders gefährdet und bedürfen ausreichendem Sicherheitsabstand.'
    }
  },

  {
    id: 'q5',
    topicId: 'segnaletica-stradale',
    category: 'all',
    countries: ['IT', 'FR', 'ES', 'DE', 'UK', 'CI'],
    type: 'true-false',
    question: {
      it: 'Il segnale di STOP (ottagonale rosso) obbliga ad arrestare il veicolo soltanto quando si avvistano altri veicoli che sopraggiungono sulla strada che si incrocia.',
      fr: 'Le panneau STOP n\'oblige à immobiliser le véhicule que si d\'autres usagers arrivent sur la voie perpendiculaire.',
      en: 'A STOP sign only requires stopping if there is visible oncoming traffic on the crossing road.',
      es: 'La señal de STOP solo obliga a detenerse cuando se observa que vienen vehículos por la vía transversal.',
      de: 'Ein Stoppschild verpflichtet nur dann zum Anhalten, wenn auf der Querstraße Fahrzeuge zu sehen sind.'
    },
    options: {
      it: [{ id: 'true', text: 'VERO' }, { id: 'false', text: 'FALSO' }],
      fr: [{ id: 'true', text: 'VRAI' }, { id: 'false', text: 'FAUX' }],
      en: [{ id: 'true', text: 'TRUE' }, { id: 'false', text: 'FALSE' }],
      es: [{ id: 'true', text: 'VERDADERO' }, { id: 'false', text: 'FALSO' }],
      de: [{ id: 'true', text: 'RICHTIG' }, { id: 'false', text: 'FALSCH' }]
    },
    correctAnswer: 'false',
    points: 5,
    isTricky: true,
    explanation: {
      it: 'FALSO. Il segnale di STOP impone l\'arresto COMPLETO in OGNI CASO, anche se la visuale è ottima e la strada è completamente sgombra da altri veicoli.',
      fr: 'FAUX. L\'arrêt au panneau STOP est ABSOLU et obligatoire même si la route est totalement déserte.',
      en: 'FALSE. A STOP sign requires an unconditional, complete vehicle standstill under all circumstances.',
      es: 'FALSO. La detención ante una señal de STOP es OBLIGATORIA siempre, incluso con visibilidad total y calzada vacía.',
      de: 'FALSCH. Das Stoppschild schreibt ausnahmslos bei jedem Herannahen vollständigen Stillstand vor.'
    }
  },

  {
    id: 'q6',
    topicId: 'alcol-droghe-punti',
    category: 'all',
    countries: ['IT', 'FR', 'ES', 'DE', 'UK', 'CI'],
    type: 'true-false',
    question: {
      it: 'Per i neopatentati (nei primi tre anni dal conseguimento della patente) il tasso alcolemico consentito alla guida è pari a zero (0,0 g/l).',
      fr: 'Pour les jeunes conducteurs en permis probatoire, le taux maximal d\'alcoolémie légal est strictement fixé à 0,2 g/l (tolérance zéro, aucun verre toléré).',
      en: 'For novice drivers during their probationary period, the legal blood alcohol limit is virtually zero (0.0 g/l or 0.2 g/l zero-tolerance).',
      es: 'Para los conductores noveles durante sus primeros años, rige la tasa cero o reducida estricta sin margen para consumir alcohol.',
      de: 'Für Fahranfänger in der zweijährigen Probezeit gilt eine strikte 0,0-Promille-Grenze.'
    },
    options: {
      it: [{ id: 'true', text: 'VERO' }, { id: 'false', text: 'FALSO' }],
      fr: [{ id: 'true', text: 'VRAI' }, { id: 'false', text: 'FAUX' }],
      en: [{ id: 'true', text: 'TRUE' }, { id: 'false', text: 'FALSE' }],
      es: [{ id: 'true', text: 'VERDADERO' }, { id: 'false', text: 'FALSO' }],
      de: [{ id: 'true', text: 'RICHTIG' }, { id: 'false', text: 'FALSCH' }]
    },
    correctAnswer: 'true',
    points: 4,
    isTricky: false,
    explanation: {
      it: 'VERO. Per i neopatentati e i professionisti del trasporto vale il principio della tolleranza zero (0,0 g/litro di sangue).',
      fr: 'VRAI. En France, le seuil de 0,2 g/l pour les jeunes conducteurs équivaut à zéro verre d\'alcool.',
      en: 'TRUE. Strict zero-tolerance policies apply to beginner and commercial drivers across European jurisdictions.',
      es: 'VERDADERO. Los conductores noveles y menores están sujetos a tolerancia cero para garantizar la seguridad vial.',
      de: 'RICHTIG. In Deutschland gilt für Fahranfänger in der Probezeit sowie für alle unter 21 Jahren absolutes Alkoholverbot (0,0 Promille).'
    }
  },

  {
    id: 'q7',
    topicId: 'parcheggi-manovre',
    category: 'B',
    countries: ['IT', 'FR', 'ES', 'DE', 'UK', 'CI'],
    type: 'true-false',
    question: {
      it: 'Durante l\'esecuzione della manovra di parcheggio in retromarcia, è vietato utilizzare gli specchietti retrovisori esterni, dovendo fare affidamento esclusivamente sul lunotto posteriore.',
      fr: 'Lors d\'un créneau en marche arrière, il est interdit de regarder dans les rétroviseurs latéraux.',
      en: 'During reverse parallel parking, drivers are forbidden from using side wing mirrors and must only look through the rear windscreen.',
      es: 'Al aparcar marcha atrás está prohibido mirar los retrovisores laterales, debiendo mirar solo por la luna trasera.',
      de: 'Beim Rückwärtseinparken dürfen Außenspiegel nicht benutzt werden.'
    },
    options: {
      it: [{ id: 'true', text: 'VERO' }, { id: 'false', text: 'FALSO' }],
      fr: [{ id: 'true', text: 'VRAI' }, { id: 'false', text: 'FAUX' }],
      en: [{ id: 'true', text: 'TRUE' }, { id: 'false', text: 'FALSE' }],
      es: [{ id: 'true', text: 'VERDADERO' }, { id: 'false', text: 'FALSO' }],
      de: [{ id: 'true', text: 'RICHTIG' }, { id: 'false', text: 'FALSCH' }]
    },
    correctAnswer: 'false',
    points: 3,
    isTricky: true,
    explanation: {
      it: 'FALSO. Gli specchietti laterali sono INDISPENSABILI per controllare l\'avvicinamento al marciapiede e la presenza di ostacoli o pedoni nell\'angolo cieco!',
      fr: 'FAUX. Les rétroviseurs latéraux sont essentiels pour évaluer l\'écartement avec le trottoir et les obstacles.',
      en: 'FALSE. Side mirrors and direct shoulder checks are essential components of safe reversing maneuvers.',
      es: 'FALSO. Los retrovisores son imprescindibles para calcular la proximidad al bordillo sin golpearlo.',
      de: 'FALSCH. Die Benutzung aller Spiegel sowie der Schulterblick sind Pflicht bei Rückwärtsmanövern.'
    }
  },

  {
    id: 'q8',
    topicId: 'veicoli-pesanti-moto',
    category: 'all',
    countries: ['IT', 'FR', 'ES', 'DE', 'UK', 'CI'],
    type: 'true-false',
    question: {
      it: 'Il conducente di un autocarro soggetto all\'uso del cronotachigrafo (patente C/CQC) deve interrompere la guida dopo 4 ore e mezza con una pausa ininterrotta di almeno 45 minuti.',
      fr: 'Le conducteur d\'un poids lourd soumis au tachygraphe doit obligatoirement respecter une pause d\'au moins 45 minutes après 4h30 de conduite continue.',
      en: 'Commercial heavy goods drivers (HGV / CPC) must take an uninterrupted break of at least 45 minutes after 4.5 hours of driving.',
      es: 'El conductor de un camión con tacógrafo debe realizar una pausa ininterrumpida de al menos 45 minutos tras 4 horas y media de conducción.',
      de: 'Lkw-Fahrer müssen nach spätestens 4,5 Stunden Lenkzeit eine ununterbrochene Fahrtunterbrechung von mindestens 45 Minuten einlegen.'
    },
    options: {
      it: [{ id: 'true', text: 'VERO' }, { id: 'false', text: 'FALSO' }],
      fr: [{ id: 'true', text: 'VRAI' }, { id: 'false', text: 'FAUX' }],
      en: [{ id: 'true', text: 'TRUE' }, { id: 'false', text: 'FALSE' }],
      es: [{ id: 'true', text: 'VERDADERO' }, { id: 'false', text: 'FALSO' }],
      de: [{ id: 'true', text: 'RICHTIG' }, { id: 'false', text: 'FALSCH' }]
    },
    correctAnswer: 'true',
    points: 4,
    isTricky: false,
    explanation: {
      it: 'VERO. Regolamento CE 561/2006: dopo 4h 30m di guida consecutiva è obbligatoria una pausa di almeno 45 minuti (oppure 15m + 30m).',
      fr: 'VRAI. La réglementation européenne impose 45 minutes de pause (ou fractionnée en 15 min puis 30 min) après 4h30 au volant.',
      en: 'TRUE. EU Regulation 561/2006 mandates a minimum 45-minute pause after 4.5 hours behind the wheel.',
      es: 'VERDADERO. La normativa comunitaria exige 45 minutos ininterrumpidos o divididos en 15 y 30 minutos.',
      de: 'RICHTIG. Die EU-Sozialvorschriften schreiben genau 45 Minuten Pause nach 4,5 Stunden Lenkzeit vor.'
    }
  }
];
