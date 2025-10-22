import { waitFor } from "@testing-library/react";
import {
  objectEntries,
  type Nullable,
  type NullishPrimitives,
} from "@ubloimmo/front-util";
import { describe, expect, mock } from "bun:test";

import { SelectInput } from "./SelectInput.component";
import {
  SelectInputCreateButtonTemplateFn,
  SelectInputCreateOptionFn,
  SelectInputIngestUnknowValueFn,
  type SelectOption,
} from "./SelectInput.types";

import { Badge } from "@/components/Badge";
import { Text } from "@/components/Text";
import { FlexLayout } from "@/layouts/Flex";
import { testComponentFactory } from "@/tests";
import { delay } from "@utils";

const testId = "input-select";
const testSelectInput = testComponentFactory("SelectInput", SelectInput);

const stringOptions = [
  {
    label: "Option 1 (string)",
    value: "option-1",
  },
  {
    label: "Option 2 (string)",
    value: "option-2",
  },
  {
    label: "Option 3 (string)",
    value: "option-3",
    disabled: true,
  },
];

const objectOptions = [
  {
    label: "Option 1 (object)",
    value: {
      id: 1,
    },
  },
  {
    label: "Option 2 (object)",
    value: {
      id: 2,
    },
  },
  {
    label: "Option 3 (object)",
    value: {
      id: 3,
    },
    disabled: true,
  },
];

const numberOptions = [
  {
    label: "Option 1 (number)",
    value: 1,
  },
  {
    label: "Option 2 (number)",
    value: 2,
  },
  {
    label: "Option 3 (number)",
    value: 3,
    disabled: true,
  },
];

const mixedOptions = [objectOptions[0], stringOptions[1], numberOptions[2]];

const optionSets = {
  string: stringOptions,
  object: objectOptions,
  number: numberOptions,
  mixed: mixedOptions,
};

describe("Input", () => {
  objectEntries(optionSets).forEach(([setName, options]) => {
    const groupOptions = [
      {
        label: "Group 1",
        options: options,
      },
    ];
    const prefix = (testName: string) => `${setName}::${testName}`;

    testSelectInput({})(prefix("should render"), ({ queryByTestId }) =>
      expect(queryByTestId(testId)).not.toBeNull()
    );

    testSelectInput({ options, placeholder: "Select an option" })(
      prefix("should render single options"),
      ({ queryByTestId }) => expect(queryByTestId(testId)).not.toBeNull()
    );

    testSelectInput({ options: groupOptions, placeholder: "Select an option" })(
      prefix("should render group options "),
      ({ queryByTestId }) => expect(queryByTestId(testId)).not.toBeNull()
    );

    testSelectInput({ options, searchable: false })(
      prefix("should show dropdown with single options on Click on the select"),
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
      options,
      Option: (option) => (
        <FlexLayout>
          <Text>{option.label}</Text>
          <Badge label={option.label} />
        </FlexLayout>
      ),
    })(
      prefix("should render options in custom component"),
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
      options,
      Option: (option) => (
        <FlexLayout>
          <Text>{option.label}</Text>
          <Badge label={option.label} />
        </FlexLayout>
      ),
      SelectedOption: ({ label }: SelectOption<NullishPrimitives>) => {
        return <Text>Selected: {label}</Text>;
      },
    })(
      prefix("should render selected option in custom component"),
      async ({ queryByTestId, queryAllByTestId }, { click }) => {
        await delay(10);
        const inputSelect = queryByTestId(
          `${testId}-button`
        ) as HTMLButtonElement;

        await click(inputSelect);

        expect(inputSelect).not.toBeNull();

        expect(queryAllByTestId(`${testId}-option`)).not.toBeNull();

        await click(
          queryAllByTestId(`${testId}-option`)?.[0] as HTMLDivElement
        );

        await delay(1);

        expect(inputSelect.textContent).toBe(`Selected: ${options[0].label}`);
      }
    );

    testSelectInput({ options: groupOptions, searchable: false })(
      prefix("should show dropdown with group options on Click on the select"),
      async ({ queryByTestId }, { click }) => {
        await delay(10);
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

    testSelectInput({ options, searchable: false })(
      prefix("should close options dropdown on Click anywhere"),
      async ({ queryByTestId }, { click }) => {
        await delay(10);
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
      options,
      onBlur,
    })(
      prefix(
        "should select an option and show the selected value in the select"
      ),
      async ({ queryByTestId, queryAllByTestId }, { click }) => {
        const inputSelect = queryByTestId(
          `${testId}-button`
        ) as HTMLButtonElement;

        await click(inputSelect);

        await click(
          queryAllByTestId(`${testId}-option`)?.[0] as HTMLDivElement
        );

        expect(inputSelect.getAttribute("aria-expanded")).toBe("false");
        expect(inputSelect?.textContent).toBe(options[0].label);
      }
    );

    const onChange = mock(() => {});

    testSelectInput({
      options,
      onChange,
    })(
      prefix("should trigger onChange with param when an option is selected"),
      async ({ queryByTestId, queryAllByTestId }, { click }) => {
        await delay(10);
        const inputSelect = queryByTestId(
          `${testId}-button`
        ) as HTMLButtonElement;

        await click(inputSelect);

        const option = queryAllByTestId(
          `${testId}-option`
        )?.[0] as HTMLDivElement;

        expect(option).not.toBeNull();

        await click(option);

        await delay(10);

        expect(inputSelect.getAttribute("aria-expanded")).toBe("false");
        expect(inputSelect?.textContent).toBe(options[0].label);

        expect(onChange).toHaveBeenCalled();
        expect(onChange).toHaveBeenCalledWith(options[0].value);
        onChange.mockReset();
      }
    );

    testSelectInput({ options, searchable: true })(
      prefix("should render and be typable when searchable property is true"),
      async ({ queryByTestId }, { click, keyboard }) => {
        await delay(10);
        const inputSelect = queryByTestId(
          `${testId}-button`
        ) as HTMLButtonElement;
        await click(inputSelect);
        const searchableInput = queryByTestId(
          `${testId}-query`
        ) as HTMLInputElement;

        expect(searchableInput).not.toBeNull();

        await keyboard("test");
        expect(searchableInput.value).toBe("test");
      }
    );

    testSelectInput({ options: groupOptions, searchable: true })(
      prefix("should filter out options when typing in the search input"),
      async ({ queryByTestId, queryAllByTestId }, { click, keyboard }) => {
        await delay(10);
        const inputSelect = queryByTestId(
          `${testId}-button`
        ) as HTMLButtonElement;
        await click(inputSelect);
        const searchableInput = queryByTestId(
          `${testId}-query`
        ) as HTMLInputElement;

        const optionItems = queryAllByTestId(`${testId}-option`);
        expect(optionItems).toHaveLength(3);

        expect(searchableInput).not.toBeNull();

        await keyboard(options[1].label);
        expect(searchableInput.value).toBe(options[1].label);

        const filteredOptions = queryAllByTestId(`${testId}-option`);
        expect(filteredOptions).toHaveLength(1);
      }
    );

    testSelectInput({ options, searchable: true, value: "1" })(
      prefix(
        "should not filter options on the dropdown while query is equal to the selected value"
      ),
      async ({ queryByTestId, queryAllByTestId }, { click }) => {
        const inputSelect = queryByTestId(
          `${testId}-button`
        ) as HTMLButtonElement;
        await click(inputSelect);
        const searchableInput = queryByTestId(
          `${testId}-query`
        ) as HTMLInputElement;

        expect(searchableInput).not.toBeNull();

        const options = queryAllByTestId(`${testId}-option`);
        expect(options).toHaveLength(3);
      }
    );

    testSelectInput({ options, clearable: true, value: options[0].value })(
      prefix("should clear the selected option when clearable is true"),
      async ({ queryByTestId }, { click }) => {
        const inputSelect = queryByTestId(
          `${testId}-button`
        ) as HTMLButtonElement;

        expect(inputSelect.textContent).toBe(options[0].label);

        const clearButton = queryByTestId(`${testId}-clear`) as HTMLDivElement;
        expect(clearButton).not.toBeNull();
        await click(clearButton);

        await delay(10);

        expect(inputSelect.textContent).toBe("");
      }
    );

    const asyncOptions = mock((_query: Nullable<string>) => options);
    const asyncOptionsUpdated = mock((_query: Nullable<string>) => options);

    testSelectInput({
      options: asyncOptions,
      searchable: true,
      value: options[0].value,
    })(
      prefix(
        "should refetch options while keeping auto complete query when options are changed"
      ),
      async (
        { queryByTestId, queryAllByTestId, rerenderWithProps },
        { click, keyboard }
      ) => {
        const inputSelect = queryByTestId(
          `${testId}-button`
        ) as HTMLButtonElement;
        await click(inputSelect);
        const searchableInput = queryByTestId(
          `${testId}-query`
        ) as HTMLInputElement;

        const optionItems = queryAllByTestId(`${testId}-option`);
        expect(optionItems).toHaveLength(3);

        expect(searchableInput).not.toBeNull();

        await keyboard(options[1].label);
        expect(searchableInput.value).toBe(options[1].label);
        expect(asyncOptions).toHaveBeenCalledWith(options[1].label);

        rerenderWithProps({
          options: asyncOptionsUpdated,
          searchable: true,
          value: options[1].value,
        });
        expect(asyncOptionsUpdated).toHaveBeenCalledWith(options[1].label);
      }
    );

    const createButtonLabelTemplateImpl: SelectInputCreateButtonTemplateFn = (
      query: string
    ) => `Create new option: "${query}"`;

    const createButtonLabelTemplate = mock<SelectInputCreateButtonTemplateFn>(
      createButtonLabelTemplateImpl
    );

    const labelToValue = (label: string) => [label];

    const createOption = mock<SelectInputCreateOptionFn<NullishPrimitives>>(
      (label) => ({
        label,
        value: labelToValue(label),
      })
    );

    const valueToLabel = (value: NullishPrimitives): string =>
      `Created: ${JSON.stringify(value)}`;

    const ingestUnknownValueImpl: SelectInputIngestUnknowValueFn<
      NullishPrimitives
    > = (value) => ({
      value,
      label: valueToLabel(value),
    });

    const ingestUnknownValue = mock<
      SelectInputIngestUnknowValueFn<NullishPrimitives>
    >(ingestUnknownValueImpl);

    const creatable = {
      ingestUnknownValue,
      createOption,
      createButtonLabelTemplate,
    };

    testSelectInput({
      options,
      searchable: true,
      creatable,
      onChange,
    })(
      prefix("should create an option"),
      async (
        { queryByTestId, queryAllByTestId, rerender },
        { click, keyboard }
      ) => {
        let inputSelect = queryByTestId(
          `${testId}-button`
        ) as HTMLButtonElement;
        await click(inputSelect);
        const searchableInput = queryByTestId(
          `${testId}-query`
        ) as HTMLInputElement;
        const optionItems = queryAllByTestId(`${testId}-option`);
        expect(optionItems).toHaveLength(3);

        expect(searchableInput).not.toBeNull();

        const unknownLabel = "Not created yet";
        await keyboard(unknownLabel);
        expect(searchableInput).toHaveValue(unknownLabel);
        expect(createButtonLabelTemplate).toHaveBeenCalledWith(unknownLabel);

        const createLabel = createButtonLabelTemplateImpl(unknownLabel);
        const createButton = queryByTestId(
          `${testId}-create-button`
        ) as HTMLDivElement;
        expect(createButton).not.toBeNull();
        expect(createButton).toHaveTextContent(createLabel);

        await click(createButton);
        expect(createOption).toHaveBeenCalledWith(unknownLabel);
        rerender();
        inputSelect = queryByTestId(`${testId}-button`) as HTMLButtonElement;
        expect(inputSelect).toHaveTextContent(unknownLabel);

        expect(onChange).toHaveBeenCalledWith(labelToValue(unknownLabel));

        onChange.mockClear();
        createButtonLabelTemplate.mockClear();
        createOption.mockClear();
        ingestUnknownValue.mockClear();
      }
    );

    testSelectInput({
      options: [],
      searchable: true,
      creatable,
      onChange,
      value: options[0].value,
    })(
      prefix("should ingest unkown value"),
      async ({ queryByTestId, rerender }) => {
        let inputSelect = queryByTestId(
          `${testId}-button`
        ) as HTMLButtonElement;
        expect(inputSelect).not.toBeNull();
        expect(ingestUnknownValue).toHaveBeenCalledWith(options[0].value);
        rerender();
        inputSelect = queryByTestId(`${testId}-button`) as HTMLButtonElement;
        await waitFor(() =>
          expect(inputSelect).toHaveTextContent(valueToLabel(options[0].value))
        );

        createButtonLabelTemplate.mockClear();
        createOption.mockClear();
        ingestUnknownValue.mockClear();
      }
    );
  });
});
