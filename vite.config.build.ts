import { resolve } from "node:path";

import dynamicImportVars from "@rollup/plugin-dynamic-import-vars";
import { mergeConfig } from "vite";
import banner from "vite-plugin-banner";
import dts from "vite-plugin-dts";

import { version, name } from "./package.json";
import sbViteConfig from "./vite.config";

import type { UserConfig } from "vite";

const currentYear = new Date(Date.now()).getFullYear();

const entries = {
  themes: resolve(__dirname, "src", "themes/index.ts"),
  types: resolve(__dirname, "src", "types/index.ts"),
  utils: resolve(__dirname, "src", "utils/index.ts"),
  components: resolve(__dirname, "src", "components/index.ts"),
  layouts: resolve(__dirname, "src", "layouts/index.ts"),
  fonts: resolve(__dirname, "src", "typography/fonts/index.ts"),
  sizes: resolve(__dirname, "src", "sizes/index.ts"),
  index: resolve(__dirname, "src", "index.ts"),
} as const;

type Entry = keyof typeof entries;

const entryBanners: Record<Entry, string> = {
  themes: "Theming related components, hooks, providers and utilities.",
  types: "Global type declarations and enum constants.",
  utils: "Utility functions and data.",
  components: "Themed UI components.",
  layouts: "UI Layout components.",
  fonts: "Injected font files and font-face declarations.",
  sizes: "Size constants, scales and breakpoints.",
  index: `Ublo's uikit library.
* A one stop shop for all your frontend needs.`,
};

const chunkMatchesEntry = (fileName: string): Entry | false => {
  if (fileName.includes("/")) return false;
  const [name, extension] = fileName.split(".");
  if (extension !== "js") return false;
  if (name in entries) return name as Entry;
  return false;
};

const entryChunkBanner = (fileName: string): string => {
  const entry = chunkMatchesEntry(fileName);
  if (!entry) return "";
  const bannerText = entryBanners[entry];
  const entryName = `${name}/${entry}`;
  return `* ${entryName}
* @file ${bannerText}
*
`;
};

const chunkBanner = (fileName: string) => {
  const bannerHeader = entryChunkBanner(fileName);
  return `/**
${bannerHeader}* @ubloimmo/uikit version ${version}
*
* © Ublo ${currentYear}
* https://ublo.immo
*/

`;
};

export default mergeConfig<UserConfig, UserConfig>(sbViteConfig, {
  plugins: [
    dts({
      include: ["src"],
      exclude: [
        "node_modules/**",
        "src/tests/**",
        "docs",
        "scripts",
        ".storybook",
        "**/*.stories.tsx",
        "**/*.test.ts",
        "**/*.test.tsx",
      ],
      insertTypesEntry: true,
      copyDtsFiles: true,
    }),
    banner({
      content: chunkBanner,
    }),
  ],
  build: {
    outDir: "dist",
    lib: {
      entry: {
        themes: resolve(__dirname, "src", "themes/index.ts"),
        types: resolve(__dirname, "src", "types/index.ts"),
        utils: resolve(__dirname, "src", "utils/index.ts"),
        components: resolve(__dirname, "src", "components/index.ts"),
        layouts: resolve(__dirname, "src", "layouts/index.ts"),
        fonts: resolve(__dirname, "src", "typography/fonts/index.ts"),
        sizes: resolve(__dirname, "src", "sizes/index.ts"),
        index: resolve(__dirname, "src", "index.ts"),
      },
      formats: ["es"],
      fileName: name,
    },
    rollupOptions: {
      plugins: [dynamicImportVars()],
      external: [
        "react",
        "styled-components",
        "react-dom",
        "react-bootstrap-icons",
        "@ubloimmo/front-tokens",
        "@ubloimmo/front-util",
      ],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "bootstrap-icons": "BootstrapIcons",
          "styled-components": "styled",
        },
        dir: "dist",
        compact: true,
        entryFileNames: "[name].js",
        chunkFileNames: "[name].js",
        assetFileNames: "[name].[ext]",
        preserveModules: true,
        preserveModulesRoot: "src",
      },
    },
  },
});
