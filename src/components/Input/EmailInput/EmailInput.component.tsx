import { isString } from "@ubloimmo/front-util";

import { Icon } from "../../Icon/Icon.component";
import {
  StyledInput,
  StyledInputContainer,
  StyledInputControl,
  defaultCommonInputProps,
} from "../Input.common";
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

const defaultEmailInputProps: DefaultInputProps<"email"> = {
  ...defaultCommonInputProps,
  value: null,
  onChange: null,
  onChangeNative: null,
  name: null,
};

/**
 * Renders an email input component. Does some rudimentary format validation on the input value.
 *
 * @version 0.0.5
 * @param {InputProps<"email">} props - The input props.
 * @return {JSX.Element} The rendered text input component.
 */
const EmailInput = (props: InputProps<"email"> & TestIdProps): JSX.Element => {
  const mergedProps = useMergedProps(defaultEmailInputProps, props);

  const onChange = useInputOnChange<"email">(
    (nativeValue) => isString(nativeValue),
    (nativeValue) => (isString(nativeValue) ? nativeValue : null),
    mergedProps.onChange,
    mergedProps.onChangeNative
  );

  const value = useInputValue<"email">(mergedProps.value, props);

  const inputStyles = useInputStyles(mergedProps);

  const testId = useTestId("input-email", props);

  const { forwardRef } = useInputRef(mergedProps);

  const onBlur = useHtmlAttribute(mergedProps.onBlur);
  const autoComplete = useHtmlAttribute(mergedProps.autoComplete);

  const id = useInputId(mergedProps);

  return (
    <StyledInputContainer {...inputStyles} data-testid="input-email-container">
      <StyledInput
        data-testid={testId}
        value={value}
        type="email"
        onChange={onChange}
        onBlur={onBlur}
        required={mergedProps.required}
        placeholder={mergedProps.placeholder}
        disabled={mergedProps.disabled}
        ref={forwardRef}
        autoComplete={autoComplete}
        id={id}
        {...inputStyles}
      />
      <StyledInputControl {...inputStyles}>
        <Icon name="At" />
      </StyledInputControl>
    </StyledInputContainer>
  );
};

EmailInput.defaultProps = defaultEmailInputProps;

export { EmailInput };
