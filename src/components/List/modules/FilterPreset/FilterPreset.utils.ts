import type { FilterBooleanOperator, FilterSignature } from "../shared.types";

export const computeFilterPresetSignature = (
  label: string,
  optionSignatures: FilterSignature[],
  operator: FilterBooleanOperator
): FilterSignature => {
  return [label, optionSignatures.join(operator)].join("-");
};
