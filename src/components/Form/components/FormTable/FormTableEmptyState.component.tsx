import { useCallback } from "react";

import { Text } from "@/components/Text";
import { TableCell, TableRow } from "@/layouts/Table";
import { useStatic, useUikitTranslation } from "@utils";

import type { BuiltFormTableProps } from "../../Form.types";

/**
 * Renders an empty state for a FormTable component.
 *
 * When an EmptyCard prop is provided, it will be rendered.
 * Otherwise, a default empty state will be rendered, which is a italic bold text
 * with a warning color, and a size of "s".
 *
 * The default empty state's content is a translation of the "status.empty" key
 * with "table" as the first argument and "[REPLACE ME]" as the second one.
 *
 * The empty state is wrapped in a single table row, which spans the whole table
 * width.
 *
 * @param {Object} props The component props.
 * @param {JSX.Element | null} [props.EmptyCard] The EmptyCard component to render.
 * @param {number} props.columnsCount The number of columns in the table.
 */
export const FormTableEmptyState = ({
  EmptyCard,
  columnsCount,
}: Pick<BuiltFormTableProps, "EmptyCard" | "columnsCount">) => {
  const tl = useUikitTranslation();

  const emptyLabel = useStatic(tl.status.empty("table", "[REPLACE ME]"));

  const EmptyState = useCallback(() => {
    if (EmptyCard) return <EmptyCard />;

    return (
      <Text italic size="s" color="gray-400" weight="medium" align="center">
        {emptyLabel}
      </Text>
    );
  }, [EmptyCard, emptyLabel]);

  return (
    <TableRow>
      <TableCell colSpan={columnsCount} padded>
        <EmptyState />
      </TableCell>
    </TableRow>
  );
};
