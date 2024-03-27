import { cleanup, render } from "@testing-library/react";
import { objectKeys } from "@ubloimmo/front-util";
import { afterEach, describe, expect, it, mock } from "bun:test";

import * as generated from "./__generated__";
import { Icon } from "./Icon.component";
import { useIconSize } from "./Icon.utils";
import { ThemeProvider } from "../../themes";

import { testHookFactory } from "@/tests";
import { isCssRem } from "@utils";

import type { IconName } from ".";

const warnCopy = global.console.warn;

const testUseIconSize = () => {
  type Hook = typeof useIconSize;
  const testHook = testHookFactory<Parameters<Hook>, ReturnType<Hook>, Hook>(
    "useIconSize",
    useIconSize
  );

  const warn = mock((_: unknown) => {});

  testHook("2rem", warn)("should return initial rem", (size) => {
    expect(warn).not.toHaveBeenCalled();
    expect(size).toBeString();
    expect(size).toBe("2rem");
    expect(isCssRem(size)).toBeTrue();
    warn.mockReset();
  });

  testHook(1234, warn)("should convert numbers to rem", (size) => {
    expect(warn).not.toHaveBeenCalled();
    expect(size).toBeString();
    expect(isCssRem(size)).toBeTrue();
    expect(size).toBe("1234rem");
    warn.mockReset();
  });

  testHook("24px", warn)("should convert px to rem", (size) => {
    expect(warn).not.toHaveBeenCalled();
    expect(size).toBeString();
    expect(isCssRem(size)).toBeTrue();
    expect(size).toBe("1.5rem");
    warn.mockReset();
  });

  testHook("s-40", warn)("should convert spacings to rem", (size) => {
    expect(warn).not.toHaveBeenCalled();
    expect(size).toBeString();
    expect(isCssRem(size)).toBeTrue();
    expect(size).toBe("10rem");
    warn.mockReset();
  });

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore Need to ignore in order to test missing prop
  testHook("s-1", undefined)("should run even with no warn fn", (size) => {
    expect(size).toBeString();
    expect(isCssRem(size)).toBeTrue();
    expect(size).toBe("0.25rem");
  });

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore Need to ignore in order to test missing prop
  testHook("s-5.6", warn)("should floor decimal spacing labels", (size) => {
    expect(warn).toHaveBeenCalled();
    expect(size).toBeString();
    expect(isCssRem(size)).toBeTrue();
    expect(size).toBe("1.25rem"); // s-5 = 20px = 1.25rem
    warn.mockReset();
  });

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore Need to ignore in order to test missing prop
  testHook("s-5s", warn)(
    "should return 1rem for an invalid spacing label",
    (size) => {
      expect(warn).toHaveBeenCalled();
      expect(size).toBeString();
      expect(isCssRem(size)).toBeTrue();
      expect(size).toBe("1rem"); // s-5 = 20px = 1.25rem
      warn.mockReset();
    }
  );
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore Need to ignore in order to test missing prop
  testHook(undefined, warn)("should return 1rem by default", (size) => {
    expect(warn).toHaveBeenCalled();
    expect(size).toBeString();
    expect(isCssRem(size)).toBeTrue();
    expect(size).toBe("1rem");
    warn.mockReset();
  });
};

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

  it.todo("should warn when missing its `name` prop", () => {
    // mock global console object to list to calls
    global.console.warn = mock(warnCopy);
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

  it("should support spacing labels as sizes", () => {
    global.console.warn = mock(warnCopy);
    const { getAllByTestId } = render(
      <ThemeProvider>
        <Icon name="Circle" size="s-05" />
        <Icon name="Circle" size="s-4" />
        <Icon name="Circle" size="s-112353513153" />
      </ThemeProvider>
    );
    expect(global.console.warn).not.toHaveBeenCalled();
    expect(getAllByTestId("icon")).toBeArrayOfSize(3);
  });

  it("should return null if provided with an unknown icon name", () => {
    // mock global console object to list to calls
    global.console.warn = mock(warnCopy);
    const { getByTestId } = render(
      <ThemeProvider>
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/* @ts-ignore Need to ignore in order to test missing prop */}
        <Icon name="UNSUPPORTED ICON" />
      </ThemeProvider>
    );
    expect(() => getByTestId("icon")).toThrow();
    expect(global.console.warn).toHaveBeenCalled();
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

  testUseIconSize();

  afterEach(() => {
    cleanup();
    global.console.warn = warnCopy;
  });
});
