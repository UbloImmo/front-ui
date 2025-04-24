import { isObject, Optional } from "@ubloimmo/front-util";
import { forwardRef, useMemo, type ForwardedRef } from "react";
import styled, { CSSProperties } from "styled-components";

import { tableRowStyles } from "./TableRow.styles";

import { useClassName, useStyleProps, useTestId } from "@utils";

import type { TableRowProps, TableRowStyleProps } from "./TableRow.types";
import type { TestIdProps } from "@types";

/**
 * A table row component, to be used in `TableBody`.
 *
 * @version 0.0.6
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
      overrideTestId,
      style = "form",
      styleOverride,
      ...props
    },
    ref
  ) => {
    const cn = useClassName({ className });
    const tid = useTestId("table-row", { testId, overrideTestId });
    const styleProps = useStyleProps({ style, clickable: !!onClick });
    const styleProperties = useMemo<Optional<CSSProperties>>(() => {
      if (styleOverride) return styleOverride ?? undefined;
      if (style && style !== "form" && style !== "list" && isObject(style))
        return style as CSSProperties;
      return undefined;
    }, [styleOverride, style]);
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
