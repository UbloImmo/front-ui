import { fn } from "storybook/test";

import { MonthYearInput } from "./MonthYearInput.component";

import type { Meta, StoryObj } from "@storybook/react-vite";

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
  },
} satisfies Meta<typeof MonthYearInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "MM/YYYY",
  },
};

export const WithValue: Story = {
  args: {
    value: "2025-13",
    placeholder: "MM/YYYY",
  },
};

export const Disabled: Story = {
  args: {
    value: "2025-12",
    disabled: true,
  },
};
