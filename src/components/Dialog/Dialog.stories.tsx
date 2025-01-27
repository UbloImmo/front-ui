import { fn } from "@storybook/test";
import styled, { css } from "styled-components";

import { Dialog } from "./Dialog.component";
import { DialogProvider, useDialog } from "./Dialog.context";

import { FlexColumnLayout } from "@/layouts";
import { ComponentVariants } from "@docs/blocks";
import { mergeDefaultProps, useMergedProps } from "@utils";

import { Heading, Text, Button, TextInput } from "@components";

import type { DialogProps, DialogReference } from "./Dialog.types";
import type { Meta } from "@storybook/react";
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
  return (
    <CardContainer $large={large}>
      <FlexColumnLayout gap="s-4">
        <Heading size="h3" weight="medium">
          {title}
        </Heading>
        <Text color="gray-700">{children}</Text>
      </FlexColumnLayout>
      {closeButton && (
        <CloseButtonWrapper>
          <Button
            onClick={close}
            icon="XLg"
            color="black"
            title="close dialog"
          />
        </CloseButtonWrapper>
      )}
    </CardContainer>
  );
};

const TestDialog =
  (
    reference: DialogReference,
    fixedChildren?: ReactNode,
    buttonLabel = "Open dialog",
  ) =>
  (props: DialogProps) => {
    const { children: _, ...mergedProps } = mergeDefaultProps(props, {
      children: fixedChildren,
      reference,
    });
    const { open } = useDialog(mergedProps.reference);
    return (
      <StoryContainer>
        <Button label={buttonLabel} onClick={open} color="black" />
        <Dialog {...mergedProps}>{fixedChildren}</Dialog>
      </StoryContainer>
    );
  };

const ExampleCard = ({ reference }: { reference: DialogReference }) => (
  <TestCard reference={reference} title="This is an example dialog card">
    This card is an example. <br />
    You are free to customize the dialog&apos;s content to your needs.
  </TestCard>
);

const CardContainer = styled.div<{ $large?: boolean }>`
  background: #fff;
  padding: var(--s-12) var(--s-4);
  border: 1px solid var(--gray-50);
  border-radius: var(--s-2);
  position: relative;
  ${({ $large }) =>
    $large &&
    css`
      height: 200vh;
      display: flex;
      flex-direction: column;
      align-items: center;
    `}
`;

const references: DialogReference[] = ["image", "card", "input", "nested"];

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
  <ExampleCard reference="example-default" />,
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
  </TestCard>,
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
  "Open overflowing dialog",
);

const StoryContainer = styled.div`
  padding: var(--s-1) 0;
  display: flex;
  align-items: center;
`;

const CloseButtonWrapper = styled.div`
  position: absolute;
  right: var(--s-2);
  top: var(--s-2);
`;
