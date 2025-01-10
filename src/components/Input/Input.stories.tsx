import { fn } from "@storybook/test";

import { Input } from "./Input.component";
import { inputTypes } from "./Input.data";
import { TextInput } from "../Input/TextInput/TextInput.component";

import { FlexRowLayout } from "@/layouts";
import { ComponentVariants } from "@docs/blocks";
import { useMergedProps } from "@utils";

import type { GenericInputProps } from "./Input.generic.types";
import type { InputProps, InputType } from "./Input.types";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/Forms/Input/Stories",
  component: Input,
  argTypes: {
    type: {
      options: inputTypes,
    },
  },
  args: {
    uncontrolled: true,
  },
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

export const Types = (props: GenericInputProps<InputType>) => {
  return (
    <ComponentVariants
      columns={2}
      defaults={props}
      variants={inputTypes}
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
