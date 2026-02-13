import { Nullable } from "@ubloimmo/front-util";
import { useMemo } from "react";

import { Badge } from "./Badge.component";
import { BadgeProps, BadgeShade } from "./Badge.types";
import { FlexRowLayout } from "../../layouts";
import { useMergedProps } from "../../utils";
import { GENERATED_ICON_NAMES } from "../Icon/__generated__/iconName.types";

import { ComponentVariants } from "@docs/blocks";
import { ColorPalette } from "@types";

import type { IconName } from "../Icon/Icon.types";
import type { Meta, StoryObj } from "@storybook/react-vite";

const args = {
  ...Badge.__DEFAULT_PROPS,
  label: "[label]",
};

const meta = {
  title: "Components/States/Badge/Stories",
  component: Badge,
  args,
  argTypes: {
    icon: {
      options: GENERATED_ICON_NAMES,
    },
    color: {
      options: ["success", "error", "warning", "pending", "gray"],
    },
    shade: {
      options: ["light", "dark"],
    },
    className: {
      type: "string",
    },
  },
  decorators: [
    (Story) => (
      <FlexRowLayout gap="s-4" align="center" justify="start" wrap>
        <Story />
      </FlexRowLayout>
    ),
  ],
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args,
};

const colors: (keyof ColorPalette)[] = [
  "primary",
  "success",
  "pending",
  "warning",
  "error",
  "gray",
];

export const Colors = (props: Partial<BadgeProps>) => {
  const defaultProps = useMergedProps(Badge.__DEFAULT_PROPS, props);

  return (
    <ComponentVariants
      defaults={defaultProps}
      variants={colors}
      for="color"
      of={Badge}
      align="center"
      propLabels
    />
  );
};
Colors.args = {
  label: "label",
  shade: "light",
};

const shades: BadgeShade[] = ["light", "dark"];
export const Shades = (props: Partial<BadgeProps>) => {
  const defaultProps = useMemo(() => {
    return {
      ...Badge.__DEFAULT_PROPS,
      ...props,
    };
  }, [props]);

  return (
    <ComponentVariants
      defaults={defaultProps}
      variants={shades}
      for="shade"
      of={Badge}
      align="center"
      propLabels
    />
  );
};
Shades.args = {
  label: "label",
  color: "primary",
};

export const Icon = (props: Partial<BadgeProps>) => {
  const icons: Nullable<IconName>[] = [props.icon ?? "Square", null];
  const defaultProps = useMemo(() => {
    return {
      ...Badge.__DEFAULT_PROPS,
      ...props,
    };
  }, [props]);

  return (
    <ComponentVariants
      defaults={defaultProps}
      variants={icons}
      for="icon"
      of={Badge}
      align="center"
      propLabels
    />
  );
};
Icon.args = {
  label: "label",
  color: "primary",
};
