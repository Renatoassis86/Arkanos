"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import type { SpellingWord } from "@/db/queries/spelling";
import { awardSpellingArks, type ArksResult } from "@/app/spelling-bee/actions";
import { calculateSpellingScore, type SpellingItemResult } from "@/lib/spelling-score";
import { SpellingTutorialModal, shouldShowTutorial } from "@/components/spelling-tutorial-modal";
import { playCorrect, playWrong, playFinish } from "@/lib/feedback";
import { PremiacaoOverlay, type RevealItem } from "@/components/premiacao-overlay";
import { GuardianAvatar } from "@/components/guardian-avatar";
import { sessionScore, type ItemResult, type TriScore } from "@/lib/tri";
import { GameTopBar } from "@/components/game-topbar";
import {
  speak,
  spellOutWord,
  stopSpeaking,
  lettersFromTranscript,
  detectTriggerWord,
  createRecognizer,
  speechSupported,
} from "@/lib/spell-speech";
import type { Rarity } from "@/lib/collection";
import {
  SpeakerIcon,
  BookIcon,
  FileTextIcon,
  MicIcon,
  SquareIcon,
  RotateCwIcon,
  GamepadIcon,
  TrophyIcon,
  StarIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@/components/game-icons";

const SPELLING_GUARDIAN = "lyra"; // Lyra · Grammar guides the Spelling Bee.

const ARKS_BY_DIFFICULTY: Record<string, number> = {
  facil: 10,
  easy: 10,
  medio: 20,
  medium: 20,
  dificil: 40,
  hard: 40,
};

function norm(s: string) {
  return s
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z]/g, "");
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Ordena o baralho por nível: FÁCIL -> MÉDIO -> DIFÍCIL, com ordem aleatória em cada nível */
function shuffleByDifficulty(arr: SpellingWord[]): SpellingWord[] {
  const easy = arr.filter((w) => w.dificuldade === "facil" || w.dificuldade === "easy");
  const medium = arr.filter((w) => w.dificuldade === "medio" || w.dificuldade === "medium");
  const hard = arr.filter((w) => w.dificuldade === "dificil" || w.dificuldade === "hard");
  const others = arr.filter(
    (w) => !["facil", "easy", "medio", "medium", "dificil", "hard"].includes(w.dificuldade)
  );

  return [
    ...shuffle(easy),
    ...shuffle(medium),
    ...shuffle(hard),
    ...shuffle(others),
  ];
}

const helpBtn =
  "flex items-center justify-center gap-2 rounded-2xl border-2 border-pink-200 bg-pink-50/50 px-4 py-3.5 text-sm font-bold text-pink-600 transition hover:border-pink-300 hover:bg-pink-100/60 active:scale-95 shadow-sm";

const SERIES_OPTIONS = [
  { key: "2ano", label: "2º Ano" },
  { key: "3ano", label: "3º Ano" },
  { key: "4ano", label: "4º Ano" },
  { key: "5ano", label: "5º Ano" },
  { key: "todos", label: "Todas" },
];

type Phase = "intro" | "listen" | "spelling" | "reveal";

export function SpellingBeeGame({
  words,
  authed,
  gameTitle = "Spelling Bee",
  idioma = "en-US",
}: {
  words: SpellingWord[];
  authed: boolean;
  gameTitle?: string;
  idioma?: "en-US" | "pt-BR";
}) {
  const router = useRouter();
  const [selectedSerie, setSelectedSerie] = useState("2ano");

  // Filtra todas as palavras da série selecionada
  function getPool(serie = selectedSerie) {
    if (serie === "todos") return words;
    const sub = words.filter(
      (w) =>
        w.serie_slug === serie ||
        w.serie === serie ||
        (serie === "2ano" && (w.serie?.includes("2") || w.serie_slug === "2ano")) ||
        (serie === "3ano" && (w.serie?.includes("3") || w.serie_slug === "3ano")) ||
        (serie === "4ano" && (w.serie?.includes("4") || w.serie_slug === "4ano")) ||
        (serie === "5ano" && (w.serie?.includes("5") || w.serie_slug === "5ano"))
    );
    return sub.length > 0 ? sub : words;
  }

  const [deck, setDeck] = useState(() => shuffleByDifficulty(getPool("2ano")));
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("intro");

  // Atualiza o baralho quando muda de série
  function restartDeck(serie = selectedSerie) {
    setSelectedSerie(serie);
    const available = getPool(serie);
    const newDeck = shuffleByDifficulty(available);
    setDeck(newDeck);
    setIndex(0);
    setPhase("intro");
    setSpelled("");
    setTyped("");
    setResults([]);
    setCorrectCount(0);
    setXp(0);
    setHighestTier("Fácil");
    setFinished(false);
  }

  function retryWithNewOrder() {
    const available = getPool(selectedSerie);
    const newDeck = shuffleByDifficulty(available);
    setDeck(newDeck);
    setIndex(0);
    setPhase("listen");
    setSpelled("");
    setTyped("");
    setResults([]);
    setCorrectCount(0);
    setXp(0);
    setHighestTier("Fácil");
    setFinished(false);
    if (newDeck[0]) {
      setTimeout(() => sayWord(newDeck[0], true), 350);
    }
  }

  function handleStartRound() {
    if (shouldShowTutorial()) {
      setShowTutorial(true);
    } else {
      retryWithNewOrder();
    }
  }

  const [showTutorial, setShowTutorial] = useState(false);
  const [results, setResults] = useState<SpellingItemResult[]>([]);
  const [highestTier, setHighestTier] = useState<string>("Fácil");
  const [spelled, setSpelled] = useState("");
  const [listening, setListening] = useState(false);
  const [micError, setMicError] = useState<string | null>(null);
  const [typed, setTyped] = useState("");
  const [lastCorrect, setLastCorrect] = useState(false);

  const [correctCount, setCorrectCount] = useState(0);
  const [xp, setXp] = useState(0);
  const [bronze, setBronze] = useState(0);
  const [prata, setPrata] = useState(0);
  const [ouro, setOuro] = useState(0);
  const [items, setItems] = useState<ItemResult[]>([]);

  const [finished, setFinished] = useState(false);
  const [missedWord, setMissedWord] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [persisted, setPersisted] = useState<ArksResult | null>(null);
  const [reveals, setReveals] = useState<RevealItem[]>([]);
  const [tri, setTri] = useState<TriScore | null>(null);
  const [canContinue, setCanContinue] = useState(false);

  const recRef = useRef<SpeechRecognition | null>(null);
  const finalRef = useRef("");
  const supported = speechSupported();

  const q = deck[index] || deck[0];
  const total = deck.length;

  function stopMic() {
    try {
      recRef.current?.stop();
    } catch {
      /* noop */
    }
    recRef.current = null;
    setListening(false);
  }

  useEffect(() => {
    return () => {
      stopMic();
      stopSpeaking();
    };
  }, []);

  if (!q && !finished) {
    return <p className="text-center text-slate-400">Loading words…</p>;
  }

  function sayWord(target = q, isIntro = false) {
    if (!target) return;
    if (isIntro) {
      speak(`How do you spell: ${target.palavra}?`, { lang: "en-US", rate: 0.88 });
    } else {
      speak(target.palavra, { lang: "en-US", rate: 0.85 });
    }
  }

  function repeatWord() {
    if (q) speak(q.palavra, { lang: "en-US", rate: 0.85 });
  }

  function sayMeaning() {
    if (q) speak(`Meaning: ${q.significado}`, { lang: "en-US" });
  }

  function saySentence() {
    if (q?.exemplo) speak(q.exemplo, { lang: "en-US" });
  }

  const [wordTriggered, setWordTriggered] = useState(false);
  const triggeredRef = useRef(false);

  function startSpelling() {
    setMicError(null);
    setSpelled("");
    setWordTriggered(false);
    triggeredRef.current = false;
    finalRef.current = "";
    setPhase("spelling");
    if (!supported) return;

    const rec = createRecognizer("en-US");
    if (!rec) {
      setMicError("Speech recognition not supported in this browser.");
      return;
    }
    recRef.current = rec;

    rec.onresult = (e: SpeechRecognitionEvent) => {
      let fullTranscript = "";
      for (let i = 0; i < e.results.length; i++) {
        fullTranscript += " " + e.results[i][0].transcript;
      }
      const clean = fullTranscript.trim();
      finalRef.current = clean;
      const targetWord = q ? q.palavra : "";

      if (!triggeredRef.current) {
        const { triggered, spokenAfter } = detectTriggerWord(clean, targetWord);
        if (triggered) {
          triggeredRef.current = true;
          setWordTriggered(true);
          const letters = lettersFromTranscript(spokenAfter);
          if (letters) {
            setSpelled(letters);
            const targetLen = q ? norm(q.palavra).length : 0;
            if (targetLen > 0 && letters.length >= targetLen) {
              setTimeout(() => check(letters), 400);
            }
          }
        }
      } else {
        const { spokenAfter } = detectTriggerWord(clean, targetWord);
        const letters = lettersFromTranscript(spokenAfter || clean);
        if (letters) {
          setSpelled(letters);
          const targetLen = q ? norm(q.palavra).length : 0;
          if (targetLen > 0 && letters.length >= targetLen) {
            setTimeout(() => check(letters), 400);
          }
        }
      }
    };

    rec.onerror = (e: SpeechRecognitionErrorEvent) => {
      if (e.error !== "no-speech") {
        setMicError(
          e.error === "not-allowed"
            ? "Microphone access blocked. Click on the letters below instead."
            : "Could not hear clearly. Try again or click on the letters."
        );
      }
      setListening(false);
    };

    rec.onend = () => setListening(false);
    try {
      rec.start();
      setListening(true);
    } catch {
      /* noop */
    }
  }

  function check(value?: string) {
    if (phase !== "spelling" || !q) return;
    const attempt = value ?? (spelled || typed);
    if (!attempt.trim()) return;
    stopMic();
    const target = norm(q.palavra);
    const ok =
      norm(attempt) === target ||
      norm(finalRef.current.replace(/\s+/g, "")) === target;

    const newResults = [...results, { difficulty: q.dificuldade, correct: ok }];
    setResults(newResults);
    const summary = calculateSpellingScore(newResults);
    setCorrectCount(summary.streak);
    setXp(summary.totalPoints);
    setHighestTier(summary.highestTier);
    setLastCorrect(ok);

    if (ok) {
      setPhase("reveal");
      playCorrect();
      speak("Correct! Well done.", {
        lang: "en-US",
        onend: () => spellOutWord(q.palavra, { lang: "en-US" }),
      });
    } else {
      setPhase("reveal");
      playWrong();
      // Eliminação imediata com voz explicando e soletrando a grafia correta
      speak(`The correct spelling is ${q.palavra}.`, {
        lang: "en-US",
        onend: () => {
          spellOutWord(q.palavra, {
            lang: "en-US",
            onend: () => {
              if (q.significado) speak(`Meaning: ${q.significado}`, { lang: "en-US" });
            },
          });
        },
      });
      void finishGame(true, newResults);
    }
  }

  function nextWord() {
    if (!lastCorrect) return;
    if (index + 1 >= total) {
      void finishGame(false);
      return;
    }
    const nextIdx = index + 1;
    setIndex(nextIdx);
    setSpelled("");
    setTyped("");
    setPhase("listen");
    const nextQ = deck[nextIdx];
    if (nextQ) {
      setTimeout(() => sayWord(nextQ, true), 350);
    }
  }

  async function finishGame(eliminated: boolean, finalResults?: SpellingItemResult[]) {
    stopMic();
    setFinished(true);
    if (eliminated && q) setMissedWord(q.palavra);
    playFinish();
    setTimeout(() => setCanContinue(true), 3500);

    const rList = finalResults ?? results;
    const summary = calculateSpellingScore(rList);
    setCorrectCount(summary.streak);
    setXp(summary.totalPoints);
    setHighestTier(summary.highestTier);

    if (!authed) return;
    setSaving(true);
    const diamante = !eliminated && total > 0 && summary.streak === total ? 1 : 0;
    const res = await awardSpellingArks({
      bronze: summary.easyCorrect,
      prata: summary.mediumCorrect,
      ouro: summary.hardCorrect,
      diamante,
      correct: summary.streak,
      total,
      points: summary.totalPoints,
    });
    setSaving(false);
    setPersisted(res);
    if (res.persisted) {
      const queue: RevealItem[] = [];
      if (res.leveledUp) queue.push({ kind: "level", level: res.level });
      for (const g of res.granted) {
        if (g.kind === "orb")
          queue.push({ kind: "orb", key: g.key, rarity: (g.rarity ?? "terrestre") as Rarity });
        else queue.push({ kind: "medal", key: g.key });
      }
      if (queue.length > 0) setReveals(queue);
    }
  }

  function restart() {
    stopMic();
    stopSpeaking();
    const subset = words.filter(
      (w) => selectedSerie === "todos" || !w.serie || w.serie.includes(selectedSerie)
    );
    const available = subset.length > 0 ? subset : words;
    setDeck(shuffle(available));
    setIndex(0);
    setPhase("intro");
    setSpelled("");
    setTyped("");
    setListening(false);
    setMicError(null);
    setLastCorrect(false);
    setCorrectCount(0);
    setXp(0);
    setBronze(0);
    setPrata(0);
    setOuro(0);
    setItems([]);
    setFinished(false);
    setMissedWord(null);
    setSaving(false);
    setPersisted(null);
    setReveals([]);
    setTri(null);
    setCanContinue(false);
  }

  function WordTiles({ word, dim }: { word: string; dim?: boolean }) {
    return (
      <div className="flex flex-wrap justify-center gap-1.5">
        {word.split("").map((ch, i) => (
          <span
            key={i}
            className={`flex h-12 w-10 items-center justify-center rounded-xl border-2 font-black uppercase text-xl shadow-sm ${
              dim
                ? "border-slate-300 bg-slate-100 text-slate-400"
                : "border-pink-500 bg-pink-50 text-pink-700"
            }`}
          >
            {ch}
          </span>
        ))}
      </div>
    );
  }

  // =========================================================================
  // TELA: FINISHED (ELIMINAÇÃO / CONCLUSÃO) - SEM EMOJIS
  // =========================================================================
  if (finished) {
    return (
      <div className="mx-auto max-w-xl">
        <GameTopBar inProgress={false} />
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-6 overflow-hidden rounded-3xl border-2 border-slate-200 bg-white p-6 text-center shadow-xl sm:p-8"
        >
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-black uppercase tracking-wider ${
              missedWord ? "bg-rose-100 text-rose-700" : "bg-emerald-100 text-emerald-800"
            }`}
          >
            {missedWord ? (
              <>
                <XCircleIcon className="h-4 w-4" /> Soletração Incorreta · Fim do Turno
              </>
            ) : (
              <>
                <CheckCircleIcon className="h-4 w-4" /> Rodada Concluída com Sucesso!
              </>
            )}
          </span>
          <h2 className="font-display mt-3 text-2xl font-black text-slate-900 sm:text-3xl">
            {missedWord ? "Vamos Aprender a Palavra" : "Excelente Desempenho!"}
          </h2>

          {/* PALAVRA CORRETA EM DESTAQUE */}
          {q && (
            <div className="mt-5 rounded-2xl border-2 border-pink-300 bg-pink-50/60 p-4 text-center">
              <span className="text-xs font-black uppercase tracking-wider text-pink-700">
                Grafia Correta em Inglês:
              </span>
              <div className="mt-3 flex flex-wrap justify-center gap-1.5">
                {q.palavra.toUpperCase().split("").map((ch, i) => (
                  <span
                    key={i}
                    className="flex h-12 w-10 sm:h-13 sm:w-11 items-center justify-center rounded-xl border-2 border-pink-500 bg-white text-2xl font-black uppercase text-pink-700 shadow-sm"
                  >
                    {ch}
                  </span>
                ))}
              </div>

              {missedWord && (
                <div className="mt-4 space-y-2 rounded-xl border border-slate-200 bg-white p-3 text-left text-xs sm:text-sm">
                  <div className="flex items-start gap-2">
                    <BookIcon className="mt-0.5 h-4 w-4 text-slate-500 shrink-0" />
                    <div>
                      <strong className="text-slate-800">Significado:</strong> {q.significado}
                    </div>
                  </div>
                  {q.exemplo && (
                    <div className="flex items-start gap-2 pt-1 border-t border-slate-100">
                      <FileTextIcon className="mt-0.5 h-4 w-4 text-slate-500 shrink-0" />
                      <div className="italic text-slate-600">
                        <strong className="text-slate-800 not-italic">Exemplo:</strong> "{q.exemplo}"
                      </div>
                    </div>
                  )}
                </div>
              )}

              <button
                type="button"
                onClick={() => {
                  speak(`The correct spelling is ${q.palavra}.`, {
                    lang: "en-US",
                    onend: () => spellOutWord(q.palavra, { lang: "en-US" }),
                  });
                }}
                className="mt-3 w-full rounded-xl border border-pink-300 bg-white py-2.5 text-xs font-bold text-pink-700 hover:bg-pink-50 transition flex items-center justify-center gap-2"
              >
                <SpeakerIcon className="h-4 w-4" /> Ouvir Soletração Novamente
              </button>
            </div>
          )}

          {/* RESULTADO DA SESSÃO E RANKING GERAL */}
          <div className="mt-6 rounded-2xl border-2 border-amber-200 bg-gradient-to-br from-amber-50/80 to-yellow-50/40 p-4 text-center">
            <div className="grid grid-cols-2 gap-2 border-b border-amber-200/60 pb-3">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800">
                  Palavras Corretas
                </span>
                <p className="font-display text-2xl font-black text-slate-900">
                  {correctCount} <span className="text-xs text-slate-500 font-normal">palavras</span>
                </p>
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800">
                  Pontos Desta Corrida
                </span>
                <p className="font-display text-2xl font-black text-amber-600">
                  +{xp} pts
                </p>
                {persisted?.persisted && persisted.newHighScore && (
                  <span className="inline-block mt-0.5 rounded bg-amber-200 px-2 py-0.5 text-[10px] font-black uppercase text-amber-900">
                    Novo Recorde!
                  </span>
                )}
              </div>
            </div>

            {/* POSIÇÃO NO RANKING */}
            <div className="pt-3">
              <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-slate-600">
                <TrophyIcon className="h-4 w-4 text-amber-600" /> Ranking Geral dos Sábios (Melhor Corrida)
              </span>
              {persisted?.persisted ? (
                <p className="mt-1 text-sm font-bold text-slate-800">
                  Sua Posição: <strong className="text-amber-600">#{persisted.rankPos}</strong> de {persisted.rankTotal} alunos
                  <span className="block text-xs font-normal text-slate-500 mt-0.5">
                    Seu Recorde Pessoal: <strong className="text-slate-700">{persisted.currentHighScore ?? xp} pts</strong>
                  </span>
                </p>
              ) : (
                <p className="mt-1 text-xs text-slate-600">
                  {authed
                    ? "Pontuação e recorde registrados com sucesso!"
                    : "Faça login para salvar seus pontos no ranking geral!"}
                </p>
              )}
            </div>
          </div>

          {/* BOTÕES DE AÇÃO */}
          <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
            <button
              type="button"
              onClick={retryWithNewOrder}
              className="flex-1 rounded-2xl bg-gradient-to-br from-[#ec4899] to-[#db2777] py-3.5 text-sm font-black uppercase tracking-wider text-white shadow-md hover:bg-pink-700 transition active:scale-95 flex items-center justify-center gap-2"
            >
              <RotateCwIcon className="h-4 w-4" /> Começar de Novo
            </button>
            <Link
              href="/jogos"
              className="flex-1 rounded-2xl border-2 border-slate-200 bg-white py-3.5 text-sm font-bold text-slate-700 hover:bg-slate-50 transition flex items-center justify-center gap-2"
            >
              <GamepadIcon className="h-4 w-4" /> Trocar de Jogo
            </Link>
          </div>
        </motion.div>

        {reveals.length > 0 && (
          <PremiacaoOverlay
            items={reveals}
            guardian={SPELLING_GUARDIAN}
            onClose={() => setReveals([])}
          />
        )}
      </div>
    );
  }

  // =========================================================================
  // TELA: INTRO
  // =========================================================================
  if (phase === "intro") {
    return (
      <div className="mx-auto max-w-xl">
        <GameTopBar inProgress={false} />
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl border-2 border-pink-200 bg-white p-6 sm:p-8 text-center shadow-lg"
        >
          <GuardianAvatar name={SPELLING_GUARDIAN} size={72} ring="#ec4899" className="mx-auto" />
          <h1 className="font-display mt-4 text-3xl font-black text-slate-900">Spelling Bee</h1>
          <p className="mt-2 text-slate-600 text-sm">
            Ouça a palavra em inglês. Peça o <strong>significado</strong>, ouça na{" "}
            <strong>frase</strong> ou peça para <strong>repetir</strong>. Depois, soletre por voz
            ou clicando nas letras!
          </p>

          {/* SELETOR DE SÉRIE */}
          <div className="mt-6 text-left">
            <label className="mb-2 block text-xs font-black uppercase tracking-wider text-slate-500 text-center">
              Selecione a Série Escolar:
            </label>
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
              {SERIES_OPTIONS.map((opt) => (
                <button
                  key={opt.key}
                  type="button"
                  onClick={() => restartDeck(opt.key)}
                  className={`rounded-2xl border-2 py-2.5 px-2 text-xs font-black transition ${
                    selectedSerie === opt.key
                      ? "border-pink-500 bg-pink-50 text-pink-700 shadow-sm"
                      : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleStartRound}
            className="mt-7 w-full rounded-2xl bg-gradient-to-br from-[#ec4899] to-[#db2777] px-8 py-4 text-base font-black uppercase tracking-wider text-white shadow-lg shadow-pink-500/25 transition hover:-translate-y-0.5 active:scale-95"
          >
            Iniciar Rodada ({total} Palavras)
          </button>

          <button
            type="button"
            onClick={() => setShowTutorial(true)}
            className="mt-3 w-full text-center text-xs font-bold text-pink-600 hover:underline"
          >
            How to Play & Voice Calibration (Tutorial) →
          </button>
        </motion.div>

        <SpellingTutorialModal
          isOpen={showTutorial}
          onClose={() => {
            setShowTutorial(false);
            retryWithNewOrder();
          }}
          lang="en-US"
          gameTitle="Spelling Bee"
        />
      </div>
    );
  }

  const wordLen = q.palavra.replace(/[^a-zA-Z]/g, "").length;

  // =========================================================================
  // TELA: JOGO ATIVO (LISTEN / SPELLING / REVEAL)
  // =========================================================================
  return (
    <div className="mx-auto max-w-2xl">
      <GameTopBar inProgress />
      {/* HUD DINÂMICO */}
      <div className="sticky top-0 z-20 -mx-6 mb-6 border-b border-slate-200 bg-white/95 px-6 py-3.5 backdrop-blur sm:mx-0 sm:rounded-2xl sm:border sm:px-5 sm:shadow-sm">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-pink-100 px-2 py-0.5 text-xs font-black text-pink-700 uppercase">
              {SERIES_OPTIONS.find((s) => s.key === selectedSerie)?.label || "Geral"}
            </span>
            <span className="font-bold text-slate-600">
              Palavra <strong className="text-slate-900">{index + 1}</strong> de{" "}
              <strong className="text-slate-900">{total}</strong>
            </span>
          </div>
          <span className="font-black text-amber-600 flex items-center gap-1">
            <StarIcon className="h-4 w-4" /> {xp} Arks
          </span>
        </div>
        <div className="mt-2.5 h-2.5 overflow-hidden rounded-full bg-slate-100">
          <motion.div
            className="h-full bg-gradient-to-r from-[#ec4899] to-[#db2777]"
            animate={{ width: `${((index + 1) / total) * 100}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </div>

      <motion.div
        key={`${q.id}-${phase}`}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="overflow-hidden rounded-3xl border-2 border-slate-200 bg-white p-6 shadow-sm sm:p-8"
      >
        {/* ---- LISTEN ---- */}
        {phase === "listen" && (
          <>
            <p className="mb-1 text-center text-xs font-black uppercase tracking-widest text-pink-600">
              Ouça com Atenção · {wordLen} Letras
            </p>
            <p className="mb-4 text-center text-sm text-slate-500">
              Peça uma dica oficial se precisar:
            </p>

            {/* 3 BOTÕES OFICIAIS COM ÍCONES MONOCROMÁTICOS */}
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
              <button onClick={repeatWord} className={helpBtn} type="button">
                <SpeakerIcon className="h-4 w-4" /> Repetir Palavra
              </button>
              <button onClick={sayMeaning} className={helpBtn} type="button">
                <BookIcon className="h-4 w-4" /> Significado
              </button>
              <button
                onClick={saySentence}
                disabled={!q.exemplo}
                className={`${helpBtn} disabled:opacity-40`}
                type="button"
              >
                <FileTextIcon className="h-4 w-4" /> Frase Exemplo
              </button>
            </div>

            {/* Iniciar soletração */}
            <button
              onClick={startSpelling}
              className="mt-6 w-full rounded-2xl bg-gradient-to-br from-[#ec4899] to-[#db2777] px-8 py-4.5 text-base font-black uppercase tracking-wider text-white shadow-[0_10px_30px_rgba(236,72,153,0.35)] transition hover:-translate-y-0.5 active:scale-95"
            >
              Estou Pronto — Soletrar
            </button>
          </>
        )}

        {/* ---- SPELLING (mic) ---- */}
        {phase === "spelling" && (
          <>
            <div className="text-center">
              <div
                className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full ${
                  listening ? "animate-pulse bg-rose-100 text-rose-600" : "bg-slate-100 text-slate-400"
                }`}
              >
                <MicIcon className="h-7 w-7" />
              </div>
              <div className="mt-3">
                {!wordTriggered ? (
                  <p className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-4 py-1.5 text-xs font-bold text-amber-800 border border-amber-200">
                    Diga a palavra <strong className="uppercase font-black text-amber-950">"{q.palavra}"</strong> para liberar a soletração
                  </p>
                ) : (
                  <p className="inline-flex items-center gap-1.5 rounded-full bg-pink-50 px-4 py-1.5 text-xs font-bold text-pink-700 border border-pink-200">
                    <CheckCircleIcon className="h-3.5 w-3.5" /> Palavra confirmada! Agora soletre letra a letra
                  </p>
                )}
              </div>
            </div>

            {/* Letras reconhecidas com slots animados e interativos */}
            <div className="mt-5 flex min-h-[4rem] flex-wrap items-center justify-center gap-2">
              {(spelled || "").split("").map((ch, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    const next = spelled.slice(0, i) + spelled.slice(i + 1);
                    setSpelled(next);
                  }}
                  title="Clique para remover esta letra"
                  className="group relative flex h-14 w-11 items-center justify-center rounded-xl border-2 border-pink-400 bg-gradient-to-b from-pink-50 to-pink-100 text-2xl font-black uppercase text-pink-700 shadow-sm transition hover:scale-105 hover:border-rose-400 hover:bg-rose-50"
                >
                  <motion.span
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.15 }}
                  >
                    {ch}
                  </motion.span>
                  <span className="absolute -top-1 -right-1 hidden h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[9px] font-bold text-white group-hover:flex">
                    ×
                  </span>
                </button>
              ))}
              {Array.from({ length: Math.max(0, wordLen - spelled.length) }).map((_, i) => (
                <span
                  key={`e${i}`}
                  className={`flex h-14 w-11 items-center justify-center rounded-xl border-2 ${
                    i === 0
                      ? "border-pink-300 bg-pink-50/40 animate-pulse"
                      : "border-dashed border-slate-200 bg-slate-50/50"
                  } text-sm font-bold text-slate-300`}
                >
                  {i === 0 ? "·" : ""}
                </span>
              ))}
            </div>

            {/* Banco de Letras Interativo (Clicar para Soletrar) */}
            <div className="mt-6 rounded-2xl border border-slate-100 bg-slate-50/70 p-3.5">
              <div className="mb-2 flex items-center justify-between px-1">
                <span className="text-xs font-black uppercase tracking-wider text-slate-400">
                  Ou clique nas letras:
                </span>
                {spelled.length > 0 && (
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setSpelled((s) => s.slice(0, -1))}
                      className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-bold text-slate-600 transition hover:bg-slate-100"
                    >
                      Apagar
                    </button>
                    <button
                      type="button"
                      onClick={() => setSpelled("")}
                      className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs font-bold text-slate-400 transition hover:bg-slate-100"
                    >
                      Limpar
                    </button>
                  </div>
                )}
              </div>
              <div className="flex flex-wrap justify-center gap-1.5">
                {Array.from(
                  new Set(
                    (
                      q.palavra.toLowerCase().replace(/[^a-z]/g, "") + "rstlneaiocmdpb"
                    ).split("")
                  )
                )
                  .slice(0, 16)
                  .sort()
                  .map((letter) => (
                    <button
                      key={letter}
                      type="button"
                      onClick={() => {
                        if (spelled.length < wordLen) {
                          const next = spelled + letter;
                          setSpelled(next);
                          if (next.length >= wordLen) {
                            setTimeout(() => check(next), 400);
                          }
                        }
                      }}
                      className="flex h-11 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-base font-black uppercase text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:border-pink-300 hover:bg-pink-50 hover:text-pink-600 active:scale-95"
                    >
                      {letter}
                    </button>
                  ))}
              </div>
            </div>

            {micError && (
              <p className="mt-4 rounded-xl bg-amber-50 px-3 py-2 text-center text-xs text-amber-700">
                {micError}
              </p>
            )}

            {/* Fallback: digitar */}
            {(!supported || micError) && (
              <input
                value={typed}
                onChange={(e) => setTyped(e.target.value)}
                autoFocus
                autoCapitalize="none"
                autoCorrect="off"
                spellCheck={false}
                placeholder="Ou digite a soletração aqui…"
                className="mt-4 w-full rounded-2xl border-2 border-slate-200 bg-white px-5 py-4 text-center text-lg font-bold tracking-[2px] text-slate-900 outline-none focus:border-[#ec4899]"
              />
            )}

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              {supported && (
                <button
                  onClick={() => (listening ? stopMic() : startSpelling())}
                  className="flex-1 rounded-full border-2 border-pink-300 px-6 py-3.5 text-sm font-black uppercase tracking-wider text-pink-600 transition hover:bg-pink-50 flex items-center justify-center gap-2"
                >
                  {listening ? (
                    <>
                      <SquareIcon className="h-4 w-4" /> Parar microfone
                    </>
                  ) : (
                    <>
                      <MicIcon className="h-4 w-4" /> Falar novamente
                    </>
                  )}
                </button>
              )}
              <button
                onClick={() => check()}
                className="flex-1 rounded-full bg-gradient-to-br from-[#ec4899] to-[#db2777] px-6 py-3.5 text-sm font-black uppercase tracking-wider text-white transition hover:-translate-y-0.5 shadow-sm"
              >
                Conferir Soletração
              </button>
            </div>
          </>
        )}

        {/* ---- REVEAL ---- */}
        {phase === "reveal" && (
          <div className="text-center">
            <p className="inline-flex items-center gap-1.5 text-2xl font-black text-emerald-600">
              <CheckCircleIcon className="h-6 w-6" /> Resposta Correta!
            </p>
            <p className="mt-1 text-sm text-slate-500">A grafia correta é:</p>
            <div className="mt-4">
              <WordTiles word={q.palavra} />
            </div>
            <p className="mt-3 text-sm text-slate-600">
              <strong className="text-slate-800">Significado:</strong> {q.significado}
            </p>

            <div className="mt-7">
              <button
                onClick={nextWord}
                className="w-full rounded-full bg-slate-900 px-8 py-4 text-sm font-black uppercase tracking-wider text-white transition hover:bg-slate-700 active:scale-95 sm:w-auto"
              >
                {index + 1 >= total ? "Ver Resultado →" : "Próxima Palavra →"}
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
