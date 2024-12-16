import { ListFilterOptionDivider } from "./ListFilterOptionDivider.component";
import {
  ListFilterOptionDividerProps,
  ListFilterOptionDividerDefaultProps,
} from "./ListFilterOptionDivider.types";

import { componentSourceFactory } from "@docs/docs.utils";

import type { Meta, StoryObj } from "@storybook/react";

const componentSource = componentSourceFactory<
  ListFilterOptionDividerProps,
  ListFilterOptionDividerDefaultProps
>(
  "ListFilterOptionDivider",
  {
    label: "[Divider label]",
  },
  {
    label: "[Divider]",
  }
);

const meta = {
  component: ListFilterOptionDivider,
  title: "Components/List/Components/ListFilterOptionDivider/Stories",
  argTypes: {
    label: {
      type: "string",
    },
  },
  args: {
    label: "Divider label",
  },
  parameters: {
    docs: componentSource(),
  },
} satisfies Meta<typeof ListFilterOptionDivider>;
type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {
  parameters: {
    docs: componentSource(),
  },
};
