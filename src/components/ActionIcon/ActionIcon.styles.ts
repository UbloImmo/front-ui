import { useMemo } from "react";

import styles from "./ActionIcon.module.scss";

import { cssStyles, cssVariables, cssVarUsage, useCssClasses } from "@utils";

import type {
  ActionIconColor,
  ActionIconSize,
  DefaultActionIconProps,
} from "./ActionIcon.types";
import type { ColorKey, PaletteColor } from "@types";
import type { ValueMap } from "@ubloimmo/front-util";

export const actionIconIconColorMap: ValueMap<
  ActionIconSize,
  Record<ActionIconColor, PaletteColor>
> = {
  s: {
    white: "gray-600",
    error: "error-base",
    primary: "primary-base",
  },
  m: {
    white: "gray-600",
    error: "error-base",
    primary: "primary-base",
  },
  l: {
    white: "gray-800",
    error: "gray-800",
    primary: "primary-base",
  },
};

const actionIconBackgroundMap: ValueMap<
  ActionIconSize,
  Record<ActionIconColor, PaletteColor | "white">
> = {
  s: {
    white: "white",
    error: "error-light",
    primary: "primary-light",
  },
  m: {
    white: "white",
    error: "error-light",
    primary: "primary-light",
  },
  l: {
    white: "white",
    error: "white",
    primary: "primary-light",
  },
};

export function useActionIconStyle(props: DefaultActionIconProps) {
  const className = useCssClasses(
    styles["action-icon"],
    styles[props.size],
    props.className
  );

  const style = useMemo(() => {
    const normalizedColor: ColorKey =
      props.color === "white" ? "primary" : props.color;
    const iconHoverColor = cssVarUsage(`${normalizedColor}-base`);
    const borderColorTransparent = cssVarUsage(`${normalizedColor}-medium-00`);
    const borderColor =
      props.size === "l"
        ? cssVarUsage(`${normalizedColor}-medium`)
        : borderColorTransparent;
    const backgroundColor = actionIconBackgroundMap[props.size][props.color];
    const background = cssVarUsage(backgroundColor);

    const vars = cssVariables({
      "action-icon-background": background,
      "action-icon-border-color": borderColor,
      "action-icon-border-color-transparent": borderColorTransparent,
      "action-icon-icon-hover-color": iconHoverColor,
    });
    return cssStyles(vars, props.styleOverride);
  }, [props.size, props.color, props.styleOverride]);

  return {
    className,
    style,
  };
}
