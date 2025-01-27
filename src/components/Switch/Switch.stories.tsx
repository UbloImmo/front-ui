import { fn } from "@storybook/test";

import { Switch } from "./Switch.component";

import { ComponentVariants, DetailConfigVariants } from "@docs/blocks";
import { componentSourceFactory } from "@docs/docs.utils";

import type { SwitchProps } from "./Switch.types";
import type { Meta, StoryObj } from "@storybook/react";

const componentSource = componentSourceFactory<SwitchProps>(
  "Switch",
  Switch.defaultProps,
);

const meta = {
  component: Switch,
  title: "Components/Forms/Switch/Stories",
  args: {
    disabled: false,
    active: false,
    withHelper: false,
    onChange: fn(),
  },
  argTypes: {
    disabled: {
      type: "boolean",
    },
    active: {
      type: "boolean",
    },
    withHelper: {
      type: "boolean",
    },
    activeHelperText: {
      type: "string",
    },
    inactiveHelperText: {
      type: "string",
    },
  },
  parameters: {
    docs: componentSource(),
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Active = (props: SwitchProps) => {
  return (
    <ComponentVariants
      for="active"
      of={Switch}
      defaults={props}
      variants={[true, false]}
      propLabels
      scaling={1}
    />
  );
};

Active.parameters = {
  docs: componentSource(
    [true, false].map((bool) => ({
      active: bool,
      disabled: false,
    })),
  ),
};

const disabledExamples: DetailConfigVariants<SwitchProps> = [
  {
    disabled: true,
    active: false,
  },
  {
    disabled: true,
    active: true,
  },
];

export const Disabled = () => {
  return (
    <ComponentVariants
      of={Switch}
      defaults={Switch.defaultProps}
      variants={disabledExamples}
      propLabels
      scaling={1}
    />
  );
};

Disabled.parameters = {
  docs: componentSource(
    [true, false].map((bool) => ({
      disabled: bool,
    })),
  ),
};

const withHelperExamples: DetailConfigVariants<SwitchProps> = [
  {
    disabled: false,
    active: false,
  },
  {
    disabled: false,
    active: true,
  },
  ...disabledExamples,
];

export const WithHelper = (props: SwitchProps) => {
  return (
    <ComponentVariants
      of={Switch}
      defaults={props}
      variants={withHelperExamples}
      propLabels
      scaling={1}
    />
  );
};

WithHelper.args = {
  withHelper: true,
};
