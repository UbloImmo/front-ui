import { isNumber } from "@ubloimmo/front-util";
import { useCallback, useMemo, type KeyboardEventHandler } from "react";

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
  useInputId,
} from "../Input.utils";
import { scaleNumber, transformNumber } from "./NumberInput.utils";

import { Icon } from "@/components/Icon";
import { clamp, useHtmlAttribute, useMergedProps, useTestId } from "@utils";

import type {
  DefaultNumberInputProps,
  NumberInputProps,
} from "./NumberInput.types";
import type { TestIdProps } from "@types";

const defaultNumberInputProps: DefaultNumberInputProps = {
  ...defaultCommonInputProps,
  value: null,
  onChange: null,
  min: -Infinity,
  max: Infinity,
  step: 1,
  name: null,
  scale: 0,
};

/**
 * Renders a number input component.
 *
 * @version 0.0.6
 *
 * @param {NumberInputProps} props - The props for the NumberInput component.
 * @return {JSX.Element} The rendered NumberInput component.
 */
const NumberInput = (props: NumberInputProps & TestIdProps): JSX.Element => {
  const mergedProps = useMergedProps(defaultNumberInputProps, props);

  const { inputRef, forwardRef } = useInputRef(mergedProps);

  const safeScale = useMemo(
    () => Math.max(mergedProps.scale, 0),
    [mergedProps.scale]
  );

  const value = useInputValue<"number">(
    scaleNumber(mergedProps.value, -safeScale),
    props
  );

  const testId = useTestId("input-number", props);

  /**
   * Handles the onChange event for the input.
   * @param {React.ChangeEvent<HTMLInputElement>} _ - The change event (unused).
   * @param {ValidityState} validity - The validity state of the input.
   * @returns {boolean} Whether the input is valid.
   */
  const onChange = useInputOnChange<"number">(
    (_, validity) => {
      return validity.valid;
    },
    /**
     * Transforms and clamps the input value.
     * @param {NativeInputValue} nativeValue - The raw input value.
     * @returns {Nullable<number>} The transformed and clamped value, or null if invalid.
     */
    (nativeValue) => {
      const parsed = transformNumber(nativeValue);
      if (!isNumber(parsed)) return null;
      const clamped = clamp(parsed, mergedProps.min, mergedProps.max);
      if (clamped !== parsed && inputRef.current) {
        inputRef.current.value = String(clamped);
      }
      return scaleNumber(clamped, safeScale);
    },
    mergedProps.onChange,
    mergedProps.onChangeNative
  );

  /**
   * Clamps the value and propagates the change.
   * @param {number} value - The value to clamp and propagate.
   */
  const clampAndPropagate = useCallback(
    (value: number) => {
      if (!inputRef.current) return;
      const clamped = clamp(value, mergedProps.min, mergedProps.max);

      const valueStr = String(clamped);
      if (inputRef.current) {
        inputRef.current.value = valueStr;
      }
      if (mergedProps.onChange)
        mergedProps.onChange(scaleNumber(value, safeScale));
    },
    [inputRef, mergedProps, safeScale]
  );

  /**
   * Increments the current value by the step amount.
   */
  const incrementValue = useCallback(() => {
    if (!inputRef.current || mergedProps.disabled) return;
    const currentValue = transformNumber(inputRef.current?.value ?? value) ?? 0;
    const incremented = Math.round(currentValue + mergedProps.step);
    clampAndPropagate(incremented);
  }, [
    inputRef,
    value,
    mergedProps.step,
    clampAndPropagate,
    mergedProps.disabled,
  ]);

  /**
   * Decrements the current value by the step amount.
   */
  const decrementValue = useCallback(() => {
    if (!inputRef.current || mergedProps.disabled) return;
    const currentValue = transformNumber(inputRef.current?.value ?? value) ?? 0;
    const decremented = Math.round(currentValue - mergedProps.step);
    clampAndPropagate(decremented);
  }, [
    inputRef,
    value,
    mergedProps.step,
    clampAndPropagate,
    mergedProps.disabled,
  ]);

  /**
   * Handles keyboard events for incrementing or decrementing the value.
   * @param {React.KeyboardEvent<HTMLInputElement>} e - The keyboard event.
   */
  const incrementOrDecrementOnArrow = useCallback<
    KeyboardEventHandler<HTMLInputElement>
  >(
    (e) => {
      if (e.key === "ArrowUp") {
        e.preventDefault();
        incrementValue();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        decrementValue();
      }
    },
    [incrementValue, decrementValue]
  );

  const inputStyles = useInputStyles(mergedProps);

  const controlLabels = useMemo(() => {
    return {
      increment: `Incrémenter de ${mergedProps.step}`,
      decrement: `Décrémenter de ${mergedProps.step} `,
    };
  }, [mergedProps.step]);

  const onBlur = useHtmlAttribute(mergedProps.onBlur);
  const autoComplete = useHtmlAttribute(mergedProps.autoComplete);
  const id = useInputId(mergedProps);

  const pattern = useMemo(() => {
    return `(-\\s?)?[0-9]+([\\.,][0-9]+)?`;
  }, []);

  return (
    <StyledInputContainer {...inputStyles} data-testid="input-number-container">
      <StyledNumberInput
        data-testid={testId}
        value={value}
        onChange={onChange}
        onKeyDown={incrementOrDecrementOnArrow}
        onBlur={onBlur}
        type="text"
        min={mergedProps.min ?? undefined}
        max={mergedProps.max ?? undefined}
        step={mergedProps.step}
        placeholder={mergedProps.placeholder}
        required={mergedProps.required}
        disabled={mergedProps.disabled}
        ref={forwardRef}
        autoComplete={autoComplete}
        pattern={pattern}
        inputMode="decimal"
        id={id}
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
