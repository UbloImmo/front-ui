import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button.component";
import { fn } from "@storybook/test";
import {
  type DefaultButtonProps,
  type ButtonProps,
  buttonColors,
} from "./Button.types";
import { useMergedProps } from "@utils";
import { ComponentVariants } from "@docs/blocks";
import { useMemo } from "react";
import { FlexColumnLayout, FlexRowLayout } from "@/layouts";

const defaultMockProps = {
  ...Button.defaultProps,
  onClick: fn(),
};

const meta = {
  title: "Components/Button",
  component: Button,
  decorators: [
    (Story) => (
      <FlexColumnLayout gap="s-8">
        <Story />
      </FlexColumnLayout>
    ),
  ],
  args: defaultMockProps,
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: undefined as never,
};

export const PrimaryColors = (props: ButtonProps) => {
  const defaultProps = useMergedProps<DefaultButtonProps, ButtonProps>(
    defaultMockProps,
    props
  );

  const { enabled, disabled } = useMemo(() => {
    const buildVariants = (disabled?: boolean) =>
      buttonColors.map((color) => ({
        value: color,
        label: `${color}${disabled ? ":disabled" : ""}`,
      }));

    return {
      enabled: buildVariants(false),
      disabled: buildVariants(true),
    };
  }, []);

  const disabledDefaultProps = useMergedProps(defaultProps, {
    disabled: true,
  });

  return (
    <>
      <ComponentVariants
        defaults={defaultProps}
        variants={enabled}
        for="color"
        of={Button}
        scaling={1}
      />
      <ComponentVariants
        defaults={disabledDefaultProps}
        variants={disabled}
        for="color"
        of={Button}
        scaling={1}
      />
    </>
  );
};

export const SecondaryColors = (props: ButtonProps) => {
  const defaultProps = useMergedProps<DefaultButtonProps, ButtonProps>(
    defaultMockProps,
    { ...props, secondary: true }
  );

  const { enabled, disabled } = useMemo(() => {
    const buildVariants = (disabled?: boolean) =>
      buttonColors.map((color) => ({
        value: color,
        label: `${color}${disabled ? ":disabled" : ""}`,
      }));

    return {
      enabled: buildVariants(false),
      disabled: buildVariants(true),
    };
  }, []);

  const disabledDefaultProps = useMergedProps(defaultProps, {
    disabled: true,
  });

  return (
    <>
      <ComponentVariants
        defaults={defaultProps}
        variants={enabled}
        for="color"
        of={Button}
        scaling={1}
      />
      <ComponentVariants
        defaults={disabledDefaultProps}
        variants={disabled}
        for="color"
        of={Button}
        scaling={1}
      />
    </>
  );
};

export const Icons = (props: ButtonProps) => {
  const defaultProps = useMergedProps<DefaultButtonProps, ButtonProps>(
    defaultMockProps,
    props
  );

  return (
    <FlexRowLayout gap="s-8">
      <ComponentVariants
        defaults={defaultProps}
        variants={[null, "CircleFill"]}
        for="icon"
        of={Button}
        scaling={1}
        propLabels
      />
      <ComponentVariants
        defaults={defaultProps}
        variants={[null]}
        for="label"
        of={Button}
        scaling={1}
        propLabels
      />
      <ComponentVariants
        defaults={defaultProps}
        variants={["right"]}
        for="iconPlacement"
        of={Button}
        scaling={1}
        propLabels
      />
    </FlexRowLayout>
  );
};
