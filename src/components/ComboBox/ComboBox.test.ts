import { VoidFn } from "@ubloimmo/front-util";
import { expect, mock } from "bun:test";

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
  "should render with initial selected option (single selection)",
  ({ queryByTestId }) => {
    expect(queryByTestId("combo-box")).not.toBeNull();
  }
);

testComboBox({
  ...ComboBox.defaultProps,
  options,
  value: ["option-1", "option-2"],
})(
  "should render with initial selected option (multiple selection)",
  ({ queryByTestId }) => {
    expect(queryByTestId("combo-box")).not.toBeNull();
  }
);

const onChange = mock<VoidFn>(() => {});

testComboBox({ ...ComboBox.defaultProps, options, onChange })(
  "should select option on click",
  async ({ queryAllByTestId }, { click }) => {
    const comboBoxButton = await queryAllByTestId("combo-box-button");
    await click(comboBoxButton[0]);
    expect(onChange).toHaveBeenCalled();
    expect(onChange).toHaveBeenCalledWith(["option-1"]);
    onChange.mockReset();
  }
);

testComboBox({ ...ComboBox.defaultProps, options, onChange, multi: true })(
  "should select multiple options on click",
  async ({ queryAllByTestId }, { click }) => {
    const comboBoxButton = await queryAllByTestId("combo-box-button");
    await click(comboBoxButton[0]);
    expect(onChange).toHaveBeenCalled();
    expect(onChange).toHaveBeenCalledWith(["option-1"]);

    await click(comboBoxButton[1]);
    expect(onChange).toHaveBeenCalled();
    expect(onChange).toHaveBeenCalledWith(["option-1", "option-2"]);

    onChange.mockReset();
  }
);

testComboBox({
  ...ComboBox.defaultProps,
  options,
  value: ["option-1", "option-2"],
  onChange,
  multi: true,
})(
  "should deselect option on click on multiple selection",
  async ({ queryAllByTestId }, { click }) => {
    const comboBoxButton = await queryAllByTestId("combo-box-button");
    await click(comboBoxButton[0]);
    expect(onChange).toHaveBeenCalled();
    expect(onChange).toHaveBeenCalledWith(["option-2"]);

    await click(comboBoxButton[1]);
    expect(onChange).toHaveBeenCalled();
    expect(onChange).toHaveBeenCalledWith([]);
    onChange.mockReset();
  }
);

testComboBox({
  ...ComboBox.defaultProps,
  options,
  value: ["option-1"],
  onChange,
})(
  "should deselect option on click on single selection",
  async ({ queryAllByTestId }, { click }) => {
    const comboBoxButton = await queryAllByTestId("combo-box-button");

    await click(comboBoxButton[0]);
    expect(onChange).toHaveBeenCalled();
    expect(onChange).toHaveBeenCalledWith([]);
    onChange.mockReset();
  }
);

const onCreate = mock<VoidFn>(() => {});

testComboBox({
  ...ComboBox.defaultProps,
  options,
  creatable: true,
  onCreate,
})(
  "should have create button and call onCreate on click on single selection",
  async ({ queryByTestId }, { click }) => {
    const createButton = queryByTestId(
      "combo-box-create-button"
    ) as HTMLButtonElement;
    expect(createButton).not.toBeNull();

    await click(createButton);
    expect(onCreate).toHaveBeenCalled();
    onCreate.mockReset();
  }
);

testComboBox({
  ...ComboBox.defaultProps,
  options,
  creatable: true,
  multi: true,
  onCreate,
})(
  "should have create button and call onCreate on click on multiple selection",
  async ({ queryByTestId }, { click }) => {
    const createButton = queryByTestId(
      "combo-box-create-button"
    ) as HTMLButtonElement;
    expect(createButton).not.toBeNull();

    await click(createButton);
    expect(onCreate).toHaveBeenCalled();
    onCreate.mockReset();
  }
);

testComboBox({
  ...ComboBox.defaultProps,
  options,
  columns: 2,
})("should display options in columns", async ({ queryByTestId }) => {
  const grid = queryByTestId("grid combo-box");
  expect(grid).not.toBeNull();
});
