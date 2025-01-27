import { fn } from "@storybook/test";

import { ActionIcon } from "./ActionIcon.component";
import { allIconNames, type IconName } from "../Icon/Icon.types";

import { FlexRowLayout } from "@/layouts";
import { ComponentVariants } from "@docs/blocks";
import { componentSourceFactory } from "@docs/docs.utils";
import { useMergedProps } from "@utils";

import type {
  ActionIconColor,
  ActionIconProps,
  ActionIconSize,
} from "./ActionIcon.types";
import type { Meta, StoryObj } from "@storybook/react";

const defaultMockProps = {
  ...ActionIcon.defaultProps,
  icon: "Window",
  onClick: fn(),
};

const componentSource = componentSourceFactory(
  "ActionIcon",
  { icon: "Square" },
  defaultMockProps,
);

const meta = {
  title: "Components/Actions/ActionIcon/Stories",
  component: ActionIcon,
  args: {
    ...ActionIcon.defaultProps,
    onClick: fn(),
  },
  argTypes: {
    icon: {
      options: allIconNames,
      defaultValue: ActionIcon.defaultProps.icon,
    },
    size: {
      options: ["s", "m", "l"],
      defaultValue: ActionIcon.defaultProps.size,
    },
    color: {
      options: ["primary", "error", "white"],
      defaultValue: ActionIcon.defaultProps.color,
    },
    title: {
      type: "string",
      defaultValue: ActionIcon.defaultProps.title,
    },
    disabled: {
      type: "boolean",
      defaultValue: ActionIcon.defaultProps.disabled,
    },
  },
  parameters: {
    docs: componentSource(),
  },
} satisfies Meta<typeof ActionIcon>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  parameters: {
    docs: componentSource(),
  },
};

const sizes: ActionIconSize[] = ["l", "m", "s"];
export const Sizes = (props: ActionIconProps) => {
  const defaults = useMergedProps(ActionIcon.defaultProps, props);

  return (
    <ComponentVariants
      variants={sizes}
      for="size"
      of={ActionIcon}
      defaults={defaults}
      propLabels
      align="center"
    />
  );
};

const SizeRenderer = (props: ActionIconProps) => {
  return (
    <FlexRowLayout gap="s-8" align="center">
      <ActionIcon {...props} size="l" />
      <ActionIcon {...props} size="m" />
      <ActionIcon {...props} size="s" />
    </FlexRowLayout>
  );
};

const colors: ActionIconColor[] = ["white", "primary", "error"];
export const Colors = (props: ActionIconProps) => {
  const defaults = useMergedProps(ActionIcon.defaultProps, props);
  return (
    <ComponentVariants
      variants={colors}
      for="color"
      of={SizeRenderer}
      defaults={defaults}
      scaling={1}
      propLabels
    />
  );
};

const bools = [false, true];
export const Disabled = (props: ActionIconProps) => {
  const defaults = useMergedProps(ActionIcon.defaultProps, props);

  return (
    <ComponentVariants
      variants={bools}
      for="disabled"
      of={SizeRenderer}
      defaults={defaults}
      scaling={1}
      propLabels
    />
  );
};

const icons: IconName[] = ["Square", "Archive", "XLg", "Copy"];
export const Icons = (props: ActionIconProps) => {
  const defaults = useMergedProps(ActionIcon.defaultProps, props);
  return (
    <ComponentVariants
      variants={icons}
      for="icon"
      of={ActionIcon}
      defaults={defaults}
      scaling={1}
      propLabels
    />
  );
};

const titles = [
  ActionIcon.defaultProps.title,
  "Confirm entry",
  "Delete entity",
  "Duplicate unit",
];
export const Titles = (props: ActionIconProps) => {
  const defaults = useMergedProps(ActionIcon.defaultProps, props);
  return (
    <ComponentVariants
      variants={titles}
      for="title"
      of={ActionIcon}
      defaults={defaults}
      scaling={1}
    />
  );
};
