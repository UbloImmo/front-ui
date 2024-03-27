import { objectKeys } from "@ubloimmo/front-util";
import { useMemo } from "react";

import * as BootstrapIcons from "./__generated__/bootstrap";
import * as CustomIcons from "./__generated__/custom";
import { Icon } from "./Icon.component";
import { ComponentVariants } from "../../../docs/blocks";
import { FlexRowLayout } from "../../layouts";

import type { IconProps } from "./Icon.types";
import type { ColorPalette, PaletteColor, SpacingLabel } from "../../types";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/Icon",
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
  args: Icon.defaultProps,
};

export const Colors = (props: Partial<IconProps>) => {
  const colors: Exclude<keyof ColorPalette, "gray">[] = [
    "primary",
    "success",
    "pending",
    "warning",
    "error",
  ];
  const colorShades: PaletteColor[] = colors.flatMap(
    (color): `${typeof color}-${"base" | "light" | "dark" | "medium"}`[] => [
      `${color}-base`,
      `${color}-light`,
      `${color}-dark`,
      `${color}-medium`,
    ]
  );
  const defaultProps = useMemo(() => {
    return {
      ...Icon.defaultProps,
      ...props,
    };
  }, [props]);

  return (
    <ComponentVariants
      defaults={defaultProps}
      variants={colorShades}
      for="color"
      of={Icon}
      align="center"
    />
  );
};
Colors.args = {
  name: "AirplaneFill",
  size: "s-8",
};

export const Sizes = (props: Partial<IconProps>) => {
  const sizes = useMemo(() => {
    return Array(10)
      .fill(0)
      .map((_, index): SpacingLabel => `s-${!index ? 1 : index * 2}`);
  }, []);

  const defaultProps = useMemo(() => {
    return {
      ...Icon.defaultProps,
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
  const names = useMemo(() => {
    return objectKeys(BootstrapIcons);
  }, []);

  const defaultProps = useMemo(() => {
    return {
      ...Icon.defaultProps,
      ...props,
    };
  }, [props]);

  return (
    <ComponentVariants
      defaults={defaultProps}
      variants={names}
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
  const names = useMemo(() => {
    return objectKeys(CustomIcons);
  }, []);

  const defaultProps = useMemo(() => {
    return {
      ...Icon.defaultProps,
      ...props,
    };
  }, [props]);

  return (
    <ComponentVariants
      defaults={defaultProps}
      variants={names}
      for="name"
      of={Icon}
    />
  );
};
Custom.args = {
  size: "s-4",
  color: "primary-base",
};
