import { isFunction } from "@ubloimmo/front-util";
import { FC } from "react";

import { EmptyStateCard } from "@/components/EmptyStateCard";

import type { VirtualTableSharedContext } from "../VirtualTable.types";
import type { ContextProp, TableComponents } from "react-virtuoso";

/**
 * A custom empty state component for use with react-virtuoso's TableComponents.
 * Renders either a custom component or an EmptyStateCard when the table has no data.
 *
 * @see {@link TableComponents["EmptyPlaceholder"]}
 */
export const VirtualTableEmpty: TableComponents<
  object,
  VirtualTableSharedContext<object>
>["EmptyPlaceholder"] = ({
  context,
}: ContextProp<VirtualTableSharedContext<object>>) => {
  if (!context.EmptyState || context.loading) return null;

  return (
    <tbody>
      <tr>
        <td colSpan={context.columnsCount}>
          {isFunction<FC>(context.EmptyState) ? (
            <context.EmptyState />
          ) : (
            <EmptyStateCard {...context.EmptyState} />
          )}
        </td>
      </tr>
    </tbody>
  );
};
