import { forwardRef } from "react";
import styled from "styled-components";

import { tableScrollViewStyles } from "./TableScrollView.styles";

import { useTestId, useClassName, useHtmlAttribute } from "@utils";

import type { TableProps } from "../../Table.types";
import type { TestIdProps } from "@types";

/**
 * A wrapper component designed to enable horizontal scrolling in a `Table`.
 *
 * @version 0.0.3
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
const TableScrollView = forwardRef<HTMLDivElement, TableProps & TestIdProps>(
  (props: TableProps & TestIdProps, ref) => {
    const testId = useTestId("table-scroll-view", props);
    const className = useClassName(props);
    const style = useHtmlAttribute(props.styleOverride);

    return (
      <StyledTableScrollView
        data-testid={testId}
        className={className}
        style={style}
        ref={ref}
      >
        {props.children}
      </StyledTableScrollView>
    );
  }
);

export { TableScrollView };

const StyledTableScrollView = styled.div`
  ${tableScrollViewStyles}
`;
