import { useMemo } from "react";

import styles from "./CopyClipboardInfoCard.module.scss";

import { useCssClasses } from "@utils";

export function useCopyClipboardInfoCardStyles(isEmpty: boolean) {
  const card = useCssClasses(styles["copy-clipboard-info-card"], [
    styles.empty,
    isEmpty,
  ]);
  const link = useCssClasses(styles["copy-clipboard-info-card-link"]);
  const icon = useCssClasses(styles["copy-clipboard-info-card-icon-container"]);
  const label = useCssClasses(styles["copy-clipboard-info-card-label"]);

  const classNames = useMemo(
    () => ({ card, link, icon, label }),
    [card, icon, label, link]
  );

  return {
    classNames,
  };
}
