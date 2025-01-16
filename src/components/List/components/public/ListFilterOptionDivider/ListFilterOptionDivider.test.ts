import { expect, mock } from "bun:test";

import { ListFilterOptionDivider } from "./ListFilterOptionDivider.component";

import { testComponentFactory } from "@/tests";

const testComponent = testComponentFactory(
  "ListFilterOptionDivider",
  ListFilterOptionDivider
);

const testId = "list-filter-option-divider";
const labelTestId = "list-filter-option-divider-label";

const withLabel = testComponent({
  label: "Test label",
});

withLabel("should render", ({ queryByTestId }) => {
  expect(queryByTestId(testId)).not.toBeNull();
  expect(queryByTestId(labelTestId)).not.toBeNull();
});

global.console.warn = mock(() => {});

// @ts-expect-error needed to test the component without a label
const withoutLabel = testComponent({});

withoutLabel("should render", ({ queryByTestId }) => {
  expect(queryByTestId(testId)).not.toBeNull();
  expect(queryByTestId(labelTestId)).not.toBeNull();
});

withoutLabel("should warn", () => {
  expect(global.console.warn).toHaveBeenCalled();
});
