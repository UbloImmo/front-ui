import { useMemo } from "react";

import styles from "./ListFilterCollection.module.scss";

import { cssClasses } from "@utils";

import type { Nullish } from "@ubloimmo/front-util";

export function useListFilterCollectionClassNames(
  className: Nullish<string>,
  clearBtnHidden: Nullish<boolean>
) {
  return useMemo(
    () => ({
      container: cssClasses(styles["list-filter-collection"], className),
      titleContainer: cssClasses(
        styles["list-filter-collection-title-container"]
      ),
      filters: cssClasses(styles["list-filter-collection-filters"]),
      clearButton: cssClasses(styles["list-filter-collection-clear-button"], [
        styles.hidden,
        clearBtnHidden,
      ]),
    }),
    [clearBtnHidden, className]
  );
}
