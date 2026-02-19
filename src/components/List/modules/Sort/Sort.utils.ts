import { isArray, isObject } from "@ubloimmo/front-util";

import { FilterProperty } from "../shared.types";
import {
  ListConfigSortFnCompoundParams,
  ListConfigSortFnParams,
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
