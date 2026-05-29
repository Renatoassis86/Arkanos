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

/** E-mail sintético determinístico (nome + sobrenome). */
export function synthEmail(nome: string, sobrenome: string): string {
  return `${slug(nome)}.${slug(sobrenome)}@alunos.arkanos.quest`;
}

/** Senha derivada do sobrenome (sufixo garante o mínimo de 6 caracteres do Supabase). */
export function synthPassword(sobrenome: string): string {
  return `${slug(sobrenome)}.arkanos`;
}
