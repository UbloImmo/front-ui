import type { ActionProps } from "@/components/Action";
import type { IconName } from "@/components/Icon";
import type { Nullable } from "@ubloimmo/front-util";

export type ContextMenuItemSize = "s" | "m";

export type ContextMenuItemProps = Omit<
  ActionProps,
  "size" | "icon" | "description" | "indicator"
> & {
  /**
   * The item's size
   *
   * @remarks Picking `m` will result in rendering a `default` sized `Action` component.
   *
   * @type {ContextMenuItemSize}
   * @default "s"
   */
  size?: ContextMenuItemSize;
  /**
   * The icon name to be used by the underlying Action.
   *
   * @remarks Only used if `size` is set to `m`.
   *
   * @type {Nullable<IconName>}
   * @default null
   */
  icon?: Nullable<IconName>;
  /**
   * The item's index when rendered in a `ContextMenu`
   *
   * @type {number}
   * @default 0
   */
  index?: number;
};

export type ContextMenuItemDefaultProps = Required<ContextMenuItemProps>;
