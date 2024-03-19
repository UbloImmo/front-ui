import { describe, it, expect, afterEach, mock } from "bun:test";
import { render, cleanup } from "@testing-library/react";
import { Icon } from "./Icon.component";
import * as generated from "./__generated__";
import { ThemeProvider } from "../../themes";
import { objectKeys } from "@ubloimmo/front-util";
import type { IconName } from ".";

// mock global console object to list to calls

describe("Icon", () => {
  it("should be a component", () => {
    expect(Icon).toBeDefined();
    expect(Icon).toBeFunction();
  });

  it("should render", () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <Icon name="Circle" />
      </ThemeProvider>
    );
    expect(getByTestId("icon")).toBeDefined();
  });

  it("should render with a warning when missing its `name` prop", () => {
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

  it("should render any generated icon", () => {
    objectKeys(generated).forEach((iconName: IconName) => {
      const { getByTestId } = render(
        <ThemeProvider>
          <Icon name={iconName} />
        </ThemeProvider>
      );
      expect(getByTestId("icon")).toBeDefined();
      cleanup();
    });
  });

  afterEach(() => {
    cleanup();
  });
});
