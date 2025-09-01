import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // Gera arquivos estáticos
  trailingSlash: true, // Adiciona barra no final das URLs
  images: {
    unoptimized: true // Necessário para deploy estático
  },
  // Opcional: Define o path base se for usar um repositório com nome personalizado
  // basePath: '/Portifolio---Patrick-',
};

export default nextConfig;
