import { expect } from "bun:test";

import { EnergyScoreComboBox } from "./EnergyScoreComboBox.component";
import { EnergyScoreComboBoxProps } from "./EnergyScoreComboBox.types";

import { testComponentFactory } from "@/tests";

const testId = "energy-score-combo-box";

const testEnergyScoreComboBox = testComponentFactory<EnergyScoreComboBoxProps>(
  "EnergyScoreComboBox",
  EnergyScoreComboBox
);

testEnergyScoreComboBox({
  ...EnergyScoreComboBox.__DEFAULT_PROPS,
})("should render with default props", ({ queryByTestId }) => {
  expect(queryByTestId(testId)).not.toBeNull();
});

testEnergyScoreComboBox({
  ...EnergyScoreComboBox.__DEFAULT_PROPS,
  type: "DPE",
  value: "A",
})("should render with DPE type and A value selected", ({ queryByTestId }) => {
  expect(queryByTestId(testId)).not.toBeNull();
});

testEnergyScoreComboBox({
  ...EnergyScoreComboBox.__DEFAULT_PROPS,
  type: "GES",
  value: "D",
})("should render with GES type and D value selected", ({ queryByTestId }) => {
  expect(queryByTestId(testId)).not.toBeNull();
});

testEnergyScoreComboBox({
  ...EnergyScoreComboBox.__DEFAULT_PROPS,
  type: "DPE",
  error: true,
})("should render in error state", ({ queryByTestId }) => {
  expect(queryByTestId(testId)).not.toBeNull();
});
