import styles from "../../Table.module.scss";

import {
  cssLengthUsage,
  isNonNullish,
  useCssClasses,
  useCssVariables,
} from "@utils";

import type { TableScrollViewDefaultProps } from "./TableScrollView.types";

export function useTableScrollViewStyles(
  props: Pick<
    TableScrollViewDefaultProps,
    "overflowDirection" | "style" | "styleOverride" | "className" | "maxHeight"
  >
) {
  const className = useCssClasses(
    styles["table-scroll-view"],
    [styles["overflow-x"], props.overflowDirection === "x"],
    [styles["overflow-y"], props.overflowDirection === "y"],
    [styles["overflow-both"], props.overflowDirection === "both"],
    [styles.form, props.style === "form"],
    props.className
  );

  const style = useCssVariables(
    {
      "table-scroll-view-max-height": isNonNullish(props.maxHeight)
        ? cssLengthUsage(props.maxHeight)
        : undefined,
    },
    props.styleOverride
  );
  return { className, style };
}
