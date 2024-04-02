import { isString } from "@ubloimmo/front-util";

import { isEmailString } from "./EmailInput.utils";
import { Icon } from "../../Icon/Icon.component";
import {
  StyledInput,
  StyledInputContainer,
  StyledInputControl,
  defaultCommonInputProps,
} from "../Input.common";
import {
  useInputOnChange,
  useInputStyles,
  useInputValue,
} from "../Input.utils";

import { useMergedProps } from "@utils";

import type { DefaultInputProps, InputProps } from "../Input.types";

const defaultEmailInputProps: DefaultInputProps<"email"> = {
  ...defaultCommonInputProps,
  value: null,
  onChange: null,
};

/**
 * Renders an email input component. Does some rudimentary format validation on the input value.
 *
 * @param {InputProps<"email">} props - The input props.
 * @return {JSX.Element} The rendered text input component.
 */
const EmailInput = (props: InputProps<"email">): JSX.Element => {
  const mergedProps = useMergedProps(defaultEmailInputProps, props);
  const onChange = useInputOnChange<"email">(
    (nativeValue) => isString(nativeValue),
    (nativeValue) =>
      isEmailString(nativeValue) && nativeValue.length > 0 ? nativeValue : null,
    mergedProps.onChange
  );
  const value = useInputValue(mergedProps.value);
  const inputStyles = useInputStyles(mergedProps);
  return (
    <StyledInputContainer {...inputStyles}>
      <StyledInput
        data-testid="input-email"
        value={value}
        type="email"
        onChange={onChange}
        required={mergedProps.required}
        placeholder={mergedProps.placeholder}
        disabled={mergedProps.disabled}
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
