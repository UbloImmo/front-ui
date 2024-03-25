import { describe, it, expect, mock, afterEach } from "bun:test";
import { componentTestFactory } from "@/tests";
import { render, cleanup } from "@testing-library/react";
import { Button } from "./Button.component";

describe("Button", () => {
  const testButton = componentTestFactory(
    "Button",
    "button",
    Button,
    Button.defaultProps
  );
  const onClick = mock(() => {});

  testButton({ label: null, icon: null }, true);

  describe("onClick", () => {
    it("should be called when clicked", () => {
      const { queryByTestId } = render(
        <Button label="test" onClick={onClick} />
      );
      const button = queryByTestId("button");
      expect(button).toBeDefined();
      button?.click();
      expect(onClick).toHaveBeenCalled();
    });

    it("should not be called when disabled", () => {
      const { queryByTestId } = render(
        <Button label="test" onClick={onClick} disabled />
      );
      const button = queryByTestId("button");
      expect(button).toBeDefined();
      button?.click();
      expect(onClick).not.toHaveBeenCalled();
    });
    afterEach(() => {
      onClick.mockReset();
      cleanup();
    });
  });
});
