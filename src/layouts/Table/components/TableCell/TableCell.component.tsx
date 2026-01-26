import { forwardRef } from "react";

import styles from "../../Table.module.scss";

import {
  useCssClasses,
  useHtmlAttribute,
  useMergedProps,
  useTestId,
} from "@utils";

import type { TableCellProps } from "./TableCell.types";
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
 * @version 0.1.0
 *
 * @param {CellProps} props - The props for the component.
 * @return {JSX.Element} The rendered table cell.
 */
const TableCell = forwardRef<
  HTMLTableCellElement,
  TableCellProps & TestIdProps
>((props: TableCellProps & TestIdProps, ref): JSX.Element => {
  const mergedProps = useMergedProps(defaultTableCellProps, props);

  const className = useCssClasses(
    styles["table-cell"],
    [styles.padded, mergedProps.padded],
    mergedProps.className
  );
  const style = useHtmlAttribute(mergedProps.styleOverride);
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
