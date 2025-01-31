import { useMemo } from "react";

import { useMergedProps } from "@utils";

import { Button, type IconName } from "@components";

import type { Nullable, ValueMap } from "@ubloimmo/front-util";

type CalendarChevronOrientation = "up" | "down" | "left" | "right";

type CalendarChevronProps = {
  className?: Nullable<string>;
  size?: number;
  disabled?: boolean;
  orientation?: CalendarChevronOrientation;
};

const chevronIconMap: ValueMap<CalendarChevronOrientation, IconName> = {
  up: "ChevronUp",
  down: "ChevronDown",
  left: "ChevronLeft",
  right: "ChevronRight",
};

const defaultCalendarChevronProps: Required<CalendarChevronProps> = {
  className: null,
  size: 2,
  disabled: false,
  orientation: "right",
};

export const CalendarChevron = (props: CalendarChevronProps) => {
  const mergedProps = useMergedProps(defaultCalendarChevronProps, props);
  const iconName = useMemo(
    () => chevronIconMap[mergedProps.orientation],
    [mergedProps]
  );

  return (
    <Button
      icon={iconName}
      color="clear"
      testId="calendar-chevron"
      disabled={mergedProps.disabled}
    />
  );
};
