import { forwardRef, type CSSProperties, type ReactNode } from "react";

import { TableHeader } from "@/layouts/Table";

import type { VirtualTableComponentOverrides } from "../VirtualTable.types";

/**
 * A custom table header component for use with react-virtuoso's TableComponents.
 * Wraps the base TableHeader component to provide virtual scrolling capabilities.
 *
 * @see {@link TableComponents["TableHead"]}
 */
export const VirtualTableHeader: VirtualTableComponentOverrides<object>["TableHead"] =
  forwardRef<
    HTMLTableSectionElement,
    { children?: ReactNode; style?: CSSProperties }
  >(({ children, style }, ref) => (
    <TableHeader styleOverride={style} ref={ref} testId="virtual">
      {children}
    </TableHeader>
  ));
