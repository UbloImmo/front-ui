import { describe, expect, mock } from "bun:test";

import { Input } from "./Input.component";
import { inputTypes } from "./Input.data";

import { testComponentFactory } from "@/tests";

import type { GenericInputProps } from "./Input.generic.types";
import type { InputType } from "./Input.types";

describe("Input", () => {
  const testGenericInput = testComponentFactory<GenericInputProps<InputType>>(
    "Generic",
    Input,
  );
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore needed to check unintended behavior with no props
  testGenericInput({})(
    "should render a text input when no props",
    async ({ findByTestId }) => {
      const input = await findByTestId("input-text");
      expect(input).not.toBeNull();
    },
  );
  inputTypes.forEach((type) => {
    testGenericInput({ type })(
      `should render a ${type} input`,
      async ({ findByTestId }) => {
        const input = await findByTestId(`input-${type}`);
        expect(input).not.toBeNull();
      },
    );
  });

  global.console.warn = mock(() => {});
  global.console.error = mock(() => {});

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore needed to check unintended behavior with wrong props
  testGenericInput({ type: "UNSUPPORTED" })(
    "should warn and render a text input",
    async ({ findByTestId }) => {
      const input = await findByTestId("input-text");
      expect(input).not.toBeNull();
      expect(global.console.warn).toHaveBeenCalled();
    },
  );
});
