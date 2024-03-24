import { describe, it, expect, afterEach, mock } from "bun:test";
import { render, renderHook, cleanup } from "@testing-library/react";
import { Icon } from "./Icon.component";
import * as generated from "./__generated__";
import { ThemeProvider } from "../../themes";
import { objectKeys, type VoidFn } from "@ubloimmo/front-util";
import type { IconName, IconProps } from ".";
import { useIconSize } from "./Icon.utils";

const warnCopy = global.console.warn;

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

  it("should warn when missing its `name` prop", () => {
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

  describe("useIconSize", () => {
    it("should be a function", () => {
      expect(useIconSize).toBeDefined();
      expect(useIconSize).toBeFunction();
    });

    it("should be a valid react hook", () => {
      const { result } = renderHook(() =>
        useIconSize(undefined, global.console.warn)
      );
      expect(result.current).toBeString();
    });

    it("should warn & return 1rem warn when provided with an invalid size", () => {
      const warnFn = mock((_: unknown) => {});
      const { result, rerender } = renderHook(
        (props: { size?: IconProps["size"]; warn?: VoidFn<[unknown]> } = {}) =>
          useIconSize(props?.size, props?.warn ?? warnFn)
      );
      expect(result.current).toBe("1rem");
      expect(warnFn).toHaveBeenCalledTimes(1);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore Need to ignore in order to test missing prop
      rerender({ size: "s-2s", warn: warnFn });
      expect(result.current).toBe("1rem");
      expect(warnFn).toHaveBeenCalledTimes(2);
      rerender({ size: "s-1.5", warn: warnFn });
      expect(result.current).toBe("1rem");
      expect(warnFn).toHaveBeenCalledTimes(3);
    });

    it("should return a rem size if when provided with a valid spacing label", () => {
      const { result, rerender } = renderHook((size?: IconProps["size"]) =>
        useIconSize(size, console.warn)
      );
      rerender("s-40");
      expect(result.current).toBe("10rem");
    });

    it("should convert pixels to rems", () => {
      const { result, rerender } = renderHook((size?: IconProps["size"]) =>
        useIconSize(size, console.warn)
      );
      rerender("32px");
      expect(result.current).toBe("2rem");
    });
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

  afterEach(() => {
    cleanup();
    global.console.warn = warnCopy;
  });
});
