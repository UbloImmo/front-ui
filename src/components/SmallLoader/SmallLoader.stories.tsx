import { SmallLoader } from "./SmallLoader.component";

import { componentSourceFactory } from "@docs/docs.utils";

import type { Meta, StoryObj } from "@storybook/react";

const componentSource = componentSourceFactory(
  "SmallLoader",
  {
    // TODO
  },
  SmallLoader.defaultProps
);

const meta = {
  component: SmallLoader,
  title: "Components/SmallLoader/Stories",
  args: {
    // TODO
  },
  parameters: {
    docs: componentSource(),
  },
} satisfies Meta<typeof SmallLoader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
