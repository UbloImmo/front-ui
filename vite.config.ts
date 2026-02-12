import { UserConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";

/** @type {import('vite').UserConfig} */
const config: UserConfig = {
  build: {
    rollupOptions: {
      external: ["bun:test", "*.test.ts", "*.test.tsx"],
    },
  },
  plugins: [tsConfigPaths()],
  resolve: {
    alias: {
      "@docs/*": "/docs/*",
      "@types/*": "/src/types/*",
      "@utils/*": "/src/utils/*",
      "@layouts/*": "/src/layouts/*",
      "@components/*": "/src/components/*",
      "@/*": "/src/*",
    },
  },
};
export default config;
