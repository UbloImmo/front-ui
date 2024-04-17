import { fn } from "@storybook/test";

import { Action } from "./Action.component";
import { allIconNames } from "../Icon/Icon.types";

import { ComponentVariants } from "@docs/blocks";
import { useMergedProps } from "@utils";

import type { ActionProps, ActionSize } from "./Action.types";
import type { IconName } from "../Icon";
import type { Meta, StoryObj } from "@storybook/react";
import type { Nullable } from "@ubloimmo/front-util";

const meta = {
  component: Action,
  title: "Components/Action/Stories",
  args: {
    ...Action.defaultProps,
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
      options: ["default", "large"],
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
  },
} satisfies Meta<typeof Action>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { ...Action.defaultProps, onClick: fn() },
};

const labels: string[] = [
  "Action",
  "Go to [page name] page",
  "Delete [entity]",
  "Needlessly long and tedious action label (could be multiline)",
];
export const Labels = (props: ActionProps) => {
  const defaults = useMergedProps(Action.defaultProps, props);
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

const sizes: ActionSize[] = ["default", "large"];
export const Sizes = (props: ActionProps) => {
  const defaults = useMergedProps(Action.defaultProps, {
    ...props,
    badgeLabel: "New",
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
  const defaults = useMergedProps(Action.defaultProps, {
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
  const defaults = useMergedProps(Action.defaultProps, props);
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
  const defaults = useMergedProps(Action.defaultProps, props);
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
