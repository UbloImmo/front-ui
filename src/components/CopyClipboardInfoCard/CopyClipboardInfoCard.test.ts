import { expect } from "bun:test";

import { CopyClipboardInfoCard } from "./CopyClipboardInfoCard.component";

import { testComponentFactory } from "@/tests";

const testCard = testComponentFactory(
  "CopyClipboardInfoCard",
  CopyClipboardInfoCard,
);

const testEmpty = testCard({ icon: "Activity" });

testEmpty("should render", async ({ findByTestId }) => {
  expect(await findByTestId("copy-clipboard-info-card")).not.toBeNull();
});

testEmpty("should render empty state", async ({ findByTestId, findByText }) => {
  expect(await findByTestId("copy-clipboard-info-card")).not.toBeNull();
  expect(await findByText("Information non renseignée")).not.toBeNull();
});

testCard({ icon: "Activity", info: "Copy me" })(
  "should render info",
  async ({ findByTestId, findByText }) => {
    expect(await findByTestId("copy-clipboard-info-card")).not.toBeNull();
    expect(await findByText("Copy me")).not.toBeNull();
  },
);
