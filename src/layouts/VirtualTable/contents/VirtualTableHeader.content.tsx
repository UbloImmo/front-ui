import { VirtualTableHeaderCellContent } from "./VirtualTableHeaderCell.content";

import type { VirtualTableColumnProps } from "../VirtualTable.types";
import type { Optional } from "@ubloimmo/front-util";
import type { FixedHeaderContent } from "react-virtuoso";

/**
 * Creates a header content renderer function for the virtual table.
 *
 * @template TItem - The type of items in the data array
 * @param {VirtualTableColumnProps<TItem>[]} columns - Array of column configurations
 * @returns {Optional<FixedHeaderContent>} A function that renders the header content, or undefined if no columns
 *
 * @remarks
 * The returned function renders a header cell for each column using VirtualTableHeaderCellContent.
 * Returns undefined if no columns are provided.
 *
 * @example
 * ```tsx
 * const headerContent = VirtualTableHeaderContent(columns);
 * if (headerContent) {
 *   const header = headerContent(); // Renders table header
 * }
 * ```
 */
export const VirtualTableHeaderContent = <TItem extends object>(
  columns: VirtualTableColumnProps<TItem>[]
): Optional<FixedHeaderContent> => {
  if (!columns.length) return undefined;

  return () => (
    <>
      {columns.map(({ HeaderContent, colSpan }, columnIndex) => {
        const key = `header-${columnIndex}`;

        return (
          <VirtualTableHeaderCellContent
            key={key}
            HeaderContent={HeaderContent}
            colSpan={colSpan}
          />
        );
      })}
    </>
  );
};
