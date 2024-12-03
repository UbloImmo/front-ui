import type { FilterData } from "../Filter/Filter.types";
import type {
  FilterBooleanOperator,
  FilterComparisonOperator,
  FilterOptionVisualData,
  FilterProperty,
  FilterSignature,
} from "../shared.types";
import type { ColorKey, PaletteColor } from "@/types/themes";
import type { AsyncFn, GenericFn, VoidFn } from "@ubloimmo/front-util";

/**
 * The value to filter on
 *
 * @type {string | number | boolean | Date | null}
 */
export type FilterOptionValue = string | number | boolean | Date | null;

export type FilterOptionSubscription<TItem extends object> = VoidFn<
  [IFilterOption<TItem>]
>;

/**
 * The data of a filter option
 * Used to match the value against the property
 */
export type FilterOptionMatchInput<TItem extends object> = {
  /**
   * The option's value
   *
   * @type {FilterOptionValue}
   */
  value: FilterOptionValue;
  /**
   * The comparison operator, used to match the value against the property
   *
   * @type {FilterComparisonOperator}
   * @default "="
   */
  comparison?: FilterComparisonOperator;
  /**
   * The property to filter on if different than the containing filter's property
   *
   * @type {FilterProperty}
   */
  property?: FilterProperty<TItem>;
};
/**
 * The data of a filter option
 */
export type FilterOptionMatch<TItem extends object> = Required<
  FilterOptionMatchInput<TItem>
>;

export type ListConfigMatchFnParams<TItem extends object> =
  | [FilterOptionMatch<TItem>]
  | [FilterProperty<TItem>, FilterComparisonOperator, FilterOptionValue];

export interface ListConfigMatchFn<TItem extends object> {
  (match: FilterOptionMatch<TItem>): FilterOptionMatch<TItem>;
  (
    property: FilterProperty<TItem>,
    comparison: FilterComparisonOperator,
    value: FilterOptionValue
  ): FilterOptionMatch<TItem>;
}

export type ListConfigMatchesFn<TItem extends object> = GenericFn<
  [
    property: FilterProperty<TItem>,
    comparison: FilterComparisonOperator,
    values: FilterOptionValue[]
  ],
  FilterOptionMatch<TItem>[]
>;

export type FilterOptionBehavior = {
  /**
   * Whether the filter option is a default option, that gets applied at all times
   *
   * @type {boolean}
   * @default false
   */
  default?: boolean;
  /**
   * Whether the filter option is initially selected, but can be unselected
   *
   * @type {boolean}
   * @default false
   */
  initial?: boolean;
  /**
   * Whether the filter option is fixed, meaning it cannot ever be unselected
   *
   * @type {boolean}
   * @default false
   */
  fixed?: boolean;
  /**
   * Whether the filter option is disabled
   *
   * @type {boolean}
   * @default false
   */
  disabled?: boolean;
  /**
   * Whether the filter option is hidden and is not displayed in the filter options list
   *
   * @type {boolean}
   * @default false
   */
  hidden?: boolean;
};

/**
 * A filter option with a single value
 */
export type FilterSingleOptionInput<TItem extends object> =
  FilterOptionVisualData &
    FilterOptionBehavior & {
      /**
       * The data of the filter option
       *
       * @type {FilterOptionMatchInput}
       */
      match: FilterOptionMatchInput<TItem>;
    };

/**
 * A filter option with a combined value
 */
export type FilterCombinedOptionInput<TItem extends object> =
  FilterOptionVisualData &
    FilterOptionBehavior & {
      /**
       * The data of the filter option
       *
       * @type {FilterOptionMatchInput[]}
       */
      matches: FilterOptionMatchInput<TItem>[];
      /**
       * A boolean operator used to combine matches
       *
       * @type {FilterBooleanOperator}
       * @default "AND"
       */
      operator?: FilterBooleanOperator;
    };

export type FilterOptionConfig = Omit<FilterOptionVisualData, "label"> &
  FilterOptionBehavior & {
    operator?: FilterBooleanOperator;
  };

export type FilterOptionData<TItem extends object> = Required<
  FilterOptionVisualData & FilterOptionBehavior
> & {
  /**
   * The data of the filter option
   *
   * @type {FilterOptionMatchInput[]}
   */
  matches: FilterOptionMatch<TItem>[];
  /**
   * A boolean operator used to combine matches
   *
   * @type {FilterBooleanOperator}
   */
  operator: FilterBooleanOperator;
  /**
   * The signature of the filter option
   * Used to identify a filter option when comparing them
   *
   * @type {FilterSignature}
   */
  signature: FilterSignature;
  /**
   * The palette color of the filter option
   *
   * @type {PaletteColor}
   */
  paletteColor: PaletteColor;

  /**
   * The color key of the filter option
   *
   * @type {ColorKey}
   */
  colorKey: ColorKey;
  /**
   * Whether the filter option is selected
   *
   * @type {boolean}
   */
  selected: boolean;
};

export type FilterOptionModuleCallbacks = {
  /**
   * Select the filter option
   */
  select: VoidFn;
  /**
   * Unselect the filter option
   */
  unselect: VoidFn;
};

export interface IFilterOption<TItem extends object>
  extends FilterOptionData<TItem>,
    FilterOptionModuleCallbacks {}

export type ListConfigOptionFnParams<TItem extends object> = [
  label: string,
  matchOrMatches: FilterOptionMatch<TItem> | FilterOptionMatch<TItem>[],
  config?: FilterOptionConfig
];

export type ListConfigOptionFn<TItem extends object> = GenericFn<
  ListConfigOptionFnParams<TItem>,
  FilterOptionData<TItem>
>;

export type ListConfigOptionLabeledValue = {
  label: string;
  value: FilterOptionValue;
  config?: FilterOptionConfig;
};

export type ListConfigOptionsFn<TItem extends object> = GenericFn<
  [
    property: FilterProperty<TItem>,
    comparison: FilterComparisonOperator,
    labeledValues: ListConfigOptionLabeledValue[],
    sharedConfig?: FilterOptionConfig
  ],
  FilterOptionData<TItem>[]
>;

export type ListConfigAsyncOptionsGetLabeledValuesFn = AsyncFn<
  [],
  ListConfigOptionLabeledValue[]
>;

export type ListConfigAsyncOptionsFnParams<TItem extends object> = [
  /**
   * A unique key for the async options
   *
   * Used to identify the async options when resolving them
   * and using them inside filters and filter presets
   *
   * @type {string}
   */
  property: FilterProperty<TItem>,
  comparison: FilterComparisonOperator,
  labeledValuesGetter: ListConfigAsyncOptionsGetLabeledValuesFn,
  sharedConfig?: FilterOptionConfig
];

/**
 * A function that loads async options and registers them
 */
export type ListConfigAsyncOptionsFn<TItem extends object> = AsyncFn<
  ListConfigAsyncOptionsFnParams<TItem>,
  FilterOptionData<TItem>[]
>;

export type FilterOptionMap<TItem extends object> = Map<
  FilterSignature,
  FilterOptionData<TItem>
>;

export type FilterDataMap = Map<FilterSignature, FilterData>;

export type FilterOptionOrSignature<TItem extends object> =
  | FilterOptionData<TItem>
  | FilterSignature;
