import { fn } from "storybook/test";

import { ActionIcon } from "./ActionIcon.component";
import { GENERATED_ICON_NAMES } from "../Icon/__generated__/iconName.types";

import { FlexRowLayout } from "@/layouts";
import { ComponentVariants } from "@docs/blocks";
import { componentSourceFactory } from "@docs/docs.utils";
import { useMergedProps } from "@utils";

import type {
  ActionIconColor,
  ActionIconProps,
  ActionIconSize,
} from "./ActionIcon.types";
import type { IconName } from "../Icon/Icon.types";
import type { Meta, StoryObj } from "@storybook/react-vite";

const defaultMockProps = {
  ...ActionIcon.__DEFAULT_PROPS,
  icon: "Window",
  onClick: fn(),
};

const componentSource = componentSourceFactory(
  "ActionIcon",
  { icon: "Square" },
  defaultMockProps
);

const meta = {
  title: "Components/Actions/ActionIcon/Stories",
  component: ActionIcon,
  args: {
    ...ActionIcon.__DEFAULT_PROPS,
    onClick: fn(),
  },
  argTypes: {
    icon: {
      options: GENERATED_ICON_NAMES,
      defaultValue: ActionIcon.__DEFAULT_PROPS.icon,
    },
    size: {
      options: ["s", "m", "l"],
      defaultValue: ActionIcon.__DEFAULT_PROPS.size,
    },
    color: {
      options: ["primary", "error", "white"],
      defaultValue: ActionIcon.__DEFAULT_PROPS.color,
    },
    title: {
      type: "string",
      defaultValue: ActionIcon.__DEFAULT_PROPS.title,
    },
    disabled: {
      type: "boolean",
      defaultValue: ActionIcon.__DEFAULT_PROPS.disabled,
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
  const defaults = useMergedProps(ActionIcon.__DEFAULT_PROPS, props);

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
  const defaults = useMergedProps(ActionIcon.__DEFAULT_PROPS, props);
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
  const defaults = useMergedProps(ActionIcon.__DEFAULT_PROPS, props);

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
  const defaults = useMergedProps(ActionIcon.__DEFAULT_PROPS, props);
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
  ActionIcon.__DEFAULT_PROPS.title,
  "Confirm entry",
  "Delete entity",
  "Duplicate unit",
];
export const Titles = (props: ActionIconProps) => {
  const defaults = useMergedProps(ActionIcon.__DEFAULT_PROPS, props);
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
