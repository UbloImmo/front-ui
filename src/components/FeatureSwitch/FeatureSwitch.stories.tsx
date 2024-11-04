import { fn } from "@storybook/test";

import { FeatureSwitch } from "./FeatureSwitch.component";
import { type FeatureSwitchProps } from "./FeatureSwitch.types";
import { StaticIcon } from "../StaticIcon";
import { Text } from "../Text";

import { ComponentVariants, type DetailConfigVariants } from "@docs/blocks";
import { componentSourceFactory } from "@docs/docs.utils";
import { FlexRowLayout } from "@layouts";
import { useMergedProps } from "@utils";

import type { TooltipProps } from "../Tooltip";
import type { Meta, StoryObj } from "@storybook/react";
import type { Nullable, NullishPrimitives } from "@ubloimmo/front-util";

const componentSource = componentSourceFactory<
  FeatureSwitchProps<NullishPrimitives>
>("FeatureSwitch", FeatureSwitch.defaultProps);

const booleans = [false, true];

const meta = {
  component: FeatureSwitch,
  title: "Components/FeatureSwitch/Stories",
  args: {
    ...FeatureSwitch.defaultProps,
    // onChange: fn(),
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
    options: [
      {
        label: "Option 1",
        value: "option-1",
      },
      {
        label: "Option 2",
        value: "option-2",
      },
      {
        label: "Option 3",
        value: "option-3",
      },
    ],
    __propVariantLabel: "Select",
  },
];

export const Variants = () => {
  return (
    <ComponentVariants
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
    <ComponentVariants
      of={FeatureSwitch}
      for="disabled"
      defaults={meta.args}
      columns={1}
      variants={booleans}
      propLabels
    />
  );
};

export const Compact = () => {
  return (
    <ComponentVariants
      of={FeatureSwitch}
      for="compact"
      defaults={meta.args}
      columns={1}
      variants={booleans}
      propLabels
    />
  );
};

export const Description = () => {
  return (
    <ComponentVariants
      of={FeatureSwitch}
      for="description"
      defaults={meta.args}
      columns={1}
      variants={[
        null,
        "This Feature Switch has a description, it can be used to provide more information about the feature.",
      ]}
      propLabels
    />
  );
};

const tooltipVariants: Nullable<TooltipProps>[] = [
  null,
  {
    content: (
      <FlexRowLayout gap="s-2" align="center" fill key="content">
        <StaticIcon name="Square" size="xs" stroke />
        <Text color="gray-50">
          Press Down, Y, X, Right shift, Right, Left shift, Left, B to turn on
          Invulnerability.
        </Text>
      </FlexRowLayout>
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
    <ComponentVariants
      of={FeatureSwitch}
      for="tooltip"
      defaults={props}
      columns={1}
      variants={tooltipVariants}
      propLabels
    />
  );
};

export const Icon = () => {
  return (
    <ComponentVariants
      of={FeatureSwitch}
      for="icon"
      defaults={meta.args}
      columns={1}
      variants={[null, "Square", "ArchiveFill", "EmojiHeartEyes"]}
      propLabels
    />
  );
};
