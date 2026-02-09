import { useMemo } from "react";

import { Icon } from "./Icon.component";
import { FlexRowLayout } from "../../layouts";
import {
  BOOTSTRAP_ICON_NAMES,
  CUSTOM_ICON_NAMES,
} from "./__generated__/iconName.types";

import { ComponentVariants } from "@docs/blocks";

import type { IconProps } from "./Icon.types";
import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ColorPalette, PaletteColor, SpacingLabel } from "@types";

const meta = {
  title: "Components/Iconography/Icon/Stories",
  component: Icon,
  decorators: [
    (Story) => {
      return (
        <FlexRowLayout gap="s-4" align="center" justify="start" wrap>
          <Story />
        </FlexRowLayout>
      );
    },
  ],
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: Icon.__DEFAULT_PROPS,
};

const colors: Exclude<keyof ColorPalette, "gray">[] = [
  "primary",
  "success",
  "pending",
  "warning",
  "error",
];
const colorShades: PaletteColor[] = colors.flatMap(
  (color): `${typeof color}-${"base" | "light" | "dark" | "medium"}`[] => [
    `${color}-light`,
    `${color}-medium`,
    `${color}-base`,
    `${color}-dark`,
  ]
);
export const Colors = (props: Partial<IconProps>) => {
  const defaultProps = useMemo(() => {
    return {
      ...Icon.__DEFAULT_PROPS,
      ...props,
    };
  }, [props]);

  return (
    <ComponentVariants
      defaults={defaultProps}
      variants={colorShades}
      for="color"
      of={Icon}
      columns={4}
      justify="center"
      align="center"
    />
  );
};
Colors.args = {
  name: "AirplaneFill",
  size: "s-8",
};

const sizes = Array(10)
  .fill(0)
  .map((_, index): SpacingLabel => `s-${!index ? 1 : index * 2}`);

export const Sizes = (props: Partial<IconProps>) => {
  const defaultProps = useMemo(() => {
    return {
      ...Icon.__DEFAULT_PROPS,
      ...props,
    };
  }, [props]);

  return (
    <ComponentVariants
      defaults={defaultProps}
      variants={sizes}
      for="size"
      of={Icon}
      align="center"
    />
  );
};
Sizes.args = {
  name: "CircleFill",
  color: "primary-base",
};

export const Bootstrap = (props: Partial<IconProps>) => {
  const defaultProps = useMemo(() => {
    return {
      ...Icon.__DEFAULT_PROPS,
      ...props,
    };
  }, [props]);

  return (
    <ComponentVariants
      defaults={defaultProps}
      variants={BOOTSTRAP_ICON_NAMES}
      for="name"
      of={Icon}
    />
  );
};
Bootstrap.args = {
  size: "s-4",
  color: "primary-base",
};

export const Custom = (props: Partial<IconProps>) => {
  const defaultProps = useMemo(() => {
    return {
      ...Icon.__DEFAULT_PROPS,
      ...props,
    };
  }, [props]);

  return (
    <ComponentVariants
      defaults={defaultProps}
      variants={CUSTOM_ICON_NAMES}
      for="name"
      of={Icon}
    />
  );
};
Custom.args = {
  size: "s-4",
  color: "primary-base",
};
