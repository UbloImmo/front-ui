import { useClassName, useTestId } from "@utils";

import type { TableProps } from "../../Table.types";
import type { TestIdProps } from "@types";

/**
 * The body of the `Table` layout.
 * To be used with `TableRow`, `TableCell`
 *
 * @version 0.0.2
 *
 * @param {TableProps} props - The component props.
 * @returns The table body component.
 */
const TableBody = (props: TableProps & TestIdProps) => {
  const testId = useTestId("table-body", props);
  const className = useClassName(props);

  return (
    <tbody data-testid={testId} className={className}>
      {props.children}
    </tbody>
  );
};

export { TableBody };
