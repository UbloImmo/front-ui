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
  const testId = useTestId("table-row", props);
  const { style, className } = useTableRowStyle(mergedProps);

  const {
    children,
    onClick,
    className: _,
    style: __,
    styleOverride: ___,
    ...restProps
  } = mergedProps;

  const onClickHandler = useHtmlAttribute(onClick);

  return (
    <tr
      ref={ref}
      data-testid={testId}
      className={className}
      style={style}
      onClick={onClickHandler}
      {...restProps}
    >
      {children}
    </tr>
  );
});
