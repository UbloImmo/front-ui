import { fn } from "@storybook/test";

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
  title: "Components/Forms/ComboBoxButton/Stories",
  args: {
    label: "[ComboBox option]",
    multi: false,
    onSelect: fn(),
    onEdit: fn(),
    onDelete: fn(),
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
    description: {
      type: "string",
    },
    label: {
      type: "string",
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
      columns={2}
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
      columns={2}
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
      columns={2}
    />
  );
};

const descriptions = [null, "This button has a description!"];
export const Description = (props: ComboBoxButtonProps) => {
  return (
    <ComponentVariants
      variants={descriptions}
      for="description"
      of={ComboBoxButton}
      defaults={props}
      propLabels
      columns={2}
    />
  );
};

const labels = ["Option A", "Option B with a somewhat longer label"];
export const Label = (props: ComboBoxButtonProps) => {
  return (
    <ComponentVariants
      variants={labels}
      for="label"
      of={ComboBoxButton}
      defaults={props}
      propLabels
      columns={2}
    />
  );
};

export const WithMenu: Story = {
  args: {
    editable: true,
    onEdit: fn(),
    editLabel: "Edit me!",
    deletable: true,
    onDelete: fn(),
    deleteLabel: "Delete me!",
  },
};
