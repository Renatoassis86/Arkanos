import type { Metadata, Viewport } from "next";
import { Fraunces, Plus_Jakarta_Sans, Cinzel, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SplashScreen } from "@/components/splash-screen";
import { BottomNav } from "@/components/bottom-nav";
import { SiteCredit } from "@/components/site-credit";

/* Corpo/UI — sans humanista, calorosa e legível (crianças, famílias, relatórios). */
const jakarta = Plus_Jakarta_Sans({
  variable: "--font-sans-brand",
  subsets: ["latin"],
  display: "swap",
});

/* Títulos — serifa "old-style" variável, com porte clássico e calor editorial. */
const fraunces = Fraunces({
  variable: "--font-display-brand",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz", "SOFT"],
});

/* Emblema/heráldica — capitulares romanas (wordmark, nomes de carta, eyebrows). */
const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "700", "900"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Arkanos — O Reino do Saber e da Virtude",
  description:
    "Plataforma de jogos educacionais da Educação Cristã Clássica, nas fases do Trivium.",
  applicationName: "Arkanos",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Arkanos",
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/img/logo.png", type: "image/png" },
    ],
    apple: "/img/logo.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#0b1222",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${jakarta.variable} ${fraunces.variable} ${cinzel.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col pt-6">
        {/* Tarja fina de "em desenvolvimento" (topo, vermelha) */}
        <div className="fixed inset-x-0 top-0 z-[100] flex h-6 items-center justify-center bg-red-600 text-[11px] font-bold uppercase tracking-[2px] text-white">
          Em desenvolvimento · versão de teste
        </div>
        <SplashScreen />
        {children}
        <SiteCredit />
        
        <BottomNav />
      </body>
    </html>
  );
}
