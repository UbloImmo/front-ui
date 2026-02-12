import type { StyleOverrideProps, CssFr, CssLength } from "@types";
import type { Enum, Nullable } from "@ubloimmo/front-util";
import type { AriaRole, ReactNode } from "react";

const _flexAlignments = [
  "center",
  "start",
  "end",
  "space-around",
  "space-between",
  "space-evenly",
  "stretch",
  "baseline",
] as const;

export type FlexAlignment = Enum<typeof _flexAlignments>;

const _flexDirections = ["row", "column"] as const;

export type FlexDirection = Enum<typeof _flexDirections>;

export type FlexWrap = boolean | "reverse";

export type FlexGap = Exclude<CssLength, CssFr>;

export type FlexFill = boolean | FlexDirection;

export type Overflow =
  | "hidden"
  | "unset"
  | "auto"
  | "visible"
  | "clip"
  | "scroll";

export type FlexLayoutProps = {
  /**
   * the direction of items (default: `row`)
   *
   * @type {FlexDirection}
   * @default "row"
   */
  direction?: FlexDirection;
  /**
   * the spacing between items
   *
   * @default 0
   * @type {CssLength}
   */
  gap?: CssLength;
  /**
   * the horizontal alignment
   *
   * @default "start"
   * @type {FlexAlignment}
   */
  justify?: FlexAlignment;
  /**
   * the vertical alignment (default: `start`)
   *
   * @default "start"
   * @type {FlexAlignment}
   */
  align?: FlexAlignment;
  /**
   * activate wrapping of items
   *
   * @default false
   * @type {FlexWrap}
   */
  wrap?: FlexWrap;
  /**
   * reverse the order of the items
   *
   * @default false
   * @type {boolean}
   */
  reverse?: boolean;
  /**
   * to display as `inline-flex` (default: `flex`)
   *
   * @default false
   * @type {boolean}
   */
  inline?: boolean;
  /**
   * set height or width to 100%
   *
   * @default false
   * @type {FlexFill}
   */
  fill?: FlexFill;
  /**
   * Sets the container's overflow
   *
   * @default "visible"
   * @type {Overflow}
   */
  overflow?: Overflow;
  /**
   * the child elements to render
   *
   * @default null
   * @type {ReactNode}
   */
  children?: ReactNode;
  /**
   * the ARIA role of the element
   *
   * @default null
   * @type {AriaRole}
   */
  role?: Nullable<AriaRole>;
  /**
   * An optional id for the element
   *
   * @type {Nullable<string>}
   * @default null
   */
  id?: Nullable<string>;
} & StyleOverrideProps;

export type FlexLayoutDefaultProps = Required<FlexLayoutProps>;

export type FlexDirectionLayoutProps = Omit<FlexLayoutProps, "direction">;
