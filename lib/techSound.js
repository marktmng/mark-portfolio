// Web Audio API Synthesizer for movie-style technical UI feedback
// Zero external sound assets, 0 bandwidth, ultra-low latency, pure in-browser synthesis

let audioCtx = null;
const SOUND_KEY = "mark_portfolio_sfx_enabled";
let lastScrollSoundTime = 0;

export const getAudioContext = () => {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const AudioContextClass =
      window.AudioContext ||
      // @ts-ignore
      window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
};

// Check if sound is enabled (defaults to true)
export const isSoundEnabled = () => {
  if (typeof window === "undefined") return true;
  try {
    const stored = localStorage.getItem(SOUND_KEY);
    return stored === null ? true : stored === "true";
  } catch (e) {
    return true;
  }
};

export const setSoundEnabled = (enabled) => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(SOUND_KEY, String(enabled));
  } catch (e) {}
};

/**
 * Movie-style tactical interface pop
 * Soft sine wave with fast pitch drop (1350Hz -> 340Hz in 40ms)
 */
export const playTechPop = (volume = 0.04) => {
  try {
    if (!isSoundEnabled()) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(1350, now);
    osc.frequency.exponentialRampToValueAtTime(340, now + 0.038);

    // Soft volume envelope to prevent clicking
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(volume, now + 0.004);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.042);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.045);
  } catch (e) {
    // Fail silently
  }
};

/**
 * Micro-tick for hovering over skill modules or interactive badges
 * Ultra-subtle 14ms high-frequency click (tactile glass haptics)
 */
export const playTechTick = (volume = 0.012) => {
  try {
    if (!isSoundEnabled()) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(2200, now);
    osc.frequency.exponentialRampToValueAtTime(750, now + 0.014);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(volume, now + 0.002);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.016);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.018);
  } catch (e) {
    // Fail silently
  }
};

/**
 * Sci-Fi two-tone affirmation chirp (for category switch or copy)
 */
export const playTechChirp = (volume = 0.03) => {
  try {
    if (!isSoundEnabled()) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(840, now);
    osc.frequency.setValueAtTime(1380, now + 0.032);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(volume, now + 0.005);
    gain.gain.setValueAtTime(volume * 0.9, now + 0.032);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.075);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.08);
  } catch (e) {
    // Fail silently
  }
};

/**
 * Movie-style biometric/laser scan sound
 * High-tech oscillating frequency sweep with resonant harmonics (like a security scanner in sci-fi)
 */
export const playTechScanSound = (volume = 0.032) => {
  try {
    if (!isSoundEnabled()) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    // Rhythmic laser scanner sweep
    osc.type = "sine";
    osc.frequency.setValueAtTime(520, now);
    osc.frequency.exponentialRampToValueAtTime(1280, now + 0.12);
    osc.frequency.exponentialRampToValueAtTime(680, now + 0.22);
    osc.frequency.exponentialRampToValueAtTime(1440, now + 0.32);

    // Smooth gain envelope with subtle pulsating peak
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(volume, now + 0.02);
    gain.gain.setValueAtTime(volume * 0.75, now + 0.14);
    gain.gain.setValueAtTime(volume * 0.9, now + 0.28);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.36);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.38);

    // Complementary holographic sub-tone for depth
    const subOsc = ctx.createOscillator();
    const subGain = ctx.createGain();
    subOsc.type = "triangle";
    subOsc.frequency.setValueAtTime(260, now);
    subOsc.frequency.linearRampToValueAtTime(480, now + 0.24);

    subGain.gain.setValueAtTime(0.0001, now);
    subGain.gain.linearRampToValueAtTime(volume * 0.35, now + 0.03);
    subGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.32);

    subOsc.connect(subGain);
    subGain.connect(ctx.destination);

    subOsc.start(now);
    subOsc.stop(now + 0.34);
  } catch (e) {
    // Fail silently
  }
};

/**
 * Movie-style technical scroll / HUD dock sound
 * Downward glide as header docks into view during scroll
 */
export const playTechScrollSound = (direction = "down", volume = 0.024) => {
  try {
    if (!isSoundEnabled()) return;
    const nowMs = Date.now();
    if (nowMs - lastScrollSoundTime < 350) return;
    lastScrollSoundTime = nowMs;

    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    if (direction === "down") {
      // Warm low-mid docking glide (650Hz -> 260Hz in 55ms) - no high pings
      osc.type = "sine";
      osc.frequency.setValueAtTime(650, now);
      osc.frequency.exponentialRampToValueAtTime(260, now + 0.055);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(volume, now + 0.008);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.06);
    } else {
      // Gentle release / undock glide up (260Hz -> 540Hz in 45ms)
      osc.type = "sine";
      osc.frequency.setValueAtTime(260, now);
      osc.frequency.exponentialRampToValueAtTime(540, now + 0.045);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(volume * 0.7, now + 0.006);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);
    }

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.065);
  } catch (e) {
    // Fail silently
  }
};

/**
 * PNEUMATIC / MOTORIZED DRAWER SLIDE DOWN (for Mobile Navbar)
 * Specially designed to NOT sound like a notification!
 * Pure low-friction aerodynamic air whoosh + gentle mechanical servo glide.
 */
export const playTechDrawerSlide = (direction = "down", volume = 0.035) => {
  try {
    if (!isSoundEnabled()) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const duration = 0.2;

    // 1. Aerodynamic filtered air whoosh (soft pink-filtered noise)
    const bufferSize = Math.floor(ctx.sampleRate * duration);
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.65));
    }

    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = noiseBuffer;

    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.Q.value = 1.3;

    const noiseGain = ctx.createGain();

    if (direction === "down") {
      // Filter frequency slides smoothly down: 560Hz -> 170Hz
      filter.frequency.setValueAtTime(560, now);
      filter.frequency.exponentialRampToValueAtTime(170, now + duration);

      noiseGain.gain.setValueAtTime(0.0001, now);
      noiseGain.gain.linearRampToValueAtTime(volume * 0.85, now + 0.025);
      noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
    } else {
      // Filter frequency slides up as it retracts: 170Hz -> 480Hz
      filter.frequency.setValueAtTime(170, now);
      filter.frequency.exponentialRampToValueAtTime(480, now + duration);

      noiseGain.gain.setValueAtTime(0.0001, now);
      noiseGain.gain.linearRampToValueAtTime(volume * 0.65, now + 0.025);
      noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
    }

    noiseSource.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(ctx.destination);
    noiseSource.start(now);
    noiseSource.stop(now + duration);

    // 2. Low-frequency servo motor hum (150Hz -> 80Hz) - zero bells/chimes
    const servoOsc = ctx.createOscillator();
    const servoGain = ctx.createGain();
    servoOsc.type = "sine";

    if (direction === "down") {
      servoOsc.frequency.setValueAtTime(150, now);
      servoOsc.frequency.linearRampToValueAtTime(80, now + duration);
    } else {
      servoOsc.frequency.setValueAtTime(85, now);
      servoOsc.frequency.linearRampToValueAtTime(140, now + duration);
    }

    servoGain.gain.setValueAtTime(0.0001, now);
    servoGain.gain.linearRampToValueAtTime(volume * 0.5, now + 0.02);
    servoGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    servoOsc.connect(servoGain);
    servoGain.connect(ctx.destination);
    servoOsc.start(now);
    servoOsc.stop(now + duration);
  } catch (e) {
    // Fail silently
  }
};

/**
 * Tactical mechanical command tap (for mobile nav links)
 * Low-frequency dampened key tap (300Hz -> 140Hz) - NOT a notification chirp
 */
export const playTechCommandTap = (volume = 0.022) => {
  try {
    if (!isSoundEnabled()) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(290, now);
    osc.frequency.exponentialRampToValueAtTime(130, now + 0.025);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(volume, now + 0.003);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.028);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.03);
  } catch (e) {
    // Fail silently
  }
};

/**
 * ==========================================
 * TESTIMONIALS / ENDORSEMENTS SOUND SYSTEM
 * Distinct sci-fi data downlink & transmission telemetry
 * ==========================================
 */

/**
 * Incoming transmission decrypted (when opening a testimonial modal)
 * Rapid 3-tone data packet decode with subtle acoustic warmth
 */
export const playTechTransmissionDecode = (volume = 0.03) => {
  try {
    if (!isSoundEnabled()) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const notes = [392, 587, 784]; // G4, D5, G5 harmonic telemetry
    const stepDuration = 0.028;

    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const startTime = now + idx * stepDuration;

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.0001, startTime);
      gain.gain.linearRampToValueAtTime(volume * (0.8 + idx * 0.1), startTime + 0.004);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + stepDuration + 0.02);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + stepDuration + 0.025);
    });
  } catch (e) {
    // Fail silently
  }
};

/**
 * Data packet switch (when switching between testimonials in modal or swiping)
 * Smooth holographic card flip with low-end resonance
 */
export const playTechDataPacketSwipe = (volume = 0.024) => {
  try {
    if (!isSoundEnabled()) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    // Smooth holographic slide up
    osc.frequency.setValueAtTime(420, now);
    osc.frequency.exponentialRampToValueAtTime(680, now + 0.038);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(volume, now + 0.005);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.045);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.05);
  } catch (e) {
    // Fail silently
  }
};

/**
 * Subtle feedback probe sound (when hovering over a testimonial card)
 * Gentle data-beam chime with warm tone
 */
export const playTechFeedbackHover = (volume = 0.015) => {
  try {
    if (!isSoundEnabled()) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(520, now);
    osc.frequency.exponentialRampToValueAtTime(740, now + 0.02);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(volume, now + 0.003);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.024);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.028);
  } catch (e) {
    // Fail silently
  }
};

/**
 * Carrier disconnect (when closing testimonial modal)
 * Soft downward disconnect glide
 */
export const playTechCommsClose = (volume = 0.02) => {
  try {
    if (!isSoundEnabled()) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(540, now);
    osc.frequency.exponentialRampToValueAtTime(220, now + 0.045);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(volume, now + 0.005);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.055);
  } catch (e) {
    // Fail silently
  }
};
