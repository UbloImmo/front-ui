import { forwardRef } from "react";
import styled from "styled-components";

import { Table, TableScrollView } from "@/layouts/Table";

import type {
  VirtualTableComponentOverrides,
  VirtualTableOverrideProps,
} from "../VirtualTable.types";

/**
 * A custom table component for use with react-virtuoso's TableComponents.
 * Wraps the base Table component to provide virtual scrolling capabilities.
 *
 * @see {@link TableComponents["Table"]}
 */
export const VirtualTableTable: VirtualTableComponentOverrides<object>["Table"] =
  forwardRef<HTMLTableElement, VirtualTableOverrideProps<object>>(
    ({ children, style, context }, ref) => (
      <TableScrollView>
        <MinWidthTable
          styleOverride={style}
          ref={ref}
          layout={context.layout}
          testId="virtual"
        >
          {children}
        </MinWidthTable>
      </TableScrollView>
    )
  );

const MinWidthTable = styled(Table)`
  min-width: 100%;
  max-width: max-content;
  width: unset;
`;
