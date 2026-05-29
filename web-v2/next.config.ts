import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Há um package-lock.json no repo pai (build Tailwind do Django).
  // Fixa a raiz deste app para o Turbopack não inferir o diretório errado.
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
