import {
  isFunction,
  type Optional,
  type AsyncFn,
  type MaybeAsyncFn,
  type Nullable,
  type NullishPrimitives,
  isArray,
  type VoidFn,
  type GenericFn,
} from "@ubloimmo/front-util";
import { useCallback, useEffect, useState, type SetStateAction } from "react";

import type {
  DataArrayAtFn,
  DataArrayFilterFn,
  DataArrayFindFn,
  DataArrayFindIndexFn,
  DataArrayPushFn,
  DataArrayRemoveFn,
  DataArrayUnshiftFn,
  DataArrayUpdateItemWhereFn,
  UseDataArray,
  UseDataArrayReturn,
} from "@/types";

type UseAsyncDataOnSuccessFn<TData extends NullishPrimitives> = MaybeAsyncFn<
  [TData]
>;

type UseAsyncDataOnErrorFn = MaybeAsyncFn<[Error]>;

type UseAsyncDataOptions<TData extends NullishPrimitives> = {
  defaultValue?: TData;
  onSuccess?: UseAsyncDataOnSuccessFn<TData>;
  onError?: UseAsyncDataOnErrorFn;
};

type UseAsyncDataState<TData extends NullishPrimitives> = {
  data: Optional<TData>;
  isLoading: boolean;
  error: Nullable<Error>;
};

type UseAsyncDataLoadFn<TData extends NullishPrimitives> = (
  options?: Optional<UseAsyncDataOptions<TData>>
) => Promise<UseAsyncDataState<TData>>;

type UseAsyncDataReturn<TData extends NullishPrimitives> =
  UseAsyncDataState<TData> & {
    refetch: UseAsyncDataLoadFn<TData>;
  };

/**
 * A custom React hook for handling asynchronous data loading.
 *
 * @template {NullishPrimitives} TData - The type of data to be loaded, extending NullishPrimitives.
 *
 * @param {TData | MaybeAsyncFn<[], TData>} dataOrLoadingFn - Either the data itself or a function to load the data.
 * @param {UseAsyncDataOptions<TData>} [options] - Optional options for the hook.
 *
 * @returns {UseAsyncDataReturn<TData>} An object containing the following properties:
 *   @property {Optional<TData>} data - The loaded data, or undefined if not yet loaded.
 *   @property {boolean} isLoading - Indicates whether the data is currently being loaded.
 *   @property {Nullable<Error>} error - Any error that occurred during data loading, or null if no error.
 *   @property {AsyncFn<[], UseAsyncDataState<TData>>} refetch - A function to manually trigger a reload of the data.
 */
export const useAsyncData = <TData extends NullishPrimitives>(
  dataOrLoadingFn: TData | MaybeAsyncFn<[], TData>,
  options?: UseAsyncDataOptions<TData>
): UseAsyncDataReturn<TData> => {
  /**
   * The loaded data, or undefined if not yet loaded.
   */
  const [data, setData] = useState<Optional<TData>>(
    isFunction<MaybeAsyncFn<[], TData>>(dataOrLoadingFn)
      ? undefined
      : dataOrLoadingFn
  );

  /**
   * Indicates whether the data is currently being loaded.
   */
  const [isLoading, setIsLoading] = useState(
    !isFunction<MaybeAsyncFn<[], TData>>(dataOrLoadingFn)
  );

  /**
   *Any error that occurred during data loading, or null if no error.
   */
  const [error, setError] = useState<Nullable<Error>>(null);

  /**
   * Triggers the success or error callbacks based on the current state.
   * @param {UseAsyncDataState<TData>} state - The current state of the async data.
   * @param {UseAsyncDataOptions<TData>} [currentOptions] - Optional current options for callbacks.
   */
  const triggerLoadCallbacks = useCallback(
    (
      state: UseAsyncDataState<TData>,
      currentOptions?: UseAsyncDataOptions<TData>
    ) => {
      if (state.error) {
        if (options?.onError) options.onError(state.error);
        if (currentOptions?.onError) currentOptions.onError(state.error);
      }
      if (state.data) {
        if (options?.onSuccess) options.onSuccess(state.data);
        if (currentOptions?.onSuccess) currentOptions.onSuccess(state.data);
      }
    },
    [options]
  );

  /**
   * Loads or reloads the data.
   * @param {UseAsyncDataOptions<TData>} [currentOptions] - Optional options for this load operation.
   * @returns {Promise<UseAsyncDataState<TData>>} A promise that resolves to the new state.
   */
  const loadData = useCallback<UseAsyncDataLoadFn<TData>>(
    async (currentOptions?: UseAsyncDataOptions<TData>) => {
      let state: UseAsyncDataState<TData> = {
        data,
        error,
        isLoading,
      };
      if (isFunction<MaybeAsyncFn<[], TData>>(dataOrLoadingFn)) {
        setIsLoading(true);
        try {
          const loadedData = await dataOrLoadingFn();
          state = {
            data: loadedData,
            error: null,
            isLoading: false,
          };
        } catch (e) {
          state = {
            data: state.data, // preserve previous data if an error occurs
            error: e as Error,
            isLoading: false,
          };
        }
      } else {
        state = {
          data: dataOrLoadingFn,
          error: null,
          isLoading: false,
        };
      }
      setData(state.data);
      setError(state.error);
      setIsLoading(state.isLoading);
      triggerLoadCallbacks(state, currentOptions);

      return state;
    },
    [data, dataOrLoadingFn, error, isLoading, triggerLoadCallbacks]
  );

  // trigger load on mount
  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data, isLoading, error, refetch: loadData };
};

/**
 * Creates a Promise that resolves after a specified delay.
 * @param {number} ms - The delay in milliseconds.
 * @returns {Promise<void>} A Promise that resolves after the specified delay.
 */
export const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Creates a delayed response by waiting for a specified time before returning the given data.
 *
 * @template TData The type of the response data.
 * @param {TData} response The data to be returned after the delay.
 * @param {number} ms The delay in milliseconds.
 * @returns {Promise<TData>} A Promise that resolves with the response data after the specified delay.
 */
export const delayedResponse = async <TData>(
  response: TData,
  ms: number
): Promise<TData> => {
  await delay(ms);
  return response;
};

/**
 * Creates a function that returns a delayed response.
 *
 * @template TData The type of the response data.
 * @param {TData} response The data to be returned after the delay.
 * @param {number} ms The delay in milliseconds.
 * @returns {AsyncFn<[], TData>} An asynchronous function that, when called, returns a Promise resolving to the response data after the specified delay.
 */
export const createDelayedResponse =
  <TData>(response: TData, ms: number): AsyncFn<[], TData> =>
  async (): Promise<TData> => {
    return await delayedResponse(response, ms);
  };

/**
 * Loads data from either a static array or an async function.
 * If given an array, returns it directly.
 * If given an async function, executes it and returns the result.
 * Returns empty array if async function throws an error.
 *
 * @template TData The type of data elements
 * @param {TData[] | AsyncFn<[], TData[]>} dataToLoad - Array of data or async function that returns array of data
 * @returns {Promise<TData[]>} Promise that resolves to the loaded data array
 */
const loadData = async <TData>(
  dataToLoad: TData[] | AsyncFn<[], TData[]>
): Promise<TData[]> => {
  if (isArray(dataToLoad)) return dataToLoad;
  try {
    return await dataToLoad();
  } catch (error) {
    console.error(error);
    return [];
  }
};

/**
 * A custom React hook for managing an array of data that can be loaded asynchronously.
 * Provides array manipulation methods and handles loading states.
 *
 * @template TData The type of elements in the array
 *
 * @param {TData[] | AsyncFn<[], TData[]>} rootData - Initial array data or async function that returns array data
 * @param {boolean} [reactive=false] - Whether to reload data when rootData reference changes
 *
 * @returns {UseDataArrayReturn<TData>} An object containing the data array, loading state, and array manipulation methods
 */
export const useDataArray: UseDataArray = <TData>(
  rootData: TData[] | AsyncFn<[], TData[]>,
  reactive = false,
  onDataChange?: VoidFn<[newData: TData[]]>
): UseDataArrayReturn<TData> => {
  const [data, setData] = useState<TData[]>(isArray(rootData) ? rootData : []);

  const updateData = useCallback(
    (newData: SetStateAction<TData[]>) => {
      let updatedData: TData[];
      setData((prev) => {
        if (isFunction<GenericFn<[TData[]], TData[]>>(newData)) {
          updatedData = newData(prev);
        } else {
          updatedData = newData;
        }
        if (onDataChange) onDataChange(updatedData);
        return updatedData;
      });
    },
    [onDataChange]
  );

  const [isLoading, setIsLoading] = useState<boolean>(!isArray(rootData));

  useEffect(() => {
    const loadAsyncData = async () => {
      setIsLoading(true);
      const loadedData = await loadData(rootData);
      updateData(loadedData);
      setIsLoading(false);
    };
    loadAsyncData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const refreshData = async () => {
      if (!reactive) return;
      setIsLoading(true);
      const loadedData = await loadData(rootData);
      const isDifferent = JSON.stringify(loadedData) !== JSON.stringify(data);
      if (isDifferent) updateData(loadedData);
      setIsLoading(false);
    };

    refreshData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reactive, rootData]);

  const updateItemWhere = useCallback<DataArrayUpdateItemWhereFn<TData>>(
    (predicate, updater) => {
      updateData((prev) =>
        prev.map((item, index) => {
          if (predicate(item, index)) return updater(item, index);
          return item;
        })
      );
    },
    [updateData]
  );

  /**
   * Finds the first element in the array that satisfies the provided predicate function.
   *
   * @param {DataArrayItemPredicate<TData>} predicate - Function to test each element, taking the element and its index
   * @returns {Optional<TData>} The first matching element, or undefined if no match is found
   */
  const find = useCallback<DataArrayFindFn<TData>>(
    (predicate) => {
      return data.find(predicate);
    },
    [data]
  );

  /**
   * Returns the index of the first element in the array that satisfies the provided predicate function.
   *
   * @param {DataArrayItemPredicate<TData>} predicate - Function to test each element, taking the element and its index
   * @returns {number} The index of the first matching element, or -1 if no match is found
   */
  const findIndex = useCallback<DataArrayFindIndexFn<TData>>(
    (predicate) => {
      return data.findIndex(predicate);
    },
    [data]
  );

  /**
   * Adds a new item to the end of the array.
   *
   * @param {TData} newItem - The item to add to the end of the array
   */
  const push = useCallback<DataArrayPushFn<TData>>(
    (newItem) => {
      updateData((prev) => [...prev, newItem]);
    },
    [updateData]
  );

  /**
   * Removes all elements from the array that satisfy the provided predicate function.
   *
   * @param {DataArrayItemPredicate<TData>} predicate - Function to test each element, taking the element and its index
   */
  const remove = useCallback<DataArrayRemoveFn<TData>>(
    (predicate) => {
      updateData((prev) =>
        prev.filter((item, index) => !predicate(item, index))
      );
    },
    [updateData]
  );

  /**
   * Adds a new item to the beginning of the array.
   *
   * @param {TData} newItem - The item to add to the beginning of the array
   */
  const unshift = useCallback<DataArrayUnshiftFn<TData>>(
    (newItem) => {
      updateData((prev) => [newItem, ...prev]);
    },
    [updateData]
  );

  /**
   * Returns the element at the specified index in the array, or the default value if the index is out of bounds.
   *
   * @param {number} index - The index of the element to retrieve
   * @param {TData} defaultValue - The value to return if the index is out of bounds
   * @returns {TData} The element at the specified index, or the default value if the index is out of bounds
   */
  const at = useCallback<DataArrayAtFn<TData>>(
    (index, defaultValue) => {
      if (index < 0 || index >= data.length) return defaultValue;
      return data[index] ?? defaultValue;
    },
    [data]
  );

  /**
   * Filters the array based on the provided predicate function.
   *
   * @param {DataArrayItemPredicate<TData>} predicate - Function to test each element, taking the element and its index
   * @returns {TData[]} A new array containing all elements that satisfy the predicate
   */
  const filter = useCallback<DataArrayFilterFn<TData>>(
    (predicate) => {
      return [...data].filter(predicate);
    },
    [data]
  );

  return {
    data,
    isLoading,
    push,
    remove,
    updateItemWhere,
    unshift,
    setData,
    find,
    findIndex,
    at,
    filter,
  };
};
