import { ContextLine } from "./ContextLine.component";
import { Badge } from "../Badge";
import {
  ContextLineDefaultProps,
  type ContextLineProps,
  type ContextLineStaticIconProps,
} from "./ContextLine.types";
import { formatAmount } from "../AccountBalance";
import { Hypertext } from "../Hypertext";
import { Icon } from "../Icon";
import { Text } from "../Text";

import { ComponentVariants, DetailConfigVariants } from "@docs/blocks";
import { componentSourceFactory } from "@docs/docs.utils";
import { FlexLayout } from "@layouts";
import { arrayOf, useMergedProps } from "@utils";

import type { Meta, StoryObj } from "@storybook/react";
import type { NonOptional } from "@ubloimmo/front-util";
import type { ReactNode } from "react";

const args = {
  ...ContextLine.defaultProps,
};

const componentSource = componentSourceFactory<ContextLineProps>(
  "ContextLine",
  {
    label: "[label]",
    children: '<Badge label="Children" color="primary" />',
  },
  ContextLine.defaultProps,
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

const infosBisVariants: ContextLineProps[] = [
  {
    label: "Label 1",
    badge: {
      label: "Badge 1",
      color: "primary",
      icon: "CircleFill",
    },
  },
  {
    label: "Label 2",
    badge: {
      label: "Badge 2",
      color: "success",
      icon: "CircleFill",
    },
  },
  {
    label: "Incoming payments",
    description: "To be assigned to invoices",
    icon: {
      name: "ExclamationTriangleFill",
      color: "warning",
    },
    children: (
      <Text color="gray-800" weight="medium">
        {formatAmount(15626636)}
      </Text>
    ),
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
      rows: infosBisVariants,
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
  {
    __propVariantLabel: "Example 3",
    label: "Text",
    children: <Text weight="bold">{formatAmount(15626636)}</Text>,
  },
];

export const Children = (props: ContextLineProps) => {
  const mergedProps = useMergedProps(ContextLine.defaultProps, props);

  return (
    <ComponentVariants
      columns={2}
      defaults={mergedProps}
      variants={childrenVariants}
      of={ContextLine}
      align="center"
      propLabels
    />
  );
};

const badgeVariants: DetailConfigVariants<ContextLineProps> = [
  {
    __propVariantLabel: "Example 1",
    label: "Contrat de location",
    badge: {
      label: "Valide",
      color: "success",
      icon: "CircleFill",
    },
  },
  {
    __propVariantLabel: "Example 2",
    label: "Assurance",
    badge: {
      label: "Manquante",
      color: "warning",
      icon: "QuestionCircleFill",
    },
  },
];

export const Badges = (props: ContextLineProps) => {
  const mergedProps = useMergedProps(ContextLine.defaultProps, props);

  return (
    <ComponentVariants
      columns={2}
      defaults={mergedProps}
      variants={badgeVariants}
      of={ContextLine}
      align="center"
      propLabels
    />
  );
};

const icons: ContextLineStaticIconProps[] = [
  {
    name: "ExclamationCircleFill",
    color: "warning",
  },
  {
    name: "Check2Circle",
    color: "success",
    stroke: true,
  },
  {
    name: "CurrencyEuro",
    color: "gray",
  },
  {
    name: "Airplane",
    color: "error",
  },
];

export const Icons = (props: ContextLineProps) => {
  const mergedProps = useMergedProps<ContextLineDefaultProps, ContextLineProps>(
    {
      ...ContextLine.defaultProps,
      badge: {
        label: "Badge",
        color: "primary",
        icon: "CircleFill",
      },
    },
    props,
  );

  return (
    <ComponentVariants
      columns={3}
      defaults={mergedProps}
      variants={icons}
      of={ContextLine}
      for="icon"
      align="center"
    />
  );
};

const descriptions: (string | NonOptional<ReactNode>)[] = [
  "I am a simple description",
  <>
    I am an{" "}
    <Text weight="bold" color="primary-dark" italic size="xs">
      advanced
    </Text>{" "}
    description
  </>,
  <>
    I even contain an icon <Icon size="s-2" name="Airplane" /> !
  </>,
  <>
    <Hypertext href="#">I am a link</Hypertext>
  </>,
];

export const Descriptions = (props: ContextLineProps) => {
  const mergedProps = useMergedProps<ContextLineDefaultProps, ContextLineProps>(
    {
      ...ContextLine.defaultProps,
      badge: {
        label: "Badge",
        color: "primary",
        icon: "CircleFill",
      },
    },
    props,
  );

  return (
    <ComponentVariants
      columns={2}
      defaults={mergedProps}
      variants={descriptions}
      of={ContextLine}
      for="description"
      align="center"
      propLabels
    />
  );
};

const booleans = [false, true];

const MultiContextLines = (props: ContextLineProps) => (
  <FlexLayout direction="column" fill>
    {arrayOf(3, (index) => (
      <ContextLine key={["contextLine", index].join("-")} {...props} />
    ))}
  </FlexLayout>
);

export const Compact = (props: ContextLineProps) => {
  const mergedProps = useMergedProps(ContextLine.defaultProps, props);

  return (
    <ComponentVariants
      columns={2}
      defaults={mergedProps}
      variants={booleans}
      of={MultiContextLines}
      for="compact"
      align="center"
    />
  );
};

export const PaddingHorizontal = (props: ContextLineProps) => {
  const mergedProps = useMergedProps(ContextLine.defaultProps, props);

  return (
    <ComponentVariants
      columns={2}
      defaults={mergedProps}
      variants={booleans}
      of={MultiContextLines}
      for="paddingHorizontal"
      align="center"
    />
  );
};

export const BorderBottom = (props: ContextLineProps) => {
  const mergedProps = useMergedProps(ContextLine.defaultProps, props);

  return (
    <ComponentVariants
      columns={2}
      defaults={mergedProps}
      variants={booleans}
      of={MultiContextLines}
      for="borderBottom"
      align="center"
    />
  );
};
