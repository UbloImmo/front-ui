import { useMemo } from "react";
import styled from "styled-components";

import { tableHeaderStyles } from "./TableHeader.styles";
import {
  TableHeaderStyleProps,
  type TableHeaderProps,
} from "./TableHeader.types";

import { useClassName, useStyleProps, useTestId } from "@utils";

import type { TestIdProps } from "@types";

/**
 * The header part, a row on top in the `Table` layout to label the columns.
 * To be used with `TableHeaderCell`
 *
 * @version 0.0.3
 *
 * @example
 * <TableHeader>
 *   <TableHeaderCell>Header 1</TableHeaderCell>
 *   <TableHeaderCell>Header 2</TableHeaderCell>
 * </TableHeader>
 *
 * @param {TableHeaderProps} props - The component props.
 * @returns The table header component.
 */
export const TableHeader = ({
  sticky = false,
  top = 0,
  ...props
}: TableHeaderProps & TestIdProps): JSX.Element => {
  const testId = useTestId("table-header", props);
  const rowTestId = useMemo(() => `${testId}-row`, [testId]);
  const className = useClassName(props);
  const styleProps = useStyleProps({ sticky, top });

  return (
    <StyledTableHeader
      {...styleProps}
      data-testid={testId}
      className={className}
    >
      <tr data-testid={rowTestId}>{props.children}</tr>
    </StyledTableHeader>
  );
};

const StyledTableHeader = styled.thead<TableHeaderStyleProps>`
  ${tableHeaderStyles}
`;
