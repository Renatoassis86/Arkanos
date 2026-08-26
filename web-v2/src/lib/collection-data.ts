import { createClient } from "@/lib/supabase/server";
import type { Rarity } from "@/lib/collection";
import { arksForLevel, MAX_LEVEL } from "@/lib/collection";
import { friendlyNameFromEmail } from "@/lib/student-auth";

type Supa = Awaited<ReturnType<typeof createClient>>;

export type Hud = {
  userId: string;
  displayName: string;
  avatarUrl: string | null;
  email: string | null;
  level: number;
  totalArks: number;
  highScore: number;
  maxStreak: number;
  arks: { bronze: number; prata: number; ouro: number; diamante: number };
  serie: string | null;
  dataNascimento: string | null;
  streak: number;
  longestStreak: number;
  /** Progresso dentro do nível atual rumo ao próximo (0–100). */
  levelProgress: number;
  arksIntoLevel: number;
  arksForNext: number;
  rankPos: number;
  rankTotal: number;
};

/** Perfil + Arks + posição no ranking. Null se não autenticado. */
export async function getHud(supabase: Supa): Promise<Hud | null> {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: p } = await supabase
    .from("profiles")
    .select(
      "display_name, avatar_url, serie, data_nascimento, total_xp, level, high_score, max_streak, arks_bronze, arks_prata, arks_ouro, arks_diamante, streak_count, longest_streak",
    )
    .eq("id", user.id)
    .single();

  const { data: rk } = await supabase.rpc("my_rank");
  const rank = Array.isArray(rk) ? rk[0] : rk;

  const level = p?.level ?? 1;
  const totalArks = p?.total_xp ?? 0;
  const highScore = p?.high_score ?? rank?.high_score ?? totalArks;
  const maxStreak = p?.max_streak ?? rank?.max_streak ?? 0;

  const floor = arksForLevel(level);
  const ceil = level >= MAX_LEVEL ? floor : arksForLevel(level + 1);
  const span = Math.max(1, ceil - floor);
  const into = Math.max(0, totalArks - floor);

  return {
    userId: user.id,
    displayName: p?.display_name || friendlyNameFromEmail(user.email),
    avatarUrl: p?.avatar_url ?? null,
    email: user.email ?? null,
    level,
    totalArks,
    highScore,
    maxStreak,
    arks: {
      bronze: p?.arks_bronze ?? 0,
      prata: p?.arks_prata ?? 0,
      ouro: p?.arks_ouro ?? 0,
      diamante: p?.arks_diamante ?? 0,
    },
    serie: p?.serie ?? null,
    dataNascimento: p?.data_nascimento ?? null,
    streak: p?.streak_count ?? 0,
    longestStreak: p?.longest_streak ?? 0,
    levelProgress: level >= MAX_LEVEL ? 100 : Math.min(100, Math.round((into / span) * 100)),
    arksIntoLevel: into,
    arksForNext: level >= MAX_LEVEL ? 0 : ceil - totalArks,
    rankPos: Number(rank?.rank_pos ?? 0),
    rankTotal: Number(rank?.rank_total ?? 0),
  };
}

export type Owned = {
  orbs: Map<string, Rarity>;
  achievements: Set<string>;
  titles: { key: string; equipped: boolean }[];
};

/** O que o usuário conquistou (orbes c/ raridade, medalhas, títulos). */
export async function getOwnedCollection(supabase: Supa, userId: string): Promise<Owned> {
  const [orbsRes, achRes, titlesRes] = await Promise.all([
    supabase.from("user_orbs").select("orb_key, rarity").eq("user_id", userId),
    supabase.from("user_achievements").select("achievement_key").eq("user_id", userId),
    supabase.from("user_titles").select("title_key, equipped").eq("user_id", userId),
  ]);

  const orbs = new Map<string, Rarity>();
  for (const r of orbsRes.data ?? []) orbs.set(r.orb_key, r.rarity as Rarity);

  return {
    orbs,
    achievements: new Set((achRes.data ?? []).map((r) => r.achievement_key)),
    titles: (titlesRes.data ?? []).map((r) => ({ key: r.title_key, equipped: r.equipped })),
  };
}

export type LeaderRow = {
  rank: number;
  userId: string;
  displayName: string;
  level: number;
  totalArks: number;
  highScore: number;
  maxStreak: number;
};

export type DailyProgress = { sessions: number; correct: number; games: number };

/** Progresso das missões diárias, computado dos SESSION_FINISHED de hoje (UTC). */
export async function getDailyProgress(supabase: Supa, userId: string): Promise<DailyProgress> {
  const start = new Date();
  start.setUTCHours(0, 0, 0, 0);

  const { data } = await supabase
    .from("game_events")
    .select("game, payload")
    .eq("user_id", userId)
    .eq("type", "SESSION_FINISHED")
    .gte("created_at", start.toISOString());

  const games = new Set<string>();
  let sessions = 0;
  let correct = 0;
  for (const e of (data ?? []) as { game: string; payload: { correct?: number } | null }[]) {
    sessions++;
    games.add(e.game);
    correct += Number(e.payload?.correct ?? 0);
  }
  return { sessions, correct, games: games.size };
}

export type RecentSession = {
  game: string;
  correct: number;
  total: number;
  points: number;
  at: string;
};

/** Últimos desafios concluídos do aluno (do event-sourcing game_events). */
export async function getRecentSessions(
  supabase: Supa,
  userId: string,
  limit = 6,
): Promise<RecentSession[]> {
  const { data } = await supabase
    .from("game_events")
    .select("game, payload, xp_delta, created_at")
    .eq("user_id", userId)
    .eq("type", "SESSION_FINISHED")
    .order("created_at", { ascending: false })
    .limit(limit);
  return (
    (data ?? []) as {
      game: string;
      payload: { correct?: number; total?: number } | null;
      xp_delta: number;
      created_at: string;
    }[]
  ).map((e) => ({
    game: e.game,
    correct: Number(e.payload?.correct ?? 0),
    total: Number(e.payload?.total ?? 0),
    points: e.xp_delta,
    at: e.created_at,
  }));
}

export async function getLeaderboard(supabase: Supa, limit = 20): Promise<LeaderRow[]> {
  const { data } = await supabase.rpc("leaderboard_top", { p_limit: limit });
  return (data ?? []).map(
    (r: {
      rank: number;
      user_id: string;
      display_name: string;
      level: number;
      total_xp: number;
      high_score?: number;
      max_streak?: number;
    }) => ({
      rank: Number(r.rank),
      userId: r.user_id,
      displayName: r.display_name,
      level: r.level,
      totalArks: r.total_xp,
      highScore: Number(r.high_score ?? r.total_xp ?? 0),
      maxStreak: Number(r.max_streak ?? 0),
    }),
  );
}
