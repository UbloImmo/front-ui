import { isArray } from "@ubloimmo/front-util";

import { extractFilterOptionSignature } from "../FilterOption/FilterOption.utils";
import { isFilterOptionDividerData } from "../FilterOptionDivider/FilterOptionDivider.utils";

import type { FilterOptionData } from "../FilterOption";
import type {
  FilterOptionDivider,
  FilterOptionDividerData,
} from "../FilterOptionDivider";
import type { FilterBooleanOperator, FilterSignature } from "../shared.types";

/**
 * Computes a unique signature for a filter based on its label, options and operator
 *
 * @param {string} label - The label of the filter
 * @param {FilterSignature[]} optionSignatures - The signatures of the filter's options
 * @param {FilterBooleanOperator} operator - The operator of the filter
 * @returns {FilterSignature} The computed signature
 */
export const computeFilterDataSignature = (
  label: string,
  optionSignatures: FilterSignature[],
  operator: FilterBooleanOperator
): FilterSignature => {
  if (!label) throw new Error("Label is required");
  if (!isArray(optionSignatures))
    throw new Error("Option signatures must be an array");
  if (!operator) throw new Error("Operator is required");

  if (!optionSignatures.length) return label;

  return [label, optionSignatures.join(operator)].join("-");
};

/**
 * Separates an array of filter options or dividers into separate arrays of option signatures and dividers
 * Assigns a `beforeSignature` property to dividers to indicate the signature of the option that should be displayed after the divider
 *
 * @template TItem - The type of items being filtered
 * @param {(FilterOptionData<TItem> | FilterSignature | FilterOptionDividerData)[]} optionsOrDividers - Array of filter options or dividers
 * @returns {{
 *   optionSignatures: FilterSignature[],
 *   dividers: FilterOptionDivider[]
 * }} Object containing separated option signatures and dividers
 */
export const separateOptionsAndDividers = <TItem extends object>(
  optionsOrDividers: (
    | FilterOptionData<TItem>
    | FilterSignature
    | FilterOptionDividerData
  )[]
): {
  optionSignatures: FilterSignature[];
  optionDividers: FilterOptionDivider[];
} => {
  const optionSignatures: FilterSignature[] = [];
  const optionDividers: FilterOptionDivider[] = [];

  // abort if optionsOrDividers is not an array or is empty
  if (!isArray(optionsOrDividers) || !optionsOrDividers.length)
    return {
      optionSignatures,
      optionDividers,
    };

  for (let i = 0; i < optionsOrDividers.length; i++) {
    const optionOrDivider = optionsOrDividers[i];
    if (!optionOrDivider) break;
    if (isFilterOptionDividerData(optionOrDivider)) {
      const nextItem = optionsOrDividers[i + 1];
      // only add dividers if not the last item the next item is not a divided
      if (!nextItem || isFilterOptionDividerData(nextItem)) continue;

      const nextSignature = extractFilterOptionSignature(nextItem);
      optionDividers.push({
        ...optionOrDivider,
        beforeSignature: nextSignature,
      });
      continue;
    }

    optionSignatures.push(extractFilterOptionSignature(optionOrDivider));
  }

  return {
    optionSignatures,
    optionDividers,
  };
};
