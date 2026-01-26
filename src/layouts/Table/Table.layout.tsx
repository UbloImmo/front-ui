import { forwardRef } from "react";

import { useTableLayoutStyle } from "./Table.styles";
import { type TableProps, type TableDefaultProps } from "./Table.types";

import { useTestId, useMergedProps, useHtmlAttribute } from "@utils";

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
 * @version 0.1.0
 *
 * @param {TableProps & TestIdProps} props - Table component props
 * @returns {JSX.Element}
 */
const Table = forwardRef<HTMLTableElement, TableProps & TestIdProps>(
  (props: TableProps & TestIdProps, ref): JSX.Element => {
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
  }
);
Table.defaultProps = defaultTableProps;
Table.displayName = "Table";

export { Table };
