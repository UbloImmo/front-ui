import { useMemo } from "react";

import styles from "./Chip.module.scss";
import badgeStyles from "../Badge/Badge.module.scss";
import { getBadgeStyleMap } from "../Badge/Badge.styles";

import {
  cssClasses,
  cssStyles,
  cssVariables,
  cssVarUsage,
  isGrayColor,
} from "@utils";

import type { DefaultChipProps } from "./Chip.types";
import type { PaletteColor } from "@types";

export function useChipStyle({
  color,
  className: cn,
  iconPlacement,
  disabled,
  styleOverride,
}: Pick<
  DefaultChipProps,
  "color" | "className" | "iconPlacement" | "disabled" | "styleOverride"
>) {
  const classes = useMemo(() => {
    const wrapper = cssClasses(styles["chip-wrapper"], cn);
    const chip = cssClasses(
      badgeStyles.shell,
      styles.chip,
      [styles["icon-right"], iconPlacement === "right"],
      [styles.disabled, disabled]
    );
    const button = cssClasses(styles["chip-button"]);
    const label = cssClasses(badgeStyles["badge-text"]);
    return {
      wrapper,
      chip,
      button,
      label,
    };
  }, [cn, disabled, iconPlacement]);

  const { style, colors } = useMemo(() => {
    const { iconColor, textColor, backgroundColor } = getBadgeStyleMap(
      color,
      "light"
    );
    const borderColorShade = isGrayColor(color) ? "300" : "medium";
    const iconHoverShade = isGrayColor(color) ? "800" : "dark";

    const border = `${color}-${borderColorShade}` as PaletteColor;
    const background = `${color}-${backgroundColor}` as PaletteColor;
    const text = `${color}-${textColor}` as PaletteColor;
    const icon = `${color}-${iconColor}` as PaletteColor;
    const iconHover = `${color}-${iconHoverShade}` as PaletteColor;

    const vars = cssVariables({
      "chip-border-color": cssVarUsage(border),
      "chip-background-color": cssVarUsage(background),
      "chip-button-icon-hover-color": cssVarUsage(iconHover),
    });
    const style = cssStyles(vars, styleOverride);

    return {
      style,
      colors: { border, background, text, icon, iconHover },
    };
  }, [color, styleOverride]);

  return { classes, style, colors };
}
