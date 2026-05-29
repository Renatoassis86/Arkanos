import { NextResponse } from "next/server";
import { listSubjects } from "@/db/queries/quiz";

// Sempre dinâmico: faz query ao banco a cada request.
export const dynamic = "force-dynamic";

/**
 * Smoke test da Fase 0: confirma conexão Drizzle → Supabase e leitura de conteúdo.
 * GET /api/smoke
 */
export async function GET() {
  try {
    const subjects = await listSubjects();
    return NextResponse.json({ ok: true, count: subjects.length, subjects });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : String(err) },
      { status: 500 },
    );
  }
}
