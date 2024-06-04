import { fn } from "@storybook/test";
import { useCallback, useState } from "react";

import { CurrencyInput } from "./CurrencyInput.component";

import { componentSourceFactory } from "@docs/docs.utils";

import type { CurrencyInputProps } from "./CurrencyInput.types";
import type { Meta, StoryObj } from "@storybook/react";

const componentSource = componentSourceFactory<CurrencyInputProps>(
  "CurrencyInput",
  {
    // TODO
  },
  CurrencyInput.defaultProps
);

const meta = {
  component: CurrencyInput,
  title: "Components/Input/CurrencyInput/Stories",
  args: {
    ...CurrencyInput.defaultProps,
    onChange: fn(),
  },
  decorators: (Story, context) => {
    const [value, setValue] = useState(context.args.value ?? null);
    const onChange = useCallback(
      (v: typeof value) => {
        if (context.args.onChange) context.args.onChange(v);
        setValue(v);
      },
      [setValue, context]
    );
    return (
      <CurrencyInput {...context.args} value={value} onChange={onChange} />
    );
  },
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
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
