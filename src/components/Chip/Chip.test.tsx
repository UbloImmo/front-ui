import { VoidFn } from "@ubloimmo/front-util";
import { expect, mock, Mock } from "bun:test";

import { Chip } from "./Chip.component";
import { ChipProps } from "./Chip.types";

import { testComponentFactory } from "@/tests";

const testChip = testComponentFactory<ChipProps>("Chip", Chip);

const onClick = mock(() => {});

testChip({ ...Chip.defaultProps })("should render", ({ queryByTestId }) => {
  expect(queryByTestId("chip")).not.toBeNull();
});

testChip({
  ...Chip.defaultProps,
  onDelete: onClick,
})("should trigger onClick", async ({ queryByTestId }, { click }) => {
  expect(queryByTestId("chip")).not.toBeNull();
  expect(queryByTestId("chip-button")).not.toBeNull();
  await click(queryByTestId("chip-button") as HTMLButtonElement);
  expect(onClick).toHaveBeenCalled();
  onClick.mockReset();
});

global.console.warn = mock(() => {});

testChip({ ...Chip.defaultProps, label: "" })(
  "should warn if missing label in props",
  ({ queryByTestId }) => {
    expect(queryByTestId("chip")).not.toBeNull();
    expect(global.console.warn).toHaveBeenCalled();
    (global.console.warn as Mock<VoidFn>).mockReset();
  }
);

testChip({
  ...Chip.defaultProps,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore needed to check error detection
  icon: null,
})("should warn if missing icon in props", ({ queryByTestId }) => {
  expect(queryByTestId("chip")).not.toBeNull();
  expect(global.console.warn).toHaveBeenCalled();
  (global.console.warn as Mock<VoidFn>).mockReset();
});
