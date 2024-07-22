import { fn } from "@storybook/test";

import { Checkbox } from "./Checkbox.component";

import { ComponentVariants, DetailConfigVariants } from "@docs/blocks";
import { componentSourceFactory } from "@docs/docs.utils";

import type { CheckboxProps, CheckboxStatus } from "./Checkbox.types";
import type { Meta, StoryObj } from "@storybook/react";

const componentSource = componentSourceFactory<CheckboxProps>(
  "Checkbox",
  Checkbox.defaultProps
);

const checkboxStatus: CheckboxStatus[] = [true, "mixed", false];

const meta = {
  component: Checkbox,
  title: "Components/Checkbox/Stories",
  args: {
    active: false,
    disabled: false,
    onChange: fn(),
  },
  parameters: {
    docs: componentSource(),
  },
  argTypes: {
    active: {
      options: checkboxStatus,
    },
    disabled: {
      type: "boolean",
    },
    onChange: {
      type: "function",
    },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const States = () => {
  return (
    <ComponentVariants
      of={Checkbox}
      for="active"
      defaults={Checkbox.defaultProps}
      variants={checkboxStatus}
      propLabels
    />
  );
};

const disabledStates: DetailConfigVariants<CheckboxProps> = [
  {
    active: true,
    disabled: true,
    __propVariantLabel: "Disabled and Active",
  },
  {
    active: "mixed",
    disabled: true,
    __propVariantLabel: "Disabled and Mixed",
  },
  {
    active: false,
    disabled: true,
    __propVariantLabel: "Disabled",
  },
];

export const Disabled = () => {
  return (
    <ComponentVariants
      of={Checkbox}
      defaults={Checkbox.defaultProps}
      variants={disabledStates}
      propLabels
    />
  );
};
