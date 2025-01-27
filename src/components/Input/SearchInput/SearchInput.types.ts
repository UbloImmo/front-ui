import type { SelectInputProps, SelectOptionsQueryFn } from "../SelectInput";
import type { Nullable, NullishPrimitives } from "@ubloimmo/front-util";

export type SearchInputProps<
  TValue extends NullishPrimitives,
  TExtraData extends NullishPrimitives = NullishPrimitives,
> = Omit<SelectInputProps<TValue, TExtraData>, "searchable" | "options"> & {
  /**
   * The list of results to display in the search input.
   *
   * @remarks This property is a rename of `options` from inherited `SelectInputProps`,
   * for more clarity and better alignment with the context of a search input.
   *
   * See {@link SelectInputProps}.
   */
  results?: Nullable<SelectOptionsQueryFn<TValue, TExtraData>>;
};

export type SearchInputDefaultProps<
  TValue extends NullishPrimitives,
  TExtraData extends NullishPrimitives = NullishPrimitives,
> = Required<SearchInputProps<TValue, TExtraData>>;
