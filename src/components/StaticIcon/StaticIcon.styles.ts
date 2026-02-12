import { useMemo } from "react";

import styles from "./StaticIcon.module.scss";

import { cssVarUsage, useCssClasses, useCssVariables } from "@utils";

import type {
  DefaultStaticIconProps,
  StaticIconColors,
  StaticIconSize,
} from "./StaticIcon.types";
import type { ColorKeyOrWhite, CssRem } from "@types";
import type { ValueMap } from "@ubloimmo/front-util";

export const staticIconSizeToIconSizeMap: ValueMap<StaticIconSize, CssRem> = {
  xs: "0.75rem",
  s: "1rem",
  m: "1.5rem",
  l: "1.75rem",
};

export function getStaticIconColors(color: ColorKeyOrWhite): StaticIconColors {
  if (color === "white")
    return {
      bg: "white",
      border: "gray-100",
      icon: "gray-500",
    };

  if (color === "gray")
    return {
      bg: "gray-50",
      border: "gray-300",
      icon: "gray-600",
    };

  return {
    bg: `${color}-light`,
    border: `${color}-medium`,
    icon: `${color}-base`,
  };
}

export function useStaticIconStyles(
  colors: StaticIconColors,
  props: DefaultStaticIconProps
) {
  const indicator = useCssClasses(styles["static-icon-indicator"]);
  const container = useCssClasses(
    styles["static-icon"],
    styles[`size-${props.size}`],
    [styles.stroke, props.stroke],
    props.className
  );
  const classNames = useMemo(
    () => ({ container, indicator }),
    [container, indicator]
  );

  const style = useCssVariables(
    {
      bg: cssVarUsage(colors.bg),
      "border-color": cssVarUsage(colors.border),
    },
    props.styleOverride
  );

  return {
    classNames,
    style,
  };
}
