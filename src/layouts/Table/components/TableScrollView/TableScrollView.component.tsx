import { forwardRef } from "react";

import { useTableScrollViewStyles } from "./TableScrollView.styles";

import { useTestId, useMergedProps } from "@utils";

import type {
  TableScrollViewDefaultProps,
  TableScrollViewProps,
} from "./TableScrollView.types";
import type { TestIdProps } from "@types";

const tableScrollViewDefaultProps: TableScrollViewDefaultProps = {
  overflowDirection: "x",
  styleOverride: null,
  children: null,
  className: null,
  maxHeight: null,
  style: "list",
};

/**
 * A wrapper component designed to enable horizontal scrolling in a `Table`.
 *
 * @version 0.1.0
 *
 * @example
 * <TableScrollView>
 *   <Table>
 *     {...}
 *   </Table>
 * </TableScrollView>
 *
 * @param {TableProps} props - The component props.
 * @returns The table scroll view component.
 */
const TableScrollView = forwardRef<
  HTMLDivElement,
  TableScrollViewProps & TestIdProps
>((props: TableScrollViewProps & TestIdProps, ref) => {
  const mergedProps = useMergedProps(tableScrollViewDefaultProps, props);
  const testId = useTestId("table-scroll-view", props);

  const { className, style } = useTableScrollViewStyles(mergedProps);

  return (
    <div data-testid={testId} className={className} style={style} ref={ref}>
      {mergedProps.children}
    </div>
  );
});

export { TableScrollView };
