import { forwardRef } from "react";
import styled from "styled-components";

import { gridItemStyles } from "./GridItem.styles";
import { useGridItemPosition } from "./GridItem.utils";

import {
  useClassName,
  useHtmlAttribute,
  useStyleProps,
  useTestId,
} from "@utils";

import type {
  GridItemDefaultProps,
  GridItemProps,
  GridItemStyleProps,
} from "./GridItem.types";
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
 * @version 0.0.4
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
    const styleProps = useStyleProps(position);
    const className = useClassName(props);
    const style = useHtmlAttribute(props.styleOverride);
    return (
      <GridItemContainer
        {...styleProps}
        as={props.as ?? "div"}
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
      </GridItemContainer>
    );
  }
);
GridItem.defaultProps = defaultGridItemProps;

export { GridItem };

const GridItemContainer = styled.div<GridItemStyleProps>`
  ${gridItemStyles}
`;
