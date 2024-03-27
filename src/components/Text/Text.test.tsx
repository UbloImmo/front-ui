import { expect } from "bun:test";

import { testComponentFactory } from "@/tests";

import { Text } from ".";

const testId = "text";
const testContent = "text content";

const testText = testComponentFactory("Text", Text);

testText({})("should render", ({ queryByTestId }) => {
  const text = queryByTestId(testId);
  expect(text).toBeDefined();
});

testText({ children: testContent })(
  "should render its children",
  ({ queryByTestId, queryByText }) => {
    const text = queryByTestId(testId);
    expect(text).toBeDefined();
    const content = queryByText(testContent);
    expect(content).toBeDefined();
  }
);
