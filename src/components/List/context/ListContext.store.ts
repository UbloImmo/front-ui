import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { useListFilterPresets } from "./ListContext.filterPresets";
import { useListFilters } from "./ListContext.filters";
import { useListOptions } from "./ListContext.options";
import { useListContextSearch } from "./ListContext.search";
import { useListContextSearchParams } from "./ListContext.searchParams";
import { useListSorts } from "./ListContext.sorts";

import type {
  TriggerDataProviderFilterFn,
  ListContextConfig,
  ListContextValue,
} from "./ListContext.types";
import type { DataProviderFilterFnConfig, DataProviderType } from "../modules";

export const useListContextStore = <
  TItem extends object,
  TProviderType extends DataProviderType = DataProviderType,
>({
  useDataProvider,
  ...config
}: ListContextConfig<TItem, TProviderType>): ListContextValue<
  TItem,
  TProviderType
> => {
  const [data, setData] = useState<TItem[]>([]);

  const dataProvider = useDataProvider(setData);

  const search = useListContextSearch(config);

  const sorts = useListSorts(config);

  const triggerDataProviderFilter = useCallback<
    TriggerDataProviderFilterFn<TItem>
  >(
    (baseConfig) => {
      const config = {
        ...baseConfig,
        search: search.hydratedSearchConfig,
        selectedOptions: [],
        activeSorts: sorts.activeSorts,
      } as DataProviderFilterFnConfig<TItem>;
      dataProvider.filter(config);
    },
    [dataProvider, search.hydratedSearchConfig, sorts.activeSorts]
  );

  const options = useListOptions(config, triggerDataProviderFilter);

  const filters = useListFilters(config, options);

  const filterPresets = useListFilterPresets(config, options, dataProvider);

  const itemCount = useMemo(() => data.length, [data]);

  const { optionsMap, selectedOptionSignatures, ...optionMethods } = options;

  /**
   * Stringifies the current filtering configuration
   */
  const stringifyFiltersRef = useCallback(() => {
    return JSON.stringify({
      options: Array.from(selectedOptionSignatures),
      search: search.queryFilters,
      activeSorts: sorts.activeSorts,
    });
  }, [search.queryFilters, selectedOptionSignatures, sorts.activeSorts]);

  const previousFiltersRef = useRef<string>("");

  const configLoading = useMemo(
    () => filters.filtersLoading || filterPresets.filterPresetsLoading,
    [filterPresets.filterPresetsLoading, filters.filtersLoading]
  );

  const { initialSynced } = useListContextSearchParams(
    config,
    options,
    configLoading
  );

  const loading = useMemo(() => {
    return dataProvider.loading || configLoading || !initialSynced;
  }, [dataProvider.loading, configLoading, initialSynced]);

  /**
   * Dispatches filtering config updates to the provided data provider hook upon dynamic filtering / sorting / querying changes
   * Only fires if the config changes, the list's config or its provider is not loading and an actual update was needed
   */
  useEffect(() => {
    if (loading) return;
    // abort if config did not change
    const nextFilters = stringifyFiltersRef();
    if (previousFiltersRef.current === nextFilters) return;
    previousFiltersRef.current = nextFilters;
    // clear data if some filters are inactive and have a flag set
    const shouldClear = filters.filters.some(
      ({ active, noResultsIfInactive }) => !active && noResultsIfInactive
    );
    if (shouldClear) {
      // call the data provider's clear method instead of setting data to []
      // to reset any internal states if needed (e.g. pagination cursor)
      dataProvider.clear();
      return;
    }

    options.applyOptions(
      config.searchAsOptions ? search.queryFilters : undefined
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    options.selectedOptionSignatures,
    loading,
    search.queryFilters,
    config.searchAsOptions,
    sorts.activeSorts,
  ]);

  return {
    ...filterPresets,
    optionsMap,
    selectedOptionSignatures,
    ...optionMethods,
    ...filters,
    ...search,
    ...sorts,
    data,
    itemCount,
    dataProvider,
    loading,
    configLoading,
    contextMissing: false,
  };
};
