import { fn } from "@storybook/test";

import { DateInput } from "./DateInput.component";
import { DateInputProps } from "./DateInput.types";
import {
  normalizeToDateISO,
  normalizeToDateNativeStr,
  normalizeToDateStr,
} from "./DateInput.utils";

import { ComponentVariants } from "@docs/blocks";
import { useStatic } from "@utils";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/Forms/Input/DateInput/Stories",
  component: DateInput,
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
} satisfies Meta<typeof DateInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Pick a date",
  },
};

export const Values = (props: DateInputProps) => {
  const values = useStatic(() => {
    const now = new Date(Date.now());
    return [
      normalizeToDateISO(now),
      normalizeToDateStr(now),
      normalizeToDateNativeStr(now),
    ];
  });
  return (
    <ComponentVariants
      defaults={props}
      variants={values}
      for="value"
      of={DateInput}
      columns={values.length}
      propLabels
    />
  );
};
