import { forwardRef } from "react";
import styled from "styled-components";

import { tableBodyStyles } from "./TableBody.styles";

import { useClassName, useHtmlAttribute, useTestId } from "@utils";

import type { TableBodyProps, TableBodyStyleProps } from "./TableBody.types";
import type { TestIdProps } from "@types";

/**
 * The body of the `Table` layout.
 * To be used with `TableRow`, `TableCell`
 *
 * @version 0.0.4
 *
 * @param {TableProps} props - The component props.
 * @returns The table body component.
 */
export const TableBody = forwardRef<
  HTMLTableSectionElement,
  TableBodyProps & TestIdProps
>(({ style = "form", ...props }: TableBodyProps & TestIdProps, ref) => {
  const testId = useTestId("table-body", props);
  const className = useClassName(props);
  const styleProperties = useHtmlAttribute(props.styleOverride);

  return (
    <StyledTableBody
      $style={style}
      style={styleProperties}
      data-testid={testId}
      className={className}
      ref={ref}
    >
      {props.children}
    </StyledTableBody>
  );
});

const StyledTableBody = styled.tbody<TableBodyStyleProps>`
  ${tableBodyStyles}
`;
