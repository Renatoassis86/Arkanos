"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

/** Equipa um título (desequipa os demais). Só títulos que o usuário possui. */
export async function equipTitle(key: string): Promise<{ ok: boolean; error?: string }> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: "Não autenticado" };

  const { error } = await supabase.rpc("equip_title", { p_key: key });
  if (error) return { ok: false, error: error.message };

  revalidatePath("/colecao");
  revalidatePath("/jogos");
  return { ok: true };
}
