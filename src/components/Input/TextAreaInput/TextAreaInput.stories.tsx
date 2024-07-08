import { TextAreaInput } from "./TextAreaInput.component";
import { TextAreaInputProps } from "./TextAreaInput.types";

import { componentSourceFactory } from "@docs/docs.utils";

import type { Meta, StoryObj } from "@storybook/react";

const componentSource = componentSourceFactory<TextAreaInputProps>(
  "TextAreaInput",
  TextAreaInput.defaultProps
);

const meta = {
  component: TextAreaInput,
  title: "Components/Input/TextAreaInput/Stories",
  parameters: {
    docs: componentSource(),
  },
} satisfies Meta<typeof TextAreaInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Textarea input",
  },
};

export const Resize: Story = {
  args: {
    placeholder: "Textarea input",
    resize: true,
  },
};
