import type { TableProps } from "../../Table.types";

/**
 * The footer of the `Table` layout.
 * To be used with `TableRow`, `TableCell`
 *
 * @param {TableProps} props - The component props.
 * @returns The table footer component.
 */
const TableFooter = (props: TableProps) => {
  return <tfoot data-testid="table-footer">{props.children}</tfoot>;
};

export { TableFooter };
