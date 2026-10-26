// Pro agenda data: driving lessons (with hours driven), theory classes and exam appointments.

const KEY = 'patente.agenda.v2';

// Compulsory driving-school hours per country (licence B). IT: DM 20/04/2012, three 2-hour modules.
export const REQUIRED_HOURS = {
  IT: { total: 6, modules: { rural: 2, motorway: 2, night: 2 }, note: { it: 'DM 20/04/2012: 2 h extraurbane, 2 h autostrada/extraurbane principali, 2 h notturne. È annunciata una riforma a 8 ore (DM 294/2025): verifica con la tua autoscuola.', en: 'Decree 20/04/2012: 2 h rural, 2 h motorway, 2 h night. A reform to 8 hours has been announced (DM 294/2025): check with your driving school.' } },
  FR: { total: 20, modules: {}, note: { fr: 'Formation minimale de 20 heures de conduite (13 h en boîte automatique).', en: 'Minimum 20 hours of driving (13 h automatic).' } }
};

export const EVENT_TYPES = {
  drive: { icon: '🚗', color: '#2563eb', n: ['Guida', 'Leçon de conduite', 'Driving lesson', 'Clase práctica', 'Fahrstunde'] },
  theory: { icon: '📚', color: '#16a34a', n: ['Lezione di teoria', 'Cours de code', 'Theory class', 'Clase teórica', 'Theorieunterricht'] },
  examTheory: { icon: '📝', color: '#f59e0b', n: ['Esame di teoria', 'Examen du code', 'Theory test', 'Examen teórico', 'Theorieprüfung'] },
  examPractical: { icon: '🏁', color: '#dc2626', n: ['Esame pratico', 'Examen de conduite', 'Practical test', 'Examen práctico', 'Praktische Prüfung'] }
};

export const DRIVE_KINDS = {
  city: ['Urbana', 'En ville', 'Town', 'Ciudad', 'Stadt'],
  rural: ['Extraurbana', 'Hors agglomération', 'Rural roads', 'Carretera', 'Landstraße'],
  motorway: ['Autostrada', 'Autoroute', 'Motorway', 'Autopista', 'Autobahn'],
  night: ['Notturna', 'De nuit', 'Night', 'Nocturna', 'Nachtfahrt'],
  manoeuvres: ['Manovre', 'Manœuvres', 'Manoeuvres', 'Maniobras', 'Grundfahraufgaben']
};

function load() {
  try { return JSON.parse(localStorage.getItem(KEY) || 'null') || { events: [] }; } catch { return { events: [] }; }
}
const data = load();
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(data)); } catch { /* private mode */ } };

const minutes = (a, b) => {
  const [h1, m1] = a.split(':').map(Number), [h2, m2] = b.split(':').map(Number);
  return Math.max(0, h2 * 60 + m2 - (h1 * 60 + m1));
};

export const agendaStore = {
  all() { return data.events.slice().sort((a, b) => (a.date + a.start).localeCompare(b.date + b.start)); },
  add(ev) { data.events.push({ id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6), done: false, ...ev }); save(); },
  update(id, patch) { const e = data.events.find(x => x.id === id); if (e) Object.assign(e, patch); save(); },
  remove(id) { data.events = data.events.filter(x => x.id !== id); save(); },
  onDay(date) { return this.all().filter(e => e.date === date); },
  upcoming(today = new Date().toISOString().slice(0, 10)) { return this.all().filter(e => e.date >= today && !e.done); },
  nextExam() { return this.upcoming().find(e => e.type === 'examTheory' || e.type === 'examPractical') || null; },
  hours() {
    const drives = data.events.filter(e => e.type === 'drive' && e.done);
    const byKind = {};
    let total = 0;
    drives.forEach(e => { const m = minutes(e.start, e.end); total += m; byKind[e.kind] = (byKind[e.kind] || 0) + m; });
    const planned = data.events.filter(e => e.type === 'drive' && !e.done).reduce((s, e) => s + minutes(e.start, e.end), 0);
    return { total: total / 60, planned: planned / 60, byKind: Object.fromEntries(Object.entries(byKind).map(([k, v]) => [k, v / 60])) };
  },
  theoryAttendance() {
    const th = data.events.filter(e => e.type === 'theory');
    return { total: th.length, done: th.filter(e => e.done).length };
  },
  ics() {
    const pad = d => d.replace(/[-:]/g, '');
    const lines = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Patente Facile//Agenda//IT'];
    data.events.forEach(e => {
      lines.push('BEGIN:VEVENT', `UID:${e.id}@patente`, `DTSTART:${pad(e.date)}T${pad(e.start)}00`, `DTEND:${pad(e.date)}T${pad(e.end || e.start)}00`, `SUMMARY:${(EVENT_TYPES[e.type]?.icon || '')} ${e.title || ''}`.trim(), `LOCATION:${e.place || ''}`, `DESCRIPTION:${(e.instructor ? e.instructor + ' - ' : '') + (e.notes || '')}`, 'END:VEVENT');
    });
    lines.push('END:VCALENDAR');
    return lines.join('\r\n');
  }
};
