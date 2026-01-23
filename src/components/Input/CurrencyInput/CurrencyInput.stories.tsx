import { fn } from "storybook/test";
import { useCallback, useEffect, useState } from "react";

import { CurrencyInput } from "./CurrencyInput.component";

import { Field, FieldProps } from "@/components/Field";
import { ComponentVariants } from "@docs/blocks";
import { componentSourceFactory } from "@docs/docs.utils";
import { useMergedProps } from "@utils";

import type { Currency, CurrencyInputProps } from "./CurrencyInput.types";
import type { Meta, StoryObj } from "@storybook/react-vite";

const componentSource = componentSourceFactory<CurrencyInputProps>(
  "CurrencyInput",
  {},
  CurrencyInput.defaultProps
);

const decorators: Meta<typeof CurrencyInput>["decorators"] = (
  Story,
  context
) => {
  const [value, setValue] = useState(context.args.value ?? null);

  useEffect(() => {
    setValue(context.args.value ?? null);
  }, [context.args.value]);
  const onChange = useCallback(
    (v: typeof value) => {
      if (context.args.onChange) context.args.onChange(v);
      setValue(v);
    },
    [setValue, context]
  );
  return (
    <CurrencyInput
      {...context.args}
      value={value}
      onChange={onChange}
      placeholder="test"
    />
  );
};

const meta = {
  component: CurrencyInput,
  title: "Components/Forms/Input/CurrencyInput/Stories",
  args: {
    ...CurrencyInput.defaultProps,
    onChange: fn(),
    placeholder: "Currency input",
    uncontrolled: true,
  },
  decorators,
  argTypes: {
    min: {
      type: "number",
    },
    max: {
      type: "number",
    },
    name: {
      type: "string",
    },
    currency: {
      options: ["euro", "dollar", "pound", "yen"],
    },
    value: {
      type: "number",
    },
    onChange: {
      type: "function",
    },
    testId: {
      type: "string",
    },
  },
  parameters: {
    docs: componentSource(),
  },
} satisfies Meta<typeof CurrencyInput>;

export default meta;
type Story = StoryObj<Meta<typeof CurrencyInput>>;

export const Default: Story = {};

const currencies: Currency[] = ["euro", "dollar", "pound", "yen"];

export const Currencies = (props: Partial<CurrencyInputProps>) => {
  const defaultProps = useMergedProps(CurrencyInput.defaultProps, props);

  return (
    <ComponentVariants
      defaults={defaultProps}
      variants={currencies}
      for="currency"
      of={CurrencyInput}
      scaling={1}
      propLabels
    />
  );
};

Currencies.args = {
  placeholder: "Currency input",
  onChange: fn(),
};

export const SignControl: Story = {
  args: {
    placeholder: "Currency input",
    showSign: true,
    onChange: fn(),
  },
};

export const MinMaxValue = (props: Partial<FieldProps<"currency">>) => {
  const defaultProps = useMergedProps(CurrencyInput.defaultProps, props);

  return (
    <Field
      {...defaultProps}
      type="currency"
      max={5}
      min={1}
      label={"Minimum and maximum values"}
      assistiveText={"Type a number between 1 and 5"}
      errorText={"Please enter a number between 1 and 5"}
    />
  );
};

MinMaxValue.args = {
  args: {
    placeholder: "Currency input",
    onChange: fn(),
  },
};
