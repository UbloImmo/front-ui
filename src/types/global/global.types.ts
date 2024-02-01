export * from "@ubloimmo/front-util/lib/types";

/**
 * Extracts the values contained in a string array as union type.
 *
 * @example
 * const myEnumValues = ["a", "b", "c"] as const;
 * type MyEnum = Enum<typeof myEnumValues>;
 */
export type Enum<T extends string[] | readonly string[]> = T[number];
