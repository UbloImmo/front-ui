import { ComboBox } from "./ComboBox.component";

import { componentSourceFactory } from "@docs/docs.utils";

import type { ComboBoxProps } from "./ComboBox.types";
import type { Meta, StoryObj } from "@storybook/react";

const componentSource = componentSourceFactory<ComboBoxProps>(
  "ComboBox",
  ComboBox.defaultProps
);

const meta = {
  component: ComboBox,
  title: "Components/ComboBox/Stories",
  args: {
    options: ["[ComboBox option 1]", "[ComboBox option 2]"],
    direction: "column",
    multi: false,
  },
  argTypes: {
    multi: {
      type: "boolean",
    },
  },
  parameters: {
    docs: componentSource(),
  },
} satisfies Meta<typeof ComboBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
