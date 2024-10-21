import styled from "styled-components";

import { tableCellStyles } from "./TableCell.styles";

import { useClassName, useMergedProps, useStyleProps, useTestId } from "@utils";

import type { TableCellProps, TableCellStyleProps } from "./TableCell.types";
import type { TestIdProps } from "@types";

const defaultTableCellProps: TableCellProps = {
  children: null,
  colSpan: 1,
  padded: false,
};

/**
 * A table cell component. Used in `TableRow`.
 *
 * @version 0.0.2
 *
 * @param {CellProps} props - The props for the component.
 * @return {JSX.Element} The rendered table cell.
 */
const TableCell = (props: TableCellProps & TestIdProps): JSX.Element => {
  const mergedProps = useMergedProps(defaultTableCellProps, props);

  const styleProps = useStyleProps(mergedProps);

  const className = useClassName(props);

  const testId = useTestId("table-cell", props);

  return (
    <StyledTableCell
      colSpan={mergedProps.colSpan}
      data-testid={testId}
      className={className}
      {...styleProps}
    >
      {props.children}
    </StyledTableCell>
  );
};

export { TableCell };

const StyledTableCell = styled.td<TableCellStyleProps>`
  ${tableCellStyles}
`;
