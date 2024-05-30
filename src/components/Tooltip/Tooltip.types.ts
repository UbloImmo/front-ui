import type { IconName } from "../Icon/Icon.types";
import type { StyleProps } from "@types";
import type {
  GenericFn,
  NonNullish,
  Nullable,
  Enum,
} from "@ubloimmo/front-util";
import type { ReactNode } from "react";

const tooltipDirections = ["top", "right", "bottom", "left"] as const;
export type TooltipDirection = Enum<typeof tooltipDirections>;

export type TooltipContentFn = GenericFn<[], ReactNode>;

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
   * @type {TooltipDirection}
   * @default "top"
   */
  direction?: TooltipDirection;
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
};

export type DefaultTooltipProps = Required<TooltipProps>;

export type TooltipStyleProps = StyleProps<
  Pick<DefaultTooltipProps, "direction">
>;

export type ToolipIntersection = Pick<
  DOMRectReadOnly,
  "top" | "bottom" | "left" | "right"
>;
