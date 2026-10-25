// Comprehensive Driving Theory Database with Simple Explanations, Illustrations & Exam Traps

export const THEORY_TOPICS = [
  {
    id: 'precedenze-incroci',
    category: 'all',
    icon: '🚸',
    image: '/images/intersection_priority.jpg',
    title: {
      it: 'Regole di Precedenza e Incroci Stradali',
      fr: 'Règles de Priorité et Franchissement des Intersections',
      en: 'Right of Way & Intersection Rules',
      es: 'Prioridad de Paso e Intersecciones',
      de: 'Vorfahrt und Kreuzungsregeln'
    },
    summary: {
      it: 'Come capire subito l\'ordine di transito nei bivi, agli stop, alle rotatorie e agli incroci a 4 bracci.',
      fr: 'Identifier immédiatement l\'ordre de passage aux intersections, ronds-points et feux tricolores.',
      en: 'Master right-of-way order at crossroads, stop signs, and roundabouts without hesitation.',
      es: 'Aprende a determinar de un vistazo el orden de paso en cruces, glorietas y señales de stop.',
      de: 'Vorfahrtsregeln an Kreuzungen, Kreisverkehren und Ampeln fehlerfrei beherrschen.'
    },
    sections: [
      {
        heading: {
          it: '1. La Regola Cardine: La Destra Libera',
          fr: '1. La Règle Fondamentale : La Priorité à Droite',
          en: '1. The Fundamental Rule: Yield to the Right',
          es: '1. La Regla de Oro: Prioridad a la Derecha',
          de: '1. Die Grundregel: Rechts vor Links'
        },
        content: {
          it: `Salvo diversa segnalazione (segnale di STOP o DARE PRECEDENZA), chi proviene da una strada ha l'obbligo di dare la precedenza ai veicoli che provengono da destra.
          
          **Come risolvere qualsiasi incrocio in 3 passaggi:**
          1. **Mettiti alla guida di ciascun veicolo** e guarda la sua traiettoria verso la propria destra.
          2. **Identifica il primo veicolo che ha la destra libera** da qualsiasi traiettoria d'intersezione. Quel veicolo parte per primo.
          3. **Rivaluta la situazione:** una volta transitato il primo veicolo, la destra di un secondo veicolo si libera, permettendogli di transitare, e così via fino all'ultimo.`,
          fr: `En l'absence de signalisation (panneau STOP, Cédez le passage ou feu), vous devez obligatoirement céder le passage à tout véhicule arrivant par votre droite.
          
          **Méthode infaillible en 3 étapes :**
          1. Prenez la perspective de chaque conducteur et vérifiez sa droite immédiate.
          2. Repérez le véhicule dont la trajectoire droite n'est coupée par personne : il s'engage en premier.
          3. Les véhicules restants s'engagent successivement dès que leur droite est dégagée.`,
          en: `Unless signs indicate otherwise (STOP, Give Way / Yield), drivers must yield to vehicles approaching from the right.
          
          **3-Step Intersection Solver:**
          1. View the junction from the perspective of each driver.
          2. Find the car whose right turn or straight path is completely clear of incoming traffic: it goes first.
          3. As soon as that car clears the junction, the next driver's right becomes clear, clearing the entire intersection smoothly.`,
          es: `En ausencia de señalización expresa, todo conductor está obligado a ceder el paso a los vehículos que se aproximen por su derecha.
          
          **Método infalible en 3 pasos:**
          1. Analiza el cruce desde la posición de cada vehículo y mira hacia su derecha.
          2. Localiza el vehículo que tiene la derecha totalmente libre: es el primero en cruzar.
          3. Tras su paso, el siguiente vehículo queda con la derecha libre y puede avanzar.`,
          de: `Sofern keine Verkehrszeichen die Vorfahrt regeln, gilt an Kreuzungen und Einmündungen ausnahmslos "Rechts vor Links".
          
          **Die 3-Schritte-Lösung für jede Prüfungskreuzung:**
          1. Versetze dich in die Perspektive jedes Fahrers und prüfe dessen rechte Seite.
          2. Das Fahrzeug mit freier rechter Spur fährt als Erstes.
          3. Nach dessen Durchfahrt wird die rechte Seite des nächsten Fahrzeugs frei.`
        }
      },
      {
        heading: {
          it: '2. Rotatorie (Rondò) & Segnali Speciali',
          fr: '2. Giratoires et Ronds-Points',
          en: '2. Roundabouts & Special Priority Signs',
          es: '2. Glorietas y Rotondas',
          de: '2. Kreisverkehr und Vorfahrtszeichen'
        },
        content: {
          it: `Nelle rotatorie moderne (alla francese, con segnale "Dare Precedenza" all'ingresso), **ha sempre la precedenza chi è già inserito all'interno dell'anello** rispetto a chi si immette. Chi entra deve dare la precedenza a chi proviene da sinistra.
          
          **Chi ha la precedenza assoluta:**
          - I **veicoli su rotaia (Tram)**, salvo diversa segnalazione.
          - I **veicoli di soccorso e polizia in servizio urgente** (sirena bitonale + lampeggianti blu accesi). Quando sopraggiungono, tutti i veicoli devono accostare a destra e arrestarsi se necessario.`,
          fr: `Sur les carrefours à sens giratoire (panneau rond bleu avec flèches blanches et Cédez-le-passage à l'entrée), **les usagers circulant sur l'anneau ont la priorité absolue**.
          
          **Priorités absolues en toute circonstance :**
          - Les **tramways** ont toujours la priorité.
          - Les **véhicules d'intérêt général prioritaires** (pompiers, SAMU, police) avec avertisseur deux-tons et gyrophares bleus : dégagez immédiatement la chaussée et arrêtez-vous si nécessaire.`,
          en: `In modern roundabouts, **vehicles already circulating inside the ring have absolute priority** over drivers entering the roundabout.
          
          **Special Priority Exceptions:**
          - **Trams / light rail vehicles** almost always have priority over regular road vehicles.
          - **Emergency vehicles** (police, fire, ambulance) using blue lights and sirens have immediate right of way: pull over safely to let them pass.`,
          es: `En las glorietas señalizadas, **tienen preferencia los vehículos que ya circulan dentro del anillo**. Los vehículos que van a entrar deben ceder el paso a su izquierda.
          
          **Vehículos con prioridad absoluta:**
          - Vehículos sobre raíles (Tranvías).
          - Vehículos de emergencia y policía con señales luminosas y acústicas de urgencia activadas.`,
          de: `Im Kreisverkehr mit dem Schild "Vorfahrt gewähren" haben **die Fahrzeuge im Kreis Vorrang**. Wer einfährt, muss Vorfahrt gewähren.
          
          **Höchste Priorität im Verkehr:**
          - Schienenfahrzeuge (Straßenbahnen).
          - Einsatzfahrzeuge (Polizei, Feuerwehr, Rettungsdienst) mit Blaulicht und Martinshorn.`
        }
      }
    ],
    goldenRules: [
      { it: 'Non dare mai per scontato che l\'altro si fermi: rallenta sempre prima di impegnare l\'incrocio.', fr: 'Ralentissez toujours à l\'approche d\'une intersection même si vous avez la priorité.', en: 'Always decelerate on approach to any junction even when you have priority.', es: 'Modera siempre la velocidad al aproximarte a un cruce, aunque tengas preferencia.', de: 'Nähere dich jeder Kreuzung stets bremsbereit und mit mäßiger Geschwindigkeit.' },
      { it: 'Chi svolta a sinistra deve SEMPRE dare la precedenza a chi proviene di fronte.', fr: 'Pour tourner à gauche, vous devez toujours céder le passage aux véhicules venant d\'en face.', en: 'When turning across oncoming traffic (e.g. left in EU/US), you must yield to oncoming vehicles.', es: 'Al girar a la izquierda, debes ceder el paso a los vehículos que circulan de frente.', de: 'Wer nach links abbiegen will, muss entgegenkommende Fahrzeuge zuerst durchfahren lassen.' }
    ],
    examTrap: {
      it: 'Attenzione alle domande con le parole "SEMPRE" o "IN OGNI CASO". Esempio: "Il conducente che impegna un incrocio ha SEMPRE la precedenza se proviene da destra" -> FALSO! Se ha un segnale di STOP o se incontra un tram o un\'ambulanza con sirena, non ha la precedenza!',
      fr: 'Attention aux adverbes absolus ("TOUJOURS", "JAMAIS"). Exemple : "Le conducteur arrivant à droite a TOUJOURS la priorité" -> FAUX s\'il rencontre un panneau STOP ou un véhicule prioritaire gyrophare actif !',
      en: 'Beware of absolute qualifiers like "ALWAYS" or "NEVER". Right of way is not absolute; if you face a STOP sign or an emergency vehicle, you must yield regardless of coming from the right.',
      es: 'Cuidado con palabras trampa como "SIEMPRE" o "EN CUALQUIER CASO". El conductor de la derecha NO tiene preferencia si se incorpora desde una vía privada o si tiene señal de STOP.',
      de: 'Achtung bei Wörtern wie "IMMER" oder "IN JEDEM FALL". "Fahrzeuge von rechts haben IMMER Vorfahrt" -> FALSCH, wenn sie aus einer Ausfahrt kommen oder ein Vorfahrt-Gewähren-Schild haben.'
    }
  },

  {
    id: 'distanza-velocita',
    category: 'all',
    icon: '⚡',
    image: '/images/highway_overtaking.jpg',
    title: {
      it: 'Velocità, Distanza di Sicurezza & Spazio d\'Arresto',
      fr: 'Vitesse, Distance de Sécurité & Distance de Freinage',
      en: 'Speed, Following Distance & Stopping Distance',
      es: 'Velocidad, Distancia de Seguridad y Frenado',
      de: 'Geschwindigkeit, Sicherheitsabstand & Anhalteweg'
    },
    summary: {
      it: 'Le formule pratiche e le regole fisiche per calcolare lo spazio di reazione, frenatura e distanza dal veicolo che precede.',
      fr: 'Formules simples pour calculer la distance parcourue pendant le temps de réaction et la distance d\'arrêt.',
      en: 'Simple mental formulas for reaction time, braking distance, and the 2-second safe following rule.',
      es: 'Cálculo de la distancia de reacción, frenado en seco y mojado, y la regla de los dos segundos.',
      de: 'Berechnung von Reaktionsweg, Bremsweg und Gefahrenbremsung nach den offiziellen Formeln.'
    },
    sections: [
      {
        heading: {
          it: '1. Tempo di Reazione e Spazio di Frenatura',
          fr: '1. Temps de Réaction et Distance d\'Arrêt',
          en: '1. Reaction Time & Physical Braking Distance',
          es: '1. Tiempo de Reacción y Distancia de Parada',
          de: '1. Reaktionszeit und Anhalteweg'
        },
        content: {
          it: `Lo **Spazio Totale di Arresto** è la somma di due elementi distinti:
          
          $$\\text{Spazio Totale} = \\text{Spazio di Reazione} + \\text{Spazio di Frenatura}$$
          
          - **Spazio nel Tempo di Reazione:** Il tempo che passa tra la vista del pericolo e l'istante in cui il piede tocca il freno (circa **1 secondo** per un conducente vigile). A 50 km/h si percorrono circa **14 metri** senza ancora frenare! A 130 km/h si percorrono **36 metri al buio** prima di toccare il pedale!
          - **Spazio di Frenatura:** Lo spazio che l'auto impiega per fermarsi dal momento in cui i freni iniziano a lavorare. **Attenzione: lo spazio di frenata NON raddoppia al raddoppiare della velocità, ma aumenta con il QUADRATO della velocità!** Se raddoppi la velocità da 50 a 100 km/h, lo spazio di frenata quadruplica (x4)!
          - **Asfalto bagnato o ghiacciato:** Sull'asfalto bagnato lo spazio di frenatura **raddoppia (x2)**; sulla neve o sul ghiaccio può aumentare di **4 o 10 volte**!`,
          fr: `La **Distance Totale d'Arrêt** est égale à la distance parcourue pendant le temps de réaction + la distance de freinage.
          
          - **Temps de réaction :** Il dure en moyenne **1 seconde**. Règle de calcul mental rapide : prenez le chiffre des dizaines de la vitesse et multipliez-le par 3. À 50 km/h : 5 × 3 = 15 mètres parcourus avant de toucher le frein ! À 130 km/h : 13 × 3 = 39 mètres !
          - **Distance de freinage :** Elle est proportionnelle au **carré de la vitesse**. Si vous doublez votre allure, votre distance de freinage est multipliée par **4** !
          - **Chaussée humide :** La distance de freinage est multipliée par **2 sur sol mouillé**.`,
          en: `The **Total Stopping Distance** consists of two phases:
          
          - **Thinking Distance (Reaction Distance):** Approximately **1 second**. At 30 mph (50 km/h), your car travels 14 meters before your foot even reaches the brake pedal!
          - **Braking Distance:** The physical distance the brakes need to stop the vehicle. Crucial physics rule: **Braking distance increases with the SQUARE of speed** (double the speed = 4x braking distance!).
          - **Wet and Icy Conditions:** On wet roads, braking distances double (x2). In snow or ice, they can increase by up to **10 times**!`,
          es: `La **Distancia Total de Detención** es la suma de la distancia de reacción más la distancia de frenado.
          
          - **Distancia de reacción:** El tiempo medio de reacción de un conductor sobrio es de **1 segundo**.
          - **Distancia de frenado:** Aumenta exponencialmente con el **cuadrado de la velocidad**.
          - **Calzada mojada:** Sobre asfalto mojado o con lluvia, la distancia de frenado se **duplica (x2)**.`,
          de: `Der **Anhalteweg** setzt sich zusammen aus dem Reaktionsweg und dem eigentlichen Bremsweg.
          
          - **Reaktionsweg (Faustformel):** (Geschwindigkeit ÷ 10) × 3.
          - **Bremsweg bei normaler Bremsung:** (Geschwindigkeit ÷ 10) × (Geschwindigkeit ÷ 10).
          - **Gefahrenbremsung:** Bremsweg geteilt durch 2.`
        }
      },
      {
        heading: {
          it: '2. La Regola dei 2 Secondi per la Distanza di Sicurezza',
          fr: '2. La Règle des 2 Secondes',
          en: '2. The Universal 2-Second Following Rule',
          es: '2. La Regla de Seguridad de los Dos Segundos',
          de: '2. Die 2-Sekunden-Regel (Halber Tacho)'
        },
        content: {
          it: `La **distanza di sicurezza minima** deve essere almeno uguale allo spazio percorso durante il tempo di reazione (circa 1 secondo), ma per guidare in sicurezza si deve mantenere una distanza di almeno **2 secondi** dal veicolo che precede.
          
          **Come misurarla su strada senza metro:**
          1. Prendi come riferimento un punto fisso sulla carreggiata (un palo, un cartello, un cavalcavia).
          2. Quando il veicolo che ti precede supera il punto fisso, conta: *"milleuno, milledue"*.
          3. Se la tua auto raggiunge il punto fisso prima che tu abbia finito di contare due secondi, **sei troppo vicino: rallenta e aumenta lo spazio!** In caso di pioggia o nebbia, raddoppia a **4 secondi**!`,
          fr: `La distance minimale de sécurité correspond à la distance parcourue en **2 secondes**.
          
          **Comment la vérifier au volant :**
          1. Repérez un repère visuel fixe (arbre, panneau de pont, borne).
          2. Lorsque le véhicule devant vous passe ce repère, comptez distinctement : *"une seconde, deux secondes"*.
          3. Si vous franchissez le repère avant la fin du décompte, vous êtes trop près : levez le pied immédiatement ! Par temps de pluie, passez à **3 ou 4 secondes**.`,
          en: `Always leave at least a **2-second gap** between you and the vehicle in front.
          
          **How to verify while driving:**
          1. Pick a stationary landmark ahead (bridge, lamp post, road sign).
          2. When the car ahead passes it, count: *"one-thousand-and-one, one-thousand-and-two"*.
          3. If your bumper reaches the landmark before you finish counting, drop back! On wet roads, double this to **4 seconds**.`,
          es: `Mantén siempre un margen de al menos **2 segundos** respecto al vehículo que te antecede (4 segundos con lluvia o pavimento deslizante).`,
          de: `Als Faustregel für den Sicherheitsabstand gilt: **"Halber Tacho in Metern"** (bei 100 km/h = 50 Meter) oder mindestens **2 Sekunden Abstand**!`
        }
      }
    ],
    goldenRules: [
      { it: 'La distanza di sicurezza non è mai fissa: aumenta sempre con la velocità, il carico e la pioggia.', fr: 'La distance de sécurité doit être augmentée proportionnellement à la vitesse et à la dégradation météo.', en: 'Safe following distance is never fixed; it must scale up with speed and wet weather.', es: 'La distancia de seguridad debe incrementarse cuando llueve o disminuye la visibilidad.', de: 'Der Sicherheitsabstand muss bei Nässe, Schnee und schlechter Sicht vergrößert werden.' }
    ],
    examTrap: {
      it: 'Quiz tipico: "La distanza di sicurezza deve essere mantenuta anche rispetto ai ciclomotori e biciclette" -> VERO! "La distanza di sicurezza dipende dal tipo di patente posseduta dal conducente" -> FALSO! Dipende solo dalla velocità, dai riflessi e dalle condizioni dell\'asfalto.',
      fr: 'Piège d\'examen : "La distance de sécurité dépend de l\'expérience du conducteur" -> FAUX ! Les lois de la physique s\'appliquent à tous.',
      en: 'Common test trap: "Stopping distance depends on driver age or license category" -> FALSE! It depends strictly on vehicle speed, road surface friction, and braking system.',
      es: 'Pregunta trampa: "La distancia de frenado aumenta si el conductor tiene sueño" -> ¡FALSO! El sueño aumenta la distancia de REACCIÓN, no la de frenado mecánico.',
      de: 'Prüfungsfalle: "Müdigkeit vergrößert den Bremsweg" -> FALSCH! Müdigkeit vergrößert den REAKTIONSWEG, nicht den mechanischen Bremsweg des Fahrzeugs!'
    }
  },

  {
    id: 'parcheggi-manovre',
    category: 'B',
    icon: '🅿️',
    image: '/images/parking_maneuver.jpg',
    title: {
      it: 'Manovre d\'Esame: Parcheggio a S, Inversione & Retromarcia',
      fr: 'Manœuvres Pratiques : Créneau, Rangement en Épi & Demi-Tour',
      en: 'Practical Driving Manoeuvres: Parallel Parking & Turning',
      es: 'Maniobras de Examen: Estacionamiento en Línea y Marcha Atrás',
      de: 'Fahrprüfung: Parallel Einparken & Wendemanöver'
    },
    summary: {
      it: 'I segreti per eseguire il parcheggio a S al primo colpo durante l\'esame pratico senza toccare il marciapiede.',
      fr: 'La technique géométrique infaillible pour réussir son créneau du premier coup le jour du permis.',
      en: 'Master the 3-step parallel parking method with mirror checks and radar sensor telemetry.',
      es: 'Guía paso a paso para aparcar en línea a la primera sin rozar el bordillo ni exceder el tiempo.',
      de: 'Schritt-für-Schritt-Anleitung für das perfekte Einparken in die Parklücke ohne Bordsteinkontakt.'
    },
    sections: [
      {
        heading: {
          it: '1. Il Parcheggio Parallelo (a S) Step-by-Step',
          fr: '1. Le Créneau Réussi en 3 Mouvements',
          en: '1. The 3-Step Parallel Parking Formula',
          es: '1. Aparcamiento en Línea Perfecto en 3 Pasos',
          de: '1. Die 3-Punkte-Formel für das Längseinparken'
        },
        content: {
          it: `All'esame pratico, l'esaminatore richiede di parcheggiare in retromarcia tra due veicoli mantenendo la vettura a meno di **30 cm dal marciapiede** e senza toccare i paraurti altrui.
          
          **Procedura Collaudata:**
          1. **Fase 1 (Allineamento):** Aziona l'indicatore di direzione destro. Fermati parallelamente all'auto parcheggiata a circa 50-70 cm di distanza, allineando i montanti posteriori delle due auto o gli specchietti retrovisori.
          2. **Fase 2 (Inserimento a 45°):** Innesta la retromarcia. Gira il volante **tutto a destra** e arretra lentamente controllando lo specchietto laterale destro. Continua finché la tua auto forma un angolo di circa **45 gradi** con il marciapiede (nello specchietto sinistro vedrai la targa dell'auto dietro di te).
          3. **Fase 3 (Contro-sterzata e Raddrizzamento):** Gira il volante **tutto a sinistra** e continua ad arretrare a passo d'uomo. La vettura scivolerà dolcemente parallela al marciapiede. Raddrizza le ruote e centra il veicolo tra le due vetture.`,
          fr: `Pour réussir un créneau parfait le jour de l'épreuve pratique :
          
          1. **Étape 1 (Placement) :** Clignotant à droite, arrêtez-vous parallèlement au véhicule garé à environ 50 cm, rétroviseur contre rétroviseur.
          2. **Étape 2 (Braquage à 45°) :** Enclenchez la marche arrière. Braquez les roues à fond vers le trottoir et reculez jusqu'à former un angle de 45° avec le trottoir.
          3. **Étape 3 (Contre-braquage) :** Braquez à fond dans le sens opposé. Contrôlez votre rétroviseur droit pour frôler le trottoir à moins de 20-30 cm sans le heurter. Remettez les roues droites.`,
          en: `To pass the parallel parking manoeuvre in the practical test:
          
          1. **Stage 1 (Positioning):** Signal left/right depending on traffic side. Pull up parallel to the parked target car about 2-3 feet away, matching rear bumpers.
          2. **Stage 2 (Turn in at 45 degrees):** Select reverse gear. Turn wheel full lock toward the curb. Reverse smoothly until your car is at a 45° angle.
          3. **Stage 3 (Lock back & Straighten):** Turn the steering wheel full lock the opposite way to swing the front nose in. Center the vehicle without mounting or harshly nudging the curb.`,
          es: `Aparcar en línea sin fallos:
          
          1. Señaliza con el intermitente y alinea tu eje trasero con el del coche de referencia.
          2. Con la marcha atrás puesta, gira todo el volante hacia la acera y retrocede hasta un ángulo de 45°.
          3. Gira todo el volante al lado contrario para encajar el morro y deja el coche a menos de 30 cm del bordillo.`,
          de: `Perfekt einparken in drei Zügen:
          
          1. Blinker setzen, ca. 50 cm parallel neben das stehende Fahrzeug stellen.
          2. Rückwärtsgang einlegen, voll in Richtung Bordstein einschlagen, bis das Auto im 45°-Winkel steht.
          3. Gegenlenken und das Fahrzeug parallel zur Bordsteinkante ausrichten.`
        }
      }
    ],
    goldenRules: [
      { it: 'Durante la manovra guarda sempre prima gli specchietti e gira la testa per verificare l\'angolo cieco.', fr: 'Avant et pendant la marche arrière, contrôlez vos rétroviseurs et effectuez un contrôle direct de l\'angle mort.', en: 'Always check mirrors and do a direct blind-spot shoulder check before reversing.', es: 'Comprueba retrovisores y ángulo muerto antes de iniciar la marcha atrás.', de: 'Vor und während des Zurücksetzens stets Rundumblick und Schulterblick durchführen.' }
    ],
    examTrap: {
      it: 'Toccare violentemente il marciapiede o salire sopra con la ruota comporta la bocciatura immediata all\'esame pratico! Un tocco leggero ("sfioramento") è tollerato solo se ci si ferma subito e si corregge la manovra in avanti.',
      fr: 'Monter sur le trottoir ou heurter violemment la bordure est éliminatoire à l\'examen pratique !',
      en: 'Mounting the pavement/curb or bumping another car results in an instant serious test fault (failure).',
      es: 'Subir la rueda al bordillo supone falta eliminatoria en el examen práctico de conducir.',
      de: 'Das Aufsitzen auf den Bordstein führt in der praktischen Prüfung zum sofortigen Nichtbestehen!'
    }
  },

  {
    id: 'segnaletica-stradale',
    category: 'all',
    icon: '🛑',
    image: '/images/cockpit_view.jpg',
    title: {
      it: 'Segnaletica Stradale: Pericolo, Divieto, Obbligo & Segnali Luminosi',
      fr: 'Signalisation Routière : Danger, Interdiction, Obligation & Feux',
      en: 'Road Signs Encyclopedia: Danger, Prohibitions, Mandatory & Signals',
      es: 'Señalización Vial: Peligro, Prohibición, Obligación y Semáforos',
      de: 'Verkehrszeichen: Gefahr, Verbot, Gebot & Lichtzeichen'
    },
    summary: {
      it: 'Distingui a colpo d\'occhio forme e colori: triangolari verso l\'alto (pericolo), tondi con bordo rosso (divieto), tondi blu (obbligo).',
      fr: 'Mémorisez les formes et couleurs : triangle rouge (danger), cercle rouge (interdiction), cercle bleu (obligation).',
      en: 'Instantly decode shapes and colors: red triangles (danger), red circles (prohibition), blue circles (mandatory).',
      es: 'Identifica las formas clave: triángulos (peligro), círculos rojos (prohibición), círculos azules (obligación).',
      de: 'Signalformen verstehen: Dreiecke (Gefahrzeichen), rote Kreise (Verbot), blaue Kreise (Gebot).'
    },
    sections: [
      {
        heading: {
          it: '1. Classificazione Internazionale dei Segnali',
          fr: '1. Classification Universelle des Panneaux',
          en: '1. International Classification of Road Signs',
          es: '1. Clasificación Internacional de Señales',
          de: '1. Systematik der Verkehrszeichen'
        },
        content: {
          it: `I segnali verticali si dividono in quattro grandi famiglie:
          
          - **Segnali di Pericolo (Triangolo con vertice in alto e bordo rosso):** Sono posti di norma a **150 metri** prima del pericolo (curva pericolosa, passaggio a livello, dosso, strada sdrucciolevole).
          - **Segnali di Divieto (Circolari con bordo rosso):** Vietano determinate manovre o l'accesso a certe categorie di veicoli (Divieto di accesso, Divieto di sorpasso, Limite massimo di velocità). Valgono dal punto in cui sono posti fino al segnale di fine divieto o fino al primo incrocio.
          - **Segnali di Obbligo (Circolari a fondo blu):** Obbligano a seguire una certa direzione, corsia o velocità minima (Direzione obbligatoria a destra, Pista ciclabile obbligatoria, Catene per la neve obbligatorie).
          - **Segnali di Precedenza (Forme speciali):** Lo **STOP** (Ottagonale a fondo rosso) impone di fermarsi sempre e comunque sulla striscia trasversale d'arresto anche se la strada è libera; il **Dare Precedenza** (Triangolo con vertice in basso) impone di dare la precedenza ai veicoli che transitano sulla strada incrociata senza obbligo di arresto se la via è sgombra.`,
          fr: `Les panneaux sont harmonisés par la Convention de Vienne :
          
          - **Panneaux de Danger (Triangles à bord rouge) :** Placés à **150 m** hors agglomération et à **50 m** en ville.
          - **Panneaux d'Interdiction (Ronds à bord rouge) :** Interdisent un comportement dès leur hauteur jusqu'à la prochaine intersection ou panneau de fin.
          - **Panneaux d'Obligation (Ronds à fond bleu) :** Prescrivent une action obligatoire (direction imposée, allumage des feux, équipement hivernal).
          - **Panneaux de Priorité (Formes uniques) :** Le panneau STOP (octogonal) exige l'arrêt absolu des roues au niveau de la ligne blanche, même sans circulation.`,
          en: `Road signs follow standard shapes:
          
          - **Warning / Danger Signs (Triangles with red borders):** Placed approximately 150 meters ahead on open roads to warn of upcoming hazards.
          - **Prohibitory Signs (Circles with red borders):** Tell you what you MUST NOT do (e.g. No Entry, Maximum Speed Limit, No Overtaking).
          - **Mandatory Signs (Blue circles):** Tell you what you MUST do (e.g. Turn Left, Minimum Speed, Cycle Path only).
          - **Priority Signs:** STOP sign (8 sides / octagon) requires a total and complete stop of the vehicle at the line.`,
          es: `Clasificación según el Código de Tráfico:
          
          - **Peligro (Triángulo):** Avisan de un peligro a 150 metros.
          - **Prohibición (Círculo rojo):** Prohíben una acción a partir de la señal.
          - **Obligación (Círculo azul):** Obligan a seguir un carril o sentido.
          - **STOP (Octógono):** Detención obligatoria total del vehículo.`,
          de: `Einteilung der Verkehrszeichen:
          
          - **Gefahrzeichen (Dreiecke):** Weisen rechtzeitig auf Gefahrenstellen hin.
          - **Vorschriftzeichen (Rote und blaue Kreise):** Verbote und Gebote.
          - **Halt! Vorfahrt gewähren! (Stoppschild):** Vollständiger Stillstand vorgeschrieben.`
        }
      }
    ],
    goldenRules: [
      { it: 'Al segnale di STOP le ruote dell\'auto devono essere COMPLETAMENTE FERME per almeno 2 secondi.', fr: 'Au panneau STOP, les roues du véhicule doivent marquer un arrêt TOTAL et net.', en: 'At a STOP sign, your wheels must come to a COMPLETE stop, not a rolling yield.', es: 'En el STOP, las ruedas deben detenerse por completo; no vale frenar despacio.', de: 'Am Stoppschild muss das Fahrzeug vollständig zum Stillstand gebracht werden.' }
    ],
    examTrap: {
      it: 'Domanda trabocchetto classica: "Il segnale di STOP obbliga a fermarsi solo se sopraggiungono altri veicoli" -> FALSO! Obbliga a fermarsi IN OGNI CASO, anche se la strada è completamente deserta!',
      fr: 'Piège classique : "Le panneau STOP autorise à ralentir sans s\'arrêter si la voie est libre" -> FAUX ! L\'arrêt est obligatoire même de nuit sans aucun véhicule.',
      en: 'Classic exam trap: "You only need to stop at a STOP sign if you see oncoming cars" -> FALSE! Stopping is mandatory under all conditions.',
      es: 'Trampa habitual: "La señal de STOP permite no detenerse si no se aproxima ningún coche" -> ¡FALSO! La detención es obligatoria siempre.',
      de: 'Klassische Fangfrage: "Am Stoppschild muss man nur anhalten, wenn Querverkehr naht" -> FALSCH! Der Halt ist ausnahmslos zwingend vorgeschrieben!'
    }
  },

  {
    id: 'alcol-droghe-punti',
    category: 'all',
    icon: '🍷',
    image: '/images/cockpit_view.jpg',
    title: {
      it: 'Stato Psicofisico: Alcol, Droghe, Sonnolenza & Patente a Punti',
      fr: 'Alcool, Stupéfiants, Fatigue au Volant & Permis à Points',
      en: 'Driver Fitness: Alcohol, Drugs, Fatigue & Penalty Points',
      es: 'Alcohol, Drogas, Distracciones y Permiso por Puntos',
      de: 'Fahrtüchtigkeit: Alkohol, Drogen, Müdigkeit & Punktsystem'
    },
    summary: {
      it: 'Tolleranza zero per neopatentati, effetti sull\'angolo visivo (effetto tunnel) e perdita dei punti della patente.',
      fr: 'Tolérance zéro pour les permis probatoires (0,2 g/l), effet tunnel et barème des retraits de points.',
      en: 'Zero tolerance rules for novice drivers, tunnel vision effects, and penalty point regulations.',
      es: 'Tasa 0,0 para conductores noveles y profesionales, pérdida de reflejos y baremo de puntos.',
      de: '0,0-Promille-Grenze für Fahranfänger, Reaktionsverzögerung und Flensburger Fahreignungsregister.'
    },
    sections: [
      {
        heading: {
          it: '1. Limiti di Tasso Alcolemico e Tolleranza Zero',
          fr: '1. Seuils d\'Alcoolémie et Jeunes Conducteurs',
          en: '1. Blood Alcohol Limits & Zero Tolerance',
          es: '1. Tasas de Alcoholemia y Conductores Noveles',
          de: '1. Promillegrenzen und Fahranfänger'
        },
        content: {
          it: `L'alcol riduce drasticamente i riflessi, aumenta i tempi di reazione, crea una pericolosa falsa sicurezza ("euforia") e provoca il cosiddetto **effetto tunnel visivo** (restringimento del campo visivo laterale).
          
          - **Neopatentati (primi 3 anni di patente) e Conducenti Professionali (CQC, Taxi, Bus, Camion):** **TASSO ZERO ASSOLUTO (0,0 g/l)**. È vietato assumere anche una minima quantità di bevande alcoliche prima di guidare.
          - **Conducenti Ordinari:** Il limite massimo legale è di **0,50 g/l**. Da 0,51 a 0,80 g/l scatta una pesante sanzione pecuniaria e la sospensione della patente da 3 a 6 mesi; oltre 0,80 g/l il fatto costituisce **reato penale** con arresto e confisca del veicolo.
          - **Smartphone e Distrazione:** Usare il cellulare senza vivavoce moltiplica per 4 il rischio di incidente, equivalente a guidare con un tasso alcolemico superiore a 0,8 g/l!`,
          fr: `L'alcool altère la vision périphérique (effet tunnel) et multiplie le temps de réaction :
          
          - **Permis probatoire (3 ans) :** Le seuil est fixé à **0,2 g/l de sang** (soit zéro verre d'alcool toléré !).
          - **Conducteurs confirmés :** Le seuil légal maximal est de **0,5 g/l de sang** (ou 0,25 mg/l d'air expiré). Au-delà de 0,8 g/l, il s'agit d'un délit avec comparution au tribunal correctionnel et suspension de permis.`,
          en: `Alcohol impairs depth perception, slows reflexes and creates dangerous tunnel vision:
          
          - **Novice and Professional Drivers:** Zero tolerance policy (0.0 g/l).
          - **Regular Drivers:** Strict limit (0.5 g/l in most of Europe; 0.2 g/l in novice brackets).
          - **Mobile Phones:** Holding a mobile phone while driving carries immediate hefty fines and penalty points.`,
          es: `Normativa sobre alcohol y drogas:
          
          - **Conductores noveles y profesionales:** Tasa máxima **0,15 mg/l en aire** (0,3 g/l en sangre) y 0,0 para menores.
          - **Conductores en general:** Tasa máxima **0,25 mg/l en aire** (0,5 g/l en sangre).`,
          de: `Alkoholgrenzen im Straßenverkehr:
          
          - **Fahranfänger in der Probezeit (und unter 21 Jahren):** **Strikte 0,0 Promille**!
          - **Allgemeine Grenze:** 0,5 Promille (bereits ab 0,3 Promille bei Fahrfehlern strafbar).`
        }
      }
    ],
    goldenRules: [
      { it: 'Chi guida non beve: un caffè o una doccia fredda NON accelerano lo smaltimento dell\'alcol nel fegato!', fr: 'Un café noir ou une douche froide n\'accélèrent en aucun cas l\'élimination de l\'alcool par le foie.', en: 'Coffee or fresh air will NOT speed up alcohol breakdown by the liver; only time works.', es: 'Tomar café o hacer ejercicio NO elimina el alcohol en sangre; solo el tiempo lo metaboliza.', de: 'Kaffee oder frische Luft senken den Promillewert NICHT schneller; nur Zeit baut Alkohol ab.' }
    ],
    examTrap: {
      it: 'Domanda frequente: "Il caffè amaro permette di smaltire rapidamente l\'alcol prima di mettersi alla guida" -> FALSO! Il fegato smaltisce circa 0,10 - 0,15 g/l all\'ora e nulla può accelerare questo processo biologico!',
      fr: 'Question fréquente : "Boire beaucoup d\'eau permet de faire baisser rapidement le taux d\'alcool" -> FAUX !',
      en: 'Frequent trap: "Energy drinks or strong coffee neutralize the effects of alcohol" -> FALSE!',
      es: 'Pregunta trampa: "Hacer flexiones o beber agua reduce la tasa de alcoholemia antes de soplar" -> ¡FALSO!',
      de: 'Prüfungsfalle: "Starker Kaffee baut Alkohol im Blut schneller ab" -> FALSCH! Nur die Leber baut ca. 0,1 Promille pro Stunde ab.'
    }
  },

  {
    id: 'veicoli-pesanti-moto',
    category: 'all',
    icon: '🚛',
    image: '/images/highway_overtaking.jpg',
    title: {
      it: 'Patenti Speciali: Moto (A/AM), Camion (C) e Autobus (D/CQC)',
      fr: 'Permis Spécifiques : Motos (A/AM), Poids Lourds (C) et Bus (D/FIMO)',
      en: 'Special Categories: Bikes (A/AM), Trucks (C) & Buses (D/CPC)',
      es: 'Permisos Especiales: Motos (A/AM), Camiones (C) y Autobuses (D/CAP)',
      de: 'Sonderklassen: Motorrad (A/AM), Lkw (C) und Busse (D/BKrFQG)'
    },
    summary: {
      it: 'Regole specifiche per due ruote (casco, paraschiena, guida con passeggero) e mezzi pesanti (cronotachigrafo, tempi di guida e riposo).',
      fr: 'Réglementation spécifique des deux-roues et poids lourds (chronotachygraphe, temps de conduite et repos).',
      en: 'Rules for motorcycles (protective gear) and heavy commercial vehicles (tachograph, driving hours).',
      es: 'Normativa para motocicletas y transporte pesado (tacógrafo digital, tiempos de descanso).',
      de: 'Besondere Vorschriften für Zweiräder und Lkw/Busse (digitaler Fahrtenschreiber, Lenk- und Ruhezeiten).'
    },
    sections: [
      {
        heading: {
          it: '1. Specifiche Moto e Ciclomotori (Patenti AM, A1, A2, A)',
          fr: '1. Règles Spécifiques Moto & Deux-Roues',
          en: '1. Motorcycle Specific Regulations',
          es: '1. Normativa Específica para Motos',
          de: '1. Motorrad- und Zweiradvorschriften'
        },
        content: {
          it: `- **Casco protettivo:** Obbligatorio per tutti i conducenti e passeggeri di motocicli e ciclomotori. Deve essere omologato (marchio ECE) e regolarmente allacciato.
          - **Passeggero:** Consentito solo se il certificato di circolazione del mezzo prevede il secondo posto e se il conducente ha compiuto almeno 16 anni. Il passeggero deve avere almeno 5 anni.
          - **Battistrada minimo pneumatici:** 1,0 mm per motoveicoli; 0,5 mm per ciclomotori (per autovetture è 1,6 mm).`,
          fr: `- **Casque et gants homologués :** Obligatoires sous peine d'amende et de retrait de points.
          - **Passager :** Interdit de transporter un enfant de moins de 5 ans sans siège homologué muni de repose-pieds et poignées de maintien.
          - **Profondeur des sculptures de pneus :** 1,0 mm pour les motos.`,
          en: `- **Protective Helmet:** Mandatory, certified (ECE/DOT) and securely fastened.
          - **Pillion Passenger:** Allowed only when pillion seat and footrests are fitted.
          - **Tread Depth:** Minimum 1.0 mm for motorcycles (1.6 mm for passenger cars).`,
          es: `- **Casco homologado:** Obligatorio para conductor y acompañante en todo tipo de vías.
          - **Pasajero:** Mayor de 12 años (o 7 si viaja con padre/madre/tutor).`,
          de: `- **Geeigneter Schutzhelm:** Für Fahrer und Beifahrer gesetzlich vorgeschrieben.
          - **Reifenprofil:** Mindestens 1,0 mm bei Krafträdern.`
        }
      },
      {
        heading: {
          it: '2. Mezzi Pesanti & CQC: Cronotachigrafo e Tempi di Guida',
          fr: '2. Poids Lourds : Chronotachygraphe et Temps de Repos',
          en: '2. Heavy Goods & Passenger Vehicles: Tachograph & Rest Periods',
          es: '2. Tacógrafo y Tiempos de Conducción (C y D)',
          de: '2. Lkw- und Busrecht: Lenk- und Ruhezeiten'
        },
        content: {
          it: `- **Tempo massimo di guida giornaliero:** 9 ore (estendibile a 10 ore per non più di due volte a settimana).
          - **Pausa obbligatoria:** Dopo un periodo di guida di **4 ore e mezza (4h 30m)**, il conducente deve fare una sosta ininterrotta di almeno **45 minuti** (oppure due pause frazionate: una di almeno 15 minuti seguita da una di almeno 30 minuti).
          - **Riposo giornaliero:** Almeno **11 ore consecutive** nell'arco delle 24 ore.`,
          fr: `- **Temps de conduite journalier :** 9 heures maximum (2 fois 10h par semaine).
          - **Pause obligatoire :** 45 minutes après 4h30 de conduite continue.
          - **Repos journalier :** 11 heures consécutives.`,
          en: `- **Daily Driving Limit:** 9 hours (can be extended to 10 hours twice a week).
          - **Mandatory Break:** Minimum 45-minute break after 4.5 hours of driving.
          - **Daily Rest:** 11 consecutive hours.`,
          es: `- **Conducción diaria:** Máximo 9 horas (10 horas dos veces por semana).
          - **Pausa:** 45 minutos tras 4 horas y media de conducción ininterrumpida.`,
          de: `- **Tägliche Lenkzeit:** Maximal 9 Stunden (zweimal pro Woche 10 Stunden).
          - **Lenkzeitunterbrechung:** 45 Minuten Pause nach spätestens 4,5 Stunden Fahrt.`
        }
      }
    ],
    goldenRules: [
      { it: 'Non manomettere mai il cronotachigrafo o i limitatori di velocità: sanzioni penali e revoca della CQC.', fr: 'Toute falsification du chronotachygraphe entraîne de lourdes sanctions pénales.', en: 'Never tamper with tachograph records or speed limiters; doing so constitutes a criminal offense.', es: 'La manipulación del tacógrafo acarrea graves responsabilidades penales.', de: 'Fälschung von Fahrtenschreiberdaten ist eine Straftat und führt zum Führerscheinentzug.' }
    ],
    examTrap: {
      it: 'Attenzione alla domanda: "Dopo 4 ore e mezza di guida consecutiva è sufficiente una pausa di 30 minuti" -> FALSO! La pausa minima deve essere di 45 minuti!',
      fr: 'Piège : "Une pause de 30 minutes suffit après 4h30 de conduite" -> FAUX ! Il faut 45 minutes.',
      en: 'Trap: "A 30-minute break is enough after 4.5 hours driving" -> FALSE! Exactly 45 minutes required.',
      es: 'Pregunta trampa: "Tras 4 horas y media basta una pausa de 30 minutos" -> ¡FALSO! Son 45 minutos.',
      de: 'Fangfrage: "Nach 4,5 Stunden Lenkzeit reicht eine 30-minütige Pause" -> FALSCH! Es müssen 45 Minuten sein.'
    }
  }
];
