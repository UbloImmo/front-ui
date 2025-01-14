import { useCallback, useEffect, useRef } from "react";

import { filterItems } from "./StaticDataProvider.utils";

import { useAsyncData } from "@utils";

import type {
  DataProviderFetchCountFn,
  DataProviderFilterFnConfig,
  IDataProvider,
} from "../DataProvider.types";
import type {
  StaticDataProviderParams,
  UseStaticDataProviderFn,
} from "./StaticDataProvider.types";

export const useStaticDataProvider: UseStaticDataProviderFn = <
  TItem extends object
>(
  ...[initialData, setData]: StaticDataProviderParams<TItem>
): IDataProvider<TItem> => {
  const staticDataRef = useRef<TItem[]>([]);

  const reactiveData = useAsyncData(initialData, {
    onSuccess: (data) => {
      staticDataRef.current = data;
      setData(data);
    },
  });

  const refetch = useCallback(async () => {
    const state = await reactiveData.refetch();
    return state.data ?? [];
  }, [reactiveData]);

  const filter = useCallback(
    (config: DataProviderFilterFnConfig<TItem>) => {
      const filteredData = filterItems(staticDataRef.current, config);
      setData(filteredData);
    },
    [setData]
  );

  const fetchCount = useCallback<DataProviderFetchCountFn<TItem>>(
    (config: DataProviderFilterFnConfig<TItem>) => {
      const filteredData = filterItems(staticDataRef.current, config);
      return filteredData.length;
    },
    []
  );

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialData]);

  return {
    data: reactiveData.data ?? [],
    loading: reactiveData.isLoading,
    refetch,
    filter,
    fetchCount,
  };
};
