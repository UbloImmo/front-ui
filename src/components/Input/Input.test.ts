import { describe, expect, mock } from "bun:test";
import {
  Input,
  defaultTextInputProps,
  type DefaultGenericInputProps,
  type InputType,
} from ".";
import { componentTestFactory } from "../../utils";

describe("Input", () => {
  describe("Generic Input", () => {
    componentTestFactory("Text", "input-text", Input, {
      ...defaultTextInputProps,
      type: "text",
    } as DefaultGenericInputProps<InputType>);

    global.console.error = mock(() => {});
    componentTestFactory(
      "Number",
      "input-number",
      Input,
      {
        ...defaultTextInputProps,
        type: "number",
      } as DefaultGenericInputProps<InputType>,
      true
    );
    expect(global.console.error).toHaveBeenCalled();

    global.console.warn = mock(() => {});
    componentTestFactory(
      "No Type",
      "input-text",
      Input,
      {} as DefaultGenericInputProps<InputType>
    );

    componentTestFactory("Unknown Type", "input-text", Input, {
      type: "UNSUPPORTED",
    } as unknown as DefaultGenericInputProps<InputType>);
    expect(global.console.warn).toHaveBeenCalledTimes(2);
  });
});
