import type { Filter } from "../Filter/Filter.types";
import type { FilterOptionData } from "../FilterOption/FilterOption.types";
import type { FilterPreset } from "../FilterPreset/FilterPreset.types";
import type {
  FilterBooleanOperator,
  FilterProperty,
  FilterSearchOperator,
} from "../shared.types";
import type { SortPayload } from "../Sort";
import type {
  AsyncFn,
  Enum,
  GenericFn,
  MaybeAsyncFn,
  Nullable,
  Replace,
  RequireAtLeastOne,
  VoidFn,
} from "@ubloimmo/front-util";

export type DataProviderSetDataFn<TItem extends object> = VoidFn<[TItem[]]>;

export type DataProviderFilterParam<TItem extends object> = Replace<
  Pick<Filter<TItem>, "selectedOptions" | "operator">,
  "selectedOptions",
  {
    selectedOptions: FilterOptionData<TItem>[];
  }
>;

/**
 * The search configuration for the data provider filter function
 *
 * @template {object} TItem - The type of the items in the list
 */
export type DataProviderFilterFnSearchConfig<TItem extends object> = {
  /**
   * The properties the search query should matched against
   *
   * @type {FilterProperty<TItem>[]}
   */
  properties: FilterProperty<TItem>[];
  /**
   * The search strategy used to match the search query against the properties
   *
   * @type {FilterSearchOperator}
   */
  strategy: FilterSearchOperator;
  /**
   * The active, debounced text query, or null if empty
   *
   * @type {Nullable<string>}
   */
  query: Nullable<string>;
};

export type DataProviderFilterFnConfig<TItem extends object> =
  RequireAtLeastOne<{
    /**
     * A single filter to apply to the items
     *
     * @type {DataProviderFilterParam<TItem>}
     * @deprecated use `filters` instead
     */
    filter?: DataProviderFilterParam<TItem>;
    /**
     * Multiple filters to apply to the items
     *
     * @type {DataProviderFilterParam<TItem>[]}
     */
    filters?: DataProviderFilterParam<TItem>[];
    /**
     * A single filter preset to apply to the items
     *
     * @type {Pick<FilterPreset<TItem>, "options" | "operator">}
     * @deprecated use `filterPresets` instead
     */
    filterPreset?: Pick<FilterPreset<TItem>, "options" | "operator">;
    /**
     * Multiple filter presets to apply to the items
     *
     * @type {Pick<FilterPreset<TItem>, "options" | "operator">[]}
     */
    filterPresets?: Pick<FilterPreset<TItem>, "options" | "operator">[];
    /**
     * A single option to apply to the items
     *
     * @type {FilterOptionData<TItem>}
     * @deprecated use `options` instead
     */
    option?: FilterOptionData<TItem>;
    /**
     * Multiple options to apply to the items
     *
     * @type {FilterOptionData<TItem>[]}
     */
    options?: FilterOptionData<TItem>[];
  }> & {
    /**
     * The operator to combine multiple filters, filter presets or options.
     *
     * @type {FilterBooleanOperator}
     * @default "OR"
     */
    operator?: FilterBooleanOperator;
    /**
     * The selected options to apply to the items
     *
     * @remarks
     * Always gets sent to the data provider, regardless of the filter or filter preset configuration shape.
     *
     * @type {FilterOptionData<TItem>[]}
     * @default []
     */
    selectedOptions: FilterOptionData<TItem>[];
    /**
     * Active sorting configurations to apply to the items.
     *
     * @remarks
     * Always gets sent to the data provider, regardless of the sorting configuration shape.
     * The order of the {@link SortPayload} objects in the array matters.
     * Sorts are ordered based on priority, and should be applied as such by the Data provider
     *
     * @type {Nullable<SortPayload<TItem, FilterProperty<TItem>>[]>};
     * @default null
     */
    activeSorts: Nullable<SortPayload<TItem, FilterProperty<TItem>>[]>;
    /**
     * The search configuration to apply to the items
     *
     * @remarks
     * Determined by the list's search configuration and dynamically hydrated.
     * Is null if no search configuration is provided.
     *
     * @type {Nullable<DataProviderFilterFnSearchConfig<TItem>>}
     * @default null
     */
    search: Nullable<DataProviderFilterFnSearchConfig<TItem>>;
  };

export type DataProviderFilterFn<TItem extends object> = MaybeAsyncFn<
  [config: DataProviderFilterFnConfig<TItem>]
>;

export type DataProviderFetchCountFn<TItem extends object> = MaybeAsyncFn<
  [config: DataProviderFilterFnConfig<TItem>],
  number
>;

/**
 * A function that refetches the data provider's data
 *
 * @template {object} TItem - The type of the items in the list
 *
 * @returns {Promise<TItem[]>} The refetched data
 */
export type DataProviderRefetchFn<TItem extends object> = AsyncFn<[], TItem[]>;

/**
 * The base parameters of the DataProvider hook, inherited by the other DataProvider types
 *
 * @template {object} TItem - The type of the items in the list
 */
export type DataProviderBaseParams<TItem extends object> = [
  /**
   * The initial data or a function that fetches it
   */
  initialData: TItem[] | MaybeAsyncFn<[], TItem[]>,
  /**
   * A callback function that sets the list's data
   *
   * @type {DataProviderSetDataFn<TItem>}
   *
   * @template {object} TItem - The type of the items in the list
   * @param {TItem[]} data - The data to set
   */
  setData: DataProviderSetDataFn<TItem>,
];

export const dataProviderTypes = [
  "static",
  "dynamic",
  "paginated",
  "custom",
] as const;

export type DataProviderType = Enum<typeof dataProviderTypes>;

export type DataProviderBase<TItem extends object> = {
  /**
   * The provider's data, initial or filtered
   *
   * Gets directly rendered in the list
   */
  data: TItem[];
  /**
   * Indicates if the data is being loaded
   */
  loading: boolean;
  /**
   * Whether an error occurred while fetching the data
   *
   * @type {boolean}
   */
  error: boolean;
  /**
   * A function that refetches the data
   * updates data, filteredData and calls the `setData` callback
   */
  refetch: DataProviderRefetchFn<TItem>;
  /**
   * A function that filters the data,
   * updates the filteredData and calls the `setData` callback
   */
  filter: DataProviderFilterFn<TItem>;
  /**
   * A function that prefetches the counts of the data
   */
  fetchCount: DataProviderFetchCountFn<TItem>;
  /**
   * A function that clears the current data
   */
  clear: VoidFn;
};

export type IDataProvider<
  TItem extends object,
  TType extends DataProviderType = DataProviderType,
> = DataProviderBase<TItem> & {
  /**
   * The type of the data provider
   *
   * @type {DataProviderType}
   *
   * @remarks
   *
   * Custom data providers are required to return the `type` property
   */
  type: TType;
} & (TType extends "paginated"
    ? {
        /**
         * Indicates if there is a next page to load
         */
        hasNextPage: boolean;
        /**
         * A function that triggers fetching of the next page
         *
         * @type {VoidFn}
         */
        nextPage: VoidFn;
        /**
         * The maximum size of pages
         *
         * @remarks
         * Gets clamped between `1` and `+Infinity`
         *
         * @type {number}
         * @default 25
         */
        pageSize: number;
      }
    : // eslint-disable-next-line @typescript-eslint/no-empty-object-type
      {});

export type UseDataProviderParams<TItem extends object> = [
  /**
   * A callback function that sets the list's data
   *
   * @type {DataProviderSetDataFn<TItem>}
   *
   * @template {object} TItem - The type of the items in the list
   * @param {TItem[]} data - The data to set
   */
  setData: DataProviderBaseParams<TItem>,
];

/**
 * A hook that returns an object implementing the IDataProvider interface
 */
export type UseDataProviderFn<
  TItem extends object,
  TType extends DataProviderType = DataProviderType,
> = GenericFn<
  [setData: DataProviderSetDataFn<TItem>],
  IDataProvider<TItem, TType>
>;
