import { expect } from "bun:test";

import { IconPickerInput } from "./IconPickerInput.component";
import { IconPickerInputProps } from "./IconPickerInput.types";

import { testComponentFactory } from "@/tests";

const testInput = testComponentFactory<IconPickerInputProps>(
  "IconPickerInput",
  IconPickerInput
);

testInput({ value: "Square", icons: ["Square", "Circle", "Triangle"] })(
  "should render an IconPicker icons and value",
  async ({ findByTestId }) => {
    expect(await findByTestId("input-icon-picker")).not.toBeNull();
  }
);
