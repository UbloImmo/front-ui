import styled from "styled-components";

import { tableHeaderCellStyles } from "./TableHeaderCell.styles";

import { useMergedProps } from "@utils";

import type { TableCellProps } from "../TableCell";

const defaultTableHeaderCellProps: TableCellProps = {
  children: null,
  colSpan: 1,
};

/**
 * A table header cell component to label the corresponding column, used in `TableHeader`.
 *
 * @param {CellProps} props - The props for the component.
 * @return {JSX.Element} The rendered table header cell.
 */
const TableHeaderCell = (props: TableCellProps): JSX.Element => {
  const mergedProps = useMergedProps(defaultTableHeaderCellProps, props);

  return (
    <StyledTableHeaderCell
      colSpan={mergedProps.colSpan}
      data-testid="table-header-cell"
    >
      <div data-testid="table-header-cell-inner">{props.children}</div>
    </StyledTableHeaderCell>
  );
};

const StyledTableHeaderCell = styled.th`
  ${tableHeaderCellStyles}
`;

export { TableHeaderCell };
