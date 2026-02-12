import { expect } from "bun:test";

import { testComponentFactory } from "@/tests";

import { GridLayout, GridLayoutProps } from ".";

const testGridLayout = testComponentFactory<GridLayoutProps>(
  "GridLayout",
  GridLayout
);

testGridLayout({
  ...GridLayout.__DEFAULT_PROPS,
  columns: ["1fr", "auto", "s-1", "12px", "14.423rem"],
  rows: ["1fr", "auto", "s-1", "12px", "14.423rem"],
})("sould render with specified columns and rows", ({ queryByTestId }) => {
  expect(queryByTestId("grid")).not.toBeNull();
});
