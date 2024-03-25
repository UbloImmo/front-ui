import tsConfigPaths from "vite-tsconfig-paths";

/** @type {import('vite').UserConfig} */
export default {
  build: {
    rollupOptions: {
      external: ["bun:test", "*.test.ts", "*.test.tsx"],
    },
  },
  plugins: [tsConfigPaths()],
  resolve: {
    alias: {
      "@/*": "/src/*",
      "@docs/*": "/docs/*",
      "@types/*": "/src/types/*",
      "@utils/*": "/src/utils/*",
      "@components/*": "/src/components/*",
    },
  },
};
