import { Nullish } from "@ubloimmo/front-util";

import styles from "./ListFilterOptionItem.module.scss";

import { useCssClasses } from "@utils";

export function useListFilterOptionItemClassName(
  highlighted: Nullish<boolean>
) {
  return useCssClasses(styles["list-filter-option-item"], [
    styles.highlighted,
    highlighted,
  ]);
}
