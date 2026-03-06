import { isArray, isString } from "@ubloimmo/front-util";

import type { FilterBooleanOperator, FilterSignature } from "../shared.types";

/**
 * Computes a unique signature for a filter preset based on its label, selected option signatures, and boolean operator.
 *
 * @param {string} label - The label of the filter preset
 * @param {FilterSignature[] | Set<FilterSignature>} optionSignatures - Array or Set of signatures from the selected filter options
 * @param {FilterBooleanOperator} operator - The boolean operator (AND/OR) used to combine the options
 * @returns {FilterSignature} A unique signature string for the filter preset
 * @throws {Error} If label is not a string, optionSignatures is not an array, or operator is not provided
 */
export const computeFilterPresetSignature = (
  label: string,
  optionSignatures: FilterSignature[] | Set<FilterSignature>,
  operator: FilterBooleanOperator
): FilterSignature => {
  if (!isString(label)) throw new Error("Label must be a string");
  if (!isArray(optionSignatures) && !(optionSignatures instanceof Set))
    throw new Error("Option signatures must be an array or set");
  if (!isString(operator)) throw new Error("Operator is required");

  const optionSignaturesArr = Array.from(optionSignatures);

  if (!optionSignaturesArr.length) return label;

  return [label, optionSignaturesArr.join(operator)].join("-");
};
