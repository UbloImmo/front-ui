/** @type {import('vite').UserConfig} */
export default {
  build: {
    rollupOptions: {
      external: ["bun:test", "*.test.ts", "*.test.tsx"],
    },
  },
  resolve: {
    alias: {
      "@/*": "src/*",
      "@docs/*": "docs/*",
      "@types/*": "src/types/*",
      "@utils/*": "src/utils/*",
      "@components/*": "src/components/*",
    },
  },
};
