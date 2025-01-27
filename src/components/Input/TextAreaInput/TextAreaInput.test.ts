import { describe, expect, mock } from "bun:test";

import { TextAreaInput } from "./TextAreaInput.component";

import { testComponentFactory } from "@/tests";

import type { Nullable } from "@ubloimmo/front-util";

const testId = "input-textarea";
const testTextAreaInput = testComponentFactory("TextAreaInput", TextAreaInput);

describe("Input", () => {
  testTextAreaInput({})("should render", ({ queryByTestId }) => {
    expect(queryByTestId(testId)).not.toBeNull();
  });

  const onChange = mock((_value: Nullable<string>) => {});

  testTextAreaInput({
    onChange,
  })(
    "should trigger onChange",
    async ({ queryByTestId }, { click, keyboard }) => {
      onChange.mockReset();
      const input = queryByTestId(testId) as HTMLInputElement;
      await click(input);
      await keyboard("test");
      expect(onChange).toHaveBeenCalled();
    },
  );
});
