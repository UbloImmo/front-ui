import styles from "./ContextMenuArrow.module.scss";

import { useCssClasses } from "@utils";

export function useContextMenuArrowStyles() {
  return useCssClasses(styles["context-menu-arrow"]);
}
