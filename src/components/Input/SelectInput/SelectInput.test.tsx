import { waitFor } from "@storybook/test";
import { describe, expect, mock } from "bun:test";

import { SelectInput } from "./SelectInput.component";

import { Badge } from "@/components/Badge";
import { Text } from "@/components/Text";
import { testComponentFactory } from "@/tests";
import { FlexLayout } from "@layouts";

import type { Nullable, NullishPrimitives } from "@ubloimmo/front-util";

const testId = "input-select";
const testSelectInput = testComponentFactory("SelectInput", SelectInput);

const options = [
  { label: "Apple", value: "1" },
  { label: "Banana", value: "2" },
  { label: "Cherry", value: "3", disabled: true },
];

const groupOptions = [
  {
    label: "Group 1",
    options: options,
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

  testSelectInput({
    options: options,
    Option: (option) => (
      <FlexLayout>
        <Text>{option.label}</Text>
        <Badge label={option.label} />
      </FlexLayout>
    ),
  })(
    "should render options in custom component",
    async ({ queryByTestId, queryAllByTestId }, { click }) => {
      const inputSelect = queryByTestId(
        `${testId}-button`
      ) as HTMLButtonElement;

      await click(inputSelect);

      expect(inputSelect).not.toBeNull();

      expect(queryAllByTestId(`${testId}-option`)).not.toBeNull();
    }
  );

  testSelectInput({
    options: options,
    Option: (option) => (
      <FlexLayout>
        <Text>{option.label}</Text>
        <Badge label={option.label} />
      </FlexLayout>
    ),
    SelectedOption: ({
      value,
    }: {
      value: Nullable<NullishPrimitives>;
      disabled?: boolean;
    }) => {
      const selectedOption = options.find((option) => option.value === value);
      return selectedOption ? (
        <Text>Selected: {selectedOption.label}</Text>
      ) : null;
    },
  })(
    "should render selected option in custom component",
    async ({ queryByTestId, queryAllByTestId }, { click }) => {
      const inputSelect = queryByTestId(
        `${testId}-button`
      ) as HTMLButtonElement;

      await click(inputSelect);

      expect(inputSelect).not.toBeNull();

      expect(queryAllByTestId(`${testId}-option`)).not.toBeNull();

      await click(queryAllByTestId(`${testId}-option`)?.[0] as HTMLDivElement);

      expect(inputSelect.textContent).toBe("Selected: Apple");
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

  const onBlur = mock(() => {});

  testSelectInput({
    options: options,
    onBlur,
  })(
    "should select an option and show the selected value in the select",
    async ({ queryByTestId, queryAllByTestId }, { click }) => {
      const inputSelect = queryByTestId(
        `${testId}-button`
      ) as HTMLButtonElement;

      await click(inputSelect);

      await click(queryAllByTestId(`${testId}-option`)?.[0] as HTMLDivElement);

      expect(inputSelect.getAttribute("aria-expanded")).toBe("false");
      expect(inputSelect?.textContent).toBe("Apple");
    }
  );

  const onChange = mock(() => {});

  testSelectInput({
    options: options,
    onChange,
  })(
    "should trigger onChange with param when an option is selected",
    async ({ queryByTestId, queryAllByTestId }, { click }) => {
      const inputSelect = queryByTestId(
        `${testId}-button`
      ) as HTMLButtonElement;

      await click(inputSelect);

      await click(queryAllByTestId(`${testId}-option`)?.[0] as HTMLDivElement);

      expect(inputSelect.getAttribute("aria-expanded")).toBe("false");
      expect(inputSelect?.textContent).toBe("Apple");

      expect(onChange).toHaveBeenCalled();
      expect(onChange).toHaveBeenCalledWith("1");
    }
  );

  testSelectInput({ options: options, searchable: true })(
    "should render and be typable when searchable property is true",
    async ({ queryByTestId }, { click, keyboard }) => {
      const inputSelect = queryByTestId(
        `${testId}-button`
      ) as HTMLButtonElement;
      await click(inputSelect);
      const searchableInput = queryByTestId(
        `${testId}-query`
      ) as HTMLInputElement;

      expect(searchableInput).not.toBeNull();

      await click(searchableInput);
      await keyboard("test");
      expect(searchableInput.value).toBe("test");
    }
  );

  testSelectInput({ options: groupOptions, searchable: true })(
    "should filter out options when typing in the search input",
    async ({ queryByTestId, queryAllByTestId }, { click, keyboard }) => {
      const inputSelect = queryByTestId(
        `${testId}-button`
      ) as HTMLButtonElement;
      await click(inputSelect);
      const searchableInput = queryByTestId(
        `${testId}-query`
      ) as HTMLInputElement;

      const options = queryAllByTestId(`${testId}-option`);
      expect(options).toHaveLength(3);

      expect(searchableInput).not.toBeNull();

      await click(searchableInput);
      await keyboard("Banana");
      expect(searchableInput.value).toBe("Banana");

      const filteredOptions = queryAllByTestId(`${testId}-option`);
      expect(filteredOptions).toHaveLength(1);
    }
  );

  testSelectInput({ options: options, searchable: true, value: "1" })(
    "should not filter options on the dropdown while query is equal to the selected value",
    async ({ queryByTestId, queryAllByTestId }, { click }) => {
      const inputSelect = queryByTestId(
        `${testId}-button`
      ) as HTMLButtonElement;
      await click(inputSelect);
      const searchableInput = queryByTestId(
        `${testId}-query`
      ) as HTMLInputElement;

      expect(searchableInput).not.toBeNull();

      await click(searchableInput);

      const options = queryAllByTestId(`${testId}-option`);
      expect(options).toHaveLength(3);
    }
  );

  testSelectInput({ options: options, clearable: true, value: "1" })(
    "should clear the selected option when clearable is true",
    async ({ queryByTestId }, { click }) => {
      const inputSelect = queryByTestId(
        `${testId}-button`
      ) as HTMLButtonElement;

      expect(inputSelect.textContent).toBe("Apple");

      const clearButton = queryByTestId(`${testId}-clear`) as HTMLDivElement;
      expect(clearButton).not.toBeNull();
      await click(clearButton);

      expect(inputSelect.textContent).toBe("");
    }
  );
});
