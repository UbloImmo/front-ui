import { SelectInput } from "./SelectInput.component";

import { componentSourceFactory } from "@docs/docs.utils";

import type { SelectInputProps } from "./SelectInput.types";
import type { Meta, StoryObj } from "@storybook/react";

const componentSource = componentSourceFactory<SelectInputProps<string>>(
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
    // TODO
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
