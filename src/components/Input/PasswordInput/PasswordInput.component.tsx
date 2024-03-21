import type { InputValue } from "../Input.types";
import type {
  DefaultPasswordInputProps,
  PasswordInputProps,
  PasswordVisibility,
} from "./PasswordInput.types";
import { isString } from "@ubloimmo/front-util";
import { useMergedProps } from "../../../utils";
import {
  useInputOnChange,
  useInputValue,
  useInputStyles,
} from "../Input.utils";
import {
  defaultCommonInputProps,
  StyledInput,
  StyledInputContainer,
  SyledInputControl,
} from "../Input.common";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Icon } from "../../Icon";

export const defaultPasswordInputProps: DefaultPasswordInputProps = {
  ...defaultCommonInputProps,
  value: null,
  onChange: (_value) => {},
  onVisibilityChange: (_visible) => {},
  allowChangeVisibility: true,
  visible: false,
};

/**
 * Renders a password input component.
 *
 * @param {PasswordInputProps} props - The input props.
 * @return {JSX.Element} The rendered text input component.
 */
export const PasswordInput = (props: PasswordInputProps): JSX.Element => {
  const mergedProps = useMergedProps(defaultPasswordInputProps, props);

  const [isPasswordVisible, setIsPasswordVisible] = useState(
    mergedProps.visible
  );

  useEffect(() => {
    // update the password visibility if props change
    setIsPasswordVisible(mergedProps.visible);
  }, [mergedProps.visible]);

  const toggleVisibility = useCallback(() => {
    if (!mergedProps.allowChangeVisibility) return;
    const newVisibility = mergedProps.disabled ? false : !isPasswordVisible;
    if (newVisibility !== isPasswordVisible) {
      setIsPasswordVisible(newVisibility);
      if (mergedProps.onVisibilityChange)
        mergedProps.onVisibilityChange(newVisibility);
    }
  }, [mergedProps, isPasswordVisible]);

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
        data-testid="input-text"
        value={value}
        type={visibility.inputType}
        onChange={onChange}
        placeholder={mergedProps.placeholder}
        disabled={mergedProps.disabled}
        aria-roledescription="Champs de saisie mot de passe"
        role="textbox"
        {...inputStyles}
      ></StyledInput>
      <SyledInputControl
        {...inputStyles}
        data-testid="input-control"
        onClick={toggleVisibility}
        title={visibility.controlTitle}
        aria-label={visibility.controlTitle}
        role="button"
        aria-roledescription="Bouton de visibilité du mot de passe"
      >
        <Icon name={visibility.controlIcon} />
      </SyledInputControl>
    </StyledInputContainer>
  );
};
