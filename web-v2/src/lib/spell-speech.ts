/**
 * Voz para o Spelling Bee: síntese (falar palavra/letras/frases) e mapeamento
 * de fala -> letras (para o aluno soletrar pelo microfone). Tudo client-side.
 */

/** Fala um texto em inglês. */
export function speak(text: string, opts: { rate?: number; onend?: () => void } = {}) {
  if (typeof window === "undefined" || !window.speechSynthesis) {
    opts.onend?.();
    return;
  }
  const synth = window.speechSynthesis;
  synth.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "en-US";
  u.rate = opts.rate ?? 0.9;
  if (opts.onend) u.onend = opts.onend;
  synth.speak(u);
}

/** Soletra a palavra em voz alta (letra a letra) e depois a pronuncia. */
export function spellOutWord(word: string, opts: { onend?: () => void } = {}) {
  if (typeof window === "undefined" || !window.speechSynthesis) {
    opts.onend?.();
    return;
  }
  const synth = window.speechSynthesis;
  synth.cancel();
  for (const ch of word.toUpperCase().replace(/[^A-Z]/g, "")) {
    const u = new SpeechSynthesisUtterance(ch);
    u.lang = "en-US";
    u.rate = 0.65;
    synth.speak(u);
  }
  const w = new SpeechSynthesisUtterance(word);
  w.lang = "en-US";
  w.rate = 0.8;
  if (opts.onend) w.onend = opts.onend;
  synth.speak(w);
}

export function stopSpeaking() {
  if (typeof window !== "undefined" && window.speechSynthesis) window.speechSynthesis.cancel();
}

/** Nomes faladas das letras (en) -> letra. Cobre as variações comuns do reconhecedor. */
const LETTER_NAMES: Record<string, string[]> = {
  a: ["a", "ay", "eh"],
  b: ["b", "be", "bee"],
  c: ["c", "see", "sea", "cee"],
  d: ["d", "de", "dee"],
  e: ["e", "ee"],
  f: ["f", "ef", "eff"],
  g: ["g", "gee", "jee"],
  h: ["h", "aitch", "haitch", "age", "hatch"],
  i: ["i", "eye", "ai"],
  j: ["j", "jay", "jey"],
  k: ["k", "kay", "key"],
  l: ["l", "el", "ell"],
  m: ["m", "em"],
  n: ["n", "en"],
  o: ["o", "oh", "ou", "owe"],
  p: ["p", "pe", "pee", "pea"],
  q: ["q", "cue", "queue", "kew", "kyu"],
  r: ["r", "ar", "are"],
  s: ["s", "es", "ess"],
  t: ["t", "te", "tee", "tea"],
  u: ["u", "you", "yu", "ewe"],
  v: ["v", "ve", "vee"],
  w: ["w", "double u", "double you", "dub"],
  x: ["x", "ex", "eks"],
  y: ["y", "why", "wai"],
  z: ["z", "zee", "zed"],
};

const TOKEN_TO_LETTER: Record<string, string> = {};
for (const [letter, names] of Object.entries(LETTER_NAMES)) {
  for (const n of names) TOKEN_TO_LETTER[n] = letter;
}

/** Converte um transcript falado em uma sequência de letras soletradas. */
export function lettersFromTranscript(transcript: string): string {
  const clean = transcript.toLowerCase().replace(/[^a-z ]/g, " ");
  // primeiro tenta "double u" (2 tokens) antes de separar
  const merged = clean.replace(/double\s+(u|you)/g, "w");
  const tokens = merged.split(/\s+/).filter(Boolean);
  let out = "";
  for (const tok of tokens) {
    if (tok.length === 1 && tok >= "a" && tok <= "z") out += tok;
    else if (TOKEN_TO_LETTER[tok]) out += TOKEN_TO_LETTER[tok];
    // tokens desconhecidos (ex.: a palavra inteira dita junto) são ignorados aqui;
    // a verificação final também compara o transcript "colado" como fallback.
  }
  return out;
}

/** Reconhecedor de fala (Web Speech API), ou null se indisponível. */
export function createRecognizer(): SpeechRecognition | null {
  if (typeof window === "undefined") return null;
  const Ctor =
    (window as unknown as { SpeechRecognition?: typeof SpeechRecognition }).SpeechRecognition ||
    (window as unknown as { webkitSpeechRecognition?: typeof SpeechRecognition }).webkitSpeechRecognition;
  if (!Ctor) return null;
  const rec = new Ctor();
  rec.lang = "en-US";
  rec.continuous = true;
  rec.interimResults = true;
  rec.maxAlternatives = 1;
  return rec;
}

export function speechSupported(): boolean {
  if (typeof window === "undefined") return false;
  return !!(
    (window as unknown as { SpeechRecognition?: unknown }).SpeechRecognition ||
    (window as unknown as { webkitSpeechRecognition?: unknown }).webkitSpeechRecognition
  );
}
