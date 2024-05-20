import { Nullable, isNull } from "@ubloimmo/front-util";
import { useRef, useMemo, useCallback, ChangeEventHandler } from "react";
import {
  CountrySelector,
  ParsedCountry,
  defaultCountries,
  usePhoneInput,
} from "react-international-phone";
import "react-international-phone/style.css";
import styled from "styled-components";

import { FRENCH_PHONE_PREFIX, defaultToFrenchPhone } from "./PhoneInput.utils";
import {
  StyledInput,
  StyledInputContainer,
  defaultCommonInputProps,
} from "../Input.common";
import { DefaultInputProps, InputProps } from "../Input.types";
import { useInputStyles } from "../Input.utils";

import { useMergedProps, useTestId } from "@utils";

const defaultPhoneInputProps: DefaultInputProps<"phone"> = {
  ...defaultCommonInputProps,
  value: null,
  onChange: null,
};

/**
 * Renders a international phone input component.
 * Does international phone formatting on the input value.
 *
 * @version 0.0.1
 * @param {InputProps<"phone">} props - The input props.
 * @return {JSX.Element} The rendered phone input component.
 */
const PhoneInput = (props: InputProps<"phone">): JSX.Element => {
  const mergedProps = useMergedProps(defaultPhoneInputProps, props);
  const testId = useTestId("input-phone", props);

  const inputRef = useRef<Nullable<HTMLInputElement>>(null);

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
    });

  const interceptOnChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (event) => {
      if (prevPhone.current === "" && event.target.value === "0") {
        event.target.value = FRENCH_PHONE_PREFIX;
      }
      handlePhoneValueChange(event);
      prevPhone.current = event.target.value;
    },
    [handlePhoneValueChange]
  );

  const changeCountryOnSelect = useCallback(
    (country: ParsedCountry) => {
      setCountry(country.iso2);
      if (!isNull(inputRef.current)) {
        inputRef.current.focus();
      }
    },
    [setCountry]
  );

  const inputStyles = useInputStyles(mergedProps);

  return (
    <StyledInputContainer {...inputStyles} data-testid="input-phone-container">
      <StyledCountrySelector
        selectedCountry={country.iso2}
        onSelect={changeCountryOnSelect}
        countries={defaultCountries}
        disabled={mergedProps.disabled}
        data-testid="input-phone-control"
        dropdownStyleProps={{
          className: "dropdown-container",
          listItemClassName: "list-item",
          listItemDialCodeClassName: "dial-code",
        }}
      />
      <StyledPhoneInput
        data-testid={testId}
        {...inputStyles}
        ref={inputRef}
        value={inputValue}
        onChange={interceptOnChange}
        disabled={mergedProps.disabled}
      />
    </StyledInputContainer>
  );
};

PhoneInput.defaultProps = defaultPhoneInputProps;
export { PhoneInput };

const StyledCountrySelector = styled(CountrySelector)`
  --react-international-phone-country-selector-arrow-color: var(
    --control-color
  );
  --react-international-phone-country-selector-arrow-size: calc(
    var(--s-1) * 1.5
  );

  position: static;
  pointer-events: all;
  height: 100%;

  button {
    height: 100%;
    padding-left: var(--s-1);
    position: absolute;
    z-index: 1;
    border: none;
    background-color: transparent;

    &:hover {
      background-color: transparent;
    }
  }

  .dropdown-container {
    --react-international-phone-dropdown-shadow: var(
      --shadow-card-elevation-low
    );
    --react-international-phone-dropdown-top: var(--s-7);

    border-radius: 0 0 var(--s-2) var(--s-2);
    max-height: 120px;
    z-index: unset;
    width: 100%;
    padding-top: var(--s-1);

    &:focus-visible {
      outline: none;
    }
  }

  ::-webkit-scrollbar {
    display: none;
  }

  .list-item {
    --react-international-phone-selected-dropdown-item-background-color: var(
      --primary-light
    );

    padding: var(--s-2);
    border-bottom: 1px solid var(--gray-50);
    color: var(--gray-800);
    height: auto;

    &:hover {
      background-color: var(--gray-50);
    }
  }

  .dial-code {
    color: var(--gray-500);
  }
`;

const StyledPhoneInput = styled(StyledInput)`
  padding-left: var(--s-14);
  position: relative;
`;
