import { expect } from "bun:test";

import { ComboBox } from "./ComboBox.component";

import { testComponentFactory } from "@/tests";

const testComboBox = testComponentFactory("ComboBox", ComboBox);

const options = [
  {
    label: "Option 1",
    value: "option-1",
  },
  {
    label: "Option 2",
    value: "option-2",
  },
  {
    label: "Option 3",
    value: "option-3",
    disabled: true,
  },
];

testComboBox({ ...ComboBox.defaultProps })(
  "should render",
  ({ queryByTestId }) => {
    expect(queryByTestId("combo-box")).not.toBeNull();
  }
);

testComboBox({ ...ComboBox.defaultProps, options })(
  "should render options",
  ({ queryByTestId }) => {
    expect(queryByTestId("combo-box")).not.toBeNull();
  }
);

testComboBox({ ...ComboBox.defaultProps, options, value: "option-2" })(
  "should render with initial selected option",
  ({ queryByTestId }) => {
    expect(queryByTestId("combo-box")).not.toBeNull();
  }
);
