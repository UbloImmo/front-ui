import { isFunction, Optional, VoidFn } from "@ubloimmo/front-util";
import { forwardRef, useMemo } from "react";

import styles from "../VirtualTable.module.scss";

import { TableRow } from "@/layouts/Table";
import { isNonNullish, useCssClasses, useCssVariables } from "@utils";

import type {
  VirtualTableComponentOverrides,
  VirtualTableOnItemClickFn,
  VirtualTableRowOverrideProps,
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

      const onClick = useMemo<Optional<VoidFn>>(() => {
        if (!isFunction<VirtualTableOnItemClickFn<object>>(context.onItemClick))
          return undefined;
        return () => {
          if (!context.onItemClick) return;
          context.onItemClick(item, index);
        };
      }, [context, item, index]);
      const clickable = useMemo(() => !!onClick, [onClick]);

      const className = useCssClasses(
        styles["virtual-table-row"],
        [styles.even, isEven],
        [styles.clickable, clickable],
        [styles.list, context.style === "list"]
      );

      const rowStyle = useCssVariables(
        {
          "fixed-item-height": isNonNullish(context.fixedItemHeight)
            ? context.fixedItemHeight
            : "unset",
        },
        style
      );

      return (
        <TableRow
          testId="virtual"
          style={context.style}
          className={className}
          onClick={onClick}
          ref={ref}
          styleOverride={rowStyle}
          {...props}
        >
          {children}
        </TableRow>
      );
    }
  );
