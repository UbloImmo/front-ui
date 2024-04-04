import { isBoolean, type Nullable } from "@ubloimmo/front-util";
import { useEffect } from "react";
import styled from "styled-components";

import { useDialog } from "./Dialog.context";
import {
  dialogOverlayStyles,
  dialogContentStyles,
  dialogWrapperStyles,
} from "./Dialog.styles";
import { Portal } from "../Portal";

import { mergeDefaultProps, useLogger, useTestId } from "@utils";

import type { DefaultDialogProps, DialogProps } from "./Dialog.types";
import type { WithTestId } from "@types";

const defaultDialogProps: DefaultDialogProps = {
  reference: "dialog",
  portalRoot: "#dialog-root",
  open: false,
  children: null,
};

/**
 * Overlays its children on the primary window, rendering the content underneath inert.
 *
 * Controlled by a parent `DialogProvider`.
 *
 * @version 0.0.1
 *
 * @param {WithTestId<DialogProps>} props - the properties for the Dialog component
 * @returns {Nullable<JSX.Element>} the rendered dialog or null if closed
 */
const Dialog = (props: WithTestId<DialogProps>): Nullable<JSX.Element> => {
  const { error } = useLogger("Dialog");
  const { children, open, reference } = mergeDefaultProps(
    defaultDialogProps,
    props
  );
  const testId = useTestId("dialog-content", props);
  const { isOpen, isRegistered, portalRoot, close, register, unregister, set } =
    useDialog(reference);

  useEffect(() => {
    if (isRegistered) return unregister;
    register(open);
    return unregister;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (open !== isOpen && isBoolean(open) && isRegistered) {
      set(open);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  if (!reference) {
    error("No reference provided");
    return null;
  }

  if (!isOpen) return null;
  return (
    <Portal rootSelector={portalRoot}>
      <DialogOverlay
        aria-hidden="true"
        data-testid="dialog-overlay"
        onClick={close}
      />
      <DialogWrapper data-testid="dialog-wrapper">
        <DialogContent
          aria-label="dialog content"
          role="dialog"
          data-testid={testId}
        >
          {children}
        </DialogContent>
      </DialogWrapper>
    </Portal>
  );
};

Dialog.defaultProps = defaultDialogProps;

export { Dialog };

const DialogOverlay = styled.div`
  ${dialogOverlayStyles}
`;

const DialogWrapper = styled.div`
  ${dialogWrapperStyles}
`;

const DialogContent = styled.div`
  ${dialogContentStyles}
`;
