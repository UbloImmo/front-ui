import styled from "styled-components";

import { tableLayoutStyles } from "./Table.styles";
import {
  type TableProps,
  type TableDefaultProps,
  TableStyleProps,
} from "./Table.types";

import { useTestId, useMergedProps, useClassName, useStyleProps } from "@utils";

import type { TestIdProps } from "@types";

const defaultTableProps: TableDefaultProps = {
  children: null,
  className: null,
  layout: "auto",
};

/**
 * A structured layout element used to display data in rows and columns.
 *
 * @version 0.0.2
 *
 * @param {TableProps & TestIdProps} props - Table component props
 * @returns {JSX.Element}
 */
const Table = (props: TableProps & TestIdProps): JSX.Element => {
  const mergedProps = useMergedProps(defaultTableProps, props);
  const testId = useTestId("table", props);

  const className = useClassName(mergedProps);

  const styleProps = useStyleProps(mergedProps);

  return (
    <TableLayout data-testid={testId} className={className} {...styleProps}>
      {mergedProps.children}
    </TableLayout>
  );
};
Table.defaultProps = defaultTableProps;

export { Table };

const TableLayout = styled.table<TableStyleProps>`
  ${tableLayoutStyles}
`;
