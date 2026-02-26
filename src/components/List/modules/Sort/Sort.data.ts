import { isNumber, isString } from "@ubloimmo/front-util";

import { isListConfigSortFnCompoundParams } from "./Sort.utils";

import { isNegative } from "@utils";

import type { FilterProperty } from "../shared.types";
import type {
  ListConfigSortFnParams,
  SortConfig,
  SortData,
  SortState,
  SortVisualData,
} from "./Sort.types";

/**
 * Creates a {@link SortData sort data} object with given configuration & default state propertie.
 *
 * @template {object} TItem - The list item to create a sort data object for.
 * @template {FilterProperty<TItem>} TProperty - The item's property the sort data object is targeting
 * @param {ListConfigSortFnParams<TItem, TProperty>} params - Either compound or flattened sort data creation parameter spread.
 * @returns {SortData<TItem, TProperty>} The sort data object
 */
export function sortData<
  TItem extends object,
  TProperty extends FilterProperty<TItem>,
>(
  ...params: ListConfigSortFnParams<TItem, TProperty>
): SortData<TItem, TProperty> {
  let config: Required<SortConfig<TItem, TProperty>>;
  let state: Required<SortState>;
  let visualData: Required<SortVisualData>;

  if (!params.length) throw new Error("Missing first required parameter");

  if (isListConfigSortFnCompoundParams(params)) {
    const { property, order = "asc", priority = 0 } = params[0];
    if (!isString(property) && !isNumber(property))
      throw new Error("Malformed property");

    config = { property, order, priority };
    const { active = false, inverted = false } = params[1] ?? {};
    state = { active, inverted };
    const { iconSet = "unknown", label = null } = params[2] ?? {};
    visualData = { iconSet, label };
  } else {
    const [
      property,
      order = "asc",
      priority = 0,
      defaultState = {},
      visual = {},
    ] = params;
    if (!isString(property) && !isNumber(property))
      throw new Error("Malformed property");

    config = { property, order, priority };
    const { active = false, inverted = false } = defaultState;
    state = { active, inverted };
    const { iconSet = "unknown", label = null } = visual;
    visualData = { iconSet, label };
  }
  // clamp priority if needed
  if (isNegative(config.priority)) {
    console.warn(
      `Sort on property "${config.property}" provided with negative priority ${config.priority}: Clamped to 0.`
    );
    config.priority = 0;
  }

  return {
    ...config,
    ...state,
    ...visualData,
    defaultState: Object.freeze({ ...state }),
    defaultPriority: config.priority,
  };
}
