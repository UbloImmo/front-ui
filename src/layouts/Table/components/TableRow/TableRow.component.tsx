import { forwardRef, type ForwardedRef } from "react";
import styled from "styled-components";

import { tableRowStyles } from "./TableRow.styles";

import { useClassName, useStyleProps, useTestId } from "@utils";

import type { TableRowProps, TableRowStyleProps } from "./TableRow.types";
import type { TestIdProps } from "@types";

/**
 * A table row component, to be used in `TableBody`.
 *
 * @version 0.0.3
 */
const TableRow = forwardRef<HTMLTableRowElement, TableRowProps & TestIdProps>(
  ({ className, children, onClick, testId, style = "form", ...props }, ref) => {
    const cn = useClassName({ className });
    const tid = useTestId("table-row", { testId });
    const styleProps = useStyleProps({ style, clickable: !!onClick });
    return (
      <StyledTableRow
        ref={ref}
        data-testid={tid}
        className={cn}
        onClick={onClick}
        {...props}
        {...styleProps}
      >
        {children}
      </StyledTableRow>
    );
  }
);

export { TableRow };

const StyledTableRow = styled.tr<
  TableRowStyleProps & {
    ref: ForwardedRef<HTMLTableRowElement>;
  }
>`
  ${tableRowStyles}
`;
