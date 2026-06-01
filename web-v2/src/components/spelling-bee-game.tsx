"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import type { SpellingWord } from "@/db/queries/spelling";
import { awardSpellingArks, type ArksResult } from "@/app/spelling-bee/actions";
import { playCorrect, playWrong, playFinish } from "@/lib/feedback";
import { PremiacaoOverlay, type RevealItem } from "@/components/premiacao-overlay";
import { GuardianAvatar } from "@/components/guardian-avatar";
import { sessionScore, type ItemResult, type TriScore } from "@/lib/tri";
import { FloatingCelebration } from "@/components/floating-celebration";
import type { Rarity } from "@/lib/collection";

// Spelling Bee é a trilha de Gramática → guardiã Lyra narra.
const SPELLING_GUARDIAN = "lyra";

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
    .replace(/[̀-ͯ]/g, "");
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Esconde a palavra-alvo no exemplo (vira "______"). */
function hideWord(example: string, word: string) {
  if (!example) return "";
  const re = new RegExp(word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi");
  return example.replace(re, "______");
}

function speak(text: string) {
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  const synth = window.speechSynthesis;
  synth.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "en-US";
  u.rate = 0.85;
  synth.speak(u);
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

export function SpellingBeeGame({
  words,
  authed,
}: {
  words: SpellingWord[];
  authed: boolean;
}) {
  const [deck, setDeck] = useState(words);
  const [index, setIndex] = useState(0);
  const [typed, setTyped] = useState("");
  const [revealed, setRevealed] = useState(false);
  const [lastCorrect, setLastCorrect] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [xp, setXp] = useState(0);
  const [bronze, setBronze] = useState(0);
  const [prata, setPrata] = useState(0);
  const [ouro, setOuro] = useState(0);
  const [finished, setFinished] = useState(false);
  const [saving, setSaving] = useState(false);
  const [persisted, setPersisted] = useState<ArksResult | null>(null);
  const [reveals, setReveals] = useState<RevealItem[]>([]);
  const [items, setItems] = useState<ItemResult[]>([]);
  const [tri, setTri] = useState<TriScore | null>(null);
  const [canContinue, setCanContinue] = useState(false);
  const router = useRouter();

  const q = deck[index];
  const total = deck.length;

  // Fala a palavra a cada nova questão (o usuário pode repetir com o botão).
  useEffect(() => {
    if (!finished && q) speak(q.palavra);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, finished]);

  if (deck.length === 0) {
    return (
      <p className="text-center text-slate-300">Nenhuma palavra disponível ainda.</p>
    );
  }

  function check() {
    if (revealed || !typed.trim()) return;
    const ok = norm(typed) === norm(q.palavra);
    setItems((arr) => [...arr, { difficulty: q.dificuldade, type: "spelling", correct: ok }]);
    setRevealed(true);
    setLastCorrect(ok);
    if (ok) {
      setCorrectCount((c) => c + 1);
      setXp((x) => x + (ARKS_BY_DIFFICULTY[q.dificuldade] ?? 10));
      if (q.dificuldade === "dificil" || q.dificuldade === "hard") setOuro((o) => o + 1);
      else if (q.dificuldade === "medio" || q.dificuldade === "medium") setPrata((p) => p + 1);
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
    const diamante = total > 0 && correctCount === total ? 1 : 0;
    const res = await awardSpellingArks({
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
    setDeck(shuffle(words));
    setIndex(0);
    setTyped("");
    setRevealed(false);
    setLastCorrect(false);
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

  if (finished) {
    const pct = Math.round((correctCount / total) * 100);
    const gabaritou = total > 0 && correctCount === total;
    const narracao =
      pct >= 80
        ? "Esplêndido! Lyra sorri: tua escrita floresce. Cada palavra bem soletrada é uma vitória da Verdade e da Beleza."
        : pct >= 50
          ? "Bom trabalho! A arte das letras se firma em ti a cada palavra. Continue praticando!"
          : "A jornada das letras tem tropeços, e o sábio se levanta. “O justo cai sete vezes e se levanta” (Pv 24:16). Tente de novo!";
    return (
      <>
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
            {correctCount} de {total} palavras
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-sm font-bold">
            {bronze > 0 && <ArkPill label="Bronze" n={bronze} color="#b87333" />}
            {prata > 0 && <ArkPill label="Prata" n={prata} color="#64748b" />}
            {ouro > 0 && <ArkPill label="Ouro" n={ouro} color="#d4a017" />}
            {gabaritou && <ArkPill label="Diamante" n={1} color="#0891b2" />}
          </div>

          {tri && (
            <div className="mx-auto mt-5 max-w-md rounded-2xl border-2 border-[#f1c40f]/30 bg-[#f1c40f]/8 p-4">
              <p className="text-xs font-black uppercase tracking-widest text-[#b8860b]">
                Pontuação (TRI)
              </p>
              <p className="font-display mt-1 text-4xl text-slate-900">{tri.points}</p>
              <p className="text-xs text-slate-400">
                palavras difíceis valem mais · habilidade {tri.abilityPct}%
              </p>
            </div>
          )}

          <div className="mx-auto mt-5 flex max-w-md items-center gap-3 rounded-2xl border border-slate-200 bg-[#f8fafc] p-3 text-left">
            <GuardianAvatar name={SPELLING_GUARDIAN} size={56} ring="#ec4899" />
            <p className="text-sm leading-relaxed text-slate-700">{narracao}</p>
          </div>

          {saving && <p className="mt-5 text-sm text-slate-400">Salvando suas conquistas…</p>}

          {persisted?.persisted && (
            <div className="mt-6 space-y-3">
              {persisted.leveledUp && (
                <p className="font-display text-xl text-[#b8860b]">
                  ★ Subiu para o nível {persisted.level}!
                </p>
              )}
              <div className="rounded-2xl border-2 border-[#f1c40f]/20 bg-[#f1c40f]/8 p-4">
                <p className="text-sm text-slate-700">
                  Total: <strong className="text-slate-900">{persisted.totalArks} Arks</strong> · Nível{" "}
                  <strong className="text-slate-900">{persisted.level}</strong>
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
                className="w-full rounded-full bg-gradient-to-br from-[#f1c40f] to-[#e0a417] px-8 py-4 text-sm font-black uppercase tracking-wider text-[#3b2f00] transition active:scale-95 hover:-translate-y-0.5 sm:w-auto"
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
            guardian={SPELLING_GUARDIAN}
            onClose={() => setReveals([])}
          />
        )}
      </>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      {/* HUD */}
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
          className="overflow-hidden rounded-3xl border-2 border-slate-200 bg-white p-6 shadow-sm sm:p-8"
        >
          <p className="mb-1 text-xs font-bold uppercase tracking-widest text-slate-400">
            Ouça e soletre · {q.dificuldade}
          </p>

          {/* Botão de ouvir */}
          <button
            onClick={() => speak(q.palavra)}
            className="mt-2 flex w-full items-center justify-center gap-3 rounded-2xl border-2 border-pink-300 bg-pink-50 px-6 py-6 text-lg font-black text-pink-600 transition active:scale-[0.98] hover:bg-pink-100"
          >
            ♪ Ouvir a palavra
          </button>

          {/* Pistas */}
          <div className="mt-5 space-y-2 text-sm">
            <p className="text-slate-700">
              <span className="font-bold text-slate-500">Significado:</span> {q.significado}
            </p>
            {q.exemplo && (
              <p className="text-slate-700">
                <span className="font-bold text-slate-500">Exemplo:</span>{" "}
                <em>{hideWord(q.exemplo, q.palavra)}</em>
              </p>
            )}
            {q.ipa && (
              <p className="text-slate-500">
                <span className="font-bold">IPA:</span> {q.ipa}
              </p>
            )}
          </div>

          {/* Campo de soletração */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!revealed) check();
            }}
            className="mt-6 flex flex-col gap-3 sm:flex-row"
          >
            <input
              value={typed}
              onChange={(e) => setTyped(e.target.value)}
              disabled={revealed}
              autoFocus
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck={false}
              placeholder="Soletre a palavra…"
              className="flex-1 rounded-2xl border-2 border-slate-200 bg-white px-5 py-4 text-center text-lg font-bold tracking-[2px] text-slate-900 outline-none transition placeholder:tracking-normal placeholder:text-slate-400 focus:border-[#f1c40f] focus:ring-2 focus:ring-[#f1c40f]/20"
            />
            {!revealed && (
              <button
                type="submit"
                className="rounded-2xl bg-gradient-to-br from-[#f1c40f] to-[#e0a417] px-6 py-4 text-sm font-black uppercase tracking-wider text-[#3b2f00] transition hover:-translate-y-0.5"
              >
                Conferir
              </button>
            )}
          </form>

          {/* Feedback */}
          {revealed && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative mt-6"
            >
              {lastCorrect && <FloatingCelebration />}
              <p
                className={`relative z-10 text-lg font-black ${
                  lastCorrect ? "text-emerald-600" : "text-rose-600"
                }`}
              >
                {lastCorrect ? "Correto!" : "Quase lá!"}
              </p>
              <p className="mt-1 text-sm text-slate-600">
                Grafia correta:{" "}
                <strong className="text-slate-900 tracking-[2px]">{q.palavra}</strong>
              </p>
              <button
                onClick={next}
                className="mt-6 w-full rounded-full bg-slate-900 px-8 py-4 text-sm font-black uppercase tracking-wider text-white transition hover:bg-slate-700 active:scale-95 sm:w-auto"
              >
                {index + 1 >= total ? "Ver resultado" : "Próxima →"}
              </button>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
