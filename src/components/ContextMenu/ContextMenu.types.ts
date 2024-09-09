import type { IconName } from "../Icon";
import type {
  ContextMenuItemProps,
  ContextMenuItemSize,
} from "./components/ContextMenuItem/ContextMenuItem.types";
import type { ControlledPopoverProps } from "@layouts";
import type { StyleProps, TestIdProps } from "@types";
import type { ReactNode } from "react";

export type ContextMenuItemData = Omit<ContextMenuItemProps, "size" | "index"> &
  TestIdProps;

export type ContextMenuProps = {
  /**
   * The trigger for the context menu
   *
   * @remarks Leaving this prop empty will render an ActionIcon by default
   *
   * @type {ReactNode}
   * @default null
   */
  children?: ReactNode;
  /**
   * The items of the context menu
   *
   * @type {ContextMenuItemProps[]}
   * @default []
   */
  items: ContextMenuItemData[];
  /**
   * The size of the context menu
   */
  size?: ContextMenuItemSize;
  /**
   * The disabled state of the context menu
   *
   * @remarks Results in all context menu items being disabled
   *
   * @type {boolean}
   * @default false
   */
  disabled?: boolean;
  /**
   * The icon of the rendered action Icon.
   *
   * @remarks Only used if `children` is falsy
   *
   * @type {IconName}
   * @default "ThreeDotsVertical"
   */
  icon?: IconName;
} & Partial<
  Pick<
    ControlledPopoverProps,
    | "align"
    | "side"
    | "fill"
    | "open"
    | "onOpenChange"
    | "defaultOpen"
    | "sticky"
    | "collisionBoundary"
  >
>;

export type ContextMenuDefaultProps = Required<ContextMenuProps>;

export type ContextMenuStyleProps = StyleProps<Pick<ContextMenuProps, "size">>;

export type ContextMenuActionIconStyleProps = StyleProps<{ open?: boolean }>;
