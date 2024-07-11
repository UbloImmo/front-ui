import { NullishPrimitives } from "@ubloimmo/front-util";

import { SelectInput } from "./SelectInput.component";

import { componentSourceFactory } from "@docs/docs.utils";

import type { SelectInputProps } from "./SelectInput.types";
import type { Meta, StoryObj } from "@storybook/react";

const componentSource = componentSourceFactory<
  SelectInputProps<NullishPrimitives>
>(
  "SelectInput",
  {
    // TODO
  },
  SelectInput.defaultProps
);

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
        disabled: true,
      },
      {
        label: "Option 5",
        value: "option-5",
      },
      {
        label: "Option 6",
        value: "option-6",
      },
    ],
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
