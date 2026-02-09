import { describe, expect, mock } from "bun:test";

import { SearchTextInput } from "./SearchTextInput.component";

import { testComponentFactory } from "@/tests";

import type { InputProps } from "../Input.types";
import type { Nullable } from "@ubloimmo/front-util";

const testId = "input-search-text";

describe("Input", () => {
  const testSearchTextInput = testComponentFactory<InputProps<"search-text">>(
    "SearchTextInput",
    SearchTextInput,
    {
      props: SearchTextInput.__DEFAULT_PROPS,
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

  testSearchTextInput({
    value: "test",
  })("should hold a given value", async ({ findByTestId }) => {
    const input = (await findByTestId(testId)) as HTMLInputElement;
    expect(input).not.toBeNull();
    expect(input.value).toBe("test");
  });

  testSearchTextInput({
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
