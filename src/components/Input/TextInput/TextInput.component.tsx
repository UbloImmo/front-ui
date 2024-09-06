import { isString } from "@ubloimmo/front-util";

import { StyledInput, defaultCommonInputProps } from "../Input.common";
import {
  useInputId,
  useInputOnChange,
  useInputRef,
  useInputStyles,
  useInputValue,
} from "../Input.utils";

import { useHtmlAttribute, useMergedProps, useTestId } from "@utils";

import type { DefaultInputProps, InputProps } from "../Input.types";
import type { TestIdProps } from "@types";

const defaultTextInputProps: DefaultInputProps<"text"> = {
  ...defaultCommonInputProps,
  value: null,
  onChange: null,
  name: null,
};

/**
 * Renders a text input component.
 *
 * @version 0.0.5
 *
 * @param {InputProps<"text">} props - The input props.
 * @return {JSX.Element} The rendered text input component.
 */
const TextInput = (props: InputProps<"text"> & TestIdProps): JSX.Element => {
  const mergedProps = useMergedProps(defaultTextInputProps, props);
  const onChange = useInputOnChange<"text">(
    (nativeValue) => isString(nativeValue),
    (nativeValue) =>
      isString(nativeValue) && nativeValue.length > 0 ? nativeValue : null,
    mergedProps.onChange,
    mergedProps.onChangeNative
  );

  const value = useInputValue<"text">(mergedProps.value, props);
  const inputStyles = useInputStyles(mergedProps);
  const testId = useTestId("input-text", props);
  const { forwardRef } = useInputRef(mergedProps);
  const onBlur = useHtmlAttribute(mergedProps.onBlur);
  const autoComplete = useHtmlAttribute(mergedProps.autoComplete);
  const id = useInputId(mergedProps);
  return (
    <StyledInput
      data-testid={testId}
      value={value}
      type="text"
      onChange={onChange}
      onBlur={onBlur}
      placeholder={mergedProps.placeholder}
      required={mergedProps.required}
      disabled={mergedProps.disabled}
      autoComplete={autoComplete}
      ref={forwardRef}
      id={id}
      {...inputStyles}
    />
  );
};

TextInput.defaultProps = defaultTextInputProps;

export { TextInput };
