import { forwardRef } from "react";

import { useTableCellStyles } from "./TableCell.styles";

import { useMergedProps, useTestId } from "@utils";

import type { TableCellProps } from "./TableCell.types";
import type { TestIdProps } from "@types";

const defaultTableCellProps: Required<TableCellProps> = {
  children: null,
  colSpan: 1,
  padded: false,
  className: null,
  styleOverride: null,
  minWidth: null,
  fixedWidth: null,
};

/**
 * A table cell component. Used in `TableRow`.
 *
 * @version 0.1.1
 *
 * @param {CellProps} props - The props for the component.
 * @return {JSX.Element} The rendered table cell.
 */
const TableCell = forwardRef<
  HTMLTableCellElement,
  TableCellProps & TestIdProps
>((props: TableCellProps & TestIdProps, ref): JSX.Element => {
  const mergedProps = useMergedProps(defaultTableCellProps, props);

  const { className, style } = useTableCellStyles(mergedProps);
  const testId = useTestId("table-cell", props);

  return (
    <td
      colSpan={mergedProps.colSpan}
      data-testid={testId}
      className={className}
      style={style}
      ref={ref}
    >
      {props.children}
    </td>
  );
});

export { TableCell };
