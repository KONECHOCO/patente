// Agenda & Exam Manager: In-Car Lessons, Official Exam Booking, Compulsory Hours & Theory Log

export class AgendaManager {
  constructor() {
    this.lessonsKey = 'drivemaster_practical_lessons';
    this.examKey = 'drivemaster_official_exam';
    this.theoryKey = 'drivemaster_theory_attendance';
    this.initDefaultData();
  }

  initDefaultData() {
    if (!localStorage.getItem(this.lessonsKey)) {
      const defaultLessons = [
        {
          id: 'les-1',
          date: '2026-10-20',
          time: '10:00 - 11:00',
          instructor: 'Marco Rossi',
          type: 'Guida Notturna (Obbligatoria)',
          category: 'night',
          durationHours: 1,
          status: 'completed',
          location: 'Autoscuola Centrale',
          feedback: 'Ottimo uso dei fari anabbaglianti e controllo dell\'abbagliamento retrovisore.'
        },
        {
          id: 'les-2',
          date: '2026-10-22',
          time: '15:30 - 16:30',
          instructor: 'Sarah Dupont',
          type: 'Autostrada & Scorrimento Veloce (Obbligatoria)',
          category: 'highway',
          durationHours: 1,
          status: 'completed',
          location: 'Casello Nord',
          feedback: 'Buona immissione in corsia di accelerazione, velocità costante a 110 km/h.'
        },
        {
          id: 'les-3',
          date: '2026-10-27',
          time: '16:00 - 17:00',
          instructor: 'Carlos Vega',
          type: 'Manovre & Parcheggio a S',
          category: 'maneuver',
          durationHours: 1,
          status: 'booked',
          location: 'Piazzale Stadio',
          feedback: 'Programmata'
        }
      ];
      localStorage.setItem(this.lessonsKey, JSON.stringify(defaultLessons));
    }

    if (!localStorage.getItem(this.examKey)) {
      const defaultExam = {
        examDate: '2026-11-15',
        examTime: '09:00',
        examCenter: 'Ufficio Motorizzazione Civile - Sala Prove 2',
        candidateName: 'Allievo DriveMaster',
        candidateCode: 'DM-88492-IT',
        documents: [
          { id: 'doc-id', name: 'Documento d\'Identità Valido', checked: true },
          { id: 'doc-med', name: 'Certificato Medico Anamnestico in Bollo', checked: true },
          { id: 'doc-pagopa', name: 'Ricevute Versamenti PagoPA Esame', checked: true },
          { id: 'doc-rosa', name: 'Foglio Rosa Ufficiale in Corso di Validità', checked: true },
          { id: 'doc-photo', name: 'Due Fototessere Recenti a Fondo Chiaro', checked: false }
        ]
      };
      localStorage.setItem(this.examKey, JSON.stringify(defaultExam));
    }

    if (!localStorage.getItem(this.theoryKey)) {
      const defaultTheory = [
        { id: 'th-1', module: 'Modulo 1: Segnali di Pericolo e Precedenza', date: '2026-10-12', attended: true },
        { id: 'th-2', module: 'Modulo 2: Segnali di Divieto e Obbligo', date: '2026-10-14', attended: true },
        { id: 'th-3', module: 'Modulo 3: Velocità e Distanza di Sicurezza', date: '2026-10-19', attended: true },
        { id: 'th-4', module: 'Modulo 4: Norme sul Sorpasso e Sosta', date: '2026-10-21', attended: true },
        { id: 'th-5', module: 'Modulo 5: Alcol, Sostanze Stupefacenti e Riflessi', date: '2026-10-26', attended: false },
        { id: 'th-6', module: 'Modulo 6: Autostrada e Strade Extraurbane', date: '2026-10-28', attended: false },
        { id: 'th-7', module: 'Modulo 7: Elementi del Veicolo, Gomme e Freni', date: '2026-11-02', attended: false },
        { id: 'th-8', module: 'Modulo 8: Primo Soccorso e Comportamento Sinistri', date: '2026-11-04', attended: false }
      ];
      localStorage.setItem(this.theoryKey, JSON.stringify(defaultTheory));
    }
  }

  getLessons() {
    return JSON.parse(localStorage.getItem(this.lessonsKey) || '[]');
  }

  addLesson(lesson) {
    const lessons = this.getLessons();
    const newLesson = {
      id: 'les-' + Date.now(),
      status: 'booked',
      feedback: 'Prenotata di recente',
      durationHours: 1,
      ...lesson
    };
    lessons.unshift(newLesson);
    localStorage.setItem(this.lessonsKey, JSON.stringify(lessons));
    return lessons;
  }

  deleteLesson(id) {
    const lessons = this.getLessons().filter(l => l.id !== id);
    localStorage.setItem(this.lessonsKey, JSON.stringify(lessons));
    return lessons;
  }

  getExamData() {
    return JSON.parse(localStorage.getItem(this.examKey));
  }

  updateExamDate(date, time, center) {
    const exam = this.getExamData();
    exam.examDate = date;
    exam.examTime = time;
    if (center) exam.examCenter = center;
    localStorage.setItem(this.examKey, JSON.stringify(exam));
    return exam;
  }

  toggleDocument(docId) {
    const exam = this.getExamData();
    exam.documents = exam.documents.map(d => {
      if (d.id === docId) return { ...d, checked: !d.checked };
      return d;
    });
    localStorage.setItem(this.examKey, JSON.stringify(exam));
    return exam;
  }

  getTheoryAttendance() {
    return JSON.parse(localStorage.getItem(this.theoryKey) || '[]');
  }

  toggleTheoryAttendance(id) {
    const list = this.getTheoryAttendance().map(item => {
      if (item.id === id) return { ...item, attended: !item.attended };
      return item;
    });
    localStorage.setItem(this.theoryKey, JSON.stringify(list));
    return list;
  }

  addTheorySession(moduleName, date) {
    const list = this.getTheoryAttendance();
    list.push({
      id: 'th-' + Date.now(),
      module: moduleName,
      date: date || new Date().toISOString().split('T')[0],
      attended: true
    });
    localStorage.setItem(this.theoryKey, JSON.stringify(list));
    return list;
  }

  // Calculate hours breakdown
  getHoursStats() {
    const lessons = this.getLessons().filter(l => l.status === 'completed');
    const nightHours = lessons.filter(l => l.category === 'night').reduce((acc, l) => acc + (l.durationHours || 1), 0);
    const highwayHours = lessons.filter(l => l.category === 'highway').reduce((acc, l) => acc + (l.durationHours || 1), 0);
    const totalHours = lessons.reduce((acc, l) => acc + (l.durationHours || 1), 0);

    return {
      total: totalHours,
      night: nightHours,
      highway: highwayHours,
      requiredMin: 6, // Italian ministerial requirement: 2h night, 2h highway, 2h extraurban
      nightRequired: 2,
      highwayRequired: 2
    };
  }
}

export const agendaManager = new AgendaManager();
