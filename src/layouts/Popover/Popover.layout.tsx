import * as PopoverPrimitive from "@radix-ui/react-popover";
import { Nullable } from "@ubloimmo/front-util";
import { useCallback, useRef } from "react";

import { usePopoverLayoutStyles } from "./Popover.styles";
import {
  useControlledPopoverProps,
  usePopoverCollisionPadding,
  usePopoverContent,
  usePopoverOffset,
} from "./Popover.utils";

import { Text } from "@/components/Text";
import { useTestId, useMergedProps } from "@utils";

import type { PopoverProps, PopoverDefaultProps } from "./Popover.types";
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
 * @version 0.1.0
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

  const styles = usePopoverLayoutStyles(mergedProps, offset.current);

  return (
    <PopoverPrimitive.Root
      data-testid={testId}
      defaultOpen={mergedProps.defaultOpen}
      {...controlledRootProps}
    >
      <PopoverPrimitive.Trigger
        asChild
        className={styles.popoverTrigger}
        data-testid="popover-trigger"
      >
        <div className={styles.popoverTriggerInner} ref={computeOffset}>
          {mergedProps.children}
        </div>
      </PopoverPrimitive.Trigger>
      <PopoverPrimitive.Content
        data-testid="popover-content"
        className={styles.popoverContent.className}
        style={styles.popoverContent.style}
        side={mergedProps.side}
        sideOffset={sideOffset}
        align={mergedProps.align}
        alignOffset={alignOffset}
        collisionBoundary={mergedProps.collisionBoundary}
        collisionPadding={collisionPadding}
        sticky={mergedProps.sticky}
        onOpenAutoFocus={onFocus}
        onCloseAutoFocus={onFocus}
        onFocusOutside={onFocus}
      >
        {mergedProps.wrapContent && content ? (
          <div
            className={styles.popoverContentWrapper}
            data-testid="popover-content-wrapper"
          >
            {content}
          </div>
        ) : (
          content
        )}
      </PopoverPrimitive.Content>
    </PopoverPrimitive.Root>
  );
};
Popover.defaultProps = defaultPopoverProps;

export { Popover };
