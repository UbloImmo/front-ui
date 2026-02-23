import { useEffect, useCallback, useMemo, useRef, useState } from "react";

import { SortMap } from "../modules/Sort";
import {
  isSortOrderBasic,
  SORT_ORDER_BASIC_INVERT_MAP,
  SORT_HIGHLIGHTED_PRIORITY,
} from "../modules/Sort/Sort.utils";

import { useLogger } from "@utils";

import type {
  FilterProperty,
  Sort,
  SortData,
  SortOrder,
  SortOrderComplex,
} from "../modules";
import type {
  MutateListSortFn,
  ListContextConfig,
  UseListSortsReturn,
} from "./ListContext.types";
import type { Nullable, VoidFn } from "@ubloimmo/front-util";

export function useListSorts<TItem extends object>(
  config: Pick<ListContextConfig<TItem>, "sorts">
): UseListSortsReturn<TItem> {
  const logger = useLogger("ListContext.sorts");

  const sortMap = useRef<SortMap<TItem>>(new SortMap<TItem>(config.sorts));

  const initializeSortsFlagSet = useCallback(
    (flag: "active" | "inverted"): Set<FilterProperty<TItem>> => {
      const set = new Set<FilterProperty<TItem>>();
      if (!sortMap.current.size) return set;
      for (const [property, sort] of sortMap.current) {
        if (sort[flag]) set.add(property);
      }
      return set;
    },
    []
  );

  const activeSortsSetRef = useRef<Set<FilterProperty<TItem>>>(
    initializeSortsFlagSet("active")
  );
  const invertedSortsSetRef = useRef<Set<FilterProperty<TItem>>>(
    initializeSortsFlagSet("inverted")
  );
  const [highlightedSortProperty, setHighlightedSortProperty] =
    useState<Nullable<FilterProperty<TItem>>>(null);

  /**
   * Effect that synchronizes the internal {@link sortMap} ref with the provided {@link config} whenever the latter changes.
   * Discards removed and appends added sorts. Does not
   */
  useEffect(() => {
    if (!config.sorts) return;
    if (config.sorts.size === sortMap.current.size) return;
    // merge properties
    const sortProperties = new Set<FilterProperty<TItem>>([
      ...sortMap.current.keys(),
      ...config.sorts.keys(),
    ]);
    for (const property of sortProperties) {
      // delete removed sorts
      if (sortMap.current.has(property) && !config.sorts.has(property)) {
        invertedSortsSetRef.current.delete(property);
        activeSortsSetRef.current.delete(property);
        if (highlightedSortProperty === property)
          setHighlightedSortProperty(null);
        sortMap.current.delete(property);
        continue;
      }
      // add missing sorts
      const newOrUpdated = config.sorts.get(property);
      if (!sortMap.current.has(property) && newOrUpdated) {
        sortMap.current.set(property, newOrUpdated);
        if (newOrUpdated.inverted) invertedSortsSetRef.current.add(property);
        if (newOrUpdated.active) activeSortsSetRef.current.add(property);
        continue;
      }
      // update while keeping current active & inverted states
      const previous = sortMap.current.get(property);
      if (previous && newOrUpdated) {
        const merged: typeof previous = {
          ...newOrUpdated,
          active: previous.active,
          inverted: previous.inverted,
        };
        sortMap.current.set(property, merged);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config.sorts]);

  const activateSort = useCallback<MutateListSortFn<TItem>>(
    <TProperty extends FilterProperty<TItem>>(property: TProperty) => {
      const sort = sortMap.current.get(property);
      if (!sort) return;
      activeSortsSetRef.current.add(property);
      // only mutate sort if needed
      if (sort.active) return;
      sortMap.current.set(property, { ...sort, active: true });
      // update highlight
      setHighlightedSortProperty(property);
    },
    []
  );

  const deactivateSort = useCallback<MutateListSortFn<TItem>>(
    <TProperty extends FilterProperty<TItem>>(property: TProperty) => {
      const sort = sortMap.current.get(property);
      if (!sort) return;
      activeSortsSetRef.current.delete(property);
      // only mutate sort if needed
      if (!sort.active) return;
      sortMap.current.set(property, { ...sort, active: false });
      // update highlight
      setHighlightedSortProperty(null);
    },
    []
  );

  const toggleSort = useCallback<MutateListSortFn<TItem>>(
    <TProperty extends FilterProperty<TItem>>(property: TProperty) => {
      const sort = sortMap.current.get(property);
      if (!sort) return;
      // toggle state & update set
      const wasActive = !sort.active;
      activeSortsSetRef.current[sort.active ? "delete" : "add"](property);
      // always mutate sort in map
      sortMap.current.set(property, { ...sort, active: !wasActive });
      // update highlight
      setHighlightedSortProperty(wasActive ? null : property);
    },
    []
  );

  const invertSort = useCallback<MutateListSortFn<TItem>>(
    <TProperty extends FilterProperty<TItem>>(property: TProperty) => {
      const sort = sortMap.current.get(property);
      if (!sort) return;
      // toggle state & update set
      invertedSortsSetRef.current[sort.inverted ? "delete" : "add"](property);
      // always mutate sort in map
      sortMap.current.set(property, { ...sort, inverted: !sort.inverted });
      // update highlight
      if (sort.active) setHighlightedSortProperty(property);
    },
    []
  );

  const resetSort = useCallback<MutateListSortFn<TItem>>(
    <TProperty extends FilterProperty<TItem>>(property: TProperty) => {
      const sort = sortMap.current.get(property);
      if (!sort) return;

      // abort if state matches default state
      if (
        sort.active === sort.defaultState.active &&
        sort.inverted === sort.defaultState.inverted
      )
        return;
      // update inverted state
      invertedSortsSetRef.current[
        sort.defaultState.inverted ? "add" : "delete"
      ](property);
      // update active state
      activeSortsSetRef.current[sort.defaultState.active ? "add" : "delete"](
        property
      );
      // mutate sort in map
      sortMap.current.set(property, {
        ...sort,
        ...sort.defaultState,
      });

      if (sort.defaultState.active) setHighlightedSortProperty(property);
    },
    []
  );

  const prioritizeSort = useCallback<MutateListSortFn<TItem>>(
    <TProperty extends FilterProperty<TItem>>(property: TProperty) => {
      if (!sortMap.current.has(property)) return;
      setHighlightedSortProperty(property);
    },
    []
  );

  const sortActiveGuard = useCallback(
    <TProperty extends FilterProperty<TItem>>(
      callbackFn: VoidFn<[TProperty]>,
      property: TProperty
    ) =>
      () => {
        if (!activeSortsSetRef.current.has(property)) {
          logger.warn(
            `Sort ${property} is not active. Aborted calling ${callbackFn.name}`
          );
          return;
        }
        callbackFn(property);
      },
    []
  );

  const computeSortOrder = useCallback(
    <TProperty extends FilterProperty<TItem>>(
      sort: SortData<TItem, TProperty>
    ): SortOrder<TItem, TProperty> => {
      if (!sort.inverted) return sort.order;
      // invert basic sort order
      if (isSortOrderBasic(sort.order))
        return SORT_ORDER_BASIC_INVERT_MAP[sort.order];
      // invert complex sort order;
      return [...sort.order].reverse() as SortOrderComplex<TItem, TProperty>;
    },
    []
  );

  const hydrateSort = useCallback(
    <TProperty extends FilterProperty<TItem>>(
      sortData: SortData<TItem, TProperty>
    ): Sort<TItem, TProperty> => {
      const prioritized =
        sortData.property === highlightedSortProperty && sortData.active;
      const priority = prioritized
        ? SORT_HIGHLIGHTED_PRIORITY
        : sortData.priority;
      return {
        ...sortData,
        priority,
        prioritized,
        computedOrder: computeSortOrder(sortData),
        toggle: () => toggleSort(sortData.property),
        reset: () => resetSort(sortData.property),
        activate: () => activateSort(sortData.property),
        invert: sortActiveGuard(invertSort, sortData.property),
        deactivate: () => deactivateSort(sortData.property),
        prioritize: sortActiveGuard(prioritizeSort, sortData.property),
      };
    },
    [
      activateSort,
      computeSortOrder,
      deactivateSort,
      highlightedSortProperty,
      invertSort,
      prioritizeSort,
      resetSort,
      sortActiveGuard,
      toggleSort,
    ]
  );

  /**
   * Hydrated list Sort objects sorted in priority order
   */
  const sorts = useMemo<Sort<TItem, FilterProperty<TItem>>[]>(() => {
    const hydrated: Sort<TItem, FilterProperty<TItem>>[] = [];
    for (const [, sortData] of sortMap.current) {
      hydrated.push(hydrateSort(sortData));
    }
    return hydrated.sort((a, b) => a.priority - b.priority);
  }, [hydrateSort]);

  /**
   * Subset of {@link sorts} containing only active sorts
   */
  const activeSorts = useMemo<Sort<TItem, FilterProperty<TItem>>[]>(() => {
    if (!activeSortsSetRef.current.size) return [];
    return sorts.filter(({ active }) => active);
  }, [sorts]);

  return {
    sortMap: sortMap.current,
    sorts,
    activeSorts,
    activateSort,
    deactivateSort,
    highlightedSortProperty,
    invertSort,
    resetSort,
    toggleSort,
  };
}
