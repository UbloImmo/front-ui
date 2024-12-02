import { expect, mock } from "bun:test";

import { IconPickerInput } from "./IconPickerInput.component";
import { IconPickerInputProps } from "./IconPickerInput.types";

import { testComponentFactory } from "@/tests";

import type { IconName } from "@/components/Icon";
import type { Nullable } from "@ubloimmo/front-util";

const testId = "input-icon-picker";
const testIconPickerInput = testComponentFactory<IconPickerInputProps>(
  "IconPickerInput",
  IconPickerInput
);
const testIcons: IconName[] = ["Square", "Circle", "Triangle"];

testIconPickerInput({
  value: "Square",
  icons: testIcons,
})("should render an IconPicker icons and value", ({ queryByTestId }) => {
  expect(queryByTestId(testId)).not.toBeNull();
});

const onChange = mock((_value: Nullable<IconName>) => {});

testIconPickerInput({
  value: "Square",
  icons: testIcons,
  onChange,
})(
  "should trigger onChange",
  async ({ queryByTestId, queryAllByTestId }, { click }) => {
    expect(queryByTestId(testId)).not.toBeNull();
    expect(queryAllByTestId("icon-picker-item")).not.toBeNull();

    await click(queryAllByTestId("icon-picker-item")[1]);

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith("Circle");
  }
);
