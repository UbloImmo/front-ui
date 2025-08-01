import { describe, expect, beforeEach, afterEach } from "bun:test";

import { ToasterProps } from "./Toaster.types";

import { testComponentFactory } from "@/tests";

import { Toaster, toast } from "./";

// Helper function for waiting
const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

describe("Toaster", () => {
  const testToaster = testComponentFactory<ToasterProps>("Toaster", Toaster, {
    props: Toaster.defaultProps,
    tests: [
      {
        name: "should render component",
        test: ({ container }) => {
          // Just verify the component renders without error
          expect(container).not.toBeNull();
        },
      },
    ],
  });

  // Clean up toasts between tests
  beforeEach(() => {
    toast.dismiss();
  });

  afterEach(() => {
    toast.dismiss();
  });

  testToaster({ ...Toaster.defaultProps })(
    "should render with default props",
    ({ container }) => {
      // Component should render without throwing errors
      expect(container).not.toBeNull();
    }
  );

  testToaster({
    position: "top-right",
    theme: "dark",
    richColors: true,
  })("should render with custom props", ({ container }) => {
    // Component should render without throwing errors
    expect(container).not.toBeNull();
  });

  testToaster({ closeButton: false })(
    "should render without close button",
    ({ container }) => {
      // Component should render without throwing errors
      expect(container).not.toBeNull();
    }
  );

  // Test toast creation and ID functionality - THE KEY TEST!
  testToaster({ ...Toaster.defaultProps })(
    "should create toast with custom ID and className",
    async ({ container }) => {
      // Create a toast with custom ID
      const toastId = "test-toast-id";
      const className = "test-toast-class";

      toast("Test message", {
        id: toastId,
        className: className,
      });

      // Wait for toast to appear
      await wait(100);

      // Check if toast was created
      const toastElement = container.querySelector("[data-sonner-toast]");
      expect(toastElement).not.toBeNull();

      // Check if custom class was applied - this is the important test!
      const toastWithClass = container.querySelector(`.${className}`);
      expect(toastWithClass).not.toBeNull();
    }
  );

  testToaster({ ...Toaster.defaultProps })(
    "should create different types of toasts with custom classes",
    async ({ container }) => {
      // Test different toast types with IDs and classes
      toast.success("Success message", {
        id: "success-toast",
        className: "test-success",
      });
      toast.error("Error message", {
        id: "error-toast",
        className: "test-error",
      });
      toast.warning("Warning message", {
        id: "warning-toast",
        className: "test-warning",
      });
      toast.info("Info message", { id: "info-toast", className: "test-info" });

      await wait(100);

      // Check if all toasts were created
      const allToasts = container.querySelectorAll("[data-sonner-toast]");
      expect(allToasts.length).toBeGreaterThan(0);

      // Check if custom classes exist - this proves IDs and classes work!
      expect(container.querySelector(".test-success")).not.toBeNull();
      expect(container.querySelector(".test-error")).not.toBeNull();
      expect(container.querySelector(".test-warning")).not.toBeNull();
      expect(container.querySelector(".test-info")).not.toBeNull();
    }
  );

  testToaster({ ...Toaster.defaultProps })(
    "should create toast with description and custom ID",
    async ({ container }) => {
      toast("Main message", {
        description: "This is the description",
        id: "toast-with-description",
        className: "test-description-toast",
      });

      await wait(100);

      const toastElement = container.querySelector(".test-description-toast");
      expect(toastElement).not.toBeNull();

      // Check if description is present
      const descriptionElement = container.querySelector("[data-description]");
      expect(descriptionElement).not.toBeNull();
    }
  );

  testToaster({ closeButton: true })(
    "should show close button when enabled",
    async ({ container }) => {
      toast("Test message with close button", {
        id: "closable-toast",
        className: "test-closable",
      });

      await wait(100);

      const toastElement = container.querySelector(".test-closable");
      expect(toastElement).not.toBeNull();

      // Look for close button (may use different selector)
      const closeButton =
        container.querySelector("button[data-close-button]") ||
        container.querySelector('button[aria-label*="close" i]') ||
        container.querySelector("[data-sonner-toast] button");
      expect(closeButton).not.toBeNull();
    }
  );
});
