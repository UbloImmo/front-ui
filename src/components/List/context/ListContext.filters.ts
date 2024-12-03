import { useCallback, useMemo } from "react";

import { useDataArray } from "@utils";

import type {
  GetFilterByIdFn,
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
  IFilter,
  IFilterOption,
  IsFilterOptionFn,
} from "../modules";
import type { VoidFn } from "@ubloimmo/front-util";

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
    ): IFilterOption<TItem> => {
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
    (filterData: FilterData): IFilterOption<TItem>[] => {
      const isFilterOption = (optionSignature: FilterSignature) =>
        filterData.optionSignatures.includes(optionSignature);

      return options
        .filter(({ signature }) =>
          filterData.optionSignatures.includes(signature)
        )
        .map((optionData) =>
          buildFilterOption(
            optionData,
            filterData.multi,
            isFilterOption,
            filterData.disabled
          )
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
    (filterData: FilterData): IFilter<TItem> => {
      const filterOptions = buildFilterOptions(filterData);
      const selectedOptions = filterOptions.filter((option) => option.selected);
      const active = !!selectedOptions.length;

      const clear = () => clearFilter(filterData);

      const selectAll = () =>
        selectedOptions.forEach((option) => option.select());

      return {
        ...filterData,
        options: filterOptions,
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
    return filterDatas.data.map((item): IFilter<TItem> => {
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

  const clearAllFilters = useCallback<VoidFn>(
    () => filters.forEach((filter) => filter.clear()),
    [filters]
  );

  return {
    filters,
    filtersLoading,
    getFilterById,
    getFilterBySignature,
    clearAllFilters,
  };
};
