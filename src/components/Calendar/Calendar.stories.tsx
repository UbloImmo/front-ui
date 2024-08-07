import { fn } from "@storybook/test";

import { Calendar } from "./Calendar.component";

import { componentSourceFactory } from "@docs/docs.utils";

import type { CalendarProps } from "./Calendar.types";
import type { Meta, StoryObj } from "@storybook/react";

const componentSource = componentSourceFactory<CalendarProps>(
  "Calendar",
  {
    // TODO
  },
  Calendar.defaultProps
);

const meta = {
  component: Calendar,
  title: "Components/Calendar/Stories",
  args: {
    // TODO
    onChange: fn(),
  },
  argTypes: {
    numberOfMonths: {
      type: "number",
    },
  },
  parameters: {
    docs: componentSource(),
  },
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // date: new Date(2022, 0, 1),
  },
};
