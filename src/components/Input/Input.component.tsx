import { useMemo } from "react";

import { ComboBoxInput } from "./ComboBoxInput";
import { CurrencyInput } from "./CurrencyInput";
import { DateInput } from "./DateInput";
import { EmailInput } from "./EmailInput";
import { IconPickerInput } from "./IconPickerInput";
import { inputTypes } from "./Input.data";
import { MultiSelectInput } from "./MultiSelectInput";
import { NumberInput } from "./NumberInput";
import { PasswordInput } from "./PasswordInput";
import { PhoneInput } from "./PhoneInput";
import { SearchInput } from "./SearchInput";
import { SearchTextInput } from "./SearchTextInput";
import { SelectInput } from "./SelectInput";
import { TextAreaInput } from "./TextAreaInput";
import { TextInput } from "./TextInput";

import { useLogger, useStatic } from "@utils";

import type {
  GenericInputProps,
  SpecificInputComponent,
  SpecificInputComponentMap,
  SpecificInputProps,
} from "./Input.generic.types";
import type { InputType } from "./Input.types";
import type { TestIdProps } from "@types";
import type { Nullable, NullishPrimitives } from "@ubloimmo/front-util";

const inputComponentMap = <
  TGenericValue extends NullishPrimitives = NullishPrimitives,
>(): SpecificInputComponentMap<TGenericValue> => ({
  text: TextInput,
  number: NumberInput,
  password: PasswordInput,
  email: EmailInput,
  phone: PhoneInput,
  currency: CurrencyInput,
  textarea: TextAreaInput,
  select: SelectInput<TGenericValue>,
  date: DateInput,
  combobox: ComboBoxInput<TGenericValue>,
  "icon-picker": IconPickerInput,
  search: SearchInput<TGenericValue>,
  "search-text": SearchTextInput,
  "multi-select": MultiSelectInput<TGenericValue>,
});

/**
 * Renders a specific input component based on the provided `type` prop.
 *
 * @version 0.0.7
 *
 * @param {GenericInputProps<TType>} props - The generic input props.
 * @returns {Nullable<JSX.Element>}
 */
const Input = <
  TType extends InputType = "text",
  TGenericValue extends NullishPrimitives = NullishPrimitives,
>({
  type,
  ...props
}: GenericInputProps<TType, TGenericValue> &
  TestIdProps): Nullable<JSX.Element> => {
  const { warn, error } = useLogger("Input");

  const inputMap = useStatic<SpecificInputComponentMap<TGenericValue>>(
    inputComponentMap<TGenericValue>
  );

  const InputComponent = useMemo<
    Nullable<SpecificInputComponent<TType, TGenericValue>>
  >(() => {
    const DefaultTextInput = TextInput as SpecificInputComponent<
      TType,
      TGenericValue
    >;

    if (!type) {
      warn("No type provided, defaulting to 'text'");
      return DefaultTextInput;
    }
    if (!inputTypes.includes(type)) {
      warn(`Unsupported input type (${type}), defaulting to 'text'`);
      return DefaultTextInput;
    }
    return inputMap[type];
  }, [type, warn, inputMap]);

  const inputProps = useMemo(() => {
    return props as SpecificInputProps<TType, TGenericValue>;
  }, [props]);

  if (!InputComponent) {
    error(`No component for input type: ${type}`);
    return null;
  }

  // pass all props to the input component
  // including `testId` prop as-is
  return <InputComponent {...inputProps} />;
};

export { Input };
