"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { synthEmail, synthPassword, slug } from "@/lib/student-auth";

/**
 * Cadastro infantil: nome + último sobrenome + série.
 * Cria a conta já confirmada (admin) e faz login automático.
 */
export async function signup(formData: FormData) {
  const nome = String(formData.get("nome") ?? "").trim();
  const sobrenome = String(formData.get("sobrenome") ?? "").trim();
  const serie = String(formData.get("serie") ?? "").trim();

  if (!slug(nome) || !slug(sobrenome) || !serie) {
    redirect(`/signup?error=${encodeURIComponent("Preencha nome, sobrenome e série.")}`);
  }

  const email = synthEmail(nome, sobrenome);
  const password = synthPassword(sobrenome);

  const admin = createAdminClient();
  const { error } = await admin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { display_name: `${nome} ${sobrenome}`, serie },
  });

  if (error) {
    const msg = /already|registered|exists/i.test(error.message)
      ? "Já existe um aluno com esse nome e sobrenome. Tente fazer login."
      : error.message;
    redirect(`/signup?error=${encodeURIComponent(msg)}`);
  }

  // Login automático após o cadastro.
  const supabase = await createClient();
  await supabase.auth.signInWithPassword({ email, password });

  revalidatePath("/", "layout");
  redirect("/desafio");
}

/**
 * Login infantil: nome (usuário) + último sobrenome (senha).
 */
export async function login(formData: FormData) {
  const nome = String(formData.get("nome") ?? "").trim();
  const sobrenome = String(formData.get("sobrenome") ?? "").trim();

  const email = synthEmail(nome, sobrenome);
  const password = synthPassword(sobrenome);

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    redirect(
      `/login?error=${encodeURIComponent("Nome ou sobrenome incorretos. Verifique e tente de novo.")}`,
    );
  }

  revalidatePath("/", "layout");
  redirect("/desafio");
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/login");
}
