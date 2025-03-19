import { SmallLoader } from "@/components/SmallLoader";
import { TableCell } from "@/layouts/Table";

import type { CSSProperties } from "react";
import type { FixedFooterContent } from "react-virtuoso";

/**
 * Creates a footer content component for a virtual table that displays a loading indicator.
 *
 * @template {object} TItem - The type of items in the data array
 * @param {VirtualTableSharedContext<TItem>} context - The shared context containing loading state and column count
 * @returns {FixedFooterContent} A footer content component that shows/hides a loading indicator
 */
export const VirtualTableFooterContent =
  (columnsCount: number, loading?: boolean): FixedFooterContent =>
  () => {
    const styleOverride: CSSProperties = {
      display: loading ? "table-cell" : "none",
    };

    return (
      <tr>
        <TableCell colSpan={columnsCount} styleOverride={styleOverride}>
          <SmallLoader />
        </TableCell>
      </tr>
    );
  };
