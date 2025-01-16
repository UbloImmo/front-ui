import {
  isArray,
  isNullish,
  isObject,
  isString,
  isUndefined,
  type ValueMap,
} from "@ubloimmo/front-util";
import { isDate } from "date-fns";

import type {
  FilterOption,
  FilterOptionData,
  FilterOptionDataOrSignature,
  FilterOptionMatch,
} from "./FilterOption.types";
import type {
  FilterComparisonOperator,
  FilterSignature,
} from "../shared.types";

/**
 * Computes a signature for a filter option match
 *
 * @param {FilterOptionMatch<TItem>} match - The match to compute the signature for
 * @returns {FilterSignature} The computed signature
 * @throws {Error} If the match is not provided, or if any of the match properties are missing
 */
export const computeFilterOptionMatchSignature = <TItem extends object>(
  match: FilterOptionMatch<TItem>
): FilterSignature => {
  if (!match) throw new Error("Match is required");
  if (isNullish(match.property)) throw new Error("Match property is required");
  if (!match.comparison) throw new Error("Match comparison is required");
  if (isUndefined(match.value)) throw new Error("Match value is required");
  if (isObject(match.value) && !isDate(match.value))
    throw new Error("Match value must be a primitive");
  return [match.property, match.comparison, match.value].join("_");
};

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
  if (!isString(label)) throw new Error("Label must be a string");
  if (!operator) throw new Error("Operator is required");
  if (!matches) throw new Error("Matches are required");
  if (!isArray(matches)) throw new Error("Matches must be an array");
  const matchesSignature = matches
    .map(computeFilterOptionMatchSignature)
    .join(operator);

  if (!matchesSignature.length) return label;

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
  // FIXME: Implement proper inverts for search operators
  contains: "contains",
  startsWith: "endsWith",
  endsWith: "startsWith",
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
  if (!comparison) throw new Error("Comparison is required");
  return inverseMatchComparisonMap[comparison];
};

/**
 * Type guard to check if a value is FilterOptionData rather than just a signature
 *
 * @template TItem - The type of items being filtered
 * @param {FilterOptionDataOrSignature<TItem>} optionOrSignature - The value to check
 * @returns {boolean} True if the value is FilterOptionData, false if it's just a signature
 */
export const isFilterOptionData = <TItem extends object>(
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
  if (!isFilterOptionData(optionOrSignature) && !isString(optionOrSignature))
    throw new Error("Invalid input");
  if (isFilterOptionData(optionOrSignature)) {
    return optionOrSignature.signature;
  }

  return optionOrSignature;
};
