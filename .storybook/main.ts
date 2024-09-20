import type { StorybookConfig } from "@storybook/react-vite";
import path from "path";
import { mergeConfig } from "vite";

const config: StorybookConfig = {
  stories: [
    "../src/**/*.mdx",
    "../docs/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],

  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-measure",
    "@storybook/addon-outline",
    "@storybook/addon-viewport",
    "@storybook/addon-themes",
    {
      name: "@storybook/addon-docs",
      options: { transcludeMarkdown: true },
    },
  ],

  framework: {
    name: "@storybook/react-vite",
    options: {},
  },

  core: {
    builder: "@storybook/builder-vite",
  },

  docs: {},

  async viteFinal(config, { configType }) {
    const isProd = configType === "PRODUCTION";
    if (isProd) {
      config.base = "/design-system";
      config.publicDir = "/design-system";
    }
    const baseConfig = mergeConfig(config, {
      optimizeDeps: {
        ...(config.optimizeDeps ?? {}),
        entries: isProd ? config.optimizeDeps?.entries : [],
        exclude: ["node_modules/.cache/storybook"],
      },
    });

    const alias = {
      "@docs": path.resolve(path.dirname(__dirname), "docs"),
      "@types": path.resolve(path.dirname(__dirname), "src", "types"),
      "@utils": path.resolve(path.dirname(__dirname), "src", "utils"),
      "@components": path.resolve(path.dirname(__dirname), "src", "components"),
      "@": path.resolve(path.dirname(__dirname), "src"),
    };
    return mergeConfig(baseConfig, {
      build: {
        rollupOptions: {
          external: ["bun:test", "*.test.ts", "*.test.tsx"],
        },
      },
      resolve: {
        extensions: [".mdx", ".mjs", ".js", ".ts", ".tsx"],
        alias,
      },
      assetsInclude: ["**/*.md"],
    });
  },

  managerHead: (head, { configType }) => {
    if (configType === "PRODUCTION") {
      return `
        ${head}
        <base href="/design-system/">
      `;
    }

    return head;
  },

  staticDirs: [{ from: "../src/typography/fonts/Gilroy", to: "/assets/fonts" }],

  typescript: {
    reactDocgen: "react-docgen",
  },
};
export default config;
