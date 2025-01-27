import { isArray, isNullish, type Nullable } from "@ubloimmo/front-util";
import { clamp } from "lodash";
import { useCallback, useMemo, useRef, useState } from "react";

import { useDynamicDataProvider } from "../DynamicDataProvider";
import {
  PaginationAfter,
  type PaginatedDataProviderParams,
  type UsePaginatedDataProviderFn,
} from "./PaginatedDataProvider.types";

import { delay, nextTick, useLogger } from "@utils";

import type {
  DataProviderFilterFn,
  DataProviderFilterFnConfig,
  DataProviderSetDataFn,
  IDataProvider,
} from "../DataProvider.types";

const DATA_PROVIDER_TYPE = "paginated" as const;
const NO_FILTERS_CONFIG: DataProviderFilterFnConfig<object> = {
  filters: [],
};
const NO_FILTERS_CONFIG_SIGNATURE = JSON.stringify(NO_FILTERS_CONFIG);

/**
 * A hook that provides paginated data provider functionality for a list
 *
 * @template {object} TItem - The type of items in the list
 * @param {import("./PaginatedDataProvider.types").PaginatedDataProviderParams<TItem>[0]} fetchPage - A function that fetches a page of data
 * @param {import("../DataProvider.types").DataProviderSetDataFn<TItem>} setData - A callback function to set the list data
 * @param {number} [pageSize=25] - The number of items per page
 * @returns {import("../DataProvider.types").IDataProvider<TItem, "paginated">} A data provider interface for managing paginated list data
 *
 * @remarks
 * This data provider fetches its data page by page and relies on the server to filter the data
 */
export const usePaginatedDataProvider: UsePaginatedDataProviderFn = <
  TItem extends object,
>(
  ...[fetchPage, setData, pageSize = 25]: PaginatedDataProviderParams<TItem>
): IDataProvider<TItem, typeof DATA_PROVIDER_TYPE> => {
  /** Logger instance for the hook */
  const logger = useLogger("usePaginatedDataProvider");

  /**
   * A ref that holds the last filter config
   * @type {React.MutableRefObject<DataProviderFilterFnConfig<TItem>>}
   * @remarks Used to keep the same filters when fetching the next page
   */
  const lastFilterConfig = useRef<DataProviderFilterFnConfig<TItem>>(
    NO_FILTERS_CONFIG as DataProviderFilterFnConfig<TItem>,
  );

  /**
   * A ref that holds the last filter config, stringified
   * @type {React.MutableRefObject<Nullable<string>>}
   * @remarks Used to check if the filters have changed and reset the page accordingly
   */
  const lastFilterConfigSignature = useRef<Nullable<string>>(
    NO_FILTERS_CONFIG_SIGNATURE,
  );

  /**
   * Ref holding accumulated data across pagination
   * @type {React.MutableRefObject<TItem[]>}
   */
  const accumulatedDataRef = useRef<TItem[]>([]);

  /**
   * Ref holding pagination cursor
   * @type {React.MutableRefObject<PaginationAfter>}
   */
  const afterRef = useRef<PaginationAfter>(null);

  /**
   * State indicating if there are more pages to load
   * @type {boolean}
   */
  const [hasNextPage, setHasNextPage] = useState(false);

  /**
   * Internal state holding current page data
   * @type {TItem[]}
   */
  const [internalData, setInternalData] = useState<TItem[]>([]);

  /**
   * Memoized page size clamped between 1 and Infinity
   * @type {number}
   */
  const safePageSize = useMemo(() => clamp(pageSize, 1, Infinity), [pageSize]);

  /**
   * Fetches a page of data with the given filter config
   * @param {DataProviderFilterFnConfig<TItem>} config - Filter configuration
   * @returns {Promise<TItem[]>} Array of items for the page
   */
  const fetchPageData = useCallback(
    async (config: DataProviderFilterFnConfig<TItem>) => {
      try {
        const currentPageData = await fetchPage(
          config,
          afterRef.current,
          safePageSize,
        );
        afterRef.current = currentPageData?.after ?? null;
        setHasNextPage(!isNullish(afterRef.current));

        if (!("pageData" in currentPageData)) return [];
        if (!isArray(currentPageData.pageData)) return [];

        return currentPageData.pageData;
      } catch (e) {
        logger.error(e);
        return [];
      }
    },
    [logger, fetchPage, safePageSize],
  );

  /**
   * Updates internal state and parent data with new items
   * @param {TItem[]} data - New items to add
   */
  const setListData = useCallback<DataProviderSetDataFn<TItem>>(
    (data) => {
      accumulatedDataRef.current = [...accumulatedDataRef.current, ...data];
      setInternalData(accumulatedDataRef.current);
      setData(accumulatedDataRef.current);
    },
    [setData],
  );

  const {
    filter: filterDynamic,
    refetch: refetchDynamic,
    fetchCount,
    loading,
    error,
  } = useDynamicDataProvider(fetchPageData, setListData);

  /**
   * Resets pagination state to initial values
   */
  const resetPagination = useCallback(() => {
    afterRef.current = null;
    accumulatedDataRef.current = [];
    lastFilterConfig.current = NO_FILTERS_CONFIG;
    lastFilterConfigSignature.current = NO_FILTERS_CONFIG_SIGNATURE;
    setHasNextPage(false);
  }, []);

  /**
   * Stores the current filter config and its signature
   * @param {DataProviderFilterFnConfig<TItem>} config - Filter configuration to store
   */
  const storeLastFilterConfig = useCallback(
    (config: DataProviderFilterFnConfig<TItem>) => {
      lastFilterConfig.current = config;
      lastFilterConfigSignature.current = JSON.stringify(config);
    },
    [],
  );

  /**
   * Filters data with the given config
   * @param {DataProviderFilterFnConfig<TItem>} config - Filter configuration
   */
  const filter = useCallback<DataProviderFilterFn<TItem>>(
    (config) => {
      const stringifiedConfig = JSON.stringify(config);
      if (lastFilterConfigSignature.current !== stringifiedConfig) {
        resetPagination();
        storeLastFilterConfig(config);
      }
      nextTick(() => filterDynamic(config));
    },
    [filterDynamic, resetPagination, storeLastFilterConfig],
  );

  /**
   * Refetches all data after resetting pagination
   * @returns {Promise<void>}
   */
  const refetch = useCallback(async () => {
    resetPagination();
    // next tick to ensure the filter is applied
    await delay(0);
    return await refetchDynamic();
  }, [refetchDynamic, resetPagination]);

  /**
   * Loads the next page of data if available
   */
  const nextPage = useCallback(() => {
    if (!hasNextPage) return;
    if (loading) return;
    filter(lastFilterConfig.current);
  }, [filter, hasNextPage, loading]);

  return {
    type: DATA_PROVIDER_TYPE,
    filter,
    fetchCount,
    data: internalData,
    loading,
    error,
    refetch,
    hasNextPage,
    nextPage,
    pageSize: safePageSize,
  };
};
