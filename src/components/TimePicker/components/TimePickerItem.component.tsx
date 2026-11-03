import {
  type MouseEventHandler,
  ReactNode,
  useCallback,
  useMemo,
  useRef,
} from "react";

import { useTimePickerItemClassName } from "../TimePicker.styles";

import { Text } from "@/components/Text";
import { formatTimePart } from "@/utils/time.utils";

import type { TimePickerItemProps } from "../TimePicker.types";

/**
 * Displays and allows selection of either a single hour or minute
 * @param {TimePickerItemProps} - Component props
 * @returns {ReactNode} - Component
 */
export function TimePickerItem({
  timePart,
  onClick,
  disabled,
  selected,
  type,
}: TimePickerItemProps): ReactNode {
  const ref = useRef<HTMLButtonElement>(null);

  const onButtonClick = useCallback<MouseEventHandler<HTMLButtonElement>>(
    (event) => {
      if (disabled) return;
      event.stopPropagation();
      event.preventDefault();
      onClick(timePart);
    },
    [disabled, onClick, timePart]
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
      role="option"
      aria-selected={disabled ? undefined : selected}
      data-testid="time-picker-item"
      data-type={type}
      data-value={timePart}
      title={label}
    >
      <Text color="inherit" weight={selected ? "bold" : "medium"}>
        {label}
      </Text>
    </button>
  );
}
