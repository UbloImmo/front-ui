import { Mock, describe, expect, mock } from "bun:test";

import { InputAssistiveText } from "./InputAssistiveText.component";
import { InputAssistiveTextProps } from "./InputAssistiveText.types";

import { testComponentFactory } from "@/tests";

describe("InputAssistiveText", () => {
  const testInputAssistiveText = testComponentFactory<InputAssistiveTextProps>(
    "InputAssistiveText",
    InputAssistiveText,
    {
      props: InputAssistiveText.defaultProps,
      tests: [
        {
          name: "should render",
          test: ({ queryByTestId }) => {
            expect(queryByTestId("assistive-text")).toBeDefined();
          },
        },
      ],
    }
  );

  global.console.warn = mock(() => {});

  testInputAssistiveText({ assistiveText: null, errorText: null })(
    "should render null and warn",
    ({ queryByTestId }) => {
      const nullText = queryByTestId("assistive-text");
      expect(nullText).toBeNull();
      expect(global.console.warn).toHaveBeenCalled();
      (global.console.warn as Mock<(_msg: unknown) => void>).mockReset();
    }
  );

  testInputAssistiveText({ errorText: null, error: true })(
    "should warn if error is true and no errorText is provided",
    () => {
      expect(global.console.warn).toHaveBeenCalled();
      (global.console.warn as Mock<(_msg: unknown) => void>).mockReset();
    }
  );

  testInputAssistiveText({
    assistiveText: null,
    errorText: "this is an error test",
    error: true,
  })("should render the error text correctly", ({ queryByTestId }) => {
    const errorText = queryByTestId("assistive-text") as HTMLSpanElement;
    expect(errorText).toBeDefined();
    expect(errorText.textContent).toBe("this is an error test");
  });
});
