import { describe, it, expect, afterEach } from "bun:test";
import { render, cleanup } from "@testing-library/react";
import { Icon } from "./Icon.component";
import { ThemeProvider } from "../../themes";

describe("Icon", () => {
  it("should be a component", () => {
    expect(Icon).toBeDefined();
    expect(Icon).toBeFunction();
  });

  it.todo("should render even with missing props", () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <Icon />
      </ThemeProvider>
    );
    expect(getByTestId("icon")).toBeDefined();
  });

  afterEach(() => {
    cleanup();
  });
});
