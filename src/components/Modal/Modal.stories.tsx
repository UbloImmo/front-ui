import { fn } from "storybook/test";

import { Modal } from "./Modal.component";
import { Button } from "../Button";
import { DialogProvider, useDialog, type DialogReference } from "../Dialog";

import { componentSourceFactory } from "@docs/docs.utils";
import { mergeDefaultProps, useCssStyles } from "@utils";

import type { ModalProps } from "./Modal.types";
import type { Meta } from "@storybook/react-vite";
import type { ReactNode } from "react";

const ref = "modal-story";

const componentSource = componentSourceFactory<ModalProps>(
  "Modal",
  {
    reference: ref,
    title: "Modal title",
  },
  Modal.defaultProps
);

const meta = {
  component: Modal,
  title: "Components/Dialogs/Modal/Stories",
  args: {
    reference: "story-dialog",
    onOpened: fn(),
    onClosed: fn(),
    title: "Modal title",
    size: "m",
  },
  parameters: {
    docs: componentSource(),
  },
  argTypes: {
    size: {
      options: ["s", "m", "l"],
    },
  },
  decorators: [
    (Story) => (
      <DialogProvider portalRoot="#dialog-root">
        <Story />
      </DialogProvider>
    ),
  ],
} satisfies Meta<typeof Modal>;

export default meta;

const TestModal =
  (
    reference: DialogReference,
    fixedChildren?: ReactNode,
    buttonLabel = "Open modal"
  ) =>
  (props: ModalProps) => {
    const { children: _, ...mergedProps } = mergeDefaultProps(props, {
      children: fixedChildren,
      reference: ref,
    });
    const { open } = useDialog(ref);
    const style = useCssStyles({
      padding: "var(--s-1) 0",
      display: "flex",
      alignItems: "center",
    });
    return (
      <div style={style}>
        <Button label={buttonLabel} onClick={open} color="black" />
        <Modal {...mergedProps}>{fixedChildren}</Modal>
      </div>
    );
  };

export const Default = TestModal("example-default", "Modal content");
