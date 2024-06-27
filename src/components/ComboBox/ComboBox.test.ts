import { expect } from "bun:test";

import { ComboBox } from "./ComboBox.component";

import { testComponentFactory } from "@/tests";

const testComboBox = testComponentFactory("ComboBox", ComboBox);

testComboBox({ ...ComboBox.defaultProps })(
  "should render",
  ({ queryByTestId }) => {
    expect(queryByTestId("combo-box")).not.toBeNull();
  }
);
