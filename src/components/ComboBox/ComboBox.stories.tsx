import { ComboBox } from "./ComboBox.component";

import { componentSourceFactory } from "@docs/docs.utils";

import type { ComboBoxOption, ComboBoxProps } from "./ComboBox.types";
import type { Meta, StoryObj } from "@storybook/react";
import type { NullishPrimitives } from "@ubloimmo/front-util";

const componentSource = componentSourceFactory<
  ComboBoxProps<NullishPrimitives>
>("ComboBox", ComboBox.defaultProps);

const options: ComboBoxOption<NullishPrimitives>[] = [
  {
    label: "[ComboBox option 1]",
    value: "option-1",
  },
  {
    label: "[ComboBox option 2]",
    value: "option-2",
  },
  {
    label: "Disabled option",
    value: "option-3",
    disabled: true,
  },
];

const meta = {
  component: ComboBox,
  title: "Components/ComboBox/Stories",
  args: {
    options,
    direction: "column",
    multi: false,
  },
  argTypes: {
    multi: {
      type: "boolean",
    },
    direction: {
      options: ["row", "column"],
    },
  },
  parameters: {
    docs: componentSource(),
  },
} satisfies Meta<typeof ComboBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
