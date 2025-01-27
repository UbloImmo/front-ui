import { isObject, isString, isUndefined } from "@ubloimmo/front-util";

import { useMergedProps } from "@utils";

import type {
  GridAxisPosition,
  GridCombinedPosition,
  GridDetailedPosition,
  GridEndPosition,
  GridItemDefaultProps,
  GridItemInnerProps,
  GridItemProps,
  GridStartPosition,
  ParsedGridAxisPosition,
  ParsedGridItemPosition,
} from "./GridItem.types";
import type { Optional } from "@ubloimmo/front-util";

/**
 * Parses a grid axis position and returns an object with the start and end positions.
 *
 * @param {GridAxisPosition} axisPosition - The grid axis position to parse. It can be an object with start and end properties, or a string in the format "start/end".
 * @return {ParsedGridAxisPosition} - An object with the start and end positions of the grid axis.
 */
const parseGridAxisPosition = (
  axisPosition: GridAxisPosition,
): ParsedGridAxisPosition => {
  let start: Optional<GridStartPosition> = undefined;
  let end: Optional<GridEndPosition> = undefined;
  if (isObject(axisPosition)) {
    if (axisPosition.start) {
      start = axisPosition.start;
    }
    if (axisPosition.end) {
      end = axisPosition.end;
    }
  } else if (isString(axisPosition)) {
    const [posStart, posEnd] = axisPosition
      .split("/")
      .map((pos) => pos.trim()) as [GridStartPosition, GridEndPosition];
    start = posStart;
    end = posEnd;
  }
  return {
    start,
    end,
  };
};

/**
 * Parses the grid item position and returns an object with the start and end positions for both row and column.
 *
 * @param {GridItemProps} position - The grid item position to parse. It can be an object with row and column properties, or a string in the format "row/column".
 * @return {ParsedGridItemPosition} - An object with the start and end positions for both row and column.
 */
export const parseGridItemPosition = (
  position: Pick<
    GridItemProps,
    keyof GridCombinedPosition | keyof GridDetailedPosition
  >,
): ParsedGridItemPosition => {
  let rowStart: Optional<GridStartPosition> = undefined;
  let rowEnd: Optional<GridEndPosition> = undefined;
  let columnStart: Optional<GridStartPosition> = undefined;
  let columnEnd: Optional<GridEndPosition> = undefined;

  // combined position
  if (position.row && position.row !== "auto / auto") {
    const parsedRow = parseGridAxisPosition(position.row);
    rowStart = parsedRow.start;
    rowEnd = parsedRow.end;
  }
  if (position.column && position.column !== "auto / auto") {
    const parsedColumn = parseGridAxisPosition(position.column);
    columnStart = parsedColumn.start;
    columnEnd = parsedColumn.end;
  }

  // detailed position
  if (!isUndefined(position.columnStart) && isUndefined(columnStart)) {
    columnStart = position.columnStart;
  }
  if (!isUndefined(position.columnEnd) && isUndefined(columnEnd)) {
    columnEnd = position.columnEnd;
  }
  if (!isUndefined(position.rowStart) && isUndefined(rowStart)) {
    rowStart = position.rowStart;
  }
  if (!isUndefined(position.rowEnd) && isUndefined(rowEnd)) {
    rowEnd = position.rowEnd;
  }
  return {
    rowStart,
    rowEnd,
    columnStart,
    columnEnd,
  };
};

/**
 * Parses the grid item position by merging the default props and the provided position.
 *
 * @param {GridItemDefaultProps} defaultProps - The default props for the grid item.
 * @param {GridItemProps} position - The position props for the grid item.
 * @return {GridItemInnerProps} The merged grid item position with the default props and the provided position.
 */
export const useGridItemPosition = (
  defaultProps: GridItemDefaultProps,
  { justify, align, fill, ...position }: GridItemProps,
): GridItemInnerProps => {
  const parsedPosition = parseGridItemPosition(position);
  const {
    children: _children,
    column: _column,
    row: _row,
    ...defaultPosition
  } = defaultProps;
  return useMergedProps(defaultPosition, {
    ...parsedPosition,
    justify,
    align,
    fill,
  });
};
