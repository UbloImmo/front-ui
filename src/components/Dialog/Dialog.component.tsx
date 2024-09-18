import {
  isBoolean,
  isFunction,
  type Nullable,
  type VoidFn,
} from "@ubloimmo/front-util";
import { useEffect, useRef } from "react";
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
import type { TestIdProps } from "@types";

const defaultDialogProps: DefaultDialogProps = {
  reference: "dialog",
  portalRoot: "#dialog-root",
  open: false,
  children: null,
  onOpened: null,
  onClosed: null,
};

/**
 * Overlays its children on the primary window, rendering the content underneath inert.
 *
 * Controlled by a parent `DialogProvider`.
 *
 * @version 0.0.1
 *
 * @param {DialogProps & TestIdProps} props - the properties for the Dialog component
 * @returns {Nullable<JSX.Element>} the rendered dialog or null if closed
 */
const Dialog = (props: DialogProps & TestIdProps): Nullable<JSX.Element> => {
  const { error } = useLogger("Dialog");
  const { children, open, reference, onClosed, onOpened } = mergeDefaultProps(
    defaultDialogProps,
    props
  );
  const testId = useTestId("dialog-content", props);
  const { isOpen, isRegistered, portalRoot, close, register, unregister, set } =
    useDialog(reference);

  const isOpenRef = useRef<boolean>(open);

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

  useEffect(() => {
    if (isOpenRef.current === isOpen) return;
    if (isOpen && isFunction<VoidFn>(onOpened)) onOpened();
    if (!isOpen && isFunction<VoidFn>(onClosed)) onClosed();
    isOpenRef.current = isOpen;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  /**
   * Effect to close the dialog when the escape key is pressed
   */
  useEffect(() => {
    const closeOnEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) close();
    };
    window.addEventListener("keydown", closeOnEsc);
    return () => window.removeEventListener("keydown", closeOnEsc);
  }, [close, isOpen]);

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
