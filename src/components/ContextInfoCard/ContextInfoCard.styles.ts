import { useMemo } from "react";

import styles from "./ContextInfoCard.module.scss";
import { ContextInfoCardProps } from "./ContextInfoCard.types";

import { cssClasses, useCssStyles } from "@utils";

export function useContextInfoCardStyles(
  props: Required<ContextInfoCardProps>
) {
  const classNames = useMemo(
    () => ({
      card: cssClasses(styles["context-info-card"], props.className),
      cardLink: cssClasses(
        styles["context-info-card"],
        styles["context-info-card-link"],
        props.className
      ),
      iconContainer: cssClasses(styles["context-info-card-icon-container"]),
    }),
    [props.className]
  );

  const style = useCssStyles(props.styleOverride);

  return { classNames, style };
}
