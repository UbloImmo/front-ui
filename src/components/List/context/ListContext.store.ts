import { useEffect, useMemo, useState } from "react";

import { useListFilterPresets } from "./ListContext.filterPresets";
import { useListFilters } from "./ListContext.filters";
import { useListOptions } from "./ListContext.options";
import { useListContextSearch } from "./ListContext.search";
import { useListContextSearchParams } from "./ListContext.searchParams";

import type { ListContextConfig, ListContextValue } from "./ListContext.types";

export const useListContextStore = <TItem extends object>({
  useDataProvider,
  ...config
}: ListContextConfig<TItem>): ListContextValue<TItem> => {
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

  const configLoading = useMemo(
    () => filters.filtersLoading || filterPresets.filterPresetsLoading,
    [filterPresets.filterPresetsLoading, filters.filtersLoading]
  );

  useListContextSearchParams(config, options, configLoading);

  const loading = useMemo(
    () => dataProvider.loading || configLoading,
    [dataProvider.loading, configLoading]
  );

  const displayData = useMemo(() => {
    if (loading) return [];
    return data;
  }, [loading, data]);

  useEffect(() => {
    if (loading) return;
    options.applyOptions(optionsArray, search.queryFilters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [optionsArray, loading, search.queryFilters]);

  return {
    ...filterPresets,
    options: optionsArray,
    ...optionMethods,
    ...filters,
    ...search,
    data: displayData,
    itemCount,
    dataProvider,
    loading,
    configLoading,
    contextMissing: false,
  };
};
