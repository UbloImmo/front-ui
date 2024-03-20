import React from "react";
import { describe, it, beforeEach, expect, afterEach } from "bun:test";
import { StaticIcon } from "./StaticIcon.component";
import { cleanup, render, screen } from "@testing-library/react";
import { StaticIconProps } from "./StaticIcon.types";

describe("StaticIcon Component", () => {
  const mockProps: StaticIconProps = {
    color: "primary",
    size: "s",
    stroke: false,
    name: "Square",
  };

  beforeEach(() => render(<StaticIcon {...mockProps} />));

  it("renders StaticIcon", () => {
    const staticIcon = screen.getByTestId("static-icon");
    expect(staticIcon).toBeDefined();
  });

  it.todo("render the corresponding backgroundcolor to color props", () => {
    const staticIcon = screen.getByTestId("static-icon");
    const staticIconStyle = window.getComputedStyle(staticIcon).backgroundColor;
    expect(staticIconStyle).toBe("var(--primary-light)");
  });

  it("render the corresponding stroke style to stroke props", () => {
    const staticIcon = screen.getByTestId("static-icon");
    const staticIconStyle = window.getComputedStyle(staticIcon).border;
    expect(staticIconStyle).toBe("1px solid transparent");
  });

  it.todo("render the corresponding padding style to size props", () => {
    const staticIcon = screen.getByTestId("static-icon");
    const staticIconStyle = window.getComputedStyle(staticIcon).padding;
    expect(staticIconStyle).toBe("var(--s-2)");
  });

  afterEach(() => {
    cleanup();
  });
});
