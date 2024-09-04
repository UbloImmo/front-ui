import type { TableProps } from "../../Table.types";

/**
 * The body of the `Table` layout.
 * To be used with `TableRow`, `TableCell`
 *
 * @param {TableProps} props - The component props.
 * @returns The table body component.
 */
const TableBody = (props: TableProps) => {
  return <tbody>{props.children}</tbody>;
};

export { TableBody };
