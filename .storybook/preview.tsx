import type { Preview } from "@storybook/react";
import { StoryDecorator } from "../docs/containers/StoryDecorator";
import { DocsContainer } from "../docs/containers/DocsContainer";
import { Heading, headingOfSize, Text, textOfSize } from "../docs/blocks";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      expanded: true,
    },
    docs: {
      container: DocsContainer,
      components: {
        h1: headingOfSize("h1", "bold"),
        h2: headingOfSize("h2", "bold"),
        h3: headingOfSize("h3", "semiBold"),
        h4: headingOfSize("h4", "bold"),
        h5: headingOfSize("h4", "semiBold"),
        h6: headingOfSize("h4", "regular"),
        span: textOfSize("m", "regular"),
        p: textOfSize("m", "regular"),
      },
    },
  },
  decorators: StoryDecorator,
};

export default preview;
