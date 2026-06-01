/* Retrato circular de um guardião (medalhão). As artes são corpo inteiro com fundo
 * branco; aqui damos zoom no topo (rosto/busto) e emolduramos num anel dourado —
 * fica como um token de personagem, sem precisar de fundo transparente. */
interface GuardianAvatarProps {
  /** slug do arquivo: /img/guardioes/guardiao-<name>.webp (ex.: "aion", "lyra-fase2"). */
  name: string;
  size?: number;
  ring?: string;
  className?: string;
}

export function GuardianAvatar({
  name,
  size = 72,
  ring = "#f1c40f",
  className = "",
}: GuardianAvatarProps) {
  return (
    <div
      className={`relative shrink-0 overflow-hidden rounded-full bg-[#0b1222] ${className}`}
      style={{
        width: size,
        height: size,
        boxShadow: `0 0 0 2px ${ring}99, 0 4px 16px -4px ${ring}66`,
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`/img/guardioes/${name}.png`}
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-top"
        style={{ transform: "scale(1.7)", transformOrigin: "top center" }}
      />
    </div>
  );
}
