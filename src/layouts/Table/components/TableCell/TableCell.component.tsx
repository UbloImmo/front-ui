import styled from "styled-components";

import { tableCellStyles } from "./TableCell.styles";

import { useMergedProps, useStyleProps } from "@utils";

import type { CellProps, TableCellStyleProps } from "../../Table.types";

const defaultTableCellProps: CellProps = {
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
const TableCell = (props: CellProps): JSX.Element => {
  const mergedProps = useMergedProps(defaultTableCellProps, props);

  const styleProps = useStyleProps(mergedProps);

  return (
    <StyledTableCell colSpan={mergedProps.colSpan} {...styleProps}>
      {props.children}
    </StyledTableCell>
  );
};

export { TableCell };

const StyledTableCell = styled.td<TableCellStyleProps>`
  ${tableCellStyles}
`;
