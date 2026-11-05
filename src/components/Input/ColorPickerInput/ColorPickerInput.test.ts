import { expect, mock } from "bun:test";

import { ColorPickerInput } from "./ColorPickerInput.component";

import { testComponentFactory } from "@/tests";

import type { ColorPickerInputProps } from "./ColorPickerInput.types";
import type { DecorativeColorKey } from "@types";
import type { Nullable } from "@ubloimmo/front-util";

const testId = "input-color-picker";
const testColorPickerInput = testComponentFactory<ColorPickerInputProps>(
  "ColorPickerInput",
  ColorPickerInput
);
const testColors: DecorativeColorKey[] = ["gray", "maya", "red"];

testColorPickerInput({
  value: "gray",
  colors: testColors,
})("should render a ColorPicker colors and value", ({ queryByTestId }) => {
  expect(queryByTestId(testId)).not.toBeNull();
});

const onChange = mock((_value: Nullable<DecorativeColorKey>) => {});

testColorPickerInput({
  value: "gray",
  colors: testColors,
  onChange,
})(
  "should trigger onChange",
  async ({ queryByTestId, queryAllByTestId }, { click }) => {
    expect(queryByTestId(testId)).not.toBeNull();
    expect(queryAllByTestId("color-picker-item")).not.toBeNull();

    await click(queryAllByTestId("color-picker-item")[1]);

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith("maya");
  }
);
