import { isFunction, Optional, VoidFn } from "@ubloimmo/front-util";
import { forwardRef, useMemo } from "react";
import styled from "styled-components";

import { virtualTableRowStyles } from "../VirtualTable.styles";

import { TableRow } from "@/layouts/Table";

import type {
  VirtualTableComponentOverrides,
  VirtualTableOnItemClickFn,
  VirtualTableRowOverrideProps,
  VirutalTableRowStyleProps,
} from "../VirtualTable.types";

/**
 * A custom table row component for use with react-virtuoso's TableComponents.
 * Wraps the base TableRow component to provide virtual scrolling capabilities.
 *
 * Uses the `context` prop to access the table's shared context and link event handlers.
 *
 * @see {@link VirtualTableRowOverride}
 */
export const VirtualTableRow: VirtualTableComponentOverrides<object>["TableRow"] =
  forwardRef<HTMLTableRowElement, VirtualTableRowOverrideProps<object>>(
    ({ children, style, item, context, ...props }, ref) => {
      const index = useMemo(() => props["data-index"], [props]);
      const isEven = useMemo(() => index % 2 === 0, [index]);

      const className = useMemo(() => (isEven ? "even" : null), [isEven]);

      const onClick = useMemo<Optional<VoidFn>>(() => {
        if (!isFunction<VirtualTableOnItemClickFn<object>>(context.onItemClick))
          return undefined;
        return () => {
          if (!context.onItemClick) return;
          context.onItemClick(item, index);
        };
      }, [context, item, index]);

      const clickable = useMemo(() => !!onClick, [onClick]);

      return (
        <StyledTableRow
          testId="virtual"
          style={context.style}
          className={className}
          onClick={onClick}
          ref={ref}
          styleOverride={style}
          $clickable={clickable}
          $fixedItemHeight={context.fixedItemHeight}
          {...props}
        >
          {children}
        </StyledTableRow>
      );
    }
  );

const StyledTableRow = styled(TableRow)<VirutalTableRowStyleProps>`
  ${virtualTableRowStyles}
`;
