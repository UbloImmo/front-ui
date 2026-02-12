import { useMemo } from "react";

import styles from "./Divider.module.scss";
import { DividerDefaultProps } from "./Divider.types";

import { useCssClasses, useCssStyles } from "@utils";

export function useDividerStyles(
  props: Pick<DividerDefaultProps, "className" | "styleOverride">
) {
  const line = useCssClasses(styles["divider-line"], props.className);
  const wrapper = useCssClasses(props.className);

  const classNames = useMemo(() => ({ line, wrapper }), [line, wrapper]);

  const style = useCssStyles(props.styleOverride);

  return { classNames, style };
}
