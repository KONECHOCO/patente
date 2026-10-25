// DriveMaster World - Main Application Orchestrator
// Features: Full Multi-country, Signs Academy Lessons, Ministerial 1-30 Grid, DSA EasyReading, Exam Review History & 3D Simulator
import confetti from 'canvas-confetti';
import { COUNTRIES, CATEGORIES, TRANSLATIONS } from './data/i18n.js';
import { THEORY_TOPICS } from './data/theory.js';
import { SIGN_CATEGORIES, ROAD_SIGNS } from './data/signs.js';
import { QUIZ_DATABASE } from './data/quizzes.js';
import { DrivingSimulator } from './simulator/engine.js';
import { sound, speakText, stopSpeaking } from './simulator/audio.js';
import { proManager } from './pro/proManager.js';
import { agendaManager } from './pro/agenda.js';

// Application State
const state = {
  country: 'FR', // Default country: France (per user specification)
  lang: 'fr',    // Default language: French
  category: 'all',
  activeTab: 'signsLessons', // Default directly to the requested core feature: Signs Lessons!
  activeLesson: null,
  isEasyReading: localStorage.getItem('dm_easyreading') === 'true',

  // Road Signs Academy
  activeSignCategory: 'precedenza',
  activeSignLesson: null,
  signQuizScores: JSON.parse(localStorage.getItem('dm_sign_quiz_scores') || '{}'),

  // Quiz State
  quizMode: 'exam', // 'study', 'exam', 'tricky', 'mistakes'
  currentQuestionIndex: 0,
  quizQuestions: [],
  quizAnswers: {},
  flaggedQuestions: {}, // questionId -> boolean
  examTimerInterval: null,
  examSecondsLeft: 1800,
  examFinished: false,
  mistakesBank: JSON.parse(localStorage.getItem('dm_mistakes') || '[]'),
  examHistory: JSON.parse(localStorage.getItem('dm_exam_history') || '[]'),

  // Simulator
  simulator: null,
  currentSimScenario: 'parking',

  // Theory Search
  theoryQuery: '',

  // Active review sheet
  reviewingExamSession: null
};

// Initialize App
function initApp() {
  applyAccessibility();
  renderShell();
  setupEventListeners();
  loadTab(state.activeTab);

  proManager.subscribe((isPro) => {
    updateProUI(isPro);
  });
}

function applyAccessibility() {
  if (state.isEasyReading) {
    document.body.classList.add('easy-reading-mode');
  } else {
    document.body.classList.remove('easy-reading-mode');
  }
}

// Translations helper
function t(key, vars = {}) {
  let str = TRANSLATIONS[state.lang]?.[key] || TRANSLATIONS['it']?.[key] || key;
  Object.keys(vars).forEach(k => {
    str = str.replace(`{${k}}`, vars[k]);
  });
  return str;
}

// Render Top Shell
function renderShell() {
  const app = document.getElementById('app');
  const currentCountry = COUNTRIES[state.country];

  app.innerHTML = `
    <!-- Top Application Header -->
    <header class="app-header">
      <div class="header-container">
        <div class="brand-section">
          <div class="brand-logo-icon">🚗</div>
          <div class="brand-text">
            <h1>
              ${t('appTitle')}
              <span class="badge-country" id="countryBadge">${currentCountry.flag} ${currentCountry.name}</span>
            </h1>
            <p>${currentCountry.officialName}</p>
          </div>
        </div>

        <div class="header-controls">
          <!-- EasyReading / DSA Accessibility Toggle -->
          <button id="easyReadingToggleBtn" class="btn-accessibility ${state.isEasyReading ? 'active' : ''}">
            ${t('easyReadingBtn')}
          </button>

          <!-- Country Selector -->
          <div class="control-select-wrap">
            <span style="margin-right: 6px;">🌍</span>
            <select id="countrySelect">
              ${Object.values(COUNTRIES).map(c => `
                <option value="${c.code}" ${c.code === state.country ? 'selected' : ''}>
                  ${c.flag} ${c.name}
                </option>
              `).join('')}
            </select>
          </div>

          <!-- Language Selector -->
          <div class="control-select-wrap">
            <span style="margin-right: 6px;">🗣️</span>
            <select id="langSelect">
              <option value="it" ${state.lang === 'it' ? 'selected' : ''}>🇮🇹 Italiano</option>
              <option value="fr" ${state.lang === 'fr' ? 'selected' : ''}>🇫🇷 Français</option>
              <option value="en" ${state.lang === 'en' ? 'selected' : ''}>🇬🇧 English</option>
              <option value="es" ${state.lang === 'es' ? 'selected' : ''}>🇪🇸 Español</option>
              <option value="de" ${state.lang === 'de' ? 'selected' : ''}>🇩🇪 Deutsch</option>
            </select>
          </div>

          <!-- PRO Switch Button -->
          <button id="proSwitchBtn" class="btn-pro-switch ${proManager.getIsPro() ? 'active' : 'inactive'}">
            <span>⚡</span>
            <span id="proBtnLabel">${proManager.getIsPro() ? t('proActive') : t('upgradeToPro')}</span>
          </button>
        </div>
      </div>
    </header>

    <!-- Category Filter Bar -->
    <div class="category-filter-bar">
      <div class="category-bar-inner">
        ${CATEGORIES.map(cat => `
          <button class="category-pill ${cat.id === state.category ? 'active' : ''}" data-cat="${cat.id}">
            <span>${cat.icon}</span>
            <span>${cat.label[state.lang] || cat.label['it']}</span>
          </button>
        `).join('')}
      </div>
    </div>

    <!-- Main Navigation Bar -->
    <nav class="app-nav">
      <div class="nav-inner">
        <button class="nav-tab-btn ${state.activeTab === 'signsLessons' ? 'active' : ''}" data-tab="signsLessons">
          <span>🛑</span> ${t('navSignsLessons')}
        </button>
        <button class="nav-tab-btn ${state.activeTab === 'theory' ? 'active' : ''}" data-tab="theory">
          <span>📖</span> ${t('navTheory')}
        </button>
        <button class="nav-tab-btn ${state.activeTab === 'quiz' ? 'active' : ''}" data-tab="quiz">
          <span>📝</span> ${t('navQuiz')}
        </button>
        <button class="nav-tab-btn ${state.activeTab === 'examReview' ? 'active' : ''}" data-tab="examReview">
          <span>📑</span> ${t('navExamReview')} (${state.examHistory.length})
        </button>
        <button class="nav-tab-btn ${state.activeTab === 'autoscuola' ? 'active' : ''}" data-tab="autoscuola">
          <span>🏫</span> ${t('navAutoscuola')}
        </button>
        <button class="nav-tab-btn ${state.activeTab === 'simulator' ? 'active' : ''}" data-tab="simulator">
          <span>🎮</span> ${t('navSimulator')} <span class="badge-pro">${t('proBadge')}</span>
        </button>
        <button class="nav-tab-btn ${state.activeTab === 'agenda' ? 'active' : ''}" data-tab="agenda">
          <span>📅</span> ${t('navAgenda')} <span class="badge-pro">${t('proBadge')}</span>
        </button>
        <button class="nav-tab-btn ${state.activeTab === 'stats' ? 'active' : ''}" data-tab="stats">
          <span>📊</span> ${t('navStats')}
        </button>
      </div>
    </nav>

    <!-- PRO Banner -->
    <div class="pro-highlight-banner" id="proBanner">
      <div class="pro-banner-card ${proManager.getIsPro() ? 'is-pro-active' : ''}">
        <div class="pro-banner-info">
          <h3>
            <span>${proManager.getIsPro() ? '👑' : '⭐'}</span> 
            ${t('proBannerTitle')}
          </h3>
          <p>${proManager.getIsPro() ? t('proBannerActive') : t('proBannerDesc')}</p>
        </div>
        <div>
          <button id="proToggleActionBtn" class="btn-gold">
            ${proManager.getIsPro() ? 'Modalità PRO Attiva ✓' : t('proBannerBtn')}
          </button>
        </div>
      </div>
    </div>

    <!-- Main Content Container -->
    <main class="app-main-content">
      <div id="tab-signsLessons" class="tab-pane active"></div>
      <div id="tab-theory" class="tab-pane"></div>
      <div id="tab-quiz" class="tab-pane"></div>
      <div id="tab-examReview" class="tab-pane"></div>
      <div id="tab-autoscuola" class="tab-pane"></div>
      <div id="tab-simulator" class="tab-pane"></div>
      <div id="tab-agenda" class="tab-pane"></div>
      <div id="tab-stats" class="tab-pane"></div>
    </main>

    <!-- Modal Container -->
    <div id="modalContainer"></div>
  `;
}

// Setup Global Event Listeners
function setupEventListeners() {
  // EasyReading Toggle
  const easyBtn = document.getElementById('easyReadingToggleBtn');
  if (easyBtn) {
    easyBtn.addEventListener('click', () => {
      state.isEasyReading = !state.isEasyReading;
      localStorage.setItem('dm_easyreading', state.isEasyReading ? 'true' : 'false');
      applyAccessibility();
      easyBtn.classList.toggle('active', state.isEasyReading);
    });
  }

  // Country Selector
  document.getElementById('countrySelect').addEventListener('change', (e) => {
    state.country = e.target.value;
    state.lang = COUNTRIES[state.country].defaultLang;
    renderShell();
    setupEventListeners();
    loadTab(state.activeTab);
  });

  // Language Selector
  document.getElementById('langSelect').addEventListener('change', (e) => {
    state.lang = e.target.value;
    renderShell();
    setupEventListeners();
    loadTab(state.activeTab);
  });

  // PRO Switch Button
  const proBtn = document.getElementById('proSwitchBtn');
  const proActionBtn = document.getElementById('proToggleActionBtn');
  const toggleHandler = () => proManager.togglePro();
  if (proBtn) proBtn.addEventListener('click', toggleHandler);
  if (proActionBtn) proActionBtn.addEventListener('click', toggleHandler);

  // Category Pills
  document.querySelectorAll('.category-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('.category-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      state.category = pill.dataset.cat;
      loadTab(state.activeTab);
    });
  });

  // Navigation Tabs
  document.querySelectorAll('.nav-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.nav-tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.activeTab = btn.dataset.tab;
      loadTab(state.activeTab);
    });
  });
}

function updateProUI(isPro) {
  renderShell();
  setupEventListeners();
  loadTab(state.activeTab);
}

// Router: Switch Tab Panes
function loadTab(tab) {
  document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
  const currentPane = document.getElementById(`tab-${tab}`);
  if (currentPane) currentPane.classList.add('active');

  stopSpeaking();

  if (tab === 'signsLessons') renderSignsLessonsTab();
  else if (tab === 'theory') renderTheoryTab();
  else if (tab === 'quiz') renderQuizTab();
  else if (tab === 'examReview') renderExamReviewTab();
  else if (tab === 'autoscuola') renderAutoscuolaTab();
  else if (tab === 'simulator') renderSimulatorTab();
  else if (tab === 'agenda') renderAgendaTab();
  else if (tab === 'stats') renderStatsTab();
}

// -------------------------------------------------------------
// 1. LEZIONI DI SEGNALETICA (ROAD SIGNS ACADEMY - CORE FEATURE)
// -------------------------------------------------------------
function renderSignsLessonsTab() {
  const container = document.getElementById('tab-signsLessons');
  const activeCategory = SIGN_CATEGORIES.find(c => c.id === state.activeSignCategory) || SIGN_CATEGORIES[0];
  const filteredSigns = ROAD_SIGNS.filter(s => s.category === state.activeSignCategory);

  container.innerHTML = `
    <!-- Header Summary -->
    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 24px; flex-wrap: wrap; gap: 16px;">
      <div>
        <h2 style="font-family: 'Outfit'; font-size: 26px; font-weight: 800; display: flex; align-items: center; gap: 10px;">
          <span>🛑</span> ${t('navSignsLessons')} • Manuale Ufficiale Segnali 2026
        </h2>
        <p style="color: var(--text-muted); font-size: 14px; max-width: 780px;">
          Tutti i cartelli ministeriali divisi per tipologia. Studia la norma ufficiale, cosa è consentito o vietato, memorizza i quiz trabocchetto ed esercitati con il test rapido per ciascun segnale.
        </p>
      </div>

      <div style="display: flex; gap: 10px;">
        <button id="startAllSignsQuizBtn" class="btn-primary">
          🎯 Quiz Speciale Segnaletica (30 Domande)
        </button>
      </div>
    </div>

    <!-- Category Shelves / Tabs -->
    <div class="sign-category-shelf">
      ${SIGN_CATEGORIES.map(cat => {
        const count = ROAD_SIGNS.filter(s => s.category === cat.id).length;
        const isActive = cat.id === state.activeSignCategory;
        return `
          <div class="sign-cat-card ${isActive ? 'active' : ''}" data-cat-id="${cat.id}">
            <div class="sign-cat-icon">${cat.icon}</div>
            <div style="flex: 1;">
              <div style="font-family: 'Outfit'; font-weight: 800; font-size: 15px; color: ${isActive ? 'var(--primary)' : 'var(--text-main)'};">
                ${cat.name[state.lang] || cat.name['it']}
              </div>
              <div style="font-size: 11.5px; color: var(--text-muted); line-height: 1.4;">
                ${cat.desc[state.lang] || cat.desc['it']}
              </div>
            </div>
            <span style="font-size: 11px; font-weight: 800; background: rgba(56, 189, 248, 0.15); color: var(--primary); padding: 2px 8px; border-radius: var(--radius-full);">
              ${count}
            </span>
          </div>
        `;
      }).join('')}
    </div>

    <!-- Category Title -->
    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; border-bottom: 1px solid var(--border-subtle); padding-bottom: 10px;">
      <h3 style="font-family: 'Outfit'; font-size: 19px; font-weight: 700; color: var(--primary);">
        ${activeCategory.icon} ${activeCategory.name[state.lang] || activeCategory.name['it']} (${filteredSigns.length} Cartelli)
      </h3>
      <span style="font-size: 13px; color: var(--text-muted);">
        Clicca su un segnale per aprire la lezione e fare il quiz rapido
      </span>
    </div>

    <!-- Signs Grid -->
    <div class="signs-grid">
      ${filteredSigns.map(sign => {
        const isCompleted = state.signQuizScores[sign.id] === true;
        return `
          <div class="sign-lesson-card" data-sign-id="${sign.id}">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
              <span class="sign-official-tag">${sign.officialCode}</span>
              ${isCompleted ? '<span style="font-size: 11px; color: #34d399; font-weight: 800; background: rgba(16, 185, 129, 0.15); padding: 2px 6px; border-radius: 4px;">Quiz Superato ✓</span>' : ''}
            </div>

            <div class="sign-svg-wrap" style="align-self: center; margin-bottom: 12px;">
              ${sign.svg}
            </div>

            <h4 style="font-family: 'Outfit'; font-size: 15px; font-weight: 700; margin-bottom: 8px; text-align: center;">
              ${sign.name[state.lang] || sign.name['it']}
            </h4>

            <p style="font-size: 12.5px; color: var(--text-muted); line-height: 1.5; text-align: center; flex: 1; margin-bottom: 14px;">
              ${(sign.meaning[state.lang] || sign.meaning['it']).substring(0, 110)}...
            </p>

            <button class="btn-primary open-sign-modal-btn" data-sign-id="${sign.id}" style="width: 100%; justify-content: center; font-size: 12.5px; padding: 8px 12px;">
              Studio & Quiz Rapido →
            </button>
          </div>
        `;
      }).join('')}
    </div>
  `;

  // Bind category switches
  document.querySelectorAll('.sign-cat-card').forEach(card => {
    card.addEventListener('click', () => {
      state.activeSignCategory = card.dataset.catId;
      renderSignsLessonsTab();
    });
  });

  // Bind Open Sign Modal
  document.querySelectorAll('.open-sign-modal-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      openSignLessonModal(btn.dataset.signId);
    });
  });

  // Start dedicated signs quiz
  document.getElementById('startAllSignsQuizBtn')?.addEventListener('click', () => {
    state.activeTab = 'quiz';
    state.quizMode = 'study';
    prepareQuizPool();
    renderShell();
    setupEventListeners();
    loadTab('quiz');
  });
}

function openSignLessonModal(signId) {
  const sign = ROAD_SIGNS.find(s => s.id === signId);
  if (!sign) return;
  const modal = document.getElementById('modalContainer');

  const title = sign.name[state.lang] || sign.name['it'];
  const meaning = sign.meaning[state.lang] || sign.meaning['it'];
  const allowed = sign.allowed[state.lang] || sign.allowed['it'];
  const forbidden = sign.forbidden[state.lang] || sign.forbidden['it'];
  const traps = sign.traps[state.lang] || sign.traps['it'];

  modal.innerHTML = `
    <div class="modal-overlay" id="signModalOverlay">
      <div class="modal-content" style="max-width: 860px;">
        <div class="modal-header">
          <div>
            <span style="font-family: 'JetBrains Mono'; font-size: 12px; color: var(--primary); font-weight: 700;">
              ${sign.officialCode}
            </span>
            <h2 style="font-family: 'Outfit'; font-size: 20px; font-weight: 800; margin-top: 2px;">
              ${title}
            </h2>
          </div>
          <div style="display: flex; gap: 8px; align-items: center;">
            <button id="ttsSignBtn" class="btn-secondary" style="font-size: 12px; padding: 6px 12px;">
              🔊 ${t('readAloud')}
            </button>
            <button class="modal-close-btn" id="closeSignModal">&times;</button>
          </div>
        </div>

        <div class="modal-body">
          <div class="sign-modal-grid">
            <!-- Left: Sign Vector & Quick Test Status -->
            <div class="sign-preview-box">
              <div style="width: 130px; height: 130px; margin-bottom: 16px;">
                ${sign.svg}
              </div>
              <div style="font-size: 13px; font-weight: 700; color: #e2e8f0; margin-bottom: 6px;">
                ${title}
              </div>
              <div style="font-size: 11px; color: var(--text-muted); margin-bottom: 16px;">
                Ministero delle Infrastrutture e Trasporti
              </div>
              <button id="jumpToSignQuizBtn" class="btn-primary" style="font-size: 12px; width: 100%; justify-content: center;">
                ${t('testSignBtn')}
              </button>
            </div>

            <!-- Right: Tabs for Meaning, Allowed, Forbidden, Traps -->
            <div>
              <div class="sign-modal-tabs">
                <button class="sign-tab-btn active" data-tab="meaning">Norma Ufficiale</button>
                <button class="sign-tab-btn" data-tab="rules">Consentiti / Vietati</button>
                <button class="sign-tab-btn" data-tab="traps">⚠️ Trabocchetti Esame</button>
                <button class="sign-tab-btn" data-tab="quiz">🎯 Quiz del Segnale</button>
              </div>

              <!-- Tab Contents -->
              <div id="signTabContent">
                <!-- Meaning content -->
                <div id="subtab-meaning">
                  <h4 style="font-size: 15px; font-weight: 700; color: var(--primary); margin-bottom: 8px;">
                    ${t('signMeaning')}
                  </h4>
                  <p style="font-size: 14px; line-height: 1.7; color: #cbd5e1; margin-bottom: 16px;">
                    ${meaning}
                  </p>
                  <div class="rule-box" style="margin-top: 14px;">
                    <h5>💡 Concetto Chiave da Ricordare</h5>
                    <p style="font-size: 13px; color: #e2e8f0; margin: 0;">
                      I segnali stradali hanno valore prescrittivo immediato dal punto in cui sono posti. Presta sempre attenzione ai pannelli integrativi sottostanti.
                    </p>
                  </div>
                </div>

                <!-- Rules content -->
                <div id="subtab-rules" style="display: none;">
                  <div style="background: rgba(16, 185, 129, 0.08); border-left: 4px solid var(--success); padding: 12px 16px; border-radius: 4px; margin-bottom: 14px;">
                    <h5 style="color: #34d399; font-size: 13.5px; font-weight: 700; margin-bottom: 4px;">
                      ✓ ${t('signAllowed')}
                    </h5>
                    <p style="font-size: 13.5px; color: #e2e8f0; margin: 0;">${allowed}</p>
                  </div>

                  <div style="background: rgba(239, 68, 68, 0.08); border-left: 4px solid var(--danger); padding: 12px 16px; border-radius: 4px;">
                    <h5 style="color: #f87171; font-size: 13.5px; font-weight: 700; margin-bottom: 4px;">
                      ❌ ${t('signForbidden')}
                    </h5>
                    <p style="font-size: 13.5px; color: #e2e8f0; margin: 0;">${forbidden}</p>
                  </div>
                </div>

                <!-- Traps content -->
                <div id="subtab-traps" style="display: none;">
                  <div class="trap-box">
                    <h5>⚠️ ${t('signTraps')}</h5>
                    <p style="font-size: 14px; color: #fecaca; line-height: 1.6; margin: 0;">
                      ${traps}
                    </p>
                  </div>
                </div>

                <!-- Mini Quiz content -->
                <div id="subtab-quiz" style="display: none;">
                  <h4 style="font-size: 15px; font-weight: 700; color: var(--primary); margin-bottom: 12px;">
                    Mettiti alla prova su questo cartello:
                  </h4>
                  <div id="miniQuizContainer"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  // Render Mini Quiz
  renderSignMiniQuiz(sign);

  // Tab switching logic
  document.querySelectorAll('.sign-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.sign-tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const target = btn.dataset.tab;
      ['meaning', 'rules', 'traps', 'quiz'].forEach(t => {
        const el = document.getElementById(`subtab-${t}`);
        if (el) el.style.display = t === target ? 'block' : 'none';
      });
    });
  });

  document.getElementById('jumpToSignQuizBtn')?.addEventListener('click', () => {
    document.querySelectorAll('.sign-tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelector('.sign-tab-btn[data-tab="quiz"]').classList.add('active');
    ['meaning', 'rules', 'traps', 'quiz'].forEach(t => {
      const el = document.getElementById(`subtab-${t}`);
      if (el) el.style.display = t === 'quiz' ? 'block' : 'none';
    });
  });

  // Close modal
  document.getElementById('closeSignModal').addEventListener('click', () => {
    stopSpeaking();
    modal.innerHTML = '';
  });

  // TTS Reader
  let isSpeaking = false;
  document.getElementById('ttsSignBtn').addEventListener('click', () => {
    if (!isSpeaking) {
      isSpeaking = true;
      document.getElementById('ttsSignBtn').textContent = '⏹️ ' + t('stopAudio');
      speakText(`${title}. ${meaning}. ${traps}`, state.lang);
    } else {
      isSpeaking = false;
      document.getElementById('ttsSignBtn').textContent = '🔊 ' + t('readAloud');
      stopSpeaking();
    }
  });
}

function renderSignMiniQuiz(sign) {
  const container = document.getElementById('miniQuizContainer');
  if (!container || !sign.miniQuiz) return;

  container.innerHTML = sign.miniQuiz.map((item, idx) => `
    <div style="background: rgba(15, 23, 42, 0.7); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 14px; margin-bottom: 12px;">
      <div style="font-size: 14px; font-weight: 600; margin-bottom: 10px;">
        ${idx + 1}. ${item.q[state.lang] || item.q['it']}
      </div>
      <div style="display: flex; gap: 10px;" id="signQuizBtns-${idx}">
        <button class="btn-secondary sign-mini-ans-btn" data-sign-id="${sign.id}" data-idx="${idx}" data-val="true" style="padding: 6px 16px; font-size: 13px;">
          ✓ VERO
        </button>
        <button class="btn-secondary sign-mini-ans-btn" data-sign-id="${sign.id}" data-idx="${idx}" data-val="false" style="padding: 6px 16px; font-size: 13px;">
          ✕ FALSO
        </button>
      </div>
      <div id="signQuizResult-${idx}" style="font-size: 12.5px; margin-top: 8px; font-weight: 700; display: none;"></div>
    </div>
  `).join('');

  document.querySelectorAll('.sign-mini-ans-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.dataset.idx);
      const chosen = btn.dataset.val === 'true';
      const expected = sign.miniQuiz[idx].ans;
      const isRight = chosen === expected;
      const resEl = document.getElementById(`signQuizResult-${idx}`);

      if (resEl) {
        resEl.style.display = 'block';
        resEl.style.color = isRight ? '#34d399' : '#f87171';
        resEl.textContent = isRight ? '✓ Esatto! Risposta corretta.' : '❌ Sbagliato! Rivedi la regola del cartello.';
      }

      if (isRight) {
        state.signQuizScores[sign.id] = true;
        localStorage.setItem('dm_sign_quiz_scores', JSON.stringify(state.signQuizScores));
      }
    });
  });
}

// -------------------------------------------------------------
// 2. QUIZ & ESAME MINISTERIALE UFFICIALE (GRIGLIA 1-30, BANDIERINE)
// -------------------------------------------------------------
function renderQuizTab() {
  const container = document.getElementById('tab-quiz');
  const countryRules = COUNTRIES[state.country].examRules;

  if (state.quizQuestions.length === 0) {
    prepareQuizPool();
  }

  const q = state.quizQuestions[state.currentQuestionIndex];
  const totalQ = state.quizQuestions.length;
  const currentAnswer = state.quizAnswers[q?.id];
  const isFlagged = !!state.flaggedQuestions[q?.id];

  container.innerHTML = `
    <!-- Top Mode Selector -->
    <div class="quiz-modes-bar">
      <button class="quiz-mode-pill ${state.quizMode === 'exam' ? 'active' : ''}" data-mode="exam">
        ⏱️ ${t('quizModeExam')} (30 Quiz / 20 Min)
      </button>
      <button class="quiz-mode-pill ${state.quizMode === 'study' ? 'active' : ''}" data-mode="study">
        🎯 ${t('quizModeStudy')}
      </button>
      <button class="quiz-mode-pill ${state.quizMode === 'tricky' ? 'active' : ''}" data-mode="tricky">
        ⚠️ ${t('quizModeTricky')}
      </button>
      <button class="quiz-mode-pill ${state.quizMode === 'mistakes' ? 'active' : ''}" data-mode="mistakes">
        🔁 ${t('quizModeMistakes')} (${state.mistakesBank.length})
      </button>
    </div>

    <!-- Ministerial Matrix 1-30 -->
    <div class="ministerial-matrix-card">
      <div class="ministerial-matrix-header">
        <span>Scheda Ufficiale • Domande:</span>
        <div style="display: flex; gap: 14px; font-size: 11.5px;">
          <span>⚪ Da rispondere</span>
          <span style="color: #7dd3fc;">🔵 Risposta data</span>
          <span>🚩 In dubbio</span>
        </div>
      </div>
      <div class="grid-q-wrap">
        ${state.quizQuestions.map((question, index) => {
          const isAns = state.quizAnswers[question.id] !== undefined;
          const isFlg = !!state.flaggedQuestions[question.id];
          const isCur = index === state.currentQuestionIndex;
          return `
            <button class="grid-q-btn ${isCur ? 'active' : ''} ${isAns ? 'answered' : ''} ${isFlg ? 'flagged' : ''}" data-index="${index}">
              ${index + 1}
            </button>
          `;
        }).join('')}
      </div>
    </div>

    <!-- Question Control & Timer Strip -->
    <div class="exam-stats-strip">
      <div style="display: flex; align-items: center; gap: 12px; flex-wrap: wrap;">
        <span style="font-weight: 700; color: var(--text-muted); font-size: 14px;">
          ${t('questionOf', { current: state.currentQuestionIndex + 1, total: totalQ })}
        </span>
        <button id="flagQuestionBtn" class="btn-secondary" style="padding: 4px 10px; font-size: 12px;">
          ${isFlagged ? t('unflagQuestion') : t('flagQuestion')}
        </button>
        <button id="ttsQuizBtn" class="btn-secondary" style="padding: 4px 10px; font-size: 12px;">
          🔊 Ascolta
        </button>
        <button id="hintTheoryBtn" class="btn-secondary" style="padding: 4px 10px; font-size: 12px; border-color: rgba(56, 189, 248, 0.4); color: var(--primary);">
          ${t('theoryHintBtn')}
        </button>
      </div>

      <div class="exam-timer-chip">
        <span>⏱️</span>
        <span id="examTimerDisplay">${formatTimer(state.examSecondsLeft)}</span>
      </div>
    </div>

    <!-- Active Question Card -->
    ${q ? `
      <div class="exam-question-card">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span style="font-size: 12px; font-weight: 700; color: var(--primary); text-transform: uppercase;">
            ${q.topicId} ${q.isTricky ? '• ⚠️ TRUCCO MINISTERIALE' : ''}
          </span>
          <span style="font-size: 12px; color: var(--text-muted);">
            Domanda ${state.currentQuestionIndex + 1} / ${totalQ}
          </span>
        </div>

        <div class="question-text">
          ${q.question[state.lang] || q.question['it']}
        </div>

        <div class="quiz-actions-row">
          <button class="btn-answer true ${currentAnswer?.selected === 'true' ? 'selected' : ''}" id="btnTrue">
            ✓ ${t('trueBtn')}
          </button>
          <button class="btn-answer false ${currentAnswer?.selected === 'false' ? 'selected' : ''}" id="btnFalse">
            ✕ ${t('falseBtn')}
          </button>
        </div>

        ${currentAnswer !== undefined ? `
          <div class="answer-feedback-box ${currentAnswer.isCorrect ? 'correct' : 'wrong'}">
            <div style="font-weight: 800; font-size: 15px; margin-bottom: 4px;">
              ${currentAnswer.isCorrect ? '✓ Risposta salvata.' : '❌ Risposta salvata con errore.'}
            </div>
            <p style="font-size: 13.5px; margin: 0;">
              <strong>${t('explainAnswer')}:</strong> ${q.explanation[state.lang] || q.explanation['it']}
            </p>
          </div>
        ` : ''}

        <div style="display: flex; justify-content: space-between; margin-top: 28px; align-items: center; flex-wrap: wrap; gap: 12px;">
          <button class="btn-secondary" id="btnPrevQ" ${state.currentQuestionIndex === 0 ? 'disabled' : ''}>
            ← ${t('prevQuestion')}
          </button>
          <div style="font-size: 13px; color: var(--text-muted);">
            Risposte date: ${Object.keys(state.quizAnswers).length} / ${totalQ}
          </div>
          <button class="btn-primary" id="btnNextQ">
            ${state.currentQuestionIndex === totalQ - 1 ? t('submitExam') : t('nextQuestion') + ' →'}
          </button>
        </div>
      </div>
    ` : ''}
  `;

  // Bind Grid button clicks
  document.querySelectorAll('.grid-q-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      state.currentQuestionIndex = parseInt(btn.dataset.index);
      renderQuizTab();
    });
  });

  // Bind Mode buttons
  document.querySelectorAll('.quiz-mode-pill').forEach(btn => {
    btn.addEventListener('click', () => {
      state.quizMode = btn.dataset.mode;
      prepareQuizPool();
      renderQuizTab();
    });
  });

  // Flag Question Toggle
  document.getElementById('flagQuestionBtn')?.addEventListener('click', () => {
    if (!q) return;
    state.flaggedQuestions[q.id] = !state.flaggedQuestions[q.id];
    renderQuizTab();
  });

  // Theory Hint button
  document.getElementById('hintTheoryBtn')?.addEventListener('click', () => {
    if (!q) return;
    openTheoryHintModal(q);
  });

  // Audio Read Question
  document.getElementById('ttsQuizBtn')?.addEventListener('click', () => {
    if (!q) return;
    speakText(q.question[state.lang] || q.question['it'], state.lang);
  });

  // True / False answer buttons
  const btnTrue = document.getElementById('btnTrue');
  const btnFalse = document.getElementById('btnFalse');
  if (btnTrue && btnFalse) {
    btnTrue.addEventListener('click', () => recordAnswer(q, 'true'));
    btnFalse.addEventListener('click', () => recordAnswer(q, 'false'));
  }

  // Prev / Next Question buttons
  document.getElementById('btnPrevQ')?.addEventListener('click', () => {
    if (state.currentQuestionIndex > 0) {
      state.currentQuestionIndex--;
      renderQuizTab();
    }
  });

  document.getElementById('btnNextQ')?.addEventListener('click', () => {
    if (state.currentQuestionIndex < totalQ - 1) {
      state.currentQuestionIndex++;
      renderQuizTab();
    } else {
      finishExam();
    }
  });
}

function openTheoryHintModal(question) {
  const modal = document.getElementById('modalContainer');
  modal.innerHTML = `
    <div class="modal-overlay">
      <div class="modal-content" style="max-width: 580px;">
        <div class="modal-header">
          <h3 style="font-family: 'Outfit'; font-size: 18px; font-weight: 800; color: var(--primary);">
            💡 Scheda Teoria Ministeriale
          </h3>
          <button class="modal-close-btn" id="closeHintModal">&times;</button>
        </div>
        <div class="modal-body">
          <div style="font-size: 14px; font-weight: 700; color: var(--text-main); margin-bottom: 12px;">
            Argomento: ${question.topicId}
          </div>
          <p style="font-size: 14px; color: #cbd5e1; line-height: 1.7; margin-bottom: 16px;">
            ${question.explanation[state.lang] || question.explanation['it']}
          </p>
          <button class="btn-primary" id="confirmHintBtn" style="width: 100%; justify-content: center;">
            Ho Capito, Torna al Quiz
          </button>
        </div>
      </div>
    </div>
  `;

  document.getElementById('closeHintModal').addEventListener('click', () => modal.innerHTML = '');
  document.getElementById('confirmHintBtn').addEventListener('click', () => modal.innerHTML = '');
}

function prepareQuizPool() {
  state.currentQuestionIndex = 0;
  state.quizAnswers = {};
  state.flaggedQuestions = {};
  state.examFinished = false;

  let pool = [...QUIZ_DATABASE];
  if (state.quizMode === 'tricky') {
    pool = pool.filter(q => q.isTricky);
  } else if (state.quizMode === 'mistakes') {
    pool = pool.filter(q => state.mistakesBank.includes(q.id));
    if (pool.length === 0) pool = [...QUIZ_DATABASE].slice(0, 5);
  }

  state.quizQuestions = pool;
  startExamTimer();
}

function startExamTimer() {
  if (state.examTimerInterval) clearInterval(state.examTimerInterval);
  state.examSecondsLeft = COUNTRIES[state.country].examRules.timeLimitMinutes * 60;
  state.examTimerInterval = setInterval(() => {
    state.examSecondsLeft--;
    const display = document.getElementById('examTimerDisplay');
    if (display) display.textContent = formatTimer(state.examSecondsLeft);
    if (state.examSecondsLeft <= 0) {
      clearInterval(state.examTimerInterval);
      finishExam();
    }
  }, 1000);
}

function formatTimer(totalSec) {
  const m = Math.floor(Math.max(0, totalSec) / 60);
  const s = Math.max(0, totalSec) % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

function recordAnswer(question, selectedVal) {
  const isCorrect = question.correctAnswer === selectedVal;
  state.quizAnswers[question.id] = { selected: selectedVal, isCorrect };

  if (!isCorrect) {
    if (!state.mistakesBank.includes(question.id)) {
      state.mistakesBank.push(question.id);
      localStorage.setItem('dm_mistakes', JSON.stringify(state.mistakesBank));
    }
  } else {
    state.mistakesBank = state.mistakesBank.filter(id => id !== question.id);
    localStorage.setItem('dm_mistakes', JSON.stringify(state.mistakesBank));
  }

  renderQuizTab();
}

function finishExam() {
  if (state.examTimerInterval) clearInterval(state.examTimerInterval);
  const rules = COUNTRIES[state.country].examRules;
  let errorsCount = 0;

  state.quizQuestions.forEach(q => {
    const ans = state.quizAnswers[q.id];
    if (!ans || !ans.isCorrect) errorsCount++;
  });

  const isPassed = errorsCount <= rules.maxErrors;

  // Save session to history
  const session = {
    id: 'exam-' + Date.now(),
    date: new Date().toLocaleDateString('it-IT') + ' ' + new Date().toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' }),
    country: state.country,
    totalQuestions: state.quizQuestions.length,
    errorsCount,
    maxErrors: rules.maxErrors,
    isPassed,
    timeSpentSec: rules.timeLimitMinutes * 60 - state.examSecondsLeft,
    answers: { ...state.quizAnswers },
    questions: state.quizQuestions.map(q => ({
      id: q.id,
      text: q.question[state.lang] || q.question['it'],
      correctAnswer: q.correctAnswer,
      explanation: q.explanation[state.lang] || q.explanation['it']
    }))
  };

  state.examHistory.unshift(session);
  localStorage.setItem('dm_exam_history', JSON.stringify(state.examHistory));

  if (isPassed) {
    sound.playSuccess();
    confetti({ particleCount: 130, spread: 80, origin: { y: 0.6 } });
  }

  const modalContainer = document.getElementById('modalContainer');
  modalContainer.innerHTML = `
    <div class="modal-overlay">
      <div class="modal-content" style="max-width: 620px; text-align: center; padding: 36px 24px;">
        <div style="font-size: 54px; margin-bottom: 12px;">
          ${isPassed ? '🎉' : '❌'}
        </div>
        <h2 style="font-family: 'Outfit'; font-size: 26px; font-weight: 800; color: ${isPassed ? 'var(--success)' : 'var(--danger)'};">
          ${isPassed ? t('examPassed') : t('examFailed')}
        </h2>
        <p style="font-size: 16px; margin: 12px 0 20px; color: var(--text-muted);">
          ${t('errorsMade', { count: errorsCount, max: rules.maxErrors })}
        </p>

        <div style="display: flex; gap: 12px; margin-bottom: 24px;">
          <button id="viewCompletedSheetBtn" class="btn-secondary" style="flex: 1; justify-content: center;">
            📑 Rivedi Errori della Scheda
          </button>
          <button id="closeExamModalBtn" class="btn-primary" style="flex: 1; justify-content: center;">
            Nuova Scheda d'Esame
          </button>
        </div>
      </div>
    </div>
  `;

  document.getElementById('viewCompletedSheetBtn').addEventListener('click', () => {
    modalContainer.innerHTML = '';
    openExamSessionReview(session);
  });

  document.getElementById('closeExamModalBtn').addEventListener('click', () => {
    modalContainer.innerHTML = '';
    prepareQuizPool();
    renderQuizTab();
  });
}

// -------------------------------------------------------------
// 3. REVISIONE SCHEDE SVOLTE (EXAM SESSION REVIEW HISTORY)
// -------------------------------------------------------------
function renderExamReviewTab() {
  const container = document.getElementById('tab-examReview');
  const history = state.examHistory;

  container.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; flex-wrap: wrap; gap: 16px;">
      <div>
        <h2 style="font-family: 'Outfit'; font-size: 24px; font-weight: 800;">
          📑 ${t('navExamReview')}
        </h2>
        <p style="color: var(--text-muted); font-size: 14px;">
          Tutte le simulazioni d'esame svolte. Riapri qualsiasi scheda per verificare dove hai sbagliato e consolidare la teoria.
        </p>
      </div>

      <button id="clearHistoryBtn" class="btn-secondary" style="font-size: 12px; color: var(--danger); border-color: rgba(239, 68, 68, 0.4);">
        Svuota Storico
      </button>
    </div>

    ${history.length === 0 ? `
      <div class="glass-card" style="text-align: center; padding: 48px;">
        <div style="font-size: 40px; margin-bottom: 12px;">📑</div>
        <h3>Nessuna scheda d'esame ancora registrata.</h3>
        <p style="color: var(--text-muted); font-size: 14px; margin-top: 6px;">
          Completa la tua prima simulazione d'esame ministeriale per vederla archiviata qui.
        </p>
      </div>
    ` : `
      <div>
        ${history.map(item => `
          <div class="history-sheet-item">
            <div>
              <div style="font-weight: 800; font-size: 16px; margin-bottom: 4px;">
                Scheda Esame • ${item.date}
              </div>
              <div style="font-size: 13px; color: var(--text-muted);">
                Errori: ${item.errorsCount} su ${item.totalQuestions} (Max consentito: ${item.maxErrors}) • Tempo: ${formatTimer(item.timeSpentSec)}
              </div>
            </div>

            <div style="display: flex; align-items: center; gap: 14px;">
              <span class="${item.isPassed ? 'badge-passed' : 'badge-failed'}">
                ${item.isPassed ? 'IDONEO 🎉' : 'NON IDONEO ❌'}
              </span>
              <button class="btn-secondary review-single-exam-btn" data-session-id="${item.id}" style="font-size: 12.5px; padding: 8px 14px;">
                Rivedi Scheda →
              </button>
            </div>
          </div>
        `).join('')}
      </div>
    `}
  `;

  document.querySelectorAll('.review-single-exam-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const sess = history.find(h => h.id === btn.dataset.sessionId);
      if (sess) openExamSessionReview(sess);
    });
  });

  document.getElementById('clearHistoryBtn')?.addEventListener('click', () => {
    if (confirm('Sei sicuro di voler cancellare lo storico delle schede?')) {
      state.examHistory = [];
      localStorage.setItem('dm_exam_history', '[]');
      renderExamReviewTab();
    }
  });
}

function openExamSessionReview(session) {
  const modal = document.getElementById('modalContainer');
  modal.innerHTML = `
    <div class="modal-overlay">
      <div class="modal-content" style="max-width: 860px;">
        <div class="modal-header">
          <div>
            <h3 style="font-family: 'Outfit'; font-size: 20px; font-weight: 800;">
              Revisione Scheda • ${session.date}
            </h3>
            <span style="font-size: 13px; color: ${session.isPassed ? 'var(--success)' : 'var(--danger)'}; font-weight: 700;">
              Esito: ${session.isPassed ? 'Superato ✓' : 'Bocciato ❌'} (${session.errorsCount} errori)
            </span>
          </div>
          <button class="modal-close-btn" id="closeReviewModal">&times;</button>
        </div>

        <div class="modal-body">
          <div style="display: flex; flex-direction: column; gap: 14px;">
            ${session.questions.map((q, idx) => {
              const ans = session.answers[q.id];
              const wasAnswered = ans !== undefined;
              const isCorrect = ans?.isCorrect;
              return `
                <div style="background: rgba(15, 23, 42, 0.7); border: 1px solid ${!wasAnswered || !isCorrect ? 'var(--danger)' : 'var(--border-subtle)'}; border-radius: var(--radius-sm); padding: 16px;">
                  <div style="display: flex; justify-content: space-between; font-size: 12px; color: var(--text-muted); margin-bottom: 6px;">
                    <span>Domanda ${idx + 1}</span>
                    <span style="font-weight: 800; color: ${isCorrect ? 'var(--success)' : 'var(--danger)'};">
                      ${isCorrect ? '✓ Corretta' : '❌ Sbagliata'}
                    </span>
                  </div>
                  <div style="font-size: 15px; font-weight: 600; margin-bottom: 8px;">
                    ${q.text}
                  </div>
                  <div style="font-size: 13px; color: #cbd5e1; margin-bottom: 6px;">
                    Tua risposta: <strong>${ans?.selected === 'true' ? 'VERO' : ans?.selected === 'false' ? 'FALSO' : 'NON RISPOSTA'}</strong> • Risposta corretta: <strong>${q.correctAnswer === 'true' ? 'VERO' : 'FALSO'}</strong>
                  </div>
                  <div style="font-size: 12.5px; color: #94a3b8; background: rgba(0,0,0,0.3); padding: 8px 12px; border-radius: 4px;">
                    💡 <strong>Spiegazione:</strong> ${q.explanation}
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </div>
    </div>
  `;

  document.getElementById('closeReviewModal').addEventListener('click', () => modal.innerHTML = '');
}

// -------------------------------------------------------------
// 4. MIA AUTOSCUOLA & CODICE ALLIEVO
// -------------------------------------------------------------
function renderAutoscuolaTab() {
  const container = document.getElementById('tab-autoscuola');
  container.innerHTML = `
    <!-- Candidate Badge Card -->
    <div class="student-id-card">
      <div>
        <div style="font-size: 12px; color: var(--primary); font-weight: 800; text-transform: uppercase;">
          Tesserino Ufficiale Allievo
        </div>
        <h2 style="font-family: 'Outfit'; font-size: 24px; font-weight: 800; margin: 4px 0;">
          Allievo DriveMaster 2026
        </h2>
        <div style="font-family: 'JetBrains Mono'; font-size: 15px; color: var(--accent-gold);">
          Codice Allievo: DM-2026-IT-9812
        </div>
        <div style="font-size: 13px; color: var(--text-muted); margin-top: 6px;">
          Autoscuola Associata: <strong>Autoscuola Moderna & Guida Facile (Sede Centrale)</strong>
        </div>
      </div>

      <div class="student-qr-badge">
        <svg viewBox="0 0 100 100" style="width: 100%; height: 100%;">
          <rect x="10" y="10" width="30" height="30" fill="#000000"/>
          <rect x="15" y="15" width="20" height="20" fill="#ffffff"/>
          <rect x="20" y="20" width="10" height="10" fill="#000000"/>
          <rect x="60" y="10" width="30" height="30" fill="#000000"/>
          <rect x="65" y="15" width="20" height="20" fill="#ffffff"/>
          <rect x="70" y="20" width="10" height="10" fill="#000000"/>
          <rect x="10" y="60" width="30" height="30" fill="#000000"/>
          <rect x="15" y="65" width="20" height="20" fill="#ffffff"/>
          <rect x="20" y="70" width="10" height="10" fill="#000000"/>
          <rect x="50" y="50" width="15" height="15" fill="#000000"/>
          <rect x="70" y="70" width="15" height="15" fill="#000000"/>
        </svg>
      </div>
    </div>

    <!-- Instructor Direct Sync Status -->
    <div class="glass-card">
      <h3 style="font-family: 'Outfit'; font-size: 18px; font-weight: 800; margin-bottom: 16px; color: var(--primary);">
        👨‍🏫 Il Tuo Istruttore e Docente Teoria
      </h3>
      <div style="display: flex; gap: 16px; align-items: center; margin-bottom: 20px;">
        <div style="width: 56px; height: 56px; border-radius: 50%; background: #0284c7; display: flex; align-items: center; justify-content: center; font-size: 24px;">
          👨‍💼
        </div>
        <div>
          <div style="font-weight: 800; font-size: 16px;">Marco Rossi (Istruttore Certificato MIT)</div>
          <div style="font-size: 13px; color: var(--text-muted);">Sincronizzato in tempo reale con i tuoi quiz ed errori</div>
        </div>
      </div>

      <div style="background: rgba(15, 23, 42, 0.6); padding: 16px; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle);">
        <div style="font-size: 13px; font-weight: 700; color: var(--accent-gold); margin-bottom: 4px;">
          💬 Nota Didattica del Docente:
        </div>
        <p style="font-size: 13.5px; color: #cbd5e1; margin: 0;">
          "Ottimi progressi sulla segnaletica di precedenza! Prima della prova ufficiale di guida, focalizzati sui quiz della segnaletica orizzontale e sui cartelli di divieto di sorpasso per autocarri."
        </p>
      </div>
    </div>
  `;
}

// -------------------------------------------------------------
// 5. TEORIA DETTAGLIATA
// -------------------------------------------------------------
function renderTheoryTab() {
  const container = document.getElementById('tab-theory');
  const filteredTopics = THEORY_TOPICS.filter(t => {
    const matchCat = state.category === 'all' || t.category === 'all' || t.category === state.category;
    const titleText = (t.title[state.lang] || t.title['it']).toLowerCase();
    const summaryText = (t.summary[state.lang] || t.summary['it']).toLowerCase();
    const matchQuery = !state.theoryQuery || titleText.includes(state.theoryQuery.toLowerCase()) || summaryText.includes(state.theoryQuery.toLowerCase());
    return matchCat && matchQuery;
  });

  container.innerHTML = `
    <div class="theory-header-bar">
      <div>
        <h2 style="font-family: 'Outfit'; font-size: 24px; font-weight: 800;">
          📖 ${t('navTheory')} - ${COUNTRIES[state.country].name}
        </h2>
        <p style="color: var(--text-muted); font-size: 14px;">
          ${t('appSubtitle')}
        </p>
      </div>

      <div class="search-input-wrap">
        <span class="search-icon">🔍</span>
        <input type="text" id="theorySearchInput" placeholder="${t('theorySearchPlaceholder')}" value="${state.theoryQuery}" />
      </div>
    </div>

    <div class="theory-grid">
      ${filteredTopics.map(topic => `
        <div class="theory-card" data-topic-id="${topic.id}">
          <img src="${topic.image}" class="theory-card-media" alt="${topic.title[state.lang] || topic.title['it']}" />
          <div class="theory-card-body">
            <h3>${topic.icon} ${topic.title[state.lang] || topic.title['it']}</h3>
            <p>${topic.summary[state.lang] || topic.summary['it']}</p>
            <div class="theory-card-footer">
              <span style="font-size: 12px; color: var(--primary); font-weight: 700;">
                ✓ Illustrazioni & Trucchi Esame
              </span>
              <button class="btn-primary open-lesson-btn" data-topic-id="${topic.id}">
                Apri Lezione →
              </button>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  `;

  document.getElementById('theorySearchInput').addEventListener('input', (e) => {
    state.theoryQuery = e.target.value;
    renderTheoryTab();
  });

  document.querySelectorAll('.open-lesson-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      openLessonModal(btn.dataset.topicId);
    });
  });
}

function openLessonModal(topicId) {
  const topic = THEORY_TOPICS.find(t => t.id === topicId);
  if (!topic) return;
  const modalContainer = document.getElementById('modalContainer');

  const title = topic.title[state.lang] || topic.title['it'];
  const examTrapText = topic.examTrap[state.lang] || topic.examTrap['it'];

  modalContainer.innerHTML = `
    <div class="modal-overlay" id="lessonModal">
      <div class="modal-content">
        <div class="modal-header">
          <h2>${topic.icon} ${title}</h2>
          <div style="display: flex; gap: 10px; align-items: center;">
            <button id="ttsBtn" class="btn-secondary" style="font-size: 12px;">
              🔊 ${t('readAloud')}
            </button>
            <button class="modal-close-btn" id="closeLessonModal">&times;</button>
          </div>
        </div>
        <div class="modal-body">
          <div style="margin-bottom: 20px; border-radius: var(--radius-md); overflow: hidden;">
            <img src="${topic.image}" style="width: 100%; height: 280px; object-fit: cover;" alt="${title}" />
          </div>

          ${topic.sections.map(sec => `
            <div class="lesson-section">
              <h4>${sec.heading[state.lang] || sec.heading['it']}</h4>
              <p style="white-space: pre-line;">${sec.content[state.lang] || sec.content['it']}</p>
            </div>
          `).join('')}

          <div class="rule-box">
            <h5>⭐ ${t('keyRules')}</h5>
            <ul style="padding-left: 20px; font-size: 14px; color: #e2e8f0;">
              ${topic.goldenRules.map(r => `<li>${r[state.lang] || r['it']}</li>`).join('')}
            </ul>
          </div>

          <div class="trap-box">
            <h5>⚠️ ${t('examTip')}</h5>
            <p style="font-size: 13.5px; color: #fecaca; margin: 0;">${examTrapText}</p>
          </div>

          <div style="margin-top: 24px; text-align: right;">
            <button id="takeTopicQuizBtn" class="btn-primary">
              Mettiti alla Prova sui Quiz di questa Lezione 🎯
            </button>
          </div>
        </div>
      </div>
    </div>
  `;

  document.getElementById('closeLessonModal').addEventListener('click', () => {
    stopSpeaking();
    modalContainer.innerHTML = '';
  });

  let isPlayingSpeech = false;
  document.getElementById('ttsBtn').addEventListener('click', () => {
    if (!isPlayingSpeech) {
      isPlayingSpeech = true;
      document.getElementById('ttsBtn').textContent = '⏹️ ' + t('stopAudio');
      const textToRead = `${title}. ` + topic.sections.map(s => (s.heading[state.lang] || s.heading['it']) + '. ' + (s.content[state.lang] || s.content['it'])).join(' ');
      speakText(textToRead, state.lang);
    } else {
      isPlayingSpeech = false;
      document.getElementById('ttsBtn').textContent = '🔊 ' + t('readAloud');
      stopSpeaking();
    }
  });

  document.getElementById('takeTopicQuizBtn').addEventListener('click', () => {
    stopSpeaking();
    modalContainer.innerHTML = '';
    state.activeTab = 'quiz';
    state.quizMode = 'study';
    renderShell();
    setupEventListeners();
    loadTab('quiz');
  });
}

// -------------------------------------------------------------
// 6. SIMULATORE GUIDA PRATICA [PRO]
// -------------------------------------------------------------
function renderSimulatorTab() {
  const container = document.getElementById('tab-simulator');
  const isPro = proManager.getIsPro();

  if (!isPro) {
    container.innerHTML = `
      <div class="glass-card pro-locked-container">
        <div class="pro-locked-icon">🎮🔒</div>
        <h3>${t('simLockedMsg')}</h3>
        <p>
          Il simulatore di guida pratica interattivo con cruscotto 3D, controllo specchietti, sensori di parcheggio e scenari d'esame è riservato alla versione PRO.
        </p>
        <button id="simUnlockProBtn" class="btn-gold" style="font-size: 16px; padding: 14px 28px;">
          ⚡ ${t('simUnlockBtn')} (Prova Subito)
        </button>
      </div>
    `;

    document.getElementById('simUnlockProBtn').addEventListener('click', () => {
      proManager.setPro(true);
    });
    return;
  }

  container.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px; flex-wrap: wrap; gap: 12px;">
      <div>
        <h2 style="font-family: 'Outfit'; font-size: 22px; font-weight: 800;">
          🎮 ${t('simTitle')}
        </h2>
        <p style="color: var(--text-muted); font-size: 13.5px;">${t('simSubtitle')}</p>
      </div>

      <div style="display: flex; gap: 8px; flex-wrap: wrap;">
        <button class="btn-secondary sim-scenario-btn ${state.currentSimScenario === 'parking' ? 'active' : ''}" data-scene="parking">
          🅿️ ${t('simScenario2')}
        </button>
        <button class="btn-secondary sim-scenario-btn ${state.currentSimScenario === 'intersection' ? 'active' : ''}" data-scene="intersection">
          🚸 ${t('simScenario1')}
        </button>
        <button class="btn-secondary sim-scenario-btn ${state.currentSimScenario === 'emergency' ? 'active' : ''}" data-scene="emergency">
          🛑 ${t('simScenario3')}
        </button>
      </div>
    </div>

    <div class="simulator-layout">
      <div class="canvas-container">
        <canvas id="simCanvas" width="760" height="520"></canvas>
        <div class="sim-overlay-controls">
          <button id="toggleViewBtn" class="btn-secondary" style="font-size: 12px; padding: 6px 12px; background: rgba(0,0,0,0.6);">
            🎥 Cambia Vista (Abitacolo / Aerea)
          </button>
          <div style="background: rgba(0,0,0,0.6); padding: 4px 10px; border-radius: var(--radius-sm); font-size: 12px; font-weight: 700; color: var(--primary);">
            W/S: Gas/Freno • A/D: Sterzo • SPAZIO: Freno • H: Clacson
          </div>
        </div>
      </div>

      <div class="sim-sidebar">
        <div class="telemetry-card">
          <h4 style="font-family: 'Outfit'; margin-bottom: 14px; font-size: 16px; color: var(--primary);">
            📊 Telemetria Digitale
          </h4>
          <div class="telemetry-row">
            <span>${t('simSpeed')}:</span>
            <span class="telemetry-val" id="teleSpeed">0 km/h</span>
          </div>
          <div class="telemetry-row">
            <span>${t('simRPM')}:</span>
            <span class="telemetry-val" id="teleRpm">900</span>
          </div>
          <div class="telemetry-row">
            <span>${t('simGear')}:</span>
            <span class="telemetry-val" id="teleGear">[R] Retromarcia</span>
          </div>
          <div class="telemetry-row">
            <span>${t('simSteer')}:</span>
            <span class="telemetry-val" id="teleSteer">0°</span>
          </div>
          <div id="simFeedbackBox" style="font-size: 12.5px; color: #38bdf8; margin-top: 10px; min-height: 40px; border-top: 1px solid var(--border-subtle); padding-top: 8px;">
            💡 Premi W per arretrare verso il marciapiede. Ascolta i sensori di parcheggio.
          </div>
        </div>

        <div class="telemetry-card">
          <div style="display: flex; gap: 8px; margin-bottom: 12px;">
            <button id="gearDBtn" class="btn-secondary" style="flex: 1; font-weight: 800;">[D] Marcia</button>
            <button id="gearRBtn" class="btn-secondary" style="flex: 1; font-weight: 800; border-color: var(--primary);">[R] Retro</button>
          </div>
          <div style="display: flex; gap: 8px;">
            <button id="blinkerLeftBtn" class="btn-secondary" style="flex: 1;">◄ Freccia SX</button>
            <button id="hornBtn" class="btn-secondary" style="flex: 1;">📢 Clacson</button>
            <button id="blinkerRightBtn" class="btn-secondary" style="flex: 1;">Freccia DX ►</button>
          </div>
        </div>

        <div class="pedal-controls">
          <button id="gasPedal" class="btn-pedal gas">
            <span style="font-size: 24px;">⬆️</span>
            <span>ACCELERA</span>
          </button>
          <button id="brakePedal" class="btn-pedal brake">
            <span style="font-size: 24px;">🛑</span>
            <span>FRENA</span>
          </button>
        </div>
      </div>
    </div>
  `;

  setTimeout(() => {
    if (state.simulator) state.simulator.stop();
    state.simulator = new DrivingSimulator(
      'simCanvas',
      (telemetry) => {
        const teleSpeed = document.getElementById('teleSpeed');
        const teleRpm = document.getElementById('teleRpm');
        const teleGear = document.getElementById('teleGear');
        const teleSteer = document.getElementById('teleSteer');
        if (teleSpeed) teleSpeed.textContent = `${telemetry.speed} km/h`;
        if (teleRpm) teleRpm.textContent = telemetry.rpm;
        if (teleGear) teleGear.textContent = `[${telemetry.gear}]`;
        if (teleSteer) teleSteer.textContent = `${telemetry.steerAngleDeg}°`;
      },
      (feedback) => {
        const box = document.getElementById('simFeedbackBox');
        if (box) {
          box.textContent = feedback.message;
          box.style.color = feedback.type === 'success' ? '#34d399' : feedback.type === 'fail' ? '#f87171' : '#38bdf8';
        }
      }
    );
    state.simulator.init(state.currentSimScenario);
  }, 50);

  document.querySelectorAll('.sim-scenario-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.sim-scenario-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.currentSimScenario = btn.dataset.scene;
      if (state.simulator) state.simulator.init(state.currentSimScenario);
    });
  });

  document.getElementById('toggleViewBtn')?.addEventListener('click', () => {
    if (state.simulator) {
      state.simulator.viewMode = state.simulator.viewMode === 'cockpit' ? 'aerial' : 'cockpit';
    }
  });

  document.getElementById('gearDBtn')?.addEventListener('click', () => state.simulator?.setGear('D'));
  document.getElementById('gearRBtn')?.addEventListener('click', () => state.simulator?.setGear('R'));
  document.getElementById('blinkerLeftBtn')?.addEventListener('click', () => state.simulator?.toggleBlinker('left'));
  document.getElementById('blinkerRightBtn')?.addEventListener('click', () => state.simulator?.toggleBlinker('right'));
  document.getElementById('hornBtn')?.addEventListener('click', () => sound.playHorn());

  const gas = document.getElementById('gasPedal');
  const brake = document.getElementById('brakePedal');
  if (gas && brake) {
    const handleGasDown = () => { if (state.simulator) state.simulator.keys.up = true; };
    const handleGasUp = () => { if (state.simulator) state.simulator.keys.up = false; };
    const handleBrakeDown = () => { if (state.simulator) state.simulator.keys.brake = true; };
    const handleBrakeUp = () => { if (state.simulator) state.simulator.keys.brake = false; };

    gas.addEventListener('mousedown', handleGasDown);
    gas.addEventListener('mouseup', handleGasUp);
    gas.addEventListener('touchstart', handleGasDown);
    gas.addEventListener('touchend', handleGasUp);

    brake.addEventListener('mousedown', handleBrakeDown);
    brake.addEventListener('mouseup', handleBrakeUp);
    brake.addEventListener('touchstart', handleBrakeDown);
    brake.addEventListener('touchend', handleBrakeUp);
  }
}

// -------------------------------------------------------------
// 7. AGENDA & ESAME [PRO]
// -------------------------------------------------------------
function renderAgendaTab() {
  const container = document.getElementById('tab-agenda');
  const isPro = proManager.getIsPro();

  if (!isPro) {
    container.innerHTML = `
      <div class="glass-card pro-locked-container">
        <div class="pro-locked-icon">📅🔒</div>
        <h3>Agenda e Pianificazione Esame PRO</h3>
        <p>
          Prenotazione delle guide pratiche con gli istruttori, monitoraggio delle 6 ore obbligatorie certificate, appuntamento per l'esame ufficiale e registro presenze alle lezioni teoriche sono funzionalità PRO.
        </p>
        <button id="agendaUnlockProBtn" class="btn-gold" style="font-size: 16px; padding: 14px 28px;">
          ⚡ Passa a PRO per Sbloccare l'Agenda
        </button>
      </div>
    `;

    document.getElementById('agendaUnlockProBtn').addEventListener('click', () => {
      proManager.setPro(true);
    });
    return;
  }

  const hoursStats = agendaManager.getHoursStats();
  const lessons = agendaManager.getLessons();
  const exam = agendaManager.getExamData();
  const theoryList = agendaManager.getTheoryAttendance();

  const examDateObj = new Date(exam.examDate);
  const today = new Date();
  const daysDiff = Math.ceil((examDateObj - today) / (1000 * 60 * 60 * 24));

  container.innerHTML = `
    <div class="glass-card" style="margin-bottom: 24px;">
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;">
        <div>
          <h2 style="font-family: 'Outfit'; font-size: 22px; font-weight: 800; color: var(--accent-gold);">
            👑 ${t('agendaTitle')}
          </h2>
          <p style="color: var(--text-muted); font-size: 14px;">${t('agendaSubtitle')}</p>
        </div>

        <div style="display: flex; gap: 20px; align-items: center;">
          <div style="text-align: right;">
            <div style="font-size: 12px; color: var(--text-muted); text-transform: uppercase;">Ore Obbligatorie Certificate</div>
            <div style="font-size: 20px; font-weight: 800; color: var(--primary);">
              ${hoursStats.total} / ${hoursStats.requiredMin} Ore Effettuate
            </div>
          </div>
          <div style="text-align: right; border-left: 1px solid var(--border-subtle); padding-left: 20px;">
            <div style="font-size: 12px; color: var(--text-muted); text-transform: uppercase;">Data Ufficiale Esame</div>
            <div style="font-size: 20px; font-weight: 800; color: var(--accent-gold);">
              ${daysDiff > 0 ? `${daysDiff} ${t('examCountdownDays')}` : 'Esame Oggi!'}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="agenda-grid">
      <div>
        <div class="glass-card">
          <h3 style="font-family: 'Outfit'; font-size: 18px; font-weight: 800; margin-bottom: 16px; color: var(--primary);">
            🚗 ${t('bookLesson')}
          </h3>
          <form id="bookLessonForm">
            <div class="form-group">
              <label>${t('instructor')}</label>
              <select id="lessonInstructor">
                <option value="Marco Rossi">Marco Rossi (Specialista Città & Manovre - 4.9⭐)</option>
                <option value="Sarah Dupont">Sarah Dupont (Guida Dinamica & Autostrada - 5.0⭐)</option>
                <option value="Carlos Vega">Carlos Vega (Specialista Esame Pratico - 4.8⭐)</option>
              </select>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
              <div class="form-group">
                <label>${t('date')}</label>
                <input type="date" id="lessonDate" value="2026-10-30" required />
              </div>
              <div class="form-group">
                <label>${t('timeSlot')}</label>
                <select id="lessonTime">
                  <option value="09:00 - 10:00">09:00 - 10:00</option>
                  <option value="11:00 - 12:00">11:00 - 12:00</option>
                  <option value="15:00 - 16:00">15:00 - 16:00</option>
                  <option value="17:30 - 18:30">17:30 - 18:30 (Notturna)</option>
                </select>
              </div>
            </div>

            <div class="form-group">
              <label>${t('lessonType')}</label>
              <select id="lessonType">
                <option value="Guida Base & Manovre (Città)">Guida Base & Manovre (Città)</option>
                <option value="Guida Notturna (Obbligatoria)" data-cat="night">🌙 Guida Notturna (Obbligatoria per legge)</option>
                <option value="Autostrada & Scorrimento Veloce (Obbligatoria)" data-cat="highway">🛣️ Autostrada (Obbligatoria per legge)</option>
                <option value="Strade Extraurbane Principali (Obbligatoria)" data-cat="extra">🌲 Extraurbana (Obbligatoria per legge)</option>
                <option value="Simulazione Esame Pratico Completa">🎯 Simulazione Esame Pratico Completa</option>
              </select>
            </div>

            <div class="form-group">
              <label>${t('pickupLocation')}</label>
              <input type="text" id="lessonLocation" value="Autoscuola Centrale" required />
            </div>

            <button type="submit" class="btn-primary" style="width: 100%; justify-content: center;">
              Conferma Prenotazione Guida
            </button>
          </form>
        </div>

        <div class="glass-card">
          <h3 style="font-family: 'Outfit'; font-size: 18px; font-weight: 800; margin-bottom: 16px;">
            📋 Registro Guide Pratiche
          </h3>
          <div id="lessonsListContainer">
            ${lessons.map(l => `
              <div class="lesson-list-item">
                <div>
                  <div style="font-weight: 700; font-size: 15px;">${l.type}</div>
                  <div style="font-size: 12.5px; color: var(--text-muted);">
                    📅 ${l.date} • ⏰ ${l.time} • 👤 ${l.instructor}
                  </div>
                  <div style="font-size: 12px; color: #38bdf8; margin-top: 4px;">
                    💬 Valutazione: ${l.feedback}
                  </div>
                </div>
                <div>
                  <span class="${l.status === 'completed' ? 'lesson-badge-completed' : 'lesson-badge-booked'}">
                    ${l.status === 'completed' ? 'Completata ✓' : 'Prenotata ⏳'}
                  </span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <div>
        <div class="glass-card">
          <h3 style="font-family: 'Outfit'; font-size: 18px; font-weight: 800; margin-bottom: 16px; color: var(--accent-gold);">
            🎯 ${t('examCountdownTitle')}
          </h3>
          <div style="background: rgba(15, 23, 42, 0.8); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 16px; margin-bottom: 20px;">
            <div style="font-size: 14px; font-weight: 700;">Data Convocazione: ${exam.examDate} alle ore ${exam.examTime}</div>
            <div style="font-size: 13px; color: var(--text-muted); margin-top: 4px;">📍 Sede: ${exam.examCenter}</div>
            <div style="font-size: 13px; color: var(--text-muted);">Candidato: ${exam.candidateName} (${exam.candidateCode})</div>
          </div>

          <h4 style="font-size: 14px; font-weight: 700; margin-bottom: 12px; color: var(--text-main);">
            📋 ${t('documentsChecklist')}
          </h4>
          <div style="display: flex; flex-direction: column; gap: 10px;">
            ${exam.documents.map(doc => `
              <label style="display: flex; align-items: center; gap: 10px; font-size: 13.5px; cursor: pointer;">
                <input type="checkbox" class="doc-checkbox" data-id="${doc.id}" ${doc.checked ? 'checked' : ''} style="width: 18px; height: 18px; accent-color: var(--primary);" />
                <span style="${doc.checked ? 'color: #e2e8f0;' : 'color: var(--text-muted); text-decoration: line-through;'}">${doc.name}</span>
              </label>
            `).join('')}
          </div>
        </div>

        <div class="glass-card">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
            <h3 style="font-family: 'Outfit'; font-size: 18px; font-weight: 800;">
              📚 ${t('theoryClassesTitle')}
            </h3>
            <span style="font-size: 12px; color: var(--primary); font-weight: 700;">
              ${theoryList.filter(t => t.attended).length} / ${theoryList.length} Presenze
            </span>
          </div>

          <div style="display: flex; flex-direction: column; gap: 8px;">
            ${theoryList.map(th => `
              <div style="display: flex; align-items: center; justify-content: space-between; background: rgba(15, 23, 42, 0.6); padding: 10px 14px; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle);">
                <div>
                  <div style="font-size: 13.5px; font-weight: 600;">${th.module}</div>
                  <div style="font-size: 11.5px; color: var(--text-muted);">Data: ${th.date}</div>
                </div>
                <button class="btn-secondary toggle-theory-btn" data-id="${th.id}" style="font-size: 12px; padding: 4px 10px; border-color: ${th.attended ? 'var(--success)' : 'var(--border-subtle)'}; color: ${th.attended ? 'var(--success)' : 'var(--text-muted)'};">
                  ${th.attended ? t('attended') : t('notAttended')}
                </button>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  `;

  document.getElementById('bookLessonForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const instructor = document.getElementById('lessonInstructor').value;
    const date = document.getElementById('lessonDate').value;
    const time = document.getElementById('lessonTime').value;
    const typeSelect = document.getElementById('lessonType');
    const type = typeSelect.value;
    const category = typeSelect.selectedOptions[0].dataset.cat || 'general';
    const location = document.getElementById('lessonLocation').value;

    agendaManager.addLesson({ instructor, date, time, type, category, location });
    confetti({ particleCount: 60, spread: 50, origin: { y: 0.7 } });
    renderAgendaTab();
  });

  document.querySelectorAll('.doc-checkbox').forEach(cb => {
    cb.addEventListener('change', () => {
      agendaManager.toggleDocument(cb.dataset.id);
      renderAgendaTab();
    });
  });

  document.querySelectorAll('.toggle-theory-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      agendaManager.toggleTheoryAttendance(btn.dataset.id);
      renderAgendaTab();
    });
  });
}

// -------------------------------------------------------------
// 8. STATISTICHE & IDONEITÀ
// -------------------------------------------------------------
function renderStatsTab() {
  const container = document.getElementById('tab-stats');
  const mistakesCount = state.mistakesBank.length;
  const hours = agendaManager.getHoursStats();
  const totalExams = state.examHistory.length;
  const passedExams = state.examHistory.filter(h => h.isPassed).length;
  const passRate = totalExams > 0 ? Math.round((passedExams / totalExams) * 100) : 85;

  container.innerHTML = `
    <div class="glass-card">
      <h2 style="font-family: 'Outfit'; font-size: 24px; font-weight: 800; margin-bottom: 8px;">
        📊 ${t('navStats')} & Idoneità all'Esame
      </h2>
      <p style="color: var(--text-muted); font-size: 14px; margin-bottom: 24px;">
        Algoritmo predittivo basato sui quiz svolti, lezioni di segnaletica completate e ore di guida certificate.
      </p>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; margin-bottom: 32px;">
        <div style="background: rgba(15, 23, 42, 0.8); padding: 20px; border-radius: var(--radius-md); border: 1px solid var(--border-subtle); text-align: center;">
          <div style="font-size: 13px; color: var(--text-muted);">Probabilità Superamento Esame</div>
          <div style="font-size: 34px; font-weight: 900; color: #34d399; margin: 6px 0;">${passRate}%</div>
          <div style="font-size: 12px; color: #34d399;">Livello: Pronto per l'Esame Ufficiale ✓</div>
        </div>

        <div style="background: rgba(15, 23, 42, 0.8); padding: 20px; border-radius: var(--radius-md); border: 1px solid var(--border-subtle); text-align: center;">
          <div style="font-size: 13px; color: var(--text-muted);">Errori da Consolidare</div>
          <div style="font-size: 34px; font-weight: 900; color: #f87171; margin: 6px 0;">${mistakesCount}</div>
          <div style="font-size: 12px; color: var(--text-muted);">Nella Boîte à erreurs</div>
        </div>

        <div style="background: rgba(15, 23, 42, 0.8); padding: 20px; border-radius: var(--radius-md); border: 1px solid var(--border-subtle); text-align: center;">
          <div style="font-size: 13px; color: var(--text-muted);">Simulazioni Esame Registrate</div>
          <div style="font-size: 34px; font-weight: 900; color: var(--primary); margin: 6px 0;">${totalExams}</div>
          <div style="font-size: 12px; color: var(--primary);">${passedExams} idonee</div>
        </div>

        <div style="background: rgba(15, 23, 42, 0.8); padding: 20px; border-radius: var(--radius-md); border: 1px solid var(--border-subtle); text-align: center;">
          <div style="font-size: 13px; color: var(--text-muted);">Ore Guide Certificate</div>
          <div style="font-size: 34px; font-weight: 900; color: var(--accent-gold); margin: 6px 0;">${hours.total} / 6h</div>
          <div style="font-size: 12px; color: var(--accent-gold);">Registro ministeriale</div>
        </div>
      </div>
    </div>
  `;
}

// Kickoff
window.addEventListener('DOMContentLoaded', initApp);
