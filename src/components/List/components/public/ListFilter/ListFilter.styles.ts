import { useMemo } from "react";

import styles from "./ListFilter.module.scss";

import { useCssClasses } from "@utils";

import type { ListFilterStyleProps } from "./ListFilter.types";

function useListFilterContainerClassName(props: ListFilterStyleProps) {
  return useCssClasses(
    styles["list-filter-container"],
    [styles.open, props.open],
    [styles.loading, props.loading],
    [styles.disabled, props.disabled],
    [styles.active, props.active],
    [styles.multi, props.multi]
  );
}

function useListFilterHeaderClassName(props: ListFilterStyleProps) {
  return useCssClasses(styles["list-filter-header"], [
    styles.multi,
    props.multi,
  ]);
}

function useListFilterOptionChipsClassName() {
  return useCssClasses(styles["list-filter-option-chips"]);
}

function useListFilterOptionsListClassName(props: ListFilterStyleProps) {
  return useCssClasses(styles["list-filter-options-list"], [
    styles.open,
    props.open,
  ]);
}

function useListFilterQueryInputContainerClassName() {
  return useCssClasses(styles["list-filter-query-input-container"]);
}

export function useListFilterClassNames(props: ListFilterStyleProps) {
  const container = useListFilterContainerClassName(props);
  const header = useListFilterHeaderClassName(props);
  const chips = useListFilterOptionChipsClassName();
  const options = useListFilterOptionsListClassName(props);
  const query = useListFilterQueryInputContainerClassName();

  return useMemo(
    () => ({
      container,
      header,
      chips,
      options,
      query,
    }),
    [chips, container, header, options, query]
  );
}
