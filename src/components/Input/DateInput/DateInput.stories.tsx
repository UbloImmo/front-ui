import { DateInput } from "./DateInput.component";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/Input/DateInput/Stories",
  component: DateInput,
  args: {
    uncontrolled: true,
  },
} satisfies Meta<typeof DateInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Pick a date",
  },
};
