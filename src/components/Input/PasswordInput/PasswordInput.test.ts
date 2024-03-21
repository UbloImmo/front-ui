import { describe } from "bun:test";
import { componentTestFactory } from "src/tests";
import { PasswordInput, defaultPasswordInputProps } from ".";

describe("Input", () => {
  componentTestFactory(
    "PasswordInput",
    "input-password",
    PasswordInput,
    defaultPasswordInputProps
  );
  componentTestFactory(
    "PasswordInput Control",
    "input-control",
    PasswordInput,
    defaultPasswordInputProps
  );
});
