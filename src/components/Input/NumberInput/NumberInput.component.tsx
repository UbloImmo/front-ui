import { isNumber, isString, type Nullable } from "@ubloimmo/front-util";
import { useCallback, useMemo } from "react";

import { StyledNumberInput } from "./NumberInput.styles";
import {
  StyledInputContainer,
  defaultCommonInputProps,
  StyledInputControlGroup,
  StyledInputGroupedControl,
} from "../Input.common";
import {
  useInputOnChange,
  useInputValue,
  useInputStyles,
  useInputRef,
} from "../Input.utils";

import { useHtmlAttribute, useMergedProps, useTestId } from "@utils";

import { Icon } from "@components";

import type {
  DefaultNumberInputProps,
  NumberInputProps,
} from "./NumberInput.types";
import type { NativeInputValue } from "../Input.types";
import type { TestIdProps } from "@types";

const defaultNumberInputProps: DefaultNumberInputProps = {
  ...defaultCommonInputProps,
  value: null,
  onChange: null,
  min: -Infinity,
  max: Infinity,
  step: 1,
  name: null,
};

const transformNumber = (nativeValue: NativeInputValue): Nullable<number> => {
  if (!isString(nativeValue) || nativeValue.length === 0) return null;
  return parseFloat(nativeValue);
};

/**
 * Renders a number input component.
 *
 * @version 0.0.4
 * @param {NumberInputProps} props - The props for the NumberInput component.
 * @return {JSX.Element} The rendered NumberInput component.
 */
const NumberInput = (props: NumberInputProps & TestIdProps): JSX.Element => {
  const mergedProps = useMergedProps(defaultNumberInputProps, props);

  const { inputRef, forwardRef } = useInputRef(mergedProps);

  const value = useInputValue(
    mergedProps.value,
    undefined,
    undefined,
    !!mergedProps.onChange || !mergedProps.value
  );

  const testId = useTestId("input-number", props);

  const onChange = useInputOnChange<"number">(
    (_) => true,
    transformNumber,
    mergedProps.onChange,
    mergedProps.onChangeNative
  );

  const clampAndPropagate = useCallback(
    (value: number) => {
      if (!inputRef.current) return;
      value = isNumber(mergedProps.max)
        ? Math.min(value, mergedProps.max)
        : value;
      value = isNumber(mergedProps.min)
        ? Math.max(value, mergedProps.min)
        : value;

      const valueStr = String(value);
      if (inputRef.current) {
        inputRef.current.value = valueStr;
      }
      if (mergedProps.onChange) mergedProps.onChange(value);
    },
    [inputRef, mergedProps]
  );

  const incrementValue = useCallback(() => {
    if (!inputRef.current || mergedProps.disabled) return;
    const currentValue = transformNumber(inputRef.current?.value ?? value) ?? 0;
    const incremented = currentValue + mergedProps.step;
    clampAndPropagate(incremented);
  }, [
    inputRef,
    value,
    mergedProps.step,
    clampAndPropagate,
    mergedProps.disabled,
  ]);

  const decrementValue = useCallback(() => {
    if (!inputRef.current || mergedProps.disabled) return;
    const currentValue = transformNumber(inputRef.current?.value ?? value) ?? 0;
    const decremented = currentValue - mergedProps.step;
    clampAndPropagate(decremented);
  }, [
    inputRef,
    value,
    mergedProps.step,
    clampAndPropagate,
    mergedProps.disabled,
  ]);

  const inputStyles = useInputStyles(mergedProps);

  const controlLabels = useMemo(() => {
    return {
      increment: `Incrémenter de ${mergedProps.step}`,
      decrement: `Décrémenter de ${mergedProps.step} `,
    };
  }, [mergedProps.step]);

  const onBlur = useHtmlAttribute(mergedProps.onBlur);

  return (
    <StyledInputContainer {...inputStyles} data-testid="input-number-container">
      <StyledNumberInput
        data-testid={testId}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        type="number"
        min={mergedProps.min ?? undefined}
        max={mergedProps.max ?? undefined}
        step={mergedProps.step}
        placeholder={mergedProps.placeholder}
        required={mergedProps.required}
        disabled={mergedProps.disabled}
        ref={forwardRef}
        {...inputStyles}
      />
      <StyledInputControlGroup>
        <StyledInputGroupedControl
          {...inputStyles}
          onClick={incrementValue}
          data-testid="input-control-increment"
          aria-label={controlLabels.increment}
          title={controlLabels.increment}
          role="button"
          aria-disabled={mergedProps.disabled}
          aria-roledescription="Bouton d'augmentation, permet d'augmenter la valeur"
        >
          <Icon name="ChevronUp" size="s-3" />
        </StyledInputGroupedControl>
        <StyledInputGroupedControl
          {...inputStyles}
          onClick={decrementValue}
          data-testid="input-control-decrement"
          aria-disabled={mergedProps.disabled}
          aria-label={controlLabels.decrement}
          title={controlLabels.decrement}
          role="button"
          aria-roledescription="Bouton de diminution, permet de diminuter la valeur"
        >
          <Icon name="ChevronDown" size="s-3" />
        </StyledInputGroupedControl>
      </StyledInputControlGroup>
    </StyledInputContainer>
  );
};

NumberInput.defaultProps = defaultNumberInputProps;

export { NumberInput };
