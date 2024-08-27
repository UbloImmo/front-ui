import type { SelectInputProps } from "../SelectInput";
import type { NullishPrimitives } from "@ubloimmo/front-util";

export type SearchInputProps<
  TGenericValue extends NullishPrimitives = NullishPrimitives,
  TExtraData extends NullishPrimitives = NullishPrimitives
> = Omit<
  SelectInputProps<TGenericValue, TExtraData>,
  "searchable" | "controlIcon"
>;

export type SearchInputDefaultProps = Required<SearchInputProps>;
