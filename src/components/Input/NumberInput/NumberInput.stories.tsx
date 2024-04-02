import { fn } from "@storybook/test";

import { NumberInput } from "./NumberInput.component";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/Input/NumberInput/Stories",
  component: NumberInput,
} satisfies Meta<typeof NumberInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Number input",
    onChange: fn(),
  },
};
