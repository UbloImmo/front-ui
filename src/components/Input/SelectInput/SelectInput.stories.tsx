import { fn } from "@storybook/test";
import { NullishPrimitives } from "@ubloimmo/front-util";

import { SelectInput } from "./SelectInput.component";

import { componentSourceFactory } from "@docs/docs.utils";

import type { SelectInputProps } from "./SelectInput.types";
import type { Meta, StoryObj } from "@storybook/react";

const componentSource = componentSourceFactory<
  SelectInputProps<NullishPrimitives>
>("SelectInput", SelectInput.defaultProps);

const meta = {
  component: SelectInput,
  title: "Components/Input/SelectInput/Stories",
  args: {
    placeholder: "Select an option",
    options: [
      {
        label: "Option 1",
        value: "option-1",
      },
      {
        label: "Option 2",
        value: "option-2",
      },
      {
        label: "Option 3",
        value: "option-3",
      },
      {
        label: "Option 4",
        value: "option-4",
      },
    ],
    onChange: fn(),
  },
  parameters: {
    docs: componentSource(),
  },
  argTypes: {
    error: {
      type: "boolean",
    },
    disabled: {
      type: "boolean",
    },
    required: {
      type: "boolean",
    },
  },
} satisfies Meta<typeof SelectInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const DisabledOptions: Story = {
  args: {
    placeholder: "Select an option",
    options: [
      {
        label: "This option is selectable",
        value: "option-1",
      },
      {
        label: "This option is selectable too...",
        value: "option-2",
      },
      {
        label: "...But not this one",
        value: "option-3",
        disabled: true,
      },
    ],
  },
};

export const Searchable: Story = {
  args: {
    searchable: true,
  },
};

export const GroupOptions: Story = {
  args: {
    options: [
      {
        label: "Group 1",
        options: [
          {
            label: "Option 1",
            value: "option-1",
          },
          {
            label: "Option 2",
            value: "option-2",
          },
          {
            label: "Option 3",
            value: "option-3",
          },
        ],
      },
    ],
  },
};
