"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import type { DesafioQuestion } from "@/db/queries/quiz";
import { awardDesafioArks, type ArksResult } from "@/app/desafio/actions";
import { playCorrect, playWrong, playFinish } from "@/lib/feedback";
import { PremiacaoOverlay, type RevealItem } from "@/components/premiacao-overlay";
import { GuardianAvatar } from "@/components/guardian-avatar";
import { sessionScore, type ItemResult, type TriScore } from "@/lib/tri";
import { FloatingCelebration } from "@/components/floating-celebration";
import { GameTopBar } from "@/components/game-topbar";
import { roundOf } from "@/lib/quiz-round";
import type { Rarity } from "@/lib/collection";

// Desafio dos Sábios é a trilha de Lógica → guardião Aion narra.
const DESAFIO_GUARDIAN = "aion";

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

function isAnswerCorrect(q: DesafioQuestion, value: string) {
  // Resposta digitada: tolera maiúsculas/acentos e acerto parcial.
  if (q.type === "short_answer") {
    if (normalize(value) === normalize(q.answer)) return true;
    return normalize(value).length > 2 && normalize(q.answer).includes(normalize(value));
  }
  // Verdadeiro/Falso: comparação normalizada (true/false/Verdadeiro/Falso).
  if (q.type === "true_false") {
    return normalize(value) === normalize(q.answer);
  }
  // Múltipla escolha (incl. visuais): a opção correta é a que bate EXATAMENTE com a
  // resposta — preserva maiúscula, acento e pontuação (essencial em ortografia/pontuação).
  return value.trim() === q.answer.trim();
}

function ArkPill({ label, n, color }: { label: string; n: number; color: string }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-3 py-1"
      style={{ backgroundColor: `${color}1a`, color }}
    >
      <span className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
      {label} {n}
    </span>
  );
}

export function DesafioQuiz({
  questions,
  authed,
}: {
  questions: DesafioQuestion[];
  authed: boolean;
}) {
  // Sem random no render inicial (evita mismatch de hidratação): o servidor já
  // entrega o banco embaralhado (ordem + alternativas). Aqui só recortamos 30
  // de forma determinística; a re-aleatorização acontece ao reiniciar (cliente).
  const [deck, setDeck] = useState(() => questions.slice(0, 30));

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
  const [reveals, setReveals] = useState<RevealItem[]>([]);
  // TRI: histórico de itens (dificuldade/tipo/acerto) p/ estimar a habilidade.
  const [items, setItems] = useState<ItemResult[]>([]);
  const [tri, setTri] = useState<TriScore | null>(null);
  // Fluxo pós-jogo: o botão "Continuar" libera após uns segundos (lê-se o resultado).
  const [canContinue, setCanContinue] = useState(false);
  const router = useRouter();

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
    const ok = isAnswerCorrect(q, value);
    setItems((arr) => [...arr, { difficulty: q.difficulty, type: q.type, correct: ok }]);
    setPicked(value);
    setRevealed(true);
    if (ok) {
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
    setTimeout(() => setCanContinue(true), 4000);
    const score = sessionScore(items);
    setTri(score);
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
      points: score.points,
    });
    setSaving(false);
    setPersisted(res);

    // Monta a fila de premiação (nível + orbes/medalhas recém-concedidos).
    if (res.persisted) {
      const queue: RevealItem[] = [];
      if (res.leveledUp) queue.push({ kind: "level", level: res.level });
      for (const g of res.granted) {
        if (g.kind === "orb") {
          queue.push({ kind: "orb", key: g.key, rarity: (g.rarity ?? "terrestre") as Rarity });
        } else {
          queue.push({ kind: "medal", key: g.key });
        }
      }
      if (queue.length > 0) setReveals(queue);
    }
  }

  function restart() {
    setDeck(roundOf(questions, 30));
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
    setReveals([]);
    setItems([]);
    setTri(null);
    setCanContinue(false);
  }

  const correct = revealed && picked !== null && isAnswerCorrect(q, picked);

  if (finished) {
    const pct = Math.round((correctCount / total) * 100);
    const gabaritou = total > 0 && correctCount === total;
    const narracao =
      pct >= 80
        ? "Parabéns, jovem sábio! Você chegou ao fim desta jornada com honra. Tua dedicação honra o Autor de toda sabedoria. Avança!"
        : pct >= 50
          ? "Bom trabalho! O saber cresce em você a cada passo. Continue firme na jornada."
          : "A jornada do saber tem tropeços, e o sábio se levanta. “O justo cai sete vezes e se levanta” (Pv 24:16). Tenta de novo!";
    return (
      <>
      <div className="mx-auto max-w-lg">
        <GameTopBar inProgress={false} />
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mx-auto max-w-lg rounded-3xl border-2 border-slate-200 bg-white p-8 text-center shadow-lg sm:p-10"
      >
        <p className="text-xs font-extrabold uppercase tracking-[4px] text-[#b8860b]">
          {pct >= 50 ? "Jornada concluída" : "Quase lá"}
        </p>
        <p className="font-display mt-3 text-6xl font-black text-slate-900">{pct}%</p>
        <p className="mt-1 text-slate-600">
          {correctCount} de {total} corretas
        </p>

        <div className="mx-auto mt-5 flex max-w-md items-center gap-3 rounded-2xl border border-slate-200 bg-[#f8fafc] p-3 text-left">
          <GuardianAvatar name={DESAFIO_GUARDIAN} size={56} />
          <p className="text-sm leading-relaxed text-slate-700">{narracao}</p>
        </div>

        {/* Arks ganhos nesta partida */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-sm font-bold">
          {bronze > 0 && <ArkPill label="Bronze" n={bronze} color="#b87333" />}
          {prata > 0 && <ArkPill label="Prata" n={prata} color="#64748b" />}
          {ouro > 0 && <ArkPill label="Ouro" n={ouro} color="#d4a017" />}
          {gabaritou && <ArkPill label="Diamante" n={1} color="#0891b2" />}
        </div>

        {/* Pontuação por TRI (Teoria de Resposta ao Item) — sem fator tempo */}
        {tri && (
          <div className="mx-auto mt-5 max-w-md rounded-2xl border-2 border-[#f1c40f]/30 bg-[#f1c40f]/8 p-4">
            <p className="text-xs font-black uppercase tracking-widest text-[#b8860b]">
              Pontuação (TRI)
            </p>
            <p className="font-display mt-1 text-4xl text-slate-900">{tri.points}</p>
            <p className="text-xs text-slate-400">
              acertar questões difíceis vale mais · habilidade {tri.abilityPct}%
            </p>
          </div>
        )}

        {saving && (
          <p className="mt-5 text-sm text-slate-400">Salvando suas conquistas…</p>
        )}

        {persisted?.persisted && (
          <div className="mt-6 space-y-3">
            {persisted.leveledUp && (
              <p className="font-display text-xl text-[#b8860b]">
                ★ Subiu para o nível {persisted.level}!
              </p>
            )}
            <div className="rounded-2xl border-2 border-[#f1c40f]/20 bg-[#f1c40f]/8 p-4">
              <p className="text-sm text-slate-700">
                Total: <strong className="text-slate-900">{persisted.totalArks} Arks</strong>{" "}
                · Nível <strong className="text-slate-900">{persisted.level}</strong>
              </p>
            </div>
            <div className="rounded-2xl border-2 border-[#f1c40f]/40 bg-[#f1c40f]/8 p-5">
              <p className="text-xs font-black uppercase tracking-widest text-[#b8860b]">
                Sua posição no ranking
              </p>
              <p className="font-display mt-1 text-4xl text-slate-900">#{persisted.rankPos}</p>
              <p className="text-sm text-slate-600">de {persisted.rankTotal} jogadores</p>
            </div>
          </div>
        )}

        {!authed && (
          <p className="mt-5 text-sm text-slate-500">
            <Link href="/signup" className="font-bold text-[#b8860b] hover:underline">
              Crie uma conta
            </Link>{" "}
            para salvar seus Arks e entrar no ranking.
          </p>
        )}

        <div className="mt-8 flex flex-col items-center gap-3">
          {canContinue ? (
            <button
              onClick={() => router.push("/colecao")}
              className="w-full rounded-full bg-[#f1c40f] px-8 py-4 text-sm font-black uppercase tracking-wider text-[#0b1222] transition active:scale-95 hover:-translate-y-0.5 sm:w-auto"
            >
              Continuar para a Coleção →
            </button>
          ) : (
            <p className="text-xs text-slate-500">Leia seu resultado e a crônica…</p>
          )}
          <button
            onClick={restart}
            className="text-sm font-bold text-slate-500 underline-offset-2 transition hover:text-[#b8860b] hover:underline"
          >
            Jogar novamente
          </button>
        </div>
      </motion.div>
      {reveals.length > 0 && (
        <PremiacaoOverlay
          items={reveals}
          guardian={DESAFIO_GUARDIAN}
          onClose={() => setReveals([])}
        />
      )}
      </>
    );
  }

  const tfOptions = [
    { label: "Verdadeiro", value: "true", icon: "✓" },
    { label: "Falso", value: "false", icon: "✗" },
  ];

  function optionState(matchValue: string, isThisPicked: boolean) {
    if (!revealed) return "idle";
    if (isAnswerCorrect(q, matchValue)) return "correct";
    if (isThisPicked) return "wrong";
    return "dim";
  }

  const stateClasses: Record<string, string> = {
    idle: "border-2 border-slate-200 bg-white text-slate-800 hover:border-[#f1c40f]/60 hover:bg-[#f1c40f]/5",
    correct: "border-2 border-emerald-400 bg-emerald-50 text-emerald-800",
    wrong: "border-2 border-rose-400 bg-rose-50 text-rose-700",
    dim: "border-2 border-slate-100 bg-slate-50 text-slate-400",
  };

  return (
    <div className="mx-auto max-w-2xl">
      <GameTopBar inProgress={!finished} />
      {/* HUD fixo (estilo jogo) */}
      <div className="sticky top-0 z-20 -mx-6 mb-6 border-b border-slate-200 bg-white/90 px-6 py-3 backdrop-blur sm:mx-0 sm:rounded-2xl sm:border sm:px-4 sm:shadow-sm">
        <div className="flex items-center justify-between text-sm">
          <span className="font-bold text-slate-500">
            {index + 1} / {total}
          </span>
          <span className="font-black text-[#b8860b]">{xp} Arks</span>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-200">
          <motion.div
            className="h-full bg-gradient-to-r from-[#f1c40f] to-[#e0a417]"
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
          className="overflow-hidden rounded-3xl border-2 border-slate-200 bg-white shadow-sm"
        >
          {/* Faixa ilustrada: imagem real OU ilustração temática */}
          {q.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <div className="flex justify-center bg-slate-100 p-2 sm:p-3">
              <img
                src={q.imageUrl}
                alt={q.imageAlt ?? q.question}
                className="max-h-72 w-full rounded-xl object-contain sm:max-h-80"
              />
            </div>
          ) : (
            <div
              className="h-2.5"
              style={{
                background: `linear-gradient(135deg, ${art.from}, ${art.to})`,
              }}
            />
          )}

          <div className="p-6 sm:p-8">
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-slate-400">
              {q.subject} · {q.topic} · {q.difficulty}
            </p>
            <h2 className="font-display text-2xl leading-snug text-slate-900 sm:text-3xl">
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
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-sm font-black text-slate-600">
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
                    className="flex-1 rounded-2xl border-2 border-slate-200 bg-white px-5 py-4 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#f1c40f] focus:ring-2 focus:ring-[#f1c40f]/20"
                  />
                  {!revealed && (
                    <button
                      type="submit"
                      className="rounded-2xl bg-gradient-to-br from-[#f1c40f] to-[#e0a417] px-6 py-4 text-sm font-black uppercase tracking-wider text-[#3b2f00] transition hover:-translate-y-0.5"
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
                className="relative mt-6"
              >
                {correct && <FloatingCelebration />}
                <p
                  className={`relative z-10 text-lg font-black ${
                    correct ? "text-emerald-600" : "text-rose-600"
                  }`}
                >
                  {correct ? "Correto!" : "Quase lá!"}
                </p>
                {!correct && (
                  <p className="mt-1 text-sm text-slate-600">
                    Resposta certa: <strong className="text-slate-900">{q.answer}</strong>
                  </p>
                )}
                {q.explanation && (
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">
                    {q.explanation}
                  </p>
                )}
                {q.cronica && (
                  <div className="mt-4 rounded-2xl border-2 border-[#f1c40f]/30 bg-[#f1c40f]/8 p-5">
                    <p className="text-xs font-black uppercase tracking-widest text-[#b8860b]">
                      Crônica do Guardião
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-slate-700">
                      {q.cronica}
                    </p>
                  </div>
                )}
                <button
                  onClick={next}
                  className="mt-6 w-full rounded-full bg-slate-900 px-8 py-4 text-sm font-black uppercase tracking-wider text-white transition hover:bg-slate-700 active:scale-95 sm:w-auto"
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
