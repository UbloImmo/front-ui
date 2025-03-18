import { isNullish, type Nullable, type Nullish } from "@ubloimmo/front-util";

import type {
  EnergyLabelType,
  EnergyLabelValue,
} from "@/components/EnergyLabel";

/**
 * Calculates the energy performance tag based on the consumption value
 * Using current French DPE rules
 *
 * @param {number} value - The consumption value to calculate the tag for
 * @returns {EnergyLabelValue} The calculated tag
 */
export const calculateEnergyTag = (value: number): EnergyLabelValue => {
  if (value < 70) return "A";
  if (value < 110) return "B";
  if (value < 180) return "C";
  if (value < 250) return "D";
  if (value < 330) return "E";
  if (value < 420) return "F";
  return "G";
};

/**
 * Calculates the climate impact tag based on the emissions value
 * Using current French DPE rules
 *
 * @param {number} value - The emissions value to calculate the tag for
 * @returns {EnergyLabelValue} The calculated tag
 */
export const calculateClimateTag = (value: number): EnergyLabelValue => {
  if (value < 6) return "A";
  if (value < 11) return "B";
  if (value < 30) return "C";
  if (value < 50) return "D";
  if (value < 70) return "E";
  if (value < 100) return "F";
  return "G";
};

export const calculateEnergyScore = (
  value: Nullable<number>,
  type: Nullish<EnergyLabelType>
): Nullable<EnergyLabelValue> => {
  if (isNullish(value) || isNullish(type)) return null;
  return type === "DPE"
    ? calculateEnergyTag(value)
    : calculateClimateTag(value);
};
