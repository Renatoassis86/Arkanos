"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { synthEmail, synthPassword, slug, loginKey, parseBirthdate } from "@/lib/student-auth";

/**
 * Cadastro infantil: nome + último sobrenome + data de nascimento + série.
 * Cria a conta já confirmada (admin) e faz login automático.
 *
 * Cada aluno precisa de conta própria (é a chave primária de todo o
 * histórico: métricas, avaliações, ranking, pontuação). Se já existe
 * outro aluno com o mesmo nome+sobrenome, o e-mail interno ganha um
 * sufixo com a data de nascimento para nunca colidir com uma conta
 * alheia.
 */
export async function signup(formData: FormData) {
  const nome = String(formData.get("nome") ?? "").trim();
  const sobrenome = String(formData.get("sobrenome") ?? "").trim();
  const serie = String(formData.get("serie") ?? "").trim();
  const dataNascimentoRaw = String(formData.get("data_nascimento") ?? "").trim();

  if (!slug(nome) || !slug(sobrenome) || !serie) {
    redirect(
      `/signup?error=${encodeURIComponent("Preencha nome, sobrenome e série.")}`,
    );
  }

  const nascimento = parseBirthdate(dataNascimentoRaw);
  if (!nascimento) {
    redirect(
      `/signup?error=${encodeURIComponent("Data de nascimento inválida. Use o formato DD/MM/AAAA, ex: 15/07/1986.")}`,
    );
  }

  const admin = createAdminClient();
  const key = loginKey(nome, sobrenome);
  const { count } = await admin
    .from("profiles")
    .select("id", { count: "exact", head: true })
    .eq("login_key", key);

  const email = synthEmail(nome, sobrenome, count && count > 0 ? nascimento.compact : undefined);
  const password = synthPassword(sobrenome);

  const { error } = await admin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: {
      display_name: `${nome} ${sobrenome}`,
      serie,
      data_nascimento: nascimento.iso,
      login_key: key,
    },
  });

  if (error) {
    const msg = /already|registered|exists/i.test(error.message)
      ? "Já existe um cadastro com esse nome, sobrenome e data de nascimento. Tente fazer login."
      : error.message;
    redirect(`/signup?error=${encodeURIComponent(msg)}`);
  }

  // Login automático após o cadastro.
  const supabase = await createClient();
  await supabase.auth.signInWithPassword({ email, password });
  await admin.from("profiles").update({ last_login_at: new Date().toISOString() }).eq("email", email);

  revalidatePath("/", "layout");
  redirect("/jogos");
}

/**
 * Login infantil: nome (usuário) + último sobrenome (senha).
 *
 * IMPORTANTE: só autentica quem já tem cadastro — nunca cria conta aqui.
 * Se o nome+sobrenome não existir, o aluno é mandado para /signup. Se
 * existir mais de um aluno com o mesmo nome+sobrenome, pedimos a data
 * de nascimento para não logar por engano na conta de outra pessoa.
 */
export async function login(formData: FormData) {
  const nome = String(formData.get("nome") ?? "").trim();
  const sobrenome = String(formData.get("sobrenome") ?? "").trim();
  const dataNascimentoRaw = String(formData.get("data_nascimento") ?? "").trim();
  const nextRaw = String(formData.get("next") ?? "/jogos");
  const next = nextRaw.startsWith("/") && !nextRaw.startsWith("//") ? nextRaw : "/jogos";

  if (!slug(nome) || !slug(sobrenome)) {
    redirect(`/login?error=${encodeURIComponent("Preencha nome e sobrenome.")}`);
  }

  const key = loginKey(nome, sobrenome);
  const supabase = await createClient();
  const qs = `nome=${encodeURIComponent(nome)}&sobrenome=${encodeURIComponent(sobrenome)}&next=${encodeURIComponent(next)}`;

  let email: string | null = null;

  if (dataNascimentoRaw) {
    // Segunda tentativa (após colisão): já veio com data de nascimento.
    const nascimento = parseBirthdate(dataNascimentoRaw);
    if (!nascimento) {
      redirect(`/login?collision=1&${qs}&error=${encodeURIComponent("Data de nascimento inválida. Use o formato DD/MM/AAAA.")}`);
    }
    const { data } = await supabase.rpc("login_lookup_by_birthdate", {
      p_login_key: key,
      p_data_nascimento: nascimento.iso,
    });
    email = data ?? null;
    if (!email) {
      redirect(`/login?collision=1&${qs}&error=${encodeURIComponent("Nenhum aluno com esse nome e data de nascimento. Verifique e tente de novo.")}`);
    }
  } else {
    const { data } = await supabase.rpc("login_lookup", { p_login_key: key });
    const row = Array.isArray(data) ? data[0] : data;
    const candidateCount = Number(row?.candidate_count ?? 0);

    if (candidateCount === 0) {
      redirect(`/signup?error=${encodeURIComponent("Não encontramos seu cadastro. Cadastre-se abaixo — é rapidinho!")}`);
    }
    if (candidateCount > 1) {
      redirect(`/login?collision=1&${qs}`);
    }
    email = row?.email ?? null;
    if (!email) {
      redirect(`/login?error=${encodeURIComponent("Não foi possível entrar. Tente de novo.")}&next=${encodeURIComponent(next)}`);
    }
  }

  const password = synthPassword(sobrenome);
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    redirect(
      `/login?error=${encodeURIComponent("Nome ou sobrenome incorretos. Verifique e tente de novo.")}&next=${encodeURIComponent(next)}`,
    );
  }

  const admin = createAdminClient();
  await admin.from("profiles").update({ last_login_at: new Date().toISOString() }).eq("email", email);

  revalidatePath("/", "layout");
  redirect(next);
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/login");
}
