import type { Metadata, Viewport } from "next";
import { Fraunces, Plus_Jakarta_Sans, Cinzel, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SplashScreen } from "@/components/splash-screen";
import { TopNav } from "@/components/TopNav";
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
  metadataBase: new URL("https://arkanos.arkosintelligence.com"),
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
  openGraph: {
    title: "Arkanos — O Reino do Saber e da Virtude",
    description:
      "Plataforma de jogos educacionais da Educação Cristã Clássica, nas fases do Trivium.",
    url: "https://arkanos.arkosintelligence.com",
    siteName: "Arkanos",
    images: [
      {
        url: "https://arkanos.arkosintelligence.com/og-image.jpg?v=2",
        width: 1200,
        height: 630,
        type: "image/jpeg",
        alt: "Arkanos - Educação Cristã Clássica",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Arkanos — O Reino do Saber e da Virtude",
    description:
      "Plataforma de jogos educacionais da Educação Cristã Clássica, nas fases do Trivium.",
    images: ["https://arkanos.arkosintelligence.com/og-image.jpg?v=2"],
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
      <head>
        <meta property="og:image" content="https://arkanos.arkosintelligence.com/og-image.jpg?v=2" />
        <meta property="og:image:secure_url" content="https://arkanos.arkosintelligence.com/og-image.jpg?v=2" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
      </head>
      <body className="min-h-full flex flex-col">
        <SplashScreen />
        <TopNav />
        {children}
        <SiteCredit />
        
      </body>
    </html>
  );
}
