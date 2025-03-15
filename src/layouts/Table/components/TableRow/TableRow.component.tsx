import { forwardRef, type ForwardedRef } from "react";
import styled from "styled-components";

import { tableRowStyles } from "./TableRow.styles";

import {
  useClassName,
  useHtmlAttribute,
  useStyleProps,
  useTestId,
} from "@utils";

import type { TableRowProps, TableRowStyleProps } from "./TableRow.types";
import type { TestIdProps } from "@types";

/**
 * A table row component, to be used in `TableBody`.
 *
 * @version 0.0.4
 */
export const TableRow = forwardRef<
  HTMLTableRowElement,
  TableRowProps & TestIdProps
>(
  (
    {
      className,
      children,
      onClick,
      testId,
      style = "form",
      styleOverride,
      ...props
    },
    ref
  ) => {
    const cn = useClassName({ className });
    const tid = useTestId("table-row", { testId });
    const styleProps = useStyleProps({ style, clickable: !!onClick });
    const styleProperties = useHtmlAttribute(styleOverride);
    return (
      <StyledTableRow
        ref={ref}
        data-testid={tid}
        className={cn}
        style={styleProperties}
        onClick={onClick}
        {...props}
        {...styleProps}
      >
        {children}
      </StyledTableRow>
    );
  }
);

const StyledTableRow = styled.tr<
  TableRowStyleProps & {
    ref: ForwardedRef<HTMLTableRowElement>;
  }
>`
  ${tableRowStyles}
`;
