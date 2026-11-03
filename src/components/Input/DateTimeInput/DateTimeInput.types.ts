import type { InputProps, InputValue } from "../Input.types";
import type { TimeInputProps } from "../TimeInput/TimeInput.types";
import type { Nullable } from "@ubloimmo/front-util";

export type DateTimeInputProps = InputProps<"date-time"> & {
  /**
   * Minimum date-time timestamp as a string or null
   * @default null
   */
  min?: Nullable<InputValue<"date-time">>;
  /**
   * Maximum date-time timestamp as a string or null
   * @default null
   */
  max?: Nullable<InputValue<"date-time">>;
  /**
   * The text to display when the input has no value
   *
   * Re-uses the value of the `placeholder` prop if nullish
   *
   * @default null
   */
  timePlaceholder?: Nullable<string>;
} & Pick<TimeInputProps, "step">;

export type DateTimeInputDefaultProps = Required<DateTimeInputProps>;
