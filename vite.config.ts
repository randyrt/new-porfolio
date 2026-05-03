import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";
import Components from "unplugin-vue-components/vite";
import MotionResolver from "motion-v/resolver";

export default defineConfig({
  server: {
    port: 3000,
    strictPort: true,
  },
  plugins: [
    vue(),
    tailwindcss(),
    Components({
      dts: true,
      resolvers: [MotionResolver()],
    }),
  ],
  test: {
    globals: true,
    environment: "jsdom",
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html", "lcov"],
      exclude: [
        "node_modules/",
        "src/main.ts",
        "src/**/*.d.ts",
        "**/*.config.ts",
        "**/__tests__/**",
        "**/*.spec.ts",
      ],
    },
    include: ["src/**/*.{test,spec}.{js,ts,jsx,tsx}"],
    exclude: ["node_modules", "dist", "coverage"],
    setupFiles: ["./vitest.setup.ts"],
  },
});