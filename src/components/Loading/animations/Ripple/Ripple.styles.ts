import styles from "./Ripple.module.scss";

import { parseFixedLength } from "@/sizes/size.utils";
import { cssVarUsage, useCssClasses, useCssVariables } from "@utils";

import type { LoadingAnimationProps } from "../Loading.animations.types";

export function useRippleStyles({
  className: cn,
  color,
  size,
  styleOverride,
}: LoadingAnimationProps) {
  const style = useCssVariables(
    () => ({
      size: parseFixedLength(size),
      color: cssVarUsage(color),
    }),
    styleOverride
  );

  const className = useCssClasses(styles.ripple, cn);

  return { className, style };
}
