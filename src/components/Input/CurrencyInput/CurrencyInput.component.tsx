import { useMemo } from "react";

import { currencySymbolIconMap } from "./CurrencyInput.data";
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
import { useInputId, useInputRef, useInputStyles } from "../Input.utils";
import styles from "./CurrencyInfo.module.scss";

import { Icon, type IconProps } from "@/components/Icon";
import {
  useCssClasses,
  useHtmlAttribute,
  useMergedProps,
  useTestId,
} from "@utils";

import type {
  CurrencyInputDefaultProps,
  CurrencyInputProps,
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
 * A number input tailored to handling monetary values
 *
 * Does some rudimentary simple input & output value formatting.
 *
 * @version 0.1.0
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
  const autoComplete = useHtmlAttribute(mergedProps.autoComplete);

  const iconProps = useMemo<IconProps>(
    () => ({
      name: currencySymbolIconMap[mergedProps.currency] ?? "CurrencyEuro",
    }),
    [mergedProps.currency]
  );

  const id = useInputId(mergedProps);
  const className = useCssClasses(styles["currency-input"], [
    styles["show-sign"],
    mergedProps.showSign,
  ]);

  return (
    <StyledInputContainer
      data-testid="input-currency-container"
      {...inputStyles}
    >
      <StyledInput
        className={className}
        data-testid={testId}
        type="text"
        lang="fr-FR"
        inputMode="decimal"
        pattern={validationPattern}
        autoComplete={autoComplete}
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
        id={id}
        {...inputStyles}
      />
      {mergedProps.showSign && (
        <StyledInputControl
          className={styles["currency-input-sign"]}
          data-testid={`${testId}-sign-control`}
          {...inputStyles}
          $anchor="left"
          onClick={toggleSign}
        >
          <Icon name={signIcon} />
        </StyledInputControl>
      )}
      <StyledInputControl {...inputStyles}>
        <Icon {...iconProps} />
      </StyledInputControl>
    </StyledInputContainer>
  );
};
CurrencyInput.__DEFAULT_PROPS = defaultCurrencyInputProps;

export { CurrencyInput };
