import { forwardRef, type ForwardedRef } from "react";
import styled from "styled-components";

import { tableRowStyles } from "./TableRow.styles";

import { useClassName, useTestId } from "@utils";

import type { TableRowProps } from "./TableRow.types";
import type { TestIdProps } from "@types";

/**
 * A table row component, to be used in `TableBody`.
 *
 * @version 0.0.2
 */
const TableRow = forwardRef<HTMLTableRowElement, TableRowProps & TestIdProps>(
  ({ className, children, onClick, testId, ...props }, ref) => {
    const cn = useClassName({ className });
    const tid = useTestId("table-row", { testId });
    return (
      <StyledTableRow
        ref={ref}
        data-testid={tid}
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
