import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "bun:test";

import { ContextInfoCard } from "./ContextInfoCard.component";

describe("ContextInfoCard", () => {
  const defaultProps = ContextInfoCard.defaultProps;

  test("renders with default props", () => {
    render(<ContextInfoCard {...defaultProps} />);
    expect(screen.getByText("[Title]")).toBeDefined();
  });

  test("renders with label", () => {
    render(<ContextInfoCard {...defaultProps} label="Context Label" />);
    expect(screen.getByText("[Title]")).toBeDefined();
    expect(screen.getByText("Context Label")).toBeDefined();
  });

  test("renders with description", () => {
    render(
      <ContextInfoCard
        {...defaultProps}
        description="This is a description of the context"
      />
    );
    expect(screen.getByText("[Title]")).toBeDefined();
    expect(
      screen.getByText("This is a description of the context")
    ).toBeDefined();
  });

  test("renders with details", () => {
    render(
      <ContextInfoCard
        {...defaultProps}
        details="This is a details of the context"
      />
    );
    expect(screen.getByText("[Title]")).toBeDefined();
    expect(screen.getByText("This is a details of the context")).toBeDefined();
  });

  test("renders with all optional props", () => {
    render(
      <ContextInfoCard
        {...defaultProps}
        label="Context Label"
        description="This is a description of the context"
        details="This is a details of the context"
      />
    );
    expect(screen.getByText("[Title]")).toBeDefined();
    expect(screen.getByText("Context Label")).toBeDefined();
    expect(
      screen.getByText("This is a description of the context")
    ).toBeDefined();
    expect(screen.getByText("This is a details of the context")).toBeDefined();
  });

  test("renders with different icon", () => {
    render(
      <ContextInfoCard
        {...defaultProps}
        staticIcon={{
          name: "InvoiceClock",
          color: "pending",
        }}
      />
    );
    expect(screen.getByText("[Title]")).toBeDefined();
  });
});
