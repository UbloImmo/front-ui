import { fn } from "storybook/test";

import { PhoneInput } from "./PhoneInput.component";

import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "Components/Forms/Input/PhoneInput/Stories",
  component: PhoneInput,
  args: {
    uncontrolled: true,
  },
} satisfies Meta<typeof PhoneInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

Default.args = {
  onChange: fn(),
};
