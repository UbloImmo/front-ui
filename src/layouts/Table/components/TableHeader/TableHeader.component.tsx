import { useMemo } from "react";

import { useClassName, useTestId } from "@utils";

import type { TableProps } from "../../Table.types";
import type { TestIdProps } from "@types";

/**
 * The header part, a row on top in the `Table` layout to label the columns.
 * To be used with `TableHeaderCell`
 *
 * @version 0.0.2
 *
 * @example
 * <TableHeader>
 *   <TableHeaderCell>Header 1</TableHeaderCell>
 *   <TableHeaderCell>Header 2</TableHeaderCell>
 * </TableHeader>
 *
 * @param {TableProps} props - The component props.
 * @returns The table header component.
 */
const TableHeader = (props: TableProps & TestIdProps): JSX.Element => {
  const testId = useTestId("table-header", props);
  const rowTestId = useMemo(() => `${testId}-row`, [testId]);
  const className = useClassName(props);
  return (
    <thead data-testid={testId} className={className}>
      <tr data-testid={rowTestId}>{props.children}</tr>
    </thead>
  );
};

export { TableHeader };
