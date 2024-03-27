import { Loading } from "./Loading.component";

import { ComponentVariants } from "@docs/blocks";
import { SpacingLabel, type PaletteColor } from "@types";
import { useMergedProps } from "@utils";

import type { LoadingAnimation, LoadingProps } from "./Loading.types";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/Loading/Stories",
  component: Loading,
  args: Loading.defaultProps,
} satisfies Meta<typeof Loading>;
export default meta;

type Story = StoryObj<typeof meta>;

const args: LoadingProps = { ...Loading.defaultProps, size: "s-20" };

export const Default: Story = {
  args: Loading.defaultProps,
};

const animations: LoadingAnimation[] = ["BouncingBalls", "Spinner"];
export const Animations = (props: LoadingProps) => {
  const defaultProps = useMergedProps(Loading.defaultProps, props);

  return (
    <ComponentVariants
      defaults={defaultProps}
      variants={animations}
      for="animation"
      of={Loading}
      scaling={1.1}
    />
  );
};
Animations.args = args;

const sizes = Array(6)
  .fill(0)
  .map((_, index): SpacingLabel => `s-${!index ? 1 : index * 4}`);
export const Sizes = (props: LoadingProps) => {
  const defaultProps = useMergedProps(Loading.defaultProps, props);

  return (
    <ComponentVariants
      defaults={defaultProps}
      variants={sizes}
      for="size"
      of={Loading}
      align="center"
      scaling={1.2}
    />
  );
};

const colors: PaletteColor[] = [
  "primary-light",
  "primary-medium",
  "primary-base",
  "primary-dark",
  "error-light",
  "warning-medium",
  "pending-base",
  "success-dark",
  "gray-100",
  "gray-300",
  "gray-500",
  "gray-700",
];
export const Colors = (props: LoadingProps) => {
  const defaultProps = useMergedProps(Loading.defaultProps, props);

  return (
    <ComponentVariants
      defaults={defaultProps}
      variants={colors}
      for="color"
      of={Loading}
      align="center"
      scaling={1.1}
    />
  );
};
Colors.args = args;
