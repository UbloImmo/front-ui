import { forwardRef } from "react";

import styles from "../VirtualTable.module.scss";

import { Table, TableScrollView } from "@/layouts/Table";
import { useCssClasses } from "@utils";

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
    ({ children, style, context }, ref) => {
      const className = useCssClasses(styles["virtal-table"]);

      return (
        <TableScrollView>
          <Table
            styleOverride={style}
            className={className}
            ref={ref}
            layout={context.layout}
            testId="virtual"
          >
            {children}
          </Table>
        </TableScrollView>
      );
    }
  );
