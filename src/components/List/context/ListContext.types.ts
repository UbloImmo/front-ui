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
  FilterSearchOperator,
  DataProviderFilterParam,
  DataProviderType,
  DataProviderFilterFnConfig,
  DataProviderFilterFnSearchConfig,
  ListConfigSortFn,
  SortData,
  SortDataEntries,
  ListConfigSortsFn,
  SortMap,
  Sort,
  FilterOptionMap,
} from "../modules";
import type { UseMapReturn } from "@types";
import type {
  GenericFn,
  MaybeAsyncFn,
  Nullable,
  VoidFn,
} from "@ubloimmo/front-util";
import type { ReactNode } from "react";

// LIST SEARCH PARAMS ---------------------------------------------------------------------------

export type UseListContextSearchParamsReturn = {
  initialSynced: boolean;
};

export type UseListContextSearchParams = <TItem extends object>(
  config: Pick<ListContextConfig<TItem>, "searchParams">,
  options: UseListOptionsReturn<TItem>,
  sorts: UseListSortsReturn<TItem>,
  configLoading: boolean
) => UseListContextSearchParamsReturn;

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
 * The list's search configuration object
 */
export type ListSearchConfig<TItem extends object> = {
  /**
   * The initial search query
   * Defaults to null
   *
   * @type {Nullable<string>}
   * @default null
   */
  initialQuery?: Nullable<string>;
  /**
   * The properties to match against the search query
   *
   * @type {FilterProperty<TItem>[]}
   * @default []
   */
  properties?: FilterProperty<TItem>[];
  /**
   * The search strategy used to match the search query against the properties
   *
   * @type {FilterSearchOperator}
   * @default "contains"
   */
  strategy?: FilterSearchOperator;
  /**
   * Whether the search query should be sent as bespoke options to the data provider
   *
   * @remarks
   * If false, **pure** filter payloads sent to the data provider,
   * without generated additions based on the query and search config.
   *
   * The search query and its configuration will always be sent seperately under `config.search`.
   *
   * @default true
   */
  searchAsOptions?: boolean;
  /**
   * The debounce delay in milliseconds
   *
   * @type {number}
   * @default 300
   */
  debounceDelay?: number;
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
 * @param {FilterSearchOperator} strategy - The strategy to set
 * @returns {void}
 */
export type ListSearchConfigStrategySetterFn = VoidFn<
  [strategy: FilterSearchOperator]
>;

/**
 * Sets the list's search initial query
 *
 * @param {Nullable<string>} initialQuery - The initial query to set
 * @returns {void}
 */
export type ListSearchConfigInitialQuerySetterFn = VoidFn<
  [initialQuery: Nullable<string>]
>;

/**
 * Sets the list's search debounce delay
 *
 * @param {number} debounceDelay - The debounce delay to set
 * @returns {void}
 */
export type ListSearchConfigDebounceDelaySetterFn = VoidFn<
  [debounceDelay: number]
>;

/**
 * Sets the list's search as options
 *
 * @param {boolean} searchAsOptions - Whether the search query should be sent as bespoke options to the data provider
 * @returns {void}
 */
export type ListSearchConfigSearchAsOptionsSetterFn = VoidFn<
  [searchAsOptions: boolean]
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
   * Sets the search initial query
   *
   * @see {@link ListSearchConfigInitialQuerySetterFn}
   */
  initialQuery: ListSearchConfigInitialQuerySetterFn;
  /**
   * Sets the search debounce delay
   *
   * @see {@link ListSearchConfigDebounceDelaySetterFn}
   */
  debounceDelay: ListSearchConfigDebounceDelaySetterFn;
  /**
   * Sets the search as options
   *
   * @see {@link ListSearchConfigSearchAsOptionsSetterFn}
   */
  searchAsOptions: ListSearchConfigSearchAsOptionsSetterFn;
};

export type UseListSearchConfigReturn<TItem extends object> = {
  searchConfig: Required<ListSearchConfig<TItem>>;
  setters: ListSearchConfigSetterFns<TItem>;
};

export type UseListSearchConfig = <
  TItem extends object,
>() => UseListSearchConfigReturn<TItem>;

// LIST CONFIG ----------------------------------------------------------------------------------

export type ListContextConfig<
  TItem extends object,
  TProviderType extends DataProviderType = DataProviderType,
> = {
  /**
   * The list's data provider: a hook that implements the IDataProvider interface
   *
   * @type {UseDataProviderFn<TItem, TProviderType>}
   * @required
   */
  useDataProvider: UseDataProviderFn<TItem, TProviderType>;
  /**
   * The list's options
   *
   * @type {Nullable<FilterOptionData<TItem>[]>}
   * @default null
   *
   * @deprecated use `optionsMap` instead
   */
  options?: Nullable<FilterOptionData<TItem>[]>;
  /**
   * Map of all loaded and / or loading options
   */
  optionsMap?: Nullable<FilterOptionMap<TItem>>;
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
  /**
   * The list's sorting configuration
   * A map that holds at most one sort per filter property
   */
  sorts?: SortMap<TItem>;
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

export type UseListConfigReturn<
  TItem extends object,
  TProviderType extends DataProviderType = DataProviderType,
> = {
  config: Required<ListContextConfig<TItem, TProviderType>>;
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
  sort: ListConfigSortFn<TItem>;
  sorts: ListConfigSortsFn<TItem>;
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

export type UseListConfigSortReducerAction<
  TItem extends object,
  TProperty extends FilterProperty<TItem> = FilterProperty<TItem>,
> =
  | ["register", SortData<TItem, TProperty>]
  | ["register-multiple", SortDataEntries<TItem>];

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
    filter?: Pick<FilterData, "multi" | "optionSignatures">,
    autoCommitMutation?: boolean,
  ]
>;

export type ApplyOptionsFn<TItem extends object> = VoidFn<
  [extraFilters?: DataProviderFilterParam<TItem>[]]
>;

export type UseListOptionsReturn<TItem extends object> = {
  /**
   * The list's reactive options map
   *
   * @type {FilterOptionMap<TItem>}
   */
  readonly optionsMap: UseMapReturn<
    FilterSignature,
    FilterOptionData<TItem>,
    FilterOptionMap<TItem>
  >;
  /**
   * Reference to the set of all currently selected options' signatures
   *
   * @type {Set<FilterSignature>}
   */
  readonly selectedOptionSignatures: Set<FilterSignature>;
  /**
   * Updates a list option's selection
   *
   * @param {FilterSignature} optionSignature - The option signature to update
   * @param {boolean} selected - Whether the option should be selected
   * @param {boolean} multi - Whether other options assigned to the same filter stay selected
   * @param {IsFilterOptionFn} isFilterOption - Whether the option is a filter option
   * @param {boolean} [autoCommitMutation=true] - Whether to cause a renderer.
   */
  updateOptionSelection: UpdateOptionSelectionFn;
  /**
   * Gets a list option by its signature
   *
   * @param {FilterSignature} optionSignature - The option signature to get
   * @returns {Nullable<FilterOptionData<TItem>>} The option or null if not found
   */
  getOptionBySignature: GetOptionBySignatureFn<TItem>;
  /**
   * Applies the current options to the data provider, filtering the data
   *
   * @param {DataProviderFilterParam<TItem>[]} extraFilters - Additional filters to apply
   */
  applyOptions: ApplyOptionsFn<TItem>;
};

/**
 * Internal callback to trigger the data provider's filter method after hydration with search query and sorting config
 */
export type TriggerDataProviderFilterFn<TItem extends object> = MaybeAsyncFn<
  [config: Omit<DataProviderFilterFnConfig<TItem>, "search" | "activeSorts">]
>;

export type UseListOptions = <TItem extends object>(
  config: Pick<ListContextConfig<TItem>, "options" | "filters" | "operator">,
  triggerDataProviderFilter: TriggerDataProviderFilterFn<TItem>
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

// LIST SEARCH ---------------------------------------------------------------------------------

/**
 * Changes the list's search query
 *
 * @param {Nullable<string>} query - The new query to set
 * @returns {void}
 */
export type UseListSearchChangeQueryFn = VoidFn<[query: Nullable<string>]>;

export type UseListSearchReturn<TItem extends object> = {
  /**
   * The list's search query, normalized to be an empty string if not set
   *
   * @type {string}
   */
  query: string;
  /**
   * The list's search filters, generated from the search query and search config
   *
   * @type {DataProviderFilterParam<TItem>[]}
   */
  queryFilters: DataProviderFilterParam<TItem>[];
  /**
   * Changes the list's search query, debounced
   *
   * @type {UseListSearchChangeQueryFn}
   */
  changeQuery: UseListSearchChangeQueryFn;
  /**
   * The list's search config, hydrated with the search query
   *
   * @type {Nullable<DataProviderFilterFnSearchConfig<TItem>>}
   */
  hydratedSearchConfig: Nullable<DataProviderFilterFnSearchConfig<TItem>>;
};

export type UseListSearch = <TItem extends object>(
  config: ListSearchConfig<TItem>
) => UseListSearchReturn<TItem>;

// LIST SORTS -----------------------------------------------------------------------------------

/**
 * Mutates a single list {@link Sort} by referencing it using its property
 */
export interface MutateListSortFn<TItem extends object> {
  <TProperty extends FilterProperty<TItem>>(property: TProperty): void;
}

/**
 * Finds a single list {@link Sort} by its property, or null if not found
 */
export interface GetListSortFn<TItem extends object> {
  <TProperty extends FilterProperty<TItem>>(
    property: TProperty
  ): Nullable<Sort<TItem, TProperty>>;
}

/**
 * Internal callback used to update the list's sort configuration's flags.
 * Used during batch updates in order to avoid excessive rerenders
 *
 * @private
 */
export interface SetInternalListSortFlagRefsFn<TItem extends object> {
  <TProperty extends FilterProperty<TItem>>(
    property: TProperty,
    state: Pick<SortData<TItem, TProperty>, "active" | "inverted">
  ): void;
}

export type UseListSortsReturn<TItem extends object> = {
  /**
   * Reactive Map holding currently loaded list {@link SortData}
   */
  sortMap: UseMapReturn<
    FilterProperty<TItem>,
    SortData<TItem, FilterProperty<TItem>>,
    SortMap<TItem>
  >;
  /**
   * Array holding active list {@link Sort Sorts}, in application order
   */
  readonly activeSorts: Sort<TItem, FilterProperty<TItem>>[];
  /**
   * Set holding the currently active list sorts
   */
  readonly activeSortProperties: Set<FilterProperty<TItem>>;
  /**
   * Set holding the currently inverted list sorts
   */
  readonly invertedSortProperties: Set<FilterProperty<TItem>>;
  /**
   * Reactive state holding the currenly prioritized list {@link Sort}'s property, or null if none are.
   */
  readonly highlightedSortProperty: Nullable<FilterProperty<TItem>>;
  /**
   * Prioritizes a single list {@link Sort} by referencing its property.
   *
   * @remarks
   * Only one sort may be prioritized at a time.
   * Unknown properties not associated with a loaded sort will be ignored.
   */
  prioritizeSort: MutateListSortFn<TItem>;
  /**
   * Activates a single list {@link Sort} by referencing its property
   */
  activateSort: MutateListSortFn<TItem>;
  /**
   * Deactivates a single list {@link Sort} by referencing its property
   */
  deactivateSort: MutateListSortFn<TItem>;
  /**
   * Toggles a single list {@link Sort}'s activation by referencing its property
   */
  toggleSort: MutateListSortFn<TItem>;
  /**
   * Inverts a single list {@link Sort}'s order by referencing its property
   */
  invertSort: MutateListSortFn<TItem>;
  /**
   * Resets a single list {@link Sort}'s activation & inversion referencing its property
   */
  resetSort: MutateListSortFn<TItem>;
  /**
   * Finds & returns a single list {@link Sort} using its property, or null if not found
   */
  getSort: GetListSortFn<TItem>;
  /**
   * @private Internal API, do not use
   */
  setInternalSortFlagRefs: SetInternalListSortFlagRefsFn<TItem>;
};

// LIST CONTEXT ---------------------------------------------------------------------------------

export type ListContextDataProviderRef<TItem extends object> = {
  current: Nullable<IDataProvider<TItem>>;
};

// TODO: update as needed
export type ListContextValue<
  TItem extends object,
  TProviderType extends DataProviderType = DataProviderType,
> = {
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
  dataProvider: IDataProvider<TItem, TProviderType>;
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
  UseListSearchReturn<TItem> &
  UseListSortsReturn<TItem> &
  UseListOptionsReturn<TItem>;

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
