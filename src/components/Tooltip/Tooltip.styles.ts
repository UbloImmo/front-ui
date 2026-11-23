import { useMemo } from "react";

import styles from "./Tooltip.module.scss";

import { cssClasses, cssVariables, useCssClasses } from "@utils";

import type { TooltipCursor } from "./Tooltip.types";

export function useTooltipStyles(cursor: TooltipCursor, fill: boolean) {
  const trigger = useMemo(() => {
    const className = cssClasses(styles["tooltip-trigger"], [
      styles.fill,
      fill,
    ]);
    const style = cssVariables({ cursor });
    return { className, style };
  }, [cursor, fill]);
  const tooltip = useCssClasses(styles.tooltip);
  const arrow = useCssClasses(styles["tooltip-arrow"]);

  return {
    trigger,
    tooltip,
    arrow,
  };
}
