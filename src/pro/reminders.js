// Pro: local notifications for agenda events and a daily study reminder (native app only).
import { Capacitor } from '@capacitor/core';
import { LocalNotifications } from '@capacitor/local-notifications';
import { agendaStore, EVENT_TYPES } from './agenda.js';
import { store } from '../core/store.js';

const native = Capacitor.isNativePlatform();
const LI = { it: 0, fr: 1, en: 2, es: 3, de: 4 };
const TXT = {
  in1h: ['Tra 1 ora', 'Dans 1 heure', 'In 1 hour', 'En 1 hora', 'In 1 Stunde'],
  tomorrow: ['Domani', 'Demain', 'Tomorrow', 'Mañana', 'Morgen'],
  examTip: ['Ripassa gli errori e riposa bene stanotte. In bocca al lupo!', 'Revois tes erreurs et repose-toi bien. Bonne chance !', 'Review your mistakes and get a good night\'s sleep. Good luck!', 'Repasa tus fallos y descansa bien. ¡Suerte!', 'Wiederhole deine Fehler und schlaf gut. Viel Glück!'],
  studyTitle: ['È ora di ripassare', 'C\'est l\'heure de réviser', 'Time to study', 'Hora de repasar', 'Zeit zum Lernen'],
  studyBody: ['10 minuti al giorno di quiz fanno la differenza all\'esame.', '10 minutes de code par jour font la différence.', '10 minutes of questions a day make the difference.', '10 minutos al día marcan la diferencia.', '10 Minuten täglich machen den Unterschied.']
};
const tr = (k, lang) => TXT[k][LI[lang] ?? 2];

export const remindersAvailable = native;

export async function ensurePermission() {
  if (!native) return false;
  const st = await LocalNotifications.checkPermissions();
  if (st.display === 'granted') return true;
  const req = await LocalNotifications.requestPermissions();
  return req.display === 'granted';
}

// Recreates all reminders from the agenda (ids 1..999) plus the daily study reminder (id 1000).
export async function syncReminders() {
  if (!native || !store.pro) return;
  const s = store.settings;
  if (!s.reminders) { await cancelAll(); return; }
  if (!(await ensurePermission())) return;
  await cancelAll();
  const lang = s.lang;
  const now = Date.now();
  const list = [];
  let id = 1;
  agendaStore.upcoming().forEach(e => {
    const at = new Date(`${e.date}T${e.start}:00`).getTime();
    const name = EVENT_TYPES[e.type].n[LI[lang] ?? 2];
    const isExam = e.type === 'examTheory' || e.type === 'examPractical';
    if (at - 3600e3 > now) list.push({ id: id++, title: `${EVENT_TYPES[e.type].icon} ${tr('in1h', lang)}: ${name}`, body: [e.start, e.place, e.instructor].filter(Boolean).join(' · '), schedule: { at: new Date(at - 3600e3) } });
    if (isExam && at - 86400e3 > now) list.push({ id: id++, title: `${EVENT_TYPES[e.type].icon} ${tr('tomorrow', lang)}: ${name}`, body: tr('examTip', lang), schedule: { at: new Date(at - 86400e3 + 4 * 3600e3) } });
  });
  if (s.studyTime) {
    const [h, m] = s.studyTime.split(':').map(Number);
    list.push({ id: 1000, title: `📚 ${tr('studyTitle', lang)}`, body: tr('studyBody', lang), schedule: { on: { hour: h, minute: m }, repeats: true, allowWhileIdle: true } });
  }
  if (list.length) await LocalNotifications.schedule({ notifications: list.slice(0, 60) });
}

async function cancelAll() {
  const { notifications } = await LocalNotifications.getPending();
  if (notifications.length) await LocalNotifications.cancel({ notifications: notifications.map(n => ({ id: n.id })) });
}
