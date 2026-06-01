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
        {/** Toggle development banner */}
        {(() => {
          const showDevBanner = true; // Set to false to hide the banner
          return showDevBanner ? (
            <div className="h-2 bg-red-600 flex items-center justify-center text-white text-xs font-bold mb-1">
              EM DESENVOLVIMENTO - Versão de teste
            </div>
          ) : null;
        })()}
        {/* Extra red stripe above BottomNav */}
        {(() => {
          const showExtraStripe = true; // Set to false to hide the extra stripe
          return showExtraStripe ? (
            <div className="h-2 bg-red-600 flex items-center justify-center text-white text-xs font-bold mb-1">
              EM DESENVOLVIMENTO - Versão de teste
            </div>
          ) : null;
        })()}
        <BottomNav />
        <SplashScreen />
        {children}
                <SiteCredit />
        
      </body>
    </html>
  );
}
