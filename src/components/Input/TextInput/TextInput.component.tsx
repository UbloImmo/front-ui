import type { DefaultInputProps, InputProps, InputValue } from "../Input.types";
import {
  useInputOnChange,
  useInputStyles,
  useInputValue,
} from "../Input.utils";
import { StyledInput, defaultCommonInputProps } from "../Input.common";
import { useMergedProps } from "../../../utils";
import { isString } from "@ubloimmo/front-util";

export const defaultTextInputProps: DefaultInputProps<"text"> = {
  ...defaultCommonInputProps,
  value: null,
  onChange: (_value) => {},
};

/**
 * Renders a text input component.
 *
 * @param {InputProps<"text">} props - The input props.
 * @return {JSX.Element} The rendered text input component.
 */
export const TextInput = (props: InputProps<"text">): JSX.Element => {
  const mergedProps = useMergedProps(defaultTextInputProps, props);
  const onChange = useInputOnChange<"text">(
    (nativeValue): nativeValue is InputValue<"text"> => isString(nativeValue),
    (nativeValue) =>
      isString(nativeValue) && nativeValue.length > 0 ? nativeValue : null,
    mergedProps.onChange
  );
  const value = useInputValue(mergedProps.value);
  const inputStyles = useInputStyles(mergedProps);
  return (
    <StyledInput
      data-testid="input-text"
      value={value}
      type="text"
      onChange={onChange}
      placeholder={mergedProps.placeholder}
      disabled={mergedProps.disabled}
      {...inputStyles}
    />
  );
};
