import { expect } from "bun:test";

import { Divider } from "./Divider.component";

import { testComponentFactory } from "@/tests";

const testId = "divider";
const lineTestId = "divider-line";
const labelTestId = "divider-label";

const testDivider = testComponentFactory("Divider", Divider);

testDivider(Divider.__DEFAULT_PROPS)(
  "should render",
  async ({ findByTestId }) => {
    expect(await findByTestId(testId)).not.toBeNull();
    expect(await findByTestId(lineTestId)).not.toBeNull();
  }
);

testDivider({
  label: "Divider label",
})("should render a label", async ({ findByTestId }) => {
  expect(await findByTestId(testId)).not.toBeNull();
  expect(await findByTestId(labelTestId)).not.toBeNull();
  expect(await findByTestId(lineTestId)).not.toBeNull();
});
