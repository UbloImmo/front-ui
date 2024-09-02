import { VoidFn, type Nullable } from "@ubloimmo/front-util";
import { useCallback, useId, useMemo } from "react";
import styled from "styled-components";

import { modalButtonStyles, modalCardStyles } from "./Modal.styles";

import { Button } from "@/components/Button";
import { Dialog, useDialogManager } from "@/components/Dialog";
import { Heading } from "@/components/Heading";
import { FlexColumnLayout } from "@layouts";
import {
  useLogger,
  useTestId,
  useMergedProps,
  useUikitTranslation,
  useStatic,
} from "@utils";

import type {
  ModalProps,
  ModalDefaultProps,
  ModalStyleProps,
} from "./Modal.types";
import type { TestIdProps } from "@types";

const defaultModalProps: ModalDefaultProps = {
  ...Dialog.defaultProps,
  reference: null,
  title: null,
  size: "m",
};

/**
 * A simple modal with a title and close button. Built on top of [Dialog](/?path=/docs/components-dialog-usage--docs)
 *
 * @version 0.0.2
 *
 * @param {ModalProps & TestIdProps} props - Modal component props
 * @returns {Nullable<JSX.Element>}
 */
const Modal = (props: ModalProps & TestIdProps): Nullable<JSX.Element> => {
  const { error } = useLogger("Modal");
  const mergedProps = useMergedProps(defaultModalProps, props);
  const testId = useTestId("modal", props);
  const tl = useUikitTranslation();
  const closeLabel = useStatic(tl.action.close);

  const defaultReference = useId();

  const reference = useMemo(() => {
    return mergedProps.reference ?? defaultReference;
  }, [mergedProps, defaultReference]);

  const { closeDialog } = useDialogManager();

  const closeDialogOnClick = useCallback<VoidFn>(() => {
    closeDialog(reference);
  }, [closeDialog, reference]);

  if (!reference) {
    error("Missing reference");
    return null;
  }

  return (
    <Dialog
      testId={testId}
      overrideTestId
      reference={reference}
      open={mergedProps.open}
      onClosed={mergedProps.onClosed}
      onOpened={mergedProps.onOpened}
      portalRoot={mergedProps.portalRoot}
    >
      <Card $size={mergedProps.size}>
        <CloseButton
          color="black"
          icon="XLg"
          onClick={closeDialogOnClick}
          title={closeLabel}
          label={closeLabel}
          testId="modal-close-button"
          overrideTestId
          expandOnHover
        />
        <FlexColumnLayout fill gap="s-3">
          {mergedProps.title && (
            <Heading
              testId="modal-title"
              overrideTestId
              size="h2"
              weight="bold"
              color="gray-900"
            >
              {mergedProps.title}
            </Heading>
          )}
          {mergedProps.children}
        </FlexColumnLayout>
      </Card>
    </Dialog>
  );
};
Modal.defaultProps = defaultModalProps;

export { Modal };

const Card = styled.div<ModalStyleProps>`
  ${modalCardStyles}
`;

const CloseButton = styled(Button)`
  ${modalButtonStyles}
`;
