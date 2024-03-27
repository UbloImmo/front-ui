import { EmailInput } from "./EmailInput.component";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/Input/EmailInput",
  component: EmailInput,
} satisfies Meta<typeof EmailInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "mail@ublo.immo",
    error: false,
    disabled: false,
  },
};
