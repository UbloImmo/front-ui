import type { LoadingAnimation, LoadingProps } from "./Loading.types";
import type { Meta, StoryObj } from "@storybook/react";
import { Loading } from "./Loading.component";
import { useMergedProps } from "@utils";
import { ComponentVariants } from "@docs/blocks";
import { SpacingLabel } from "@types";

const meta = {
  title: "Components/Loading",
  component: Loading,
  args: Loading.defaultProps,
} satisfies Meta<typeof Loading>;
export default meta;

type Story = StoryObj<typeof meta>;

const args: LoadingProps = { ...Loading.defaultProps, size: "6rem" };

export const Default: Story = {
  args,
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
    />
  );
};
Animations.args = args;

const sizes = Array(10)
  .fill(0)
  .map((_, index): SpacingLabel => `s-${!index ? 1 : index * 2}`);
export const Sizing = (props: LoadingProps) => {
  const defaultProps = useMergedProps(Loading.defaultProps, props);

  return (
    <ComponentVariants
      defaults={defaultProps}
      variants={sizes}
      for="size"
      of={Loading}
      align="center"
    />
  );
};
