import { Nullable } from "@ubloimmo/front-util";
import { useRef, useMemo, useCallback, ChangeEventHandler } from "react";
import {
  CountrySelector,
  ParsedCountry,
  usePhoneInput,
} from "react-international-phone";
import "react-international-phone/style.css";
import styled from "styled-components";

import { countryList, defaultToFrenchPhone } from "./PhoneInput.utils";
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
 * Renders a international phone input component. Does international phone formatting on the input value.
 *
 * @version 0.0.1
 * @param {InputProps<"phone">} props - The input props.
 * @return {JSX.Element} The rendered text input component.
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
        event.target.value = "+33";
      }
      handlePhoneValueChange(event);
      prevPhone.current = event.target.value;
    },
    [handlePhoneValueChange]
  );

  const changeCountryOnSelect = useCallback(
    (country: ParsedCountry) => {
      setCountry(country.iso2);
    },
    [setCountry]
  );

  const inputStyles = useInputStyles(mergedProps);

  return (
    <StyledInputContainer {...inputStyles}>
      <StyledCountrySelector
        selectedCountry={country.iso2}
        onSelect={changeCountryOnSelect}
        countries={countryList}
        buttonStyle={{ border: "none", background: "transparent" }}
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
      />
    </StyledInputContainer>
  );
};

PhoneInput.defaultProps = defaultPhoneInputProps;
export { PhoneInput };

const StyledCountrySelector = styled(CountrySelector)`
  position: static;
  pointer-events: all;
  height: 100%;

  button {
    height: 100%;
    padding-left: var(--s-1);
    position: absolute;
    z-index: 1;
  }

  .dropdown-container {
    border-radius: 0 0 var(--s-2) var(--s-2);
    box-shadow: var(--shadow-card-elevation-low);
    background-color: white;
    top: var(--s-7);
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
    padding: var(--s-2);
    border-bottom: 1px solid var(--gray-50);
    color: var(--gray-800);

    &[aria-selected="true"] {
      background-color: var(--primary-light);
    }

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
