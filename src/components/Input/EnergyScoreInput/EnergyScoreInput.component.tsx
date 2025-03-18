import { isNumber } from "@ubloimmo/front-util";
import { useMemo } from "react";

import { EnergyLabel } from "../../EnergyLabel/EnergyLabel.component";
import { StyledInputContainer } from "../Input.common";
import {
  calculateEnergyTag,
  calculateClimateTag,
} from "./EnergyScoreInput.utils";
import { NumberInput } from "../NumberInput/NumberInput.component";

import { useTestId } from "@utils";

import type { EpcTagType } from "./EnergyScoreInput.utils";
import type { NumberInputProps } from "../NumberInput/NumberInput.types";
import type { TestIdProps } from "@types";

export interface EnergyScoreInputProps extends Omit<NumberInputProps, "type"> {
  type: "energy" | "climate";
  onLabelChange?: (label: EpcTagType | null) => void;
}

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
  const {
    value,
    type,
    onLabelChange,
    error = false,
    disabled = false,
    required = false,
    table = false,
    placeholder = "",
    ...numberInputProps
  } = props;
  const testId = useTestId("input-energy-score", { testId: props.testId });

  const calculatedTag: EpcTagType | undefined = useMemo(() => {
    if (!isNumber(value)) return undefined;
    return type === "energy"
      ? calculateEnergyTag(value)
      : calculateClimateTag(value);
  }, [value, type]);

  const handleChange = (newValue: number | null) => {
    if (props.onChange) {
      props.onChange(newValue);
    }
    if (onLabelChange) {
      onLabelChange(calculatedTag ?? null);
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
      style={{ display: "flex", gap: "1rem", alignItems: "center" }}
    >
      <NumberInput
        data-testid={testId}
        value={value}
        onChange={handleChange}
        min={0}
        max={999}
        step={1}
        error={error}
        disabled={disabled}
        required={required}
        table={table}
        placeholder={placeholder}
        {...numberInputProps}
      />
      <EnergyLabel type="DPE" value={calculatedTag ?? null} />
    </StyledInputContainer>
  );
};

export { EnergyScoreInput };
