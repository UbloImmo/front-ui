import styles from "./ListFilterOptionDivider.module.scss";

import { cssClasses, useStatic } from "@utils";

export function useListFilterOptionDividerClassNames() {
  return useStatic(() => ({
    container: cssClasses(styles["list-filter-option-divider"]),
    labelContainer: cssClasses(
      styles["list-filter-option-divider-label-container"]
    ),
  }));
}
