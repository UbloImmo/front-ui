import type { GenericInputProps, InputType } from "./Input.types";
import { describe, expect, mock } from "bun:test";
import { Input } from "./Input.component";
import { testComponentFactory } from "@/tests";

describe("Input", () => {
  const testGenericInput = testComponentFactory<GenericInputProps<InputType>>(
    "Generic",
    Input
  );
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore needed to check unintended behavior with no props
  testGenericInput({})(
    "should render an a text input when no props",
    ({ queryByTestId }) => {
      expect(queryByTestId("input-text")).toBeDefined();
    }
  );
  testGenericInput({ type: "text" })(
    "should render an text input",
    ({ queryByTestId }) => {
      expect(queryByTestId("input-text")).toBeDefined();
    }
  );
  testGenericInput({ type: "email" })(
    "should render an email input",
    ({ queryByTestId }) => {
      expect(queryByTestId("input-email")).toBeDefined();
    }
  );
  testGenericInput({ type: "password" })(
    "should render an passwordf input",
    ({ queryByTestId }) => {
      expect(queryByTestId("input-password")).toBeDefined();
    }
  );

  global.console.warn = mock(() => {});
  global.console.error = mock(() => {});

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore needed to check unintended behavior with wrong props
  testGenericInput({ type: "UNSUPPORTED" })(
    "should warn and render a text input",
    ({ queryByTestId }) => {
      expect(queryByTestId("input-text")).toBeDefined();
      expect(global.console.warn).toHaveBeenCalled();
    }
  );

  testGenericInput({ type: "number" })(
    "should error and not render a missing number input",
    ({ queryByTestId }) => {
      expect(queryByTestId("input-text")).toBeNull();
      expect(global.console.error).toHaveBeenCalled();
    }
  );
});
