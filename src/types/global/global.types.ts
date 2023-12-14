export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type Nullish<T> = Optional<Nullable<T>>;
export type NonNullable<T> = Exclude<T, null>;
export type NonOptional<T> = Exclude<T, undefined>;
export type NonNullish<T> = NonNullable<NonNullish<T>>;

export type DeepRequired<T> = T extends object ? {
  [TKey in keyof T]-?: T[TKey];
} : T;
export type DeepNonNullable<T> = T extends object ? {
  [TKey in keyof T]: DeepNonNullable<T[TKey]>;
} : NonNullable<T>
export type DeepNonOptional<T> = T extends object ? {
  [TKey in keyof T]: DeepNonOptional<T[TKey]>;
} : NonOptional<T>
export type DeepNonNullish<T> = T extends object ? DeepRequired<{
  [TKey in keyof T]: DeepNonNullish<T[TKey]>;
}> : NonNullish<T>;
