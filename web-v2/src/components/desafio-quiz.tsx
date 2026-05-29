"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import type { DesafioQuestion } from "@/db/queries/quiz";
import { awardDesafioArks, type ArksResult } from "@/app/desafio/actions";
import { playCorrect, playWrong, playFinish } from "@/lib/feedback";

const ARKS_BY_DIFFICULTY: Record<string, number> = { easy: 10, medium: 20, hard: 40 };

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
  const [bronze, setBronze] = useState(0);
  const [prata, setPrata] = useState(0);
  const [ouro, setOuro] = useState(0);
  const [finished, setFinished] = useState(false);
  const [saving, setSaving] = useState(false);
  const [persisted, setPersisted] = useState<ArksResult | null>(null);

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
      setXp((x) => x + (ARKS_BY_DIFFICULTY[q.difficulty] ?? 10));
      if (q.difficulty === "hard") setOuro((o) => o + 1);
      else if (q.difficulty === "medium") setPrata((p) => p + 1);
      else setBronze((b) => b + 1);
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
    const diamante = total > 0 && correctCount === total ? 1 : 0; // gabaritou
    const res = await awardDesafioArks({
      bronze,
      prata,
      ouro,
      diamante,
      correct: correctCount,
      total,
    });
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
    setBronze(0);
    setPrata(0);
    setOuro(0);
    setFinished(false);
    setSaving(false);
    setPersisted(null);
  }

  const correct = revealed && picked !== null && isAnswerCorrect(q, picked);

  if (finished) {
    const pct = Math.round((correctCount / total) * 100);
    const gabaritou = total > 0 && correctCount === total;
    const narracao =
      pct >= 80
        ? "Parabéns, jovem sábio! Você chegou ao fim desta jornada com honra. Tua dedicação honra o Autor de toda sabedoria — avança!"
        : pct >= 50
          ? "Bom trabalho! O saber cresce em você a cada passo. Continue firme na jornada."
          : "A jornada do saber tem tropeços, e o sábio se levanta — “O justo cai sete vezes e se levanta” (Pv 24:16). Tenta de novo!";
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mx-auto max-w-lg rounded-3xl border border-[#f1c40f]/20 bg-white/5 p-8 text-center sm:p-10"
      >
        <p className="text-xs font-extrabold uppercase tracking-[4px] text-[#f1c40f]">
          {pct >= 50 ? "Jornada concluída" : "Quase lá"}
        </p>
        <p className="font-display mt-3 text-6xl font-black text-white">{pct}%</p>
        <p className="mt-1 text-slate-300">
          {correctCount} de {total} corretas
        </p>

        <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-slate-200">
          {narracao}
        </p>

        {/* Arks ganhos nesta partida */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-sm font-bold">
          {bronze > 0 && (
            <span className="rounded-full bg-[#cd7f32]/15 px-3 py-1 text-[#e0a86b]">
              🥉 {bronze}
            </span>
          )}
          {prata > 0 && (
            <span className="rounded-full bg-slate-300/15 px-3 py-1 text-slate-200">
              🥈 {prata}
            </span>
          )}
          {ouro > 0 && (
            <span className="rounded-full bg-[#f1c40f]/15 px-3 py-1 text-[#f1c40f]">
              🥇 {ouro}
            </span>
          )}
          {gabaritou && (
            <span className="rounded-full bg-cyan-300/15 px-3 py-1 text-cyan-200">
              💎 1
            </span>
          )}
        </div>

        {saving && (
          <p className="mt-5 text-sm text-slate-400">Salvando suas conquistas…</p>
        )}

        {persisted?.persisted && (
          <div className="mt-6 space-y-3">
            {persisted.leveledUp && (
              <p className="font-display text-xl text-[#f1c40f]">
                ⭐ Subiu para o nível {persisted.level}!
              </p>
            )}
            <div className="rounded-2xl border border-[#f1c40f]/20 bg-[#f1c40f]/5 p-4">
              <p className="text-sm text-slate-200">
                Total: <strong className="text-white">{persisted.totalArks} Arks</strong>{" "}
                · Nível <strong className="text-white">{persisted.level}</strong>
              </p>
            </div>
            <div className="rounded-2xl border border-[#f1c40f]/40 bg-gradient-to-br from-[#f1c40f]/15 to-transparent p-5">
              <p className="text-xs font-black uppercase tracking-widest text-[#f1c40f]">
                🏆 Sua posição no ranking
              </p>
              <p className="font-display mt-1 text-4xl text-white">#{persisted.rankPos}</p>
              <p className="text-sm text-slate-300">de {persisted.rankTotal} jogadores</p>
            </div>
          </div>
        )}

        {!authed && (
          <p className="mt-5 text-sm text-slate-400">
            <Link href="/signup" className="font-bold text-[#f1c40f] hover:underline">
              Crie uma conta
            </Link>{" "}
            para salvar seus Arks e entrar no ranking.
          </p>
        )}

        <button
          onClick={restart}
          className="mt-8 w-full rounded-full bg-[#f1c40f] px-8 py-4 text-sm font-black uppercase tracking-wider text-[#0b1222] transition active:scale-95 hover:-translate-y-0.5 sm:w-auto"
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
          <span className="font-black text-[#f1c40f]">⚜️ {xp} Arks</span>
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
