import type { IconName } from "../Icon/Icon.types";
import type { Direction, PaletteColor, StyleProps } from "@types";
import type {
  Enum,
  GenericFn,
  NonNullish,
  Nullable,
} from "@ubloimmo/front-util";
import type { ReactNode } from "react";

export type TooltipContentFn = GenericFn<[], ReactNode>;

const _cursors = [
  "default",
  "pointer",
  "not-allowed",
  "help",
  "pointer",
  "progress",
  "wait",
  "context-menu",
  "cell",
  "crosshair",
  "copy",
] as const;

export type TooltipCursor = Enum<typeof _cursors>;

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
   * The color of the default icon
   * @type {PaletteColor}
   * @default "gray-700"
   */
  iconColor?: PaletteColor;
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
  cursor?: TooltipCursor;
};

export type DefaultTooltipProps = Required<TooltipProps>;

/** @deprecated styled-components */
export type TooltipWrapperStyleProps = StyleProps<
  Pick<DefaultTooltipProps, "cursor">
>;

export type ToolipIntersection = Pick<DOMRectReadOnly, Direction>;
