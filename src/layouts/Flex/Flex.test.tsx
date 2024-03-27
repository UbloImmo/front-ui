import { describe, expect } from "bun:test";

import { testComponentFactory } from "@/tests";

import {
  FlexLayout,
  FlexRowLayout,
  FlexLayoutProps,
  FlexColumnLayout,
  FlexDirectionLayoutProps,
} from ".";

describe("FlexLayout", () => {
  const testFlexInitial = testComponentFactory<FlexLayoutProps>(
    "Flex",
    FlexLayout
  );

  testFlexInitial({
    direction: "column",
    wrap: true,
    justify: "space-between",
  })("should pass props correctly", ({ queryByTestId }) => {
    const flexLayout = queryByTestId("flex") as HTMLElement;
    const flexStyle = flexLayout && window.getComputedStyle(flexLayout);
    expect(flexStyle.flexDirection).toBe("column");
    expect(flexStyle.flexWrap).toBe("wrap");
    expect(flexStyle.justifyContent).toBe("space-between");
  });

  testFlexInitial({
    direction: "column",
    reverse: true,
    justify: "stretch",
  })("should pass props correctly", ({ queryByTestId }) => {
    const flexLayout = queryByTestId("flex") as HTMLElement;
    const flexStyle = flexLayout && window.getComputedStyle(flexLayout);
    expect(flexStyle.flexDirection).toBe("column-reverse");
    expect(flexStyle.justifyContent).toBe("flex-stretch");
  });

  const testFlexRow = testComponentFactory<FlexDirectionLayoutProps>(
    "FlexRow",
    FlexRowLayout
  );

  testFlexRow({
    gap: "1rem",
  })("should be rendered with direction as row", ({ queryByTestId }) => {
    const flexLayout = queryByTestId("flex") as HTMLElement;
    const flexStyle = flexLayout && window.getComputedStyle(flexLayout);
    expect(flexStyle.flexDirection).toBe("row");
  });

  testFlexRow({
    gap: "1rem",
    wrap: true,
    justify: "space-between",
  })("should pass props correctly", ({ queryByTestId }) => {
    const flexLayout = queryByTestId("flex") as HTMLElement;
    const flexStyle = flexLayout && window.getComputedStyle(flexLayout);
    expect(flexStyle.flexWrap).toBe("wrap");
    expect(flexStyle.gap).toBe("1rem");
    expect(flexStyle.justifyContent).toBe("space-between");
  });

  const testFlexColumn = testComponentFactory<FlexDirectionLayoutProps>(
    "FlexColumn",
    FlexColumnLayout
  );

  testFlexColumn({
    gap: "1rem",
    wrap: true,
    justify: "space-between",
  })("should be rendered with direction as column", ({ queryByTestId }) => {
    const flexLayout = queryByTestId("flex") as HTMLElement;
    const flexStyle = flexLayout && window.getComputedStyle(flexLayout);
    expect(flexStyle.flexDirection).toBe("column");
  });

  testFlexColumn({
    gap: "1rem",
    wrap: true,
    align: "center",
  })("should pass props correctly", ({ queryByTestId }) => {
    const flexLayout = queryByTestId("flex") as HTMLElement;
    const flexStyle = flexLayout && window.getComputedStyle(flexLayout);
    expect(flexStyle.flexWrap).toBe("wrap");
    expect(flexStyle.alignItems).toBe("center");
  });
});
