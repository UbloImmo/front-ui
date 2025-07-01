import { forwardRef } from "react";
import styled from "styled-components";

import { tableLayoutStyles } from "./Table.styles";
import {
  type TableProps,
  type TableDefaultProps,
  TableStyleProps,
} from "./Table.types";

import {
  useTestId,
  useMergedProps,
  useClassName,
  useStyleProps,
  useHtmlAttribute,
} from "@utils";

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
 * @version 0.0.4
 *
 * @param {TableProps & TestIdProps} props - Table component props
 * @returns {JSX.Element}
 */
const Table = forwardRef<HTMLTableElement, TableProps & TestIdProps>(
  (props: TableProps & TestIdProps, ref): JSX.Element => {
    const mergedProps = useMergedProps(defaultTableProps, props);
    const testId = useTestId("table", props);

    const className = useClassName(mergedProps);

    const styleProps = useStyleProps(mergedProps);
    const style = useHtmlAttribute(mergedProps.styleOverride);

    const id = useHtmlAttribute(mergedProps.id);

    return (
      <TableLayout
        id={id}
        data-testid={testId}
        className={className}
        style={style}
        ref={ref}
        {...styleProps}
      >
        {mergedProps.children}
      </TableLayout>
    );
  }
);
Table.defaultProps = defaultTableProps;
Table.displayName = "Table";

export { Table };

const TableLayout = styled.table<TableStyleProps>`
  ${tableLayoutStyles}
`;
