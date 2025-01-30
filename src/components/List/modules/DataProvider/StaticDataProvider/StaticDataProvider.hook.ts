import { useCallback, useEffect, useMemo, useRef } from "react";

import { filterItems } from "./StaticDataProvider.utils";

import { useAsyncData } from "@utils";

import type {
  DataProviderFetchCountFn,
  DataProviderFilterFn,
  DataProviderFilterFnConfig,
  IDataProvider,
} from "../DataProvider.types";
import type {
  StaticDataProviderParams,
  UseStaticDataProviderFn,
} from "./StaticDataProvider.types";

const DATA_PROVIDER_TYPE = "static" as const;

/**
 * A hook that provides static data provider functionality for a list
 *
 * @template {object} TItem - The type of items in the list
 * @param {TItem[]} initialData - The initial data to populate the list with
 * @param {import("../DataProvider.types").DataProviderSetDataFn<TItem>} setData - A callback function to set the list data
 * @returns {IDataProvider<TItem, "static">} A data provider interface for managing static list data
 *
 * @remarks
 * This data provider fetches all its data once and then filters it using only JS, without re-fetching the data
 */
export const useStaticDataProvider: UseStaticDataProviderFn = <
  TItem extends object,
>(
  ...[initialData, setData]: StaticDataProviderParams<TItem>
): IDataProvider<TItem, typeof DATA_PROVIDER_TYPE> => {
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

  const filter = useCallback<DataProviderFilterFn<TItem>>(
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

  const error = useMemo(() => {
    return !!reactiveData.error;
  }, [reactiveData.error]);

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialData]);

  return {
    type: DATA_PROVIDER_TYPE,
    data: reactiveData.data ?? [],
    loading: reactiveData.isLoading,
    error,
    refetch,
    filter,
    fetchCount,
  };
};
