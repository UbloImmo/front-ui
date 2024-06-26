import { Avatar } from "./Avatar.component";

import { componentSourceFactory } from "@docs/docs.utils";

import type { AvatarProps } from "./Avatar.types";
import type { Meta, StoryObj } from "@storybook/react";

const componentSource = componentSourceFactory<AvatarProps>(
  "Avatar",
  {
    // TODO
  },
  Avatar.defaultProps
);

const meta = {
  component: Avatar,
  title: "Components/Avatar/Stories",
  args: {
    // TODO
  },
  parameters: {
    docs: componentSource(),
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
