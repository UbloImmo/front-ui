import {
  isFunction,
  type Optional,
  type AsyncFn,
  type MaybeAsyncFn,
  type Nullable,
  type NullishPrimitives,
} from "@ubloimmo/front-util";
import { useCallback, useEffect, useState } from "react";

type UseAsyncDataOnSuccessFn<TData extends NullishPrimitives> = MaybeAsyncFn<
  [TData]
>;

type UseAsyncDataOnErrorFn = MaybeAsyncFn<[Error]>;

type UseAsyncDataOptions<TData extends NullishPrimitives> = {
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

  // trigger load on mount or if dataOrLoadingFn or options change
  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataOrLoadingFn, options]);

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
