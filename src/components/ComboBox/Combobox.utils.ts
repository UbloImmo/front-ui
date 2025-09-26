import { type NullishPrimitives } from "@ubloimmo/front-util";

import { compare, isPositive } from "@utils";

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
  const prevSet = new Set(prevSelection.map(compare.normalize));
  const nextSet = new Set(nextSelection.map(compare.normalize));
  const diff = prevSet.symmetricDifference(nextSet);
  return isPositive(diff.size) || prevSet.isDisjointFrom(nextSet);
};
