import styles from "./EmptyStateCard.module.scss";

import { useCssClasses, useCssStyles } from "@utils";

import type { EmptyStateCardDefaultProps } from "./EmptyStateCard.types";

export function useEmptyStateCardStyles({
  transparent,
  className: cn,
  styleOverride,
}: Pick<
  EmptyStateCardDefaultProps,
  "transparent" | "className" | "styleOverride"
>) {
  const className = useCssClasses(
    styles["empty-state-card"],
    [styles.transparent, transparent],
    cn
  );

  const style = useCssStyles(styleOverride);

  return { className, style };
}
