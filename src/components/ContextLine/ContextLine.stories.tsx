import { ContextLine } from "./ContextLine.component";

import { componentSourceFactory } from "@docs/docs.utils";

import type { ContextLineProps } from "./ContextLine.types";
import type { Meta, StoryObj } from "@storybook/react";
import { ComponentVariants, DetailConfigVariants } from "@docs/blocks";
import { Badge } from "../Badge";
import { useMergedProps } from "@utils";

const args = {
  ...ContextLine.defaultProps,
};

const componentSource = componentSourceFactory<ContextLineProps>(
  "ContextLine",
  {
    first: "default",
    label: "[label]",
    children: '<Badge label="Children" color="primary" />',
  },
  ContextLine.defaultProps
);

const meta = {
  argTypes: {
    first: {
      control: "radio",
      options: ["first", "default", "last"],
    },
    label: {
      control: "text",
    },
  },
  component: ContextLine,
  title: "Components/ContextLine/Stories",
  args: {
    first: "default",
    label: "[label]",
  },
  parameters: {
    docs: componentSource(),
  },
} satisfies Meta<typeof ContextLine>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    ...args,
    label: "[label]",
    children: <Badge label="Children" color="primary" />,
  },
};

const firstVariants: DetailConfigVariants<ContextLineProps> = [
  {
    __propVariantLabel: "First",
    first: "first",
  },
  {
    __propVariantLabel: "Default",
    first: "default",
  },
  {
    __propVariantLabel: "Last",
    first: "last",
  },
];

export const First = (props: ContextLineProps) => {
  const mergedProps = useMergedProps(ContextLine.defaultProps, props);

  return (
    <ComponentVariants
      columns={3}
      defaults={mergedProps}
      variants={firstVariants}
      of={ContextLine}
      align="center"
      propLabels
    />
  );
};

export const Label = (props: ContextLineProps) => {
  const mergedProps = useMergedProps(ContextLine.defaultProps, props);

  return (
    <ComponentVariants
      columns={1}
      defaults={mergedProps}
      variants={[props.label]}
      for="label"
      of={ContextLine}
      align="center"
      propLabels
    />
  );
};

Label.args = {
  label: "[label here]",
};

const childrenVariants: DetailConfigVariants<ContextLineProps> = [
  {
    __propVariantLabel: "Example 1",
    first: "default",
    label: "Contrat de location",
    children: <Badge label="Valide" color="success" icon="CircleFill" />,
  },
  {
    __propVariantLabel: "Example 2",
    first: "default",
    label: "Assurance",
    children: (
      <Badge label="Manquante" color="warning" icon="QuestionCircleFill" />
    ),
  },
  {
    __propVariantLabel: "Example 3",
    first: "default",
    label: "Assurance",
    children: (
      <Badge label="Expirée" color="error" icon="ExclamationCircleFill" />
    ),
  },
];

export const Children = (props: ContextLineProps) => {
  const mergedProps = useMergedProps(ContextLine.defaultProps, props);

  return (
    <ComponentVariants
      columns={3}
      defaults={mergedProps}
      variants={childrenVariants}
      of={ContextLine}
      align="center"
      propLabels
    />
  );
};
