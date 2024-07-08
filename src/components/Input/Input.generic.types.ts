import type { CurrencyInputProps } from "./CurrencyInput";
import type { InputType, InputProps } from "./Input.types";
import type { NumberInputProps } from "./NumberInput/NumberInput.types";
import type { PasswordInputProps } from "./PasswordInput/PasswordInput.types";
import type { SelectInputProps } from "./SelectInput/SelectInput.types";
import type { TextAreaInputProps } from "./TextAreaInput";
import type { Nullable, NullishPrimitives } from "@ubloimmo/front-util";
import type { FC } from "react";

type SpecificInputPropsMap = {
  text: InputProps<"text">;
  email: InputProps<"email">;
  phone: InputProps<"phone">;
  number: NumberInputProps;
  password: PasswordInputProps;
  currency: CurrencyInputProps;
  textarea: TextAreaInputProps;
  select: SelectInputProps<NullishPrimitives>;
};

export type SpecificInputProps<TType extends InputType> =
  SpecificInputPropsMap[TType];

export type SpecificInputComponentMap = {
  [TType in InputType]: Nullable<FC<SpecificInputProps<TType>>>;
};

export type GenericInputProps<TType extends InputType> = {
  /**
   * The input's type
   *
   * @type {InputType}
   * @required
   * @default undefined
   */
  type: TType;
} & SpecificInputProps<TType>;

export type DefaultGenericInputProps<TType extends InputType> = Required<
  GenericInputProps<TType>
>;
