import type { StorybookConfig } from "@storybook/react-vite";
import path from "path";
import type { InlineConfig } from "vite";

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
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  core: {
    builder: "@storybook/builder-vite",
  },
  docs: {
    autodocs: "tag",
  },
  async viteFinal(config, { configType }) {
    const { mergeConfig } = await import("vite");
    if (configType === "PRODUCTION") {
      config.base = "/design-system";
      config.publicDir = "/design-system";
    }
    const baseConfig: InlineConfig = {
      ...config,
      optimizeDeps: {
        ...(config.optimizeDeps ?? {}),
        entries:
          configType === "DEVELOPMENT" ? [] : config.optimizeDeps?.entries,
      },
    };
    console.log(baseConfig.resolve);
    return mergeConfig(baseConfig, {
      build: {
        rollupOptions: {
          external: ["bun:test", "*.test.ts", "*.test.tsx"],
        },
      },
      resolve: {
        alias: {
          "@docs": path.resolve(path.dirname(__dirname), "docs"),
          "@types": path.resolve(path.dirname(__dirname), "src", "types"),
          "@utils": path.resolve(path.dirname(__dirname), "src", "utils"),
          "@components": path.resolve(
            path.dirname(__dirname),
            "src",
            "components"
          ),
          "@": path.resolve(path.dirname(__dirname), "src"),
        },
      },
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
};
export default config;
