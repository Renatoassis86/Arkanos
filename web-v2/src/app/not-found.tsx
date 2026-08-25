"use client";

import { useEffect, useState } from "react";
import { GuardianAvatar } from "@/components/guardian-avatar";
import { createClient } from "@/lib/supabase/client";

const PROTECTED_PREFIXES = ["/jogos", "/desafio", "/radix", "/spelling-bee", "/ranking", "/colecao"];

export default function NotFound() {
  const [attempted, setAttempted] = useState(false);

  useEffect(() => {
    // Auto-recuperação de sessão se estiver autenticado no cliente
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      if (data.user && !attempted) {
        setAttempted(true);
        // Recarrega a rota limpa se o 404 foi causado por prefetch/cache do router client
        const path = window.location.pathname;
        if (PROTECTED_PREFIXES.some((p) => path.startsWith(p))) {
          window.location.href = path;
        }
      }
    });
  }, [attempted]);

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center p-4 text-center">
      <div className="mx-auto max-w-md rounded-3xl border-2 border-indigo-100 bg-white p-6 shadow-xl sm:p-8">
        <div className="flex justify-center">
          <GuardianAvatar name="aion" size={72} ring="#3b82f6" />
        </div>
        <span className="mt-4 inline-block rounded-full bg-indigo-50 px-3 py-1 text-xs font-black uppercase tracking-wider text-indigo-700">
          Caminho Desconhecido
        </span>
        <h1 className="font-display mt-2 text-3xl font-black text-slate-900 sm:text-4xl">
          Página não encontrada
        </h1>
        <p className="mt-2 text-xs leading-relaxed text-slate-600 sm:text-sm">
          O Guardião Aion verificou os pergaminhos e este caminho não existe ou sua sessão foi alterada. Vamos retornar com segurança!
        </p>

        <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
          <button
            type="button"
            onClick={() => { window.location.href = "/jogos"; }}
            className="flex-1 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 py-3 text-xs font-black uppercase tracking-wider text-white shadow-md transition hover:from-blue-700 hover:to-indigo-800 active:scale-95"
          >
            Ir para o Painel →
          </button>
          <button
            type="button"
            onClick={() => { window.location.href = "/login"; }}
            className="flex-1 rounded-2xl border-2 border-slate-200 bg-slate-50 py-3 text-xs font-black uppercase tracking-wider text-slate-700 transition hover:bg-slate-100 active:scale-95"
          >
            Fazer Login
          </button>
        </div>
      </div>
    </div>
  );
}
