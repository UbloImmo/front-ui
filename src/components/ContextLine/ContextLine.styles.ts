import styles from "./ContextLine.module.scss";

import { useCssClasses, useCssStyles } from "@utils";

import type { ContextLineDefaultProps } from "./ContextLine.types";

export function useContextLineStyles(props: ContextLineDefaultProps) {
  const className = useCssClasses(
    styles["context-line"],
    [styles["padding-horizontal"], props.paddingHorizontal],
    [styles.compact, props.compact],
    [styles["border-bottom"], props.borderBottom],
    props.className
  );

  const style = useCssStyles(props.styleOverride);

  return { className, style };
}
