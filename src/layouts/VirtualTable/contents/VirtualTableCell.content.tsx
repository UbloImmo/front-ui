import styles from "../VirtualTable.module.scss";

import { FlexLayout } from "@/layouts/Flex";
import { TableCell } from "@/layouts/Table";
import {
  cssLengthUsage,
  isNonNullish,
  useCssClasses,
  useCssVariables,
  useLogger,
} from "@utils";

import type { VirtualTableCellContentProps } from "../VirtualTable.types";
import type { ReactNode } from "react";

/**
 * A component that renders a cell's content within a virtualized table.
 * Wraps the provided component in a `Table`
 *
 * @template {object} TItem - The type of item being rendered in the table
 * @param {VirtualTableCellContentProps<TItem>} props - The component props
 * @returns {ReactNode} The rendered cell content
 */
export const VirtualTableCellContent = <TItem extends object>({
  index,
  item,
  fixedWidth,
  paddedCell,
  colSpan,
  CellContent,
}: VirtualTableCellContentProps<TItem>): ReactNode => {
  const { error } = useLogger("VirtualTableCellContent");

  const className = useCssClasses(styles["virtual-table-cell"], [
    styles["fixed-width"],
    isNonNullish(fixedWidth),
  ]);
  const style = useCssVariables({
    "fixed-width": isNonNullish(fixedWidth)
      ? cssLengthUsage(fixedWidth)
      : undefined,
  });

  if (!CellContent) {
    error("No CellContent provided to VirtualTableCellContent");
    return null;
  }

  return (
    <TableCell
      className={className}
      styleOverride={style}
      colSpan={colSpan}
      padded={paddedCell}
      testId="virtual"
    >
      <FlexLayout overflow="hidden" fill="row" align="center" justify="start">
        <CellContent index={index} item={item} />
      </FlexLayout>
    </TableCell>
  );
};
