import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it, mock } from "bun:test";

import { Icon } from "./Icon.component";
import { useIconSize } from "./Icon.utils.tsx";
import { ThemeProvider } from "../../themes";
import { GENERATED_ICON_NAMES } from "./__generated__/iconName.types.ts";

import { testHookFactory } from "@/tests";
import { isCssRem } from "@utils";

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

  it("should render", async () => {
    const { findByTestId } = render(
      <ThemeProvider>
        <Icon name="Circle" />
      </ThemeProvider>
    );
    const icon = await findByTestId("icon");
    expect(icon).toBeDefined();
  });

  it.todo("should warn when missing its `name` prop", async () => {
    // mock global console object to list to calls
    global.console.warn = mock(warnCopy);
    /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
    /* @ts-ignore Need to ignore in order to test missing prop */
    const { findByTestId } = render(<Icon />);
    const icon = await findByTestId("icon");
    expect(icon).toBeDefined();
    expect(global.console.warn).toHaveBeenCalled();
  });

  it("should support spacing labels as sizes", async () => {
    global.console.warn = mock(warnCopy);
    const { findAllByTestId } = render(
      <ThemeProvider>
        <Icon name="Circle" size="s-05" />
        <Icon name="Circle" size="s-4" />
        <Icon name="Circle" size="s-112353513153" />
      </ThemeProvider>
    );
    const icons = await findAllByTestId("icon");
    expect(global.console.warn).not.toHaveBeenCalled();
    expect(icons).toBeArrayOfSize(3);
  });

  it("should return null or render a fallback if provided with an unknown icon name", async () => {
    // mock global console object to list to calls
    global.console.warn = mock(warnCopy);
    /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
    /* @ts-ignore Need to ignore in order to test missing prop */
    const { findByTestId } = render(<Icon name="UNSUPPORTED ICON" />);

    expect(await findByTestId("icon-fallback")).not.toBeNull();
  });

  GENERATED_ICON_NAMES.forEach((iconName) => {
    it(`sould render the generated icon: "${iconName}"`, async () => {
      const { findByTestId } = render(<Icon name={iconName} />);
      const icon = await findByTestId("icon");
      expect(icon).toBeDefined();
      cleanup();
    });
  });

  testUseIconSize();

  afterEach(() => {
    cleanup();
    global.console.warn = warnCopy;
  });
});
