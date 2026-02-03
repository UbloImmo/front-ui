import styles from "./Switch.module.scss";

import { useCssClasses } from "@utils";

export function useSwitchClassNames() {
  const container = useCssClasses(styles.switch);
  const handle = useCssClasses(styles["switch-handle"]);

  return { container, handle };
}
