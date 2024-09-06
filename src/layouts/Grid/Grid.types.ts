import type { CssLength, StyleOverrideProps } from "@types";
import type { Enum, Nullable } from "@ubloimmo/front-util";
import type { AriaRole, ReactNode } from "react";

const gridFlows = [
  "row",
  "column",
  "row dense",
  "column dense",
  "dense",
] as const;

export type GridFlow = Enum<typeof gridFlows>;

const gridAlignments = ["center", "start", "end", "baseline"] as const;

export type GridAlignment = Enum<typeof gridAlignments>;

export type GridGap =
  | CssLength
  | {
      row: CssLength;
      column: CssLength;
    };

export type GridTemplate = (CssLength | "auto")[] | number | "unset";

export type GridLayoutProps = {
  /**
   * The flow of the grid
   * @default "row"
   * @type {GridFlow}
   */
  flow?: GridFlow;
  /**
   * The gap between the grid items
   * @default "1rem"
   * @type {GridGap}
   */
  gap?: GridGap;
  /**
   * The alignment of the grid items based on **X axis**
   * @default "start"
   * @type {GridAlignment}
   */
  justify?: GridAlignment;
  /**
   * The alignment of the grid items based on **Y axis**
   * @default "start"
   * @type {GridAlignment}
   */
  align?: GridAlignment;
  /**
   * The number of columns in the grid
   * @default 12
   * @type {GridTemplate}
   */
  columns?: GridTemplate;
  /**
   * The number of rows in the grid
   * @default "unset"
   * @type {GridTemplate}
   */
  rows?: GridTemplate;
  /**
   * If `true`, the grid will be displayed as `inline grid` (default: `grid`)
   * @default false
   * @type {boolean}
   */
  inline?: boolean;
  /**
   * Whether the grid should fill the available space on the X axis
   *
   * @default false
   * @type {boolean}
   */
  fill?: boolean;
  /**
   * the child elements to be rendered in the grid
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

export type GridLayoutDefaultProps = Required<GridLayoutProps>;
