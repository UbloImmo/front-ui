import { expect, mock, Mock } from "bun:test";

import { FeatureSwitch } from "./FeatureSwitch.component";

import { testComponentFactory } from "@/tests";

import type { VoidFn } from "@ubloimmo/front-util";

const testFeatureSwitch = testComponentFactory("FeatureSwitch", FeatureSwitch);

const testId = "feature-switch";
const options = [
  {
    label: "Option 1",
    value: "option-1",
  },
  {
    label: "Option 2",
    value: "option-2",
  },
];

testFeatureSwitch(FeatureSwitch.defaultProps)(
  "should render",
  ({ queryByTestId }) => {
    expect(queryByTestId("feature-switch")).not.toBeNull();
  }
);

testFeatureSwitch({ ...FeatureSwitch.defaultProps, variant: "checkbox" })(
  "should render with checkbox variant",
  ({ queryByTestId }) => {
    expect(queryByTestId(testId)).not.toBeNull();
  }
);

testFeatureSwitch({
  ...FeatureSwitch.defaultProps,
  variant: "select",
  options,
})("should render with select variant", ({ queryByTestId }) => {
  expect(queryByTestId(testId)).not.toBeNull();
});

global.console.warn = mock(() => {});

testFeatureSwitch({
  ...FeatureSwitch.defaultProps,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore need this to check for unhandled props
  label: null,
})("should warn when label is missing", ({ queryByTestId }) => {
  expect(queryByTestId(testId)).not.toBeNull();
  expect(global.console.warn).toHaveBeenCalled();
  (global.console.warn as Mock<VoidFn>).mockReset();
});

testFeatureSwitch({
  ...FeatureSwitch.defaultProps,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore need this to check for unhandled props
  variant: null,
})("should warn when variant is missing", ({ queryByTestId }) => {
  expect(queryByTestId(testId)).not.toBeNull();
  expect(global.console.warn).toHaveBeenCalled();
  (global.console.warn as Mock<VoidFn>).mockReset();
});
