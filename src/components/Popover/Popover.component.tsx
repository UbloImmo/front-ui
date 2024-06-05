import * as PopoverPrimitive from "@radix-ui/react-popover";
import styled from "styled-components";

import {
  popoverContentStyles,
  popoverContentWrapperStyles,
  popoverInnerTriggerStyles,
  popoverRootStyles,
  popoverTriggerStyles,
} from "./Popover.styles";
import {
  useControlledPopoverProps,
  usePopoverCollisionPadding,
  usePopoverContent,
  usePopoverOffset,
} from "./Popover.utils";

import { useTestId, useMergedProps } from "@utils";

import { Button, Text } from "@components";

import type {
  PopoverProps,
  PopoverDefaultProps,
  PopoverContentStyleProps,
} from "./Popover.types";
import type { TestIdProps } from "@types";

const defaultPopoverProps: PopoverDefaultProps = {
  align: "center",
  side: "bottom",
  children: <Button label="Trigger popover" color="black" />,
  content: <Text>Popover content</Text>,
  defaultOpen: false,
  sideOffset: "s-1",
  alignOffset: 0,
  collisionBoundary: [],
  collisionPadding: 0,
  fitTriggerWidth: false,
  sticky: "partial",
  wrapContent: false,
};

/**
 * Displays rich content in a portal.
 *
 * Powered by [Radix-UI](https://www.radix-ui.com/docs/primitives/components/popover)
 *
 * @version 0.0.1
 *
 * @param {PopoverProps & TestIdProps} props - Popover component props
 * @returns {JSX.Element}
 */
const Popover = (props: PopoverProps & TestIdProps): JSX.Element => {
  const mergedProps = useMergedProps<
    PopoverDefaultProps,
    Partial<PopoverDefaultProps>
  >(defaultPopoverProps, props);
  const testId = useTestId("popover", props);

  const controlledRootProps = useControlledPopoverProps(mergedProps);
  const content = usePopoverContent(mergedProps);
  const sideOffset = usePopoverOffset(mergedProps.sideOffset);
  const alignOffset = usePopoverOffset(mergedProps.alignOffset);
  const collisionPadding = usePopoverCollisionPadding(
    mergedProps.collisionPadding
  );

  return (
    <PopoverRoot
      data-testid={testId}
      defaultOpen={mergedProps.defaultOpen}
      {...controlledRootProps}
    >
      <PopoverTrigger asChild>
        <PopoverInnerTrigger>{mergedProps.children}</PopoverInnerTrigger>
      </PopoverTrigger>
      <PopoverContent
        side={mergedProps.side}
        sideOffset={sideOffset}
        align={mergedProps.align}
        alignOffset={alignOffset}
        collisionBoundary={mergedProps.collisionBoundary}
        collisionPadding={collisionPadding}
        sticky={mergedProps.sticky}
        $fitTriggerWidth={mergedProps.fitTriggerWidth}
      >
        {mergedProps.wrapContent && content ? (
          <PopoverContentWrapper>{content}</PopoverContentWrapper>
        ) : (
          content
        )}
      </PopoverContent>
    </PopoverRoot>
  );
};
Popover.defaultProps = defaultPopoverProps;

export { Popover };

const PopoverRoot = styled(PopoverPrimitive.Root)`
  ${popoverRootStyles}
`;

const PopoverTrigger = styled(PopoverPrimitive.Trigger)`
  ${popoverTriggerStyles}
`;

const PopoverInnerTrigger = styled.div`
  ${popoverInnerTriggerStyles}
`;

const PopoverContent = styled(
  PopoverPrimitive.Content
)<PopoverContentStyleProps>`
  ${popoverContentStyles}
`;

const PopoverContentWrapper = styled.div`
  ${popoverContentWrapperStyles}
`;
