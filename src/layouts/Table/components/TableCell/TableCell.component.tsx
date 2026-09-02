import { forwardRef } from "react";

import { useTableCellStyles } from "./TableCell.styles";

import { useHtmlAttribute, useMergedProps, useTestId } from "@utils";

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
  role: "cell",
  onClick: null,
  position: null,
  title: null,
};

/**
 * A table cell component. Used in `TableRow`.
 *
 * @version 0.1.2
 *
 * @param {CellProps} props - The props for the component.
 * @return {JSX.Element} The rendered table cell.
 */
const TableCell = forwardRef<
  HTMLTableCellElement,
  TableCellProps & TestIdProps
>((props: TableCellProps & TestIdProps, ref): JSX.Element => {
  const mergedProps = useMergedProps(defaultTableCellProps, props);

  const onClick = useHtmlAttribute(mergedProps.onClick);
  const { className, style } = useTableCellStyles(mergedProps);
  const testId = useTestId("table-cell", props);

  const position = useHtmlAttribute(mergedProps.position);
  const title = useHtmlAttribute(mergedProps.title);

  return (
    <td
      colSpan={mergedProps.colSpan}
      data-testid={testId}
      className={className}
      style={style}
      ref={ref}
      role={mergedProps.role}
      title={title}
      onClick={onClick}
      data-position={position}
    >
      {props.children}
    </td>
  );
});

export { TableCell };
