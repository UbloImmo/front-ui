import styled from "styled-components";

import { tableLayoutStyles } from "./Table.styles";

import { useTestId, useMergedProps, useClassName } from "@utils";

import type { TableProps, TableDefaultProps } from "./Table.types";
import type { TestIdProps } from "@types";

const defaultTableProps: TableDefaultProps = {
  children: null,
  className: null,
};

/**
 * A structured layout element used to display data in rows and columns.
 *
 * @version 0.0.1
 *
 * @param {TableProps & TestIdProps} props - Table component props
 * @returns {JSX.Element}
 */
const Table = (props: TableProps & TestIdProps): JSX.Element => {
  const mergedProps = useMergedProps(defaultTableProps, props);
  const testId = useTestId("table", props);

  const className = useClassName(mergedProps);

  return (
    <TableLayout data-testid={testId} className={className}>
      {mergedProps.children}
    </TableLayout>
  );
};
Table.defaultProps = defaultTableProps;

export { Table };

const TableLayout = styled.table`
  ${tableLayoutStyles}
`;
