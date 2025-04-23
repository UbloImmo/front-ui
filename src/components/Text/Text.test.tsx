import { expect } from "bun:test";

import { testComponentFactory } from "@/tests";

import { Text } from ".";

import type { TextSize, TypographyFont } from "@types";

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

const sizes: TextSize[] = ["m", "s", "xs"];

sizes.forEach((size) => {
  testText({ size, children: testContent })(
    `should render a ${size} text`,
    ({ queryByTestId, queryByText }) => {
      const heading = queryByTestId(testId);
      expect(heading).toBeDefined();
      const content = queryByText(testContent);
      expect(content).toBeDefined();
    }
  );
});

const fonts: TypographyFont[] = ["sans", "code"];

fonts.forEach((font) => {
  testText({ font, children: testContent })(
    `should render a ${font} text`,
    ({ queryByTestId, queryByText }) => {
      const text = queryByTestId(testId);
      expect(text).toBeDefined();
      const content = queryByText(testContent);
      expect(content).toBeDefined();
    }
  );
});
