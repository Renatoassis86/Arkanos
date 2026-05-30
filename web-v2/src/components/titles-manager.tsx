"use client";

import { useState, useTransition } from "react";
import { TITLES } from "@/lib/collection";
import { equipTitle } from "@/app/(dashboard)/colecao/actions";

type Owned = { key: string; equipped: boolean };

export function TitlesManager({ owned }: { owned: Owned[] }) {
  const ownedMap = new Map(owned.map((t) => [t.key, t.equipped]));
  const [equippedKey, setEquippedKey] = useState<string | null>(
    owned.find((t) => t.equipped)?.key ?? null,
  );
  const [pending, startTransition] = useTransition();
  const [busyKey, setBusyKey] = useState<string | null>(null);

  function equip(key: string) {
    setBusyKey(key);
    setEquippedKey(key); // otimista
    startTransition(async () => {
      await equipTitle(key);
      setBusyKey(null);
    });
  }

  return (
    <div className="flex flex-wrap gap-2.5">
      {TITLES.map((t) => {
        const isOwned = ownedMap.has(t.key);
        const isEquipped = equippedKey === t.key;
        if (!isOwned) {
          return (
            <span
              key={t.key}
              className="rounded-full border border-white/10 px-4 py-2 text-sm font-bold text-slate-600"
            >
              🔒 {t.nome}
            </span>
          );
        }
        return (
          <button
            key={t.key}
            onClick={() => !isEquipped && equip(t.key)}
            disabled={isEquipped || pending}
            className={`rounded-full border px-4 py-2 text-sm font-bold transition disabled:cursor-default ${
              isEquipped
                ? "border-[#f1c40f] bg-[#f1c40f]/15 text-[#f1c40f]"
                : "border-[#f1c40f]/30 text-slate-200 hover:border-[#f1c40f]/60 hover:bg-white/5"
            } ${busyKey === t.key ? "opacity-60" : ""}`}
          >
            {isEquipped ? "⭐ " : ""}
            {t.nome}
            {!isEquipped && (
              <span className="ml-2 text-xs font-normal text-slate-400">equipar</span>
            )}
          </button>
        );
      })}
    </div>
  );
}
