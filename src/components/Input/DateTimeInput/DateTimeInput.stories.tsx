import { addDays, set } from "date-fns";
import { fn } from "storybook/test";

import { DateTimeInput } from "./DateTimeInput.component";

import { ComponentVariants } from "@docs/blocks";
import { TimeStr } from "@types";
import { arrayOf, dateToDateISO, parseTimeStr, useStatic } from "@utils";

import type { DateTimeInputProps } from "./DateTimeInput.types";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "Components/Forms/Input/DateTimeInput/Stories",
  component: DateTimeInput,
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
    step: {
      type: "number",
      control: {
        min: 1,
        max: 60,
      },
    },
  },
} satisfies Meta<typeof DateTimeInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Pick a date",
    timePlaceholder: "Pick a time",
  },
};

const steps = [1, 5, 10, 12, 15];
export const Step = (props: DateTimeInputProps) => {
  return (
    <ComponentVariants
      defaults={props}
      for="step"
      of={DateTimeInput}
      variants={steps}
      propLabels
      columns={2}
    />
  );
};

export const Values = (props: DateTimeInputProps) => {
  const values = useStatic(() => {
    return [null, dateToDateISO(new Date(Date.now()))];
  });

  return (
    <ComponentVariants
      defaults={props}
      variants={values}
      for="value"
      of={DateTimeInput}
      columns={values.length}
      propLabels
    />
  );
};

const mins: string[] = (
  ["04:35", "12:00", "21:17", "12:45"] satisfies TimeStr[]
).map((time, index) => {
  const { hour, minute } = parseTimeStr(time)!;
  return dateToDateISO(
    addDays(set(new Date(Date.now()), { hours: hour, minutes: minute }), index)
  );
});
export const Min = (props: DateTimeInputProps) => {
  return (
    <ComponentVariants
      defaults={props}
      for="min"
      of={DateTimeInput}
      variants={mins}
      propLabels
      columns={2}
    />
  );
};

const maxs: string[] = (
  ["11:50", "15:30", "05:22", "12:30"] satisfies TimeStr[]
).map((time, index) => {
  const { hour, minute } = parseTimeStr(time)!;
  return dateToDateISO(
    addDays(
      set(new Date(Date.now()), { hours: hour, minutes: minute }),
      index * 2
    )
  );
});
export const Max = (props: DateTimeInputProps) => {
  return (
    <ComponentVariants
      defaults={props}
      for="max"
      of={DateTimeInput}
      variants={maxs}
      propLabels
      columns={2}
    />
  );
};

const minMaxes = arrayOf(Math.min(mins.length, maxs.length), (index) => ({
  min: mins[index],
  max: maxs[index],
}));
export const MinMax = (props: DateTimeInputProps) => {
  return (
    <ComponentVariants
      defaults={props}
      of={DateTimeInput}
      variants={minMaxes}
      propLabels
      columns={2}
    />
  );
};

const bools = [true, false];

export const Disabled = (props: DateTimeInputProps) => {
  return (
    <ComponentVariants
      defaults={props}
      for="disabled"
      of={DateTimeInput}
      variants={bools}
      propLabels
      columns={2}
    />
  );
};
Disabled.args = {
  value: dateToDateISO(set(new Date(Date.now()), { hours: 12, minutes: 34 })),
};
