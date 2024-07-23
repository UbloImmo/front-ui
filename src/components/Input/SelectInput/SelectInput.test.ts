import { waitFor } from "@storybook/test";
import { describe, expect, mock } from "bun:test";

import { SelectInput } from "./SelectInput.component";

import { testComponentFactory } from "@/tests";

const testId = "input-select";
const testSelectInput = testComponentFactory("SelectInput", SelectInput);

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
  testSelectInput({})("should render", ({ queryByTestId }) =>
    expect(queryByTestId(testId)).not.toBeNull()
  );

  testSelectInput({ options: options, placeholder: "Select an option" })(
    "should render single options",
    ({ queryByTestId }) => expect(queryByTestId(testId)).not.toBeNull()
  );

  testSelectInput({ options: groupOptions, placeholder: "Select an option" })(
    "should render group options ",
    ({ queryByTestId }) => expect(queryByTestId(testId)).not.toBeNull()
  );

  testSelectInput({ options: options, searchable: false })(
    "should show dropdown with single options on Click on the select",
    async ({ queryByTestId }, { click }) => {
      const inputSelect = queryByTestId(
        `${testId}-button`
      ) as HTMLButtonElement;

      await click(inputSelect);

      expect(inputSelect).not.toBeNull();

      const optionsDropdown = queryByTestId(`${testId}-options`);
      expect(optionsDropdown).not.toBeNull();

      expect(inputSelect.getAttribute("aria-expanded")).toBe("true");
    }
  );

  testSelectInput({ options: groupOptions, searchable: false })(
    "should show dropdown with group options on Click on the select",
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

  testSelectInput({ options: options, searchable: false })(
    "should close options dropdown on Click anywhere",
    async ({ queryByTestId }, { click }) => {
      const inputSelect = queryByTestId(
        `${testId}-button`
      ) as HTMLButtonElement;

      await click(inputSelect);
      expect(inputSelect.getAttribute("aria-expanded")).toBe("true");
      expect(inputSelect).not.toBeNull();

      const optionsDropdown = queryByTestId(`${testId}-options`);
      expect(optionsDropdown).not.toBeNull();

      await click(document.body);
      expect(inputSelect.getAttribute("aria-expanded")).toBe("false");
    }
  );

  testSelectInput({
    options: options,
  })(
    "should select an option and show the selected value in the select",
    async ({ queryByTestId }, { click }) => {
      const inputSelect = queryByTestId(
        `${testId}-button`
      ) as HTMLButtonElement;

      await click(inputSelect);

      const optionsDropdown = queryByTestId(`${testId}-options`);
      const optionsList = optionsDropdown?.querySelectorAll(
        "[data-testid='input-select-option']"
      );
      expect(optionsDropdown).not.toBeNull();
      expect(optionsList?.length).toBe(3);

      await click(optionsList?.[0] as HTMLDivElement);

      expect(inputSelect.getAttribute("aria-expanded")).toBe("false");
      expect(inputSelect?.textContent).toBe("Option 1");
    }
  );

  const onChange = mock(() => {});

  testSelectInput({
    options: options,
    onChange,
  })(
    "should trigger onChange with param when an option is selected",
    async ({ queryByTestId }, { click }) => {
      const inputSelect = queryByTestId(
        `${testId}-button`
      ) as HTMLButtonElement;

      await click(inputSelect);

      const optionsDropdown = queryByTestId(`${testId}-options`);
      const optionsList = optionsDropdown?.querySelectorAll(
        "[data-testid='input-select-option']"
      );
      expect(optionsDropdown).not.toBeNull();
      expect(optionsList?.length).toBe(3);

      await click(optionsList?.[0] as HTMLDivElement);

      expect(inputSelect.getAttribute("aria-expanded")).toBe("false");
      expect(inputSelect?.textContent).toBe("Option 1");

      expect(onChange).toHaveBeenCalled();
      expect(onChange).toHaveBeenCalledWith("1");
    }
  );

  testSelectInput({ options: options, searchable: true })(
    "should render and be typable when searchable property is true",
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
