import { isNumber } from "@ubloimmo/front-util";
import { useMemo, useState } from "react";

import { EnergyLabel } from "../../EnergyLabel/EnergyLabel.component";
import { defaultCommonInputProps, StyledInputContainer } from "../Input.common";
import {
  calculateEnergyTag,
  calculateClimateTag,
} from "./EnergyScoreInput.utils";
import { NumberInput } from "../NumberInput/NumberInput.component";

import { useTestId, useMergedProps } from "@utils";

import type {
  DefaultEnergyScoreInputProps,
  EnergyScoreInputProps,
} from "./EnergyScoreInput.types";
import type { EpcTagType } from "./EnergyScoreInput.utils";
import type { TestIdProps } from "@types";

const defaultEnergyScoreInputProps: DefaultEnergyScoreInputProps = {
  ...defaultCommonInputProps,
  value: null,
  onChange: null,
  name: null,
  min: 0,
  max: 999,
  type: "energy",
  onLabelChange: () => {},
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
  const mergedProps = useMergedProps(defaultEnergyScoreInputProps, props);
  const {
    value,
    type,
    error,
    disabled,
    required,
    table,
    placeholder,
    onChange,
    ...numberInputProps
  } = mergedProps;
  const { onLabelChange } = props;
  const testId = useTestId("input-energy-score", { testId: props.testId });
  const [currentTag, setCurrentTag] = useState<EpcTagType | null>(null);

  const calculatedTag: EpcTagType | undefined = useMemo(() => {
    if (!isNumber(value)) return undefined;
    return type === "energy"
      ? calculateEnergyTag(value)
      : calculateClimateTag(value);
  }, [value, type]);

  const handleChange = (newValue: number | null) => {
    if (onChange) {
      onChange(newValue);
    }
    if (onLabelChange) {
      const newTag = isNumber(newValue)
        ? type === "energy"
          ? calculateEnergyTag(newValue)
          : calculateClimateTag(newValue)
        : null;
      setCurrentTag(newTag);
      onLabelChange(newTag);
    }
  };

  return (
    <StyledInputContainer
      $error={error}
      $disabled={disabled}
      $required={required}
      $table={table}
      $placeholder={placeholder}
      data-testid="input-energy-score-container"
      style={{ display: "flex", gap: "0.25rem", alignItems: "center" }}
    >
      <NumberInput
        data-testid={testId}
        value={value}
        onChange={handleChange}
        error={error}
        disabled={disabled}
        required={required}
        table={table}
        placeholder={placeholder}
        {...numberInputProps}
      />
      <EnergyLabel type="DPE" value={currentTag ?? calculatedTag ?? null} />
    </StyledInputContainer>
  );
};

EnergyScoreInput.defaultProps = defaultEnergyScoreInputProps;

export { EnergyScoreInput };
