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
  return [label, optionSignatures.join(operator)].join("-");
};
