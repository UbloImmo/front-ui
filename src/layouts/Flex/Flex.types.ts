import { CssFr, CssLength, Enum } from "../../types";

import type { ReactNode } from "react";

const flexAlignments = [
  "center",
  "start",
  "end",
  "space-around",
  "space-between",
  "space-evenly",
  "stretch",
  "baseline",
] as const;

export type FlexAlignment = Enum<typeof flexAlignments>;

const flexDirections = ["row", "column"] as const;

export type FlexDirection = Enum<typeof flexDirections>;

export type FlexWrap = boolean | "reverse";

export type FlexGap = Exclude<CssLength, CssFr>;

export type FlexFill = boolean | FlexDirection;

export type FlexLayoutProps = {
  /**
   * the direction of items
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
   * the vertical alignment
   *
   * @default "start"
   * @type {FlexAlignment}
   */
  align?: FlexAlignment;
  /**
   * wrap items
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
   * display as inline-flex
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
   * the children to render
   *
   * @default null
   * @type {ReactNode}
   */
  children?: ReactNode;
};

export type FlexLayoutDefaultProps = Required<FlexLayoutProps>;

export type FlexDirectionLayoutProps = Omit<FlexLayoutProps, "direction">;
