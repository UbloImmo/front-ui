import type { EnergyLabelType, EnergyLabelValue } from "./EnergyLabel.types";

export const ENERGY_LABEL_BACKGROUND_COLORS: Record<
  EnergyLabelType,
  Record<EnergyLabelValue, string>
> = {
  DPE: {
    A: "#009c6d",
    B: "#52b153",
    C: "#78bd76",
    D: "#e3d600",
    E: "#f0b50f",
    F: "#eb8235",
    G: "#d7221f",
  },
  GES: {
    A: "#a4dbf8",
    B: "#8cb4d3",
    C: "#7792b1",
    D: "#606f8f",
    E: "#4d5271",
    F: "#393551",
    G: "#281b35",
  },
};

export function getEnergyLabelBackgroundColor(
  type: EnergyLabelType,
  value?: EnergyLabelValue | null
): string | null {
  if (!value) return null;

  return ENERGY_LABEL_BACKGROUND_COLORS[type][value];
}
