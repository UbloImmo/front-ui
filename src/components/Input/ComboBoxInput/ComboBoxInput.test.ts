import { expect } from "bun:test";

import { ComboBoxInput } from "./ComboBoxInput.component";

import { testComponentFactory } from "@/tests";

import type { ComboBoxInputProps } from "./ComboBoxInput.types";

const testInput = testComponentFactory<ComboBoxInputProps>(
  "ComboBoxInput",
  ComboBoxInput,
);

testInput({
  options: [{ value: "value", label: "Option A" }],
})("should render an option", async ({ findByText, findByTestId }) => {
  expect(await findByTestId("input-combobox")).not.toBeNull();
  expect(await findByText("Option A")).not.toBeNull();
});
