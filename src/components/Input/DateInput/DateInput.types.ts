import type { InputProps, InputValue } from "../Input.types";
import type { CalendarProps } from "@/components/Calendar";
import type { Nullable } from "@ubloimmo/front-util";

export type DateInputFormat = "iso" | "native" | "dd/mm/yyyy";

export type DateInputProps = InputProps<"date"> &
  Pick<CalendarProps, "numberOfMonths" | "disabled"> & {
    min?: Nullable<InputValue<"date">>;
    max?: Nullable<InputValue<"date">>;
    /**
     * The format of the changed date.
     *
     * @remarks only affected the output of `onChange`
     *
     * @type {DateInputFormat}
     * @default "iso"
     */
    format?: DateInputFormat;
  };

export type DateInputDefaultProps = Required<DateInputProps>;
