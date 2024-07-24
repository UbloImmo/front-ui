import { InputOnChangeFn, InputProps, InputValue } from "../Input.types";

import { StyleProps } from "@types";

import type {
  NullishPrimitives,
  MaybeAsyncFn,
  Nullable,
  Replace,
  VoidFn,
} from "@ubloimmo/front-util";

export type SelectOption<TValue extends NullishPrimitives> = {
  value: TValue | null;
  label: string;
  disabled?: boolean;
  active?: boolean;
};

export type SelectOptionItemStyleProps = StyleProps<
  SelectOption<NullishPrimitives>
>;

// groupe d'options
export type SelectOptionGroup<TValue extends NullishPrimitives> = {
  label: string;
  options: SelectOption<TValue>[];
};

export type SelectOptionOrGroup<TValue extends NullishPrimitives> =
  | SelectOption<TValue>
  | SelectOptionGroup<TValue>;

/**
 * Une fonction potentiellement async sans arguments qui retourne une liste d'options / groupes
 */
export type SelectOptionsQueryFn<TValue extends NullishPrimitives> =
  MaybeAsyncFn<string[], SelectOptionOrGroup<TValue>[]>;

/**
 * Soit un array d'options ou groupes,
 * soit une fonction potentiellement async qui retourne une liste d'options / groupes
 */
export type SelectOptionsQuery<TValue extends NullishPrimitives> =
  | SelectOptionOrGroup<TValue>[]
  | SelectOptionsQueryFn<TValue>;

export type SelectInputProps<TValue extends NullishPrimitives> = Replace<
  InputProps<"select">,
  "value",
  {
    value?: Nullable<InputValue<"select">> & Nullable<TValue>;
    onChange: Nullable<InputOnChangeFn<"select">> &
      Nullable<VoidFn<[Nullable<TValue>]>>;
  }
> & {
  options?: SelectOptionsQuery<TValue>;
  searchable?: boolean;
  disabled?: boolean;
  placeholder?: Nullable<string>;
};

export type DefaultSelectInputProps<TValue extends NullishPrimitives> =
  Required<SelectInputProps<TValue>>;

export type SelectInputOptionProps<TValue extends NullishPrimitives> =
  SelectOption<TValue> & {
    onSelect?: Nullable<VoidFn>;
  };
