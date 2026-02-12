import styles from "./Dialog.module.scss";

import { useCssClasses, useStatic } from "@utils";

export function useDialogStyles() {
  const overlay = useCssClasses(styles["dialog-overlay"]);
  const content = useCssClasses(styles["dialog-content"]);
  const wrapper = useCssClasses(styles["dialog-wrapper"]);

  return useStatic({
    classNames: { overlay, content, wrapper },
  });
}
