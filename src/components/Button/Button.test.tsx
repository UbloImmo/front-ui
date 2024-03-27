import { testComponentFactory } from "@/tests";
import { describe, expect, mock } from "bun:test";
import { ButtonProps } from ".";
import { Button } from "./Button.component";

describe("Button", () => {
  const testButton = testComponentFactory<ButtonProps>("Button", Button, {
    props: Button.defaultProps,
    tests: [
      {
        name: "should render",
        test: ({ queryByTestId }) => {
          expect(queryByTestId("button")).toBeDefined();
        },
      },
    ],
  });
  const onClick = mock(() => {});
  global.console.warn = mock(() => {});

  testButton({ label: null, icon: null })(
    "should not render",
    ({ queryByTestId }) => {
      expect(queryByTestId("button")).toBeNull();
      expect(global.console.warn).toHaveBeenCalled();
    }
  );

  testButton({ label: "test", onClick })(
    "should trigger onClick",
    async ({ queryByTestId }, { click }) => {
      onClick.mockReset();
      const button = queryByTestId("button") as HTMLButtonElement;
      await click(button);
      expect(onClick).toHaveBeenCalled();
    }
  );

  testButton({ label: "test", onClick, disabled: true })(
    "should not trigger onClick",
    async ({ queryByTestId }, { click }) => {
      onClick.mockReset();
      const button = queryByTestId("button") as HTMLButtonElement;
      await click(button);
      expect(onClick).not.toHaveBeenCalled();
    }
  );
});
