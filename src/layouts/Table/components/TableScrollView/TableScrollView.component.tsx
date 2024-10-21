import styled from "styled-components";

import { tableScrollViewStyles } from "./TableScrollView.styles";

import { useTestId, useClassName } from "@utils";

import type { TableProps } from "../../Table.types";
import type { TestIdProps } from "@types";

/**
 * A wrapper component designed to enable horizontal scrolling in a `Table`.
 *
 * @version 0.0.2
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
const TableScrollView = (props: TableProps & TestIdProps) => {
  const testId = useTestId("table-scroll-view", props);
  const className = useClassName(props);

  return (
    <StyledTableScrollView data-testid={testId} className={className}>
      {props.children}
    </StyledTableScrollView>
  );
};

export { TableScrollView };

const StyledTableScrollView = styled.div`
  ${tableScrollViewStyles}
`;
