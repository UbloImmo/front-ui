import { CssLength, Enum, type StyleProps } from "@types";

import type { ReactNode } from "react";

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
   * the child elements to be rendered in the grid
   * @default null
   * @type {ReactNode}
   */
  children?: ReactNode;
};

export type GridLayoutDefaultProps = Required<GridLayoutProps>;

export type GridStartPosition = number | `${number}` | "auto";

export type GridEndPosition = GridStartPosition | `span ${number}`;

type GridAxisPositionStr = `${GridStartPosition} / ${GridEndPosition}`;

type GridAxisPosition =
  | GridAxisPositionStr
  | { start?: GridStartPosition; end?: GridEndPosition };

type GridDetailedPosition = {
  /**
   * The item's start row on the grid
   * @default "auto"
   * @type {GridStartPosition}
   */
  rowStart?: GridStartPosition;
  /**
   * The item's end row on the grid
   * @default "auto"
   * @type {GridEndPosition}
   */
  rowEnd?: GridEndPosition;
  /**
   * The item's start column on the grid
   * @default "auto"
   * @type {GridStartPosition}
   */
  columnStart?: GridStartPosition;
  /**
   * The item's end column on the grid
   * @default "auto"
   * @type {GridEndPosition}
   */
  columnEnd?: GridEndPosition;
};

export type GridCombinedPosition = {
  /**
   * The item's row position on the grid
   * @default "auto / auto"
   * @type {GridAxisPosition}
   */
  row?: GridAxisPosition;
  /**
   * The item's column position on the grid
   * @default "auto / auto"
   * @type {GridAxisPosition}
   */
  column?: GridAxisPosition;
};

type GridItemCommonProps = {
  /**
   * The children to render inside the grid item
   */
  children?: ReactNode;
  /**
   * The alignment of the grid item based on **X axis**
   * @default "start"
   * @type {GridAlignment}
   */
  justify?: GridAlignment;
  /**
   * The alignment of the grid item based on **Y axis**
   * @default "start"
   * @type {GridAlignment}
   */
  align?: GridAlignment;
};

export interface GridItemProps
  extends GridItemCommonProps,
    GridCombinedPosition {}

export interface GridItemProps
  extends GridItemCommonProps,
    GridDetailedPosition {}

export type GridItemDefaultProps = Required<GridItemProps>;

export type GridItemStyleProps = StyleProps<
  Required<GridDetailedPosition & Omit<GridItemCommonProps, "children">>
>;
