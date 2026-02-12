import { useMemo } from "react";

import styles from "./ListFilterPreset.module.scss";

import {
  cssVariables,
  cssVarUsage,
  normalizeToPaletteColor,
  useCssClasses,
} from "@utils";

import type { ListFilterPresetStyleProps } from "./ListFilterPreset.types";
import type { PaletteColorOrWhite } from "@types";

export function useListFilterPresetStyles({
  active,
  colorKey,
}: ListFilterPresetStyleProps) {
  const className = useCssClasses(styles["list-filter-preset"], [
    styles.active,
    active,
  ]);

  const style = useMemo(() => {
    const lightColor: PaletteColorOrWhite = normalizeToPaletteColor(
      colorKey,
      "light"
    );
    const mediumColor: PaletteColorOrWhite = normalizeToPaletteColor(
      colorKey,
      "medium"
    );

    return cssVariables({
      "border-default": cssVarUsage(lightColor),
      "border-active": cssVarUsage(mediumColor),
    });
  }, [colorKey]);

  return {
    className,
    style,
  };
}
