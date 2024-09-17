import { forwardRef, type ForwardedRef } from "react";
import styled from "styled-components";

import { tableRowStyles } from "./TableRow.styles";

import { useClassName } from "@utils";

import type { TableRowProps } from "./TableRow.types";

/**
 * A table row component, to be used in `TableBody`.
 */
const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className, children, onClick, ...props }, ref) => {
    const cn = useClassName({ className });
    return (
      <StyledTableRow
        ref={ref}
        data-testid="table-row"
        className={cn}
        onClick={onClick}
        {...props}
      >
        {children}
      </StyledTableRow>
    );
  }
);

export { TableRow };

const StyledTableRow = styled.tr<{ ref: ForwardedRef<HTMLTableRowElement> }>`
  ${tableRowStyles}
`;
