import { fn } from "@storybook/test";

import { ComboBox } from "./ComboBox.component";

import { ComponentVariants } from "@docs/blocks";
import { componentSourceFactory } from "@docs/docs.utils";

import type { ComboBoxOption, ComboBoxProps } from "./ComboBox.types";
import type { Meta, StoryObj } from "@storybook/react";
import type { NullishPrimitives } from "@ubloimmo/front-util";

const componentSource = componentSourceFactory<
  ComboBoxProps<NullishPrimitives>
>("ComboBox", ComboBox.defaultProps);

const options: ComboBoxOption<NullishPrimitives>[] = [
  {
    label: "[ComboBox option 1]",
    value: "option-1",
  },
  {
    label: "[ComboBox option 2]",
    value: "option-2",
  },
  {
    label: "Disabled option",
    value: "option-3",
    disabled: true,
  },
];

const meta = {
  component: ComboBox,
  title: "Components/ComboBox/Stories",
  args: {
    options,
    direction: "column",
    multi: false,
    onChange: fn(),
  },
  argTypes: {
    multi: {
      type: "boolean",
    },
    direction: {
      options: ["row", "column"],
    },
    showIcon: {
      type: "boolean",
    },
    columns: {
      type: "number",
    },
    creatable: {
      type: "boolean",
    },
    disabled: {
      type: "boolean",
    },
  },
  parameters: {
    docs: componentSource(),
  },
} satisfies Meta<typeof ComboBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const MultiSelect = () => {
  return (
    <ComponentVariants
      for="multi"
      of={ComboBox}
      defaults={meta.args}
      variants={[false, true]}
      propLabels
    />
  );
};

export const Direction = () => {
  return (
    <ComponentVariants
      for="direction"
      of={ComboBox}
      defaults={meta.args}
      variants={["row", "column"]}
      propLabels
    />
  );
};

export const Columns = () => {
  return (
    <ComponentVariants
      for="columns"
      of={ComboBox}
      defaults={meta.args}
      variants={[1, 2]}
      propLabels
      columns={2}
    />
  );
};

export const DisabledOptions: Story = {
  args: {
    options: [
      {
        label: "This option is selectable",
        value: "option-1",
        disabled: false,
      },
      {
        label: "...but not this one",
        value: "option-2",
        disabled: true,
      },
      {
        label: "...nor this one",
        value: "option-3",
        disabled: true,
      },
    ],
  },
};

export const ShowIcon = () => {
  return (
    <ComponentVariants
      for="showIcon"
      of={ComboBox}
      defaults={meta.args}
      variants={[true, false]}
      propLabels
    />
  );
};

export const Creatable: Story = {
  args: {
    creatable: true,
    multi: true,
    showIcon: false,
    onCreate: fn(),
  },
};

export const EditingAndDeletingOptions: Story = {
  args: {
    options: [
      {
        label: "Option 1",
        value: "option-1",
      },
      {
        label: "Option 2",
        value: "option-2",
      },
    ],
    creatable: true,
    onOptionDelete: fn(),
    onOptionEdit: fn(),
    direction: "row",
    optionDeleteLabel: "Delete me !",
    optionEditLabel: "Edit me!",
  },
};
