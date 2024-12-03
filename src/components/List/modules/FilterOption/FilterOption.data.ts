import { isArray, isBoolean, objectValues } from "@ubloimmo/front-util";

import { computeFilterOptionSignature } from "./FilterOption.utils";
import { BooleanOperators } from "../../List.enums";

import {
  mergeDefaultProps,
  normalizeToColorKey,
  normalizeToPaletteColor,
} from "@utils";

import type {
  FilterOptionBehavior,
  FilterOptionData,
  FilterOptionMatch,
  ListConfigMatchFnParams,
  ListConfigOptionFnParams,
} from "./FilterOption.types";
import type { FilterOptionVisualData } from "../shared.types";

const defaultFilterOptionBehavior: Required<FilterOptionBehavior> = {
  default: false,
  initial: false,
  disabled: false,
  fixed: false,
  hidden: false,
};

const defaultFilterOptionVisualData: Required<FilterOptionVisualData> = {
  label: "[MISSING OPTION LABEL]",
  icon: null,
  color: "gray-600",
};

export const filterOptionData = <TItem extends object>(
  ...[label, matchOrMatches, config = {}]: ListConfigOptionFnParams<TItem>
): FilterOptionData<TItem> => {
  const matches: FilterOptionMatch<TItem>[] = isArray(matchOrMatches)
    ? matchOrMatches
    : [matchOrMatches];
  const operator = config?.operator ?? BooleanOperators.AND;
  const signature = computeFilterOptionSignature({
    label,
    matches,
    operator,
  });

  const visualData = mergeDefaultProps<
    Required<FilterOptionVisualData>,
    FilterOptionVisualData
  >(defaultFilterOptionVisualData, { label, ...config }, true);

  const behavior = mergeDefaultProps<
    Required<FilterOptionBehavior>,
    FilterOptionBehavior
  >(defaultFilterOptionBehavior, config, true);

  const { disabled, ...restBehavior } = behavior;
  const selected =
    !disabled &&
    objectValues(restBehavior)
      .filter(isBoolean)
      .some((bool) => bool);

  const paletteColor = normalizeToPaletteColor(visualData.color);
  const colorKey = normalizeToColorKey(visualData.color);

  return {
    // visual data
    ...visualData,
    paletteColor,
    colorKey,
    // logic data
    matches,
    operator,
    signature,
    // behavior data
    ...behavior,
    selected,
  };
};

/**
 * Creates a filter option match from the given parameters
 *
 * @template TItem - The type of item being filtered
 * @param {...ListConfigMatchFnParams<TItem>} params - Either a single FilterOptionMatch object, or a property, comparison operator and value
 * @returns {FilterOptionMatch<TItem>} The filter option match
 * @throws {Error} If invalid number of arguments provided
 */
export const filterOptionMatch = <TItem extends object>(
  ...params: ListConfigMatchFnParams<TItem>
): FilterOptionMatch<TItem> => {
  if (params.length === 1) return params[0];
  if (params.length !== 3) throw new Error("Invalid number of arguments");
  return {
    property: params[0],
    comparison: params[1],
    value: params[2],
  };
};
