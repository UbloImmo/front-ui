import { ComboBoxButton } from "./ComboBoxButton.component";

import { ComponentVariants } from "@docs/blocks";
import { componentSourceFactory } from "@docs/docs.utils";

import type { ComboBoxButtonProps } from "./ComboBoxButton.types";
import type { Meta, StoryObj } from "@storybook/react";

const componentSource = componentSourceFactory<ComboBoxButtonProps>(
  "ComboBoxButton",
  ComboBoxButton.defaultProps
);

const meta = {
  component: ComboBoxButton,
  title: "Components/ComboBoxButton/Stories",
  args: {
    label: "[ComboBox option]",
    multi: false,
  },
  argTypes: {
    multi: {
      type: "boolean",
    },
    active: {
      type: "boolean",
    },
    disabled: {
      type: "boolean",
    },
  },
  parameters: {
    docs: componentSource(),
  },
} satisfies Meta<typeof ComboBoxButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Active = (props: ComboBoxButtonProps) => {
  return (
    <ComponentVariants
      for="active"
      of={ComboBoxButton}
      defaults={props}
      variants={[true, false]}
      propLabels
    />
  );
};

export const Disabled = (props: ComboBoxButtonProps) => {
  return (
    <ComponentVariants
      for="disabled"
      of={ComboBoxButton}
      defaults={props}
      variants={[true, false]}
      propLabels
    />
  );
};

export const Multi = (props: ComboBoxButtonProps) => {
  return (
    <ComponentVariants
      for="multi"
      of={ComboBoxButton}
      defaults={props}
      variants={[true, false]}
      propLabels
    />
  );
};
