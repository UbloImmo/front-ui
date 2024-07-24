import { expect, mock } from "bun:test";

import { Callout } from "./Callout.component";

import { testComponentFactory } from "@/tests";

const testCallout = testComponentFactory("Callout", Callout);
const testId = "callout";

testCallout(Callout.defaultProps)("should render", ({ queryByTestId }) => {
  expect(queryByTestId(testId)).not.toBeNull();
});

testCallout({ ...Callout.defaultProps, icon: "Square" })(
  "should replace default icon with provided icon props",
  ({ queryByTestId }) => {
    expect(queryByTestId(testId)).not.toBeNull();
  }
);

testCallout({ ...Callout.defaultProps, color: "gray" })(
  "should replace with provided gray color props",
  ({ queryByTestId }) => {
    expect(queryByTestId(testId)).not.toBeNull();
  }
);

globalThis.console.warn = mock(() => {});

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore need this to check for unhandled props
testCallout({ ...Callout.defaultProps, label: null })(
  "should warn when missing label property",
  ({ queryByTestId }) => {
    expect(queryByTestId(testId)).not.toBeNull();
    expect(globalThis.console.warn).toHaveBeenCalled();
  }
);
