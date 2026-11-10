// Tiny sound effects made with the Web Audio API - no audio files needed.
let ctx = null;

function getCtx() {
  if (typeof window === 'undefined') return null;
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) return null;
  if (!ctx) ctx = new AC();
  if (ctx.state === 'suspended') ctx.resume().catch(() => {});
  return ctx;
}

const SOUNDS = {
  tap: [[520, 0, 0.07]],
  reveal: [[440, 0, 0.1], [660, 0.1, 0.16]],
  hide: [[500, 0, 0.08], [330, 0.08, 0.12]],
  vote: [[392, 0, 0.1], [523, 0.1, 0.14]],
  tick: [[900, 0, 0.05]],
  alarm: [[660, 0, 0.15], [660, 0.22, 0.15], [880, 0.44, 0.3]],
  win: [[523, 0, 0.14], [659, 0.14, 0.14], [784, 0.28, 0.14], [1047, 0.42, 0.4]],
  lose: [[392, 0, 0.18], [330, 0.2, 0.18], [262, 0.4, 0.4]],
  drum: [[110, 0, 0.12], [110, 0.2, 0.12], [110, 0.4, 0.12], [140, 0.6, 0.25]],
};

export function playSound(name, enabled = true) {
  if (!enabled) return;
  try {
    const c = getCtx();
    const notes = SOUNDS[name];
    if (!c || !notes) return;
    const now = c.currentTime;
    notes.forEach(([freq, start, dur]) => {
      const osc = c.createOscillator();
      const gain = c.createGain();
      osc.type = name === 'drum' ? 'triangle' : 'sine';
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.0001, now + start);
      gain.gain.exponentialRampToValueAtTime(0.18, now + start + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + start + dur);
      osc.connect(gain).connect(c.destination);
      osc.start(now + start);
      osc.stop(now + start + dur + 0.05);
    });
  } catch {
    /* sound is optional - never break the game because of it */
  }
}
