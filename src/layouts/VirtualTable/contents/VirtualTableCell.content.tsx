import styled from "styled-components";

import { virtualTableCellStyles } from "../VirtualTable.styles";

import { FlexLayout } from "@/layouts/Flex";
import { TableCell } from "@/layouts/Table";
import { useLogger } from "@utils";

import type {
  VirtualTableCellContentProps,
  VirtualTableCellStyleProps,
} from "../VirtualTable.types";

/**
 * A component that renders a cell's content within a virtualized table.
 * Wraps the provided component in a `Table`
 *
 * @template {object} TItem - The type of item being rendered in the table
 * @param {VirtualTableCellContentProps<TItem>} props - The component props
 * @returns {JSX.Element} The rendered cell content
 */
export const VirtualTableCellContent = <TItem extends object>({
  index,
  item,
  fixedWidth,
  paddedCell,
  colSpan,
  CellContent,
}: VirtualTableCellContentProps<TItem>) => {
  const { error } = useLogger("VirtualTableCellContent");
  if (!CellContent) {
    error("No CellContent provided to VirtualTableCellContent");
    return null;
  }
  return (
    <StyledTableCell
      $fixedWidth={fixedWidth}
      colSpan={colSpan}
      padded={paddedCell}
      testId="virtual"
    >
      <StyledFlexLayout
        fill="row"
        align="center"
        justify="start"
        $fixedWidth={fixedWidth}
      >
        <CellContent index={index} item={item} />
      </StyledFlexLayout>
    </StyledTableCell>
  );
};

const StyledTableCell = styled(TableCell)<VirtualTableCellStyleProps>`
  ${virtualTableCellStyles}
`;

const StyledFlexLayout = styled(FlexLayout)<VirtualTableCellStyleProps>`
  ${virtualTableCellStyles}
`;
