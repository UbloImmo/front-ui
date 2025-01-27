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
  max = Infinity,
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
  exclusive = false,
): boolean => {
  if (exclusive) {
    return num > min && num < max;
  }
  return num >= min && num <= max;
};
