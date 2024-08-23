import { expect } from "bun:test";

import { Badge } from "../Badge";
import { ContextLine } from "./ContextLine.component";

import { testComponentFactory } from "@/tests";

const testContextLine = testComponentFactory("ContextLine", ContextLine);

const testId = "context-line";

testContextLine({
  ...ContextLine.defaultProps,
})("should render with default props", async ({ findByTestId }) => {
  expect(await findByTestId(testId)).not.toBeNull();
});

testContextLine({
  ...ContextLine.defaultProps,
  label: "[Label]",
})("should render with label", async ({ findByTestId }) => {
  const element = await findByTestId("context-line-label");
  expect(element).not.toBeNull();
  expect(element.textContent).toContain("[Label]");
});

testContextLine({
  ...ContextLine.defaultProps,
  label: "[Label]",
  children: <Badge label="Badge" color="primary" />,
})("should render children and label", async ({ findByText, findByTestId }) => {
  const element = await findByTestId("context-line-label");
  expect(element).not.toBeNull();
  expect(element.textContent).toContain("[Label]");
  expect(await findByText("Badge")).not.toBeNull();
  expect(await findByTestId("badge")).not.toBeNull();
});
