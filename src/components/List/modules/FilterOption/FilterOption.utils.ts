import { isArray, isObject, type ValueMap } from "@ubloimmo/front-util";

import type {
  FilterOption,
  FilterOptionData,
  FilterOptionDataOrSignature,
} from "./FilterOption.types";
import type {
  FilterComparisonOperator,
  FilterSignature,
} from "../shared.types";

/**
 * Computes a unique signature for a filter option based on its matches, operator and label
 *
 * @param {FilterOption} option - The filter option to compute the signature for
 * @returns {FilterSignature} The computed signature
 */
export const computeFilterOptionSignature = <TItem extends object>({
  matches,
  operator,
  label,
}: Pick<
  FilterOption<TItem>,
  "matches" | "operator" | "label"
>): FilterSignature => {
  const matchesSignature = matches
    .map(({ value, property, comparison }) =>
      [property, comparison, value].join("_")
    )
    .join(operator);

  return [label, matchesSignature].join("-");
};

const inverseMatchComparisonMap: ValueMap<
  FilterComparisonOperator,
  FilterComparisonOperator
> = {
  "=": "!=",
  "!=": "=",
  ">": "<",
  "<": ">",
  ">=": "<=",
  "<=": ">=",
};

/**
 * Returns the inverse comparison operator for a given filter comparison operator
 *
 * @param {FilterComparisonOperator} comparison - The comparison operator to invert
 * @returns {FilterComparisonOperator} The inverse comparison operator
 * @example
 * invertMatchComparison(">=") // returns "<="
 * invertMatchComparison("=") // returns "!="
 */
export const invertMatchComparison = (comparison: FilterComparisonOperator) => {
  return inverseMatchComparisonMap[comparison];
};

/**
 * Type guard to check if a value is FilterOptionData rather than just a signature
 *
 * @template TItem - The type of items being filtered
 * @param {FilterOptionDataOrSignature<TItem>} optionOrSignature - The value to check
 * @returns {boolean} True if the value is FilterOptionData, false if it's just a signature
 */
const isFilterOptionData = <TItem extends object>(
  optionOrSignature: FilterOptionDataOrSignature<TItem>
): optionOrSignature is FilterOptionData<TItem> => {
  return (
    isObject(optionOrSignature) &&
    "signature" in optionOrSignature &&
    "matches" in optionOrSignature &&
    isArray(optionOrSignature.matches)
  );
};

/**
 * Extracts the signature from either a FilterOptionData object or a signature string
 *
 * @template TItem - The type of items being filtered
 * @param {FilterOptionDataOrSignature<TItem>} optionOrSignature - The filter option data or signature to extract from
 * @returns {FilterSignature} The extracted signature
 * @example
 * // With FilterOptionData
 * extractFilterOptionSignature({
 *   signature: "my-signature",
 *   matches: []
 * }) // returns "my-signature"
 *
 * // With just a signature string
 * extractFilterOptionSignature("my-signature") // returns "my-signature"
 */
export const extractFilterOptionSignature = <TItem extends object>(
  optionOrSignature: FilterOptionDataOrSignature<TItem>
): FilterSignature => {
  if (isFilterOptionData(optionOrSignature)) {
    return optionOrSignature.signature;
  }

  return optionOrSignature;
};
