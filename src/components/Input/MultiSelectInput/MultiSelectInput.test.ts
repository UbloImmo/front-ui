import { describe, expect, mock } from "bun:test";

import { MultiSelectInput } from "./MultiSelectInput.component";
import { useMultiSelectValue } from "./MultiSelectInput.utils";

import { testComponentFactory, testHookFactory } from "@/tests";

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
    options: options,
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
  })("should render group options ", async ({ queryByTestId }, { click }) => {
    expect(queryByTestId(testId)).not.toBeNull();
    const inputSelect = queryByTestId(`${testId}-element`) as HTMLButtonElement;

    await click(inputSelect);

    expect(inputSelect.getAttribute("aria-expanded")).toBe("true");
    expect(queryByTestId("input-select-option-group-label")).not.toBeNull();
  });

  testMultiSelectInput({
    options: options,
  })(
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

  testMultiSelectInput({
    options: options,
  })(
    "should close dropdown on click outside",
    async ({ queryByTestId }, { click }) => {
      const inputSelect = queryByTestId(
        `${testId}-element`
      ) as HTMLButtonElement;

      await click(inputSelect);
      expect(inputSelect.getAttribute("aria-expanded")).toBe("true");
      await click(document.body);
      expect(queryByTestId(`${testId}-options`)).toBeNull();
      expect(inputSelect.getAttribute("aria-expanded")).toBe("false");
    }
  );

  testMultiSelectInput({
    options: options,
  })(
    "should not select and close on disabled option click",
    async ({ queryByTestId, queryAllByTestId }, { click }) => {
      const inputSelect = queryByTestId(
        `${testId}-element`
      ) as HTMLButtonElement;

      await click(inputSelect);

      await click(
        queryAllByTestId(`input-select-option`)?.[2] as HTMLDivElement
      );

      expect(inputSelect.getAttribute("aria-expanded")).toBe("true");
    }
  );
});

const onChange = mock(() => {});

testMultiSelectInput({
  options: options,
  onChange,
})(
  "should select an option on click",
  async ({ queryByTestId, queryAllByTestId }, { click }) => {
    const inputSelect = queryByTestId(`${testId}-element`) as HTMLButtonElement;

    await click(inputSelect);

    expect(inputSelect.getAttribute("aria-expanded")).toBe("true");

    await click(queryAllByTestId(`input-select-option`)?.[1] as HTMLDivElement);

    expect(inputSelect.getAttribute("aria-expanded")).toBe("false");
    expect(inputSelect.textContent).toBe("Option 2");
    expect(onChange).toHaveBeenCalledWith(["2"]);
    onChange.mockReset();
  }
);

testMultiSelectInput({
  options: options,
  onChange,
})(
  "should select multiple options",
  async ({ queryByTestId, queryAllByTestId }, { click }) => {
    const inputSelect = queryByTestId(`${testId}-element`) as HTMLButtonElement;

    expect(inputSelect.textContent).toBe("");
    await click(inputSelect);
    await click(queryAllByTestId(`input-select-option`)?.[0] as HTMLDivElement);
    await click(inputSelect);

    await click(queryAllByTestId(`input-select-option`)?.[1] as HTMLDivElement);

    expect(inputSelect.textContent).toContain("Option 1");
    expect(inputSelect.textContent).toContain("Option 2");
    expect(onChange).toHaveBeenCalledWith(["1", "2"]);
    onChange.mockReset();
  }
);

testMultiSelectInput({
  options: options,
  value: ["1", "2"],
  onChange,
})(
  "should unselect option",
  async ({ queryByTestId, queryAllByTestId }, { click }) => {
    const inputSelect = queryByTestId(`${testId}-element`) as HTMLButtonElement;

    expect(inputSelect.textContent).toContain("Option 1");
    expect(inputSelect.textContent).toContain("Option 2");

    const clearButton = queryAllByTestId(
      "chip-button"
    )?.[0] as HTMLButtonElement;
    await click(clearButton);

    expect(inputSelect.textContent).not.toContain("Option 1");
    expect(inputSelect.textContent).toBe("Option 2");
    expect(onChange).toHaveBeenCalledWith(["2"]);
    onChange.mockReset();
  }
);

const testUseMultiSelectValue = () => {
  type Hook = typeof useMultiSelectValue;
  const testHook = testHookFactory<Parameters<Hook>, ReturnType<Hook>, Hook>(
    "useMultiSelectValue",
    useMultiSelectValue
  );

  testHook(
    {
      ...MultiSelectInput.defaultProps,
      onChange,
    },
    [],
    []
  )("should handle null options", (result) => {
    expect(result.internalValue.size).toBe(0);

    result.selectOption(null);
    expect(result.internalValue.size).toBe(0);
  });
};

describe("useMultiSelectValue", () => {
  testUseMultiSelectValue();
});
