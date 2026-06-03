export type TriviumTrack = "gramatica" | "logica" | "retorica";

/** Idade a partir da data de nascimento (string "YYYY-MM-DD"). */
export function ageFromBirthdate(
  birthdate: string | null | undefined,
): number | null {
  if (!birthdate) return null;
  const dob = new Date(birthdate);
  if (Number.isNaN(dob.getTime())) return null;
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
    age--;
  }
  return age;
}

/**
 * Trilha recomendada do Trivium pela idade.
 * Espelha a regra de arkanos/views.py:jogos_index.
 */
export function recommendedTrack(age: number | null): TriviumTrack {
  if (age === null) return "gramatica";
  if (age <= 9) return "gramatica";
  if (age <= 12) return "logica";
  return "retorica";
}

/** Trilha recomendada pela SÉRIE (ex.: "5º ano"). Fundamentais → Gramática,
 *  finais → Lógica, mais avançados → Retórica. */
export function trackForSerie(serie: string | null | undefined): TriviumTrack {
  const n = serie ? parseInt(serie, 10) : NaN;
  if (!Number.isFinite(n)) return "gramatica";
  if (n <= 3) return "gramatica";
  if (n <= 6) return "logica";
  return "retorica";
}

export const TRACK_LABELS: Record<TriviumTrack, string> = {
  gramatica: "Gramática",
  logica: "Lógica",
  retorica: "Retórica",
};
