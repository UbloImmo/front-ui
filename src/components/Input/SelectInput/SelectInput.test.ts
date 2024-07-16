import { waitFor } from "@storybook/test";
import { describe, expect } from "bun:test";

import { SelectInput } from "./SelectInput.component";

import { testComponentFactory } from "@/tests";

const testId = "input-select";
const testSelectInput = testComponentFactory("SelectInput", SelectInput);

const options = [
  { label: "Option 1", value: "1" },
  { label: "Option 2", value: "2" },
  { label: "Option 3", value: "3", disabled: true },
];

describe("Input", () => {
  testSelectInput({})("should render", ({ queryByTestId }) =>
    expect(queryByTestId(testId)).not.toBeNull()
  );

  testSelectInput({ options: options, placeholder: "Select an option" })(
    "should render with provided props",
    ({ queryByTestId }) => expect(queryByTestId(testId)).not.toBeNull()
  );

  testSelectInput({ options: options, searchable: false })(
    "should show options dropdown on Click on input",
    async ({ queryByTestId }, { click }) => {
      const inputSelect = queryByTestId(
        `${testId}-button`
      ) as HTMLButtonElement;

      await click(inputSelect);

      expect(inputSelect).not.toBeNull();
      await waitFor(() => {
        const optionsDropdown = queryByTestId(`${testId}-options`);
        expect(optionsDropdown).not.toBeNull();
      });
      expect(inputSelect.getAttribute("aria-expanded")).toBe("true");
    }
  );

  testSelectInput({ options: options, searchable: true })(
    "should render and be typable when searchable",
    async ({ queryByTestId }, { click, keyboard }) => {
      const searchableInput = queryByTestId(
        `${testId}-query`
      ) as HTMLInputElement;

      expect(searchableInput).not.toBeNull();

      await click(searchableInput);
      await keyboard("test");
      expect(searchableInput.value).toBe("test");
    }
  );
});
