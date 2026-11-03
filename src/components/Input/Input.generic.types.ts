import type { ColorPickerInputProps } from "./ColorPickerInput";
import type { ComboBoxInputProps } from "./ComboBoxInput";
import type { CurrencyInputProps } from "./CurrencyInput";
import type { DateInputProps } from "./DateInput/DateInput.types";
import type { DateTimeInputProps } from "./DateTimeInput/DateTimeInput.types";
import type { EnergyScoreInputProps } from "./EnergyScoreInput/EnergyScoreInput.types";
import type { IconPickerInputProps } from "./IconPickerInput/IconPickerInput.types";
import type { InputType, InputProps } from "./Input.types";
import type { MonthYearInputProps } from "./MonthYearInput/MonthYearInput.types";
import type { MultiSelectInputProps } from "./MultiSelectInput/MultiSelectInput.types";
import type { NumberInputProps } from "./NumberInput/NumberInput.types";
import type { PasswordInputProps } from "./PasswordInput/PasswordInput.types";
import type { SearchInputProps } from "./SearchInput/SearchInput.types";
import type { SelectInputProps } from "./SelectInput/SelectInput.types";
import type { TextAreaInputProps } from "./TextAreaInput/TextAreaInput.types";
import type { TimeInputProps } from "./TimeInput/TimeInput.types";
import type { Nullable, NullishPrimitives } from "@ubloimmo/front-util";
import type { ReactNode } from "react";

type SpecificInputPropsMap<
  TGenericValue extends NullishPrimitives = NullishPrimitives,
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
  "month-year": MonthYearInputProps;
  combobox: ComboBoxInputProps<TGenericValue>;
  "icon-picker": IconPickerInputProps;
  "color-picker": ColorPickerInputProps;
  search: SearchInputProps<TGenericValue>;
  "search-text": InputProps<"search-text">;
  "multi-select": MultiSelectInputProps<TGenericValue>;
  "energy-score": EnergyScoreInputProps;
  time: TimeInputProps;
  "date-time": DateTimeInputProps;
};

export type SpecificInputProps<
  TType extends InputType,
  TGenericValue extends NullishPrimitives = NullishPrimitives,
> = SpecificInputPropsMap<TGenericValue>[TType];

export interface SpecificInputComponent<
  TType extends InputType,
  TGenericValue extends NullishPrimitives = NullishPrimitives,
> {
  (props: SpecificInputProps<TType, TGenericValue>): ReactNode;
  defaultProps?: Required<
    SpecificInputProps<TType, TGenericValue | NullishPrimitives>
  >;
}

export type SpecificInputComponentMap<
  TGenericValue extends NullishPrimitives = NullishPrimitives,
> = {
  [TType in InputType]: Nullable<SpecificInputComponent<TType, TGenericValue>>;
};

export type GenericInputProps<
  TType extends InputType,
  TGenericValue extends NullishPrimitives = NullishPrimitives,
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
