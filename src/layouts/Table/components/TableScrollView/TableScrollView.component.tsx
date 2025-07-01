import { forwardRef } from "react";
import styled from "styled-components";

import { tableScrollViewStyles } from "./TableScrollView.styles";

import {
  useTestId,
  useClassName,
  useHtmlAttribute,
  useMergedProps,
} from "@utils";

import type {
  TableScrollViewDefaultProps,
  TableScrollViewProps,
  TableScrollViewStyleProps,
} from "./TableScrollView.types";
import type { TestIdProps } from "@types";

const tableScrollViewDefaultProps: TableScrollViewDefaultProps = {
  overflowDirection: "x",
  styleOverride: null,
  children: null,
  className: null,
  maxHeight: null,
  style: "list",
};

/**
 * A wrapper component designed to enable horizontal scrolling in a `Table`.
 *
 * @version 0.0.4
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
const TableScrollView = forwardRef<
  HTMLDivElement,
  TableScrollViewProps & TestIdProps
>((props: TableScrollViewProps & TestIdProps, ref) => {
  const { children, styleOverride, overflowDirection, maxHeight, style } =
    useMergedProps(tableScrollViewDefaultProps, props);
  const testId = useTestId("table-scroll-view", props);
  const className = useClassName(props);
  const styles = useHtmlAttribute(styleOverride);

  return (
    <StyledTableScrollView
      data-testid={testId}
      className={className}
      $style={style}
      style={styles}
      ref={ref}
      $overflowDirection={overflowDirection}
      $maxHeight={maxHeight}
    >
      {children}
    </StyledTableScrollView>
  );
});

export { TableScrollView };

const StyledTableScrollView = styled.div<TableScrollViewStyleProps>`
  ${tableScrollViewStyles}
`;
