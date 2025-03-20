import { VirtualTableCellContent } from "./VirtualTableCell.content";

import type { VirtualTableSharedContext } from "../VirtualTable.types";
import type { ReactNode } from "react";

/**
 * Creates a row content renderer function for the virtual table.
 *
 * @template TItem - The type of items in the data array
 * @param {VirtualTableColumnProps<TItem>[]} columns - Array of column configurations
 * @returns {Optional<ItemContent<TItem, VirtualTableSharedContext<TItem>>>} A function that renders the row content, or undefined if no columns
 *
 * @remarks
 * The returned function renders a cell for each column, passing the item data and index.
 * Returns undefined if no columns are provided.
 *
 * @example
 * ```tsx
 * const rowContent = VirtualTableRowContent(columns);
 * if (rowContent) {
 *   const row = rowContent(0, item); // Renders first row
 * }
 * ```
 */
export const VirtualTableRowContent = <TItem extends object>(
  index: number,
  item: TItem,
  context: VirtualTableSharedContext<TItem>
): ReactNode => {
  return (
    <>
      {context.columns.map((column, columnIndex) => {
        const key = `${columnIndex}-${index}`;
        const padded = context.paddedCells || column.paddedCell;

        return (
          <VirtualTableCellContent
            {...column}
            paddedCell={padded}
            item={item}
            index={index}
            key={key}
          />
        );
      })}
    </>
  );
};
