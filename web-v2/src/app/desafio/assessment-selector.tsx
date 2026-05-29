"use client";

import { useRouter } from "next/navigation";

export function AssessmentSelector({
  assessments,
  currentId,
}: {
  assessments: { id: number; name: string }[];
  currentId?: number;
}) {
  const router = useRouter();

  return (
    <select
      className="bg-[#1a2235] text-white rounded px-3 py-2 text-sm border border-white/10 font-medium cursor-pointer hover:border-white/20 transition-colors"
      value={currentId || ""}
      onChange={(e) => {
        const val = e.target.value;
        if (val) {
          router.push(`/desafio?assessment=${val}`);
        } else {
          router.push(`/desafio`);
        }
      }}
    >
      <option value="">Todas as Avaliações</option>
      {assessments.map((a) => (
        <option key={a.id} value={a.id}>
          {a.name}
        </option>
      ))}
    </select>
  );
}
