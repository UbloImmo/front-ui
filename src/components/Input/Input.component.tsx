import { useMemo } from "react";
import type { FC } from "react";
import { useLogger } from "../../utils";
import type {
  GenericInputProps,
  InputType,
  InputProps,
  TypedInputComponentMap,
} from "./Input.types";
import { inputTypes } from "./Input.types";
import { TextInput } from "./TextInput/TextInput.component";
import type { Nullable } from "@ubloimmo/front-util";

const inputComponentMap: TypedInputComponentMap = {
  text: TextInput,
  number: null,
  password: null,
  email: null,
};

/**
 * Renders a specific input component based on the provided type prop.
 *
 * @param {GenericInputProps<TType>} props - The generic input props.
 * @returns {Nullable<JSX.Element>}
 */
export const Input = <TType extends InputType = "text">({
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
