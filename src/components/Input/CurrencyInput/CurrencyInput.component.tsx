import { useMemo } from "react";
import styled from "styled-components";

import { currencySymbolIconMap } from "./CurrencyInput.data";
import { currencyInputStyles } from "./CurrencyInput.styles";
import {
  useCurrencyInput,
  useCurrencyInputValidationPattern,
} from "./CurrencyInput.utils";
import {
  StyledInput,
  StyledInputContainer,
  StyledInputControl,
  defaultCommonInputProps,
} from "../Input.common";
import { useInputRef, useInputStyles } from "../Input.utils";

import { Icon, type IconProps } from "@/components/Icon";
import { useHtmlAttribute, useMergedProps, useTestId } from "@utils";

import type {
  CurrencyInputDefaultProps,
  CurrencyInputProps,
  CurrencyInputStyleProps,
} from "./CurrencyInput.types";
import type { TestIdProps } from "@types";

const defaultCurrencyInputProps: CurrencyInputDefaultProps = {
  ...defaultCommonInputProps,
  value: null,
  onChange: null,
  name: null,
  min: 0,
  max: Infinity,
  currency: "euro",
  showSign: false,
  defaultSign: "+",
  placeholder: "0.00",
};

/**
 * A number input tailored to handeling monetary values
 *
 * Does some rudimentary monetary like number formatting.
 *
 * @version 0.0.2
 *
 * @param {CurrencyInputProps & TestIdProps} props - CurrencyInput component props
 * @returns {JSX.Element}
 */
const CurrencyInput = (
  props: CurrencyInputProps & TestIdProps
): JSX.Element => {
  const mergedProps = useMergedProps(defaultCurrencyInputProps, props);
  const testId = useTestId("input-currency", props);

  const { inputValue, onChange, signIcon, toggleSign } =
    useCurrencyInput(mergedProps);

  const validationPattern = useCurrencyInputValidationPattern(mergedProps);

  const inputStyles = useInputStyles(mergedProps);

  const { forwardRef } = useInputRef(mergedProps);

  const onBlur = useHtmlAttribute(mergedProps.onBlur);

  const iconProps = useMemo<IconProps>(
    () => ({
      name: currencySymbolIconMap[mergedProps.currency] ?? "CurrencyEuro",
    }),
    [mergedProps.currency]
  );

  return (
    <StyledInputContainer
      data-testid="input-currency-container"
      {...inputStyles}
    >
      <StyledCurrencyInput
        data-testid={testId}
        type="text"
        lang="fr-FR"
        inputMode="decimal"
        pattern={validationPattern}
        name={mergedProps.name ?? undefined}
        min={mergedProps.min ?? undefined}
        max={mergedProps.max ?? undefined}
        required={mergedProps.required}
        disabled={mergedProps.disabled}
        placeholder={mergedProps.placeholder}
        value={inputValue}
        onChange={onChange}
        onBlur={onBlur}
        ref={forwardRef}
        $showSign={mergedProps.showSign}
        {...inputStyles}
      />
      {mergedProps.showSign && (
        <SignControl {...inputStyles} $anchor="left" onClick={toggleSign}>
          <Icon name={signIcon} />
        </SignControl>
      )}
      <StyledInputControl {...inputStyles}>
        <Icon {...iconProps} />
      </StyledInputControl>
    </StyledInputContainer>
  );
};
CurrencyInput.defaultProps = defaultCurrencyInputProps;

export { CurrencyInput };

const SignControl = styled(StyledInputControl)`
  background: white;
  box-shadow: var(--shadow-card-default);
  border-radius: 50%;
`;

const StyledCurrencyInput = styled(StyledInput)<CurrencyInputStyleProps>`
  ${currencyInputStyles}
`;
