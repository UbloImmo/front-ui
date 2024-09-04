import type { TableProps } from "../../Table.types";

/**
 * The header part, a row on top in the `Table` layout to label the columns.
 * To be used with `TableHeaderCell`
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
const TableHeader = (props: TableProps) => {
  return (
    <thead>
      <tr>{props.children}</tr>
    </thead>
  );
};

export { TableHeader };
