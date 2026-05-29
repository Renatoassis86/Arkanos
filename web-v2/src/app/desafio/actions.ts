"use server";

import { createClient } from "@/lib/supabase/server";

export type AwardResult =
  | { persisted: false; error?: string }
  | { persisted: true; totalXp: number; level: number; leveledUp: boolean };

/**
 * Concede XP da sessão de Desafio ao usuário logado (motor unificado).
 * Chama a função SQL award_xp (event-sourced + atualização atômica do profile).
 * Usuários não logados não persistem — só jogam localmente.
 */
export async function awardDesafioXp(input: {
  correct: number;
  total: number;
  xp: number;
}): Promise<AwardResult> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { persisted: false };

  const { data, error } = await supabase.rpc("award_xp", {
    p_game: "desafio",
    p_type: "SESSION_FINISHED",
    p_payload: { correct: input.correct, total: input.total },
    p_xp: Math.max(0, Math.floor(input.xp)),
  });

  if (error) return { persisted: false, error: error.message };

  const row = Array.isArray(data) ? data[0] : data;
  return {
    persisted: true,
    totalXp: row.total_xp,
    level: row.level,
    leveledUp: row.leveled_up,
  };
}
