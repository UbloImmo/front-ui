import { forwardRef } from "react";

import styles from "../../Table.module.scss";

import {
  useCssClasses,
  useHtmlAttribute,
  useMergedProps,
  useTestId,
} from "@utils";

import type { TableHeaderCellProps } from "./TableHeaderCell.types";
import type { TestIdProps } from "@types";

const defaultTableHeaderCellProps: Required<TableHeaderCellProps> = {
  children: null,
  colSpan: 1,
  className: null,
  styleOverride: null,
};

/**
 * A table header cell component to label the corresponding column, used in `TableHeader`.
 *
 * @version 0.1.0
 *
 * @param {CellProps} props - The props for the component.
 * @return {JSX.Element} The rendered table header cell.
 */
export const TableHeaderCell = forwardRef<
  HTMLTableCellElement,
  TableHeaderCellProps & TestIdProps
>((props, ref): JSX.Element => {
  const mergedProps = useMergedProps(defaultTableHeaderCellProps, props);
  const testId = useTestId("table-header-cell", props);
  const className = useCssClasses(
    styles["table-header-cell"],
    mergedProps.className
  );
  const style = useHtmlAttribute(props.styleOverride);

  return (
    <th
      colSpan={mergedProps.colSpan}
      data-testid={testId}
      className={className}
      style={style}
      ref={ref}
    >
      <div data-testid="table-header-cell-inner">{props.children}</div>
    </th>
  );
});
