import { VoidFn } from "@ubloimmo/front-util";
import { expect, mock, Mock } from "bun:test";

import { Chip } from "./Chip.component";
import { ChipProps } from "./Chip.types";

import { testComponentFactory } from "@/tests";

const testId = "chip";

const testChip = testComponentFactory<ChipProps>("Chip", Chip);

const onDelete = mock(() => {});

testChip({ ...Chip.__DEFAULT_PROPS })("should render", ({ queryByTestId }) => {
  expect(queryByTestId(testId)).not.toBeNull();
});

testChip({
  ...Chip.__DEFAULT_PROPS,
  onDelete,
})("should trigger onClick", async ({ queryByTestId }, { click }) => {
  expect(queryByTestId(testId)).not.toBeNull();
  expect(queryByTestId("chip-button")).not.toBeNull();
  await click(queryByTestId("chip-button") as HTMLButtonElement);
  expect(onDelete).toHaveBeenCalled();
  onDelete.mockReset();
});

global.console.warn = mock(() => {});

testChip({ ...Chip.__DEFAULT_PROPS, label: "" })(
  "should warn if missing label in props",
  ({ queryByTestId }) => {
    expect(queryByTestId(testId)).not.toBeNull();
    expect(global.console.warn).toHaveBeenCalled();
    (global.console.warn as Mock<VoidFn>).mockReset();
  }
);
