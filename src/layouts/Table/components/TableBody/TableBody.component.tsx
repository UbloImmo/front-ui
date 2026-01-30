import { forwardRef } from "react";

import styles from "../../Table.module.scss";

import {
  useCssClasses,
  useHtmlAttribute,
  useMergedProps,
  useTestId,
} from "@utils";

import type { TableBodyProps } from "./TableBody.types";
import type { TestIdProps } from "@types";

const defaultTableBodyProps: Required<TableBodyProps> = {
  children: null,
  style: "form",
  className: null,
  styleOverride: null,
  id: null,
};

/**
 * The body of the `Table` layout.
 * To be used with `TableRow`, `TableCell`
 *
 * @version 0.1.0
 *
 * @param {TableBodyProps & TestIdProps} props - The component props.
 * @returns The table body component.
 */
export const TableBody = forwardRef<
  HTMLTableSectionElement,
  TableBodyProps & TestIdProps
>((props, ref) => {
  const mergedProps = useMergedProps(defaultTableBodyProps, props);
  const testId = useTestId("table-body", props);

  const className = useCssClasses(
    styles["table-body"],
    [styles.form, mergedProps.style !== "list"],
    mergedProps.className
  );
  const styleProperties = useHtmlAttribute(mergedProps.styleOverride);
  const id = useHtmlAttribute(mergedProps.id);
  return (
    <tbody
      style={styleProperties}
      data-testid={testId}
      className={className}
      ref={ref}
      id={id}
    >
      {props.children}
    </tbody>
  );
});
