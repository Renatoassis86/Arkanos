"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import type { SpellingWord } from "@/db/queries/spelling";
import { awardSpellingArks, type ArksResult } from "@/app/spelling-bee/actions";
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
  createRecognizer,
  speechSupported,
} from "@/lib/spell-speech";
import type { Rarity } from "@/lib/collection";

const SPELLING_GUARDIAN = "lyra"; // Lyra · Grammar guides the Spelling Bee.

const ARKS_BY_DIFFICULTY: Record<string, number> = {
  facil: 10, easy: 10, medio: 20, medium: 20, dificil: 40, hard: 40,
};

function norm(s: string) {
  return s.trim().toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z]/g, "");
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
  "flex items-center justify-center gap-2 rounded-2xl border-2 border-pink-200 bg-pink-50/50 px-4 py-3.5 text-sm font-bold text-pink-600 transition hover:border-pink-300 hover:bg-pink-50";

function SpeakerIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M11 5 6 9H2v6h4l5 4z" />
      <path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a9 9 0 0 1 0 14" />
    </svg>
  );
}

type Phase = "intro" | "listen" | "spelling" | "reveal";

export function SpellingBeeGame({
  words,
  authed,
}: {
  words: SpellingWord[];
  authed: boolean;
}) {
  const [deck, setDeck] = useState(() => shuffle(words).slice(0, 12));
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("intro");

  const [spelled, setSpelled] = useState(""); // letras reconhecidas
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
  const router = useRouter();
  const supported = speechSupported();

  const q = deck[index];
  const total = deck.length;

  // Para o microfone ao sair da fase de soletração / desmontar.
  function stopMic() {
    try { recRef.current?.stop(); } catch { /* noop */ }
    recRef.current = null;
    setListening(false);
  }
  useEffect(() => () => { stopMic(); stopSpeaking(); }, []);

  if (!q && !finished) {
    return <p className="text-center text-slate-300">No words available yet.</p>;
  }

  // ---- pronouncer ----
  function sayWord() { if (q) speak(q.palavra, { rate: 0.85 }); }
  function sayMeaning() { if (q) speak(`Meaning: ${q.significado}`); }
  function saySentence() { if (q?.exemplo) speak(q.exemplo); }

  // ---- microfone / soletração ----
  function startSpelling() {
    setMicError(null);
    setSpelled("");
    finalRef.current = "";
    setPhase("spelling");
    if (!supported) return; // mostra fallback de digitação
    const rec = createRecognizer();
    if (!rec) { setMicError("Speech recognition is not available on this browser."); return; }
    recRef.current = rec;
    rec.onresult = (e: SpeechRecognitionEvent) => {
      let interim = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const r = e.results[i];
        if (r.isFinal) finalRef.current += " " + r[0].transcript;
        else interim += " " + r[0].transcript;
      }
      const letters = lettersFromTranscript(finalRef.current + " " + interim);
      setSpelled(letters);
      // auto-confere quando atinge o tamanho da palavra
      if (q && letters.length >= q.palavra.replace(/[^a-zA-Z]/g, "").length) {
        setTimeout(() => check(letters), 500);
      }
    };
    rec.onerror = (e: SpeechRecognitionErrorEvent) => {
      setMicError(e.error === "not-allowed"
        ? "Microphone blocked. Allow it in the browser, or type your answer below."
        : "Could not hear you. Try again or type below.");
      setListening(false);
    };
    rec.onend = () => setListening(false);
    try { rec.start(); setListening(true); } catch { /* já iniciado */ }
  }

  function check(value?: string) {
    if (phase !== "spelling" || !q) return;
    const attempt = value ?? (spelled || typed);
    if (!attempt.trim()) return;
    stopMic();
    const target = norm(q.palavra);
    const ok =
      norm(attempt) === target ||
      norm(finalRef.current.replace(/\s+/g, "")) === target; // fallback: palavra dita junto

    setItems((arr) => [...arr, { difficulty: q.dificuldade, type: "spelling", correct: ok }]);
    setLastCorrect(ok);
    setPhase("reveal");

    if (ok) {
      setCorrectCount((c) => c + 1);
      setXp((x) => x + (ARKS_BY_DIFFICULTY[q.dificuldade] ?? 10));
      if (q.dificuldade === "dificil" || q.dificuldade === "hard") setOuro((o) => o + 1);
      else if (q.dificuldade === "medio" || q.dificuldade === "medium") setPrata((p) => p + 1);
      else setBronze((b) => b + 1);
      playCorrect();
      speak("Correct! Well done.", { onend: () => spellOutWord(q.palavra) });
    } else {
      playWrong();
      speak("Oops, not quite. Let's learn it.", { onend: () => spellOutWord(q.palavra) });
    }
  }

  function nextWord() {
    if (!lastCorrect) return;
    if (index + 1 >= total) { void finishGame(false); return; }
    setIndex((i) => i + 1);
    setSpelled("");
    setTyped("");
    setPhase("listen");
  }

  async function finishGame(eliminated: boolean) {
    stopMic();
    setFinished(true);
    if (eliminated && q) setMissedWord(q.palavra);
    playFinish();
    setTimeout(() => setCanContinue(true), 3500);
    const score = sessionScore(items);
    setTri(score);
    if (!authed) return;
    setSaving(true);
    const diamante = !eliminated && total > 0 && correctCount === total ? 1 : 0;
    const res = await awardSpellingArks({
      bronze, prata, ouro, diamante,
      correct: correctCount, total, points: score.points,
    });
    setSaving(false);
    setPersisted(res);
    if (res.persisted) {
      const queue: RevealItem[] = [];
      if (res.leveledUp) queue.push({ kind: "level", level: res.level });
      for (const g of res.granted) {
        if (g.kind === "orb") queue.push({ kind: "orb", key: g.key, rarity: (g.rarity ?? "terrestre") as Rarity });
        else queue.push({ kind: "medal", key: g.key });
      }
      if (queue.length > 0) setReveals(queue);
    }
  }

  function restart() {
    stopMic(); stopSpeaking();
    setDeck(shuffle(words).slice(0, 12));
    setIndex(0); setPhase("intro");
    setSpelled(""); setTyped(""); setListening(false); setMicError(null);
    setLastCorrect(false); setCorrectCount(0); setXp(0);
    setBronze(0); setPrata(0); setOuro(0); setItems([]);
    setFinished(false); setMissedWord(null); setSaving(false);
    setPersisted(null); setReveals([]); setTri(null); setCanContinue(false);
  }

  // Tiles com a palavra (visual do resultado).
  function WordTiles({ word, dim }: { word: string; dim?: boolean }) {
    return (
      <div className="flex flex-wrap justify-center gap-1.5">
        {word.split("").map((ch, i) => (
          <span
            key={i}
            className={`flex h-11 w-9 items-center justify-center rounded-lg border-2 text-xl font-black uppercase ${
              dim ? "border-slate-200 bg-slate-50 text-slate-400" : "border-[#f1c40f]/40 bg-[#f1c40f]/10 text-[#b8860b]"
            }`}
          >
            {ch}
          </span>
        ))}
      </div>
    );
  }

  // ============ FINISHED ============
  if (finished) {
    const pct = total > 0 ? Math.round((correctCount / total) * 100) : 0;
    return (
      <>
        <div className="mx-auto max-w-lg"><GameTopBar inProgress={false} /></div>
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
          className="mx-auto max-w-lg rounded-3xl border-2 border-slate-200 bg-white p-7 text-center shadow-lg sm:p-9"
        >
          <p className="text-xs font-extrabold uppercase tracking-[4px] text-[#b8860b]">
            {missedWord ? "Game over" : "Spelling complete"}
          </p>
          <p className="font-display mt-2 text-5xl font-black text-slate-900">
            {correctCount}<span className="text-2xl text-slate-400">/{total}</span>
          </p>
          <p className="mt-1 text-sm text-slate-500">words spelled correctly · {pct}%</p>

          {missedWord && (
            <div className="mt-6 rounded-2xl border-2 border-rose-200 bg-rose-50/50 p-4">
              <p className="text-xs font-black uppercase tracking-widest text-rose-500">The word was</p>
              <div className="mt-3"><WordTiles word={missedWord} /></div>
              <button
                onClick={() => spellOutWord(missedWord)}
                className="mt-3 text-sm font-bold text-[#b8860b] hover:underline"
              >
                ▸ Hear it spelled
              </button>
            </div>
          )}

          <div className="mx-auto mt-5 flex max-w-md items-center gap-3 rounded-2xl border border-slate-200 bg-[#f8fafc] p-3 text-left">
            <GuardianAvatar name={SPELLING_GUARDIAN} size={52} ring="#ec4899" />
            <p className="text-sm leading-relaxed text-slate-700">
              {missedWord
                ? "Every speller stumbles — that is how we learn. Listen, learn the spelling, and try again!"
                : "Splendid! Your spelling shines. Keep practicing to master every word."}
            </p>
          </div>

          {tri && (
            <div className="mx-auto mt-5 max-w-md rounded-2xl border-2 border-[#f1c40f]/30 bg-[#f1c40f]/8 p-4">
              <p className="text-xs font-black uppercase tracking-widest text-[#b8860b]">Score (IRT)</p>
              <p className="font-display mt-1 text-4xl text-slate-900">{tri.points}</p>
            </div>
          )}

          {saving && <p className="mt-5 text-sm text-slate-400">Saving your rewards…</p>}
          {persisted?.persisted && (
            <div className="mt-6 rounded-2xl border-2 border-[#f1c40f]/30 bg-[#f1c40f]/8 p-4">
              {persisted.leveledUp && (
                <p className="font-display text-lg text-[#b8860b]">★ Level up — now level {persisted.level}!</p>
              )}
              <p className="mt-1 text-sm text-slate-700">
                Total: <strong className="text-slate-900">{persisted.totalArks} Arks</strong> · Rank{" "}
                <strong className="text-slate-900">#{persisted.rankPos}</strong> of {persisted.rankTotal}
              </p>
            </div>
          )}
          {!authed && (
            <p className="mt-5 text-sm text-slate-500">
              <Link href="/signup" className="font-bold text-[#b8860b] hover:underline">Create an account</Link>{" "}
              to save your Arks and join the ranking.
            </p>
          )}

          <div className="mt-7 flex flex-col items-center gap-3">
            <button
              onClick={restart}
              className="w-full rounded-full bg-gradient-to-br from-[#f1c40f] to-[#e0a417] px-8 py-4 text-sm font-black uppercase tracking-wider text-[#3b2f00] transition active:scale-95 hover:-translate-y-0.5 sm:w-auto"
            >
              Try again
            </button>
            {canContinue && (
              <button onClick={() => router.push("/colecao")} className="text-sm font-bold text-slate-500 hover:text-[#b8860b] hover:underline">
                Go to Collection →
              </button>
            )}
          </div>
        </motion.div>

        {reveals.length > 0 && (
          <PremiacaoOverlay items={reveals} guardian={SPELLING_GUARDIAN} onClose={() => setReveals([])} />
        )}
      </>
    );
  }

  // ============ INTRO ============
  if (phase === "intro") {
    return (
      <div className="mx-auto max-w-lg">
        <GameTopBar inProgress={false} />
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl border-2 border-pink-200 bg-white p-8 text-center shadow-lg"
        >
          <GuardianAvatar name={SPELLING_GUARDIAN} size={72} ring="#ec4899" className="mx-auto" />
          <h1 className="font-display mt-4 text-3xl text-slate-900">Spelling Bee</h1>
          <p className="mt-2 text-slate-600">
            Listen to the word. You can ask for its <strong>meaning</strong>, hear it in a{" "}
            <strong>sentence</strong>, or <strong>repeat</strong> it. Then tap{" "}
            <strong>Spell it</strong> and spell the word out loud, letter by letter.
          </p>
          <p className="mt-2 text-sm text-rose-500">Careful: one wrong word ends the game!</p>
          {!supported && (
            <p className="mt-3 rounded-xl bg-amber-50 px-3 py-2 text-xs text-amber-700">
              Your browser can&apos;t open the mic — you&apos;ll be able to type the spelling instead.
            </p>
          )}
          <button
            onClick={() => { setPhase("listen"); setTimeout(sayWord, 250); }}
            className="mt-6 w-full rounded-full bg-gradient-to-br from-[#ec4899] to-[#db2777] px-8 py-4 text-base font-black uppercase tracking-wider text-white transition hover:-translate-y-0.5 active:scale-95"
          >
            Start
          </button>
        </motion.div>
      </div>
    );
  }

  const wordLen = q.palavra.replace(/[^a-zA-Z]/g, "").length;

  // ============ PLAYING (listen / spelling / reveal) ============
  return (
    <div className="mx-auto max-w-2xl">
      <GameTopBar inProgress />
      {/* HUD */}
      <div className="sticky top-0 z-20 -mx-6 mb-6 border-b border-slate-200 bg-white/90 px-6 py-3 backdrop-blur sm:mx-0 sm:rounded-2xl sm:border sm:px-4 sm:shadow-sm">
        <div className="flex items-center justify-between text-sm">
          <span className="font-bold text-slate-500">Word {index + 1} / {total}</span>
          <span className="font-black text-[#b8860b]">{xp} Arks</span>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-200">
          <motion.div className="h-full bg-gradient-to-r from-[#ec4899] to-[#db2777]"
            animate={{ width: `${(index / total) * 100}%` }} transition={{ duration: 0.4 }} />
        </div>
      </div>

      <motion.div
        key={`${q.id}-${phase}`}
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
        className="overflow-hidden rounded-3xl border-2 border-slate-200 bg-white p-6 shadow-sm sm:p-8"
      >
        {/* ---- LISTEN ---- */}
        {phase === "listen" && (
          <>
            <p className="mb-1 text-center text-xs font-bold uppercase tracking-widest text-slate-400">
              Listen, then spell · {wordLen} letters
            </p>
            <p className="mb-4 text-center text-sm text-slate-500">Need help? Tap a button below.</p>

            {/* 3 botões de ajuda (a criança aperta se precisar) */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <button onClick={sayWord} className={helpBtn}>
                <SpeakerIcon /> Repeat the word
              </button>
              <button onClick={sayMeaning} className={helpBtn}>
                <SpeakerIcon /> Meaning
              </button>
              <button onClick={saySentence} disabled={!q.exemplo} className={`${helpBtn} disabled:opacity-40`}>
                <SpeakerIcon /> In a sentence
              </button>
            </div>

            {/* 4º botão: começar a soletrar */}
            <button
              onClick={startSpelling}
              className="mt-6 w-full rounded-2xl bg-gradient-to-br from-[#ec4899] to-[#db2777] px-8 py-5 text-base font-black uppercase tracking-wider text-white shadow-[0_10px_30px_rgba(236,72,153,0.35)] transition hover:-translate-y-0.5 active:scale-95"
            >
              I&apos;m ready — Spell it
            </button>
          </>
        )}

        {/* ---- SPELLING (mic) ---- */}
        {phase === "spelling" && (
          <>
            <div className="text-center">
              <div className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full ${listening ? "animate-pulse bg-rose-100 text-rose-600" : "bg-slate-100 text-slate-400"}`}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="9" y="2" width="6" height="12" rx="3" /><path d="M5 10a7 7 0 0 0 14 0M12 17v4" />
                </svg>
              </div>
              <p className="mt-3 font-bold text-slate-700">
                {listening ? "Listening… spell the word out loud" : supported ? "Tap to speak" : "Type the spelling"}
              </p>
            </div>

            {/* Letras reconhecidas */}
            <div className="mt-5 flex min-h-[3.5rem] flex-wrap justify-center gap-1.5">
              {(spelled || "").split("").map((ch, i) => (
                <span key={i} className="flex h-11 w-9 items-center justify-center rounded-lg border-2 border-pink-300 bg-pink-50 text-xl font-black uppercase text-pink-600">
                  {ch}
                </span>
              ))}
              {Array.from({ length: Math.max(0, wordLen - spelled.length) }).map((_, i) => (
                <span key={`e${i}`} className="flex h-11 w-9 items-center justify-center rounded-lg border-2 border-dashed border-slate-200 text-slate-300">·</span>
              ))}
            </div>

            {micError && <p className="mt-4 rounded-xl bg-amber-50 px-3 py-2 text-center text-xs text-amber-700">{micError}</p>}

            {/* Fallback: digitar */}
            {(!supported || micError) && (
              <input
                value={typed} onChange={(e) => setTyped(e.target.value)} autoFocus
                autoCapitalize="none" autoCorrect="off" spellCheck={false} placeholder="Type the spelling…"
                className="mt-4 w-full rounded-2xl border-2 border-slate-200 bg-white px-5 py-4 text-center text-lg font-bold tracking-[2px] text-slate-900 outline-none focus:border-[#ec4899]"
              />
            )}

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              {supported && !micError && (
                <button onClick={() => (listening ? stopMic() : startSpelling())}
                  className="flex-1 rounded-full border-2 border-pink-300 px-6 py-3.5 text-sm font-black uppercase tracking-wider text-pink-600 transition hover:bg-pink-50">
                  {listening ? "Stop mic" : "Speak again"}
                </button>
              )}
              <button onClick={() => check()}
                className="flex-1 rounded-full bg-gradient-to-br from-[#ec4899] to-[#db2777] px-6 py-3.5 text-sm font-black uppercase tracking-wider text-white transition hover:-translate-y-0.5">
                Check spelling
              </button>
            </div>
          </>
        )}

        {/* ---- REVEAL ---- */}
        {phase === "reveal" && (
          <div className="text-center">
            <p className={`text-2xl font-black ${lastCorrect ? "text-emerald-600" : "text-rose-600"}`}>
              {lastCorrect ? "Correct!" : "Not quite"}
            </p>
            <p className="mt-1 text-sm text-slate-500">The correct spelling is</p>
            <div className="mt-4"><WordTiles word={q.palavra} /></div>
            <p className="mt-3 text-sm text-slate-600"><span className="font-bold text-slate-500">Meaning:</span> {q.significado}</p>
            <button onClick={() => spellOutWord(q.palavra)} className="mt-3 text-sm font-bold text-[#b8860b] hover:underline">
              ▸ Hear it spelled &amp; pronounced
            </button>

            <div className="mt-7">
              {lastCorrect ? (
                <button onClick={nextWord}
                  className="w-full rounded-full bg-slate-900 px-8 py-4 text-sm font-black uppercase tracking-wider text-white transition hover:bg-slate-700 active:scale-95 sm:w-auto">
                  {index + 1 >= total ? "See result →" : "Next word →"}
                </button>
              ) : (
                <button onClick={() => finishGame(true)}
                  className="w-full rounded-full bg-gradient-to-br from-[#f1c40f] to-[#e0a417] px-8 py-4 text-sm font-black uppercase tracking-wider text-[#3b2f00] transition hover:-translate-y-0.5 active:scale-95 sm:w-auto">
                  Continue
                </button>
              )}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
