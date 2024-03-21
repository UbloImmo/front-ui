import type { DefaultGenericInputProps, InputType } from "./Input.types";
import { describe } from "bun:test";
import { Input } from "./Input.component";
import { defaultTextInputProps } from "./TextInput";
import { componentTestFactory } from "../../tests";

describe("Input", () => {
  describe("Generic Input", () => {
    componentTestFactory("Text", "input-text", Input, {
      ...defaultTextInputProps,
      type: "text",
    } as DefaultGenericInputProps<InputType>);

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

    componentTestFactory(
      "No Type",
      "input-text",
      Input,
      {} as DefaultGenericInputProps<InputType>
    );

    componentTestFactory("Unknown Type", "input-text", Input, {
      type: "UNSUPPORTED",
    } as unknown as DefaultGenericInputProps<InputType>);
  });
});
