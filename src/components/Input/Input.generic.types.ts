import type { ComboBoxInputProps } from "./ComboBoxInput";
import type { CurrencyInputProps } from "./CurrencyInput";
import type { DateInputProps } from "./DateInput/DateInput.types";
import type { InputType, InputProps } from "./Input.types";
import type { NumberInputProps } from "./NumberInput/NumberInput.types";
import type { PasswordInputProps } from "./PasswordInput/PasswordInput.types";
import type { SelectInputProps } from "./SelectInput/SelectInput.types";
import type { TextAreaInputProps } from "./TextAreaInput";
import type { Nullable, NullishPrimitives } from "@ubloimmo/front-util";

type SpecificInputPropsMap<
  TGenericValue extends NullishPrimitives = NullishPrimitives
> = {
  text: InputProps<"text">;
  email: InputProps<"email">;
  phone: InputProps<"phone">;
  number: NumberInputProps;
  password: PasswordInputProps;
  currency: CurrencyInputProps;
  textarea: TextAreaInputProps;
  select: SelectInputProps<TGenericValue>;
  date: DateInputProps;
  combobox: ComboBoxInputProps<TGenericValue>;
};

export type SpecificInputProps<
  TType extends InputType,
  TGenericValue extends NullishPrimitives = NullishPrimitives
> = SpecificInputPropsMap<TGenericValue>[TType];

export interface SpecificInputComponent<
  TType extends InputType,
  TGenericValue extends NullishPrimitives = NullishPrimitives
> {
  (props: SpecificInputProps<TType, TGenericValue>): JSX.Element;
  defaultProps?: Required<
    SpecificInputProps<TType, TGenericValue | NullishPrimitives>
  >;
}

export type SpecificInputComponentMap<
  TGenericValue extends NullishPrimitives = NullishPrimitives
> = {
  [TType in InputType]: Nullable<SpecificInputComponent<TType, TGenericValue>>;
};

export type GenericInputProps<
  TType extends InputType,
  TGenericValue extends NullishPrimitives = NullishPrimitives
> = {
  /**
   * The input's type
   *
   * @type {InputType}
   * @required
   * @default undefined
   */
  type: TType;
} & SpecificInputProps<TType, TGenericValue>;

export type DefaultGenericInputProps<TType extends InputType> = Required<
  GenericInputProps<TType>
>;
