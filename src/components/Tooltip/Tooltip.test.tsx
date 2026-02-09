import { describe, expect, mock } from "bun:test";

import { Tooltip } from "./Tooltip.component";
import { Badge } from "../Badge";

import { testComponentFactory } from "@/tests";

import type { TooltipProps } from "./Tooltip.types";

const testId = "tooltip-wrapper";

const testTooltip = testComponentFactory<TooltipProps>("Tooltip", Tooltip);

describe("Tooltip", () => {
  global.console.error = mock(() => {});
  global.console.warn = mock(() => {});

  testTooltip({
    ...Tooltip.__DEFAULT_PROPS,
  })("should render with default props", ({ queryByTestId }) => {
    expect(queryByTestId(testId)).not.toBeNull();
  });

  testTooltip({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore needed to check error detection
    content: { foo: "bar" },
  })(
    "should warn if regular object is passed in content props",
    ({ queryByTestId }) => {
      expect(queryByTestId(testId)).not.toBeNull();
      expect(global.console.error).toHaveBeenCalled();
    }
  );

  testTooltip({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore needed to check error detection
    content: null,
  })("should warn if null is passed in content props", ({ queryByTestId }) => {
    expect(queryByTestId(testId)).not.toBeNull();
    expect(global.console.warn).toHaveBeenCalled();
  });

  testTooltip({
    ...Tooltip.__DEFAULT_PROPS,
    content: <Badge label="test" />,
  })("should render with JSX in content props", ({ queryByTestId }) => {
    expect(queryByTestId(testId)).not.toBeNull();
  });
});
