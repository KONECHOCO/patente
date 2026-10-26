// Country presets: official exam format, licence categories, key legal values.
// Values were checked against public sources in October 2026; `verify` marks data
// that official sources do not publish clearly, so the UI can flag it.

export const LANGS = {
  it: { name: 'Italiano', flag: '🇮🇹' },
  fr: { name: 'Français', flag: '🇫🇷' },
  en: { name: 'English', flag: '🇬🇧' },
  es: { name: 'Español', flag: '🇪🇸' },
  de: { name: 'Deutsch', flag: '🇩🇪' }
};

export const COUNTRIES = {
  IT: {
    code: 'IT', flag: '🇮🇹', name: 'Italia', defaultLang: 'it', contentLangs: ['it', 'en'], drive: 'right',
    authority: 'Ministero delle Infrastrutture e dei Trasporti · Motorizzazione Civile',
    lawName: 'Codice della Strada (D.Lgs. 285/1992, riforma L. 177/2024)',
    exam: {
      B: { questions: 30, minutes: 20, maxErrors: 3, format: 'tf' },
      AM: { questions: 30, minutes: 30, maxErrors: 3, format: 'tf' }
    },
    examNotes: {
      it: ['Scheda di 30 affermazioni Vero/Falso estratte dal listato ministeriale (circolare MIT prot. 19281 del 5/7/2024).', 'Tempo: 20 minuti (patente AM: 30 minuti). Promossi con al massimo 3 errori.', 'Si può scorrere la scheda e cambiare le risposte fino alla consegna.', 'La teoria va superata entro 6 mesi dalla domanda, con al massimo 2 tentativi.', 'Il foglio rosa vale 12 mesi; servono 6 ore di guida obbligatoria in autoscuola (extraurbane/autostrada e notturna).'],
      en: ['30 True/False statements drawn from the ministerial question bank (MIT circular 19281, 5 July 2024).', 'Time: 20 minutes (AM licence: 30 minutes). Pass with at most 3 errors.', 'You can move through the sheet and change answers until you submit.', 'The theory test must be passed within 6 months of application, at most 2 attempts.', 'The learner permit (foglio rosa) is valid 12 months; 6 compulsory driving-school hours (rural/motorway and night).']
    },
    speed: { unit: 'km/h', urban: 50, rural: 90, expressway: 110, motorway: 130, rain: { motorway: 110, expressway: 90 }, novice: { motorway: 100, expressway: 90 } },
    alcohol: { general: '0,5 g/l', novice: '0,0 g/l (neopatentati 3 anni, under 21, professionali)' },
    points: { total: 20, note: { it: '20 punti; ai neopatentati (primi 3 anni) le decurtazioni sono raddoppiate.', en: '20 points; deductions are doubled for new drivers (first 3 years).' } },
    novice: { it: 'Neopatentati per 3 anni: massimo 100 km/h in autostrada e 90 km/h su extraurbane principali, alcol zero, veicoli fino a 75 kW/t e (auto M1) 105 kW.', en: 'New drivers for 3 years: max 100 km/h on motorways and 90 km/h on main rural roads, zero alcohol, vehicles up to 75 kW/t and (M1 cars) 105 kW.' },
    licences: [
      { id: 'AM', age: 14 }, { id: 'A1', age: 16 }, { id: 'A2', age: 18 }, { id: 'A', age: 24, note: '20 con A2 da 2 anni' },
      { id: 'B1', age: 16 }, { id: 'B', age: 18 }, { id: 'BE', age: 18 }, { id: 'C1', age: 18 }, { id: 'C', age: 21 },
      { id: 'CE', age: 21 }, { id: 'D1', age: 21 }, { id: 'D', age: 24 }, { id: 'DE', age: 24 }
    ],
    practical: { it: 'Esame pratico con esaminatore della Motorizzazione: verifica dei comandi, manovre (parcheggio, retromarcia), guida in traffico urbano ed extraurbano. Errori gravi (precedenza, semaforo rosso, pericolo) comportano la bocciatura immediata.', en: 'Road test with a Motorizzazione examiner: controls check, manoeuvres (parking, reversing), driving in urban and rural traffic. Serious errors (right of way, red light, danger) mean an immediate fail.' },
    sources: ['https://www.mit.gov.it', 'https://www.ilportaledellautomobilista.it']
  },
  FR: {
    code: 'FR', flag: '🇫🇷', name: 'France', defaultLang: 'fr', contentLangs: ['fr', 'en'], drive: 'right',
    authority: 'Ministère de l\'Intérieur · Sécurité routière · opérateurs agréés (La Poste, SGS, Dekra…)',
    lawName: 'Code de la route',
    exam: { B: { questions: 40, minutes: 30, maxErrors: 5, format: 'mcq-multi' }, AM: { questions: 40, minutes: 30, maxErrors: 5, format: 'mcq-multi' } },
    examNotes: {
      fr: ['ETG : 40 questions à choix multiples (une ou plusieurs bonnes réponses), environ 30 minutes.', 'Réussite avec au moins 35 bonnes réponses sur 40 (5 fautes maximum).', 'Une réponse n\'est juste que si toutes les propositions exactes sont cochées.', 'Examen passé chez un opérateur agréé, résultat sous 48 h ; valable 5 ans pour 5 présentations à l\'épreuve pratique.', 'Épreuve pratique : 32 minutes de conduite, au moins 20 points sur 31 sans faute éliminatoire ; formation minimale de 20 h (13 h en boîte automatique).'],
      en: ['ETG: 40 multiple-choice questions (one or more correct answers), about 30 minutes.', 'Pass with at least 35 correct answers out of 40 (max 5 errors).', 'An answer counts only if all correct options are ticked.', 'Taken at an approved centre; valid 5 years for 5 practical attempts.', 'Practical test: 32 minutes of driving, at least 20/31 points with no eliminating fault; minimum 20 h training (13 h automatic).']
    },
    speed: { unit: 'km/h', urban: 50, rural: 80, expressway: 110, motorway: 130, rain: { motorway: 110, expressway: 100, rural: 70 }, novice: { motorway: 110, expressway: 100, rural: 80 } },
    alcohol: { general: '0,5 g/l (0,25 mg/l d\'air)', novice: '0,2 g/l pendant le permis probatoire' },
    points: { total: 12, note: { fr: '12 points ; permis probatoire de 3 ans (2 ans avec la conduite accompagnée) démarrant à 6 points.', en: '12 points; 3-year probationary licence (2 with accompanied driving) starting with 6 points.' } },
    novice: { fr: 'Jeunes conducteurs : 110 km/h sur autoroute, 100 km/h sur route à chaussées séparées, 80 km/h ailleurs ; disque « A » obligatoire ; 0,2 g/l.', en: 'Probationary drivers: 110 km/h motorway, 100 km/h dual carriageway, 80 km/h elsewhere; "A" disc required; 0.2 g/l.' },
    licences: [
      { id: 'AM', age: 14 }, { id: 'A1', age: 16 }, { id: 'A2', age: 18 }, { id: 'A', age: 24, note: '20 ans après 2 ans de A2' },
      { id: 'B1', age: 16 }, { id: 'B', age: 17 }, { id: 'BE', age: 18 }, { id: 'C1', age: 18 }, { id: 'C', age: 21 },
      { id: 'CE', age: 21 }, { id: 'D1', age: 21 }, { id: 'D', age: 24 }, { id: 'DE', age: 24 }
    ],
    practical: { fr: 'Évaluation sur 31 points : connaître et maîtriser son véhicule, appréhender la route, partager la route, autonomie et conscience du risque, courtoisie et conduite économique.', en: 'Scored out of 31: vehicle control, reading the road, sharing the road, autonomy and risk awareness, courtesy and eco-driving.' },
    sources: ['https://www.securite-routiere.gouv.fr', 'https://www.service-public.fr']
  },
  ES: {
    code: 'ES', flag: '🇪🇸', name: 'España', defaultLang: 'es', contentLangs: ['es', 'en'], drive: 'right',
    authority: 'Dirección General de Tráfico (DGT)',
    lawName: 'Ley sobre Tráfico y Reglamento General de Circulación',
    exam: { B: { questions: 30, minutes: 30, maxErrors: 3, format: 'mcq' } },
    examNotes: {
      es: ['Examen teórico: 30 preguntas con 3 respuestas, solo una correcta.', 'Tiempo: 30 minutos. Se permiten como máximo 3 fallos.', 'Una vez aprobado, el teórico es válido para presentarse al práctico durante 2 años.', 'El permiso B se obtiene a los 18 años; los conductores noveles llevan la placa "L" durante 1 año.'],
      en: ['Theory test: 30 questions with 3 options, only one correct.', 'Time: 30 minutes. Maximum 3 errors.', 'Once passed, it remains valid for the practical test for 2 years.', 'Licence B at 18; new drivers display the "L" plate for 1 year.']
    },
    speed: { unit: 'km/h', urban: 50, urbanSingleLane: 30, rural: 90, expressway: 120, motorway: 120 },
    alcohol: { general: '0,5 g/l en sangre (0,25 mg/l aire)', novice: '0,3 g/l (0,15 mg/l) noveles y profesionales' },
    points: { total: 12, note: { es: 'Carné por puntos: 12 puntos (8 para noveles durante los primeros años).', en: 'Points licence: 12 points (8 for new drivers in the first years).' } },
    novice: { es: 'Noveles: placa "L" obligatoria durante 1 año y tasa de alcohol reducida.', en: 'New drivers: "L" plate for 1 year and lower alcohol limit.' },
    licences: [
      { id: 'AM', age: 15 }, { id: 'A1', age: 16 }, { id: 'A2', age: 18 }, { id: 'A', age: 20, note: 'con A2 durante 2 años' },
      { id: 'B', age: 18 }, { id: 'BE', age: 18 }, { id: 'C1', age: 18 }, { id: 'C', age: 21 }, { id: 'D1', age: 21 }, { id: 'D', age: 24 }
    ],
    practical: { es: 'Prueba de circulación en vías abiertas al tráfico; las faltas se clasifican en eliminatorias, deficientes y leves.', en: 'On-road test; faults are classified as eliminating, serious and minor.' },
    sources: ['https://www.dgt.es']
  },
  DE: {
    code: 'DE', flag: '🇩🇪', name: 'Deutschland', defaultLang: 'de', contentLangs: ['de', 'en'], drive: 'right',
    authority: 'Kraftfahrt-Bundesamt · TÜV / DEKRA (Prüfstellen)',
    lawName: 'Straßenverkehrs-Ordnung (StVO) · Fahrerlaubnis-Verordnung (FeV)',
    exam: { B: { questions: 30, minutes: 45, maxPoints: 10, format: 'mcq-multi', weighted: true } },
    examNotes: {
      de: ['Klasse B (Ersterwerb): 30 Fragen – 20 aus dem Grundstoff und 10 aus dem Zusatzstoff Klasse B, auch Video- und Zahlenfragen.', 'Jede Frage hat 2 bis 5 Fehlerpunkte. Bestanden mit höchstens 10 Fehlerpunkten.', 'Nicht bestanden, wenn zwei 5-Punkte-Fragen falsch sind (also schon mit 10 Punkten).', 'Mehrere Antworten können richtig sein; alle richtigen müssen angekreuzt werden.', 'Praktische Prüfung Klasse B: rund 55 Minuten inklusive Grundfahraufgaben.'],
      en: ['Class B (first licence): 30 questions – 20 core and 10 class-B specific, including video and number questions.', 'Each question is worth 2 to 5 error points. Pass with at most 10 error points.', 'Fail if two 5-point questions are wrong (even with exactly 10 points).', 'Several answers can be correct; all must be ticked.', 'Class B practical test: about 55 minutes including basic manoeuvres.']
    },
    speed: { unit: 'km/h', urban: 50, rural: 100, expressway: 100, motorway: 130, motorwayAdvisory: true },
    alcohol: { general: '0,5 ‰ (ab 0,3 ‰ mit Ausfallerscheinungen strafbar)', novice: '0,0 ‰ in der Probezeit und unter 21 Jahren' },
    points: { total: 8, note: { de: 'Fahreignungsregister Flensburg: bei 8 Punkten wird die Fahrerlaubnis entzogen. Probezeit 2 Jahre.', en: 'Flensburg register: licence withdrawn at 8 points. 2-year probation.' } },
    novice: { de: 'Probezeit 2 Jahre; begleitetes Fahren ab 17 (BF17).', en: '2-year probation; accompanied driving from 17 (BF17).' },
    licences: [
      { id: 'AM', age: 15 }, { id: 'A1', age: 16 }, { id: 'A2', age: 18 }, { id: 'A', age: 24, note: '20 mit A2 seit 2 Jahren' },
      { id: 'B', age: 18, note: '17 mit BF17' }, { id: 'BE', age: 18 }, { id: 'C1', age: 18 }, { id: 'C', age: 21 }, { id: 'D1', age: 21 }, { id: 'D', age: 24 }
    ],
    practical: { de: 'Prüfungsfahrt mit amtlich anerkanntem Prüfer: Abfahrtkontrolle, Grundfahraufgaben, Fahrt innerorts, außerorts und auf der Autobahn.', en: 'Road test with an official examiner: vehicle check, basic manoeuvres, urban, rural and motorway driving.' },
    sources: ['https://www.kba.de', 'https://www.tuev-nord.de']
  },
  UK: {
    code: 'UK', flag: '🇬🇧', name: 'United Kingdom', defaultLang: 'en', contentLangs: ['en'], drive: 'left',
    authority: 'Driver and Vehicle Standards Agency (DVSA) · DVA in Northern Ireland',
    lawName: 'The Highway Code',
    exam: { B: { questions: 50, minutes: 57, maxErrors: 7, format: 'mcq' } },
    examNotes: {
      en: ['Multiple-choice part: 50 questions in 57 minutes; pass mark 43/50.', 'Hazard perception part: 14 video clips (one with two hazards), 75 points; pass mark 44.', 'You must pass both parts in the same sitting.', 'Practical test: about 40 minutes, including independent driving; pass with 15 or fewer driving faults and no serious or dangerous fault.', 'The UK drives on the LEFT; speed limits are in mph.']
    },
    speed: { unit: 'mph', urban: 30, rural: 60, expressway: 70, motorway: 70 },
    alcohol: { general: '80 mg per 100 ml of blood (England, Wales, NI)', novice: '50 mg per 100 ml in Scotland' },
    points: { total: 12, note: { en: '12 penalty points within 3 years = disqualification; new drivers lose their licence with 6 points within 2 years of passing.' } },
    novice: { en: 'New drivers: 6 penalty points within 2 years of passing revokes the licence. Optional green "P" plates.' },
    licences: [{ id: 'AM', age: 16 }, { id: 'A1', age: 17 }, { id: 'A2', age: 19 }, { id: 'A', age: 24, note: '21 via progressive access' }, { id: 'B', age: 17 }],
    practical: { en: 'Eyesight check, "show me, tell me" questions, general driving, one reversing exercise and about 20 minutes of independent driving.' },
    sources: ['https://www.gov.uk/theory-test', 'https://www.gov.uk/guidance/the-highway-code']
  },
  CI: {
    code: 'CI', flag: '🇨🇮', name: 'Côte d\'Ivoire', defaultLang: 'fr', contentLangs: ['fr', 'en'], drive: 'right',
    authority: 'Ministère des Transports · DGTTC · OSER (Office de la Sécurité Routière)',
    lawName: 'Code de la route ivoirien',
    exam: { B: { questions: 40, minutes: 30, maxErrors: 5, format: 'mcq', verify: true } },
    examNotes: {
      fr: ['Épreuve théorique informatisée (QCM sur tablette, en français) suivie d\'une épreuve pratique.', 'Le nombre exact de questions et le seuil ne sont pas publiés clairement : la simulation utilise un format indicatif de 40 questions (5 fautes max). Vérifiez auprès de votre auto-école ou de la DGTTC.', 'Limitations rappelées par le Ministère des Transports (août 2025) pour les véhicules légers : 70 km/h en agglomération, 110 km/h sur routes nationales, 120 km/h sur autoroute.'],
      en: ['Computer-based theory test (MCQ on tablet, in French) followed by a practical test.', 'The exact number of questions and pass mark are not clearly published: the simulation uses an indicative 40-question format. Check with your driving school or the DGTTC.', 'Speed limits restated by the Ministry of Transport (Aug 2025) for light vehicles: 70 km/h in towns, 110 km/h on national roads, 120 km/h on motorways.']
    },
    speed: { unit: 'km/h', urban: 70, rural: 110, expressway: 110, motorway: 120, verify: true },
    alcohol: null,
    points: { total: null, note: { fr: 'Renseignez-vous auprès de la DGTTC pour le régime de sanctions en vigueur.', en: 'Check with the DGTTC for the current penalty system.' } },
    novice: null,
    licences: [{ id: 'A', age: 18 }, { id: 'B', age: 18 }, { id: 'C', age: 21 }, { id: 'D', age: 21 }, { id: 'E', age: 21 }],
    practical: { fr: 'Épreuve en circulation avec un examinateur : manœuvres, respect de la signalisation et des priorités.', en: 'On-road test with an examiner: manoeuvres, signs and priorities.' },
    sources: ['https://www.transports.gouv.ci']
  }
};

// Licence category descriptions (EU Directive 2006/126 definitions, shared by IT/FR/ES/DE/UK).
export const LICENCE_INFO = {
  AM: { icon: '🛵', it: 'Ciclomotori fino a 45 km/h e quadricicli leggeri', fr: 'Cyclomoteurs jusqu\'à 45 km/h et voiturettes', en: 'Mopeds up to 45 km/h and light quadricycles', es: 'Ciclomotores hasta 45 km/h y cuadriciclos ligeros', de: 'Kleinkrafträder bis 45 km/h und leichte Vierräder' },
  A1: { icon: '🏍️', it: 'Motocicli fino a 125 cc e 11 kW', fr: 'Motos jusqu\'à 125 cm³ et 11 kW', en: 'Motorcycles up to 125 cc and 11 kW', es: 'Motos hasta 125 cc y 11 kW', de: 'Krafträder bis 125 cm³ und 11 kW' },
  A2: { icon: '🏍️', it: 'Motocicli fino a 35 kW', fr: 'Motos jusqu\'à 35 kW', en: 'Motorcycles up to 35 kW', es: 'Motos hasta 35 kW', de: 'Krafträder bis 35 kW' },
  A: { icon: '🏍️', it: 'Tutti i motocicli', fr: 'Toutes les motos', en: 'All motorcycles', es: 'Todas las motocicletas', de: 'Alle Krafträder' },
  B1: { icon: '🚙', it: 'Quadricicli pesanti', fr: 'Quadricycles lourds', en: 'Heavy quadricycles', es: 'Cuadriciclos pesados', de: 'Schwere Vierräder' },
  B: { icon: '🚗', it: 'Auto fino a 3.500 kg e 8 passeggeri + conducente', fr: 'Voitures jusqu\'à 3,5 t et 8 passagers', en: 'Cars up to 3,500 kg and 8 passengers', es: 'Turismos hasta 3.500 kg y 8 pasajeros', de: 'Pkw bis 3,5 t und 8 Fahrgäste' },
  BE: { icon: '🚐', it: 'Auto con rimorchio fino a 3.500 kg', fr: 'Voiture + remorque jusqu\'à 3,5 t', en: 'Car with trailer up to 3,500 kg', es: 'Turismo con remolque hasta 3.500 kg', de: 'Pkw mit Anhänger bis 3,5 t' },
  C1: { icon: '🚚', it: 'Autocarri da 3.500 a 7.500 kg', fr: 'Camions de 3,5 à 7,5 t', en: 'Lorries 3.5–7.5 t', es: 'Camiones de 3,5 a 7,5 t', de: 'Lkw 3,5 bis 7,5 t' },
  C: { icon: '🚛', it: 'Autocarri oltre 3.500 kg', fr: 'Poids lourds de plus de 3,5 t', en: 'Lorries over 3.5 t', es: 'Camiones de más de 3,5 t', de: 'Lkw über 3,5 t' },
  CE: { icon: '🚛', it: 'Autoarticolati e autotreni', fr: 'Ensembles articulés', en: 'Articulated lorries', es: 'Conjuntos articulados', de: 'Sattelzüge und Lastzüge' },
  D1: { icon: '🚐', it: 'Minibus fino a 16 passeggeri', fr: 'Minibus jusqu\'à 16 passagers', en: 'Minibuses up to 16 passengers', es: 'Microbuses hasta 16 pasajeros', de: 'Kleinbusse bis 16 Fahrgäste' },
  D: { icon: '🚌', it: 'Autobus', fr: 'Autobus et autocars', en: 'Buses and coaches', es: 'Autobuses', de: 'Busse' },
  DE: { icon: '🚌', it: 'Autobus con rimorchio', fr: 'Autobus avec remorque', en: 'Buses with trailer', es: 'Autobuses con remolque', de: 'Busse mit Anhänger' },
  E: { icon: '🚛', it: 'Veicoli con rimorchio pesante', fr: 'Véhicules avec remorque lourde', en: 'Vehicles with heavy trailer', es: 'Vehículos con remolque pesado', de: 'Fahrzeuge mit schwerem Anhänger' }
};

export function detectCountry() {
  const nav = (navigator.languages && navigator.languages[0]) || navigator.language || 'it-IT';
  const [lang, region] = nav.split('-');
  const byRegion = { IT: 'IT', FR: 'FR', ES: 'ES', DE: 'DE', AT: 'DE', GB: 'UK', CI: 'CI', BE: 'FR', CH: 'IT' };
  if (region && byRegion[region.toUpperCase()]) return byRegion[region.toUpperCase()];
  const byLang = { it: 'IT', fr: 'FR', es: 'ES', de: 'DE', en: 'UK' };
  return byLang[lang] || 'IT';
}
