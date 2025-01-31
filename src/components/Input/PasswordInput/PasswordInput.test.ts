import { describe, expect, mock } from "bun:test";

import { testComponentFactory } from "@/tests";

import { PasswordInput } from ".";

import type { PasswordInputProps } from "./PasswordInput.types";
import type { Nullable } from "@ubloimmo/front-util";

const testId = "input-password";

describe("Input", () => {
  const testPasswordInput = testComponentFactory<PasswordInputProps>(
    "PasswordInput",
    PasswordInput,
    {
      props: PasswordInput.defaultProps,
      tests: [
        {
          name: "should render",
          test: ({ queryByTestId }) => {
            expect(queryByTestId(testId)).toBeDefined();
          },
        },
      ],
    }
  );

  testPasswordInput({
    value: "test",
  })("should hold a given value", ({ queryByTestId }) => {
    const input = queryByTestId(testId) as HTMLInputElement;
    expect(input).toBeDefined();
    expect(input.value).toBe("test");
  });

  const onChange = mock((_value: Nullable<string>) => {});

  testPasswordInput({
    onChange,
  })(
    "should trigger onChange",
    async ({ queryByTestId }, { click, keyboard }) => {
      onChange.mockReset();
      const input = queryByTestId(testId) as HTMLInputElement;
      await click(input);
      await keyboard("test");
      expect(onChange).toHaveBeenCalled();
    }
  );

  const onVisibilityChange = mock(() => {});
  testPasswordInput({
    onVisibilityChange,
  })(
    "should trigger onVisibilityChange",
    async ({ queryByTestId }, { click }) => {
      onVisibilityChange.mockReset();
      const control = queryByTestId("input-control");
      expect(control).toBeDefined();
      await click(control as HTMLElement);
      expect(onVisibilityChange).toHaveBeenCalled();
    }
  );
});
