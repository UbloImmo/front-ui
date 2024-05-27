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
    options: {
      storySort: (a, b) => {
        const isDocs = (item) => item.type === "docs";
        const contains = (key) => (item) =>
          item.id.toLowerCase().includes(key.toLowerCase());

        const isOverview = (item) => isDocs(item) && contains("overview")(item);

        const isFoundations = contains("foundations");

        const compare = (compareFn) => (itemA, itemB) => {
          if (compareFn(itemA) && !compareFn(itemB)) return -1;
          if (!compareFn(itemA) && compareFn(itemB)) return 1;
        };
        const match = (matchFn) => (itemA, itemB) => {
          return matchFn(itemA) || matchFn(itemB);
        };

        if (match(isFoundations)(a, b)) return compare(isFoundations)(a, b);

        if (match(isOverview)(a, b)) return compare(isOverview)(a, b);
        if (match(isDocs)(a, b)) return compare(isDocs)(a, b);

        return a.id.localeCompare(b.id);
      },
    },
  },
  decorators: StoryDecorator,
};

export default preview;
