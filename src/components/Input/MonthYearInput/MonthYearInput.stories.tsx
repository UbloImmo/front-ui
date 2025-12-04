import { fn } from "@storybook/test";

import { MonthYearInput } from "./MonthYearInput.component";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/Forms/Input/MonthYearInput/Stories",
  component: MonthYearInput,
  args: {
    uncontrolled: true,
    onChange: fn(),
  },
  argTypes: {
    value: {
      type: "string",
    },
    min: {
      type: "string",
    },
    max: {
      type: "string",
    },
  },
} satisfies Meta<typeof MonthYearInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "MM/YYYY",
  },
};
