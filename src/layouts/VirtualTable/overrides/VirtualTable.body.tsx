import { forwardRef, type CSSProperties, type ReactNode } from "react";

import { TableBody } from "@/layouts/Table";

import type { VirtualTableComponentOverrides } from "../VirtualTable.types";

/**
 * A custom table body component for use with react-virtuoso's TableComponents.
 * Wraps the base TableBody component to provide virtual scrolling capabilities.
 *
 * @see {@link TableComponents["TableBody"]}
 */
export const VirtualTableBody: VirtualTableComponentOverrides<object>["TableBody"] =
  forwardRef<
    HTMLTableSectionElement,
    { children?: ReactNode; style?: CSSProperties }
  >(({ children, style }, ref) => (
    <TableBody styleOverride={style} style="list" ref={ref} testId="virtual">
      {children}
    </TableBody>
  ));
