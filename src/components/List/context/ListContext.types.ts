import type {
  FilterBooleanOperator,
  FilterConfig,
  FilterData,
  FilterOptionData,
  FilterOptionDividerData,
  FilterPreset,
  FilterPresetData,
  FilterSignature,
  IDataProvider,
  Filter,
  IsFilterOptionFn,
  ListConfigAsyncFilterFn,
  ListConfigAsyncFilterPresetFn,
  ListConfigAsyncOptionFn,
  ListConfigAsyncOptionsFn,
  ListConfigFilterFn,
  ListConfigFilterPresetFn,
  ListConfigMatchFn,
  ListConfigMatchesFn,
  ListConfigNotFn,
  ListConfigOptionFn,
  ListConfigOptionsFn,
  UseDataProviderFn,
  FilterProperty,
} from "../modules";
import type { UseDataArrayReturn } from "@types";
import type {
  GenericFn,
  Nullable,
  Replace,
  VoidFn,
} from "@ubloimmo/front-util";
import type { ReactNode } from "react";

// LIST SEARCH PARAMS ---------------------------------------------------------------------------

export type UseListContextSearchParams = <TItem extends object>(
  config: Pick<ListContextConfig<TItem>, "searchParams">,
  options: UseListOptionsReturn<TItem>,
  configLoading: boolean
) => void;

export type ListConfigSearchParamsReadParamsFn = GenericFn<[], URLSearchParams>;

export type ListConfigSearchParamsWriteParamsFn = VoidFn<
  [searchParams: URLSearchParams]
>;
/**
 * The list's search params sync configuration
 *
 *
 * - `true` or `"read-write"` will sync both read and write
 * - `false` will disable syncing
 * - `"read"` will only read from the url
 * - `"write"` will only write to the url
 *
 * @type {boolean | "read" | "write"}
 */
export type ListConfigSearchParamsSync =
  | boolean
  | "read"
  | "write"
  | "read-write";

/**
 * The list's search params configuration
 *
 * @type {ListConfigSearchParams}
 * @default { sync: false }
 */
export type ListConfigSearchParams = {
  /**
   * Whether the list should sync its search params with the url
   *
   * @type {ListConfigSearchParamsSync}
   * @default false
   */
  sync?: ListConfigSearchParamsSync;
  /**
   * A callback that reads the current search parameters from the URL
   * Adds support for various browser / router packages (e.g. react-router)
   *
   * @remarks Useful to customize the search params read behavior
   *
   * @type {Nullable<ListConfigSearchParamsReadParamsFn>}
   * @default null
   */
  readParams?: Nullable<ListConfigSearchParamsReadParamsFn>;
  /**
   * A callback that writes to the URL search parameters
   *
   * Adds support for various browser / router packages (e.g. react-router)
   *
   * @remarks Useful to customize the search params read behavior
   *
   * @type {Nullable<ListConfigSearchParamsWriteParamsFn>}
   * @default null
   */
  writeParams?: Nullable<ListConfigSearchParamsWriteParamsFn>;
};

export type ListConfigConfigureSearchParamsFn = VoidFn<
  [sync: ListConfigSearchParams]
>;

// SEARCH CONFIG ---------------------------------------------------------------------------------

/**
 * The list's search strategy
 *
 * @type {"contains" | "startsWith" | "endsWith"}
 * @default "contains"
 */
export type ListSearchStrategy = "contains" | "startsWith" | "endsWith";

/**
 * The list's search configuration object
 */
export type ListSearchConfig<TItem extends object> = {
  /**
   * The initial search query
   * Defaults to null
   *
   * @default null
   */
  initialQuery?: Nullable<string>;
  /**
   * The properties to match against the search query
   *
   * @default []
   */
  properties?: FilterProperty<TItem>[];
  /**
   * The search strategy used to match the search query against the properties
   *
   * @default "contains"
   */
  strategy?: ListSearchStrategy;
  /**
   * The error margin used to match the search query against the properties
   *
   * Maps to the number of characters that can be off in the search query
   *
   * @default 0
   */
  errorMargin?: number;
};

/**
 * Sets the list's whole search config at once
 *
 * @param {ListSearchConfig<TItem>} searchConfig - The search config to set
 * @returns {void}
 */
export type ListSearchConfigSetterFn<TItem extends object> = VoidFn<
  [searchConfig: ListSearchConfig<TItem>]
>;

/**
 * Sets the list's search properties
 *
 * @param {FilterProperty<TItem>[]} properties - The properties to set
 * @returns {void}
 */
export type ListSearchConfigPropertiesSetterFn<TItem extends object> = VoidFn<
  [properties: FilterProperty<TItem>[]]
>;

/**
 * Sets the list's search strategy
 *
 * @param {ListSearchStrategy} strategy - The strategy to set
 * @returns {void}
 */
export type ListSearchConfigStrategySetterFn = VoidFn<
  [strategy: ListSearchStrategy]
>;

/**
 * Sets the list's search error margin
 *
 * @param {number} errorMargin - The error margin to set
 * @returns {void}
 */
export type ListSearchConfigErrorMarginSetterFn = VoidFn<[errorMargin: number]>;

/**
 * Sets the list's search initial query
 *
 * @param {Nullable<string>} initialQuery - The initial query to set
 * @returns {void}
 */
export type ListSearchConfigInitialQuerySetterFn = VoidFn<
  [initialQuery: Nullable<string>]
>;

export type ListSearchConfigSetterFns<TItem extends object> = {
  /**
   * Sets the whole search config
   *
   * @see {@link ListSearchConfigSetterFn}
   */
  set: ListSearchConfigSetterFn<TItem>;
  /**
   * Sets the search properties
   *
   * @see {@link ListSearchConfigPropertiesSetterFn}
   */
  properties: ListSearchConfigPropertiesSetterFn<TItem>;
  /**
   * Sets the search strategy
   *
   * @see {@link ListSearchConfigStrategySetterFn}
   */
  strategy: ListSearchConfigStrategySetterFn;
  /**
   * Sets the search error margin
   *
   * @see {@link ListSearchConfigErrorMarginSetterFn}
   */
  errorMargin: ListSearchConfigErrorMarginSetterFn;
  /**
   * Sets the search initial query
   *
   * @see {@link ListSearchConfigInitialQuerySetterFn}
   */
  initialQuery: ListSearchConfigInitialQuerySetterFn;
};

export type UseListSearchConfigReturn<TItem extends object> = {
  searchConfig: Required<ListSearchConfig<TItem>>;
  setters: ListSearchConfigSetterFns<TItem>;
};

export type UseListSearchConfig = <
  TItem extends object
>() => UseListSearchConfigReturn<TItem>;

// LIST CONFIG ----------------------------------------------------------------------------------

export type ListContextConfig<TItem extends object> = {
  /**
   * The list's data provider: a hook that implements the IDataProvider interface
   *
   * @type {UseDataProviderFn<TItem>}
   * @required
   */
  useDataProvider: UseDataProviderFn<TItem>;
  /**
   * The list's options
   *
   * @type {Nullable<FilterOptionData<TItem>[]>}
   * @default null
   */
  options?: Nullable<FilterOptionData<TItem>[]>;
  /**
   * The list's filters
   *
   * @type {Nullable<Filter<TItem>[]>}
   * @default null
   */
  filters?: Nullable<FilterData[]>;
  /**
   * The list's filter presets
   *
   * @type {Nullable<FilterPresetData[]>}
   * @default null
   */
  filterPresets?: Nullable<FilterPresetData[]>;
  /**
   * The list's default operator
   * Used to combine multiple filters, filter presets or filter options
   * when they are applied without context
   *
   * @type {FilterBooleanOperator}
   * @default BooleanOperators.AND
   */
  operator?: FilterBooleanOperator;
  /**
   * The list's search params configuration
   *
   * @type {ListConfigSearchParams}
   * @default { sync: false }
   */
  searchParams?: ListConfigSearchParams;
} & ListSearchConfig<TItem>;

type ListConfigSetOperatorFn = VoidFn<[operator: FilterBooleanOperator]>;

export type HydrateFilterConfigFn = GenericFn<
  [config?: FilterConfig],
  FilterConfig
>;

export type ListConfigOptionDividerFn = GenericFn<
  [label: string],
  FilterOptionDividerData
>;

export type UseListConfigAsyncReturn<TItem extends object> = {
  option: ListConfigAsyncOptionFn<TItem>;
  options: ListConfigAsyncOptionsFn<TItem>;
  filter: ListConfigAsyncFilterFn<TItem>;
  filterPreset: ListConfigAsyncFilterPresetFn<TItem>;
};

export type UseListConfigAsync = <TItem extends object>(
  match: ListConfigMatchFn<TItem>,
  registerOption: VoidFn<[FilterOptionData<TItem>]>,
  registerFilter: VoidFn<[FilterData]>,
  updateFilter: VoidFn<[FilterData]>,
  registerFilterPreset: VoidFn<[FilterPresetData]>,
  updateFilterPreset: VoidFn<[FilterPresetData]>,
  hydrateFilterConfig: HydrateFilterConfigFn
) => UseListConfigAsyncReturn<TItem>;

export type UseListConfigReturn<TItem extends object> = {
  config: Required<ListContextConfig<TItem>>;
  async: UseListConfigAsyncReturn<TItem>;
  search: ListSearchConfigSetterFns<TItem>;
  match: ListConfigMatchFn<TItem>;
  not: ListConfigNotFn<TItem>;
  divider: ListConfigOptionDividerFn;
  matches: ListConfigMatchesFn<TItem>;
  option: ListConfigOptionFn<TItem>;
  options: ListConfigOptionsFn<TItem>;
  filter: ListConfigFilterFn<TItem>;
  filterPreset: ListConfigFilterPresetFn<TItem>;
  setOperator: ListConfigSetOperatorFn;
  configureSearchParams: ListConfigConfigureSearchParamsFn;
};

export type UseListConfig = <TItem extends object>(
  dataProvider: UseDataProviderFn<TItem>
) => UseListConfigReturn<TItem>;

export type UseListConfigFilterReducerAction =
  | ["register", FilterData]
  | ["update", FilterData];

export type UseListConfigFilterPresetReducerAction =
  | ["register", FilterPresetData]
  | ["update", FilterPresetData];

// LIST FILTERS ---------------------------------------------------------------------------------

export type GetFilterByIdFn<TItem extends object> = GenericFn<
  [id: string],
  Nullable<Filter<TItem>>
>;

export type GetFilterBySignatureFn<TItem extends object> = GenericFn<
  [signature: FilterSignature],
  Nullable<Filter<TItem>>
>;

export type GetFilterByLabelFn<TItem extends object> = GenericFn<
  [label: string],
  Nullable<Filter<TItem>>
>;

export type UseListFiltersReturn<TItem extends object> = {
  /**
   * The list's filters
   *
   * @type {Filter<TItem>[]}
   */
  filters: Filter<TItem>[];
  /**
   * Whether the list's filters are loading
   *
   * @type {boolean}
   */
  filtersLoading: boolean;
  /**
   * Gets a filter by its id
   *
   * @type {GetFilterByIdFn<TItem>}
   */
  getFilterById: GetFilterByIdFn<TItem>;
  /**
   * Gets a filter by its signature
   *
   * @type {GetFilterBySignatureFn<TItem>}
   */
  getFilterBySignature: GetFilterBySignatureFn<TItem>;
  /**
   * Gets a filter by its label
   *
   * @type {GetFilterByLabelFn<TItem>}
   */
  getFilterByLabel: GetFilterByLabelFn<TItem>;
  /**
   * Clears all filters
   *
   * @type {VoidFn}
   */
  clearAllFilters: VoidFn;
};

export type UseListFilters = <TItem extends object>(
  config: Pick<ListContextConfig<TItem>, "filters">,
  listOptions: UseListOptionsReturn<TItem>
) => UseListFiltersReturn<TItem>;

// LIST OPTIONS ---------------------------------------------------------------------------------

export type GetOptionBySignatureFn<TItem extends object> = GenericFn<
  [optionSignature: FilterSignature],
  Nullable<FilterOptionData<TItem>>
>;

export type UpdateOptionSelectionFn = VoidFn<
  [
    optionSignature: FilterSignature,
    selected: boolean,
    multi?: boolean,
    isFilterOption?: IsFilterOptionFn
  ]
>;

export type UseListOptionsReturn<TItem extends object> = {
  /**
   * The list's options, wrapped in a useDataArray hook
   *
   * @type {UseDataArrayReturn<FilterOptionData<TItem>>}
   */
  options: UseDataArrayReturn<FilterOptionData<TItem>>;
  /**
   * Updates a list option's selection
   */
  updateOptionSelection: UpdateOptionSelectionFn;
  /**
   * Gets a list option by its signature
   */
  getOptionBySignature: GetOptionBySignatureFn<TItem>;
};

export type UseListOptions = <TItem extends object>(
  config: Pick<ListContextConfig<TItem>, "options" | "filters" | "operator">,
  dataProvider: IDataProvider<TItem>
) => UseListOptionsReturn<TItem>;

// LIST FILTER PRESETS ---------------------------------------------------------------------------

export type UpdateFilterPresetSelectionFn = VoidFn<
  [filterPresetSignature: FilterSignature, selected: boolean]
>;

export type GetFilterPresetBySignatureFn<TItem extends object> = GenericFn<
  [filterPresetSignature: FilterSignature],
  Nullable<FilterPreset<TItem>>
>;

export type UseListFilterPresetsReturn<TItem extends object> = {
  /**
   * The list's filter presets
   *
   * @type {FilterPreset<TItem>[]}
   */
  filterPresets: FilterPreset<TItem>[];
  /**
   * Whether the list's filter presets are loading
   * Could be the case if some are async or while fetching their counts
   *
   * @type {boolean}
   */
  filterPresetsLoading: boolean;
  /**
   * Updates a filter preset's selection
   * by selecting / unselecting its options
   *
   * @type {UpdateFilterPresetSelectionFn}
   */
  updateFilterPresetSelection: UpdateFilterPresetSelectionFn;
  /**
   * Gets a filter preset by its signature
   *
   * @type {GetFilterPresetBySignatureFn<TItem>}
   */
  getFilterPresetBySignature: GetFilterPresetBySignatureFn<TItem>;
};

export type UseListFilterPresets = <TItem extends object>(
  config: Pick<ListContextConfig<TItem>, "filterPresets">,
  options: UseListOptionsReturn<TItem>,
  dataProvider: IDataProvider<TItem>
) => UseListFilterPresetsReturn<TItem>;

// LIST CONTEXT ---------------------------------------------------------------------------------

export type ListContextDataProviderRef<TItem extends object> = {
  current: Nullable<IDataProvider<TItem>>;
};

// TODO: update as needed
export type ListContextValue<TItem extends object> = {
  /**
   * The list's data, updated as filters get applied
   *
   * @type {TItem[]}
   */
  data: TItem[];
  /**
   * The list's data provider
   *
   * @type {Nullable<IDataProvider<TItem>>}
   */
  dataProvider: IDataProvider<TItem>;
  /**
   * The list's filters
   *
   * @type {Filter<TItem>[]}
   */
  filters: Filter<TItem>[];
  /**
   * The list's item count
   *
   * @type {number}
   */
  itemCount: number;
  /**
   * Whether the list is loading
   *
   * @type {boolean}
   */
  loading: boolean;
  /**
   * Whether the list's configuration (options, filters, filter presets) is loading
   *
   * @type {boolean}
   */
  configLoading: boolean;
  /**
   * Whether the list context is missing
   *
   * @type {boolean}
   */
  contextMissing: boolean;
  /**
   * Gets a filter by its id
   */
  getFilterById: GetFilterByIdFn<TItem>;
  /**
   * Gets a filter by its signature
   */
  getFilterBySignature: GetFilterBySignatureFn<TItem>;
  /**
   * Gets a filter option by its signature
   */
  getOptionBySignature: GetOptionBySignatureFn<TItem>;
  /**
   * Clears all filters
   */
  clearAllFilters: VoidFn;
} & UseListFilterPresetsReturn<TItem> &
  UseListFiltersReturn<TItem> &
  Replace<
    UseListOptionsReturn<TItem>,
    "options",
    {
      options: FilterOptionData<TItem>[];
    }
  >;

// LIST PROVIDER --------------------------------------------------------------------------------

export type ListProviderProps<TItem extends object> = {
  /**
   * The list provider's configuration
   * @remarks Gets passed to the underlying context
   *
   * @type {Nullable<ListContextConfig<TItem>>}
   * @default null
   */
  config?: Nullable<ListContextConfig<TItem>>;
  /**
   * The provider's children
   * @type {ReactNode}
   */
  children?: ReactNode;
};
