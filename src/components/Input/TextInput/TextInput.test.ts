import { describe, expect, mock } from "bun:test";
import { testComponentFactory } from "@/tests";
import { TextInput } from ".";
import { InputProps } from "..";
import type { Nullable } from "@ubloimmo/front-util";

const testId = "input-text";

describe("Input", () => {
  const testTextInput = testComponentFactory<InputProps<"text">>(
    "TextInput",
    TextInput,
    {
      props: TextInput.defaultProps,
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

  const onChange = mock((_value: Nullable<string>) => {});

  testTextInput({
    value: "test",
  })("should hold a given value", ({ queryByTestId }) => {
    const input = queryByTestId(testId) as HTMLInputElement;
    expect(input).toBeDefined();
    expect(input.value).toBe("test");
  });

  testTextInput({
    onChange,
  })(
    "should trigger onChange",
    async ({ queryByTestId }, { click, keyboard }) => {
      const input = queryByTestId(testId) as HTMLInputElement;
      await click(input);
      await keyboard("test");
      expect(onChange).toHaveBeenCalled();
    }
  );
});
