import type { InputProps, InputValue } from "../Input.types";
import type { CalendarProps } from "@/components/Calendar";
import type { Nullable } from "@ubloimmo/front-util";

export type DateInputProps = InputProps<"date"> &
  Pick<CalendarProps, "numberOfMonths" | "disabled"> & {
    min?: Nullable<InputValue<"date">>;
    max?: Nullable<InputValue<"date">>;
  };

export type DateInputDefaultProps = Required<DateInputProps>;
