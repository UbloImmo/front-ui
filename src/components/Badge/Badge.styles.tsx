import { useMemo } from "react";

import styles from "./Badge.module.scss";

import {
  cssStyles,
  cssVariables,
  cssVarUsage,
  isGrayColor,
  useCssClasses,
} from "@utils";

import type {
  BadgeShade,
  BadgeShadeStyle,
  DefaultBadgeProps,
} from "./Badge.types";
import type { ColorKey, PaletteColor } from "@types";
import type { ValueMap } from "@ubloimmo/front-util";

const badgeShadeStyleMap: ValueMap<BadgeShade, BadgeShadeStyle> = {
  light: {
    textColor: "dark",
    backgroundColor: "light",
    iconColor: "base",
  },
  dark: {
    textColor: "light",
    backgroundColor: "dark",
    iconColor: "medium",
  },
};

const grayBadgeShadeStyleMap: ValueMap<BadgeShade, BadgeShadeStyle> = {
  light: {
    textColor: "800",
    backgroundColor: "50",
    iconColor: "800",
  },
  dark: {
    textColor: "50",
    backgroundColor: "700",
    iconColor: "100",
  },
};

export function getBadgeStyleMap(
  color: ColorKey,
  shade: BadgeShade
): BadgeShadeStyle {
  const styleMap = isGrayColor(color)
    ? grayBadgeShadeStyleMap
    : badgeShadeStyleMap;
  return styleMap[shade];
}

export function useBadgeStyle({
  color,
  shade,
  styleOverride,
  className: cn,
}: Pick<DefaultBadgeProps, "shade" | "color" | "className" | "styleOverride">) {
  const className = useCssClasses(styles.badge, cn);

  const style = useMemo(() => {
    const {
      backgroundColor,
      iconColor: iconShade,
      textColor: textShade,
    } = getBadgeStyleMap(color, shade);

    const borderColorShade = isGrayColor(color) ? "300" : "medium";

    const borderColor = `${color}-${borderColorShade}` as PaletteColor;
    const background = `${color}-${backgroundColor}` as PaletteColor;
    const textColor = `${color}-${textShade}` as PaletteColor;
    const iconColor = `${color}-${iconShade}` as PaletteColor;

    const vars = cssVariables({
      "badge-border-color": cssVarUsage(borderColor),
      "badge-background-color": cssVarUsage(background),
    });
    const style = cssStyles(vars, styleOverride);
    return {
      style,
      iconColor,
      textColor,
    };
  }, [color, shade, styleOverride]);

  return { className, ...style };
}
