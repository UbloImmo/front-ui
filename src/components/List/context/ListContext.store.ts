import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { useListFilterPresets } from "./ListContext.filterPresets";
import { useListFilters } from "./ListContext.filters";
import { useListOptions } from "./ListContext.options";
import { useListContextSearch } from "./ListContext.search";
import { useListContextSearchParams } from "./ListContext.searchParams";

import type { ListContextConfig, ListContextValue } from "./ListContext.types";
import type { DataProviderType } from "../modules";

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

  const options = useListOptions(config, dataProvider);

  const filters = useListFilters(config, options);

  const filterPresets = useListFilterPresets(config, options, dataProvider);

  const search = useListContextSearch(config);

  const itemCount = useMemo(() => data.length, [data]);

  const {
    options: { data: optionsArray },
    ...optionMethods
  } = options;

  const stringifyFiltersRef = useCallback(() => {
    return JSON.stringify({
      options: optionsArray,
      search: search.queryFilters,
    });
  }, [optionsArray, search.queryFilters]);

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

  useEffect(() => {
    if (loading) return;
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

    options.applyOptions(optionsArray, search.queryFilters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [optionsArray, loading, search.queryFilters]);

  return {
    ...filterPresets,
    options: optionsArray,
    ...optionMethods,
    ...filters,
    ...search,
    data,
    itemCount,
    dataProvider,
    loading,
    configLoading,
    contextMissing: false,
  };
};
