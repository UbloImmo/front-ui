import { markdownOverrides } from "../docs/blocks";
import { DocsContainer } from "../docs/containers/DocsContainer";
import { StoryDecorator } from "../docs/containers/StoryDecorator";

import type { Preview } from "@storybook/react";

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
