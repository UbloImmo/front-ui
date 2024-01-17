export * from "@ubloimmo/front-util/lib/types";

/**
 * Extracts the values contained in a string array as union type.
 */
export type Enum<T extends string[] | readonly string[]> = T[number];
