import { ContextLine } from "./ContextLine.component";
import { Badge } from "../Badge";

import { ComponentVariants, DetailConfigVariants } from "@docs/blocks";
import { componentSourceFactory } from "@docs/docs.utils";
import { useMergedProps } from "@utils";

import type { ContextLineProps } from "./ContextLine.types";
import type { Meta, StoryObj } from "@storybook/react";

const args = {
  ...ContextLine.defaultProps,
};

const componentSource = componentSourceFactory<ContextLineProps>(
  "ContextLine",
  {
    label: "[label]",
    children: '<Badge label="Children" color="primary" />',
  },
  ContextLine.defaultProps
);

const meta = {
  argTypes: {
    label: {
      control: "text",
    },
  },
  component: ContextLine,
  title: "Components/Entity/ContextLine/Stories",
  args: {
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

const infosVariants = [
  {
    label: "Label",
    badgeLabel: "Badge",
    badgeColor: "primary",
    badgeIcon: "CircleFill",
  },
] as const;

const infosBisVariants = [
  {
    label: "Label 1",
    badgeLabel: "Badge 1",
    badgeColor: "primary",
    badgeIcon: "CircleFill",
  },
  {
    label: "Label 2",
    badgeLabel: "Badge 2",
    badgeColor: "success",
    badgeIcon: "CircleFill",
  },
  {
    label: "Label 3",
    badgeLabel: "Badge 3",
    badgeColor: "warning",
    badgeIcon: "CircleFill",
  },
] as const;

const contextLineVariants: DetailConfigVariants<{ rows: ContextLineProps[] }> =
  [
    {
      __propVariantLabel: "Example",
      rows: infosVariants.map((info) => ({
        label: info.label,
        children: (
          <Badge
            label={info.badgeLabel}
            color={info.badgeColor}
            icon={info.badgeIcon}
          />
        ),
      })),
    },
    {
      __propVariantLabel: "Example",
      rows: infosBisVariants.map((info) => ({
        label: info.label,
        children: (
          <Badge
            label={info.badgeLabel}
            color={info.badgeColor}
            icon={info.badgeIcon}
          />
        ),
      })),
    },
  ];

export const Example = (props: ContextLineProps) => {
  const mergedProps = useMergedProps(ContextLine.defaultProps, props);

  return (
    <ComponentVariants
      columns={2}
      defaults={{ rows: [mergedProps] }}
      variants={contextLineVariants}
      of={(variant: { rows: ContextLineProps[] }) => (
        <div
          style={{
            padding: "1rem",
            backgroundColor: "white",
            border: "1px solid var(--primary-light)",
          }}
        >
          {variant.rows.map((row, index) => (
            <ContextLine key={index} {...row} />
          ))}
        </div>
      )}
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
    label: "Contrat de location",
    children: <Badge label="Valide" color="success" icon="CircleFill" />,
  },
  {
    __propVariantLabel: "Example 2",
    label: "Assurance",
    children: (
      <Badge label="Manquante" color="warning" icon="QuestionCircleFill" />
    ),
  },
  {
    __propVariantLabel: "Example 3",
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
