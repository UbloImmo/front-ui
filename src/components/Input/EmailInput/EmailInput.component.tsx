import type { DefaultInputProps, InputProps } from "../Input.types";
import {
  useInputOnChange,
  useInputStyles,
  useInputValue,
} from "../Input.utils";
import {
  StyledInput,
  defaultCommonInputProps,
  StyledInputContainer,
  StyledInputControl,
} from "../Input.common";
import { useMergedProps } from "../../../utils";
import { isString } from "@ubloimmo/front-util";
import { isEmailString } from "./EmailInput.utils";
import { Icon } from "../../Icon/Icon.component";

export const defaultEmailInputProps: DefaultInputProps<"email"> = {
  ...defaultCommonInputProps,
  value: null,
  onChange: (_value) => {},
};

/**
 * Renders a text input component.
 *
 * @param {InputProps<"email">} props - The input props.
 * @return {JSX.Element} The rendered text input component.
 */
export const EmailInput = (props: InputProps<"email">): JSX.Element => {
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
