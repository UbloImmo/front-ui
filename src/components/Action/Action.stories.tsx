import { fn } from "storybook/test";

import { Action } from "./Action.component";
import { allIconNames } from "../Icon/Icon.types";

import { ComponentVariants } from "@docs/blocks";
import { useMergedProps } from "@utils";

import type { ActionColor, ActionProps, ActionSize } from "./Action.types";
import type { IconName } from "../Icon";
import type { StaticIconIndicator } from "../StaticIcon";
import type { TooltipProps } from "../Tooltip";
import type { Meta, StoryObj } from "@storybook/react-vite";
import type { Nullable } from "@ubloimmo/front-util";

const meta = {
  component: Action,
  title: "Components/Actions/Action/Stories",
  args: {
    ...Action.__DEFAULT_PROPS,
    onClick: fn(),
  },
  argTypes: {
    label: {
      control: "text",
    },
    icon: {
      options: allIconNames,
    },
    size: {
      options: ["default", "centered", "large", "card"],
    },
    title: {
      control: "text",
    },
    badgeLabel: {
      control: "text",
    },
    disabled: {
      control: "boolean",
    },
    description: {
      control: "text",
    },
    color: {
      options: ["primary", "error"],
    },
  },
} satisfies Meta<typeof Action>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { ...Action.__DEFAULT_PROPS, onClick: fn() },
};

const labels: string[] = [
  "Action",
  "Go to [page name] page",
  "Delete [entity]",
  "Needlessly long and tedious action label (could be multiline)",
];
export const Labels = (props: ActionProps) => {
  const defaults = useMergedProps(Action.__DEFAULT_PROPS, props);
  return (
    <ComponentVariants
      variants={labels}
      for="label"
      of={Action}
      defaults={defaults}
      scaling={1}
      columns={2}
      propLabels
    />
  );
};

const sizes: ActionSize[] = ["default", "centered", "large", "card"];
export const Sizes = (props: ActionProps) => {
  const defaults = useMergedProps(Action.__DEFAULT_PROPS, {
    ...props,
    badgeLabel: "New",
    description: "[Description]",
  });
  return (
    <ComponentVariants
      variants={sizes}
      for="size"
      of={Action}
      defaults={defaults}
      scaling={1}
      columns={2}
      propLabels
    />
  );
};

const bools = [false, true];
export const Disabled = (props: ActionProps) => {
  const defaults = useMergedProps(Action.__DEFAULT_PROPS, {
    ...props,
    badgeLabel: props.badgeLabel ?? "New",
  });
  return (
    <ComponentVariants
      variants={bools}
      for="disabled"
      of={Action}
      defaults={defaults}
      scaling={1}
      columns={2}
      propLabels
    />
  );
};

const badges: Nullable<string>[] = [null, "Badge", "New", "Really long badge"];
export const BadgeLabels = (props: ActionProps) => {
  const defaults = useMergedProps(Action.__DEFAULT_PROPS, props);
  return (
    <ComponentVariants
      variants={badges}
      for="badgeLabel"
      of={Action}
      defaults={defaults}
      scaling={1}
      columns={2}
      propLabels
    />
  );
};

const icons: IconName[] = ["Cursor", "Circle", "BuildingBlocks", "Apps"];
export const Icons = (props: ActionProps) => {
  const defaults = useMergedProps(Action.__DEFAULT_PROPS, props);
  return (
    <ComponentVariants
      variants={icons}
      for="icon"
      of={Action}
      defaults={defaults}
      scaling={1}
      columns={2}
      propLabels
    />
  );
};

const tooltips: Omit<TooltipProps, "children">[] = [
  {
    content: "A tooltip on an action",
    direction: "top",
  },
  {
    content: "A customized tooltip on an action",
    icon: "BoxArrowInUpRight",
    iconColor: "primary-base",
  },
];

export const Tooltip = (props: ActionProps) => {
  const defaults = useMergedProps(Action.__DEFAULT_PROPS, props);
  return (
    <ComponentVariants
      variants={tooltips}
      for="iconTooltip"
      defaults={defaults}
      scaling={1}
      columns={2}
      propLabels
      of={Action}
    />
  );
};

const descriptions: Nullable<string>[] = [
  "A short description",
  "A much longer description that could be multiline, to show how its displayed",
];
export const Description = (props: ActionProps) => {
  const defaults = useMergedProps(Action.__DEFAULT_PROPS, {
    ...props,
    badgeLabel: "New",
    size: "large",
  });
  return (
    <ComponentVariants
      variants={descriptions}
      for="description"
      of={Action}
      defaults={defaults}
      scaling={1}
      columns={2}
      propLabels
    />
  );
};

const indicators: Nullable<StaticIconIndicator>[] = [
  {
    color: "pending-base",
    name: "Circle2NdHalf",
    tooltip: {
      content: "A tooltip on an action",
      direction: "top",
    },
  },
  {
    color: "success-base",
    name: "Circle2NdHalf",
  },
];
export const Indicator = (props: ActionProps) => {
  const defaults = useMergedProps(Action.__DEFAULT_PROPS, props);
  return (
    <ComponentVariants
      variants={indicators}
      for="indicator"
      of={Action}
      defaults={defaults}
      scaling={1}
      columns={2}
      propLabels
    />
  );
};

const colors: ActionColor[] = ["primary", "error"];
export const Colors = (props: ActionProps) => {
  const defaults = useMergedProps(Action.__DEFAULT_PROPS, props);
  return (
    <ComponentVariants
      variants={colors}
      for="color"
      of={Action}
      defaults={defaults}
      scaling={1}
      columns={2}
      propLabels
    />
  );
};
