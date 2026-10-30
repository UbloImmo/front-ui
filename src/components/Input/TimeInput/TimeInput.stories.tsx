import { fn } from "storybook/test";

import { TimeInput } from "./TimeInput.component";
import { TimeInputProps } from "./TimeInput.types";

import { ComponentVariants } from "@docs/blocks";
import { TimeStr } from "@types";
import { useStatic, formatTimeSplit, currentTime, arrayOf } from "@utils";

import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "Components/Forms/Input/TimeInput/Stories",
  component: TimeInput,
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
} satisfies Meta<typeof TimeInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Pick a time",
  },
};

export const Values = (props: TimeInputProps) => {
  const values = useStatic(() => {
    return [null, currentTime(), formatTimeSplit({ hour: 20, minute: 26 })];
  });

  return (
    <ComponentVariants
      defaults={props}
      variants={values}
      for="value"
      of={TimeInput}
      columns={values.length}
      propLabels
    />
  );
};

const steps = [1, 5, 10, 12, 15];
export const Step = (props: TimeInputProps) => {
  return (
    <ComponentVariants
      defaults={props}
      for="step"
      of={TimeInput}
      variants={steps}
      propLabels
    />
  );
};

const mins: TimeStr[] = ["04:35", "12:00", "21:17", "12:45"];
export const Min = (props: TimeInputProps) => {
  return (
    <ComponentVariants
      defaults={props}
      for="min"
      of={TimeInput}
      variants={mins}
      propLabels
    />
  );
};

const maxs: TimeStr[] = ["11:50", "15:30", "05:22", "12:30"];
export const Max = (props: TimeInputProps) => {
  return (
    <ComponentVariants
      defaults={props}
      for="max"
      of={TimeInput}
      variants={maxs}
      propLabels
    />
  );
};

const minMaxes = arrayOf(Math.min(mins.length, maxs.length), (index) => ({
  min: mins[index],
  max: maxs[index],
}));
export const MinMax = (props: TimeInputProps) => {
  return (
    <ComponentVariants
      defaults={props}
      of={TimeInput}
      variants={minMaxes}
      propLabels
    />
  );
};

const bools = [true, false];

export const Disabled = (props: TimeInputProps) => {
  return (
    <ComponentVariants
      defaults={props}
      for="disabled"
      of={TimeInput}
      variants={bools}
      propLabels
    />
  );
};
Disabled.args = {
  value: "12:34",
};
