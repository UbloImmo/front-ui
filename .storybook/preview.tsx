import { markdownOverrides } from "../docs/blocks";
import { DocsContainer } from "../docs/containers/DocsContainer";
import { StoryDecorator } from "../docs/containers/StoryDecorator";

import type { Preview } from "@storybook/react";

const preview: Preview = {
  tags: ["autodocs"],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      container: DocsContainer,
      components: markdownOverrides,
    },
    options: {
      /**
       * Sorts stories / docs based on their type and ID.
       *
       * @remarks This functions has to be inlined here for storybook to execute it correctly.
       * @remarks Adding type definitions to params or anywhere inside the function body crashes storybook. Maybe they inline it in the build process?
       *
       * @param {Object} a - The first story object.
       * @param {Object} b - The second story object.
       * @return {number} Returns a negative value if `a` should be sorted before `b`, a positive value if `a` should be sorted after `b`, and 0 if they are equal.
       */
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
