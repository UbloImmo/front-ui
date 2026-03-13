import {
  type DeepValueOf,
  deepValueOf,
  isArray,
  isBoolean,
  isNull,
  isNumber,
  isObject,
  isString,
  isUndefined,
  type Optional,
} from "@ubloimmo/front-util";
import { isDate } from "date-fns";

import { isSortOrderBasic } from "../../Sort/Sort.utils";

import {
  BooleanOperators,
  ComparisonOperators,
} from "@/components/List/List.enums";
import { isZero } from "@utils";

import type {
  FilterOptionData,
  FilterOptionMatch,
} from "../../FilterOption/FilterOption.types";
import type { FilterPreset } from "../../FilterPreset";
import type { FilterBooleanOperator, FilterProperty } from "../../shared.types";
import type { SortPayload } from "../../Sort";
import type {
  DataProviderFilterFnConfig,
  DataProviderFilterParam,
} from "../DataProvider.types";

const OBJECT_STR = "[object Object]";

type Comparable = number | Date | string | object;
/**
 * Type guard to check if a value can be compared using comparison operators
 * @param {unknown} value - The value to check
 * @returns {boolean} True if the value is comparable
 */
export const canCompare = (value: unknown): value is Comparable =>
  isNumber(value) || isDate(value) || isString(value) || isObject(value);

/**
 * Compares an item's property value with a match value using the specified comparison operator
 * @template TItem - The type of the item being compared
 * @param {TItem} item - The item to compare
 * @param {FilterOptionMatch<TItem>} match - The match criteria
 * @returns {boolean} True if the item matches the criteria
 */
export const compareItemValue = <TItem extends object>(
  item: TItem,
  match: FilterOptionMatch<TItem>
): boolean => {
  // if item is not an object, it cannot be compared
  if (!isObject(item)) return false;
  // if match is not an object, it cannot be compared
  if (!isObject(match)) return false;
  // collapse nullish values to null
  const itemValue = deepValueOf(item, match.property, true) ?? null;
  switch (match.comparison) {
    case ComparisonOperators.neq:
      return itemValue !== match.value;
    case ComparisonOperators.lt:
      if (canCompare(itemValue) && canCompare(match.value))
        return (itemValue as Comparable) < match.value;
      return false;
    case ComparisonOperators.lte:
      if (canCompare(itemValue) && canCompare(match.value))
        return (itemValue as Comparable) <= match.value;
      return false;
    case ComparisonOperators.gt:
      if (canCompare(itemValue) && canCompare(match.value))
        return (itemValue as Comparable) > match.value;
      return false;
    case ComparisonOperators.gte:
      if (canCompare(itemValue) && canCompare(match.value))
        return (itemValue as Comparable) >= match.value;
      return false;
    case ComparisonOperators.contains: {
      const itemStr = String(itemValue);
      const matchStr = String(match.value);
      if (itemStr === OBJECT_STR || matchStr === OBJECT_STR) return false;
      return itemStr.includes(matchStr);
    }
    case ComparisonOperators.startsWith: {
      const itemStr = String(itemValue);
      const matchStr = String(match.value);
      if (itemStr === OBJECT_STR || matchStr === OBJECT_STR) return false;
      return itemStr.startsWith(matchStr);
    }
    case ComparisonOperators.endsWith: {
      const itemStr = String(itemValue);
      const matchStr = String(match.value);
      if (itemStr === OBJECT_STR || matchStr === OBJECT_STR) return false;
      return itemStr.endsWith(matchStr);
    }
    default:
      return itemValue === match.value;
  }
};

/**
 * Converts a boolean operator to the corresponding array method name
 * @param {FilterBooleanOperator} operator - The boolean operator (AND/OR)
 * @returns {"every" | "some"} The array method name
 */
export const arrayComparison = (
  operator: FilterBooleanOperator
): "every" | "some" => (operator === "AND" ? "every" : "some");

/**
 * Checks if an item matches a filter option
 * @template TItem - The type of the item being filtered
 * @param {TItem} item - The item to check
 * @param {FilterOptionData<TItem>} option - The filter option
 * @param {boolean} [forceSelected] - If set to `true`, the option's `selected` property won't be checked
 * @returns {boolean} True if the item matches the option
 */
export const itemMatchesOption = <TItem extends object>(
  item: TItem,
  option: FilterOptionData<TItem>,
  forceSelected?: boolean
): boolean => {
  if (!option.selected && !forceSelected) return true;
  return option.matches[arrayComparison(option.operator)]((match) =>
    compareItemValue(item, match)
  );
};

/**
 * Checks if an item matches a set of filter options
 * @template TItem - The type of the item being filtered
 * @param {TItem} item - The item to check
 * @param {FilterOptionData<TItem>[]} options - The filter options
 * @param {FilterBooleanOperator} operator - The boolean operator to use
 * @returns {boolean} True if the item matches the options
 */
const itemMatchesOptions = <TItem extends object>(
  item: TItem,
  options: FilterOptionData<TItem>[],
  operator: FilterBooleanOperator
): boolean => {
  if (!options.length) return true;
  return options[arrayComparison(operator)]((option) =>
    itemMatchesOption(item, option)
  );
};

/**
 * Checks if an item matches a filter
 * @template TItem - The type of the item being filtered
 * @param {TItem} item - The item to check
 * @param {DataProviderFilterParam<TItem>} filter - The filter to apply
 * @returns {boolean} True if the item matches the filter
 */
const itemMatchesFilter = <TItem extends object>(
  item: TItem,
  filter: DataProviderFilterParam<TItem>
): boolean => {
  return itemMatchesOptions(item, filter.selectedOptions, filter.operator);
};

/**
 * Checks if an item matches multiple filters
 * @template TItem - The type of the item being filtered
 * @param {TItem} item - The item to check
 * @param {DataProviderFilterParam<TItem>[]} filters - The filters to apply
 * @param {FilterBooleanOperator} operator - The boolean operator to use
 * @returns {boolean} True if the item matches the filters
 */
const itemMatchesFilters = <TItem extends object>(
  item: TItem,
  filters: DataProviderFilterParam<TItem>[],
  operator: FilterBooleanOperator
): boolean => {
  if (!filters.length) return true;
  return filters[arrayComparison(operator)]((filter) =>
    itemMatchesFilter(item, filter)
  );
};

/**
 * Checks if an item matches a filter preset
 * @template TItem - The type of the item being filtered
 * @param {TItem} item - The item to check
 * @param {Pick<FilterPreset<TItem>, "options" | "operator">} filterPreset - The filter preset
 * @returns {boolean} True if the item matches the preset
 */
const itemMatchesFilterPreset = <TItem extends object>(
  item: TItem,
  filterPreset: Pick<FilterPreset<TItem>, "options" | "operator">
): boolean => {
  return itemMatchesOptions(item, filterPreset.options, filterPreset.operator);
};

/**
 * Checks if an item matches multiple filter presets
 * @template TItem - The type of the item being filtered
 * @param {TItem} item - The item to check
 * @param {Pick<FilterPreset<TItem>, "options" | "operator">[]} filterPresets - The filter presets
 * @param {FilterBooleanOperator} operator - The boolean operator to use
 * @returns {boolean} True if the item matches the presets
 */
const itemMatchesFilterPresets = <TItem extends object>(
  item: TItem,
  filterPresets: Pick<FilterPreset<TItem>, "options" | "operator">[],
  operator: FilterBooleanOperator
): boolean => {
  if (!filterPresets.length) return true;
  return filterPresets[arrayComparison(operator)]((filterPreset) =>
    itemMatchesFilterPreset(item, filterPreset)
  );
};

/**
 * Function type for filtering items
 * @template TItem - The type of the items being filtered
 * @param {TItem} item - The item to filter
 * @returns {boolean} True if the item matches the filter
 *
 * @internal
 */
type FilterFn<TItem extends object> = (item: TItem) => boolean;

/**
 * Filters data based on the provided configuration
 * @template TItem - The type of the items being filtered
 * @param {TItem[]} items - The data to filter
 * @param {DataProviderFilterFnConfig<TItem>} config - The filter configuration
 * @returns {TItem[]} The filtered data
 */
export const filterItems = <TItem extends object>(
  items: TItem[],
  config: DataProviderFilterFnConfig<TItem>
): TItem[] => {
  // abort if items is not an array or is empty
  if (!isArray(items) || !items.length) return [];

  const operator = config.operator ?? BooleanOperators.OR;

  // return all items by default
  let filterFn: Optional<FilterFn<TItem>>;

  if (config.filter) {
    const filter = config.filter;
    filterFn = (item) => itemMatchesFilter(item, filter);
  }
  if (config.filters) {
    const filters = config.filters;
    filterFn = (item) => itemMatchesFilters(item, filters, operator);
  }
  if (config.filterPreset) {
    const filterPreset = config.filterPreset;
    filterFn = (item) => itemMatchesFilterPreset(item, filterPreset);
  }
  if (config.filterPresets) {
    const filterPresets = config.filterPresets;
    filterFn = (item) =>
      itemMatchesFilterPresets(item, filterPresets, operator);
  }
  if (config.option) {
    const option = config.option;
    filterFn = (item) => itemMatchesOption(item, option);
  }
  if (config.options) {
    const options = config.options;
    filterFn = (item) => itemMatchesOptions(item, options, operator);
  }

  // if no filter function is set, use the selected options
  if (!filterFn && config.selectedOptions?.length) {
    filterFn = (item) =>
      itemMatchesOptions(item, config.selectedOptions, operator);
  }
  // if no filter function is set, use a default one that returns true
  if (!filterFn) {
    filterFn = () => true;
  }

  return items.filter(filterFn);
};

/**
 * Compares two list items and assigns them a relative sorting order based on a single list {@link Sort}
 *
 * @template {object} TItem - Type of items in a list
 * @param {Optional<DeepValueOf<TItem, FilterProperty<TItem>>>} aValue - The first item's value to sort or undefined if not present in the base item
 * @param {Optional<DeepValueOf<TItem, FilterProperty<TItem>>>} bValue - The second item's value to sort or undefined if not present in the base item
 * @param {Sort<TItem, FilterProperty<TItem>>} sort - List Sort to rank both values by
 * @returns {number} Relative sorting order of the two provided items. See {@link https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#comparefn Array.sort()}
 */
function computeItemScore<TItem extends object>(
  aValue: Optional<DeepValueOf<TItem, FilterProperty<TItem>>>,
  bValue: Optional<DeepValueOf<TItem, FilterProperty<TItem>>>,
  sort: SortPayload<TItem, FilterProperty<TItem>>
): number {
  // shortcut:
  // equal values should stay in the current order
  if (aValue === bValue) return 0;

  // undefined cases:
  // regarless of sorting order, undefined values should be at the very end
  if (isUndefined(aValue) && !isUndefined(bValue)) return 1;
  if (!isUndefined(aValue) && isUndefined(bValue)) return -1;
  if (isUndefined(aValue) && isUndefined(bValue)) return 0;

  // basic sorting order:
  if (isSortOrderBasic(sort.computedOrder)) {
    if (isNumber(aValue) && isNumber(bValue)) {
      if (sort.computedOrder === "desc") return bValue - aValue;
      return aValue - bValue;
    }
    if (isString(aValue) && isString(bValue)) {
      if (sort.computedOrder === "desc")
        return (bValue as string).localeCompare(aValue);
      return (aValue as string).localeCompare(bValue);
    }

    // null cases:
    // regarless of asc/desc, null values should be at the end
    if (isNull(aValue) && !isNull(bValue)) return 1;
    if (!isNull(aValue) && isNull(bValue)) return -1;
    if (isNull(aValue) && isNull(bValue)) return 0;

    // boolean cases:
    // true before false, or vice-versa if descending order
    if (isBoolean(aValue) && isBoolean(bValue)) {
      if (sort.computedOrder === "desc") {
        if (aValue && !bValue) return 1;
        if (!aValue && bValue) return -1;
      }
      if (aValue && !bValue) return -1;
      if (!aValue && bValue) return 1;
      return 0;
    }

    // object cases:
    // should go to the end, regardless of sorting order, since they should not be compared.
    // however, should be before null & undefined values
    if (isObject(aValue) && !isObject(bValue)) return 1;
    if (!isObject(aValue) && isObject(bValue)) return -1;

    // base case: do not change order
    return 0;
  }

  // complex sorting order:
  // - items not included should go to the end. We don't care about their ordering in this pass
  // - sorts included items according to their position in the provided complex sort order.
  const aIndex = sort.computedOrder.indexOf(aValue!);
  const bIndex = sort.computedOrder.indexOf(bValue!);
  const aIncluded = aIndex >= 0;
  const bIncluded = bIndex >= 0;
  if (aIncluded && !bIncluded) return -1;
  if (!aIncluded && bIncluded) return 1;
  if (!aIncluded && !bIncluded) return 0;
  return aIndex - bIndex;
}

/**
 * Applies active sorts to the list's items.
 *
 * @template {object} TItem - Type of the list's items
 * @param {TItem[]} items - List items to sort
 * @param {DataProviderFilterFnConfig<TItem>["activeSorts"]} activeSorts - Nullable ordered array of list {@link Sort} objects to apply to the provided items array.
 * @returns {TItem[]} Sorted list items
 */
export function sortItems<TItem extends object>(
  items: TItem[],
  activeSorts: DataProviderFilterFnConfig<TItem>["activeSorts"]
): TItem[] {
  // guard against missing items param.
  if (!items?.length) return [];
  // do not bother sorting if no active sorts provided
  if (!activeSorts?.length) return items;

  // sort items by iterating over each active sort until a non-zero score is assigned.
  // this gives more weight to the first active sort, while subsequent sorts only evaluate as tie breakers when needed
  return items.sort((a, b) => {
    let score = 0;
    for (const sort of activeSorts) {
      const aValue = deepValueOf(a, sort.property, true);
      const bValue = deepValueOf(b, sort.property, true);

      score = computeItemScore(aValue, bValue, sort);

      if (!isZero(score)) return score;
    }
    return score;
  });
}
