import styles from "../../Table.module.scss";

import { isCssProperties, useCssClasses, useCssStyles } from "@utils";

import type { TableRowProps } from "./TableRow.types";

export function useTableRowStyle(
  props: Pick<
    Required<TableRowProps>,
    "style" | "className" | "onClick" | "styleOverride"
  >
) {
  const className = useCssClasses(
    styles["table-row"],
    [styles.list, props.style === "list"],
    [styles.form, props.style !== "list"],
    [styles.clickable, !!props.onClick],
    props.className
  );

  const style = useCssStyles(
    isCssProperties(props.style) ? props.style : null,
    props.styleOverride
  );

  return {
    className,
    style,
  };
}
