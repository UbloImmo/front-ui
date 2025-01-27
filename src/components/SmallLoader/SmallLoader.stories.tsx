import { SmallLoader } from "./SmallLoader.component";

import { componentSourceFactory } from "@docs/docs.utils";

import type { Meta, StoryObj } from "@storybook/react";

const componentSource = componentSourceFactory(
  "SmallLoader",
  SmallLoader.defaultProps,
);

const meta = {
  component: SmallLoader,
  title: "Components/Feedbacks/SmallLoader/Stories",
  parameters: {
    docs: componentSource(),
  },
} satisfies Meta<typeof SmallLoader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
