import type {
  CommonInputStyleProps,
  DefaultInputProps,
  InputProps,
  InputValue,
} from "../Input.types";
import {
  useInputOnChange,
  useInputStyles,
  useInputValue,
} from "../Input.utils";
import { defaultCommonInputProps } from "../Input.common";
import { mergeDefaultProps } from "../../../utils";
import { isString } from "@ubloimmo/front-util";
import styled from "styled-components";
import { commonInputStyles } from "../Input.styles";

const defaultTextProps: DefaultInputProps<"text"> = {
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
export const TextInput = (props: InputProps<"text">) => {
  const mergedProps = mergeDefaultProps(defaultTextProps, props);
  const onChange = useInputOnChange<"text">(
    (nativeValue): nativeValue is InputValue<"text"> => isString(nativeValue),
    (nativeValue) =>
      isString(nativeValue) && nativeValue.length > 0 ? nativeValue : null,
    mergedProps.onChange
  );
  const value = useInputValue(mergedProps.value);
  const inputStyles = useInputStyles(mergedProps);
  return (
    <StyledTextInput
      value={value}
      type="text"
      onChange={onChange}
      placeholder={mergedProps.placeholder}
      disabled={mergedProps.disabled}
      {...inputStyles}
    />
  );
};

const StyledTextInput = styled.input<CommonInputStyleProps>`
  ${commonInputStyles}
`;
