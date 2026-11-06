import { isArray, isObject, isString } from "@ubloimmo/front-util";

import { computeFilterOptionSignature } from "./FilterOption.utils";
import { BooleanOperators } from "../../List.enums";

import { ColorKey, PaletteColor } from "@types";
import {
  isColorKey,
  isDecorativeColorKey,
  isPaletteColor,
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

export const defaultFilterOptionBehavior: Required<FilterOptionBehavior> = {
  default: false,
  initial: false,
  disabled: false,
  fixed: false,
  hidden: false,
};

export const defaultFilterOptionVisualData: Required<FilterOptionVisualData> = {
  label: "[MISSING OPTION LABEL]",
  icon: null,
  color: "gray-600",
  badge: false,
};

/**
 * Resolves the palette color (option icon) and color key (selected chip) of a filter option.
 * Decorative colors are kept as-is so the chip matches the category badge.
 */
const resolveFilterOptionColors = (
  color: Required<FilterOptionVisualData>["color"]
): Pick<FilterOptionData<object>, "paletteColor" | "colorKey"> => {
  // semantic colors, "gray" included: unchanged behavior
  if (isColorKey(color) || isPaletteColor(color)) {
    return {
      paletteColor: normalizeToPaletteColor(color),
      colorKey: normalizeToColorKey(color),
    };
  }
  // here, color is narrowed to a decorative color other than gray
  if (isDecorativeColorKey(color)) {
    return {
      paletteColor: `${color}-base` as PaletteColor,
      colorKey: color,
    };
  }
  // unknown value: same fallback as before
  return {
    paletteColor: normalizeToPaletteColor(color as ColorKey),
    colorKey: "gray",
  };
};

/**
 * Creates a filter option data object with visual, logic, and behavior properties
 *
 * @template TItem - The type of items being filtered
 * @param {string} label - The label for the filter option
 * @param {FilterOptionMatch<TItem> | FilterOptionMatch<TItem>[]} matchOrMatches - Single match or array of matches to filter by
 * @param {Partial<FilterOptionBehavior & FilterOptionVisualData>} [config={}] - Optional configuration for behavior and visual properties
 * @returns {FilterOptionData<TItem>} The complete filter option data object
 */
export const filterOptionData = <TItem extends object>(
  ...[label, matchOrMatches, config = {}]: ListConfigOptionFnParams<TItem>
): FilterOptionData<TItem> => {
  if (!matchOrMatches) throw new Error("Match or matches are required");
  if (!isString(label)) throw new Error("Label should be a string");
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

  const { default: isDefault, initial, fixed } = behavior;
  const selected = fixed || isDefault || initial;

  const { paletteColor, colorKey } = resolveFilterOptionColors(
    visualData.color
  );

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
  if (params.length === 1) {
    if (!isObject(params[0])) throw new Error("Invalid match object");
    return params[0];
  }
  if (params.length !== 3) throw new Error("Invalid number of arguments");
  return {
    property: params[0],
    comparison: params[1],
    value: params[2],
  };
};
