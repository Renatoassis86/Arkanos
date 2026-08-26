/**
 * Login infantil: o aluno usa NOME (login) e ÚLTIMO SOBRENOME (senha) — sem e-mail.
 * Por baixo, geramos um e-mail/senha sintéticos determinísticos para o Supabase Auth.
 */

export function slug(s: string): string {
  return s
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "") // remove acentos
    .replace(/[^a-z0-9]/g, ""); // só letras/números
}

/** E-mail sintético determinístico a partir de nome + último sobrenome (sem data). */
export function synthEmail(nome: string, sobrenome: string): string {
  return `${slug(nome)}.${slug(sobrenome)}@alunos.arkanos.quest`;
}

/** Senha derivada do sobrenome (sufixo garante o mínimo de 6 caracteres do Supabase). */
export function synthPassword(sobrenome: string): string {
  return `${slug(sobrenome)}.arkanos`;
}

/**
 * Nome de exibição de último recurso, usado só se o perfil ainda não tem
 * display_name salvo. Nunca mostra o e-mail sintético — deriva um nome
 * legível a partir dele (ex.: "theo.assis@..." -> "Theo Assis").
 */
export function friendlyNameFromEmail(email: string | null | undefined): string {
  const local = (email ?? "").split("@")[0] ?? "";
  const nome = local
    .split(".")
    .filter(Boolean)
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(" ");
  return nome || "Sábio";
}
