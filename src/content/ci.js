// Côte d'Ivoire – Code de la route (préparation au permis A/B). Français + anglais.
// [q_fr, q_en, options_fr[], options_en[], bonnes[], expl_fr, expl_en, panneau?]

export default [
  {
    id: 'ci-1', n: 1, icon: '🪧', signCat: 'pericolo',
    t: ['La signalisation routière', 'Road signs'],
    lessons: [
      { h: ['Formes et couleurs', 'Shapes and colours'], b: [
`La Côte d'Ivoire applique la signalisation de type **Convention de Vienne**, proche de celle de la France :
- **Triangle à bord rouge** : danger. **Triangle pointe en bas** : cédez le passage. **Octogone rouge** : STOP.
- **Cercle à bord rouge** : interdiction. **Cercle bleu** : obligation.
- **Carré ou rectangle bleu** : indication. **Fond jaune** : signalisation temporaire (travaux).
- Les injonctions des **agents** (police, gendarmerie) priment sur les feux et les panneaux.`,
`Côte d'Ivoire uses **Vienna Convention** signs, similar to France:
- **Red-bordered triangle**: danger. **Inverted triangle**: give way. **Red octagon**: STOP.
- **Red-bordered circle**: prohibition. **Blue circle**: obligation.
- **Blue square/rectangle**: information. **Yellow**: temporary (roadworks).
- **Officers'** signals override lights and signs.`] }
    ],
    q: [
      ['Un panneau triangulaire à bord rouge signale :', 'A red-bordered triangle signals:', ['un danger', 'une obligation', 'une indication'], ['a danger', 'an obligation', 'information'], [0], 'Panneau de danger.', 'Warning sign.', 'curva-dx'],
      ['Ce panneau m\'oblige à :', 'This sign requires me to:', ['marquer l\'arrêt à la ligne', 'ralentir seulement', 'klaxonner'], ['stop at the line', 'only slow down', 'hoot'], [0], 'STOP : arrêt obligatoire.', 'STOP: compulsory stop.', 'stop'],
      ['Un panneau rond à fond bleu indique :', 'A round blue sign indicates:', ['une obligation', 'une interdiction', 'un danger'], ['an obligation', 'a prohibition', 'a danger'], [0], 'Exemple : direction obligatoire.', 'E.g. compulsory direction.', 'direzione-diritto'],
      ['Ce panneau signifie :', 'This sign means:', ['sens interdit', 'stationnement interdit', 'route prioritaire'], ['no entry', 'no parking', 'priority road'], [0], 'Interdiction d\'entrer.', 'No entry.', 'senso-vietato'],
      ['Qui doit-on écouter en priorité ?', 'Whom must you obey first?', ['l\'agent de circulation', 'le feu tricolore', 'le panneau'], ['the traffic officer', 'the traffic light', 'the sign'], [0], 'Agent > feux > panneaux.', 'Officer > lights > signs.'],
      ['Ce panneau annonce :', 'This sign warns of:', ['un passage pour piétons', 'une école', 'un arrêt de bus'], ['a pedestrian crossing', 'a school', 'a bus stop'], [0], 'Céder le passage aux piétons.', 'Give way to pedestrians.', 'attraversamento-pedonale']
    ]
  },
  {
    id: 'ci-2', n: 2, icon: '✖️', signCat: 'precedenza', incroci: true,
    t: ['Les règles de priorité', 'Priority rules'],
    lessons: [
      { h: ['Qui passe en premier ?', 'Who goes first?'], b: [
`- **Priorité à droite** en l'absence de signalisation.
- **Cédez le passage** : céder à droite et à gauche ; **STOP** : arrêt complet obligatoire.
- **Route prioritaire** (losange jaune) jusqu'au panneau de fin.
- **Rond-point / carrefour giratoire** : avec cédez-le-passage à l'entrée, les véhicules déjà engagés sont prioritaires.
- **Véhicules d'urgence** (sirène, gyrophare) : leur laisser le passage.
- En tournant à gauche, céder le passage aux véhicules qui arrivent en face.`,
`- **Priority to the right** without signs.
- **Give way**: yield both sides; **STOP**: full stop.
- **Priority road** (yellow diamond) until the end sign.
- **Roundabout**: with give way at the entry, vehicles already on it have priority.
- **Emergency vehicles**: let them pass.
- Turning left, give way to oncoming traffic.`] }
    ],
    q: [
      ['À une intersection sans panneau, je cède le passage :', 'At an unsigned junction I give way:', ['aux véhicules venant de droite', 'aux véhicules venant de gauche', 'aux véhicules les plus gros'], ['to vehicles from the right', 'to vehicles from the left', 'to the biggest vehicles'], [0], 'Priorité à droite.', 'Priority to the right.', 'incrocio-destra'],
      ['Je tourne à gauche, un véhicule arrive en face tout droit :', 'I turn left; a vehicle comes straight from the opposite side:', ['je le laisse passer', 'je passe en premier', 'je klaxonne'], ['I let it pass', 'I go first', 'I hoot'], [0], 'Les trajectoires se coupent.', 'Paths cross.'],
      ['Ce panneau indique :', 'This sign indicates:', ['route prioritaire', 'fin de route prioritaire', 'danger'], ['priority road', 'end of priority road', 'danger'], [0], 'Losange jaune.', 'Yellow diamond.', 'diritto-precedenza'],
      ['Une ambulance arrive avec sirène et gyrophare :', 'An ambulance approaches with siren and lights:', ['je facilite son passage', 'je l\'ignore', 'je la suis'], ['I let it through', 'I ignore it', 'I follow it'], [0], 'Se ranger prudemment.', 'Pull over safely.'],
      ['Ce panneau m\'impose :', 'This sign requires me to:', ['de céder le passage, arrêt si nécessaire', 'de m\'arrêter toujours', 'd\'accélérer'], ['to give way, stop if needed', 'to always stop', 'to speed up'], [0], 'Cédez le passage.', 'Give way.', 'dare-precedenza']
    ]
  },
  {
    id: 'ci-3', n: 3, icon: '⏱️', signCat: 'divieto',
    t: ['Vitesse et dépassement', 'Speed and overtaking'],
    lessons: [
      { h: ['Limitations rappelées par le Ministère des Transports (2025)', 'Limits restated by the Ministry (2025)'], b: [
`Pour les **véhicules légers** (rappel du Ministère des Transports, août 2025 — à vérifier auprès de votre auto-école, des panneaux locaux pouvant imposer moins) :
- **70 km/h** en agglomération ;
- **110 km/h** sur les routes nationales ;
- **120 km/h** sur autoroute.
Autocars : 50 km/h en agglomération, 90 km/h hors agglomération. Camions de plus de 16 t : 50 km/h en agglomération, 80 km/h hors agglomération.

**Dépassement** : par la gauche, après avoir vérifié rétroviseurs et angle mort, jamais en virage, au sommet d'une côte ou sur une ligne continue. Le véhicule dépassé ne doit pas accélérer.`,
`For **light vehicles** (Ministry reminder, August 2025 — check with your driving school, local signs may set lower limits):
- **70 km/h** in towns;
- **110 km/h** on national roads;
- **120 km/h** on motorways.
Coaches: 50 / 90 km/h. Lorries over 16 t: 50 / 80 km/h.

**Overtaking**: on the left after mirrors and blind spot; never on bends, crests or across a continuous line. The overtaken vehicle must not speed up.`] }
    ],
    q: [
      ['Selon le rappel du Ministère des Transports (2025), un véhicule léger en agglomération est limité à :', 'Per the 2025 Ministry reminder, light vehicles in towns are limited to:', ['50 km/h', '70 km/h', '90 km/h'], ['50 km/h', '70 km/h', '90 km/h'], [1], 'Sauf panneau imposant une vitesse inférieure.', 'Unless signs set lower.'],
      ['Sur autoroute, un véhicule léger est limité à :', 'On motorways light vehicles are limited to:', ['110 km/h', '120 km/h', '130 km/h'], ['110 km/h', '120 km/h', '130 km/h'], [1], 'Rappel ministériel 2025.', '2025 reminder.', 'autostrada'],
      ['Je peux dépasser :', 'I may overtake:', ['par la gauche quand la voie est libre', 'dans un virage', 'en franchissant une ligne continue'], ['on the left when clear', 'on a bend', 'across a continuous line'], [0], 'Jamais sans visibilité.', 'Never without visibility.'],
      ['Quand un véhicule me dépasse :', 'When someone overtakes me:', ['je n\'accélère pas', 'j\'accélère', 'je me déporte à gauche'], ['I do not speed up', 'I speed up', 'I move left'], [0], 'Faciliter le dépassement.', 'Help them pass.'],
      ['Ce panneau limite la vitesse à :', 'This sign limits speed to:', ['50 km/h', '30 km/h', '70 km/h'], ['50 km/h', '30 km/h', '70 km/h'], [0], 'Vitesse maximale autorisée.', 'Maximum speed.', 'limite-velocita']
    ]
  },
  {
    id: 'ci-4', n: 4, icon: '🧍',
    t: ['Le conducteur et la sécurité', 'The driver and safety'],
    lessons: [
      { h: ['Comportements à risque', 'Risky behaviours'], b: [
`- **Ceinture de sécurité** obligatoire ; **casque** obligatoire pour les conducteurs et passagers de deux-roues motorisés.
- **Téléphone** tenu en main interdit au volant.
- **Alcool et drogues** : diminuent les réflexes, élargissent le temps de réaction et entraînent de lourdes sanctions (suspension du permis, amendes).
- **Fatigue** : faire une pause toutes les 2 heures sur les longs trajets.
- **Surcharge** de passagers ou de marchandises interdite : elle déséquilibre le véhicule et allonge le freinage.`,
`- **Seat belt** compulsory; **helmet** compulsory for riders and passengers of motorbikes.
- **Hand-held phone** forbidden while driving.
- **Alcohol and drugs** slow reactions and bring heavy penalties.
- **Fatigue**: break every 2 hours on long trips.
- **Overloading** passengers or goods is forbidden: it unbalances the vehicle and lengthens braking.`] }
    ],
    q: [
      ['Le casque est obligatoire :', 'The helmet is compulsory:', ['pour le conducteur et le passager d\'une moto', 'seulement pour le conducteur', 'seulement sur autoroute'], ['for rider and passenger', 'only for the rider', 'only on motorways'], [0], 'Il réduit fortement les blessures à la tête.', 'It greatly reduces head injuries.'],
      ['Téléphoner avec le téléphone en main au volant :', 'Using a hand-held phone while driving:', ['est interdit', 'est autorisé à faible vitesse', 'est autorisé en ville'], ['is forbidden', 'is allowed at low speed', 'is allowed in town'], [0], 'Source majeure de distraction.', 'Major distraction.'],
      ['L\'alcool :', 'Alcohol:', ['augmente le temps de réaction', 'améliore la vision', 'n\'a pas d\'effet'], ['increases reaction time', 'improves vision', 'has no effect'], [0], 'Ne buvez pas si vous conduisez.', 'Don\'t drink and drive.'],
      ['Surcharger un véhicule :', 'Overloading a vehicle:', ['allonge la distance de freinage', 'améliore la stabilité', 'est autorisé pour les taxis'], ['lengthens braking distance', 'improves stability', 'is allowed for taxis'], [0], 'Et le rend instable.', 'And makes it unstable.'],
      ['La ceinture de sécurité :', 'The seat belt:', ['est obligatoire à l\'avant et à l\'arrière', 'est facultative en ville', 'ne concerne que le conducteur'], ['is compulsory front and rear', 'is optional in town', 'only for the driver'], [0], 'Pour tous les occupants.', 'For all occupants.']
    ]
  },
  {
    id: 'ci-5', n: 5, icon: '🚑',
    t: ['Documents, véhicule et accident', 'Documents, vehicle and accidents'],
    lessons: [
      { h: ['À bord et en cas d\'accident', 'On board and after a crash'], b: [
`- **Documents** à présenter : permis de conduire, **carte grise**, attestation d'**assurance** et certificat de **visite technique** en cours de validité.
- **Entretien** : pneus en bon état, freins, éclairage, essuie-glaces.
- **Accident** : protéger (feux de détresse, **triangle**), alerter les secours, ne pas déplacer les blessés sauf danger, ne pas enlever le casque d'un motard, ne rien donner à boire.
- **Numéros d'urgence** : **185** (SAMU), **180** (sapeurs-pompiers), **110 / 111 / 170** (police).`,
`- **Documents**: licence, **registration card**, **insurance** certificate and valid **technical inspection** certificate.
- **Maintenance**: tyres, brakes, lights, wipers.
- **Accident**: protect (hazard lights, **triangle**), alert, do not move casualties unless in danger, do not remove a rider's helmet, nothing to drink.
- **Emergency numbers**: **185** (SAMU), **180** (fire brigade), **110 / 111 / 170** (police).`] }
    ],
    q: [
      ['Lors d\'un contrôle, je présente :', 'At a roadside check I show:', ['le permis de conduire', 'la carte grise et l\'assurance', 'mon passeport uniquement'], ['my licence', 'registration and insurance', 'only my passport'], [0, 1], 'Ainsi que la visite technique.', 'Plus the technical inspection.'],
      ['Le numéro du SAMU en Côte d\'Ivoire est le :', 'The SAMU number in Côte d\'Ivoire is:', ['185', '112', '911'], ['185', '112', '911'], [0], 'Pompiers : 180.', 'Fire: 180.'],
      ['Après un accident, je dois d\'abord :', 'After an accident I must first:', ['protéger les lieux', 'déplacer les blessés', 'quitter les lieux'], ['protect the scene', 'move the injured', 'leave'], [0], 'Protéger, alerter, secourir.', 'Protect, alert, help.'],
      ['Un motard blessé est au sol :', 'An injured rider is on the ground:', ['je ne retire pas son casque', 'je retire son casque', 'je le relève'], ['I do not remove the helmet', 'I remove the helmet', 'I lift him up'], [0], 'Risque de lésion de la colonne.', 'Spinal injury risk.'],
      ['Le numéro des sapeurs-pompiers est le :', 'The fire brigade number is:', ['180', '185', '170'], ['180', '185', '170'], [0], 'SAMU 185, police 110/111/170.', 'SAMU 185, police 110/111/170.']
    ]
  }
];
