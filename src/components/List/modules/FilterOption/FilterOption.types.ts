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

/**
 * The functional data of a filter option match
 * Used to match against an item's value
 */
export type FilterOptionMatch<TItem extends object> = {
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
   */
  comparison: FilterComparisonOperator;
  /**
   * The property to filter on if different than the containing filter's property
   *
   * @type {FilterProperty}
   */
  property: FilterProperty<TItem>;
};

/**
 * The parameters of the match function
 * - Either a single {@link FilterOptionMatch} object
 * - Or a {@link FilterProperty property}, {@link FilterComparisonOperator comparison} and {@link FilterOptionValue value}
 */
export type ListConfigMatchFnParams<TItem extends object> =
  | [match: FilterOptionMatch<TItem>]
  | [
      property: FilterProperty<TItem>,
      comparison: FilterComparisonOperator,
      value: FilterOptionValue,
    ];

/**
 * A function that creates a filter option match from {@link ListConfigMatchFnParams its parameters}
 *
 * @throws If the number of parameters are invalid
 *
 * @template {object} TItem - The type of the items to filter on
 *
 * @returns {FilterOptionMatch<TItem>} The created filter option match
 */
export interface ListConfigMatchFn<TItem extends object> {
  (match: FilterOptionMatch<TItem>): FilterOptionMatch<TItem>;
  (
    property: FilterProperty<TItem>,
    comparison: FilterComparisonOperator,
    value: FilterOptionValue,
  ): FilterOptionMatch<TItem>;
}

/**
 * A function that multiple matches for the same property and comparison but multiple values
 *
 * @template {object} TItem - The type of the items to filter on
 *
 * @returns {FilterOptionMatch<TItem>[]} The created filter option matches
 */
export type ListConfigMatchesFn<TItem extends object> = GenericFn<
  [
    property: FilterProperty<TItem>,
    comparison: FilterComparisonOperator,
    values: FilterOptionValue[],
  ],
  FilterOptionMatch<TItem>[]
>;

export type FilterOptionBehavior = {
  /**
   * Whether the filter option is a default option, that gets applied during the first render and when a filter is cleared
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

export type FilterOptionConfig = Omit<FilterOptionVisualData, "label"> &
  FilterOptionBehavior & {
    /**
     * The boolean operator used to combine matches
     *
     * @type {FilterBooleanOperator}
     * @default "AND"
     */
    operator?: FilterBooleanOperator;
  };

/**
 * The data of a filter option
 */
export type FilterOptionData<TItem extends object> = Required<
  FilterOptionVisualData & FilterOptionBehavior
> & {
  /**
   * The data of the filter option
   *
   * @type {FilterOptionMatch<TItem>[]}
   */
  matches: FilterOptionMatch<TItem>[];
  /**
   * A boolean operator used to combine matches
   *
   * @type {FilterBooleanOperator}
   * @default "AND"
   */
  operator: FilterBooleanOperator;
  /**
   * The signature of the filter option
   * Used to identify a filter option when comparing them
   *
   * @remarks Built from the label and the matches
   *
   * @type {FilterSignature}
   */
  signature: FilterSignature;
  /**
   * The palette color of the filter option
   *
   * @type {PaletteColor}
   * @default "gray-600"
   */
  paletteColor: PaletteColor;

  /**
   * The color key of the filter option
   *
   * @type {ColorKey}
   * @default "gray"
   */
  colorKey: ColorKey;
  /**
   * Whether the filter option is selected
   *
   * @type {boolean}
   * @default false
   */
  selected: boolean;
};

/**
 * The callbacks of a filter option
 */
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

/**
 * A filter option with the callbacks
 */
export type FilterOption<TItem extends object> = FilterOptionData<TItem> &
  FilterOptionModuleCallbacks;

export type ListConfigOptionFnParams<TItem extends object> = [
  /**
   * The label of the generated filter option
   *
   * @type {string}
   * @required
   */
  label: string,
  /**
   * The match or matches to create the filter option from
   *
   * @type {FilterOptionMatch<TItem> | FilterOptionMatch<TItem>[]}
   * @required
   */
  matchOrMatches: FilterOptionMatch<TItem> | FilterOptionMatch<TItem>[],
  /**
   * The config of the generated filter option
   *
   * @type {FilterOptionConfig}
   * @default {}
   */
  config?: FilterOptionConfig,
];

/**
 * A function that creates a filter option from the provided data
 *
 * @param {string} label - The label of the generated filter option
 * @param {FilterOptionMatch<TItem> | FilterOptionMatch<TItem>[]} matchOrMatches - The match or matches to create the filter option from
 * @param {FilterOptionConfig} [config = {}] - The config of the generated filter option, gets merged with the shared config
 * @returns {FilterOptionData<TItem>} The created filter option
 */
export type ListConfigOptionFn<TItem extends object> = GenericFn<
  ListConfigOptionFnParams<TItem>,
  FilterOptionData<TItem>
>;

/**
 * A labeled filter option value, used to create filter a filter option
 */
export type ListConfigOptionLabeledValue = {
  /**
   * The label of the generated filter option
   *
   * @type {string}
   * @required
   */
  label: string;
  /**
   * The value the generated filter option will match against
   *
   * @type {FilterOptionValue}
   * @required
   */
  value: FilterOptionValue;
  /**
   * The config of the generated filter option, gets merged with the shared config
   *
   * @type {FilterOptionConfig}
   * @default {}
   */
  config?: FilterOptionConfig;
};

/**
 * A function that creates a filter option from every labeled value it receives
 *
 * @param {FilterProperty<TItem>} property - The property to filter on
 * @param {FilterComparisonOperator} comparison - The comparison operator to use for the filter option
 * @param {ListConfigOptionLabeledValue[]} labeledValues - The labeled values to create filter options from
 * @param {FilterOptionConfig} sharedConfig - The shared config for the filter options
 * @returns {FilterOptionData<TItem>[]} The created filter options
 */
export type ListConfigOptionsFn<TItem extends object> = GenericFn<
  [
    /**
     * The single property the generated options will match
     *
     * @type {FilterProperty<TItem>}
     */
    property: FilterProperty<TItem>,
    /**
     * The comparison operator to use for the generated options
     *
     * @type {FilterComparisonOperator}
     */
    comparison: FilterComparisonOperator,
    /**
     * The labeled values to create filter options from
     *
     * @type {ListConfigOptionLabeledValue[]}
     */
    labeledValues: ListConfigOptionLabeledValue[],
    /**
     * The shared config for the generated options
     * Gets merged with the labeled value's config
     *
     * @type {FilterOptionConfig}
     * @default {}
     */
    sharedConfig?: FilterOptionConfig,
  ],
  FilterOptionData<TItem>[]
>;

/**
 * A function that returns the labeled values for the async options
 *
 * @returns {ListConfigOptionLabeledValue[]} The labeled values
 */
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
  /**
   * The comparison operator to use for the async options
   *
   * @type {FilterComparisonOperator}
   */
  comparison: FilterComparisonOperator,
  /**
   * A function that returns the labeled values for the async options
   *
   * @type {ListConfigAsyncOptionsGetLabeledValuesFn}
   */
  labeledValuesGetter: ListConfigAsyncOptionsGetLabeledValuesFn,
  /**
   * The shared config for the async options
   *
   * @type {FilterOptionConfig}
   */
  sharedConfig?: FilterOptionConfig,
];

/**
 * A function that loads async options and registers them
 */
export type ListConfigAsyncOptionsFn<TItem extends object> = AsyncFn<
  ListConfigAsyncOptionsFnParams<TItem>,
  FilterOptionData<TItem>[]
>;

export type ListConfigAsyncOptionMatchGetterFn<TItem extends object> = AsyncFn<
  [],
  FilterOptionMatch<TItem> | FilterOptionMatch<TItem>[]
>;

export type ListConfigAsyncOptionFnParams<TItem extends object> = [
  /**
   * The label of the generated filter option
   *
   * @type {string}
   * @required
   */
  label: string,
  /**
   * An async callback that returns the match or matches to create the filter option from
   *
   * @type {ListConfigAsyncOptionMatchGetterFn<TItem>}
   * @required
   */
  matchOrMatchesGetter: ListConfigAsyncOptionMatchGetterFn<TItem>,
  /**
   * The config of the generated filter option
   *
   * @type {FilterOptionConfig}
   * @default {}
   */
  config?: FilterOptionConfig,
];

/**
 * A function that creates a filter option from the provided data
 *
 * @param {string} label - The label of the generated filter option
 * @param {ListConfigAsyncOptionMatchGetterFn<TItem>} matchOrMatchesGetter - An async callback that returns the match or matches to create the filter option from
 * @param {FilterOptionConfig} [config = {}] - The config of the generated filter option, gets merged with the shared config
 * @returns {Promise<FilterOptionData<TItem>>} The created filter option
 * @throws If the async callback throws an error
 */
export type ListConfigAsyncOptionFn<TItem extends object> = AsyncFn<
  ListConfigAsyncOptionFnParams<TItem>,
  FilterOptionData<TItem>
>;

/**
 * A function that negates a match
 *
 * @type {GenericFn<[match: FilterOptionMatch<TItem>], FilterOptionMatch<TItem>>}
 *
 * @param {FilterOptionMatch<TItem>} match - The match to negate
 * @returns {FilterOptionMatch<TItem>} The negated match
 */
export type ListConfigNotFn<TItem extends object> = GenericFn<
  [match: FilterOptionMatch<TItem>],
  FilterOptionMatch<TItem>
>;

export type FilterOptionMap<TItem extends object> = Map<
  FilterSignature,
  FilterOptionData<TItem>
>;

export type FilterOptionDataOrSignature<TItem extends object> =
  | FilterOptionData<TItem>
  | FilterSignature;
