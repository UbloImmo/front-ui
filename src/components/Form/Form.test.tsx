import { expect } from "bun:test";
import { z } from "zod";

import { Form } from "./Form.component";
import { Button } from "../Button";
import { DialogProvider, useDialog } from "../Dialog";

import { testComponentFactory } from "@/tests";

import type { FormData } from "./Form.types";

const FORM_MODAL_TEST_REF = "FORM_MODAL_TEST_REF";

const testForm = testComponentFactory("Form", Form);
const testFormAsModal = testComponentFactory(
  "Form",
  Form,
  {
    props: {
      ...Form.defaultProps,
      asModal: { size: "s", reference: FORM_MODAL_TEST_REF },
    },
    tests: [],
  },
  ({ children }) => {
    const { open } = useDialog(FORM_MODAL_TEST_REF);
    return (
      <DialogProvider portalRoot="#dialog-root">
        {children}
        <Button onClick={open} label="Test open form in modal" />
      </DialogProvider>
    );
  }
);

const testSchema = z.object({
  name: z.string(),
  age: z.number(),
  phone: z.string().optional(),
  isTested: z.boolean(),
});

const testFormContent = [
  {
    type: "text",
    source: "name",
    name: "name",
    label: "Name",
  },
  {
    type: "number",
    source: "age",
    name: "age",
    label: "Age",
  },
  {
    type: "phone",
    source: "phone",
    name: "phone",
    label: "Phone",
    assistiveText: "This is optional",
  },
];

type TestSchema = z.output<typeof testSchema>;

const testData: FormData<TestSchema> = {
  name: "The Tester",
  age: 25,
  isTested: true,
};

testForm({ ...Form.defaultProps })("should render", ({ queryByTestId }) => {
  expect(queryByTestId("form")).not.toBeNull();
});

testForm({ ...Form.defaultProps, embedded: true })(
  "should render as embedded",
  ({ queryByTestId }) => {
    expect(queryByTestId("form")).not.toBeNull();
  }
);

testForm({
  ...Form.defaultProps,
  query: () => testData,
  schema: testSchema,
  content: testFormContent,
  defaultValues: testData,
})(
  "should render with provided data",
  ({ queryByTestId, queryAllByTestId }) => {
    expect(queryByTestId("form")).not.toBeNull();

    const labels = queryAllByTestId("text input-label-text");
    expect(labels).toHaveLength(3);
    expect(labels[0].textContent).toBe("Name");
    expect(labels[1].textContent).toBe("Age");
    expect(labels[2].textContent).toBe("Phone");

    const data = queryAllByTestId("flex flex-row form-field-display-value");
    expect(data).toHaveLength(3);
    expect(data[0].textContent).toBe("The Tester");
    expect(data[1].textContent).toBe("25");
    expect(data[2].textContent).toBe("—");
  }
);

testFormAsModal({ ...Form.defaultProps })(
  "should render as modal when triggered",
  async ({ queryByTestId }) => {
    const openModalButton = queryByTestId("button");
    expect(openModalButton).not.toBeNull();
    expect(openModalButton?.textContent).toBe("Test open form in modal");
    await openModalButton?.click();

    expect(queryByTestId("form")).not.toBeNull();
  }
);
