import * as PopoverPrimitive from "@radix-ui/react-popover";
import { Nullable } from "@ubloimmo/front-util";
import { useCallback, useRef } from "react";
import styled from "styled-components";

import {
  popoverContentStyles,
  popoverContentWrapperStyles,
  popoverInnerTriggerStyles,
  popoverTriggerStyles,
} from "./Popover.styles";
import {
  useControlledPopoverProps,
  usePopoverCollisionPadding,
  usePopoverContent,
  usePopoverOffset,
} from "./Popover.utils";

import { Text } from "@/components/Text";
import { useTestId, useMergedProps } from "@utils";

import type {
  PopoverProps,
  PopoverDefaultProps,
  PopoverContentStyleProps,
  PopoverTriggerStyleProps,
} from "./Popover.types";
import type { TestIdProps, Vec2 } from "@types";

const defaultPopoverProps: PopoverDefaultProps = {
  align: "center",
  side: "bottom",
  children: null,
  content: <Text>Popover content</Text>,
  defaultOpen: false,
  sideOffset: "s-1",
  alignOffset: 0,
  collisionBoundary: [],
  collisionPadding: 0,
  fitTriggerWidth: false,
  allowContentWidthOverride: false,
  sticky: "partial",
  wrapContent: false,
  fill: false,
  fillHeight: false,
  noFocus: false,
};
/**
 * Displays rich content in a portal.
 *
 * Powered by [Radix-UI](https://www.radix-ui.com/docs/primitives/components/popover)
 *
 * @version 0.0.2
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

  const offset = useRef<Nullable<Vec2>>(null);

  const computeOffset = useCallback((anchorElement: Nullable<HTMLElement>) => {
    if (!anchorElement) {
      offset.current = null;
      return;
    }
    const { x, y } = anchorElement.getBoundingClientRect();
    offset.current = { x, y };
  }, []);

  const controlledRootProps = useControlledPopoverProps(mergedProps);
  const content = usePopoverContent(mergedProps);
  const sideOffset = usePopoverOffset(mergedProps.sideOffset);
  const alignOffset = usePopoverOffset(mergedProps.alignOffset);
  const collisionPadding = usePopoverCollisionPadding(
    mergedProps.collisionPadding
  );

  const onFocus = useCallback(
    (e: Event) => {
      if (mergedProps.noFocus) e.preventDefault();
    },
    [mergedProps.noFocus]
  );

  return (
    <PopoverPrimitive.Root
      data-testid={testId}
      defaultOpen={mergedProps.defaultOpen}
      {...controlledRootProps}
    >
      <PopoverTrigger asChild>
        <PopoverInnerTrigger
          $fill={mergedProps.fill}
          $fillHeight={mergedProps.fillHeight}
          ref={computeOffset}
        >
          {mergedProps.children}
        </PopoverInnerTrigger>
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
        $allowContentWidthOverride={mergedProps.allowContentWidthOverride}
        $anchorOffset={offset.current}
        onOpenAutoFocus={onFocus}
        onCloseAutoFocus={onFocus}
        onFocusOutside={onFocus}
      >
        {mergedProps.wrapContent && content ? (
          <PopoverContentWrapper>{content}</PopoverContentWrapper>
        ) : (
          content
        )}
      </PopoverContent>
    </PopoverPrimitive.Root>
  );
};
Popover.defaultProps = defaultPopoverProps;

export { Popover };

const PopoverTrigger = styled(PopoverPrimitive.Trigger)`
  ${popoverTriggerStyles}
`;

const PopoverInnerTrigger = styled.div<PopoverTriggerStyleProps>`
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
