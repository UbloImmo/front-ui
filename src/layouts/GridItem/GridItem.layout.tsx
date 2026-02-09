import { forwardRef } from "react";

import { useGridItemStyle } from "./GridItem.styles";
import { useGridItemPosition } from "./GridItem.utils";

import { useTestId } from "@utils";

import type { GridItemDefaultProps, GridItemProps } from "./GridItem.types";
import type { TestIdProps } from "@types";

const defaultGridItemProps: GridItemDefaultProps = {
  rowStart: "auto",
  rowEnd: "auto",
  columnStart: "auto",
  columnEnd: "auto",
  row: "auto / auto",
  column: "auto / auto",
  align: "start",
  justify: "start",
  fill: false,
  children: null,
  className: null,
  as: "div",
  styleOverride: null,
};

/**
 * Renders a grid item with the specified position and children.
 *
 * @version 0.1.0
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
const GridItem = forwardRef<HTMLDivElement, GridItemProps & TestIdProps>(
  (
    props: GridItemProps & TestIdProps = defaultGridItemProps,
    ref
  ): JSX.Element => {
    const testId = useTestId("grid-item", props as TestIdProps);
    const position = useGridItemPosition(defaultGridItemProps, props);
    const { className, style } = useGridItemStyle({
      ...position,
      className: props.className ?? null,
      styleOverride: props.styleOverride ?? null,
    });
    const Element = position.as;
    return (
      <Element
        data-testid={testId}
        className={className}
        style={style}
        ref={ref}
        data-layout="grid-item"
        data-column-start={position.columnStart}
        data-column-end={position.columnEnd}
        data-row-start={position.rowStart}
        data-row-end={position.rowEnd}
        data-fill={position.fill}
      >
        {props.children}
      </Element>
    );
  }
);
GridItem.__DEFAULT_PROPS = defaultGridItemProps;

export { GridItem };
