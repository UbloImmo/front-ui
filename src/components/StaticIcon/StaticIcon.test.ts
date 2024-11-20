import { expect } from "bun:test";

import { StaticIcon } from "./StaticIcon.component";

import { testComponentFactory } from "@/tests";

const testStaticIcon = testComponentFactory("StaticIcon", StaticIcon);
const testId = "static-icon";

testStaticIcon({
  ...StaticIcon.defaultProps,
  name: "Square",
})("should render", ({ queryByTestId }) => {
  expect(queryByTestId(testId)).not.toBeNull();
});

testStaticIcon({
  ...StaticIcon.defaultProps,
  indicator: {
    name: "Circle2NdHalf",
    color: "pending-base",
  },
})("should render an indicator", ({ queryByTestId }) => {
  expect(queryByTestId(testId)).not.toBeNull();
  expect(queryByTestId(`${testId}-indicator`)).not.toBeNull();
});

testStaticIcon({
  ...StaticIcon.defaultProps,
  indicator: {
    name: "Circle2NdHalf",
    color: "pending-base",
    tooltip: {
      content: "Tooltip content",
    },
  },
})("should render an indicator with a tooltip", ({ queryByTestId }) => {
  expect(queryByTestId(testId)).not.toBeNull();
  expect(queryByTestId(`${testId}-indicator`)).not.toBeNull();
  expect(queryByTestId(`tooltip ${testId}-indicator-tooltip`)).not.toBeNull();
});
