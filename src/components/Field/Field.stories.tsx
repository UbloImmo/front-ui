import { fn } from "@storybook/test";
import { useState } from "react";

import { Field } from "./Field.component";
import { inputTypes } from "../Input/Input.data";

import { ComponentVariants } from "@docs/blocks";
import { componentSourceFactory } from "@docs/docs.utils";
import { useMergedProps } from "@utils";

import type { FieldProps } from "./Field.types";
import type { InputType, InputValue } from "../Input";
import type { InputLabelTooltipProps } from "../InputLabel";
import type { Meta, StoryObj } from "@storybook/react";
import type { Nullable } from "@ubloimmo/front-util";

const componentSource = componentSourceFactory<FieldProps<InputType>>(
  "Field",
  {
    type: "text",
    label: "[Field label]",
  },
  Field.defaultProps
);

const meta = {
  component: Field,
  title: "Components/Forms/Field/Stories",
  args: {
    ...Field.defaultProps,
    onChange: fn() as FieldProps<"text">["onChange"],
    label: "Some field",
    placeholder: "Some field's placeholder",
    assistiveText: "Some field's assistive text",
    errorText: "Some field's error text",
    uncontrolled: true,
  },
  argTypes: {
    type: {
      options: inputTypes,
      table: {
        defaultValue: {
          summary: "text",
        },
      },
    },
    assistiveText: {
      type: "string",
      table: {
        defaultValue: {
          summary: "Some field's assistive text",
        },
      },
    },
    errorText: {
      type: "string",
      table: {
        defaultValue: {
          summary: "Some field's error text",
        },
      },
    },
    error: {
      type: "boolean",
    },
    label: {
      type: "string",
    },
    placeholder: {
      type: "string",
      table: {
        defaultValue: {
          summary: "Some field's placeholder",
        },
      },
    },
  },
  parameters: {
    docs: componentSource(),
  },
} satisfies Meta<typeof Field>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} as Story;

export const Types = (props: FieldProps<InputType>) => {
  const defaults = useMergedProps(
    Field.defaultProps as Required<FieldProps<InputType>>,
    props
  );
  return (
    <ComponentVariants
      variants={inputTypes.map((type) => ({
        type,
        label: `A ${type} field`,
        __propVariantLabel: `type:${type}`,
      }))}
      of={Field}
      defaults={defaults}
      propLabels
      scaling={1}
      columns={2}
    />
  );
};

const labels = ["First name", "Last name"];

export const Labels = (props: FieldProps<InputType>) => {
  const defaults = useMergedProps(
    Field.defaultProps as Required<FieldProps<InputType>>,
    props
  );
  return (
    <ComponentVariants
      variants={labels}
      for="label"
      of={Field}
      defaults={defaults}
      propLabels
      scaling={1}
      columns={2}
    />
  );
};

const bools = [false, true];

export const Required = (props: FieldProps<InputType>) => {
  const defaults = useMergedProps(
    Field.defaultProps as Required<FieldProps<InputType>>,
    props
  );
  return (
    <ComponentVariants
      variants={bools}
      for="required"
      of={Field}
      defaults={defaults}
      propLabels
      scaling={1}
      columns={2}
    />
  );
};

export const Disabled = (props: FieldProps<InputType>) => {
  const defaults = useMergedProps(
    Field.defaultProps as Required<FieldProps<InputType>>,
    props
  );
  return (
    <ComponentVariants
      variants={bools}
      for="disabled"
      of={Field}
      defaults={defaults}
      propLabels
      scaling={1}
      columns={2}
    />
  );
};

const assistiveTexts = ["The CVC can be found on the back of your card", null];

export const AssistiveTexts = (props: FieldProps<InputType>) => {
  const defaults = useMergedProps(
    Field.defaultProps as Required<FieldProps<InputType>>,
    props
  );
  return (
    <ComponentVariants
      variants={assistiveTexts}
      for="assistiveText"
      of={Field}
      defaults={defaults}
      propLabels
      scaling={1}
      columns={2}
    />
  );
};

const errorTexts = ["This field is required", null];

export const ErrorTexts = (props: FieldProps<InputType>) => {
  const defaults = useMergedProps(
    Field.defaultProps as Required<FieldProps<InputType>>,
    { ...props, error: true, assistiveText: null }
  );
  return (
    <ComponentVariants
      variants={errorTexts}
      for="errorText"
      of={Field}
      defaults={defaults}
      propLabels
      scaling={1}
      columns={2}
    />
  );
};

const tooltipProps: Nullable<InputLabelTooltipProps>[] = [
  null,
  { content: "Label tooltip" },
];

export const Tooltips = (props: FieldProps<InputType>) => {
  const defaults = useMergedProps(
    Field.defaultProps as Required<FieldProps<InputType>>,
    props
  );
  return (
    <ComponentVariants
      variants={tooltipProps}
      for="tooltip"
      of={Field}
      defaults={defaults}
      scaling={1}
      columns={2}
    />
  );
};

export const Controlled = (props: Partial<FieldProps<InputType>>) => {
  const [innerValue, setInnerValue] =
    useState<Nullable<InputValue<InputType>>>(null);

  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore needed to check unintended behavior with no props
    <Field
      {...props}
      type={props.type as InputType}
      value={innerValue}
      onChange={setInnerValue}
      uncontrolled={false}
    />
  );
};
