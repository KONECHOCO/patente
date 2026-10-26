// United Kingdom – DVSA theory test topics (The Highway Code). English only.
// [question, options[], correct[], explanation, sign?]

export default [
  {
    id: 'uk-1', n: 1, icon: '👀', t: ['Alertness and attitude'],
    lessons: [{ h: ['Stay alert, stay calm'], b: [
`- Before moving off, changing lane or turning: **Mirrors – Signal – Manoeuvre (MSM)**, plus a **blind-spot check** when needed.
- **Mobile phones**: it is illegal to hold and use one while driving (6 penalty points and £200); hands-free is legal but still distracting.
- **Tiredness**: plan a **15-minute break every 2 hours**.
- **Hierarchy of road users** (2022): those who can cause the greatest harm have the greatest responsibility to reduce danger to others.
- Never react to aggressive drivers; let them pass.`] }],
    q: [
      ['What should you do before making a U-turn?', ['Give an arm signal', 'Check road markings to see that U-turns are permitted', 'Look over your shoulder for a final check', 'Select a higher gear'], [1, 2], 'Check it is allowed and look all around.'],
      ['How many penalty points for using a hand-held phone while driving?', ['3', '4', '6', '9'], [2], 'And a £200 fine. New drivers lose their licence.'],
      ['How often should you take a break on a long journey?', ['Every 4 hours', 'At least 15 minutes every 2 hours', 'Only when tired', 'Every 100 miles'], [1], 'Highway Code advice.'],
      ['Under the hierarchy of road users, who has the greatest responsibility?', ['Pedestrians', 'Cyclists', 'Drivers of large vehicles', 'Horse riders'], [2], 'Those who can cause most harm.'],
      ['What does MSM stand for?', ['Mirrors – Signal – Manoeuvre', 'Move – Stop – Move', 'Mirror – Speed – Move', 'Manoeuvre – Signal – Mirror'], [0], 'The basic routine.']
    ]
  },
  {
    id: 'uk-2', n: 2, icon: '↔️', t: ['Safety margins'],
    lessons: [{ h: ['Stopping distances'], b: [
`Typical **stopping distances** (thinking + braking) in good conditions:
- 20 mph: **12 m** · 30 mph: **23 m** · 40 mph: **36 m** · 50 mph: **53 m** · 60 mph: **73 m** · 70 mph: **96 m**.
- Keep at least a **two-second gap**; **double** it on wet roads and up to **ten times** on icy roads.
- In fog, use dipped headlights; use fog lights when visibility is seriously reduced, **generally under 100 m**.`] }],
    q: [
      ['What is the typical stopping distance at 30 mph?', ['12 m', '23 m', '36 m', '53 m'], [1], 'Thinking 9 m + braking 14 m.'],
      ['What is the typical stopping distance at 70 mph?', ['53 m', '73 m', '96 m', '120 m'], [2], 'About 24 car lengths.'],
      ['On a wet road the two-second gap should be at least:', ['The same', 'Doubled', 'Tripled', 'Ten times'], [1], 'Four seconds.'],
      ['On icy roads braking distances can be up to:', ['Twice as long', 'Five times', 'Ten times as long', 'The same'], [2], 'Drive very gently.'],
      ['When should you use front or rear fog lights?', ['When visibility is seriously reduced, generally below 100 m', 'In light rain', 'At night', 'In tunnels'], [0], 'Switch them off when visibility improves.']
    ]
  },
  {
    id: 'uk-3', n: 3, icon: '⚠️', t: ['Hazard awareness and vulnerable road users'],
    lessons: [{ h: ['Look out for others'], b: [
`- At a junction, **give way to pedestrians crossing or waiting to cross** the road you are turning into (2022 rule).
- **Zebra crossing**: give way to pedestrians on the crossing; **pelican** with flashing amber: give way to pedestrians still crossing.
- **Cyclists**: leave at least **1.5 m** at speeds up to 30 mph, more at higher speeds.
- **Horses**: pass wide and slowly, at no more than **10 mph**, leaving at least **2 m**.
- Watch for children near schools and ice-cream vans.`] }],
    q: [
      ['You are turning left into a side road and a pedestrian is waiting to cross it. What should you do?', ['Carry on, you have priority', 'Give way to the pedestrian', 'Sound the horn', 'Wave them across'], [1], 'Highway Code rule H2.', 'attraversamento-pedonale'],
      ['How much space should you leave when overtaking a cyclist at up to 30 mph?', ['0.5 m', '1 m', '1.5 m', '3 m'], [2], 'More at higher speeds.', 'ciclisti'],
      ['At what maximum speed should you pass a horse?', ['10 mph', '20 mph', '30 mph', '40 mph'], [0], 'And leave at least 2 m.'],
      ['At a pelican crossing the amber light is flashing. What must you do?', ['Give way to pedestrians on the crossing', 'Stop and wait for green', 'Speed up', 'Sound the horn'], [0], 'Go only if the crossing is clear.'],
      ['Elderly pedestrians are crossing slowly. What should you do?', ['Be patient and allow them to cross in their own time', 'Rev the engine', 'Edge forward', 'Sound the horn'], [0], 'Never hurry them.']
    ]
  },
  {
    id: 'uk-4', n: 4, icon: '🛣️', t: ['Motorway rules'],
    lessons: [{ h: ['Motorways'], b: [
`- National limit for cars: **70 mph**.
- **Keep left** unless overtaking; do not overtake on the left except in congestion when lanes move in queues.
- **Hard shoulder**: emergencies only. On **smart motorways** a **red X** means the lane is closed – never drive in it.
- Breakdown: leave by the **left-hand door**, wait **behind the barrier**, call for help.
- **Learner drivers** may use motorways only with an approved instructor in a dual-controlled car.`] }],
    q: [
      ['What does a red X above a motorway lane mean?', ['Lane closed, do not drive in it', 'Slow down', 'Lane for buses', 'End of restrictions'], [0], 'It is an offence to ignore it.'],
      ['When may you use the hard shoulder?', ['In an emergency', 'To overtake', 'To answer a phone call', 'When traffic is slow'], [0], 'Emergencies only (unless signs open it).'],
      ['What is the national speed limit for cars on motorways?', ['60 mph', '70 mph', '80 mph', '50 mph'], [1], 'Unless signs show lower.', 'autostrada'],
      ['Your car breaks down on the motorway. You should:', ['Leave by the left-hand door and wait behind the barrier', 'Stay in the car', 'Walk along the carriageway', 'Place a warning triangle on the hard shoulder'], [0], 'Do not use a warning triangle on motorways.'],
      ['Which lane should you normally use on a three-lane motorway?', ['The left-hand lane', 'The middle lane', 'The right-hand lane', 'Any lane'], [0], 'Keep left unless overtaking.']
    ]
  },
  {
    id: 'uk-5', n: 5, icon: '🔄', t: ['Rules of the road and junctions'],
    lessons: [{ h: ['Speed limits and junctions'], b: [
`- **Cars**: 30 mph in built-up areas (street lights), **60 mph** single carriageways, **70 mph** dual carriageways and motorways.
- **Roundabouts**: go **clockwise** and **give way to traffic from your right**.
- **Box junctions** (yellow criss-cross): do not enter unless your exit is clear (except when turning right and blocked only by oncoming traffic).
- **Unmarked crossroads**: nobody has priority – proceed with great care.
- **Horn**: not in a built-up area between **11.30 pm and 7 am** while moving.`] }],
    q: [
      ['What is the national speed limit for cars on a single carriageway?', ['50 mph', '60 mph', '70 mph', '40 mph'], [1], '70 on dual carriageways.'],
      ['At a roundabout you should give way to traffic:', ['From your right', 'From your left', 'Already behind you', 'Nobody'], [0], 'UK roundabouts run clockwise.', 'rotatoria'],
      ['You may wait in a yellow box junction when:', ['Turning right and blocked only by oncoming traffic', 'The lights are red', 'Traffic ahead is queuing', 'Never'], [0], 'Otherwise only enter when your exit is clear.'],
      ['Who has priority at an unmarked crossroads?', ['Traffic on the wider road', 'Nobody', 'Vehicles from the right', 'The first to arrive'], [1], 'Look carefully in all directions.'],
      ['When must you not sound your horn?', ['In a built-up area between 11.30 pm and 7 am', 'On a motorway', 'At any time', 'When overtaking'], [0], 'Unless another road user poses a danger.'],
      ['What is the usual speed limit in a built-up area with street lights?', ['20 mph', '30 mph', '40 mph', '50 mph'], [1], 'Unless signs show otherwise.', 'mph30']
    ]
  },
  {
    id: 'uk-6', n: 6, icon: '🪪', t: ['Documents, vehicle safety and incidents'],
    lessons: [{ h: ['Legal requirements'], b: [
`- **MOT**: first test when the car is **3 years old**, then **every year**.
- **Tyres**: at least **1.6 mm** tread across the central three-quarters.
- **Drink-drive limit**: **80 mg** alcohol per 100 ml of blood in England, Wales and NI; **50 mg** in Scotland.
- **Child seats**: children under **12** or under **135 cm** must use a suitable child restraint.
- **New drivers**: **6 points** within 2 years of passing = licence revoked.
- At an incident: warn traffic (hazard lights), call **999 or 112**, do not move casualties unless in danger, do not remove a motorcyclist's helmet.`] }],
    q: [
      ['When does a car need its first MOT?', ['After 1 year', 'After 3 years', 'After 5 years', 'Never'], [1], 'Then every year.'],
      ['What is the minimum legal tread depth for car tyres?', ['1 mm', '1.6 mm', '2 mm', '3 mm'], [1], 'Across the central three-quarters.'],
      ['A new driver gets 6 penalty points within 2 years of passing. What happens?', ['Licence revoked', 'Nothing', 'A fine only', 'Retake hazard test only'], [0], 'They must reapply and retake both tests.'],
      ['Children under 12 years or 135 cm must:', ['Use a suitable child restraint', 'Sit in the front', 'Wear an adult belt only', 'Travel without a belt'], [0], 'Suitable for their weight.'],
      ['At an incident, a motorcyclist is injured. You should:', ['Not remove their helmet unless essential', 'Remove the helmet immediately', 'Give them a drink', 'Move them to the pavement'], [0], 'Risk of spinal injury.'],
      ['What is the legal alcohol limit for drivers in Scotland?', ['50 mg per 100 ml of blood', '80 mg per 100 ml', '0 mg', '100 mg'], [0], 'England, Wales and NI: 80 mg.']
    ]
  }
];
