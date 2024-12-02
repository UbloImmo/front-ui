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

const canCompare = (value: unknown): value is Comparable =>
  isNumber(value) || isDate(value) || isString(value) || isObject(value);

const compareItemValue = <TItem extends object>(
  item: TItem,
  match: FilterOptionMatch<TItem>
) => {
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

export const arrayComparison = (
  operator: FilterBooleanOperator
): "every" | "some" => (operator === "AND" ? "every" : "some");

export const itemMatchesOption = <TItem extends object>(
  item: TItem,
  option: FilterOptionData<TItem>
): boolean => {
  if (!option.selected) return true;
  return option.matches[arrayComparison(option.operator)]((match) =>
    compareItemValue(item, match)
  );
};

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

const itemMatchesFilter = <TItem extends object>(
  item: TItem,
  filter: DataProviderFilterParam<TItem>
): boolean => {
  return itemMatchesOptions(item, filter.selectedOptions, filter.operator);
};

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

const itemMatchesFilterPreset = <TItem extends object>(
  item: TItem,
  filterPreset: Pick<FilterPreset<TItem>, "options" | "operator">
): boolean => {
  return itemMatchesOptions(item, filterPreset.options, filterPreset.operator);
};

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

type FilterFn<TItem extends object> = (item: TItem) => boolean;

export const filterData = <TItem extends object>(
  data: TItem[],
  config: DataProviderFilterFnConfig<TItem>
) => {
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
