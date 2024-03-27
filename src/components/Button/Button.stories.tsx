import { fn } from "@storybook/test";
import { useMemo } from "react";

import { Button } from "./Button.component";
import {
  buttonColors,
  type ButtonProps,
  type DefaultButtonProps,
} from "./Button.types";

import { FlexColumnLayout, FlexRowLayout } from "@/layouts";
import { ComponentVariants } from "@docs/blocks";
import { useMergedProps } from "@utils";

import type { Meta, StoryObj } from "@storybook/react";

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
    { ...props, icon: "CircleFill" }
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

const buttonLabels = [
  "",
  "Ok",
  "Save",
  "Confirm",
  "This is a needlessly long label",
];
export const Loading = (props: ButtonProps) => {
  const defaultProps = useMergedProps<DefaultButtonProps, ButtonProps>(
    defaultMockProps,
    props
  );

  const { loaded, loading } = useMemo(() => {
    const buildVariants = (loading?: boolean) => ({
      variants: buttonLabels.map((label) => ({
        value: label,
        label: `loading:${loading}`,
      })),
      defaults: { ...defaultProps, loading },
    });

    return {
      loaded: buildVariants(false),
      loading: buildVariants(true),
    };
  }, [defaultProps]);

  return (
    <>
      <ComponentVariants
        defaults={loaded.defaults}
        variants={loaded.variants}
        for="label"
        of={Button}
        scaling={1}
        propLabels
      />
      <ComponentVariants
        defaults={loading.defaults}
        variants={loading.variants}
        for="label"
        of={Button}
        scaling={1}
        propLabels
      />
    </>
  );
};
Loading.args = {
  icon: "ArrowRight",
  iconPlacement: "right",
};
