import { Input } from "./Input.component";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/Input/Common/Stories",
  component: Input,
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    type: "text",
    placeholder: "Input",
  },
};
