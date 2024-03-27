import { Nullable } from "@ubloimmo/front-util";
import { useMemo } from "react";

import { Badge } from "./Badge.component";
import { BadgeProps, BadgeShade } from "./Badge.types";
import { IconName } from "..";
import { FlexRowLayout } from "../../layouts";

import { ComponentVariants } from "@docs/blocks";
import { ColorPalette } from "@types";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/Badge/Stories",
  component: Badge,
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
  args: Badge.defaultProps,
};

export const Colors = (props: Partial<BadgeProps>) => {
  const colors: (keyof ColorPalette)[] = [
    "primary",
    "success",
    "pending",
    "warning",
    "error",
    "gray",
  ];
  const defaultProps = useMemo(() => {
    return {
      ...Badge.defaultProps,
      ...props,
    };
  }, [props]);

  return (
    <ComponentVariants
      defaults={defaultProps}
      variants={colors}
      for="color"
      of={Badge}
      align="center"
    />
  );
};
Colors.args = {
  label: "label",
  shade: "light",
};

export const Shades = (props: Partial<BadgeProps>) => {
  const shades: BadgeShade[] = ["light", "dark"];
  const defaultProps = useMemo(() => {
    return {
      ...Badge.defaultProps,
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
      ...Badge.defaultProps,
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
