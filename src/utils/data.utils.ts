import {
  isFunction,
  type Optional,
  type AsyncFn,
  type MaybeAsyncFn,
  type Nullable,
  type NullishPrimitives,
  isBoolean,
} from "@ubloimmo/front-util";
import { debounce } from "lodash";
import {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";

import { compare, isDefined } from "./comparison.utils";
import { useMounted } from "./component.utils";

import {
  type DebouncedState,
  type UseDebounceValueOptions,
  type UseDebounceOptions,
  type UseAsyncData,
  type UseAsyncDataOptions,
  type UseAsyncDataReturn,
  type UseAsyncDataState,
  type UseAsyncDataLoadFn,
  type MapConstructorLike,
  type UseMapOptions,
  type UseMap,
  type UseMapReturn,
  UseMapUpdateFn,
  UseMapCombinedOptions,
} from "@/types";

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
export const useAsyncData: UseAsyncData = <
  TData extends NullishPrimitives,
  TDataParams extends unknown[] = [],
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
   * A ref holding the ID of the last load operation.
   * Used to track concurrent load operations and prevent race conditions.
   */
  const lastLoadId = useRef<bigint>(0n);

  /**
   * Generates a new unique load ID by incrementing the last ID.
   * Used to track concurrent load operations and prevent race conditions.
   *
   * @returns {bigint} A new unique load ID
   */
  const getLoadId = useCallback(() => {
    const newId = lastLoadId.current + 1n;
    lastLoadId.current = newId;
    return newId;
  }, []);

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
      // generate a new loadId store it in the ref
      const loadId = getLoadId();
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
      // only update state and trigger callbacks if the loadId is the same as the last loadId
      // this is to prevent race conditions when multiple refetches are triggered closely together
      // only the latest loadId will trigger the update
      if (loadId === lastLoadId.current) {
        setData(state.data);
        setError(state.error);
        setIsLoading(state.isLoading);
        triggerLoadCallbacks(state, currentOptions);
      }
      return state;
    },
    [
      getLoadId,
      data,
      error,
      isLoading,
      dataOrLoadingFn,
      options?.params,
      triggerLoadCallbacks,
    ]
  );

  // trigger load on mount
  useMounted(() => {
    const doFetch = !(
      isBoolean(options?.initialFetch) && !options.initialFetch
    );
    if (!doFetch) return;
    loadData();
  });

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
  TFunc extends (...args: any) => ReturnType<TFunc>,
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

/**
 * Custom hook that returns a single Map object and hijacks its mutation methods to cause re-renders
 */
export const useMap: UseMap = <
  TKey,
  TValue,
  TMap extends Map<TKey, TValue> = Map<TKey, TValue>,
>(
  MapConstructor: MapConstructorLike<TKey, TValue, TMap>,
  options: NoInfer<UseMapOptions<TKey, TValue, TMap>> = {}
): UseMapReturn<TKey, TValue, TMap> => {
  /**
   * TS type assignement for easy consumption of either option payload
   */
  const {
    autoCommitMutations = true,
    initiallyCleared = false,
    initialValue,
    reactiveValue,
    reactiveUpdate = (newValue) => newValue,
    onReactiveDelete,
    onReactiveAdd,
  } = useMemo<UseMapCombinedOptions<TKey, TValue, TMap>>(
    () => options,
    [options]
  );

  /**
   * Internal value of the hook. Is the target of all mutation methods
   */
  const mapRef = useRef<TMap>(
    new MapConstructor(
      initialValue ??
        (initiallyCleared || !reactiveValue ? undefined : reactiveValue)
    )
  );

  /**
   * Reactive clone of the internal value. Tracks the internal {@link mapRef value} and causes rerenders when updated
   */
  const [map, commit] = useReducer(
    (_: TMap): TMap => new MapConstructor(mapRef.current),
    mapRef.current
  );

  /**
   * Effect that ensures the internal value reacts to the reactive value if provided.
   * Adds missing values, removes deleted values and updates conflicting values whenever `reactiveValue` changes.
   * Performs update in a single O(n) pass, causing one single render if needed
   */
  useEffect(() => {
    if (!reactiveValue) return;
    const combinedKeys = new Set<TKey>([
      ...map.keys(),
      ...reactiveValue.keys(),
    ]);
    let mapCommitNeeded = false;
    for (const key of combinedKeys) {
      // remove deleted key/value pair
      if (map.has(key) && !reactiveValue.has(key)) {
        mapRef.current.delete(key);
        onReactiveDelete?.(key);
        mapCommitNeeded = true;
        continue;
      }
      // add or overwrite missing
      const newOrUpdated = reactiveValue.get(key);
      const previousValue = map.get(key);
      if (!newOrUpdated) continue;
      // - add missing value
      if (!isDefined(previousValue)) {
        mapRef.current.set(key, newOrUpdated);
        onReactiveAdd?.(newOrUpdated, key);
        mapCommitNeeded = true;
        continue;
      }
      // - update changed value if different
      if (compare(previousValue, newOrUpdated, compare.neq)) {
        const updated = reactiveUpdate(newOrUpdated, previousValue, key);
        mapRef.current.set(key, updated);
        mapCommitNeeded = true;
      }
    }
    // trigger a single re-render if needed
    if (!mapCommitNeeded) return;
    commit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reactiveValue]);

  const set = useCallback<TMap["set"]>(
    (...args) => {
      const result = mapRef.current.set(...args);
      if (autoCommitMutations) commit();
      return result;
    },
    [autoCommitMutations]
  );

  const get = useCallback<TMap["get"]>((...args) => map.get(...args), [map]);

  /**
   * Updates a value at a given key using a callback that takes the currently stored value as argument
   *
   * @param key - Key for which to update value
   * @param updateFn - Function that takes the previous value as only parameter, updates and returns it
   *
   * @returns Whether the map was ultimately updated
   *
   * @remarks
   * Only keys pointing to existing values in the map will result in an update.
   * Updates that are identical to the current value will be discarded
   */
  const update = useCallback<UseMapUpdateFn<TKey, TValue>>(
    (key, updateFn) => {
      if (!updateFn) return false;
      const currentValue = get(key);
      if (!isDefined(currentValue)) return false;
      const updated = updateFn(currentValue);
      // do not trigger update if the updated value is the same as the current value
      if (compare(currentValue, update, compare.eq)) return false;
      set(key, updated);
      return true;
    },
    [get, set]
  );

  const clear = useCallback<TMap["clear"]>(
    (...args) => {
      mapRef.current.clear(...args);
      if (autoCommitMutations) commit();
    },
    [autoCommitMutations]
  );

  const del = useCallback<TMap["delete"]>(
    (...args) => {
      const deleted = mapRef.current.delete(...args);
      if (deleted && autoCommitMutations) commit();
      return deleted;
    },
    [autoCommitMutations]
  );

  const forEach = useCallback<TMap["forEach"]>(
    (...args) => map.forEach(...args),
    [map]
  );

  const has = useCallback<TMap["has"]>((...args) => map.has(...args), [map]);

  const entries = useCallback<TMap["entries"]>(
    (...args) => map.entries(...args),
    [map]
  );

  const keys = useCallback<TMap["keys"]>((...args) => map.keys(...args), [map]);

  const values = useCallback<TMap["values"]>(
    (...args) => map.values(...args),
    [map]
  );

  return {
    ...map,
    [Symbol.iterator]() {
      return map[Symbol.iterator]();
    },
    set,
    get,
    clear,
    delete: del,
    forEach,
    has,
    get size(): TMap["size"] {
      return mapRef.current.size;
    },
    entries,
    keys,
    values,
    commit,
    update,
  };
};
