import { useMemo } from "react";

import { CurrencyInput } from "./CurrencyInput";
import { EmailInput } from "./EmailInput/EmailInput.component";
import { inputTypes } from "./Input.data";
import { NumberInput } from "./NumberInput";
import { PasswordInput } from "./PasswordInput/PasswordInput.component";
import { PhoneInput } from "./PhoneInput/PhoneInput.component";
import { TextAreaInput } from "./TextAreaInput";
import { TextInput } from "./TextInput/TextInput.component";

import { useLogger } from "@utils";

import type {
  GenericInputProps,
  SpecificInputComponentMap,
  SpecificInputProps,
} from "./Input.generic.types";
import type { InputType } from "./Input.types";
import type { TestIdProps } from "@types";
import type { Nullable } from "@ubloimmo/front-util";
import type { FC } from "react";

const inputComponentMap: SpecificInputComponentMap = {
  text: TextInput,
  number: NumberInput,
  password: PasswordInput,
  email: EmailInput,
  phone: PhoneInput,
  currency: CurrencyInput,
  textarea: TextAreaInput,
};

/**
 * Renders a specific input component based on the provided `type` prop.
 *
 * @version 0.0.4
 *
 * @param {GenericInputProps<TType>} props - The generic input props.
 * @returns {Nullable<JSX.Element>}
 */
const Input = <TType extends InputType = "text">({
  type,
  ...props
}: GenericInputProps<TType> & TestIdProps): Nullable<JSX.Element> => {
  const { warn, error } = useLogger("Input");

  const InputComponent = useMemo<
    Nullable<FC<SpecificInputProps<TType>>>
  >(() => {
    const DefaultTextInput = TextInput as FC<SpecificInputProps<TType>>;
    if (!type) {
      warn("No type provided, defaulting to 'text'");
      return DefaultTextInput;
    }
    if (!inputTypes.includes(type)) {
      warn(`Unsupported input type (${type}), defaulting to 'text'`);
      return DefaultTextInput;
    }
    return inputComponentMap[type];
  }, [type, warn]);

  const inputProps = useMemo(() => {
    return props as SpecificInputProps<TType>;
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
