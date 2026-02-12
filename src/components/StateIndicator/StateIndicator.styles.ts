import styles from "./StateIndicator.module.scss";

import { cssVarUsage, useCssClasses, useCssVariables } from "@utils";

import type { StateIndicatorStyleColors } from "./StateIndicator.types";
import type { ColorKeyOrWhite, StyleOverrideProps } from "@types";

export const computeStateIndicatorColors = (
  color: ColorKeyOrWhite
): StateIndicatorStyleColors => {
  if (color === "gray") {
    return {
      background: "gray-100",
      border: "gray-300",
      label: "gray-800",
      icon: "gray-800",
    };
  }

  if (color === "white")
    return {
      background: "white",
      border: "gray-200",
      label: "gray-600",
      icon: "gray-600",
    };

  return {
    background: `${color}-light`,
    border: `${color}-medium`,
    label: `${color}-dark`,
    icon: `${color}-base`,
  };
};

export function useStateIndicatorStyles(
  colors: Pick<StateIndicatorStyleColors, "background" | "border">,
  overrides: Pick<StyleOverrideProps, "className" | "styleOverride">
) {
  const labelClassName = useCssClasses(styles["state-indicator-label"]);

  const className = useCssClasses(
    styles["state-indicator"],
    overrides.className
  );
  const style = useCssVariables(
    () => ({
      "state-bg": cssVarUsage(colors.background),
      "state-border": cssVarUsage(colors.border),
    }),
    overrides.styleOverride
  );

  return {
    labelClassName,
    className,
    style,
  };
}
