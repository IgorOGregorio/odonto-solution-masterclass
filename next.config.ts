import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Evita ambiguidade de workspace root por causa de um package-lock.json
  // em /Users/igorgregorio/Projects (diretório pai, fora deste repositório).
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
