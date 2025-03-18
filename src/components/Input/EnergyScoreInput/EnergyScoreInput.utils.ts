export type EpcTagType = "A" | "B" | "C" | "D" | "E" | "F" | "G";

/**
 * Calculates the energy performance tag based on the consumption value
 * Using current French DPE rules
 */
export const calculateEnergyTag = (value: number): EpcTagType => {
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
 */
export const calculateClimateTag = (value: number): EpcTagType => {
  if (value < 6) return "A";
  if (value < 11) return "B";
  if (value < 30) return "C";
  if (value < 50) return "D";
  if (value < 70) return "E";
  if (value < 100) return "F";
  return "G";
};
