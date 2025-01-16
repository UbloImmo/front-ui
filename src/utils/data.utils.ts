import {
  isFunction,
  type Optional,
  type AsyncFn,
  type MaybeAsyncFn,
  type Nullable,
  type NullishPrimitives,
} from "@ubloimmo/front-util";
import { debounce } from "lodash";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import type {
  DebouncedState,
  UseDebounceValueOptions,
  UseDebounceOptions,
} from "@/types";

type UseAsyncDataOnSuccessFn<TData extends NullishPrimitives> = MaybeAsyncFn<
  [TData]
>;

type UseAsyncDataOnErrorFn = MaybeAsyncFn<[Error]>;

type UseAsyncDataOptions<
  TData extends NullishPrimitives,
  TDataParams extends unknown[] = []
> = {
  defaultValue?: TData;
  onSuccess?: UseAsyncDataOnSuccessFn<TData>;
  onError?: UseAsyncDataOnErrorFn;
  params?: TDataParams;
};

type UseAsyncDataState<TData extends NullishPrimitives> = {
  data: Optional<TData>;
  isLoading: boolean;
  error: Nullable<Error>;
};

type UseAsyncDataLoadFn<
  TData extends NullishPrimitives,
  TDataParams extends unknown[] = []
> = (
  options?: Optional<UseAsyncDataOptions<TData, TDataParams>>
) => Promise<UseAsyncDataState<TData>>;

type UseAsyncDataReturn<
  TData extends NullishPrimitives,
  TDataParams extends unknown[] = []
> = UseAsyncDataState<TData> & {
  refetch: UseAsyncDataLoadFn<TData, TDataParams>;
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
export const useAsyncData = <
  TData extends NullishPrimitives,
  TDataParams extends unknown[] = []
>(
  dataOrLoadingFn: TData | MaybeAsyncFn<TDataParams, TData>,
  options?: UseAsyncDataOptions<TData, TDataParams>
): UseAsyncDataReturn<TData, TDataParams> => {
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
      currentOptions?: UseAsyncDataOptions<TData, TDataParams>
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
  const loadData = useCallback<UseAsyncDataLoadFn<TData, TDataParams>>(
    async (currentOptions?: UseAsyncDataOptions<TData, TDataParams>) => {
      let state: UseAsyncDataState<TData> = {
        data,
        error,
        isLoading,
      };
      if (isFunction<MaybeAsyncFn<TDataParams, TData>>(dataOrLoadingFn)) {
        setIsLoading(true);
        try {
          const loadedData = await dataOrLoadingFn(
            ...(currentOptions?.params ?? options?.params ?? [])
          );
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
    [data, dataOrLoadingFn, error, isLoading, triggerLoadCallbacks, options]
  );

  // trigger load on mount
  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    data,
    isLoading,
    error,
    refetch: loadData,
  };
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
 * Custom hook that runs a cleanup function when the component is unmounted.
 * @param {() => void} func - The cleanup function to be executed on unmount.
 * @public
 * @see [Documentation](https://usehooks-ts.com/react-hook/use-unmount)
 * @example
 * ```tsx
 * useUnmount(() => {
 *   // Cleanup logic here
 * });
 * ```
 */
export function useUnmount(func: () => void) {
  const funcRef = useRef(func);

  funcRef.current = func;

  useEffect(
    () => () => {
      funcRef.current();
    },
    []
  );
}

/**
 * Custom hook that creates a debounced version of a callback function.
 * @template TFunc - Type of the original callback function.
 * @param {TFunc} func - The callback function to be debounced.
 * @param {number} delay - The delay in milliseconds before the callback is invoked (default is `500` milliseconds).
 * @param {DebounceOptions} [options] - Options to control the behavior of the debounced function.
 * @returns {DebouncedState<TFunc>} A debounced version of the original callback along with control functions.
 * @public
 * @see [Documentation](https://usehooks-ts.com/react-hook/use-debounce-callback)
 * @example
 * ```tsx
 * const debouncedCallback = useDebounceCallback(
 *   (searchTerm) => {
 *     // Perform search after user stops typing for 500 milliseconds
 *     searchApi(searchTerm);
 *   },
 *   500
 * );
 *
 * // Later in the component
 * debouncedCallback('react hooks'); // Will invoke the callback after 500 milliseconds of inactivity.
 * ```
 */
export function useDebounceCallback<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TFunc extends (...args: any) => ReturnType<TFunc>
>(
  func: TFunc,
  delay = 500,
  options?: UseDebounceOptions
): DebouncedState<TFunc> {
  const debouncedFunc = useRef<ReturnType<typeof debounce>>();

  useUnmount(() => {
    if (debouncedFunc.current) {
      debouncedFunc.current.cancel();
    }
  });

  const debounced = useMemo(() => {
    const debouncedFuncInstance = debounce(func, delay, options);

    const wrappedFunc: DebouncedState<TFunc> = (...args: Parameters<TFunc>) => {
      return debouncedFuncInstance(...args);
    };

    wrappedFunc.cancel = () => {
      debouncedFuncInstance.cancel();
    };

    wrappedFunc.isPending = () => {
      return !!debouncedFunc.current;
    };

    wrappedFunc.flush = () => {
      return debouncedFuncInstance.flush();
    };

    return wrappedFunc;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delay, options]);

  // Update the debounced function ref whenever func, wait, or options change
  useEffect(() => {
    debouncedFunc.current = debounce(func, delay, options);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delay, options]);

  return debounced;
}

/**
 * Custom hook that returns a debounced version of the provided value, along with a function to update it.
 * @template TValue - The type of the value.
 * @param {TValue | (() => TValue)} initialValue - The value to be debounced.
 * @param {number} delay - The delay in milliseconds before the value is updated (default is 500ms).
 * @param {object} [options] - Optional configurations for the debouncing behavior.
 * @returns {[TValue, DebouncedState<(value: TValue) => void>]} An array containing the debounced value and the function to update it.
 * @public
 * @see [Documentation](https://usehooks-ts.com/react-hook/use-debounce-value)
 * @example
 * ```tsx
 * const [debouncedValue, updateDebouncedValue] = useDebounceValue(inputValue, 500, { leading: true });
 * ```
 */
export function useDebounceValue<TValue>(
  initialValue: TValue | (() => TValue),
  delay: number,
  options?: UseDebounceValueOptions<TValue>
): [TValue, DebouncedState<(value: TValue) => void>] {
  const equals =
    options?.equalityFn ?? ((left: TValue, right: TValue) => left === right);
  const unwrappedInitialValue = isFunction(initialValue)
    ? initialValue()
    : initialValue;
  const [debouncedValue, setDebouncedValue] = useState<TValue>(
    unwrappedInitialValue
  );
  const previousValueRef = useRef<TValue | undefined>(unwrappedInitialValue);

  const updateDebouncedValue = useDebounceCallback(
    setDebouncedValue,
    delay,
    options
  );

  // Update the debounced value if the initial value changes
  if (!equals(previousValueRef.current as TValue, unwrappedInitialValue)) {
    updateDebouncedValue(unwrappedInitialValue);
    previousValueRef.current = unwrappedInitialValue;
  }

  return [debouncedValue, updateDebouncedValue];
}
