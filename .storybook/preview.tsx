import type { Preview } from "@storybook/react";
import { StoryDecorator } from "../docs/blocks/StoryDecorator";
import { DocsContainer } from "../docs/blocks/DocsContainer";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
      expanded: true,
    },
    docs: {
      container: DocsContainer,
    },
  },
  decorators: StoryDecorator,
};

export default preview;
