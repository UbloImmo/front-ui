import { forwardRef } from "react";

import { useTableRowStyle } from "./TableRow.styles";

import { useHtmlAttribute, useMergedProps, useTestId } from "@utils";

import type { TableRowProps } from "./TableRow.types";
import type { TestIdProps } from "@types";

const defaultTableRowProps: Required<TableRowProps> = {
  children: null,
  onClick: null,
  style: "form",
  className: null,
  styleOverride: null,
  id: null,
};

/**
 * A table row component, to be used in `TableBody`.
 *
 * @version 0.1.0
 */
export const TableRow = forwardRef<
  HTMLTableRowElement,
  TableRowProps & TestIdProps
>((props, ref) => {
  const mergedProps = useMergedProps(defaultTableRowProps, props);
  const { style, className } = useTableRowStyle(mergedProps);

  const {
    children,
    onClick,
    className: _,
    style: __,
    styleOverride: ___,
    id: rowId,
    ...restProps
  } = mergedProps;
  const testId = useTestId("table-row", props);

  const onClickHandler = useHtmlAttribute(onClick);
  const id = useHtmlAttribute(rowId);

  if ("testId" in restProps) delete restProps.testId;
  if ("overrideTestId" in restProps) delete restProps.overrideTestId;

  return (
    <tr
      ref={ref}
      data-testid={testId}
      className={className}
      style={style}
      id={id}
      onClick={onClickHandler}
      {...restProps}
    >
      {children}
    </tr>
  );
});
