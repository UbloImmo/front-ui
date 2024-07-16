import type { IconName } from "../Icon/Icon.types";
import type { Direction, StyleProps } from "@types";
import type {
  Enum,
  GenericFn,
  NonNullish,
  Nullable,
} from "@ubloimmo/front-util";
import type { ReactNode } from "react";

export type TooltipContentFn = GenericFn<[], ReactNode>;

const cursors = ["default", "pointer", "not-allowed", "help"] as const;

export type ToolitipCursor = Enum<typeof cursors>;

export type TooltipProps = {
  /**
   * The wrapped content by the tooltip
   * @required
   */
  children: ReactNode;
  /**
   * The text or element displayed in the tooltip
   * @required
   */
  content: NonNullish<ReactNode | TooltipContentFn>;
  /**
   * The direction of the tooltip
   * @type {Direction}
   * @default "top"
   */
  direction?: Direction;
  /**
   * The icon to display when no `children` are provided
   * @type {IconName}
   * @default "QuestionCircleFill"
   */
  icon?: IconName;
  /**
   * Intersection root to compare against when positioning tooltip
   * @remarks defaults to viewport
   * @default null
   *
   */
  intersectionRoot?: Nullable<HTMLElement | string>;
  /**
   * The cursor of the tooltip
   *
   * @default "help"
   */
  cursor?: ToolitipCursor;
};

export type DefaultTooltipProps = Required<TooltipProps>;

export type TooltipStyleProps = StyleProps<
  Pick<DefaultTooltipProps, "direction">
>;

export type TooltipWrapperStyleProps = StyleProps<
  Pick<DefaultTooltipProps, "cursor">
>;

export type ToolipIntersection = Pick<DOMRectReadOnly, Direction>;
