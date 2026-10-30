import type { InputProps } from "../Input.types";
import type { TimePickerProps } from "@/components/TimePicker";

export type TimeInputProps = InputProps<"time"> &
  Pick<TimePickerProps, "min" | "max" | "step">;

export type TimeInputDefaultProps = Required<TimeInputProps>;
