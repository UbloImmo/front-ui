import {
  Nullish,
  NullishPrimitives,
  objectEntries,
  VoidFn,
} from "@ubloimmo/front-util";
import { expect, Mock, mock } from "bun:test";

import { ComboBox } from "./ComboBox.component";
import { ComboBoxOption } from "./ComboBox.types";

import { testComponentFactory } from "@/tests";

const testComboBox = testComponentFactory("ComboBox", ComboBox);

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

testComboBox({ ...ComboBox.defaultProps })(
  "should render",
  ({ queryByTestId }) => {
    expect(queryByTestId("combo-box")).not.toBeNull();
  }
);

objectEntries(optionSets).forEach(([setName, options]) => {
  const prefix = (testName: string) => `${setName}::${testName}`;
  const firstOption = options[0];
  const secondOption = options[1];
  const firstTwoOptions = [firstOption, secondOption];

  const optionValues = (opts: ComboBoxOption<NullishPrimitives>[]) =>
    opts.map(({ value }) => value);
  const optionLabels = (opts: ComboBoxOption<NullishPrimitives>[]) =>
    opts.map(({ label }) => label);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const castMock = (cb: Nullish<VoidFn<any[]>>): Mock<VoidFn> =>
    cb as Mock<VoidFn>;
  const initMock = () => mock<VoidFn>(() => {});

  testComboBox({ ...ComboBox.defaultProps, options })(
    prefix("should render options"),
    ({ queryByTestId, queryByText }) => {
      expect(queryByTestId("combo-box")).not.toBeNull();
      options.forEach(({ label }) => {
        expect(queryByText(label)).not.toBeNull();
      });
    }
  );

  testComboBox({
    ...ComboBox.defaultProps,
    options,
    value: firstOption.value,
  })(
    prefix("should render with initial selected option (single selection)"),
    ({ queryByTestId, queryByRole }) => {
      expect(queryByTestId("combo-box")).not.toBeNull();
      const button = queryByRole("option", {
        selected: true,
      });
      expect(button).not.toBeNull();
      expect(button).toHaveTextContent(firstOption.label);
    }
  );

  testComboBox({
    ...ComboBox.defaultProps,
    options,
    multi: true,
    value: optionValues(firstTwoOptions),
  })(
    prefix("should render with initial selected option (multiple selection)"),
    ({ queryByTestId, queryAllByRole }) => {
      expect(queryByTestId("combo-box")).not.toBeNull();
      const buttons = queryAllByRole("option", {
        selected: true,
      });
      expect(buttons).not.toBeNull();
      expect(buttons).toHaveLength(firstTwoOptions.length);
      const firstTwoLabels = optionLabels(firstTwoOptions);
      buttons.forEach((button, index) => {
        expect(button).toHaveTextContent(firstTwoLabels[index]);
      });
    }
  );

  testComboBox({ ...ComboBox.defaultProps, options, onChange: initMock() })(
    prefix("should select option on click"),
    async ({ findAllByTestId }, { click }, { onChange: cb }) => {
      const onChange = castMock(cb);
      const comboBoxButtons = await findAllByTestId("combo-box-button");
      expect(comboBoxButtons).toHaveLength(options.length);
      onChange.mockClear();
      await click(comboBoxButtons[0]);
      expect(onChange).toHaveBeenCalled();
      expect(onChange).toHaveBeenCalledWith(optionValues([firstOption]));
      onChange.mockReset();
    }
  );

  testComboBox({
    ...ComboBox.defaultProps,
    options,
    onChange: initMock(),
    multi: true,
  })(
    prefix("should select multiple options on click"),
    async ({ findAllByTestId }, { click }, { onChange: cb }) => {
      const onChange = castMock(cb);
      const comboBoxButtons = await findAllByTestId("combo-box-button");
      expect(comboBoxButtons).toHaveLength(options.length);

      onChange.mockClear();
      await click(comboBoxButtons[0]);
      expect(onChange).toHaveBeenCalled();
      expect(onChange).toHaveBeenCalledWith(optionValues([firstOption]));

      onChange.mockClear();
      await click(comboBoxButtons[1]);
      expect(onChange).toHaveBeenCalled();
      expect(onChange).toHaveBeenCalledWith(
        optionValues([firstOption, secondOption])
      );
      onChange.mockReset();
    }
  );

  testComboBox({
    ...ComboBox.defaultProps,
    options,
    value: optionValues(firstTwoOptions),
    onChange: initMock(),
    multi: true,
  })(
    prefix("should deselect option on click on multiple selection"),
    async ({ findAllByTestId }, { click }, { onChange: cb }) => {
      const onChange = castMock(cb);
      const comboBoxButtons = await findAllByTestId("combo-box-button");
      expect(comboBoxButtons).toHaveLength(options.length);

      onChange.mockClear();
      await click(comboBoxButtons[0]);
      expect(onChange).toHaveBeenCalled();
      expect(onChange).toHaveBeenCalledWith(optionValues([secondOption]));

      onChange.mockClear();
      await click(comboBoxButtons[1]);
      expect(onChange).toHaveBeenCalled();
      expect(onChange).toHaveBeenCalledWith([]);
      onChange.mockReset();
    }
  );

  testComboBox({
    ...ComboBox.defaultProps,
    options,
    value: optionValues(firstTwoOptions),
    onChange: initMock(),
    multi: true,
    required: true,
  })(
    prefix("should not deselect last selected option on click"),
    async ({ findAllByRole }, { click }, { onChange: cb }) => {
      const onChange = castMock(cb);
      const activeButtons = await findAllByRole("option", {
        selected: true,
      });
      expect(activeButtons).toHaveLength(firstTwoOptions.length);

      onChange.mockClear();
      await click(activeButtons[0]);
      expect(onChange).toHaveBeenCalled();

      onChange.mockClear();
      expect(onChange).not.toHaveBeenCalled();
      await click(activeButtons[1]);
      expect(onChange).not.toHaveBeenCalled();
      onChange.mockReset();
    }
  );

  testComboBox({
    ...ComboBox.defaultProps,
    options,
    value: firstOption.value,
    onChange: initMock(),
  })(
    prefix("should deselect option on click on single selection"),
    async ({ findAllByTestId }, { click }, { onChange: cb }) => {
      const onChange = castMock(cb);
      const comboBoxButtons = await findAllByTestId("combo-box-button");
      expect(comboBoxButtons).toHaveLength(options.length);

      onChange.mockClear();
      await click(comboBoxButtons[0]);
      expect(onChange).toHaveBeenCalled();
      expect(onChange).toHaveBeenCalledWith([]);
      onChange.mockReset();
    }
  );

  testComboBox({
    ...ComboBox.defaultProps,
    options,
    value: [firstOption],
    onChange: initMock(),
    readonly: true,
  })(
    prefix("should not call onChange when clicking on a button"),
    async ({ findAllByTestId }, { click }, { onChange: cb }) => {
      const onChange = castMock(cb);
      const buttons = await findAllByTestId("combo-box-button");
      expect(buttons).toHaveLength(options.length);
      const button = buttons[0];
      expect(button).toBeDefined();

      onChange.mockReset();
      await click(button);
      expect(onChange).not.toHaveBeenCalled();
      expect(onChange).not.toHaveBeenLastCalledWith([]);
      onChange.mockReset();
    }
  );

  const onCreate1 = mock<VoidFn>(() => {});

  testComboBox({
    ...ComboBox.defaultProps,
    options,
    creatable: true,
    onCreate: onCreate1,
  })(
    prefix(
      "should have create button and call onCreate on click on single selection"
    ),
    async ({ queryByTestId }, { click }) => {
      const createButton = queryByTestId(
        "combo-box-create-button"
      ) as HTMLButtonElement;
      expect(createButton).not.toBeNull();

      await click(createButton);
      expect(onCreate1).toHaveBeenCalled();
      onCreate1.mockReset();
    }
  );

  const onCreate2 = mock<VoidFn>(() => {});

  testComboBox({
    ...ComboBox.defaultProps,
    options,
    creatable: true,
    multi: true,
    onCreate: onCreate2,
  })(
    prefix(
      "should have create button and call onCreate on click on multiple selection"
    ),
    async ({ queryByTestId }, { click }) => {
      const createButton = queryByTestId(
        "combo-box-create-button"
      ) as HTMLButtonElement;
      expect(createButton).not.toBeNull();

      await click(createButton);
      expect(onCreate2).toHaveBeenCalled();
      onCreate2.mockReset();
    }
  );

  testComboBox({
    ...ComboBox.defaultProps,
    options,
    columns: 2,
  })("should display options in columns", async ({ queryByTestId }) => {
    const grid = queryByTestId("grid combo-box");
    expect(grid).not.toBeNull();
  });
});
