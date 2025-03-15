import { forwardRef } from "react";

import { useTestId, useClassName, useHtmlAttribute } from "@utils";

import type { TableProps } from "../../Table.types";
import type { TestIdProps } from "@types";

/**
 * The footer of the `Table` layout.
 * To be used with `TableRow`, `TableCell`
 *
 * @version 0.0.3
 *
 * @param {TableProps} props - The component props.
 * @returns The table footer component.
 */
const TableFooter = forwardRef<
  HTMLTableSectionElement,
  TableProps & TestIdProps
>((props: TableProps & TestIdProps, ref): JSX.Element => {
  const testId = useTestId("table-footer", props);
  const className = useClassName(props);
  const style = useHtmlAttribute(props.styleOverride);

  return (
    <tfoot data-testid={testId} className={className} style={style} ref={ref}>
      {props.children}
    </tfoot>
  );
});

export { TableFooter };
