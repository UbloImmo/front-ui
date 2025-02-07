import { expect } from "bun:test";

import { SumLine } from "./SumLine.component";

import { testComponentFactory } from "@/tests";

const testSumLine = testComponentFactory("SumLine", SumLine);

const testId = "sum-line";
const labelTestId = `${testId}-label`;
const valueTestId = `${testId}-value`;
const periodTestId = `${testId}-period`;

testSumLine({
  ...SumLine.defaultProps,
  label: "Label",
  value: 1000,
  period: "2024",
})("should render", ({ queryByTestId }) => {
  expect(queryByTestId(testId)).not.toBeNull();
});

testSumLine({
  ...SumLine.defaultProps,
  label: "Label",
  value: 1000,
  period: "2024",
})("should render a both label and value", ({ queryByTestId }) => {
  expect(queryByTestId(labelTestId)).not.toBeNull();
  expect(queryByTestId(valueTestId)).not.toBeNull();
});

testSumLine({
  ...SumLine.defaultProps,
  label: "Label",
  value: 1000,
  period: "2024",
})("should render a period", ({ queryByTestId }) => {
  expect(queryByTestId(periodTestId)).not.toBeNull();
});

testSumLine({
  ...SumLine.defaultProps,
  compact: true,
})("should render a compact value", ({ queryByTestId }) => {
  expect(queryByTestId(valueTestId)).not.toBeNull();
});
