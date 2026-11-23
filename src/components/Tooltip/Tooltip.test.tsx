import { cleanup, fireEvent, render, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, mock } from "bun:test";

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

  describe("fill", () => {
    afterEach(() => {
      cleanup();
    });

    it("should make the trigger take the full width when fill is true", () => {
      const { getByTestId } = render(
        <Tooltip content="Tip" fill>
          <button>Btn</button>
        </Tooltip>
      );
      expect(getByTestId(testId).className).toContain("fill");
    });

    it("should keep the trigger at its content width by default", () => {
      const { getByTestId } = render(
        <Tooltip content="Tip">
          <button>Btn</button>
        </Tooltip>
      );
      expect(getByTestId(testId).className).not.toContain("fill");
    });
  });

  describe("keyboard focus", () => {
    afterEach(() => {
      cleanup();
    });

    it("should open on focus & close on blur of a wrapped element", async () => {
      const { getByText, findByRole, queryByRole } = render(
        <Tooltip content="Tip">
          <button>Btn</button>
        </Tooltip>
      );
      expect(queryByRole("tooltip")).toBeNull();

      fireEvent.focus(getByText("Btn"));
      expect((await findByRole("tooltip")).textContent).toBe("Tip");

      fireEvent.blur(getByText("Btn"));
      await waitFor(() => expect(queryByRole("tooltip")).toBeNull());
    });

    it("should not take the focus when it opens", async () => {
      const { getByText, findByRole } = render(
        <Tooltip content="Tip">
          <button>Btn</button>
        </Tooltip>
      );
      const button = getByText("Btn");
      button.focus();
      await findByRole("tooltip");
      expect(document.activeElement).toBe(button);
    });
  });
});
