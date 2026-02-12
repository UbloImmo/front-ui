import styles from "./Modal.module.scss";

import { useCssClasses } from "@utils";

import type { ModalSize } from "./Modal.types";

export function useModalClassNames(size: ModalSize) {
  const card = useCssClasses(styles["modal-card"], styles[`size-${size}`]);
  const button = useCssClasses(styles["modal-button"]);

  return {
    card,
    button,
  };
}
