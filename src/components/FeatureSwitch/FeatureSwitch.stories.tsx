import { fn } from "@storybook/test";
import styled from "styled-components";

import { FeatureSwitch } from "./FeatureSwitch.component";
import { type FeatureSwitchProps } from "./FeatureSwitch.types";
import { Badge } from "../Badge";
import { Text } from "../Text";

import { ComponentVariants, type DetailConfigVariants } from "@docs/blocks";
import { componentSourceFactory } from "@docs/docs.utils";
import { FlexRowLayout } from "@layouts";
import { useMergedProps } from "@utils";

import type { IconName } from "../Icon";
import type { TooltipProps } from "../Tooltip";
import type { Meta, StoryObj } from "@storybook/react";
import type { Nullable, NullishPrimitives } from "@ubloimmo/front-util";

const componentSource = componentSourceFactory<
  FeatureSwitchProps<NullishPrimitives>
>("FeatureSwitch", FeatureSwitch.defaultProps);

const booleans = [false, true];

const meta = {
  component: FeatureSwitch,
  title: "Components/Forms/FeatureSwitch/Stories",
  args: {
    ...FeatureSwitch.defaultProps,
    icon: "Square",
  },
  parameters: {
    docs: componentSource(),
  },
  argTypes: {
    variant: {
      options: ["checkbox", "switch", "select"],
      control: {
        type: "select",
      },
    },
    disabled: {
      control: {
        type: "boolean",
      },
    },
    compact: {
      control: {
        type: "boolean",
      },
    },
    icon: {
      control: {
        type: "text",
      },
    },
    label: {
      control: {
        type: "text",
      },
    },
    description: {
      control: {
        type: "text",
      },
    },
  },
} satisfies Meta<typeof FeatureSwitch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

const options = [
  {
    label: "First option",
    value: "option-1",
  },
  {
    label: "Second option",
    value: "option-2",
  },
  {
    label: "Third option",
    value: "option-3",
  },
];

const Container = styled(FlexRowLayout)`
  margin: var(--s-2);
`;

const variants: DetailConfigVariants<FeatureSwitchProps<NullishPrimitives>> = [
  {
    variant: "checkbox",
    onChange: fn(),
    __propVariantLabel: "Checkbox",
  },
  {
    variant: "switch",
    onChange: fn(),
    __propVariantLabel: "Switch",
    inactiveHelperText: "Désactivé",
    activeHelperText: "Activé",
  },
  {
    variant: "select",
    placeholder: "Select an option",
    options,
    __propVariantLabel: "Select",
  },
  {
    variant: "select",
    placeholder: "Select an option",
    options,
    Option: (option) => (
      <Container gap="s-2" align="center" justify="space-between">
        <Text>{option.label}</Text> <Badge label="State" />
      </Container>
    ),
    __propVariantLabel: "Select",
  },
];

export const Variants = () => {
  return (
    <ComponentVariants<FeatureSwitchProps<NullishPrimitives>>
      variants={variants}
      of={FeatureSwitch}
      defaults={meta.args}
      columns={1}
      propLabels
    />
  );
};

export const Disabled = () => {
  return (
    <ComponentVariants<FeatureSwitchProps<NullishPrimitives>>
      of={FeatureSwitch}
      for="disabled"
      defaults={meta.args}
      columns={1}
      variants={booleans}
      propLabels
    />
  );
};

Disabled.parameters = {
  docs: componentSource(
    booleans.map((disabled) => ({
      ...meta.args,
      disabled,
    }))
  ),
};

export const Compact = () => {
  return (
    <ComponentVariants<FeatureSwitchProps<NullishPrimitives>>
      of={FeatureSwitch}
      for="compact"
      defaults={meta.args}
      columns={1}
      variants={booleans}
      propLabels
    />
  );
};

Compact.parameters = {
  docs: componentSource(
    booleans.map((compact) => ({
      ...meta.args,
      compact,
    }))
  ),
};

const descriptionVariants = [
  null,
  "This Feature Switch has a description, it can be used to provide more information about the feature.",
];

export const Description = () => {
  return (
    <ComponentVariants<FeatureSwitchProps<NullishPrimitives>>
      of={FeatureSwitch}
      for="description"
      defaults={meta.args}
      columns={1}
      variants={descriptionVariants}
      propLabels
    />
  );
};

Description.parameters = {
  docs: componentSource(
    descriptionVariants.map((description) => ({
      ...meta.args,
      description,
    }))
  ),
};

const tooltipVariants: Nullable<TooltipProps>[] = [
  null,
  {
    content: (
      <Container gap="s-2" align="center" fill key="content">
        <Text color="gray-50">
          Press Down, Y, X, Right shift, Right, Left shift, Left, B to turn on
          Invulnerability.
        </Text>
      </Container>
    ),
    children: null,
  },
];

export const Tooltip = () => {
  const props = useMergedProps(meta.args, {
    name: "Cheat Code",
    description: "Activate the cheat code to turn on invulnerability.",
  });
  return (
    <ComponentVariants<FeatureSwitchProps<NullishPrimitives>>
      of={FeatureSwitch}
      for="tooltip"
      defaults={props}
      columns={1}
      variants={tooltipVariants}
      propLabels
    />
  );
};

const iconVariants: Nullable<IconName>[] = [
  null,
  "Square",
  "ArchiveFill",
  "EmojiHeartEyes",
];

export const Icon = () => {
  return (
    <ComponentVariants<FeatureSwitchProps<NullishPrimitives>>
      of={FeatureSwitch}
      for="icon"
      defaults={meta.args}
      columns={1}
      variants={iconVariants}
      propLabels
    />
  );
};
Icon.parameters = {
  docs: componentSource(
    iconVariants.map((icon) => ({
      ...meta.args,
      icon,
    }))
  ),
};
