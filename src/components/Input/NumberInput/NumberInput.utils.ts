import { isNumber, isString, type Nullable } from "@ubloimmo/front-util";

import type { NativeInputValue } from "../Input.types";

/**
 * Transforms a native input value to a number.
 *
 * @param {NativeInputValue} nativeValue - The value from the native input element.
 * @returns {Nullable<number>} The parsed number, or null if parsing fails.
 */
export const transformNumber = (
  nativeValue: NativeInputValue
): Nullable<number> => {
  if (!isString(nativeValue) || nativeValue.length === 0) return null;
  const parsed = parseFloat(
    nativeValue.replace(",", ".").replaceAll(/\s/g, "")
  );
  if (isNaN(parsed)) return null;
  return parsed;
};

/**
 * Scales a number by a given power of 10.
 *
 * @param {Nullable<number>} value - The number to scale. Can be null.
 * @param {number} scale - The power of 10 to scale by.
 * @returns {Nullable<number>} The scaled number, or null if the input was not a number.
 */
export const scaleNumber = (
  value: Nullable<number>,
  scale: number
): Nullable<number> => {
  if (!isNumber(value)) return null;
  return value * Math.pow(10, scale);
};
