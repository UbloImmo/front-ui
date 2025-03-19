import { isFunction, isObject, isString } from "@ubloimmo/front-util";

import { FlexLayout } from "@/layouts/Flex";
import { TableHeaderCell, type TableCellProps } from "@/layouts/Table";
import { useLogger } from "@utils";

import { Text, Tooltip } from "@components";

import type { VirtualTableHeaderCellContentProps } from "../VirtualTable.types";
import type { FC, ReactNode } from "react";

/**
 * A component that renders a header cell's content within a virtualized table.
 * Handles different types of header content rendering based on the type provided.
 *
 * @template {object} TItem - The type of items in the table
 * @param {VirtualTableHeaderCellContentProps<TItem>} props - The component props
 * @param {VirtualTableColumnHeaderContent} props.HeaderContent - The content to render in the header
 * @param {number} [props.colSpan] - Optional column span for the header cell
 * @returns {ReactNode} The rendered header cell content or null if invalid content
 *
 * @remarks
 * Renders header content in three different ways:
 * - String: Renders as a Text component with ellipsis
 * - Function Component: Renders the component directly
 * - Object: Renders a label with optional tooltip in a flex layout
 */
export const VirtualTableHeaderCellContent = <TItem extends object>({
  HeaderContent,
  colSpan,
}: VirtualTableHeaderCellContentProps<TItem>): ReactNode => {
  const { warn } = useLogger(`VirtualTable:HeaderCellContent`);

  if (isString(HeaderContent))
    return (
      <TableHeaderCell colSpan={colSpan} testId="virtual">
        <Text color="primary-dark" weight="bold" ellipsis>
          {HeaderContent}
        </Text>
      </TableHeaderCell>
    );
  if (isFunction<FC>(HeaderContent)) {
    return (
      <TableHeaderCell colSpan={colSpan} testId="virtual">
        <HeaderContent />
      </TableHeaderCell>
    );
  }
  if (
    isObject(HeaderContent) &&
    "ReplacementCell" in HeaderContent &&
    isFunction<FC<TableCellProps>>(HeaderContent.ReplacementCell)
  ) {
    return <HeaderContent.ReplacementCell colSpan={colSpan} />;
  }

  if (
    isObject(HeaderContent) &&
    "label" in HeaderContent &&
    isString(HeaderContent.label)
  ) {
    return (
      <TableHeaderCell colSpan={colSpan} testId="virtual">
        <FlexLayout fill="row" align="center" justify="space-between" gap="s-1">
          <Text color="primary-dark" weight="bold" ellipsis>
            {HeaderContent.label}
          </Text>
          {HeaderContent.tooltip && <Tooltip {...HeaderContent.tooltip} />}
        </FlexLayout>
      </TableHeaderCell>
    );
  }
  warn("Invalid HeaderContent provided");
  return null;
};
