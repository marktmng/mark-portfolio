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
 * Played when scrolling down as navbar engages, docks, or rolls down
 */
export const playTechScrollSound = (direction = "down", volume = 0.026) => {
  try {
    if (!isSoundEnabled()) return;
    const nowMs = Date.now();
    // Throttle so rapid scroll adjustments don't pile up sounds
    if (nowMs - lastScrollSoundTime < 350) return;
    lastScrollSoundTime = nowMs;

    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    if (direction === "down") {
      // High-tech docking glide down (940Hz -> 380Hz in 52ms)
      osc.type = "sine";
      osc.frequency.setValueAtTime(940, now);
      osc.frequency.exponentialRampToValueAtTime(380, now + 0.05);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(volume, now + 0.006);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.055);

      // Micro glass click overlay
      const clickOsc = ctx.createOscillator();
      const clickGain = ctx.createGain();
      clickOsc.type = "triangle";
      clickOsc.frequency.setValueAtTime(1850, now);
      clickOsc.frequency.exponentialRampToValueAtTime(600, now + 0.016);
      clickGain.gain.setValueAtTime(0.0001, now);
      clickGain.gain.linearRampToValueAtTime(volume * 0.6, now + 0.002);
      clickGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.018);

      clickOsc.connect(clickGain);
      clickGain.connect(ctx.destination);
      clickOsc.start(now);
      clickOsc.stop(now + 0.02);
    } else {
      // Gentle release / undock glide up (380Hz -> 820Hz in 42ms)
      osc.type = "sine";
      osc.frequency.setValueAtTime(380, now);
      osc.frequency.exponentialRampToValueAtTime(820, now + 0.04);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(volume * 0.7, now + 0.005);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.045);
    }

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.06);
  } catch (e) {
    // Fail silently
  }
};
