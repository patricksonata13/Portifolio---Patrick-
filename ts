import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // exporta HTML estático
  basePath: "/Portifolio---Patrick-", // ou "/portfolio" se renomear o repo
  images: { unoptimized: true }, // evita erro de otimização no GitHub Pages
};

export default nextConfig;
