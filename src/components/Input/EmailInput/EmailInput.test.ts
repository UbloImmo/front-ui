import { describe } from "bun:test";
import { componentTestFactory } from "src/tests";
import { EmailInput, defaultEmailInputProps } from "./EmailInput.component";

describe("Email Input", () => {
  componentTestFactory(
    "EmailInput",
    "input-email",
    EmailInput,
    defaultEmailInputProps
  );
});
