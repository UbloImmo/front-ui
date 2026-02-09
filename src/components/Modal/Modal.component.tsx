import { VoidFn, type Nullable } from "@ubloimmo/front-util";
import { useCallback, useId, useMemo } from "react";

import { useModalClassNames } from "./Modal.styles";

import { Button } from "@/components/Button";
import { Dialog, useDialogManager } from "@/components/Dialog";
import { Heading } from "@/components/Heading";
import { FlexColumnLayout } from "@/layouts/Flex";
import {
  useLogger,
  useTestId,
  useMergedProps,
  useUikitTranslation,
  useStatic,
} from "@utils";

import type { ModalProps, ModalDefaultProps } from "./Modal.types";
import type { TestIdProps } from "@types";

const defaultModalProps: ModalDefaultProps = {
  ...Dialog.__DEFAULT_PROPS,
  reference: null,
  title: null,
  size: "m",
};

/**
 * A simple modal with a title and close button. Built on top of [Dialog](/?path=/docs/components-dialog-usage--docs)
 *
 * @version 0.1.0
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
  const classNames = useModalClassNames(mergedProps.size);

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
      <div className={classNames.card} data-testid="modal-card">
        <Button
          className={classNames.button}
          color="black"
          icon="XLg"
          onClick={closeDialogOnClick}
          title={closeLabel}
          label={closeLabel}
          testId="modal-close-button"
          overrideTestId
          expandOnHover
        />
        <FlexColumnLayout fill gap="s-4">
          {mergedProps.title && (
            <Heading
              testId="modal-title"
              overrideTestId
              size="h2"
              weight="bold"
              color="gray-900"
              fill
            >
              {mergedProps.title}
            </Heading>
          )}
          {mergedProps.children}
        </FlexColumnLayout>
      </div>
    </Dialog>
  );
};
Modal.__DEFAULT_PROPS = defaultModalProps;

export { Modal };
