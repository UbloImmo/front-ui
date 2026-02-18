import { useMemo } from "react";

import styles from "./ListFilter.module.scss";

import { useCssClasses } from "@utils";

import type { ListFilterStyleProps } from "./ListFilter.types";

function useListFilterContainerClassName(
  props: ListFilterStyleProps,
  renderMulti: boolean
) {
  return useCssClasses(
    styles["list-filter-container"],
    [styles.open, props.open],
    [styles.loading, props.loading],
    [styles.disabled, props.disabled],
    [styles.active, props.active],
    [styles.multi, renderMulti]
  );
}

function useListFilterHeaderClassName(
  props: ListFilterStyleProps,
  renderMulti: boolean
) {
  return useCssClasses(styles["list-filter-header"], [
    styles.multi,
    renderMulti,
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

export function useListFilterClassNames(
  props: ListFilterStyleProps,
  renderMulti: boolean
) {
  const container = useListFilterContainerClassName(props, renderMulti);
  const header = useListFilterHeaderClassName(props, renderMulti);
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
