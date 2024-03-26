import { describe, expect, mock } from "bun:test";
import { fireEvent } from "@testing-library/react";
import { testComponentFactory } from "@/tests";
import { TextInput } from ".";
import { InputProps } from "..";
import type { Nullable } from "@ubloimmo/front-util";

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
            expect(queryByTestId("input-text")).toBeDefined();
          },
        },
      ],
    }
  );

  const onChange = mock((_value: Nullable<string>) => {});

  testTextInput({
    value: "test",
  })("should hold a given value", ({ queryByTestId }) => {
    const input = queryByTestId("input-text") as HTMLInputElement;
    expect(input).toBeDefined();
    expect(input.value).toBe("test");
  });

  testTextInput({
    onChange,
  })("should trigger onChange", ({ queryByTestId }) => {
    const input = queryByTestId("input-text") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "test" } });
    expect(onChange).toHaveBeenCalledWith("test");
  });
});
