import {
  isNull,
  isNumber,
  isString,
  type Nullable,
} from "@ubloimmo/front-util";
import { useCallback, useMemo, useState } from "react";
import styled from "styled-components";

import { EnergyLabel } from "../../EnergyLabel/EnergyLabel.component";
import { defaultCommonInputProps, StyledInputContainer } from "../Input.common";
import { calculateEnergyScore } from "./EnergyScoreInput.utils";
import {
  useInputId,
  useInputOnChange,
  useInputRef,
  useInputStyles,
  useInputValue,
} from "../Input.utils";
import { StyledNumberInput } from "../NumberInput/NumberInput.styles";

import {
  EnergyLabelState,
  type EnergyLabelValue,
} from "@/components/EnergyLabel";
import {
  useTestId,
  useMergedProps,
  useHtmlAttribute,
  clamp,
  useLogger,
} from "@utils";

import type {
  DefaultEnergyScoreInputProps,
  EnergyScoreInputProps,
} from "./EnergyScoreInput.types";
import type { TestIdProps } from "@types";

const defaultEnergyScoreInputProps: DefaultEnergyScoreInputProps = {
  ...defaultCommonInputProps,
  value: null,
  onChange: null,
  name: null,
  min: 0,
  max: 999,
  scoreType: "DPE",
  onLabelChange: null,
  unit: null,
};

/**
 * Renders an energy score input component that combines a NumberInput with an EnergyLabel.
 * The component calculates DPE/Climate score based on numeric input.
 *
 * @version 0.0.1
 *
 * @param {EnergyScoreInputProps} props - The input props.
 * @return {JSX.Element} The rendered energy score input component.
 */
const EnergyScoreInput = (
  props: EnergyScoreInputProps & TestIdProps
): JSX.Element => {
  const { warn } = useLogger("EnergyScoreInput");
  const mergedProps = useMergedProps(defaultEnergyScoreInputProps, props);
  const { scoreType, disabled, onLabelChange } = mergedProps;
  const [currentTag, setCurrentTag] =
    useState<Nullable<EnergyLabelValue>>(null);

  const updateTag = useCallback(
    (sourceValue: Nullable<number>) => {
      const tag = calculateEnergyScore(sourceValue, scoreType);
      if (currentTag !== tag) {
        setCurrentTag(tag);
      }
      if (onLabelChange) {
        onLabelChange(tag);
      }
    },
    [onLabelChange, scoreType, currentTag]
  );

  const clampToMinMax = useCallback(
    (sourceValue: Nullable<number>) => {
      if (!isNumber(sourceValue)) return null;
      const clamped = clamp(sourceValue, mergedProps.min, mergedProps.max);
      const clampedStr = String(clamped);
      const sourceStr = String(sourceValue);
      if (sourceStr.length < clampedStr.length) return sourceValue;
      return clamped;
    },
    [mergedProps.min, mergedProps.max]
  );

  const onChange = useInputOnChange<"energy-score">(
    (nativeValue) => isString(nativeValue),
    (nativeValue) => {
      const parsedValue = isString(nativeValue)
        ? parseFloat(nativeValue)
        : null;
      if (isNull(parsedValue) || isNaN(parsedValue)) return null;
      return clampToMinMax(parsedValue);
    },
    (valueToPropagate) => {
      updateTag(valueToPropagate);
      mergedProps.onChange?.(valueToPropagate);
    },
    mergedProps.onChangeNative
  );

  const value = useInputValue<"energy-score">(
    mergedProps.value,
    props,
    (externalValue) => {
      updateTag(externalValue);
      return externalValue;
    }
  );
  const inputStyles = useInputStyles(mergedProps);
  const testId = useTestId("input-energy-score", props);
  const { forwardRef } = useInputRef(mergedProps);
  const onBlur = useHtmlAttribute(mergedProps.onBlur);
  const autoComplete = useHtmlAttribute(mergedProps.autoComplete);
  const id = useInputId(mergedProps);

  const energyLabelState = useMemo<EnergyLabelState>(() => {
    if (disabled || !currentTag) return "inactive";
    return "active";
  }, [disabled, currentTag]);

  if (!props.scoreType) {
    warn(
      `Missing required prop "scoreType" for EnergyScoreInput, defaulting to ${defaultEnergyScoreInputProps.scoreType}`
    );
  }

  return (
    <StyledContainer {...inputStyles}>
      <StyledNumberInput
        data-testid={testId}
        type="number"
        min={mergedProps.min}
        max={mergedProps.max}
        value={value}
        onChange={onChange}
        ref={forwardRef}
        onBlur={onBlur}
        name={mergedProps.name ?? undefined}
        disabled={mergedProps.disabled}
        placeholder={mergedProps.placeholder}
        required={mergedProps.required}
        {...inputStyles}
        id={id}
        autoComplete={autoComplete}
        step="1"
      />
      <EnergyLabel
        state={energyLabelState}
        type={scoreType}
        value={currentTag}
      />
    </StyledContainer>
  );
};

EnergyScoreInput.defaultProps = defaultEnergyScoreInputProps;

export { EnergyScoreInput };

const StyledContainer = styled(StyledInputContainer)`
  display: flex;
  flex-direction: row;
  flex: 1;
  align-items: center;
  justify-content: center;
  gap: var(--s-1);
`;
