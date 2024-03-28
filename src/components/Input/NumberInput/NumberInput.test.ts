import { describe, expect, mock } from "bun:test";

import { testComponentFactory } from "@/tests";

import { NumberInput } from ".";

import type { NumberInputProps } from "./NumberInput.types";
import type { Nullable } from "@ubloimmo/front-util";

const testId = "input-number";

describe("Input", () => {
  const testTextInput = testComponentFactory<NumberInputProps>(
    "TextInput",
    NumberInput,
    {
      props: NumberInput.defaultProps,
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

  const onChange = mock((_value: Nullable<number>) => {});

  testTextInput({
    value: 15,
  })("should hold a given value", ({ queryByTestId }) => {
    const input = queryByTestId(testId) as HTMLInputElement;
    expect(input).toBeDefined();
    expect(input.value).toBe("15");
  });

  testTextInput({
    onChange,
  })(
    "should trigger onChange",
    async ({ queryByTestId }, { click, keyboard }) => {
      const input = queryByTestId(testId) as HTMLInputElement;
      await click(input);
      await keyboard("15");
      expect(onChange).toHaveBeenCalled();
    }
  );
});
