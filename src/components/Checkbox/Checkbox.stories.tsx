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

const states: DetailConfigVariants<CheckboxProps> = [
  {
    active: false,
    disabled: false,
    __propVariantLabel: "Default",
  },
  {
    active: false,
    disabled: true,
    __propVariantLabel: "Disabled",
  },
  {
    active: "mixed",
    disabled: false,
    __propVariantLabel: "Mixed",
  },
  {
    active: "mixed",
    disabled: true,
    __propVariantLabel: "Disabled and Mixed",
  },

  {
    active: true,
    disabled: false,
    __propVariantLabel: "Active",
  },
  {
    active: true,
    disabled: true,
    __propVariantLabel: "Disabled and Active",
  },
];

export const States = () => {
  return (
    <ComponentVariants
      of={Checkbox}
      columns={2}
      defaults={Checkbox.defaultProps}
      variants={states}
      propLabels
    />
  );
};
