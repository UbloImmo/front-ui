import { describe, expect } from "bun:test";

import { MultiSelectInput } from "./MultiSelectInput.component";

import { testComponentFactory } from "@/tests";

const testId = "input-multi-select";
const testMultiSelectInput = testComponentFactory(
  "MultiSelectInput",
  MultiSelectInput
);

const options = [
  { label: "Option 1", value: "1" },
  { label: "Option 2", value: "2" },
  { label: "Option 3", value: "3", disabled: true },
];

const groupOptions = [
  {
    label: "Group 1",
    options: [
      { label: "Option 1", value: "1" },
      { label: "Option 2", value: "2" },
      { label: "Option 3", value: "3", disabled: true },
    ],
  },
];

describe("Input", () => {
  testMultiSelectInput({})("should render", ({ queryByTestId }) =>
    expect(queryByTestId(testId)).not.toBeNull()
  );

  testMultiSelectInput({ options: options, placeholder: "Select an option" })(
    "should render single options",
    ({ queryByTestId }) => expect(queryByTestId(testId)).not.toBeNull()
  );

  testMultiSelectInput({
    options: groupOptions,
    placeholder: "Select an option",
  })("should render group options ", ({ queryByTestId }) =>
    expect(queryByTestId(testId)).not.toBeNull()
  );

  testMultiSelectInput({ options: options })(
    "should show dropdown with single options on Click on the select",
    async ({ queryByTestId }, { click }) => {
      const inputSelect = queryByTestId(
        `${testId}-element`
      ) as HTMLButtonElement;

      await click(inputSelect);

      expect(inputSelect).not.toBeNull();

      const optionsDropdown = queryByTestId(`${testId}-options`);
      expect(optionsDropdown).not.toBeNull();

      expect(inputSelect.getAttribute("aria-expanded")).toBe("true");
    }
  );
});
