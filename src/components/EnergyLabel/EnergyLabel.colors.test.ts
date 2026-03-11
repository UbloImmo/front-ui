import { describe, expect, it } from "bun:test";

import {
  ENERGY_LABEL_BACKGROUND_COLORS,
  getEnergyLabelBackgroundColor,
} from "./EnergyLabel.colors";

describe("EnergyLabel colors", () => {
  it("exposes the DPE and GES palettes from a shared constant", () => {
    expect(ENERGY_LABEL_BACKGROUND_COLORS.DPE.A).toBe("#009c6d");
    expect(ENERGY_LABEL_BACKGROUND_COLORS.GES.G).toBe("#281b35");
  });

  it("returns the matching background color for a score", () => {
    expect(getEnergyLabelBackgroundColor("DPE", "F")).toBe("#eb8235");
    expect(getEnergyLabelBackgroundColor("GES", "C")).toBe("#7792b1");
  });

  it("returns null when no score is provided", () => {
    expect(getEnergyLabelBackgroundColor("DPE", null)).toBeNull();
  });
});
