import { isString } from "@ubloimmo/front-util";
import { useMemo } from "react";
import { fn } from "storybook/test";

import { Button } from "./Button.component";
import {
  buttonColors,
  type ButtonProps,
  type DefaultButtonProps,
} from "./Button.types";
import { GENERATED_ICON_NAMES } from "../Icon/__generated__/iconName.types";

import { FlexColumnLayout, FlexRowLayout } from "@/layouts";
import { ComponentVariants } from "@docs/blocks";
import { componentSourceFactory } from "@docs/docs.utils";
import { useMergedProps } from "@utils";

import type { Meta, StoryObj } from "@storybook/react-vite";
import type { DirectionHorizontal } from "@types";

const defaultMockProps = {
  ...Button.__DEFAULT_PROPS,
  onClick: fn(),
};

const componentSource = componentSourceFactory<ButtonProps>(
  "Button",
  { label: "Button" },
  defaultMockProps
);

const meta = {
  title: "Components/Actions/Button/Stories",
  component: Button,
  decorators: [
    (Story) => (
      <FlexColumnLayout gap="s-8">
        <Story />
      </FlexColumnLayout>
    ),
  ],
  parameters: {
    docs: componentSource(),
  },
  argTypes: {
    icon: {
      options: GENERATED_ICON_NAMES,
    },
  },
  args: { ...defaultMockProps, label: "Button" },
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
PrimaryColors.parameters = {
  docs: componentSource(
    [false, true].flatMap((disabled) =>
      buttonColors.map((color) => ({ color, disabled, label: "Button" }))
    )
  ),
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
SecondaryColors.parameters = {
  docs: componentSource(
    [false, true].flatMap((disabled) =>
      buttonColors.map((color) => ({
        color,
        disabled,
        label: "Button",
        secondary: true,
      }))
    )
  ),
};

export const Icons = (props: ButtonProps) => {
  const icon = isString(props.icon) ? props.icon : "CircleFill";
  const defaultProps = useMergedProps<DefaultButtonProps, ButtonProps>(
    defaultMockProps,
    { ...props, icon }
  );

  return (
    <FlexRowLayout gap="s-8">
      <ComponentVariants
        defaults={defaultProps}
        variants={[null, icon]}
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
Icons.parameters = {
  docs: componentSource([
    { label: "Button" },
    { label: "Button", icon: "CircleFill" },
    { icon: "CircleFill", label: undefined },
    { label: "Button", icon: "CircleFill", iconPlacement: "right" },
  ]),
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
} as Partial<ButtonProps>;
const baseLoadingProps = buttonLabels.map((label) => ({
  label,
  ...Loading.args,
}));
Loading.parameters = {
  docs: componentSource([
    ...baseLoadingProps,
    ...baseLoadingProps.map((props) => ({ ...props, loading: true })),
  ]),
};

const reverseProps: ButtonProps = {
  label: "Continue",
  icon: "ArrowRightShort",
};

const iconPlacements: DirectionHorizontal[] = ["left", "right"];

export const IconPlacement = (props: ButtonProps) => {
  const defaultProps = useMergedProps<DefaultButtonProps, ButtonProps>(
    Button.__DEFAULT_PROPS,
    { ...props, ...reverseProps }
  );

  return (
    <ComponentVariants
      defaults={defaultProps}
      variants={iconPlacements}
      for="iconPlacement"
      of={Button}
      scaling={1}
      propLabels
    />
  );
};
IconPlacement.parameters = {
  docs: componentSource(
    iconPlacements.map(
      (iconPlacement): ButtonProps => ({ ...reverseProps, iconPlacement })
    )
  ),
};
const bools = [false, true];

export const FullWidth = (props: ButtonProps) => {
  const defaultProps = useMergedProps<DefaultButtonProps, ButtonProps>(
    Button.__DEFAULT_PROPS,
    { ...props, ...reverseProps }
  );

  return (
    <ComponentVariants
      defaults={defaultProps}
      variants={bools}
      for="fullWidth"
      of={Button}
      columns={2}
      scaling={1}
      propLabels
    />
  );
};
FullWidth.parameters = {
  docs: componentSource(
    bools.map((fullWidth): ButtonProps => ({ ...reverseProps, fullWidth }))
  ),
};

export const Expandable = (props: ButtonProps) => {
  const defaultProps = useMergedProps<DefaultButtonProps, ButtonProps>(
    Button.__DEFAULT_PROPS,
    { ...reverseProps, ...props, icon: props.icon ?? "ArrowRight" }
  );

  return (
    <ComponentVariants
      defaults={defaultProps}
      variants={[...bools].reverse()}
      for="expandOnHover"
      of={Button}
      scaling={1}
      columns={2}
      propLabels
    />
  );
};
Expandable.parameters = {
  docs: componentSource(
    bools.map(
      (expandOnHover): ButtonProps => ({ ...reverseProps, expandOnHover })
    )
  ),
};
