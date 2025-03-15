import { forwardRef } from "react";
import styled from "styled-components";

import { tableCellStyles } from "./TableCell.styles";

import {
  useClassName,
  useHtmlAttribute,
  useMergedProps,
  useStyleProps,
  useTestId,
} from "@utils";

import type { TableCellProps, TableCellStyleProps } from "./TableCell.types";
import type { TestIdProps } from "@types";

const defaultTableCellProps: Required<TableCellProps> = {
  children: null,
  colSpan: 1,
  padded: false,
  className: null,
  styleOverride: null,
};

/**
 * A table cell component. Used in `TableRow`.
 *
 * @version 0.0.3
 *
 * @param {CellProps} props - The props for the component.
 * @return {JSX.Element} The rendered table cell.
 */
const TableCell = forwardRef<
  HTMLTableCellElement,
  TableCellProps & TestIdProps
>((props: TableCellProps & TestIdProps, ref): JSX.Element => {
  const mergedProps = useMergedProps(defaultTableCellProps, props);

  const styleProps = useStyleProps(mergedProps);
  const className = useClassName(mergedProps);
  const style = useHtmlAttribute(mergedProps.styleOverride);

  const testId = useTestId("table-cell", props);

  return (
    <StyledTableCell
      colSpan={mergedProps.colSpan}
      data-testid={testId}
      className={className}
      style={style}
      ref={ref}
      {...styleProps}
    >
      {props.children}
    </StyledTableCell>
  );
});

export { TableCell };

const StyledTableCell = styled.td<TableCellStyleProps>`
  ${tableCellStyles}
`;
