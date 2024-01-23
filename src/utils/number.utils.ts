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
