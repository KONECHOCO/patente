// France – Code de la route (ETG), 10 thèmes officiels.
// Questions QCM: [q_fr, q_en, options_fr[], options_en[], bonnes_réponses[], expl_fr, expl_en, panneau?]

export default [
  {
    id: 'fr-L', n: 'L', icon: '⚖️', signCat: 'divieto',
    t: ['Dispositions légales en matière de circulation routière', 'Legal provisions on road traffic'],
    lessons: [
      { h: ['Vitesses maximales autorisées', 'Speed limits'], b: [
`Pour les voitures (permis B) :
- **50 km/h** en agglomération (souvent 30 km/h dans les zones 30).
- **80 km/h** sur les routes à double sens sans séparateur central (certains départements sont revenus à 90 km/h, panneaux à l'appui).
- **110 km/h** sur les routes à chaussées séparées et les voies rapides.
- **130 km/h** sur autoroute.

**Par temps de pluie :** 110 km/h sur autoroute, 100 km/h sur route à chaussées séparées, 80 km/h → **70 km/h** ailleurs (selon la vitesse affichée).
**Visibilité inférieure à 50 m :** **50 km/h** partout.
**Jeunes conducteurs (probatoire) :** 110 km/h sur autoroute, 100 km/h sur 2×2 voies, 80 km/h sur les autres routes.`,
`For cars (licence B):
- **50 km/h** in built-up areas (often 30 km/h in 30 zones).
- **80 km/h** on two-way roads without a central divider (some départements returned to 90 km/h, with signs).
- **110 km/h** on dual carriageways.
- **130 km/h** on motorways.

**In rain:** 110 motorway, 100 dual carriageway, 70 on 80 roads.
**Visibility under 50 m:** **50 km/h** everywhere.
**Probationary drivers:** 110 motorway, 100 dual carriageway, 80 elsewhere.`] },
      { h: ['Priorités et intersections', 'Priority and junctions'], b: [
`- **Priorité à droite** : règle générale en l'absence de signalisation.
- **Cédez le passage** : céder aux usagers de la route abordée, arrêt seulement si nécessaire.
- **Stop** : arrêt obligatoire et complet à la ligne, puis céder le passage.
- **Carrefour à sens giratoire** : avec cédez-le-passage à l'entrée, les usagers déjà engagés sur l'anneau sont prioritaires.
- **Feux** : rouge = arrêt ; orange fixe = arrêt sauf si cela est dangereux ; feu jaune clignotant = prudence. Les injonctions d'un agent priment sur les feux et les panneaux.
- **Véhicules prioritaires** (police, gendarmerie, pompiers, SAMU) avec feux bleus et sirène : leur faciliter le passage.`,
`- **Priority to the right**: general rule without signs.
- **Give way**: yield to the road you join, stop only if needed.
- **Stop**: full stop at the line, then give way.
- **Roundabout**: with give way at the entry, users already on the ring have priority.
- **Lights**: red = stop; steady amber = stop unless dangerous; flashing amber = caution. Officers override lights and signs.
- **Priority vehicles** with blue lights and siren: let them through.`] }
    ],
    q: [
      ['En agglomération, sauf indication contraire, la vitesse est limitée à :', 'In built-up areas, unless signed otherwise, the limit is:', ['30 km/h', '50 km/h', '70 km/h'], ['30 km/h', '50 km/h', '70 km/h'], [1], '50 km/h en agglomération, dès le panneau d\'entrée.', '50 km/h from the town entry sign.', 'centro-abitato'],
      ['Sur autoroute, par temps de pluie, je ne dois pas dépasser :', 'On a motorway in rain I must not exceed:', ['130 km/h', '110 km/h', '100 km/h'], ['130 km/h', '110 km/h', '100 km/h'], [1], 'La vitesse maximale passe de 130 à 110 km/h.', 'The limit drops from 130 to 110 km/h.', 'autostrada'],
      ['Avec une visibilité inférieure à 50 m, la vitesse maximale est de :', 'With visibility under 50 m the limit is:', ['50 km/h', '70 km/h', '90 km/h'], ['50 km/h', '70 km/h', '90 km/h'], [0], 'Sur toutes les routes, y compris l\'autoroute.', 'On all roads, including motorways.'],
      ['En permis probatoire, sur autoroute, je suis limité à :', 'On a probationary licence, on motorways, I am limited to:', ['110 km/h', '120 km/h', '130 km/h'], ['110 km/h', '120 km/h', '130 km/h'], [0], 'Les jeunes conducteurs sont limités à 110 km/h.', 'Probationary drivers: 110 km/h.'],
      ['Au panneau STOP :', 'At a STOP sign:', ['je marque un arrêt complet', 'je peux passer sans m\'arrêter si la voie est libre', 'je cède le passage aux usagers de la route abordée'], ['I come to a full stop', 'I may go through without stopping if clear', 'I give way to traffic on the road I join'], [0, 2], 'Arrêt obligatoire à la ligne, puis céder le passage.', 'Compulsory stop, then give way.', 'stop'],
      ['Ce panneau m\'impose :', 'This sign requires me to:', ['de m\'arrêter systématiquement', 'de céder le passage à droite et à gauche', 'de laisser passer uniquement les véhicules venant de droite'], ['always stop', 'give way to both right and left', 'give way only to the right'], [1], 'Cédez le passage : arrêt seulement si nécessaire.', 'Give way: stop only if needed.', 'dare-precedenza'],
      ['En l\'absence de signalisation à une intersection :', 'At an unsigned junction:', ['je laisse passer les véhicules venant de ma droite', 'je laisse passer les véhicules venant de ma gauche', 'le plus rapide passe'], ['I give way to vehicles from my right', 'I give way to vehicles from my left', 'the fastest goes first'], [0], 'C\'est la priorité à droite.', 'Priority to the right.', 'incrocio-destra'],
      ['Le feu orange fixe signifie :', 'Steady amber means:', ['accélérer pour passer', 's\'arrêter, sauf si l\'arrêt est dangereux', 'priorité à droite'], ['speed up to get through', 'stop unless stopping is dangerous', 'priority to the right'], [1], 'L\'orange impose l\'arrêt, sauf freinage dangereux.', 'Amber requires stopping unless unsafe.', 'semaforo-giallo'],
      ['Un agent de circulation me fait signe de passer alors que le feu est rouge :', 'An officer waves me through while the light is red:', ['je passe', 'je reste arrêté', 'je klaxonne'], ['I go', 'I stay stopped', 'I sound the horn'], [0], 'Les injonctions des agents priment sur les feux.', 'Officers override lights.'],
      ['Ce panneau m\'interdit de dépasser :', 'This sign forbids me to overtake:', ['les voitures', 'les motos', 'les cyclistes'], ['cars', 'motorcycles', 'cyclists'], [0], 'Il interdit de dépasser les véhicules à moteur autres que les deux-roues sans side-car.', 'It forbids overtaking motor vehicles other than two-wheelers.', 'divieto-sorpasso'],
      ['Une ligne continue :', 'A continuous line:', ['peut être chevauchée pour dépasser un cycliste', 'ne doit être ni franchie ni chevauchée', 'peut être franchie pour tourner à gauche'], ['may be straddled to pass a cyclist', 'must not be crossed or straddled', 'may be crossed to turn left'], [1], 'La ligne continue est infranchissable.', 'It must never be crossed.', 'striscia-continua'],
      ['Dans un giratoire avec cédez-le-passage à l\'entrée, sont prioritaires :', 'On a roundabout with give way at entry, priority goes to:', ['les véhicules qui entrent', 'les véhicules déjà sur l\'anneau', 'les véhicules venant de droite à l\'entrée'], ['entering vehicles', 'vehicles already on the ring', 'vehicles from the right at entry'], [1], 'Les usagers engagés sur l\'anneau sont prioritaires.', 'Circulating traffic has priority.', 'rotatoria']
    ]
  },

  {
    id: 'fr-C', n: 'C', icon: '🧠',
    t: ['Le conducteur', 'The driver'],
    lessons: [
      { h: ['Alcool, drogues, fatigue', 'Alcohol, drugs, fatigue'], b: [
`- **Taux d'alcool maximal :** 0,5 g/l de sang (0,25 mg/l d'air expiré). **0,2 g/l** pour les **permis probatoires** et les conducteurs de transport en commun.
- Au-delà de **0,8 g/l** : **délit** (jusqu'à 2 ans de prison, retrait de 6 points, suspension).
- L'alcool s'élimine lentement (environ 0,10 à 0,15 g/l par heure) ; ni café ni eau ne l'accélèrent.
- **Stupéfiants** : toute conduite après usage est un délit.
- **Fatigue** : pause toutes les **2 heures** ; les signes (bâillements, paupières lourdes, raideur) imposent de s'arrêter.
- **Téléphone** : interdit tenu en main ; **les écouteurs et oreillettes sont aussi interdits**. Seuls les systèmes mains libres intégrés sont tolérés.`,
`- **Max alcohol:** 0.5 g/l blood (0.25 mg/l breath). **0.2 g/l** for **probationary** and public transport drivers.
- Over **0.8 g/l**: **criminal offence** (up to 2 years' prison, 6 points, suspension).
- Alcohol is eliminated slowly (0.10–0.15 g/l per hour); coffee or water do not help.
- **Drugs**: driving after use is a criminal offence.
- **Fatigue**: break every **2 hours**.
- **Phone**: hand-held forbidden; **earphones and earpieces are also forbidden**. Only built-in hands-free systems are tolerated.`] },
      { h: ['Perception et distances', 'Perception and distances'], b: [
`- **Temps de réaction** : environ **1 seconde** ; plus long avec la fatigue, l'alcool, le téléphone.
- **Distance de sécurité** : au moins **2 secondes** entre deux véhicules (règle des deux traits sur autoroute).
- **Distance d'arrêt** = distance parcourue pendant le temps de réaction + distance de freinage. Sur route sèche, à 90 km/h, elle est d'environ **80 m** ; sur route mouillée elle augmente nettement.
- **Champ visuel** : plus la vitesse augmente, plus il se rétrécit (« effet tunnel »).
- Calcul rapide de la distance parcourue en 1 s : chiffre des dizaines × 3 (90 km/h → 27 m).`,
`- **Reaction time**: about **1 second**; longer with fatigue, alcohol, phone.
- **Safe distance**: at least **2 seconds** (two-chevron rule on motorways).
- **Stopping distance** = reaction + braking. Dry road at 90 km/h about **80 m**; much more when wet.
- **Field of vision** narrows as speed rises ("tunnel effect").
- Quick estimate per second: tens digit × 3 (90 km/h → 27 m).`] }
    ],
    q: [
      ['En permis probatoire, le taux d\'alcool maximal autorisé est de :', 'On a probationary licence the alcohol limit is:', ['0,2 g/l de sang', '0,5 g/l de sang', '0,8 g/l de sang'], ['0.2 g/l', '0.5 g/l', '0.8 g/l'], [0], 'Équivalent à zéro verre en pratique.', 'In practice, no drinks at all.'],
      ['Pour un conducteur confirmé, le taux d\'alcool maximal est de :', 'For an experienced driver the limit is:', ['0,2 g/l', '0,5 g/l', '0,8 g/l'], ['0.2 g/l', '0.5 g/l', '0.8 g/l'], [1], 'Soit 0,25 mg/l d\'air expiré.', 'That is 0.25 mg/l breath.'],
      ['Pour éliminer l\'alcool plus vite :', 'To eliminate alcohol faster:', ['je bois un café', 'je bois beaucoup d\'eau', 'rien ne l\'accélère, il faut attendre'], ['I drink coffee', 'I drink lots of water', 'nothing speeds it up, I must wait'], [2], 'Seul le temps permet l\'élimination.', 'Only time works.'],
      ['En conduisant, je peux utiliser :', 'While driving I may use:', ['un téléphone tenu en main', 'des écouteurs', 'un système mains libres intégré au véhicule'], ['a hand-held phone', 'earphones', 'a built-in hands-free system'], [2], 'Téléphone en main et écouteurs/oreillettes sont interdits.', 'Hand-held and earphones are forbidden.'],
      ['Le temps de réaction moyen d\'un conducteur attentif est d\'environ :', 'Average reaction time of an alert driver is about:', ['1 seconde', '3 secondes', '5 secondes'], ['1 second', '3 seconds', '5 seconds'], [0], 'Il augmente avec la fatigue ou l\'alcool.', 'It increases with fatigue or alcohol.'],
      ['La distance de sécurité minimale correspond à :', 'The minimum safe distance corresponds to:', ['1 seconde', '2 secondes', '4 secondes'], ['1 second', '2 seconds', '4 seconds'], [1], 'Au moins 2 secondes entre les véhicules.', 'At least 2 seconds.'],
      ['À 90 km/h, en 1 seconde, je parcours environ :', 'At 90 km/h in 1 second I travel about:', ['9 m', '27 m', '50 m'], ['9 m', '27 m', '50 m'], [1], '9 × 3 = 27 m (exactement 25 m).', '9 × 3 = 27 m (exactly 25 m).'],
      ['La distance d\'arrêt comprend :', 'Stopping distance includes:', ['la distance parcourue pendant le temps de réaction', 'la distance de freinage', 'la distance de sécurité'], ['the reaction distance', 'the braking distance', 'the safe distance'], [0, 1], 'Distance d\'arrêt = réaction + freinage.', 'Stopping = reaction + braking.'],
      ['Quand la vitesse augmente, mon champ visuel :', 'As speed increases my field of vision:', ['s\'élargit', 'se rétrécit', 'ne change pas'], ['widens', 'narrows', 'does not change'], [1], 'C\'est l\'effet tunnel.', 'The tunnel effect.'],
      ['Je ressens les premiers signes de fatigue :', 'I feel the first signs of fatigue:', ['j\'ouvre la fenêtre et je continue', 'je m\'arrête pour me reposer', 'je mets la musique plus fort'], ['I open the window and carry on', 'I stop to rest', 'I turn the music up'], [1], 'Seul le repos est efficace.', 'Only rest works.'],
      ['Conduire après avoir consommé du cannabis :', 'Driving after using cannabis:', ['est autorisé si je me sens bien', 'est un délit', 'est autorisé en dessous d\'un certain taux'], ['is allowed if I feel fine', 'is a criminal offence', 'is allowed below a threshold'], [1], 'Toute présence de stupéfiants est sanctionnée.', 'Any presence is punished.']
    ]
  },

  {
    id: 'fr-R', n: 'R', icon: '🛣️', signCat: 'indicazione',
    t: ['La route', 'The road'],
    lessons: [
      { h: ['Autoroute et voies rapides', 'Motorways and expressways'], b: [
`- **Autoroute** : interdite aux piétons, cycles, cyclomoteurs, tracteurs et véhicules lents. Panneaux de direction à fond **bleu**.
- **Insertion** : utiliser la **voie d'accélération**, céder le passage aux véhicules circulant sur l'autoroute.
- **Vitesse minimale** de **80 km/h** sur la voie de gauche, de jour, par bonne visibilité et circulation fluide.
- **Interdits** : marche arrière, demi-tour, arrêt et stationnement hors aires et bande d'arrêt d'urgence (BAU) en cas de panne.
- **Panne sur autoroute** : se garer sur la BAU, feux de détresse, gilet de haute visibilité **avant de sortir**, sortir côté droit, se placer **derrière la glissière**, appeler depuis une borne d'appel d'urgence (tous les 2 km) ou le 112.
- La pose du **triangle** n'est pas obligatoire sur autoroute si elle met en danger.`,
`- **Motorway**: banned to pedestrians, cycles, mopeds, tractors and slow vehicles. Direction signs are **blue**.
- **Joining**: use the **acceleration lane**, give way to motorway traffic.
- **Minimum speed** **80 km/h** in the left lane by day, good visibility and fluid traffic.
- **Forbidden**: reversing, U-turns, stopping outside areas and the hard shoulder in case of breakdown.
- **Breakdown**: stop on the hard shoulder, hazard lights, high-visibility vest **before getting out**, exit right, stand **behind the barrier**, call from an emergency phone (every 2 km) or 112.
- The **triangle** is not required on motorways if placing it is dangerous.`] },
      { h: ['Conditions difficiles', 'Difficult conditions'], b: [
`- **Pluie** : vitesses réduites, distances de sécurité augmentées, risque d'**aquaplaning**.
- **Brouillard** : feux de croisement et antibrouillard ; feu **antibrouillard arrière** seulement par brouillard ou neige.
- **Neige / verglas** : depuis la **loi Montagne**, dans les départements concernés, pneus hiver ou chaînes obligatoires du **1er novembre au 31 mars**.
- **Tunnel** : feux de croisement, distance (souvent 150 m pour les poids lourds), ne jamais faire demi-tour ; en cas d'incendie, quitter le véhicule et rejoindre une issue de secours.
- **Nuit** : feux de route hors agglomération quand on ne gêne personne ; croisement dès qu'on croise ou suit un véhicule.`,
`- **Rain**: lower speeds, larger gaps, **aquaplaning** risk.
- **Fog**: dipped and fog lights; **rear fog** only in fog or snow.
- **Snow/ice**: under the **Mountain law**, in listed départements, winter tyres or chains from **1 November to 31 March**.
- **Tunnel**: dipped lights, keep distance, never U-turn; in a fire leave the vehicle and go to an emergency exit.
- **Night**: main beams outside towns when not dazzling; dip when meeting or following.`] }
    ],
    q: [
      ['Pour m\'insérer sur l\'autoroute :', 'To join the motorway:', ['j\'utilise la voie d\'accélération', 'je suis prioritaire', 'je cède le passage aux véhicules sur l\'autoroute'], ['I use the acceleration lane', 'I have priority', 'I give way to motorway traffic'], [0, 2], 'L\'insertion se fait sans gêner les usagers de l\'autoroute.', 'Join without disturbing motorway traffic.', 'autostrada'],
      ['Sur autoroute, la vitesse minimale sur la voie de gauche, de jour et par bonne visibilité, est :', 'On motorways the minimum speed in the left lane by day is:', ['60 km/h', '80 km/h', '100 km/h'], ['60 km/h', '80 km/h', '100 km/h'], [1], 'Si la circulation est fluide.', 'If traffic is fluid.'],
      ['En cas de panne sur autoroute :', 'On a motorway breakdown:', ['je mets le gilet avant de sortir', 'je sors côté circulation', 'je me place derrière la glissière'], ['I put on the vest before getting out', 'I get out on the traffic side', 'I stand behind the barrier'], [0, 2], 'Sortir côté droit et se protéger derrière la glissière.', 'Exit right and shelter behind the barrier.'],
      ['Sur autoroute, j\'ai manqué ma sortie :', 'I missed my motorway exit:', ['je fais marche arrière sur la BAU', 'je continue jusqu\'à la sortie suivante', 'je fais demi-tour sur une aire'], ['I reverse on the hard shoulder', 'I continue to the next exit', 'I U-turn in a rest area'], [1], 'Marche arrière et demi-tour sont interdits.', 'Reversing and U-turns are forbidden.'],
      ['Le feu antibrouillard arrière s\'utilise :', 'The rear fog light is used:', ['par forte pluie', 'par brouillard ou chute de neige', 'la nuit'], ['in heavy rain', 'in fog or falling snow', 'at night'], [1], 'Il est interdit par simple pluie.', 'Not allowed in mere rain.'],
      ['Dans un tunnel, je dois :', 'In a tunnel I must:', ['allumer mes feux de croisement', 'faire demi-tour en cas de bouchon', 'garder mes distances'], ['switch on dipped lights', 'U-turn in a jam', 'keep my distance'], [0, 2], 'Le demi-tour est interdit en tunnel.', 'U-turns are forbidden in tunnels.', 'galleria-ind'],
      ['L\'aquaplaning est favorisé par :', 'Aquaplaning is made more likely by:', ['des pneus usés', 'une vitesse élevée', 'une forte épaisseur d\'eau'], ['worn tyres', 'high speed', 'deep water'], [0, 1, 2], 'Les trois facteurs augmentent le risque.', 'All three increase the risk.'],
      ['La nuit, hors agglomération, j\'utilise les feux de route :', 'At night outside towns I use main beams:', ['en permanence', 'quand je ne risque pas d\'éblouir', 'uniquement en cas de brouillard'], ['all the time', 'when I will not dazzle anyone', 'only in fog'], [1], 'Repasser en croisement dès qu\'on croise ou suit un véhicule.', 'Dip when meeting or following.'],
      ['Dans les départements de montagne concernés, les équipements hiver sont obligatoires :', 'In listed mountain départements winter equipment is required:', ['du 1er novembre au 31 mars', 'toute l\'année', 'uniquement en cas de neige'], ['1 November to 31 March', 'all year', 'only when it snows'], [0], 'Loi Montagne.', 'Mountain law.', 'catene-neve'],
      ['Sur autoroute, les panneaux de direction sont :', 'On French motorways direction signs are:', ['verts', 'bleus', 'blancs'], ['green', 'blue', 'white'], [1], 'Verts pour les routes principales.', 'Green for main roads.']
    ]
  },

  {
    id: 'fr-U', n: 'U', icon: '🚲',
    t: ['Les autres usagers de la route', 'Other road users'],
    lessons: [
      { h: ['Usagers vulnérables', 'Vulnerable users'], b: [
`- **Piétons** : prioritaires lorsqu'ils sont engagés ou **manifestent clairement l'intention** de traverser. Ne pas s'arrêter sur un passage piéton.
- **Cyclistes** : pour les dépasser, laisser au moins **1 m en agglomération** et **1,5 m hors agglomération** ; le franchissement de la ligne continue est toléré pour dépasser un cycliste si la visibilité le permet. Le **sas vélo** devant les feux leur est réservé.
- **Enfants, personnes âgées** : comportements imprévisibles, ralentir.
- **Deux-roues motorisés** : peu visibles, contrôler les **angles morts** avant tout changement de direction.
- **Poids lourds et bus** : grands **angles morts** (signalés par un autocollant), freinage plus long, besoin de place pour tourner.
- **Véhicules prioritaires** (sirène + feux bleus) : se ranger, ne pas les suivre.`,
`- **Pedestrians**: priority when crossing or **clearly showing intent** to cross. Never stop on a crossing.
- **Cyclists**: leave at least **1 m in towns** and **1.5 m outside**; crossing a continuous line to pass a cyclist is tolerated if visibility allows. The **bike box** at lights is reserved for them.
- **Children, elderly**: unpredictable, slow down.
- **Motorcycles**: hard to see, check **blind spots**.
- **Lorries and buses**: large **blind spots** (sticker), longer braking, need space to turn.
- **Priority vehicles** (siren + blue lights): pull over, do not follow them.`] }
    ],
    q: [
      ['Un piéton attend au bord d\'un passage piéton et manifeste l\'intention de traverser :', 'A pedestrian waits at a crossing, showing intent to cross:', ['je le laisse traverser', 'je klaxonne et je passe', 'il doit attendre que je passe'], ['I let him cross', 'I hoot and go', 'he must wait for me'], [0], 'Le piéton qui manifeste l\'intention est prioritaire.', 'A pedestrian showing intent has priority.', 'attraversamento-pedonale'],
      ['Hors agglomération, pour dépasser un cycliste, je laisse au minimum :', 'Outside towns, to pass a cyclist I leave at least:', ['0,5 m', '1 m', '1,5 m'], ['0.5 m', '1 m', '1.5 m'], [2], '1 m en agglomération, 1,5 m hors agglomération.', '1 m in towns, 1.5 m outside.', 'ciclisti'],
      ['En agglomération, pour dépasser un cycliste, je laisse au minimum :', 'In towns, to pass a cyclist I leave at least:', ['1 m', '1,5 m', '2 m'], ['1 m', '1.5 m', '2 m'], [0], 'Distance latérale minimale de 1 m.', 'Minimum 1 m.'],
      ['Le sas vélo situé devant un feu :', 'The bike box in front of lights:', ['est réservé aux cyclistes', 'peut accueillir les voitures si le feu est rouge', 'est une zone de stationnement'], ['is reserved for cyclists', 'may be used by cars at red', 'is a parking area'], [0], 'Les voitures doivent s\'arrêter avant.', 'Cars must stop before it.'],
      ['Un poids lourd possède :', 'A lorry has:', ['des angles morts importants', 'une distance de freinage plus longue', 'aucun angle mort grâce à ses rétroviseurs'], ['large blind spots', 'longer braking distance', 'no blind spots thanks to mirrors'], [0, 1], 'Un autocollant signale ses angles morts.', 'A sticker marks blind spots.'],
      ['Un véhicule de pompiers arrive derrière moi, sirène et feux bleus allumés :', 'A fire engine comes up behind with siren and blue lights:', ['je facilite son passage', 'je le suis pour avancer plus vite', 'je freine brusquement'], ['I help it through', 'I follow it to go faster', 'I brake sharply'], [0], 'Se ranger sans manœuvre dangereuse.', 'Pull over safely.'],
      ['Avant de tourner à droite en ville, je vérifie :', 'Before turning right in town I check:', ['l\'angle mort droit pour les cyclistes', 'uniquement le rétroviseur intérieur', 'les piétons qui traversent la rue où je m\'engage'], ['the right blind spot for cyclists', 'only the interior mirror', 'pedestrians crossing the street I enter'], [0, 2], 'Cyclistes et piétons sont prioritaires dans ce cas.', 'Cyclists and pedestrians are priority here.'],
      ['Des enfants jouent au bord de la chaussée :', 'Children are playing by the road:', ['je ralentis et je suis prêt à m\'arrêter', 'je klaxonne longuement', 'je garde ma vitesse'], ['I slow down, ready to stop', 'I hoot long', 'I keep my speed'], [0], 'Leur comportement est imprévisible.', 'They are unpredictable.', 'bambini'],
      ['Pour dépasser un cycliste, je peux franchir une ligne continue :', 'To pass a cyclist I may cross a continuous line:', ['oui, si la visibilité est suffisante', 'non, jamais', 'oui, même sans visibilité'], ['yes, if visibility is sufficient', 'no, never', 'yes, even without visibility'], [0], 'Tolérance prévue par le Code de la route.', 'Allowed by the Code if visibility permits.'],
      ['Un bus quitte son arrêt en agglomération et met son clignotant :', 'A bus pulls out of its stop in town signalling:', ['je le laisse partir', 'j\'accélère pour passer avant', 'je klaxonne'], ['I let it go', 'I speed up to pass first', 'I hoot'], [0], 'En agglomération on doit céder le passage aux bus qui quittent leur arrêt.', 'In towns you must let buses pull out.']
    ]
  },

  {
    id: 'fr-D', n: 'D', icon: '📑',
    t: ['Réglementation générale et divers', 'General regulations'],
    lessons: [
      { h: ['Permis, points et documents', 'Licence, points and documents'], b: [
`- **Permis B** : dès **17 ans** (depuis 2024) ; la conduite accompagnée est possible dès 15 ans.
- **Permis probatoire** : **6 points** au départ, +2 points par an pendant **3 ans** (2 ans et +3/an après la conduite accompagnée), jusqu'à **12 points**. Disque **« A »** obligatoire à l'arrière.
- **Retraits de points** (exemples) : téléphone tenu en main **3**, non-port de la ceinture **3**, feu rouge ou stop **4**, alcool à partir de 0,5 g/l **6**, excès de vitesse de 50 km/h ou plus **6**, excès inférieur à 20 km/h **1**.
- **Documents** : permis de conduire et **certificat d'immatriculation** ; le véhicule doit être assuré (la vignette verte n'est plus à apposer depuis 2024).
- **Contrôle technique** : dans les **6 mois précédant le 4e anniversaire** de la première immatriculation, puis **tous les 2 ans**.
- **Amendes forfaitaires** minorées si payées rapidement, majorées en cas de retard.`,
`- **Licence B**: from **17** (since 2024); accompanied driving from 15.
- **Probationary licence**: **6 points** at first, +2 per year for **3 years** (2 years and +3/year after accompanied driving), up to **12**. **"A" disc** required on the rear.
- **Point deductions** (examples): hand-held phone **3**, no seat belt **3**, red light or stop **4**, alcohol from 0.5 g/l **6**, 50 km/h or more over the limit **6**, under 20 km/h over **1**.
- **Documents**: licence and **registration certificate**; the vehicle must be insured.
- **Roadworthiness test**: within **6 months before the 4th anniversary**, then **every 2 years**.
- **Fixed fines** reduced if paid early, increased if late.`] }
    ],
    q: [
      ['En France, le permis B peut s\'obtenir dès :', 'In France licence B can be obtained from:', ['16 ans', '17 ans', '18 ans'], ['16', '17', '18'], [1], 'Depuis le 1er janvier 2024.', 'Since 1 January 2024.'],
      ['Un permis probatoire démarre avec :', 'A probationary licence starts with:', ['6 points', '8 points', '12 points'], ['6 points', '8 points', '12 points'], [0], 'Il atteint 12 points au bout de 3 ans sans infraction.', '12 after 3 years without offences.'],
      ['Le disque « A » à l\'arrière du véhicule est obligatoire :', 'The "A" disc on the rear is compulsory:', ['pendant la période probatoire', 'pour tous les conducteurs', 'seulement sur autoroute'], ['during probation', 'for all drivers', 'only on motorways'], [0], 'Il signale un jeune conducteur.', 'It signals a new driver.'],
      ['Téléphoner avec le téléphone tenu en main entraîne un retrait de :', 'Using a hand-held phone costs:', ['1 point', '3 points', '6 points'], ['1 point', '3 points', '6 points'], [1], 'Plus une amende de 135 €.', 'Plus a €135 fine.'],
      ['Franchir un feu rouge entraîne un retrait de :', 'Running a red light costs:', ['2 points', '4 points', '6 points'], ['2 points', '4 points', '6 points'], [1], 'Même sanction pour le stop non respecté.', 'Same for failing to stop at STOP.', 'semaforo-rosso'],
      ['Le premier contrôle technique d\'une voiture neuve doit avoir lieu :', 'A new car\'s first roadworthiness test must be:', ['dans les 6 mois avant son 4e anniversaire', 'après 2 ans', 'après 6 ans'], ['within 6 months before its 4th anniversary', 'after 2 years', 'after 6 years'], [0], 'Puis tous les 2 ans.', 'Then every 2 years.'],
      ['Lors d\'un contrôle, je dois présenter :', 'At a check I must show:', ['mon permis de conduire', 'le certificat d\'immatriculation', 'ma carte vitale'], ['my licence', 'the registration certificate', 'my health card'], [0, 1], 'Documents liés au conducteur et au véhicule.', 'Driver and vehicle documents.'],
      ['Un excès de vitesse de 50 km/h ou plus entraîne un retrait de :', 'Speeding by 50 km/h or more costs:', ['3 points', '4 points', '6 points'], ['3 points', '4 points', '6 points'], [2], 'C\'est aussi un délit en cas de récidive.', 'Also a criminal offence on repeat.'],
      ['Ne pas porter la ceinture de sécurité entraîne un retrait de :', 'Not wearing a seat belt costs:', ['1 point', '3 points', '4 points'], ['1 point', '3 points', '4 points'], [1], 'Et une amende de 135 €.', 'And a €135 fine.'],
      ['Après la conduite accompagnée, la période probatoire dure :', 'After accompanied driving the probation lasts:', ['1 an', '2 ans', '3 ans'], ['1 year', '2 years', '3 years'], [1], 'Avec +3 points par an.', 'With +3 points per year.']
    ]
  },

  {
    id: 'fr-A', n: 'A', icon: '🚑',
    t: ['Premiers secours', 'First aid'],
    lessons: [
      { h: ['Protéger, Alerter, Secourir', 'Protect, Alert, Help'], b: [
`1. **Protéger** : se garer en sécurité, feux de détresse, **gilet** de haute visibilité, **triangle** à au moins **30 m** (sauf danger sur autoroute), couper le contact des véhicules accidentés, ne pas fumer.
2. **Alerter** : **112** (numéro d'urgence européen), **15** (SAMU), **18** (pompiers), **17** (police / gendarmerie), **114** (par SMS pour les personnes sourdes ou malentendantes). Indiquer le lieu exact, le nombre de victimes, leur état.
3. **Secourir** :
   - victime qui **saigne** : compression directe de la plaie ;
   - victime **inconsciente qui respire** : **PLS** (position latérale de sécurité) ;
   - victime qui **ne respire plus** : massage cardiaque (environ 100 à 120 compressions par minute) et **défibrillateur** si disponible ;
   - ne pas retirer le **casque** d'un motard ; ne pas déplacer une victime sauf danger imminent ; ne rien donner à boire.`,
`1. **Protect**: park safely, hazard lights, **high-visibility vest**, **triangle** at least **30 m** away (unless dangerous on a motorway), switch off ignition of crashed vehicles, no smoking.
2. **Alert**: **112** (European emergency), **15** (ambulance), **18** (fire), **17** (police), **114** (SMS for deaf users). Give exact location, number and state of victims.
3. **Help**:
   - **bleeding**: direct pressure on the wound;
   - **unconscious, breathing**: **recovery position**;
   - **not breathing**: chest compressions (about 100–120 per minute) and **defibrillator** if available;
   - do not remove a rider's **helmet**; do not move a victim unless in imminent danger; nothing to drink.`] }
    ],
    q: [
      ['L\'ordre des gestes face à un accident est :', 'The order of actions at an accident is:', ['Alerter, Protéger, Secourir', 'Protéger, Alerter, Secourir', 'Secourir, Protéger, Alerter'], ['Alert, Protect, Help', 'Protect, Alert, Help', 'Help, Protect, Alert'], [1], 'Méthode PAS.', 'PAS method.'],
      ['Le numéro d\'urgence européen est le :', 'The European emergency number is:', ['112', '15', '911'], ['112', '15', '911'], [0], 'Gratuit, depuis un mobile ou un fixe.', 'Free from any phone.'],
      ['Le triangle de présignalisation se place à au moins :', 'The warning triangle goes at least:', ['10 m', '30 m', '100 m'], ['10 m', '30 m', '100 m'], [1], 'En amont de l\'accident ou du véhicule.', 'Upstream of the accident.'],
      ['Une victime inconsciente qui respire doit être placée :', 'An unconscious breathing victim should be placed:', ['sur le dos jambes surélevées', 'en position latérale de sécurité', 'assise'], ['on the back, legs raised', 'in the recovery position', 'sitting'], [1], 'La PLS évite l\'étouffement.', 'Prevents choking.'],
      ['Une victime ne respire plus :', 'A victim is not breathing:', ['je pratique un massage cardiaque', 'j\'attends les secours sans rien faire', 'j\'utilise un défibrillateur si disponible'], ['I start chest compressions', 'I wait doing nothing', 'I use a defibrillator if available'], [0, 2], 'Après avoir alerté.', 'After alerting.'],
      ['Je dois retirer le casque d\'un motard blessé :', 'I should remove an injured rider\'s helmet:', ['oui, toujours', 'non, sauf s\'il ne respire plus et que je suis formé', 'oui, pour qu\'il respire mieux'], ['yes, always', 'no, unless not breathing and I am trained', 'yes, to help breathing'], [1], 'Risque d\'aggraver une lésion cervicale.', 'Risk of worsening a neck injury.'],
      ['Face à une victime qui saigne abondamment :', 'Facing a heavily bleeding victim:', ['j\'appuie fortement sur la plaie', 'je lui donne à boire', 'je fais un garrot systématiquement'], ['I press firmly on the wound', 'I give a drink', 'I always apply a tourniquet'], [0], 'Compression directe avec un tissu propre.', 'Direct pressure with a clean cloth.'],
      ['Le 114 est le numéro d\'urgence :', '114 is the emergency number:', ['par SMS pour les personnes sourdes ou malentendantes', 'des pompiers', 'de la police'], ['by SMS for deaf people', 'for fire', 'for police'], [0], 'Accessible par SMS ou application.', 'By SMS or app.'],
      ['Pour protéger les lieux d\'un accident, je dois :', 'To protect an accident scene I must:', ['allumer mes feux de détresse', 'porter mon gilet de haute visibilité', 'couper le contact des véhicules accidentés'], ['switch on hazard lights', 'wear my vest', 'switch off crashed vehicles\' ignition'], [0, 1, 2], 'Tous ces gestes limitent le sur-accident.', 'All prevent further crashes.']
    ]
  },

  {
    id: 'fr-P', n: 'P', icon: '🚪',
    t: ['Précautions nécessaires en quittant le véhicule', 'Precautions when leaving the vehicle'],
    lessons: [
      { h: ['Stationner et descendre', 'Parking and getting out'], b: [
`- **Arrêt** : immobilisation momentanée, conducteur à proximité. **Stationnement** : immobilisation hors arrêt.
- Avant d'ouvrir la portière : **rétroviseur et angle mort** pour les cyclistes ; utiliser la main opposée à la portière (« ouverture à la hollandaise ») pour tourner le buste et regarder derrière.
- Faire descendre les **enfants côté trottoir**, activer la sécurité enfants.
- Serrer le **frein de parking**, enclencher une vitesse (1re en montée, marche arrière en descente), braquer les roues vers le trottoir en pente.
- Ne jamais laisser d'**enfant ou d'animal seul** dans un véhicule, surtout au soleil.
- Couper le moteur, retirer la clé, fermer à clé, ne laisser **aucun objet visible**.
- **Stationnement interdit** : sur les passages piétons, les trottoirs (stationnement très gênant), les places réservées, devant les entrées carrossables, à moins de 5 m en amont d'un passage piéton (sauf places vélos/trottinettes).`,
`- **Stopping**: brief immobilisation with driver nearby. **Parking**: anything else.
- Before opening the door: **mirror and blind spot** for cyclists; use the hand opposite the door ("Dutch reach") to turn and look back.
- Let **children out on the pavement side**, use child locks.
- Apply the **parking brake**, engage a gear (1st uphill, reverse downhill), turn wheels toward the kerb on slopes.
- Never leave a **child or animal alone** in the car.
- Switch off, remove the key, lock, leave **nothing visible**.
- **No parking**: on crossings, pavements, reserved bays, in front of driveways, within 5 m before a pedestrian crossing (except bike bays).`] }
    ],
    q: [
      ['Avant d\'ouvrir ma portière côté circulation :', 'Before opening my door on the traffic side:', ['je regarde dans le rétroviseur', 'je contrôle l\'angle mort', 'j\'ouvre rapidement'], ['I check the mirror', 'I check the blind spot', 'I open quickly'], [0, 1], 'Un cycliste peut arriver.', 'A cyclist may be coming.'],
      ['L\'« ouverture à la hollandaise » consiste à :', 'The "Dutch reach" means:', ['ouvrir la portière avec la main opposée', 'ouvrir avec le pied', 'ouvrir les deux portières'], ['opening the door with the far hand', 'opening with the foot', 'opening both doors'], [0], 'Elle oblige à tourner le buste et à regarder derrière.', 'It forces you to turn and look back.'],
      ['Je fais descendre les enfants :', 'I let children out:', ['côté trottoir', 'côté circulation', 'par le coffre'], ['on the pavement side', 'on the traffic side', 'through the boot'], [0], 'C\'est plus sûr.', 'Safer.'],
      ['Je stationne en descente :', 'Parking downhill:', ['j\'enclenche la marche arrière', 'je braque les roues vers le trottoir', 'je laisse au point mort'], ['I engage reverse', 'I turn wheels to the kerb', 'I leave it in neutral'], [0, 1], 'Avec le frein de parking serré.', 'With the parking brake on.'],
      ['Laisser un enfant seul dans un véhicule au soleil :', 'Leaving a child alone in a car in the sun:', ['est dangereux même quelques minutes', 'est possible fenêtres entrouvertes', 'est sans risque à l\'ombre'], ['is dangerous even for minutes', 'is fine with windows ajar', 'is safe in the shade'], [0], 'La température monte très vite.', 'Temperature rises very fast.'],
      ['Le stationnement est interdit :', 'Parking is forbidden:', ['sur un passage piéton', 'devant une entrée carrossable', 'sur une place matérialisée libre'], ['on a pedestrian crossing', 'in front of a driveway', 'in a free marked bay'], [0, 1], 'La place matérialisée est autorisée.', 'A marked bay is allowed.', 'strisce-pedonali'],
      ['Avant de quitter mon véhicule :', 'Before leaving my vehicle:', ['je retire la clé', 'je laisse mes objets de valeur visibles', 'je verrouille les portières'], ['I remove the key', 'I leave valuables visible', 'I lock the doors'], [0, 2], 'Pour prévenir les vols.', 'To prevent theft.'],
      ['L\'arrêt se distingue du stationnement car :', 'Stopping differs from parking because:', ['le conducteur reste à proximité', 'il dure plus longtemps', 'il est toujours interdit'], ['the driver stays nearby', 'it lasts longer', 'it is always forbidden'], [0], 'Immobilisation momentanée.', 'Brief immobilisation.']
    ]
  },

  {
    id: 'fr-M', n: 'M', icon: '🔧',
    t: ['Éléments mécaniques liés à la sécurité', 'Mechanical safety elements'],
    lessons: [
      { h: ['Pneus, freins, voyants', 'Tyres, brakes, warning lamps'], b: [
`- **Pneumatiques** : profondeur minimale des sculptures **1,6 mm** (témoins d'usure) ; pression vérifiée **à froid** environ une fois par mois et avant un long trajet ; un pneu sous-gonflé augmente la consommation et le risque d'éclatement.
- **Freins** : niveau du liquide de frein (le baisser anormalement = usure ou fuite) ; l'**ABS** empêche le blocage des roues et permet de garder la direction.
- **Éclairage** : vérifier régulièrement feux, clignotants, feux stop ; avoir des ampoules de rechange.
- **Voyants** : **rouge** = danger, arrêt immédiat (pression d'huile, température, freins, charge batterie) ; **orange** = anomalie, consulter un garagiste (moteur, ABS, pression pneus) ; **vert** = fonction active ; **bleu** = feux de route.
- **Essuie-glaces**, **lave-glace**, **rétroviseurs** propres et réglés.`,
`- **Tyres**: minimum tread **1.6 mm** (wear indicators); check pressure **cold** monthly and before long trips.
- **Brakes**: brake fluid level (abnormal drop = wear or leak); **ABS** prevents wheel lock and keeps steering.
- **Lights**: check headlights, indicators, brake lights regularly.
- **Lamps**: **red** = danger, stop now (oil, temperature, brakes, battery); **orange** = fault, see a mechanic; **green** = function on; **blue** = main beams.
- **Wipers**, **washer fluid**, clean and adjusted **mirrors**.`] }
    ],
    q: [
      ['La profondeur minimale des sculptures d\'un pneu est de :', 'Minimum tyre tread depth is:', ['1 mm', '1,6 mm', '3 mm'], ['1 mm', '1.6 mm', '3 mm'], [1], 'Repérée par les témoins d\'usure.', 'Shown by wear indicators.'],
      ['La pression des pneus se vérifie :', 'Tyre pressure is checked:', ['à froid', 'après un long trajet', 'uniquement au contrôle technique'], ['cold', 'after a long journey', 'only at the roadworthiness test'], [0], 'À chaud la pression est faussée.', 'Hot readings are wrong.'],
      ['Un pneu sous-gonflé :', 'An under-inflated tyre:', ['augmente la consommation', 'augmente le risque d\'éclatement', 'améliore l\'adhérence'], ['increases consumption', 'increases blowout risk', 'improves grip'], [0, 1], 'Il chauffe et s\'use plus vite.', 'It heats and wears faster.'],
      ['Le voyant rouge de pression d\'huile s\'allume en roulant :', 'The red oil pressure lamp comes on while driving:', ['je m\'arrête dès que possible', 'je continue jusqu\'au garage', 'c\'est normal à froid'], ['I stop as soon as possible', 'I drive on to a garage', 'it is normal when cold'], [0], 'Risque de casse moteur.', 'Risk of engine failure.'],
      ['L\'ABS permet :', 'ABS allows:', ['d\'éviter le blocage des roues', 'de garder le contrôle de la direction en freinant', 'de supprimer la distance de freinage'], ['avoiding wheel lock', 'keeping steering control when braking', 'eliminating braking distance'], [0, 1], 'La distance de freinage existe toujours.', 'Braking distance still exists.'],
      ['Le voyant bleu signifie que :', 'The blue lamp means:', ['les feux de route sont allumés', 'le moteur est froid', 'les feux de croisement sont allumés'], ['main beams are on', 'the engine is cold', 'dipped beams are on'], [0], 'Les feux de croisement sont verts.', 'Dipped beams are green.'],
      ['Un niveau de liquide de frein en baisse anormale peut indiquer :', 'An abnormally low brake fluid level may indicate:', ['une fuite', 'l\'usure des plaquettes', 'un moteur trop froid'], ['a leak', 'worn pads', 'a cold engine'], [0, 1], 'Faire contrôler rapidement.', 'Have it checked quickly.'],
      ['Un voyant orange allumé signifie :', 'An orange lamp means:', ['une anomalie à faire vérifier', 'un danger imminent', 'une fonction normale active'], ['a fault to have checked', 'imminent danger', 'a normal function on'], [0], 'Rouge = danger, orange = anomalie.', 'Red = danger, orange = fault.']
    ]
  },

  {
    id: 'fr-S', n: 'S', icon: '🦺',
    t: ['Équipements de sécurité des véhicules', 'Vehicle safety equipment'],
    lessons: [
      { h: ['Ceinture, enfants, deux-roues', 'Belts, children, two-wheelers'], b: [
`- **Ceinture** obligatoire à l'avant et à l'arrière ; le conducteur est responsable des passagers **mineurs**.
- **Enfants de moins de 10 ans** : dans un **système de retenue adapté** à leur taille et poids ; à l'avant seulement dans des cas précis (siège dos à la route **airbag désactivé**, véhicule sans places arrière…).
- **Airbag** : complète la ceinture ; ne jamais installer un siège dos à la route devant un airbag actif.
- **Appuie-tête** : réglé au niveau du haut de la tête.
- **Équipements obligatoires** dans le véhicule : **gilet de haute visibilité** (à portée de main) et **triangle de présignalisation**.
- **Deux-roues motorisés** : casque homologué attaché, **gants homologués** obligatoires, gilet en cas d'arrêt d'urgence.`,
`- **Seat belt** compulsory front and rear; the driver is responsible for **minor** passengers.
- **Children under 10**: in a **suitable restraint**; in front only in specific cases (rear-facing seat with **airbag off**, no rear seats…).
- **Airbag**: complements the belt.
- **Head restraint**: at the top of the head.
- **Compulsory equipment**: **high-visibility vest** (within reach) and **warning triangle**.
- **Powered two-wheelers**: fastened approved helmet, **approved gloves** compulsory.`] }
    ],
    q: [
      ['Les enfants de moins de 10 ans doivent voyager :', 'Children under 10 must travel:', ['dans un système de retenue adapté', 'sur les genoux d\'un adulte', 'avec une simple ceinture adulte'], ['in a suitable restraint', 'on an adult\'s lap', 'with an adult belt only'], [0], 'Adapté à leur taille et poids.', 'Suited to height and weight.'],
      ['Un siège enfant dos à la route peut être placé à l\'avant :', 'A rear-facing child seat may go in front:', ['si l\'airbag passager est désactivé', 'toujours', 'jamais'], ['if the passenger airbag is off', 'always', 'never'], [0], 'Sinon l\'airbag est très dangereux pour l\'enfant.', 'Otherwise the airbag is very dangerous.'],
      ['Le gilet de haute visibilité doit être :', 'The high-visibility vest must be:', ['dans le coffre', 'à portée de main du conducteur', 'facultatif'], ['in the boot', 'within the driver\'s reach', 'optional'], [1], 'On l\'enfile avant de sortir.', 'Put it on before getting out.'],
      ['Le conducteur est responsable du port de la ceinture :', 'The driver is responsible for seat belt use of:', ['des passagers mineurs', 'de tous les passagers adultes', 'de personne'], ['minor passengers', 'all adult passengers', 'nobody'], [0], 'Chaque adulte est responsable de lui-même.', 'Each adult is responsible for themselves.'],
      ['L\'appuie-tête doit être réglé :', 'The head restraint should be set:', ['au niveau de la nuque', 'au niveau du haut de la tête', 'le plus bas possible'], ['at neck level', 'at the top of the head', 'as low as possible'], [1], 'Pour limiter le coup du lapin.', 'To limit whiplash.'],
      ['À moto, sont obligatoires :', 'On a motorcycle compulsory items are:', ['un casque homologué', 'des gants homologués', 'des bottes en cuir'], ['an approved helmet', 'approved gloves', 'leather boots'], [0, 1], 'Les bottes sont recommandées mais pas obligatoires.', 'Boots are advised, not compulsory.'],
      ['L\'airbag :', 'The airbag:', ['remplace la ceinture', 'complète la ceinture', 'fonctionne mieux sans ceinture'], ['replaces the belt', 'complements the belt', 'works better without a belt'], [1], 'Sans ceinture il peut blesser gravement.', 'Without a belt it can injure.'],
      ['Dans mon véhicule je dois avoir :', 'In my vehicle I must have:', ['un gilet de haute visibilité', 'un triangle de présignalisation', 'un extincteur'], ['a high-visibility vest', 'a warning triangle', 'a fire extinguisher'], [0, 1], 'L\'extincteur n\'est pas obligatoire pour une voiture particulière.', 'An extinguisher is not required for a private car.']
    ]
  },

  {
    id: 'fr-E', n: 'E', icon: '🌱',
    t: ['Règles d\'utilisation du véhicule et respect de l\'environnement', 'Vehicle use and the environment'],
    lessons: [
      { h: ['Éco-conduite et pollution', 'Eco-driving and pollution'], b: [
`- **Éco-conduite** : anticiper, rouler à allure régulière, passer les rapports tôt (vers 2 000–2 500 tr/min), utiliser le **frein moteur**, couper le moteur aux arrêts prolongés, limiter la climatisation, retirer les barres de toit inutiles.
- Une conduite souple réduit la consommation (jusqu'à environ 15 %) et les accidents.
- **Vignette Crit'Air** : classe le véhicule selon ses émissions ; obligatoire pour circuler dans les **zones à faibles émissions (ZFE)** et lors des pics de pollution.
- **Polluants** : CO, NOx, particules fines, CO₂ (gaz à effet de serre). Pot catalytique et filtre à particules les réduisent.
- **Bruit** : éviter le klaxon inutile et les accélérations à vide.`,
`- **Eco-driving**: anticipate, steady pace, change up early (around 2,000–2,500 rpm), use **engine braking**, switch off at long stops, limit A/C, remove unused roof bars.
- Smooth driving cuts consumption (up to about 15%) and crashes.
- **Crit'Air sticker**: classifies vehicles by emissions; required in **low-emission zones (ZFE)** and during pollution peaks.
- **Pollutants**: CO, NOx, fine particles, CO₂. Catalytic converters and particulate filters reduce them.
- **Noise**: avoid needless horn and revving.`] }
    ],
    q: [
      ['Pour économiser du carburant :', 'To save fuel:', ['j\'anticipe et je roule de façon souple', 'je passe les rapports tardivement', 'j\'utilise le frein moteur'], ['I anticipate and drive smoothly', 'I change gear late', 'I use engine braking'], [0, 2], 'Passer les rapports tôt économise du carburant.', 'Changing up early saves fuel.'],
      ['La vignette Crit\'Air est nécessaire :', 'The Crit\'Air sticker is needed:', ['dans les zones à faibles émissions', 'sur toutes les routes de France', 'uniquement pour les poids lourds'], ['in low-emission zones', 'on all French roads', 'only for lorries'], [0], 'Et lors des restrictions pour pics de pollution.', 'And during pollution restrictions.'],
      ['Les barres de toit inutilisées :', 'Unused roof bars:', ['augmentent la consommation', 'n\'ont aucun effet', 'améliorent la stabilité'], ['increase consumption', 'have no effect', 'improve stability'], [0], 'Elles augmentent la résistance à l\'air.', 'They increase drag.'],
      ['À un arrêt prolongé (passage à niveau fermé) :', 'At a long stop (closed level crossing):', ['je coupe le moteur', 'je laisse tourner le moteur', 'j\'accélère pour garder le moteur chaud'], ['I switch off', 'I leave it running', 'I rev to keep it warm'], [0], 'On économise du carburant.', 'Saves fuel.'],
      ['Le CO₂ est :', 'CO₂ is:', ['un gaz à effet de serre', 'un gaz sans impact', 'éliminé par le pot catalytique'], ['a greenhouse gas', 'a harmless gas', 'removed by the catalytic converter'], [0], 'Le catalyseur ne réduit pas le CO₂.', 'The catalyst does not reduce CO₂.'],
      ['Une conduite souple permet :', 'Smooth driving allows:', ['de réduire la consommation', 'de diminuer le risque d\'accident', 'd\'user davantage les freins'], ['lower consumption', 'lower crash risk', 'more brake wear'], [0, 1], 'Elle préserve aussi la mécanique.', 'It also saves the mechanics.'],
      ['Le filtre à particules sert à :', 'The particulate filter is used to:', ['retenir les particules fines', 'réduire le bruit', 'augmenter la puissance'], ['trap fine particles', 'reduce noise', 'increase power'], [0], 'Surtout sur les moteurs diesel.', 'Mainly on diesel engines.']
    ]
  }
];
