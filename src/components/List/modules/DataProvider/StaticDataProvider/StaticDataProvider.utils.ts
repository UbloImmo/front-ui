import {
  deepValueOf,
  isNullish,
  isNumber,
  isObject,
  isString,
} from "@ubloimmo/front-util";
import { isDate } from "date-fns";

import { ComparisonOperators } from "@/components/List/List.enums";

import type {
  FilterOptionData,
  FilterOptionMatch,
} from "../../FilterOption/FilterOption.types";
import type { FilterPreset } from "../../FilterPreset";
import type { FilterBooleanOperator } from "../../shared.types";
import type {
  DataProviderFilterFnConfig,
  DataProviderFilterParam,
} from "../DataProvider.types";

type Comparable = number | Date | string | object;
/**
 * Type guard to check if a value can be compared using comparison operators
 * @param {unknown} value - The value to check
 * @returns {boolean} True if the value is comparable
 */
const canCompare = (value: unknown): value is Comparable =>
  isNumber(value) || isDate(value) || isString(value) || isObject(value);

/**
 * Compares an item's property value with a match value using the specified comparison operator
 * @template TItem - The type of the item being compared
 * @param {TItem} item - The item to compare
 * @param {FilterOptionMatch<TItem>} match - The match criteria
 * @returns {boolean} True if the item matches the criteria
 */
const compareItemValue = <TItem extends object>(
  item: TItem,
  match: FilterOptionMatch<TItem>
): boolean => {
  const itemValue = deepValueOf(item, match.property, true);
  if (isNullish(itemValue) || isNullish(match.value)) return false;
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
 * @returns {boolean} True if the item matches the option
 */
export const itemMatchesOption = <TItem extends object>(
  item: TItem,
  option: FilterOptionData<TItem>
): boolean => {
  if (!option.selected) return true;
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

/** Function type for filtering items */
type FilterFn<TItem extends object> = (item: TItem) => boolean;

/**
 * Filters data based on the provided configuration
 * @template TItem - The type of the items being filtered
 * @param {TItem[]} data - The data to filter
 * @param {DataProviderFilterFnConfig<TItem>} config - The filter configuration
 * @returns {TItem[]} The filtered data
 */
export const filterData = <TItem extends object>(
  data: TItem[],
  config: DataProviderFilterFnConfig<TItem>
): TItem[] => {
  let filterFn: FilterFn<TItem> = () => true;

  if (config.filter) {
    const filter = config.filter;
    filterFn = (item) => itemMatchesFilter(item, filter);
  }
  if (config.filters) {
    const filters = config.filters;
    filterFn = (item) => itemMatchesFilters(item, filters, config.operator);
  }
  if (config.filterPreset) {
    const filterPreset = config.filterPreset;
    filterFn = (item) => itemMatchesFilterPreset(item, filterPreset);
  }
  if (config.filterPresets) {
    const filterPresets = config.filterPresets;
    filterFn = (item) =>
      itemMatchesFilterPresets(item, filterPresets, config.operator);
  }
  if (config.options) {
    const options = config.options;
    filterFn = (item) => itemMatchesOptions(item, options, config.operator);
  }

  return data.filter(filterFn);
};
