import { expect } from "bun:test";

import { ContextLine } from "./ContextLine.component";
import { Badge } from "../Badge";

import { testComponentFactory } from "@/tests";

const testContextLine = testComponentFactory("ContextLine", ContextLine);

const testId = "context-line";

testContextLine({
  ...ContextLine.__DEFAULT_PROPS,
})("should render with default props", async ({ findByTestId }) => {
  expect(await findByTestId(testId)).not.toBeNull();
});

testContextLine({
  ...ContextLine.__DEFAULT_PROPS,
  label: "[Label]",
})("should render with label", async ({ findByTestId }) => {
  const element = await findByTestId("context-line-label");
  expect(element).not.toBeNull();
  expect(element.textContent).toContain("[Label]");
});

testContextLine({
  ...ContextLine.__DEFAULT_PROPS,
  label: "[Label]",
  children: <Badge label="Badge" color="primary" />,
})("should render children and label", async ({ findByText, findByTestId }) => {
  const element = await findByTestId("context-line-label");
  expect(element).not.toBeNull();
  expect(element.textContent).toContain("[Label]");
  expect(await findByText("Badge")).not.toBeNull();
  expect(await findByTestId("badge")).not.toBeNull();
});
