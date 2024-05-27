import { GenericFn, NonNullish, Nullable } from "@ubloimmo/front-util";
import { ReactNode } from "react";

import { IconName } from "../Icon/Icon.types";

import { Enum, StyleProps } from "@types";

const tooltipDirections = ["top", "right", "bottom", "left"] as const;
export type TooltipDirection = Enum<typeof tooltipDirections>;

export type TooltipContentFn = GenericFn<[], ReactNode>;

export type TooltipProps = {
  /**
   * The wrapped content in the tooltip
   * @required
   */
  children: ReactNode;
  /**
   * The text displayed in the tooltip
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
   * The icon do display when no `children` are provided
   * @type {IconName}
   * @default "QuestionCircleFill"
   */
  icon?: IconName;
  /**
   * Intersection root to compare against when positioning tooltip
   *
   * @remarks defaults to viewport
   *
   *
   * @default null
   *
   */
  intersectionRoot?: Nullable<HTMLElement>;
};

export type DefaultTooltipProps = Required<TooltipProps>;

export type TooltipStyleProps = StyleProps<
  Pick<DefaultTooltipProps, "direction">
>;
