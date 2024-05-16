import { fn } from "@storybook/test";

import { Input } from "./Input.component";
import { GenericInputProps, InputProps, InputType } from "./Input.types";
import { TextInput } from "../Input/TextInput/TextInput.component";

import { FlexRowLayout } from "@/layouts";
import { ComponentVariants } from "@docs/blocks";
import { useMergedProps } from "@utils";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/Input/Common/Stories",
  component: Input,
  decorators: [
    (Story) => (
      <FlexRowLayout gap="s-4" align="center" justify="start" wrap>
        <Story />
      </FlexRowLayout>
    ),
  ],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    type: "text",
    placeholder: "Input",
  },
};

const types: InputType[] = ["text", "number", "email", "password", "phone"];
export const Types = (props: GenericInputProps<(typeof types)[number]>) => {
  return (
    <ComponentVariants
      columns={2}
      defaults={props}
      variants={types}
      for="type"
      of={Input}
      scaling={1}
      propLabels
    />
  );
};

Types.args = {
  onChange: fn(),
};

const booleans: boolean[] = [true, false];
export const Disabled = (props: Partial<InputProps<"text">>) => {
  const defaultProps = useMergedProps(TextInput.defaultProps, props);

  return (
    <ComponentVariants
      defaults={defaultProps}
      variants={booleans}
      for="disabled"
      of={TextInput}
      scaling={1}
      propLabels
    />
  );
};

Disabled.args = {
  placeholder: "Input value",
};

export const Error = (props: Partial<InputProps<"text">>) => {
  const defaultProps = useMergedProps(TextInput.defaultProps, props);

  return (
    <ComponentVariants
      defaults={defaultProps}
      variants={booleans}
      for="error"
      of={TextInput}
      scaling={1}
      propLabels
    />
  );
};
Error.args = {
  placeholder: "Input value",
};

const placeholders = ["Enter your value", ""];
export const Placeholder = (props: Partial<InputProps<"text">>) => {
  const defaultProps = useMergedProps(TextInput.defaultProps, props);

  return (
    <ComponentVariants
      defaults={defaultProps}
      variants={placeholders}
      for="placeholder"
      of={TextInput}
      scaling={1}
      propLabels
    />
  );
};
