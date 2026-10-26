import { esc, fmtDate } from './util.js';
import { store } from '../core/store.js';
import { DrivingSimulator, SCENARIOS, SIM_TXT } from '../simulator/engine.js';
import { agendaStore, EVENT_TYPES, DRIVE_KINDS, REQUIRED_HOURS } from '../pro/agenda.js';
import { ads, buyPro, restorePro } from '../core/monetization.js';
import { syncReminders, remindersAvailable, ensurePermission } from '../pro/reminders.js';

const LI = { it: 0, fr: 1, en: 2, es: 3, de: 4 };
const tr = (row, lang) => row[LI[lang] ?? 2] || row[2];

const FEATURES = c => {
  const t = c.t;
  return [
    ['🚫', t('noAds'), ''],
    ['🚗', t('simulator'), `${SCENARIOS.length} · ${t('simulatorSub')}`],
    ['📅', t('agenda'), `${t('agendaSub')} · .ics`],
    ['🔔', t('reminders'), t('remindersSub')],
    ['🧠', t('smartReview'), t('smartReviewSub')],
    ['🎯', t('passPrediction'), t('passPredictionSub')],
    ['♾️', t('unlimitedExams'), ''],
    ['🎧', t('audioChapter'), t('audioChapterSub')]
  ];
};

function paywall(c) {
  const t = c.t;
  const price = ads.proPrice || '';
  return `
  <section class="paywall card">
    <div class="pw-badge">⭐ PRO</div>
    <h1>${esc(t('proTitle'))}</h1>
    <p>${esc(t('proPitch'))}</p>
    <ul class="pw-list">${FEATURES(c).map(([i, a, b]) => `<li><span>${i}</span><div><b>${esc(a)}</b>${b ? `<small>${esc(b)}</small>` : ''}</div></li>`).join('')}</ul>
    <button class="btn btn-primary btn-lg" id="buy">${esc(t('buyPro'))}${price ? ` · ${esc(price)}` : ''}<small>${esc(t('oneTime'))}</small></button>
    <button class="btn btn-ghost" id="restore">${esc(t('restore'))}</button>
    <p class="muted small" id="pw-msg">${ads.native || ads.canDemo ? '' : esc(t('onlyInApp'))}</p>
    ${ads.canDemo ? `<p class="muted small">${esc(t('proDemo'))}</p>` : ''}
  </section>`;
}

function mountPaywall(c) {
  return root => {
    const msg = root.querySelector('#pw-msg');
    root.querySelector('#buy').addEventListener('click', async e => {
      e.currentTarget.disabled = true;
      try { if (await buyPro()) c.go(location.hash.slice(1) || '/pro'); }
      catch (err) { msg.textContent = err?.message === 'only-in-app' ? c.t('onlyInApp') : c.t('purchaseFailed'); }
      finally { e.currentTarget.disabled = false; }
    });
    root.querySelector('#restore').addEventListener('click', async () => {
      const ok = await restorePro();
      if (ok) c.go(location.hash.slice(1) || '/pro'); else msg.textContent = c.t('restoreNone');
    });
  };
}

export function proView(c) {
  const t = c.t;
  if (!store.pro) return { html: paywall(c), mount: mountPaywall(c) };
  const h = agendaStore.hours();
  const next = agendaStore.upcoming()[0];
  const due = store.dueForReview(c.country).length;
  const html = `
  <h1 class="page-title">⭐ ${esc(t('proTitle'))} <span class="chip ok">${esc(t('proActive'))}</span></h1>
  <div class="tiles">
    <a class="tile big" href="#/pro/sim"><span class="tile-ico">🚗</span><span class="tile-txt"><b>${esc(t('simulator'))}</b><small>${esc(t('simulatorSub'))}</small></span></a>
    <a class="tile big" href="#/pro/agenda"><span class="tile-ico">📅</span><span class="tile-txt"><b>${esc(t('agenda'))}</b><small>${h.total.toFixed(1)} h · ${next ? `${EVENT_TYPES[next.type].icon} ${fmtDate(next.date, c.lang)} ${next.start}` : esc(t('agendaSub'))}</small></span></a>
    <a class="tile big" href="#/quiz/run/smart"><span class="tile-ico">🧠</span><span class="tile-txt"><b>${esc(t('smartReview'))}</b><small>${due} ${esc(t('dueToday'))}</small></span></a>
    <a class="tile big" href="#/stats"><span class="tile-ico">🎯</span><span class="tile-txt"><b>${esc(t('passPrediction'))}</b><small>${esc(t('passPredictionSub'))}</small></span></a>
  </div>
  <button class="btn btn-ghost" id="restore">${esc(t('restore'))}</button>
  ${ads.canDemo ? `<button class="btn btn-ghost small" id="deact">${esc(t('proDeactivate'))}</button>` : ''}`;
  return { html, mount: root => {
    root.querySelector('#restore').addEventListener('click', () => restorePro());
    root.querySelector('#deact')?.addEventListener('click', () => { store.setPro(false); c.go('/pro'); });
  } };
}

// ---------- simulator ----------

export function simulatorView(c) {
  const t = c.t;
  if (!store.pro) return proView(c);
  const keys = [
    ['↑ / W', tr(['Accelera', 'Accélérer', 'Accelerate', 'Acelerar', 'Gas'], c.lang)], ['↓ / S', tr(['Frena', 'Freiner', 'Brake', 'Frenar', 'Bremse'], c.lang)],
    ['← → / A D', tr(['Sterza', 'Direction', 'Steer', 'Girar', 'Lenken'], c.lang)], ['G · R · P', tr(['Marcia D / retromarcia / parcheggio', 'Vitesse D / R / P', 'Gear D / R / P', 'Marcha D / R / P', 'Gang D / R / P'], c.lang)],
    ['Q · E', tr(['Frecce sinistra / destra', 'Clignotants', 'Indicators', 'Intermitentes', 'Blinker'], c.lang)], ['Z', tr(['Quattro frecce', 'Warnings', 'Hazards', 'Emergencia', 'Warnblinker'], c.lang)],
    ['M', tr(['Controlla specchietti', 'Rétroviseurs', 'Check mirrors', 'Espejos', 'Spiegel'], c.lang)], ['B', tr(['Cintura', 'Ceinture', 'Seat belt', 'Cinturón', 'Gurt'], c.lang)],
    ['L', tr(['Fari', 'Phares', 'Headlights', 'Luces', 'Licht'], c.lang)], ['Spazio', tr(['Freno a mano', 'Frein à main', 'Handbrake', 'Freno de mano', 'Handbremse'], c.lang)],
    ['H', tr(['Clacson', 'Klaxon', 'Horn', 'Claxon', 'Hupe'], c.lang)], ['V', tr(['Cambia vista', 'Changer de vue', 'Change view', 'Cambiar vista', 'Ansicht'], c.lang)]
  ];
  const html = `
  <a class="back" href="#/pro">← Pro</a>
  <h1 class="page-title">🚗 ${esc(t('simulator'))}</h1>
  <div class="scen-list" id="scen">${SCENARIOS.map((s, i) => `<button class="scen ${i === 0 ? 'on' : ''}" data-id="${s.id}"><span>${s.icon}</span><b>${esc(tr(s.n, c.lang))}</b><small>${esc(tr(s.d, c.lang))}</small></button>`).join('')}</div>
  <div class="sim-wrap" id="simwrap">
    <canvas id="sim" class="sim-canvas"></canvas>
    <div class="sim-top"><div class="sim-msg" id="simmsg"></div><div class="sim-faults" id="simfaults"></div></div>
    <div class="sim-controls">
      <div class="sim-row">
        <button data-c="blinkL" class="sc">◀</button>
        <button data-c="hazard" class="sc">⚠️</button>
        <button data-c="blinkR" class="sc">▶</button>
        <button data-c="mirror" class="sc">🪞</button>
        <button data-c="belt" class="sc" id="beltbtn">🔔</button>
        <button data-c="lights" class="sc">💡</button>
        <button data-c="horn" class="sc">📯</button>
        <button data-c="view" class="sc">🎥</button>
      </div>
      <div class="sim-row">
        <div class="gears"><button data-c="P" class="sc g">P</button><button data-c="R" class="sc g">R</button><button data-c="D" class="sc g">D</button><button data-c="hb" class="sc g">(P)</button></div>
        <div class="wheel-pad" id="wheel"><span id="wheelknob"></span></div>
        <div class="pedals"><button class="pedal brake" data-p="brake">⏸</button><button class="pedal gas" data-p="gas">▲</button></div>
      </div>
    </div>
    <button class="sim-fs" id="fs" aria-label="fullscreen">⛶</button>
    <div class="sim-result" id="simres" hidden></div>
  </div>
  <details class="card keys"><summary>⌨️ ${esc(tr(['Comandi da tastiera', 'Commandes clavier', 'Keyboard controls', 'Controles de teclado', 'Tastatur'], c.lang))}</summary>
    <div class="keys-grid">${keys.map(([k, v]) => `<div><kbd>${esc(k)}</kbd><span>${esc(v)}</span></div>`).join('')}</div></details>
  <section class="card"><h2>🎓 ${esc(tr(['Come valuta l\'esaminatore', 'Comment l\'examinateur évalue', 'How the examiner scores', 'Cómo evalúa el examinador', 'So bewertet der Prüfer'], c.lang))}</h2>
    <p>${esc(tr(['Gli errori sono lievi, gravi o eliminatori. Un errore eliminatorio (semaforo rosso, STOP, precedenza, pedone, urto) fa fallire la prova, come all\'esame vero. Prova superata con nessun errore eliminatorio, al massimo 1 grave e 8 lievi.', 'Fautes légères, graves ou éliminatoires. Une faute éliminatoire (feu rouge, stop, priorité, piéton, choc) fait échouer. Réussite : aucune éliminatoire, au plus 1 grave et 8 légères.', 'Faults are minor, serious or dangerous. A dangerous fault (red light, STOP, right of way, pedestrian, collision) fails the test, like the real one. Pass with no dangerous fault, at most 1 serious and 8 minor.', 'Las faltas son leves, deficientes o eliminatorias. Una eliminatoria suspende la prueba. Apto sin eliminatorias, máximo 1 grave y 8 leves.', 'Fehler sind leicht, schwer oder durchfallend. Ein durchfallender Fehler beendet die Prüfung. Bestanden ohne solche Fehler, höchstens 1 schwerer und 8 leichte.'], c.lang))}</p>
    <p class="muted small">${esc(c.pick(c.cfg.practical))}</p>
  </section>`;

  const mount = root => {
    const canvas = root.querySelector('#sim');
    const msg = root.querySelector('#simmsg');
    const faultsEl = root.querySelector('#simfaults');
    const res = root.querySelector('#simres');
    const sim = new DrivingSimulator(canvas, {
      lang: c.lang, country: c.country,
      onFault: f => {
        const el = document.createElement('div');
        el.className = `fault ${f.level}`;
        el.textContent = `${f.level === 'eliminatory' ? '⛔' : f.level === 'serious' ? '⚠️' : '•'} ${f.text}`;
        faultsEl.prepend(el);
        setTimeout(() => el.classList.add('fade'), 4000);
        setTimeout(() => el.remove(), 5000);
      },
      onState: s => {
        msg.textContent = s.msg || '';
        root.querySelector('#beltbtn').classList.toggle('warn', !s.belt);
        root.querySelectorAll('.g').forEach(b => b.classList.toggle('on', b.dataset.c === s.gear || (b.dataset.c === 'hb' && s.handbrake)));
        root.querySelector('[data-c="blinkL"]').classList.toggle('on', s.blinker === 'left');
        root.querySelector('[data-c="blinkR"]').classList.toggle('on', s.blinker === 'right');
        root.querySelector('[data-c="hazard"]').classList.toggle('on', s.blinker === 'hazard');
        root.querySelector('[data-c="lights"]').classList.toggle('on', s.lights);
      },
      onEnd: r => {
        const lv = SIM_TXT.levels;
        res.hidden = false;
        res.innerHTML = `<div class="sr-card ${r.passed ? 'pass' : 'fail'}">
          <h2>${r.passed ? '🎉 ' + esc(tr(SIM_TXT.ui.passed, c.lang)) : '😕 ' + esc(tr(SIM_TXT.ui.failed, c.lang))}</h2>
          <p>${esc(tr(lv.eliminatory, c.lang))}: <b>${r.elim}</b> · ${esc(tr(lv.serious, c.lang))}: <b>${r.serious}</b> · ${esc(tr(lv.minor, c.lang))}: <b>${r.minor}</b></p>
          <p class="muted">${Math.floor(r.time / 60)}:${String(Math.round(r.time % 60)).padStart(2, '0')} · max ${Math.round(r.maxSpeed)} km/h</p>
          <ul>${r.faults.map(f => `<li class="${f.level}">${esc(f.text)} <small>(${esc(tr(lv[f.level], c.lang))})</small></li>`).join('') || '<li>✅</li>'}</ul>
          <button class="btn btn-primary" id="again">🔄 ${esc(c.t('retry'))}</button></div>`;
        res.querySelector('#again').onclick = () => { res.hidden = true; sim.start(current); };
      }
    });
    if (import.meta.env.DEV) window.__sim = sim;
    let current = 'city';
    sim.start(current);
    root.querySelector('#scen').addEventListener('click', e => {
      const b = e.target.closest('.scen');
      if (!b) return;
      root.querySelectorAll('.scen').forEach(x => x.classList.toggle('on', x === b));
      current = b.dataset.id;
      res.hidden = true;
      faultsEl.innerHTML = '';
      sim.start(current);
      canvas.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
    root.querySelector('.sim-controls').addEventListener('click', e => {
      const b = e.target.closest('[data-c]');
      if (!b) return;
      const a = b.dataset.c;
      if (a === 'blinkL') sim.toggleBlinker('left');
      if (a === 'blinkR') sim.toggleBlinker('right');
      if (a === 'hazard') sim.toggleBlinker('hazard');
      if (a === 'mirror') sim.checkMirrors();
      if (a === 'belt') sim.toggleBelt();
      if (a === 'lights') sim.toggleLights();
      if (a === 'horn') sim.horn();
      if (a === 'view') sim.cycleView();
      if (['P', 'R', 'D'].includes(a)) sim.setGear(a);
      if (a === 'hb') { sim.car.handbrake = !sim.car.handbrake; sim.emit(); }
    });
    root.querySelectorAll('[data-p]').forEach(p => {
      const on = e => { e.preventDefault(); sim.setTouch(p.dataset.p, true); p.classList.add('on'); };
      const off = () => { sim.setTouch(p.dataset.p, false); p.classList.remove('on'); };
      p.addEventListener('pointerdown', on); p.addEventListener('pointerup', off); p.addEventListener('pointerleave', off); p.addEventListener('pointercancel', off);
    });
    const wheel = root.querySelector('#wheel'), knob = root.querySelector('#wheelknob');
    const steerFrom = e => { const r = wheel.getBoundingClientRect(); const v = Math.max(-1, Math.min(1, ((e.clientX - r.left) / r.width) * 2 - 1)); sim.setTouch('steer', v); knob.style.left = `${(v + 1) * 50}%`; };
    wheel.addEventListener('pointerdown', e => { wheel.setPointerCapture(e.pointerId); steerFrom(e); });
    wheel.addEventListener('pointermove', e => { if (e.buttons) steerFrom(e); });
    const release = () => { sim.setTouch('steer', 0); knob.style.left = '50%'; };
    wheel.addEventListener('pointerup', release); wheel.addEventListener('pointercancel', release);
    root.querySelector('#fs').addEventListener('click', () => {
      const w = root.querySelector('#simwrap');
      if (document.fullscreenElement) document.exitFullscreen(); else w.requestFullscreen?.().then(() => setTimeout(() => sim.resize(), 200)).catch(() => {});
    });
    document.addEventListener('fullscreenchange', () => setTimeout(() => sim.resize(), 150));
    return () => sim.destroy();
  };
  return { html, mount, wide: true };
}

// ---------- agenda ----------

export function agendaView(c) {
  const t = c.t;
  if (!store.pro) return proView(c);
  const req = REQUIRED_HOURS[c.country];
  const typeName = k => tr(EVENT_TYPES[k].n, c.lang);
  const today = new Date();
  let month = new Date(today.getFullYear(), today.getMonth(), 1);
  let selected = today.toISOString().slice(0, 10);

  const L = {
    add: tr(['Aggiungi', 'Ajouter', 'Add', 'Añadir', 'Hinzufügen'], c.lang), date: tr(['Data', 'Date', 'Date', 'Fecha', 'Datum'], c.lang),
    from: tr(['Dalle', 'De', 'From', 'Desde', 'Von'], c.lang), to: tr(['Alle', 'À', 'To', 'Hasta', 'Bis'], c.lang),
    type: tr(['Tipo', 'Type', 'Type', 'Tipo', 'Art'], c.lang), kind: tr(['Percorso', 'Parcours', 'Route', 'Recorrido', 'Strecke'], c.lang),
    instructor: tr(['Istruttore', 'Moniteur', 'Instructor', 'Profesor', 'Fahrlehrer'], c.lang), place: tr(['Luogo', 'Lieu', 'Place', 'Lugar', 'Ort'], c.lang),
    notes: tr(['Note', 'Notes', 'Notes', 'Notas', 'Notizen'], c.lang), title: tr(['Titolo / argomento', 'Titre / thème', 'Title / topic', 'Título / tema', 'Titel / Thema'], c.lang),
    done: tr(['Svolta', 'Effectuée', 'Done', 'Hecha', 'Erledigt'], c.lang), upcoming: tr(['Prossimi appuntamenti', 'Prochains rendez-vous', 'Upcoming', 'Próximas citas', 'Nächste Termine'], c.lang),
    hours: tr(['Ore di guida', 'Heures de conduite', 'Driving hours', 'Horas de conducción', 'Fahrstunden'], c.lang), planned: tr(['programmate', 'prévues', 'planned', 'previstas', 'geplant'], c.lang),
    required: tr(['obbligatorie', 'minimum', 'required', 'obligatorias', 'Pflicht'], c.lang), theoryAtt: tr(['Lezioni di teoria frequentate', 'Cours de code suivis', 'Theory classes attended', 'Clases teóricas asistidas', 'Besuchter Theorieunterricht'], c.lang),
    export: tr(['Esporta calendario (.ics)', 'Exporter (.ics)', 'Export calendar (.ics)', 'Exportar (.ics)', 'Kalender exportieren (.ics)'], c.lang),
    del: tr(['Elimina', 'Supprimer', 'Delete', 'Eliminar', 'Löschen'], c.lang), none: tr(['Nessun impegno', 'Aucun rendez-vous', 'Nothing scheduled', 'Sin citas', 'Keine Termine'], c.lang),
    save: tr(['Salva', 'Enregistrer', 'Save', 'Guardar', 'Speichern'], c.lang)
  };

  const html = `
  <a class="back" href="#/pro">← Pro</a>
  <h1 class="page-title">📅 ${esc(t('agenda'))}</h1>
  <section class="card" id="hours"></section>
  <section class="card">
    <h2>🔔 ${esc(t('reminders'))}</h2>
    <p class="muted small">${esc(t('remindersSub'))}</p>
    <label class="switch"><span>${esc(t('reminders'))}</span><input type="checkbox" id="rem-on" ${c.s.reminders ? 'checked' : ''}></label>
    <label class="switch"><span>${esc(t('studyReminder'))}</span><input type="time" id="rem-study" value="${esc(c.s.studyTime || '')}"></label>
    <p class="muted small" id="rem-msg">${remindersAvailable ? '' : esc(t('onlyInApp'))}</p>
  </section>
  <section class="card cal-card">
    <div class="cal-head"><button class="icon-btn" id="mprev">‹</button><b id="mlabel"></b><button class="icon-btn" id="mnext">›</button></div>
    <div class="cal" id="cal"></div>
    <div class="legend">${Object.entries(EVENT_TYPES).map(([k, v]) => `<span><i style="background:${v.color}"></i>${esc(typeName(k))}</span>`).join('')}</div>
  </section>
  <section class="card"><h2 id="daytitle"></h2><div id="daylist"></div>
    <form id="evform" class="evform">
      <label>${esc(L.type)}<select name="type">${Object.keys(EVENT_TYPES).map(k => `<option value="${k}">${EVENT_TYPES[k].icon} ${esc(typeName(k))}</option>`).join('')}</select></label>
      <label>${esc(L.date)}<input type="date" name="date" required></label>
      <label>${esc(L.from)}<input type="time" name="start" value="15:00" required></label>
      <label>${esc(L.to)}<input type="time" name="end" value="16:00" required></label>
      <label class="kind">${esc(L.kind)}<select name="kind">${Object.entries(DRIVE_KINDS).map(([k, v]) => `<option value="${k}">${esc(tr(v, c.lang))}</option>`).join('')}</select></label>
      <label>${esc(L.title)}<input name="title" maxlength="80"></label>
      <label>${esc(L.instructor)}<input name="instructor" maxlength="60"></label>
      <label>${esc(L.place)}<input name="place" maxlength="80"></label>
      <label class="full">${esc(L.notes)}<textarea name="notes" rows="2" maxlength="300"></textarea></label>
      <button class="btn btn-primary full" type="submit">＋ ${esc(L.add)}</button>
    </form>
  </section>
  <section class="card"><h2>${esc(L.upcoming)}</h2><div id="upcoming"></div>
    <button class="btn btn-ghost" id="ics">📆 ${esc(L.export)}</button></section>`;

  const mount = root => {
    const form = root.querySelector('#evform');
    const drawHours = () => {
      const h = agendaStore.hours();
      const th = agendaStore.theoryAttendance();
      const modules = req ? Object.entries(req.modules) : [];
      root.querySelector('#hours').innerHTML = `
        <h2>⏱️ ${esc(L.hours)}</h2>
        <div class="hours-big"><b>${h.total.toFixed(1)} h</b><small>${req ? ` / ${req.total} h ${esc(L.required)}` : ''} · ${h.planned.toFixed(1)} h ${esc(L.planned)}</small></div>
        ${req ? `<div class="bar"><i style="width:${Math.min(100, (h.total / req.total) * 100)}%"></i></div>` : ''}
        ${modules.length ? `<div class="modules">${modules.map(([k, need]) => { const got = h.byKind[k] || 0; return `<div class="mod ${got >= need ? 'ok' : ''}"><span>${esc(tr(DRIVE_KINDS[k], c.lang))}</span><b>${got.toFixed(1)} / ${need} h</b></div>`; }).join('')}</div>` : ''}
        ${req ? `<p class="muted small">${esc(c.pick(req.note))}</p>` : ''}
        <p>📚 ${esc(L.theoryAtt)}: <b>${th.done}/${th.total}</b></p>`;
    };
    const drawCal = () => {
      const label = month.toLocaleDateString(c.lang, { month: 'long', year: 'numeric' });
      root.querySelector('#mlabel').textContent = label.charAt(0).toUpperCase() + label.slice(1);
      const first = (month.getDay() + 6) % 7;
      const days = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
      const wd = [...Array(7)].map((_, i) => new Date(2024, 0, 1 + i).toLocaleDateString(c.lang, { weekday: 'narrow' }));
      let cells = wd.map(d => `<div class="wd">${d}</div>`).join('');
      for (let i = 0; i < first; i++) cells += '<div></div>';
      for (let d = 1; d <= days; d++) {
        const iso = `${month.getFullYear()}-${String(month.getMonth() + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
        const evs = agendaStore.onDay(iso);
        cells += `<button class="day ${iso === selected ? 'sel' : ''} ${iso === today.toISOString().slice(0, 10) ? 'today' : ''}" data-day="${iso}"><span>${d}</span><i>${evs.map(e => `<em style="background:${EVENT_TYPES[e.type].color}"></em>`).join('')}</i></button>`;
      }
      root.querySelector('#cal').innerHTML = cells;
    };
    const evRow = e => `<div class="ev ${e.done ? 'done' : ''}" style="--c:${EVENT_TYPES[e.type].color}">
      <div><b>${EVENT_TYPES[e.type].icon} ${esc(typeName(e.type))}${e.type === 'drive' ? ` · ${esc(tr(DRIVE_KINDS[e.kind] || DRIVE_KINDS.city, c.lang))}` : ''}</b>
      <small>${fmtDate(e.date, c.lang)} · ${e.start}–${e.end}${e.instructor ? ' · ' + esc(e.instructor) : ''}${e.place ? ' · ' + esc(e.place) : ''}</small>
      ${e.title ? `<small>${esc(e.title)}</small>` : ''}${e.notes ? `<small class="muted">${esc(e.notes)}</small>` : ''}</div>
      <div class="ev-actions"><label><input type="checkbox" data-done="${e.id}" ${e.done ? 'checked' : ''}> ${esc(L.done)}</label><button class="icon-btn" data-del="${e.id}" aria-label="${esc(L.del)}">🗑️</button></div></div>`;
    const drawDay = () => {
      root.querySelector('#daytitle').textContent = fmtDate(selected, c.lang);
      const list = agendaStore.onDay(selected);
      root.querySelector('#daylist').innerHTML = list.length ? list.map(evRow).join('') : `<p class="muted">${esc(L.none)}</p>`;
      form.date.value = selected;
    };
    const drawUpcoming = () => {
      const up = agendaStore.upcoming().slice(0, 8);
      root.querySelector('#upcoming').innerHTML = up.length ? up.map(evRow).join('') : `<p class="muted">${esc(L.none)}</p>`;
    };
    const redraw = () => { drawHours(); drawCal(); drawDay(); drawUpcoming(); syncReminders().catch(() => {}); };
    const remMsg = root.querySelector('#rem-msg');
    root.querySelector('#rem-on').addEventListener('change', async e => {
      if (e.target.checked && remindersAvailable && !(await ensurePermission())) { e.target.checked = false; remMsg.textContent = t('remindersDenied'); return; }
      store.set({ reminders: e.target.checked });
      syncReminders().catch(() => {});
    });
    root.querySelector('#rem-study').addEventListener('change', e => {
      store.set({ studyTime: e.target.value, reminders: true });
      root.querySelector('#rem-on').checked = true;
      syncReminders().catch(() => {});
    });
    const kindField = root.querySelector('.kind');
    form.type.addEventListener('change', () => { kindField.hidden = form.type.value !== 'drive'; });
    form.addEventListener('submit', e => {
      e.preventDefault();
      const f = Object.fromEntries(new FormData(form));
      if (f.end <= f.start) f.end = f.start;
      if (f.type !== 'drive') delete f.kind;
      agendaStore.add(f);
      form.title.value = ''; form.notes.value = '';
      selected = f.date;
      redraw();
    });
    root.addEventListener('click', e => {
      const d = e.target.closest('[data-day]');
      if (d) { selected = d.dataset.day; drawCal(); drawDay(); }
      const del = e.target.closest('[data-del]');
      if (del && confirm(L.del + '?')) { agendaStore.remove(del.dataset.del); redraw(); }
    });
    root.addEventListener('change', e => { if (e.target.dataset.done) { agendaStore.update(e.target.dataset.done, { done: e.target.checked }); redraw(); } });
    root.querySelector('#mprev').onclick = () => { month = new Date(month.getFullYear(), month.getMonth() - 1, 1); drawCal(); };
    root.querySelector('#mnext').onclick = () => { month = new Date(month.getFullYear(), month.getMonth() + 1, 1); drawCal(); };
    root.querySelector('#ics').onclick = () => {
      const blob = new Blob([agendaStore.ics()], { type: 'text/calendar' });
      const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'agenda-patente.ics'; a.click();
      setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    };
    redraw();
  };
  return { html, mount };
}
