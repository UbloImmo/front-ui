import styles from "./Table.module.scss";

import { useCssClasses, useCssStyles } from "@utils";

import type { TableDefaultProps } from "./Table.types";

export function useTableLayoutStyle(props: TableDefaultProps) {
  const className = useCssClasses(
    styles.table,
    [styles.fixed, props.layout === "fixed"],
    props.className
  );

  const style = useCssStyles(props.styleOverride);
  return {
    className,
    style,
  };
}
