import {
  isArray,
  isObject,
  objectFromEntries,
  type VoidFn,
} from "@ubloimmo/front-util";
import { useCallback, useEffect, useMemo } from "react";

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
  IsFilterOptionFn,
} from "../modules";

export const useListFilters: UseListFilters = <TItem extends object>(
  config: Pick<ListContextConfig<TItem>, "filters">,
  { options, updateOptionSelection }: UseListOptionsReturn<TItem>
): UseListFiltersReturn<TItem> => {
  const filterDatas = useDataArray(config.filters ?? [], true);

  const buildFilterOption = useCallback(
    (
      optionData: FilterOptionData<TItem>,
      multi = false,
      isFilterOption: IsFilterOptionFn = () => false,
      isFilterDisabled = false
    ): FilterOption<TItem> => {
      const select = () =>
        updateOptionSelection(
          optionData.signature,
          true,
          multi,
          isFilterOption
        );
      const unselect = () =>
        updateOptionSelection(
          optionData.signature,
          false,
          multi,
          isFilterOption
        );
      return {
        ...optionData,
        disabled: optionData.disabled || isFilterDisabled,
        select,
        unselect,
      };
    },
    [updateOptionSelection]
  );

  const buildFilterOptions = useCallback(
    (filterData: FilterData): FilterOption<TItem>[] => {
      const isFilterOption = (optionSignature: FilterSignature) =>
        filterData.optionSignatures.includes(optionSignature);

      // not really efficient since a single `options.filter` could suffice
      // but needed to ensure order
      return filterData.optionSignatures
        .map((optionSignature) => {
          const optionData = options.find(
            ({ signature }) => signature === optionSignature
          );
          if (!optionData) return null;
          return buildFilterOption(
            optionData,
            filterData.multi,
            isFilterOption,
            filterData.disabled
          );
        })
        .filter((maybeOption): maybeOption is FilterOption<TItem> =>
          isObject(maybeOption)
        );
    },
    [options, buildFilterOption]
  );

  const clearFilter = useCallback(
    (filterData: FilterData) => {
      options.updateItemWhere(
        ({ signature }) => filterData.optionSignatures.includes(signature),
        (option) => ({
          ...option,
          selected: option.fixed || option.default,
        })
      );
    },
    [options]
  );

  const buildFilter = useCallback(
    (filterData: FilterData): Filter<TItem> => {
      const filterOptions = buildFilterOptions(filterData);
      const selectedOptions = filterOptions.filter((option) => option.selected);
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

  const applyFallbackToInactiveFilters = useCallback(
    (inactiveFilters: Filter<TItem>[]) => {
      // only keep filters that are allowed to run side effects
      const sideEffectFilters = inactiveFilters.filter(
        ({ optionSignatures, emptyFallback, disabled, active }) => {
          return (
            !active &&
            emptyFallback !== "fixed" &&
            !disabled &&
            !!optionSignatures.length
          );
        }
      );
      // abort if no filters to run side effects on
      if (!sideEffectFilters.length) return;
      // construct map of flags for each filter
      const singleSelectFlagMap = objectFromEntries(
        inactiveFilters.map(({ signature }): [string, boolean] => [
          signature,
          false,
        ])
      );
      // predicate to select one or more options in the all filters based on its multi property
      const shouldSelectOption = (
        option: FilterOptionData<TItem>,
        index: number
      ) => {
        // reset every flag in map on the first option to account for multiple predicate runs
        if (index === 0) {
          for (const filterSignature in singleSelectFlagMap) {
            singleSelectFlagMap[filterSignature] = false;
          }
        }
        // abort if the option is disabled
        if (option.disabled) return false;
        // find the first filter the option belongs to, and abort if it does not belong to any filter
        const optionFilter = sideEffectFilters.find(({ optionSignatures }) =>
          optionSignatures.includes(option.signature)
        );
        if (!optionFilter) return false;
        const { emptyFallback, multi, signature } = optionFilter;
        // do not select multiple in a single filter options if a single option has already been selected
        if (singleSelectFlagMap[signature]) return false;
        // match options based on the emptyFallback property and the option's behavior
        const targetBehavior =
          emptyFallback === "all"
            ? true
            : isArray(emptyFallback)
              ? emptyFallback.some((behavior) => option[behavior])
              : option[emptyFallback];
        // skip further checks if the option does not match the target behavior
        if (!targetBehavior) return false;
        // the option will be selected right after. we set the flag to true if its filter is multi
        // to prevent selecting multiple options on a single filter
        if (!multi) singleSelectFlagMap[signature] = true;
        return true;
      };
      // apply the side effect once for all filters
      options.updateItemWhere(shouldSelectOption, (option) => ({
        ...option,
        selected: true,
      }));
    },
    [options]
  );

  // run side effects on inactive filters
  useEffect(() => {
    const inactiveFilters = filters.filter(({ active }) => !active);
    if (!inactiveFilters.length) return;
    applyFallbackToInactiveFilters(inactiveFilters);
  }, [filters, applyFallbackToInactiveFilters]);

  return {
    filters,
    filtersLoading,
    getFilterById,
    getFilterBySignature,
    getFilterByLabel,
    clearAllFilters,
  };
};
