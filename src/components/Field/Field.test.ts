import { expect } from "bun:test";

import { Field } from "./Field.component";
import { inputTypes } from "../Input/Input.data";

import { testComponentFactory } from "@/tests";

const testId = "field";
const labelTestId = "field-label";
const assistiveTextTestId = "field-assistive-text";

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
