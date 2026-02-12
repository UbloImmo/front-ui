import { describe, expect, mock } from "bun:test";

import { TextInput } from "./TextInput.component";
import { InputProps } from "../Input.types";

import { testComponentFactory } from "@/tests";

import type { Nullable } from "@ubloimmo/front-util";

const testId = "input-text";

describe("Input", () => {
  const testTextInput = testComponentFactory<InputProps<"text">>(
    "TextInput",
    TextInput,
    {
      props: TextInput.__DEFAULT_PROPS,
      tests: [
        {
          name: "should render",
          test: async ({ findByTestId }) => {
            expect(await findByTestId(testId)).not.toBeNull();
          },
        },
      ],
    }
  );

  const onChange = mock((_value: Nullable<string>) => {});

  testTextInput({
    value: "test",
  })("should hold a given value", async ({ findByTestId }) => {
    const input = (await findByTestId(testId)) as HTMLInputElement;
    expect(input).not.toBeNull();
    expect(input.value).toBe("test");
  });

  testTextInput({
    onChange,
  })(
    "should trigger onChange",
    async ({ findByTestId }, { click, keyboard }) => {
      const input = (await findByTestId(testId)) as HTMLInputElement;
      await click(input);
      await keyboard("test");
      expect(onChange).toHaveBeenCalled();
    }
  );
});
