import { Field } from "./Field.component";

import { componentSourceFactory } from "@docs/docs.utils";

import type { FieldProps } from "./Field.types";
import type { Meta, StoryObj } from "@storybook/react";

const componentSource = componentSourceFactory<FieldProps>(
  "Field",
  {
    // TODO
  },
  Field.defaultProps
);

const meta = {
  component: Field,
  title: "Components/Field/Stories",
  args: {
    // TODO
  },
  parameters: {
    docs: componentSource(),
  },
} satisfies Meta<typeof Field>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
