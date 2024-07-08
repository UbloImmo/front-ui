import { isNull, isString } from "@ubloimmo/front-util";
import { useEffect, useMemo, useState } from "react";

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
  useInputRef,
  useInputStyles,
  useInputValue,
} from "../Input.utils";

import { useHtmlAttribute, useMergedProps, useTestId } from "@utils";

import type {
  DefaultPasswordInputProps,
  PasswordInputProps,
  PasswordVisibility,
} from "./PasswordInput.types";
import type { InputValue } from "../Input.types";
import type { TestIdProps } from "@types";

const defaultPasswordInputProps: DefaultPasswordInputProps = {
  ...defaultCommonInputProps,
  value: null,
  onChange: null,
  onVisibilityChange: null,
  allowChangeVisibility: true,
  visible: false,
  name: null,
};

/**
 * Renders a password input component that allows for password visibility toggle.
 *
 * @version 0.0.4
 *
 * @param {PasswordInputProps} props - The input props.
 * @return {JSX.Element} The rendered text input component.
 */
const PasswordInput = (
  props: PasswordInputProps & TestIdProps
): JSX.Element => {
  const mergedProps = useMergedProps(defaultPasswordInputProps, props);

  const [isPasswordVisible, setIsPasswordVisible] = useState(
    mergedProps.visible
  );

  const { inputRef, forwardRef } = useInputRef(mergedProps);

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
    mergedProps.onChange,
    mergedProps.onChangeNative
  );

  const value = useInputValue(
    mergedProps.value,
    undefined,
    undefined,
    !!mergedProps.onChange || !mergedProps.value
  );

  const inputStyles = useInputStyles(mergedProps);

  const testId = useTestId("input-password", props);

  const onBlur = useHtmlAttribute(mergedProps.onBlur);

  return (
    <StyledInputContainer
      {...inputStyles}
      data-testid="input-password-container"
    >
      <StyledInput
        data-testid={testId}
        value={value}
        type={visibility.inputType}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={mergedProps.placeholder}
        disabled={mergedProps.disabled}
        required={mergedProps.required}
        aria-roledescription="Champs de saisie mot de passe"
        role="textbox"
        ref={forwardRef}
        autoComplete="new-password"
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
