import Image from "next/image";
import Link from "next/link";
import { Reveal } from "./reveal";
import { PhotoMask } from "./photo-frames";

export type FeatureRowProps = {
  eyebrow: string;
  color: string;
  title: string;
  body: string;
  bullets?: { strong: string; text: string }[];
  /** slug do guardião (ex.: "aion") ou caminho de imagem (foto) — figura sobre o blob. */
  guardian?: string;
  imageSrc?: string;
  /** foto COM fundo: renderiza em PhotoMask (círculo desconstruído) em vez do blob. */
  photoCard?: boolean;
  alt?: string;
  reverse?: boolean;
  cta?: { label: string; href: string };
  /** classe de fundo da seção (alternância de cores da paleta). */
  bg?: string;
};

export function FeatureRow({
  eyebrow,
  color,
  title,
  body,
  bullets,
  guardian,
  imageSrc,
  photoCard,
  alt = "",
  reverse,
  cta,
  bg = "bg-white",
}: FeatureRowProps) {
  const src = imageSrc ?? (guardian ? `/img/guardioes/${guardian}.png` : null);
  return (
    <section className={`${bg} px-6 py-16`}>
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2">
        {/* Texto */}
        <Reveal className={reverse ? "lg:order-2" : ""}>
          <p
            className="font-emblem mb-3 text-xs font-black uppercase tracking-[3px]"
            style={{ color }}
          >
            {eyebrow}
          </p>
          <h2 className="font-display text-3xl leading-tight text-slate-900 sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600">{body}</p>
          {bullets && (
            <ul className="mt-5 space-y-3">
              {bullets.map((b) => (
                <li key={b.strong} className="flex items-start gap-3 text-sm text-slate-600">
                  <span
                    className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md text-xs font-black text-white"
                    style={{ backgroundColor: color }}
                  >
                    ✓
                  </span>
                  <span>
                    <strong className="text-slate-900">{b.strong}:</strong> {b.text}
                  </span>
                </li>
              ))}
            </ul>
          )}
          {cta && (
            <Link
              href={cta.href}
              className="mt-7 inline-flex rounded-full px-7 py-3.5 text-sm font-black uppercase tracking-wider text-white shadow-md transition hover:-translate-y-0.5"
              style={{ backgroundColor: color }}
            >
              {cta.label}
            </Link>
          )}
        </Reveal>

        {/* Mídia: foto-com-fundo em PhotoCard, ou figura sobre blob */}
        <Reveal delay={0.1} className={reverse ? "lg:order-1" : ""}>
          {photoCard && src ? (
            <PhotoMask src={src} alt={alt} color={color} circleMask />
          ) : (
          <div className="relative mx-auto flex aspect-[5/4] w-full max-w-md items-end justify-center">
            {/* blob colorido */}
            <div
              className="absolute inset-x-[8%] bottom-[6%] top-[14%]"
              style={{
                backgroundColor: `${color}26`,
                borderRadius: "44% 56% 52% 48% / 55% 50% 50% 45%",
              }}
            />
            <div
              aria-hidden
              className="absolute right-[10%] top-[6%] h-16 w-16 rounded-2xl opacity-30"
              style={{ background: color, transform: "rotate(12deg)" }}
            />
            {src && (
              <Image
                src={src}
                alt={alt}
                width={420}
                height={520}
                style={{ width: "auto" }}
                className="relative z-10 h-[88%] object-contain drop-shadow-[0_16px_28px_rgba(2,6,23,0.16)]"
              />
            )}
          </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}
