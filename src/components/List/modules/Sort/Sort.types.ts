import type { FilterProperty } from "../shared.types";
import type { NonEmptyArr } from "@types";
import type {
  DeepValueOf,
  KeyOf,
  NonNullish,
  Nullable,
  Nullish,
  Optional,
  VoidFn,
} from "@ubloimmo/front-util";

/**
 * Basic sorting order for a single list {@link Sort}.
 * Either `asc`: ascending or `desc`: descending
 */
export type SortOrderBasic = "asc" | "desc";

/**
 * Complex sorting order applied to a single property
 *
 * @example
 * type Item = {
 *  state: "active" | "inactive" | "archived"
 * }
 *
 * const itemSort: SortOrderComplex<Item> = [
 *  "active",
 *  "inactive",
 *  "archived"
 * ]
 */
export type SortOrderComplex<
  TItem extends object,
  TProperty extends FilterProperty<TItem>,
> =
  DeepValueOf<TItem, TProperty> extends string | boolean | number
    ? NonEmptyArr<DeepValueOf<TItem, TProperty>>
    : DeepValueOf<TItem, TProperty> extends Nullish<string | boolean | number>
      ? NonEmptyArr<Nullable<NonNullish<DeepValueOf<TItem, TProperty>>>>
      : never;

/**
 * Sorting order applicable to a list {@link Sort}.
 *
 * Either a {@link SortOrderBasic basic sorting order} or a {@link SortOrderComplex complex one}.
 */
export type SortOrder<
  TItem extends object,
  TProperty extends FilterProperty<TItem>,
> = SortOrderBasic | SortOrderComplex<TItem, TProperty>;

/**
 * The configuration of a single list {@link Sort}
 */
export type SortConfig<
  TItem extends object,
  TProperty extends FilterProperty<TItem>,
> = {
  /**
   * The item property to sort items over
   *
   * @required
   */
  property: TProperty;
  /**
   * The sorting order for the property
   *
   * @default "asc"
   */
  order?: SortOrder<TItem, NoInfer<TProperty>>;
  /**
   * The priority of the sorting order, when multiple are active.
   *
   * The lower the number, the higher the priority.
   *
   * @remarks Only priorities in the range 0 -> Infinity are valid. Negative priorities will get clamped.
   *
   * @default 0
   */
  priority?: number;
};

/**
 * State of a single list {@link Sort}
 */
export type SortState = {
  /**
   * Whether the sort is currently active
   *
   * @default false
   */
  active?: boolean;
  /**
   * Whether the sorting order is currently inverted
   *
   * @default false
   */
  inverted?: boolean;
};

/**
 * Callbacks update a list Sort's {@link SortState}
 */
export type SortModuleCallbacks = {
  /**
   * Sets the Sort to active if not already
   */
  activate: VoidFn;
  /**
   * Deactivates the Sort if previously inactive
   */
  deactivate: VoidFn;
  /**
   * Inverts the Sort's order
   */
  invert: VoidFn;
};

/**
 * {@link SortConfig Configuration}, {@link SortState state} & default state of a single list {@link Sort}.
 */
export type SortData<
  TItem extends object,
  TProperty extends FilterProperty<TItem>,
> = Required<SortConfig<TItem, TProperty>> &
  Required<SortState> & {
    /**
     * Default state of a list {@link Sort}
     */
    readonly defaultState: Readonly<Required<SortState>>;
    /**
     * Default priority of a list {@link Sort}
     */
    readonly defaultPriority: number;
  };

/**
 * Represents a list's single sort. Holds configuration, state, default state and callbacks to mutate itself
 */
export type Sort<
  TItem extends object,
  TProperty extends FilterProperty<TItem>,
> = SortData<TItem, TProperty> & SortModuleCallbacks;

/**
 * A single value in a {@link SortDataEntriesInput} map.
 */
export type SortDataEntryInput<
  TItem extends object,
  TProperty extends FilterProperty<TItem>,
> = Omit<SortConfig<TItem, TProperty>, "property"> & {
  defaultState?: SortState;
};

/**
 * Input object used for creating & registering multiple Sort data entries at once
 */
export type SortDataEntriesInput<TItem extends object> = {
  [TProperty in FilterProperty<TItem>]?: SortDataEntryInput<TItem, TProperty>;
};

/**
 * Object that holds multiple unique sort data entries
 */
export type SortDataEntries<TItem extends object> = {
  [TProperty in FilterProperty<TItem>]?: SortData<TItem, TProperty>;
};

export type SortDataEntriesFromInput<
  TItem extends object,
  TEntriesInput extends SortDataEntriesInput<TItem>,
> = Required<
  Pick<
    SortDataEntries<TItem>,
    keyof SortDataEntries<TItem> & KeyOf<TEntriesInput, string | number>
  >
>;

/**
 * Map() extension that uses a {@link SortData sort}'s property as key and its {@link SortData data} as value while properly respecting its generic typing
 */
export interface ISortMap<TItem extends object>
  extends Map<FilterProperty<TItem>, SortData<TItem, FilterProperty<TItem>>> {
  set<TProperty extends FilterProperty<TItem>>(
    key: TProperty,
    value: SortData<TItem, TProperty>
  ): this;
  get<TProperty extends FilterProperty<TItem>>(
    key: TProperty
  ): Optional<SortData<TItem, TProperty>>;
  forEach(
    callbackfn: <TProperty extends FilterProperty<TItem>>(
      value: SortData<TItem, TProperty>,
      key: TProperty,
      map: ISortMap<TItem>
    ) => void,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    thisArg?: any
  ): void;
  /**
   * Sets multiple unique sort data entries at once
   */
  setMultiple(entries: SortDataEntries<TItem>): this;
}

/**
 * Parameters shape of the sort function
 * Contains a single {@link SortConfig} object and optional default {@link SortState}
 */
export type ListConfigSortFnCompoundParams<
  TItem extends object,
  TProperty extends FilterProperty<TItem>,
> = [sortConfig: SortConfig<TItem, TProperty>, defaultState?: SortState];

/**
 * Parameters shape of the sort function
 * Contains a {@link FilterProperty property}, {@link SortOrder order}, and optional priority and default {@link SortState}
 */
export type ListConfigSortFnFlatParams<
  TItem extends object,
  TProperty extends FilterProperty<TItem>,
> = [
  property: TProperty,
  order?: SortOrder<TItem, TProperty>,
  priority?: number,
  defaultState?: SortState,
];

/**
 * Parameters of the sort function
 * - Either {@link ListConfigSortFnFlatParams flattended arguments}
 * - Or {@link ListConfigSortFnCompoundParams compound arguments}
 */
export type ListConfigSortFnParams<
  TItem extends object,
  TProperty extends FilterProperty<TItem>,
> =
  | ListConfigSortFnFlatParams<TItem, TProperty>
  | ListConfigSortFnCompoundParams<TItem, TProperty>;

/**
 * Creates a {@link SortData sort data} object with given configuration & default state propertie.
 *
 * @template {object} TItem - The list item to create a sort data object for.
 * @template {FilterProperty<TItem>} TProperty - The item's property the sort data object is targeting
 * @param {ListConfigSortFnParams<TItem, TProperty>} params - Either compound or flattened sort data creation parameter spread.
 * @returns {SortData<TItem, TProperty>} The sort data object
 */
export interface ListConfigSortFn<TItem extends object> {
  <TProperty extends FilterProperty<TItem>>(
    ...params: ListConfigSortFnParams<TItem, TProperty>
  ): SortData<TItem, TProperty>;
}

/**
 * Iterates over a {@link SortDataEntriesInput unique sort data input map}, creates {@link SortData sort data} objects for each of them, registers them all at once, then returns them.
 *
 * @template {object} TItem - The list item to create multiple sort data objects for.
 * @template {SortDataEntriesInput<TItem>} TEntriesInput - Provided {@link SortDataEntriesInput entries input object}
 * @param {SortDataEntriesInput<TItem>} entries - Unique map of sort data entry inputs to register.
 * @returns {SortDataEntriesFromInput<TItem>} An object with the same properties but registered {@link SortData sort data objects} as values.
 */
export interface ListConfigSortsFn<TItem extends object> {
  <TEntriesInput extends SortDataEntriesInput<TItem>>(
    entries: TEntriesInput
  ): SortDataEntriesFromInput<TItem, TEntriesInput>;
}
