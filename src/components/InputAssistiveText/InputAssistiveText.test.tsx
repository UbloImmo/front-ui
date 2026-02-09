import { Mock, describe, expect, mock } from "bun:test";

import { InputAssistiveText } from "./InputAssistiveText.component";
import { InputAssistiveTextProps } from "./InputAssistiveText.types";

import { testComponentFactory } from "@/tests";

const testId = "assistive-text";

describe("InputAssistiveText", () => {
  const testInputAssistiveText = testComponentFactory<InputAssistiveTextProps>(
    "InputAssistiveText",
    InputAssistiveText,
    {
      props: InputAssistiveText.__DEFAULT_PROPS,
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

  global.console.warn = mock(() => {});

  testInputAssistiveText({ assistiveText: null, errorText: null })(
    "should render null and warn",
    ({ queryByTestId }) => {
      const nullText = queryByTestId(testId);
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
  })("should render the error text correctly", async ({ findByTestId }) => {
    const errorText = (await findByTestId("assistive-text")) as HTMLSpanElement;
    expect(errorText).not.toBeNull();
    expect(errorText.textContent).toBe("this is an error test");
  });
});
