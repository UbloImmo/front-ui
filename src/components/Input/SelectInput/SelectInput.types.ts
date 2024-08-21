import { InputOnChangeFn, InputProps, InputValue } from "../Input.types";

import { IconName } from "@/components/Icon";
import { StyleProps } from "@types";

import type {
  NullishPrimitives,
  MaybeAsyncFn,
  Nullable,
  Replace,
  VoidFn,
  GenericFn,
  AsyncFn,
} from "@ubloimmo/front-util";
import type { FC } from "react";

export type SelectOption<
  TValue extends NullishPrimitives,
  TExtraData extends NullishPrimitives = NullishPrimitives
> = {
  value: TValue | null;
  label: string;
  disabled?: boolean;
  icon?: IconName;
  active?: boolean;
  extraData?: TExtraData;
};

export type SelectOptionItemStyleProps = StyleProps<
  SelectOption<NullishPrimitives>
>;

// groupe d'options
export type SelectOptionGroup<
  TValue extends NullishPrimitives,
  TExtraData extends NullishPrimitives = NullishPrimitives
> = {
  label: string;
  options: SelectOption<TValue, TExtraData>[];
};

export type SelectOptionOrGroup<
  TValue extends NullishPrimitives,
  TExtraData extends NullishPrimitives = NullishPrimitives
> = SelectOption<TValue, TExtraData> | SelectOptionGroup<TValue, TExtraData>;

/**
 * Une fonction potentiellement async sans arguments qui retourne une liste d'options / groupes
 */
export type SelectOptionsQueryFn<
  TValue extends NullishPrimitives,
  TExtraData extends NullishPrimitives = NullishPrimitives
> = MaybeAsyncFn<[Nullable<string>], SelectOptionOrGroup<TValue, TExtraData>[]>;

/**
 * Soit un array d'options ou groupes,
 * soit une fonction potentiellement async qui retourne une liste d'options / groupes
 */
export type SelectOptionsQuery<
  TValue extends NullishPrimitives,
  TExtraData extends NullishPrimitives = NullishPrimitives
> =
  | SelectOptionOrGroup<TValue, TExtraData>[]
  | SelectOptionsQueryFn<TValue, TExtraData>;

export type CustomOptionComponent<
  TValue extends NullishPrimitives,
  TExtraData extends NullishPrimitives = NullishPrimitives
> = FC<SelectOption<TValue, TExtraData>>;

export type CustomSelectedOptionComponent<
  TValue extends NullishPrimitives,
  TExtraData extends NullishPrimitives = NullishPrimitives
> = FC<SelectOption<TValue, TExtraData>>;

export type SelectInputProps<
  TValue extends NullishPrimitives,
  TExtraData extends NullishPrimitives = NullishPrimitives
> = Replace<
  InputProps<"select">,
  "value",
  {
    value?: Nullable<InputValue<"select">> & Nullable<TValue>;
    onChange: Nullable<InputOnChangeFn<"select">> &
      Nullable<VoidFn<[Nullable<TValue>]>>;
  }
> & {
  options?: SelectOptionsQuery<TValue, TExtraData>;
  searchable?: boolean;
  disabled?: boolean;
  placeholder?: Nullable<string>;
  Option?: Nullable<CustomOptionComponent<TValue, TExtraData>>;
  SelectedOption?: Nullable<CustomSelectedOptionComponent<TValue, TExtraData>>;
  /**
   * The icon that gets displayed right of the control
   *
   * @type {IconName}
   * @default "CaretDownFill"
   */
  controlIcon?: IconName;
};

export type DefaultSelectInputProps<
  TValue extends NullishPrimitives,
  TExtraData extends NullishPrimitives = NullishPrimitives
> = Required<SelectInputProps<TValue, TExtraData>>;

export type SelectInputOptionProps<
  TValue extends NullishPrimitives,
  TExtraData extends NullishPrimitives = NullishPrimitives
> = SelectOption<TValue, TExtraData> & {
  onSelect?: Nullable<VoidFn>;
  Option?: Nullable<CustomOptionComponent<TValue, TExtraData>>;
};

export type SelectInputOptionGroupProps<
  TValue extends NullishPrimitives,
  TExtraData extends NullishPrimitives = NullishPrimitives
> = SelectOptionGroup<TValue, TExtraData> & {
  onSelectOption: GenericFn<[SelectOption<TValue>], VoidFn>;
  Option?: Nullable<CustomOptionComponent<TValue, TExtraData>>;
};

export type RefetchSelectOptionsFn = AsyncFn<[Nullable<string>], void>;
