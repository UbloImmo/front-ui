import type {
  AsyncFn,
  GenericFn,
  MaybeAsyncFn,
  Nullable,
  Nullish,
  NullishPrimitives,
  Optional,
  VoidFn,
} from "@ubloimmo/front-util";
import type { SetStateAction } from "react";

/**
 * A very basic email string type alias
 * Used to differentiate between emails and regular strings
 */
export type Email = string;

/**
 * Basic type alias for currency (int)
 *
 * @example
 * 1000 // (10.00 €)
 */
export type CurrencyInt = number;
/**
 * Basic type alias for currency (float)
 *
 *
 * @example
 * 10.00 // (10.00 €)
 */
export type CurrencyFloat = number;

/**
 * Basic currency string regex
 */
export type CurrencyStr = `${number},${number}` | `${number},00`;

export type CurrencyStrWithSymbol = `${CurrencyStr} €`;

export type NumberSign = "+" | "-";

export type FormattedCurrencyStr =
  | CurrencyStr
  | `${string},${number}`
  | `${string},00`;

export type FormattedCurrencyStrWithSymbol = `${FormattedCurrencyStr} €`;

export type MaybePromise<T> = T | Promise<T>;

export type DataArrayItemPredicate<TData> = GenericFn<
  [item: TData, index: number],
  boolean
>;
export type DataArrayItemUpdater<TData> = GenericFn<
  [item: TData, index: number],
  TData
>;
export type DataArrayPushFn<TData> = VoidFn<[newItem: TData]>;
export type DataArrayUnshiftFn<TData> = DataArrayPushFn<TData>;
export type DataArrayAtFn<TData> = GenericFn<
  [index: number, defaultValue: TData],
  TData
>;
export type DataArrayFilterFn<TData> = GenericFn<
  [predicate: DataArrayItemPredicate<TData>],
  TData[]
>;
export type DataArrayRemoveFn<TData> = VoidFn<
  [predicate: DataArrayItemPredicate<TData>]
>;
export type DataArrayUpdateItemWhereFn<TData> = VoidFn<
  [
    predicate: DataArrayItemPredicate<TData>,
    updater: DataArrayItemUpdater<TData>,
  ]
>;
export type DataArrayFindFn<TData> = GenericFn<
  [predicate: DataArrayItemPredicate<TData>],
  Optional<TData>
>;
export type DataArrayFindIndexFn<TData> = GenericFn<
  [predicate: DataArrayItemPredicate<TData>],
  number
>;
export type UseDataArrayUpdateDataFn<TData> = VoidFn<
  [newData: SetStateAction<TData[]>]
>;

export type UseDataArrayReturn<TData> = {
  data: TData[];
  isLoading: boolean;
  setData: UseDataArrayUpdateDataFn<TData>;
  push: DataArrayPushFn<TData>;
  remove: DataArrayRemoveFn<TData>;
  updateItemWhere: DataArrayUpdateItemWhereFn<TData>;
  unshift: DataArrayUnshiftFn<TData>;
  at: DataArrayAtFn<TData>;
  filter: DataArrayFilterFn<TData>;
  find: DataArrayFindFn<TData>;
  findIndex: DataArrayFindIndexFn<TData>;
};

export type UseDataArray = <TData>(
  /**
   * The data to load
   * Either an array of data or a function that returns an array of data
   *
   * @type {TData[] | AsyncFn<[], TData[]>}
   */
  rootData: TData[] | AsyncFn<[], TData[]>,
  /**
   * Whether the data should be reactive
   * @default false
   */
  reactive?: boolean,
  /**
   * A callback function that is called when the data changes
   */
  onDataChange?: VoidFn<[newData: TData[]]>
) => UseDataArrayReturn<TData>;

/**
 * Hook options.
 * @template T - The type of the value.
 */
export type UseDebounceValueOptions<T> = {
  /**
   * Determines whether the function should be invoked on the leading edge of the timeout.
   * @default false
   */
  leading?: boolean;
  /**
   * Determines whether the function should be invoked on the trailing edge of the timeout.
   * @default false
   */
  trailing?: boolean;
  /**
   * The maximum time the specified function is allowed to be delayed before it is invoked.
   */
  maxWait?: number;
  /** A function to determine if the value has changed. Defaults to a function that checks if the value is strictly equal to the previous value. */
  equalityFn?: (left: T, right: T) => boolean;
};

/** Configuration options for controlling the behavior of the debounced function. */
export type UseDebounceOptions = {
  /**
   * Determines whether the function should be invoked on the leading edge of the timeout.
   * @default false
   */
  leading?: boolean;
  /**
   * Determines whether the function should be invoked on the trailing edge of the timeout.
   * @default false
   */
  trailing?: boolean;
  /**
   * The maximum time the specified function is allowed to be delayed before it is invoked.
   */
  maxWait?: number;
};

/** Functions to manage a debounced callback. */
export type UseDebounceControlFunctions = {
  /** Cancels pending function invocations. */
  cancel: () => void;
  /** Immediately invokes pending function invocations. */
  flush: () => void;
  /**
   * Checks if there are any pending function invocations.
   * @returns `true` if there are pending invocations, otherwise `false`.
   */
  isPending: () => boolean;
};

/**
 * Represents the state and control functions of a debounced callback.
 * Subsequent calls to the debounced function return the result of the last invocation.
 * Note: If there are no previous invocations, the result will be undefined.
 * Ensure proper handling in your code.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type DebouncedState<T extends (...args: any) => ReturnType<T>> = ((
  ...args: Parameters<T>
) => ReturnType<T> | undefined) &
  UseDebounceControlFunctions;

// ------- useAsyncData -------

/**
 * Callback function that executes when {@link UseAsyncData}'s data loads successfully
 */
export type UseAsyncDataOnSuccessFn<TData extends NullishPrimitives> =
  MaybeAsyncFn<[TData]>;

/**
 * Callback function that executes when {@link UseAsyncData}'s data fails to load
 */
export type UseAsyncDataOnErrorFn = MaybeAsyncFn<[Error]>;

/**
 * Options object that may be provided to {@link UseAsyncData}
 */
export type UseAsyncDataOptions<
  TData extends NullishPrimitives,
  TDataParams extends unknown[] = [],
> = {
  /**
   * Default value to use when data has not been loaded yet
   */
  defaultValue?: TData;
  /**
   * @see {@link UseAsyncDataOnSuccessFn}
   */
  onSuccess?: UseAsyncDataOnSuccessFn<TData>;
  /**
   * @see {@link UseAsyncDataOnErrorFn}
   * */
  onError?: UseAsyncDataOnErrorFn;
  /**
   * Parameters to pass to the provided loading function
   */
  params?: TDataParams;
  /**
   * Whether to trigger a fetch on mount
   *
   * @default true
   */
  initialFetch?: boolean;
};

/**
 * Current state of the {@link UseAsyncData} hook
 */
export type UseAsyncDataState<TData extends NullishPrimitives> = {
  /**
   * The loaded data, or undefined if not yet loaded.
   */
  data: Optional<TData>;
  /**
   * Indicates whether the data is currently being loaded.
   */
  isLoading: boolean;
  /**
   * Any error that occurred during data loading, or null if no error.
   */
  error: Nullable<Error>;
};

/**
 * @private
 * Internal function in change of loading {@link UseAsyncData}'s data and running its callbacks
 */
export type UseAsyncDataLoadFn<
  TData extends NullishPrimitives,
  TDataParams extends unknown[] = [],
> = (
  options?: Optional<UseAsyncDataOptions<TData, TDataParams>>
) => Promise<UseAsyncDataState<TData>>;

/**
 * Return type of the {@link useAsyncData} hook. Contains state & refetch method
 */
export type UseAsyncDataReturn<
  TData extends NullishPrimitives,
  TDataParams extends unknown[] = [],
> = UseAsyncDataState<TData> & {
  /**
   * Triggers a refetch of the data
   */
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
 * @returns {UseAsyncDataReturn<TData>} An object containing the loaded state & a refetch method
 */
export interface UseAsyncData {
  <TData extends NullishPrimitives, TDataParams extends unknown[] = []>(
    /**
     * Either the source data or a function that returns it
     */
    dataOrLoadingFn: TData | MaybeAsyncFn<TDataParams, TData>,
    /**
     * Optional
     */
    options?: UseAsyncDataOptions<TData, TDataParams>
  ): UseAsyncDataReturn<TData, TDataParams>;
}

// ------- useMap -------

/**
 * Represents any constructor-like object that returns a Map
 */
export interface MapConstructorLike<
  TKey,
  TValue,
  TMap extends Map<TKey, TValue>,
> {
  new (): TMap;
  new (entries?: readonly (readonly [TKey, TValue])[] | null): TMap;
  new (iterable?: Iterable<readonly [TKey, TValue]> | null): TMap;
}

/**
 * When the internal map and reactive value both have different values for the same conflicting key,
 * this function dictates what the final result should be
 *
 * @param newValue - Value at the conflicting key as stored in {@link UseMap}'s `reactiveValue` option
 * @param previousValue - Value at the same key as currently stored in {@link UseMap}'s internal state
 * @param conflictingKey - Common key at which the conflict occured
 *
 * @returns The value that will override the internal state
 */
export interface UseMapReactiveUpdateFn<TKey, TValue> {
  (newValue: TValue, currentValue: TValue, conflictingKey: TKey): TValue;
}

/**
 * Callback function that runs for each key that was present in {@link UseMap}'s internal state but removed in its `reactiveValue`.
 *
 * @param deletedKey - Key that was just deleted from the hook's internal state
 */
export type UseMapOnReactiveDeleteFn<TKey> = VoidFn<[deletedKey: TKey]>;

/**
 * Callback function that runs for each key/value pair that was added to {@link UseMap}'s internal state following its `reactiveValue`'s update.
 *
 * @param addedValue - Value that was just added to the hooks internal state
 * @param addedKey - Key pointing to the value that was just added to the hooks internal state
 *
 */
export type UseMapOnReactiveAddFn<TKey, TValue> = VoidFn<
  [addedValue: TValue, addedKey: TKey]
>;

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
export interface UseMapUpdateFn<TKey, TValue> {
  (key: TKey, updateFn: (currentValue: TValue) => TValue): boolean;
}

/**
 * Options always accepted by the {@link UseMap} hook
 */
interface UseMapCommonOptions {
  /**
   * Whether to cause a re-render upon map clear, set, delete
   *
   * @default true
   */
  autoCommitMutations?: boolean;
}

/**
 * Options of the {@link UseMap} hook with a single static initial value
 */
export interface UseMapInitialValueOptions<
  TKey,
  TValue,
  TMap extends Map<TKey, TValue>,
> extends UseMapCommonOptions {
  reactiveValue?: never;
  /**
   * Initial, non-reactive value to initialized {@link UseMap}'s internal state with
   *
   * @remarks
   * If both `initialValue` and `reactiveValue` are provided, `initialValue` take precedence as the hook's initial state
   */
  initialValue?: Nullish<TMap>;
}

/**
 * Options of the {@link UseMap} hook with a single reactive value and lifecycle callbacks
 */
export interface UseMapReactiveValueOptions<
  TKey,
  TValue,
  TMap extends Map<TKey, TValue>,
> extends UseMapCommonOptions {
  initialValue?: never;
  /**
   * If set to `true`, the hook's initial value will be a new, empty map.
   * Otherwhise, the internal value will be a copy of the `reactiveValue` if provided.
   *
   * @default false
   */
  initiallyCleared?: boolean;
  /**
   * When provided, the underlying map will track & reflect changes made to this value.
   *
   * @remarks
   * Is treated like an initial value only if the `initiallyCleared` property is falsy.
   *
   * @default false
   */
  reactiveValue?: Nullish<TMap>;
  /**
   * Used to reconcile new and previous values for a specific keys while reactively updating the underlying map
   *
   * @default (newValue) => newValue
   */
  reactiveUpdate?: UseMapReactiveUpdateFn<TKey, TValue>;
  /**
   * Optional callback that runs when keys are reactively deleted from the hook's internal state following `reactiveValue` updates
   *
   * @default undefined
   */
  onReactiveDelete?: UseMapOnReactiveDeleteFn<TKey>;
  /**
   * Optional callback that runs when keys are reactively added to the hook's internal state following `reactiveValue` updates
   *
   * @default undefined
   */
  onReactiveAdd?: UseMapOnReactiveAddFn<TKey, TValue>;
}

/**
 * Options that may be provided to the {@link UseMap} hook
 *
 * Either {@link UseMapInitialValueOptions} or {@link UseMapReactiveValueOptions}
 */
export type UseMapOptions<TKey, TValue, TMap extends Map<TKey, TValue>> =
  | UseMapInitialValueOptions<TKey, TValue, TMap>
  | UseMapReactiveValueOptions<TKey, TValue, TMap>;

/**
 * Options object for the {@link UseMap} hook that combines both {@link UseMapInitialValueOptions initial value} & {@link UseMapReactiveValueOptions reactive value} options.
 */
export interface UseMapCombinedOptions<
  TKey,
  TValue,
  TMap extends Map<TKey, TValue>,
> extends Omit<UseMapInitialValueOptions<TKey, TValue, TMap>, "reactiveValue">,
    Omit<UseMapReactiveValueOptions<TKey, TValue, TMap>, "initialValue"> {}

export type UseMapReturn<TKey, TValue, TMap> = TMap & {
  /**
   * Manually triggers re-renders.
   * Should be called after each batch of map mutations if `options.autoCommitMutations` is `false`
   */
  commit: VoidFn;
  /**
   * Updates a value at a given key using a callback that takes the currently stored value as argument
   */
  update: UseMapUpdateFn<TKey, TValue>;
};

/**
 * Custom hook that returns a single Map object and hijacks its mutation methods to cause re-renders
 */
export interface UseMap {
  <TKey, TValue, TMap extends Map<TKey, TValue> = Map<TKey, TValue>>(
    MapConstructor: MapConstructorLike<TKey, TValue, TMap>,
    options?: NoInfer<UseMapOptions<TKey, TValue, TMap>>
  ): UseMapReturn<TKey, TValue, TMap>;
}
