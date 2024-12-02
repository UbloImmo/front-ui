import type {
  IFilterOption,
  FilterOptionData,
} from "../FilterOption/FilterOption.types";
import type {
  FilterSignature,
  FilterBooleanOperator,
  FilterVisualData,
} from "../shared.types";
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
};

export type FilterData = Required<
  FilterConfig & FilterBehavior & FilterVisualData
> & {
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
   * @type {IFilterOption[]}
   */
  optionSignatures: FilterSignature[];
};

export interface IFilter<TItem extends object> extends FilterData {
  /**
   * Whether the filter is active (e.g. has at least one selected options)
   *
   * @type {boolean}
   */
  active: boolean;
  /**
   * The options of the filter
   *
   * @type {IFilterOption[]}
   */
  options: IFilterOption<TItem>[];
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
   * @type {IFilterOption<TItem>[]}
   */
  selectedOptions: IFilterOption<TItem>[];
}

export type ListConfigFilterFnParams<TItem extends object> = [
  label: string,
  optionsOrSignatures: (FilterSignature | FilterOptionData<TItem>)[],
  config?: FilterConfig,
  loading?: boolean
];

export type ListConfigFilterFn<TItem extends object> = GenericFn<
  ListConfigFilterFnParams<TItem>,
  FilterData
>;

export type ListConficAsyncFilterDataFnParams<TItem extends object> = [
  label: string,
  optionsOrSignaturesPromise: Promise<
    (FilterSignature | FilterOptionData<TItem>)[]
  >,
  config?: FilterConfig
];

export type ListConfigAsyncFilterFn<TItem extends object> = AsyncFn<
  ListConficAsyncFilterDataFnParams<TItem>,
  Nullable<FilterData>
>;

export type IsFilterOptionFn = GenericFn<
  [optionSignature: FilterSignature],
  boolean
>;
