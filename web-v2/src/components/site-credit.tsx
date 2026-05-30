/** Crédito global, fixado no rodapé de todas as telas. */
export function SiteCredit() {
  return (
    <div className="px-5 pb-24 pt-6 text-center text-xs text-slate-500 sm:pb-8">
      Criado pela{" "}
      <a
        href="https://arkosintelligence.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="font-bold text-slate-400 underline-offset-2 transition hover:text-[#f1c40f] hover:underline"
      >
        Arkos Intelligence
      </a>
    </div>
  );
}
