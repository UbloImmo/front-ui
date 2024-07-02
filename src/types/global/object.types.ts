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
  >]: NonOptional<TObject[TKey]>;
};
