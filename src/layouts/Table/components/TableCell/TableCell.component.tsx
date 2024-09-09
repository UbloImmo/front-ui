import styled from "styled-components";

import { tableCellStyles } from "./TableCell.styles";

import { useMergedProps, useStyleProps } from "@utils";

import type { TableCellProps, TableCellStyleProps } from "./TableCell.types";

const defaultTableCellProps: TableCellProps = {
  children: null,
  colSpan: 1,
  padded: false,
};

/**
 * A table cell component. Used in `TableRow`.
 *
 * @param {CellProps} props - The props for the component.
 * @return {JSX.Element} The rendered table cell.
 */
const TableCell = (props: TableCellProps): JSX.Element => {
  const mergedProps = useMergedProps(defaultTableCellProps, props);

  const styleProps = useStyleProps(mergedProps);

  return (
    <StyledTableCell
      colSpan={mergedProps.colSpan}
      data-testid="table-cell"
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
