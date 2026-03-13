import {
  KeyOf,
  DeepKeyOfType,
  Optional,
  NonOptional,
} from "@ubloimmo/front-util";

/**
 * Requires all properties of an object that do not hold an optional `never` value
 *
 * @todo find a better name, for the love of all that is holy
 *
 * @template {Record<string, unknown>} TObject - The object to convert
 */
export type RequiredNonNever<TObject extends Record<string, unknown>> = {
  [TKey in Exclude<
    KeyOf<TObject>,
    DeepKeyOfType<TObject, Optional<never>>
  >]-?: NonOptional<TObject[TKey]>;
};

/**
 * 2-dimensional vector holding x & y coordinates.
 */
export type Vec2 = { x: number; y: number };

/**
 * A non empty array containing a least one item,
 * where all array items are of type T.
 */
export type NonEmptyArr<T> = T[] & { 0: T };
