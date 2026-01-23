import { useMemo } from "react";

import styles from "./Pane.module.scss";

import { cssClasses, cssLengthUsage, cssStyles, cssVariables } from "@utils";

import type { PaneDefaultProps } from "./Pane.types";

export function usePaneLayoutStyle(props: PaneDefaultProps) {
  const pane = useMemo(() => {
    const breakpoint = props.expandedBreakpoint
      ? styles[`breakpoint-${props.expandedBreakpoint}`]
      : null;
    const className = cssClasses(
      styles.pane,
      breakpoint,
      [styles["force-expanded"], props.forceExpanded],
      [styles.headless, props.headLess],
      props.className
    );

    const style = cssStyles(
      cssVariables({
        "p-top": cssLengthUsage(props.top),
        "p-bottom":
          props.bottom === "unset" ? "unset" : cssLengthUsage(props.bottom),
        "p-expanded-width": cssLengthUsage(props.expandedWidth),
        "p-collapsed-width": cssLengthUsage(props.collapsedWidth),
      })
    );

    return {
      className,
      style,
    };
  }, [
    props.bottom,
    props.className,
    props.collapsedWidth,
    props.expandedBreakpoint,
    props.expandedWidth,
    props.forceExpanded,
    props.headLess,
    props.top,
  ]);

  const paneContent = useMemo(() => {
    const anchor = styles[`anchor-${props.anchor}`];

    const className = cssClasses(styles["pane-content"], anchor);

    const style = cssStyles(props.styleOverride);

    return {
      className,
      style,
    };
  }, [props.anchor, props.styleOverride]);

  return {
    pane,
    paneContent,
  };
}
