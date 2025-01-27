import { expect, mock, type Mock } from "bun:test";

import { ListFilterOptionChip } from "./ListFilterOptionChip.component";

import {
  filterOptionData,
  filterOptionMatch,
  type FilterOption,
} from "@/components/List/modules";
import { testComponentFactory } from "@/tests";

import type { VoidFn } from "@ubloimmo/front-util";

type MockData = { value: number };

const testComponent = testComponentFactory(
  "ListFilterOptionChip",
  ListFilterOptionChip<MockData>,
);

const testId = "list-filter-option-chip";
const deleteButtonTestId = "chip-button";

const mockOptionData = filterOptionData(
  "My option",
  filterOptionMatch<MockData>("value", "=", 0),
);

const select = mock(() => {});
const unselect = mock(() => {});
global.console.error = mock(() => {});

const mockOption: FilterOption<MockData> = {
  ...mockOptionData,
  select,
  unselect,
};

// @ts-expect-error needed to test error behavior
const withoutData = testComponent({});

withoutData("should not render", ({ queryByTestId }) => {
  expect(queryByTestId(testId)).toBeNull();
  (global.console.error as Mock<VoidFn>).mockReset();
});

withoutData("should log an error", ({ queryByTestId }) => {
  expect(queryByTestId(testId)).toBeNull();
  expect(global.console.error).toHaveBeenCalled();
  (global.console.error as Mock<VoidFn>).mockReset();
});

const withOption = testComponent({
  filterOption: mockOption,
});

withOption("should render", ({ queryByTestId }) => {
  expect(queryByTestId(testId)).not.toBeNull();
});

withOption("should be enabled", ({ queryByTestId }) => {
  expect(queryByTestId(testId)).not.toBeNull();
  expect(queryByTestId(deleteButtonTestId)).not.toBeNull();
});

const withDisabledOption = testComponent({
  filterOption: {
    ...mockOption,
    disabled: true,
  },
});

withDisabledOption("should be disabled", ({ queryByTestId }) => {
  expect(queryByTestId(testId)).not.toBeNull();
  expect(queryByTestId(deleteButtonTestId)).toBeNull();
});

const withDisabledFilter = testComponent({
  filterOption: mockOption,
  filterDisabled: true,
});

withDisabledFilter("should be disabled", ({ queryByTestId }) => {
  expect(queryByTestId(testId)).not.toBeNull();
  expect(queryByTestId(deleteButtonTestId)).toBeNull();
});

withOption("should be unselectable", async ({ queryByTestId }, { click }) => {
  expect(queryByTestId(testId)).not.toBeNull();
  expect(queryByTestId(deleteButtonTestId)).not.toBeNull();
  await click(queryByTestId(deleteButtonTestId) as HTMLButtonElement);
  expect(unselect).toHaveBeenCalled();
  unselect.mockReset();
});
