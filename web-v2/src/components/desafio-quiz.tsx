"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import type { DesafioQuestion } from "@/db/queries/quiz";
import { awardDesafioXp, type AwardResult } from "@/app/desafio/actions";
import { playCorrect, playWrong, playFinish } from "@/lib/feedback";

const XP_BY_DIFFICULTY: Record<string, number> = { easy: 20, medium: 30, hard: 50 };

// Ilustração temática por disciplina (usada quando a questão não tem imagem).
const SUBJECT_ART: Record<string, { emoji: string; from: string; to: string }> = {
  História: { emoji: "🏛️", from: "#f1c40f", to: "#d4af37" },
  Geografia: { emoji: "🗺️", from: "#60a5fa", to: "#3b82f6" },
  Matemática: { emoji: "🔢", from: "#a78bfa", to: "#8b5cf6" },
  Ciências: { emoji: "🔬", from: "#34d399", to: "#10b981" },
  Latim: { emoji: "📜", from: "#fb923c", to: "#f59e0b" },
};
const DEFAULT_ART = { emoji: "📖", from: "#f1c40f", to: "#d4af37" };

function normalize(s: string) {
  return s
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[.!?]+$/, "");
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function isAnswerCorrect(q: DesafioQuestion, value: string) {
  if (normalize(value) === normalize(q.answer)) return true;
  if (
    q.type === "short_answer" &&
    normalize(value).length > 2 &&
    normalize(q.answer).includes(normalize(value))
  )
    return true;
  return false;
}

export function DesafioQuiz({
  questions,
  authed,
}: {
  questions: DesafioQuestion[];
  authed: boolean;
}) {
  // Sem shuffle no render inicial (evita mismatch de hidratação): o servidor já
  // entrega embaralhado; o cliente só re-embaralha ao reiniciar (ação do usuário).
  const [deck, setDeck] = useState(questions);

  const [index, setIndex] = useState(0);
  const [typed, setTyped] = useState("");
  const [picked, setPicked] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [xp, setXp] = useState(0);
  const [finished, setFinished] = useState(false);
  const [saving, setSaving] = useState(false);
  const [persisted, setPersisted] = useState<AwardResult | null>(null);

  if (deck.length === 0) {
    return (
      <p className="text-center text-slate-300">Nenhuma questão disponível ainda.</p>
    );
  }

  const q = deck[index];
  const total = deck.length;
  const art = SUBJECT_ART[q.subject] ?? DEFAULT_ART;

  function check(value: string) {
    if (revealed) return;
    setPicked(value);
    setRevealed(true);
    if (isAnswerCorrect(q, value)) {
      setCorrectCount((c) => c + 1);
      setXp((x) => x + (XP_BY_DIFFICULTY[q.difficulty] ?? 20));
      playCorrect();
    } else {
      playWrong();
    }
  }

  function next() {
    if (index + 1 >= total) {
      void finishGame();
      return;
    }
    setIndex((i) => i + 1);
    setTyped("");
    setPicked(null);
    setRevealed(false);
  }

  async function finishGame() {
    setFinished(true);
    playFinish();
    if (!authed) return;
    setSaving(true);
    const res = await awardDesafioXp({ correct: correctCount, total, xp });
    setSaving(false);
    setPersisted(res);
  }

  function restart() {
    setDeck(shuffle(questions));
    setIndex(0);
    setTyped("");
    setPicked(null);
    setRevealed(false);
    setCorrectCount(0);
    setXp(0);
    setFinished(false);
    setSaving(false);
    setPersisted(null);
  }

  const correct = revealed && picked !== null && isAnswerCorrect(q, picked);

  if (finished) {
    const pct = Math.round((correctCount / total) * 100);
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mx-auto max-w-lg rounded-3xl border border-[#f1c40f]/20 bg-white/5 p-10 text-center"
      >
        <p className="text-xs font-extrabold uppercase tracking-[4px] text-[#f1c40f]">
          Desafio concluído
        </p>
        <p className="font-display mt-4 text-6xl font-black text-white">{pct}%</p>
        <p className="mt-2 text-slate-300">
          {correctCount} de {total} corretas ·{" "}
          <span className="text-[#f1c40f]">+{xp} XP</span>
        </p>

        {saving && <p className="mt-4 text-sm text-slate-400">Salvando progresso…</p>}
        {persisted?.persisted && (
          <div className="mt-5 rounded-2xl border border-[#f1c40f]/20 bg-[#f1c40f]/5 p-4">
            {persisted.leveledUp && (
              <p className="font-display text-lg text-[#f1c40f]">⭐ Subiu de nível!</p>
            )}
            <p className="text-sm text-slate-200">
              XP total: <strong className="text-white">{persisted.totalXp}</strong> ·
              Nível <strong className="text-white">{persisted.level}</strong>
            </p>
          </div>
        )}
        {!authed && (
          <p className="mt-4 text-sm text-slate-400">
            <Link href="/signup" className="font-bold text-[#f1c40f] hover:underline">
              Crie uma conta
            </Link>{" "}
            para salvar seu XP e subir de nível.
          </p>
        )}

        <button
          onClick={restart}
          className="mt-8 rounded-full bg-[#f1c40f] px-8 py-3 text-sm font-black uppercase tracking-wider text-[#0b1222] transition hover:-translate-y-0.5"
        >
          Jogar novamente
        </button>
      </motion.div>
    );
  }

  const tfOptions = [
    { label: "Verdadeiro", value: "true", icon: "✓" },
    { label: "Falso", value: "false", icon: "✗" },
  ];

  function optionState(matchValue: string, isThisPicked: boolean) {
    if (!revealed) return "idle";
    if (normalize(matchValue) === normalize(q.answer)) return "correct";
    if (isThisPicked) return "wrong";
    return "dim";
  }

  const stateClasses: Record<string, string> = {
    idle: "border-white/10 bg-white/5 text-slate-100 hover:border-[#f1c40f]/50 hover:bg-white/10",
    correct: "border-emerald-400/60 bg-emerald-400/15 text-emerald-100",
    wrong: "border-rose-400/60 bg-rose-400/15 text-rose-100",
    dim: "border-white/5 bg-white/5 text-slate-500",
  };

  return (
    <div className="mx-auto max-w-2xl">
      {/* HUD fixo (estilo jogo) */}
      <div className="sticky top-0 z-20 -mx-6 mb-6 border-b border-white/10 bg-[#0b1222]/85 px-6 py-3 backdrop-blur sm:mx-0 sm:rounded-2xl sm:border sm:px-4">
        <div className="flex items-center justify-between text-sm">
          <span className="font-bold text-slate-300">
            {index + 1} / {total}
          </span>
          <span className="font-black text-[#f1c40f]">⚡ {xp} XP</span>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="h-full bg-[#f1c40f]"
            animate={{ width: `${((index + (revealed ? 1 : 0)) / total) * 100}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={q.id}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden rounded-3xl border border-white/10 bg-white/5"
        >
          {/* Faixa ilustrada: imagem real OU ilustração temática */}
          {q.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <div className="max-h-64 overflow-hidden">
              <img
                src={q.imageUrl}
                alt={q.imageAlt ?? q.question}
                className="kenburns max-h-64 w-full object-cover"
              />
            </div>
          ) : (
            <div
              className="flex h-28 items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${art.from}22, ${art.to}0d)`,
              }}
            >
              <span className="text-5xl drop-shadow-[0_4px_10px_rgba(0,0,0,0.4)]">
                {art.emoji}
              </span>
            </div>
          )}

          <div className="p-6 sm:p-8">
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-slate-400">
              {q.subject} · {q.topic} · {q.difficulty}
            </p>
            <h2 className="font-display text-2xl leading-snug text-white sm:text-3xl">
              {q.question}
            </h2>

            {/* Alternativas por tipo */}
            <div className="mt-7">
              {(q.type === "multiple_choice" ||
                q.type === "image_multiple_choice" ||
                q.type === "map_analysis" ||
                q.type === "diagram_analysis" ||
                q.type === "visual_interpretation") && (
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {(q.options ?? []).map((opt, i) => {
                    const st = optionState(opt, picked === opt);
                    return (
                      <button
                        key={opt}
                        disabled={revealed}
                        onClick={() => check(opt)}
                        className={`flex select-none items-center gap-3 rounded-2xl border px-4 py-5 text-left text-base font-semibold transition active:scale-[0.98] ${stateClasses[st]} ${
                          st === "idle" ? "hover:-translate-y-0.5" : ""
                        }`}
                      >
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-black/20 text-sm font-black">
                          {String.fromCharCode(65 + i)}
                        </span>
                        <span>{opt}</span>
                      </button>
                    );
                  })}
                </div>
              )}

              {q.type === "true_false" && (
                <div className="grid grid-cols-2 gap-3">
                  {tfOptions.map((opt) => {
                    const st = optionState(opt.value, picked === opt.value);
                    return (
                      <button
                        key={opt.value}
                        disabled={revealed}
                        onClick={() => check(opt.value)}
                        className={`flex select-none flex-col items-center gap-2 rounded-2xl border px-4 py-6 text-base font-bold transition active:scale-[0.98] ${stateClasses[st]} ${
                          st === "idle" ? "hover:-translate-y-0.5" : ""
                        }`}
                      >
                        <span className="text-3xl">{opt.icon}</span>
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
              )}

              {q.type === "short_answer" && (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!revealed && typed.trim()) check(typed.trim());
                  }}
                  className="flex flex-col gap-3 sm:flex-row"
                >
                  <input
                    value={typed}
                    onChange={(e) => setTyped(e.target.value)}
                    disabled={revealed}
                    placeholder="Digite sua resposta…"
                    className="flex-1 rounded-2xl border border-white/10 bg-[#0b1222]/60 px-5 py-4 text-base text-white outline-none transition placeholder:text-slate-500 focus:border-[#f1c40f]/60 focus:ring-2 focus:ring-[#f1c40f]/20"
                  />
                  {!revealed && (
                    <button
                      type="submit"
                      className="rounded-2xl bg-[#f1c40f] px-6 py-4 text-sm font-black uppercase tracking-wider text-[#0b1222] transition hover:-translate-y-0.5"
                    >
                      Responder
                    </button>
                  )}
                </form>
              )}
            </div>

            {/* Feedback */}
            {revealed && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6"
              >
                <p
                  className={`text-lg font-black ${
                    correct ? "text-emerald-300" : "text-rose-300"
                  }`}
                >
                  {correct ? "Correto! 🎉" : "Quase lá!"}
                </p>
                {!correct && (
                  <p className="mt-1 text-sm text-slate-300">
                    Resposta certa: <strong className="text-white">{q.answer}</strong>
                  </p>
                )}
                {q.explanation && (
                  <p className="mt-3 text-sm leading-relaxed text-slate-300">
                    {q.explanation}
                  </p>
                )}
                {q.cronica && (
                  <div className="mt-4 rounded-2xl border border-[#f1c40f]/20 bg-[#f1c40f]/5 p-5">
                    <p className="text-xs font-black uppercase tracking-widest text-[#f1c40f]">
                      Crônica do Guardião
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-slate-200">
                      {q.cronica}
                    </p>
                  </div>
                )}
                <button
                  onClick={next}
                  className="mt-6 w-full rounded-full bg-white/10 px-8 py-4 text-sm font-black uppercase tracking-wider text-white transition hover:bg-white/20 active:scale-95 sm:w-auto"
                >
                  {index + 1 >= total ? "Ver resultado" : "Próxima →"}
                </button>
              </motion.div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
