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

/**
 * Takes a string enum or a string array  and extends it with another enum.
 *
 * @template {string | string[] | readonly string[]} TEnum - The base string enum or string array
 * @template {string | string[] | readonly string[]} TExtension - The extension string enum or string array
 */
export type EnumExtension<
  TEnum extends string | string[] | readonly string[],
  TExtension extends string | string[] | readonly string[]
> =
  | (TEnum extends string[] | readonly string[] ? Enum<TEnum> : TEnum)
  | (TExtension extends string[] | readonly string[]
      ? Enum<TExtension>
      : TExtension);

/**
 * Extracts the type of the value in TUnion that matches TSelection
 *
 * @remarks Not really needed, basically acts as a safeguard when using only a subset of an existing union
 *
 * @template TUnion - Base Union type
 * @template TSelection - Subset of TUnion
 */
export type Extract<TUnion, TSelection> = TSelection extends TUnion
  ? TSelection
  : never;

export type DeepPartial<T extends object> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
