import { expect } from "bun:test";

import { testComponentFactory } from "@/tests";

import { Heading } from ".";

import type { HeadingProps, HeadingSize } from "@types";

const testId = "heading";
const testContent = "heading content";

const testHeading = testComponentFactory<HeadingProps>("Heading", Heading);

testHeading({})("should render", ({ queryByTestId }) => {
  const heading = queryByTestId(testId);
  expect(heading).toBeDefined();
});

testHeading({ children: testContent })(
  "should render its children",
  ({ queryByTestId, queryByText }) => {
    const heading = queryByTestId(testId);
    expect(heading).toBeDefined();
    const content = queryByText(testContent);
    expect(content).toBeDefined();
  }
);

const sizes: HeadingSize[] = ["h1", "h2", "h3", "h4"];

sizes.forEach((size) => {
  testHeading({ size, children: testContent })(
    `should render a ${size} heading`,
    ({ queryByTestId, queryByText }) => {
      const heading = queryByTestId(testId);
      expect(heading).toBeDefined();
      const content = queryByText(testContent);
      expect(content).toBeDefined();
    }
  );
});
