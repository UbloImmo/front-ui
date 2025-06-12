import { SideMenu } from "./SideMenu.component";

import { componentSourceFactory } from "@docs/docs.utils";

import type { SideMenuProps } from "./SideMenu.types";
import type { Meta, StoryObj } from "@storybook/react";

const componentSource = componentSourceFactory<SideMenuProps>(
  "SideMenu",
  {
    // TODO
  },
  SideMenu.defaultProps
);

const meta = {
  component: SideMenu,
  title: "Components/Navigation/SideMenu/Stories",
  args: {
    // TODO
  },
  parameters: {
    docs: componentSource(),
  },
} satisfies Meta<typeof SideMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
