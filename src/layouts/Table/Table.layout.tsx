import { forwardRef, type ReactNode } from "react";

import { useTableLayoutStyle } from "./Table.styles";

import { useTestId, useMergedProps, useHtmlAttribute } from "@utils";

import type { TableDefaultProps, TableProps } from "./Table.types";
import type { TestIdProps } from "@types";

const defaultTableProps: TableDefaultProps = {
  children: null,
  className: null,
  styleOverride: null,
  layout: "auto",
  id: null,
};

/**
 * A structured layout element used to display data in rows and columns.
 *
 * @version 0.1.1
 *
 * @param {TableProps & TestIdProps} props - Table component props
 * @returns {ReactNode} The Table layout
 */
const Table = forwardRef<
  HTMLTableElement,
  TableProps & TestIdProps,
  TableDefaultProps
>((props: TableProps & TestIdProps, ref): ReactNode => {
  const mergedProps = useMergedProps(defaultTableProps, props);
  const testId = useTestId("table", props);

  const { className, style } = useTableLayoutStyle(mergedProps);

  const id = useHtmlAttribute(mergedProps.id);

  return (
    <table
      id={id}
      data-testid={testId}
      className={className}
      style={style}
      ref={ref}
    >
      {mergedProps.children}
    </table>
  );
});
Table.__DEFAULT_PROPS = defaultTableProps;
Table.displayName = "Table";

export { Table };
