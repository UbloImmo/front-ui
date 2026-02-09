import { expect } from "bun:test";

import { ContextInfoCard } from "./ContextInfoCard.component";

import { testComponentFactory } from "@/tests";

const testCard = testComponentFactory("ContextInfoCard", ContextInfoCard);
const defaultProps = ContextInfoCard.__DEFAULT_PROPS;
const testId = "context-info-card";

testCard(defaultProps)(
  "should render with default props",
  async ({ findByTestId }) => {
    expect(await findByTestId(testId)).not.toBeNull();
  }
);

testCard({ ...defaultProps, label: "Context Label" })(
  "should render with label",
  async ({ findByText }) => {
    expect(await findByText("[Title]")).not.toBeNull();
    expect(await findByText("Context Label")).not.toBeNull();
  }
);

testCard({
  ...defaultProps,
  description: "This is a description of the context",
})("should render with description", async ({ findByText }) => {
  expect(await findByText("[Title]")).not.toBeNull();
  expect(
    await findByText("This is a description of the context")
  ).not.toBeNull();
});

testCard({ ...defaultProps, details: "This is a details of the context" })(
  "should render with details",
  async ({ findByText }) => {
    expect(await findByText("[Title]")).not.toBeNull();
    expect(await findByText("This is a details of the context")).not.toBeNull();
  }
);

testCard({
  ...defaultProps,
  label: "Context Label",
  description: "This is a description of the context",
  details: "This is a details of the context",
})("should render with all optional props", async ({ findByText }) => {
  expect(await findByText("[Title]")).not.toBeNull();
  expect(await findByText("Context Label")).not.toBeNull();
  expect(
    await findByText("This is a description of the context")
  ).not.toBeNull();
  expect(await findByText("This is a details of the context")).not.toBeNull();
});

testCard({
  ...defaultProps,
  icon: {
    name: "InvoiceClock",
    color: "pending",
  },
})("should render with different icon", async ({ findByTestId }) => {
  expect(await findByTestId(testId)).not.toBeNull();
});
