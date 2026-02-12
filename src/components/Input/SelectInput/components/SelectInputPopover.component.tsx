import { Popover } from "@/layouts/Popover";
import { useTestId } from "@utils";

import type { SelectInputPopoverProps } from "../SelectInput.types";

/**
 * A Popover wrapper for SelectInput options that handles positioning and collision detection
 *
 * @version 0.1.0
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
      side="bottom"
      align="start"
      sideOffset="s-1"
      collisionPadding="s-2"
      sticky="always"
      fitTriggerWidth
      fill
      fillHeight
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
