import { fn } from "@storybook/test";

import { NumberInput } from "./NumberInput.component";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/Forms/Input/NumberInput/Stories",
  component: NumberInput,
  args: {
    uncontrolled: true,
  },
  argTypes: {
    value: {
      type: "number",
    },
    scale: {
      type: "number",
    },
  },
} satisfies Meta<typeof NumberInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Number input",
    onChange: fn(),
  },
};

export const MinMaxValue: Story = {
  args: {
    placeholder: "Number input",
    min: 1,
    max: 5,
    onChange: fn(),
  },
};

export const Steps: Story = {
  args: {
    placeholder: "Number input",
    step: 5,
    onChange: fn(),
  },
};
