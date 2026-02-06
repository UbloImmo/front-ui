import { fn } from "storybook/test";

import { Dialog } from "./Dialog.component";
import { DialogProvider, useDialog } from "./Dialog.context";

import { FlexColumnLayout } from "@/layouts";
import { ComponentVariants } from "@docs/blocks";
import {
  cssVarUsage,
  mergeDefaultProps,
  useCssStyles,
  useMergedProps,
} from "@utils";

import { Heading, Text, Button, TextInput } from "@components";

import type { DialogProps, DialogReference } from "./Dialog.types";
import type { Meta } from "@storybook/react-vite";
import type { ReactNode } from "react";

const meta = {
  title: "Components/Dialogs/Dialog/Stories",
  component: Dialog,
  args: {
    reference: "story-dialog",
    onOpened: fn(),
    onClosed: fn(),
  },
  decorators: [
    (Story) => (
      <DialogProvider portalRoot="#dialog-root">
        <Story />
      </DialogProvider>
    ),
  ],
} satisfies Meta<typeof Dialog>;

export default meta;

const TestCard = ({
  large,
  title = "Example title",
  children,
  closeButton,
  reference,
}: {
  large?: boolean;
  title?: string;
  children?: ReactNode;
  closeButton?: boolean;
  reference: DialogReference;
}) => {
  const { close } = useDialog(reference);
  const closeButtonWrapperStyle = useCssStyles({
    position: "absolute",
    right: "var(--s-2)",
    top: "var(--s-2)",
  });
  return (
    <CardContainer $large={large}>
      <FlexColumnLayout gap="s-4">
        <Heading size="h3" weight="medium">
          {title}
        </Heading>
        <Text color="gray-700">{children}</Text>
      </FlexColumnLayout>
      {closeButton && (
        <div style={closeButtonWrapperStyle}>
          <Button
            onClick={close}
            icon="XLg"
            color="black"
            title="close dialog"
          />
        </div>
      )}
    </CardContainer>
  );
};

const TestDialog =
  (
    reference: DialogReference,
    fixedChildren?: ReactNode,
    buttonLabel = "Open dialog"
  ) =>
  (props: DialogProps) => {
    const { children: _, ...mergedProps } = mergeDefaultProps(props, {
      children: fixedChildren,
      reference,
    });
    const { open } = useDialog(mergedProps.reference);
    const style = useCssStyles({
      padding: "var(--s-1) 0",
      display: "flex",
      alignItems: "center",
    });
    return (
      <div style={style}>
        <Button label={buttonLabel} onClick={open} color="black" />
        <Dialog {...mergedProps}>{fixedChildren}</Dialog>
      </div>
    );
  };

const ExampleCard = ({ reference }: { reference: DialogReference }) => (
  <TestCard reference={reference} title="This is an example dialog card">
    This card is an example. <br />
    You are free to customize the dialog&apos;s content to your needs.
  </TestCard>
);

const CardContainer = ({
  children,
  $large,
}: {
  children?: ReactNode;
  $large?: boolean;
}) => {
  const styles = useCssStyles({
    background: cssVarUsage("white"),
    padding: `var(--s-12) var(--s-4)`,
    border: `1px solid var(--gray-50)`,
    boxShadow: cssVarUsage(`shadow-card-elevation-high`),
    borderRadius: cssVarUsage("s-2"),
    position: "relative",
    ...($large
      ? {
          height: "200vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }
      : {}),
  });

  return <div style={styles}>{children}</div>;
};

const references: DialogReference[] = [
  "image",
  "card",
  "input",
  "nested",
  "scrolling",
];

const NestedDialog = () => {
  const nestedRef = "nested-dialog";
  const { open } = useDialog(nestedRef);

  return (
    <CardContainer>
      <Button
        label="Open nested dialog"
        color="black"
        onClick={open}
        secondary
      />
      <Dialog reference={nestedRef}>
        <CardContainer>
          <Heading size="h3">Nested dialog</Heading>
          <Text>This is a nested dialog</Text>
        </CardContainer>
      </Dialog>
    </CardContainer>
  );
};

const LongDiv = ({ children }: { children?: ReactNode }) => {
  const styles = useCssStyles({
    height: "200vh",
    width: "300px",
    background: cssVarUsage("primary-medium"),
    borderRadius: cssVarUsage("s-2"),
  });
  return <div style={styles}>{children}</div>;
};

const children: Record<DialogReference, JSX.Element> = {
  card: <ExampleCard reference="example-card" />,
  image: (
    <img
      src="https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=500&auto=format&fit=crop"
      alt="example image"
    />
  ),
  input: <TextInput uncontrolled />,
  nested: <NestedDialog />,
  scrolling: <LongDiv />,
};

const DialogVariantWrapper = (props: DialogProps) => {
  const { open } = useDialog(props.reference);
  const label = `Open ${props.reference} dialog`;
  return (
    <>
      <Button label={label} color="black" onClick={open} />
      <Dialog {...props}>{children[props.reference]}</Dialog>
    </>
  );
};

export const Default = TestDialog(
  "example-default",
  <ExampleCard reference="example-default" />
);

export const Content = (props: DialogProps) => {
  const defaults = useMergedProps(Dialog.defaultProps, props);

  return (
    <ComponentVariants
      defaults={defaults}
      variants={references}
      for="reference"
      of={DialogVariantWrapper}
      scaling={1}
      propLabels
    />
  );
};

export const CloseButton = TestDialog(
  "close-button-dialog",
  <TestCard
    reference="close-button-dialog"
    title="This is an example dialog card"
    closeButton
  >
    This card is an example. <br />
    It contains a manual close button.
  </TestCard>
);

export const Overflow = TestDialog(
  "overflow-dialog",
  <TestCard
    reference="overflow-dialog"
    large
    title="This dialog card overflows"
  >
    Its height is 200vh, so it will always overflow.
    <br />
    This is handled automatically by the Dialog content wrapper.
    <br />
    Try scrolling !
  </TestCard>,
  "Open overflowing dialog"
);
