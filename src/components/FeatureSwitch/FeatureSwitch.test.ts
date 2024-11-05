import { expect } from "bun:test";

import { FeatureSwitch } from "./FeatureSwitch.component";

import { testComponentFactory } from "@/tests";

const testFeatureSwitch = testComponentFactory("FeatureSwitch", FeatureSwitch);

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
  ({ queryByTestId, debug }) => {
    debug();
    expect(queryByTestId("feature-switch")).not.toBeNull();
  }
);

testFeatureSwitch({ ...FeatureSwitch.defaultProps, variant: "checkbox" })(
  "should render with checkbox variant",
  ({ queryByTestId }) => {
    expect(queryByTestId("feature-switch")).not.toBeNull();
  }
);

testFeatureSwitch({
  ...FeatureSwitch.defaultProps,
  variant: "select",
  options,
})("should render with select variant", ({ queryByTestId }) => {
  expect(queryByTestId("feature-switch")).not.toBeNull();
});
