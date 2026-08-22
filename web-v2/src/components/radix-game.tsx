"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import type { SpellingWord } from "@/db/queries/spelling";
import { playCorrect, playWrong, playFinish } from "@/lib/feedback";
import { GuardianAvatar } from "@/components/guardian-avatar";
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
import { awardRadixArks, type ArksResult } from "@/app/radix/actions";
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

const RADIX_GUARDIAN = "lyra"; // Lyra · Gramática / Soletração Clássica

const ARKS_BY_DIFFICULTY: Record<string, number> = {
  facil: 10,
  medio: 20,
  dificil: 40,
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

const helpBtn =
  "flex items-center justify-center gap-2 rounded-2xl border-2 border-emerald-200 bg-emerald-50/70 px-4 py-3.5 text-sm font-bold text-emerald-800 transition hover:border-emerald-300 hover:bg-emerald-100/70 active:scale-95 shadow-sm";

type Phase = "intro" | "listen" | "spelling" | "reveal" | "eliminated";

export function RadixGame({
  words,
  authed,
}: {
  words: SpellingWord[];
  authed: boolean;
}) {
  const router = useRouter();
  const [selectedSerie, setSelectedSerie] = useState<"3ano" | "5ano" | "todos">("3ano");

  // Filtra todas as palavras da série escolhida
  const filtered = words.filter(
    (w) =>
      selectedSerie === "todos" ||
      !w.serie ||
      w.serie.includes(selectedSerie) ||
      (selectedSerie === "3ano" && w.serie?.includes("3")) ||
      (selectedSerie === "5ano" && w.serie?.includes("5"))
  );
  const activePool = filtered.length > 0 ? filtered : words;

  // Baralho com TODAS as palavras da série em ordem randomizada
  const [deck, setDeck] = useState(() => shuffle(activePool));
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("intro");

  const [spelled, setSpelled] = useState("");
  const [listening, setListening] = useState(false);
  const [micError, setMicError] = useState<string | null>(null);
  const [typed, setTyped] = useState("");

  const [correctCount, setCorrectCount] = useState(0);
  const [xp, setXp] = useState(0);
  const [missedAttempt, setMissedAttempt] = useState<string>("");
  const [rankingInfo, setRankingInfo] = useState<ArksResult | null>(null);
  const [saving, setSaving] = useState(false);

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

  function setSerieAndRestart(serie: "3ano" | "5ano" | "todos") {
    stopMic();
    stopSpeaking();
    setSelectedSerie(serie);
    const sub = words.filter(
      (w) =>
        serie === "todos" ||
        !w.serie ||
        w.serie.includes(serie) ||
        (serie === "3ano" && w.serie?.includes("3")) ||
        (serie === "5ano" && w.serie?.includes("5"))
    );
    const av = sub.length > 0 ? sub : words;
    setDeck(shuffle(av));
    setIndex(0);
    setPhase("intro");
    setSpelled("");
    setTyped("");
    setCorrectCount(0);
    setXp(0);
    setMissedAttempt("");
    setRankingInfo(null);
  }

  function retryWithNewOrder() {
    stopMic();
    stopSpeaking();
    const sub = words.filter(
      (w) =>
        selectedSerie === "todos" ||
        !w.serie ||
        w.serie.includes(selectedSerie) ||
        (selectedSerie === "3ano" && w.serie?.includes("3")) ||
        (selectedSerie === "5ano" && w.serie?.includes("5"))
    );
    const av = sub.length > 0 ? sub : words;
    setDeck(shuffle(av));
    setIndex(0);
    setPhase("listen");
    setSpelled("");
    setTyped("");
    setCorrectCount(0);
    setXp(0);
    setMissedAttempt("");
    setRankingInfo(null);
    setTimeout(sayWord, 350);
  }

  if (!q) {
    return <p className="text-center text-slate-400">Carregando palavras do Radix...</p>;
  }

  // ---- Síntese de Voz (Português) ----
  function sayWord() {
    if (q) speak(q.palavra, { lang: "pt-BR", rate: 0.88 });
  }
  function sayMeaning() {
    if (q) speak(`Significado: ${q.significado}`, { lang: "pt-BR", rate: 0.9 });
  }
  function saySentence() {
    if (q?.exemplo) speak(q.exemplo, { lang: "pt-BR", rate: 0.9 });
  }

  const [wordTriggered, setWordTriggered] = useState(false);

  // ---- Microfone PT-BR ----
  function startSpelling() {
    setMicError(null);
    setSpelled("");
    setWordTriggered(false);
    finalRef.current = "";
    setPhase("spelling");
    if (!supported) return;

    const rec = createRecognizer("pt-BR");
    if (!rec) {
      setMicError("Reconhecimento de voz indisponível neste navegador.");
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

      const { triggered, spokenAfter } = detectTriggerWord(clean, targetWord);

      if (triggered) {
        setWordTriggered(true);
        // Apenas o que foi soletrado DEPOIS da palavra entra como letra
        const letters = lettersFromTranscript(spokenAfter);
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
            ? "Microfone bloqueado. Permita o acesso ou clique nas letras abaixo."
            : "Não ouvimos com clareza. Tente novamente ou clique nas letras."
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

  async function handleElimination(attemptText: string) {
    setMissedAttempt(attemptText);
    setPhase("eliminated");
    playWrong();

    // Salva pontuação da sessão e obtém posição no ranking
    if (authed) {
      setSaving(true);
      try {
        const res = await awardRadixArks({
          bronze: 0,
          prata: 0,
          ouro: 0,
          diamante: 0,
          correct: correctCount,
          total,
          points: xp,
        });
        setRankingInfo(res);
      } catch {
        /* noop */
      } finally {
        setSaving(false);
      }
    }

    // A voz explica a palavra correta pausadamente para a criança escutar e ver
    speak(`A grafia correta da palavra é ${q.palavra}.`, {
      lang: "pt-BR",
      rate: 0.88,
      onend: () => {
        spellOutWord(q.palavra, {
          lang: "pt-BR",
          onend: () => {
            if (q.significado) {
              speak(`Significado: ${q.significado}`, { lang: "pt-BR", rate: 0.9 });
            }
          },
        });
      },
    });
  }

  function check(value?: string) {
    if (phase !== "spelling" || !q) return;
    const attempt = value ?? (spelled || typed);
    if (!attempt.trim()) return;
    stopMic();

    const target = norm(q.palavra);
    const isOk = norm(attempt) === target || norm(finalRef.current.replace(/\s+/g, "")) === target;

    if (isOk) {
      // ACERTOU
      const earned = ARKS_BY_DIFFICULTY[q.dificuldade] ?? 20;
      setCorrectCount((c) => c + 1);
      setXp((x) => x + earned);
      setPhase("reveal");
      playCorrect();
      speak("Correto! Muito bem!", {
        lang: "pt-BR",
        onend: () => spellOutWord(q.palavra, { lang: "pt-BR" }),
      });
    } else {
      // ERROU -> Eliminação oficial com tela de correção, áudio e ranking
      handleElimination(attempt);
    }
  }

  function nextWord() {
    if (index + 1 >= total) {
      playFinish();
      setPhase("eliminated");
      return;
    }
    setIndex((i) => i + 1);
    setSpelled("");
    setTyped("");
    setPhase("listen");
    setTimeout(sayWord, 350);
  }

  const rawClean = q ? q.palavra.replace(/[^a-zA-ZáéíóúâêôãõçÁÉÍÓÚÂÊÔÃÕÇ]/g, "") : "";
  const wordLen = rawClean.length;

  // =========================================================================
  // TELA: ELIMINADO / ERROU A PALAVRA (Sem Emojis, com Ícones Monocromáticos)
  // =========================================================================
  if (phase === "eliminated") {
    return (
      <div className="mx-auto max-w-xl">
        <GameTopBar inProgress={false} />
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-6 overflow-hidden rounded-3xl border-2 border-rose-200 bg-white p-6 shadow-xl sm:p-8"
        >
          <div className="text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-100 px-4 py-1.5 text-xs font-black uppercase tracking-wider text-rose-700">
              <XCircleIcon className="h-4 w-4" /> Soletração Incorreta · Fim do Turno
            </span>
            <h2 className="font-display mt-3 text-2xl font-black text-slate-900 sm:text-3xl">
              Vamos Aprender a Palavra
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              Escute a pronúncia da Guardiã Lyra e observe a grafia correta.
            </p>
          </div>

          {/* PALAVRA CORRETA EM DESTAQUE */}
          <div className="mt-6 rounded-2xl border-2 border-emerald-300 bg-emerald-50/60 p-4 text-center">
            <span className="text-xs font-black uppercase tracking-wider text-emerald-800">
              Grafia Correta:
            </span>
            <div className="mt-3 flex flex-wrap justify-center gap-1.5">
              {q.palavra.toUpperCase().split("").map((ch, i) => (
                <span
                  key={i}
                  className="flex h-12 w-10 sm:h-13 sm:w-11 items-center justify-center rounded-xl border-2 border-emerald-500 bg-white text-2xl font-black uppercase text-emerald-800 shadow-sm"
                >
                  {ch}
                </span>
              ))}
            </div>

            {missedAttempt && (
              <p className="mt-3 text-xs text-slate-500">
                Você soletrou: <span className="font-bold text-rose-600 line-through">{missedAttempt.toUpperCase()}</span>
              </p>
            )}
          </div>

          {/* SIGNIFICADO E FRASE EXEMPLO */}
          <div className="mt-4 space-y-2.5 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-left text-sm">
            <div className="flex items-start gap-2">
              <BookIcon className="mt-0.5 h-4 w-4 text-slate-500 shrink-0" />
              <div>
                <strong className="text-slate-900">Significado:</strong>
                <p className="text-slate-700">{q.significado}</p>
              </div>
            </div>
            {q.exemplo && (
              <div className="flex items-start gap-2 pt-1 border-t border-slate-200/60">
                <FileTextIcon className="mt-0.5 h-4 w-4 text-slate-500 shrink-0" />
                <div>
                  <strong className="text-slate-900">Aplicação na Frase:</strong>
                  <p className="italic text-slate-600">"{q.exemplo}"</p>
                </div>
              </div>
            )}
          </div>

          {/* BOTÃO PARA OUVIR NOVAMENTE */}
          <button
            type="button"
            onClick={() => {
              speak(`A grafia correta da palavra é ${q.palavra}.`, {
                lang: "pt-BR",
                onend: () => spellOutWord(q.palavra, { lang: "pt-BR" }),
              });
            }}
            className="mt-3 w-full rounded-xl border border-emerald-300 bg-white py-2.5 text-xs font-bold text-emerald-700 hover:bg-emerald-50 transition flex items-center justify-center gap-2"
          >
            <SpeakerIcon className="h-4 w-4" /> Ouvir Soletração e Significado Novamente
          </button>

          {/* RESULTADO DA RODADA E RANKING GERAL */}
          <div className="mt-6 rounded-2xl border-2 border-amber-200 bg-gradient-to-br from-amber-50/80 to-yellow-50/40 p-4 text-center">
            <div className="grid grid-cols-2 gap-2 border-b border-amber-200/60 pb-3">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800">
                  Palavras Corretas
                </span>
                <p className="font-display text-2xl font-black text-slate-900">
                  {correctCount} <span className="text-xs text-slate-500 font-normal">de {total}</span>
                </p>
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800">
                  Arks Conquistados
                </span>
                <p className="font-display text-2xl font-black text-amber-600">
                  +{xp} Arks
                </p>
              </div>
            </div>

            {/* POSIÇÃO NO RANKING */}
            <div className="pt-3">
              <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-slate-600">
                <TrophyIcon className="h-4 w-4 text-amber-600" /> Ranking Geral dos Sábios
              </span>
              {rankingInfo?.persisted ? (
                <p className="mt-1 text-sm font-bold text-slate-800">
                  Sua Posição: <strong className="text-amber-600">#{rankingInfo.rankPos}</strong> de {rankingInfo.rankTotal} alunos
                  <span className="block text-xs font-normal text-slate-500 mt-0.5">
                    Total Acumulado: {rankingInfo.totalArks} Arks
                  </span>
                </p>
              ) : (
                <p className="mt-1 text-xs text-slate-600">
                  {authed ? "Pontuação registrada com sucesso no ranking geral!" : "Faça login para salvar seus pontos no ranking geral!"}
                </p>
              )}
            </div>
          </div>

          {/* BOTÕES DE AÇÃO */}
          <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
            <button
              type="button"
              onClick={retryWithNewOrder}
              className="flex-1 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 py-3.5 text-sm font-black uppercase tracking-wider text-white shadow-md hover:bg-emerald-700 transition active:scale-95 flex items-center justify-center gap-2"
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
      </div>
    );
  }

  // =========================================================================
  // TELA: INTRO / SELETOR DE SÉRIE
  // =========================================================================
  if (phase === "intro") {
    return (
      <div className="mx-auto max-w-xl">
        <GameTopBar inProgress={false} />
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 rounded-3xl border-2 border-emerald-200 bg-white p-6 sm:p-8 shadow-sm"
        >
          <div className="text-center">
            <GuardianAvatar name={RADIX_GUARDIAN} size={72} ring="#10b981" className="mx-auto" />
            <h1 className="font-display mt-3 text-3xl font-black text-slate-900">Radix · Soletração</h1>
            <p className="mt-1 text-sm font-medium text-emerald-700">
              O Reino do Saber e da Língua Portuguesa
            </p>
          </div>

          {/* SELETOR DE SÉRIE */}
          <div className="mt-6">
            <label className="mb-2 block text-xs font-black uppercase tracking-wider text-slate-500 text-center">
              Escolha a Série Escolar:
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setSerieAndRestart("3ano")}
                className={`rounded-2xl border-2 py-3.5 px-2 text-sm font-black transition ${
                  selectedSerie === "3ano"
                    ? "border-emerald-500 bg-emerald-50 text-emerald-800 shadow-sm"
                    : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                }`}
              >
                3º Ano
                <span className="block text-[11px] font-bold text-emerald-600 mt-0.5">148 palavras</span>
              </button>

              <button
                type="button"
                onClick={() => setSerieAndRestart("5ano")}
                className={`rounded-2xl border-2 py-3.5 px-2 text-sm font-black transition ${
                  selectedSerie === "5ano"
                    ? "border-emerald-500 bg-emerald-50 text-emerald-800 shadow-sm"
                    : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                }`}
              >
                5º Ano
                <span className="block text-[11px] font-bold text-emerald-600 mt-0.5">150 palavras</span>
              </button>

              <button
                type="button"
                onClick={() => setSerieAndRestart("todos")}
                className={`rounded-2xl border-2 py-3.5 px-2 text-sm font-black transition ${
                  selectedSerie === "todos"
                    ? "border-emerald-500 bg-emerald-50 text-emerald-800 shadow-sm"
                    : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                }`}
              >
                Geral
                <span className="block text-[11px] font-bold text-emerald-600 mt-0.5">298 palavras</span>
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={retryWithNewOrder}
            className="mt-7 w-full rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 py-4 text-base font-black uppercase tracking-wider text-white shadow-lg shadow-emerald-600/30 transition hover:-translate-y-0.5 active:scale-95"
          >
            Iniciar Rodada ({total} Palavras)
          </button>
        </motion.div>
      </div>
    );
  }

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
            <span className="rounded-md bg-emerald-100 px-2 py-0.5 text-xs font-black text-emerald-800 uppercase">
              {selectedSerie === "3ano" ? "3º Ano" : selectedSerie === "5ano" ? "5º Ano" : "Geral"}
            </span>
            <span className="font-bold text-slate-600">
              Palavra <strong className="text-slate-900">{index + 1}</strong> de <strong className="text-slate-900">{total}</strong>
            </span>
          </div>
          <span className="font-black text-amber-600 flex items-center gap-1">
            <StarIcon className="h-4 w-4" /> {xp} Arks
          </span>
        </div>
        <div className="mt-2.5 h-2.5 overflow-hidden rounded-full bg-slate-100">
          <motion.div
            className="h-full bg-gradient-to-r from-emerald-500 to-teal-600"
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
        {/* ---- FASE 1: OUVIR E DICAS OFICIAIS ---- */}
        {phase === "listen" && (
          <>
            <div className="text-center">
              <span className="inline-block rounded-full bg-emerald-50 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-emerald-700">
                Ouça com Atenção · {wordLen} Letras
              </span>
              <p className="mt-2 text-sm text-slate-500">
                Peça as dicas oficiais do concurso se precisar:
              </p>
            </div>

            {/* 3 BOTÕES OFICIAIS COM ÍCONES MONOCROMÁTICOS */}
            <div className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-3">
              <button onClick={sayWord} className={helpBtn} type="button">
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

            <button
              type="button"
              onClick={startSpelling}
              className="mt-6 w-full rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 py-4 text-base font-black uppercase tracking-wider text-white shadow-lg shadow-emerald-600/25 transition hover:-translate-y-0.5 active:scale-95"
            >
              Estou Pronto — Soletrar
            </button>
          </>
        )}

        {/* ---- FASE 2: SOLETRAÇÃO (VOZ + CLIQUE DE LETRAS) ---- */}
        {phase === "spelling" && (
          <>
            <div className="text-center">
              <div
                className={`mx-auto flex h-14 w-14 items-center justify-center rounded-full ${
                  listening
                    ? "animate-pulse bg-emerald-100 text-emerald-700 ring-4 ring-emerald-200"
                    : "bg-slate-100 text-slate-400"
                }`}
              >
                <MicIcon className="h-6 w-6" />
              </div>
              <div className="mt-3">
                {!wordTriggered ? (
                  <p className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-4 py-1.5 text-xs font-bold text-amber-800 border border-amber-200">
                    Diga a palavra <strong className="uppercase font-black text-amber-950">"{q.palavra}"</strong> para liberar a soletração
                  </p>
                ) : (
                  <p className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-4 py-1.5 text-xs font-bold text-emerald-800 border border-emerald-200">
                    <CheckCircleIcon className="h-3.5 w-3.5" /> Palavra confirmada! Agora soletre letra a letra
                  </p>
                )}
              </div>
            </div>

            {/* SLOTS DE LETRAS COM FEEDBACK EM TEMPO REAL */}
            <div className="mt-5 flex min-h-[4rem] flex-wrap items-center justify-center gap-1.5 sm:gap-2">
              {(spelled || "").split("").map((ch, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    const next = spelled.slice(0, i) + spelled.slice(i + 1);
                    setSpelled(next);
                  }}
                  title="Clique para remover"
                  className="group relative flex h-12 w-10 sm:h-14 sm:w-11 items-center justify-center rounded-xl border-2 border-emerald-400 bg-emerald-50 text-2xl font-black uppercase text-emerald-800 shadow-sm transition hover:bg-rose-50 hover:border-rose-400"
                >
                  <motion.span initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
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
                  className={`flex h-12 w-10 sm:h-14 sm:w-11 items-center justify-center rounded-xl border-2 ${
                    i === 0 ? "border-emerald-400 bg-emerald-50/50 animate-pulse" : "border-dashed border-slate-200 bg-slate-50/50"
                  } text-xs font-bold text-slate-300`}
                >
                  {i === 0 ? "·" : ""}
                </span>
              ))}
            </div>

            {/* BANCO DE LETRAS INTERATIVO (CLICAR PARA SOLETRAR) */}
            <div className="mt-5 rounded-2xl border border-slate-100 bg-slate-50/80 p-3">
              <div className="mb-2 flex items-center justify-between px-1">
                <span className="text-xs font-black uppercase tracking-wider text-slate-400">
                  Ou clique nas letras:
                </span>
                {spelled.length > 0 && (
                  <div className="flex gap-1.5">
                    <button
                      type="button"
                      onClick={() => setSpelled((s) => s.slice(0, -1))}
                      className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-bold text-slate-700 hover:bg-slate-100"
                    >
                      Apagar
                    </button>
                    <button
                      type="button"
                      onClick={() => setSpelled("")}
                      className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs font-bold text-slate-400 hover:bg-slate-100"
                    >
                      Limpar
                    </button>
                  </div>
                )}
              </div>
              <div className="flex flex-wrap justify-center gap-1.5">
                {Array.from(new Set((rawClean.toLowerCase() + "aeioucçstrnlmdp").split("")))
                  .slice(0, 18)
                  .sort((a, b) => a.localeCompare(b, "pt-BR"))
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
                      className="flex h-10 w-9 sm:h-11 sm:w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-base font-black uppercase text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-400 hover:bg-emerald-50 hover:text-emerald-700 active:scale-95"
                    >
                      {letter}
                    </button>
                  ))}
              </div>
            </div>

            {micError && (
              <p className="mt-3 rounded-xl bg-amber-50 px-3 py-2 text-center text-xs text-amber-800">
                {micError}
              </p>
            )}

            {/* DIGITAÇÃO LIVRE */}
            {(!supported || micError) && (
              <input
                value={typed}
                onChange={(e) => setTyped(e.target.value)}
                autoFocus
                autoCapitalize="none"
                autoCorrect="off"
                spellCheck={false}
                placeholder="Ou digite a palavra aqui..."
                className="mt-4 w-full rounded-2xl border-2 border-slate-200 bg-white px-4 py-3.5 text-center text-lg font-bold tracking-[2px] text-slate-900 outline-none focus:border-emerald-500"
              />
            )}

            <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
              {supported && (
                <button
                  type="button"
                  onClick={() => (listening ? stopMic() : startSpelling())}
                  className="flex-1 rounded-full border-2 border-emerald-400 px-5 py-3 text-sm font-black uppercase tracking-wider text-emerald-800 hover:bg-emerald-50 flex items-center justify-center gap-2"
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
                type="button"
                onClick={() => check()}
                className="flex-1 rounded-full bg-emerald-600 py-3 text-sm font-black uppercase tracking-wider text-white shadow-md hover:bg-emerald-700"
              >
                Conferir Soletração
              </button>
            </div>
          </>
        )}

        {/* ---- FASE 3: ACERTOU (REVEAL PROVISÓRIO ANTES DA PRÓXIMA) ---- */}
        {phase === "reveal" && (
          <div className="text-center">
            <p className="inline-flex items-center gap-1.5 text-2xl font-black text-emerald-600">
              <CheckCircleIcon className="h-6 w-6" /> Resposta Correta!
            </p>
            <p className="mt-1 text-sm text-slate-500">Excelente soletração:</p>

            <div className="mt-4 flex flex-wrap justify-center gap-1.5">
              {q.palavra.toUpperCase().split("").map((ch, i) => (
                <span
                  key={i}
                  className="flex h-12 w-10 sm:h-14 sm:w-11 items-center justify-center rounded-xl border-2 border-emerald-500 bg-emerald-50 text-2xl font-black uppercase text-emerald-800"
                >
                  {ch}
                </span>
              ))}
            </div>

            <p className="mt-3 text-sm text-slate-600">
              <strong className="text-slate-800">Significado:</strong> {q.significado}
            </p>

            <div className="mt-6">
              <button
                type="button"
                onClick={nextWord}
                className="w-full rounded-full bg-emerald-600 px-8 py-3.5 text-sm font-black uppercase tracking-wider text-white hover:bg-emerald-700 sm:w-auto"
              >
                {index + 1 >= total ? "Finalizar Rodada →" : "Próxima Palavra →"}
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
