import type { Preview } from "@storybook/react";
import { StoryDecorator } from "../docs/containers/StoryDecorator";
import { DocsContainer } from "../docs/containers/DocsContainer";
import { markdownOverrides } from "../docs/blocks";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      expanded: true,
    },
    docs: {
      container: DocsContainer,
      components: markdownOverrides,
    },
  },
  decorators: StoryDecorator,
};

export default preview;
