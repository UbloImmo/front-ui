import { type MouseEventHandler, useCallback, useMemo, useRef } from "react";

import { useTimePickerItemClassName } from "../TimePicker.styles";
import { formatTimePart } from "../TimePicker.utils";

import { Text } from "@/components/Text";

import type { TimePickerItemProps } from "../TimePicker.types";

export function TimePickerItem({
  timePart,
  onClick,
  disabled,
  selected,
  type,
}: TimePickerItemProps) {
  const ref = useRef<HTMLButtonElement>(null);

  const onButtonClick = useCallback<MouseEventHandler<HTMLButtonElement>>(
    (event) => {
      if (disabled) return;
      event.stopPropagation();
      event.preventDefault();
      onClick(timePart);
    },
    [disabled, onClick, timePart],
  );

  const label = useMemo(() => formatTimePart(timePart), [timePart]);

  const className = useTimePickerItemClassName(selected);

  return (
    <button
      ref={ref}
      type="button"
      onClick={onButtonClick}
      disabled={disabled}
      className={className}
      data-testid="time-picker-item"
      data-type={type}
      data-value={timePart}
    >
      <Text color="inherit" weight={selected ? "bold" : "medium"}>
        {label}
      </Text>
    </button>
  );
}
