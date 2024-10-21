import { useTestId, useClassName } from "@utils";

import type { TableProps } from "../../Table.types";
import type { TestIdProps } from "@types";

/**
 * The footer of the `Table` layout.
 * To be used with `TableRow`, `TableCell`
 *
 * @version 0.0.2
 *
 * @param {TableProps} props - The component props.
 * @returns The table footer component.
 */
const TableFooter = (props: TableProps & TestIdProps): JSX.Element => {
  const testId = useTestId("table-footer", props);
  const className = useClassName(props);

  return (
    <tfoot data-testid={testId} className={className}>
      {props.children}
    </tfoot>
  );
};

export { TableFooter };
