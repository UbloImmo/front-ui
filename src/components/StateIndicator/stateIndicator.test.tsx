import { expect } from "bun:test";

import { StateIndicator } from "./StateIndicator.component";
import { StateIndicatorProps } from "./StateIndicator.types";

import { testComponentFactory } from "@/tests";

const testId = "state-indicator";

const testStateIndicator = testComponentFactory<StateIndicatorProps>(
  "StateIndicator",
  StateIndicator
);

testStateIndicator({
  ...StateIndicator.__DEFAULT_PROPS,
})("should render with default props", ({ queryByTestId }) => {
  expect(queryByTestId(testId)).not.toBeNull();
});

testStateIndicator({
  ...StateIndicator.__DEFAULT_PROPS,
  color: "white",
})("should render with white color", ({ queryByTestId }) => {
  expect(queryByTestId(testId)).not.toBeNull();
});

testStateIndicator({
  ...StateIndicator.__DEFAULT_PROPS,
  color: "gray",
})("should render with gray color", ({ queryByTestId }) => {
  expect(queryByTestId(testId)).not.toBeNull();
});
