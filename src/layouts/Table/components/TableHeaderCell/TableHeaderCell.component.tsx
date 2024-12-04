import { forwardRef, type ForwardedRef } from "react";
import styled from "styled-components";

import { tableHeaderCellStyles } from "./TableHeaderCell.styles";

import { useClassName, useMergedProps, useTestId } from "@utils";

import type { TableCellProps } from "../TableCell";
import type { TestIdProps } from "@types";

const defaultTableHeaderCellProps: TableCellProps = {
  children: null,
  colSpan: 1,
};

/**
 * A table header cell component to label the corresponding column, used in `TableHeader`.
 *
 * @version 0.0.4
 *
 * @param {CellProps} props - The props for the component.
 * @return {JSX.Element} The rendered table header cell.
 */
const TableHeaderCell = forwardRef<
  HTMLTableCellElement,
  TableCellProps & TestIdProps
>((props: TableCellProps & TestIdProps, ref): JSX.Element => {
  const mergedProps = useMergedProps(defaultTableHeaderCellProps, props);
  const testId = useTestId("table-header-cell", props);
  const className = useClassName(props);

  return (
    <StyledTableHeaderCell
      colSpan={mergedProps.colSpan}
      data-testid={testId}
      className={className}
      ref={ref}
    >
      <div data-testid="table-header-cell-inner">{props.children}</div>
    </StyledTableHeaderCell>
  );
});

const StyledTableHeaderCell = styled.th<{
  ref: ForwardedRef<HTMLTableCellElement>;
}>`
  ${tableHeaderCellStyles}
`;

export { TableHeaderCell };
