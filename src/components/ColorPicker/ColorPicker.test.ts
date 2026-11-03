import { Nullable } from "@ubloimmo/front-util";
import { expect, mock } from "bun:test";

import { ColorPicker, decorativeColorLabels } from "./ColorPicker.component";
import { decorativeColorKeys } from "../../types";

import { testComponentFactory } from "@/tests";

import type { DecorativeColorKey } from "@types";

const testId = "color-picker";
const itemTestId = `${testId}-item`;
const sampleColors: DecorativeColorKey[] = ["gray", "maya", "red"];

const testColorPicker = testComponentFactory("ColorPicker", ColorPicker);

testColorPicker(ColorPicker.__DEFAULT_PROPS)(
  "should render the full decorative palette with default props",
  ({ queryByTestId, queryAllByTestId }) => {
    expect(queryByTestId(testId)).not.toBeNull();
    expect(queryAllByTestId(itemTestId)).toHaveLength(
      decorativeColorKeys.length
    );
  }
);

testColorPicker({
  ...ColorPicker.__DEFAULT_PROPS,
  colors: sampleColors,
})("should render with a subset of colors", ({ queryAllByTestId }) => {
  expect(queryAllByTestId(itemTestId)).toHaveLength(3);
});

testColorPicker({
  ...ColorPicker.__DEFAULT_PROPS,
  colors: sampleColors,
  value: "maya",
})("should mark the selected color as checked", ({ queryAllByTestId }) => {
  const items = queryAllByTestId(itemTestId);
  expect(items[0].getAttribute("aria-checked")).toBe("false");
  expect(items[1].getAttribute("aria-checked")).toBe("true");
  expect(items[2].getAttribute("aria-checked")).toBe("false");
});

testColorPicker({
  ...ColorPicker.__DEFAULT_PROPS,
  colors: sampleColors,
  labels: { maya: "Ciel" },
})(
  "should use custom labels and fall back to default labels",
  ({ queryAllByTestId }) => {
    const items = queryAllByTestId(itemTestId);
    expect(items[0].getAttribute("aria-label")).toBe(
      decorativeColorLabels.gray
    );
    expect(items[1].getAttribute("aria-label")).toBe("Ciel");
  }
);

const onChange = mock((_value: Nullable<DecorativeColorKey>) => {});

testColorPicker({
  ...ColorPicker.__DEFAULT_PROPS,
  colors: sampleColors,
  value: "gray",
  onChange,
})("should update value on change", async ({ queryAllByTestId }, { click }) => {
  await click(queryAllByTestId(itemTestId)[2]);

  expect(onChange).toHaveBeenCalledTimes(1);
  expect(onChange).toHaveBeenCalledWith("red");
  onChange.mockReset();
});

testColorPicker({
  colors: sampleColors,
  value: "maya",
  onChange,
})(
  "should reset value on change if value is already set",
  async ({ queryAllByTestId }, { click }) => {
    await click(queryAllByTestId(itemTestId)[1]);

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(null);
    onChange.mockReset();
  }
);

testColorPicker({
  colors: sampleColors,
  value: "maya",
  required: true,
  onChange,
})(
  "should not reset value if required",
  async ({ queryAllByTestId }, { click }) => {
    await click(queryAllByTestId(itemTestId)[1]);

    expect(onChange).not.toHaveBeenCalled();
    expect(queryAllByTestId(itemTestId)[1].getAttribute("aria-checked")).toBe(
      "true"
    );
    onChange.mockReset();
  }
);

testColorPicker({
  colors: sampleColors,
  value: "maya",
  disabled: true,
  onChange,
})(
  "should not change value if disabled",
  async ({ queryAllByTestId }, { click }) => {
    await click(queryAllByTestId(itemTestId)[2]);

    expect(onChange).not.toHaveBeenCalled();
    onChange.mockReset();
  }
);
