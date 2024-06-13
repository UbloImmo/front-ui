import { Form } from "./Form.component";

import { componentSourceFactory } from "@docs/docs.utils";

import type { FormProps } from "./Form.types";
import type { Meta, StoryObj } from "@storybook/react";

const componentSource = componentSourceFactory<FormProps>(
  "Form",
  {
    // TODO
  },
  Form.defaultProps
);

const meta = {
  component: Form,
  title: "Components/Form/Stories",
  args: {
    // TODO
  },
  parameters: {
    docs: componentSource(),
  },
} satisfies Meta<typeof Form>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
