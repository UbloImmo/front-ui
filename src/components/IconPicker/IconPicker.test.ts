import { Nullable } from "@ubloimmo/front-util";
import { expect, mock } from "bun:test";

import { IconPicker } from "./IconPicker.component";
import { IconName } from "../Icon/Icon.types";

import { testComponentFactory } from "@/tests";

const testId = "icon-picker";
const sampleIcons: IconName[] = [
  "EmojiHeartEyes",
  "EmojiSmile",
  "EmojiNeutral",
];

const testIconPicker = testComponentFactory("IconPicker", IconPicker);

testIconPicker(IconPicker.defaultProps)(
  "should render with default props",
  ({ queryByTestId }) => {
    expect(queryByTestId(testId)).not.toBeNull();
  }
);

testIconPicker({
  ...IconPicker.defaultProps,
  icons: sampleIcons,
})(
  "should render with a set of icons",
  ({ queryByTestId, queryAllByTestId }) => {
    expect(queryByTestId(testId)).not.toBeNull();
    expect(queryAllByTestId(`${testId}-item`)).not.toBeNull();
    expect(queryAllByTestId(`${testId}-item`)).toHaveLength(3);
  }
);

const onChange = mock((_value: Nullable<IconName>) => {});

testIconPicker({
  ...IconPicker.defaultProps,
  icons: sampleIcons,
  value: "EmojiNeutral",
  onChange,
})(
  "should update value on change",
  async ({ queryByTestId, queryAllByTestId }, { click }) => {
    expect(queryByTestId(testId)).not.toBeNull();
    expect(queryAllByTestId(`${testId}-item`)).not.toBeNull();

    await click(queryAllByTestId(`${testId}-item`)[1]);

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith("EmojiSmile");
    onChange.mockReset();
  }
);

testIconPicker({
  icons: sampleIcons,
  value: "EmojiSmile",
  onChange,
})(
  "should reset value on change if value is already set",
  async ({ queryByTestId, queryAllByTestId }, { click }) => {
    expect(queryByTestId(testId)).not.toBeNull();
    expect(queryAllByTestId(`${testId}-item`)).not.toBeNull();

    await click(queryAllByTestId(`${testId}-item`)[1]);

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(null);
    onChange.mockReset();
  }
);
