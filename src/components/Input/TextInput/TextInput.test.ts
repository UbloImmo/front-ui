import { describe, it, expect } from "bun:test";
import { TextInput } from "./TextInput.component";

describe("Input/TextInput", () => {
  it("should be a component", () => {
    expect(TextInput).toBeDefined();
    expect(TextInput).toBeFunction();
  });
});
