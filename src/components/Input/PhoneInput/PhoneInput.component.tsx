import { isFunction, isNull } from "@ubloimmo/front-util";
import { useRef, useMemo, useCallback, ChangeEventHandler } from "react";
import {
  CountrySelector,
  ParsedCountry,
  defaultCountries,
  usePhoneInput,
} from "react-international-phone";
import styled from "styled-components";

import {
  phoneInputContainerStyles,
  phoneInputStyles,
  reactInternalPhoneStyle,
} from "./PhoneInput.styles";
import { FRENCH_PHONE_PREFIX, defaultToFrenchPhone } from "./PhoneInput.utils";
import {
  StyledInput,
  StyledInputContainer,
  defaultCommonInputProps,
} from "../Input.common";
import { useInputId, useInputRef, useInputStyles } from "../Input.utils";

import { useHtmlAttribute, useMergedProps, useTestId } from "@utils";

import type {
  DefaultInputProps,
  InputProps,
  NativeInputOnChangeFn,
} from "../Input.types";
import type { TestIdProps } from "@types";

const defaultPhoneInputProps: DefaultInputProps<"phone"> = {
  ...defaultCommonInputProps,
  value: null,
  onChange: null,
  onChangeNative: null,
  placeholder: "+33 6 00 00 00 00",
  name: null,
};

/**
 * Renders a international phone input component.
 * Does international phone formatting on the input value.
 *
 * @version 0.0.7
 * @param {InputProps<"phone">} props - The input props.
 * @return {JSX.Element} The rendered phone input component.
 */
const PhoneInput = (props: InputProps<"phone"> & TestIdProps): JSX.Element => {
  const mergedProps = useMergedProps(defaultPhoneInputProps, props);
  const testId = useTestId("input-phone", props);

  const { inputRef, forwardRef } = useInputRef(mergedProps);

  const initialValue = useMemo(
    () => defaultToFrenchPhone(mergedProps.value ?? ""),
    [mergedProps.value]
  );

  const prevPhone = useRef<string>(initialValue);

  const propagateChange = useCallback(
    ({ phone }: { phone: string }) => {
      if (mergedProps.onChange) mergedProps.onChange(phone);
    },
    [mergedProps]
  );

  const { inputValue, setCountry, handlePhoneValueChange, country } =
    usePhoneInput({
      value: initialValue,
      inputRef,
      onChange: propagateChange,
      defaultCountry: "fr",
      disableDialCodePrefill: true,
    });

  const interceptOnChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (event) => {
      if (prevPhone.current === "" && event.target.value === "0") {
        event.target.value = FRENCH_PHONE_PREFIX;
      }
      handlePhoneValueChange(event);
      if (isFunction<NativeInputOnChangeFn>(mergedProps.onChangeNative)) {
        mergedProps.onChangeNative(event);
      }
      prevPhone.current = event.target.value;
    },
    [handlePhoneValueChange, mergedProps]
  );

  const changeCountryOnSelect = useCallback(
    (country: ParsedCountry) => {
      setCountry(country.iso2);
      if (!isNull(inputRef.current)) {
        inputRef.current.focus();
      }
    },
    [inputRef, setCountry]
  );

  const onBlur = useHtmlAttribute(mergedProps.onBlur);

  const inputStyles = useInputStyles(mergedProps);
  const id = useInputId(mergedProps);

  return (
    <PhoneInputContainer {...inputStyles} data-testid="input-phone-container">
      <CountrySelector
        selectedCountry={country.iso2}
        onSelect={changeCountryOnSelect}
        countries={defaultCountries}
        disabled={mergedProps.disabled}
        data-testid="input-phone-control"
      />
      <StyledPhoneInput
        data-testid={testId}
        {...inputStyles}
        ref={forwardRef}
        value={inputValue}
        onChange={interceptOnChange}
        onBlur={onBlur}
        disabled={mergedProps.disabled}
        placeholder={mergedProps.placeholder}
        type="tel"
        id={id}
      />
    </PhoneInputContainer>
  );
};

PhoneInput.defaultProps = defaultPhoneInputProps;
export { PhoneInput };

const PhoneInputContainer = styled(StyledInputContainer)`
  ${phoneInputContainerStyles}
  ${reactInternalPhoneStyle}
`;

const StyledPhoneInput = styled(StyledInput)`
  ${phoneInputStyles}
`;
