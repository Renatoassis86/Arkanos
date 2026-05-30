"use server";

import { createClient } from "@/lib/supabase/server";
import type { ArksResult, GrantedReward } from "@/app/desafio/actions";

export type { ArksResult } from "@/app/desafio/actions";

/**
 * Concede Arks ao FINALIZAR o Spelling Bee (Lyra · Gramática). Mesmo motor do
 * Desafio (RPC award_arks), com p_game="spelling-bee" → orbes da Gramática.
 */
export async function awardSpellingArks(input: {
  bronze: number;
  prata: number;
  ouro: number;
  diamante: number;
  correct: number;
  total: number;
  points: number;
}): Promise<ArksResult> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { persisted: false };

  const { data, error } = await supabase.rpc("award_arks", {
    p_game: "spelling-bee",
    p_payload: { correct: input.correct, total: input.total },
    p_bronze: input.bronze,
    p_prata: input.prata,
    p_ouro: input.ouro,
    p_diamante: input.diamante,
    p_points: input.points,
  });

  if (error) return { persisted: false, error: error.message };

  const r = Array.isArray(data) ? data[0] : data;
  return {
    persisted: true,
    totalArks: r.total_arks,
    level: r.lvl,
    leveledUp: r.leveled_up,
    rankPos: Number(r.rank_pos),
    rankTotal: Number(r.rank_total),
    granted: (r.granted ?? []) as GrantedReward[],
  };
}
