import { useMemo } from "react";

import styles from "./Hypertext.module.scss";

import {
  cssStyles,
  cssVariables,
  cssVarUsage,
  isGrayColor,
  useCssClasses,
} from "@utils";

import type { DefaultHypertextProps } from "./Hypertext.types";

export function useHypertextStyle(
  props: Pick<DefaultHypertextProps, "color" | "className" | "styleOverride">
) {
  const className = useCssClasses(styles.hypertext, props.className);

  const style = useMemo(() => {
    const isGray = isGrayColor(props.color);
    const decorationColor = cssVarUsage(
      isGray ? "gray-700-00" : `${props.color}-base-00`
    );
    const hoverColor = cssVarUsage(isGray ? "gray-900" : `${props.color}-dark`);

    const vars = cssVariables({
      "text-decoration-color": decorationColor,
      "text-hover-color": hoverColor,
    });
    return cssStyles(vars, props.styleOverride);
  }, [props.color, props.styleOverride]);

  const textClassName = useCssClasses(styles["hypertext-text"]);
  return {
    className,
    textClassName,
    style,
  };
}
