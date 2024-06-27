import { expect } from "bun:test";

import { ComboBoxButton } from "./ComboBoxButton.component";

import { testComponentFactory } from "@/tests";

const testComboBoxButton = testComponentFactory(
  "ComboBoxButton",
  ComboBoxButton
);

testComboBoxButton({ ...ComboBoxButton.defaultProps })(
  "should render",
  ({ queryByTestId }) => {
    expect(queryByTestId("combo-box-button")).not.toBeNull();
  }
);
