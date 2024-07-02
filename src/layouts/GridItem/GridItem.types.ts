import type { GridAlignment } from "../Grid/Grid.types";
import type { StyleOverrideProps, StyleProps } from "@types";
import type { Optional } from "@ubloimmo/front-util";
import type { ReactNode } from "react";

export type GridStartPosition = number | `${number}` | "auto";

export type GridEndPosition = GridStartPosition | `span ${number}`;

export type GridAxisPositionStr = `${GridStartPosition} / ${GridEndPosition}`;

export type GridAxisPositionObj = {
  start?: GridStartPosition;
  end?: GridEndPosition;
};

export type GridAxisPosition = GridAxisPositionStr | GridAxisPositionObj;

export type ParsedGridAxisPosition = {
  [TKey in keyof GridAxisPositionObj]: Optional<GridAxisPositionObj[TKey]>;
};

export type GridDetailedPosition = {
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

export type ParsedGridItemPosition = {
  [TKey in keyof GridDetailedPosition]: Optional<GridDetailedPosition[TKey]>;
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
  /**
   * Whether to fill the grid cell
   *
   * @default false
   */
  fill?: boolean;
} & StyleOverrideProps;

export interface GridItemProps
  extends GridItemCommonProps,
    GridCombinedPosition {}

export interface GridItemProps
  extends GridItemCommonProps,
    GridDetailedPosition {}

export type GridItemDefaultProps = Required<GridItemProps>;

export type GridItemInnerProps = Required<
  GridDetailedPosition & Omit<GridItemCommonProps, "children">
>;

export type GridItemStyleProps = StyleProps<GridItemInnerProps>;
