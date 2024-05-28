import { useMemo } from "react";

import { EmailInput } from "./EmailInput/EmailInput.component";
import { inputTypes } from "./Input.types";
import { NumberInput } from "./NumberInput";
import { PasswordInput } from "./PasswordInput/PasswordInput.component";
import { PhoneInput } from "./PhoneInput/PhoneInput.component";
import { TextInput } from "./TextInput/TextInput.component";

import { useLogger } from "@utils";

import type {
  GenericInputProps,
  InputProps,
  InputType,
  TypedInputComponentMap,
} from "./Input.types";
import type { Nullable } from "@ubloimmo/front-util";
import type { FC } from "react";

const inputComponentMap: TypedInputComponentMap = {
  text: TextInput,
  number: NumberInput,
  password: PasswordInput,
  email: EmailInput,
  phone: PhoneInput,
};

/**
 * Renders a specific input component based on the provided `type` prop.
 *
 * @version 0.0.1
 *
 * @param {GenericInputProps<TType>} props - The generic input props.
 * @returns {Nullable<JSX.Element>}
 */
const Input = <TType extends InputType = "text">({
  type,
  ...props
}: GenericInputProps<TType>): Nullable<JSX.Element> => {
  const { warn, error } = useLogger("Input");

  const InputComponent = useMemo<Nullable<FC<InputProps<TType>>>>(() => {
    const DefaultTextInput = TextInput as FC<InputProps<TType>>;
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

  if (!InputComponent) {
    error(`No component for input type: ${type}`);
    return null;
  }

  return <InputComponent {...props} />;
};
Input.defaultProps = { ...TextInput.defaultProps } as Required<
  Parameters<typeof Input>[0]
>;

export { Input };
