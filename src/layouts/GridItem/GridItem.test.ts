import { expect } from "bun:test";

import { GridItem } from "./GridItem.layout";

import { testComponentFactory } from "@/tests";

const testId = "grid-item";
const testGridItem = testComponentFactory("GridItem", GridItem);

testGridItem(GridItem.defaultProps ?? {})(
  "should render",
  ({ queryByTestId }) => {
    expect(queryByTestId(testId)).not.toBeNull();
  }
);

testGridItem({
  ...GridItem.defaultProps,
  row: "1 / 2",
  column: "1 / 2",
})("should parse position", ({ queryByTestId }) => {
  expect(queryByTestId(testId)).not.toBeNull();
});

testGridItem({
  ...GridItem.defaultProps,
  row: { start: "1", end: "2" },
  column: { start: "1", end: "2" },
})("should parse position as object", ({ queryByTestId }) => {
  expect(queryByTestId(testId)).not.toBeNull();
});
