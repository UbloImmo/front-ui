import { isArray, type VoidFn } from "@ubloimmo/front-util";
import { useCallback, useEffect, useMemo, useRef } from "react";

import { useDataArray } from "@utils";

import type {
  GetFilterByIdFn,
  GetFilterByLabelFn,
  GetFilterBySignatureFn,
  ListContextConfig,
  UseListFilters,
  UseListFiltersReturn,
  UseListOptionsReturn,
} from "./ListContext.types";
import type {
  FilterData,
  FilterOptionData,
  FilterSignature,
  Filter,
  FilterOption,
} from "../modules";

export const useListFilters: UseListFilters = <TItem extends object>(
  config: Pick<ListContextConfig<TItem>, "filters">,
  { optionsMap, updateOptionSelection }: UseListOptionsReturn<TItem>
): UseListFiltersReturn<TItem> => {
  const filterDatas = useDataArray(config.filters ?? [], true);

  const buildFilterOption = useCallback(
    (
      optionData: FilterOptionData<TItem>,
      filterData: FilterData
    ): FilterOption<TItem> => {
      const select = () =>
        updateOptionSelection(optionData.signature, true, filterData);
      const unselect = () =>
        updateOptionSelection(optionData.signature, false, filterData);
      return {
        ...optionData,
        disabled: optionData.disabled || filterData.disabled,
        select,
        unselect,
      };
    },
    [updateOptionSelection]
  );

  const buildFilterOptions = useCallback(
    (
      filterData: FilterData
    ): Record<"filterOptions" | "selectedOptions", FilterOption<TItem>[]> => {
      const filterOptions: FilterOption<TItem>[] = [];
      const selectedOptions: FilterOption<TItem>[] = [];
      for (const optionSignature of filterData.optionSignatures) {
        const optionData = optionsMap.get(optionSignature);
        if (!optionData) continue;
        const filterOption = buildFilterOption(optionData, filterData);
        filterOptions.push(filterOption);
        if (filterOption.selected) selectedOptions.push(filterOption);
      }
      return { filterOptions, selectedOptions };
    },
    [optionsMap, buildFilterOption]
  );

  const clearFilter = useCallback(
    (filterData: FilterData) => {
      if (!filterData.optionSignatures.size) return;

      let needsCommit = false;
      for (const signature of filterData.optionSignatures) {
        const option = optionsMap.get(signature);
        if (!option) continue;
        const selected = option.fixed || option.default;
        if (selected === option.selected) continue;
        updateOptionSelection(signature, selected, undefined, false);
        needsCommit = true;
      }
      if (needsCommit) optionsMap.commit();
    },
    [optionsMap, updateOptionSelection]
  );

  const buildFilter = useCallback(
    (filterData: FilterData): Filter<TItem> => {
      const { filterOptions, selectedOptions } = buildFilterOptions(filterData);
      const active = !!selectedOptions.length;

      const clear = () => clearFilter(filterData);

      const selectAll = () =>
        selectedOptions.forEach((option) => option.select());

      return {
        ...filterData,
        options: filterOptions,
        optionDividers: filterData.optionDividers ?? [],
        active,
        selectedOptions,
        clear,
        selectAll,
      };
    },
    [buildFilterOptions, clearFilter]
  );

  const filtersLoading = useMemo(() => {
    return filterDatas.data.some(({ loading }) => loading);
  }, [filterDatas]);

  const filters = useMemo(() => {
    return filterDatas.data.map((item): Filter<TItem> => {
      return buildFilter(item);
    });
  }, [filterDatas, buildFilter]);

  const getFilterById = useCallback<GetFilterByIdFn<TItem>>(
    (filterId: string) => {
      return filters.find(({ id }) => id === filterId) ?? null;
    },
    [filters]
  );

  const getFilterBySignature = useCallback<GetFilterBySignatureFn<TItem>>(
    (filterSignature: FilterSignature) => {
      return (
        filters.find(({ signature }) => signature === filterSignature) ?? null
      );
    },
    [filters]
  );

  const getFilterByLabel = useCallback<GetFilterByLabelFn<TItem>>(
    (filterLabel: string) => {
      return filters.find(({ label }) => label === filterLabel) ?? null;
    },
    [filters]
  );

  const clearAllFilters = useCallback<VoidFn>(
    () => filters.forEach((filter) => filter.clear()),
    [filters]
  );

  /**
   * Scratch reusable filter signature set
   */
  const scratchFilterSignatureSet = useRef<Set<FilterSignature>>(new Set());

  const applyFallbackToInactiveFilters = useCallback(
    (inactiveFilters: Filter<TItem>[]) => {
      // clear scratch set to use it to keep track of already affected options
      scratchFilterSignatureSet.current.clear();

      let needsCommit = false;

      for (const filter of inactiveFilters) {
        // only keep filters that are allowed to run side effects
        if (
          filter.active ||
          filter.disabled ||
          filter.emptyFallback === "fixed" ||
          !filter.optionSignatures.size
        )
          continue;

        for (const optionSignature of filter.optionSignatures) {
          // skip option if it has already been affected
          if (scratchFilterSignatureSet.current.has(optionSignature)) continue;
          // abort if option is missing or disabled
          const option = optionsMap.get(optionSignature);
          if (!option) continue;
          if (option.disabled) continue;

          // find out whether option needs to be selected based on its parent filter's fallback behavior
          const selected =
            filter.emptyFallback === "all"
              ? true
              : isArray(filter.emptyFallback)
                ? filter.emptyFallback.some((behavior) => option[behavior])
                : option[filter.emptyFallback];
          // skip if option does not need to be selected based on behavior
          if (!selected) continue;

          // actually select option without causing a renderer, while staging a commit
          updateOptionSelection(optionSignature, selected, undefined, false);
          needsCommit = true;

          // mark option as already affected so as not to overwrite its selection
          // if it is shared by multiple filters
          scratchFilterSignatureSet.current.add(optionSignature);

          // non-multi filters only need to keep one option selected
          // so we skip iterating over its remaining options by breaking the inner loop
          if (!filter.multi) break;
        }
      }
      // trigger a rerender with updated options map
      if (needsCommit) optionsMap.commit();
    },
    [optionsMap, updateOptionSelection]
  );

  // run side effects on inactive filters
  useEffect(() => {
    const inactiveFilters = filters.filter(({ active }) => !active);
    if (!inactiveFilters.length) return;
    applyFallbackToInactiveFilters(inactiveFilters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  return {
    filters,
    filtersLoading,
    getFilterById,
    getFilterBySignature,
    getFilterByLabel,
    clearAllFilters,
  };
};
