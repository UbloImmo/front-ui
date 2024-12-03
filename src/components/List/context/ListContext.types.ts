import type {
  FilterBooleanOperator,
  FilterConfig,
  FilterData,
  FilterOptionData,
  FilterPreset,
  FilterPresetData,
  FilterSignature,
  IDataProvider,
  IFilter,
  IsFilterOptionFn,
  ListConfigAsyncFilterFn,
  ListConfigAsyncFilterPresetFn,
  ListConfigAsyncOptionsFn,
  ListConfigFilterFn,
  ListConfigFilterPresetFn,
  ListConfigMatchFn,
  ListConfigMatchesFn,
  ListConfigOptionFn,
  ListConfigOptionsFn,
  UseDataProviderFn,
} from "../modules";
import type { UseDataArrayReturn } from "@types";
import type {
  GenericFn,
  Nullable,
  Replace,
  VoidFn,
} from "@ubloimmo/front-util";
import type { ReactNode } from "react";

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
   * @type {Nullable<IFilter<TItem>[]>}
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
};

type ListConfigSetOperatorFn = VoidFn<[operator: FilterBooleanOperator]>;

export type UseListConfigAsyncReturn<TItem extends object> = {
  options: ListConfigAsyncOptionsFn<TItem>;
  filter: ListConfigAsyncFilterFn<TItem>;
  filterPreset: ListConfigAsyncFilterPresetFn<TItem>;
};

export type HydrateFilterConfigFn = GenericFn<
  [config?: FilterConfig],
  FilterConfig
>;

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
  config: ListContextConfig<TItem>;
  async: UseListConfigAsyncReturn<TItem>;
  match: ListConfigMatchFn<TItem>;
  matches: ListConfigMatchesFn<TItem>;
  option: ListConfigOptionFn<TItem>;
  options: ListConfigOptionsFn<TItem>;
  filter: ListConfigFilterFn<TItem>;
  filterPreset: ListConfigFilterPresetFn<TItem>;
  setOperator: ListConfigSetOperatorFn;
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
  [string],
  Nullable<IFilter<TItem>>
>;

export type GetFilterBySignatureFn<TItem extends object> = GenericFn<
  [FilterSignature],
  Nullable<IFilter<TItem>>
>;

export type UseListFiltersReturn<TItem extends object> = {
  /**
   * The list's filters
   *
   * @type {IFilter<TItem>[]}
   */
  filters: IFilter<TItem>[];
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
   * @type {IFilter<TItem>[]}
   */
  filters: IFilter<TItem>[];
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
