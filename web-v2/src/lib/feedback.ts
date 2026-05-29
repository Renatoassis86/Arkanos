// Feedback de jogo: efeitos sonoros (Web Audio, sem arquivos) + vibração (haptics).
// Tudo é disparado em resposta a um toque do usuário, respeitando as políticas de autoplay.

let audioCtx: AudioContext | null = null;

function ctx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  const AC =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext?: typeof AudioContext })
      .webkitAudioContext;
  if (!AC) return null;
  if (!audioCtx) audioCtx = new AC();
  if (audioCtx.state === "suspended") void audioCtx.resume();
  return audioCtx;
}

function beep(
  freq: number,
  delay: number,
  dur: number,
  gain = 0.18,
  type: OscillatorType = "sine",
) {
  const c = ctx();
  if (!c) return;
  const osc = c.createOscillator();
  const g = c.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  osc.connect(g);
  g.connect(c.destination);
  const start = c.currentTime + delay;
  g.gain.setValueAtTime(0.0001, start);
  g.gain.exponentialRampToValueAtTime(gain, start + 0.02);
  g.gain.exponentialRampToValueAtTime(0.0001, start + dur);
  osc.start(start);
  osc.stop(start + dur + 0.03);
}

export function vibrate(pattern: number | number[]) {
  if (typeof navigator !== "undefined" && "vibrate" in navigator) {
    navigator.vibrate(pattern);
  }
}

export function playCorrect() {
  beep(523, 0, 0.12);
  beep(659, 0.1, 0.12);
  beep(784, 0.2, 0.18);
  vibrate(30);
}

export function playWrong() {
  beep(196, 0, 0.22, 0.18, "sawtooth");
  vibrate([35, 40, 35]);
}

export function playFinish() {
  beep(523, 0, 0.12);
  beep(659, 0.12, 0.12);
  beep(784, 0.24, 0.12);
  beep(1047, 0.36, 0.3);
  vibrate([20, 40, 20, 40, 90]);
}
