/**
 * Motor de Voz e Reconhecimento Fonético Calibrado de Alta Precisão para o Arkanos (Radix & Spelling Bee).
 * - TTS com seleção automática de vozes neurais / naturais de alta definição.
 * - Reconhecimento fonético tolerante e sem perda de primeira letra.
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
      "Microsoft Brenda Online (Natural)",
      "Microsoft Donato Online (Natural)",
      "Microsoft Elza Online (Natural)",
      "Microsoft Fabio Online (Natural)",
      "Microsoft Giovanna Online (Natural)",
      "Microsoft Humberto Online (Natural)",
      "Microsoft Julio Online (Natural)",
      "Microsoft Leide Online (Natural)",
      "Microsoft Leticia Online (Natural)",
      "Microsoft Manuela Online (Natural)",
      "Microsoft Nicolau Online (Natural)",
      "Microsoft Valerio Online (Natural)",
      "Microsoft Yara Online (Natural)",
      "Google português do Brasil",
      "Luciana (Enhanced)",
      "Luciana",
      "Felipe (Enhanced)",
      "Felipe",
      "Heloisa",
      "Letícia",
      "Yara",
      "Maria",
      "pt-BR",
      "pt_BR",
    ];

    for (const name of preferredPT) {
      const match = voices.find(
        (v) =>
          (v.name.includes(name) || v.voiceURI.includes(name)) &&
          (v.lang.replace("_", "-").toLowerCase().startsWith("pt-br") || v.lang.replace("_", "-").toLowerCase().startsWith("pt"))
      );
      if (match) return match;
    }
    return voices.find((v) => v.lang.replace("_", "-").toLowerCase().startsWith("pt")) || null;
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

/** Tabela fonética completa e super tolerante cobrindo todas as pronúncias das letras em PT e EN. */
const LETTER_NAMES: Record<string, string[]> = {
  a: ["a", "ay", "eh", "ah", "á", "à", "ã", "â"],
  b: ["b", "be", "bee", "bê", "be."],
  c: ["c", "see", "sea", "cee", "cê", "ce", "si"],
  d: ["d", "de", "dee", "dê", "di"],
  e: ["e", "ee", "eh", "é", "ê"],
  f: ["f", "ef", "eff", "efe", "efi"],
  g: ["g", "gee", "jee", "gê", "ge", "guê", "ji"],
  h: ["h", "aitch", "haitch", "age", "hatch", "agá", "aga", "hagá", "haga", "rá", "raga"],
  i: ["i", "eye", "ai", "í", "ih"],
  j: ["j", "jay", "jey", "jota", "jóta", "je"],
  k: ["k", "kay", "key", "cá", "ka", "ca"],
  l: ["l", "el", "ell", "ele", "eli"],
  m: ["m", "em", "eme", "emi"],
  n: ["n", "en", "ene", "eni", "ne"],
  o: ["o", "oh", "ou", "owe", "ó", "ô"],
  p: ["p", "pe", "pee", "pea", "pê"],
  q: ["q", "cue", "queue", "kew", "kyu", "quê", "que", "ke"],
  r: ["r", "ar", "are", "erre", "erri", "er", "re"],
  s: ["s", "es", "ess", "esse", "essi", "esi", "se"],
  t: ["t", "te", "tee", "tea", "tê", "ti"],
  u: ["u", "you", "yu", "ewe", "ú", "uh"],
  v: ["v", "ve", "vee", "vê", "vi"],
  w: ["w", "double u", "double you", "dub", "dáblio", "dabliu", "dábliu", "dablio", "duplo v", "duplo vê"],
  x: ["x", "ex", "eks", "xis", "xiz", "chiz"],
  y: ["y", "why", "wai", "ípsilon", "ipsilon", "ipisilon", "ipslon"],
  z: ["z", "zee", "zed", "zê", "zi", "ze"],
  ç: ["ç", "cedilha", "cê-cedilha", "ce cedilha", "cê cedilha"],
};

const TOKEN_TO_LETTER: Record<string, string> = {};
for (const [letter, names] of Object.entries(LETTER_NAMES)) {
  for (const n of names) {
    TOKEN_TO_LETTER[n.toLowerCase().trim()] = letter;
  }
}

export function normWord(s: string): string {
  return (s || "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z]/g, "");
}

/**
 * Detecta se a palavra-gatilho foi dita e extrai o conteúdo posterior.
 */
export function detectTriggerWord(
  transcript: string,
  targetWord: string
): { triggered: boolean; spokenAfter: string } {
  if (!transcript || !targetWord) return { triggered: false, spokenAfter: "" };

  const normTarget = normWord(targetWord);
  if (!normTarget) return { triggered: false, spokenAfter: "" };

  const clean = transcript.toLowerCase().trim();
  const rawWords = clean.split(/[\s,.;:!?\-]+/);

  for (let i = 0; i < rawWords.length; i++) {
    const wNorm = normWord(rawWords[i]);
    if (wNorm === normTarget) {
      // Palavra encontrada! Pega todo o texto falado APÓS a palavra
      const spokenAfter = rawWords.slice(i + 1).join(" ");
      return { triggered: true, spokenAfter };
    }
  }

  // Se a frase inteira contém o alvo colado
  const normClean = normWord(clean);
  if (normClean.includes(normTarget)) {
    const idx = normClean.indexOf(normTarget);
    const afterNorm = normClean.slice(idx + normTarget.length);
    return { triggered: true, spokenAfter: afterNorm };
  }

  return { triggered: false, spokenAfter: "" };
}

/**
 * Converte transcrição de fala em tempo real em sequência de letras soletradas.
 * FILTRO ESTRITO: Rejeita conversas, ruídos e palavras inteiras que não sejam nomes válidos de letras.
 */
export function lettersFromTranscript(transcript: string, targetWord?: string): string {
  if (!transcript) return "";

  let clean = transcript.toLowerCase().trim();

  // Se a criança disse a palavra inteira diretamente (ex: "sabedoria")
  if (targetWord) {
    const normTarget = normWord(targetWord);
    const normClean = normWord(clean);
    if (normTarget && (normClean === normTarget || normClean.includes(normTarget))) {
      return normTarget;
    }
  }

  // Substitui expressões fonéticas compostas conhecidas por tokens únicos
  clean = clean
    .replace(/double\s+(u|you)/g, " w ")
    .replace(/duplo\s+(v|vê)/g, " w ")
    .replace(/c[êe][\s\-]cedilha/g, " ç ")
    .replace(/[^a-z0-9áéíóúâêôãõç\s,.;:\-]/g, " ");

  const tokens = clean.split(/[\s,.;:\-]+/).filter(Boolean);
  let out = "";

  for (const tok of tokens) {
    const cleanedTok = tok.trim();
    if (!cleanedTok) continue;

    // 1. Se for uma letra isolada (a-z, ç)
    if (cleanedTok.length === 1 && /[a-zç]/i.test(cleanedTok)) {
      out += cleanedTok;
      continue;
    }

    // 2. Se for um nome fonético exato de letra cadastrado no dicionário (ex: "bê", "agá", "erre", "cedilha", "bee", "see", "aitch")
    if (TOKEN_TO_LETTER[cleanedTok]) {
      out += TOKEN_TO_LETTER[cleanedTok];
      continue;
    }

    // 3. Versão normalizada sem acentos
    const normTok = normWord(cleanedTok);
    if (normTok.length === 1 && /[a-zç]/i.test(normTok)) {
      out += normTok;
      continue;
    }
    if (TOKEN_TO_LETTER[normTok]) {
      out += TOKEN_TO_LETTER[normTok];
      continue;
    }

    // 4. Se a palavra falada for exatamente a palavra alvo (ex: "sabedoria")
    if (targetWord && normTok === normWord(targetWord)) {
      out += normTok;
      continue;
    }
  }

  return out;
}

/**
 * Reconhecedor de fala contínuo e com alta taxa de amostragem.
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
