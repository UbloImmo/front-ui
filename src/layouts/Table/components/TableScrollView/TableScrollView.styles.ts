import styles from "../../Table.module.scss";

import {
  cssLengthUsage,
  cssVarUsage,
  isNonNullish,
  useCssClasses,
  useCssVariables,
} from "@utils";

import type { TableScrollViewDefaultProps } from "./TableScrollView.types";

export function useTableScrollViewStyles(
  props: Pick<
    TableScrollViewDefaultProps,
    | "overflowDirection"
    | "style"
    | "styleOverride"
    | "className"
    | "maxHeight"
    | "overflowIndicatorColor"
    | "overflowIndicatorSize"
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

  const overflowStartClassName = useCssClasses(
    styles["table-scroll-view-overflow-indicator"],
    styles["table-scroll-view-overflow-start"]
  );

  const overflowEndClassName = useCssClasses(
    styles["table-scroll-view-overflow-indicator"],
    styles["table-scroll-view-overflow-end"]
  );

  const style = useCssVariables(
    {
      "table-scroll-view-max-height": isNonNullish(props.maxHeight)
        ? cssLengthUsage(props.maxHeight)
        : undefined,
      "table-scroll-view-overflow-indicator-size": cssLengthUsage(
        props.overflowIndicatorSize
      ),
      "table-scroll-view-overflow-indicator-color": cssVarUsage(
        props.overflowIndicatorColor
      ),
    },
    props.styleOverride
  );
  return {
    className,
    style,
    overflowEndClassName,
    overflowStartClassName,
    anchorClassName: styles["table-scroll-view-anchor"],
  };
}
