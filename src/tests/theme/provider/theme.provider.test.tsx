import React from "react";
import { render, cleanup } from "@testing-library/react";
import { describe, it, expect, afterEach } from "bun:test";

describe("theme provider", async () => {
  const { ThemeProvider } = await import("../../../themes");

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

  afterEach(() => {
    cleanup();
  });
});
