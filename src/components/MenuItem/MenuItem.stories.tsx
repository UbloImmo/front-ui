import { MenuItem } from "./MenuItem.component";

import { componentSourceFactory } from "@docs/docs.utils";

import type { MenuItemProps } from "./MenuItem.types";
import type { Meta, StoryObj } from "@storybook/react";

const componentSource = componentSourceFactory<MenuItemProps>(
  "MenuItem",
  {
    // TODO
  },
  MenuItem.defaultProps
);

const meta = {
  component: MenuItem,
  title: "Components/Navigation/MenuItem/Stories",
  args: {
    // TODO
  },
  parameters: {
    docs: componentSource(),
  },
} satisfies Meta<typeof MenuItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
