import { forwardRef, useMemo } from "react";

import { useTableHeaderStyle } from "./TableHeader.styles";

import { useHtmlAttribute, useMergedProps, useTestId } from "@utils";

import type { TableHeaderProps } from "./TableHeader.types";
import type { TestIdProps } from "@types";

const defaultTableHeaderProps: Required<TableHeaderProps> = {
  children: null,
  id: null,
  sticky: false,
  top: 0,
  className: null,
  styleOverride: null,
};

/**
 * The header part, a row on top in the `Table` layout to label the columns.
 * To be used with `TableHeaderCell`
 *
 * @version 0.1.0
 *
 * @example
 * <TableHeader>
 *   <TableHeaderCell>Header 1</TableHeaderCell>
 *   <TableHeaderCell>Header 2</TableHeaderCell>
 * </TableHeader>
 *
 * @param {TableHeaderProps} props - The component props.
 * @returns The table header component.
 */
export const TableHeader = forwardRef<
  HTMLTableSectionElement,
  TableHeaderProps & TestIdProps
>((props, ref): JSX.Element => {
  const mergedProps = useMergedProps(defaultTableHeaderProps, props);
  const testId = useTestId("table-header", props);
  const rowTestId = useMemo(() => `${testId}-row`, [testId]);
  const { className, style } = useTableHeaderStyle(mergedProps);
  const id = useHtmlAttribute(mergedProps.id);

  return (
    <thead
      data-testid={testId}
      className={className}
      style={style}
      ref={ref}
      id={id}
    >
      <tr data-testid={rowTestId}>{props.children}</tr>
    </thead>
  );
});
