import { expect } from "bun:test";

import { Field } from "./Field.component";
import { inputTypes } from "../Input/Input.data";

import { testComponentFactory } from "@/tests";

const testId = "flex flex-column field";
const labelTestId = "input-label field-label";

const testField = testComponentFactory("Field", Field);

const testEachFieldType = () => {
  inputTypes.forEach((type) => {
    testField({ type, label: `Field (${type})` })(
      "should render",
      async ({ findByTestId }) => {
        const inputTestId = `input-${type} field-input`;
        const field = await findByTestId(testId);
        const label = await findByTestId(labelTestId);
        const input = await findByTestId(inputTestId);
        expect(field).not.toBeNull();
        expect(label).not.toBeNull();
        expect(input).not.toBeNull();
      }
    );
  });
};

testEachFieldType();
