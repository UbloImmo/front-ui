import { forwardRef, type CSSProperties, type ReactNode } from "react";

import { TableFooter } from "@/layouts/Table";

import type { TableComponents } from "react-virtuoso";

/**
 * A custom table footer component for use with react-virtuoso's TableComponents.
 * Wraps the base TableFooter component to provide virtual scrolling capabilities.
 *
 * @see {@link TableComponents["TableFoot"]}
 */
export const VirtualTableFooter: TableComponents["TableFoot"] = forwardRef<
  HTMLTableSectionElement,
  { children?: ReactNode; style?: CSSProperties }
>(({ children, style }, ref) => (
  <TableFooter styleOverride={style} ref={ref}>
    {children}
  </TableFooter>
));
