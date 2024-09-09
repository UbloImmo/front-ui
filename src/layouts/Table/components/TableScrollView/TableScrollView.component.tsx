import styled from "styled-components";

import { tableScrollViewStyles } from "./TableScrollView.styles";

import type { TableProps } from "../../Table.types";

/**
 * A wrapper component designed to enable horizontal scrolling in a `Table`.
 *
 * @example
 * <TableScrollView>
 *   <Table>
 *     {...}
 *   </Table>
 * </TableScrollView>
 *
 * @param {TableProps} props - The component props.
 * @returns The table scroll view component.
 */
const TableScrollView = (props: TableProps) => {
  return <StyledTableScrollView>{props.children}</StyledTableScrollView>;
};

export { TableScrollView };

const StyledTableScrollView = styled.div`
  ${tableScrollViewStyles}
`;
