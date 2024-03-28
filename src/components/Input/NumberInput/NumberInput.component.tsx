import { isNumber, isString, type Nullable } from "@ubloimmo/front-util";
import { useCallback, useMemo, useRef } from "react";

import { StyledNumberInput } from "./NumberInput.styles";
import {
  useInputOnChange,
  useInputValue,
  useInputStyles,
  type NativeInputValue,
} from "..";
import {
  StyledInputContainer,
  defaultCommonInputProps,
  StyledInputControlGroup,
  StyledInputGroupedControl,
} from "../Input.common";

import { useMergedProps } from "@utils";

import { Icon } from "@components";

import type {
  DefaultNumberInputProps,
  NumberInputProps,
} from "./NumberInput.types";

const defaultNumberInputProps: DefaultNumberInputProps = {
  ...defaultCommonInputProps,
  value: null,
  onChange: null,
  min: null,
  max: null,
  step: 1,
};

const transformNumber = (nativeValue: NativeInputValue): Nullable<number> => {
  if (!isString(nativeValue) || nativeValue.length === 0) return null;
  return parseFloat(nativeValue);
};

const NumberInput = (props: NumberInputProps): JSX.Element => {
  const mergedProps = useMergedProps(defaultNumberInputProps, props);

  const inputRef = useRef<Nullable<HTMLInputElement>>(null);

  const value = useInputValue(mergedProps.value);

  const onChange = useInputOnChange<"number">(
    (_) => true,
    transformNumber,
    mergedProps.onChange
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
    [mergedProps]
  );

  const incrementValue = useCallback(() => {
    if (!inputRef.current) return;
    const currentValue = transformNumber(inputRef.current?.value ?? value) ?? 0;
    const incremented = currentValue + mergedProps.step;
    clampAndPropagate(incremented);
  }, [mergedProps, value, clampAndPropagate]);

  const decrementValue = useCallback(() => {
    if (!inputRef.current) return;
    const currentValue = transformNumber(inputRef.current?.value ?? value) ?? 0;
    const decremented = currentValue - mergedProps.step;
    clampAndPropagate(decremented);
  }, [mergedProps, value, clampAndPropagate]);

  const inputStyles = useInputStyles(mergedProps);

  const controlLabels = useMemo(() => {
    return {
      increment: `Incrémenter de ${mergedProps.step}`,
      decrement: `Décrémenter de ${mergedProps.step} `,
    };
  }, [mergedProps.step]);

  return (
    <StyledInputContainer {...inputStyles}>
      <StyledNumberInput
        data-testid="input-number"
        value={value}
        onChange={onChange}
        type="number"
        min={mergedProps.min ?? undefined}
        max={mergedProps.max ?? undefined}
        step={mergedProps.step}
        placeholder={mergedProps.placeholder}
        required={mergedProps.required}
        disabled={mergedProps.disabled}
        ref={inputRef}
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
          aria-roledescription="Bouton d'augmentation, permet d'augmenter la valeur"
        >
          <Icon name="ChevronUp" size="s-3" />
        </StyledInputGroupedControl>
        <StyledInputGroupedControl
          {...inputStyles}
          onClick={decrementValue}
          data-testid="input-control-decrement"
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
