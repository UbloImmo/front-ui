import React from "react";
import { render, cleanup } from "@testing-library/react";
import { fakeFetchFactory } from "@ubloimmo/front-util";
import { describe, it, expect, afterEach, mock } from "bun:test";
import {
  ThemeProvider,
  getThemeOverrides,
  defaultOrganizationData,
} from "../../../themes";

describe("theme provider", () => {
  it("should be a react component", () => {
    expect(ThemeProvider).toBeDefined();
    expect(ThemeProvider).toBeFunction();
  });

  it("should render its children", () => {
    const { getByText } = render(
      <ThemeProvider>
        <span>Test</span>
      </ThemeProvider>
    );
    expect(getByText("Test")).toBeDefined();
  });

  it("should support theme overrides", () => {
    const getOverrides = mock(
      async () =>
        await getThemeOverrides(
          await fakeFetchFactory({
            organization: {
              ...defaultOrganizationData,
              name: "ublo",
              palette: {
                base: "#5a37d8",
                dark: "#3c27a3",
                light: "#e9e6f8",
              },
            },
          })
        )
    );
    const { getByText } = render(
      <ThemeProvider getOverridesFn={getOverrides}>
        <span>Test</span>
      </ThemeProvider>
    );
    expect(getByText("Test")).toBeDefined();
  });

  afterEach(() => {
    cleanup();
  });
});
