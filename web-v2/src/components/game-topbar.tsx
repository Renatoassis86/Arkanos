"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { logout } from "@/app/(auth)/actions";

const GAMES = [
  { label: "Desafio dos Sábios", href: "/desafio" },
  { label: "Spelling Bee", href: "/spelling-bee" },
];

/**
 * Barra de topo dos jogos: voltar ao painel, trocar de jogo e sair (logout).
 * Se houver partida em andamento (inProgress), qualquer saída pede confirmação,
 * avisando que o progresso e a pontuação da partida serão perdidos.
 */
export function GameTopBar({ inProgress }: { inProgress: boolean }) {
  const router = useRouter();
  const [menu, setMenu] = useState(false);
  const [pending, setPending] = useState<null | (() => void)>(null);

  function guard(action: () => void) {
    if (inProgress) setPending(() => action);
    else action();
  }

  const btn =
    "rounded-full px-3 py-1.5 text-xs font-black uppercase tracking-wider transition";

  return (
    <>
      <div className="mb-4 flex items-center justify-between gap-2 rounded-2xl border border-slate-200 bg-white/90 px-2.5 py-2 shadow-sm backdrop-blur">
        <button
          onClick={() => guard(() => { window.location.href = "/jogos"; })}
          className={`${btn} text-slate-600 hover:bg-slate-100`}
        >
          ← Painel
        </button>

        <div className="relative">
          <button
            onClick={() => setMenu((v) => !v)}
            className={`${btn} text-[#b8860b] hover:bg-[#f1c40f]/10`}
          >
            Trocar de jogo ▾
          </button>
          {menu && (
            <>
              <button
                aria-hidden
                tabIndex={-1}
                onClick={() => setMenu(false)}
                className="fixed inset-0 z-30 cursor-default"
              />
              <div className="absolute left-1/2 top-full z-40 mt-1.5 w-52 -translate-x-1/2 overflow-hidden rounded-xl border border-slate-200 bg-white p-1 shadow-xl">
                {GAMES.map((g) => (
                  <button
                    key={g.href}
                    onClick={() => {
                      setMenu(false);
                      guard(() => { window.location.href = g.href; });
                    }}
                    className="block w-full rounded-lg px-3 py-2 text-left text-sm font-bold text-slate-700 transition hover:bg-[#f1c40f]/10 hover:text-[#b8860b]"
                  >
                    {g.label}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        <button
          onClick={() => guard(() => {
            void logout().finally(() => {
              window.location.href = "/login";
            });
          })}
          className={`${btn} text-rose-500 hover:bg-rose-50`}
        >
          Sair
        </button>
      </div>

      {pending && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/55 p-6 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-3xl border-2 border-slate-200 bg-white p-7 text-center shadow-2xl">
            <h3 className="font-display text-2xl text-slate-900">Sair da partida?</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Você vai{" "}
              <strong className="text-rose-600">perder todo o progresso e a pontuação</strong>{" "}
              desta partida. Tem certeza?
            </p>
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setPending(null)}
                className="flex-1 rounded-full border-2 border-slate-300 px-4 py-3 text-sm font-black text-slate-700 transition hover:bg-slate-50"
              >
                Continuar jogando
              </button>
              <button
                onClick={() => {
                  const action = pending;
                  setPending(null);
                  action?.();
                }}
                className="flex-1 rounded-full bg-rose-500 px-4 py-3 text-sm font-black text-white transition hover:bg-rose-600"
              >
                Sair e perder
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
