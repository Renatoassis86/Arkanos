/**
 * Motor de Voz e Reconhecimento Fonético de Alta Precisão para o Arkanos (Radix & Spelling Bee).
 * - TTS com seleção automática de vozes neurais / naturais de alta definição.
 * - Reconhecimento estrito de soletração: NUNCA decompõe palavras inteiras em letras.
 * - Suporta gatilho por pronúncia da palavra inteira antes de iniciar a captura das letras.
 */

// Cache de vozes disponíveis no navegador
let cachedVoices: SpeechSynthesisVoice[] = [];

function loadVoices(): SpeechSynthesisVoice[] {
  if (typeof window === "undefined" || !window.speechSynthesis) return [];
  if (cachedVoices.length > 0) return cachedVoices;
  cachedVoices = window.speechSynthesis.getVoices();
  return cachedVoices;
}

if (typeof window !== "undefined" && window.speechSynthesis) {
  window.speechSynthesis.onvoiceschanged = () => {
    cachedVoices = window.speechSynthesis.getVoices();
  };
  loadVoices();
}

/**
 * Seleciona a melhor voz natural/neural disponível no navegador para o idioma.
 */
function getBestVoice(lang: "pt-BR" | "en-US"): SpeechSynthesisVoice | null {
  const voices = loadVoices();
  if (!voices || voices.length === 0) return null;

  if (lang === "pt-BR") {
    const preferredPT = [
      "Microsoft Francisca Online (Natural)",
      "Microsoft Antonio Online (Natural)",
      "Microsoft Thalita Online (Natural)",
      "Google português do Brasil",
      "Luciana",
      "Felipe",
      "Daniel",
      "Heloisa",
      "Letícia",
      "Yara",
      "Maria",
      "pt-BR",
    ];

    for (const name of preferredPT) {
      const match = voices.find(
        (v) => (v.name.includes(name) || v.voiceURI.includes(name)) && v.lang.replace("_", "-").startsWith("pt")
      );
      if (match) return match;
    }
    return voices.find((v) => v.lang.replace("_", "-").startsWith("pt")) || null;
  } else {
    const preferredEN = [
      "Microsoft Jenny Online (Natural)",
      "Microsoft Guy Online (Natural)",
      "Microsoft Aria Online (Natural)",
      "Google US English",
      "Samantha",
      "Alex",
      "Victoria",
      "en-US",
    ];

    for (const name of preferredEN) {
      const match = voices.find(
        (v) => (v.name.includes(name) || v.voiceURI.includes(name)) && v.lang.replace("_", "-").startsWith("en")
      );
      if (match) return match;
    }
    return voices.find((v) => v.lang.replace("_", "-").startsWith("en")) || null;
  }
}

export interface SpeakOptions {
  lang?: "pt-BR" | "en-US";
  rate?: number;
  pitch?: number;
  onend?: () => void;
}

/** Fala um texto com entonação humana e ritmo cadenciado. */
export function speak(text: string, opts: SpeakOptions = {}) {
  if (typeof window === "undefined" || !window.speechSynthesis) {
    opts.onend?.();
    return;
  }
  const synth = window.speechSynthesis;
  synth.cancel();

  const cleanText = text.trim();
  if (!cleanText) {
    opts.onend?.();
    return;
  }

  const u = new SpeechSynthesisUtterance(cleanText);
  const lang = opts.lang ?? "pt-BR";
  u.lang = lang;

  const bestVoice = getBestVoice(lang);
  if (bestVoice) {
    u.voice = bestVoice;
  }

  u.rate = opts.rate ?? (lang === "pt-BR" ? 0.92 : 0.88);
  u.pitch = opts.pitch ?? 1.0;
  u.volume = 1.0;

  if (opts.onend) {
    u.onend = opts.onend;
    u.onerror = () => opts.onend?.();
  }

  synth.speak(u);
}

/** Soletra a palavra com pausas melódicas e depois pronuncia a palavra completa. */
export function spellOutWord(word: string, opts: SpeakOptions = {}) {
  if (typeof window === "undefined" || !window.speechSynthesis) {
    opts.onend?.();
    return;
  }
  const synth = window.speechSynthesis;
  synth.cancel();
  const lang = opts.lang ?? "pt-BR";
  const voice = getBestVoice(lang);

  const letters = word
    .toUpperCase()
    .replace(/[^A-ZÁÉÍÓÚÂÊÔÃÕÇ]/g, "")
    .split("");

  letters.forEach((ch) => {
    const u = new SpeechSynthesisUtterance(ch);
    u.lang = lang;
    if (voice) u.voice = voice;
    u.rate = 0.78;
    u.pitch = 1.02;
    synth.speak(u);
  });

  const w = new SpeechSynthesisUtterance(word);
  w.lang = lang;
  if (voice) w.voice = voice;
  w.rate = 0.88;
  w.pitch = 1.0;
  if (opts.onend) {
    w.onend = opts.onend;
    w.onerror = () => opts.onend?.();
  }
  synth.speak(w);
}

export function stopSpeaking() {
  if (typeof window !== "undefined" && window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
}

/** Tabela fonética completa cobrindo todas as pronúncias das letras em PT e EN. */
const LETTER_NAMES: Record<string, string[]> = {
  a: ["a", "ay", "eh", "ah", "á", "à", "ã", "â"],
  b: ["b", "be", "bee", "bê", "be."],
  c: ["c", "see", "sea", "cee", "cê", "ce"],
  d: ["d", "de", "dee", "dê", "di"],
  e: ["e", "ee", "eh", "é", "ê"],
  f: ["f", "ef", "eff", "efe", "efi"],
  g: ["g", "gee", "jee", "gê", "ge", "guê"],
  h: ["h", "aitch", "haitch", "age", "hatch", "agá", "aga", "hagá", "haga", "rá", "raga"],
  i: ["i", "eye", "ai", "í", "ih"],
  j: ["j", "jay", "jey", "jota", "jóta"],
  k: ["k", "kay", "key", "cá", "ka", "ca"],
  l: ["l", "el", "ell", "ele", "eli"],
  m: ["m", "em", "eme", "emi"],
  n: ["n", "en", "ene", "eni"],
  o: ["o", "oh", "ou", "owe", "ó", "ô"],
  p: ["p", "pe", "pee", "pea", "pê"],
  q: ["q", "cue", "queue", "kew", "kyu", "quê", "que", "ke"],
  r: ["r", "ar", "are", "erre", "erri", "er"],
  s: ["s", "es", "ess", "esse", "essi", "esi"],
  t: ["t", "te", "tee", "tea", "tê", "ti"],
  u: ["u", "you", "yu", "ewe", "ú", "uh"],
  v: ["v", "ve", "vee", "vê", "vi"],
  w: ["w", "double u", "double you", "dub", "dáblio", "dabliu", "dábliu", "dablio", "duplo v", "duplo vê"],
  x: ["x", "ex", "eks", "xis", "xiz", "chiz"],
  y: ["y", "why", "wai", "ípsilon", "ipsilon", "ipisilon", "ipslon"],
  z: ["z", "zee", "zed", "zê", "zi"],
  ç: ["ç", "cedilha", "cê-cedilha", "ce cedilha", "cê cedilha"],
};

const TOKEN_TO_LETTER: Record<string, string> = {};
for (const [letter, names] of Object.entries(LETTER_NAMES)) {
  for (const n of names) {
    TOKEN_TO_LETTER[n.toLowerCase().trim()] = letter;
  }
}

function normWord(s: string) {
  return s
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z]/g, "");
}

/**
 * Detecta se a palavra-gatilho foi dita e retorna o texto posterior a ela.
 */
export function detectTriggerWord(
  transcript: string,
  targetWord: string
): { triggered: boolean; spokenAfter: string } {
  if (!transcript || !targetWord) return { triggered: false, spokenAfter: "" };

  const normTarget = normWord(targetWord);
  if (!normTarget) return { triggered: false, spokenAfter: "" };

  const clean = transcript.toLowerCase().trim();
  const words = clean.split(/\s+/);

  for (let i = 0; i < words.length; i++) {
    const wNorm = normWord(words[i]);
    if (wNorm === normTarget) {
      // Palavra encontrada! Pega todo o texto falado APÓS a palavra
      const spokenAfter = words.slice(i + 1).join(" ");
      return { triggered: true, spokenAfter };
    }
  }

  return { triggered: false, spokenAfter: "" };
}

/**
 * Converte transcrição de fala em tempo real em sequência de letras soletradas.
 * REGRA ESTRITA: NUNCA quebra palavras completas em letras. Apenas aceita
 * letras soltas ("a", "b", "c") ou nomes fonéticos de letras ("pê", "agá", "erre", "cedilha", etc.).
 */
export function lettersFromTranscript(transcript: string): string {
  if (!transcript) return "";

  let clean = transcript.toLowerCase().trim();

  // Substitui expressões fonéticas compostas conhecidas por tokens únicos
  clean = clean
    .replace(/double\s+(u|you)/g, " w ")
    .replace(/duplo\s+(v|vê)/g, " w ")
    .replace(/c[êe][\s\-]cedilha/g, " ç ")
    .replace(/[^a-z0-9áéíóúâêôãõç\s]/g, " ");

  const tokens = clean.split(/\s+/).filter(Boolean);
  let out = "";

  for (const tok of tokens) {
    if (tok.length === 1 && /[a-zç]/i.test(tok)) {
      out += tok;
    } else if (TOKEN_TO_LETTER[tok]) {
      out += TOKEN_TO_LETTER[tok];
    }
    // NOTA: Palavras com 2 ou mais letras que não estão no dicionário fonético são IGNORADAS!
  }

  return out;
}

/**
 * Reconhecedor de fala contínuo e sem lag.
 */
export function createRecognizer(lang: "en-US" | "pt-BR" = "en-US"): SpeechRecognition | null {
  if (typeof window === "undefined") return null;
  const Ctor =
    (window as unknown as { SpeechRecognition?: typeof SpeechRecognition }).SpeechRecognition ||
    (window as unknown as { webkitSpeechRecognition?: typeof SpeechRecognition }).webkitSpeechRecognition;
  if (!Ctor) return null;

  const rec = new Ctor();
  rec.lang = lang;
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
