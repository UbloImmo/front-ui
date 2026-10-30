import { isNumber } from "@ubloimmo/front-util";

/**
 * Linearly interpolates between two numbers.
 *
 * @param {number} a - The start value.
 * @param {number} b - The end value.
 * @param {number} t - The interpolation parameter.
 * @return {number} The interpolated value.
 */
export const lerp = (a: number, b: number, t: number): number => {
  return a + (b - a) * t;
};

/**
 * Clamps a number between a minimum and maximum value.
 *
 * @param {number} value - The number to clamp.
 * @param {number} [min = -Infinity] - The minimum value.
 * @param {number} [max = Infinity] - The maximum value.
 * @return {number} The clamped number.
 */
export const clamp = (
  value: number,
  min = -Infinity,
  max = Infinity
): number => {
  return Math.min(Math.max(value, min), max);
};

/**
 * Cuts fraction digits off a decimal number without rounding errors.
 * @param {number} num - Floating point number to truncate
 * @param {number} fractionDigits - The number of digits to appear after the decimal point.
 * @return {number} - Truncated floating point number
 *
 * @remarks More precise than `Number.toFixed()`. See {@link https://arc.net/l/quote/ivxptfyt}
 */
export const toFixed = (num: number, fractionDigits: number): number => {
  const reg = new RegExp("^-?\\d+(?:.\\d{0," + (fractionDigits || -1) + "})?");
  return parseFloat((num.toString().match(reg) ?? [])[0] ?? "");
};

/**
 * Determines if a number is negative.
 *
 * @param {number} num - The number to check.
 * @return {boolean} Returns true if the number is negative, false otherwise.
 */
export const isNegative = (num: number): boolean => {
  return num < 0;
};

/**
 * Checks if a number is positive.
 *
 * @param {number} num - The number to check.
 * @return {boolean} Returns true if the number is positive, false otherwise.
 */
export const isPositive = (num: number): boolean => {
  return num > 0;
};

/**
 * Checks if a number is zero.
 *
 * @param {number} num - The number to check.
 * @return {boolean} Returns true if the number is zero, false otherwise.
 */
export const isZero = (num: number): boolean => {
  return num === 0;
};

/**
 * Checks if a number is between two values.
 *
 * @param {number} num - The number to check
 * @param {number} min - The minimum value to compare against
 * @param {number} max - The maximum value to compare against
 * @param {boolean} [exclusive=false] - If true, checks exclusive bounds (num > min && num < max). Else, checks inclusive bounds (num >= min && num <= max)
 * @returns {boolean} Returns true if the number is between min and max (inclusive or exclusive), false otherwise
 */
export const isBetween = (
  num: number,
  min: number,
  max: number,
  exclusive = false
): boolean => {
  if (exclusive) {
    return num > min && num < max;
  }
  return num >= min && num <= max;
};

/**
 * Checks if a value is a finite, non-NaN number
 *
 * @param {unknown} value - Value to ensure is a finite number
 * @returns {boolean} True is the value is a finite, non-NaN number, false otherwise
 */
export function isFiniteNumber(value: unknown): value is number {
  return isNumber(value) && !isNaN(value) && Number.isFinite(value);
}

/**
 * Ensures a number is finite, returns a fallback underwise
 *
 * @param {unknown} n - Number to ensure is finite
 * @param {number} fallback - Fallback number to use
 * @returns {number} The provided number or fallback based on whether the number is finite
 */
export function ensureFiniteNumber(number: unknown, fallback: number) {
  if (!isFiniteNumber(number)) return fallback;
  return number;
}

/**
 * Checks if a value is an integer, non-NaN number
 *
 * @param {unknown} value - Value to ensure is an integer
 * @returns {boolean} True is the value is an integer, false otherwise
 */
export function isInt(value: unknown): value is number {
  return Number.isInteger(value);
}

/**
 * Ensures a number is an integer, returns a fallback underwise
 *
 * @param {unknown} n - Number to ensure is an integer
 * @param {number} fallback - Fallback number to use
 * @returns {number} The provided number or fallback based on whether the number is an integer
 */
export function ensureInt(number: unknown, fallback: number) {
  if (!isInt(number)) return fallback;
  return number;
}
