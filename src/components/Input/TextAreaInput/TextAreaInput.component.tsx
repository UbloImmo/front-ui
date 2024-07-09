import { isString } from "@ubloimmo/front-util";
import { ChangeEventHandler, FocusEventHandler } from "react";

import { StyledTextArea } from "./TextAreaInput.styles";
import { defaultCommonInputProps } from "../Input.common";
import {
  useInputOnChange,
  useInputRef,
  useInputStyles,
  useInputValue,
} from "../Input.utils";

import { useTestId, useMergedProps, useHtmlAttribute } from "@utils";

import type {
  TextAreaInputDefaultProps,
  TextAreaInputProps,
} from "./TextAreaInput.types";
import type { TestIdProps } from "@types";

const defaultTextAreaInputProps: TextAreaInputDefaultProps = {
  ...defaultCommonInputProps,
  value: null,
  onChange: null,
  onChangeNative: null,
  name: null,
  resize: false,
};

/**
 * A multi-line text input.
 *
 * @version 0.0.1
 *
 * @param {TextAreaInputProps & TestIdProps} props - TextAreaInput component props
 * @returns {JSX.Element}
 */
const TextAreaInput = (
  props: TextAreaInputProps & TestIdProps
): JSX.Element => {
  const mergedProps = useMergedProps(defaultTextAreaInputProps, props);
  const testId = useTestId("input-textarea", props);
  const inputStyles = useInputStyles(mergedProps);
  const value = useInputValue<"textarea">(mergedProps.value, props);

  const onChange = useInputOnChange<"textarea">(
    (nativeValue) => isString(nativeValue),
    (nativeValue) =>
      isString(nativeValue) && nativeValue.length > 0 ? nativeValue : null,
    mergedProps.onChange,
    mergedProps.onChangeNative
  ) as ChangeEventHandler<Pick<HTMLTextAreaElement, "value">>;

  const { forwardRef } = useInputRef<HTMLTextAreaElement>(mergedProps);

  const onBlur = useHtmlAttribute<FocusEventHandler>(mergedProps.onBlur);
  const autoComplete = useHtmlAttribute(mergedProps.autoComplete);

  return (
    <StyledTextArea
      data-testid={testId}
      value={value}
      name={mergedProps.name ?? undefined}
      disabled={mergedProps.disabled}
      placeholder={mergedProps.placeholder}
      required={mergedProps.required}
      onChange={onChange}
      onBlur={onBlur}
      ref={forwardRef}
      autoComplete={autoComplete}
      {...inputStyles}
      $resize={mergedProps.resize}
    />
  );
};
TextAreaInput.defaultProps = defaultTextAreaInputProps;

export { TextAreaInput };
