import { useCallback, useEffect, useRef } from "react";

import {
  DataProviderFetchCountFn,
  type DataProviderFilterFnConfig,
  type DataProviderParams,
  type IDataProvider,
  type UseStaticDataProviderFn,
} from "../DataProvider.types";
import { filterData } from "./StaticDataProvider.utils";

import { useAsyncData } from "@utils";

export const useStaticDataProvider: UseStaticDataProviderFn = <
  TItem extends object
>(
  ...[initialData, setData]: DataProviderParams<TItem>
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
      const filteredData = filterData(staticDataRef.current, config);
      setData(filteredData);
    },
    [setData]
  );

  const fetchCount = useCallback<DataProviderFetchCountFn<TItem>>(
    (config: DataProviderFilterFnConfig<TItem>) => {
      const filteredData = filterData(staticDataRef.current, config);
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
