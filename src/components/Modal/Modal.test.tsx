import { expect } from "bun:test";

import { Modal } from "./Modal.component";
import { DialogProvider } from "../Dialog";

import { testComponentFactory } from "@/tests";

import type { Nullable } from "@ubloimmo/front-util";

const testId = "modal";
const TEST_MODAL_REF = "TEST_MODAL_REF";

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
  },
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
  },
);

testModal({ open: true })("should render if open", async ({ findByTestId }) => {
  const res = await findByTestId(testId);
  expect(res).not.toBeNull();
});

testModal({ open: true, reference: TEST_MODAL_REF })(
  "should close on click",
  async ({ debug, queryByTestId }) => {
    expect(queryByTestId(testId)).not.toBeNull();

    const closeButton = queryByTestId(
      "modal-close-button",
    ) as HTMLButtonElement;
    expect(closeButton).not.toBeNull();

    await closeButton.click();
    expect(queryByTestId(testId)).toBeNull();

    debug();
  },
);
