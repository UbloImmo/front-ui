import { TextInput, defaultTextInputProps } from "./TextInput.component";
import { componentTestFactory } from "../../../tests";
import { describe } from "bun:test";

describe("Input", () => {
  const testTextInput = componentTestFactory(
    "TextInput",
    "input-text",
    TextInput,
    defaultTextInputProps
  );
  testTextInput(
    {
      value: "test",
    },
    false
  );

  testTextInput({}, false);
});
