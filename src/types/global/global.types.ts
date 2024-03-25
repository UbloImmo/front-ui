/**
 * Extracts the values contained in a string array as union type.
 *
 * @example
 * const myEnumValues = ["a", "b", "c"] as const;
 * type MyEnum = Enum<typeof myEnumValues>;
 */
export type Enum<T extends string[] | readonly string[]> = T[number];

/**
 * An object that must contain all keys in TKeys,
 * where all keys in TKeys must match TValue's types
 *
 * @template {string} TKeys - The object's keys. A string union
 * @template {unknown} TValues - The object's values for every key in {@link TKeys}.
 *
 */
export type ValueMap<TKeys extends string, TValue> = {
  [TKey in TKeys]: TValue;
};

/**
 * An object that must contain at least one or more keys and values in TChoices
 *
 * @template {Record<string, unknown>} TChoices - The object's values
 * @template {keyof TChoices} TKeys - The object's keys
 */
export type RequireAtLeastOne<
  TChoices extends Record<string, unknown>,
  TKeys extends keyof TChoices = keyof TChoices
> = Pick<TChoices, Exclude<keyof TChoices, TKeys>> &
  {
    [K in TKeys]-?: Required<Pick<TChoices, K>> &
      Partial<Pick<TChoices, Exclude<TKeys, K>>>;
  }[TKeys];
