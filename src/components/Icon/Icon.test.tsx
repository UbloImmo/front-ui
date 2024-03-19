import { describe, it, expect, afterEach, mock } from "bun:test";
import { render, cleanup } from "@testing-library/react";
import { Icon } from "./Icon.component";
import { ThemeProvider } from "../../themes";

// mock global console object to list to calls

describe("Icon", () => {
  it("should be a component", () => {
    expect(Icon).toBeDefined();
    expect(Icon).toBeFunction();
  });

  it.todo("should render", () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <Icon name="Circle" />
      </ThemeProvider>
    );
    const icon = getByTestId("icon");
    expect(getByTestId("icon")).toBeDefined();
    const iconStyle = window.getComputedStyle(icon);
    expect(iconStyle).toBeObject();
  });

  it.todo("should render with a warning when missing its `name` prop", () => {
    // mock global console object to list to calls
    global.console.warn = mock(global.console.warn);
    const { getByTestId } = render(
      <ThemeProvider>
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/* @ts-ignore Need to ignore in order to test missing prop */}
        <Icon />
      </ThemeProvider>
    );
    expect(global.console.warn).toHaveBeenCalled();
    expect(getByTestId("icon")).toBeDefined();
  });

  afterEach(() => {
    cleanup();
  });
});
