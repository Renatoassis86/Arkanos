import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { logout } from "../../(auth)/actions";
import { ageFromBirthdate, recommendedTrack, TRACK_LABELS } from "@/lib/trivium";

export default async function JogosPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Autorização definitiva (além da checagem otimista do proxy).
  if (!user) {
    redirect("/login?next=/jogos");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("display_name, serie, data_nascimento")
    .eq("id", user.id)
    .single();

  const age = ageFromBirthdate(profile?.data_nascimento);
  const track = recommendedTrack(age);

  return (
    <main className="hero-aurora relative flex min-h-screen flex-1 flex-col items-center justify-center gap-6 overflow-hidden bg-[#0b1222] p-6 text-center">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 0%, rgba(241,196,15,0.12), transparent 70%)",
        }}
      />
      <div className="relative z-10 flex flex-col items-center gap-6">
        <h1 className="font-display text-4xl text-white">
          Bem-vindo(a), {profile?.display_name ?? user.email}!
        </h1>
        <p className="text-lg text-slate-300">
          Trilha recomendada do Trivium:{" "}
          <strong className="text-[#f1c40f]">{TRACK_LABELS[track]}</strong>
          {age !== null ? ` (${age} anos)` : ""}
        </p>

        <Link
          href="/desafio"
          className="rounded-full bg-[#f1c40f] px-8 py-4 text-sm font-black uppercase tracking-wider text-[#0b1222] transition hover:-translate-y-0.5"
        >
          Bancos de Questões →
        </Link>

        <form action={logout}>
          <button
            type="submit"
            className="rounded-full border border-white/20 px-6 py-3 text-sm font-bold uppercase tracking-wider text-slate-200 transition hover:bg-white/10"
          >
            Sair
          </button>
        </form>
      </div>
    </main>
  );
}
