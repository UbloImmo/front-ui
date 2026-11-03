import { fn } from "storybook/test";

import { TimePicker } from "./TimePicker.component";

import { ComponentVariants } from "@docs/blocks";
import { componentSourceFactory } from "@docs/docs.utils";
import { TimeStr } from "@types";
import { arrayOf } from "@utils";

import type { TimePickerProps } from "./TimePicker.types";
import type { Meta, StoryObj, StoryFn } from "@storybook/react-vite";

const componentSource = componentSourceFactory<TimePickerProps>(
  "TimePicker",
  {
    // TODO
  },
  TimePicker.__DEFAULT_PROPS
);

const meta = {
  component: TimePicker,
  title: "Components/Forms/TimePicker/Stories",
  args: {
    onChange: fn(),
  },
  argTypes: {
    time: {
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
  parameters: {
    docs: componentSource(),
  },
} satisfies Meta<typeof TimePicker>;

export default meta;
type Story = StoryObj<typeof meta> | StoryFn<typeof meta>;

export const Default: Story = {};

const steps = [1, 5, 10, 12, 15];
export const Step = (props: TimePickerProps) => {
  return (
    <ComponentVariants
      defaults={props}
      for="step"
      of={TimePicker}
      variants={steps}
      propLabels
    />
  );
};

const mins: TimeStr[] = ["04:35", "12:00", "21:17", "12:45"];
export const Min = (props: TimePickerProps) => {
  return (
    <ComponentVariants
      defaults={props}
      for="min"
      of={TimePicker}
      variants={mins}
      propLabels
    />
  );
};

const maxs: TimeStr[] = ["11:50", "15:30", "05:22", "12:30"];
export const Max = (props: TimePickerProps) => {
  return (
    <ComponentVariants
      defaults={props}
      for="max"
      of={TimePicker}
      variants={maxs}
      propLabels
    />
  );
};

const minMaxes = arrayOf(Math.min(mins.length, maxs.length), (index) => ({
  min: mins[index],
  max: maxs[index],
}));
export const MinMax = (props: TimePickerProps) => {
  return (
    <ComponentVariants
      defaults={props}
      of={TimePicker}
      variants={minMaxes}
      propLabels
    />
  );
};

const bools = [true, false];

export const Disabled = (props: TimePickerProps) => {
  return (
    <ComponentVariants
      defaults={props}
      for="disabled"
      of={TimePicker}
      variants={bools}
      propLabels
    />
  );
};
Disabled.args = {
  time: "12:34",
};
