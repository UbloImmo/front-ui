import styles from "./SideEntityMenu.module.scss";

import { isNonNullish, useCssClasses, useStatic } from "@utils";

import type { SideEntityMenuDefaultProps } from "./SideEntityMenu.types";

function useSideEntityMenuClassName({
  expandedBreakpoint,
  className,
}: Pick<
  SideEntityMenuDefaultProps,
  "className" | "expandedBreakpoint" | "styleOverride"
>) {
  return useCssClasses(
    styles["side-entity-menu"],
    [styles["has-breakpoint"], isNonNullish(expandedBreakpoint)],
    isNonNullish(expandedBreakpoint)
      ? styles[`breakpoint-${expandedBreakpoint}`]
      : null,
    className
  );
}

export function useSideEntityMenuClassnames(
  props: Pick<
    SideEntityMenuDefaultProps,
    "className" | "expandedBreakpoint" | "styleOverride"
  >
) {
  const pane = useSideEntityMenuClassName(props);
  const separator = useCssClasses(styles["side-entity-menu-separator"]);

  return {
    pane,
    separator,
  };
}

export function useSideEntityMenuItemClassNames() {
  const icon = useCssClasses(styles["side-entity-menu-item-icon"]);
  const item = useCssClasses(styles["side-entity-menu-item"]);
  const indicator = useCssClasses(styles["side-entity-menu-item-indicator"]);
  const errorIndicator = useCssClasses(
    styles["side-entity-menu-item-error-indicator"]
  );
  const title = useCssClasses(styles["side-entity-menu-item-title"]);

  return useStatic({ icon, item, indicator, errorIndicator, title });
}
