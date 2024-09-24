import { InputProps, InputValue } from "../Input.types";

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

/**
 * A function used to filter options based on external creteria.
 *
 * @template {NullishPrimitives} TValue - The type of the value.
 * @template {NullishPrimitives} TExtraData - The type of the extra data.
 * @param {SelectOption<TValue, TExtraData>} option - The option to be filtered.
 * @returns {boolean} - Whether the option should be displayed in the list.
 */
export type FilterSelectOptionFn<
  TValue extends NullishPrimitives,
  TExtraData extends NullishPrimitives = NullishPrimitives
> = GenericFn<[SelectOption<TValue, TExtraData>], boolean>;

/**
 * The custom component to render the selected option
 */
export type CustomSelectedOptionComponent<TValue extends NullishPrimitives> =
  FC<{
    /**
     * The value of the selected custom option
     * @type {Nullable<TValue>}
     */
    value: Nullable<TValue>;

    /**
     * Whether the selection is disabled
     * @type {boolean}
     */
    disabled?: boolean;
  }>;

export type SelectInputProps<
  TValue extends NullishPrimitives,
  TExtraData extends NullishPrimitives = NullishPrimitives
> = Replace<
  InputProps<"select", TValue>,
  "value",
  {
    value?: Nullable<InputValue<"select">> & Nullable<TValue>;
  }
> & {
  /**
   * The options data to be displayed in the dropdown
   *
   * @type {SelectOptionsQuery<TValue, TExtraData>}
   * @default null
   */
  options?: SelectOptionsQuery<TValue, TExtraData>;
  /**
   * A function used to filter options based on external creteria
   *
   * @default null
   *
   * @type {Nullable<FilterSelectOptionFn<TValue, TExtraData>>}
   */
  filterOption?: Nullable<FilterSelectOptionFn<TValue, TExtraData>>;

  /**
   * Whether the user can search for an option by typing
   *
   * @default false
   * @type {boolean}
   */
  searchable?: boolean;

  /**
   * The custom Option component that gets rendered for each option
   *
   * @type {Nullable<CustomOptionComponent<TValue, TExtraData>>}
   */
  Option?: Nullable<CustomOptionComponent<TValue, TExtraData>>;

  /**
   * The custom SelectedOption component that gets rendered for the selected option
   *
   * @type {Nullable<CustomSelectedOptionComponent<TValue>>}
   */
  SelectedOption?: Nullable<CustomSelectedOptionComponent<TValue>>;
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
