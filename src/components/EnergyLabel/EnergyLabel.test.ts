import { expect } from "bun:test";

import { EnergyLabel } from "./EnergyLabel.component";
import { EnergyLabelProps } from "./EnergyLabel.types";

import { testComponentFactory } from "@/tests";

const testId = "energy-label";

const testEnergyLabel = testComponentFactory<EnergyLabelProps>(
  "EnergyLabel",
  EnergyLabel
);

testEnergyLabel({
  ...EnergyLabel.defaultProps,
})("should render with default props", ({ queryByTestId }) => {
  expect(queryByTestId(testId)).not.toBeNull();
  expect(queryByTestId("energy-label-value")?.textContent).toBe("-");
});

testEnergyLabel({
  ...EnergyLabel.defaultProps,
  type: "DPE",
  value: "A",
  state: "active",
})(
  "should render with DPE type, A value and active status",
  ({ queryByTestId }) => {
    expect(queryByTestId(testId)).not.toBeNull();
    expect(queryByTestId("energy-label-value")?.textContent).toBe("A");
  }
);

testEnergyLabel({
  ...EnergyLabel.defaultProps,
  type: "GES",
  value: "C",
  state: "inactive",
})(
  "should render with GES type, C value and inactive status",
  ({ queryByTestId }) => {
    expect(queryByTestId(testId)).not.toBeNull();
    expect(queryByTestId("energy-label-value")?.textContent).toBe("C");
  }
);

testEnergyLabel({
  ...EnergyLabel.defaultProps,
  type: "DPE",
  value: null,
})("should render with DPE type and no value", ({ queryByTestId }) => {
  expect(queryByTestId(testId)).not.toBeNull();
  expect(queryByTestId("energy-label-value")?.textContent).toBe("-");
});
