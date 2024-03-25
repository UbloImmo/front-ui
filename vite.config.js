export default {
  build: {
    rollupOptions: {
      external: ["bun:test", "*.test.ts", "*.test.tsx"],
    },
  },
};
