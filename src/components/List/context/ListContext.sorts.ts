import { useCallback, useMemo, useRef, useState } from "react";

import {
  type MutateListSortFn,
  type ListContextConfig,
  type UseListSortsReturn,
  GetListSortFn,
} from "./ListContext.types";
import { SortMap } from "../modules/Sort";
import {
  isSortOrderBasic,
  SORT_ORDER_BASIC_INVERT_MAP,
  SORT_HIGHLIGHTED_PRIORITY,
} from "../modules/Sort/Sort.utils";

import {
  UseMapOnReactiveAddFn,
  UseMapOnReactiveDeleteFn,
  UseMapReactiveUpdateFn,
} from "@types";
import { useLogger, useMap } from "@utils";

import type {
  FilterProperty,
  Sort,
  SortData,
  SortOrder,
  SortOrderComplex,
} from "../modules";
import type { Nullable, VoidFn } from "@ubloimmo/front-util";

/**
 * A hook that manages the list context's sorting configuration and state.
 * It stores and manipulates {@link Sort list sorts} and returns them along with manipulation functions.
 *
 * @template {object} TItem - The type of items in the list
 * @param {Pick<ListContextConfig<TItem>, "sorts">} config - The list context configuration
 * @returns {UseListSortsReturn<TItem>} List sorting context
 */
export function useListSorts<TItem extends object>(
  config: Pick<ListContextConfig<TItem>, "sorts">
): UseListSortsReturn<TItem> {
  const logger = useLogger("ListContext.sorts");

  const initializeSortsFlagSet = useCallback(
    (flag: "active" | "inverted"): Set<FilterProperty<TItem>> => {
      const set = new Set<FilterProperty<TItem>>();
      if (!config.sorts?.size) return set;
      for (const [property, sort] of config.sorts) {
        if (sort[flag]) set.add(property);
      }
      return set;
    },
    [config.sorts]
  );

  const activeSortsSetRef = useRef<Set<FilterProperty<TItem>>>(
    initializeSortsFlagSet("active")
  );
  const invertedSortsSetRef = useRef<Set<FilterProperty<TItem>>>(
    initializeSortsFlagSet("inverted")
  );
  const [highlightedSortProperty, setHighlightedSortProperty] =
    useState<Nullable<FilterProperty<TItem>>>(null);

  // update while keeping current active & inverted states
  const sortMapReactiveUpdate = useCallback<
    UseMapReactiveUpdateFn<
      FilterProperty<TItem>,
      SortData<TItem, FilterProperty<TItem>>
    >
  >(
    (newValue, { active, inverted }) => ({
      ...newValue,
      active,
      inverted,
    }),
    []
  );

  const sortMapOnReactiveAdd = useCallback<
    UseMapOnReactiveAddFn<
      FilterProperty<TItem>,
      SortData<TItem, FilterProperty<TItem>>
    >
  >((addedSort, addedProperty) => {
    if (addedSort.active) activeSortsSetRef.current.add(addedProperty);
    if (addedSort.inverted) invertedSortsSetRef.current.add(addedProperty);
  }, []);

  const sortMapOnReactiveDelete = useCallback<
    UseMapOnReactiveDeleteFn<FilterProperty<TItem>>
  >(
    (deletedProperty) => {
      invertedSortsSetRef.current.delete(deletedProperty);
      activeSortsSetRef.current.delete(deletedProperty);
      if (highlightedSortProperty === deletedProperty)
        setHighlightedSortProperty(null);
    },
    [highlightedSortProperty]
  );

  const sortMap = useMap(SortMap<TItem>, {
    autoCommitMutations: false,
    initialValue: config.sorts,
    reactiveValue: config.sorts,
    reactiveUpdate: sortMapReactiveUpdate,
    onReactiveAdd: sortMapOnReactiveAdd,
    onReactiveDelete: sortMapOnReactiveDelete,
  });

  /**
   * Finds a Sort by its property and sets its `active` property to `true` if it isn't already.
   *
   * @template {FilterProperty<TItem>} TProperty - Type of the sort's property
   * @param {TProperty} property - The property to reference the {@link Sort} by
   */
  const activateSort = useCallback<MutateListSortFn<TItem>>(
    <TProperty extends FilterProperty<TItem>>(property: TProperty) => {
      const sort = sortMap.get(property);
      if (!sort) return;
      activeSortsSetRef.current.add(property);
      // only mutate sort if needed
      if (sort.active) return;
      sortMap.set(property, { ...sort, active: true });
      sortMap.commit();
      // update highlight
      setHighlightedSortProperty(property);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  /**
   * Finds a Sort by its property and sets its `active` property to `false` if it isn't already.
   *
   * @template {FilterProperty<TItem>} TProperty - Type of the sort's property
   * @param {TProperty} property - The property to reference the {@link Sort} by
   */
  const deactivateSort = useCallback<MutateListSortFn<TItem>>(
    <TProperty extends FilterProperty<TItem>>(property: TProperty) => {
      const sort = sortMap.get(property);
      if (!sort) return;
      activeSortsSetRef.current.delete(property);
      // only mutate sort if needed
      if (!sort.active) return;
      sortMap.set(property, { ...sort, active: false });
      sortMap.commit();
      // update highlight
      setHighlightedSortProperty(null);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  /**
   * Finds a Sort by its property and toggles its `active` property.
   *
   * @template {FilterProperty<TItem>} TProperty - Type of the sort's property
   * @param {TProperty} property - The property to reference the {@link Sort} by
   */
  const toggleSort = useCallback<MutateListSortFn<TItem>>(
    <TProperty extends FilterProperty<TItem>>(property: TProperty) => {
      const sort = sortMap.get(property);
      if (!sort) return;
      // toggle state & update set
      const wasActive = !sort.active;
      activeSortsSetRef.current[sort.active ? "delete" : "add"](property);
      // always mutate sort in map
      sortMap.set(property, { ...sort, active: !wasActive });
      sortMap.commit();
      // update highlight
      setHighlightedSortProperty(wasActive ? null : property);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  /**
   * Finds a Sort by its property and toggles its `inverted` property.
   *
   * @template {FilterProperty<TItem>} TProperty - Type of the sort's property
   * @param {TProperty} property - The property to reference the {@link Sort} by
   */
  const invertSort = useCallback<MutateListSortFn<TItem>>(
    <TProperty extends FilterProperty<TItem>>(property: TProperty) => {
      const sort = sortMap.get(property);
      if (!sort) return;
      // toggle state & update set
      invertedSortsSetRef.current[sort.inverted ? "delete" : "add"](property);
      // always mutate sort in map
      sortMap.set(property, { ...sort, inverted: !sort.inverted });
      sortMap.commit();
      // update highlight
      if (sort.active) setHighlightedSortProperty(property);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  /**
   * Finds a Sort by its property and resets its `active` & `inverted` properties to their initially defined state.
   *
   * @template {FilterProperty<TItem>} TProperty - Type of the sort's property
   * @param {TProperty} property - The property to reference the {@link Sort} by
   */
  const resetSort = useCallback<MutateListSortFn<TItem>>(
    <TProperty extends FilterProperty<TItem>>(property: TProperty) => {
      const sort = sortMap.get(property);
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
      sortMap.set(property, {
        ...sort,
        ...sort.defaultState,
      });
      sortMap.commit();

      if (sort.defaultState.active) setHighlightedSortProperty(property);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  /**
   * Finds a Sort by its property and marks it as prioritized, to be used a the primary Sort among other active Sorts
   *
   * @template {FilterProperty<TItem>} TProperty - Type of the sort's property
   * @param {TProperty} property - The property to reference the {@link Sort} by
   */
  const prioritizeSort = useCallback<MutateListSortFn<TItem>>(
    <TProperty extends FilterProperty<TItem>>(property: TProperty) => {
      if (!sortMap.has(property)) return;
      setHighlightedSortProperty(property);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  /**
   * Internal guard higher order function that only executes its callback with the provided property if the Sort it points to is currently active
   *
   * @template {FilterProperty<TItem>} TProperty - Type of the sort's property
   * @param {VoidFn<[TProperty]>} callbackFn - The callback function to execute only the Sort is active
   * @param {TProperty} property - The property to reference the {@link Sort} by
   * @returns {VoidFn} Guarded callback function
   */
  const sortActiveGuard = useCallback(
    <TProperty extends FilterProperty<TItem>>(
      callbackFn: VoidFn<[TProperty]>,
      property: TProperty
    ): VoidFn =>
      () => {
        if (!activeSortsSetRef.current.has(property)) {
          logger.warn(
            `Sort ${property} is not active. Aborted calling ${callbackFn.name}`
          );
          return;
        }
        callbackFn(property);
      },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  /**
   * Derives a {@link Sort}'s `computedOrder` property from its underlying {@link SortData}'s `order` and `inverted` properties and returns it.
   *
   * @template {FilterProperty<TItem>} TProperty - Type of the sort's property
   * @param {SortData<TItem, TProperty>} sortData - The underlying sort data
   * @returns {SortOrder<TItem, TProperty>} The {@link Sort}'s computed order
   */
  const computeSortOrder = useCallback(
    <TProperty extends FilterProperty<TItem>>(
      sortData: SortData<TItem, TProperty>
    ): SortOrder<TItem, TProperty> => {
      if (!sortData.inverted) return sortData.order;
      // invert basic sort order
      if (isSortOrderBasic(sortData.order))
        return SORT_ORDER_BASIC_INVERT_MAP[sortData.order];
      // invert complex sort order;
      return [...sortData.order].reverse() as SortOrderComplex<
        TItem,
        TProperty
      >;
    },
    []
  );

  /**
   * Transforms a {@link SortData} object into a {@link Sort} object,
   * computing and appending its `computedOrder`, `prioritized` and `priority` along with mutation callbacks.
   *
   * @template {FilterProperty<TItem>} TProperty - Type of the sort's property
   * @param {SortData<TItem, TProperty>} sortData - The source {@link SortData}
   * @returns {Sort<TItem, TProperty>} The hydrated {@link Sort}
   */
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
   * Finds a sort by its property, hydrates and returns it if found
   * @template {FilterProperty<TItem>} TProperty - Type of the sort's property
   * @param {TProperty} property - The property to reference the {@link Sort} by
   * @returns {Nullable<Sort<TItem, TProperty>>} The found, hydrated {@link Sort}, or null if not found
   */
  const getSort = useCallback<GetListSortFn<TItem>>(
    <TProperty extends FilterProperty<TItem>>(
      property: TProperty
    ): Nullable<Sort<TItem, TProperty>> => {
      const data = sortMap.get(property);
      if (!data) return null;
      return hydrateSort(data);
    },
    [hydrateSort, sortMap]
  );

  /**
   * Hydrated list Sort objects sorted in priority order
   */
  const sorts = useMemo<Sort<TItem, FilterProperty<TItem>>[]>(() => {
    const hydrated: Sort<TItem, FilterProperty<TItem>>[] = [];
    for (const [, sortData] of sortMap) {
      hydrated.push(hydrateSort(sortData));
    }
    return hydrated.sort((a, b) => a.priority - b.priority);
  }, [hydrateSort, sortMap]);

  /**
   * Subset of {@link sorts} containing only active sorts
   */
  const activeSorts = useMemo<Sort<TItem, FilterProperty<TItem>>[]>(() => {
    if (!activeSortsSetRef.current.size) return [];
    return sorts.filter(({ active }) => active);
  }, [sorts]);

  return {
    sortMap: sortMap,
    sorts,
    activeSorts,
    activateSort,
    deactivateSort,
    highlightedSortProperty,
    invertSort,
    resetSort,
    toggleSort,
    getSort,
  };
}
