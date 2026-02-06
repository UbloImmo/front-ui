import styles from "./ComponentCard.module.scss";

import { cssClasses, cssVarUsage, useCssVariables, useStatic } from "@utils";

import type { ComponentCardCellSize } from "./ComponentCard.types";

export function useComponentCardStyles(cellSize: ComponentCardCellSize) {
  const classNames = useStatic(() => ({
    card: cssClasses(styles["component-card"]),
    componentContainer: cssClasses(
      styles["component-card-component-container"]
    ),
    infoContainer: cssClasses(styles["component-card-info-container"]),
    scaleContainer: cssClasses(styles["component-card-scale-container"]),
  }));

  const style = useCssVariables({
    "cell-size": cssVarUsage(`cell-size-${cellSize}`),
  });

  return { classNames, style };
}
