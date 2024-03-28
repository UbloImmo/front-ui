import { isNull, isString, type Nullable } from "@ubloimmo/front-util";
import { useEffect, useMemo, useRef, useState } from "react";

import { Icon } from "../../Icon";
import {
  StyledInput,
  StyledInputContainer,
  StyledInputControlGroup,
  StyledInputGroupedControl,
  defaultCommonInputProps,
} from "../Input.common";
import {
  useInputControlCallback,
  useInputOnChange,
  useInputStyles,
  useInputValue,
} from "../Input.utils";

import { useMergedProps } from "@utils";

import type {
  DefaultPasswordInputProps,
  PasswordInputProps,
  PasswordVisibility,
} from "./PasswordInput.types";
import type { InputValue } from "../Input.types";

const defaultPasswordInputProps: DefaultPasswordInputProps = {
  ...defaultCommonInputProps,
  value: null,
  onChange: null,
  onVisibilityChange: null,
  allowChangeVisibility: true,
  visible: false,
};

/**
 * Renders a password input component that allows for password visibility toggle.
 *
 * @version 0.0.1
 *
 * @param {PasswordInputProps} props - The input props.
 * @return {JSX.Element} The rendered text input component.
 */
const PasswordInput = (props: PasswordInputProps): JSX.Element => {
  const inputRef = useRef<Nullable<HTMLInputElement>>(null);
  const mergedProps = useMergedProps(defaultPasswordInputProps, props);

  const [isPasswordVisible, setIsPasswordVisible] = useState(
    mergedProps.visible
  );

  useEffect(() => {
    // update the password visibility if props change
    setIsPasswordVisible(mergedProps.visible);
  }, [mergedProps.visible]);

  const toggleVisibility = useInputControlCallback(
    inputRef,
    mergedProps,
    () => {
      if (!mergedProps.allowChangeVisibility) return;
      const inverseVis = !isPasswordVisible;
      setIsPasswordVisible(inverseVis);
      if (isNull(mergedProps.onVisibilityChange)) return;
      mergedProps.onVisibilityChange(inverseVis);
    }
  );

  const visibility = useMemo<PasswordVisibility>(() => {
    const visible = isPasswordVisible && !mergedProps.disabled;
    const props: Omit<PasswordVisibility, "controlTitle"> = visible
      ? {
          inputType: "text",
          controlIcon: "EyeSlash",
        }
      : {
          inputType: "password",
          controlIcon: "Eye",
        };
    return {
      ...props,
      controlTitle: `${visible ? "Cacher" : "Afficher"} le mot de passe`,
    };
  }, [mergedProps, isPasswordVisible]);

  const onChange = useInputOnChange<"password">(
    (nativeValue): nativeValue is InputValue<"password"> =>
      isString(nativeValue),
    (nativeValue) =>
      isString(nativeValue) && nativeValue.length > 0 ? nativeValue : null,
    mergedProps.onChange
  );

  const value = useInputValue(mergedProps.value);

  const inputStyles = useInputStyles(mergedProps);
  return (
    <StyledInputContainer {...inputStyles}>
      <StyledInput
        data-testid="input-password"
        value={value}
        type={visibility.inputType}
        onChange={onChange}
        placeholder={mergedProps.placeholder}
        disabled={mergedProps.disabled}
        required={mergedProps.required}
        aria-roledescription="Champs de saisie mot de passe"
        role="textbox"
        ref={inputRef}
        {...inputStyles}
      ></StyledInput>
      <StyledInputControlGroup>
        <StyledInputGroupedControl
          {...inputStyles}
          data-testid="input-control"
          onClick={toggleVisibility}
          title={visibility.controlTitle}
          aria-label={visibility.controlTitle}
          role="button"
          aria-roledescription="Bouton de visibilité du mot de passe"
        >
          <Icon name={visibility.controlIcon} />
        </StyledInputGroupedControl>
      </StyledInputControlGroup>
    </StyledInputContainer>
  );
};

PasswordInput.defaultProps = defaultPasswordInputProps;

export { PasswordInput };
