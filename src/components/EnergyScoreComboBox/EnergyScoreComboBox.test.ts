import { expect, mock } from "bun:test";

import { EnergyScoreComboBox } from "./EnergyScoreComboBox.component";
import styles from "./EnergyScoreComboBox.module.scss";
import { EnergyScoreComboBoxProps } from "./EnergyScoreComboBox.types";

import { testComponentFactory } from "@/tests";

const testId = "energy-score-combo-box";

const testEnergyScoreComboBox = testComponentFactory<EnergyScoreComboBoxProps>(
  "EnergyScoreComboBox",
  EnergyScoreComboBox
);

testEnergyScoreComboBox({
  ...EnergyScoreComboBox.__DEFAULT_PROPS,
})(
  "should render 7 selectable options by default",
  ({ queryByTestId, queryAllByRole }) => {
    expect(queryByTestId(testId)).not.toBeNull();
    expect(queryAllByRole("button")).toHaveLength(7);
  }
);

testEnergyScoreComboBox({
  ...EnergyScoreComboBox.__DEFAULT_PROPS,
  type: "DPE",
  value: "A",
  onChange: mock((_value) => {}),
})(
  "should call onChange with the selected value when an option is clicked",
  async ({ getByRole }, { click }, { onChange }) => {
    await click(getByRole("button", { name: "DPE C" }));
    expect(onChange).toHaveBeenCalledWith("C");
  }
);

testEnergyScoreComboBox({
  ...EnergyScoreComboBox.__DEFAULT_PROPS,
  type: "GES",
  value: "D",
  readOnly: true,
})(
  "should render only the selected badge in read-only mode",
  ({ queryAllByRole, getByLabelText, queryByText }) => {
    expect(queryAllByRole("button")).toHaveLength(0);
    expect(getByLabelText("GES D")).not.toBeNull();
    expect(queryByText("A")).toBeNull();
    expect(queryByText("B")).toBeNull();
    expect(queryByText("C")).toBeNull();
    expect(queryByText("E")).toBeNull();
    expect(queryByText("F")).toBeNull();
    expect(queryByText("G")).toBeNull();
  }
);

testEnergyScoreComboBox({
  ...EnergyScoreComboBox.__DEFAULT_PROPS,
  type: "DPE",
  value: null,
  readOnly: true,
})(
  "should render the empty state in read-only mode when no value is selected",
  ({ queryAllByRole, getByText }) => {
    expect(queryAllByRole("button")).toHaveLength(0);
    expect(getByText("-")).not.toBeNull();
  }
);

testEnergyScoreComboBox({
  ...EnergyScoreComboBox.__DEFAULT_PROPS,
  type: "DPE",
  error: true,
})("should apply the error class to the container", ({ getByTestId }) => {
  expect(getByTestId(testId)).toHaveClass(styles.error);
});
