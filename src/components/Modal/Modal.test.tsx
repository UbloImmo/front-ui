import { expect } from "bun:test";

import { Modal } from "./Modal.component";
import { DialogProvider } from "../Dialog";

import { testComponentFactory } from "@/tests";

import type { Nullable } from "@ubloimmo/front-util";

const testId = "modal";

const testModal = testComponentFactory(
  "Modal",
  Modal,
  undefined,
  ({ children }) => {
    return (
      <div>
        <div id="dialog-root"></div>
        <DialogProvider>{children}</DialogProvider>
      </div>
    );
  }
);

testModal({ open: false })(
  "should not render if closed",
  async ({ findByTestId }) => {
    let res: Nullable<Element> = null;
    try {
      res = await findByTestId(testId);
    } catch (_e) {
      res = null;
    }
    expect(res).toBeNull();
  }
);

testModal({ open: true })(
  "should not render if closed",
  async ({ findByTestId }) => {
    const res = await findByTestId(testId);
    expect(res).not.toBeNull();
  }
);
