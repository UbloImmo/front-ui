import { SumLine } from "./SumLine.component";
import {
  sumLineUnits,
  type SumLineProps,
  type SumLineSize,
} from "./SumLine.types";

import { ComponentVariants } from "@docs/blocks";
import { componentSourceFactory } from "@docs/docs.utils";
import { FlexColumnLayout } from "@layouts";
import { useMergedProps } from "@utils";

import type { Meta, StoryFn, StoryObj } from "@storybook/react-vite";

const source = componentSourceFactory<SumLineProps>(
  "SumLine",
  undefined,
  SumLine.__DEFAULT_PROPS
);

const meta = {
  title: "Components/States/SumLine/Stories",
  component: SumLine,
  args: {
    label: "[Label]",
    value: 123456789,
  },
  argTypes: {
    size: {
      options: ["m", "l"],
    },
    label: {
      type: "string",
    },
    value: {
      type: "number",
    },
    unit: {
      optons: sumLineUnits,
    },
  },
} satisfies Meta<typeof SumLine>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "[Label]",
    value: 0,
  },
  parameters: {
    docs: source(),
  },
};

const MultiSumLine = (props: SumLineProps) => {
  return (
    <FlexColumnLayout fill="row">
      <SumLine {...props} />
      <SumLine {...props} />
      <SumLine {...props} size="l" />
    </FlexColumnLayout>
  );
};

export const MultipleSumLines: StoryFn<typeof meta> = (props) => (
  <MultiSumLine label="[Label]" value={123456789} {...props} />
);
MultiSumLine.parameters = {
  docs: source([
    SumLine.__DEFAULT_PROPS,
    SumLine.__DEFAULT_PROPS,
    { ...SumLine.__DEFAULT_PROPS, size: "l" },
  ]),
};

const sizes: SumLineSize[] = ["m", "l"];

export const Sizes = (props: Partial<SumLineProps>) => {
  const defaultProps = useMergedProps(SumLine.__DEFAULT_PROPS, props);

  return (
    <ComponentVariants
      defaults={defaultProps}
      variants={sizes}
      for="size"
      of={SumLine}
      columns={2}
      propLabels
    />
  );
};
Sizes.parameters = {
  docs: source([
    SumLine.__DEFAULT_PROPS,
    SumLine.__DEFAULT_PROPS,
    { ...SumLine.__DEFAULT_PROPS, size: "l" },
  ]),
};

export const Units = (props: Partial<SumLineProps>) => {
  const defaultProps = useMergedProps(SumLine.__DEFAULT_PROPS, props);

  return (
    <ComponentVariants
      defaults={defaultProps}
      variants={[null, ...sumLineUnits]}
      for="unit"
      of={SumLine}
      columns={2}
      propLabels
    />
  );
};
Sizes.parameters = {
  docs: source(sumLineUnits.map((unit) => ({ ...SumLine.__DEFAULT_PROPS, unit }))),
};

const periods = ["month", "year", "quarter", "tenant"];

export const Periods = (props: Partial<SumLineProps>) => {
  const defaultProps = useMergedProps(SumLine.__DEFAULT_PROPS, props);

  return (
    <ComponentVariants
      defaults={defaultProps}
      variants={periods}
      for="period"
      of={SumLine}
      columns={2}
      propLabels
    />
  );
};
Periods.parameters = {
  docs: source(periods.map((period) => ({ ...SumLine.__DEFAULT_PROPS, period }))),
};

export const Compact = (props: Partial<SumLineProps>) => {
  const defaultProps = useMergedProps(SumLine.__DEFAULT_PROPS, props);

  return (
    <ComponentVariants
      defaults={defaultProps}
      variants={[false, true]}
      for="compact"
      of={SumLine}
      columns={2}
      propLabels
    />
  );
};
Compact.parameters = {
  docs: source([
    SumLine.__DEFAULT_PROPS,
    { ...SumLine.__DEFAULT_PROPS, compact: true },
  ]),
};

const labels = [
  "Total rent",
  "Invoice amount",
  "A somewhat longer label",
  "Another very long label that is very likely to be truncated",
];
export const Labels = (props: Partial<SumLineProps>) => {
  const defaultProps = useMergedProps(SumLine.__DEFAULT_PROPS, props);

  return (
    <ComponentVariants
      defaults={defaultProps}
      variants={labels}
      for="label"
      of={SumLine}
      columns={2}
      propLabels
    />
  );
};
Labels.parameters = {
  docs: source(labels.map((label) => ({ ...SumLine.__DEFAULT_PROPS, label }))),
};

const values = [0, 7897, 123456789, 99999999900];

export const Values = (props: Partial<SumLineProps>) => {
  const defaultProps = useMergedProps(SumLine.__DEFAULT_PROPS, props);

  return (
    <ComponentVariants
      defaults={defaultProps}
      variants={values}
      for="value"
      of={SumLine}
      columns={2}
      propLabels
    />
  );
};
Values.parameters = {
  docs: source(values.map((value) => ({ ...SumLine.__DEFAULT_PROPS, value }))),
};
