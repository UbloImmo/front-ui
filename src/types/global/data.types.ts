import type {
  AsyncFn,
  GenericFn,
  Optional,
  VoidFn,
} from "@ubloimmo/front-util";

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
    updater: DataArrayItemUpdater<TData>
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

export type UseDataArrayReturn<TData> = {
  data: TData[];
  isLoading: boolean;
  setData: VoidFn<[newData: TData[]]>;
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
export type UseeDebounceOptions = {
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
