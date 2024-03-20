import { TextInput, defaultTextInputProps } from "./TextInput.component";
import { componentTestFactory } from "../../../utils";

const testTextInput = componentTestFactory(
  "Input/TextInput",
  "input-text",
  TextInput,
  defaultTextInputProps
);

testTextInput({
  value: "test",
});
