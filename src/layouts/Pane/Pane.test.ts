import { expect, mock } from "bun:test";

import { Pane } from "./Pane.layout";
import { PaneDynamicContent } from "./Pane.types";

import { testComponentFactory } from "@/tests";
import { delay } from "@utils";

const testId = "pane";
const contentTestId = "pane-content";

const testPane = testComponentFactory("Pane", Pane);

const testEmptyPane = testPane({});
const testPaneWithStaticContent = testPane({
  children: "Pane content",
});

const mockDynamicContent = mock<PaneDynamicContent>(() => "Pane content");

const testPaneWithDynamicContent = testPane({
  dynamicContent: mockDynamicContent,
});

const testAll: typeof testEmptyPane = (label, ...args) => {
  testEmptyPane(`${label} (empty)`, ...args);
  testPaneWithStaticContent(`${label} (static)`, ...args);
  testPaneWithDynamicContent(`${label} (dynamic)`, ...args);
};

const testWithContent: typeof testEmptyPane = (label, ...args) => {
  testPaneWithStaticContent(`${label} - pane with static content`, ...args);
  testPaneWithDynamicContent(`${label} - pane with dynamic content`, ...args);
};

testAll(
  "should always render its container and wrapper",
  ({ queryByTestId }) => {
    expect(queryByTestId(testId)).not.toBeNull();
    expect(queryByTestId(contentTestId)).not.toBeNull();
  }
);

testAll("should be collapsed by default", ({ queryByTestId }) => {
  const wrapper = queryByTestId(testId);
  expect(wrapper).not.toBeNull();
  expect(wrapper as HTMLElement).toHaveAttribute("data-expanded", "false");
});

testPaneWithDynamicContent(
  "should update dynamic isCollapsed",
  async ({ queryByTestId }, { hover }) => {
    const wrapper = queryByTestId(testId);
    expect(wrapper).not.toBeNull();
    expect(wrapper as HTMLElement).toHaveAttribute("data-expanded", "false");
    await hover(wrapper as HTMLElement);
    await delay(300);
    expect(mockDynamicContent).toHaveBeenCalledTimes(3);
  }
);

testWithContent("should render content", ({ queryByText }) => {
  expect(queryByText("Pane content")).not.toBeNull();
});
