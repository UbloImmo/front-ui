import { Nullable } from "@ubloimmo/front-util";
import { MutableRefObject } from "react";

import { ControlledPopoverProps, Popover } from "@/layouts/Popover";
import { useTestId } from "@utils";

import type { TestIdProps } from "@types";

/**
 * Props for the SelectInputPopover component
 */
export type SelectInputPopoverProps = Pick<
  ControlledPopoverProps,
  "open" | "onOpenChange" | "children" | "content"
> & {
  wrapperRef?: MutableRefObject<Nullable<HTMLDivElement>>;
} & TestIdProps;

/**
 * A Popover wrapper for SelectInput options that handles positioning and collision detection
 *
 * @version 0.0.1
 *
 * @param {SelectInputPopoverProps} props - The popover props
 * @returns {JSX.Element}
 */
const SelectInputPopover = ({
  open,
  onOpenChange,
  children,
  content,
  testId,
  wrapperRef,
}: SelectInputPopoverProps): JSX.Element => {
  const popoverTestId = useTestId("input-select-popover", { testId });

  const onChange = (nextOpen: boolean) => {
    const event = window.event;
    if (
      open &&
      !nextOpen &&
      event &&
      event instanceof MouseEvent &&
      wrapperRef &&
      wrapperRef.current &&
      (event.target === wrapperRef.current ||
        wrapperRef.current.contains(event.target as HTMLElement))
    ) {
      return;
    }
    onOpenChange(nextOpen);
  };

  return (
    <Popover
      open={open}
      onOpenChange={onChange}
      content={content}
      side={"bottom"}
      align="start"
      sideOffset="s-1"
      collisionPadding="s-2"
      sticky="always"
      fitTriggerWidth
      fill
      allowContentWidthOverride
      testId={popoverTestId}
      overrideTestId
      noFocus
    >
      {children}
    </Popover>
  );
};

export { SelectInputPopover };
