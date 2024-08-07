import type { CalendarProps } from "@/components/Calendar";
import type { InputProps } from "../Input.types";

export type DateInputProps = InputProps<"date"> &
  Pick<CalendarProps, "numberOfMonths" | "disabled">;

export type DateInputDefaultProps = Required<DateInputProps>;
