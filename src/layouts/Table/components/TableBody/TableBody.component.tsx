import styled from "styled-components";

import { tableBodyStyles } from "./TableBody.styles";

import { useClassName, useTestId } from "@utils";

import type { TableBodyProps, TableBodyStyleProps } from "./TableBody.types";
import type { TestIdProps } from "@types";

/**
 * The body of the `Table` layout.
 * To be used with `TableRow`, `TableCell`
 *
 * @version 0.0.3
 *
 * @param {TableProps} props - The component props.
 * @returns The table body component.
 */
export const TableBody = ({
  style = "form",
  ...props
}: TableBodyProps & TestIdProps) => {
  const testId = useTestId("table-body", props);
  const className = useClassName(props);

  return (
    <StyledTableBody $style={style} data-testid={testId} className={className}>
      {props.children}
    </StyledTableBody>
  );
};

const StyledTableBody = styled.tbody<TableBodyStyleProps>`
  ${tableBodyStyles}
`;
