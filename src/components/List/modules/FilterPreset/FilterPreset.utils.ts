import { isArray, isString } from "@ubloimmo/front-util";

import type { FilterBooleanOperator, FilterSignature } from "../shared.types";

/**
 * Computes a unique signature for a filter preset based on its label, selected option signatures, and boolean operator.
 *
 * @param {string} label - The label of the filter preset
 * @param {FilterSignature[]} optionSignatures - Array of signatures from the selected filter options
 * @param {FilterBooleanOperator} operator - The boolean operator (AND/OR) used to combine the options
 * @returns {FilterSignature} A unique signature string for the filter preset
 * @throws {Error} If label is not a string, optionSignatures is not an array, or operator is not provided
 */
export const computeFilterPresetSignature = (
  label: string,
  optionSignatures: FilterSignature[],
  operator: FilterBooleanOperator
): FilterSignature => {
  if (!isString(label)) throw new Error("Label must be a string");
  if (!isArray(optionSignatures))
    throw new Error("Option signatures must be an array");
  if (!isString(operator)) throw new Error("Operator is required");

  if (!optionSignatures.length) return label;

  return [label, optionSignatures.join(operator)].join("-");
};
