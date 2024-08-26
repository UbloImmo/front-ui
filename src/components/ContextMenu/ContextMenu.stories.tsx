import { ContextMenu } from "./ContextMenu.component";
import { ActionIcon } from "../ActionIcon";

import { componentSourceFactory } from "@docs/docs.utils";

import type {
  ContextMenuItemData,
  ContextMenuProps,
} from "./ContextMenu.types";
import type { Meta } from "@storybook/react";
import { ComponentVariants } from "@docs/blocks";
import { useMergedProps } from "@utils";
import type { ContextMenuItemSize } from "./components";
import { Button } from "../Button";
import { Icon, type IconName } from "../Icon";
import { fn } from "@storybook/test";

const componentSource = componentSourceFactory<ContextMenuProps>(
  "ContextMenu",
  {
    items: [] as ContextMenuProps["items"],
  },
  ContextMenu.defaultProps
);

const items: ContextMenuItemData[] = [
  {
    label: "Item 1",
    onClick: fn(),
  },
  {
    label: "Item 2",
    badgeLabel: "new",
    onClick: fn(),
  },
  {
    label: "Item 3",
    disabled: true,
    testId: "test",
    onClick: fn(),
  },
];

const meta = {
  component: ContextMenu,
  title: "Components/ContextMenu/Stories",
  args: {
    items,
  },
  parameters: {
    docs: componentSource(),
  },
} satisfies Meta<typeof ContextMenu>;

export default meta;

const defaultProps: ContextMenuProps = {
  items,
};

export const Default = (props: ContextMenuProps) => {
  return <ContextMenu {...props} {...defaultProps} defaultOpen />;
};

const sizes: ContextMenuItemSize[] = ["s", "m"];
export const Sizes = (props: ContextMenuProps) => {
  const defaults = useMergedProps(defaultProps, props);
  return (
    <ComponentVariants
      defaults={defaults}
      for="size"
      of={ContextMenu}
      variants={sizes}
      propLabels
    />
  );
};

const triggers = [
  null,
  <Button label="I am a custom trigger" />,
  <Icon name="MenuDown" />,
];
export const Triggers = (props: ContextMenuProps) => {
  const defaults = useMergedProps(defaultProps, props);
  return (
    <ComponentVariants
      defaults={defaults}
      for="children"
      of={ContextMenu}
      variants={triggers}
      propLabels
      align="center"
    />
  );
};

const bools = [false, true];
export const DefaultOpen = (props: ContextMenuProps) => {
  const defaults = useMergedProps(defaultProps, props);
  return (
    <ComponentVariants
      defaults={defaults}
      for="defaultOpen"
      of={ContextMenu}
      variants={bools}
      propLabels
    />
  );
};

export const Disabled = (props: ContextMenuProps) => {
  const defaults = useMergedProps(defaultProps, props);
  return (
    <ComponentVariants
      defaults={defaults}
      for="disabled"
      of={ContextMenu}
      variants={bools}
      propLabels
    />
  );
};

export const Items = (props: ContextMenuProps) => {
  const defaults = useMergedProps(defaultProps, props);
  return (
    <ComponentVariants
      defaults={defaults}
      for="items"
      of={ContextMenu}
      variants={[
        items.slice(0, 1),
        items,
        items.map((item) => ({ ...item, disabled: true })),
      ]}
      propLabels
    />
  );
};

const icons: IconName[] = ["ThreeDotsVertical", "MenuDown"];
export const Icons = (props: ContextMenuProps) => {
  const defaults = useMergedProps(defaultProps, props);
  return (
    <ComponentVariants
      defaults={defaults}
      for="icon"
      of={ContextMenu}
      variants={icons}
      propLabels
    />
  );
};
