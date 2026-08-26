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

/**
 * Chave de busca do login: nome + último sobrenome normalizados.
 * NÃO é única — vários alunos reais podem ter o mesmo nome+sobrenome.
 * É por isso que login_key existe separado do e-mail: o e-mail (com ou
 * sem sufixo de data de nascimento) é que garante a conta ser única.
 */
export function loginKey(nome: string, sobrenome: string): string {
  return `${slug(nome)}.${slug(sobrenome)}`;
}

/**
 * E-mail sintético determinístico a partir de nome + último sobrenome.
 * Quando já existe outro aluno com o mesmo login_key, `birthdateCompact`
 * (formato AAAAMMDD) desambigua a conta — dois alunos com nome e
 * sobrenome iguais nunca podem cair na mesma conta.
 */
export function synthEmail(nome: string, sobrenome: string, birthdateCompact?: string): string {
  const key = loginKey(nome, sobrenome);
  const suffix = birthdateCompact ? `.${birthdateCompact}` : "";
  return `${key}${suffix}@alunos.arkanos.quest`;
}

/** Senha derivada do sobrenome (sufixo garante o mínimo de 6 caracteres do Supabase). */
export function synthPassword(sobrenome: string): string {
  return `${slug(sobrenome)}.arkanos`;
}

/**
 * Valida e converte uma data no formato brasileiro DD/MM/AAAA.
 * Retorna null se o formato ou a data (calendário real) forem inválidos.
 */
export function parseBirthdate(input: string): { iso: string; compact: string } | null {
  const m = input.trim().match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (!m) return null;
  const [, ddStr, mmStr, yyyyStr] = m;
  const dd = Number(ddStr);
  const mm = Number(mmStr);
  const yyyy = Number(yyyyStr);
  const thisYear = new Date().getFullYear();
  if (yyyy < 1900 || yyyy > thisYear) return null;

  const date = new Date(Date.UTC(yyyy, mm - 1, dd));
  const valid =
    date.getUTCFullYear() === yyyy && date.getUTCMonth() === mm - 1 && date.getUTCDate() === dd;
  if (!valid) return null;

  return { iso: `${yyyyStr}-${mmStr}-${ddStr}`, compact: `${yyyyStr}${mmStr}${ddStr}` };
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
