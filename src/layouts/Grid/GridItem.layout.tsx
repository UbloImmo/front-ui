import {
  isObject,
  isString,
  isUndefined,
  Optional,
} from "@ubloimmo/front-util";
import { useMemo } from "react";
import styled, { css } from "styled-components";

import { toStyleProps } from "@utils";

import type {
  GridEndPosition,
  GridItemDefaultProps,
  GridItemProps,
  GridStartPosition,
  GridItemStyleProps,
} from "./Grid.types";

const defaultGridItemProps: GridItemDefaultProps = {
  rowStart: "auto",
  rowEnd: "auto",
  columnStart: "auto",
  columnEnd: "auto",
  row: "auto / auto",
  column: "auto / auto",
  children: null,
  align: "start",
  justify: "start",
};

/**
 * Renders a grid item with the specified position and children.
 *
 * @version 0.0.1
 *
 * @param {GridItemProps} props - The props for the grid item.
 * @param {Optional<GridStartPosition>} props.rowStart - The start position of the row.
 * @param {Optional<GridEndPosition>} props.rowEnd - The end position of the row.
 * @param {Optional<GridStartPosition>} props.columnStart - The start position of the column.
 * @param {Optional<GridEndPosition>} props.columnEnd - The end position of the column.
 * @param {GridStartPosition | GridDetailedPosition | string} props.row - The row position.
 * @param {GridStartPosition | GridDetailedPosition | string} props.column - The column position.
 * @param {ReactNode} props.children - The children to render inside the grid item.
 * @return {JSX.Element} The rendered grid item.
 */
const GridItem = (props: GridItemProps): JSX.Element => {
  const styleProps = useMemo<GridItemStyleProps>(() => {
    let rowStart: Optional<GridStartPosition> = undefined;
    let rowEnd: Optional<GridEndPosition> = undefined;
    let columnStart: Optional<GridStartPosition> = undefined;
    let columnEnd: Optional<GridEndPosition> = undefined;

    // combined position
    if (props.row) {
      if (isObject(props.row)) {
        if (props.row.start) {
          rowStart = props.row.start;
        }
        if (props.row.end) {
          rowEnd = props.row.end;
        }
      } else if (isString(props.row)) {
        const [start, end] = props.row
          .split("/")
          .map((position) => position.trim()) as [
          GridStartPosition,
          GridEndPosition
        ];
        rowStart = start;
        rowEnd = end;
      }
    }
    if (props.column) {
      if (isObject(props.column)) {
        if (props.column.start) {
          rowStart = props.column.start;
        }
        if (props.column.end) {
          rowEnd = props.column.end;
        }
      } else if (isString(props.column)) {
        const [start, end] = props.column
          .split("/")
          .map((position) => position.trim()) as [
          GridStartPosition,
          GridEndPosition
        ];
        rowStart = start;
        rowEnd = end;
      }
    }
    // detailed position
    if (!isUndefined(props.columnStart)) {
      columnStart = props.columnStart;
    }
    if (!isUndefined(props.columnEnd)) {
      columnEnd = props.columnEnd;
    }
    if (!isUndefined(props.rowStart)) {
      rowStart = props.rowStart;
    }
    if (!isUndefined(props.rowEnd)) {
      rowEnd = props.rowEnd;
    }
    return toStyleProps({
      rowStart: rowStart ?? defaultGridItemProps.rowStart,
      rowEnd: rowEnd ?? defaultGridItemProps.rowEnd,
      columnStart: columnStart ?? defaultGridItemProps.columnStart,
      columnEnd: columnEnd ?? defaultGridItemProps.columnEnd,
      justify: props.justify ?? defaultGridItemProps.justify,
      align: props.align ?? defaultGridItemProps.align,
    });
  }, [props]);

  return (
    <GridItemContainer {...styleProps}>{props.children}</GridItemContainer>
  );
};
GridItem.defaultProps = defaultGridItemProps;

export { GridItem };

const GridItemContainer = styled.div<GridItemStyleProps>`
  ${({ $rowStart, $rowEnd, $columnStart, $columnEnd, $align, $justify }) => css`
    grid-row: ${$rowStart} / ${$rowEnd};
    grid-column: ${$columnStart} / ${$columnEnd};
    align-self: ${$align};
    justify-self: ${$justify};
  `}
`;
