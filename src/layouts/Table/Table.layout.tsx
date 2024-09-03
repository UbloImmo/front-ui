import styled from "styled-components";

import { useLogger, useTestId, useMergedProps } from "@utils";

import type { TableProps, TableDefaultProps } from "./Table.types";
import type { TestIdProps } from "@types";

const defaultTableProps: TableDefaultProps = {
  // TODO
};

/**
 * Table component
 *
 * TODO description
 *
 * @version 0.0.1
 *
 * @param {TableProps & TestIdProps} props - Table component props
 * @returns {JSX.Element}
 */
const Table = (props: TableProps & TestIdProps): JSX.Element => {
  const { log } = useLogger("Table");
  const mergedProps = useMergedProps(defaultTableProps, props);
  const testId = useTestId("table", props);

  log(mergedProps);

  return (
    <TableLayout data-testid={testId}>
      <TableHeader>
        <tr>
          <TableHeaderCell>[label]</TableHeaderCell>
          <TableHeaderCell>[label]</TableHeaderCell>
          <TableHeaderCell>[label]</TableHeaderCell>
        </tr>
        <tr></tr>
      </TableHeader>
      <TableBody>
        <tr>
          <td>[element element]</td>
          <td>[element]</td>
          <td>[element]</td>
        </tr>
        <tr>
          <td>[element]</td>
          <td>[element]</td>
          <td>[element]</td>
        </tr>
      </TableBody>
      <tfoot>
        <tr>
          <td colSpan={3}>[creatable element]</td>
        </tr>
      </tfoot>
    </TableLayout>
  );
};
Table.defaultProps = defaultTableProps;

export { Table };

const TableLayout = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
`;

const TableHeader = styled.thead`
  & > tr:last-child {
    height: var(--s-4);
  }
`;

const TableHeaderCell = styled.th`
  background-color: var(--primary-light);
  text-align: left;
  padding: var(--s-2) var(--s-4);
  border: 1px solid var(--primary-medium);

  &:not(:first-child) {
    border-left: 0;
  }
  overflow: hidden;

  &:first-child {
    border-radius: var(--s-2) 0 0 var(--s-2);
  }

  &:last-child {
    border-radius: 0 var(--s-2) var(--s-2) 0;
  }
`;

const TableBody = styled.tbody`
  td {
    border: 1px solid var(--gray-200);
    padding: var(--s-2) var(--s-4);
  }
`;
