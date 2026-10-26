// España – temario DGT permiso B (preguntas con 3 respuestas, una correcta).
// [q_es, q_en, opciones_es[], opciones_en[], correcta[], expl_es, expl_en, señal?]

export default [
  {
    id: 'es-1', n: 1, icon: '🚦', signCat: 'precedenza',
    t: ['Normas y señales: prioridad de paso', 'Rules and signs: right of way'],
    lessons: [
      { h: ['Orden de prioridad', 'Order of priority'], b: [
`Orden de prevalencia de las señales: **1) agentes**, **2) señalización circunstancial** (obras, balizamiento), **3) semáforos**, **4) señales verticales**, **5) marcas viales**.
- En intersecciones sin señalizar: **prioridad a la derecha**, salvo que circulemos por vía pavimentada y el otro venga de una sin pavimentar, o los vehículos que circulan por raíles.
- **Glorietas**: tienen prioridad los vehículos que **ya circulan** por ella. Para salir, colócate con antelación en el **carril derecho**.
- **Ceda el paso**: detenerse solo si es necesario. **STOP**: detención obligatoria siempre, en la línea.
- **Vehículos prioritarios** (luz azul y sirena): facilitarles el paso.`,
`Order of precedence: **1) traffic officers**, **2) temporary signs** (works), **3) traffic lights**, **4) vertical signs**, **5) road markings**.
- Unsigned junctions: **priority to the right**, except when you are on a paved road and the other comes from an unpaved one, and rail vehicles.
- **Roundabouts**: vehicles **already circulating** have priority. To exit, move to the **right lane** in advance.
- **Give way**: stop only if needed. **STOP**: always stop at the line.
- **Priority vehicles** (blue light and siren): let them through.`] }
    ],
    q: [
      ['¿Qué señal prevalece sobre todas las demás?', 'Which signal overrides all others?', ['La de un agente de tráfico', 'Un semáforo', 'Una señal vertical'], ['A traffic officer', 'A traffic light', 'A vertical sign'], [0], 'Los agentes prevalecen sobre cualquier otra señal.', 'Officers override everything.'],
      ['En una intersección sin señalizar, ¿quién tiene prioridad?', 'At an unsigned junction who has priority?', ['El que viene por la izquierda', 'El que viene por la derecha', 'El que va más rápido'], ['The one from the left', 'The one from the right', 'The faster one'], [1], 'Regla general de prioridad a la derecha.', 'Priority to the right.', 'incrocio-destra'],
      ['En una glorieta, ¿quién tiene prioridad?', 'At a roundabout who has priority?', ['Los que entran', 'Los que ya circulan por ella', 'Los camiones'], ['Entering vehicles', 'Those already circulating', 'Lorries'], [1], 'Los vehículos dentro del anillo.', 'Circulating vehicles.', 'rotatoria'],
      ['Ante una señal de STOP debe:', 'At a STOP sign you must:', ['Detenerse siempre en la línea', 'Detenerse solo si viene alguien', 'Reducir la velocidad'], ['Always stop at the line', 'Stop only if someone comes', 'Slow down'], [0], 'La detención es obligatoria.', 'Stopping is compulsory.', 'stop'],
      ['Esta señal obliga a:', 'This sign requires you to:', ['Detenerse siempre', 'Ceder el paso, deteniéndose si es necesario', 'Tener prioridad'], ['Always stop', 'Give way, stopping if needed', 'Have priority'], [1], 'Ceda el paso.', 'Give way.', 'dare-precedenza'],
      ['Para salir de una glorieta de varios carriles debe:', 'To leave a multi-lane roundabout you must:', ['Salir desde cualquier carril', 'Situarse con antelación en el carril derecho', 'Detenerse en el carril izquierdo'], ['Exit from any lane', 'Move to the right lane in advance', 'Stop in the left lane'], [1], 'La salida se hace desde el carril derecho.', 'Exit from the right lane.'],
      ['Esta señal indica:', 'This sign indicates:', ['Calzada con prioridad', 'Fin de prioridad', 'Intersección peligrosa'], ['Priority road', 'End of priority', 'Dangerous junction'], [0], 'Tiene prioridad en las intersecciones.', 'You have priority at junctions.', 'diritto-precedenza'],
      ['Un vehículo de urgencia con luz azul y sirena se aproxima:', 'An emergency vehicle with blue light and siren approaches:', ['Le facilito el paso', 'Mantengo mi carril y velocidad', 'Lo sigo'], ['I let it through', 'I keep lane and speed', 'I follow it'], [0], 'Apartarse con seguridad.', 'Move aside safely.']
    ]
  },
  {
    id: 'es-2', n: 2, icon: '⏱️', signCat: 'divieto',
    t: ['Velocidad', 'Speed'],
    lessons: [
      { h: ['Límites genéricos (turismos y motos)', 'General limits (cars and motorcycles)'], b: [
`- **Autopistas y autovías**: **120 km/h** (mínima 60 km/h).
- **Carreteras convencionales**: **90 km/h**.
- **Vías urbanas**: **50 km/h** en vías de dos o más carriles por sentido; **30 km/h** en vías de un único carril por sentido; **20 km/h** en vías de plataforma única (calzada y acera al mismo nivel).
- Se debe **adecuar la velocidad** a las condiciones de la vía, el vehículo y el tráfico.
- La velocidad mínima es la mitad de la genérica de la vía.`,
`- **Motorways and expressways**: **120 km/h** (minimum 60 km/h).
- **Conventional roads**: **90 km/h**.
- **Urban roads**: **50 km/h** with two or more lanes per direction; **30 km/h** with a single lane per direction; **20 km/h** on single-level streets.
- Always **adapt speed** to conditions.
- Minimum speed is half of the road's general limit.`] }
    ],
    q: [
      ['¿Cuál es la velocidad máxima de un turismo en autopista?', 'Maximum car speed on a motorway?', ['110 km/h', '120 km/h', '130 km/h'], ['110 km/h', '120 km/h', '130 km/h'], [1], 'También en autovía.', 'Also on expressways.', 'autostrada'],
      ['En una carretera convencional, un turismo puede circular como máximo a:', 'On a conventional road a car may go at most:', ['80 km/h', '90 km/h', '100 km/h'], ['80 km/h', '90 km/h', '100 km/h'], [1], 'Desde 2019 el límite es 90 km/h.', 'Since 2019 the limit is 90 km/h.'],
      ['En vía urbana con un único carril por sentido, la velocidad máxima es:', 'On an urban road with one lane per direction the limit is:', ['20 km/h', '30 km/h', '50 km/h'], ['20 km/h', '30 km/h', '50 km/h'], [1], 'Desde mayo de 2021.', 'Since May 2021.'],
      ['En vías de plataforma única la velocidad máxima es:', 'On single-level streets the limit is:', ['20 km/h', '30 km/h', '40 km/h'], ['20 km/h', '30 km/h', '40 km/h'], [0], 'Calzada y acera al mismo nivel.', 'Road and pavement at the same level.'],
      ['La velocidad mínima en autopista para turismos es:', 'Minimum car speed on a motorway is:', ['40 km/h', '60 km/h', '80 km/h'], ['40 km/h', '60 km/h', '80 km/h'], [1], 'La mitad de la genérica.', 'Half the general limit.'],
      ['Esta señal indica:', 'This sign indicates:', ['Velocidad mínima obligatoria', 'Velocidad máxima de 50 km/h', 'Velocidad aconsejada'], ['Compulsory minimum speed', 'Maximum 50 km/h', 'Advisory speed'], [1], 'Borde rojo = prohibición.', 'Red ring = prohibition.', 'limite-velocita'],
      ['Esta señal indica:', 'This sign indicates:', ['Velocidad mínima de 30 km/h', 'Velocidad máxima de 30 km/h', 'Zona 30'], ['Minimum 30 km/h', 'Maximum 30 km/h', '30 zone'], [0], 'Fondo azul = obligación.', 'Blue = obligation.', 'velocita-minima']
    ]
  },
  {
    id: 'es-3', n: 3, icon: '⏩', signCat: 'orizzontale',
    t: ['Adelantamiento y marcas viales', 'Overtaking and road markings'],
    lessons: [
      { h: ['Cómo y cuándo adelantar', 'How and when to overtake'], b: [
`- Se adelanta por la **izquierda**; por la derecha solo si el de delante indica giro a la izquierda y se ha desplazado, o en vías urbanas con varios carriles.
- Distancia lateral para adelantar a **ciclistas**: al menos **1,5 m**; se permite invadir el sentido contrario (incluso con línea continua) si hay visibilidad y no hay peligro.
- **Prohibido adelantar** en curvas y cambios de rasante con visibilidad reducida, pasos de peatones señalizados, intersecciones (con excepciones), túneles de un solo carril por sentido.
- **Línea continua**: no se puede pisar ni rebasar. **Discontinua**: se puede rebasar con seguridad.`,
`- Overtake on the **left**; on the right only if the vehicle ahead signals left and has moved over, or in multi-lane urban roads.
- Lateral clearance for **cyclists**: at least **1.5 m**; you may use the opposite lane (even with a continuous line) if visible and safe.
- **No overtaking** on bends and blind crests, at marked pedestrian crossings, at junctions (with exceptions), in single-lane tunnels.
- **Continuous line**: never cross. **Broken line**: may be crossed safely.`] }
    ],
    q: [
      ['Para adelantar a un ciclista debe dejar una separación lateral mínima de:', 'To overtake a cyclist leave at least:', ['1 m', '1,5 m', '2 m'], ['1 m', '1.5 m', '2 m'], [1], 'Y reducir la velocidad.', 'And slow down.', 'ciclisti'],
      ['¿Puede rebasar una línea continua para adelantar a un ciclista?', 'May you cross a continuous line to overtake a cyclist?', ['Sí, si hay visibilidad y no hay peligro', 'No, nunca', 'Solo en autopista'], ['Yes, if visible and safe', 'No, never', 'Only on motorways'], [0], 'Excepción prevista en el Reglamento.', 'Exception in the Regulations.'],
      ['Como norma general, se adelanta por:', 'As a rule you overtake on the:', ['La derecha', 'La izquierda', 'Cualquier lado'], ['Right', 'Left', 'Either side'], [1], 'Por la izquierda.', 'Left.'],
      ['Está prohibido adelantar:', 'Overtaking is forbidden:', ['En un paso de peatones señalizado', 'En una recta con buena visibilidad', 'En autovía'], ['At a marked pedestrian crossing', 'On a clear straight', 'On an expressway'], [0], 'Un peatón podría estar oculto.', 'A pedestrian may be hidden.', 'strisce-pedonali'],
      ['Una línea longitudinal continua:', 'A continuous line:', ['Se puede pisar', 'No se puede pisar ni rebasar', 'Se puede rebasar para girar'], ['May be driven on', 'Must not be crossed or driven on', 'May be crossed to turn'], [1], 'Salvo la excepción de los ciclistas.', 'Except the cyclist case.', 'striscia-continua'],
      ['Si le están adelantando, usted debe:', 'When being overtaken you must:', ['Acelerar', 'No aumentar la velocidad y ceñirse a la derecha', 'Frenar bruscamente'], ['Speed up', 'Not speed up and keep right', 'Brake sharply'], [1], 'Facilitar la maniobra.', 'Help the manoeuvre.']
    ]
  },
  {
    id: 'es-4', n: 4, icon: '🅿️',
    t: ['Parada, estacionamiento y emergencias', 'Stopping, parking and emergencies'],
    lessons: [
      { h: ['Parar, estacionar e inmovilización', 'Stopping, parking and breakdowns'], b: [
`- **Parada**: inmovilización de **menos de 2 minutos** sin abandonar el conductor el vehículo. **Estacionamiento**: inmovilización que no es detención ni parada.
- Prohibido parar en curvas y cambios de rasante sin visibilidad, pasos de peatones, intersecciones, carriles bus, túneles…
- **Inmovilización en la calzada**: encender luces de emergencia, ponerse el **chaleco reflectante** antes de salir y señalizar con la **baliza luminosa V-16 conectada**, obligatoria desde el **1 de enero de 2026** en sustitución de los triángulos.
- Llamar al **112**.`,
`- **Stop (parada)**: under **2 minutes** with the driver present. **Parking**: anything longer.
- No stopping on blind bends and crests, crossings, junctions, bus lanes, tunnels…
- **Breakdown on the road**: hazard lights, **reflective vest** before getting out, and the **connected V-16 beacon**, compulsory from **1 January 2026** replacing warning triangles.
- Call **112**.`] }
    ],
    q: [
      ['Se considera parada la inmovilización de un vehículo durante:', 'A "parada" is an immobilisation lasting:', ['Menos de 2 minutos', 'Menos de 10 minutos', 'Cualquier tiempo con el conductor fuera'], ['Under 2 minutes', 'Under 10 minutes', 'Any time with the driver away'], [0], 'Sin que el conductor abandone el vehículo.', 'With the driver present.'],
      ['Desde el 1 de enero de 2026, para señalizar un vehículo averiado en la calzada se usa:', 'From 1 January 2026 a broken-down vehicle is signalled with:', ['Los triángulos de emergencia', 'La baliza V-16 conectada', 'Solo las luces de emergencia'], ['Warning triangles', 'The connected V-16 beacon', 'Hazard lights only'], [1], 'Sustituye a los triángulos.', 'It replaces triangles.'],
      ['Antes de salir del vehículo averiado en carretera debe:', 'Before leaving a broken-down vehicle on the road you must:', ['Ponerse el chaleco reflectante', 'Colocar los triángulos a 10 m', 'Abrir el capó'], ['Put on the reflective vest', 'Place triangles 10 m away', 'Open the bonnet'], [0], 'Para ser visible.', 'To be visible.'],
      ['¿Está permitido estacionar en un carril bus?', 'May you park in a bus lane?', ['Sí, por la noche', 'No', 'Sí, con las luces de emergencia'], ['Yes, at night', 'No', 'Yes, with hazard lights'], [1], 'Prohibido parar y estacionar.', 'No stopping or parking.'],
      ['Esta señal prohíbe:', 'This sign forbids:', ['Solo estacionar', 'Parar y estacionar', 'Circular'], ['Only parking', 'Stopping and parking', 'Driving'], [1], 'Aspa roja sobre fondo azul.', 'Red cross on blue.', 'divieto-fermata'],
      ['El número de emergencias en España es:', 'The emergency number in Spain is:', ['112', '091', '061'], ['112', '091', '061'], [0], 'Número único europeo.', 'European number.']
    ]
  },
  {
    id: 'es-5', n: 5, icon: '🍺',
    t: ['El conductor: alcohol, drogas, distracciones', 'The driver: alcohol, drugs, distractions'],
    lessons: [
      { h: ['Tasas y sanciones', 'Limits and penalties'], b: [
`- **Tasa general**: **0,5 g/l** en sangre (**0,25 mg/l** en aire espirado).
- **Noveles** (menos de 2 años de permiso) y **profesionales**: **0,3 g/l** (**0,15 mg/l**).
- Superar **0,6 mg/l** en aire o 1,2 g/l en sangre es **delito**.
- **Drogas**: prohibido conducir con presencia de drogas en el organismo.
- **Teléfono móvil**: prohibido sujetarlo con la mano (**6 puntos**); también los **auriculares**.
- **Cinturón**, casco y sistemas de retención infantil: no usarlos cuesta **4 puntos**.
- **Fatiga**: descanso cada **2 horas** o 200 km.`,
`- **General limit**: **0.5 g/l** blood (**0.25 mg/l** breath).
- **New** (under 2 years) and **professional** drivers: **0.3 g/l** (**0.15 mg/l**).
- Over **0.6 mg/l** breath or 1.2 g/l blood is a **crime**.
- **Drugs**: driving with drugs in the body is forbidden.
- **Mobile phone**: holding it costs **6 points**; **earphones** also forbidden.
- **Seat belt**, helmet, child seats: not using them costs **4 points**.
- **Fatigue**: rest every **2 hours** or 200 km.`] }
    ],
    q: [
      ['La tasa máxima de alcohol en aire espirado para un conductor general es:', 'Max breath alcohol for a general driver:', ['0,15 mg/l', '0,25 mg/l', '0,50 mg/l'], ['0.15 mg/l', '0.25 mg/l', '0.50 mg/l'], [1], 'Equivale a 0,5 g/l en sangre.', 'Equivalent to 0.5 g/l blood.'],
      ['Para un conductor novel, la tasa máxima en sangre es:', 'For a new driver the blood limit is:', ['0,3 g/l', '0,5 g/l', '0,0 g/l'], ['0.3 g/l', '0.5 g/l', '0.0 g/l'], [0], 'O 0,15 mg/l en aire.', 'Or 0.15 mg/l breath.'],
      ['Conducir sujetando el móvil con la mano supone la pérdida de:', 'Driving holding the phone costs:', ['3 puntos', '4 puntos', '6 puntos'], ['3 points', '4 points', '6 points'], [2], 'Desde la reforma de 2022.', 'Since the 2022 reform.'],
      ['No usar el cinturón de seguridad supone la pérdida de:', 'Not wearing a seat belt costs:', ['2 puntos', '4 puntos', '6 puntos'], ['2 points', '4 points', '6 points'], [1], 'También el casco y la sillita infantil.', 'Also helmet and child seat.'],
      ['¿Está permitido usar auriculares mientras conduce?', 'May you use earphones while driving?', ['Sí, uno solo', 'No', 'Sí, en autopista'], ['Yes, one only', 'No', 'Yes, on motorways'], [1], 'Están prohibidos.', 'They are forbidden.'],
      ['En viajes largos se recomienda descansar cada:', 'On long trips rest every:', ['2 horas o 200 km', '4 horas', '500 km'], ['2 hours or 200 km', '4 hours', '500 km'], [0], 'Para evitar la fatiga.', 'To avoid fatigue.'],
      ['El alcohol:', 'Alcohol:', ['Mejora los reflejos', 'Aumenta el tiempo de reacción', 'Se elimina con café'], ['Improves reflexes', 'Increases reaction time', 'Is removed by coffee'], [1], 'Solo el tiempo lo elimina.', 'Only time removes it.']
    ]
  },
  {
    id: 'es-6', n: 6, icon: '🪪',
    t: ['Permiso por puntos, documentación e ITV', 'Points licence, documents and inspection'],
    lessons: [
      { h: ['Lo que debe saber', 'What you need to know'], b: [
`- **Saldo inicial**: **12 puntos**; los **noveles** empiezan con **8**. Máximo 15 puntos tras años sin infracciones.
- Placa **"L"** obligatoria durante el primer año.
- **Documentación**: permiso de conducción, permiso de circulación, tarjeta ITV en vigor y seguro obligatorio.
- **ITV de turismos**: primera a los **4 años**, después cada **2 años** hasta los 10 años y luego **anual**.
- **Niños**: los menores de **135 cm** deben usar un sistema de retención infantil y viajar, por regla general, en los asientos traseros.`,
`- **Initial balance**: **12 points**; **new drivers** start with **8**. Up to 15 after years without offences.
- **"L" plate** required during the first year.
- **Documents**: driving licence, registration, valid inspection card and compulsory insurance.
- **Car inspection (ITV)**: first at **4 years**, then every **2 years** until 10, then **yearly**.
- **Children** under **135 cm** must use a child restraint and normally sit in the rear.`] }
    ],
    q: [
      ['Un conductor novel empieza con:', 'A new driver starts with:', ['8 puntos', '12 puntos', '15 puntos'], ['8 points', '12 points', '15 points'], [0], 'Los demás con 12.', 'Others with 12.'],
      ['La placa "L" de conductor novel es obligatoria durante:', 'The "L" plate is required for:', ['6 meses', '1 año', '3 años'], ['6 months', '1 year', '3 years'], [1], 'Desde la obtención del permiso.', 'From obtaining the licence.'],
      ['La primera ITV de un turismo nuevo se pasa a los:', 'A new car\'s first inspection is at:', ['2 años', '4 años', '5 años'], ['2 years', '4 years', '5 years'], [1], 'Después cada 2 años hasta los 10.', 'Then every 2 years until 10.'],
      ['Los niños de menos de 135 cm deben:', 'Children under 135 cm must:', ['Usar un sistema de retención infantil', 'Usar solo el cinturón de adulto', 'Ir en brazos'], ['Use a child restraint', 'Use only the adult belt', 'Be held in arms'], [0], 'Adecuado a su talla y peso.', 'Suited to height and weight.'],
      ['¿Qué seguro es obligatorio?', 'Which insurance is compulsory?', ['Todo riesgo', 'Responsabilidad civil obligatoria', 'Ninguno'], ['Comprehensive', 'Compulsory third-party liability', 'None'], [1], 'Cubre los daños a terceros.', 'It covers third-party damage.']
    ]
  },
  {
    id: 'es-7', n: 7, icon: '🔧',
    t: ['Vehículo, mantenimiento y primeros auxilios', 'Vehicle, maintenance and first aid'],
    lessons: [
      { h: ['Neumáticos, luces y la conducta PAS', 'Tyres, lights and PAS'], b: [
`- **Neumáticos**: profundidad mínima del dibujo **1,6 mm**; presión en frío.
- **Luces**: de cruce de noche y en túneles; de carretera fuera de poblado sin deslumbrar; antiniebla trasera solo con niebla espesa, lluvia o nieve muy intensas.
- **ABS**: evita el bloqueo de las ruedas y permite mantener la dirección.
- **Conducta PAS**: **Proteger**, **Avisar** (112) y **Socorrer**. No mover a los heridos salvo peligro; no quitar el casco a un motorista.`,
`- **Tyres**: min tread **1.6 mm**; check pressure cold.
- **Lights**: dipped at night and in tunnels; main beam outside towns without dazzling; rear fog only in dense fog, very heavy rain or snow.
- **ABS**: prevents wheel lock and keeps steering.
- **PAS**: **Protect**, **Alert** (112), **Help**. Do not move casualties unless in danger; do not remove a rider's helmet.`] }
    ],
    q: [
      ['La profundidad mínima del dibujo de los neumáticos es:', 'Minimum tyre tread depth is:', ['1 mm', '1,6 mm', '2,5 mm'], ['1 mm', '1.6 mm', '2.5 mm'], [1], 'Mínimo legal.', 'Legal minimum.'],
      ['La luz antiniebla trasera se usa:', 'The rear fog light is used:', ['Con lluvia ligera', 'Con niebla espesa o lluvia muy intensa', 'Siempre de noche'], ['In light rain', 'In dense fog or very heavy rain', 'Always at night'], [1], 'Puede deslumbrar.', 'It can dazzle.'],
      ['La conducta PAS significa:', 'PAS means:', ['Proteger, Avisar, Socorrer', 'Parar, Apagar, Salir', 'Prevenir, Actuar, Sanar'], ['Protect, Alert, Help', 'Stop, Switch off, Leave', 'Prevent, Act, Heal'], [0], 'Orden de actuación en accidentes.', 'Accident action order.'],
      ['A un motorista herido:', 'An injured rider:', ['Le quito el casco', 'No le quito el casco', 'Le doy agua'], ['I remove the helmet', 'I do not remove the helmet', 'I give water'], [1], 'Salvo que no respire.', 'Unless not breathing.'],
      ['El sistema ABS:', 'ABS:', ['Evita el bloqueo de las ruedas', 'Elimina la distancia de frenado', 'Sustituye al freno de mano'], ['Prevents wheel lock', 'Eliminates braking distance', 'Replaces the handbrake'], [0], 'Permite mantener la dirección.', 'Keeps steering.']
    ]
  }
];
