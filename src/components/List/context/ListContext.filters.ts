import { isObject, type VoidFn } from "@ubloimmo/front-util";
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

  // TODO: try to refactor in order to apply side effects to all inactive filters in a single pass
  const applyFallbackToInactiveFilter = useCallback(
    ({ optionSignatures, emptyFallback, multi, disabled }: Filter<TItem>) => {
      // prevent disabled filters from having any side effect
      if (disabled) return;
      // as `fixed` is the default behavior, no side effect is needed
      if (emptyFallback === "fixed") return;
      // if the filter has no options, no side effect is needed
      if (!optionSignatures.length) return;

      // flag to prevent selecting multiple options if the filter is inactive
      let singleOptionHasBeenSelected = false;

      // filter predicate to select one or more options in the filter based on its multi property
      const isFilterOption = (
        { signature, ...option }: FilterOptionData<TItem>,
        index: number
      ) => {
        // reset the flag on the first option to account for multiple predicate runs
        if (index === 0) {
          singleOptionHasBeenSelected = false;
        }
        // do not select multiple options if a single option has already been selected
        if (singleOptionHasBeenSelected) return false;
        // do not select disabled options
        if (option.disabled) return false;
        // match options based on the emptyFallback property and the option's behavior
        const targetBehavior =
          emptyFallback === "all" ? true : option[emptyFallback];
        // skip further checks if the option does not match the target behavior
        if (!targetBehavior) return false;
        // check if the option is in the filter
        const inFilterOptions = optionSignatures.includes(signature);
        // select the option if it matches the target behavior and if the filter is not multi-select
        const matches = inFilterOptions && targetBehavior;
        // set the flag if the option is selected and if the filter is not multi-select
        if (matches && !multi) singleOptionHasBeenSelected = true;
        // return the result of the check
        return matches;
      };
      // apply the side effect
      options.updateItemWhere(isFilterOption, (option) => ({
        ...option,
        selected: true,
      }));
    },
    [options]
  );

  // const applyFallbackToInactiveFilters = useCallback(
  //   (inactiveFilters: Filter<TItem>[]) => {
  //     // prevent disabled filters from having any side effect
  //     if (disabled) return;
  //     // as `fixed` is the default behavior, no side effect is needed
  //     if (emptyFallback === "fixed") return;
  //     // if the filter has no options, no side effect is needed
  //     if (!optionSignatures.length) return;

  //     // flag to prevent selecting multiple options if the filter is inactive
  //     let singleOptionHasBeenSelected = false;

  //     // filter predicate to select one or more options in the filter based on its multi property
  //     const isFilterOption = ({
  //       signature,
  //       ...option
  //     }: FilterOptionData<TItem>) => {
  //       // do not select disabled options
  //       if (option.disabled) return false;
  //       // do not select multiple options if a single option has already been selected
  //       if (singleOptionHasBeenSelected) return false;
  //       // match options based on the emptyFallback property and the option's behavior
  //       const targetBehavior =
  //         emptyFallback === "all" ? true : option[emptyFallback];
  //       // skip further checks if the option does not match the target behavior
  //       if (!targetBehavior) return false;
  //       // check if the option is in the filter
  //       const inFilterOptions = optionSignatures.includes(signature);
  //       // select the option if it matches the target behavior and if the filter is not multi-select
  //       const matches = inFilterOptions && targetBehavior;
  //       // set the flag if the option is selected and if the filter is not multi-select
  //       if (matches && !multi) singleOptionHasBeenSelected = true;
  //       // return the result of the check
  //       return matches;
  //     };
  //     // apply the side effect
  //     options.updateItemWhere(isFilterOption, (option) => ({
  //       ...option,
  //       selected: true,
  //     }));
  //   },
  //   [options]
  // );

  // run side effects on inactive filters
  useEffect(() => {
    const inactiveFilters = filters.filter(({ active }) => !active);
    if (!inactiveFilters.length) return;
    console.debug("run inactive filter side effects");
    inactiveFilters.forEach(applyFallbackToInactiveFilter);
  }, [filters, applyFallbackToInactiveFilter]);

  return {
    filters,
    filtersLoading,
    getFilterById,
    getFilterBySignature,
    getFilterByLabel,
    clearAllFilters,
  };
};
