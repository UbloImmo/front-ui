import { describe, expect } from "bun:test";

import { testComponentFactory } from "@/tests";

import {
  FlexLayout,
  FlexRowLayout,
  FlexLayoutProps,
  FlexColumnLayout,
  FlexDirectionLayoutProps,
} from ".";

const testId = "flex";
const rowTestId = `${testId} ${testId}-row`;
const columnTestId = `${testId} ${testId}-column`;

describe("FlexLayout", () => {
  const testFlexInitial = testComponentFactory<FlexLayoutProps>(
    "Flex",
    FlexLayout
  );

  testFlexInitial({
    direction: "column",
    wrap: true,
    justify: "space-between",
  })("should pass props correctly", async ({ findByTestId }) => {
    const flexLayout = (await findByTestId(testId)) as HTMLElement;
    expect(flexLayout.className).toBe("flex column wrap");
  });

  testFlexInitial({
    direction: "column",
    reverse: true,
    justify: "stretch",
  })("should pass props correctly", async ({ findByTestId }) => {
    const flexLayout = (await findByTestId(testId)) as HTMLElement;
    expect(flexLayout.className).toInclude("flex");
    expect(flexLayout.className).toInclude("column");
    expect(flexLayout.className).toInclude("reverse");
  });

  const testFlexRow = testComponentFactory<FlexDirectionLayoutProps>(
    "FlexRow",
    FlexRowLayout
  );

  testFlexRow({
    gap: "1rem",
  })("should be rendered with direction as row", async ({ findByTestId }) => {
    const flexLayout = (await findByTestId(rowTestId)) as HTMLElement;
    expect(flexLayout.className).toBe("flex row");
  });

  testFlexRow({
    gap: "1rem",
    wrap: true,
    justify: "space-between",
  })("should pass props correctly", async ({ findByTestId }) => {
    const flexLayout = (await findByTestId(rowTestId)) as HTMLElement;
    expect(flexLayout.className).toBe("flex row wrap");
  });

  const testFlexColumn = testComponentFactory<FlexDirectionLayoutProps>(
    "FlexColumn",
    FlexColumnLayout
  );

  testFlexColumn({
    gap: "1rem",
    wrap: true,
    justify: "space-between",
  })(
    "should be rendered with direction as column",
    async ({ findByTestId }) => {
      const flexLayout = (await findByTestId(columnTestId)) as HTMLElement;
      expect(flexLayout.className).toBe("flex column wrap");
    }
  );

  testFlexColumn({
    gap: "1rem",
    wrap: true,
    align: "center",
  })("should pass props correctly", async ({ findByTestId }) => {
    const flexLayout = (await findByTestId(columnTestId)) as HTMLElement;
    expect(flexLayout.className).toBe("flex column wrap");
  });
});
