import { forwardRef, type CSSProperties, type ReactNode } from "react";

import { TableBody } from "@/layouts/Table";

import type {
  VirtualTableComponentOverrides,
  VirtualTableSharedContext,
} from "../VirtualTable.types";
import type { ContextProp } from "react-virtuoso";

/**
 * A custom table body component for use with react-virtuoso's TableComponents.
 * Wraps the base TableBody component to provide virtual scrolling capabilities.
 *
 * @see {@link TableComponents["TableBody"]}
 */
export const VirtualTableBody: VirtualTableComponentOverrides<object>["TableBody"] =
  forwardRef<
    HTMLTableSectionElement,
    { children?: ReactNode; style?: CSSProperties } & ContextProp<
      VirtualTableSharedContext<object>
    >
  >(({ children, style, context }, ref) => (
    <TableBody
      styleOverride={style}
      style={context.style}
      ref={ref}
      testId="virtual"
    >
      {children}
    </TableBody>
  ));
