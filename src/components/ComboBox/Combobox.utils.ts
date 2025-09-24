import {
  GenericFn,
  isObject,
  type NullishPrimitives,
} from "@ubloimmo/front-util";

import { isPositive } from "@utils";

/**
 * Converts any object to a stringified representation for reliable comparison
 *
 * @template {NullishPrimitives} TOptionValue - The type of the options
 * @param {TOptionValue} value - The value to compare
 * @returns {TOptionValue | string} Either the value or its stringified representation
 */
const formatComboBoxValueForComparison = <
  TOptionValue extends NullishPrimitives,
>(
  value: TOptionValue
): TOptionValue | string => {
  if (isObject(value)) return JSON.stringify(value);
  return value;
};

/**
 * Compares two combobox values, with objects stringified
 * @template {NullishPrimitives} TOptionValue - The type of the values
 * @param {TOptionValue} valueA - The value to compare
 * @param {TOptionValue} valueB - The value to compare
 * @param {GenericFn<[a: TOptionValue | string, b: TOptionValue | string], boolean>} comparison - A callback function that compares the value
 * @returns boolean
 */
export const compareComboBoxValues = <TOptionValue extends NullishPrimitives>(
  valueA: TOptionValue,
  valueB: TOptionValue,
  comparison: GenericFn<
    [a: TOptionValue | string, b: TOptionValue | string],
    boolean
  >
): boolean => {
  return comparison(
    formatComboBoxValueForComparison(valueA),
    formatComboBoxValueForComparison(valueB)
  );
};

/**
 * Compares two combobox selection arrays and determines whether their contents differ
 *
 * @template {NullishPrimitives} TOptionValue - The type of the options
 * @param {TOptionValue[]} prevSelection - The previous selection state
 * @param {TOptionValue[]} nextSelection - The next selection state
 * @returns {boolean} Whether the two selections are different
 */
export const areComboBoxSelectionsDifferent = <
  TOptionValue extends NullishPrimitives,
>(
  prevSelection: TOptionValue[],
  nextSelection: TOptionValue[]
): boolean => {
  if (prevSelection.length !== nextSelection.length) return true;
  const prevSet = new Set(prevSelection.map(formatComboBoxValueForComparison));
  const nextSet = new Set(nextSelection.map(formatComboBoxValueForComparison));
  const diff = prevSet.symmetricDifference(nextSet);
  return isPositive(diff.size) || prevSet.isDisjointFrom(nextSet);
};
