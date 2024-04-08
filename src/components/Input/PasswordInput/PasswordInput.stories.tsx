import { PasswordInput } from "./PasswordInput.component";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/Input/PasswordInput/Stories",
  component: PasswordInput,
  argTypes: {
    visible: {
      control: "boolean",
      description: "Whether the password is visible at first.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: false },
      },
    },
    allowChangeVisibility: {
      description:
        "Whether to allow the user to change the password visibility",
      control: "boolean",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: true },
      },
    },
  },
} satisfies Meta<typeof PasswordInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Password",
  },
};

export const Visibility: Story = {
  args: {
    placeholder: "Password",
    value: "Super safe password",
  },
};
