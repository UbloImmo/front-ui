import { isArray, isObject, Optional } from "@ubloimmo/front-util";

import { FilterProperty } from "../shared.types";
import {
  ISortMap,
  ListConfigSortFnCompoundParams,
  ListConfigSortFnParams,
  SortData,
  SortDataEntries,
  SortOrder,
  SortOrderBasic,
  SortOrderComplex,
} from "./Sort.types";

/**
 * Predicate function that identifies whether {@link ListConfigSortFnParams sort function parameters} are compound
 */
export function isListConfigSortFnCompoundParams<
  TItem extends object,
  TProperty extends FilterProperty<TItem>,
>(
  params: ListConfigSortFnParams<TItem, TProperty>
): params is ListConfigSortFnCompoundParams<TItem, TProperty> {
  return (
    isArray(params) &&
    isObject(params[0]) &&
    !isArray(params[0]) &&
    !!params[0].property
  );
}

/**
 * Predicate function that identifies whether a {@link SortOrder sort order} is {@link SortOrderBasic basic}.
 */
export function isSortOrderBasic<
  TItem extends object,
  TProperty extends FilterProperty<TItem>,
>(sortOrder: SortOrder<TItem, TProperty>): sortOrder is SortOrderBasic {
  return sortOrder === "asc" || sortOrder === "desc";
}

/**
 * Predicate function that identifies whether a {@link SortOrder sort order} is {@link SortOrderBasic complex}.
 */
export function isSortOrderComplex<
  TItem extends object,
  TProperty extends FilterProperty<TItem>,
>(
  sortOrder: SortOrder<TItem, TProperty>
): sortOrder is SortOrderComplex<TItem, TProperty> {
  return !isSortOrderBasic(sortOrder);
}

type BaseSortMapForEachCallbackFn<TItem extends object> = Parameters<
  Map<FilterProperty<TItem>, SortData<TItem, FilterProperty<TItem>>>["forEach"]
>[0];

/**
 * Map() extension that uses a {@link SortData sort}'s property as key and its {@link SortData data} as value while properly respecting its generic typing
 */
export class SortMap<TItem extends object>
  extends Map<FilterProperty<TItem>, SortData<TItem, FilterProperty<TItem>>>
  implements ISortMap<TItem>
{
  constructor(
    entries?:
      | readonly (readonly [
          FilterProperty<TItem>,
          SortData<TItem, FilterProperty<TItem>>,
        ])[]
      | Iterable<
          readonly [
            FilterProperty<TItem>,
            SortData<TItem, FilterProperty<TItem>>,
          ]
        >
      | null
  ) {
    super(entries);
  }

  override set<TProperty extends FilterProperty<TItem>>(
    key: TProperty,
    value: SortData<TItem, TProperty>
  ) {
    return super.set(key, value);
  }

  override get<TProperty extends FilterProperty<TItem>>(key: TProperty) {
    return super.get(key) as Optional<SortData<TItem, TProperty>>;
  }

  override forEach(
    callbackfn: <TProperty extends FilterProperty<TItem>>(
      value: SortData<TItem, TProperty>,
      key: TProperty,
      map: ISortMap<TItem>
    ) => void,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    thisArg?: any
  ) {
    return super.forEach(
      callbackfn as BaseSortMapForEachCallbackFn<TItem>,
      thisArg
    );
  }

  public setMultiple(entries: SortDataEntries<TItem>) {
    for (const entry in entries) {
      const key = entry as FilterProperty<TItem>;
      const entryData = entries[key];
      // basic type gard since entries are partial
      if (!entryData) continue;
      this.set(key, entryData);
    }
    return this;
  }
}
