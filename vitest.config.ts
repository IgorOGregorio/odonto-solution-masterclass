import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "node:path";

const alias = {
  "@": path.resolve(__dirname, "./"),
};

export default defineConfig({
  plugins: [react()],
  resolve: { alias },
  test: {
    setupFiles: ["./vitest.setup.ts"],
    projects: [
      {
        resolve: { alias },
        test: {
          name: "unit",
          include: ["**/*.test.ts"],
          exclude: ["**/*.test.tsx", "node_modules", "e2e"],
          environment: "node",
          setupFiles: ["./vitest.setup.ts"],
        },
      },
      {
        plugins: [react()],
        resolve: { alias },
        test: {
          name: "ui",
          include: ["**/*.test.tsx"],
          exclude: ["node_modules", "e2e"],
          environment: "jsdom",
          setupFiles: ["./vitest.setup.ts"],
        },
      },
    ],
  },
});
