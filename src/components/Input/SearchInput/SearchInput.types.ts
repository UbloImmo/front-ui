import type { SelectInputProps } from "../SelectInput";
import type { NullishPrimitives } from "@ubloimmo/front-util";

export type SearchInputProps<
  TValue extends NullishPrimitives,
  TExtraData extends NullishPrimitives = NullishPrimitives
> = Omit<SelectInputProps<TValue, TExtraData>, "searchable" | "controlIcon">;

export type SearchInputDefaultProps<
  TValue extends NullishPrimitives,
  TExtraData extends NullishPrimitives = NullishPrimitives
> = Required<SearchInputProps<TValue, TExtraData>>;
