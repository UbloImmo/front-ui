import React from "react";
import type { Preview } from "@storybook/react";
import { DocsContainer } from "@storybook/blocks";
import { ThemeProvider } from "../src/themes/provider";

const decorators: Preview["decorators"] = [
  (Story) => {
    return (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    );
  },
];

const Container = ({
  children,
  ...props
}: Parameters<typeof DocsContainer>[0]) => {
  return (
    <ThemeProvider>
      <DocsContainer {...props}>{children}</DocsContainer>
    </ThemeProvider>
  );
};

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      container: Container,
    },
  },
  decorators,
};

export default preview;
