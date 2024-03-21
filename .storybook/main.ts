import type { StorybookConfig } from "@storybook/react-vite";

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
  docs: {
    autodocs: "tag",
  },
  async viteFinal(config, { configType }) {
    const { mergeConfig } = await import("vite");
    if ( configType === 'PRODUCTION' ) {
      config.base = '/design-system'
      config.publicDir =  '/design-system'
    }
    return mergeConfig(config, {
      build: {
        rollupOptions: {
          external: ["bun:test", "*.test.ts", "*.test.tsx"],
        },
      },
    });
  },
  managerHead: (head, { configType }) => {
    if (configType === 'PRODUCTION') {
      return (`
        ${head}
        <base href="/design-system/">
      `);
    }

    return head;
  },
};
export default config;
