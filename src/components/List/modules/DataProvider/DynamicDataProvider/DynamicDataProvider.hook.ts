import { useCallback, useMemo } from "react";

import { useAsyncData, useLogger } from "@utils";

import type {
  DynamicDataProviderParams,
  UseDynamicDataProviderFn,
} from "./DynamicDataProvider.types";
import type {
  DataProviderFetchCountFn,
  DataProviderFilterFn,
  DataProviderFilterFnConfig,
  IDataProvider,
} from "../DataProvider.types";

const DATA_PROVIDER_TYPE = "dynamic" as const;

/**
 * A hook that provides dynamic data provider functionality for a list
 *
 * @template {object} TItem - The type of items in the list
 * @param {import("./DynamicDataProvider.types").DynamicDataProviderParams<TItem>[0]} fetchData - A function that fetches and filters the data
 * @param {import("../DataProvider.types").DataProviderSetDataFn<TItem>} setData - A callback function to set the list data
 * @returns {IDataProvider<TItem, "dynamic">} A data provider interface for managing dynamic list data
 *
 * @remarks
 * This data provider fetches its data every time the filters change and relies on the server to filter the data
 */
export const useDynamicDataProvider: UseDynamicDataProviderFn = <
  TItem extends object
>(
  ...[fetchData, setData]: DynamicDataProviderParams<TItem>
): IDataProvider<TItem, typeof DATA_PROVIDER_TYPE> => {
  const logger = useLogger("DynamicDataProvider");
  const reactiveData = useAsyncData<
    TItem[],
    [config: DataProviderFilterFnConfig<TItem>]
  >(fetchData, {
    params: [
      {
        filters: [],
      },
    ],
    onSuccess: (data) => {
      setData(data);
    },
    onError: (error) => {
      logger.error("Failed to fetch dynamic data", "LoadError");
      logger.error(error);
    },
  });

  const refetch = useCallback(async () => {
    const state = await reactiveData.refetch();
    return state.data ?? [];
  }, [reactiveData]);

  const filter = useCallback<DataProviderFilterFn<TItem>>(
    (config) => {
      reactiveData.refetch({
        params: [config],
      });
    },
    [reactiveData]
  );

  const fetchCount = useCallback<DataProviderFetchCountFn<TItem>>(
    async (config: DataProviderFilterFnConfig<TItem>) => {
      const filteredData = await fetchData(config);
      return filteredData.length;
    },
    [fetchData]
  );

  const error = useMemo(() => {
    return !!reactiveData.error;
  }, [reactiveData.error]);

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
