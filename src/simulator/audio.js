// Web Audio API Sound Synthesizer & Speech Synthesis TTS

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.engineOsc = null;
    this.engineGain = null;
    this.isEngineRunning = false;
    this.parkingBeepInterval = null;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Engine Rumble Sound
  startEngine(rpm = 900) {
    try {
      this.init();
      if (this.isEngineRunning) return;
      
      this.engineOsc = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      this.engineGain = this.ctx.createGain();

      // Low rumble waveform
      this.engineOsc.type = 'sawtooth';
      this.engineOsc.frequency.setValueAtTime(rpm / 20, this.ctx.currentTime);

      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(rpm / 15, this.ctx.currentTime);

      // Filter for muffled engine compartment tone
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(140, this.ctx.currentTime);

      this.engineGain.gain.setValueAtTime(0.08, this.ctx.currentTime);

      this.engineOsc.connect(filter);
      osc2.connect(filter);
      filter.connect(this.engineGain);
      this.engineGain.connect(this.ctx.destination);

      this.engineOsc.start();
      osc2.start();
      this.osc2 = osc2;
      this.isEngineRunning = true;
    } catch (e) {
      console.warn('Audio not allowed yet:', e);
    }
  }

  setEngineRPM(rpm) {
    if (!this.isEngineRunning || !this.engineOsc) return;
    const baseFreq = Math.max(35, rpm / 18);
    this.engineOsc.frequency.setTargetAtTime(baseFreq, this.ctx.currentTime, 0.08);
    if (this.osc2) {
      this.osc2.frequency.setTargetAtTime(baseFreq * 1.3, this.ctx.currentTime, 0.08);
    }
  }

  stopEngine() {
    if (!this.isEngineRunning) return;
    try {
      if (this.engineGain) {
        this.engineGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.1);
      }
      setTimeout(() => {
        if (this.engineOsc) this.engineOsc.stop();
        if (this.osc2) this.osc2.stop();
        this.isEngineRunning = false;
      }, 120);
    } catch (e) {}
  }

  // Turn Indicator Blinker Tick-Tock
  playBlinker(isTick) {
    try {
      this.init();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(isTick ? 900 : 750, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.06, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    } catch (e) {}
  }

  // European Dual-Tone Car Horn
  playHorn(duration = 0.4) {
    try {
      this.init();
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc1.type = 'sawtooth';
      osc2.type = 'sawtooth';
      osc1.frequency.setValueAtTime(420, this.ctx.currentTime);
      osc2.frequency.setValueAtTime(520, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(this.ctx.destination);

      osc1.start();
      osc2.start();
      osc1.stop(this.ctx.currentTime + duration);
      osc2.stop(this.ctx.currentTime + duration);
    } catch (e) {}
  }

  // Ultrasonic Parking Radar Beep (distance in cm: 20cm to 150cm)
  playRadarBeep(distanceCm) {
    try {
      this.init();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1400, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.09, this.ctx.currentTime);
      const beepLen = distanceCm < 25 ? 0.3 : 0.08;
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + beepLen);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + beepLen);
    } catch (e) {}
  }

  // Success Fanfare for Passed Exam
  playSuccess() {
    try {
      this.init();
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.12);
        gain.gain.setValueAtTime(0.15, this.ctx.currentTime + idx * 0.12);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + idx * 0.12 + 0.4);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(this.ctx.currentTime + idx * 0.12);
        osc.stop(this.ctx.currentTime + idx * 0.12 + 0.4);
      });
    } catch (e) {}
  }

  // Emergency Brake Screech
  playBrakeScreech() {
    try {
      this.init();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(2200, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(400, this.ctx.currentTime + 0.4);
      gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.4);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.4);
    } catch (e) {}
  }
}

export const sound = new SoundEngine();

// Text to Speech Helper for Multilingual Audio Reader
export function speakText(text, lang = 'it', rate = 1, onEnd = null) {
  if (!('speechSynthesis' in window)) { if (onEnd) onEnd(); return; }
  window.speechSynthesis.cancel(); // stop any current speech
  const utterance = new SpeechSynthesisUtterance(text);

  const langMap = {
    it: 'it-IT',
    fr: 'fr-FR',
    en: 'en-GB',
    es: 'es-ES',
    de: 'de-DE'
  };
  utterance.lang = langMap[lang] || 'it-IT';
  const voice = window.speechSynthesis.getVoices().find(v => v.lang === utterance.lang) || window.speechSynthesis.getVoices().find(v => v.lang.startsWith(lang));
  if (voice) utterance.voice = voice;
  utterance.rate = rate;
  utterance.pitch = 1.0;
  if (onEnd) { utterance.onend = onEnd; utterance.onerror = onEnd; }
  window.speechSynthesis.speak(utterance);
}

export function stopSpeaking() {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}
