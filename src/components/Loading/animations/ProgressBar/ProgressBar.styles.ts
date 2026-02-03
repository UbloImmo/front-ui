import styles from "./ProgressBar.module.scss";

import { parseFixedLength } from "@/sizes/size.utils";
import { cssVarUsage, useCssClasses, useCssVariables } from "@utils";

import type { LoadingAnimationProps } from "../Loading.animations.types";

export function useProgressBarStyles({
  color,
  size,
  styleOverride,
  className: cn,
}: LoadingAnimationProps) {
  const style = useCssVariables(
    {
      color: cssVarUsage(color),
      "color-bg": cssVarUsage(`${color}-20`),
      size: parseFixedLength(size),
    },
    styleOverride
  );

  const className = useCssClasses(styles["progress-bar"], cn);

  return {
    style,
    className,
  };
}
