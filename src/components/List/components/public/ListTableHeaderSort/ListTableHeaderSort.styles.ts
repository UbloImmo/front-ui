import { useMemo } from "react";

import styles from "./ListTableHeaderSort.module.scss";

import { useCssClasses } from "@utils";

import type { SortIconSet, SortIcons } from "@/components/List/modules/Sort";
import type { Nullish, ValueMap } from "@ubloimmo/front-util";

export function useListTableHeaderSortClassnames(
  highlighted = false,
  inverted = false,
  hideLabel: boolean = false,
  className: Nullish<string>
) {
  const cell = useCssClasses(
    styles["list-table-header-sort"],
    [styles["hide-label"], hideLabel],
    className
  );
  const button = useCssClasses(
    styles["list-table-header-sort-button"],
    [styles.highlighted, highlighted],
    [styles.inverted, inverted]
  );
  return { cell, button };
}

const SORT_ICON_SET_MAP: ValueMap<SortIconSet, SortIcons> = {
  unknown: {
    base: "SortDown",
    inverted: "SortUpAlt",
  },
  number: {
    base: "SortNumericDown",
    inverted: "SortNumericUpAlt",
  },
  string: {
    base: "SortAlphaDown",
    inverted: "SortAlphaUpAlt",
  },
};

export function useSortIcons(iconSet: SortIconSet = "unknown") {
  return useMemo(() => SORT_ICON_SET_MAP[iconSet], [iconSet]);
}
