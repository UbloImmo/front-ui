import type {
  FilterOption,
  FilterOptionData,
  FilterOptionDataOrSignature,
} from "../FilterOption/FilterOption.types";
import type {
  FilterOptionDivider,
  FilterOptionDividerData,
} from "../FilterOptionDivider";
import type {
  FilterSignature,
  FilterBooleanOperator,
  FilterVisualData,
} from "../shared.types";
import type { MaybePromise } from "@types";
import type { AsyncFn, GenericFn, Nullable } from "@ubloimmo/front-util";

export type FilterBehavior = {
  /**
   * Whether the filter is multi-select and allows selecting more than one option
   *
   * @type {boolean}
   * @default true
   */
  multi?: boolean;
  /**
   * Whether the filter is disabled
   *
   * @type {boolean}
   * @default false
   */
  disabled?: boolean;
  /**
   * Whether the filter is hidden visually but still functional
   *
   * @type {boolean}
   * @default false
   */
  hidden?: boolean;
  /**
   * Whether the filter allows selecting all options
   *
   * @remarks overrides the default behavior of selecting no options when all are enabled
   *
   * @type {boolean}
   * @default false
   */
  allowCompleteSelection?: boolean;
  // TODO:
  // no results if no options selected

  // fallback to defaults if empty

  // select all if empty
};

export type FilterOptionsSort = "asc" | "desc" | "none";

export type FilterConfig = FilterBehavior & {
  /**
   * The comparison operator, used to combine options
   *
   * @type {FilterBooleanOperator}
   * @default "OR"
   */
  operator?: FilterBooleanOperator;
  /**
   * A unique identifier for the filter
   * Used to identify the filter when mutating its options / selection
   *
   * @remarks defaults to the computed signature if missing
   *
   * @type {string}
   */
  id?: string;
  /**
   * An identifier to trigger the filter element during e2e tests
   *
   * @remarks defaults to `list-filter-${id}` if missing
   *
   * @type {string}
   */
  testId?: string;
  /**
   * The label to display when there are no options selected
   *
   * @type {Nullable<string>}
   * @default "All"
   */
  emptyLabel?: Nullable<string>;
  /**
   * The index of the filter in the list
   *
   * @remarks Auto-generated at config time based on declaration order
   *
   * @type {number}
   */
  index?: number;
  /**
   * The sort order of the filter options
   *
   * @type {FilterOptionsSort}
   * @default "none"
   */
  optionsSort?: FilterOptionsSort;
};

export type FilterData = Required<FilterConfig & FilterVisualData> & {
  /**
   * The signature of the filter
   * Used to identify a filter when comparing them
   *
   * @type {FilterSignature}
   */
  signature: FilterSignature;
  /**
   * Whether the filter is loading its options
   *
   * @type {boolean}
   */
  loading: boolean;
  /**
   * The options of the filter
   *
   * @type {FilterSignature[]}
   */
  optionSignatures: FilterSignature[];
  /**
   * The dividers of the filter options
   *
   * @type {FilterOptionDivider[]}
   * @default []
   */
  optionDividers?: FilterOptionDivider[];
};

export interface IFilter<TItem extends object> extends Required<FilterData> {
  /**
   * Whether the filter is active (e.g. has at least one selected options)
   *
   * @type {boolean}
   */
  active: boolean;
  /**
   * The options of the filter
   *
   * @type {FilterOption[]}
   */
  options: FilterOption<TItem>[];
  /**
   * Unselects all options
   */
  clear(): void;

  /**
   * Selects all options
   */
  selectAll(): void;

  /**
   * The selected options
   *
   * @type {FilterOption<TItem>[]}
   */
  selectedOptions: FilterOption<TItem>[];
}

export type ListConfigFilterFnParams<TItem extends object> = [
  /**
   * The label of the filter
   *
   * @type {string}
   */
  label: string,
  /**
   * The options or dividers of the filter
   *
   * @type {(FilterSignature | FilterOptionData<TItem> | FilterOptionDividerData)[]}
   */
  optionsOrDividers: (
    | FilterSignature
    | FilterOptionData<TItem>
    | FilterOptionDividerData
  )[],
  /**
   * The configuration of the filter
   *
   * @type {FilterConfig}
   */
  config?: FilterConfig,
  /**
   * Whether the filter is loading
   *
   * @type {boolean}
   */
  loading?: boolean
];

/**
 * @param {string} label - The label of the filter
 * @param {(FilterSignature | FilterOptionData<TItem> | FilterOptionDividerData)[]} optionsOrDividers - The options or dividers of the filter
 * @param {FilterConfig} config - The configuration of the filter
 * @param {boolean} loading - Whether the filter is loading
 * @returns {FilterData} The data of the filter
 */
export type ListConfigFilterFn<TItem extends object> = GenericFn<
  ListConfigFilterFnParams<TItem>,
  FilterData
>;

export type ListConficAsyncFilterDataFnParams<TItem extends object> = [
  /**
   * The label of the filter
   *
   * @type {string}
   */
  label: string,
  /**
   * The options or signatures of the filter
   *
   * @type {MaybePromise<FilterOptionDataOrSignature<TItem> | FilterOptionDividerData>[]}
   */
  optionsOrSignaturesPromise: MaybePromise<
    MaybePromise<FilterOptionDataOrSignature<TItem> | FilterOptionDividerData>[]
  >,
  /**
   * The configuration of the filter
   *
   * @type {FilterConfig}
   */
  config?: FilterConfig
];

/**
 * @param {string} label - The label of the filter
 * @param {(FilterOptionDataOrSignature<TItem> | FilterOptionDividerData)[]} optionsOrSignaturesPromise - The options or signatures of the filter
 * @param {FilterConfig} config - The configuration of the filter
 * @returns {Nullable<FilterData>} The data of the filter
 */
export type ListConfigAsyncFilterFn<TItem extends object> = AsyncFn<
  ListConficAsyncFilterDataFnParams<TItem>,
  Nullable<FilterData>
>;

export type IsFilterOptionFn = GenericFn<
  [optionSignature: FilterSignature],
  boolean
>;

export type FilterDataMap = Map<FilterSignature, FilterData>;
