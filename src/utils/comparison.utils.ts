import {
  isObject,
  type NullishPrimitives,
  type GenericFn,
} from "@ubloimmo/front-util";

export type ComparisonValue<T> = T extends object ? string : T;
type ComparisonTransformation = "normalize" | "none" | "both";

/**
 * Parses a value and, if it is an object, converts it to a stringified representation for reliable comparison
 *
 * @template TValue - The type of the value
 * @param {TOptionValue} value - The value to compare
 * @returns {TOptionValue | string} Either the value or its stringified representation
 */
const normalizeComparisonValue = <TValue>(
  value: TValue
): ComparisonValue<TValue> => {
  if (isObject(value)) return JSON.stringify(value) as ComparisonValue<TValue>;
  return value as ComparisonValue<TValue>;
};

/**
 * Formats two values for comparison & compares them
 *
 * @remarks
 * May also be used to compare objects and their stringified representation
 *
 * @template A - The type of the first value to compare
 * @template B - The type of the second value to compare
 * @param {A} a - The first value to compare
 * @param {B} b - The second value to compare
 * @param {ComparisonTransformation} [transformation="normalize"] - Whether to apply normalization before comparing values. `both` will compare both normalized & pure values and OR them
 *
 * @param {GenericFn<[ComparisonValue<A>, ComparisonValue<B>], boolean>} comparison - Callback function that takes `a` and `b` and returns a boolean.
 * @returns {boolean} The result of the `comparison`
 *
 * @example
 * const objA = { key: "value" };
 * const objB = { key: "value" };
 * const stringified = JSON.stringify(objA)
 *
 * objA === objB; // false
 * compare(objA, objB, (a, b) => a === b); // true
 * compare(objA, stringified, (a, b) => a === b) // true
 */
const comparison = <A extends NullishPrimitives, B extends NullishPrimitives>(
  a: A,
  b: B,
  comparison: GenericFn<
    [ComparisonValue<A> | A, ComparisonValue<B> | B],
    boolean
  >,
  transformation: ComparisonTransformation = "normalize"
): boolean => {
  if (!comparison) return false;
  switch (transformation) {
    case "normalize":
      return comparison(
        normalizeComparisonValue(a),
        normalizeComparisonValue(b)
      );
    case "both":
      return (
        comparison(a, b) ||
        comparison(normalizeComparisonValue(a), normalizeComparisonValue(b))
      );
    case "none":
      return comparison(a, b);
  }
};

export const compare = Object.assign(comparison, {
  /**
   * Equals operator
   * @param a
   * @param b
   * @returns a === b
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  eq: (a: any, b: any) => a === b,
  /**
   * Not equals operator
   * @param a
   * @param b
   * @returns a !== b
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  neq: (a: any, b: any) => a !== b,
  /**
   * Greather than operator
   * @param a
   * @param b
   * @returns a > b
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  gt: (a: any, b: any) => a > b,
  /**
   * Less than operator
   * @param a
   * @param b
   * @returns a < b
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  lt: (a: any, b: any) => a < b,
  /**
   * Greather than or equals operator
   * @param a
   * @param b
   * @returns a >= b
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  gte: (a: any, b: any) => a >= b,
  /**
   * Less than or equals operator
   * @param a
   * @param b
   * @returns a <= b
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  lte: (a: any, b: any) => a <= b,

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  /**
   * Normalizes a single value for comparison
   * @see {@link normalizeComparisonValue}
   *
   * @template TValue - The type of the value
   * @param {TValue} value - The value to normalize
   * @returns {ComparisonValue<TValue>} The normalied value
   */
  normalize: <TValue>(value: TValue): ComparisonValue<TValue> =>
    normalizeComparisonValue(value),
});

/**
 * Array.includes with comparison normalization
 *
 * @remarks Always returns false for non-array `arr` parameter
 *
 * @template {any[]} TArr - The type of the array
 * @template {TArr[number] | any} TValue - The type of the value
 *
 * @param {TArr} arr - The array to perform the check with
 * @param {Talue} value - The value to check with
 * @param {ComparisonTransformation} [transformation="normalize"] - Whether to apply normalization before comparing values. `both` will compare both normalized & pure values and OR them
 * @returns {boolean} a.includes(b)
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const includes = <TArr extends any[], TValue extends TArr[number] | any>(
  arr: TArr,
  value: TValue,
  transformation: ComparisonTransformation = "normalize"
): boolean => {
  switch (transformation) {
    case "none":
      return arr.includes(value);
    case "normalize":
      return arr.map(compare.normalize).includes(compare.normalize(value));
    case "both":
      return (
        arr.includes(value) ||
        arr.map(compare.normalize).includes(compare.normalize(value))
      );
  }
};
