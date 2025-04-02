import { expect } from "bun:test";

import { Field } from "./Field.component";
import { inputTypes } from "../Input/Input.data";

import { testComponentFactory } from "@/tests";

const testId = "field";
const labelTestId = "field-label";
const assistiveTextTestId = "field-assistive-text";
const suffixTestId = "field-suffix";

const testField = testComponentFactory("Field", Field);

const testEachFieldType = () => {
  inputTypes.forEach((type) => {
    testField({
      type,
      label: `Field (${type})`,
      assistiveText: "Field assistive text",
    })("should render", async ({ findByTestId }) => {
      const inputTestId = `input-${type} field-input`;

      const field = await findByTestId(testId);
      const label = await findByTestId(labelTestId);
      const input = await findByTestId(inputTestId);
      const assistiveText = await findByTestId(assistiveTextTestId);

      expect(field).not.toBeNull();
      expect(label).not.toBeNull();
      expect(input).not.toBeNull();
      expect(assistiveText).not.toBeNull();
    });
  });
};

testEachFieldType();

testField({
  type: "text",
  label: "Field with suffix",
  suffix: "[suffix]",
})("should render with suffix", async ({ findByTestId }) => {
  const field = await findByTestId(testId);
  const suffix = await findByTestId(suffixTestId);

  expect(field).not.toBeNull();
  expect(suffix).not.toBeNull();
  expect(suffix.textContent).toBe("[suffix]");
});

testField({
  type: "text",
  label: "Field without suffix",
  suffix: null,
})(
  "should render without suffix when suffix is null",
  async ({ findByTestId, queryByTestId }) => {
    const field = await findByTestId(testId);
    const suffix = queryByTestId(suffixTestId);

    expect(field).not.toBeNull();
    expect(suffix).toBeNull();
  }
);
