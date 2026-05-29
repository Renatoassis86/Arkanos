"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export function SplashScreen() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (sessionStorage.getItem("ark_splash")) {
      setShow(false);
      return;
    }
    const t = setTimeout(() => {
      sessionStorage.setItem("ark_splash", "1");
      setShow(false);
    }, 1100);
    return () => clearTimeout(t);
  }, []);

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-4 bg-[#0b1222]"
      style={{ animation: "splashOut 1.1s ease forwards" }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 45%, rgba(241,196,15,0.18), transparent 70%)",
        }}
      />
      <Image
        src="/img/logo.png"
        alt="Arkanos"
        width={120}
        height={120}
        priority
        className="relative h-24 w-24 animate-pulse object-contain drop-shadow-[0_0_25px_rgba(241,196,15,0.5)]"
      />
      <span className="font-display relative text-2xl font-bold tracking-[3px] text-white">
        ARKANOS
      </span>
    </div>
  );
}
