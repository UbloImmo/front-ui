import { addDays } from "date-fns";
import { fn } from "storybook/test";

import { Calendar } from "./Calendar.component";

import { ComponentVariants } from "@docs/blocks";
import { componentSourceFactory } from "@docs/docs.utils";
import { useStatic } from "@utils";

import type { CalendarProps } from "./Calendar.types";
import type { Meta, StoryObj } from "@storybook/react-vite";

const componentSource = componentSourceFactory<CalendarProps>(
  "Calendar",
  {
    // TODO
  },
  Calendar.__DEFAULT_PROPS
);

const meta = {
  component: Calendar,
  title: "Components/Forms/Calendar/Stories",
  args: {
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
  args: {},
};

export const NumberOfMonths = (props: CalendarProps) => {
  return (
    <ComponentVariants
      variants={[1, 2, 3]}
      for="numberOfMonths"
      of={Calendar}
      defaults={props}
      propLabels
    />
  );
};

export const SelectionModes = (props: CalendarProps) => {
  const now = useStatic(() => new Date(Date.now()));
  return (
    <ComponentVariants
      variants={[
        {
          mode: "single",
          date: now,
          __propVariantLabel: "single",
        },
        {
          mode: "range",
          range: {
            from: now,
            to: addDays(now, 9),
          },
        },
      ]}
      of={Calendar}
      defaults={{ ...props }}
      propLabels
    />
  );
};

export const MinMax = (props: CalendarProps) => {
  const now = useStatic(() => new Date(Date.now()));
  return (
    <ComponentVariants
      variants={[
        {
          min: null,
          max: null,
        },
        {
          min: addDays(now, 2),
          max: null,
        },
        {
          min: addDays(now, -1),
          max: addDays(now, 9),
        },
      ]}
      of={Calendar}
      defaults={{ ...props }}
      propLabels
    />
  );
};
const now = new Date(Date.now());

const disabled: CalendarProps["disabled"][] = [
  true,
  addDays(now, 5),
  {
    dayOfWeek: [5, 6],
  },
];

export const Disabled = (props: CalendarProps) => {
  return (
    <ComponentVariants
      variants={disabled}
      for="disabled"
      of={Calendar}
      defaults={{ ...props }}
      propLabels
    />
  );
};
